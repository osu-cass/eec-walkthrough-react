-- phpMyAdmin SQL Dump
-- version 4.9.4
-- https://www.phpmyadmin.net/
--
-- Host: engr-db.engr.oregonstate.edu:3307
-- Generation Time: Jul 07, 2020 at 05:50 PM
-- Server version: 10.3.13-MariaDB-log
-- PHP Version: 7.4.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `eec_walkthrough`
--

-- --------------------------------------------------------

--
-- Table structure for table `Icons`
--

CREATE TABLE `Icons` (
  `iconType` int(10) UNSIGNED NOT NULL,
  `typeKeyword` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `typeName` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `groupIndex` int(10) UNSIGNED NOT NULL,
  `color` varchar(7) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Icons`
--

INSERT INTO `Icons` (`iconType`, `typeKeyword`, `typeName`, `groupIndex`, `color`) VALUES
(1, 'Pros', 'plus', 1, '#000000'),
(2, 'Cons', 'minus', 1, '#000000'),
(3, 'Rules of Thumb', 'thumbs-up', 1, '#007BFF'),
(4, 'Caveats', 'skull', 1, '#000000'),
(5, 'Combustion', 'fire', 0, '#E81224'),
(6, 'Electrical', 'bolt', 0, '#FFC83D'),
(7, 'Best Practices', 'trophy', 1, '#FFC83D'),
(8, 'Tips', 'hand-point-right', 1, '#FFC83D'),
(9, 'Blueprint', 'map', 1, '#000000'),
(10, 'Opportunity Flag', 'flag', 1, '#E81224'),
(11, 'Opportunity', 'check-square', 1, '#000000'),
(12, 'Suggested Action', 'square-full', 1, '#000000'),
(13, 'Opportunity Description', 'angle-right', 1, '#000000'),
(14, 'Question', 'question', 1, '#000000'),
(15, 'Data to Collect', 'pencil-alt', 1, '#000000'),
(16, 'File', 'file', 1, '#007BFF'),
(17, 'Document', 'copy', 3, '#000000'),
(18, 'Internal Link', 'info', 0, '#000000'),
(19, 'External Link', 'link', 0, '#000000'),
(20, 'Figure', 'chart-area', 2, '#32C332'),
(21, 'Analysis Tool', 'list', 1, '#000000'),
(22, 'Slideshow', 'play', 3, '#32C332'),
(23, 'Video', 'video-camera', 3, '#007BFF'),
(24, 'Informational Website', 'book', 3, '#E81224'),
(25, 'Vendor Website', 'truck', 3, '#000000'),
(26, 'Bullet Point', 'circle', 1, '#000000'),
(27, 'Assessment Equipment', 'ruler-vertical', 1, '#FFC83D');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Icons`
--
ALTER TABLE `Icons`
  ADD PRIMARY KEY (`iconType`),
  ADD UNIQUE KEY `typeKeyword` (`typeKeyword`),
  ADD UNIQUE KEY `typeName` (`typeName`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Icons`
--
ALTER TABLE `Icons`
  MODIFY `iconType` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
