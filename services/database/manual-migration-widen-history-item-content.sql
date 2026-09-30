-- Manual migration: allow history to store the same rich text as Items.
-- Run against each existing database before deploying the card publish fix.
-- Safe to run multiple times; existing rows are preserved.
-- mysql -u <user> -p <database_name> < services/database/manual-migration-widen-history-item-content.sql

SET @history_content_type := (
  SELECT DATA_TYPE
  FROM INFORMATION_SCHEMA.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE()
    AND TABLE_NAME = 'History_Items'
    AND COLUMN_NAME = 'contentText'
);

SET @sql_history_content := IF(
  @history_content_type IN ('mediumtext', 'longtext'),
  'SELECT ''History_Items.contentText already supports long rich text - skipping'' AS message;',
  'ALTER TABLE `History_Items` MODIFY COLUMN `contentText` MEDIUMTEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL;'
);

PREPARE stmt_history_content FROM @sql_history_content;
EXECUTE stmt_history_content;
DEALLOCATE PREPARE stmt_history_content;
