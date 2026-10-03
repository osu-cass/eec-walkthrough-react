const assert = require("node:assert/strict");
const {spawn, spawnSync} = require("node:child_process");
const {createHash, randomBytes} = require("node:crypto");
const fs = require("node:fs");
const net = require("node:net");
const path = require("node:path");
const {test} = require("node:test");
const mysql = require("mysql2/promise");

const root = path.resolve(__dirname, "..");
const migration = "20260929000000_add_alt_text.js";
const tables = ["Items", "History_Items"];
const prefix = process.env.MYSQL_MIGRATION_TEST_DB_PREFIX;
const created = [];
const createdUsers = [];

function commandEnvironment(database) {
  const env = Object.assign({}, process.env, {MYSQL_DB_NAME: database});
  for (const key of ["MYSQL_HOST", "MYSQL_PORT", "MYSQL_USER", "MYSQL_PASSWORD", "MYSQL_DB_NAME"]) {
    env[`${key}_FILE`] = "";
  }
  return env;
}

function runCommand(database, command, overrides) {
  const result = spawnSync(process.execPath, ["services/database/migrationRunner.js", command], {
    cwd: root,
    env: Object.assign(commandEnvironment(database), overrides),
    encoding: "utf8",
    timeout: 30000
  });
  assert.ifError(result.error);
  return {status: result.status, output: result.stdout + result.stderr};
}

async function snapshot(database) {
  const snapshots = {};
  for (const table of tables) {
    const [rows] = await database.query(`SELECT * FROM \`${table}\` ORDER BY 1`);
    rows.forEach((row) => delete row.altText);
    snapshots[table] = createHash("sha256")
      .update(JSON.stringify(rows))
      .digest("hex");
  }
  return snapshots;
}

async function verifyColumns(database) {
  for (const table of tables) {
    const [columns] = await database.query(
      "SELECT DATA_TYPE, CHARACTER_MAXIMUM_LENGTH, COLLATION_NAME, IS_NULLABLE, COLUMN_DEFAULT " +
      "FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND COLUMN_NAME = 'altText'",
      [table]
    );
    assert.equal(columns.length, 1, `${table}.altText exists`);
    const column = columns[0];
    assert.equal(column.DATA_TYPE, "varchar");
    assert.equal(Number(column.CHARACTER_MAXIMUM_LENGTH), 1000);
    assert.equal(column.COLLATION_NAME, "utf8mb4_unicode_ci");
    assert.equal(column.IS_NULLABLE, "NO");
    assert.ok(column.COLUMN_DEFAULT === "" || column.COLUMN_DEFAULT === "''");
  }
}

function freePort() {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.on("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const port = server.address().port;
      server.close(() => resolve(port));
    });
  });
}

function isListening(port) {
  return new Promise((resolve) => {
    const socket = net.connect({port, host: "127.0.0.1"});
    socket.on("connect", () => {
      socket.destroy();
      resolve(true);
    });
    socket.on("error", () => resolve(false));
  });
}

