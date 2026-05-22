-- Manual migration: add altText columns to Items and History_Items if missing.
-- Safe to run multiple times.
--
-- Usage examples:
--   mysql -u <user> -p <database_name> < services/database/manual-migration-add-altText-to-items.sql
--   docker compose exec db mysql -u root -p<password> <database_name> < /path/in/container/manual-migration-add-altText-to-items.sql

START TRANSACTION;

-- Add Items.altText only if it does not exist
SET @items_alt_exists := (
  SELECT COUNT(*)
  FROM INFORMATION_SCHEMA.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE()
    AND TABLE_NAME = 'Items'
    AND COLUMN_NAME = 'altText'
);

SET @sql_items := IF(
  @items_alt_exists = 0,
  'ALTER TABLE `Items` ADD COLUMN `altText` VARCHAR(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '''' AFTER `learnMoreUrl`;',
  'SELECT ''Items.altText already exists - skipping'' AS message;'
);

PREPARE stmt_items FROM @sql_items;
EXECUTE stmt_items;
DEALLOCATE PREPARE stmt_items;

-- Add History_Items.altText only if it does not exist
SET @history_items_alt_exists := (
  SELECT COUNT(*)
  FROM INFORMATION_SCHEMA.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE()
    AND TABLE_NAME = 'History_Items'
    AND COLUMN_NAME = 'altText'
);

SET @sql_history_items := IF(
  @history_items_alt_exists = 0,
  'ALTER TABLE `History_Items` ADD COLUMN `altText` VARCHAR(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '''' AFTER `contentLabel`;',
  'SELECT ''History_Items.altText already exists - skipping'' AS message;'
);

PREPARE stmt_history_items FROM @sql_history_items;
EXECUTE stmt_history_items;
DEALLOCATE PREPARE stmt_history_items;

COMMIT;
