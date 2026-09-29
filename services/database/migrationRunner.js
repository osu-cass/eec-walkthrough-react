const knex = require("knex");
const config = require("./knexfile");

async function migrateLatest() {
  const database = knex(config);
  try {
    const [batch, migrations] = await database.migrate.latest();
    if (migrations.length) {
      console.log(`Applied migration batch ${batch}: ${migrations.join(", ")}`);
    } else {
      console.log("Database migrations are up to date");
    }
  } finally {
    await database.destroy();
  }
}

async function runCommand(command, name) {
  if (command === "migrate") {
    await migrateLatest();
    return;
  }
  if (command !== "status" && command !== "make") {
    throw new Error("Usage: migrationRunner.js migrate|status|make <name>");
  }
  if (command === "make" && (!name || !/^[a-zA-Z0-9_]+$/.test(name))) {
    throw new Error("Provide a migration name using letters, numbers, and underscores");
  }

  const database = knex(config);
  try {
    if (command === "make") {
      const filename = await database.migrate.make(name);
      console.log(`Created migration ${filename}`);
    } else {
      const [completed, pending] = await database.migrate.list();
      console.log(`Completed migrations: ${completed.length}`);
      completed.forEach((migration) => console.log(`  ${migration.name}`));
      console.log(`Pending migrations: ${pending.length}`);
      pending.forEach((migration) => console.log(`  ${migration.file}`));
    }
  } finally {
    await database.destroy();
  }
}

if (require.main === module) {
  runCommand(process.argv[2], process.argv[3]).catch((error) => {
    console.error("Database migration command failed:", error.message);
    process.exitCode = 1;
  });
}

module.exports = {migrateLatest};
