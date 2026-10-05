const assert = require("node:assert/strict");
const {randomBytes} = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const {after, before, beforeEach, describe, it} = require("node:test");
const mysql = require("mysql2/promise");
const getSecret = require("../services/utils/getSecret");

// Run only against a disposable server with CREATE/DROP DATABASE privileges.
// Lock checks also require MariaDB PROCESS or MySQL 8/Percona read access to
// performance_schema.data_lock_waits and performance_schema.threads.
// RUN_CARD_PUBLISH_DB_TESTS=1 node --test tests/cardPublish.integration.test.js
describe("card publishing with MariaDB/MySQL", {
  skip: process.env.RUN_CARD_PUBLISH_DB_TESTS !== "1"
}, () => {
  const database = `eec_card_publish_test_${process.pid}_${randomBytes(4).toString("hex")}`;
  const tables = ["Pages", "Headers", "Icons", "Cards", "Temp_Cards", "Items", "History_Cards", "History_Items"];
  const longText = `<p>${"Rich text draft content. ".repeat(100)}</p>`;
  let admin;
  let pool;
  let publishCard;
  let updateCard;
  let lockWaitSql;
  let mariaDb;

  before(async () => {
    admin = await mysql.createConnection({
      host: getSecret("MYSQL_HOST"),
      port: getSecret("MYSQL_PORT") || 3306,
      user: getSecret("MYSQL_USER"),
      password: getSecret("MYSQL_PASSWORD"),
      multipleStatements: true
    });
    await admin.query(`CREATE DATABASE \`${database}\``);
    await admin.query(`USE \`${database}\``);

    // Use the repository's table definitions and indexes without its sample data.
    const schema = fs.readFileSync(path.join(__dirname, "../services/database/db-init-new.sql"), "utf8");
    for (const table of tables) {
      const create = schema.match(new RegExp(`CREATE TABLE \`${table}\` \\([\\s\\S]*?;`));
      assert.ok(create, `Missing schema for ${table}`);
      await admin.query(create[0]);
      const alterations = schema.matchAll(new RegExp(`ALTER TABLE \`${table}\`[\\s\\S]*?;`, "g"));
      for (const alteration of alterations) {
        if (!alteration[0].includes("ADD CONSTRAINT")) {
          await admin.query(alteration[0]);
        }
      }
    }

    process.env.MYSQL_DB_NAME = database;
    delete process.env.MYSQL_DB_NAME_FILE;
    ({pool} = require("../services/database/mysqlPool"));
    ({publishCard, updateCard} = require("../models/cards"));
    const [version] = await admin.query("SELECT VERSION() AS version");
    mariaDb = version[0].version.includes("MariaDB");
    lockWaitSql = mariaDb ?
      "SELECT 1 FROM information_schema.INNODB_LOCK_WAITS waits " +
      "JOIN information_schema.INNODB_TRX trx ON trx.trx_id = waits.requesting_trx_id " +
      "WHERE trx.trx_mysql_thread_id = ?" :
      "SELECT 1 FROM performance_schema.data_lock_waits waits " +
      "JOIN performance_schema.threads thread ON thread.THREAD_ID = waits.REQUESTING_THREAD_ID " +
      "WHERE thread.PROCESSLIST_ID = ?";
    const [mode] = await pool.query("SELECT @@sql_mode AS mode");
    assert.match(mode[0].mode, /STRICT/, "History truncation must fail, rather than silently truncate");
  });

  after(async () => {
    if (pool) {
      await pool.end();
    }
    if (admin) {
      try {
        await admin.query(`DROP DATABASE IF EXISTS \`${database}\``);
      } finally {
        await admin.end();
      }
    }
  });

  beforeEach(async () => {
    await pool.query("ALTER TABLE History_Items MODIFY contentText MEDIUMTEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL");
    for (const table of [...tables].reverse()) {
      await pool.query(`DELETE FROM \`${table}\``);
    }
    await pool.query("INSERT INTO Pages (pageId, pageType, name, title, description, imageUrl, internal, userId, approved) VALUES (1, 0, 'publish-test', 'Publish test', '', '', 0, 1, 1)");
    await pool.query("INSERT INTO Headers (headerId, pageId, orderIndex, title, internal, userId, approved) VALUES (1, 1, 0, 'The Process', 0, 1, 1)");
    await pool.query("INSERT INTO Cards (cardId, headerId, cardType, orderIndex, title, userId, approved) VALUES (1, 1, 2, 0, 'Steps', 1, 1)");
    await addItem(1, "Original published content", 1);
  });

  async function addItem(itemId, contentText, approved) {
    await pool.query("INSERT INTO Items (itemId, cardId, orderIndex, indentation, iconType, contentText, contentUrl, contentLabel, contentMode, internal, inline, sourceId, learnMoreUrl, approved) VALUES (?, 1, ?, 0, 1, ?, '', '', 0, 0, 0, 0, '', ?)", [itemId, itemId, contentText, approved]);
  }

  async function addDraft() {
    await pool.query("INSERT INTO Temp_Cards (tempCardId, tempCardType, tempTitle, tempOrderIndex, tempUserId) VALUES (1, 0, 'Revised steps', 1, 2)");
  }

  async function snapshot() {
    const state = {};
    for (const table of tables) {
      const [rows] = await pool.query(`SELECT * FROM \`${table}\``);
      state[table] = rows;
    }
    return state;
  }

  async function historyCounts() {
    const [cards] = await pool.query("SELECT COUNT(*) AS count FROM History_Cards");
    const [items] = await pool.query("SELECT COUNT(*) AS count FROM History_Items");
    return {cards: cards[0].count, items: items[0].count};
  }

  function draftItem(contentText) {
    return {
      indentation: 0, iconType: 1, contentText, contentUrl: "", contentLabel: "",
      contentMode: 0, internal: 0, inline: 0, sourceId: 0, learnMoreUrl: "", altText: ""
    };
  }

  async function saveDraft(title, contentText) {
    return updateCard(1, 2, title, [draftItem(contentText)], 2);
  }

  async function runInLockOrder(firstOperation, secondOperation) {
    const originalGetConnection = pool.getConnection;
    let unlockFirst;
    let firstLocked;
    let secondStarted;
    const locked = new Promise(resolve => { firstLocked = resolve; });
    const started = new Promise(resolve => { secondStarted = resolve; });
    const resume = new Promise(resolve => { unlockFirst = resolve; });
    let connectionCount = 0;
    let secondThreadId;
    let first;
    let second;
    let operationError;
    let observingLockWait = false;

    async function withTimeout(promise, message) {
      let timer;
      try {
        return await Promise.race([
          promise,
          new Promise((resolve, reject) => {
            timer = setTimeout(() => reject(new Error(message)), 5000);
          })
        ]);
      } finally {
        clearTimeout(timer);
      }
    }

    function completedBeforeBarrier(operation, message) {
      return operation.then(() => { throw new Error(message); });
    }

    pool.getConnection = async function () {
      const connection = await originalGetConnection.call(pool);
      const position = ++connectionCount;
      return {
        beginTransaction: connection.beginTransaction.bind(connection),
        commit: connection.commit.bind(connection),
        rollback: connection.rollback.bind(connection),
        release: connection.release.bind(connection),
        destroy: connection.destroy.bind(connection),
        async query(sql, params) {
          if (sql.includes("FROM Cards") && sql.includes("FOR UPDATE")) {
            if (position === 1) {
              const result = await connection.query(sql, params);
              firstLocked();
              await resume;
              return result;
            }
            secondThreadId = connection.connection.threadId;
            secondStarted();
          }
          return connection.query(sql, params);
        }
      };
    };

    try {
      first = Promise.resolve().then(firstOperation);
      const firstFinished = completedBeforeBarrier(first, "First operation finished without reaching its card lock");
      await withTimeout(Promise.race([locked, firstFinished]), "First operation did not reach its card lock");
      second = Promise.resolve().then(secondOperation);
      const secondFinished = completedBeforeBarrier(second, "Second operation finished before waiting for the card lock");
      await withTimeout(Promise.race([started, firstFinished, secondFinished]), "Second operation did not request its card lock");
      // Observe the database wait before allowing the first operation to finish.
      const observeLockWait = async () => {
        observingLockWait = true;
        while (observingLockWait) {
          const [rows] = await admin.query(lockWaitSql, [secondThreadId]);
          if (rows.length) {
            return;
          }
          if (mariaDb) {
            // Allow MariaDB's cached lock views to refresh before checking again.
            await new Promise(resolve => setTimeout(resolve, 150));
          }
        }
      };
      await withTimeout(
        Promise.race([observeLockWait(), firstFinished, secondFinished]),
        "The second operation did not wait for the first Cards row lock"
      );
      unlockFirst();
      const results = await withTimeout(Promise.all([first, second]), "Card operations did not finish after releasing the lock");
      assert.deepEqual(results, [{cardId: 1}, {cardId: 1}]);
    } catch (error) {
      operationError = error;
    } finally {
      observingLockWait = false;
      unlockFirst();
      try {
        await withTimeout(Promise.allSettled([first, second].filter(Boolean)), "Card operations did not finish during cleanup");
      } catch (cleanupError) {
        if (!operationError) {
          operationError = cleanupError;
        }
      } finally {
        pool.getConnection = originalGetConnection;
      }
    }
    if (operationError) {
      throw operationError;
    }
  }

  it("publishes the complete saved draft when save holds the card lock first", async () => {
    await addDraft();
    await addItem(2, "Older draft content", 0);

    await runInLockOrder(
      () => saveDraft("Newest draft", "Newest draft content"),
      () => publishCard(1)
    );

    const state = await snapshot();
    assert.equal(state.Cards[0].title, "Newest draft");
    assert.equal(state.Temp_Cards.length, 0);
    assert.deepEqual(state.Items.map(item => [item.contentText, item.approved]), [["Newest draft content", 1]]);
    assert.deepEqual(state.History_Items.map(item => item.contentText), ["Newest draft content"]);
    assert.deepEqual(await historyCounts(), {cards: 1, items: 1});
  });

  it("keeps a later save pending when publish holds the card lock first", async () => {
    await addDraft();
    await addItem(2, "Draft being published", 0);

    await runInLockOrder(
      () => publishCard(1),
      () => saveDraft("Later draft", "Later draft content")
    );

    const state = await snapshot();
    assert.equal(state.Cards[0].title, "Revised steps");
    assert.equal(state.Temp_Cards[0].tempTitle, "Later draft");
    assert.deepEqual(state.Items.map(item => [item.contentText, item.approved]), [
      ["Draft being published", 1], ["Later draft content", 0]
    ]);
    assert.deepEqual(state.History_Items.map(item => item.contentText), ["Draft being published"]);
    assert.deepEqual(await historyCounts(), {cards: 1, items: 1});
  });

  it("rolls back draft metadata and item deletion when saving replacement items fails", async () => {
    await addDraft();
    await addItem(2, "Existing draft content", 0);
    await pool.query("ALTER TABLE Items MODIFY contentText VARCHAR(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL");
    const original = await snapshot();

    try {
      await assert.rejects(saveDraft("Failed replacement", longText), /Data too long for column 'contentText'/);
      assert.deepEqual(await snapshot(), original);
    } finally {
      await pool.query("ALTER TABLE Items MODIFY contentText MEDIUMTEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL");
    }
  });

  it("rolls back a failed history write and publishes the intact draft after migration", async () => {
    await pool.query("INSERT INTO History_Cards (historyId, cardId, headerId, cardType, title, removed) VALUES (1, 1, 1, 2, 'Steps', 0)");
    await pool.query("INSERT INTO History_Items (parentId, itemId, cardId, orderIndex, indentation, iconType, contentText, contentUrl, contentLabel, contentMode, internal, inline, sourceId) SELECT 1, itemId, cardId, orderIndex, indentation, iconType, contentText, contentUrl, contentLabel, contentMode, internal, inline, sourceId FROM Items");
    await addDraft();
    await addItem(2, "Short draft item", 0);
    await addItem(3, longText, 0);
    await pool.query("ALTER TABLE History_Items MODIFY contentText VARCHAR(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL");
    const original = await snapshot();

    await assert.rejects(publishCard(1), /Data too long for column 'contentText'/);
    assert.deepEqual(await snapshot(), original);

    const migration = fs.readFileSync(path.join(__dirname, "../services/database/manual-migration-widen-history-item-content.sql"), "utf8");
    await pool.query(migration);
    await pool.query(migration);
    assert.deepEqual(await snapshot(), original);
    assert.deepEqual(await publishCard(1), {cardId: 1});

    const [items] = await pool.query("SELECT contentText, approved FROM Items ORDER BY itemId");
    assert.deepEqual(items.map(item => item.contentText), ["Short draft item", longText]);
    assert.ok(items.every(item => item.approved === 1));
    const [history] = await pool.query("SELECT contentText FROM History_Items ORDER BY itemId");
    assert.deepEqual(history.map(item => item.contentText), ["Original published content", "Short draft item", longText]);
    assert.deepEqual(await historyCounts(), {cards: 2, items: 3});
  });

  it("leaves content and history unchanged when publishing the same card again", async () => {
    await addDraft();
    await addItem(2, "Replacement content", 0);
    await publishCard(1);
    const published = await snapshot();

    assert.deepEqual(await publishCard(1), {cardId: 1});
    assert.deepEqual(await snapshot(), published);
    assert.deepEqual(await historyCounts(), {cards: 1, items: 1});
  });

  it("serializes concurrent publish retries without losing content or duplicating history", async () => {
    await addDraft();
    await addItem(2, longText, 0);

    const results = await Promise.all([publishCard(1), publishCard(1), publishCard(1)]);
    assert.deepEqual(results, [{cardId: 1}, {cardId: 1}, {cardId: 1}]);
    const [items] = await pool.query("SELECT contentText, approved FROM Items");
    assert.equal(items.length, 1);
    assert.equal(items[0].contentText, longText);
    assert.equal(items[0].approved, 1);
    assert.deepEqual(await historyCounts(), {cards: 1, items: 1});
  });

  it("publishes metadata-only drafts while preserving the existing items", async () => {
    await addDraft();
    assert.deepEqual(await publishCard(1), {cardId: 1});

    const [cards] = await pool.query("SELECT title, cardType, orderIndex, userId FROM Cards WHERE cardId = 1");
    assert.deepEqual(Object.assign({}, cards[0]), {title: "Revised steps", cardType: 0, orderIndex: 1, userId: 2});
    const [items] = await pool.query("SELECT contentText, approved FROM Items");
    assert.equal(items.length, 1);
    assert.equal(items[0].contentText, "Original published content");
    assert.equal(items[0].approved, 1);
    assert.deepEqual(await historyCounts(), {cards: 1, items: 1});
  });

  it("publishes a new card and promotes its pending items", async () => {
    await pool.query("UPDATE Cards SET approved = 0 WHERE cardId = 1");
    await pool.query("UPDATE Items SET approved = 0 WHERE cardId = 1");
    assert.deepEqual(await publishCard(1), {cardId: 1});

    const state = await snapshot();
    assert.equal(state.Cards[0].approved, 1);
    assert.equal(state.Items[0].approved, 1);
    assert.equal(state.Items[0].contentText, "Original published content");
    assert.deepEqual(await historyCounts(), {cards: 1, items: 1});
  });

  it("keeps the published card and draft intact on a duplicate-title conflict", async () => {
    await addDraft();
    await addItem(2, "Replacement content", 0);
    await pool.query("INSERT INTO Cards (cardId, headerId, cardType, orderIndex, title, userId, approved) VALUES (2, 1, 0, 1, 'Revised steps', 1, 1)");
    const original = await snapshot();

    assert.deepEqual(await publishCard(1), {error: 2});
    assert.deepEqual(await snapshot(), original);
  });

  it("returns a missing-card error without changing any rows", async () => {
    const original = await snapshot();

    assert.deepEqual(await publishCard(999), {error: 1});
    assert.deepEqual(await snapshot(), original);
  });
});
