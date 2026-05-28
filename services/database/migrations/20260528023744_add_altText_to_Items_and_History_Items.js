// File: 20260528023744_add_altText_to_Items_and_History_Items.js
// Description: Migration to add an altText column to the Items and History_Items tables.

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = async function(knex) {
  // Idempotent migration to add an altText column to the Items table.
  const hasItemsAltText = await knex.schema.hasColumn("Items", "altText");
  if (!hasItemsAltText) {
    await knex.schema.alterTable("Items", (table) => {
      table
        .specificType(
          "altText",
          "VARCHAR(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci"
        )
        .notNullable()
        .defaultTo("")
        .after("learnMoreUrl");
    });
  }

  // Idempotent migration to add an altText column to the History_Items table.
  const hasHistoryItemsAltText = await knex.schema.hasColumn("History_Items", "altText");
  if (!hasHistoryItemsAltText) {
    await knex.schema.alterTable("History_Items", (table) => {
      table
        .specificType(
          "altText",
          "VARCHAR(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci"
        )
        .notNullable()
        .defaultTo("")
        .after("contentLabel");
    });
  }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  // Idempotent rollback to drop the altText column from the Items table.
  const hasItemsAltText = await knex.schema.hasColumn("Items", "altText");
  if (hasItemsAltText) {
    await knex.schema.alterTable("Items", (table) => {
      table.dropColumn("altText");
    });
  }

  // Idempotent rollback to drop the altText column from the History_Items table.
  const hasHistoryItemsAltText = await knex.schema.hasColumn("History_Items", "altText");
  if (hasHistoryItemsAltText) {
    await knex.schema.alterTable("History_Items", (table) => {
      table.dropColumn("altText");
    });
  }
};
