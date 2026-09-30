const assert = require("node:assert/strict");
const {randomBytes} = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const {after, before, beforeEach, describe, it} = require("node:test");
const mysql = require("mysql2/promise");
const getSecret = require("../services/utils/getSecret");

// Run only against a disposable server with CREATE/DROP DATABASE privileges.
// RUN_CARD_PUBLISH_DB_TESTS=1 node --test tests/cardPublish.integration.test.js
describe("card publishing with MariaDB/MySQL", {
  skip: process.env.RUN_CARD_PUBLISH_DB_TESTS !== "1"
}, () => {
  const database = `eec_card_publish_test_${process.pid}_${randomBytes(4).toString("hex")}`;
  const tables = ["Pages", "Headers", "Cards", "Temp_Cards", "Items", "History_Cards", "History_Items"];
  const longText = `<p>${"Rich text draft content. ".repeat(100)}</p>`;
  let admin;
  let pool;
  let publishCard;

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
    ({publishCard} = require(process.env.CARD_PUBLISH_MODEL_PATH || "../models/cards"));
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
