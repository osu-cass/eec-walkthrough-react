exports.up = async function(knex) {
  const missing = [];

  for (const table of ["Items", "History_Items"]) {
    if (!await knex.schema.hasTable(table)) {
      throw new Error(`Missing table ${table}; initialize or restore the database before migrating`);
    }

    const [columns] = await knex.raw(
      "SELECT DATA_TYPE, CHARACTER_MAXIMUM_LENGTH, COLLATION_NAME, IS_NULLABLE, COLUMN_DEFAULT " +
      "FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND COLUMN_NAME = ?",
      [table, "altText"]
    );
    if (!columns.length) {
      missing.push(table);
      continue;
    }

    const column = columns[0];
    if (column.DATA_TYPE !== "varchar" || Number(column.CHARACTER_MAXIMUM_LENGTH) !== 1000 ||
        column.COLLATION_NAME !== "utf8mb4_unicode_ci" || column.IS_NULLABLE !== "NO" ||
        (column.COLUMN_DEFAULT !== "" && column.COLUMN_DEFAULT !== "''")) {
      throw new Error(`Unexpected definition for ${table}.altText; expected varchar(1000), utf8mb4_unicode_ci, NOT NULL DEFAULT ''`);
    }
  }

  // MariaDB DDL commits immediately. Check each column so a partially applied run can resume.
  for (const table of missing) {
    await knex.raw(
      "ALTER TABLE ?? ADD COLUMN ?? VARCHAR(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT ''",
      [table, "altText"]
    );
  }
};

exports.down = async function() {
  throw new Error("This migration adopts existing altText columns; create a new corrective migration instead of dropping them");
};
