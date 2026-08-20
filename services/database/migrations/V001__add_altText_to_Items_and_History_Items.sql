-- Add altText for image accessibility on content items and their history rows.
ALTER TABLE `Items`
  ADD COLUMN IF NOT EXISTS `altText` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '';

ALTER TABLE `History_Items`
  ADD COLUMN IF NOT EXISTS `altText` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '';