async function checkStartup(schema, expectSuccess, overrides, npmStart) {
  const apiPort = await freePort();
  const filePort = await freePort();
  const env = Object.assign(commandEnvironment(schema), {
    NODE_ENV: "production",
    API_PORT: String(apiPort),
    FILE_PORT: String(filePort),
    JWT_SECRET_KEY: randomBytes(32).toString("hex"),
    JWT_SECRET_KEY_FILE: "",
    SENTRY_DSN: "",
    SENTRY_DSN_FILE: "",
    SENTRY_CLIENT_DSN: "",
    SENTRY_CLIENT_DSN_FILE: ""
  }, overrides);
  const child = spawn(npmStart ? "npm" : process.execPath, npmStart ? ["start"] : ["app.js"], {
    cwd: root,
    env,
    detached: process.platform !== "win32",
    stdio: ["ignore", "pipe", "pipe"]
  });
  let output = "";
  let exited = false;
  let exitCode;
  let spawnError;
  let observedListener = false;
  child.stdout.on("data", (data) => { output += data; });
  child.stderr.on("data", (data) => { output += data; });
  child.on("error", (error) => { spawnError = error; exited = true; });
  child.on("exit", (code) => { exitCode = code; exited = true; });
  const deadline = Date.now() + 15000;
  try {
    while (!exited && Date.now() < deadline) {
      const listeners = await Promise.all([isListening(apiPort), isListening(filePort)]);
      observedListener = observedListener || listeners.some(Boolean);
      if (expectSuccess && listeners.every(Boolean)) {
        break;
      }
      await new Promise((resolve) => setTimeout(resolve, 25));
    }
    assert.ifError(spawnError);
    if (expectSuccess) {
      assert.equal(exited, false, output);
      assert.match(output, /Applied migration batch/);
      assert.ok(output.indexOf("Applied migration batch") < output.indexOf("File server is listening"), output);
      assert.ok(output.indexOf("Applied migration batch") < output.indexOf("API server is listening"), output);
      assert.equal((await fetch(`http://127.0.0.1:${filePort}/runtime-config.js`)).status, 200);
      assert.equal((await fetch(`http://127.0.0.1:${apiPort}/api/migration-test-missing`)).status, 404);
    } else {
      assert.equal(exitCode, 1, output);
      assert.match(output, /Database migrations failed; server startup stopped/);
      assert.equal(observedListener, false, "No listener accepts connections after migration failure");
      assert.doesNotMatch(output, /server is listening/);
      assert.deepEqual(await Promise.all([isListening(apiPort), isListening(filePort)]), [false, false]);
    }
  } finally {
    if (!exited) {
      const closed = new Promise((resolve) => child.once("exit", resolve));
      process.kill(process.platform === "win32" ? child.pid : -child.pid, "SIGTERM");
      await closed;
    }
  }
}

test("versioned migrations on fresh and existing MariaDB databases", async (suite) => {
  assert.match(prefix || "", /^eec_migrations_test_[a-z0-9_]{1,25}$/,
    "Set MYSQL_MIGRATION_TEST_DB_PREFIX to a unique eec_migrations_test_ name on a disposable database server");
  for (const key of ["MYSQL_HOST", "MYSQL_USER", "MYSQL_PASSWORD"]) {
    assert.ok(process.env[key], `Set ${key} explicitly for the disposable database server`);
  }
  const connection = {
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT || 3306),
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    multipleStatements: true
  };
  const admin = await mysql.createConnection(connection);
  suite.after(async () => {
    for (const username of createdUsers) {
      await admin.query("DROP USER ?@'%'", [username]);
    }
    for (const name of created) {
      await admin.query("DROP DATABASE ??", [name]);
    }
    await admin.end();
  });
  const dump = fs.readFileSync(path.join(root, "services/database/db-init-new.sql"), "utf8");

  async function fixture(name) {
    const schema = `${prefix}_${name}`;
    await admin.query("CREATE DATABASE ?? CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci", [schema]);
    created.push(schema);
    const database = await mysql.createConnection(Object.assign({}, connection, {database: schema}));
    suite.after(() => database.end());
    await database.query(dump);
    return {schema, database};
  }

  for (const scenario of ["fresh", "legacy", "partial", "existing"]) {
    await suite.test(scenario, async () => {
      const {schema, database} = await fixture(scenario);
      if (scenario === "legacy" || scenario === "partial") {
        await database.query("ALTER TABLE History_Items DROP COLUMN altText");
      }
      if (scenario === "legacy") {
        await database.query("ALTER TABLE Items DROP COLUMN altText");
      }
      if (scenario === "partial" || scenario === "existing") {
        await database.query("UPDATE Items SET altText = 'Existing descriptive text' ORDER BY itemId LIMIT 1");
      }
      if (scenario === "existing") {
        await database.query("UPDATE History_Items SET altText = 'Existing history description' ORDER BY historyId LIMIT 1");
      }
      const before = await snapshot(database);
      const pending = runCommand(schema, "status");
      assert.equal(pending.status, 0, pending.output);
      assert.match(pending.output, /Pending migrations: 1/);
      assert.ok(pending.output.includes(migration));
      const first = runCommand(schema, "migrate");
      assert.equal(first.status, 0, first.output);
      await verifyColumns(database);
      assert.deepEqual(await snapshot(database), before, "All existing row values stay unchanged");
      const [history] = await database.query("SELECT name, batch FROM knex_migrations");
      assert.deepEqual(history.map((row) => ({name: row.name, batch: row.batch})), [{name: migration, batch: 1}]);
      for (const table of tables) {
        const [rows] = await database.query(`SELECT altText FROM \`${table}\` WHERE altText <> ''`);
        let expected = [];
        if (table === "Items" && (scenario === "partial" || scenario === "existing")) {
          expected = ["Existing descriptive text"];
        }
        if (table === "History_Items" && scenario === "existing") {
          expected = ["Existing history description"];
        }
        assert.deepEqual(rows.map((row) => row.altText), expected, "No label backfill or existing altText loss");
      }
      const second = runCommand(schema, "migrate");
      assert.equal(second.status, 0, second.output);
      assert.match(second.output, /up to date/);
      const [historyAfter] = await database.query("SELECT name, batch FROM knex_migrations");
      assert.deepEqual(historyAfter, history, "Second run records no extra migrations");
      const status = runCommand(schema, "status");
      assert.equal(status.status, 0, status.output);
      assert.match(status.output, /Completed migrations: 1/);
      assert.match(status.output, /Pending migrations: 0/);
    });
  }

  for (const scenario of ["missing_table", "invalid_column"]) {
    await suite.test(scenario, async () => {
      const {schema, database} = await fixture(scenario);
      await database.query("ALTER TABLE Items DROP COLUMN altText");
      if (scenario === "missing_table") {
        await database.query("RENAME TABLE History_Items TO Saved_History_Items");
      } else {
        await database.query("ALTER TABLE History_Items MODIFY altText VARCHAR(10) NULL DEFAULT NULL");
      }
      const failed = runCommand(schema, "migrate");
      assert.equal(failed.status, 1, failed.output);
      assert.match(failed.output, scenario === "missing_table" ? /Missing table History_Items/ : /Unexpected definition/);
      const [history] = await database.query("SELECT name FROM knex_migrations");
      assert.equal(history.length, 0, "Failed migration is not recorded");
      const [columns] = await database.query("SHOW COLUMNS FROM Items LIKE 'altText'");
      assert.equal(columns.length, 0, "Preflight prevents a partial schema change");
      await checkStartup(schema, false, {}, scenario === "invalid_column");
      if (scenario === "missing_table") {
        await checkStartup(schema, false, {SENTRY_DSN: "http://validation@127.0.0.1:1/1"});
      }
      if (scenario === "missing_table") {
        await database.query("RENAME TABLE Saved_History_Items TO History_Items");
      } else {
        await database.query("ALTER TABLE History_Items DROP COLUMN altText");
      }
      const retry = runCommand(schema, "migrate");
      assert.equal(retry.status, 0, retry.output);
      await verifyColumns(database);
    });
  }

  await suite.test("production startup migrates before opening both listeners", async () => {
    const {schema, database} = await fixture("startup");
    for (const table of tables) {
      await database.query(`ALTER TABLE \`${table}\` DROP COLUMN altText`);
    }
    const before = await snapshot(database);
    await checkStartup(schema, true);
    await verifyColumns(database);
    assert.deepEqual(await snapshot(database), before);
  });

  await suite.test("insufficient privileges stop startup even when altText already exists", async () => {
    const {schema, database} = await fixture("privileges");
    const username = `eec_mig_${randomBytes(6).toString("hex")}`;
    const password = randomBytes(32).toString("hex");
    await admin.query("CREATE USER ?@'%' IDENTIFIED BY ?", [username, password]);
    createdUsers.push(username);
    await admin.query("GRANT SELECT, INSERT, UPDATE, DELETE ON ??.* TO ?@'%'", [schema, username]);
    const overrides = {MYSQL_USER: username, MYSQL_PASSWORD: password};
    const failed = runCommand(schema, "migrate", overrides);
    assert.equal(failed.status, 1, failed.output);
    assert.match(failed.output, /denied/i);
    await checkStartup(schema, false, overrides, true);
    const [metadata] = await database.query("SHOW TABLES LIKE 'knex_migrations'");
    assert.equal(metadata.length, 0, "Migration metadata cannot be created without DDL privileges");
  });
});
