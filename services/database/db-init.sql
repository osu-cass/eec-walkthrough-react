-- phpMyAdmin SQL Dump
-- version 4.9.4
-- https://www.phpmyadmin.net/
--
-- Host: engr-db.engr.oregonstate.edu:3307
-- Generation Time: Oct 25, 2020 at 09:00 PM
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
-- Table structure for table `Cards`
--

CREATE TABLE `Cards` (
  `cardId` int(10) UNSIGNED NOT NULL,
  `headerId` int(10) UNSIGNED NOT NULL,
  `cardType` tinyint(3) UNSIGNED NOT NULL,
  `orderIndex` int(10) UNSIGNED NOT NULL,
  `title` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` int(10) UNSIGNED NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `approved` tinyint(3) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Cards`
--

INSERT INTO `Cards` (`cardId`, `headerId`, `cardType`, `orderIndex`, `title`, `userId`, `created`, `approved`) VALUES
(3, 1, 0, 29, 'Figures, Charts, and Tables', 42, '2020-06-17 17:09:17', 1),
(8, 2, 0, 8, 'Reduce Compressed Air Pressure\r\n', 51, '2020-07-02 17:49:40', 1),
(9, 1, 0, 3, 'Pros', 42, '2020-06-02 20:58:31', 1),
(13, 1, 0, 9, 'Cons', 42, '2020-05-23 22:20:20', 1),
(16, 1, 0, 13, 'Caveats', 42, '2020-05-23 22:27:44', 1),
(17, 1, 0, 16, 'Best Practices', 42, '2020-05-23 22:28:37', 1),
(18, 1, 0, 17, 'Rules of Thumb', 42, '2020-05-23 22:31:49', 1),
(19, 1, 0, 18, 'Tips', 42, '2020-05-23 22:33:25', 1),
(27, 2, 0, 27, 'Reduce Compressed Air Required', 51, '2020-07-07 16:17:13', 1),
(29, 1, 0, 19, 'Additional In Depth Site Resources', 51, '2020-07-01 22:33:14', 1),
(72, 1, 1, 72, 'Gallery: Industrial Air Compressors, Dryers, Receiver Tanks and Compressed Air Applications', 51, '2020-07-01 20:56:20', 1),
(75, 1, 0, 75, 'U.S. Department of Energy Tip Sheets', 42, '2020-06-30 06:38:25', 1),
(76, 1, 0, 76, 'General Off Site Resource Links', 51, '2020-06-29 20:51:39', 1),
(77, 2, 0, 77, 'Improve Compressor Efficiency', 58, '2020-08-17 18:00:21', 1),
(81, 29, 0, 81, 'Pros', 51, '2020-07-01 18:14:32', 1),
(82, 30, 0, 82, 'Use More Efficient Pump Control', 51, '2020-07-01 18:19:29', 0),
(83, 30, 0, 83, 'Reduce Flow Required', 51, '2020-07-01 21:21:37', 0),
(84, 30, 0, 84, 'Reduce Head Required', 51, '2020-07-01 21:28:45', 0),
(85, 30, 0, 85, 'Improve Pump Efficiency', 57, '2020-07-01 21:42:32', 0),
(86, 2, 0, 86, 'Reduce Air Compressor Run Time', 51, '2020-07-01 22:24:57', 1),
(87, 2, 0, 87, 'Other Opportunities', 51, '2020-07-01 22:28:10', 1),
(88, 31, 0, 88, 'Pros', 56, '2020-07-02 19:58:20', 1),
(89, 31, 0, 89, 'Cons', 56, '2020-07-02 20:01:03', 1),
(90, 31, 0, 90, 'Caveats', 56, '2020-07-02 20:01:49', 1),
(91, 31, 0, 91, 'Rules of Thumb', 56, '2020-07-02 20:08:42', 1),
(92, 31, 0, 92, 'Tips', 56, '2020-07-02 20:10:02', 1),
(93, 31, 0, 93, 'Best Practices', 56, '2020-07-02 20:12:06', 1),
(94, 31, 0, 94, 'Charts, Tables, Figures', 56, '2020-07-02 20:14:45', 0),
(95, 31, 0, 95, 'Standard Data to Collect', 51, '2020-07-03 17:57:24', 1),
(96, 31, 0, 96, 'Data Collection Equipment', 51, '2020-07-02 20:22:45', 1),
(97, 31, 0, 97, 'Data Collection Guides', 56, '2020-07-02 20:44:49', 1),
(98, 31, 0, 98, 'Analysis Tools', 56, '2020-07-02 20:52:07', 1),
(99, 31, 0, 99, 'In Depth Site Resources', 51, '2020-07-03 17:55:50', 1),
(100, 31, 0, 100, 'Off Site Resource Links', 56, '2020-07-02 21:38:17', 1),
(101, 32, 0, 101, 'Improve Boiler Combustion Efficiency ', 56, '2020-07-02 21:53:03', 1),
(102, 32, 0, 102, 'Reduce Run Time', 56, '2020-07-02 21:56:36', 1),
(103, 32, 0, 103, 'Optimize Blowdown', 56, '2020-07-02 21:58:49', 1),
(104, 32, 0, 104, 'Minimize Draft Fan Energy ', 56, '2020-07-02 22:01:14', 1),
(105, 32, 0, 105, 'Improve the Condensate System', 56, '2020-07-02 22:03:34', 1),
(106, 32, 0, 106, 'Reduce Heat Loss', 51, '2020-07-02 22:11:55', 1),
(107, 28, 0, 107, 'Motor and Transmission Efficiency', 56, '2020-07-02 22:52:49', 1),
(108, 33, 0, 108, 'Rules of Thumb', 56, '2020-07-02 23:14:11', 1),
(109, 33, 0, 109, 'Tips', 56, '2020-07-02 23:14:41', 0),
(110, 33, 0, 110, 'Best Practices', 56, '2020-07-02 23:15:09', 0),
(111, 33, 0, 111, 'Charts, Tables, Figures', 51, '2020-07-02 23:15:52', 0),
(112, 33, 0, 112, 'Standard Data to Collect', 51, '2020-07-02 23:17:15', 0),
(113, 33, 0, 113, 'Data Collection Equipment', 51, '2020-07-02 23:21:12', 0),
(114, 33, 0, 114, 'Data Collection Guides', 56, '2020-07-02 23:29:16', 0),
(115, 33, 0, 115, 'Analysis Tools', 56, '2020-07-02 23:33:30', 0),
(116, 33, 0, 116, 'In Depth Site Resources', 56, '2020-07-02 23:44:26', 0),
(117, 33, 0, 117, 'Off Site Resource Links', 56, '2020-07-02 23:47:53', 0),
(118, 28, 0, 118, 'Motor Controls', 56, '2020-07-03 00:08:01', 1),
(119, 28, 0, 119, 'Turn of Motors (Consider Load Shedding)', 51, '2020-07-07 23:38:14', 1),
(120, 28, 0, 120, 'Power Quality', 56, '2020-07-03 00:19:36', 1),
(122, 29, 0, 122, 'Cons', 55, '2020-07-07 17:54:57', 1),
(123, 29, 0, 123, 'General Off Site Resource Links', 55, '2020-07-07 18:00:00', 1),
(124, 29, 0, 124, 'U.S. Department of Energy Tip Sheets', 55, '2020-07-07 20:31:56', 1),
(125, 29, 10, 125, 'Figures, Charts, and Tables', 51, '2020-07-07 20:33:57', 0),
(126, 37, 0, 126, 'Common Technologies Used in Wastewater (covered elsewhere in this guide)', 51, '2020-07-07 20:57:07', 1),
(129, 40, 0, 129, 'Heat Exchangers', 60, '2020-07-10 18:20:49', 0),
(130, 40, 0, 130, 'Insulation', 55, '2020-07-10 18:36:22', 0),
(131, 40, 0, 131, 'Cooling Towers', 55, '2020-07-10 18:45:42', 0),
(133, 41, 0, 133, 'Pros', 58, '2020-07-20 21:20:19', 0),
(134, 41, 0, 134, 'Cons', 58, '2020-07-20 21:20:35', 0),
(135, 41, 0, 135, 'Caveats', 58, '2020-07-20 21:21:07', 0),
(136, 41, 0, 136, 'Rules of Thumb', 58, '2020-07-20 21:21:25', 0),
(137, 41, 0, 137, 'Tips', 58, '2020-07-20 21:21:56', 0),
(138, 41, 0, 138, 'Best Practices', 58, '2020-07-20 21:22:23', 0),
(139, 41, 0, 139, 'Charts, Tables, Figures', 58, '2020-07-20 22:09:40', 0),
(140, 41, 0, 140, 'Standard Data to Collect', 58, '2020-07-20 22:10:28', 0),
(141, 41, 0, 141, 'Data Collection Equipment', 58, '2020-07-20 22:11:29', 0),
(142, 41, 0, 142, 'Analysis Tools', 58, '2020-07-20 22:12:33', 0),
(143, 41, 0, 143, 'In Depth Site Resources', 58, '2020-07-20 22:13:43', 0),
(144, 41, 0, 144, 'Off Site Resource Links', 58, '2020-07-20 22:14:24', 0),
(154, 47, 10, 2, 'Review/Analyze Pre-Assessment Package Information', 51, '2020-09-03 20:04:30', 1),
(155, 47, 10, 1, 'Identify Potential Sites to Work With', 51, '2020-08-06 23:50:17', 1),
(156, 47, 10, 4, 'Hold an Initial Remote Assessment Meeting with the Client', 51, '2020-09-03 20:04:47', 1),
(157, 47, 10, 5, 'Develop a Preliminary Energy Balance', 51, '2020-09-03 20:05:07', 1),
(158, 47, 10, 6, 'Develop a List of Potential Opportunities to Study', 51, '2020-09-03 20:11:20', 1),
(161, 47, 10, 3, 'Preliminary Research', 51, '2020-09-03 20:04:11', 1),
(162, 47, 10, 162, 'Arrange a Client Guided Remote Tour by Phone.', 51, '2020-09-03 20:05:27', 1),
(163, 38, 0, 163, 'Efficient Aeration', 51, '2020-08-06 22:27:59', 1),
(164, 36, 0, 164, 'Additional in Depth Site Resources', 51, '2020-08-06 22:32:54', 1),
(165, 47, 0, 165, 'Next Step?......', 51, '2020-08-06 22:36:00', 1),
(166, 48, 0, 166, 'Opportunity Flags', 62, '2020-08-10 21:04:25', 0),
(168, 50, 0, 168, 'Pros', 62, '2020-08-12 21:45:00', 0),
(169, 50, 0, 169, 'Caveats', 62, '2020-08-12 21:56:54', 0),
(170, 50, 0, 170, 'Opportunity Flag', 62, '2020-08-12 22:02:27', 0),
(171, 50, 0, 171, 'Data to Collect', 62, '2020-08-12 23:11:45', 0),
(172, 50, 0, 172, 'How to estimate facility efficiency (D-score)', 62, '2020-08-12 23:14:40', 0),
(173, 50, 0, 173, 'Methodologies for creating new layouts', 62, '2020-08-14 21:00:05', 0),
(174, 50, 0, 174, 'Systematic Layout Planning (SLP)', 62, '2020-08-14 21:43:28', 0),
(175, 38, 0, 175, 'Anaerobic Digestion', 51, '2020-08-17 18:11:37', 1),
(176, 38, 0, 176, 'Other Opportunities', 51, '2020-08-17 18:16:44', 1),
(178, 29, 0, 178, 'Best Practices', 51, '2020-08-20 22:33:59', 1),
(179, 29, 0, 179, 'Standard Data to Collect', 55, '2020-08-18 21:05:04', 0),
(180, 29, 0, 180, 'Rules of Thumb', 51, '2020-08-18 21:05:56', 1),
(182, 29, 0, 182, 'Caveats', 55, '2020-08-18 21:38:09', 1),
(183, 29, 0, 183, 'Gallery: Pump Types etc.', 55, '2020-08-19 21:46:41', 0),
(184, 50, 0, 184, 'How to calculate layout efficiency savings', 62, '2020-08-24 19:51:09', 0),
(185, 50, 0, 185, 'Determining cost savings', 62, '2020-08-24 20:10:02', 0),
(186, 54, 0, 2, 'Pros', 52, '2020-08-26 16:04:13', 1),
(187, 54, 0, 3, 'Cons', 52, '2020-08-26 16:13:30', 1),
(189, 54, 0, 6, 'General Off Site Resource Links', 52, '2020-08-26 16:44:39', 1),
(190, 54, 0, 5, 'Standard Data to Collect', 51, '2020-08-26 16:57:31', 1),
(192, 55, 0, 192, 'Install Capacitors', 51, '2020-08-26 17:36:17', 1),
(193, 54, 0, 1, 'What is power factor?', 51, '2020-08-26 17:43:30', 1),
(194, 56, 10, 194, 'Industrial Assessment Center and Department of Energy', 57, '2020-08-27 00:24:17', 0),
(195, 56, 10, 195, 'Other Government Tools', 57, '2020-08-27 00:29:22', 0),
(196, 57, 0, 196, 'Tips and Guides', 57, '2020-08-27 00:38:47', 0),
(197, 57, 10, 197, 'Tools', 57, '2020-08-27 00:40:11', 0),
(199, 48, 0, 199, 'Pros', 62, '2020-09-02 22:05:59', 0),
(200, 48, 0, 200, 'Cons', 62, '2020-09-02 22:11:35', 0),
(201, 48, 0, 201, 'Modeling Simple Queuing Systems', 62, '2020-09-02 22:53:29', 0),
(202, 60, 10, 202, 'History Reports', 58, '2020-09-04 19:38:18', 0),
(203, 60, 10, 203, 'How to Complete a Publish Request', 58, '2020-09-04 20:44:09', 0),
(204, 59, 10, 2, 'Creating Pages', 58, '2020-09-07 23:37:09', 0),
(205, 59, 10, 1, 'Tips', 58, '2020-09-07 23:40:51', 0),
(206, 59, 10, 206, 'Adding Images', 42, '2020-09-07 23:43:10', 0),
(207, 60, 10, 207, 'How to Review and Approve Content for Publishing', 58, '2020-09-08 17:49:46', 0),
(208, 59, 10, 208, 'Adding References', 58, '2020-09-08 18:55:48', 0),
(211, 63, 2, 1, 'Ventilation Improvements', 52, '2020-09-09 19:06:46', 0),
(212, 63, 2, 3, 'Reduce Material Losses', 52, '2020-09-09 19:36:40', 0),
(213, 63, 0, 4, 'Increase welding efficiency', 52, '2020-09-09 21:27:30', 0),
(214, 63, 2, 2, 'Increase Spray/Paint Booth Efficiency', 52, '2020-09-10 17:01:56', 0),
(215, 63, 2, 215, 'Reduce Compressed Air Leaks', 52, '2020-09-10 20:11:02', 0),
(222, 62, 0, 222, 'Additional in Depth Site Resources', 52, '2020-09-15 19:40:23', 0),
(223, 64, 10, 223, 'Measuring Electricity Use', 54, '2020-09-17 19:39:07', 0),
(224, 64, 10, 224, 'Electric Rate Schedules', 54, '2020-09-17 19:57:57', 0),
(225, 64, 10, 225, 'Common Electricity Charges', 54, '2020-09-17 19:59:38', 0),
(228, 65, 10, 228, 'Measuring Natural Gas Use', 54, '2020-09-23 21:45:05', 0),
(229, 65, 10, 229, 'Natural Gas Rate Schedules', 54, '2020-09-23 21:49:22', 0),
(230, 65, 10, 230, 'Common Natural Gas Charges', 54, '2020-09-23 21:55:01', 0),
(231, 66, 10, 231, 'Measuring Water Use', 54, '2020-09-23 22:00:24', 0),
(232, 66, 10, 232, 'Water Rate Schedules', 54, '2020-09-23 22:22:08', 0),
(233, 66, 10, 233, 'Common Water Charges', 54, '2020-09-23 22:26:50', 0),
(236, 70, 10, 236, 'Consolidate Meters', 54, '2020-10-14 20:45:46', 0);

-- --------------------------------------------------------

--
-- Table structure for table `Categories`
--

CREATE TABLE `Categories` (
  `categoryId` int(10) UNSIGNED NOT NULL,
  `singleName` varchar(1000) NOT NULL,
  `pluralName` varchar(1000) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `internal` int(10) UNSIGNED NOT NULL,
  `userId` int(10) UNSIGNED NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Categories`
--

INSERT INTO `Categories` (`categoryId`, `singleName`, `pluralName`, `description`, `internal`, `userId`, `created`) VALUES
(0, 'Instruction', 'Instructions', 'Instructions for navigating and using this web application.', 0, 42, '2020-08-31 21:58:22'),
(1, 'Industry', 'Industries', 'An overview of common industries followed by typical related subjects and opportunities.', 0, 51, '2020-07-18 03:11:32'),
(2, 'Technology', 'Technologies', 'Standard technologies used throughout industry', 0, 51, '2020-07-18 03:11:32'),
(3, 'Process', 'Processes', 'Common industrial processes that use a combination of standard technologies', 0, 51, '2020-07-18 03:11:32'),
(4, 'Productivity', 'Productivity', 'Common approaches to improving industrial site productivity', 0, 51, '2020-07-18 03:11:32'),
(5, 'Assessment', 'Assessments', 'Standard recommended approaches for performing industrial assessments.', 0, 51, '2020-07-18 03:11:32'),
(7, 'Utility', 'Utilities', 'An introduction to utility billing structures, resource use analysis, and opportunities to reduce costs.', 0, 42, '2020-08-05 23:59:34');

-- --------------------------------------------------------

--
-- Table structure for table `Filters`
--

CREATE TABLE `Filters` (
  `filterId` int(10) UNSIGNED NOT NULL,
  `viewId` int(10) UNSIGNED NOT NULL,
  `headerId` int(10) UNSIGNED NOT NULL,
  `iconId` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Filters`
--

INSERT INTO `Filters` (`filterId`, `viewId`, `headerId`, `iconId`) VALUES
(102, 10, 1, 21),
(103, 10, 1, 27),
(104, 10, 1, 7),
(105, 10, 1, 9),
(106, 10, 1, 26),
(107, 10, 1, 4),
(108, 10, 1, 5),
(109, 10, 1, 2),
(110, 10, 1, 15),
(111, 10, 1, 17),
(112, 10, 1, 28),
(113, 10, 1, 6),
(114, 10, 1, 19),
(115, 10, 1, 20),
(116, 10, 1, 16),
(117, 10, 1, 24),
(118, 10, 1, 18),
(119, 10, 1, 11),
(120, 10, 1, 13),
(121, 10, 1, 10),
(122, 10, 1, 1),
(123, 10, 1, 14),
(124, 10, 1, 3),
(125, 10, 1, 22),
(126, 10, 1, 12),
(127, 10, 1, 8),
(128, 10, 1, 25),
(129, 10, 1, 23),
(130, 10, 2, 0),
(131, 11, 1, 21),
(132, 11, 1, 27),
(133, 11, 1, 7),
(134, 11, 1, 9),
(135, 11, 1, 26),
(136, 11, 1, 4),
(137, 11, 1, 5),
(138, 11, 1, 2),
(139, 11, 1, 15),
(140, 11, 1, 17),
(141, 11, 1, 28),
(142, 11, 1, 6),
(143, 11, 1, 19),
(144, 11, 1, 20),
(145, 11, 1, 16),
(146, 11, 1, 24),
(147, 11, 1, 18),
(148, 11, 1, 11),
(149, 11, 1, 13),
(150, 11, 1, 10),
(151, 11, 1, 1),
(152, 11, 1, 14),
(153, 11, 1, 3),
(154, 11, 1, 22),
(155, 11, 1, 12),
(156, 11, 1, 8),
(157, 11, 1, 25),
(158, 11, 1, 23),
(159, 11, 2, 0);

-- --------------------------------------------------------

--
-- Table structure for table `Headers`
--

CREATE TABLE `Headers` (
  `headerId` int(10) UNSIGNED NOT NULL,
  `pageId` int(10) UNSIGNED NOT NULL,
  `orderIndex` int(10) UNSIGNED NOT NULL,
  `title` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `internal` tinyint(3) UNSIGNED NOT NULL,
  `userId` int(10) UNSIGNED NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `approved` tinyint(3) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Headers`
--

INSERT INTO `Headers` (`headerId`, `pageId`, `orderIndex`, `title`, `internal`, `userId`, `created`, `approved`) VALUES
(1, 2, 1, 'Compressed Air Overview', 0, 51, '2020-07-01 18:19:56', 1),
(2, 2, 2, 'Compressed Air Opportunities to Consider', 0, 51, '2020-05-22 21:22:38', 1),
(28, 44, 33, 'Motor Opportunities to Consider', 0, 56, '2020-06-29 23:07:40', 1),
(29, 45, 29, 'Pumps Overview', 0, 51, '2020-08-20 00:24:59', 1),
(30, 45, 30, 'Pumping Opportunities to Consider', 0, 51, '2020-07-01 18:15:04', 0),
(31, 46, 1, 'Boilers and Steam Overview', 0, 56, '2020-07-02 19:43:04', 1),
(32, 46, 3, 'Boiler and Steam System Opportunities to Consider', 0, 56, '2020-07-02 21:40:38', 1),
(33, 44, 28, 'Motors Overview', 0, 56, '2020-07-02 23:12:01', 1),
(34, 47, 1, 'Thermal Systems Overview', 0, 58, '2020-07-03 03:41:29', 0),
(36, 50, 1, 'Wastewater Overview', 0, 51, '2020-08-20 00:22:34', 1),
(37, 50, 3, 'Wastewater Technologies to Consider', 0, 51, '2020-08-20 00:23:09', 1),
(38, 50, 2, 'Wastewater Opportunities to Consider', 0, 51, '2020-08-20 00:22:49', 1),
(40, 47, 2, 'Thermal Systems Opportunities to Consider', 0, 58, '2020-07-10 17:59:49', 0),
(41, 48, 41, 'Refrigeration Overview', 0, 58, '2020-07-20 21:19:45', 0),
(47, 54, 47, 'Assessment Steps', 1, 51, '2020-08-05 19:56:29', 1),
(48, 58, 48, 'Bottleneck Reduction', 0, 62, '2020-08-10 20:58:11', 0),
(50, 57, 50, 'Change Department Layout', 0, 62, '2020-08-12 21:43:08', 0),
(54, 61, 1, 'Power Factor Correction Overview', 0, 52, '2020-10-13 20:18:20', 1),
(55, 61, 2, 'Power Factor Correction Opportunities to Consider', 0, 52, '2020-10-13 20:18:20', 1),
(56, 62, 56, 'Self Assessment Tools', 1, 57, '2020-08-27 00:21:35', 0),
(57, 62, 57, 'Resources', 1, 57, '2020-08-27 00:29:42', 0),
(59, 65, 59, 'Creating Content', 1, 58, '2020-09-04 18:57:48', 0),
(60, 65, 60, 'Reviewing Content', 1, 58, '2020-09-04 19:23:27', 0),
(62, 69, 62, 'Metals Manufacturing Overview', 0, 52, '2020-09-09 18:44:04', 0),
(63, 69, 63, 'Metals Manufacturing Opportunities to Consider', 0, 52, '2020-09-09 18:44:28', 0),
(64, 49, 1, 'Electricity', 1, 54, '2020-09-17 19:22:43', 0),
(65, 49, 2, 'Natural Gas', 1, 54, '2020-09-17 20:04:02', 0),
(66, 49, 3, 'Water', 1, 54, '2020-09-17 20:08:44', 0),
(69, 49, 4, 'Analysis', 1, 54, '2020-10-14 18:28:03', 0),
(70, 49, 5, 'Electricity Opportunities to Consider', 1, 54, '2020-10-14 20:41:48', 0);

-- --------------------------------------------------------

--
-- Table structure for table `History_Cards`
--

CREATE TABLE `History_Cards` (
  `historyId` int(10) UNSIGNED NOT NULL,
  `cardId` int(10) UNSIGNED NOT NULL,
  `headerId` int(10) UNSIGNED NOT NULL,
  `cardType` tinyint(3) UNSIGNED NOT NULL,
  `title` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `removed` tinyint(3) UNSIGNED NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `History_Cards`
--

INSERT INTO `History_Cards` (`historyId`, `cardId`, `headerId`, `cardType`, `title`, `removed`, `created`) VALUES
(1, 3, 1, 0, 'Figures, Charts, and Tables', 0, '2020-06-17 17:09:17'),
(2, 8, 2, 0, 'Reduce Compressed Air Pressure\r\n', 0, '2020-07-02 17:49:40'),
(3, 9, 1, 0, 'Pros', 0, '2020-06-02 20:58:31'),
(4, 13, 1, 0, 'Cons', 0, '2020-05-23 22:20:20'),
(5, 16, 1, 0, 'Caveats', 0, '2020-05-23 22:27:44'),
(6, 17, 1, 0, 'Best Practices', 0, '2020-05-23 22:28:37'),
(7, 18, 1, 0, 'Rules of Thumb', 0, '2020-05-23 22:31:49'),
(8, 19, 1, 0, 'Tips', 0, '2020-05-23 22:33:25'),
(9, 27, 2, 0, 'Reduce Compressed Air Required', 0, '2020-07-07 16:17:13'),
(10, 29, 1, 0, 'Additional In Depth Site Resources', 0, '2020-07-01 22:33:14'),
(11, 30, 3, 0, 'Test', 0, '2020-06-23 05:53:07'),
(12, 47, 16, 0, 'Engines', 0, '2020-06-30 06:58:38'),
(13, 49, 18, 0, 'Environment', 0, '2020-06-30 06:11:14'),
(14, 66, 4, 10, 'Facilisis volutpat est velit egestas.', 0, '2020-06-23 09:22:49'),
(15, 67, 16, 1, 'More Airplanes', 0, '2020-06-23 09:14:09'),
(16, 68, 27, 11, 'Plywood Images', 0, '2020-07-23 09:53:26'),
(17, 69, 27, 0, 'Plywood Info', 0, '2020-06-23 09:20:59'),
(18, 72, 1, 1, 'Gallery: Industrial Air Compressors, Dryers, Receiver Tanks and Compressed Air Applications', 0, '2020-07-01 20:56:20'),
(19, 74, 3, 0, 'U.S.DOE Energy Tip Sheets', 0, '2020-06-27 20:45:48'),
(20, 75, 1, 0, 'U.S. Department of Energy Tip Sheets', 0, '2020-06-30 06:38:25'),
(21, 76, 1, 0, 'General Off Site Resource Links', 0, '2020-06-29 20:51:39'),
(22, 77, 2, 0, 'Improve Compressor Efficiency', 0, '2020-07-03 00:20:51'),
(23, 80, 16, 0, 'New Card', 0, '2020-06-30 20:59:15'),
(24, 86, 2, 0, 'Reduce Air Compressor Run Time', 0, '2020-07-01 22:24:57'),
(25, 87, 2, 0, 'Other Opportunities', 0, '2020-07-01 22:28:10'),
(26, 88, 31, 0, 'Pros', 0, '2020-07-02 19:58:20'),
(27, 89, 31, 0, 'Cons', 0, '2020-07-02 20:01:03'),
(28, 90, 31, 0, 'Caveats', 0, '2020-07-02 20:01:49'),
(29, 91, 31, 0, 'Rules of Thumb', 0, '2020-07-02 20:08:42'),
(30, 92, 31, 0, 'Tips', 0, '2020-07-02 20:10:02'),
(31, 93, 31, 0, 'Best Practices', 0, '2020-07-02 20:12:06'),
(32, 95, 31, 0, 'Standard Data to Collect', 0, '2020-07-03 17:57:24'),
(33, 96, 31, 0, 'Data Collection Equipment', 0, '2020-07-02 20:22:45'),
(34, 97, 31, 0, 'Data Collection Guides', 0, '2020-07-02 20:44:49'),
(35, 98, 31, 0, 'Analysis Tools', 0, '2020-07-02 20:52:07'),
(36, 99, 31, 0, 'In Depth Site Resources', 0, '2020-07-03 17:55:50'),
(37, 100, 31, 0, 'Off Site Resource Links', 0, '2020-07-02 21:38:17'),
(38, 101, 32, 0, 'Improve Boiler Combustion Efficiency ', 0, '2020-07-02 21:53:03'),
(39, 102, 32, 0, 'Reduce Run Time', 0, '2020-07-02 21:56:36'),
(40, 103, 32, 0, 'Optimize Blowdown', 0, '2020-07-02 21:58:49'),
(41, 104, 32, 0, 'Minimize Draft Fan Energy ', 0, '2020-07-02 22:01:14'),
(42, 105, 32, 0, 'Improve the Condensate System', 0, '2020-07-02 22:03:34'),
(43, 106, 32, 0, 'Reduce Heat Loss', 0, '2020-07-02 22:11:55'),
(44, 107, 28, 0, 'Motor and Transmission Efficiency', 0, '2020-07-02 22:52:49'),
(45, 108, 33, 0, 'Rules of Thumb', 0, '2020-07-02 23:14:11'),
(46, 118, 28, 0, 'Motor Controls', 0, '2020-07-03 00:08:01'),
(47, 119, 28, 0, 'Turn of Motors (Consider Load Shedding)', 0, '2020-07-07 23:38:14'),
(48, 120, 28, 0, 'Power Quality', 0, '2020-07-03 00:19:36'),
(49, 121, 18, 10, 'A new internal card', 0, '2020-07-07 02:04:39'),
(50, 128, 18, 10, 'eoowerwerwer', 0, '2020-07-07 21:23:36'),
(51, 145, 42, 0, '1', 0, '2020-07-28 20:16:13'),
(52, 147, 42, 0, '3', 0, '2020-07-28 08:34:31'),
(53, 148, 45, 0, '1', 0, '2020-07-28 08:35:42'),
(54, 151, 46, 10, 'Cras facilisis hendrerit dui', 0, '2020-08-04 10:56:28'),
(55, 152, 46, 0, 'A bunch of images', 0, '2020-08-04 11:00:16'),
(56, 153, 46, 0, 'New Checkboxes!', 0, '2020-08-06 10:42:16'),
(57, 154, 47, 10, 'Review/Analyze Pre Assessment Package Information', 0, '2020-08-06 23:30:30'),
(58, 155, 47, 10, 'Identify Potential Sites to Work With', 0, '2020-08-06 23:50:17'),
(59, 156, 47, 10, 'Hold an Initial Remote Assessment Meeting with the Client', 0, '2020-08-06 23:34:20'),
(60, 157, 47, 10, 'Develop a Preliminary Energy Balance', 0, '2020-08-05 22:40:35'),
(61, 158, 47, 10, 'Develop a List of Potential Opportunities to Study', 0, '2020-08-06 23:09:57'),
(62, 161, 47, 10, 'Preliminary Research', 0, '2020-08-06 23:47:20'),
(63, 162, 47, 10, 'Arrange a Client Guided Remote Tour by Phone.', 0, '2020-08-06 22:36:25'),
(65, 167, 49, 0, 'Card Version #1', 0, '2020-09-01 09:17:01'),
(66, 167, 49, 0, 'Card Version #2', 0, '2020-09-02 09:20:06'),
(67, 167, 49, 0, 'Card Version #3', 0, '2020-09-03 10:12:48'),
(68, 151, 46, 10, 'Cras facilisis duiui @ 1', 0, '2020-08-11 10:31:27'),
(69, 152, 46, 1, 'A bunch of images @ 1', 0, '2020-08-11 10:31:46'),
(70, 154, 47, 10, 'Review/Analyze Pre-Assessment Package Information', 0, '2020-08-13 19:46:49'),
(71, 154, 47, 10, 'Review/Analyze Pre-Assessment Package Information', 0, '2020-08-13 19:49:33'),
(72, 157, 47, 10, 'Develop a Preliminary Energy Balance', 0, '2020-08-13 19:54:17'),
(73, 157, 47, 10, 'Develop a Preliminary Energy Balance', 0, '2020-08-13 19:54:45'),
(74, 77, 2, 0, 'Improve Compressor Efficiency', 0, '2020-08-17 18:00:21'),
(75, 156, 47, 10, 'Hold an Initial Remote Assessment Meeting with the Client', 0, '2020-08-17 21:29:23'),
(76, 156, 47, 10, 'Hold an Initial Remote Assessment Meeting with the Client', 0, '2020-08-17 21:30:23'),
(77, 164, 36, 0, 'Additional in Depth Site Resources', 0, '2020-08-20 00:22:40'),
(78, 163, 38, 0, 'Efficient Aeration', 0, '2020-08-20 00:22:54'),
(79, 175, 38, 0, 'Anaerobic Digestion', 0, '2020-08-20 00:22:59'),
(80, 176, 38, 0, 'Other Opportunities', 0, '2020-08-20 00:23:03'),
(81, 126, 37, 0, 'Common Technologies Used in Wastewater (covered elsewhere in this guide)', 0, '2020-08-20 00:23:14'),
(82, 81, 29, 0, 'Pros', 0, '2020-08-20 00:24:53'),
(83, 122, 29, 0, 'Cons', 0, '2020-08-20 00:25:06'),
(84, 123, 29, 0, 'General Off Site Resource Links', 0, '2020-08-20 00:25:13'),
(85, 124, 29, 0, 'U.S. Department of Energy Tip Sheets', 0, '2020-08-20 00:25:37'),
(86, 178, 29, 0, 'Best Practices', 0, '2020-08-20 01:00:54'),
(87, 180, 29, 0, 'Rules of Thumb', 0, '2020-08-20 01:01:02'),
(88, 182, 29, 0, 'Caveats', 0, '2020-08-20 01:03:50'),
(89, 178, 29, 0, 'Best Practices', 0, '2020-08-20 22:33:59'),
(90, 161, 47, 10, 'Preliminary Research', 0, '2020-09-03 20:04:11'),
(91, 154, 47, 10, 'Review/Analyze Pre-Assessment Package Information', 0, '2020-09-03 20:04:30'),
(92, 156, 47, 10, 'Hold an Initial Remote Assessment Meeting with the Client', 0, '2020-09-03 20:04:47'),
(93, 157, 47, 10, 'Develop a Preliminary Energy Balance', 0, '2020-09-03 20:05:07'),
(94, 162, 47, 10, 'Arrange a Client Guided Remote Tour by Phone.', 0, '2020-09-03 20:05:27'),
(95, 158, 47, 10, 'Develop a List of Potential Opportunities to Study', 0, '2020-09-03 20:11:20'),
(96, 165, 47, 0, 'Next Step?......', 0, '2020-09-03 20:11:43'),
(97, 227, 67, 0, 'Rows', 0, '2020-09-22 20:52:51'),
(98, 193, 54, 0, 'What is power factor?', 0, '2020-10-13 20:18:20'),
(99, 186, 54, 0, 'Pros', 0, '2020-10-13 20:18:20'),
(100, 187, 54, 0, 'Cons', 0, '2020-10-13 20:18:20'),
(101, 190, 54, 0, 'Standard Data to Collect', 0, '2020-10-13 20:18:20'),
(102, 189, 54, 0, 'General Off Site Resource Links', 0, '2020-10-13 20:18:20'),
(103, 192, 55, 0, 'Install Capacitors', 0, '2020-10-13 20:18:20');

-- --------------------------------------------------------

--
-- Table structure for table `History_Headers`
--

CREATE TABLE `History_Headers` (
  `historyId` int(10) UNSIGNED NOT NULL,
  `headerId` int(10) UNSIGNED NOT NULL,
  `pageId` int(10) UNSIGNED NOT NULL,
  `title` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `internal` tinyint(3) UNSIGNED NOT NULL,
  `removed` tinyint(3) UNSIGNED NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `History_Headers`
--

INSERT INTO `History_Headers` (`historyId`, `headerId`, `pageId`, `title`, `internal`, `removed`, `created`) VALUES
(1, 1, 2, 'Compressed Air Overview', 0, 0, '2020-07-01 18:19:56'),
(2, 2, 2, 'Compressed Air Opportunities to Consider', 0, 0, '2020-05-22 21:22:38'),
(3, 3, 1, 'Boilers', 0, 0, '2020-05-22 21:22:38'),
(4, 4, 3, 'Refrigeration', 0, 0, '2020-05-22 21:22:38'),
(5, 16, 25, 'Engine Info', 0, 0, '2020-06-16 09:03:41'),
(6, 17, 25, 'Turbulence', 0, 0, '2020-06-09 18:51:20'),
(7, 18, 25, 'Economics', 0, 0, '2020-06-09 18:56:36'),
(8, 27, 4, 'Plywood Images', 0, 0, '2020-06-23 09:18:19'),
(9, 28, 44, 'Motor Opportunities to Consider', 0, 0, '2020-06-29 23:07:40'),
(10, 31, 46, 'Boilers and Steam Overview', 0, 0, '2020-07-02 19:43:04'),
(11, 32, 46, 'Boiler and Steam System Opportunities to Consider', 0, 0, '2020-07-02 21:40:38'),
(12, 33, 44, 'Motors Overview', 0, 0, '2020-07-02 23:12:01'),
(13, 35, 25, 'Air Header Test', 0, 0, '2020-07-07 02:15:51'),
(14, 42, 27, 'A', 0, 0, '2020-07-28 08:31:16'),
(15, 43, 27, 'B', 0, 0, '2020-07-28 08:31:20'),
(16, 44, 27, 'C (published & edited)', 0, 0, '2020-07-28 08:31:46'),
(17, 46, 53, 'Simple Header', 0, 0, '2020-08-04 10:53:41'),
(18, 47, 54, 'Assessment Steps', 1, 0, '2020-08-05 19:56:29'),
(33, 49, 59, 'Header Version #1', 0, 0, '2020-09-01 09:16:55'),
(34, 49, 0, 'Header Version #2', 59, 0, '2020-09-02 09:20:03'),
(35, 49, 59, 'Header Version #3', 0, 0, '2020-09-03 10:12:50'),
(36, 46, 53, 'Simply a new Title @ 1', 0, 0, '2020-08-11 10:31:56'),
(37, 36, 50, 'Wastewater Overview', 0, 0, '2020-08-20 00:22:34'),
(38, 38, 50, 'Wastewater Opportunities to Consider', 0, 0, '2020-08-20 00:22:49'),
(39, 37, 50, 'Wastewater Technologies to Consider', 0, 0, '2020-08-20 00:23:09'),
(40, 29, 45, 'Pumps Overview', 0, 0, '2020-08-20 00:24:59'),
(41, 67, 70, 'New Header', 0, 0, '2020-09-22 20:53:26'),
(42, 54, 61, 'Power Factor Correction Overview', 0, 0, '2020-10-13 20:18:20'),
(43, 55, 61, 'Power Factor Correction Opportunities to Consider', 0, 0, '2020-10-13 20:18:20');

-- --------------------------------------------------------

--
-- Table structure for table `History_Items`
--

CREATE TABLE `History_Items` (
  `historyId` int(10) UNSIGNED NOT NULL,
  `parentId` int(10) UNSIGNED NOT NULL,
  `itemId` int(10) UNSIGNED NOT NULL,
  `cardId` int(10) UNSIGNED NOT NULL,
  `orderIndex` int(10) UNSIGNED NOT NULL,
  `indentation` int(10) UNSIGNED NOT NULL,
  `iconType` int(10) UNSIGNED NOT NULL,
  `contentText` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `contentUrl` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `contentLabel` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `contentMode` int(10) UNSIGNED NOT NULL,
  `internal` tinyint(3) UNSIGNED NOT NULL,
  `inline` tinyint(3) UNSIGNED NOT NULL,
  `sourceId` int(10) UNSIGNED NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `History_Items`
--

INSERT INTO `History_Items` (`historyId`, `parentId`, `itemId`, `cardId`, `orderIndex`, `indentation`, `iconType`, `contentText`, `contentUrl`, `contentLabel`, `contentMode`, `internal`, `inline`, `sourceId`, `created`) VALUES
(1, 1, 7, 3, 1, 0, 20, '', 'https://i.imgur.com/V0dkW5l.png', 'Screw compressor power vs output for various control strategies', 0, 0, 0, 0, '2020-06-17 17:09:09'),
(2, 3, 25, 9, 1, 0, 1, 'Versatile. Offers compact energy density. ', '', '', 0, 0, 0, 0, '2020-06-02 22:38:04'),
(3, 3, 26, 9, 1, 0, 1, 'Spark free for potentially explosive environments', '', '', 0, 0, 0, 0, '2020-06-10 03:40:29'),
(4, 5, 28, 16, 1, 0, 4, 'Take care to avoid potential dangerous air injection associated with directing compressed air flow directly onto skin', '', '', 0, 0, 0, 0, '2020-05-23 22:30:55'),
(5, 6, 29, 17, 1, 0, 7, 'Looped distribution systems can help maintain uniform pressure throughout a compressed air system.', '', '', 0, 0, 0, 0, '2020-05-23 22:30:57'),
(6, 6, 30, 17, 2, 0, 7, 'Well sized compressed air lines reduce pressure loss', '', '', 0, 0, 0, 0, '2020-05-23 22:30:58'),
(7, 6, 31, 17, 3, 0, 7, 'A well designed compressed air system should typically have a maximum 10 PSI pressure drop in delivering air to at any end-use in the system', '', '', 0, 0, 0, 0, '2020-05-23 22:31:00'),
(8, 4, 32, 13, 1, 0, 2, 'Extremely energy intensive. ', '', '', 0, 0, 0, 0, '2020-05-23 22:52:18'),
(9, 7, 33, 18, 1, 0, 3, 'Expect a 1% drop in compressor energy and cost per 2 PSI in compressor outlet pressure drop', '', '', 0, 0, 0, 0, '2020-07-18 00:08:08'),
(10, 7, 34, 18, 1, 0, 3, '85 PSI is the standard required minimum inlet pressure for most common industrial pneumatic equipment', '', '', 0, 0, 0, 0, '2020-07-18 00:08:07'),
(11, 7, 36, 18, 1, 0, 3, '80 to 90% of energy for compressed air is lost as heat', '', '', 0, 0, 0, 0, '2020-07-18 00:08:04'),
(12, 8, 37, 19, 1, 0, 8, 'Use a pressure gage with standard quick connects typically used in compressed air lines to diagnose line pressure drops', '', '', 0, 0, 0, 0, '2020-07-18 00:08:04'),
(13, 4, 43, 13, 1, 0, 2, 'Function provided can often be replace with significantly lower power approach.', '', '', 0, 0, 0, 0, '2020-06-09 19:50:02'),
(14, 3, 162, 9, 1, 0, 1, 'Can be used as an easy quick fix for many issues', '', '', 0, 0, 0, 0, '2020-06-22 19:18:35'),
(15, 3, 163, 9, 1, 0, 1, 'Familiar utility for industrial personnel', '', '', 0, 0, 0, 0, '2020-06-22 19:18:36'),
(16, 3, 164, 9, 1, 0, 1, 'A single mechanical energy input at the compressor can be distributed throughout a facility. ', '', '', 0, 0, 0, 0, '2020-06-22 19:18:36'),
(17, 7, 165, 18, 4, 0, 3, 'Over 5 HP of electrical power is required for each 1 HP of compressed air power', '', '', 0, 0, 0, 0, '2020-06-22 19:21:00'),
(18, 8, 166, 19, 1, 0, 8, 'Determine the leak load by checking compressor output when there is no productive air use', '', '', 0, 0, 0, 0, '2020-06-22 19:29:30'),
(19, 11, 197, 30, 1, 0, 20, '', 'https://www.hurstboiler.com/images2/series-300_shrink.png', 'Boiler Picture', 0, 0, 0, 0, '2020-06-23 05:53:07'),
(20, 11, 198, 30, 1, 0, 2, 'Lectus mauris ultrices eros in cursus.', '', '', 0, 0, 0, 0, '2020-06-23 05:53:07'),
(21, 11, 199, 30, 1, 0, 17, 'Hurst Series 300', 'https://www.hurstboiler.com/boilers/scotch_marine/series_300', 'Big boiler link', 1, 0, 0, 0, '2020-07-28 08:29:55'),
(22, 15, 245, 67, 1, 0, 20, '', 'https://image.shutterstock.com/image-photo/commercial-airplane-flying-above-clouds-600w-553131187.jpg', 'Sunset', 0, 0, 0, 0, '2020-06-23 09:14:37'),
(23, 15, 246, 67, 1, 0, 20, '', 'https://image.shutterstock.com/image-photo/white-passenger-plane-climbs-through-600w-523950889.jpg', 'Up', 0, 0, 0, 0, '2020-06-23 09:14:37'),
(24, 15, 247, 67, 1, 0, 20, '', 'https://image.shutterstock.com/image-vector/flat-airplane-illustration-view-flying-600w-443359132.jpg', 'Cartoon', 0, 0, 0, 0, '2020-06-23 09:14:37'),
(25, 15, 248, 67, 1, 0, 20, '', 'https://image.shutterstock.com/image-photo/beautiful-scenic-city-view-sunset-600w-766500919.jpg', 'Window Seat', 0, 0, 0, 0, '2020-06-23 09:14:37'),
(26, 17, 259, 69, 1, 0, 15, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', '', '', 0, 0, 0, 0, '2020-06-23 09:20:59'),
(27, 17, 263, 69, 1, 0, 11, 'Pretium lectus quam id leo in vitae turpis massa. Placerat vestibulum lectus mauris ultrices eros in cursus turpis.', '', '', 0, 0, 0, 0, '2020-06-23 09:21:00'),
(28, 19, 337, 74, 1, 0, 17, 'See steam system sheets', 'https://www.energy.gov/eere/amo/tip-sheets-system', 'U.S.DOE Energy Tip Sheets by System', 1, 0, 0, 0, '2020-07-28 21:07:52'),
(29, 19, 338, 74, 1, 0, 17, '.', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam15_benchmark.pdf', 'Benchmark the Fuel Cost of Steam Generation', 1, 0, 0, 0, '2020-07-28 20:35:02'),
(30, 19, 339, 74, 1, 0, 17, '.', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam7_surfaces.pdf', 'Clean Firetube Boiler Waterside Heat Transfer Surfaces', 1, 0, 0, 0, '2020-06-27 20:57:48'),
(31, 21, 383, 76, 1, 0, 17, 'This sourcebook is designed to provide compressed air system users with a reference that outlines opportunities for system performance improvements.', 'https://www.compressedairchallenge.org/data/sites/1/media/library/sourcebook/Improving_Compressed_Air-Sourcebook.pdf', 'Improving Compressed Air System Performance. A Sourcebook for Industry.  Third Edition. U.S.DOE', 1, 0, 0, 0, '2020-06-29 21:22:31'),
(32, 21, 384, 76, 1, 0, 17, 'MEASUR is open source software that consists of the following DOE legacy energy system assessment tools (updated): Pumping System Assessment Tool (PSAT), Process Heating Assessment and Survey Tool (PHAST), Fan System Assessment Tool (FSAT), Steam System Assessment Tool (SSAT)/ Steam System Modeler (SSMT), AIRMaster+ (Last accessed 12/2/2019)   ', 'https://www.energy.gov/eere/amo/measur', 'U.S. Department of Energy MEASUR analysis tool', 1, 0, 0, 0, '2020-06-29 20:55:45'),
(33, 21, 385, 76, 1, 0, 17, 'An informational page with analysis tools, case studies, tip sheets, and checklists', 'https://www.bpa.gov/EE/Sectors/Industrial/Pages/Compressed-Air.aspx', 'Bonneville Power Administration Compressed Air Page', 1, 0, 0, 0, '2020-06-29 20:55:45'),
(34, 13, 621, 49, 0, 0, 2, 'Uses a lot of fossil fuels', '', '', 0, 0, 0, 0, '2020-06-30 06:11:15'),
(35, 13, 622, 49, 0, 1, 4, 'Hurts birds', '', '', 0, 0, 0, 0, '2020-06-30 06:11:15'),
(36, 13, 623, 49, 0, 2, 5, 'Uses a lot of steel', '', '', 0, 0, 0, 0, '2020-06-30 06:11:15'),
(37, 20, 637, 75, 0, 0, 17, 'See compressed air tip sheets', 'https://www.energy.gov/eere/amo/tip-sheets-system', 'U.S.DOE Energy Tip Sheets by System', 1, 0, 0, 0, '2020-07-01 00:33:10'),
(38, 20, 638, 75, 0, 0, 17, '$empty', 'https://www.energy.gov/sites/prod/files/2014/05/f16/compressed_air11.pdf', 'Alternative Strategies for Low-Pressure End Uses', 1, 0, 0, 0, '2020-06-30 06:38:26'),
(39, 20, 639, 75, 0, 0, 17, '$empty', 'https://www.energy.gov/sites/prod/files/2014/05/f16/compressed_air4.pdf', 'Analyzing Your Compressed Air System', 1, 0, 0, 0, '2020-06-30 06:38:26'),
(40, 12, 667, 47, 0, 0, 5, 'Jet fuel is flammable', '', '', 0, 0, 0, 0, '2020-06-30 09:33:41'),
(41, 12, 668, 47, 0, 1, 4, 'Be careful', '', '', 0, 0, 0, 0, '2020-06-30 09:33:41'),
(42, 12, 669, 47, 0, 2, 20, '', 'https://blog.klm.com/assets/uploads/2018/12/Jet-engine-KLM-768x510.jpg', 'KLM Jet Engine', 0, 0, 0, 0, '2020-06-30 09:33:41'),
(43, 12, 670, 47, 0, 0, 24, 'Learn more about Jet Engines', 'https://en.wikipedia.org/wiki/Jet_engine', 'Wikipedia - Jet Engines', 1, 0, 0, 0, '2020-06-30 09:33:41'),
(44, 23, 687, 80, 0, 0, 15, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '', '', 0, 0, 0, 0, '2020-06-30 20:59:15'),
(45, 23, 688, 80, 0, 1, 13, 'Nulla suscipit enim aliquet turpis iaculis accumsan.', '', '', 0, 0, 0, 0, '2020-06-30 20:59:15'),
(46, 23, 689, 80, 0, 1, 13, 'Aliquam scelerisque tellus nec lectus blandit condimentum.', '', '', 0, 0, 0, 0, '2020-06-30 20:59:15'),
(47, 23, 690, 80, 0, 1, 13, 'Sed laoreet ligula eget accumsan auctor.', '', '', 0, 0, 0, 0, '2020-06-30 20:59:15'),
(48, 18, 779, 72, 0, 0, 20, '', 'https://live.staticflickr.com/65535/50066459491_bb3c3291c5_b.jpg', 'Dry sprinkler systems need compressed air', 0, 0, 0, 0, '2020-07-01 21:19:36'),
(49, 18, 780, 72, 0, 0, 20, '', 'https://live.staticflickr.com/65535/50065906203_65746ac38f_b.jpg', 'Blow off wand and hose', 0, 0, 0, 0, '2020-07-01 21:19:36'),
(50, 18, 781, 72, 0, 0, 20, '', 'https://live.staticflickr.com/65535/50065907458_f8a2a9a7e0_b.jpg', 'Air Motors used to mix paint can be replaced with explosion proof electric motors', 0, 0, 0, 0, '2020-07-01 21:19:36'),
(51, 18, 782, 72, 0, 0, 20, '', 'https://live.staticflickr.com/65535/50066721727_a6607851c0_b.jpg', 'Compressed Air Receiver Tank', 0, 0, 0, 0, '2020-07-01 21:19:36'),
(52, 18, 783, 72, 0, 0, 20, '', 'https://live.staticflickr.com/65535/50065907313_a2869ef070_b.jpg', 'Industrial Screw Compressor', 0, 0, 0, 0, '2020-07-01 21:19:36'),
(53, 18, 784, 72, 0, 0, 20, '', 'https://live.staticflickr.com/65535/50065907073_1a989d028d_b.jpg', 'Compressed Air Receiver Tamk', 0, 0, 0, 0, '2020-07-01 21:19:36'),
(54, 18, 785, 72, 0, 0, 20, '', 'https://live.staticflickr.com/65535/50065907213_978efa0976_b.jpg', 'Blow off wands with and without engineered nozzles', 0, 0, 0, 0, '2020-07-01 21:19:36'),
(55, 18, 786, 72, 0, 0, 20, '', 'https://live.staticflickr.com/65535/50066720932_da2c3b0b6c_b.jpg', 'Small reciprocating industrial air compressor', 0, 0, 0, 0, '2020-07-01 21:19:36'),
(56, 18, 787, 72, 0, 0, 20, '', 'https://live.staticflickr.com/65535/50065907503_d75eb615cf_b.jpg', 'Desiccant compressed air dryer ', 0, 0, 0, 0, '2020-07-01 21:19:36'),
(57, 18, 788, 72, 0, 0, 20, '', 'https://live.staticflickr.com/65535/50066722032_f62637039d_b.jpg', 'Compressed Air Receiver Tank', 0, 0, 0, 0, '2020-07-01 21:19:36'),
(58, 18, 789, 72, 0, 0, 20, '', 'https://live.staticflickr.com/65535/50065907438_e7f7d53ba4_b.jpg', 'Refrigerated compressed air dryer', 0, 0, 0, 0, '2020-07-01 21:19:36'),
(59, 24, 1101, 86, 0, 0, 11, 'Turn compressor(s) off when not needed - nights weekends etc	', '', '', 0, 0, 0, 0, '2020-07-01 22:24:57'),
(60, 24, 1102, 86, 0, 0, 11, 'Serve low volume around the clock  requirement with separate smaller system', '', '', 0, 0, 0, 0, '2020-07-01 22:24:57'),
(61, 25, 1103, 87, 0, 0, 11, 'Replace refrigerated compressed air dryer with more efficient refrigerated compressed air dryer', '', '', 0, 0, 0, 0, '2020-07-01 22:28:10'),
(62, 25, 1104, 87, 0, 0, 11, 'Capture heat rejected by air compressors', '', '', 0, 0, 0, 0, '2020-07-01 22:28:10'),
(63, 10, 1151, 29, 0, 0, 17, 'This guide focuses mainly on screw and reciprocating compressors. These are the most common types of compressors used in the northwest. Other types of compressors such as rotary vane, centrifugal, lobe and radial compressors are much less common and are only introduced in this guide.', 'https://drive.google.com/file/d/12Co0C6JBK5CqoYhZQBcD0VX6JVBXy86o/view', 'Assessing Industrial Air Compressors', 0, 0, 0, 0, '2020-07-01 22:33:14'),
(64, 10, 1152, 29, 0, 0, 17, 'A short slideshow of common industrial compressed air equipment and applicatons', 'https://docs.google.com/presentation/d/1khB1tPIND-ooBy1yCCL-rDf09Gf4Q8nr/edit#slide=id.p7', 'Industrial Compressed Air (a slideshow)', 0, 0, 0, 0, '2020-07-01 22:33:14'),
(65, 2, 1312, 8, 0, 0, 8, 'Reduced air pressure not only reduces air compressor energy required for a set volume of air, it will also result in less air volume consumed by leaks and unregulated air uses (although it can be hard to estimate the volume reduction).\r\n', '', '', 0, 0, 0, 0, '2020-07-02 17:49:40'),
(66, 2, 1313, 8, 0, 0, 3, 'Expect a 1% drop in compressor energy and cost per 2 PSI in compressor outlet pressure drop (for standard nominal ~100 PSI range systems)', '', '', 0, 0, 0, 0, '2020-07-02 17:49:40'),
(67, 2, 1314, 8, 0, 0, 11, 'Reduce compressed air system pressure to the 95-100 PSI range.', '', '', 0, 0, 0, 0, '2020-07-02 17:49:40'),
(68, 2, 1315, 8, 0, 1, 10, 'System pressure is set over 100 PSI for a compressed air system serving standard industrial utilities and controls.\r\n', '', '', 0, 0, 0, 0, '2020-07-02 17:49:40'),
(69, 2, 1316, 8, 0, 1, 8, 'Check end use requirements. Most equipment requires ~ 85 PSI. Allowing for a 10 PSI system distribution pressure drop should allow the minimum pressure to be set for 95 PSI	', '', '', 0, 0, 0, 0, '2020-07-02 17:49:40'),
(70, 2, 1317, 8, 0, 1, 8, 'Try incrementally dropping pressure while checking to ensure no production issues occur', '', '', 0, 0, 0, 0, '2020-07-02 17:49:40'),
(71, 2, 1318, 8, 0, 1, 15, 'Set up data loggers to collect compressor power over time ', '', '', 0, 0, 0, 0, '2020-07-02 17:49:40'),
(72, 2, 1319, 8, 0, 1, 15, 'Collect pressure settings: current and proposed', '', '', 0, 0, 0, 0, '2020-07-02 17:49:40'),
(73, 2, 1320, 8, 0, 1, 17, 'An OSU EEC Analysis Template in Microsoft Excel Format', 'https://drive.google.com/open?id=1ZrFL3Cc2rmiRL-lkODnqn4smkZo7BiRX', 'Analysis Template: Reduce Compressed Air Pressure ', 2, 0, 0, 0, '2020-07-02 17:49:40'),
(74, 2, 1321, 8, 0, 1, 12, 'Reduce line pressure losses in compressed air distribution system:', '', '', 0, 0, 0, 0, '2020-07-02 17:49:40'),
(75, 2, 1322, 8, 0, 2, 10, 'Pressure drops more than 10 PSI from the compressor to any location at any time (particularly remote locations or near shorter duration high volume uses)?', '', '', 0, 0, 0, 0, '2020-07-02 17:49:40'),
(76, 2, 1323, 8, 0, 2, 8, 'Pay close attention to oil filters, complex fittings, poor takeoffs, and bottlenecked and overly small pipe diameters', '', '', 0, 0, 0, 0, '2020-07-02 17:49:40'),
(77, 2, 1324, 8, 0, 2, 8, 'Critically evaluate regulator placement (and settings)	', '', '', 0, 0, 0, 0, '2020-07-02 17:49:40'),
(78, 2, 1325, 8, 0, 1, 12, 'Add receivers close to equipment with periodic high volume air uses (that might be creating local pressure drops).', '', '', 0, 0, 0, 0, '2020-07-02 17:49:40'),
(79, 2, 1326, 8, 0, 2, 10, 'Local pressure drops periodically appear in parts of the system .', '', '', 0, 0, 0, 0, '2020-07-02 17:49:40'),
(80, 2, 1327, 8, 0, 0, 11, 'Serve high pressure compressed air end use with separate system or a booster	', '', '', 0, 0, 0, 0, '2020-07-02 17:49:40'),
(81, 2, 1328, 8, 0, 1, 10, 'An entire plant air system is set at a high pressure because a few pieces of equipment require higher pressure air.		', '', '', 0, 0, 0, 0, '2020-07-02 17:49:40'),
(82, 2, 1329, 8, 0, 1, 15, 'Inventory equipment needing higher than average pressures, noting minimum pressure and estimating air volume required.', '', '', 0, 0, 0, 0, '2020-07-02 17:49:40'),
(83, 26, 1336, 88, 0, 0, 1, 'Versatile.', '', '', 0, 0, 0, 0, '2020-07-02 19:58:43'),
(84, 26, 1337, 88, 0, 0, 1, 'Familiar utility for many industrial personnel.', '', '', 0, 0, 0, 0, '2020-07-02 19:58:43'),
(85, 26, 1338, 88, 0, 0, 1, 'A single thermal energy input at the boiler can be distributed throughout a facility.', '', '', 0, 0, 0, 0, '2020-07-02 19:58:43'),
(86, 26, 1339, 88, 0, 0, 1, 'Limiting the number of combustion sources by serving applications with steam can reduce administrative cost of managing and reporting multiple emissions sources to governing agencies.', '', '', 0, 0, 0, 0, '2020-07-02 19:58:43'),
(87, 26, 1340, 88, 0, 0, 1, 'Use of a dual fuel boiler (for example: one that can use natural gas or fuel oil) can also reduce vulnerability to natural gas interruptions when thermal needs are served with steam instead of a local combustion system.', '', '', 0, 0, 0, 0, '2020-07-02 19:58:43'),
(88, 26, 1341, 88, 0, 0, 1, 'Steam engines can be useful for applications that might result in an initial locked rotor and potential electric motor damage, such as pumping cold semi-solidified bunker fuel.', '', '', 0, 0, 0, 0, '2020-07-02 19:58:43'),
(89, 27, 1342, 89, 0, 0, 2, 'System distribution energy and mass losses can result in significant overall system efficiency reductions.', '', '', 0, 0, 0, 0, '2020-07-02 20:01:03'),
(90, 28, 1343, 90, 0, 0, 4, 'Boilers can be bombs if not properly set up and maintained.', '', '', 0, 0, 0, 0, '2020-07-02 20:01:49'),
(91, 29, 1344, 91, 0, 0, 3, '1 boiler horsepower (BoHP) = 33,479 Btu/hr', '', '', 0, 0, 0, 0, '2020-07-02 20:08:42'),
(92, 29, 1345, 91, 0, 0, 3, 'Exhaust gases are typically best kept above 300 °F to avoid corrosive condensation.', '', '', 0, 0, 0, 0, '2020-07-02 20:08:42'),
(93, 29, 1346, 91, 0, 0, 3, 'Ideal exhaust temperatures should not be more than 100 - 150 °F greater than the steam temperature. If a boiler is well designed and heat exchanger surfaces are in good condition, ideal exhaust temperatures should be achievable.', '', '', 0, 0, 0, 0, '2020-07-02 20:08:42'),
(94, 30, 1347, 92, 0, 0, 8, 'Keep a steam table handy (phone app or pocket reference) to convert steam temperature to pressure for typical saturated conditions.', '', '', 0, 0, 0, 0, '2020-07-02 20:10:02'),
(95, 31, 1350, 93, 0, 0, 7, 'Regular, scheduled boiler tunes. Typically every 6 to 12 months.', '', '', 0, 0, 0, 0, '2020-07-02 20:12:22'),
(96, 31, 1351, 93, 0, 0, 7, 'Low O2 controls', '', '', 0, 0, 0, 0, '2020-07-02 20:12:22'),
(97, 34, 1361, 97, 0, 0, 17, 'An OSU EEC Data Collection Sheet in Microsoft Excel Format', 'https://drive.google.com/file/d/1mMRMAUYKDCpE5bQmX-KqajjAOwXuEzaL/view?usp=sharing', 'Boiler Data Collection Sheet', 0, 0, 0, 0, '2020-07-02 20:46:30'),
(98, 35, 1371, 98, 0, 0, 21, 'A link to the U.S.DOE\'s MEASUR Analysis Tool Package (free download)', 'https://www.energy.gov/eere/amo/measur', 'U.S.DOE Steam System Analysis Tool', 1, 0, 0, 0, '2020-08-10 17:43:19'),
(99, 35, 1372, 98, 0, 0, 21, 'An OSU EEC Analysis Tool in Microsoft Excel Format', 'https://drive.google.com/file/d/1HEL3S8xl50-B12ooH4wocqUznwJWAjzQ/view?usp=sharing', 'Combustion Efficiency Analysis Tool (CEAT)', 0, 0, 0, 0, '2020-07-02 21:18:17'),
(100, 39, 1407, 102, 0, 0, 11, 'Shut down equipment when not needed - nights, weekends, etc.', '', '', 0, 0, 0, 0, '2020-07-02 21:56:36'),
(101, 40, 1408, 103, 0, 0, 11, 'Minimize the continuous blowdown rate with a conductivity sensor', '', '', 0, 0, 0, 0, '2020-07-02 21:58:49'),
(102, 40, 1409, 103, 0, 0, 11, 'Install blowdown heat recovery', '', '', 0, 0, 0, 0, '2020-07-02 21:58:49'),
(103, 41, 1410, 104, 0, 0, 11, 'Replace damper controls on draft fans with variable speed control', '', '', 0, 0, 0, 0, '2020-07-02 22:01:14'),
(104, 42, 1411, 105, 0, 0, 11, 'Return more/all condensate back to the boiler', '', '', 0, 0, 0, 0, '2020-07-02 22:03:34'),
(105, 42, 1412, 105, 0, 0, 11, 'Recover Flash Steam (for Chris to flesh out) ', '', '', 0, 0, 0, 0, '2020-07-02 22:03:34'),
(106, 45, 1575, 108, 0, 0, 3, '1 HP = 0.746 kW', '', '', 0, 0, 0, 0, '2020-07-02 23:14:11'),
(107, 22, 1798, 77, 0, 0, 11, 'Reduce Inlet Air Temperature ', '', '', 1, 0, 0, 0, '2020-07-03 00:24:40'),
(108, 22, 1799, 77, 0, 1, 13, 'Reducing the inlet air temperature of oil-injected screw compressors increases mass flow rate while maintaining power input. To efficiently maintain current mass flow rate a variable frequency drive is required to reduce the motor speed and associated power.', '', '', 0, 0, 0, 0, '2020-07-03 00:24:40'),
(109, 22, 1800, 77, 0, 1, 10, 'High ambient temperature at the air inlet', '', '', 0, 0, 0, 0, '2020-07-03 00:24:40'),
(110, 22, 1801, 77, 0, 1, 10, 'Difficulty meeting a compressor\'s rated air capacity', '', '', 0, 0, 0, 0, '2020-07-03 00:24:40'),
(111, 22, 1802, 77, 0, 1, 10, 'A compressor running hotter than its specifications', '', '', 0, 0, 0, 0, '2020-07-03 00:24:40'),
(112, 22, 1803, 77, 0, 2, 4, 'Other factors may be at play such as significant air leaks increasing the load on the compressor', '', '', 0, 0, 0, 0, '2020-07-03 00:24:40'),
(113, 22, 1804, 77, 0, 1, 3, '1.9% efficiency (scfm/kW) improvement per 10 °F reduction at inlet', '', '', 0, 0, 0, 0, '2020-07-03 00:24:40'),
(114, 22, 1805, 77, 0, 1, 15, 'Compressor make, model, and nameplate data', '', '', 0, 0, 0, 0, '2020-07-03 00:24:40'),
(115, 22, 1806, 77, 0, 1, 15, 'Motor nameplate data, live power reading, and one week of amperage data', '', '', 0, 0, 0, 0, '2020-07-03 00:24:40'),
(116, 22, 1807, 77, 0, 1, 15, 'Complete picture of compressed air system and control strategy', '', '', 0, 0, 0, 0, '2020-07-03 00:24:40'),
(117, 22, 1808, 77, 0, 1, 15, 'Average ambient temperature at current and proposed inlet locations', '', '', 0, 0, 0, 0, '2020-07-03 00:24:40'),
(118, 22, 1809, 77, 0, 1, 12, 'Move air inlet to coolest location to reduce power and energy consumption', '', '', 0, 0, 0, 0, '2020-07-03 00:24:40'),
(119, 22, 1810, 77, 0, 1, 8, 'If implementation requires much more than re-ducting, the chances of this opportunitity being worthwhile are low. ', '', '', 0, 0, 0, 0, '2020-07-03 00:24:40'),
(120, 22, 1811, 77, 0, 1, 21, 'An OSU EEC Analysis Template in Microsoft Excel Format', 'https://oregonstate.box.com/s/zk1aol8rf88aul9klflbxkikz6l2ku47', 'Analysis Template: Reduce Inlet Air Temperature', 2, 0, 0, 0, '2020-07-03 00:24:40'),
(121, 22, 1812, 77, 0, 1, 17, 'An article from Compressed Air Best Practices by  Tim Dugan, P.E., President, Compression Engineering Corporation', 'https://www.airbestpractices.com/system-assessments/compressor-controls/inlet-air-temperature-impacts-air-compressor-performance', 'Inlet Air Temperature Impacts on Air Compressor Performance', 1, 0, 0, 0, '2020-07-03 00:24:40'),
(122, 22, 1813, 77, 0, 0, 11, 'Use a more efficient control strategy', '', '', 1, 0, 0, 0, '2020-07-03 00:24:40'),
(123, 22, 1814, 77, 0, 0, 11, 'Use a compressed air sequencer for multiple compressors', '', '', 0, 0, 0, 0, '2020-07-03 00:24:40'),
(124, 38, 1828, 101, 0, 0, 11, 'Tune the boiler regularly', '', '', 0, 0, 0, 0, '2020-07-03 00:26:01'),
(125, 38, 1829, 101, 0, 1, 10, 'O2 readings in the exhaust are high for the fuel type (>3% for gaseous fuels, >8% for solid fuels)', '', '', 0, 0, 0, 0, '2020-07-03 00:26:01'),
(126, 38, 1830, 101, 0, 1, 15, 'Combustion analysis at representative firing rates (high, medium, low, standby)', '', '', 0, 0, 0, 0, '2020-07-03 00:26:01'),
(127, 38, 1831, 101, 0, 1, 15, 'Firing rate over time', '', '', 0, 0, 0, 0, '2020-07-03 00:26:01'),
(128, 38, 1832, 101, 0, 1, 21, 'An OSU EEC Analysis Template in Microsoft Excel Format (unapproved, old style)', 'https://drive.google.com/file/d/1Z9GbxV0nr-OuxT2cNLxkdo82Wpq-h70m/view?usp=sharing', 'Boiler Tune Template', 0, 0, 0, 0, '2020-07-03 00:26:01'),
(129, 38, 1833, 101, 0, 0, 11, 'Install O2 Controls to maintain optimum combustion efficiency throughout the operating range', '', '', 0, 0, 0, 0, '2020-07-03 00:26:01'),
(130, 38, 1834, 101, 0, 1, 10, 'The boiler spends a significant portion of time at partial fire and lower efficiency', '', '', 0, 0, 0, 0, '2020-07-03 00:26:01'),
(131, 38, 1835, 101, 0, 0, 11, 'Clean heat exchanger surfaces and reduce the exhaust temperature', '', '', 0, 0, 0, 0, '2020-07-03 00:26:01'),
(132, 38, 1836, 101, 0, 1, 10, 'Stack temperature exceeds steam temperature by over 150 ˚F', '', '', 0, 0, 0, 0, '2020-07-03 00:26:01'),
(133, 38, 1837, 101, 0, 1, 12, 'Clean the fire side. Soot can accumulate and inhibit heat transfer.', '', '', 0, 0, 0, 0, '2020-07-03 00:26:01'),
(134, 38, 1838, 101, 0, 1, 12, 'Clean the water side. Scale can accumulate and inhibit heat transfer is the water chemistry is off', '', '', 0, 0, 0, 0, '2020-07-03 00:26:01'),
(135, 38, 1839, 101, 0, 0, 11, 'Install an economizer (for Matt to flesh out)', '', '', 0, 0, 0, 0, '2020-07-03 00:26:01'),
(136, 38, 1840, 101, 0, 0, 11, 'Install a condensing economizer (for Matt to flesh out)', '', '', 0, 0, 0, 0, '2020-07-03 00:26:01'),
(137, 48, 1877, 120, 0, 0, 11, 'Correct Power Factor (for Ethan to flesh out)', '', '', 0, 0, 0, 0, '2020-07-03 00:28:39'),
(138, 48, 1878, 120, 0, 1, 10, 'Power factor below ##%', '', '', 0, 0, 0, 0, '2020-07-03 00:28:39'),
(139, 37, 1897, 100, 0, 0, 24, 'See steam tip sheets', 'https://www.energy.gov/eere/amo/tip-sheets-system', 'U.S.DOE Energy Tip Sheets by System', 1, 0, 0, 0, '2020-08-10 17:50:55'),
(140, 37, 1898, 100, 0, 0, 17, 'United Nations Industrial Development Organization Document', 'https://www.unido.org/sites/default/files/2017-11/SSO-Manual-Print-FINAL-20161109-One-Page-V2.pdf', 'Manual for Industrial Steam Systems Assessment and Optimization', 1, 0, 0, 0, '2020-07-03 03:01:04'),
(141, 37, 1899, 100, 0, 0, 17, 'CleaverBrooks Document', 'http://cleaverbrooks.com/reference-center/insights/Boiler%20Efficiency%20Guide.pdf', 'Boiler Efficiency Guide', 1, 0, 0, 0, '2020-07-28 05:08:05'),
(142, 37, 1900, 100, 0, 0, 25, 'Pacific NW Boiler Vendor', 'https://coleindust.com/', 'Cole Industrial', 1, 0, 0, 0, '2020-07-03 03:01:04'),
(143, 37, 1901, 100, 0, 0, 25, 'Pacific NW Boiler Vendor', 'https://www.nationwideboiler.com/pacific-combustion-engineering.html', 'Pacific Combustion Engineering', 1, 0, 0, 0, '2020-07-03 03:01:04'),
(144, 37, 1902, 100, 0, 0, 25, 'Boiler Manufacturer', 'http://cleaverbrooks.com/', 'CleaverBrooks', 1, 0, 0, 0, '2020-07-03 03:01:04'),
(145, 44, 1968, 107, 0, 0, 11, 'Replace standard efficiency motors with NEMA premium efficiency motors', '', '', 0, 0, 0, 0, '2020-07-03 03:12:11'),
(146, 44, 1969, 107, 0, 1, 10, 'Standard efficiency motors used in high energy consumer applications ', '', '', 0, 0, 0, 0, '2020-07-03 03:12:11'),
(147, 44, 1970, 107, 0, 0, 11, 'Replace oversized motors', '', '', 0, 0, 0, 0, '2020-07-03 03:12:11'),
(148, 44, 1971, 107, 0, 1, 10, 'Motor consistently operating at less than half of full load', '', '', 0, 0, 0, 0, '2020-07-03 03:12:11'),
(149, 44, 1972, 107, 0, 0, 11, 'Replace Standard V-Belts with Notched V-Belts', '', '', 0, 0, 0, 0, '2020-07-03 03:12:11'),
(150, 44, 1973, 107, 0, 1, 13, 'Notched V-belts have grooves perpendicular to the length of the belt to reduce bending resistance. ', '', '', 0, 0, 0, 0, '2020-07-03 03:12:11'),
(151, 44, 1974, 107, 0, 1, 10, 'Numerous belt-driven motors are used throughout a facility ', '', '', 0, 0, 0, 0, '2020-07-03 03:12:11'),
(152, 44, 1975, 107, 0, 1, 3, 'Notched V-belts are approximately 2% more efficient than standard belts. The OSU EEC uses 1.5% as a conservative estimate.', '', '', 0, 0, 0, 0, '2020-07-03 03:12:11'),
(153, 44, 1976, 107, 0, 1, 14, 'Are V-belts or synchronous belts more suited to the application?', '', '', 0, 0, 0, 0, '2020-07-03 03:12:11'),
(154, 44, 1977, 107, 0, 1, 1, 'Run cooler, last longer, and are more efficient than standard V-belts', '', '', 0, 0, 0, 0, '2020-07-03 03:12:11'),
(155, 44, 1978, 107, 0, 1, 1, 'Don\'t require retrofits if standard V-belts are already used', '', '', 0, 0, 0, 0, '2020-07-03 03:12:11'),
(156, 44, 1979, 107, 0, 1, 1, 'More suitable than synchronous drives if vibrational damping is needed or the application causes sudden torque changes', '', '', 0, 0, 0, 0, '2020-07-03 03:12:11'),
(157, 44, 1980, 107, 0, 1, 2, 'Sharp efficiency reduction at high torque due to increased slippage', '', '', 0, 0, 0, 0, '2020-07-03 03:12:11'),
(158, 44, 1981, 107, 0, 1, 2, 'Like standard V-belts, notched belts degrade in efficiency over time if not properly maintained', '', '', 0, 0, 0, 0, '2020-07-03 03:12:11'),
(159, 44, 1982, 107, 0, 1, 2, 'V-belts may perform worse in dirty environments than synchronous belts', '', '', 0, 0, 0, 0, '2020-07-03 03:12:11'),
(160, 44, 1983, 107, 0, 1, 12, 'Incrementally install notched V-belts as old belts are replaced.', '', '', 0, 0, 0, 0, '2020-07-03 03:12:11'),
(161, 44, 1984, 107, 0, 1, 7, 'Regular scheduled maintenance and re-tensioning ', '', '', 0, 0, 0, 0, '2020-07-03 03:12:11'),
(162, 44, 1985, 107, 0, 1, 20, '', 'https://drive.google.com/file/d/1uk3x2VpKQ9FrRUOvU4nQ9U2zHfQsBXGC/view?usp=sharing', 'Thermal Image of Notched vs Standard V-belt', 0, 0, 0, 0, '2020-07-03 03:12:11'),
(163, 44, 1986, 107, 0, 1, 21, 'An OSU EEC Analysis Template in Microsoft Excel Format', 'https://drive.google.com/file/d/19tm7mcwn9jYIj_xDkJ7Ki9buPw0gc2Kl/view?usp=sharing', 'Install Notched V-Belts Template', 0, 0, 0, 0, '2020-07-03 03:12:11'),
(164, 44, 1987, 107, 0, 0, 11, 'Replace V-Belt Drives with Synchronous Belt Drives ', '', '', 0, 0, 0, 0, '2020-07-03 03:12:11'),
(165, 44, 1988, 107, 0, 1, 13, 'Synchronous drives use toothed belts and mated grooved sprockets to transfer power rather than friction. Synchronous belt drives operate more efficient and require less maintenance than V-belt drives.', '', '', 0, 0, 0, 0, '2020-07-03 03:12:11'),
(166, 44, 1989, 107, 0, 1, 10, 'Numerous belt-driven motors are used throughout a facility ', '', '', 0, 0, 0, 0, '2020-07-03 03:12:11'),
(167, 44, 1990, 107, 0, 1, 3, 'Synchronous drives consistently operate with 98% efficiency', '', '', 0, 0, 0, 0, '2020-07-03 03:12:11'),
(168, 44, 1991, 107, 0, 1, 14, 'Are V-belts or synchronous belts more suited to the application?', '', '', 0, 0, 0, 0, '2020-07-03 03:12:11'),
(169, 44, 1992, 107, 0, 1, 1, 'Maintain efficiency over a wide load range', '', '', 0, 0, 0, 0, '2020-07-03 03:12:11'),
(170, 44, 1993, 107, 0, 1, 1, 'Work well in oily and wet environments', '', '', 0, 0, 0, 0, '2020-07-03 03:12:11'),
(171, 44, 1994, 107, 0, 1, 1, 'Require minimal maintenance and re-tensioning ', '', '', 0, 0, 0, 0, '2020-07-03 03:12:11'),
(172, 44, 1995, 107, 0, 1, 2, 'Require installation of mating grooved sprockets', '', '', 0, 0, 0, 0, '2020-07-03 03:12:11'),
(173, 44, 1996, 107, 0, 1, 2, 'Noisier and transfer more vibration than V-belts', '', '', 0, 0, 0, 0, '2020-07-03 03:12:11'),
(174, 44, 1997, 107, 0, 1, 2, 'Vulnerable to sudden torque changes that can shear the belt\'s teeth', '', '', 0, 0, 0, 0, '2020-07-03 03:12:11'),
(175, 44, 1998, 107, 0, 1, 12, 'Consider consulting a power transmission specialist to determine viability and savings potential from retrofitting V-belt drives with synchronous belts. Install notched belts where synchronous are not cost effective.', '', '', 0, 0, 0, 0, '2020-07-03 03:12:11'),
(176, 46, 1999, 118, 0, 0, 11, 'Use variable frequency drives where appropriate', '', '', 0, 0, 0, 0, '2020-07-03 03:15:14'),
(177, 46, 2000, 118, 0, 1, 10, 'Large motors that are throttle controlled', '', '', 0, 0, 0, 0, '2020-07-03 03:15:14'),
(178, 43, 2096, 106, 0, 0, 11, 'Insulate steam lines', '', '', 0, 0, 0, 0, '2020-07-03 17:30:31'),
(179, 43, 2097, 106, 0, 0, 11, 'Insulate valves and fittings', '', '', 0, 0, 0, 0, '2020-07-03 17:30:31'),
(180, 43, 2098, 106, 0, 0, 11, 'Insulate condensate lines', '', '', 0, 0, 0, 0, '2020-07-03 17:30:31'),
(181, 43, 2099, 106, 0, 0, 21, 'An OSU EEC Analysis Template in Microsoft Excel Format', 'https://drive.google.com/file/d/1Et50Qc77pWtPkZcorKcPG_RSuK-Vc_lx/view?usp=sharing', 'Insulation Template', 0, 0, 0, 0, '2020-07-03 17:30:31'),
(182, 43, 2100, 106, 0, 0, 21, 'North American Insulation Manufacturers Association Software Download', 'https://insulationinstitute.org/tools-resources/free-3e-plus/?cn-reloaded=1', 'NAIMA 3E Plus Insulation Tool', 1, 0, 0, 0, '2020-07-03 17:30:31'),
(183, 36, 2115, 99, 0, 0, 22, 'An OSU EEC Google Slideshow', 'https://docs.google.com/presentation/d/1A-bLNUv7hCuBV2zMsS0A4JEKPNVxaKnIwUMoVZCFr2w/edit?usp=sharing', 'Steam Systems', 0, 0, 0, 0, '2020-07-03 17:55:50'),
(184, 36, 2116, 99, 0, 0, 17, 'An OSU EEC Appendix in Microsoft Word Format', 'https://drive.google.com/file/d/1Jh6CaIDd6ugCo6FYqviyVK-O49ic_275/view?usp=sharing', 'Combustion Appendix', 0, 0, 0, 0, '2020-07-03 17:55:50'),
(185, 32, 2117, 95, 0, 0, 15, 'Boiler Nameplate Data: Rated Capacity', '', '', 0, 0, 0, 0, '2020-07-03 17:57:24'),
(186, 32, 2118, 95, 0, 0, 15, 'Combustion Analysis: Excess O2, Stack Temperature, Inlet / Ambient Temperature ', '', '', 0, 0, 0, 0, '2020-07-03 17:57:24'),
(187, 32, 2119, 95, 0, 0, 15, 'Capacity over time', '', '', 0, 0, 0, 0, '2020-07-03 17:57:24'),
(188, 14, 2120, 66, 0, 0, 15, 'Pharetra massa massa ultricies mi quis hendrerit dolor.', '', '', 0, 0, 0, 0, '2020-07-07 01:57:28'),
(189, 14, 2121, 66, 0, 0, 11, 'Vitae semper quis lectus nulla.', '', '', 0, 0, 0, 0, '2020-07-07 01:57:28'),
(190, 14, 2122, 66, 0, 0, 11, 'Lectus mauris ultrices eros in cursus.', '', '', 0, 0, 0, 0, '2020-07-07 01:57:28'),
(191, 49, 2123, 121, 0, 0, 11, 'Check', '', '', 0, 0, 0, 0, '2020-07-07 02:04:39'),
(192, 49, 2124, 121, 0, 0, 13, 'text text text', '', '', 0, 0, 0, 0, '2020-07-07 02:04:39'),
(193, 9, 2125, 27, 0, 0, 13, 'Energy savings associated with reductions in compressed air use are very dependent on the compressor control strategy. In the worst case, a compressor with blow off control might not yield any energy savings with compressed air use reductions, and one with inlet modulation might yield only a small part of potential savings.', '', '', 0, 0, 0, 0, '2020-07-07 16:17:13'),
(194, 9, 2126, 27, 0, 0, 11, 'Reduce compressed air leaks', '', '', 0, 0, 0, 0, '2020-07-07 16:17:13'),
(195, 9, 2127, 27, 0, 1, 13, 'Compressed air is an expensive utility, but leaks can go uncorrected as they do not make a mess.', '', '', 0, 0, 0, 0, '2020-07-07 16:17:13'),
(196, 9, 2128, 27, 0, 1, 10, 'The compressed air leak rate exceeds 20 to 30% of air used in the process.', '', '', 0, 0, 0, 0, '2020-07-07 16:17:13'),
(197, 9, 2129, 27, 0, 1, 8, 'Determine the leak load by checking compressor output when there is no productive use (typically during breaks or after hours.)', '', '', 0, 0, 0, 0, '2020-07-07 16:17:13'),
(198, 9, 2130, 27, 0, 1, 8, 'Sonic equipment can be used to identify leak locations and estimate associated losses.', '', '', 0, 0, 0, 0, '2020-07-07 16:17:13'),
(199, 9, 2131, 27, 0, 1, 15, 'Air use during idle period (often inferred from datalog of power or amps over time)', '', '', 0, 0, 0, 0, '2020-07-07 16:17:13'),
(200, 9, 2132, 27, 0, 1, 15, 'Air use during production (often inferred from datalog of power or amps over time)', '', '', 0, 0, 0, 0, '2020-07-07 16:17:13'),
(201, 9, 2133, 27, 0, 1, 15, 'Compressor power over time', '', '', 0, 0, 0, 0, '2020-07-07 16:17:13'),
(202, 9, 2134, 27, 0, 1, 17, 'An OSU EEC Analysis Template in Microsoft Excel Format', 'vhttps://drive.google.com/drive/u/0/folders/1pJoEFwdmULog_SRARRlqzFfzX5cpV6cI', 'Analysis Template: Repair Compressed Air Leaks ', 2, 0, 0, 0, '2020-07-07 16:17:13'),
(203, 9, 2135, 27, 0, 0, 11, 'Eliminate the use of compressed air “quick fixes” by correcting base issues', '', '', 0, 0, 0, 0, '2020-07-07 16:17:13'),
(204, 9, 2136, 27, 0, 1, 13, 'Compressed air is a handy utility that can be used for a temporary resolution of miscellaneous production issues, at the cost of expensive air use. Often these fixes persist without correction of the underlying issue.', '', '', 0, 0, 0, 0, '2020-07-07 16:17:13'),
(205, 9, 2137, 27, 0, 1, 10, 'Compressed air used as a temporary quick fix for applications such as cooling bearings, or moving lightweight items that are getting stuck on conveyor.', '', '', 0, 0, 0, 0, '2020-07-07 16:17:13'),
(206, 9, 2138, 27, 0, 0, 11, 'Use alternative to vortex coolers', '', '', 0, 0, 0, 0, '2020-07-07 16:17:13'),
(207, 9, 2139, 27, 0, 1, 13, 'Vortex coolers are an interesting technology that can take a compressed air inlet stream and yield two streams, one that is cold and one that is warm. They are sometimes used to cool electrical cabinets, but in many cases can be replaced with lower energy solutions such as air conditioning or simple fans.', '', '', 0, 0, 0, 0, '2020-07-07 16:17:13'),
(208, 9, 2140, 27, 0, 1, 10, 'Vortex cabinet cooler in use at a facility   ', '', '', 0, 0, 0, 0, '2020-07-07 16:17:13'),
(209, 9, 2141, 27, 0, 0, 11, 'Use engineered nozzles for compressed air blow-off applications', '', '', 0, 0, 0, 0, '2020-07-07 16:17:13'),
(210, 9, 2142, 27, 0, 1, 13, 'Engineered air nozzles can develop effective air flow with a smaller volume of compressed air by entraining atmospheric air in the air stream.', '', '', 0, 0, 0, 0, '2020-07-07 16:17:13'),
(211, 9, 2143, 27, 0, 1, 10, 'Compressed air blowing applications using simple open lines or apertures  ', '', '', 0, 0, 0, 0, '2020-07-07 16:17:13'),
(212, 9, 2144, 27, 0, 0, 11, 'Interlock compressed air delivery with equipment or application served.', '', '', 0, 0, 0, 0, '2020-07-07 16:17:13'),
(213, 9, 2145, 27, 0, 1, 13, 'Interlocking a compressed air valve to close when supported equipment is idle can eliminate significant unneeded air use. This can range from an entire packaging line to and isolated ink sprayer that blows air constantly while introducing ink to mark product periodically.', '', '', 0, 0, 0, 0, '2020-07-07 16:17:13'),
(214, 9, 2146, 27, 0, 1, 10, 'Idle equipment with active compressed air blowing applications or leaks ', '', '', 0, 0, 0, 0, '2020-07-07 16:17:13'),
(215, 9, 2147, 27, 0, 0, 11, 'Serve lower pressure end use with blower or fan', '', '', 0, 0, 0, 0, '2020-07-07 16:17:13'),
(216, 9, 2148, 27, 0, 1, 13, 'Compressed air is an energy intensive utility with significant heat of compression losses.  These losses can be avoided if the air is not pressurized significantly above that needed for the application. Fans and blowers can develop a like airflow with significantly less energy. ', '', '', 0, 0, 0, 0, '2020-07-07 16:17:13'),
(217, 9, 2149, 27, 0, 1, 10, 'Compressed air used for clearing material, blowing off water, agitating tanks of fluid, or any applications with compressed air regulated to a low pressure', '', '', 0, 0, 0, 0, '2020-07-07 16:17:13'),
(218, 9, 2150, 27, 0, 0, 11, 'Reduce the frequency or duration of intermittent air uses', '', '', 0, 0, 0, 0, '2020-07-07 16:17:13'),
(219, 9, 2151, 27, 0, 0, 11, 'Replace desiccant based air dryer with a refrigerated air dryer if air drying needs permit.', '', '', 0, 0, 0, 0, '2020-07-07 16:17:13'),
(220, 9, 2152, 27, 0, 0, 11, 'Use desiccant based air dryer with more efficient desiccant bed regeneration', '', '', 0, 0, 0, 0, '2020-07-07 16:17:13'),
(221, 9, 2153, 27, 0, 0, 11, 'Replace pneumatic hand tools with battery powered hand tools', '', '', 0, 0, 0, 0, '2020-07-07 16:17:13'),
(222, 50, 2242, 128, 0, 0, 11, 'w', '', '', 0, 0, 0, 0, '2020-07-07 21:23:36'),
(223, 50, 2243, 128, 0, 0, 2, 'w', '', '', 0, 0, 0, 0, '2020-07-07 21:23:36'),
(224, 47, 2261, 119, 0, 0, 11, 'Manually reduce equipment operation time', '', '', 0, 0, 0, 0, '2020-07-07 23:38:14'),
(225, 47, 2262, 119, 0, 0, 11, 'Automatically control equipment operation time', '', '', 0, 0, 0, 0, '2020-07-07 23:38:14'),
(226, 47, 2263, 119, 0, 0, 11, 'Interlock equipment with a related process', '', '', 0, 0, 0, 0, '2020-07-07 23:38:14'),
(227, 47, 2264, 119, 0, 0, 11, 'Operate equipment in batches rather than continuously ', '', '', 0, 0, 0, 0, '2020-07-07 23:38:14'),
(228, 47, 2265, 119, 0, 1, 10, 'Equipment is idle for significant periods of time', '', '', 0, 0, 0, 0, '2020-07-07 23:38:14'),
(229, 33, 2267, 96, 0, 0, 27, 'Combustion Analyzer ', '', '', 0, 0, 0, 0, '2020-07-08 20:15:53'),
(230, 16, 2690, 68, 0, 0, 20, '', 'https://image.shutterstock.com/image-photo/plywood-boards-on-furniture-industry-600w-439702138.jpg', 'Plywood A', 0, 0, 0, 0, '2020-07-23 09:53:26'),
(231, 16, 2691, 68, 0, 0, 20, '', 'https://image.shutterstock.com/image-photo/high-resolution-plywood-board-wall-600w-1054866629.jpg', 'Plywood B', 0, 0, 0, 0, '2020-07-23 09:53:26'),
(232, 16, 2692, 68, 0, 0, 20, '', 'https://image.shutterstock.com/image-photo/closeup-plywood-sheets-600w-737467363.jpg', 'Plywood C', 0, 0, 0, 0, '2020-07-23 09:53:26'),
(233, 16, 2693, 68, 0, 0, 20, '', 'https://image.shutterstock.com/image-photo/plywood-industry-construction-parts-cuttings-600w-1236143197.jpg', 'Plywood D', 0, 0, 0, 0, '2020-07-23 09:53:26'),
(234, 16, 2694, 68, 0, 0, 20, '', 'https://image.shutterstock.com/image-photo/warehouse-fiberboard-chipboard-construction-materials-600w-1035511318.jpg', 'Plywood E', 0, 0, 0, 0, '2020-07-23 09:53:26'),
(235, 16, 2695, 68, 0, 0, 20, '', 'https://image.shutterstock.com/image-photo/plywood-residential-building-materials-600w-1005863455.jpg', 'Plywood F', 0, 0, 0, 0, '2020-07-23 09:53:26'),
(236, 52, 2704, 147, 0, 0, 4, '33', '', '', 0, 0, 0, 0, '2020-07-28 08:34:31'),
(237, 52, 2705, 147, 0, 0, 4, '33', '', '', 0, 0, 0, 0, '2020-07-28 08:34:31'),
(238, 53, 2706, 148, 0, 0, 16, '1', '', '', 0, 0, 0, 0, '2020-07-28 08:35:42'),
(239, 53, 2707, 148, 0, 0, 16, '1', '', '', 0, 0, 0, 0, '2020-07-28 08:35:42'),
(240, 53, 2708, 148, 0, 0, 16, '1', '', '', 0, 0, 0, 0, '2020-07-28 08:35:42'),
(241, 51, 2715, 145, 0, 0, 7, '11', '', '', 0, 0, 0, 0, '2020-07-28 20:16:13'),
(242, 51, 2716, 145, 0, 0, 27, '111', '', '', 0, 0, 0, 0, '2020-07-28 20:16:13'),
(243, 51, 2717, 145, 0, 0, 25, 'NEW', 'http://placekitten.com/200/200', 'NEW', 1, 0, 0, 0, '2020-08-11 08:57:51'),
(244, 54, 3033, 151, 0, 0, 1, 'Cras posuere lacus id pharetra finibus.', '', '', 0, 0, 0, 0, '2020-08-04 10:57:12'),
(245, 54, 3034, 151, 0, 0, 1, 'Cras in turpis maximus, porttitor urna id, luctus turpis.', '', '', 0, 0, 0, 0, '2020-08-04 10:57:12'),
(246, 54, 3035, 151, 0, 1, 14, 'Maecenas varius justo vel felis luctus, non consequat erat sollicitudin.', '', '', 0, 0, 0, 0, '2020-08-04 10:57:12'),
(247, 54, 3036, 151, 0, 1, 14, 'Phasellus sagittis lectus at nulla pretium efficitur.', '', '', 0, 0, 0, 0, '2020-08-04 10:57:12'),
(248, 54, 3037, 151, 0, 0, 17, 'Aliquam commodo tellus vitae lacus', 'https://www.lipsum.com/feed/html', 'Lorem Ipsum', 1, 0, 0, 0, '2020-08-04 10:57:12'),
(249, 54, 3038, 151, 0, 0, 3, 'Praesent rhoncus auctor elementum.', '', '', 1, 0, 0, 0, '2020-08-04 10:57:12'),
(250, 54, 3039, 151, 0, 0, 8, 'Proin ac finibus dui.', '', '', 0, 0, 0, 0, '2020-08-04 10:57:12'),
(251, 55, 3060, 152, 0, 0, 20, '', 'http://placekitten.com/100/300', 'Cat 1', 0, 0, 0, 0, '2020-08-04 11:00:16'),
(252, 55, 3061, 152, 0, 0, 20, '', 'http://placekitten.com/200/200', 'Cat 2', 0, 0, 0, 0, '2020-08-04 11:00:16'),
(253, 55, 3062, 152, 0, 0, 20, '', 'http://placekitten.com/150/250', 'Cat 3', 0, 0, 0, 0, '2020-08-04 11:00:16'),
(254, 55, 3063, 152, 0, 0, 20, '', 'http://placekitten.com/250/150', 'Cat 4', 0, 0, 0, 0, '2020-08-04 11:00:16'),
(255, 60, 3429, 157, 0, 0, 26, 'Develop a table of significant energy using equipment including collected rated capacity, estimated % of full capacity, and hours of operation', '', '', 0, 0, 0, 0, '2020-08-05 23:14:02'),
(256, 60, 3430, 157, 0, 1, 12, 'Calculate an initial estimate of annual energy used by each piece of equipment', '', '', 0, 0, 0, 0, '2020-08-05 23:14:02'),
(257, 60, 3431, 157, 0, 1, 12, 'Develop a pie chart showing % of total site energy each modeled equipment item uses, and remaining unidentified energy use.', '', '', 0, 0, 0, 0, '2020-08-05 23:14:02'),
(258, 60, 3432, 157, 0, 2, 14, 'Does the total modeled energy exceed the actual energy in the bills?. (If so revise the model.) ', '', '', 0, 0, 0, 0, '2020-08-05 23:14:02'),
(259, 60, 3433, 157, 0, 1, 12, 'Plan to continually revise and improve this balance over the process of the remote assessment.', '', '', 0, 0, 0, 0, '2020-08-05 23:14:02'),
(260, 60, 3434, 157, 0, 2, 14, 'Does more equipment come up that can be added?', '', '', 0, 0, 0, 0, '2020-08-05 23:14:02'),
(261, 60, 3435, 157, 0, 2, 14, 'Does better data become available on any modeled equipment to improve its annual energy use estimate??', '', '', 0, 0, 0, 0, '2020-08-05 23:14:02'),
(262, 56, 3527, 153, 0, 0, 12, 'Not a checkbox', '', '', 0, 0, 0, 0, '2020-08-06 10:42:16'),
(263, 56, 3528, 153, 0, 0, 11, 'Checkbox', '', '', 0, 0, 0, 0, '2020-08-06 10:42:16'),
(264, 56, 3529, 153, 0, 1, 7, 'item 1', '', '', 0, 0, 0, 0, '2020-08-06 10:42:16'),
(265, 56, 3530, 153, 0, 1, 4, 'item 2', '', '', 0, 0, 0, 0, '2020-08-06 10:42:16'),
(266, 56, 3531, 153, 0, 0, 16, 'item 3', '', '', 0, 0, 0, 0, '2020-08-06 10:42:16'),
(267, 63, 3894, 162, 0, 0, 13, 'This is a requirement for U.S.DOE to accept our remote assessment as a deliverable on our contract. It might be done in one session or iteratively in multiple sessions.', '', '', 0, 0, 0, 0, '2020-08-06 22:36:25'),
(268, 63, 3895, 162, 0, 0, 26, 'Begin with a review of preparatory work including the intitial energy balance, and list of possible opportunities.', '', '', 0, 0, 0, 0, '2020-08-06 22:36:25'),
(269, 63, 3896, 162, 0, 0, 26, 'Discuss the best strategy to use for a Guided Remote Tour. This might be a standard tour of the process from start to finish, or a series of targeted tours of areas of specific interest. ', '', '', 0, 0, 0, 0, '2020-08-06 22:36:25'),
(270, 61, 4030, 158, 0, 0, 26, 'Review any areas of concern or interest voiced by the client', '', '', 0, 0, 0, 0, '2020-08-06 23:09:57'),
(271, 61, 4031, 158, 0, 0, 26, 'Review typical opportunities found in the energy intensive systems identified at the facility ', '', '', 0, 0, 0, 0, '2020-08-06 23:09:57'),
(272, 61, 4032, 158, 0, 1, 8, 'This Industrial Walkthrough Checklist & Reference will offer more and more ideas for potential opportunities as it is developed over time', '', '', 0, 0, 0, 0, '2020-08-06 23:09:57'),
(273, 61, 4033, 158, 0, 0, 26, 'Review the list of typical opportunities found in the site\'s industrial sector developed in Preliminary Research', '', '', 0, 0, 0, 0, '2020-08-06 23:09:57'),
(274, 61, 4034, 158, 0, 0, 26, 'Pick the brain of anyone with experience in the subject', '', '', 0, 0, 0, 0, '2020-08-06 23:09:57'),
(275, 61, 4035, 158, 0, 0, 26, 'Brainstorm on opportunities as a team and compile a list', '', '', 0, 0, 0, 0, '2020-08-06 23:09:57'),
(276, 61, 4036, 158, 0, 0, 26, 'Develop a table of potential recommendations, and if possible: total energy used by the system related to each opportunity, a high/low estimate of potential % savings,  and the range of potential cost and energy savings potential.', '', '', 0, 0, 0, 0, '2020-08-06 23:09:57'),
(277, 57, 4092, 154, 0, 0, 26, 'Check the estimated annual energy cost for each utility', '', '', 0, 0, 0, 0, '2020-08-06 23:31:26'),
(278, 57, 4093, 154, 0, 1, 14, 'Is the total annual energy cost suitable for an IAC Assessment? ', '', '', 0, 0, 0, 0, '2020-08-06 23:31:26'),
(279, 57, 4094, 154, 0, 2, 3, '$100,000 a year is the minimum but ideally costs will exceed $200,000  - $300,000 a year. ', '', '', 0, 0, 0, 0, '2020-08-06 23:31:26'),
(280, 57, 4095, 154, 0, 2, 3, 'If annual cost exceeds $2.5 Million, Field Manager / U.S.DOE permission must be obtained to visit. ', '', '', 0, 0, 0, 0, '2020-08-06 23:31:26'),
(281, 57, 4096, 154, 0, 0, 26, 'Accumulate / analyze annual month by month utility bills. ', '', '', 0, 0, 0, 0, '2020-08-06 23:31:26'),
(282, 57, 4097, 154, 0, 1, 12, 'Identify any seasonality to bills.', '', '', 0, 0, 0, 0, '2020-08-06 23:31:26'),
(283, 57, 4098, 154, 0, 1, 12, 'Determine incremental costs (Potential savings with each unit of resource saved )', '', '', 0, 0, 0, 0, '2020-08-06 23:31:26'),
(284, 57, 4099, 154, 0, 1, 12, 'Understand special costs: Electrical Demand and Power Factor cost, meter costs, ...', '', '', 0, 0, 0, 0, '2020-08-06 23:31:26'),
(285, 57, 4100, 154, 0, 1, 12, 'Confirm estimated annual costs ', '', '', 0, 0, 0, 0, '2020-08-06 23:31:26'),
(286, 57, 4101, 154, 0, 0, 26, 'Ensure all personnel information provided is entered into the OSU IAC Project Management DB', '', '', 0, 0, 0, 0, '2020-08-06 23:31:26'),
(287, 57, 4102, 154, 0, 0, 26, 'Review potential incentive and assistance programs available to the client through their utilities', '', '', 0, 0, 0, 0, '2020-08-06 23:31:26'),
(288, 57, 4103, 154, 0, 0, 14, '(If the client has given permission, consider how to engage utility representatives (and regional incentive and assistance programs such as  ETO or ESI  in the remote assessment process)?', '', '', 0, 0, 0, 0, '2020-08-06 23:31:26'),
(289, 59, 4111, 156, 0, 0, 13, 'This meeting is analogous to the what the OSU IAC has traditionally called the \"Pre-Audit Walkthrough Phone Call\" (excluding site visit logistics, safety and PPE discussion)', '', '', 0, 0, 0, 0, '2020-08-06 23:34:20'),
(290, 59, 4112, 156, 0, 0, 26, 'Have the client verbally  \"walk us through\" their process, highlighting key energy intensive processes', '', '', 0, 0, 0, 0, '2020-08-06 23:34:20'),
(291, 59, 4113, 156, 0, 1, 14, 'Ask client to let us know of any areas of concern or interest', '', '', 0, 0, 0, 0, '2020-08-06 23:34:20'),
(292, 59, 4114, 156, 0, 1, 14, 'Ask for rated capacity, estimated % of full capacity, and hours of operation for significant equipment discussed.', '', '', 0, 0, 0, 0, '2020-08-06 23:34:20'),
(293, 59, 4115, 156, 0, 2, 8, 'Estimates of the number of smaller motor of various sizes with average load and hours can also be helpful.', '', '', 0, 0, 0, 0, '2020-08-06 23:34:20'),
(294, 59, 4116, 156, 0, 1, 14, 'Are common utilities such as compressed air, lighting, heating, etc covered in the conversation?', '', '', 0, 0, 0, 0, '2020-08-06 23:34:20'),
(295, 59, 4117, 156, 0, 0, 26, 'Discuss proposed process for remote assessment going forward (we are still learning and developing this process)', '', '', 0, 0, 0, 0, '2020-08-06 23:34:20'),
(296, 62, 4137, 161, 0, 0, 26, 'Review the client\'s web site', '', '', 0, 0, 0, 0, '2020-08-06 23:47:48'),
(297, 62, 4138, 161, 0, 0, 26, 'Develop a list of typical opportunities found in the site\'s industrial sector. BE SURE to add any newly identified opportunities to this site!', '', '', 0, 0, 0, 0, '2020-08-06 23:47:48'),
(298, 62, 4139, 161, 0, 1, 8, ' The IAC University Database allows you to search for common recommendations made by SIC or NAICS code ', '', '', 0, 0, 0, 0, '2020-08-06 23:47:48'),
(299, 62, 4140, 161, 0, 2, 24, '$empty', 'https://iac.university/searchRecommendations', 'IAC University: Search IAC Recommendations', 1, 0, 0, 0, '2020-08-06 23:47:48'),
(300, 62, 4141, 161, 0, 2, 1, 'The IAC University Database also allows you to search for the top 10 recommendations, the number of assessments and results by industry grouping. Note: one useful search field under assessments: \"Product Type\" can help find similar assessments.', '', '', 0, 0, 0, 0, '2020-08-06 23:47:48'),
(301, 62, 4142, 161, 0, 1, 8, 'Search the OSU IAC Project Management Database to see what we have recommended in the past at similar sites. Note: the search box in the upper right corner is a useful tool for this.', '', '', 0, 0, 0, 0, '2020-08-06 23:47:48'),
(302, 62, 4143, 161, 0, 2, 24, '$empty', 'https://eec.oregonstate.edu/tracking2/modules/login/login.php', 'EEC Project Management', 0, 0, 0, 0, '2020-08-06 23:47:48');
INSERT INTO `History_Items` (`historyId`, `parentId`, `itemId`, `cardId`, `orderIndex`, `indentation`, `iconType`, `contentText`, `contentUrl`, `contentLabel`, `contentMode`, `internal`, `inline`, `sourceId`, `created`) VALUES
(303, 62, 4144, 161, 0, 1, 8, 'General internet and literature research can surface new opportunities to consider.  BE SURE to add any newly identified resources to this site!', '', '', 0, 0, 0, 0, '2020-08-06 23:47:48'),
(304, 62, 4145, 161, 0, 2, 1, 'U.S.DOE, Vendor, Other IAC, State Energy Office, and Industrial Association web sites are all among good places to search for resources.', '', '', 0, 0, 0, 0, '2020-08-06 23:47:48'),
(305, 58, 4146, 155, 0, 0, 26, 'Initiate a conversation with potential clients in follow up to industry requests, partner references, or direct contact.', '', '', 0, 0, 0, 0, '2020-08-06 23:50:17'),
(306, 58, 4147, 155, 0, 0, 26, 'Confirm suitability of the site and client for a remote IAC assessment', '', '', 0, 0, 0, 0, '2020-08-06 23:50:17'),
(307, 58, 4148, 155, 0, 1, 12, 'Let clients know of key IAC eligibility criteria (Annual Energy Cost between $100K and $2.5 Mil, less than 500 employees,...) ', '', '', 0, 0, 0, 0, '2020-08-06 23:50:17'),
(308, 58, 4149, 155, 0, 1, 14, 'Make sure clients are prepared for the effort required for a remote assessment (we are still learning what this is)', '', '', 0, 0, 0, 0, '2020-08-06 23:50:17'),
(309, 58, 4150, 155, 0, 1, 14, 'Ensure someone at the site can \"walk us through\" or at least go to targeted locations while with us on the phone to ask questions, perhaps get pictures or videos, and really dig into details. (This step is important for our contract with U.S.DOE)', '', '', 0, 0, 0, 0, '2020-08-06 23:50:17'),
(310, 58, 4151, 155, 0, 0, 26, 'Send the standard OSU Pre-Assessment Package to appropriate clients ', '', '', 0, 0, 0, 0, '2020-08-06 23:50:17'),
(311, 58, 4152, 155, 0, 1, 17, '$empty', 'https://docs.google.com/document/d/1miAvxrMxVcEeQe1REf-4EH2OiDF32zTjGluq4hoZnMU/edit', 'Pre_Assessment Package Template', 0, 0, 0, 0, '2020-08-06 23:50:17'),
(512, 65, 4314, 167, 0, 0, 26, 'I like bullet points.', '', '', 0, 0, 0, 0, '2020-08-11 09:13:51'),
(513, 65, 4315, 167, 0, 0, 26, 'More bullets.', '', '', 0, 0, 0, 0, '2020-08-11 09:13:51'),
(514, 65, 4316, 167, 0, 0, 26, 'Bullet.', '', '', 0, 0, 0, 0, '2020-08-11 09:13:51'),
(515, 66, 4317, 167, 0, 0, 26, 'I like bullet points.', '', '', 0, 0, 0, 0, '2020-08-11 09:16:46'),
(516, 66, 4318, 167, 0, 1, 26, 'More bullets.', '', '', 0, 0, 0, 0, '2020-08-11 09:16:46'),
(517, 66, 4319, 167, 0, 2, 26, 'Bullet.', '', '', 0, 0, 0, 0, '2020-08-11 09:16:46'),
(518, 67, 4320, 167, 0, 0, 26, 'I like bullet points.', '', '', 0, 0, 0, 0, '2020-08-11 09:19:15'),
(519, 67, 4321, 167, 0, 1, 26, 'More bullets.', '', '', 0, 0, 0, 0, '2020-08-11 09:19:15'),
(520, 67, 4322, 167, 0, 2, 10, 'Flag.', '', '', 0, 0, 0, 0, '2020-08-11 09:19:15'),
(521, 68, 3033, 151, 0, 0, 1, 'Cras posuere lacus id pharetra finibus.', '', '', 0, 0, 0, 0, '2020-08-04 10:57:12'),
(522, 68, 3034, 151, 0, 0, 1, 'Cras in turpis maximus, porttitor urna id, luctus turpis.', '', '', 0, 0, 0, 0, '2020-08-04 10:57:12'),
(523, 68, 3035, 151, 0, 1, 14, 'Maecenas varius justo vel felis luctus, non consequat erat sollicitudin.', '', '', 0, 0, 0, 0, '2020-08-04 10:57:12'),
(524, 68, 3036, 151, 0, 1, 14, 'Phasellus sagittis lectus at nulla pretium efficitur.', '', '', 0, 0, 0, 0, '2020-08-04 10:57:12'),
(525, 68, 3037, 151, 0, 0, 17, 'Aliquam commodo tellus vitae lacus', 'https://www.lipsum.com/feed/html', 'Lorem Ipsum', 1, 0, 0, 0, '2020-08-04 10:57:12'),
(526, 68, 3038, 151, 0, 0, 3, 'Praesent rhoncus auctor elementum.', '', '', 1, 0, 0, 0, '2020-08-04 10:57:12'),
(527, 68, 3039, 151, 0, 0, 8, 'Proin ac finibus dui.', '', '', 0, 0, 0, 0, '2020-08-04 10:57:12'),
(528, 69, 3060, 152, 0, 0, 20, '', 'http://placekitten.com/100/300', 'Cat 1', 0, 0, 0, 0, '2020-08-04 11:00:16'),
(529, 69, 3061, 152, 0, 0, 20, '', 'http://placekitten.com/200/200', 'Cat 2', 0, 0, 0, 0, '2020-08-04 11:00:16'),
(530, 69, 3062, 152, 0, 0, 20, '', 'http://placekitten.com/150/250', 'Cat 3', 0, 0, 0, 0, '2020-08-04 11:00:16'),
(531, 69, 3063, 152, 0, 0, 20, '', 'http://placekitten.com/250/150', 'Cat 4', 0, 0, 0, 0, '2020-08-04 11:00:16'),
(532, 70, 4364, 154, 0, 0, 26, 'Check the estimated annual energy cost for each utility', '', '', 0, 0, 0, 0, '2020-08-13 19:46:04'),
(533, 70, 4365, 154, 0, 1, 14, 'Is the total annual energy cost suitable for an IAC Assessment? ', '', '', 0, 0, 0, 0, '2020-08-13 19:46:04'),
(534, 70, 4366, 154, 0, 2, 3, '$100,000 a year is the minimum but ideally costs will exceed $200,000  - $300,000 a year. ', '', '', 0, 0, 0, 0, '2020-08-13 19:46:04'),
(535, 70, 4367, 154, 0, 2, 3, 'If annual cost exceeds $2.5 Million, Field Manager / U.S.DOE permission must be obtained to visit. ', '', '', 0, 0, 0, 0, '2020-08-13 19:46:04'),
(536, 70, 4368, 154, 0, 0, 26, 'Accumulate / analyze annual month by month utility bills. ', '', '', 0, 0, 0, 0, '2020-08-13 19:46:04'),
(537, 70, 4369, 154, 0, 1, 12, 'Identify any seasonality to bills.', '', '', 0, 0, 0, 0, '2020-08-13 19:46:04'),
(538, 70, 4370, 154, 0, 1, 12, 'Determine incremental costs (Potential savings with each unit of resource saved )', '', '', 0, 0, 0, 0, '2020-08-13 19:46:04'),
(539, 70, 4371, 154, 0, 1, 12, 'Understand special costs: Electrical Demand and Power Factor cost, meter costs, ...', '', '', 0, 0, 0, 0, '2020-08-13 19:46:04'),
(540, 70, 4372, 154, 0, 1, 12, 'Confirm estimated annual costs ', '', '', 0, 0, 0, 0, '2020-08-13 19:46:04'),
(541, 70, 4373, 154, 0, 0, 26, 'Ensure all personnel information provided is entered into the OSU IAC Project Management DB', '', '', 0, 0, 0, 0, '2020-08-13 19:46:04'),
(542, 70, 4374, 154, 0, 0, 26, 'Review potential incentive and assistance programs available to the client through their utilities', '', '', 0, 0, 0, 0, '2020-08-13 19:46:04'),
(543, 70, 4375, 154, 0, 0, 14, '(If the client has given permission, consider how to engage utility representatives (and regional incentive and assistance programs such as  ETO or ESI  in the remote assessment process)?', '', '', 0, 0, 0, 0, '2020-08-13 19:46:04'),
(544, 71, 4376, 154, 0, 0, 26, 'Check the estimated annual energy cost for each utility', '', '', 0, 0, 0, 0, '2020-08-13 19:49:23'),
(545, 71, 4377, 154, 0, 1, 14, 'Is the total annual energy cost suitable for an IAC Assessment? ', '', '', 0, 0, 0, 0, '2020-08-13 19:49:23'),
(546, 71, 4378, 154, 0, 2, 3, '$100,000 a year is the minimum but ideally costs will exceed $200,000  - $300,000 a year. ', '', '', 0, 0, 0, 0, '2020-08-13 19:49:23'),
(547, 71, 4379, 154, 0, 2, 3, 'If annual cost exceeds $2.5 Million, Field Manager / U.S.DOE permission must be obtained to visit. ', '', '', 0, 0, 0, 0, '2020-08-13 19:49:23'),
(548, 71, 4380, 154, 0, 0, 26, 'Accumulate / analyze annual month by month utility bills. ', '', '', 0, 0, 0, 0, '2020-08-13 19:49:23'),
(549, 71, 4381, 154, 0, 1, 12, 'Identify any seasonality to bills.', '', '', 0, 0, 0, 0, '2020-08-13 19:49:23'),
(550, 71, 4382, 154, 0, 1, 12, 'Determine incremental costs (Potential savings with each unit of resource saved )', '', '', 0, 0, 0, 0, '2020-08-13 19:49:23'),
(551, 71, 4383, 154, 0, 1, 12, 'Understand special costs: Electrical Demand and Power Factor cost, meter costs, ...', '', '', 0, 0, 0, 0, '2020-08-13 19:49:23'),
(552, 71, 4384, 154, 0, 1, 12, 'Confirm estimated annual costs ', '', '', 0, 0, 0, 0, '2020-08-13 19:49:23'),
(553, 71, 4385, 154, 0, 0, 26, 'Ensure all personnel information provided is entered into the OSU IAC Project Management DB', '', '', 0, 0, 0, 0, '2020-08-13 19:49:23'),
(554, 71, 4386, 154, 0, 0, 26, 'Review potential incentive and assistance programs available to the client through their utilities', '', '', 0, 0, 0, 0, '2020-08-13 19:49:23'),
(555, 71, 4387, 154, 0, 0, 14, 'If the client has given permission, consider how to engage utility representatives (and regional incentive and assistance programs such as  ETO or ESI  in the remote assessment process)?', '', '', 0, 0, 0, 0, '2020-08-13 19:49:23'),
(556, 72, 4388, 157, 0, 0, 26, 'Develop a table of significant energy using equipment including collected rated capacity, estimated % of full capacity, and hours of operation', '', '', 0, 0, 0, 0, '2020-08-13 19:54:12'),
(557, 72, 4389, 157, 0, 1, 12, 'Calculate an initial estimate of annual energy used by each piece of equipment', '', '', 0, 0, 0, 0, '2020-08-13 19:54:12'),
(558, 72, 4390, 157, 0, 1, 12, 'Develop a pie chart showing % of total site energy each modeled equipment item uses, and remaining unidentified energy use.', '', '', 0, 0, 0, 0, '2020-08-13 19:54:12'),
(559, 72, 4391, 157, 0, 2, 14, 'Does the total modeled energy exceed the actual energy in the bills? (If so, revise the model.) ', '', '', 0, 0, 0, 0, '2020-08-13 19:54:12'),
(560, 72, 4392, 157, 0, 1, 12, 'Plan to continually revise and improve this balance over the process of the remote assessment.', '', '', 0, 0, 0, 0, '2020-08-13 19:54:12'),
(561, 72, 4393, 157, 0, 2, 14, 'Does more equipment come up that can be added?', '', '', 0, 0, 0, 0, '2020-08-13 19:54:12'),
(562, 72, 4394, 157, 0, 2, 14, 'Does better data become available on any modeled equipment to improve its annual energy use estimate??', '', '', 0, 0, 0, 0, '2020-08-13 19:54:12'),
(563, 73, 4395, 157, 0, 0, 26, 'Develop a table of significant energy using equipment including collected rated capacity, estimated % of full capacity, and hours of operation', '', '', 0, 0, 0, 0, '2020-08-13 19:54:40'),
(564, 73, 4396, 157, 0, 1, 12, 'Calculate an initial estimate of annual energy used by each piece of equipment', '', '', 0, 0, 0, 0, '2020-08-13 19:54:40'),
(565, 73, 4397, 157, 0, 1, 12, 'Develop a pie chart showing % of total site energy each modeled equipment item uses, and remaining unidentified energy use.', '', '', 0, 0, 0, 0, '2020-08-13 19:54:40'),
(566, 73, 4398, 157, 0, 2, 14, 'Does the total modeled energy exceed the actual energy in the bills? (If so, revise the model.) ', '', '', 0, 0, 0, 0, '2020-08-13 19:54:40'),
(567, 73, 4399, 157, 0, 1, 12, 'Plan to continually revise and improve this balance over the process of the remote assessment.', '', '', 0, 0, 0, 0, '2020-08-13 19:54:40'),
(568, 73, 4400, 157, 0, 2, 14, 'Does more equipment come up that can be added?', '', '', 0, 0, 0, 0, '2020-08-13 19:54:40'),
(569, 73, 4401, 157, 0, 2, 14, 'Does better data become available on any modeled equipment to improve its annual energy use estimate?', '', '', 0, 0, 0, 0, '2020-08-13 19:54:40'),
(570, 74, 2955, 77, 0, 0, 11, 'Reduce Inlet Air Temperature ', '', '', 1, 0, 0, 0, '2020-07-30 02:31:10'),
(571, 74, 2956, 77, 0, 1, 13, 'Reducing the inlet air temperature of oil-injected screw compressors increases mass flow rate while maintaining power input. To efficiently maintain current mass flow rate a variable frequency drive is required to reduce the motor speed and associated power.', '', '', 0, 0, 0, 0, '2020-07-30 02:31:10'),
(572, 74, 2957, 77, 0, 1, 10, 'High ambient temperature at the air inlet', '', '', 0, 0, 0, 0, '2020-07-30 02:31:10'),
(573, 74, 2958, 77, 0, 1, 10, 'Difficulty meeting a compressor\'s rated air capacity', '', '', 0, 0, 0, 0, '2020-07-30 02:31:10'),
(574, 74, 2959, 77, 0, 1, 10, 'A compressor running hotter than its specifications', '', '', 0, 0, 0, 0, '2020-07-30 02:31:10'),
(575, 74, 2960, 77, 0, 2, 8, 'Other factors may be at play such as significant air leaks increasing the load on the compressor', '', '', 0, 0, 0, 0, '2020-07-30 02:31:10'),
(576, 74, 2961, 77, 0, 1, 3, '1.9% efficiency (scfm/kW) improvement per 10 °F reduction at inlet', '', '', 0, 0, 0, 0, '2020-07-30 02:31:10'),
(577, 74, 2962, 77, 0, 1, 15, 'Compressor make, model, and nameplate data', '', '', 0, 0, 0, 0, '2020-07-30 02:31:10'),
(578, 74, 2963, 77, 0, 1, 15, 'Motor nameplate data, live power reading, and one week of amperage data', '', '', 0, 0, 0, 0, '2020-07-30 02:31:10'),
(579, 74, 2964, 77, 0, 1, 15, 'Complete picture of compressed air system and control strategy', '', '', 0, 0, 0, 0, '2020-07-30 02:31:10'),
(580, 74, 2965, 77, 0, 1, 15, 'Average ambient temperature at current and proposed inlet locations', '', '', 0, 0, 0, 0, '2020-07-30 02:31:10'),
(581, 74, 2966, 77, 0, 1, 12, 'Move air inlet to coolest location to reduce power and energy consumption', '', '', 0, 0, 0, 0, '2020-07-30 02:31:10'),
(582, 74, 2967, 77, 0, 1, 8, 'If implementation requires much more than re-ducting, the chances of this opportunitity being worthwhile are low. ', '', '', 0, 0, 0, 0, '2020-07-30 02:31:10'),
(583, 74, 2968, 77, 0, 1, 21, 'An OSU EEC Analysis Template in Microsoft Excel Format', 'https://oregonstate.box.com/s/zk1aol8rf88aul9klflbxkikz6l2ku47', 'Analysis Template: Reduce Inlet Air Temperature', 2, 0, 0, 0, '2020-07-30 02:31:10'),
(584, 74, 2969, 77, 0, 1, 17, 'An article from Compressed Air Best Practices by  Tim Dugan, P.E., President, Compression Engineering Corporation', 'https://www.airbestpractices.com/system-assessments/compressor-controls/inlet-air-temperature-impacts-air-compressor-performance', 'Inlet Air Temperature Impacts on Air Compressor Performance', 1, 0, 0, 0, '2020-07-30 02:31:10'),
(585, 74, 2970, 77, 0, 0, 11, 'Increase Primary Receiver Capacity', '', '', 0, 0, 0, 0, '2020-07-30 02:31:10'),
(586, 74, 2971, 77, 0, 1, 13, 'Insufficient receiver capacity can result in short cycling in oil-injected rotary screw compressors that use load-unload controls. Short cycling occurs when system demand forces a compressor to re-load before unload power has been fully realized, causing the compressor to cycle too frequently. Adding receiver capacity increases system efficiency by reducing cycling losses and time spent at partial loads. ', '', '', 0, 0, 0, 0, '2020-07-30 02:31:10'),
(587, 74, 2972, 77, 0, 1, 10, 'Current receiver capacity for an oil-injected rotary screw compressor is less than 3 gal/cfm', '', '', 0, 0, 0, 0, '2020-07-30 02:31:10'),
(588, 74, 2973, 77, 0, 1, 10, 'An oil-injected rotary screw compressor consistently unloads for less than 45 seconds', '', '', 0, 0, 0, 0, '2020-07-30 02:31:10'),
(589, 74, 2974, 77, 0, 1, 3, 'A minimum of 3 gal/cfm receiver capacity is recommended for oil-injected rotary screw compressors ', '', '', 0, 0, 0, 0, '2020-07-30 02:31:10'),
(590, 74, 2975, 77, 0, 1, 1, 'Improved system efficiency due to reduced cycling frequency ', '', '', 0, 0, 0, 0, '2020-07-30 02:31:10'),
(591, 74, 2976, 77, 0, 1, 1, 'Critical pressure applications are shielded from pressure fluctuations', '', '', 0, 0, 0, 0, '2020-07-30 02:31:10'),
(592, 74, 2977, 77, 0, 1, 1, 'Prevents overloading the compressor\'s motor by allowing for a lower pressure set point ', '', '', 0, 0, 0, 0, '2020-07-30 02:31:10'),
(593, 74, 2978, 77, 0, 1, 15, 'Compressor and motor nameplate data and specifications including unload capacity and power', '', '', 0, 0, 0, 0, '2020-07-30 02:31:10'),
(594, 74, 2979, 77, 0, 1, 15, 'Week-long amperage data log that represents typical operation to identify when and if short cycling occurs ', '', '', 0, 0, 0, 0, '2020-07-30 02:31:10'),
(595, 74, 2980, 77, 0, 1, 15, 'Current receiver capacity and operating pressure', '', '', 0, 0, 0, 0, '2020-07-30 02:31:10'),
(596, 74, 2981, 77, 0, 1, 21, 'An OSU EEC Analysis Template in Microsoft Excel Format', 'https://oregonstate.box.com/s/fksaccw3fhif7h70nkynzwlbbu26g608', 'Analysis Template: Increase Air Receiver Capacity', 2, 0, 0, 0, '2020-07-30 02:31:10'),
(597, 74, 2982, 77, 0, 1, 20, '', 'https://drive.google.com/file/d/1OV8lp9LoQl2dsUxOvEc8l8ppHLB5JWbY/view?usp=sharing', 'Effect of Receiver Capacity on Lubricant-Injected Rotary Compressor with Load-Unload Capacity Control', 0, 0, 0, 0, '2020-07-30 02:31:10'),
(598, 74, 2983, 77, 0, 0, 11, 'Use a more efficient control strategy', '', '', 1, 0, 0, 0, '2020-07-30 02:31:10'),
(599, 74, 2984, 77, 0, 0, 11, 'Use a compressed air sequencer for multiple compressors', '', '', 0, 0, 0, 0, '2020-07-30 02:31:10'),
(600, 75, 4488, 156, 0, 0, 13, 'This meeting is analogous to the what the OSU IAC has traditionally called the \"Pre-Audit Walkthrough Phone Call\" (excluding site visit logistics, safety and PPE discussion)', '', '', 0, 0, 0, 0, '2020-08-17 21:28:40'),
(601, 75, 4489, 156, 0, 0, 26, 'Have the client(s) verbally  \"walk us through\" their process, highlighting key energy intensive processes', '', '', 0, 0, 0, 0, '2020-08-17 21:28:40'),
(602, 75, 4490, 156, 0, 1, 14, 'Ask client(s) to let us know of any areas of concern or interest', '', '', 0, 0, 0, 0, '2020-08-17 21:28:40'),
(603, 75, 4491, 156, 0, 1, 14, 'Ask for rated capacity, estimated % of full capacity, and hours of operation for significant equipment discussed.', '', '', 0, 0, 0, 0, '2020-08-17 21:28:40'),
(604, 75, 4492, 156, 0, 1, 8, 'Estimates of the number of smaller motor of various sizes with average load and hours can also be helpful.', '', '', 0, 0, 0, 0, '2020-08-17 21:28:40'),
(605, 75, 4493, 156, 0, 1, 14, 'Are common utilities such as compressed air, lighting, heating, etc covered in the conversation?', '', '', 0, 0, 0, 0, '2020-08-17 21:28:40'),
(606, 75, 4494, 156, 0, 0, 26, 'Discuss proposed process for remote assessment going forward (we are still learning and developing this process)', '', '', 0, 0, 0, 0, '2020-08-17 21:28:40'),
(607, 75, 4495, 156, 0, 0, 8, 'Try to get more than one key contact at the site involved in the project. (Plant manager, Fiscal Decision Maker, Maintenance Manager, Floor Personnel, Energy Lead, etc)', '', '', 0, 0, 0, 0, '2020-08-17 21:28:40'),
(608, 76, 4496, 156, 0, 0, 13, 'This meeting is analogous to the what the OSU IAC has traditionally called the \"Pre-Audit Walkthrough Phone Call\" (excluding site visit logistics, safety and PPE discussion)', '', '', 0, 0, 0, 0, '2020-08-17 21:29:45'),
(609, 76, 4497, 156, 0, 0, 26, 'Have the client(s) verbally  \"walk us through\" their process, highlighting key energy intensive processes', '', '', 0, 0, 0, 0, '2020-08-17 21:29:45'),
(610, 76, 4498, 156, 0, 1, 14, 'Ask client(s) to let us know of any areas of concern or interest', '', '', 0, 0, 0, 0, '2020-08-17 21:29:45'),
(611, 76, 4499, 156, 0, 1, 14, 'Ask for rated capacity, estimated % of full capacity, and hours of operation for significant equipment discussed.', '', '', 0, 0, 0, 0, '2020-08-17 21:29:45'),
(612, 76, 4500, 156, 0, 2, 8, 'Estimates of the number of smaller motor of various sizes with average load and hours can also be helpful.', '', '', 0, 0, 0, 0, '2020-08-17 21:29:45'),
(613, 76, 4501, 156, 0, 1, 14, 'Are common utilities such as compressed air, lighting, heating, etc covered in the conversation?', '', '', 0, 0, 0, 0, '2020-08-17 21:29:45'),
(614, 76, 4502, 156, 0, 0, 26, 'Discuss proposed process for remote assessment going forward (we are still learning and developing this process)', '', '', 0, 0, 0, 0, '2020-08-17 21:29:45'),
(615, 76, 4503, 156, 0, 0, 8, 'Try to get more than one key contact at the site involved in the project. (Plant manager, Fiscal Decision Maker, Maintenance Manager, Floor Personnel, Energy Lead, etc)', '', '', 0, 0, 0, 0, '2020-08-17 21:29:45'),
(616, 77, 3892, 164, 0, 0, 24, '$empty', 'https://eec.oregonstate.edu/wastewater-treatment-training-module', 'Wastewater Treatment Training', 0, 0, 0, 0, '2020-08-06 22:33:54'),
(617, 78, 4118, 163, 0, 0, 11, 'Control Aeration to Hold a Minimum Dissolved Oxygen Level', '', '', 0, 0, 0, 0, '2020-08-06 23:36:56'),
(618, 78, 4119, 163, 0, 0, 11, 'Replace Standard Aeration Fans with High Efficiency Turbo Blowers', '', '', 0, 0, 0, 0, '2020-08-06 23:36:56'),
(619, 78, 4120, 163, 0, 0, 11, 'Improve Efficiency of Fine Bubble Diffusers', '', '', 0, 0, 0, 0, '2020-08-06 23:36:56'),
(620, 79, 4444, 175, 0, 0, 11, 'Use digester gas in a dual fuel boiler', '', '', 0, 0, 0, 0, '2020-08-17 18:11:37'),
(621, 79, 4445, 175, 0, 0, 11, 'Clean and concentrate digester gas for sale to natural gas utility', '', '', 0, 0, 0, 0, '2020-08-17 18:11:37'),
(622, 80, 4446, 176, 0, 0, 11, 'Control UV Disinfection to minimum required', '', '', 0, 0, 0, 0, '2020-08-17 18:16:44'),
(623, 81, 4447, 126, 0, 0, 17, '$empty', '/wiki/technologies/45', 'Pumps', 0, 0, 0, 0, '2020-08-17 20:33:44'),
(624, 82, 733, 81, 0, 0, 1, 'Centrifugal pumps are capable of developing a wide range of flow and pressures', '', '', 0, 0, 0, 0, '2020-07-01 18:14:32'),
(625, 83, 4546, 122, 0, 0, 2, 'Actual efficiency can easily vary from 50 percent to 80 percent for optimum operation of a particular pump', '', '', 0, 0, 0, 0, '2020-08-18 21:24:36'),
(626, 84, 2179, 123, 0, 0, 17, 'MEASUR is open source software that consists of the following DOE legacy energy system assessment tools (updated): Pumping System Assessment Tool (PSAT), Process Heating Assessment and Survey Tool (PHAST), Fan System Assessment Tool (FSAT), Steam System Assessment Tool (SSAT)/ Steam System Modeler (SSMT), AIRMaster+ (Last accessed 12/2/2019)   ', 'https://www.energy.gov/eere/amo/measur', 'U.S. Department of Energy MEASUR analysis tool', 1, 0, 0, 0, '2020-07-07 18:00:00'),
(627, 85, 4532, 124, 0, 0, 17, 'See pump tip sheets.', 'https://www.energy.gov/eere/amo/tip-sheets-system', 'U.S.DOE Energy Tip Sheets by System', 1, 0, 0, 0, '2020-08-18 21:02:19'),
(628, 86, 4696, 178, 0, 0, 7, 'Install pressure gauges on all pump outlets for a key indicator of system performance.', '', '', 0, 0, 0, 0, '2020-08-20 00:42:22'),
(629, 86, 4697, 178, 0, 0, 7, 'Install a pressure gage at the inlets of pumps not drawing from a local reservoir for a 2nd key indicator of system performance', '', '', 1, 0, 0, 0, '2020-08-20 00:42:22'),
(630, 86, 4698, 178, 0, 0, 7, 'Install flow meters on high operating cost pumps or banks of pumps for a 3rd key indicator of system performance', '', '', 1, 0, 0, 0, '2020-08-20 00:42:22'),
(631, 86, 4699, 178, 0, 1, 8, 'Consider needs of temporary ultrasonic flow meters for pump installations that will not include an in-line flow meter. ', '', '', 1, 0, 0, 0, '2020-08-20 00:42:22'),
(632, 86, 4700, 178, 0, 0, 7, 'Operate pumps between 85% and 110% of their best efficiency point (BEP)', '', '', 0, 0, 0, 0, '2020-08-20 00:42:22'),
(633, 86, 4701, 178, 0, 0, 7, 'Use VFD control if the pump operates at multiple flow conditions, particularly for looped flow circuits.', '', '', 0, 0, 0, 0, '2020-08-20 00:42:22'),
(634, 86, 4702, 178, 0, 1, 4, 'For high static head conditions (pumping to high pressure vessel or high elevation tank) Take care in evaluating pump operation with VFD control.  Pumps can be forced into low efficiency, high wear conditions with inappropriate high static head VFD control.', '', '', 1, 0, 0, 0, '2020-08-20 00:42:22'),
(635, 86, 4703, 178, 0, 0, 17, 'Comprehensive list of pump selection, installation, and operation best practices.', 'http://www.flowserve.com/sites/default/files/2016-07/pss-10-13.5-e.pdf', 'Flowserve: Best Practices for ANSI Pumps', 1, 0, 0, 0, '2020-08-20 00:57:26'),
(636, 87, 4706, 180, 0, 0, 3, 'One PSI = 2.31 Feet of water', '', '', 0, 0, 0, 0, '2020-08-20 00:48:42'),
(637, 87, 4707, 180, 0, 0, 3, 'When designing a pump system it is important to consider the pump\'s net positive suction head required (NPSHR). A general design criteria is that the net positive suction head available (NPSHA) exceeds the NPSHR by at least 25% over the expected range of operating flow rates.', '', '', 0, 0, 0, 0, '2020-08-20 00:48:42'),
(638, 88, 4639, 182, 0, 0, 4, 'Improperly designed pump systems can lead to low pressures at the pump inlet which can lead to cavitation. This can seriously damage the pump and reduce its operating life.', '', '', 0, 0, 0, 0, '2020-08-19 21:52:48'),
(639, 88, 4640, 182, 0, 0, 24, 'Online resource discussing how cavitation occurs and how to detect and prevent it from happening.', 'https://modernpumpingtoday.com/detecting-pump-cavitation/', 'Detecting Pump Cavitation (May be able to find a more comprehensive resource)', 1, 0, 0, 0, '2020-08-19 21:52:48'),
(640, 89, 4711, 178, 0, 0, 7, 'Install pressure gauges on all pump outlets for a key indicator of system performance.', '', '', 0, 0, 0, 0, '2020-08-20 22:33:47'),
(641, 89, 4712, 178, 0, 0, 7, 'Install a pressure gage at the inlets of pumps not drawing from a local reservoir for a 2nd key indicator of system performance', '', '', 1, 0, 0, 0, '2020-08-20 22:33:47'),
(642, 89, 4713, 178, 0, 0, 7, 'Install flow meters on high operating cost pumps or banks of pumps for a 3rd key indicator of system performance', '', '', 1, 0, 0, 0, '2020-08-20 22:33:47'),
(643, 89, 4714, 178, 0, 1, 8, 'Consider needs of temporary ultrasonic flow meters for pump installations that will not include an in-line flow meter. ', '', '', 1, 0, 0, 0, '2020-08-20 22:33:47'),
(644, 89, 4715, 178, 0, 0, 7, 'Operate pumps between 85% and 110% of their best efficiency point (BEP)', '', '', 0, 0, 0, 0, '2020-08-20 22:33:47'),
(645, 89, 4716, 178, 0, 0, 7, 'Use VFD control if the pump operates at multiple flow conditions, particularly for looped flow circuits.', '', '', 0, 0, 0, 0, '2020-08-20 22:33:47'),
(646, 89, 4717, 178, 0, 1, 4, 'For high static head conditions (pumping to high pressure vessel or high elevation tank) take care in evaluating pump operation with VFD control.  Pumps can be forced into low efficiency, high wear conditions with inappropriate high static head VFD control.', '', '', 1, 0, 0, 0, '2020-08-20 22:33:47'),
(647, 89, 4718, 178, 0, 0, 17, 'Comprehensive list of pump selection, installation, and operation best practices.', 'http://www.flowserve.com/sites/default/files/2016-07/pss-10-13.5-e.pdf', 'Flowserve: Best Practices for ANSI Pumps', 1, 0, 0, 0, '2020-08-20 22:33:47'),
(648, 90, 4641, 161, 0, 0, 26, 'Review the client\'s web site', '', '', 0, 0, 0, 0, '2020-08-19 22:39:25'),
(649, 90, 4642, 161, 0, 0, 26, 'Develop a list of typical opportunities found in the site\'s industrial sector. BE SURE to add any newly identified opportunities to this site!', '', '', 0, 0, 0, 0, '2020-08-19 22:39:25'),
(650, 90, 4643, 161, 0, 1, 7, 'Assign each of the searches suggested below to one member of the assessment team. ', '', '', 0, 0, 0, 0, '2020-08-19 22:39:25'),
(651, 90, 4644, 161, 0, 1, 8, ' The IAC University Database allows you to search for common recommendations made by SIC or NAICS code ', '', '', 0, 0, 0, 0, '2020-08-19 22:39:25'),
(652, 90, 4645, 161, 0, 2, 24, '$empty', 'https://iac.university/searchRecommendations', 'IAC University: Search IAC Recommendations', 1, 0, 0, 0, '2020-08-19 22:39:25'),
(653, 90, 4646, 161, 0, 2, 1, 'The IAC University Database also allows you to search for the top 10 recommendations, the number of assessments and results by industry grouping. Note: one useful search field under assessments: \"Product Type\" can help find similar assessments.', '', '', 0, 0, 0, 0, '2020-08-19 22:39:25'),
(654, 90, 4647, 161, 0, 1, 8, 'Search the OSU IAC Project Management Database to see what we have recommended in the past at similar sites. Note: the search box in the upper right corner is a useful tool for this.', '', '', 0, 0, 0, 0, '2020-08-19 22:39:25'),
(655, 90, 4648, 161, 0, 2, 24, '$empty', 'https://eec.oregonstate.edu/tracking2/modules/login/login.php', 'EEC Project Management', 0, 0, 0, 0, '2020-08-19 22:39:25'),
(656, 90, 4649, 161, 0, 1, 8, 'General internet and literature research can surface new opportunities to consider.  BE SURE to add any newly identified resources to this site!', '', '', 0, 0, 0, 0, '2020-08-19 22:39:25'),
(657, 90, 4650, 161, 0, 2, 1, 'U.S.DOE, Vendor, Other IAC, State Energy Office, and Industrial Association web sites are all among good places to search for resources.', '', '', 0, 0, 0, 0, '2020-08-19 22:39:25'),
(658, 90, 4651, 161, 0, 1, 17, '(item not added yet)', 'abc.com', 'Example List of Common Opportunities', 0, 0, 0, 0, '2020-08-19 22:39:25'),
(659, 91, 4566, 154, 0, 0, 26, 'Check the estimated annual energy cost for each utility', '', '', 0, 0, 0, 0, '2020-08-18 21:48:18'),
(660, 91, 4567, 154, 0, 1, 14, 'Is the total annual energy cost suitable for an IAC Assessment? ', '', '', 0, 0, 0, 0, '2020-08-18 21:48:18'),
(661, 91, 4568, 154, 0, 2, 3, '$100,000 a year is the minimum but ideally costs will exceed $200,000  - $300,000 a year. ', '', '', 0, 0, 0, 0, '2020-08-18 21:48:18'),
(662, 91, 4569, 154, 0, 2, 3, 'If annual cost exceeds $2.5 Million, Field Manager / U.S.DOE permission must be obtained to visit. ', '', '', 0, 0, 0, 0, '2020-08-18 21:48:18'),
(663, 91, 4570, 154, 0, 0, 26, 'Accumulate / analyze annual month by month utility bills. ', '', '', 0, 0, 0, 0, '2020-08-18 21:48:18'),
(664, 91, 4571, 154, 0, 1, 12, 'Identify any seasonality to bills.', '', '', 0, 0, 0, 0, '2020-08-18 21:48:18'),
(665, 91, 4572, 154, 0, 1, 12, 'Determine incremental costs (Potential savings with each unit of resource saved )', '', '', 0, 0, 0, 0, '2020-08-18 21:48:18'),
(666, 91, 4573, 154, 0, 1, 12, 'Understand special costs: Electrical Demand and Power Factor cost, meter costs, ...', '', '', 0, 0, 0, 0, '2020-08-18 21:48:18'),
(667, 91, 4574, 154, 0, 1, 12, 'Confirm estimated annual costs ', '', '', 0, 0, 0, 0, '2020-08-18 21:48:18'),
(668, 91, 4575, 154, 0, 1, 17, '(item not added yet)', 'abc.com', 'Example Utility Baseline Analysis', 0, 0, 0, 0, '2020-08-18 21:48:18'),
(669, 91, 4576, 154, 0, 0, 26, 'Ensure all personnel information provided is entered into the OSU IAC Project Management DB', '', '', 0, 0, 0, 0, '2020-08-18 21:48:18'),
(670, 91, 4577, 154, 0, 0, 26, 'Review potential incentive and assistance programs available to the client through their utilities', '', '', 0, 0, 0, 0, '2020-08-18 21:48:18'),
(671, 91, 4578, 154, 0, 0, 14, 'If the client has given permission, consider how to engage utility representatives (and regional incentive and assistance programs such as  ETO or ESI  in the remote assessment process)?', '', '', 0, 0, 0, 0, '2020-08-18 21:48:18'),
(672, 92, 4995, 156, 0, 0, 13, 'This meeting is analogous to the what the OSU IAC has traditionally called the \"Pre-Audit Walkthrough Phone Call\" (excluding site visit logistics, safety and PPE discussion)', '', '', 0, 0, 0, 0, '2020-09-03 20:03:28'),
(673, 92, 4996, 156, 0, 0, 26, 'Have the client(s) verbally  \"walk us through\" their process, highlighting key energy intensive processes', '', '', 0, 0, 0, 0, '2020-09-03 20:03:28'),
(674, 92, 4997, 156, 0, 1, 14, 'Ask client(s) to let us know of any areas of concern or interest', '', '', 0, 0, 0, 0, '2020-09-03 20:03:28'),
(675, 92, 4998, 156, 0, 1, 14, 'Ask for rated capacity, estimated % of full capacity, and hours of operation for significant equipment discussed.', '', '', 0, 0, 0, 0, '2020-09-03 20:03:28'),
(676, 92, 4999, 156, 0, 2, 8, 'Estimates of the number of smaller motor of various sizes with average load and hours can also be helpful.', '', '', 0, 0, 0, 0, '2020-09-03 20:03:28'),
(677, 92, 5000, 156, 0, 1, 14, 'Are common utilities such as compressed air, lighting, heating, etc covered in the conversation?', '', '', 0, 0, 0, 0, '2020-09-03 20:03:28'),
(678, 92, 5001, 156, 0, 0, 26, 'Discuss proposed process for remote assessment going forward (we are still learning and developing this process)', '', '', 0, 0, 0, 0, '2020-09-03 20:03:28'),
(679, 92, 5002, 156, 0, 0, 8, 'Try to get more than one key contact at the site involved in the project. (Plant manager, Fiscal Decision Maker, Maintenance Manager, Floor Personnel, Energy Lead, etc)', '', '', 0, 0, 0, 0, '2020-09-03 20:03:28'),
(680, 92, 5003, 156, 0, 0, 17, '(Item not added yet)', 'abc.com', 'Pre-Audit Walkthrough Phone Call Checklist', 0, 0, 0, 0, '2020-09-03 20:03:28'),
(681, 92, 5004, 156, 0, 0, 14, 'How best could we get Utility & Incentive Representatives involved (if the client permits) ', '', '', 0, 0, 0, 0, '2020-09-03 20:03:28'),
(682, 93, 4625, 157, 0, 0, 26, 'Develop a table of significant energy using equipment including collected rated capacity, estimated % of full capacity, and hours of operation', '', '', 0, 0, 0, 0, '2020-08-18 21:54:52'),
(683, 93, 4626, 157, 0, 1, 12, 'Calculate an initial estimate of annual energy used by each piece of equipment', '', '', 0, 0, 0, 0, '2020-08-18 21:54:52'),
(684, 93, 4627, 157, 0, 1, 12, 'Develop a pie chart showing % of total site energy each modeled equipment item uses, and remaining unidentified energy use.', '', '', 0, 0, 0, 0, '2020-08-18 21:54:52'),
(685, 93, 4628, 157, 0, 2, 14, 'Does the total modeled energy exceed the actual energy in the bills? (If so, revise the model.) ', '', '', 0, 0, 0, 0, '2020-08-18 21:54:52'),
(686, 93, 4629, 157, 0, 1, 12, 'Plan to continually revise and improve this balance over the process of the remote assessment.', '', '', 0, 0, 0, 0, '2020-08-18 21:54:52'),
(687, 93, 4630, 157, 0, 2, 14, 'Does more equipment come up that can be added?', '', '', 0, 0, 0, 0, '2020-08-18 21:54:52'),
(688, 93, 4631, 157, 0, 2, 14, 'Does better data become available on any modeled equipment to improve its annual energy use estimate?', '', '', 0, 0, 0, 0, '2020-08-18 21:54:52'),
(689, 93, 4632, 157, 0, 1, 17, '(Item not added yet)', 'osu.edu', 'Example Energy Balance', 0, 0, 0, 0, '2020-08-18 21:54:52'),
(690, 94, 4520, 162, 0, 0, 13, 'This is a requirement for U.S.DOE to accept our remote assessment as a deliverable on our contract. It might be done in one session or iteratively in multiple sessions.', '', '', 0, 0, 0, 0, '2020-08-17 21:38:35'),
(691, 94, 4521, 162, 0, 0, 26, 'Begin with a review of preparatory work including the intitial energy balance, and list of possible opportunities.', '', '', 0, 0, 0, 0, '2020-08-17 21:38:35'),
(692, 94, 4522, 162, 0, 0, 26, 'Discuss the best strategy to use for a Guided Remote Tour. This might be: ', '', '', 0, 0, 0, 0, '2020-08-17 21:38:35'),
(693, 94, 4523, 162, 0, 1, 12, 'A standard tour of the process from start to finish, but this could be an overly long time for a Zoom meeting. ', '', '', 0, 0, 0, 0, '2020-08-17 21:38:35'),
(694, 94, 4524, 162, 0, 1, 12, 'A series of shorter remote targeted tours of areas of specific interest. ', '', '', 0, 0, 0, 0, '2020-08-17 21:38:35'),
(695, 94, 4525, 162, 0, 2, 8, 'This strategy is being used by a number of assessment teams', '', '', 0, 0, 0, 0, '2020-08-17 21:38:35'),
(696, 94, 4526, 162, 0, 2, 1, 'Can simplify scheduling if only key team members must join tours of particular areas.  Others can participate based on availability.', '', '', 0, 0, 0, 0, '2020-08-17 21:38:35'),
(697, 95, 4617, 158, 0, 0, 26, 'Review any areas of concern or interest voiced by the client', '', '', 0, 0, 0, 0, '2020-08-18 21:54:33'),
(698, 95, 4618, 158, 0, 0, 26, 'Review typical opportunities found in the energy intensive systems identified at the facility ', '', '', 0, 0, 0, 0, '2020-08-18 21:54:33'),
(699, 95, 4619, 158, 0, 1, 8, 'This Industrial Walkthrough Checklist & Reference will offer more and more ideas for potential opportunities as it is developed over time', '', '', 0, 0, 0, 0, '2020-08-18 21:54:33'),
(700, 95, 4620, 158, 0, 0, 26, 'Review the list of typical opportunities found in the site\'s industrial sector developed in Preliminary Research', '', '', 0, 0, 0, 0, '2020-08-18 21:54:33'),
(701, 95, 4621, 158, 0, 0, 26, 'Pick the brain of anyone with experience in the subject', '', '', 0, 0, 0, 0, '2020-08-18 21:54:33'),
(702, 95, 4622, 158, 0, 0, 26, 'Brainstorm on opportunities as a team and compile a list', '', '', 0, 0, 0, 0, '2020-08-18 21:54:33'),
(703, 95, 4623, 158, 0, 0, 26, 'Develop a table of potential recommendations, and if possible: total energy used by the system related to each opportunity, a high/low estimate of potential % savings,  and the range of potential cost and energy savings potential.', '', '', 0, 0, 0, 0, '2020-08-18 21:54:33'),
(704, 95, 4624, 158, 0, 1, 17, '(Item not added yet)', 'osu.edu', 'Example Table of Potential Opportunities', 0, 0, 0, 0, '2020-08-18 21:54:33'),
(705, 96, 4506, 165, 0, 0, 26, 'What will we do next?', '', '', 0, 0, 0, 0, '2020-08-17 21:32:04'),
(706, 96, 4507, 165, 0, 0, 26, 'How can we get incentive program personnel involved (ETO, ESU, utility reps)?', '', '', 0, 0, 0, 0, '2020-08-17 21:32:04'),
(707, 97, 6081, 227, 0, 0, 15, 'Lorem ipsum dolor sit amet.', '', '', 0, 0, 1, 0, '2020-09-22 20:51:32'),
(708, 97, 6082, 227, 0, 0, 15, 'Maecenas eu ex a turpis laoreet posuere.', '', '', 0, 0, 1, 0, '2020-09-22 20:51:32'),
(709, 97, 6083, 227, 0, 0, 15, 'Lorem ipsum dolor sit amet.', '', '', 0, 0, 1, 0, '2020-09-22 20:51:32'),
(710, 97, 6084, 227, 0, 0, 15, 'Praesent pretium nisl ut nibh tincidunt congue.', '', '', 0, 0, 1, 0, '2020-09-22 20:51:32'),
(711, 97, 6085, 227, 0, 0, 15, 'Quisque aliquet lectus urna.', '', '', 0, 0, 1, 0, '2020-09-22 20:51:32'),
(712, 97, 6086, 227, 0, 0, 15, 'Donec maximus magna vitae tellus.', '', '', 0, 0, 1, 0, '2020-09-22 20:51:32'),
(713, 97, 6087, 227, 0, 0, 26, 'Break', '', '', 0, 0, 0, 0, '2020-09-22 20:51:32'),
(714, 97, 6088, 227, 0, 0, 20, '', '/uploads/user_69/36ff5e73d0f00135f02899d66e41fee3.gif', 'Taco', 0, 0, 1, 0, '2020-09-22 20:51:32'),
(715, 97, 6089, 227, 0, 0, 20, '', '/uploads/user_69/50cbaff5cb58cb5a1882a9c3fe0f9bb3.gif', 'Pizza', 0, 0, 1, 0, '2020-09-22 20:51:32'),
(716, 97, 6090, 227, 0, 0, 20, '', '/uploads/user_69/f313aad3efad3bf51165ce8d0a496cc4.gif', 'Sushi', 0, 0, 1, 0, '2020-09-22 20:51:32'),
(717, 97, 6091, 227, 0, 0, 26, 'Break', '', '', 0, 0, 0, 0, '2020-09-22 20:51:32'),
(718, 97, 6092, 227, 0, 0, 17, '$empty', 'http://placekitten.com/200/300', 'Some Link', 0, 0, 1, 0, '2020-09-22 20:51:32'),
(719, 97, 6093, 227, 0, 0, 24, '$empty', 'http://placekitten.com/200/300', 'Some Link', 2, 0, 1, 0, '2020-09-22 20:51:32'),
(720, 97, 6094, 227, 0, 0, 28, '$empty', 'http://placekitten.com/200/300', 'Some Link', 3, 0, 1, 0, '2020-09-22 20:51:32'),
(721, 98, 6284, 193, 0, 0, 26, 'Power factor represents the portion of the total power drawn by a load that does useful work', '', '', 0, 0, 0, 0, '2020-10-13 20:13:31'),
(722, 98, 6285, 193, 0, 0, 26, 'Power factor is the ratio of real power, in kilowatts (kW), to apparent power, in kilovolt amperes (kVA)', '', '', 0, 0, 0, 0, '2020-10-13 20:13:31'),
(723, 98, 6286, 193, 0, 1, 20, '', '/uploads/user_52/3bacc6ae00660669452ad7219c34b33e.png', 'The power triangle. Power factor is represented by the cosine of the angle (theta) between the total power and real power on the power triangle. ', 0, 0, 0, 0, '2020-10-13 20:13:31'),
(724, 98, 6287, 193, 0, 0, 26, 'Reactive power is needed to create and maintain the magnetic field that rotates the shaft of a motor', '', '', 0, 0, 0, 0, '2020-10-13 20:13:31'),
(725, 98, 6288, 193, 0, 0, 26, 'Inductive loads produce lagging power factor and capacitive loads produce leading power factor. Lagging power factor is most common due to the presence of inductive loads in industrial facilities. In this case, installing capacitors will correct power factor by bringing the current back in phase with the voltage.', '', '', 0, 0, 0, 0, '2020-10-13 20:13:31'),
(726, 99, 5303, 186, 0, 0, 1, 'Improving power factor extends equipment life by reducing the total line current which reduces operating temperatures.', '', '', 0, 0, 0, 0, '2020-09-09 18:12:30'),
(727, 100, 5287, 187, 0, 0, 2, 'Capacitors can amplify harmonics if nonlinear loads are present. Examples of nonlinear loads include variable frequency drives, induction furnaces, arc welders and arc furnaces.', '', '', 0, 0, 0, 4, '2020-09-09 17:57:39'),
(728, 101, 6289, 190, 0, 0, 15, 'Collect one year of electric utility bills. This will help with identifying meters that can benefit from power factor correction and estimating the potential savings for correcting power factor.', '', '', 0, 0, 0, 0, '2020-10-13 20:15:35'),
(729, 99, 5304, 186, 0, 0, 1, 'Improving power factor can significantly reduce monthly electrical utility charges.', '', '', 0, 0, 0, 0, '2020-09-09 18:12:30'),
(730, 101, 6290, 190, 0, 0, 15, 'The method of billing for low power factor can vary depending on the facility\'s electric utility provider. The rate schedule associated with each meter will show how the facility is charged for poor power factor. ', '', '', 0, 0, 0, 0, '2020-10-13 20:15:35'),
(731, 99, 5305, 186, 0, 0, 1, 'Capacitors have no moving parts and require little to no maintenance. It is recommended to check fuses on a regular basis. All capacitors should be checked annually to ensure proper operation.', '', '', 0, 0, 0, 5, '2020-09-09 18:12:30'),
(732, 102, 4842, 189, 0, 0, 17, 'This guide provides information on the fundamentals of power factor, how to improve power factor, example savings calculations for mulitple scenarios, and how to select the right capactior specific applications. Information on harmonics is also included.', 'https://www.eaton.com/ecm/groups/public/%40pub/%40electrical/documents/content/sa02607001e.pdf', 'Eaton - Power Factor Correction: A Guide for the Plant Engineer', 1, 0, 0, 0, '2020-08-26 16:47:50'),
(733, 102, 4843, 189, 0, 0, 17, 'This manual provides technical information for assessing many systems that are commonly found in small to medium sized industrial manufacturing facilities. Chapter 4 section 4.1.4 specifically addresses power factor improvement.', 'https://iac.university/technicalDocs/industr/ch4.pdf', 'Essentials of Industrial Assessments, Chapter 4, Electricity', 1, 0, 0, 0, '2020-08-26 16:47:50'),
(734, 102, 4844, 189, 0, 0, 23, 'This video produced by the The Engineering Mindset on YouTube explains what power factor is, how to calculate power factor, what poor power factor is, and how resistors and capacitors affect power factor.', 'https://www.youtube.com/watch?v=Tv_7XWf96gg', 'Power Factor Explained', 1, 0, 0, 0, '2020-08-26 16:47:50'),
(735, 103, 6291, 192, 0, 0, 10, 'Reactive power charges constitute a considerable portion of the facility\'s electric utility bill', '', '', 0, 0, 0, 0, '2020-10-13 20:17:59'),
(736, 103, 6292, 192, 0, 0, 7, 'Correcting power factor to the threshold reactive power provides the most value to the client without increasing the payback period for this recommendation. The threshold reactive power is the amount of reactive power that can be present on a utility bill before the user incurs additional charges.', '', '', 0, 0, 0, 0, '2020-10-13 20:17:59'),
(737, 103, 6293, 192, 0, 0, 8, 'Fuses are less expensive than new capacitors. If the facility has offline capacitors, determine if they can be put back into use.', '', '', 0, 0, 0, 0, '2020-10-13 20:17:59'),
(738, 103, 6294, 192, 0, 0, 4, 'Harmonic filters should be used in distribution systems with harmonics. Consider consulting with a power management company to have a harmonic analysis completed before purchasing or installing capacitors.', '', '', 0, 0, 0, 4, '2020-10-13 20:17:59'),
(739, 103, 6295, 192, 0, 0, 27, 'A power quality analyzer can be used to determine the power factor for individual pieces of equipment', '', '', 0, 0, 0, 0, '2020-10-13 20:17:59'),
(740, 103, 6296, 192, 0, 0, 11, 'Install individual capacitors', '', '', 0, 0, 0, 0, '2020-10-13 20:17:59'),
(741, 103, 6297, 192, 0, 1, 1, 'Installing individual capacitors at the load (typically at the Motor Control Center to switch in an out with the motor\" can make capacitor selection easy', '', '', 0, 0, 0, 0, '2020-10-13 20:17:59'),
(742, 103, 6298, 192, 0, 1, 1, 'This can be the most economical solution due to low equipment cost', '', '', 0, 0, 0, 4, '2020-10-13 20:17:59'),
(743, 103, 6299, 192, 0, 1, 1, 'The capacitor operates with the motor, so other systems are not affected when the motor is offline', '', '', 0, 0, 0, 0, '2020-10-13 20:17:59'),
(744, 103, 6300, 192, 0, 1, 8, 'For large motors (50 HP and above), install capacitors at the load. For many smaller motors, it may be feasible to install one capacitor for the group of motors.', '', '', 0, 0, 0, 4, '2020-10-13 20:17:59'),
(745, 103, 6301, 192, 0, 0, 11, 'Install a capacitor bank', '', '', 0, 0, 0, 0, '2020-10-13 20:17:59'),
(746, 103, 6302, 192, 0, 1, 26, 'A fixed capacitor bank is suitable for equipment that has little variance in load characteristics', '', '', 0, 0, 0, 0, '2020-10-13 20:17:59'),
(747, 103, 6303, 192, 0, 1, 26, 'Installing automatically switching capacitor banks is the best solution for variable loads because they provide the right amount of power factor correction as loads turn on and off', '', '', 0, 0, 0, 0, '2020-10-13 20:17:59'),
(748, 103, 6304, 192, 0, 1, 1, 'Only one installation is required for a capacitor bank compared to multiple capacitors at the load', '', '', 0, 0, 0, 0, '2020-10-13 20:17:59'),
(749, 103, 6305, 192, 0, 1, 2, 'Automatically switching banks are more expensive than fixed banks or individual capacitors and lead to longer payback periods', '', '', 0, 0, 0, 0, '2020-10-13 20:17:59');

-- --------------------------------------------------------

--
-- Table structure for table `History_Pages`
--

CREATE TABLE `History_Pages` (
  `historyId` int(10) UNSIGNED NOT NULL,
  `pageId` int(11) UNSIGNED NOT NULL,
  `pageType` int(11) UNSIGNED NOT NULL,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(5000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `imageUrl` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `internal` tinyint(3) UNSIGNED NOT NULL,
  `removed` tinyint(3) UNSIGNED NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `History_Pages`
--

INSERT INTO `History_Pages` (`historyId`, `pageId`, `pageType`, `name`, `title`, `description`, `imageUrl`, `internal`, `removed`, `created`) VALUES
(1, 2, 2, 'Compressed Air', 'Compressed air is a common utility found in most industrial facilities', 'Compressed air has been a key industrial utility since the 1800\'s. It can drive pneumatic cylinders, air motors, diaphragm pumps and controls. It is capable of reasonably high force actuation, and is a common required utility in equipment packages. It can be used and is often misused to generate air flow for agitation, blow-off, cooling, and motive force applications. Screw compressors currently comprise the majority of industrial compressed air installations, but reciprocating and centrifugal compressors can be found in older or special installations/applications.', '/images/air.png', 0, 0, '2020-07-23 10:01:49'),
(2, 3, 2, 'z - testing: more stuff', 'Refrigeration is the process of cooling a space, substance, or system to lower and/or maintain its temperature below the ambient one (while the removed heat is rejected at a higher temperature).', 'Refrigeration has had a large impact on industry, lifestyle, agriculture, and settlement patterns. The idea of preserving food dates back to at least the ancient Roman and Chinese empires. However, mechanical refrigeration technology has rapidly evolved in the last century, from ice harvesting to temperature-controlled rail cars. The introduction of refrigerated rail cars contributed to the westward expansion of the United States, allowing settlement in areas that were not on main transport channels such as rivers, harbors, or valley trails. Settlements were also developing in infertile parts of the country, filled with newly discovered natural resources.  These new settlement patterns sparked the building of large cities which are able to thrive in areas that were otherwise thought to be inhospitable, such as Houston, Texas, and Las Vegas, Nevada.', '/images/refrigeration.png', 1, 0, '2020-07-23 10:02:38'),
(3, 46, 2, 'Boilers and Steam', 'Boilers and Steam Systems are found in a large subset of industrial facilities', 'Steam energy offered a great breakthrough in the 1800’s, providing mechanical energy through steam engines. Steam is now more commonly used for heating in cooking vessels, material drying, building heat,  etc. Direct injection of steam can add moisture along with heat. ', 'https://live.staticflickr.com/65535/50070285347_17c30ab100_b.jpg', 0, 0, '2020-07-02 19:39:56'),
(4, 53, 4, 'z - test Demo', 'Basic Testing Page', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam pulvinar, ipsum sed accumsan rutrum, lorem metus laoreet elit, eget pulvinar nisl leo at libero. Morbi sed pharetra dui, a vestibulum sapien. Mauris laoreet aliquet blandit. Mauris tincidunt tempor sem, sed ultrices nisi egestas sit amet. Praesent finibus lobortis sodales. Pellentesque scelerisque hendrerit vestibulum. Morbi nulla odio, vulputate quis dapibus eu, fermentum quis libero. Duis efficitur magna lacinia augue tempor fringilla. Quisque elit metus, dictum ut venenatis non, consequat ac sem. Integer convallis imperdiet velit, sit amet consectetur metus. Phasellus molestie, lectus a lobortis pharetra, felis nibh posuere libero, vel feugiat metus erat id eros. Praesent elementum pulvinar purus non scelerisque. Suspendisse eget ex magna. Nam eu vestibulum tortor. Maecenas ultrices egestas tortor, non varius enim placerat volutpat. Ut at nunc et nisl tincidunt varius vitae sed purus.\n\nAliquam commodo tellus vitae lacus suscipit dignissim. Etiam congue aliquam lacus, vitae ultrices turpis accumsan nec. Proin quam ex, sodales ac pharetra et, volutpat a leo. Curabitur nec neque nunc. Maecenas et mauris aliquet, mattis diam at, rutrum erat. Donec eget efficitur ligula. In eget placerat massa. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod rhoncus fringilla.\n\nCurabitur cursus arcu elit, ut scelerisque sem lobortis quis. Vivamus tristique ex vel sollicitudin sollicitudin. Duis vehicula quam lacus, et iaculis velit ultricies a. Cras tristique mattis felis, vitae aliquet odio lobortis id. Aliquam venenatis ipsum viverra est accumsan blandit. Nunc aliquam eros semper ex facilisis, luctus aliquam sem convallis. Fusce ac nunc ut libero consectetur imperdiet. Maecenas suscipit, nisl non eleifend tincidunt, est libero vestibulum arcu, vel ornare odio ex non sapien. Quisque metus purus, congue non orci at, bibendum ultrices nibh. Ut ut gravida nibh. Phasellus at dolor condimentum odio lobortis facilisis. Pellentesque aliquam porta neque, vitae consequat lorem facilisis eget. Maecenas ut turpis nec dolor lobortis luctus ac consectetur quam.', 'http://placekitten.com/500/500', 1, 0, '2020-08-04 10:53:03'),
(5, 54, 5, 'Remote Assessments', '2020 Covid-19 Remote Assessments Protocol (Draft): A developing summary of the OSU IAC approach for remote assessments in the time of Covid -19', 'With Covid-19 limiting ability for in person facility assessments, the OSU EEC / IAC is focusing on developing a robust protocol for assessing sites remotely.  Once in person assessments are possible, these techniques will only improve the ability of the center to prepare for a typical site visit.\n\nIn the mean time, on the positive side, the team will not have to stop to put on chains on the way to an assessment.', 'https://live.staticflickr.com/65535/50193329247_ef0c9291de_b.jpg', 1, 0, '2020-08-05 19:54:53'),
(9, 59, 2, 'zz - history', 'A page for testing history', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ac aliquet ipsum, et pharetra massa. Mauris fringilla, dui eget tristique posuere, neque urna viverra nisl, ac scelerisque tortor est elementum enim. Maecenas gravida nunc a dui mattis, vestibulum mollis velit maximus. Praesent at eros leo. Sed eget accumsan magna. Nulla nec lacus sit amet velit ultricies gravida a id lectus. Cras euismod porttitor tellus rutrum ullamcorper. Ut facilisis venenatis nibh, a rhoncus orci maximus ac. Praesent fringilla faucibus lectus, at mollis nunc viverra vitae. Pellentesque id ante nec tortor feugiat vehicula.\n\nUt et nunc imperdiet nulla varius pellentesque. Maecenas congue non enim ac bibendum. Praesent eu arcu massa. Etiam eu vehicula dolor. Sed venenatis massa vitae arcu malesuada tincidunt. Cras eu elit in sapien efficitur mollis. Sed a elit ac ante hendrerit iaculis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam interdum nibh vitae turpis euismod, ac congue diam bibendum. Donec pharetra interdum suscipit. In tempor tempor dui, non aliquet justo pretium eget. Praesent molestie magna tellus, eget auctor lectus pellentesque quis.\n\nNam lobortis massa vel tellus facilisis rhoncus. Nullam nec ante vehicula, dignissim nibh eu, euismod diam. Curabitur sem magna, elementum ac metus vitae, bibendum ultricies enim. Donec leo quam, pharetra vitae congue et, pulvinar tincidunt nulla. Nulla aliquet malesuada sem, vel fermentum purus viverra ac. Duis in lorem ac mi scelerisque ultricies eget sed libero. Donec eu tincidunt lorem, vitae volutpat eros. Proin nulla mauris, sollicitudin suscipit libero id, condimentum finibus neque. Maecenas convallis nec tellus eu scelerisque. Morbi faucibus pulvinar turpis ut pretium. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.', 'http://placekitten.com/200/500', 1, 0, '2020-09-01 09:14:34'),
(11, 59, 2, 'zz - history', 'A page for testing history .... this is a change', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ac aliquet ipsum, et pharetra massa. Mauris fringilla, dui eget tristique posuere, neque urna viverra nisl, ac scelerisque tortor est elementum enim. a rhoncus orci maximus ac. Praesent fringilla faucibus lectus, at mollis nunc viverra vitae. Pellentesque id ante nec tortor feugiat vehicula.\n\nUt et nunc imperdiet nulla varius pellentesque. Maecenas congue non enim ac bibendum. Praesent eu arcu massa. Etiam eu vehicula dolor. Sed venenatis massa vitae arcu malesuada tincidunt. Cras eu elit in sapien efficitur mollis. Sed a elit ac ante hendrerit iaculis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam interdum nibh vitae turpis euismod, ac congue diam bibendum. Donec pharetra interdum suscipit. In tempor tempor dui, non aliquet justo pretium eget. Praesent molestie magna tellus, eget auctor lectus pellentesque quis.\n\nNam lobortis massa vel tellus facilisis rhoncus. Nullam nec ante vehicula, dignissim nibh eu, euismod diam. Curabitur sem magna, elementum ac metus vitae, bibendum ultricies enim. Donec leo quam, pharetra vitae congue et, pulvinar tincidunt nulla. Nulla aliquet malesuada sem, vel fermentum purus viverra ac. Duis in lorem ac mi scelerisque ultricies eget sed libero. Donec eu tincidunt lorem, vitae volutpat eros. Proin nulla mauris, sollicitudin suscipit libero id, condimentum finibus neque. Maecenas convallis nec tellus eu scelerisque. Morbi faucibus pulvinar turpis ut pretium. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas convallis nec tellus eu scelerisque. Morbi faucibus pulvinar turpis ut pretium. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas convallis nec tellus eu scelerisque. Morbi faucibus pulvinar turpis ut pretium. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.', 'http://placekitten.com/400/500', 1, 0, '2020-09-02 09:19:58'),
(12, 59, 2, 'zz - history', 'A page for testing history .... this is a change ... one last change', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ac aliquet ipsum, et pharetra massa. Mauris fringilla, dui eget tristique posuere, neque urna viverra nisl, ac scelerisque tortor est elementum enim. a rhoncus orci maximus ac. Praesent fringilla faucibus lectus, at mollis nunc viverra vitae. Pellentesque id ante nec tortor feugiat vehicula.\n\nUt et nunc imperdiet nulla varius pellentesque. Maecenas congue non enim ac bibendum. Praesent eu arcu massa. Etiam eu vehicula dolor. Sed venenatis massa vitae arcu malesuada tincidunt. Cras eu elit in sapien efficitur mollis. Sed a elit ac ante hendrerit iaculis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam interdum nibh vitae turpis euismod, ac congue diam bibendum. Donec pharetra interdum suscipit. In tempor tempor dui, non aliquet justo pretium eget. Praesent molestie magna tellus, eget auctor lectus pellentesque quis.\n\nInteger ut fringilla arcu, posuere luctus erat. Integer maximus, ex at venenatis tristique, nisl enim suscipit augue, eu consequat magna lectus eget augue. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed viverra felis ligula, non volutpat nibh gravida ut. Sed sed dapibus lacus. Morbi quam tortor, blandit vel consequat vestibulum, semper quis lacus. Ut bibendum laoreet lacus, ut iaculis enim eleifend vitae. Morbi malesuada odio est, non interdum risus volutpat quis.\n\nPellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec varius non magna a commodo. Praesent dapibus eu ante ac luctus. Aliquam consequat quis dui vitae elementum. Integer vitae rhoncus massa. Suspendisse potenti. Interdum et malesuada fames ac ante ipsum primis in faucibus. Integer egestas ligula ut tellus tincidunt fringilla. Vivamus non elementum mi. Nulla arcu orci, dapibus at molestie sit amet, vehicula ut lectus.', 'http://placekitten.com/600/500', 1, 0, '2020-09-03 10:12:55'),
(13, 53, 4, 'z - test Diff Demo', 'Basic Page Meant for Testing New Features @ 1', 'Loremem ipsum dolor sit amet, consectetur adipiscing elit. Nam pulvinar, ipsum sed accumsan rutrum, lorem metus laoreet elit, eget pulvinar nisl leo at libero. Morbi sed pharetra dui, a vestibulum sapien. Mauris laoreet aliquet blandit. Mauris tempor sem, sed ultrices nisi egestas sit amet. Praesent finibus lobortis sodales. Pellentesque scelerisque hendrerit vestibulum. Morbi nulla odio, vulputate quis dapibus eu, fermentum quis libero. Duis efficitur magna lacinia augue tempor fringilla. Quisque elit metus, dictum ut venenatis non, consequat ac sem. Integer convallis imperdiet velit, sit amet consectetur metus. Phasellus molestie, lectus a lobortis pharetra, felis nibh posuere libero, velel feugiat metus erat id eros. Praesent elementum pulvinar purus non scelerisque. Suspendisse eget ex magna. Nam eu vestibulum tortor. Maecenas ultrices egestas tortor, non varius enim placerat volutpat. Ut at nunc et nisl tincidunt varius vitae sed purus.\n\nAliquam commodo tellus vitae lacus suscipit dignissim. Etiam congue aliquam lacus, vitae ultrices turpis accumsan nec. Proin quam ex, sodales ac pharetra et, volutpat a leo. Curabitur nec neque nunc. Maecenas et mauris aliquet, mattis diam at, rutrum erat. Donec eget efficitur ligula. In eget placerat massa. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod rhoncus fringilla.\n\nFusce quam eros, tincidunt vitae libero eget, tincidunt aliquam lectus. Curabitur non mi et orci semper sollicitudin. Cras dapibus malesuada accumsan. Maecenas efficitur euismod elit eu lacinia. Aliquam id sollicitudin augue. Quisque pharetra scelerisque ultrices. Curabitur dictum felis metus, vitae pulvinar quam efficitur et. Mauris accumsan cursus ante rutrum interdum. Duis scelerisque pharetra fermentum. Phasellus viverra tellus in rutrum dignissim. Sed ex augue, elementum a aliquam non, rutrum sed metus. Nulla sapien lorem, ullamcorper ut molestie ac, hendrerit ultrices odio. Nullam sit amet eleifend erat. Aenean laoreet fermentum ipsum, ut tempus magna rhoncus at. Cras vitae dolor leo.\n\nCurabitur cursus arcu elit, u scelerisque sem lobortis quis. Vivamus tristique ex vel sollicitudin sollicitudin. Duis vehicula quam lacus, et iaculis velit ultricies a. Cras tristique mattis felis, vitae aliquet odio lobortis id. Aliquam venenatis ipsum viverra est blandit. Nunc aliquam eros semper ex facilisis, luctus aliquam sem convallis. Fusce ac nunc ut libero consectetur imperdiet. Maecenas suscipit, nisl non eleifend tincidunt, est libero vestibulum arcu, vel ornare odio ex non sapien. Quisque metus purus, congue non orci at, bibendum ultrices nibh. Ut ut gravida nibh. Pellentesque aliquam porta neque, vitae consequat lorem facilisis eget. Maecenas ut turpis nec dolor lobortis luctus ac consectetur quam.', 'http://placekitten.com/200/500', 1, 0, '2020-08-11 10:32:11'),
(14, 50, 1, 'Wastewater Treatment', 'Municipalities and industry need to treat wastewater before discharging it to the environment.', 'Wastewater treatment systems can address a multitude of potential issues including: PH levels, oxygen demand (chemical or biological), pathogens, turbidity, debris and other contamination.\n\nCommon processes might include screening, filtration, sedimentation settling, PH balancing, disinfection, aeration, and anaerobic digestion.', 'https://live.staticflickr.com/65535/50087489383_757fc9c91e_b.jpg', 0, 0, '2020-08-20 00:22:00'),
(15, 2, 2, 'Compressed Air', 'Compressed air is a common utility found in most industrial facilities', 'Compressed air has been a key industrial utility since the 1800\'s. It can drive pneumatic cylinders, air motors, diaphragm pumps and controls. It is capable of reasonably high force actuation, and is a common required utility in equipment packages. It can be used and is often misused to generate air flow for agitation, blow-off, cooling, and motive force applications. Screw compressors currently comprise the majority of industrial compressed air installations, but reciprocating and centrifugal compressors can be found in older or special installations/applications.', '/uploads/user_42/fe1402c50e24309eb11f4209c73e2daf.png', 0, 0, '2020-09-14 12:50:14'),
(16, 61, 7, 'Power Factor Correction', 'Improving power factor increases the capacity of a facility\'s electrical distribution network and can lead to significant savings on electrical utility costs.', 'High reactive power, or kVAR, can reduce the capacity of utility lines and transformers to supply kilowatts of real power, which creates additional expenses for the electrical service provider. This higher cost is directly billed to customers who are metered for reactive power. Improving power factor will avoid electric power billing penalties and electrical power losses due to the increased current required to perform a given job. Increasing power factor will increase the capacity of the distribution system.', '/uploads/user_52/ec8550a6c0caa67f935129b59a4c8185.jpg', 0, 0, '2020-10-13 20:18:20');

-- --------------------------------------------------------

--
-- Table structure for table `Home`
--

CREATE TABLE `Home` (
  `mainHeader` varchar(1000) NOT NULL,
  `secondaryHeader` varchar(1000) NOT NULL,
  `sectionsTitle` varchar(1000) NOT NULL,
  `sectionsFooter` mediumtext NOT NULL,
  `tidbitsHeader` varchar(1000) NOT NULL,
  `tidbitsTitle` varchar(1000) NOT NULL,
  `tidbitsFooter` mediumtext NOT NULL,
  `linksHeader` varchar(1000) NOT NULL,
  `linksTitlePrefix` varchar(1000) NOT NULL,
  `linksTitlePostfixInternal` varchar(1000) NOT NULL,
  `linksTitlePostfixDownload` varchar(1000) NOT NULL,
  `linksFooter` mediumtext NOT NULL,
  `disclaimerHeader` varchar(1000) NOT NULL,
  `disclaimerText` mediumtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Home`
--

INSERT INTO `Home` (`mainHeader`, `secondaryHeader`, `sectionsTitle`, `sectionsFooter`, `tidbitsHeader`, `tidbitsTitle`, `tidbitsFooter`, `linksHeader`, `linksTitlePrefix`, `linksTitlePostfixInternal`, `linksTitlePostfixDownload`, `linksFooter`, `disclaimerHeader`, `disclaimerText`) VALUES
('Welcome to the Industrial Walkthrough Checklist & Reference!', 'The purpose of this guide is to provide users with an easily accessible reference of common efficiency improvement opportunities to look for in an industrial facility.', 'This guide is broken down into sections:', '', 'Each section includes a number of useful pertinent \"tidbits\" identified by a preceding icon', 'These include', 'Note: \"tidbit\" types can be toggled between \"hidden\" and \"unhidden\" by clicking the icon in the header bars of each section. A list of opportunities only can be toggled to, with the ability to expand information on any particular opportunity. Registered users can save preferred view configurations.', 'Each section also references in depth learning resources that offer deeper information about the topic. These are identified by a pair of icons', 'A preceding icon identifies the type of learning resource offered', 'A trailing icon identifies the learning resource as internal or external', 'A second trailing icon will indicate when the learning resource is a download', '', 'Disclaimer', 'The primary objective of the OSU EEC is to promote energy efficiency, waste minimization, and productivity in the industrial, commercial, agricultural, and residential sectors. A key strategy has included performance of energy and efficiency site assessments. This work is intended is to provide background and tools that will be helpful in identifying and evaluating potential opportunities.\r\n\r\nWe believe Industrial Walkthrough Checklist & Reference to be a reasonably accurate representation of opportunities to reduce energy use, lower waste generation, and make production practices more efficient. However, the OSU EEC cannot guarantee the accuracy, completeness, or usefulness of the information contained on this website, nor assume any liability for damages resulting from the use of any information, equipment, method or process disclosed on this website.\r\n\r\nPollution prevention recommendations are not intended to deal with the issue of compliance with applicable environmental regulations. Questions regarding compliance should be addressed to either a reputable consulting engineering firm experienced with environmental regulations or to the appropriate regulatory agency. Clients are encouraged to develop positive working relationships with regulators so that compliance issues can be addressed and resolved.\r\n\r\nThe assumptions and equations used to arrive at energy, waste, productivity, and cost savings for the opportunities are presented on this website. We believe the assumptions to be conservative. If you would like to revise the assumptions you may follow the calculation methodologies presented using adjusted assumptions to develop your own revised estimates of energy, waste, productivity, and cost savings.\r\n\r\nPlease feel welcome to contact the OSU EEC if you would like to discuss the content of this website or if you have another question about energy use or pollution prevention.');

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
(12, 'Suggested Action', 'bullseye', 1, '#000000'),
(13, 'Opportunity Description', 'angle-right', 1, '#000000'),
(14, 'Question', 'question', 1, '#000000'),
(15, 'Data to Collect', 'pencil-alt', 1, '#000000'),
(16, 'File', 'file', 1, '#007BFF'),
(17, 'Document', 'copy', 3, '#000000'),
(18, 'Internal Link', 'info', 0, '#000000'),
(19, 'External Link', 'link', 0, '#000000'),
(20, 'Figure', 'chart-area', 2, '#32C332'),
(21, 'Analysis Tool', 'list', 3, '#000000'),
(22, 'Slideshow', 'play', 3, '#32C332'),
(23, 'Video', 'video-camera', 3, '#007BFF'),
(24, 'Informational Website', 'book', 3, '#E81224'),
(25, 'Vendor Website', 'truck', 3, '#000000'),
(26, 'Bullet Point', 'circle', 1, '#000000'),
(27, 'Assessment Equipment', 'ruler-vertical', 1, '#FFC83D'),
(28, 'EEC Walkthrough Page', 'star', 3, '#FFC83D');

-- --------------------------------------------------------

--
-- Table structure for table `Items`
--

CREATE TABLE `Items` (
  `itemId` int(10) UNSIGNED NOT NULL,
  `cardId` int(10) UNSIGNED NOT NULL,
  `orderIndex` int(10) UNSIGNED NOT NULL,
  `indentation` int(10) UNSIGNED NOT NULL,
  `iconType` int(10) UNSIGNED NOT NULL,
  `contentText` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contentUrl` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contentLabel` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contentMode` int(10) UNSIGNED NOT NULL,
  `internal` tinyint(3) UNSIGNED NOT NULL,
  `inline` tinyint(3) UNSIGNED NOT NULL,
  `sourceId` int(10) UNSIGNED NOT NULL,
  `created` timestamp NULL DEFAULT current_timestamp(),
  `approved` tinyint(3) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Items`
--

INSERT INTO `Items` (`itemId`, `cardId`, `orderIndex`, `indentation`, `iconType`, `contentText`, `contentUrl`, `contentLabel`, `contentMode`, `internal`, `inline`, `sourceId`, `created`, `approved`) VALUES
(7, 3, 1, 0, 20, '', 'https://i.imgur.com/V0dkW5l.png', 'Screw compressor power vs output for various control strategies', 0, 0, 0, 0, '2020-06-17 17:09:09', 1),
(25, 9, 1, 0, 1, 'Versatile. Offers compact energy density. ', '', '', 0, 0, 0, 0, '2020-06-02 22:38:04', 1),
(26, 9, 1, 0, 1, 'Spark free for potentially explosive environments', '', '', 0, 0, 0, 0, '2020-06-10 03:40:29', 1),
(28, 16, 1, 0, 4, 'Take care to avoid potential dangerous air injection associated with directing compressed air flow directly onto skin', '', '', 0, 0, 0, 0, '2020-05-23 22:30:55', 1),
(29, 17, 1, 0, 7, 'Looped distribution systems can help maintain uniform pressure throughout a compressed air system.', '', '', 0, 0, 0, 0, '2020-05-23 22:30:57', 1),
(30, 17, 2, 0, 7, 'Well sized compressed air lines reduce pressure loss', '', '', 0, 0, 0, 0, '2020-05-23 22:30:58', 1),
(31, 17, 3, 0, 7, 'A well designed compressed air system should typically have a maximum 10 PSI pressure drop in delivering air to at any end-use in the system', '', '', 0, 0, 0, 0, '2020-05-23 22:31:00', 1),
(32, 13, 1, 0, 2, 'Extremely energy intensive. ', '', '', 0, 0, 0, 0, '2020-05-23 22:52:18', 1),
(33, 18, 1, 0, 3, 'Expect a 1% drop in compressor energy and cost per 2 PSI in compressor outlet pressure drop', '', '', 0, 0, 0, 0, '2020-07-18 00:08:08', 1),
(34, 18, 1, 0, 3, '85 PSI is the standard required minimum inlet pressure for most common industrial pneumatic equipment', '', '', 0, 0, 0, 0, '2020-07-18 00:08:07', 1),
(36, 18, 1, 0, 3, '80 to 90% of energy for compressed air is lost as heat', '', '', 0, 0, 0, 0, '2020-07-18 00:08:04', 1),
(37, 19, 1, 0, 8, 'Use a pressure gage with standard quick connects typically used in compressed air lines to diagnose line pressure drops', '', '', 0, 0, 0, 0, '2020-07-18 00:08:04', 1),
(43, 13, 1, 0, 2, 'Function provided can often be replace with significantly lower power approach.', '', '', 0, 0, 0, 0, '2020-06-09 19:50:02', 1),
(162, 9, 1, 0, 1, 'Can be used as an easy quick fix for many issues', '', '', 0, 0, 0, 0, '2020-06-22 19:18:35', 1),
(163, 9, 1, 0, 1, 'Familiar utility for industrial personnel', '', '', 0, 0, 0, 0, '2020-06-22 19:18:36', 1),
(164, 9, 1, 0, 1, 'A single mechanical energy input at the compressor can be distributed throughout a facility. ', '', '', 0, 0, 0, 0, '2020-06-22 19:18:36', 1),
(165, 18, 4, 0, 3, 'Over 5 HP of electrical power is required for each 1 HP of compressed air power', '', '', 0, 0, 0, 0, '2020-06-22 19:21:00', 1),
(166, 19, 1, 0, 8, 'Determine the leak load by checking compressor output when there is no productive air use', '', '', 0, 0, 0, 0, '2020-06-22 19:29:30', 1),
(383, 76, 1, 0, 17, 'This sourcebook is designed to provide compressed air system users with a reference that outlines opportunities for system performance improvements.', 'https://www.compressedairchallenge.org/data/sites/1/media/library/sourcebook/Improving_Compressed_Air-Sourcebook.pdf', 'Improving Compressed Air System Performance. A Sourcebook for Industry.  Third Edition. U.S.DOE', 1, 0, 0, 0, '2020-10-01 02:51:40', 1),
(384, 76, 1, 0, 17, 'MEASUR is open source software that consists of the following DOE legacy energy system assessment tools (updated): Pumping System Assessment Tool (PSAT), Process Heating Assessment and Survey Tool (PHAST), Fan System Assessment Tool (FSAT), Steam System Assessment Tool (SSAT)/ Steam System Modeler (SSMT), AIRMaster+ (Last accessed 12/2/2019)   ', 'https://www.energy.gov/eere/amo/measur', 'U.S. Department of Energy MEASUR analysis tool', 1, 0, 0, 0, '2020-06-29 20:55:45', 1),
(385, 76, 1, 0, 17, 'An informational page with analysis tools, case studies, tip sheets, and checklists', 'https://www.bpa.gov/EE/Sectors/Industrial/Pages/Compressed-Air.aspx', 'Bonneville Power Administration Compressed Air Page', 1, 0, 0, 0, '2020-06-29 20:55:45', 1),
(637, 75, 0, 0, 17, 'See compressed air tip sheets', 'https://www.energy.gov/eere/amo/tip-sheets-system', 'U.S.DOE Energy Tip Sheets by System', 1, 0, 0, 0, '2020-07-01 00:33:10', 1),
(638, 75, 0, 0, 17, '$empty', 'https://www.energy.gov/sites/prod/files/2014/05/f16/compressed_air11.pdf', 'Alternative Strategies for Low-Pressure End Uses', 1, 0, 0, 0, '2020-06-30 06:38:26', 1),
(639, 75, 0, 0, 17, '$empty', 'https://www.energy.gov/sites/prod/files/2014/05/f16/compressed_air4.pdf', 'Analyzing Your Compressed Air System', 1, 0, 0, 0, '2020-06-30 06:38:26', 1),
(733, 81, 0, 0, 1, 'Centrifugal pumps are capable of developing a wide range of flow and pressures', '', '', 0, 0, 0, 0, '2020-07-01 18:14:32', 1),
(779, 72, 0, 0, 20, '', 'https://live.staticflickr.com/65535/50066459491_bb3c3291c5_b.jpg', 'Dry sprinkler systems need compressed air', 0, 0, 0, 0, '2020-07-01 21:19:36', 1),
(780, 72, 0, 0, 20, '', 'https://live.staticflickr.com/65535/50065906203_65746ac38f_b.jpg', 'Blow off wand and hose', 0, 0, 0, 0, '2020-07-01 21:19:36', 1),
(781, 72, 0, 0, 20, '', 'https://live.staticflickr.com/65535/50065907458_f8a2a9a7e0_b.jpg', 'Air Motors used to mix paint can be replaced with explosion proof electric motors', 0, 0, 0, 0, '2020-07-01 21:19:36', 1),
(782, 72, 0, 0, 20, '', 'https://live.staticflickr.com/65535/50066721727_a6607851c0_b.jpg', 'Compressed Air Receiver Tank', 0, 0, 0, 0, '2020-07-01 21:19:36', 1),
(783, 72, 0, 0, 20, '', 'https://live.staticflickr.com/65535/50065907313_a2869ef070_b.jpg', 'Industrial Screw Compressor', 0, 0, 0, 0, '2020-07-01 21:19:36', 1),
(784, 72, 0, 0, 20, '', 'https://live.staticflickr.com/65535/50065907073_1a989d028d_b.jpg', 'Compressed Air Receiver Tamk', 0, 0, 0, 0, '2020-07-01 21:19:36', 1),
(785, 72, 0, 0, 20, '', 'https://live.staticflickr.com/65535/50065907213_978efa0976_b.jpg', 'Blow off wands with and without engineered nozzles', 0, 0, 0, 0, '2020-07-01 21:19:36', 1),
(786, 72, 0, 0, 20, '', 'https://live.staticflickr.com/65535/50066720932_da2c3b0b6c_b.jpg', 'Small reciprocating industrial air compressor', 0, 0, 0, 0, '2020-07-01 21:19:36', 1),
(787, 72, 0, 0, 20, '', 'https://live.staticflickr.com/65535/50065907503_d75eb615cf_b.jpg', 'Desiccant compressed air dryer ', 0, 0, 0, 0, '2020-07-01 21:19:36', 1),
(788, 72, 0, 0, 20, '', 'https://live.staticflickr.com/65535/50066722032_f62637039d_b.jpg', 'Compressed Air Receiver Tank', 0, 0, 0, 0, '2020-07-01 21:19:36', 1),
(789, 72, 0, 0, 20, '', 'https://live.staticflickr.com/65535/50065907438_e7f7d53ba4_b.jpg', 'Refrigerated compressed air dryer', 0, 0, 0, 0, '2020-07-01 21:19:36', 1),
(827, 83, 0, 0, 11, 'Eliminate Overflow \"Control\" on Tanks', '', '', 0, 0, 0, 0, '2020-07-01 21:45:09', 0),
(828, 83, 0, 0, 11, 'Look for Opportunity to Reduced Defined Flow Requirements', '', '', 0, 0, 0, 0, '2020-07-01 21:45:09', 0),
(842, 84, 0, 0, 11, 'Reduce Line Losses (Larger Diameter Pipes, etc)', '', '', 0, 0, 0, 0, '2020-07-01 21:53:17', 0),
(843, 84, 0, 0, 11, 'Use \"Least Closed Valve\" Strategy on Pumping Networks Serving Multiple End Points.', '', '', 0, 0, 0, 0, '2020-07-01 21:53:17', 0),
(844, 84, 0, 0, 11, 'Eliminate or Reduce Fluid \"Free Fall\" at Discharge Point.', '', '', 0, 0, 0, 0, '2020-07-01 21:53:17', 0),
(1101, 86, 0, 0, 11, 'Turn compressor(s) off when not needed - nights weekends etc	', '', '', 0, 0, 0, 0, '2020-07-01 22:24:57', 1),
(1102, 86, 0, 0, 11, 'Serve low volume around the clock  requirement with separate smaller system', '', '', 0, 0, 0, 0, '2020-07-01 22:24:57', 1),
(1103, 87, 0, 0, 11, 'Replace refrigerated compressed air dryer with more efficient refrigerated compressed air dryer', '', '', 0, 0, 0, 0, '2020-07-01 22:28:10', 1),
(1104, 87, 0, 0, 11, 'Capture heat rejected by air compressors', '', '', 0, 0, 0, 0, '2020-07-01 22:28:10', 1),
(1151, 29, 0, 0, 17, 'This guide focuses mainly on screw and reciprocating compressors. These are the most common types of compressors used in the northwest. Other types of compressors such as rotary vane, centrifugal, lobe and radial compressors are much less common and are only introduced in this guide.', 'https://drive.google.com/file/d/12Co0C6JBK5CqoYhZQBcD0VX6JVBXy86o/view', 'Assessing Industrial Air Compressors', 0, 0, 0, 0, '2020-07-01 22:33:14', 1),
(1152, 29, 0, 0, 17, 'A short slideshow of common industrial compressed air equipment and applicatons', 'https://docs.google.com/presentation/d/1khB1tPIND-ooBy1yCCL-rDf09Gf4Q8nr/edit#slide=id.p7', 'Industrial Compressed Air (a slideshow)', 0, 0, 0, 0, '2020-07-01 22:33:14', 1),
(1312, 8, 0, 0, 8, 'Reduced air pressure not only reduces air compressor energy required for a set volume of air, it will also result in less air volume consumed by leaks and unregulated air uses (although it can be hard to estimate the volume reduction).\r\n', '', '', 0, 0, 0, 0, '2020-07-02 17:49:40', 1),
(1313, 8, 0, 0, 3, 'Expect a 1% drop in compressor energy and cost per 2 PSI in compressor outlet pressure drop (for standard nominal ~100 PSI range systems)', '', '', 0, 0, 0, 0, '2020-07-02 17:49:40', 1),
(1314, 8, 0, 0, 11, 'Reduce compressed air system pressure to the 95-100 PSI range.', '', '', 0, 0, 0, 0, '2020-07-02 17:49:40', 1),
(1315, 8, 0, 1, 10, 'System pressure is set over 100 PSI for a compressed air system serving standard industrial utilities and controls.\r\n', '', '', 0, 0, 0, 0, '2020-07-02 17:49:40', 1),
(1316, 8, 0, 1, 8, 'Check end use requirements. Most equipment requires ~ 85 PSI. Allowing for a 10 PSI system distribution pressure drop should allow the minimum pressure to be set for 95 PSI	', '', '', 0, 0, 0, 0, '2020-07-02 17:49:40', 1),
(1317, 8, 0, 1, 8, 'Try incrementally dropping pressure while checking to ensure no production issues occur', '', '', 0, 0, 0, 0, '2020-07-02 17:49:40', 1),
(1318, 8, 0, 1, 15, 'Set up data loggers to collect compressor power over time ', '', '', 0, 0, 0, 0, '2020-07-02 17:49:40', 1),
(1319, 8, 0, 1, 15, 'Collect pressure settings: current and proposed', '', '', 0, 0, 0, 0, '2020-07-02 17:49:40', 1),
(1320, 8, 0, 1, 17, 'An OSU EEC Analysis Template in Microsoft Excel Format', 'https://drive.google.com/open?id=1ZrFL3Cc2rmiRL-lkODnqn4smkZo7BiRX', 'Analysis Template: Reduce Compressed Air Pressure ', 2, 0, 0, 0, '2020-07-02 17:49:40', 1),
(1321, 8, 0, 1, 12, 'Reduce line pressure losses in compressed air distribution system:', '', '', 0, 0, 0, 0, '2020-07-02 17:49:40', 1),
(1322, 8, 0, 2, 10, 'Pressure drops more than 10 PSI from the compressor to any location at any time (particularly remote locations or near shorter duration high volume uses)?', '', '', 0, 0, 0, 0, '2020-07-02 17:49:40', 1),
(1323, 8, 0, 2, 8, 'Pay close attention to oil filters, complex fittings, poor takeoffs, and bottlenecked and overly small pipe diameters', '', '', 0, 0, 0, 0, '2020-07-02 17:49:40', 1),
(1324, 8, 0, 2, 8, 'Critically evaluate regulator placement (and settings)	', '', '', 0, 0, 0, 0, '2020-07-02 17:49:40', 1),
(1325, 8, 0, 1, 12, 'Add receivers close to equipment with periodic high volume air uses (that might be creating local pressure drops).', '', '', 0, 0, 0, 0, '2020-07-02 17:49:40', 1),
(1326, 8, 0, 2, 10, 'Local pressure drops periodically appear in parts of the system .', '', '', 0, 0, 0, 0, '2020-07-02 17:49:40', 1),
(1327, 8, 0, 0, 11, 'Serve high pressure compressed air end use with separate system or a booster	', '', '', 0, 0, 0, 0, '2020-07-02 17:49:40', 1),
(1328, 8, 0, 1, 10, 'An entire plant air system is set at a high pressure because a few pieces of equipment require higher pressure air.		', '', '', 0, 0, 0, 0, '2020-07-02 17:49:40', 1),
(1329, 8, 0, 1, 15, 'Inventory equipment needing higher than average pressures, noting minimum pressure and estimating air volume required.', '', '', 0, 0, 0, 0, '2020-07-02 17:49:40', 1),
(1336, 88, 0, 0, 1, 'Versatile.', '', '', 0, 0, 0, 0, '2020-07-02 19:58:43', 1),
(1337, 88, 0, 0, 1, 'Familiar utility for many industrial personnel.', '', '', 0, 0, 0, 0, '2020-07-02 19:58:43', 1),
(1338, 88, 0, 0, 1, 'A single thermal energy input at the boiler can be distributed throughout a facility.', '', '', 0, 0, 0, 0, '2020-07-02 19:58:43', 1),
(1339, 88, 0, 0, 1, 'Limiting the number of combustion sources by serving applications with steam can reduce administrative cost of managing and reporting multiple emissions sources to governing agencies.', '', '', 0, 0, 0, 0, '2020-07-02 19:58:43', 1),
(1340, 88, 0, 0, 1, 'Use of a dual fuel boiler (for example: one that can use natural gas or fuel oil) can also reduce vulnerability to natural gas interruptions when thermal needs are served with steam instead of a local combustion system.', '', '', 0, 0, 0, 0, '2020-07-02 19:58:43', 1),
(1341, 88, 0, 0, 1, 'Steam engines can be useful for applications that might result in an initial locked rotor and potential electric motor damage, such as pumping cold semi-solidified bunker fuel.', '', '', 0, 0, 0, 0, '2020-07-02 19:58:43', 1),
(1342, 89, 0, 0, 2, 'System distribution energy and mass losses can result in significant overall system efficiency reductions.', '', '', 0, 0, 0, 0, '2020-07-02 20:01:03', 1),
(1343, 90, 0, 0, 4, 'Boilers can be bombs if not properly set up and maintained.', '', '', 0, 0, 0, 0, '2020-07-02 20:01:49', 1),
(1344, 91, 0, 0, 3, '1 boiler horsepower (BoHP) = 33,479 Btu/hr', '', '', 0, 0, 0, 0, '2020-07-02 20:08:42', 1),
(1345, 91, 0, 0, 3, 'Exhaust gases are typically best kept above 300 °F to avoid corrosive condensation.', '', '', 0, 0, 0, 0, '2020-07-02 20:08:42', 1),
(1346, 91, 0, 0, 3, 'Ideal exhaust temperatures should not be more than 100 - 150 °F greater than the steam temperature. If a boiler is well designed and heat exchanger surfaces are in good condition, ideal exhaust temperatures should be achievable.', '', '', 0, 0, 0, 0, '2020-07-02 20:08:42', 1),
(1347, 92, 0, 0, 8, 'Keep a steam table handy (phone app or pocket reference) to convert steam temperature to pressure for typical saturated conditions.', '', '', 0, 0, 0, 0, '2020-07-02 20:10:02', 1),
(1350, 93, 0, 0, 7, 'Regular, scheduled boiler tunes. Typically every 6 to 12 months.', '', '', 0, 0, 0, 0, '2020-07-02 20:12:22', 1),
(1351, 93, 0, 0, 7, 'Low O2 controls', '', '', 0, 0, 0, 0, '2020-07-02 20:12:22', 1),
(1361, 97, 0, 0, 17, 'An OSU EEC Data Collection Sheet in Microsoft Excel Format', 'https://drive.google.com/file/d/1mMRMAUYKDCpE5bQmX-KqajjAOwXuEzaL/view?usp=sharing', 'Boiler Data Collection Sheet', 0, 0, 0, 0, '2020-07-02 20:46:30', 1),
(1371, 98, 0, 0, 21, 'A link to the U.S.DOE\'s MEASUR Analysis Tool Package (free download)', 'https://www.energy.gov/eere/amo/measur', 'U.S.DOE Steam System Analysis Tool', 1, 0, 0, 0, '2020-08-10 17:43:19', 1),
(1372, 98, 0, 0, 21, 'An OSU EEC Analysis Tool in Microsoft Excel Format', 'https://drive.google.com/file/d/1HEL3S8xl50-B12ooH4wocqUznwJWAjzQ/view?usp=sharing', 'Combustion Efficiency Analysis Tool (CEAT)', 0, 0, 0, 0, '2020-07-02 21:18:17', 1),
(1405, 94, 0, 0, 20, '', 'add later', 'Boiler Combustion Efficiency with Stack Temp and O2 (add later)', 0, 0, 0, 0, '2020-07-02 21:55:22', 0),
(1406, 94, 0, 0, 20, '', 'add later', 'Abbreviated Steam Table (add later)', 0, 0, 0, 0, '2020-07-02 21:55:22', 0),
(1407, 102, 0, 0, 11, 'Shut down equipment when not needed - nights, weekends, etc.', '', '', 0, 0, 0, 0, '2020-07-02 21:56:36', 1),
(1408, 103, 0, 0, 11, 'Minimize the continuous blowdown rate with a conductivity sensor', '', '', 0, 0, 0, 0, '2020-07-02 21:58:49', 1),
(1409, 103, 0, 0, 11, 'Install blowdown heat recovery', '', '', 0, 0, 0, 0, '2020-07-02 21:58:49', 1),
(1410, 104, 0, 0, 11, 'Replace damper controls on draft fans with variable speed control', '', '', 0, 0, 0, 0, '2020-07-02 22:01:14', 1),
(1411, 105, 0, 0, 11, 'Return more/all condensate back to the boiler', '', '', 0, 0, 0, 0, '2020-07-02 22:03:34', 1),
(1412, 105, 0, 0, 11, 'Recover Flash Steam (for Chris to flesh out) ', '', '', 0, 0, 0, 0, '2020-07-02 22:03:34', 1),
(1575, 108, 0, 0, 3, '1 HP = 0.746 kW', '', '', 0, 0, 0, 0, '2020-07-02 23:14:11', 1),
(1576, 109, 0, 0, 8, 'Tip #1', '', '', 0, 0, 0, 0, '2020-07-02 23:14:41', 0),
(1577, 110, 0, 0, 7, 'BP #1', '', '', 0, 0, 0, 0, '2020-07-02 23:15:09', 0),
(1652, 114, 0, 0, 17, 'An OSU EEC Data Collection Sheet in Microsoft Excel Format', 'https://drive.google.com/file/d/1PptW62lQbbN71Miefkx1I960UwnVHFA4/view?usp=sharing', 'Motor Data Collection Sheet', 0, 0, 0, 0, '2020-07-02 23:29:16', 0),
(1665, 116, 0, 0, 17, 'An OSU EEC Report Appendix in Microsoft Word Format', 'https://drive.google.com/file/d/138fM99GFgSjGUAjvqU1x2cjvxDXCu8-a/view?usp=sharing', 'Motors Appendix', 0, 0, 0, 0, '2020-07-02 23:53:23', 0),
(1666, 116, 0, 0, 24, 'An OSU EEC Training Webpage', 'https://eec.oregonstate.edu/industrial-motors-training', 'Industrial Motors Training', 0, 0, 0, 0, '2020-07-02 23:53:23', 0),
(1667, 116, 0, 0, 22, 'An OSU EEC Google Slideshow', 'https://docs.google.com/presentation/d/1eG8ygZ-gpYPzbjnpJKLcm_bmoIUImD7CcBU0ZExhfH4/edit?usp=sharing', 'Motor Assessment Fundamentals', 0, 0, 0, 0, '2020-07-02 23:53:23', 0),
(1668, 116, 0, 0, 22, 'An IAC Training Slideshow', 'https://docs.google.com/presentation/d/153S2O7Ns9vJzLqHQnifW03rE52y4d-KGAPgC3e3D8zc/edit?usp=sharing', 'Motors Training', 0, 0, 0, 0, '2020-07-02 23:53:23', 0),
(1669, 116, 0, 0, 22, 'An OSU EEC Google Slideshow', 'https://docs.google.com/presentation/d/1lbgHebPEVJEB17Yqp--r6gARKWkA4YB45nHJx3OEwXg/edit?usp=sharing', 'Power Factor', 0, 0, 0, 0, '2020-07-02 23:53:23', 0),
(1828, 101, 0, 0, 11, 'Tune the boiler regularly', '', '', 0, 0, 0, 0, '2020-07-03 00:26:01', 1),
(1829, 101, 0, 1, 10, 'O2 readings in the exhaust are high for the fuel type (>3% for gaseous fuels, >8% for solid fuels)', '', '', 0, 0, 0, 0, '2020-07-03 00:26:01', 1),
(1830, 101, 0, 1, 15, 'Combustion analysis at representative firing rates (high, medium, low, standby)', '', '', 0, 0, 0, 0, '2020-07-03 00:26:01', 1),
(1831, 101, 0, 1, 15, 'Firing rate over time', '', '', 0, 0, 0, 0, '2020-07-03 00:26:01', 1),
(1832, 101, 0, 1, 21, 'An OSU EEC Analysis Template in Microsoft Excel Format (unapproved, old style)', 'https://drive.google.com/file/d/1Z9GbxV0nr-OuxT2cNLxkdo82Wpq-h70m/view?usp=sharing', 'Boiler Tune Template', 0, 0, 0, 0, '2020-07-03 00:26:01', 1),
(1833, 101, 0, 0, 11, 'Install O2 Controls to maintain optimum combustion efficiency throughout the operating range', '', '', 0, 0, 0, 0, '2020-07-03 00:26:01', 1),
(1834, 101, 0, 1, 10, 'The boiler spends a significant portion of time at partial fire and lower efficiency', '', '', 0, 0, 0, 0, '2020-07-03 00:26:01', 1),
(1835, 101, 0, 0, 11, 'Clean heat exchanger surfaces and reduce the exhaust temperature', '', '', 0, 0, 0, 0, '2020-07-03 00:26:01', 1),
(1836, 101, 0, 1, 10, 'Stack temperature exceeds steam temperature by over 150 ˚F', '', '', 0, 0, 0, 0, '2020-07-03 00:26:01', 1),
(1837, 101, 0, 1, 12, 'Clean the fire side. Soot can accumulate and inhibit heat transfer.', '', '', 0, 0, 0, 0, '2020-07-03 00:26:01', 1),
(1838, 101, 0, 1, 12, 'Clean the water side. Scale can accumulate and inhibit heat transfer is the water chemistry is off', '', '', 0, 0, 0, 0, '2020-07-03 00:26:01', 1),
(1839, 101, 0, 0, 11, 'Install an economizer (for Matt to flesh out)', '', '', 0, 0, 0, 0, '2020-07-03 00:26:01', 1),
(1840, 101, 0, 0, 11, 'Install a condensing economizer (for Matt to flesh out)', '', '', 0, 0, 0, 0, '2020-07-03 00:26:01', 1),
(1877, 120, 0, 0, 11, 'Correct Power Factor (for Ethan to flesh out)', '', '', 0, 0, 0, 0, '2020-07-03 00:28:39', 1),
(1878, 120, 0, 1, 10, 'Power factor below ##%', '', '', 0, 0, 0, 0, '2020-07-03 00:28:39', 1),
(1897, 100, 0, 0, 24, 'See steam tip sheets', 'https://www.energy.gov/eere/amo/tip-sheets-system', 'U.S.DOE Energy Tip Sheets by System', 1, 0, 0, 0, '2020-08-10 17:50:55', 1),
(1898, 100, 0, 0, 17, 'United Nations Industrial Development Organization Document', 'https://www.unido.org/sites/default/files/2017-11/SSO-Manual-Print-FINAL-20161109-One-Page-V2.pdf', 'Manual for Industrial Steam Systems Assessment and Optimization', 1, 0, 0, 0, '2020-07-03 03:01:04', 1),
(1899, 100, 0, 0, 17, 'CleaverBrooks Document', 'http://cleaverbrooks.com/reference-center/insights/Boiler%20Efficiency%20Guide.pdf', 'Boiler Efficiency Guide', 1, 0, 0, 0, '2020-07-28 05:08:05', 1),
(1900, 100, 0, 0, 25, 'Pacific NW Boiler Vendor', 'https://coleindust.com/', 'Cole Industrial', 1, 0, 0, 0, '2020-07-03 03:01:04', 1),
(1901, 100, 0, 0, 25, 'Pacific NW Boiler Vendor', 'https://www.nationwideboiler.com/pacific-combustion-engineering.html', 'Pacific Combustion Engineering', 1, 0, 0, 0, '2020-07-03 03:01:04', 1),
(1902, 100, 0, 0, 25, 'Boiler Manufacturer', 'http://cleaverbrooks.com/', 'CleaverBrooks', 1, 0, 0, 0, '2020-07-03 03:01:04', 1),
(1903, 117, 0, 0, 24, 'See motor tip sheets', 'https://www.energy.gov/eere/amo/tip-sheets-system', 'U.S.DOE Energy Tip Sheets by System', 1, 0, 0, 0, '2020-07-03 03:02:27', 0),
(1904, 117, 0, 0, 24, 'External Website with Industrial Motor Articles', 'https://www.plantservices.com/category/motors_drives_power_trans', 'Plant Services: Industrial Motors', 1, 0, 0, 0, '2020-07-03 03:02:27', 0),
(1905, 117, 0, 0, 24, 'EASA Accreditation Auditor', 'https://www.greenmotors.org/', 'Green Motors Practices Group', 1, 0, 0, 0, '2020-07-03 03:02:27', 0),
(1968, 107, 0, 0, 11, 'Replace standard efficiency motors with NEMA premium efficiency motors', '', '', 0, 0, 0, 0, '2020-07-03 03:12:11', 1),
(1969, 107, 0, 1, 10, 'Standard efficiency motors used in high energy consumer applications ', '', '', 0, 0, 0, 0, '2020-07-03 03:12:11', 1),
(1970, 107, 0, 0, 11, 'Replace oversized motors', '', '', 0, 0, 0, 0, '2020-07-03 03:12:11', 1),
(1971, 107, 0, 1, 10, 'Motor consistently operating at less than half of full load', '', '', 0, 0, 0, 0, '2020-07-03 03:12:11', 1),
(1972, 107, 0, 0, 11, 'Replace Standard V-Belts with Notched V-Belts', '', '', 0, 0, 0, 0, '2020-07-03 03:12:11', 1),
(1973, 107, 0, 1, 13, 'Notched V-belts have grooves perpendicular to the length of the belt to reduce bending resistance. ', '', '', 0, 0, 0, 0, '2020-07-03 03:12:11', 1),
(1974, 107, 0, 1, 10, 'Numerous belt-driven motors are used throughout a facility ', '', '', 0, 0, 0, 0, '2020-07-03 03:12:11', 1),
(1975, 107, 0, 1, 3, 'Notched V-belts are approximately 2% more efficient than standard belts. The OSU EEC uses 1.5% as a conservative estimate.', '', '', 0, 0, 0, 0, '2020-07-03 03:12:11', 1),
(1976, 107, 0, 1, 14, 'Are V-belts or synchronous belts more suited to the application?', '', '', 0, 0, 0, 0, '2020-07-03 03:12:11', 1),
(1977, 107, 0, 1, 1, 'Run cooler, last longer, and are more efficient than standard V-belts', '', '', 0, 0, 0, 0, '2020-07-03 03:12:11', 1),
(1978, 107, 0, 1, 1, 'Don\'t require retrofits if standard V-belts are already used', '', '', 0, 0, 0, 0, '2020-07-03 03:12:11', 1),
(1979, 107, 0, 1, 1, 'More suitable than synchronous drives if vibrational damping is needed or the application causes sudden torque changes', '', '', 0, 0, 0, 0, '2020-07-03 03:12:11', 1),
(1980, 107, 0, 1, 2, 'Sharp efficiency reduction at high torque due to increased slippage', '', '', 0, 0, 0, 0, '2020-07-03 03:12:11', 1),
(1981, 107, 0, 1, 2, 'Like standard V-belts, notched belts degrade in efficiency over time if not properly maintained', '', '', 0, 0, 0, 0, '2020-07-03 03:12:11', 1),
(1982, 107, 0, 1, 2, 'V-belts may perform worse in dirty environments than synchronous belts', '', '', 0, 0, 0, 0, '2020-07-03 03:12:11', 1),
(1983, 107, 0, 1, 12, 'Incrementally install notched V-belts as old belts are replaced.', '', '', 0, 0, 0, 0, '2020-07-03 03:12:11', 1),
(1984, 107, 0, 1, 7, 'Regular scheduled maintenance and re-tensioning ', '', '', 0, 0, 0, 0, '2020-07-03 03:12:11', 1),
(1985, 107, 0, 1, 20, '', 'https://drive.google.com/file/d/1uk3x2VpKQ9FrRUOvU4nQ9U2zHfQsBXGC/view?usp=sharing', 'Thermal Image of Notched vs Standard V-belt', 0, 0, 0, 0, '2020-07-03 03:12:11', 1),
(1986, 107, 0, 1, 21, 'An OSU EEC Analysis Template in Microsoft Excel Format', 'https://drive.google.com/file/d/19tm7mcwn9jYIj_xDkJ7Ki9buPw0gc2Kl/view?usp=sharing', 'Install Notched V-Belts Template', 0, 0, 0, 0, '2020-07-03 03:12:11', 1),
(1987, 107, 0, 0, 11, 'Replace V-Belt Drives with Synchronous Belt Drives ', '', '', 0, 0, 0, 0, '2020-07-03 03:12:11', 1),
(1988, 107, 0, 1, 13, 'Synchronous drives use toothed belts and mated grooved sprockets to transfer power rather than friction. Synchronous belt drives operate more efficient and require less maintenance than V-belt drives.', '', '', 0, 0, 0, 0, '2020-07-03 03:12:11', 1),
(1989, 107, 0, 1, 10, 'Numerous belt-driven motors are used throughout a facility ', '', '', 0, 0, 0, 0, '2020-07-03 03:12:11', 1),
(1990, 107, 0, 1, 3, 'Synchronous drives consistently operate with 98% efficiency', '', '', 0, 0, 0, 0, '2020-07-03 03:12:11', 1),
(1991, 107, 0, 1, 14, 'Are V-belts or synchronous belts more suited to the application?', '', '', 0, 0, 0, 0, '2020-07-03 03:12:11', 1),
(1992, 107, 0, 1, 1, 'Maintain efficiency over a wide load range', '', '', 0, 0, 0, 0, '2020-07-03 03:12:11', 1),
(1993, 107, 0, 1, 1, 'Work well in oily and wet environments', '', '', 0, 0, 0, 0, '2020-07-03 03:12:11', 1),
(1994, 107, 0, 1, 1, 'Require minimal maintenance and re-tensioning ', '', '', 0, 0, 0, 0, '2020-07-03 03:12:11', 1),
(1995, 107, 0, 1, 2, 'Require installation of mating grooved sprockets', '', '', 0, 0, 0, 0, '2020-07-03 03:12:11', 1),
(1996, 107, 0, 1, 2, 'Noisier and transfer more vibration than V-belts', '', '', 0, 0, 0, 0, '2020-07-03 03:12:11', 1),
(1997, 107, 0, 1, 2, 'Vulnerable to sudden torque changes that can shear the belt\'s teeth', '', '', 0, 0, 0, 0, '2020-07-03 03:12:11', 1),
(1998, 107, 0, 1, 12, 'Consider consulting a power transmission specialist to determine viability and savings potential from retrofitting V-belt drives with synchronous belts. Install notched belts where synchronous are not cost effective.', '', '', 0, 0, 0, 0, '2020-07-03 03:12:11', 1),
(1999, 118, 0, 0, 11, 'Use variable frequency drives where appropriate', '', '', 0, 0, 0, 0, '2020-07-03 03:15:14', 1),
(2000, 118, 0, 1, 10, 'Large motors that are throttle controlled', '', '', 0, 0, 0, 0, '2020-07-03 03:15:14', 1),
(2005, 115, 0, 0, 21, 'An OSU EEC analysis tool in microsoft excel format used to calculate power from measured amperage and voltage.', 'https://drive.google.com/file/d/1xJMeEKUM93lyxace7UUiIH_BdKf44Dxe/view?usp=sharing', 'Motor Analysis Tool (MAT)', 0, 0, 0, 0, '2020-07-03 03:38:14', 0),
(2006, 115, 0, 0, 21, 'An OSU EEC analysis tool in microsoft excel format used to calculate power from logged amperage data.', 'https://drive.google.com/file/d/1NMKuuxdUv9nNvFXOpR_tmd_-Yw6XUbpW/view?usp=sharing', 'Motor Analysis Tool (MAT) for Dataloggers', 0, 0, 0, 0, '2020-07-03 03:38:14', 0),
(2096, 106, 0, 0, 11, 'Insulate steam lines', '', '', 0, 0, 0, 0, '2020-07-03 17:30:31', 1),
(2097, 106, 0, 0, 11, 'Insulate valves and fittings', '', '', 0, 0, 0, 0, '2020-07-03 17:30:31', 1),
(2098, 106, 0, 0, 11, 'Insulate condensate lines', '', '', 0, 0, 0, 0, '2020-07-03 17:30:31', 1),
(2099, 106, 0, 0, 21, 'An OSU EEC Analysis Template in Microsoft Excel Format', 'https://drive.google.com/file/d/1Et50Qc77pWtPkZcorKcPG_RSuK-Vc_lx/view?usp=sharing', 'Insulation Template', 0, 0, 0, 0, '2020-07-03 17:30:31', 1),
(2100, 106, 0, 0, 21, 'North American Insulation Manufacturers Association Software Download', 'https://insulationinstitute.org/tools-resources/free-3e-plus/?cn-reloaded=1', 'NAIMA 3E Plus Insulation Tool', 1, 0, 0, 0, '2020-07-03 17:30:31', 1),
(2101, 106, 0, 0, 11, 'Insulate steam lines', '', '', 0, 0, 0, 0, '2020-07-03 17:31:09', 0),
(2102, 106, 0, 0, 11, 'Insulate valves and fittings', '', '', 0, 0, 0, 0, '2020-07-03 17:31:09', 0),
(2103, 106, 0, 0, 11, 'Insulate condensate lines', '', '', 0, 0, 0, 0, '2020-07-03 17:31:09', 0),
(2104, 106, 0, 0, 21, 'An OSU EEC Analysis Template in Microsoft Excel Format', 'https://drive.google.com/file/d/1Et50Qc77pWtPkZcorKcPG_RSuK-Vc_lx/view?usp=sharing', 'Insulation Template  (almost approved)', 0, 0, 0, 0, '2020-07-03 17:31:09', 0),
(2105, 106, 0, 0, 21, 'North American Insulation Manufacturers Association Software Download', 'https://insulationinstitute.org/tools-resources/free-3e-plus/?cn-reloaded=1', 'NAIMA 3E Plus Insulation Tool', 1, 0, 0, 0, '2020-07-03 17:31:09', 0),
(2115, 99, 0, 0, 22, 'An OSU EEC Google Slideshow', 'https://docs.google.com/presentation/d/1A-bLNUv7hCuBV2zMsS0A4JEKPNVxaKnIwUMoVZCFr2w/edit?usp=sharing', 'Steam Systems', 0, 0, 0, 0, '2020-07-03 17:55:50', 1),
(2116, 99, 0, 0, 17, 'An OSU EEC Appendix in Microsoft Word Format', 'https://drive.google.com/file/d/1Jh6CaIDd6ugCo6FYqviyVK-O49ic_275/view?usp=sharing', 'Combustion Appendix', 0, 0, 0, 0, '2020-07-03 17:55:50', 1),
(2117, 95, 0, 0, 15, 'Boiler Nameplate Data: Rated Capacity', '', '', 0, 0, 0, 0, '2020-07-03 17:57:24', 1),
(2118, 95, 0, 0, 15, 'Combustion Analysis: Excess O2, Stack Temperature, Inlet / Ambient Temperature ', '', '', 0, 0, 0, 0, '2020-07-03 17:57:24', 1),
(2119, 95, 0, 0, 15, 'Capacity over time', '', '', 0, 0, 0, 0, '2020-07-03 17:57:24', 1),
(2125, 27, 0, 0, 13, 'Energy savings associated with reductions in compressed air use are very dependent on the compressor control strategy. In the worst case, a compressor with blow off control might not yield any energy savings with compressed air use reductions, and one with inlet modulation might yield only a small part of potential savings.', '', '', 0, 0, 0, 0, '2020-07-07 16:17:13', 1),
(2126, 27, 0, 0, 11, 'Reduce compressed air leaks', '', '', 0, 0, 0, 0, '2020-07-07 16:17:13', 1),
(2127, 27, 0, 1, 13, 'Compressed air is an expensive utility, but leaks can go uncorrected as they do not make a mess.', '', '', 0, 0, 0, 0, '2020-07-07 16:17:13', 1),
(2128, 27, 0, 1, 10, 'The compressed air leak rate exceeds 20 to 30% of air used in the process.', '', '', 0, 0, 0, 0, '2020-07-07 16:17:13', 1),
(2129, 27, 0, 1, 8, 'Determine the leak load by checking compressor output when there is no productive use (typically during breaks or after hours.)', '', '', 0, 0, 0, 0, '2020-07-07 16:17:13', 1),
(2130, 27, 0, 1, 8, 'Sonic equipment can be used to identify leak locations and estimate associated losses.', '', '', 0, 0, 0, 0, '2020-07-07 16:17:13', 1),
(2131, 27, 0, 1, 15, 'Air use during idle period (often inferred from datalog of power or amps over time)', '', '', 0, 0, 0, 0, '2020-07-07 16:17:13', 1),
(2132, 27, 0, 1, 15, 'Air use during production (often inferred from datalog of power or amps over time)', '', '', 0, 0, 0, 0, '2020-07-07 16:17:13', 1),
(2133, 27, 0, 1, 15, 'Compressor power over time', '', '', 0, 0, 0, 0, '2020-07-07 16:17:13', 1),
(2134, 27, 0, 1, 17, 'An OSU EEC Analysis Template in Microsoft Excel Format', 'vhttps://drive.google.com/drive/u/0/folders/1pJoEFwdmULog_SRARRlqzFfzX5cpV6cI', 'Analysis Template: Repair Compressed Air Leaks ', 2, 0, 0, 0, '2020-07-07 16:17:13', 1),
(2135, 27, 0, 0, 11, 'Eliminate the use of compressed air “quick fixes” by correcting base issues', '', '', 0, 0, 0, 0, '2020-07-07 16:17:13', 1),
(2136, 27, 0, 1, 13, 'Compressed air is a handy utility that can be used for a temporary resolution of miscellaneous production issues, at the cost of expensive air use. Often these fixes persist without correction of the underlying issue.', '', '', 0, 0, 0, 0, '2020-07-07 16:17:13', 1),
(2137, 27, 0, 1, 10, 'Compressed air used as a temporary quick fix for applications such as cooling bearings, or moving lightweight items that are getting stuck on conveyor.', '', '', 0, 0, 0, 0, '2020-07-07 16:17:13', 1),
(2138, 27, 0, 0, 11, 'Use alternative to vortex coolers', '', '', 0, 0, 0, 0, '2020-07-07 16:17:13', 1),
(2139, 27, 0, 1, 13, 'Vortex coolers are an interesting technology that can take a compressed air inlet stream and yield two streams, one that is cold and one that is warm. They are sometimes used to cool electrical cabinets, but in many cases can be replaced with lower energy solutions such as air conditioning or simple fans.', '', '', 0, 0, 0, 0, '2020-07-07 16:17:13', 1),
(2140, 27, 0, 1, 10, 'Vortex cabinet cooler in use at a facility   ', '', '', 0, 0, 0, 0, '2020-07-07 16:17:13', 1),
(2141, 27, 0, 0, 11, 'Use engineered nozzles for compressed air blow-off applications', '', '', 0, 0, 0, 0, '2020-07-07 16:17:13', 1),
(2142, 27, 0, 1, 13, 'Engineered air nozzles can develop effective air flow with a smaller volume of compressed air by entraining atmospheric air in the air stream.', '', '', 0, 0, 0, 0, '2020-07-07 16:17:13', 1),
(2143, 27, 0, 1, 10, 'Compressed air blowing applications using simple open lines or apertures  ', '', '', 0, 0, 0, 0, '2020-07-07 16:17:13', 1),
(2144, 27, 0, 0, 11, 'Interlock compressed air delivery with equipment or application served.', '', '', 0, 0, 0, 0, '2020-07-07 16:17:13', 1),
(2145, 27, 0, 1, 13, 'Interlocking a compressed air valve to close when supported equipment is idle can eliminate significant unneeded air use. This can range from an entire packaging line to and isolated ink sprayer that blows air constantly while introducing ink to mark product periodically.', '', '', 0, 0, 0, 0, '2020-07-07 16:17:13', 1),
(2146, 27, 0, 1, 10, 'Idle equipment with active compressed air blowing applications or leaks ', '', '', 0, 0, 0, 0, '2020-07-07 16:17:13', 1),
(2147, 27, 0, 0, 11, 'Serve lower pressure end use with blower or fan', '', '', 0, 0, 0, 0, '2020-07-07 16:17:13', 1),
(2148, 27, 0, 1, 13, 'Compressed air is an energy intensive utility with significant heat of compression losses.  These losses can be avoided if the air is not pressurized significantly above that needed for the application. Fans and blowers can develop a like airflow with significantly less energy. ', '', '', 0, 0, 0, 0, '2020-07-07 16:17:13', 1),
(2149, 27, 0, 1, 10, 'Compressed air used for clearing material, blowing off water, agitating tanks of fluid, or any applications with compressed air regulated to a low pressure', '', '', 0, 0, 0, 0, '2020-07-07 16:17:13', 1),
(2150, 27, 0, 0, 11, 'Reduce the frequency or duration of intermittent air uses', '', '', 0, 0, 0, 0, '2020-07-07 16:17:13', 1),
(2151, 27, 0, 0, 11, 'Replace desiccant based air dryer with a refrigerated air dryer if air drying needs permit.', '', '', 0, 0, 0, 0, '2020-07-07 16:17:13', 1),
(2152, 27, 0, 0, 11, 'Use desiccant based air dryer with more efficient desiccant bed regeneration', '', '', 0, 0, 0, 0, '2020-07-07 16:17:13', 1),
(2153, 27, 0, 0, 11, 'Replace pneumatic hand tools with battery powered hand tools', '', '', 0, 0, 0, 0, '2020-07-07 16:17:13', 1),
(2179, 123, 0, 0, 17, 'MEASUR is open source software that consists of the following DOE legacy energy system assessment tools (updated): Pumping System Assessment Tool (PSAT), Process Heating Assessment and Survey Tool (PHAST), Fan System Assessment Tool (FSAT), Steam System Assessment Tool (SSAT)/ Steam System Modeler (SSMT), AIRMaster+ (Last accessed 12/2/2019)   ', 'https://www.energy.gov/eere/amo/measur', 'U.S. Department of Energy MEASUR analysis tool', 1, 0, 0, 0, '2020-07-07 18:00:00', 1),
(2261, 119, 0, 0, 11, 'Manually reduce equipment operation time', '', '', 0, 0, 0, 0, '2020-07-07 23:38:14', 1),
(2262, 119, 0, 0, 11, 'Automatically control equipment operation time', '', '', 0, 0, 0, 0, '2020-07-07 23:38:14', 1),
(2263, 119, 0, 0, 11, 'Interlock equipment with a related process', '', '', 0, 0, 0, 0, '2020-07-07 23:38:14', 1),
(2264, 119, 0, 0, 11, 'Operate equipment in batches rather than continuously ', '', '', 0, 0, 0, 0, '2020-07-07 23:38:14', 1),
(2265, 119, 0, 1, 10, 'Equipment is idle for significant periods of time', '', '', 0, 0, 0, 0, '2020-07-07 23:38:14', 1),
(2267, 96, 0, 0, 27, 'Combustion Analyzer ', '', '', 0, 0, 0, 0, '2020-07-08 20:15:53', 1),
(2268, 112, 0, 0, 15, 'Motor Inventory ', '', '', 0, 0, 0, 0, '2020-07-08 22:27:29', 0),
(2269, 112, 0, 1, 26, 'Motor ID, Location, Application', '', '', 0, 0, 0, 0, '2020-07-08 22:27:29', 0),
(2270, 112, 0, 1, 26, 'Nameplate Data ', '', '', 0, 0, 0, 0, '2020-07-08 22:27:29', 0),
(2271, 112, 0, 1, 26, 'Load Factor, Use Factor (operation hours)', '', '', 0, 0, 0, 0, '2020-07-08 22:27:29', 0),
(2272, 112, 0, 1, 26, 'Drive Type', '', '', 0, 0, 0, 0, '2020-07-08 22:27:29', 0),
(2273, 112, 0, 1, 26, 'Controls', '', '', 0, 0, 0, 0, '2020-07-08 22:27:29', 0),
(2275, 113, 0, 0, 27, 'Power Quality Analyzer ', '', '', 0, 0, 0, 0, '2020-07-08 22:29:50', 0),
(2309, 120, 0, 0, 11, 'Correct Power Factor (Ethan)', '', '', 0, 0, 0, 0, '2020-07-10 18:53:01', 0),
(2310, 120, 0, 1, 10, 'Power factor below ##%', '', '', 0, 0, 0, 0, '2020-07-10 18:53:01', 0),
(2677, 133, 0, 0, 1, 'Pro1', '', '', 0, 0, 0, 0, '2020-07-20 21:20:19', 0),
(2678, 134, 0, 0, 2, 'Con1', '', '', 0, 0, 0, 0, '2020-07-20 21:20:35', 0),
(2679, 135, 0, 0, 4, 'Caveat', '', '', 0, 0, 0, 0, '2020-07-20 21:21:07', 0),
(2680, 136, 0, 0, 3, 'RoT', '', '', 0, 0, 0, 0, '2020-07-20 21:21:25', 0),
(2681, 137, 0, 0, 8, 'Tip', '', '', 0, 0, 0, 0, '2020-07-20 21:21:56', 0),
(2682, 138, 0, 0, 7, 'BP', '', '', 0, 0, 0, 0, '2020-07-20 21:22:23', 0),
(2684, 139, 0, 0, 20, '', 'Fig', 'Fig', 0, 0, 0, 0, '2020-07-20 22:10:06', 0),
(2685, 140, 0, 0, 15, 'data', '', '', 0, 0, 0, 0, '2020-07-20 22:10:28', 0),
(2686, 141, 0, 0, 27, 'Sling Psychrometer ', '', '', 0, 0, 0, 0, '2020-07-20 22:11:29', 0),
(2687, 142, 0, 0, 21, 'tool', 'tool', 'tool', 0, 0, 0, 0, '2020-07-20 22:12:33', 0),
(2688, 143, 0, 0, 17, 'Resource', 'Resource', 'Resource', 0, 0, 0, 0, '2020-07-20 22:13:43', 0),
(2689, 144, 0, 0, 24, 'Link', 'Link', 'Link', 1, 0, 0, 0, '2020-07-20 22:14:24', 0),
(2955, 77, 0, 0, 11, 'Reduce Inlet Air Temperature ', '', '', 1, 0, 0, 0, '2020-07-30 02:31:10', 1),
(2956, 77, 0, 1, 13, 'Reducing the inlet air temperature of oil-injected screw compressors increases mass flow rate while maintaining power input. To efficiently maintain current mass flow rate a variable frequency drive is required to reduce the motor speed and associated power.', '', '', 0, 0, 0, 0, '2020-07-30 02:31:10', 1),
(2957, 77, 0, 1, 10, 'High ambient temperature at the air inlet', '', '', 0, 0, 0, 0, '2020-07-30 02:31:10', 1),
(2958, 77, 0, 1, 10, 'Difficulty meeting a compressor\'s rated air capacity', '', '', 0, 0, 0, 0, '2020-07-30 02:31:10', 1),
(2959, 77, 0, 1, 10, 'A compressor running hotter than its specifications', '', '', 0, 0, 0, 0, '2020-07-30 02:31:10', 1),
(2960, 77, 0, 2, 8, 'Other factors may be at play such as significant air leaks increasing the load on the compressor', '', '', 0, 0, 0, 0, '2020-07-30 02:31:10', 1),
(2961, 77, 0, 1, 3, '1.9% efficiency (scfm/kW) improvement per 10 °F reduction at inlet', '', '', 0, 0, 0, 0, '2020-07-30 02:31:10', 1),
(2962, 77, 0, 1, 15, 'Compressor make, model, and nameplate data', '', '', 0, 0, 0, 0, '2020-07-30 02:31:10', 1),
(2963, 77, 0, 1, 15, 'Motor nameplate data, live power reading, and one week of amperage data', '', '', 0, 0, 0, 0, '2020-07-30 02:31:10', 1),
(2964, 77, 0, 1, 15, 'Complete picture of compressed air system and control strategy', '', '', 0, 0, 0, 0, '2020-07-30 02:31:10', 1),
(2965, 77, 0, 1, 15, 'Average ambient temperature at current and proposed inlet locations', '', '', 0, 0, 0, 0, '2020-07-30 02:31:10', 1),
(2966, 77, 0, 1, 12, 'Move air inlet to coolest location to reduce power and energy consumption', '', '', 0, 0, 0, 0, '2020-07-30 02:31:10', 1),
(2967, 77, 0, 1, 8, 'If implementation requires much more than re-ducting, the chances of this opportunitity being worthwhile are low. ', '', '', 0, 0, 0, 0, '2020-07-30 02:31:10', 1),
(2968, 77, 0, 1, 21, 'An OSU EEC Analysis Template in Microsoft Excel Format', 'https://oregonstate.box.com/s/zk1aol8rf88aul9klflbxkikz6l2ku47', 'Analysis Template: Reduce Inlet Air Temperature', 2, 0, 0, 0, '2020-07-30 02:31:10', 1),
(2969, 77, 0, 1, 17, 'An article from Compressed Air Best Practices by  Tim Dugan, P.E., President, Compression Engineering Corporation', 'https://www.airbestpractices.com/system-assessments/compressor-controls/inlet-air-temperature-impacts-air-compressor-performance', 'Inlet Air Temperature Impacts on Air Compressor Performance', 1, 0, 0, 0, '2020-07-30 02:31:10', 1),
(2970, 77, 0, 0, 11, 'Increase Primary Receiver Capacity', '', '', 0, 0, 0, 0, '2020-07-30 02:31:10', 1),
(2971, 77, 0, 1, 13, 'Insufficient receiver capacity can result in short cycling in oil-injected rotary screw compressors that use load-unload controls. Short cycling occurs when system demand forces a compressor to re-load before unload power has been fully realized, causing the compressor to cycle too frequently. Adding receiver capacity increases system efficiency by reducing cycling losses and time spent at partial loads. ', '', '', 0, 0, 0, 0, '2020-07-30 02:31:10', 1),
(2972, 77, 0, 1, 10, 'Current receiver capacity for an oil-injected rotary screw compressor is less than 3 gal/cfm', '', '', 0, 0, 0, 0, '2020-07-30 02:31:10', 1),
(2973, 77, 0, 1, 10, 'An oil-injected rotary screw compressor consistently unloads for less than 45 seconds', '', '', 0, 0, 0, 0, '2020-07-30 02:31:10', 1),
(2974, 77, 0, 1, 3, 'A minimum of 3 gal/cfm receiver capacity is recommended for oil-injected rotary screw compressors ', '', '', 0, 0, 0, 0, '2020-07-30 02:31:10', 1),
(2975, 77, 0, 1, 1, 'Improved system efficiency due to reduced cycling frequency ', '', '', 0, 0, 0, 0, '2020-07-30 02:31:10', 1),
(2976, 77, 0, 1, 1, 'Critical pressure applications are shielded from pressure fluctuations', '', '', 0, 0, 0, 0, '2020-07-30 02:31:10', 1),
(2977, 77, 0, 1, 1, 'Prevents overloading the compressor\'s motor by allowing for a lower pressure set point ', '', '', 0, 0, 0, 0, '2020-07-30 02:31:10', 1),
(2978, 77, 0, 1, 15, 'Compressor and motor nameplate data and specifications including unload capacity and power', '', '', 0, 0, 0, 0, '2020-07-30 02:31:10', 1),
(2979, 77, 0, 1, 15, 'Week-long amperage data log that represents typical operation to identify when and if short cycling occurs ', '', '', 0, 0, 0, 0, '2020-07-30 02:31:10', 1),
(2980, 77, 0, 1, 15, 'Current receiver capacity and operating pressure', '', '', 0, 0, 0, 0, '2020-07-30 02:31:10', 1),
(2981, 77, 0, 1, 21, 'An OSU EEC Analysis Template in Microsoft Excel Format', 'https://oregonstate.box.com/s/fksaccw3fhif7h70nkynzwlbbu26g608', 'Analysis Template: Increase Air Receiver Capacity', 2, 0, 0, 0, '2020-07-30 02:31:10', 1),
(2982, 77, 0, 1, 20, '', 'https://drive.google.com/file/d/1OV8lp9LoQl2dsUxOvEc8l8ppHLB5JWbY/view?usp=sharing', 'Effect of Receiver Capacity on Lubricant-Injected Rotary Compressor with Load-Unload Capacity Control', 0, 0, 0, 0, '2020-07-30 02:31:10', 1),
(2983, 77, 0, 0, 11, 'Use a more efficient control strategy', '', '', 1, 0, 0, 0, '2020-07-30 02:31:10', 1),
(2984, 77, 0, 0, 11, 'Use a compressed air sequencer for multiple compressors', '', '', 0, 0, 0, 0, '2020-07-30 02:31:10', 1),
(3511, 85, 0, 0, 11, 'Trim Pump Impeller for Better Efficiency at Typical Operating Points', '', '', 0, 0, 0, 0, '2020-08-06 03:46:30', 0),
(3512, 85, 0, 0, 11, 'Replace Pump with One Selected for Optimum Efficiency at Typical Operating Points', '', '', 0, 0, 0, 0, '2020-08-06 03:46:30', 0),
(3513, 85, 0, 1, 10, 'Older pumps that have not been adjusted or calibrated to fit existing demand.', '', '', 0, 0, 0, 0, '2020-08-06 03:46:30', 0),
(3514, 85, 0, 1, 15, 'Pressure across the pump', '', '', 0, 0, 0, 0, '2020-08-06 03:46:30', 0),
(3515, 85, 0, 1, 15, 'Fluid flow rate', '', '', 0, 0, 0, 0, '2020-08-06 03:46:30', 0),
(3516, 85, 0, 1, 15, 'Operating hours', '', '', 0, 0, 0, 0, '2020-08-06 03:46:30', 0),
(3517, 85, 0, 1, 15, 'Pump curve and nameplate', '', '', 0, 0, 0, 0, '2020-08-06 03:46:30', 0),
(3518, 85, 0, 1, 15, 'Elevation change', '', '', 0, 0, 0, 0, '2020-08-06 03:46:30', 0),
(3519, 85, 0, 1, 15, 'Type of fluid', '', '', 0, 0, 0, 0, '2020-08-06 03:46:30', 0),
(3520, 85, 0, 1, 27, 'Power Quality Analyzer (PQA)', '', '', 0, 0, 0, 0, '2020-08-06 03:46:30', 0),
(3521, 85, 0, 1, 27, 'Ultrasonic flow meter', '', '', 0, 0, 0, 0, '2020-08-06 03:46:30', 0),
(3522, 85, 0, 1, 8, 'Try to find nearby pressure gauges to estimate pressure change across the pump.', '', '', 0, 0, 0, 0, '2020-08-06 03:46:30', 0),
(3523, 85, 0, 1, 8, 'Pick a pump based on its best efficiency point matching current operating conditions.', '', '', 0, 0, 0, 0, '2020-08-06 03:46:30', 0),
(3524, 85, 0, 1, 14, 'Would installing a variable frequency drive (VFD), trimming the impeller, replacing the motor, or using a belt sheave be a better option?', '', '', 0, 0, 0, 0, '2020-08-06 03:46:30', 0),
(3525, 85, 0, 1, 4, 'When modifying or replacing pumps and fans, or adjusting their rpm, be sure that they can operate under all conditions anticipated for the given system. System pressure or head should not exceed the maximum pressure or head the fan or pump can sustain. Surge points should be avoided.', '', '', 0, 0, 0, 0, '2020-08-06 03:46:30', 0),
(3526, 85, 0, 0, 11, 'Replace or Overhaul Worn or Damaged Pumps', '', '', 0, 0, 0, 0, '2020-08-06 03:46:30', 0),
(3606, 131, 0, 0, 11, 'Condenser qater temperature adjustment ', '', '', 0, 0, 0, 0, '2020-08-06 19:13:00', 0),
(3607, 131, 0, 0, 11, 'Chilled water supply temperature adjustment', '', '', 0, 0, 0, 0, '2020-08-06 19:13:00', 0),
(3608, 131, 0, 0, 11, 'Fan motor controls (variable speed)', '', '', 0, 0, 0, 0, '2020-08-06 19:13:00', 0),
(3861, 130, 0, 0, 11, 'Insulate hot surfaces (Julian)', '', '', 0, 0, 0, 0, '2020-08-06 20:55:52', 0),
(3862, 130, 0, 1, 13, 'Un-insulated or poorly insulated surfaces are a significant source of lost energy. Temperature differentials between the surfaces and surroundings act as a driving force for the heat transfer between these bodies. The rate of this heat transfer is directly proportional to the magnitude of the temperature differential. Insulating these surfaces will decrease this rate of heat transfer, saving energy and improving system efficiency.', '', '', 0, 0, 0, 0, '2020-08-06 20:55:52', 0),
(3863, 130, 0, 1, 10, 'Facility has significant amount of uninsulated, high temperature surfaces such as steam lines, boilers, or other thermal equipment', '', '', 0, 0, 0, 0, '2020-08-06 20:55:52', 0),
(3864, 130, 0, 1, 14, 'Is there a large temperature differential between the surface and the surroundings to drive significant heat loss?', '', '', 0, 0, 0, 0, '2020-08-06 20:55:52', 0),
(3865, 130, 0, 1, 8, 'When touring a facility, if you feel heat radiating off of a surface or piece of equipment this may signal an opportunity', '', '', 0, 0, 0, 0, '2020-08-06 20:55:52', 0),
(3866, 130, 0, 1, 3, 'Insulating steam lines can reduce energy losses by as much 90% (DOE Tip Sheet)', '', '', 0, 0, 0, 0, '2020-08-06 20:55:52', 0),
(3867, 130, 0, 1, 3, 'Any surface over 120 F should be insulated (DOE Tip Sheet)', '', '', 0, 0, 0, 0, '2020-08-06 20:55:52', 0),
(3868, 130, 0, 1, 1, 'Insulating hot surfaces can improve safety along with reducing heat loss', '', '', 0, 0, 0, 0, '2020-08-06 20:55:52', 0),
(3869, 130, 0, 1, 2, 'Some insulation materials are expensive', '', '', 0, 0, 0, 0, '2020-08-06 20:55:52', 0),
(3870, 130, 0, 1, 4, 'Many different types of insulation exist and not all are suitable for specific case. Take this into consideration when choosing an insulation material', '', '', 0, 0, 0, 0, '2020-08-06 20:55:52', 0),
(3871, 130, 0, 1, 8, 'As insulation thickness is increased, there is a diminishing return on the energy saved, choose the most economical option that offers sufficient energy reduction while minimizing material cost', '', '', 0, 0, 0, 0, '2020-08-06 20:55:52', 0),
(3872, 130, 0, 1, 15, 'Surface temperature, material, geometry, surface area', '', '', 0, 0, 0, 0, '2020-08-06 20:55:52', 0),
(3873, 130, 0, 1, 15, 'Equipment operating hours', '', '', 0, 0, 0, 0, '2020-08-06 20:55:52', 0),
(3874, 130, 0, 1, 15, 'Motor nameplate information if applicable', '', '', 0, 0, 0, 0, '2020-08-06 20:55:52', 0),
(3875, 130, 0, 1, 15, 'Process fuel or electricity costs', '', '', 0, 0, 0, 0, '2020-08-06 20:55:52', 0),
(3876, 130, 0, 1, 27, 'Digital or Infrared Contact Thermometer', '', '', 0, 0, 0, 0, '2020-08-06 20:55:52', 0),
(3877, 130, 0, 1, 27, 'Thermal Imager', '', '', 0, 0, 0, 0, '2020-08-06 20:55:52', 0),
(3878, 130, 0, 1, 20, '', 'https://www.buyinsulationproductstore.com/blog/dollar-amount-savings-by-installing-fiberglass-pipe-insulation-on-steam-piping/', 'Sample thermal image showing the different heat signatures of insulated vs. uninsulated pipes', 0, 0, 0, 0, '2020-08-06 20:55:52', 0),
(3879, 130, 0, 1, 20, '', 'https://www.tcorr.com.au/coating-inspection/inspection-of-pipe-and-tank-linings/', 'Sample thermal image capture of uninsulated steam generating equipmentg', 0, 0, 0, 0, '2020-08-06 20:55:52', 0),
(3880, 130, 0, 1, 24, 'US DOE Steam Tip Sheet #17', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam17_valves_fittings.pdf', 'Install Removable Insulation on Valves and Fittings', 1, 0, 0, 0, '2020-08-06 20:55:52', 0),
(3881, 130, 0, 1, 24, 'US DOE Steam Tip Sheet #2', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam2_insulate.pdf', 'Insulate Steam Distribution and Condensate Return Lines', 1, 0, 0, 0, '2020-08-06 20:55:52', 0),
(3882, 130, 0, 1, 21, '3E Plus Software', 'https://insulationinstitute.org/tools-resources/free-3e-plus/', 'PIpe Insulation | Calculate Thickness | 3E Plus Software', 1, 0, 0, 0, '2020-08-06 20:55:52', 0),
(3883, 130, 0, 1, 17, 'Example recommendation involving the installation of insulation on two drying silos', 'https://oregonstate.app.box.com/file/656776414288', 'Drying Silo Insulation', 0, 0, 0, 0, '2020-08-06 20:55:52', 0),
(3884, 130, 0, 1, 17, 'Example recommendation invovling the installation of insulation on injection barrels in a plastics and injection molding facility', 'https://oregonstate.app.box.com/file/606287338448', 'Insulate Injection Barrels', 0, 0, 0, 0, '2020-08-06 20:55:52', 0),
(3885, 130, 0, 1, 21, 'Template used to develop and present an analysis of the energy savings associated with insulating a facility\'s equipment or other hot surfaces', 'https://oregonstate.app.box.com/folder/51071018894', 'Analysis Template: Install Insulation', 0, 0, 0, 0, '2020-08-06 20:55:52', 0),
(3892, 164, 0, 0, 24, '$empty', 'https://eec.oregonstate.edu/wastewater-treatment-training-module', 'Wastewater Treatment Training', 0, 0, 0, 0, '2020-08-06 22:33:54', 1),
(4118, 163, 0, 0, 11, 'Control Aeration to Hold a Minimum Dissolved Oxygen Level', '', '', 0, 0, 0, 0, '2020-08-06 23:36:56', 1);
INSERT INTO `Items` (`itemId`, `cardId`, `orderIndex`, `indentation`, `iconType`, `contentText`, `contentUrl`, `contentLabel`, `contentMode`, `internal`, `inline`, `sourceId`, `created`, `approved`) VALUES
(4119, 163, 0, 0, 11, 'Replace Standard Aeration Fans with High Efficiency Turbo Blowers', '', '', 0, 0, 0, 0, '2020-08-06 23:36:56', 1),
(4120, 163, 0, 0, 11, 'Improve Efficiency of Fine Bubble Diffusers', '', '', 0, 0, 0, 0, '2020-08-06 23:36:56', 1),
(4146, 155, 0, 0, 26, 'Initiate a conversation with potential clients in follow up to industry requests, partner references, or direct contact.', '', '', 0, 0, 0, 0, '2020-08-06 23:50:17', 1),
(4147, 155, 0, 0, 26, 'Confirm suitability of the site and client for a remote IAC assessment', '', '', 0, 0, 0, 0, '2020-08-06 23:50:17', 1),
(4148, 155, 0, 1, 12, 'Let clients know of key IAC eligibility criteria (Annual Energy Cost between $100K and $2.5 Mil, less than 500 employees,...) ', '', '', 0, 0, 0, 0, '2020-08-06 23:50:17', 1),
(4149, 155, 0, 1, 14, 'Make sure clients are prepared for the effort required for a remote assessment (we are still learning what this is)', '', '', 0, 0, 0, 0, '2020-08-06 23:50:17', 1),
(4150, 155, 0, 1, 14, 'Ensure someone at the site can \"walk us through\" or at least go to targeted locations while with us on the phone to ask questions, perhaps get pictures or videos, and really dig into details. (This step is important for our contract with U.S.DOE)', '', '', 0, 0, 0, 0, '2020-08-06 23:50:17', 1),
(4151, 155, 0, 0, 26, 'Send the standard OSU Pre-Assessment Package to appropriate clients ', '', '', 0, 0, 0, 0, '2020-08-06 23:50:17', 1),
(4152, 155, 0, 1, 17, '$empty', 'https://docs.google.com/document/d/1miAvxrMxVcEeQe1REf-4EH2OiDF32zTjGluq4hoZnMU/edit', 'Pre_Assessment Package Template', 0, 0, 0, 0, '2020-08-06 23:50:17', 1),
(4255, 101, 0, 0, 11, 'Tune the boiler regularly', '', '', 0, 0, 0, 0, '2020-08-07 21:56:39', 0),
(4256, 101, 0, 1, 10, 'O2 readings in the exhaust are high for the fuel type (>3% for gaseous fuels, >8% for solid fuels)', '', '', 0, 0, 0, 0, '2020-08-07 21:56:39', 0),
(4257, 101, 0, 1, 15, 'Combustion analysis at representative firing rates (high, medium, low, standby)', '', '', 0, 0, 0, 0, '2020-08-07 21:56:39', 0),
(4258, 101, 0, 1, 15, 'Firing rate over time', '', '', 0, 0, 0, 0, '2020-08-07 21:56:39', 0),
(4259, 101, 0, 1, 21, 'An OSU EEC Analysis Template in Microsoft Excel Format (unapproved, old style)', 'https://drive.google.com/file/d/1Z9GbxV0nr-OuxT2cNLxkdo82Wpq-h70m/view?usp=sharing', 'Boiler Tune Template', 0, 0, 0, 0, '2020-08-07 21:56:39', 0),
(4260, 101, 0, 0, 11, 'Install O2 Controls to maintain optimum combustion efficiency throughout the operating range', '', '', 0, 0, 0, 0, '2020-08-07 21:56:39', 0),
(4261, 101, 0, 1, 10, 'The boiler spends a significant portion of time at partial fire and lower efficiency', '', '', 0, 0, 0, 0, '2020-08-07 21:56:39', 0),
(4262, 101, 0, 0, 11, 'Clean heat exchanger surfaces and reduce the exhaust temperature', '', '', 0, 0, 0, 0, '2020-08-07 21:56:39', 0),
(4263, 101, 0, 1, 10, 'Stack temperature exceeds steam temperature by over 150 ˚F', '', '', 0, 0, 0, 0, '2020-08-07 21:56:39', 0),
(4264, 101, 0, 1, 12, 'Clean the fire side. Soot can accumulate and inhibit heat transfer.', '', '', 0, 0, 0, 0, '2020-08-07 21:56:39', 0),
(4265, 101, 0, 1, 12, 'Clean the water side. Scale can accumulate and inhibit heat transfer is the water chemistry is off', '', '', 0, 0, 0, 0, '2020-08-07 21:56:39', 0),
(4266, 101, 0, 0, 11, 'Install an economizer', '', '', 0, 0, 0, 0, '2020-08-07 21:56:39', 0),
(4267, 101, 0, 1, 10, 'Boilers rated at 100 BoHP or higher operating at greater than 75 psig.', '', '', 0, 0, 0, 0, '2020-08-07 21:56:39', 0),
(4268, 101, 0, 1, 13, 'Economizers can be used to preheat incoming feedwater, reducing the energy required for boiling.', '', '', 0, 0, 0, 0, '2020-08-07 21:56:39', 0),
(4269, 101, 0, 1, 3, 'Typically increases efficiency by around 2-4%.', '', '', 0, 0, 0, 0, '2020-08-07 21:56:39', 0),
(4270, 101, 0, 1, 3, 'For every 40°F decrease in flue gas temperature there is a 1% increase in efficiency', '', '', 0, 0, 0, 0, '2020-08-07 21:56:39', 0),
(4271, 101, 0, 1, 3, 'Can often reduce fuel requirements by 10%', '', '', 0, 0, 0, 0, '2020-08-07 21:56:39', 0),
(4272, 101, 0, 1, 8, 'Best suited for boilers with flue gasses containing sulfur or other potentially acidic elements/compounds.', '', '', 0, 0, 0, 0, '2020-08-07 21:56:39', 0),
(4273, 101, 0, 1, 4, 'Flue gasses containing sulphur must remain above dew point. Condensation of sulphuric acid can cause corrosion and damage the system.', '', '', 0, 0, 0, 0, '2020-08-07 21:56:39', 0),
(4274, 101, 0, 1, 2, 'Cannot recover as much energy from the boiler stack as a condensing economizer.', '', '', 0, 0, 0, 0, '2020-08-07 21:56:39', 0),
(4275, 101, 0, 1, 14, 'Does the boiler contain potentially acidic elements/compounds such as sulfur?', '', '', 0, 0, 0, 0, '2020-08-07 21:56:39', 0),
(4276, 101, 0, 1, 14, 'Would a condensing economizer be a better alternative?', '', '', 0, 0, 0, 0, '2020-08-07 21:56:39', 0),
(4277, 101, 0, 1, 14, 'Is there adequate space for an economizer?', '', '', 0, 0, 0, 0, '2020-08-07 21:56:39', 0),
(4278, 101, 0, 1, 14, 'What is the greatest temperature that the flue gasses can be reduced by without causing condensation?', '', '', 0, 0, 0, 0, '2020-08-07 21:56:39', 0),
(4279, 101, 0, 1, 27, 'Combustion analyzer', '', '', 0, 0, 0, 0, '2020-08-07 21:56:39', 0),
(4280, 101, 0, 1, 15, 'Flue gas temperature', '', '', 0, 0, 0, 0, '2020-08-07 21:56:39', 0),
(4281, 101, 0, 1, 15, 'Fuel used', '', '', 0, 0, 0, 0, '2020-08-07 21:56:39', 0),
(4282, 101, 0, 1, 15, 'Operating hours', '', '', 0, 0, 0, 0, '2020-08-07 21:56:39', 0),
(4283, 101, 0, 1, 15, 'Water mass flowrate', '', '', 0, 0, 0, 0, '2020-08-07 21:56:39', 0),
(4284, 101, 0, 1, 15, 'Water temperatures', '', '', 0, 0, 0, 0, '2020-08-07 21:56:39', 0),
(4285, 101, 0, 1, 15, 'Steam temperature and pressure', '', '', 0, 0, 0, 0, '2020-08-07 21:56:39', 0),
(4286, 101, 0, 1, 15, 'Boiler efficiency', '', '', 0, 0, 0, 0, '2020-08-07 21:56:39', 0),
(4287, 101, 0, 1, 17, 'Department of Energy tip sheet that provides an example case study of a boiler feedwater economizer being installed, as well as general considerations.', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam3_recovery.pdf', 'Use Feedwater Economizers for Waste Heat Recovery', 1, 0, 0, 0, '2020-08-07 21:56:39', 0),
(4288, 101, 0, 0, 11, 'Install a condensing economizer', '', '', 0, 0, 0, 0, '2020-08-07 21:56:39', 0),
(4289, 101, 0, 1, 10, 'Boilers rate at 100 BoHP or higher operating at greater that 75 psig that do not user fuels with sulphurous products.', '', '', 0, 0, 0, 0, '2020-08-07 21:56:39', 0),
(4290, 101, 0, 1, 3, 'Can increase efficiency by up to 10%', '', '', 0, 0, 0, 0, '2020-08-07 21:56:39', 0),
(4291, 101, 0, 1, 3, 'Can increase boiler efficiency to over 90%', '', '', 0, 0, 0, 0, '2020-08-07 21:56:39', 0),
(4292, 101, 0, 1, 1, 'Can recover more energy from the boiler stack by reducing flue gas temperature below dew point.', '', '', 0, 0, 0, 0, '2020-08-07 21:56:39', 0),
(4293, 101, 0, 1, 2, 'Not recommended for use with fuels containing sulphur.', '', '', 0, 0, 0, 0, '2020-08-07 21:56:39', 0),
(4294, 101, 0, 1, 2, 'The condensed water may be acidic, requiring treatment before being disharged to sewer systems.', '', '', 0, 0, 0, 0, '2020-08-07 21:56:39', 0),
(4295, 101, 0, 1, 4, 'Fuels with sulphurous combustions can damage the boiler stack when condensing, creating sulphuric acid.', '', '', 0, 0, 0, 0, '2020-08-07 21:56:39', 0),
(4296, 101, 0, 1, 4, 'Boiler stacks are prone to corrosion due to water condensation.', '', '', 0, 0, 0, 0, '2020-08-07 21:56:39', 0),
(4297, 101, 0, 1, 14, 'Does the boiler\'s fuel contain potentially acidic elements/compounds such as sulfur?', '', '', 0, 0, 0, 0, '2020-08-07 21:56:39', 0),
(4298, 101, 0, 1, 14, 'What is the greatest temperature the flue gasses can be reduced by?', '', '', 0, 0, 0, 0, '2020-08-07 21:56:39', 0),
(4299, 101, 0, 1, 27, 'Combustion analyzer', '', '', 0, 0, 0, 0, '2020-08-07 21:56:39', 0),
(4300, 101, 0, 1, 15, 'Flue gas temperature', '', '', 0, 0, 0, 0, '2020-08-07 21:56:39', 0),
(4301, 101, 0, 1, 15, 'Flue gas composition', '', '', 0, 0, 0, 0, '2020-08-07 21:56:39', 0),
(4302, 101, 0, 1, 15, 'Fuel used', '', '', 0, 0, 0, 0, '2020-08-07 21:56:39', 0),
(4303, 101, 0, 1, 15, 'Operating hours', '', '', 0, 0, 0, 0, '2020-08-07 21:56:39', 0),
(4304, 101, 0, 1, 15, 'Water mass flowrate', '', '', 0, 0, 0, 0, '2020-08-07 21:56:39', 0),
(4305, 101, 0, 1, 15, 'Water temperatures', '', '', 0, 0, 0, 0, '2020-08-07 21:56:39', 0),
(4306, 101, 0, 1, 15, 'Steam temperature/pressure', '', '', 0, 0, 0, 0, '2020-08-07 21:56:39', 0),
(4307, 101, 0, 1, 15, 'Boiler efficiency', '', '', 0, 0, 0, 0, '2020-08-07 21:56:39', 0),
(4308, 101, 0, 1, 12, 'Complete a more in-depth study evaluating the benefits of a condensing economizer and how it may impact the water and how the boiler operates.', '', '', 0, 0, 0, 0, '2020-08-07 21:56:39', 0),
(4309, 101, 0, 1, 12, 'Contact a vendor for more implementation details. Condensing economizers are custom made for each boiler.', '', '', 0, 0, 0, 0, '2020-08-07 21:56:39', 0),
(4310, 101, 0, 1, 24, 'This webpage lists the epcific heats and gas constants for different gasses. This is uesd for calculating the properties of the flue gasses.', 'https://www.engineeringtoolbox.com/specific-heat-capacity-gases-d_159.html', 'Specific Heat and Individual Gas Constant of Gases', 1, 0, 0, 0, '2020-08-07 21:56:39', 0),
(4311, 101, 0, 1, 17, 'Department of Energy tip sheet that explains how a condensing economizer works and how it saves energy, along with example scenarios', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam26a_condensing.pdf', 'Consider Installing a Condensing Economizer', 1, 0, 0, 0, '2020-08-07 21:56:39', 0),
(4312, 101, 0, 1, 17, 'Department of Energy tip sheet that explains special considerations that need to be taken into account when choosing to do projects with condensing economizers.', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam26b_condensing.pdf', 'Considerations When Selecting a Condensing Economizer', 1, 0, 0, 0, '2020-08-07 21:56:39', 0),
(4402, 169, 0, 0, 4, 'Implementation is typically costly and time consuming. Relocation of departments and workstations typically requires plant downtime.', '', '', 0, 0, 0, 0, '2020-08-14 20:44:57', 0),
(4403, 169, 0, 0, 4, 'Data for sufficient analysis is difficult to obtain without longer term studies. Variance in workflows greatly influences calculations if non-annual data is used.', '', '', 0, 0, 0, 0, '2020-08-14 20:44:57', 0),
(4409, 170, 0, 0, 10, 'The flow of work in progress product, personnel, or inventory/materials appears non-linear or requires excessive movement.', '', '', 0, 0, 0, 0, '2020-08-14 21:06:31', 0),
(4410, 170, 0, 0, 10, 'Inefficient layouts are most common in facilities that produce low volumes of diverse products. Layouts of high volume manufacturing facilities are typically already optimized. ', '', '', 0, 0, 0, 0, '2020-08-14 21:06:31', 0),
(4411, 171, 0, 0, 15, 'Facility layout with location and dimensions of departments.', '', '', 0, 0, 0, 0, '2020-08-14 21:08:00', 0),
(4412, 171, 0, 0, 15, 'Directional flow of materials and personal during processing from start to end..', '', '', 0, 0, 0, 0, '2020-08-14 21:08:00', 0),
(4413, 171, 0, 0, 15, 'How materials are transported (e.g. manual labor, forklift, conveyors).', '', '', 0, 0, 0, 0, '2020-08-14 21:08:00', 0),
(4414, 171, 0, 0, 15, 'Relative cost of moving materials during production.', '', '', 0, 0, 0, 0, '2020-08-14 21:08:00', 0),
(4415, 171, 0, 0, 15, 'How many units of each material are processed on an average production day.', '', '', 0, 0, 0, 0, '2020-08-14 21:08:00', 0),
(4416, 171, 0, 0, 15, 'Means for cost savings (e.g. labor and energy costs).', '', '', 0, 0, 0, 0, '2020-08-14 21:08:00', 0),
(4434, 172, 0, 0, 26, 'Layout efficiency (D) is the summation of the products of distance traveled (d), number of units (x), and relative moving cost (f) of all materials/personnel during an average production day. In other words, D = Sum (fi *xi*di) for all i.', '', '', 0, 0, 0, 0, '2020-08-14 21:20:02', 0),
(4435, 172, 0, 0, 26, 'Distance traveled between departments (d) is typically calculated rectilinearly, or the sum of the horizontal and vertical differences between the centroids of two departments .   ', '', '', 0, 0, 0, 0, '2020-08-14 21:20:02', 0),
(4436, 172, 0, 0, 26, 'Relative moving cost (f) is a subjective measurement. If the movement cost is average, it should assume a value of 1. Therefore, if a material requires twice the effort to move compared to the average material it should assume a value of 2.', '', '', 0, 0, 0, 0, '2020-08-14 21:20:02', 0),
(4437, 172, 0, 0, 26, 'Calculating D-scores should be done tabularly.  ', '', '', 0, 0, 0, 0, '2020-08-14 21:20:02', 0),
(4442, 173, 0, 0, 26, 'Most inefficient layouts are the result of future space, workstation, and product expansions that were not considered in the original design of the facility layout..', '', '', 0, 0, 0, 0, '2020-08-14 23:18:36', 0),
(4443, 173, 0, 0, 26, 'For layouts with obvious flow inefficiencies, using intuition to organize departments is sufficient to achieve savings. However, there are heuristic models that can be used for a more scientific approach.', '', '', 0, 0, 0, 0, '2020-08-14 23:18:36', 0),
(4444, 175, 0, 0, 11, 'Use digester gas in a dual fuel boiler', '', '', 0, 0, 0, 0, '2020-08-17 18:11:37', 1),
(4445, 175, 0, 0, 11, 'Clean and concentrate digester gas for sale to natural gas utility', '', '', 0, 0, 0, 0, '2020-08-17 18:11:37', 1),
(4446, 176, 0, 0, 11, 'Control UV Disinfection to minimum required', '', '', 0, 0, 0, 0, '2020-08-17 18:16:44', 1),
(4447, 126, 0, 0, 17, '$empty', '/wiki/technologies/45', 'Pumps', 0, 0, 0, 0, '2020-08-17 20:33:44', 1),
(4506, 165, 0, 0, 26, 'What will we do next?', '', '', 0, 0, 0, 0, '2020-08-17 21:32:04', 1),
(4507, 165, 0, 0, 26, 'How can we get incentive program personnel involved (ETO, ESU, utility reps)?', '', '', 0, 0, 0, 0, '2020-08-17 21:32:04', 1),
(4520, 162, 0, 0, 13, 'This is a requirement for U.S.DOE to accept our remote assessment as a deliverable on our contract. It might be done in one session or iteratively in multiple sessions.', '', '', 0, 0, 0, 0, '2020-08-17 21:38:35', 1),
(4521, 162, 0, 0, 26, 'Begin with a review of preparatory work including the intitial energy balance, and list of possible opportunities.', '', '', 0, 0, 0, 0, '2020-08-17 21:38:35', 1),
(4522, 162, 0, 0, 26, 'Discuss the best strategy to use for a Guided Remote Tour. This might be: ', '', '', 0, 0, 0, 0, '2020-08-17 21:38:35', 1),
(4523, 162, 0, 1, 12, 'A standard tour of the process from start to finish, but this could be an overly long time for a Zoom meeting. ', '', '', 0, 0, 0, 0, '2020-08-17 21:38:35', 1),
(4524, 162, 0, 1, 12, 'A series of shorter remote targeted tours of areas of specific interest. ', '', '', 0, 0, 0, 0, '2020-08-17 21:38:35', 1),
(4525, 162, 0, 2, 8, 'This strategy is being used by a number of assessment teams', '', '', 0, 0, 0, 0, '2020-08-17 21:38:35', 1),
(4526, 162, 0, 2, 1, 'Can simplify scheduling if only key team members must join tours of particular areas.  Others can participate based on availability.', '', '', 0, 0, 0, 0, '2020-08-17 21:38:35', 1),
(4532, 124, 0, 0, 17, 'See pump tip sheets.', 'https://www.energy.gov/eere/amo/tip-sheets-system', 'U.S.DOE Energy Tip Sheets by System', 1, 0, 0, 0, '2020-08-20 00:57:02', 1),
(4546, 122, 0, 0, 2, 'Actual efficiency can easily vary from 50 percent to 80 percent for optimum operation of a particular pump', '', '', 0, 0, 0, 0, '2020-08-18 21:24:36', 1),
(4549, 179, 0, 0, 15, 'Pump nameplate', '', '', 0, 0, 0, 0, '2020-08-18 21:43:11', 0),
(4550, 179, 0, 0, 15, 'Motor nameplate', '', '', 0, 0, 0, 0, '2020-08-18 21:43:11', 0),
(4551, 179, 0, 0, 15, 'Pump curve data', '', '', 0, 0, 0, 0, '2020-08-18 21:43:11', 0),
(4552, 179, 0, 0, 15, 'Live amperage readings, flow rates, and operating pressure (system head)', '', '', 0, 0, 0, 0, '2020-08-18 21:43:11', 0),
(4566, 154, 0, 0, 26, 'Check the estimated annual energy cost for each utility', '', '', 0, 0, 0, 0, '2020-08-18 21:48:18', 1),
(4567, 154, 0, 1, 14, 'Is the total annual energy cost suitable for an IAC Assessment? ', '', '', 0, 0, 0, 0, '2020-08-18 21:48:18', 1),
(4568, 154, 0, 2, 3, '$100,000 a year is the minimum but ideally costs will exceed $200,000  - $300,000 a year. ', '', '', 0, 0, 0, 0, '2020-08-18 21:48:18', 1),
(4569, 154, 0, 2, 3, 'If annual cost exceeds $2.5 Million, Field Manager / U.S.DOE permission must be obtained to visit. ', '', '', 0, 0, 0, 0, '2020-08-18 21:48:18', 1),
(4570, 154, 0, 0, 26, 'Accumulate / analyze annual month by month utility bills. ', '', '', 0, 0, 0, 0, '2020-08-18 21:48:18', 1),
(4571, 154, 0, 1, 12, 'Identify any seasonality to bills.', '', '', 0, 0, 0, 0, '2020-08-18 21:48:18', 1),
(4572, 154, 0, 1, 12, 'Determine incremental costs (Potential savings with each unit of resource saved )', '', '', 0, 0, 0, 0, '2020-08-18 21:48:18', 1),
(4573, 154, 0, 1, 12, 'Understand special costs: Electrical Demand and Power Factor cost, meter costs, ...', '', '', 0, 0, 0, 0, '2020-08-18 21:48:18', 1),
(4574, 154, 0, 1, 12, 'Confirm estimated annual costs ', '', '', 0, 0, 0, 0, '2020-08-18 21:48:18', 1),
(4575, 154, 0, 1, 17, '(item not added yet)', 'abc.com', 'Example Utility Baseline Analysis', 0, 0, 0, 0, '2020-08-18 21:48:18', 1),
(4576, 154, 0, 0, 26, 'Ensure all personnel information provided is entered into the OSU IAC Project Management DB', '', '', 0, 0, 0, 0, '2020-08-18 21:48:18', 1),
(4577, 154, 0, 0, 26, 'Review potential incentive and assistance programs available to the client through their utilities', '', '', 0, 0, 0, 0, '2020-08-18 21:48:18', 1),
(4578, 154, 0, 0, 14, 'If the client has given permission, consider how to engage utility representatives (and regional incentive and assistance programs such as  ETO or ESI  in the remote assessment process)?', '', '', 0, 0, 0, 0, '2020-08-18 21:48:18', 1),
(4617, 158, 0, 0, 26, 'Review any areas of concern or interest voiced by the client', '', '', 0, 0, 0, 0, '2020-08-18 21:54:33', 1),
(4618, 158, 0, 0, 26, 'Review typical opportunities found in the energy intensive systems identified at the facility ', '', '', 0, 0, 0, 0, '2020-08-18 21:54:33', 1),
(4619, 158, 0, 1, 8, 'This Industrial Walkthrough Checklist & Reference will offer more and more ideas for potential opportunities as it is developed over time', '', '', 0, 0, 0, 0, '2020-08-18 21:54:33', 1),
(4620, 158, 0, 0, 26, 'Review the list of typical opportunities found in the site\'s industrial sector developed in Preliminary Research', '', '', 0, 0, 0, 0, '2020-08-18 21:54:33', 1),
(4621, 158, 0, 0, 26, 'Pick the brain of anyone with experience in the subject', '', '', 0, 0, 0, 0, '2020-08-18 21:54:33', 1),
(4622, 158, 0, 0, 26, 'Brainstorm on opportunities as a team and compile a list', '', '', 0, 0, 0, 0, '2020-08-18 21:54:33', 1),
(4623, 158, 0, 0, 26, 'Develop a table of potential recommendations, and if possible: total energy used by the system related to each opportunity, a high/low estimate of potential % savings,  and the range of potential cost and energy savings potential.', '', '', 0, 0, 0, 0, '2020-08-18 21:54:33', 1),
(4624, 158, 0, 1, 17, '(Item not added yet)', 'osu.edu', 'Example Table of Potential Opportunities', 0, 0, 0, 0, '2020-08-18 21:54:33', 1),
(4625, 157, 0, 0, 26, 'Develop a table of significant energy using equipment including collected rated capacity, estimated % of full capacity, and hours of operation', '', '', 0, 0, 0, 0, '2020-08-18 21:54:52', 1),
(4626, 157, 0, 1, 12, 'Calculate an initial estimate of annual energy used by each piece of equipment', '', '', 0, 0, 0, 0, '2020-08-18 21:54:52', 1),
(4627, 157, 0, 1, 12, 'Develop a pie chart showing % of total site energy each modeled equipment item uses, and remaining unidentified energy use.', '', '', 0, 0, 0, 0, '2020-08-18 21:54:52', 1),
(4628, 157, 0, 2, 14, 'Does the total modeled energy exceed the actual energy in the bills? (If so, revise the model.) ', '', '', 0, 0, 0, 0, '2020-08-18 21:54:52', 1),
(4629, 157, 0, 1, 12, 'Plan to continually revise and improve this balance over the process of the remote assessment.', '', '', 0, 0, 0, 0, '2020-08-18 21:54:52', 1),
(4630, 157, 0, 2, 14, 'Does more equipment come up that can be added?', '', '', 0, 0, 0, 0, '2020-08-18 21:54:52', 1),
(4631, 157, 0, 2, 14, 'Does better data become available on any modeled equipment to improve its annual energy use estimate?', '', '', 0, 0, 0, 0, '2020-08-18 21:54:52', 1),
(4632, 157, 0, 1, 17, '(Item not added yet)', 'osu.edu', 'Example Energy Balance', 0, 0, 0, 0, '2020-08-18 21:54:52', 1),
(4639, 182, 0, 0, 4, 'Improperly designed pump systems can lead to low pressures at the pump inlet which can lead to cavitation. This can seriously damage the pump and reduce its operating life.', '', '', 0, 0, 0, 0, '2020-08-19 21:52:48', 1),
(4640, 182, 0, 0, 24, 'Online resource discussing how cavitation occurs and how to detect and prevent it from happening.', 'https://modernpumpingtoday.com/detecting-pump-cavitation/', 'Detecting Pump Cavitation (May be able to find a more comprehensive resource)', 1, 0, 0, 0, '2020-08-19 21:52:48', 1),
(4641, 161, 0, 0, 26, 'Review the client\'s web site', '', '', 0, 0, 0, 0, '2020-08-19 22:39:25', 1),
(4642, 161, 0, 0, 26, 'Develop a list of typical opportunities found in the site\'s industrial sector. BE SURE to add any newly identified opportunities to this site!', '', '', 0, 0, 0, 0, '2020-08-19 22:39:25', 1),
(4643, 161, 0, 1, 7, 'Assign each of the searches suggested below to one member of the assessment team. ', '', '', 0, 0, 0, 0, '2020-08-19 22:39:25', 1),
(4644, 161, 0, 1, 8, ' The IAC University Database allows you to search for common recommendations made by SIC or NAICS code ', '', '', 0, 0, 0, 0, '2020-08-19 22:39:25', 1),
(4645, 161, 0, 2, 24, '$empty', 'https://iac.university/searchRecommendations', 'IAC University: Search IAC Recommendations', 1, 0, 0, 0, '2020-08-19 22:39:25', 1),
(4646, 161, 0, 2, 1, 'The IAC University Database also allows you to search for the top 10 recommendations, the number of assessments and results by industry grouping. Note: one useful search field under assessments: \"Product Type\" can help find similar assessments.', '', '', 0, 0, 0, 0, '2020-08-19 22:39:25', 1),
(4647, 161, 0, 1, 8, 'Search the OSU IAC Project Management Database to see what we have recommended in the past at similar sites. Note: the search box in the upper right corner is a useful tool for this.', '', '', 0, 0, 0, 0, '2020-08-19 22:39:25', 1),
(4648, 161, 0, 2, 24, '$empty', 'https://eec.oregonstate.edu/tracking2/modules/login/login.php', 'EEC Project Management', 0, 0, 0, 0, '2020-08-19 22:39:25', 1),
(4649, 161, 0, 1, 8, 'General internet and literature research can surface new opportunities to consider.  BE SURE to add any newly identified resources to this site!', '', '', 0, 0, 0, 0, '2020-08-19 22:39:25', 1),
(4650, 161, 0, 2, 1, 'U.S.DOE, Vendor, Other IAC, State Energy Office, and Industrial Association web sites are all among good places to search for resources.', '', '', 0, 0, 0, 0, '2020-08-19 22:39:25', 1),
(4651, 161, 0, 1, 17, '(item not added yet)', 'abc.com', 'Example List of Common Opportunities', 0, 0, 0, 0, '2020-08-19 22:39:25', 1),
(4652, 183, 0, 0, 20, '', 'https://www.aquaculturealliance.org/advocate/cavitation-the-pump-disease/', 'Pump Impeller With Cavitation Marks', 0, 0, 0, 0, '2020-08-19 22:55:35', 0),
(4653, 183, 0, 0, 20, '', 'https://www.deppmann.com/blog/service-tip-of-the-month/pump-cavitation/', 'Example Pump Impellers With Cavitation Marks', 0, 0, 0, 0, '2020-08-19 22:55:35', 0),
(4654, 183, 0, 0, 20, '', 'https://www.dxpe.com/different-types-centrifugal-pumps-applications/', 'Centrifugal Pumps', 0, 0, 0, 0, '2020-08-19 22:55:35', 0),
(4706, 180, 0, 0, 3, 'One PSI = 2.31 Feet of water', '', '', 0, 0, 0, 0, '2020-08-20 00:48:42', 1),
(4707, 180, 0, 0, 3, 'When designing a pump system it is important to consider the pump\'s net positive suction head required (NPSHR). A general design criteria is that the net positive suction head available (NPSHA) exceeds the NPSHR by at least 25% over the expected range of operating flow rates.', '', '', 0, 0, 0, 0, '2020-08-20 00:48:42', 1),
(4708, 125, 0, 0, 20, '', 'https://www.pumpsandsystems.com/understanding-pump-curves', 'Sample Pump Curve', 0, 0, 0, 0, '2020-08-20 00:52:21', 0),
(4709, 125, 0, 0, 20, '', 'https://www.pumpsandsystems.com/understanding-pump-curves', 'Sample Pump and System Curve', 0, 0, 0, 0, '2020-08-20 00:52:21', 0),
(4710, 125, 0, 0, 20, '', 'https://fluidcontrolproducts.net/catolog/pumps/centrifugal-pumps/cpvc-price-pump-open-box/', 'Sample Pump Nameplate', 0, 0, 0, 0, '2020-08-20 00:52:21', 0),
(4711, 178, 0, 0, 7, 'Install pressure gauges on all pump outlets for a key indicator of system performance.', '', '', 0, 0, 0, 0, '2020-08-20 22:33:47', 1),
(4712, 178, 0, 0, 7, 'Install a pressure gage at the inlets of pumps not drawing from a local reservoir for a 2nd key indicator of system performance', '', '', 1, 0, 0, 0, '2020-08-20 22:33:47', 1),
(4713, 178, 0, 0, 7, 'Install flow meters on high operating cost pumps or banks of pumps for a 3rd key indicator of system performance', '', '', 1, 0, 0, 0, '2020-08-20 22:33:47', 1),
(4714, 178, 0, 1, 8, 'Consider needs of temporary ultrasonic flow meters for pump installations that will not include an in-line flow meter. ', '', '', 1, 0, 0, 0, '2020-08-20 22:33:47', 1),
(4715, 178, 0, 0, 7, 'Operate pumps between 85% and 110% of their best efficiency point (BEP)', '', '', 0, 0, 0, 0, '2020-08-20 22:33:47', 1),
(4716, 178, 0, 0, 7, 'Use VFD control if the pump operates at multiple flow conditions, particularly for looped flow circuits.', '', '', 0, 0, 0, 0, '2020-08-20 22:33:47', 1),
(4717, 178, 0, 1, 4, 'For high static head conditions (pumping to high pressure vessel or high elevation tank) take care in evaluating pump operation with VFD control.  Pumps can be forced into low efficiency, high wear conditions with inappropriate high static head VFD control.', '', '', 1, 0, 0, 0, '2020-08-20 22:33:47', 1),
(4718, 178, 0, 0, 17, 'Comprehensive list of pump selection, installation, and operation best practices.', 'http://www.flowserve.com/sites/default/files/2016-07/pss-10-13.5-e.pdf', 'Flowserve: Best Practices for ANSI Pumps', 1, 0, 0, 0, '2020-08-20 22:33:47', 1),
(4735, 82, 0, 0, 11, 'Replace Valve Control with Variable Speed Drive Control', '', '', 0, 0, 0, 0, '2020-08-20 22:38:49', 0),
(4736, 82, 0, 1, 13, 'Pumps are often designed to operate at specific conditions, installing a Variable Speed Drive can allow the pump to supply a wider range of flows while remaining near it\'s best efficiency point', '', '', 0, 0, 0, 0, '2020-08-20 22:38:49', 0),
(4737, 82, 0, 1, 10, 'Pumps throttled or supplying excess fluid to a process', '', '', 0, 0, 0, 0, '2020-08-20 22:38:49', 0),
(4738, 82, 0, 1, 8, 'Pumps operating over a range of flow conditions may be particularly suited for VFD control', '', '', 0, 0, 0, 0, '2020-08-20 22:38:49', 0),
(4739, 82, 0, 1, 14, 'Would a resized pump or impeller trim be more suitable for the application?', '', '', 0, 0, 0, 0, '2020-08-20 22:38:49', 0),
(4740, 82, 0, 1, 1, 'Allows efficient operation over wider range of flow conditions', '', '', 0, 0, 0, 0, '2020-08-20 22:38:49', 0),
(4741, 82, 0, 1, 2, 'VFDs are expensive - becoming more affordable in recent years', '', '', 0, 0, 0, 0, '2020-08-20 22:38:49', 0),
(4742, 82, 0, 1, 4, 'Networks with multiple pumps operating in parallel or series need to be carefully considered before recommending VFD control', '', '', 0, 0, 0, 0, '2020-08-20 22:38:49', 0),
(4743, 82, 0, 1, 4, 'For high static head conditions (pumping to high pressure vessel or high elevation tank) take care in evaluating pump operation with VFD control.  Pumps can be forced into low efficiency, high wear conditions with inappropriate high static head VFD control.', '', '', 1, 0, 0, 0, '2020-08-20 22:38:49', 0),
(4744, 82, 0, 1, 4, 'VFDs can harm the motor if they are not properly installed', '', '', 0, 0, 0, 0, '2020-08-20 22:38:49', 0),
(4745, 82, 0, 1, 7, 'Install grounding shaft to divert VFD induced voltages away from the motor', '', '', 0, 0, 0, 0, '2020-08-20 22:38:49', 0),
(4746, 82, 0, 1, 15, 'Pump nameplate/motor nameplate', '', '', 0, 0, 0, 0, '2020-08-20 22:38:49', 0),
(4747, 82, 0, 1, 15, 'Flow rates, pressure readings, live amperage data', '', '', 0, 0, 0, 0, '2020-08-20 22:38:49', 0),
(4748, 82, 0, 1, 17, 'An OSU EEC Analysis Template in Microsoft Excel Format', 'https://oregonstate.app.box.com/file/606303033065', 'Analysis Template: Install VFDs on Process Pumps', 2, 0, 0, 0, '2020-08-20 22:38:49', 0),
(4749, 82, 0, 0, 11, 'Eliminate Bypass Control', '', '', 0, 0, 0, 0, '2020-08-20 22:38:49', 0),
(4750, 82, 0, 0, 11, 'Replace On/Off Control with Continuous Flow Control ', '', '', 0, 0, 0, 0, '2020-08-20 22:38:49', 0),
(4760, 174, 0, 0, 26, 'A qualitative, visual strategy for designing a layout.', '', '', 0, 0, 0, 0, '2020-08-22 22:13:57', 0),
(4761, 174, 0, 0, 26, 'Begin with creating a matrix with every department listed as a header for columns and rows (see figure 1). This is known as a from/to diagram.', '', '', 0, 0, 0, 0, '2020-08-22 22:13:57', 0),
(4762, 174, 0, 0, 20, '', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPsAAADJCAMAAADSHrQyAAAAgVBMVEX///8AAABiYmLt7e2NjY3k5OTY2NidnZ24uLhNTU29vb339/fAwMA9PT2qqqodHR2Dg4NeXl44ODjd3d3n5+fu7u59fX309PSRkZGHh4fJycmkpKSxsbGlpaVTU1PU1NRzc3NFRUWXl5dqamoSEhIuLi4nJyczMzMYGBgcHBwTExNqJpk3AAARIElEQVR4nO2dC3eiOhCAJwIiDxEbBATkqXT3/v8feJMAgpB0bY1VS2fP2VMnMOaTJISZZAD4lfuIRWXwKRAdd7XydSTdoLruPpSoRjb/OHS18pWkAcAK+a9MAHwGjzUAjeoCbIEHGiCi0ZqjYIctBTxMTiUfsfe4qt8sjN0uXMJROuTPNcHGxsLTULrfBbrhwHZVWZsULbdZ4dOfQzfMNMmLCNAWIsN/YXjK7r1BVLXsBmFHOEJKCrYf6Xgb5UVAjkI51JAtAHQXb5GxoyoIqqWpP7b+twhjLyDKW/aCsvu57hF2N4jzU1TR5k3+7d4hI7/QofD3dasCqFT82PrfIox93bCT/h6pAdPZlH3v6OBG1fKCXXcAF1mjslaw3D6a4OtC2YPyoJMxrqycQ0jvcuUhjr3a0SOsH3SnJuyxQ9hr1jMyotswdtJO1ENsPprg6xLT/4KSDu9ZHOs7piRUWn2IAJalFzFdfAArAY8dVioRGfNIB9HBKl8YXSi4eHQNHidB9Oga/Mqv/Mqv/MqvfEWckKt2EUL85zJSwFN7RO9zT9BJCVrySk4CWxZCKdeUZHFKrtonN/W/CqcAAd9V4Rlk6s+F1xPRd9d8tUXs4294OFipDvfR018FVrqb6oUeGo/O/hKVU6LrwY73K5LrrnELvssLlDhmzPO27TdvNa+dbkSuuYad14ji49vbhvt8u35/4116wq5pnN9dsthbTfN5bZK2+ZpzUf77mJ', 'Figure 1 - From-to Matrix', 0, 0, 0, 0, '2020-08-22 22:13:57', 0),
(4763, 174, 0, 0, 26, 'Use this information to create a space-relation diagram. See figure 2.', '', '', 0, 0, 0, 0, '2020-08-22 22:13:57', 0),
(4764, 174, 0, 0, 20, '', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAATAAAACmCAMAAABqbSMrAAAAeFBMVEX////e3t7t7e309PRxcXH6+vrCwsKNjY11dXWTk5ODg4PT09OsrKy2trba2trp6elDQ0OioqLIyMiysrJqamoAAACJiYlLS0upqamcnJx+fn5dXV26urrOzs7Gxsbi4uIoKChhYWFSUlIeHh40NDRAQEA5OTkrKyuPAHKLAAAWMUlEQVR4nO2dDZuqqtfGEQRFBDfiMOKAnObsc57v/w0f1F6szLRpmvb5d18zZWZlv2Cx1uJFAL5B7rOa1Xv0HZ/6B4uo+ecNe8x5/DEi+fzz9AXsWC9gK/UCtlIvYCv1ArZSL2Ar9QK2Uj0w3G8KPPH8C9iJOmBo02/63T4/bEXd3QvYiTpgikeFzArDEh3uPTA5o0Ry2hW+F7ATdcAyToXNAC1ywokO+3xMbOLsq4RNKACTDmgbG5Q6k4d7CIg0ubFpm4AXsDMFYKIARW6VjbwvpFWhyBVAgAKFuxewM23dClyT4T4nx8+/gJ3o5Yet1AvYSr2ArdQL2Eq9gK3UC9hKvYCt1BgYlig8oghI5Ha9ay9gJ2pHwAzCIaIEusYaJNt9L2DHKt4P/ZKIAqBBBmSHy209/hewI7FsVMJgAJaABiTdjeDDzhewsTgF1ajnOwE4RgWNoBFAwmHfC9hIhqOYj2yYl/tNttv9XwaG/32b1+fx8Q3z8bFbgc+3/tPANlcOOAKGK0SS/20/DH9cOeB9tF1UWHasvheYj85VfOUN76o1wFwDsrLb+FZg4nde1zVNGxru82473P36whveVyuAWQrSwZf/VmCsPyNLch6MImKDa/c5+5JHajkwo2CFhk0iYTEjmHyphA1nJAigqanJ4Nr9gcAaFqW7feLvv8b6+++330c7/vqKydkDC9xdo0T/6I8DhuMi1MgLKnKJ7ndGW2ChaKncKji4eX8asCLGhl8+pn', 'Figure 2  - Space Relationship Diagram', 0, 0, 0, 0, '2020-08-22 22:13:57', 0),
(4765, 174, 0, 0, 26, 'Convert the space-relationship diagram into a facility layout.', '', '', 0, 0, 0, 0, '2020-08-22 22:13:57', 0),
(4766, 129, 0, 0, 11, 'Install a heat pipe to recovery process heat', '', '', 0, 0, 0, 0, '2020-08-24 16:58:32', 0),
(4767, 129, 0, 1, 13, 'Air-to-air heat transfer (typically for 150-850 ˚F processes)', '', '', 0, 0, 0, 0, '2020-08-24 16:58:32', 0),
(4768, 129, 0, 0, 11, 'Install a shell and tube heat exchanger to recover process heat (Matt)', '', '', 0, 0, 0, 0, '2020-08-24 16:58:32', 0),
(4769, 129, 0, 1, 13, 'Liquid-to-liquid heat transfer ', '', '', 0, 0, 0, 0, '2020-08-24 16:58:32', 0),
(4770, 129, 0, 0, 11, 'Install an economizer to pre-heat boiler make-up water (Matt)', '', '', 0, 0, 0, 0, '2020-08-24 16:58:32', 0),
(4771, 129, 0, 1, 13, 'Air-to-liquid heat transfer ', '', '', 0, 0, 0, 0, '2020-08-24 16:58:32', 0),
(4772, 129, 0, 0, 11, 'Install a Heat Exchanger Between Two Liquid Flows', '', '', 0, 0, 0, 0, '2020-08-24 16:58:32', 0),
(4773, 129, 0, 1, 10, 'Two fluid flows with a large temperature difference where at least one stream requires heat treatment.', '', '', 0, 0, 0, 0, '2020-08-24 16:58:32', 0),
(4774, 129, 0, 1, 13, 'Heat exchange between two fluids can be beneficial for both streams, such as hot milk coming out of pasteurization for cooling being used to preheat incoming milk. Less energy is required now to cool the pasteurized milk and the raw milk requires less heat to be added for pasteurization.', '', '', 0, 0, 0, 0, '2020-08-24 16:58:32', 0),
(4775, 129, 0, 1, 7, 'Heat exchangers are most effective when configured for counter-flow heat transfer', '', '', 0, 0, 0, 0, '2020-08-24 16:58:32', 0),
(4776, 129, 0, 1, 8, 'The higher the temperature difference between the fluid streams, the more heat can be exchanged', '', '', 0, 0, 0, 0, '2020-08-24 16:58:32', 0),
(4777, 129, 0, 1, 14, 'How much can the temperature of the two fluid streams change without negatively affecting the process the fluids are required for?', '', '', 0, 0, 0, 0, '2020-08-24 16:58:32', 0),
(4778, 129, 0, 1, 14, 'Can these streams be reasonably close together physically to fit into a heat exchanger?', '', '', 0, 0, 0, 0, '2020-08-24 16:58:32', 0),
(4779, 129, 0, 1, 14, 'Is there space in the room to accomodate a heat exchanger?', '', '', 0, 0, 0, 0, '2020-08-24 16:58:32', 0),
(4780, 129, 0, 1, 14, 'What kind of heat exchanger best fits the fluid stream? There are several different types.', '', '', 0, 0, 0, 0, '2020-08-24 16:58:32', 0),
(4781, 129, 0, 1, 14, 'Is the fluid stream clean or dirty?', '', '', 0, 0, 0, 0, '2020-08-24 16:58:32', 0),
(4782, 129, 0, 1, 15, 'System operation hours', '', '', 0, 0, 0, 0, '2020-08-24 16:58:32', 0),
(4783, 129, 0, 1, 15, 'Fluid properties', '', '', 0, 0, 0, 0, '2020-08-24 16:58:32', 0),
(4784, 129, 0, 1, 15, 'Density', '', '', 0, 0, 0, 0, '2020-08-24 16:58:32', 0),
(4785, 129, 0, 1, 15, 'Mass flowrate (volumetric is fine if the density is known)', '', '', 0, 0, 0, 0, '2020-08-24 16:58:32', 0),
(4786, 129, 0, 1, 15, 'Specific heat', '', '', 0, 0, 0, 0, '2020-08-24 16:58:32', 0),
(4787, 129, 0, 1, 15, 'Heating process efficiency', '', '', 0, 0, 0, 0, '2020-08-24 16:58:32', 0),
(4788, 129, 0, 1, 15, 'Available floor space', '', '', 0, 0, 0, 0, '2020-08-24 16:58:32', 0),
(4789, 129, 0, 1, 27, 'Contact thermometer (if safe)', '', '', 0, 0, 0, 0, '2020-08-24 16:58:32', 0),
(4790, 129, 0, 1, 27, 'IR thermometer', '', '', 0, 0, 0, 0, '2020-08-24 16:58:32', 0),
(4791, 129, 0, 1, 27, 'Ultrasonic flow meter if fluid flowrate is unknown and the temperatures are safe for the equipment', '', '', 0, 0, 0, 0, '2020-08-24 16:58:32', 0),
(4792, 129, 0, 1, 4, 'Pressure drop across the heat exchanger could cause a loss of performance in downstream processes', '', '', 0, 0, 0, 0, '2020-08-24 16:58:32', 0),
(4793, 129, 0, 1, 4, 'Heat exchangers can foul over time without proper maintenance and cleaning, reducing their effectiveness', '', '', 0, 0, 0, 0, '2020-08-24 16:58:32', 0),
(4794, 129, 0, 1, 4, 'Heat exchangers can become hot and should not be placed where someone may come into contact with it inadvertently', '', '', 0, 0, 0, 0, '2020-08-24 16:58:32', 0),
(4795, 129, 0, 1, 20, '', 'https://drive.google.com/file/d/1CdPMeAFZMbadgXb9opm3qJR72S7zPYwG/view?usp=sharing', 'A spiral heat exchanger is installed for heat transfer between hot sludge coming from anaerobic digestion and cool sludge coming from aerobic digestion. At this facility sludge was being heated going into the anaerobic digestor and then cooled when leaving to enter the aerobic digestor.', 0, 0, 0, 0, '2020-08-24 16:58:32', 0),
(4796, 129, 0, 1, 20, '', 'https://drive.google.com/file/d/1twM-Rb5cEp3NGoQwPh8Hlh9LvlMvP1Id/view?usp=sharing', 'Raw milk and pasteurized milk in this process pass through a plate heat exchanger. In the pasteurization process, raw milk is heated to kill bacteria, but must be cooled afterwards. To reduce both the heating and cooling loads, the pasteurized milk preheats the raw milk while also cooling itself.', 0, 0, 0, 0, '2020-08-24 16:58:32', 0),
(4797, 129, 0, 1, 17, 'Thermodynamic properties of water/steam from the Heat Exchanger Design Handbook by C. F. Beaton, published in 1986. This is useful for finding the enthalpy of water/steam for calculating heat transfer.', 'http://thermopedia.com/content/1150/', 'Water/Steam Property Tables', 1, 0, 0, 0, '2020-08-24 16:58:32', 0),
(4798, 129, 0, 1, 24, 'Lists the specific heats of common fluids. This is used for calculating the amount of heat that can be exchanged between the two fluid streams.', 'https://www.engineeringtoolbox.com/specific-heat-fluids-d_151.html', 'Common Fluid Specific Heats', 1, 0, 0, 0, '2020-08-24 16:58:32', 0),
(4799, 129, 0, 1, 24, 'List of densities for common fluids. This is useful if the fluid\'s volumetric flowrate is known, but not the mass flowrate.', 'https://www.engineeringtoolbox.com/liquids-densities-d_743.html', 'Common Fluid Densities', 1, 0, 0, 0, '2020-08-24 16:58:32', 0),
(4800, 129, 0, 1, 24, 'Estimated heat exchanger heat transfer coefficients for use in calculating the amount of heat transferred between the two fluid streams.', 'https://www.engineeringtoolbox.com/heat-transfer-coefficients-exchangers-d_450.html', 'Heat Exchanger Heat Transfer Coefficients', 1, 0, 0, 0, '2020-08-24 16:58:32', 0),
(4801, 129, 0, 1, 17, 'Describes heat exchanger design for sludge in wastewater treatment facilities. This paper also contains the relevant thermodynamic properties of sludge. Understand that the characteristics of wastewater sludge is not consistent between facilities.', 'https://www.witpress.com/elibrary/wit-transactions-on-modelling-and-simulation/46/18010', 'Importance of experimental measurements and simulations for ‘sludge-to-energy’ systems', 1, 0, 0, 0, '2020-08-24 16:58:32', 0),
(4802, 129, 0, 0, 11, 'Pre-heat combustion air (Adam)', '', '', 0, 0, 0, 0, '2020-08-24 16:58:32', 0),
(4803, 129, 0, 1, 10, 'Look to see if a high temperature oven/furnace is currently recycling hot air from stack.', '', '', 0, 0, 0, 0, '2020-08-24 16:58:32', 0),
(4804, 129, 0, 1, 13, 'Two different heat exchangers can be used for this opportunity, recuperators and regenerators. ', '', '', 0, 0, 0, 0, '2020-08-24 16:58:32', 0),
(4805, 129, 0, 2, 13, 'Recuperators work like a standard air-to-air heat exchanger. There is a hot flow and a cold flow in which energy is transferred between with the use of internal tubes or plates. The two streams are kept in separate ducts to keep the gasses from mixing. ', '', '', 0, 0, 0, 0, '2020-08-24 16:58:32', 0),
(4806, 129, 0, 2, 1, 'PROS HERE UNFINISHED', '', '', 0, 0, 0, 0, '2020-08-24 16:58:32', 0),
(4807, 129, 0, 2, 2, 'CONS HERE UNFINISHED', '', '', 0, 0, 0, 0, '2020-08-24 16:58:32', 0),
(4808, 129, 0, 2, 20, '', 'https://cdn4.explainthatstuff.com/how-heat-exchangers-work.png', 'Recuperator Schematic', 0, 0, 0, 0, '2020-08-24 16:58:32', 0),
(4809, 129, 0, 2, 13, 'Regenerators act as heating vessels for both the combustion air and flue gases. Regenerators alternate between heating the storage medium and then taking heat from it. Usually at least two regenerators and burners are needed so that the process is uninterrupted.', '', '', 0, 0, 0, 0, '2020-08-24 16:58:32', 0),
(4810, 129, 0, 2, 1, 'PROS HERE UNFINISHED', '', '', 0, 0, 0, 0, '2020-08-24 16:58:32', 0),
(4811, 129, 0, 2, 2, 'CONS HERE UNFINISHED', '', '', 0, 0, 0, 0, '2020-08-24 16:58:32', 0),
(4812, 129, 0, 2, 20, '', 'https://image.slidesharecdn.com/heatexchangertypesandapplication-171015153006/95/heat-exchanger-types-and-application-13-638.jpg?cb=1508081873', 'Regenerator Schematic', 0, 0, 0, 0, '2020-08-24 16:58:32', 0),
(4813, 129, 0, 1, 4, 'Take care not to lower exhaust stack temperature too low as it can cause corrosion. This happens because the surface temperature of the stack is lower than the dew point of the flue gas flowing through the stack, causing moisture to accumulate.', '', '', 0, 0, 0, 0, '2020-08-24 16:58:32', 0),
(4814, 129, 0, 1, 8, 'Some flue gasses are corrosive and can damage installed heat exchanges. When performing an analysis, research which heat exchangers are best designed for the process in question. ', '', '', 0, 0, 0, 0, '2020-08-24 16:58:32', 0),
(4815, 129, 0, 1, 15, 'Flue gas temperature', '', '', 0, 0, 0, 0, '2020-08-24 16:58:32', 0),
(4816, 129, 0, 1, 15, 'Inlet air temperature', '', '', 0, 0, 0, 0, '2020-08-24 16:58:32', 0),
(4817, 129, 0, 1, 15, 'Fuel feed rate', '', '', 0, 0, 0, 0, '2020-08-24 16:58:32', 0),
(4818, 129, 0, 1, 15, 'Excess oxygen', '', '', 0, 0, 0, 0, '2020-08-24 16:58:32', 0),
(4819, 129, 0, 1, 15, 'Operation hours', '', '', 0, 0, 0, 0, '2020-08-24 16:58:32', 0),
(4820, 129, 0, 1, 27, 'Combustion analyzer', '', '', 0, 0, 0, 0, '2020-08-24 16:58:32', 0),
(4821, 129, 0, 1, 17, '$empty', 'https://www.energy.gov/sites/prod/files/2014/05/f16/et_preheated.pdf', 'D.O.E. Tip Sheet', 1, 0, 0, 0, '2020-08-24 16:58:32', 0),
(4822, 184, 0, 0, 26, 'First, calculate the D-scores for the original layout (D0) and the proposed layout (D1).', '', '', 0, 0, 0, 0, '2020-08-24 19:51:09', 0),
(4823, 184, 0, 0, 26, 'Calculate layout efficiency savings by finding the percent difference in d-scores (i.e. D0 - D1 / D1).', '', '', 0, 0, 0, 0, '2020-08-24 19:51:09', 0),
(4824, 184, 0, 0, 26, 'Layout efficiency savings are an important measure in itself and will result in increased productivity, however, translating this figure into monetary cost savings is necessary.', '', '', 0, 0, 0, 0, '2020-08-24 19:51:09', 0),
(4842, 189, 0, 0, 17, 'This guide provides information on the fundamentals of power factor, how to improve power factor, example savings calculations for mulitple scenarios, and how to select the right capactior specific applications. Information on harmonics is also included.', 'https://www.eaton.com/ecm/groups/public/%40pub/%40electrical/documents/content/sa02607001e.pdf', 'Eaton - Power Factor Correction: A Guide for the Plant Engineer', 1, 0, 0, 0, '2020-10-13 20:21:27', 1),
(4843, 189, 0, 0, 17, 'This manual provides technical information for assessing many systems that are commonly found in small to medium sized industrial manufacturing facilities. Chapter 4 section 4.1.4 specifically addresses power factor improvement.', 'https://iac.university/technicalDocs/industr/ch4.pdf', 'Essentials of Industrial Assessments, Chapter 4, Electricity', 1, 0, 0, 0, '2020-10-13 20:21:28', 1),
(4844, 189, 0, 0, 23, 'This video produced by the The Engineering Mindset on YouTube explains what power factor is, how to calculate power factor, what poor power factor is, and how resistors and capacitors affect power factor.', 'https://www.youtube.com/watch?v=Tv_7XWf96gg', 'Power Factor Explained', 1, 0, 0, 0, '2020-10-13 20:21:29', 1),
(4956, 196, 0, 0, 26, 'The Federal Communications Commission released ten tips for small business cyber security after meeting with public and private leaders.', '', '', 0, 0, 0, 0, '2020-08-27 00:40:27', 0),
(4957, 196, 0, 1, 24, ' ', 'https://www.fcc.gov/general/cybersecurity-small-business', 'Cybersecurity for Small Business', 1, 0, 0, 0, '2020-08-27 00:40:27', 0),
(4958, 196, 0, 0, 26, 'The Cybersecurity and Infrastructure Security Agency (CISA, a part of the US Department of Homeland Security) also has resources focused on increasing the security of industrial control systems.', '', '', 1, 0, 0, 0, '2020-08-27 00:40:27', 0),
(4959, 196, 0, 1, 24, ' ', 'https://us-cert.cisa.gov/ics', 'Industrial Control Systems', 1, 0, 0, 0, '2020-08-27 00:40:27', 0),
(4960, 197, 0, 0, 26, 'Researchers from the University of Illinois Urbana-Champaign have developed a tool for manufacturers to simplify the understanding of cybersecurity standards created by the National Institute of Standards and Technology. This tool also follows DFARS, the Department of Defense’s acquisition regulations.', '', '', 0, 0, 0, 0, '2020-08-27 00:40:33', 0),
(4961, 197, 0, 1, 21, ' ', 'https://iti.illinois.edu/news/new-software-tool-help-manufacturing-companies-meet-complex-cyber-security-standards ', 'The Dashboard', 1, 0, 0, 0, '2020-08-27 00:40:33', 0),
(4962, 195, 0, 0, 26, 'The Cybersecurity and Infrastructure Security Agency (CISA, a part of the US Department of Homeland Security) has created the Cyber Security Evaluation Tool (CSET). This tool is a provides a comprehensive self-assessment and recommendations to fix potential vulnerabilities. The CSET focuses on industrial control systems and information technology network security.', '', '', 0, 0, 0, 0, '2020-08-27 00:40:46', 0),
(4963, 195, 0, 1, 21, ' ', 'https://us-cert.cisa.gov/ics/Assessments', 'Cyber Security Evaluation Tool (CSET)', 1, 0, 0, 0, '2020-08-27 00:40:46', 0),
(4964, 195, 0, 0, 26, 'CISA also offers the Cyber Resilience Review which is a free non-technical cybersecurity self-assessment. This process can also be completed with professionals from the Department of Homeland Security.', '', '', 1, 0, 0, 0, '2020-08-27 00:40:46', 0),
(4965, 195, 0, 1, 21, ' ', 'https://us-cert.cisa.gov/resources/assessments ', 'Cyber Resilience Review ', 1, 0, 0, 0, '2020-08-27 00:40:46', 0),
(4966, 194, 0, 0, 26, 'The IAC Industrial Control Systems Cybersecurity Assessment Tool is a 20-question survey that can provide a starting place for a cybersecurity program. This tool is located on the Industrial Assessment Center’s cybersecurity webpage, as well as several other cybersecurity resources.', '', '', 0, 0, 0, 0, '2020-08-27 00:41:15', 0),
(4967, 194, 0, 1, 21, ' ', 'https://iac.university/cybersecurity', 'Industrial Control Systems Cybersecurity Assessment Tool', 1, 0, 0, 0, '2020-08-27 00:41:15', 0),
(4968, 194, 0, 0, 26, 'The US Department of Energy released the Cybersecurity Capability Maturity Model (C2M2) to evaluate an organization’s cybersecurity capabilities regardless of their structure, size, or organization type. This includes a self-evaluation and proposed model.', '', '', 1, 0, 0, 0, '2020-08-27 00:41:15', 0),
(4969, 194, 0, 1, 21, ' ', 'https://www.energy.gov/ceser/activities/cybersecurity-critical-energy-infrastructure/energy-sector-cybersecurity-0-0 ', 'Cybersecurity Capability Maturity Model (C2M2)', 1, 0, 0, 0, '2020-08-27 00:41:15', 0),
(4971, 185, 0, 0, 26, 'Cost savings from improved layouts are the result of reduced material handling costs. Material handling costs typically refer to time and energy spent using manual labor, vehicles (e.g. forklifts), or conveyors to move product or inventory around the facility. ', '', '', 0, 0, 0, 0, '2020-08-29 20:20:27', 0),
(4972, 185, 0, 0, 26, 'For rough estimates of cost savings, calculating the cost of work flow of the original layout and multiplying it by the layout efficiency savings will suffice. For example, if it costs $1,000/day to move materials, and the layout efficiency savings are 10%, then savings are $100/day. ', '', '', 0, 0, 0, 0, '2020-08-29 20:20:27', 0),
(4973, 185, 0, 0, 26, 'Calculating daily material handling costs are most easily estimated using hourly operating costs of material handling systems and how long the specific system operates a day.', '', '', 0, 0, 0, 0, '2020-08-29 20:20:27', 0),
(4974, 185, 0, 0, 26, 'For more precise estimates, reduction in work flow for each work unit (e.g. inventory, personnel, etc.) needs to be determined. ', '', '', 0, 0, 0, 0, '2020-08-29 20:20:27', 0),
(4975, 168, 0, 0, 1, 'Can result in significant savings and increased productivity', '', '', 0, 0, 0, 0, '2020-08-29 21:06:18', 0),
(4976, 168, 0, 0, 1, 'Easy to estimate cost savings/benefits given sufficient, accurate data..', '', '', 0, 0, 0, 0, '2020-08-29 21:06:18', 0),
(4977, 168, 0, 0, 1, 'Opportunity and cost saving methodology is applicable to how inventory is stored and located.', '', '', 0, 0, 0, 0, '2020-08-29 21:06:18', 0),
(4978, 166, 0, 0, 10, 'Significant levels of work in progress (WIP) inventory immediately upstream of a workstation.', '', '', 0, 0, 0, 0, '2020-09-02 21:55:04', 0),
(4979, 166, 0, 0, 10, 'Machine or workstation with prolonged down times.', '', '', 0, 0, 0, 0, '2020-09-02 21:55:04', 0),
(4982, 199, 0, 0, 1, 'Alleviating bottlenecks is often the most valuable productivity opportunity. ', '', '', 0, 0, 0, 0, '2020-09-02 22:07:11', 0),
(4983, 199, 0, 0, 1, 'Basic analysis and cost savings estimation requires few variable values.', '', '', 0, 0, 0, 0, '2020-09-02 22:07:11', 0),
(4984, 200, 0, 0, 2, 'Precise analysis requires a deep understanding of how the entire production line operates. Statistics based simulation is often the only way to achieve this.', '', '', 0, 0, 0, 0, '2020-09-02 22:11:35', 0),
(4985, 200, 0, 0, 2, 'Unless time studies on how product flows into and out of the workstation are conducted, several assumptions are required even for basic analysis.', '', '', 0, 0, 0, 0, '2020-09-02 22:11:35', 0),
(4995, 156, 0, 0, 13, 'This meeting is analogous to the what the OSU IAC has traditionally called the \"Pre-Audit Walkthrough Phone Call\" (excluding site visit logistics, safety and PPE discussion)', '', '', 0, 0, 0, 0, '2020-09-03 20:03:28', 1),
(4996, 156, 0, 0, 26, 'Have the client(s) verbally  \"walk us through\" their process, highlighting key energy intensive processes', '', '', 0, 0, 0, 0, '2020-09-03 20:03:28', 1),
(4997, 156, 0, 1, 14, 'Ask client(s) to let us know of any areas of concern or interest', '', '', 0, 0, 0, 0, '2020-09-03 20:03:28', 1),
(4998, 156, 0, 1, 14, 'Ask for rated capacity, estimated % of full capacity, and hours of operation for significant equipment discussed.', '', '', 0, 0, 0, 0, '2020-09-03 20:03:28', 1);
INSERT INTO `Items` (`itemId`, `cardId`, `orderIndex`, `indentation`, `iconType`, `contentText`, `contentUrl`, `contentLabel`, `contentMode`, `internal`, `inline`, `sourceId`, `created`, `approved`) VALUES
(4999, 156, 0, 2, 8, 'Estimates of the number of smaller motor of various sizes with average load and hours can also be helpful.', '', '', 0, 0, 0, 0, '2020-09-03 20:03:28', 1),
(5000, 156, 0, 1, 14, 'Are common utilities such as compressed air, lighting, heating, etc covered in the conversation?', '', '', 0, 0, 0, 0, '2020-09-03 20:03:28', 1),
(5001, 156, 0, 0, 26, 'Discuss proposed process for remote assessment going forward (we are still learning and developing this process)', '', '', 0, 0, 0, 0, '2020-09-03 20:03:28', 1),
(5002, 156, 0, 0, 8, 'Try to get more than one key contact at the site involved in the project. (Plant manager, Fiscal Decision Maker, Maintenance Manager, Floor Personnel, Energy Lead, etc)', '', '', 0, 0, 0, 0, '2020-09-03 20:03:28', 1),
(5003, 156, 0, 0, 17, '(Item not added yet)', 'abc.com', 'Pre-Audit Walkthrough Phone Call Checklist', 0, 0, 0, 0, '2020-09-03 20:03:28', 1),
(5004, 156, 0, 0, 14, 'How best could we get Utility & Incentive Representatives involved (if the client permits) ', '', '', 0, 0, 0, 0, '2020-09-03 20:03:28', 1),
(5005, 201, 0, 0, 26, 'In its simplest form, a workstation with one machine and one queue can be represented as a markov chain in a \"birth-death\" process. ', '', '', 0, 0, 0, 0, '2020-09-03 21:21:21', 0),
(5006, 201, 0, 0, 26, 'A markov chain is a set of states where the probability or rate at which a state is active is not dependent on its history/prior states.', '', '', 0, 0, 0, 0, '2020-09-03 21:21:21', 0),
(5007, 201, 0, 0, 26, 'In a birth-death process of a simple process (one workstation and queue), the birth rate is the rate at which product enters the system (inter-arrival times) while the death rate is the rate at which product leaves the system (effective processing times).', '', '', 0, 0, 0, 0, '2020-09-03 21:21:21', 0),
(5008, 201, 0, 0, 20, '', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAeUAAABoCAMAAAD4txjiAAAAjVBMVEX///8AAAD39/doaGj6+vrw8PDU1NRfX1/s7Ozz8/Po6Oj29vby8vLg4ODr6+vOzs5ISEiHh4fa2tpvb2++vr7IyMimpqZ8fHx5eXnQ0NBxcXG3t7dqamrCwsKRkZGxsbFWVlZQUFCfn5+Tk5OioqIzMzNBQUEjIyMbGxtDQ0MLCws5OTkYGBgrKys0NDRN/y7SAAAVlklEQVR4nO1deX+rqNd3QTEmxOACxl3M0i3z/l/eg0nbm0SCuKTTeX73+8f9TKf2iBzOfgBN+4u/+Iu/+Iv/91gb89GylvPR+hEsZhnwcjEHlacClvPRwsV8tH4EBM9BJUpmlJTnoDDnE8DwH2s2Wj+CUJ+Div/x6z97pdvzEdNnVAw/gnk0GZ5FJTwT3oycsXQMZiP2E0B7cwYq6+o0A5WnwjxtZqPVHA9oNmI/gfKwn0GTbfcv0XQqz8TqENW+xkw8g2kx6jxOuTMyh3z8CKzKrhoNu+cfAB3LqizFgVb4841rdjSVhk031sp8Oq30TUtP2jaB00n9DPz3dX6wMMr5EgflfiSXjZONjqjxvV+rxxY10aJ9SrR8OpcBjbm7iZb2f0aWaaGtjwhj3EZC1lhZJvx7TzkrqDvr4GaEV/F/gpizejqX3Yov5qLR0H9Glmv+0eUufo+WGR8zHsllPntaVODDb48vjNhuvNmo+dVspH4E2INnKRxtl88otvEvd8E0lObzpW+McCqF7RzDUIat2WdHO5rkgNoAzcbl7XouSr8Z+gd1f39u+Hlo9E1o/bcyD4NguP428nSOemeD+9+dsd5y+O7q3xngs7FGthfF/Ps/aDjJZ3ftlDBKM/MLWYwppayMBpFd2yHZURx8kzETToUWJBoTOfoRaWhiwsrMaKCf8RbfOK2A1dUZMMsyWFVZgtm4d9lRSTB/2Z8JaA', 'Birth Death Markov Chain', 0, 0, 0, 0, '2020-09-03 21:21:21', 0),
(5014, 9, 0, 0, 1, 'Versatile. Offers compact energy density. ', '', '', 0, 0, 0, 0, '2020-09-03 23:15:49', 0),
(5015, 9, 0, 0, 1, 'Spark free for potentially explosive environments', '', '', 0, 0, 0, 0, '2020-09-03 23:15:49', 0),
(5016, 9, 0, 0, 1, 'Can be used as an easy quick fix for many issues', '', '', 0, 0, 0, 0, '2020-09-03 23:15:49', 0),
(5017, 9, 0, 0, 1, 'Familiar utility for industrial personnel', '', '', 0, 0, 0, 0, '2020-09-03 23:15:49', 0),
(5018, 9, 0, 0, 1, 'A single mechanical energy input at the compressor can be distributed throughout a facility. ', '', '', 0, 0, 0, 0, '2020-09-03 23:15:49', 0),
(5111, 202, 0, 0, 13, 'The History Report tool displays all content added or edited during a selected date range.', '', '', 0, 0, 0, 0, '2020-09-04 20:46:22', 0),
(5112, 202, 0, 1, 26, 'A header on each entry shows the type of material (page, header, or card) added, edited or deleted, the name and location of the material, and the date/time of the update.', '', '', 0, 0, 0, 0, '2020-09-04 20:46:22', 0),
(5113, 202, 0, 1, 8, 'Select \"Show Duplicates\" to view a complete history of all edits made to all pages, headers, and cards. Red highlighted content consists of old edits while green highlighted content is the most recent edit made during the selected date range. Yellow highlighted content is material that was only added or updated once. Unhighlighted content predates the selected date range. ', '', '', 0, 0, 0, 0, '2020-09-04 20:46:22', 0),
(5114, 202, 0, 1, 8, 'Unselect \"Show Duplicates\" to display only the most recent edit made to a page, header, or card.', '', '', 0, 0, 0, 0, '2020-09-04 20:46:22', 0),
(5115, 202, 0, 1, 8, 'Select \"Show Removals\" to view deleted content. ', '', '', 0, 0, 0, 0, '2020-09-04 20:46:22', 0),
(5156, 207, 0, 0, 26, 'From the main sidebar menu, go to the Publish Requests page.', '', '', 0, 0, 0, 0, '2020-09-08 17:53:50', 0),
(5157, 207, 0, 0, 26, 'Find the publish request you wish to review from the list of live requests and click on the green Review Request button. ', '', '', 0, 0, 0, 0, '2020-09-08 17:53:50', 0),
(5158, 207, 0, 0, 26, 'A page will open where users can view the currently published content as well as the content to be approved. Users can also add comments, suggest changes, and give approval. Similar to a chatroom format, these entries appear in chronological order which allows for an ongoing dialogue between the author and reviewers. ', '', '', 0, 0, 0, 0, '2020-09-08 17:53:50', 0),
(5159, 207, 0, 0, 8, 'Click \"Close Request\" to delete a publish request. ', '', '', 0, 0, 0, 0, '2020-09-08 17:53:50', 0),
(5160, 203, 0, 0, 13, 'New and updated content must be approved before being published to the site. Multiple items can be submitted for approval in a single publish request. ', '', '', 0, 0, 0, 0, '2020-09-08 18:03:24', 0),
(5161, 203, 0, 1, 26, 'To add a page, header or card to a publish request, go to the content in Edit Mode and click the green review button.', '', '', 0, 0, 0, 0, '2020-09-08 18:03:24', 0),
(5162, 203, 0, 1, 26, 'After all items have been added, go to the Publish Requests page and select Create a Publish Request. Add a title and include the author\'s and reviewer\'s name as well as any additional notes in the description. ', '', '', 0, 0, 0, 0, '2020-09-08 18:03:24', 0),
(5163, 203, 0, 1, 26, 'Double-check that the Content to Publish includes the intended material then submit the publish request. ', '', '', 0, 0, 0, 0, '2020-09-08 18:03:24', 0),
(5164, 203, 0, 1, 8, 'Be reasonable and strategic with what material is lumped together in a single publish request. Submitting two unrelated technology pages together for example will probably just bog down the review process. ', '', '', 0, 0, 0, 0, '2020-09-08 18:03:24', 0),
(5181, 208, 0, 0, 13, 'It is always important to cite where information is coming from. A library of sources exists on each page that referenced within content-carrying cards. ', '', '', 0, 0, 0, 0, '2020-09-08 18:57:38', 0),
(5182, 208, 0, 1, 26, 'To add a reference, click \"Add Source\" in the header of any page in Edit Mode. ', '', '', 0, 0, 0, 0, '2020-09-08 18:57:38', 0),
(5183, 208, 0, 1, 26, 'Use IEEE formatting for all references and include a URL if applicable. ', '', '', 0, 0, 0, 0, '2020-09-08 18:57:38', 0),
(5184, 208, 0, 1, 26, 'To connect a source to an item, click \"Edit Card\" and use the source dropdown menu to the right of the item to select the source. ', '', '', 0, 0, 0, 0, '2020-09-08 18:57:38', 0),
(5185, 208, 0, 1, 17, '$empty', 'https://oregonstate.box.com/s/rm1jtvnmfhb2oyt1wyvzaztgc3w1ww5q', 'IEEE Reference Guide', 0, 0, 0, 0, '2020-09-08 18:57:38', 0),
(5188, 204, 0, 0, 13, 'To create a new page, first open the sidebar menu and select \"Show Edit Buttons\" near the bottom of the menu. Simply select the category for the new page and click \"Create a Page\". ', '', '', 0, 0, 0, 0, '2020-09-08 21:47:25', 0),
(5189, 204, 0, 1, 26, 'A page consists of a concise yet descriptive title, a summary of the page\'s purpose, and a description of what can be found on the page and how it can be used. ', '', '', 0, 0, 0, 0, '2020-09-08 21:47:25', 0),
(5190, 204, 0, 1, 26, 'Within a page editors can create headers and cards. Headers allow for content-carrying cards to be organized into sections and categories.', '', '', 0, 0, 0, 0, '2020-09-08 21:47:25', 0),
(5191, 205, 0, 0, 8, 'When adding a new page, header, or card, select \"Internal (not viewable by the public)\" for material intended to be used by EEC personnel only (such as this instructions page). ', '', '', 0, 0, 0, 0, '2020-09-08 21:48:22', 0),
(5192, 205, 0, 0, 8, 'Use the toggle in the top right corner of any page header to switch between View Mode, Edit Mode, and Move Mode. The mode shown on the toggle is the mode the page is currently in. ', '', '', 0, 0, 0, 0, '2020-09-08 21:48:22', 0),
(5287, 187, 0, 0, 2, 'Capacitors can amplify harmonics if nonlinear loads are present. Examples of nonlinear loads include variable frequency drives, induction furnaces, arc welders and arc furnaces.', '', '', 0, 0, 0, 4, '2020-09-09 17:57:39', 1),
(5303, 186, 0, 0, 1, 'Improving power factor extends equipment life by reducing the total line current which reduces operating temperatures.', '', '', 0, 0, 0, 0, '2020-09-09 18:12:30', 1),
(5304, 186, 0, 0, 1, 'Improving power factor can significantly reduce monthly electrical utility charges.', '', '', 0, 0, 0, 0, '2020-09-09 18:12:30', 1),
(5305, 186, 0, 0, 1, 'Capacitors have no moving parts and require little to no maintenance. It is recommended to check fuses on a regular basis. All capacitors should be checked annually to ensure proper operation.', '', '', 0, 0, 0, 5, '2020-09-09 18:12:30', 1),
(5505, 206, 0, 0, 13, 'When creating pages or cards there are two methods for adding images:', '', '', 0, 0, 0, 0, '2020-09-09 22:17:03', 0),
(5506, 206, 0, 1, 26, 'You may enter an image URL. This is a web address that points to a specific image (ex: https://placekitten.com/300/200).', '', '', 0, 0, 0, 0, '2020-09-09 22:17:03', 0),
(5507, 206, 0, 2, 4, 'Always include \"https\" at the start of your image address and never \"http\". This ensures that the image is being sent over a secure network. A published page with HTTP images will display as \"Not Secure\" in most browsers, which will make users less confident when using our application.', '', '', 0, 0, 0, 0, '2020-09-09 22:17:03', 0),
(5508, 206, 0, 1, 26, 'You may upload an image. Valid images have the file format JPG, PNG, or GIF. Images are not allowed to be larger than six megabytes. ', '', '', 0, 0, 0, 0, '2020-09-09 22:17:03', 0),
(5509, 206, 0, 2, 12, 'Only upload images that you have intellectual property rights to use. This means that you should not use images that you did not create unless you have gotten express permission to use them from the creator.', '', '', 0, 0, 0, 0, '2020-09-09 22:17:03', 0),
(5510, 206, 0, 2, 7, 'If you want to use an image in multiple locations. Upload the image by submitting some content, then edit the content and you will see that the image has a URL that you can copy. You can reuse this URL anywhere on the website, this is the preferred method as it saves space on the server by only uploading the image once.', '', '', 0, 0, 0, 0, '2020-09-09 22:17:03', 0),
(5788, 222, 0, 0, 17, 'This report details the vehicle assembly process and common energy saving opportunities associated with each step. References to case studies, implementation costs and payback periods are included. Opportunities are included for the following systems: motors, compressed air, steam, lighting, HVAC, materials handling, painting and stamping.', 'https://www.osti.gov/biblio/927881', 'Energy Efficiency Improvement and Cost Saving Opportunities for the Vehicle Assembly Industry', 1, 0, 0, 0, '2020-09-15 19:40:23', 0),
(5812, 215, 0, 0, 13, 'The following opportunities are specific to metals manufacturing facilities. For more opportunities related to compressed air, go to the Compressed Air Technologies page. ', '', '', 0, 0, 0, 0, '2020-09-15 20:53:32', 0),
(5813, 215, 0, 0, 11, 'Replace the pistons on stamping die cushions with air actuators', '', '', 0, 0, 0, 0, '2020-09-15 20:53:32', 0),
(5814, 215, 0, 1, 13, 'Die cushions on large stamping presses are used to support inserts in the lower die.', '', '', 0, 0, 0, 13, '2020-09-15 20:53:32', 0),
(5815, 215, 0, 1, 26, 'Die cushions can produce significant air leaks, up to 100 CFM in some cases, after moderate use. Air actuators are more resilient and can operate without air leaks for over five years.', '', '', 0, 0, 0, 13, '2020-09-15 20:53:32', 0),
(5817, 111, 0, 0, 20, '', '/uploads/user_51/d0d105c1ba1fe16e613f69173867b797.jpg', 'A graphic', 0, 0, 0, 0, '2020-09-15 21:00:14', 0),
(5830, 224, 0, 0, 26, 'Generally, different classes of rate schedules are assigned to consumers based on the application of and type of electricity demanded.', '', '', 0, 0, 0, 0, '2020-09-17 19:57:57', 0),
(5831, 224, 0, 1, 26, 'An industrial, three-phase rate schedule is commonly assigned to industry consumers.', '', '', 0, 0, 0, 0, '2020-09-17 19:57:57', 0),
(5832, 224, 0, 0, 26, 'The specific details and charges of a rate schedule often varies depending on the electric company.  ', '', '', 0, 0, 0, 0, '2020-09-17 19:57:57', 0),
(5833, 224, 0, 1, 26, 'Consult the rate schedule provided by your electric company for your rates and charges.', '', '', 0, 0, 0, 0, '2020-09-17 19:57:57', 0),
(5834, 225, 0, 0, 26, 'Base Charge', '', '', 0, 0, 0, 0, '2020-09-17 19:59:38', 0),
(5835, 225, 0, 0, 26, 'Metered Demand', '', '', 0, 0, 0, 0, '2020-09-17 19:59:38', 0),
(5836, 225, 0, 0, 26, 'Reactive Power', '', '', 0, 0, 0, 0, '2020-09-17 19:59:38', 0),
(5837, 225, 0, 0, 26, 'City Tax', '', '', 0, 0, 0, 0, '2020-09-17 19:59:38', 0),
(5838, 225, 0, 0, 26, 'Public Purpose Charge', '', '', 0, 0, 0, 0, '2020-09-17 19:59:38', 0),
(5908, 95, 0, 0, 15, 'Boiler Nameplate Data: Rated Capacity', '', '', 0, 0, 0, 0, '2020-09-21 16:41:42', 0),
(5909, 95, 0, 0, 15, 'Combustion Analysis: Excess O2, Stack Temperature, Inlet / Ambient Temperature ', '', '', 0, 0, 0, 0, '2020-09-21 16:41:42', 0),
(5910, 95, 0, 0, 15, 'Capacity over time', '', '', 0, 0, 0, 0, '2020-09-21 16:41:42', 0),
(5911, 95, 0, 1, 15, 'Hourly steam production', '', '', 0, 0, 0, 0, '2020-09-21 16:41:42', 0),
(5957, 100, 0, 0, 24, 'See steam tip sheets', 'https://www.energy.gov/eere/amo/tip-sheets-system', 'U.S.DOE Energy Tip Sheets by System', 1, 0, 0, 0, '2020-09-21 16:58:07', 0),
(5958, 100, 0, 0, 17, 'United Nations Industrial Development Organization Document', 'https://www.unido.org/sites/default/files/2017-11/SSO-Manual-Print-FINAL-20161109-One-Page-V2.pdf', 'Manual for Industrial Steam Systems Assessment and Optimization', 1, 0, 0, 0, '2020-09-21 16:58:07', 0),
(5959, 100, 0, 0, 17, 'CleaverBrooks Document', 'http://cleaverbrooks.com/reference-center/insights/Boiler%20Efficiency%20Guide.pdf', 'Boiler Efficiency Guide', 1, 0, 0, 0, '2020-09-21 16:58:07', 0),
(5960, 100, 0, 0, 25, 'Pacific NW Boiler Vendor', 'https://coleindust.com/', 'Cole Industrial', 1, 0, 0, 0, '2020-09-21 16:58:07', 0),
(5961, 100, 0, 0, 25, 'Pacific NW Boiler Vendor', 'https://www.nationwideboiler.com/pacific-combustion-engineering.html', 'Pacific Combustion Engineering', 1, 0, 0, 0, '2020-09-21 16:58:07', 0),
(5962, 100, 0, 0, 25, 'Boiler Manufacturer', 'http://cleaverbrooks.com/', 'CleaverBrooks', 1, 0, 0, 0, '2020-09-21 16:58:07', 0),
(5963, 100, 0, 0, 8, 'ADD A LINK TO STEAM TABLES SOMEWHERE', '', '', 1, 0, 0, 0, '2020-09-21 16:58:07', 0),
(5964, 100, 0, 0, 24, 'Steam Table. Also contains several pages that explain steam systems and equations.', 'https://www.tlv.com/global/US/steam-theory/how-to-read-a-steam-table.html', 'TLV Steam Theory', 1, 0, 0, 0, '2020-09-21 16:58:07', 0),
(5965, 105, 0, 0, 15, 'Condensate flow and temperature', '', '', 1, 0, 0, 0, '2020-09-21 17:02:20', 0),
(5966, 105, 0, 0, 11, 'Return more/all condensate back to the boiler', '', '', 0, 0, 0, 0, '2020-09-21 17:02:20', 0),
(5967, 105, 0, 0, 11, 'Recover Flash Steam', '', '', 0, 0, 0, 0, '2020-09-21 17:02:20', 0),
(5968, 105, 0, 1, 10, 'Steam being released into atmosphere from the boiler system', '', '', 0, 0, 0, 0, '2020-09-21 17:02:20', 0),
(5969, 105, 0, 1, 1, 'Payback period is usually within a year', '', '', 0, 0, 0, 0, '2020-09-21 17:02:20', 0),
(5970, 105, 0, 1, 1, 'Condensate does not require any chemical treatment other than condensate polishing. ', '', '', 0, 0, 0, 0, '2020-09-21 17:02:20', 0),
(5971, 105, 0, 2, 8, 'A condensate polisher is similar to a water softener. Polishing removes the trace amount of mineral that are dissolved in the condensate after running though the boiler. ', '', '', 0, 0, 0, 0, '2020-09-21 17:02:20', 0),
(5972, 105, 0, 1, 1, 'Capturing and reusing the steam can reduce hog fuel by 14.5%', '', '', 0, 0, 0, 0, '2020-09-21 17:02:20', 0),
(5973, 105, 0, 1, 2, 'Maintenance crews will need training to work with steam recovery systems', '', '', 0, 0, 0, 0, '2020-09-21 17:02:20', 0),
(5974, 105, 0, 1, 2, 'There are usually no incentives for this opportunity, because the system usually pays for itself within a year.', '', '', 0, 0, 0, 0, '2020-09-21 17:02:20', 0),
(5975, 105, 0, 1, 3, 'A good recovery system can collect up to 80%', '', '', 0, 0, 0, 0, '2020-09-21 17:02:20', 0),
(5976, 105, 0, 1, 3, 'Steam recovery is most efficient when waste heat is high and flow is continuous', '', '', 0, 0, 0, 0, '2020-09-21 17:02:20', 0),
(5977, 105, 0, 1, 8, 'Multiple different types of steam traps available to fit company needs: Mechanical, Thermodynamic, or Thermostatic', '', '', 0, 0, 0, 0, '2020-09-21 17:02:20', 0),
(5978, 105, 0, 1, 23, 'Explains how steam traps work, brief history and lists several different types of traps in detail.', 'https://www.youtube.com/watch?v=IiRyxcCBTa0', 'Let\'s Talk Steam Traps', 1, 0, 0, 0, '2020-09-21 17:02:20', 0),
(5979, 105, 0, 1, 17, 'Contains specific information about flash steam recovery', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam12_lowpressure_steam.pdf', 'DOE Tip Sheet Flash Steam Recovery', 1, 0, 0, 0, '2020-09-21 17:02:20', 0),
(5980, 105, 0, 1, 24, 'Contains several pages with useful calculations for steam systems. This link leads to the flash steam page.', 'https://www.tlv.com/global/US/steam-theory/introduction-to-condensate-recovery.html', 'TLV Steam Theory', 1, 0, 0, 0, '2020-09-21 17:02:20', 0),
(5981, 105, 0, 1, 21, '$empty', 'https://oregonstate.app.box.com/file/337450150435', 'Flash Steam Recovery', 0, 0, 0, 0, '2020-09-21 17:02:20', 0),
(6206, 230, 0, 0, 26, 'Base charge', '', '', 0, 0, 0, 0, '2020-09-23 21:55:38', 0),
(6207, 230, 0, 0, 26, 'Supply rate', '', '', 0, 0, 0, 0, '2020-09-23 21:55:38', 0),
(6208, 230, 0, 0, 26, 'Transport fees', '', '', 0, 0, 0, 0, '2020-09-23 21:55:38', 0),
(6209, 230, 0, 0, 26, 'City tax', '', '', 0, 0, 0, 0, '2020-09-23 21:55:38', 0),
(6210, 230, 0, 0, 26, 'Public purpose charge', '', '', 0, 0, 0, 0, '2020-09-23 21:55:38', 0),
(6231, 232, 0, 0, 26, 'Generally, water companies assign different classes of rate schedules depending on the application.', '', '', 0, 0, 0, 0, '2020-09-23 22:25:06', 0),
(6232, 232, 0, 1, 26, 'An industrial or commercial rate schedule is often assigned to industry consumers', '', '', 0, 0, 0, 0, '2020-09-23 22:25:06', 0),
(6233, 232, 0, 0, 26, 'The specific details and charges of a rate schedule often varies depending on the water company.', '', '', 0, 0, 0, 0, '2020-09-23 22:25:06', 0),
(6234, 232, 0, 1, 26, 'Consult the rate schedule provided by your electric company for your rates and charges.', '', '', 0, 0, 0, 0, '2020-09-23 22:25:06', 0),
(6242, 233, 0, 0, 26, 'Base Charge', '', '', 0, 0, 0, 0, '2020-09-23 22:28:08', 0),
(6243, 233, 0, 0, 26, 'Demanded Water', '', '', 0, 0, 0, 0, '2020-09-23 22:28:08', 0),
(6244, 233, 0, 0, 26, 'Effluent Water', '', '', 0, 0, 0, 0, '2020-09-23 22:28:08', 0),
(6245, 233, 0, 1, 26, 'BOD Waste', '', '', 0, 0, 0, 0, '2020-09-23 22:28:08', 0),
(6246, 233, 0, 1, 26, 'TSS Waste', '', '', 0, 0, 0, 0, '2020-09-23 22:28:08', 0),
(6247, 233, 0, 1, 26, 'Stormwater Rate', '', '', 0, 0, 0, 0, '2020-09-23 22:28:08', 0),
(6248, 233, 0, 1, 26, 'Sewer Rate', '', '', 0, 0, 0, 0, '2020-09-23 22:28:08', 0),
(6249, 233, 0, 0, 26, 'City Tax', '', '', 0, 0, 0, 0, '2020-09-23 22:28:08', 0),
(6250, 233, 0, 0, 26, 'Public Purpose Charge', '', '', 0, 0, 0, 0, '2020-09-23 22:28:08', 0),
(6284, 193, 0, 0, 26, 'Power factor represents the portion of the total power drawn by a load that does useful work', '', '', 0, 0, 0, 0, '2020-10-13 20:13:31', 1),
(6285, 193, 0, 0, 26, 'Power factor is the ratio of real power, in kilowatts (kW), to apparent power, in kilovolt amperes (kVA)', '', '', 0, 0, 0, 0, '2020-10-13 20:13:31', 1),
(6286, 193, 0, 1, 20, '', '/uploads/user_52/3bacc6ae00660669452ad7219c34b33e.png', 'The power triangle. Power factor is represented by the cosine of the angle (theta) between the total power and real power on the power triangle. ', 0, 0, 0, 0, '2020-10-13 20:13:31', 1),
(6287, 193, 0, 0, 26, 'Reactive power is needed to create and maintain the magnetic field that rotates the shaft of a motor', '', '', 0, 0, 0, 0, '2020-10-13 20:13:31', 1),
(6288, 193, 0, 0, 26, 'Inductive loads produce lagging power factor and capacitive loads produce leading power factor. Lagging power factor is most common due to the presence of inductive loads in industrial facilities. In this case, installing capacitors will correct power factor by bringing the current back in phase with the voltage.', '', '', 0, 0, 0, 0, '2020-10-13 20:13:31', 1),
(6289, 190, 0, 0, 15, 'Collect one year of electric utility bills. This will help with identifying meters that can benefit from power factor correction and estimating the potential savings for correcting power factor.', '', '', 0, 0, 0, 0, '2020-10-13 20:15:35', 1),
(6290, 190, 0, 0, 15, 'The method of billing for low power factor can vary depending on the facility\'s electric utility provider. The rate schedule associated with each meter will show how the facility is charged for poor power factor. ', '', '', 0, 0, 0, 0, '2020-10-13 20:15:35', 1),
(6291, 192, 0, 0, 10, 'Reactive power charges constitute a considerable portion of the facility\'s electric utility bill', '', '', 0, 0, 0, 0, '2020-10-13 20:17:59', 1),
(6292, 192, 0, 0, 7, 'Correcting power factor to the threshold reactive power provides the most value to the client without increasing the payback period for this recommendation. The threshold reactive power is the amount of reactive power that can be present on a utility bill before the user incurs additional charges.', '', '', 0, 0, 0, 0, '2020-10-13 20:17:59', 1),
(6293, 192, 0, 0, 8, 'Fuses are less expensive than new capacitors. If the facility has offline capacitors, determine if they can be put back into use.', '', '', 0, 0, 0, 0, '2020-10-13 20:17:59', 1),
(6294, 192, 0, 0, 4, 'Harmonic filters should be used in distribution systems with harmonics. Consider consulting with a power management company to have a harmonic analysis completed before purchasing or installing capacitors.', '', '', 0, 0, 0, 4, '2020-10-13 20:17:59', 1),
(6295, 192, 0, 0, 27, 'A power quality analyzer can be used to determine the power factor for individual pieces of equipment', '', '', 0, 0, 0, 0, '2020-10-13 20:17:59', 1),
(6296, 192, 0, 0, 11, 'Install individual capacitors', '', '', 0, 0, 0, 0, '2020-10-13 20:17:59', 1),
(6297, 192, 0, 1, 1, 'Installing individual capacitors at the load (typically at the Motor Control Center to switch in an out with the motor\" can make capacitor selection easy', '', '', 0, 0, 0, 0, '2020-10-13 20:17:59', 1),
(6298, 192, 0, 1, 1, 'This can be the most economical solution due to low equipment cost', '', '', 0, 0, 0, 4, '2020-10-13 20:17:59', 1),
(6299, 192, 0, 1, 1, 'The capacitor operates with the motor, so other systems are not affected when the motor is offline', '', '', 0, 0, 0, 0, '2020-10-13 20:17:59', 1),
(6300, 192, 0, 1, 8, 'For large motors (50 HP and above), install capacitors at the load. For many smaller motors, it may be feasible to install one capacitor for the group of motors.', '', '', 0, 0, 0, 4, '2020-10-13 20:17:59', 1),
(6301, 192, 0, 0, 11, 'Install a capacitor bank', '', '', 0, 0, 0, 0, '2020-10-13 20:17:59', 1),
(6302, 192, 0, 1, 26, 'A fixed capacitor bank is suitable for equipment that has little variance in load characteristics', '', '', 0, 0, 0, 0, '2020-10-13 20:17:59', 1),
(6303, 192, 0, 1, 26, 'Installing automatically switching capacitor banks is the best solution for variable loads because they provide the right amount of power factor correction as loads turn on and off', '', '', 0, 0, 0, 0, '2020-10-13 20:17:59', 1),
(6304, 192, 0, 1, 1, 'Only one installation is required for a capacitor bank compared to multiple capacitors at the load', '', '', 0, 0, 0, 0, '2020-10-13 20:17:59', 1),
(6305, 192, 0, 1, 2, 'Automatically switching banks are more expensive than fixed banks or individual capacitors and lead to longer payback periods', '', '', 0, 0, 0, 0, '2020-10-13 20:17:59', 1),
(6311, 228, 0, 0, 26, 'Natural gas is most often measured in units of heat called therms or British Thermal Units (Btu).', '', '', 0, 0, 0, 0, '2020-10-14 18:12:59', 0),
(6339, 231, 0, 0, 26, 'Demanded Water:', '', '', 0, 0, 0, 0, '2020-10-14 20:34:50', 0),
(6340, 231, 0, 1, 26, 'This water is typically measured in volumetric units of hundred cubic feet (HCF) or liters (L).', '', '', 0, 0, 0, 0, '2020-10-14 20:34:50', 0),
(6341, 231, 0, 0, 26, 'Effluent Water:', '', '', 0, 0, 0, 0, '2020-10-14 20:34:50', 0),
(6342, 231, 0, 1, 26, 'Biological Oxygen Demand (BOD) - this is the amount of dissolved oxygen aerobic microorganisms use to decompose organic matter in the water.  It is measured in units of milligrams per liter (mg/L).', '', '', 0, 0, 0, 0, '2020-10-14 20:34:50', 0),
(6343, 231, 0, 1, 26, 'Total Suspended Solids (TSS) - this is the dry weight of suspended particulates in water.  It is measured in units of milligrams per liter (mg/L).', '', '', 0, 0, 0, 0, '2020-10-14 20:34:50', 0),
(6344, 231, 0, 1, 26, 'Effluent characteristics such as these are often charged to incentivize a higher degree of water treatment, minimizing adverse effects when the effluent is reintroduced to the surrounding environment.', '', '', 0, 0, 0, 0, '2020-10-14 20:34:50', 0),
(6345, 231, 0, 0, 26, 'Some water companies may use generalized, volumetric measurements for effluent water instead of BOD and TSS.  Additionally, some companies may add a charge for stormwater volumes as well.', '', '', 0, 0, 0, 0, '2020-10-14 20:34:50', 0),
(6346, 231, 0, 1, 26, 'Examine the rate schedule provided by your water company to determine how your effluent is being charged.', '', '', 0, 0, 0, 0, '2020-10-14 20:34:50', 0),
(6347, 236, 0, 0, 10, 'Meters that consistently have relatively low charges (<$500 per month)', '', '', 0, 0, 0, 0, '2020-10-14 20:45:46', 0),
(6348, 236, 0, 0, 11, 'Combine multiple small meters together', '', '', 0, 0, 0, 0, '2020-10-14 20:45:46', 0),
(6349, 236, 0, 0, 11, 'Combine a small meter with a larger meter', '', '', 0, 0, 0, 0, '2020-10-14 20:45:46', 0),
(6367, 211, 0, 0, 11, 'Install localized welding ventilation', '', '', 0, 0, 0, 0, '2020-10-15 18:08:43', 0),
(6368, 211, 0, 1, 13, 'Welding processes must be well ventilated to protect personnel from fumes. Energy is consumed to condition the air inside the building and ventilation carries that air and exhausts it outside. Controlled ventilation can reduce the amount of air moved by the ventilation system while adequately ventilating the welding process.', '', '', 0, 0, 0, 0, '2020-10-15 18:08:43', 0),
(6369, 211, 0, 1, 26, 'Reduce ventilation energy losses by installing localized ducting above welding stations', '', '', 0, 0, 0, 0, '2020-10-15 18:08:43', 0),
(6370, 211, 0, 1, 26, 'Welding areas must be ventilated to maintain air quality standards specified by the Oregon Health and Safety Administration (OSHA)', '', '', 0, 0, 0, 0, '2020-10-15 18:08:43', 0),
(6371, 211, 0, 1, 15, 'Identify the source of heating and cooling for the building and the associated cost of operating the equipment. This may be packaged HVAC units , gas/electric heaters, etc. ', '', '', 0, 0, 0, 0, '2020-10-15 18:08:43', 0),
(6372, 211, 0, 1, 15, 'Heating degree days for the local area. Temperature bin data can be obtained from the National Ocean and Atmospheric Administration (NOAA).', '', '', 0, 0, 0, 0, '2020-10-15 18:08:43', 0),
(6373, 211, 0, 1, 15, 'Current exhaust air flow rate and the minimum exhaust air flow rate required by health and safety regulations', '', '', 0, 0, 0, 0, '2020-10-15 18:08:43', 0),
(6374, 211, 0, 1, 15, 'Quantity of welders or welding stations', '', '', 0, 0, 0, 0, '2020-10-15 18:08:43', 0),
(6375, 211, 0, 1, 15, 'Approximate the proposed length of ventilation required for the installation to estimate the cost of implementation', '', '', 0, 0, 0, 0, '2020-10-15 18:08:43', 0),
(6398, 214, 0, 0, 13, 'Conditioning air for painting, drying and treating emissions all represent sources of energy consumption in a painting process. Energy saving measures may be available at each one of these steps.', '', '', 0, 0, 0, 13, '2020-10-15 18:16:54', 0),
(6399, 214, 0, 0, 11, 'Reduce airflow in paint booth', '', '', 0, 0, 0, 0, '2020-10-15 18:16:54', 0),
(6400, 214, 0, 1, 13, 'Air must be exhausted from paint booths to remove evaporated solvent, oversprayed paint particles and pollutants such as volatile organic compounds (VOCs). The energy consumed by the ventilation system depends on the target outlet concentration of VOCs. VOCs come from the paint and they are removed from the air exhaust stream through filtration or incineration.', '', '', 0, 0, 0, 13, '2020-10-15 18:16:54', 0),
(6401, 214, 0, 1, 26, 'Reducing the amount of air that is exhausted from the paint booth reduces the amount of fuel required to raise the temperature of the inlet air to the target temperature, and reduces the volume of exhaust air that must be treated.', '', '', 0, 0, 0, 0, '2020-10-15 18:16:54', 0),
(6402, 214, 0, 1, 4, 'If the air flow rate through the booth is too low, cold spots may be present which lead to poor application and condensation.', '', '', 0, 0, 0, 13, '2020-10-15 18:16:54', 0),
(6403, 214, 0, 1, 7, 'For air recirculating ovens, 90% of the air in the booth should be recycled', '', '', 0, 0, 0, 13, '2020-10-15 18:16:54', 0),
(6404, 214, 0, 1, 3, 'For every 2,000 hours/year that an oven operates, every 10 cubic meters per hour of exhaust flow loses 150 kWh at 50C, 400 kWh at 100C, 600 kWh at 150C, and 750 kWh at 200C', '', '', 0, 0, 0, 13, '2020-10-15 18:16:54', 0),
(6405, 214, 0, 1, 12, 'Turn down air flow rates during breaks to realize immediate cost savings.', '', '', 0, 0, 0, 0, '2020-10-15 18:16:54', 0),
(6406, 214, 0, 1, 1, 'Computer-controlled ventilation systems can operate based on solvent concentration in the paint booth or by spray gun operation.', '', '', 0, 0, 0, 13, '2020-10-15 18:16:54', 0),
(6407, 214, 0, 0, 11, 'Exhaust heat recovery', '', '', 0, 0, 0, 0, '2020-10-15 18:16:54', 0),
(6408, 214, 0, 1, 8, 'Heat recovery measures typically save 30-60% of energy consumption associated with a paint booth and have a 1-3 year payback period', '', '', 0, 0, 0, 12, '2020-10-15 18:16:54', 0),
(6409, 214, 0, 1, 1, 'Rotary heat exchangers can be installed on paint booths to save up to 50% of the exhausted heat', '', '', 0, 0, 0, 13, '2020-10-15 18:16:54', 0),
(6410, 214, 0, 1, 2, 'Heat recovered from paint booths is low-grade heat', '', '', 0, 0, 0, 0, '2020-10-15 18:16:54', 0),
(6411, 214, 0, 1, 2, 'These installations are of interest mainly to large scale painting operations', '', '', 0, 0, 0, 0, '2020-10-15 18:16:54', 0),
(6412, 214, 0, 1, 2, 'Heat wheels do not perform well with streams that have particles or where condensation occur', '', '', 0, 0, 0, 0, '2020-10-15 18:16:54', 0),
(6413, 214, 0, 0, 11, 'Change to powder-based paints', '', '', 0, 0, 0, 0, '2020-10-15 18:16:54', 0),
(6414, 214, 0, 1, 1, 'Powder-based paints do not have solvents, the paint particles are attracted to the part by an applied electrostatic charge. The energy requirement for powder-based painting can be up to 30% lower due to the reduced energy consumption associated with eliminating VOCs from the exhaust stream.', '', '', 0, 0, 0, 13, '2020-10-15 18:16:54', 0),
(6415, 214, 0, 1, 8, 'These measures can save 18-30% of energy consumption associated with a paint booth and have a 2-3 year payback period', '', '', 0, 0, 0, 12, '2020-10-15 18:16:54', 0),
(6416, 214, 0, 0, 11, 'Install an air-to-fuel ratio control system on the paint booth air heater', '', '', 0, 0, 0, 0, '2020-10-15 18:16:54', 0),
(6417, 214, 0, 1, 3, 'This may reduce energy consumption associated with combustion by 5-15% depending on demand', '', '', 0, 0, 0, 13, '2020-10-15 18:16:54', 0),
(6418, 214, 0, 0, 11, 'Install activated carbon filters to remove VOCs from the exhaust stream', '', '', 0, 0, 0, 0, '2020-10-15 18:16:54', 0),
(6419, 214, 0, 1, 26, 'Activated carbon filters capture and concentrate VOCs from the exhaust stream reducing the amount of air that must be treated by incineration', '', '', 0, 0, 0, 0, '2020-10-15 18:16:54', 0),
(6420, 212, 0, 0, 11, 'Increase Spray Paint Efficiency', '', '', 0, 0, 0, 0, '2020-10-15 18:18:23', 0),
(6421, 212, 0, 1, 8, 'Training paint personnel to reduce overspray in painting applications can significantly reduce annual paint consumption and extend booth filter life', '', '', 0, 0, 0, 0, '2020-10-15 18:18:23', 0),
(6422, 212, 0, 1, 26, 'Paint booths are often present in metals manufacturing facilities that produce final products or components', '', '', 0, 0, 0, 0, '2020-10-15 18:18:23', 0),
(6423, 212, 0, 1, 26, 'Operator spray technique and equipment settings can be adjusted to minimize paint overspray. Equipment settings include paint gun adjustment, equipment maintenance, and paint gun distance and orientation.', '', '', 0, 0, 0, 0, '2020-10-15 18:18:23', 0),
(6424, 212, 0, 1, 1, 'Painting efficiency can be improved by as much 25% for even the most experienced painters with increased attention to application techniques', '', '', 0, 0, 0, 6, '2020-10-15 18:18:23', 0),
(6425, 212, 0, 1, 15, 'Annual consumption of paint and associated cost', '', '', 0, 0, 0, 0, '2020-10-15 18:18:23', 0),
(6426, 212, 0, 1, 3, 'Proposed savings can be conservatively estimated at 10-15% reduction in paint consumption. Percent savings may approach 25% if the recommended techniques are replicated and adhered to.', '', '', 0, 0, 0, 0, '2020-10-15 18:18:23', 0),
(6427, 213, 0, 0, 11, 'Replace transformer-rectifier welders with inverter welders', '', '', 0, 0, 0, 0, '2020-10-15 18:19:25', 0),
(6428, 213, 0, 1, 3, 'A transformer-rectifier welder is 67% efficient and an inverter-based welder is 87% efficient, on average. ', '', '', 0, 0, 0, 7, '2020-10-15 18:19:25', 0),
(6429, 213, 0, 1, 1, 'Inverter welders are smaller and more lightweight compared to transformer-rectifier welders making them more portable', '', '', 0, 0, 0, 0, '2020-10-15 18:19:25', 0),
(6430, 213, 0, 1, 1, 'Inverter welders are capable of stick, MIG, TIG, FCAW, arc gouging and pulsing styles. They also produce a higher quality weld.', '', '', 0, 0, 0, 7, '2020-10-15 18:19:25', 0),
(6431, 213, 0, 1, 8, 'For upgrading to an inverter welder, the Energy Trust of Oregon (ETO) offers a $1,200 incentive for each machine that operates over 1,200 hours per year.', '', '', 0, 0, 0, 9, '2020-10-15 18:19:25', 0),
(6432, 213, 0, 1, 26, 'The transformer cores, windings, and electronic switching components are designed to minimize losses leading to efficiency improvements for inverter welders by design.', '', '', 0, 0, 0, 7, '2020-10-15 18:19:25', 0),
(6433, 213, 0, 1, 26, 'Upgrading a single transformer-rectifier welder to an inverter welder can save up to $1,724 annually. This calculation assumes a 20% increase in welder efficiency with 6,240 annual operation hours and a 25% idle time.', '', '', 0, 0, 0, 8, '2020-10-15 18:19:25', 0),
(6434, 213, 0, 0, 11, 'Install a robotic welder', '', '', 0, 0, 0, 0, '2020-10-15 18:19:25', 0),
(6435, 213, 0, 1, 1, 'Robotic welding can increase productivity and improve weld quality', '', '', 0, 0, 0, 10, '2020-10-15 18:19:25', 0),
(6436, 213, 0, 1, 1, 'Robotic welders can meet production standards that are difficult to meet with manual welding and can do so with 36-46% reduction in cycle time.', '', '', 0, 0, 0, 11, '2020-10-15 18:19:25', 0),
(6437, 213, 0, 1, 8, 'The facility should utilize robotic welding integrators who can run process and capability studies to verify the applicability of robotic welding', '', '', 0, 0, 0, 10, '2020-10-15 18:19:25', 0),
(6438, 213, 0, 1, 8, 'Robot integrators and manufacturers offer training to ensure the system will run successfully and profitably for the duration of the products life', '', '', 0, 0, 0, 10, '2020-10-15 18:19:25', 0),
(6512, 229, 0, 0, 26, 'Natural gas charges are usually divided into two, distinct categories:', '', '', 0, 0, 0, 17, '2020-10-16 21:36:14', 0),
(6513, 229, 0, 1, 26, 'Commodity Charge: the cost of the gas itself', '', '', 0, 0, 0, 0, '2020-10-16 21:36:14', 0),
(6514, 229, 0, 1, 26, 'Transmission/Distribution Charge:  the cost to transport gas from its source to the industry site.', '', '', 0, 0, 0, 0, '2020-10-16 21:36:14', 0),
(6515, 229, 0, 0, 26, 'This allows for two methods of obtaining this utility:', '', '', 0, 0, 0, 0, '2020-10-16 21:36:14', 0),
(6516, 229, 0, 1, 26, '1. Gas is purchased from and directly transported by the local gas company.  ', '', '', 0, 0, 0, 0, '2020-10-16 21:36:14', 0),
(6517, 229, 0, 2, 26, 'Commodity and transmission charges determined by local gas company.', '', '', 0, 0, 0, 0, '2020-10-16 21:36:14', 0),
(6518, 229, 0, 1, 26, '2. Gas is purchased from a third party vendor and transported by the local gas company', '', '', 0, 0, 0, 0, '2020-10-16 21:36:14', 0),
(6519, 229, 0, 2, 26, 'Commodity charge from third party; transmission charge from local gas company', '', '', 0, 0, 0, 0, '2020-10-16 21:36:14', 0),
(6520, 229, 0, 0, 26, 'The specific details and charges of a rate schedule often vary depending on the gas company and the third party, if applicable.', '', '', 0, 0, 0, 0, '2020-10-16 21:36:14', 0),
(6521, 229, 0, 1, 26, 'Consult the rate schedule provided by your gas company and third party vendor for your rates and charges.', '', '', 0, 0, 0, 0, '2020-10-16 21:36:14', 0),
(6522, 223, 0, 0, 26, 'Electricity consumption is measured in units of kilowatt-hours (kWh).', '', '', 0, 0, 0, 15, '2020-10-16 21:38:02', 0),
(6523, 223, 0, 0, 26, 'It is commonly broken down into metered on-peak demand and metered off-peak demand.', '', '', 0, 0, 0, 16, '2020-10-16 21:38:02', 0),
(6524, 223, 0, 1, 26, 'Electric companies may charge different rates per kWh depending on the time of day.  For example, rates during nighttime hours can be less than daytime.  The higher rate is referred to as \"on-peak\" while the lower rate is considered \"off-peak\".', '', '', 0, 0, 0, 0, '2020-10-16 21:38:02', 0),
(6525, 223, 0, 1, 26, 'This idea can also apply to seasonal rates that change depending on the time of year.', '', '', 0, 0, 0, 0, '2020-10-16 21:38:02', 0),
(6526, 223, 0, 1, 26, 'Consult your provided rate schedule to find these rates, if applicable.', '', '', 0, 0, 0, 0, '2020-10-16 21:38:02', 0),
(6527, 223, 0, 0, 26, 'Reactive power is also measured  and it may be a significant contributor to energy costs (see Power Factor Correction page for more information)', '', '', 0, 0, 0, 0, '2020-10-16 21:38:02', 0),
(6528, 223, 0, 1, 28, '$empty', 'https://walkthrough.eec.oregonstate.edu/wiki/utilities/61', 'Power Factor Correction', 0, 0, 0, 0, '2020-10-16 21:38:02', 0);

-- --------------------------------------------------------

--
-- Table structure for table `Notifications`
--

CREATE TABLE `Notifications` (
  `notificationId` int(11) UNSIGNED NOT NULL,
  `requestId` int(11) UNSIGNED NOT NULL,
  `userId` int(11) UNSIGNED NOT NULL,
  `text` varchar(5000) NOT NULL,
  `type` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `Pages`
--

CREATE TABLE `Pages` (
  `pageId` int(10) UNSIGNED NOT NULL,
  `pageType` int(10) UNSIGNED NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(5000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `imageUrl` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `internal` tinyint(3) UNSIGNED NOT NULL,
  `userId` int(10) UNSIGNED NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `approved` tinyint(3) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Pages`
--

INSERT INTO `Pages` (`pageId`, `pageType`, `name`, `title`, `description`, `imageUrl`, `internal`, `userId`, `created`, `approved`) VALUES
(2, 2, 'Compressed Air', 'Compressed air is a common utility found in most industrial facilities', 'Compressed air has been a key industrial utility since the 1800\'s. It can drive pneumatic cylinders, air motors, diaphragm pumps and controls. It is capable of reasonably high force actuation, and is a common required utility in equipment packages. It can be used and is often misused to generate air flow for agitation, blow-off, cooling, and motive force applications. Screw compressors currently comprise the majority of industrial compressed air installations, but reciprocating and centrifugal compressors can be found in older or special installations/applications.', '/uploads/user_42/fe1402c50e24309eb11f4209c73e2daf.png', 0, 42, '2020-09-14 12:50:14', 1),
(44, 2, 'Motors and Controls', 'Electrical Motors and Motor Controls (Variable Speed Drives, etc) are crucial to most mechanized industrial processes and equipment.', 'Motors are a crucial part of any mechanized process and provide a means to do the majority of the mechanical work in most facilities.  Motors convert electrical energy into mechanical work to provide power to a wide range of applications including air compressors, fans, pumps, hydraulics, mixers, conveyors, and much more.', 'https://live.staticflickr.com/65535/50069229503_243696380c_b.jpg', 0, 51, '2020-06-29 23:04:50', 0),
(45, 2, 'Pumps', 'Pumps provide a typical utility required throughout industry.', 'Centrifugal pumps are the most common type found in industry, followed by positive displacement pumps (used in hydraulics), pneumatic diaphragm pumps, peristaltic pumps, and other specialty pumps. \n\nUnless otherwise noted this section speaks to centrifugal pumps when addressing pump performance and efficiency. Changes in hydraulic energy required (pressure and flow) will translate to any pumping system. \n\nCentrifugal pumps generally come in three classes: radial flow, mixed flow, and axial flow.', 'https://live.staticflickr.com/65535/50066427331_ddae8822f2_b.jpg', 0, 55, '2020-07-01 18:11:01', 0),
(46, 2, 'Boilers and Steam', 'Boilers and Steam Systems are found in a large subset of industrial facilities', 'Steam energy offered a great breakthrough in the 1800’s, providing mechanical energy through steam engines. Steam is now more commonly used for heating in cooking vessels, material drying, building heat,  etc. Direct injection of steam can add moisture along with heat. ', 'https://live.staticflickr.com/65535/50070285347_17c30ab100_b.jpg', 0, 51, '2020-07-02 19:39:56', 1),
(47, 2, 'Thermal Systems', 'Many industrial processes require encouraging or resisting thermal energy transfer.', 'Heat transfer technologies include heat exchangers, cooling towers, fan cooling, direct impingement and other methods.  Heat transfer is discouraged with insulation, vacuums, reduced emissivity, etc. ', 'https://live.staticflickr.com/65535/50069411093_68ab30e548_b.jpg', 0, 58, '2020-07-02 21:31:22', 0),
(48, 2, 'Refrigeration', 'Refrigeration technology is important in many industrial processes.', 'Vapor compression is the most common refrigeration technology. Mechanical energy input to a compressor enables absorbing heat in cooler environment and discharging it to a warmer environment. ', 'https://live.staticflickr.com/65535/50070312237_69edda5158_b.jpg', 0, 51, '2020-07-02 22:10:36', 0),
(49, 7, 'Utility Billing', 'Utility bills and associated potential savings are based on more than the commodity.', 'They can also be based on the rate of use, when use occurs, how the commodity is obtained, or how the commodity is measured. Understanding utility bills is essential to identifying potential areas of resource savings and implementing solutions.', 'https://www.bing.com/images/search?view=detailV2&ccid=Z3%2fFVsU%2b&id=60963F9A86CC05CA8E3879EC9CD61C', 1, 54, '2020-07-02 22:40:27', 0),
(50, 1, 'Wastewater Treatment', 'Municipalities and industry need to treat wastewater before discharging it to the environment.', 'Wastewater treatment systems can address a multitude of potential issues including: PH levels, oxygen demand (chemical or biological), pathogens, turbidity, debris and other contamination.\n\nCommon processes might include screening, filtration, sedimentation settling, PH balancing, disinfection, aeration, and anaerobic digestion.', 'https://live.staticflickr.com/65535/50087489383_757fc9c91e_b.jpg', 0, 51, '2020-07-07 20:46:38', 0),
(54, 5, 'Remote Assessments', '2020 Covid-19 Remote Assessments Protocol (Draft): A developing summary of the OSU IAC approach for remote assessments in the time of Covid -19', 'With Covid-19 limiting ability for in person facility assessments, the OSU EEC / IAC is focusing on developing a robust protocol for assessing sites remotely.  Once in person assessments are possible, these techniques will only improve the ability of the center to prepare for a typical site visit.\n\nIn the mean time, on the positive side, the team will not have to stop to put on chains on the way to an assessment.', 'https://live.staticflickr.com/65535/50193329247_ef0c9291de_b.jpg', 1, 51, '2020-08-05 19:54:53', 1),
(56, 3, 'Combined Heat and Power', 'Combined Heat and Power allows sites to use the waste heat of electrical generation.', 'CHP', 'no image yet', 0, 51, '2020-08-07 00:33:29', 0),
(57, 4, 'Optimize Facility Layout', 'Improve productivity through the location of departments and workstations and the workflow of personnel and materials.', 'Facility layout has a significant and often underestimated effect on the productivity of a facility. Movement of any form of work represents a non-value-added (NVA) process. Re-arranging the location of workstations and inventory to eliminate movement creates value in several forms. Most typically, fewer labor hours are spent moving materials, and sometimes energy is saved if operating hours of vehicles (e.g. forklifts or conveyors) are reduced. The most lucrative savings for the facility is increased productivity if delivery lead times between workstations are reduced, increasing utilization of the downstream workstation.', 'https://www.manexconsulting.com/wp-content/uploads/Layout-Optimization-Blog.jpg', 0, 62, '2020-08-07 19:21:05', 0),
(58, 4, 'Queuing Line Optimization', 'The operation of queues and their respective workstations determine the overall production efficiency of a facility.', 'Optimizing the queuing system of a workstation has significant effects on product output. Little\'s law and queuing theory helps simplify any production system into a set of easy to estimate variables. While extensive research, data collection, and possibly simulation should be employed before making any change to a part of the production system, basic analysis can reveal opportunities for cost savings through increased productivity.', 'https://www.umav.org/wp-content/uploads/2019/04/Car-Assembly-Line.jpg', 0, 62, '2020-08-10 19:57:05', 0),
(61, 7, 'Power Factor Correction', 'Improving power factor increases the capacity of a facility\'s electrical distribution network and can lead to significant savings on electrical utility costs.', 'High reactive power, or kVAR, can reduce the capacity of utility lines and transformers to supply kilowatts of real power, which creates additional expenses for the electrical service provider. This higher cost is directly billed to customers who are metered for reactive power. Improving power factor will avoid electric power billing penalties and electrical power losses due to the increased current required to perform a given job. Increasing power factor will increase the capacity of the distribution system.', '/uploads/user_52/ec8550a6c0caa67f935129b59a4c8185.jpg', 0, 52, '2020-08-26 15:55:35', 1),
(62, 5, 'Cybersecurity', 'Industrial Assessment Center resources for increasing cybersecurity.', 'Cybersecurity is becoming increasingly important as more industries adopt newer and more sophisticated controls for smart manufacturing or data collection to increase production and equipment efficiency. As part of our outreach on energy efficiency, we also provide information and resources about cybersecurity. Using some of the self-assessment tools and other informational resources provided on this page can be an important part of a facility’s plan to regularly evaluate their cybersecurity status.\n\nThe National Institute of Standards and Technology (NIST) Manufacturing Extension Partnership stated that 61% of small businesses experienced a cyber attack within the last 12 months, making up 58% of cyber attack victims. Furthermore, 34% of targets were manufacturing facilities and the median cost per attack was $60,000.', 'https://live.staticflickr.com/6044/6999839463_ae02bb6a7e_b.jpg', 1, 57, '2020-08-27 00:21:01', 0),
(64, 0, 'How to Use EEC Walkthrough', 'summary', 'description', 'https://picsum.photos/seed/newseed/700/700', 0, 42, '2020-08-31 22:17:53', 0),
(65, 0, 'How to Edit EEC Walkthrough', 'An analyst oriented guide for creating, editing, and reviewing content on the EEC Industrial Walkthrough Checklist.', 'Description', 'https://picsum.photos/seed/picsum/700/700', 1, 42, '2020-08-31 22:17:53', 0),
(69, 1, 'Metals Manufacturing', 'Industrial metals manufacturing processes may include casting, forging, bending, forming, spinning, welding, cutting and finishing to produce a final product.', 'Metals manufacturing includes production of raw stock, replacement parts and final products. Many production processes are common among all metals manufacturing facilities.', '/uploads/user_52/0baf5657b6e1ac3fef0b0e048672324b.jpg', 0, 52, '2020-09-09 18:37:04', 0);

-- --------------------------------------------------------

--
-- Table structure for table `Quick_Titles`
--

CREATE TABLE `Quick_Titles` (
  `titleId` int(10) UNSIGNED NOT NULL,
  `title` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Quick_Titles`
--

INSERT INTO `Quick_Titles` (`titleId`, `title`) VALUES
(1, 'Pros'),
(2, 'Cons'),
(3, 'Caveats'),
(4, 'Best Practices'),
(5, 'Rules of Thumb'),
(6, 'Tips'),
(7, 'Additional in Depth Site Resources'),
(8, 'Charts, Tables, Figures'),
(9, 'Standard Data to Collect'),
(10, 'Data Collection Guides'),
(11, 'Analysis Tools'),
(12, 'Gallery'),
(13, 'U.S. Department of Energy Tip Sheets'),
(14, 'General Off Site Resource Links');

-- --------------------------------------------------------

--
-- Table structure for table `Requests`
--

CREATE TABLE `Requests` (
  `requestId` int(10) UNSIGNED NOT NULL,
  `title` varchar(1000) NOT NULL,
  `description` varchar(5000) NOT NULL,
  `status` tinyint(3) UNSIGNED NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `userId` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Requests`
--

INSERT INTO `Requests` (`requestId`, `title`, `description`, `status`, `created`, `userId`) VALUES
(5, 'Metals Manufacturing', 'This is the metals manufacturing page that I started while working with ColMac', 1, '2020-10-15 18:21:13', 52),
(6, 'Utility Billing - Electricity', 'This introduces the utilities page and covers electricity billing structure.  Other utilities are to follow in a similar fashion, so I\'m wanting to check organization and content before reviewing any others.  Last note:  I have no idea what picture to put for the page, so very much open to any suggestions. Thanks!', 1, '2020-10-16 22:04:13', 54);

-- --------------------------------------------------------

--
-- Table structure for table `Request_Comments`
--

CREATE TABLE `Request_Comments` (
  `commentId` int(10) UNSIGNED NOT NULL,
  `requestId` int(10) UNSIGNED NOT NULL,
  `targetId` varchar(100) NOT NULL,
  `comment` varchar(5000) NOT NULL,
  `review` int(10) UNSIGNED NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `userId` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `Request_Objects`
--

CREATE TABLE `Request_Objects` (
  `requestObjectId` int(10) UNSIGNED NOT NULL,
  `requestId` int(10) UNSIGNED NOT NULL,
  `objectId` int(10) UNSIGNED NOT NULL,
  `objectType` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Request_Objects`
--

INSERT INTO `Request_Objects` (`requestObjectId`, `requestId`, `objectId`, `objectType`) VALUES
(16, 5, 69, 1),
(17, 5, 222, 3),
(18, 5, 63, 2),
(19, 5, 211, 3),
(20, 5, 214, 3),
(21, 5, 212, 3),
(22, 5, 213, 3),
(23, 5, 215, 3),
(24, 6, 49, 1),
(25, 6, 64, 2),
(26, 6, 223, 3),
(27, 6, 224, 3),
(28, 6, 225, 3);

-- --------------------------------------------------------

--
-- Table structure for table `Sources`
--

CREATE TABLE `Sources` (
  `sourceId` int(10) UNSIGNED NOT NULL,
  `pageId` int(10) UNSIGNED NOT NULL,
  `text` varchar(5000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Sources`
--

INSERT INTO `Sources` (`sourceId`, `pageId`, `text`) VALUES
(4, 61, '<p>Eaton. Power factor correction: a guide for the plant engineer (2014). Accessed: Sept. 9, 2020. [Online]. Available: <a href=\"https://www.eaton.com/ecm/groups/public/%40pub/%40electrical/documents/content/sa02607001e.pdf\" rel=\"noopener noreferrer\" target=\"_blank\">https://www.eaton.com/ecm/groups/public/%40pub/%40electrical/documents/content/sa02607001e.pdf</a></p>'),
(5, 61, '<p>M. R. Muller, M. Simek, J. Mak, B. Mitroic. Essentials of Industrial Assessments. Accessed: Sept. 9, 2020. [Online]. Available: <a href=\"https://iac.university/technicalDocs/industr/ch4.pdf\" rel=\"noopener noreferrer\" target=\"_blank\">https://iac.university/technicalDocs/industr/ch4.pdf</a></p>'),
(6, 69, '<p>\"Spray Painting Efficiency Training.\" Pacific Northwest Pollution Prevention Resource Center. <a href=\"https://pprc.org/2012/projects-2/projects/spray-painting-training-efficiency/\" rel=\"noopener noreferrer\" target=\"_blank\">https://pprc.org/2012/projects-2/projects/spray-painting-training-efficiency/</a> (accessed Sept. 9, 2020)</p>'),
(7, 69, '<p>\"Energy Efficiency: Inverter Power Source.\" Lincoln Electric. <a href=\"https://www.lincolnelectric.com/en-us/support/process-and-theory/Pages/inverter-power-detail.aspx\" rel=\"noopener noreferrer\" target=\"_blank\">https://www.lincolnelectric.com/en-us/support/process-and-theory/Pages/inverter-power-detail.aspx</a> (accessed Sept. 9, 2020).</p>'),
(8, 69, '<p>\"Welding Guide to Power Efficiency.\" Millerwelds.com. <a href=\"https://www.millerwelds.com/resources/article-library/welding-guide-to-power-efficiency\" rel=\"noopener noreferrer\" target=\"_blank\">https://www.millerwelds.com/resources/article-library/welding-guide-to-power-efficiency</a> (accessed Sept. 9, 2020).</p>'),
(9, 69, '<p>\"Welding Equipment.\" energytrust.org. <a href=\"https://www.energytrust.org/incentives/industry-welding-equipment/#tab-two\" rel=\"noopener noreferrer\" target=\"_blank\">https://www.energytrust.org/incentives/industry-welding-equipment/#tab-two</a> (accessed Sept. 9, 2020).</p>'),
(10, 69, '<p>\"Implementing Robotic Welding: What to Know to be Successful.\" tregaskiss.com. <a href=\"https://www.tregaskiss.com/implementing-robotic-welding-what-to-know-to-be-successful-p162156#.X1li73lKi00\" rel=\"noopener noreferrer\" target=\"_blank\">https://www.tregaskiss.com/implementing-robotic-welding-what-to-know-to-be-successful-p162156#.X1li73lKi00</a> (accessed Sept. 9, 2020).</p>'),
(11, 69, '<p>\"Robotic Welding for Fabrication of MilSpec Hydra Skid Systems Cuts Cycle Time.\" genesis-systems.com. <a href=\"https://www.genesis-systems.com/robotic-welding-skid-systems-case-study\" rel=\"noopener noreferrer\" target=\"_blank\">https://www.genesis-systems.com/robotic-welding-skid-systems-case-study</a> (accessed Sept. 9, 2020).</p>'),
(12, 69, '<p>C. Galitsky, E. Worrell, and E. Dutrow. \"ENERGY STAR® Guides for Energy Efficiency Opportunities, Featuring the Motor Vehicle Assembly Industry.\"</p>'),
(13, 69, '<p>C. Galitsky, E. Worrell. \"Energy Efficiency Improvement and Cost Saving Opportunities for the Vehicle Assembly Industry - An ENERGY STAR Guide for Energy and Plant Managers,\" Lawrence Berkeley National Laboratory, Berkeley, CA, 2008. Accessed: Sept. 10, 2020. [Online]. Available: <a href=\"https://www.osti.gov/servlets/purl/927881\" rel=\"noopener noreferrer\" target=\"_blank\">https://www.osti.gov/servlets/purl/927881</a></p>'),
(15, 49, '<p>\"Electricity Explained: Measuring Electricity.\"&nbsp;US Energy Information Administration.&nbsp;Available:https://www.eia.gov/energyexplained/electricity/measuring-electricity.php. [Accessed: Oct. 16, 2020].</p>'),
(16, 49, '<p>\"Understanding Peak Power.\" Eugene Water and Electric Board.  Available: http://www.eweb.org/about-us/power-supply/understanding-peak-power.  [Accessed: Oct. 16, 2020].</p>'),
(17, 49, '<p>\"Natural Gas Explained: Natural Gas Prices.\"  US Energy Information Administration.  Available: https://www.eia.gov/energyexplained/natural-gas/prices.php.  [Accessed: Oct. 16, 2020].</p>');

-- --------------------------------------------------------

--
-- Table structure for table `Sponsors`
--

CREATE TABLE `Sponsors` (
  `sponsorId` int(10) UNSIGNED NOT NULL,
  `name` varchar(1000) NOT NULL,
  `title` varchar(1000) NOT NULL,
  `websiteUrl` varchar(1000) NOT NULL,
  `imageUrl` varchar(1000) NOT NULL,
  `orderIndex` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Sponsors`
--

INSERT INTO `Sponsors` (`sponsorId`, `name`, `title`, `websiteUrl`, `imageUrl`, `orderIndex`) VALUES
(2, 'Industrial Assessment Center', 'U.S. Department of Energy, Office of Energy Efficiency & Renewable Energy, Advanced Manufacturing Office, Industrial Assessment Centers', 'https://www.energy.gov/eere/amo/industrial-assessment-centers-iacs', '/uploads/user_42/8936b3254b55ec513b042662758f9a68.png', 0);

-- --------------------------------------------------------

--
-- Table structure for table `Temp_Cards`
--

CREATE TABLE `Temp_Cards` (
  `tempCardId` int(10) UNSIGNED NOT NULL,
  `tempCardType` tinyint(3) UNSIGNED NOT NULL,
  `tempTitle` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tempOrderIndex` int(10) UNSIGNED NOT NULL,
  `tempUserId` int(10) UNSIGNED NOT NULL,
  `tempCreated` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Temp_Cards`
--

INSERT INTO `Temp_Cards` (`tempCardId`, `tempCardType`, `tempTitle`, `tempOrderIndex`, `tempUserId`, `tempCreated`) VALUES
(9, 0, 'Pros', 3, 58, '2020-09-03 23:15:22'),
(95, 0, 'Standard Data to Collect', 95, 61, '2020-09-21 16:41:42'),
(100, 0, 'Off Site Resource Links', 100, 61, '2020-07-03 17:55:16'),
(101, 0, 'Improve Boiler Combustion Efficiency', 101, 57, '2020-07-03 17:28:05'),
(105, 0, 'Improve the Condensate System', 105, 61, '2020-07-10 18:54:00'),
(106, 0, 'Reduce Heat Loss', 106, 51, '2020-07-03 17:31:09'),
(120, 0, 'Power Quality', 120, 58, '2020-07-10 18:52:52');

-- --------------------------------------------------------

--
-- Table structure for table `Temp_Headers`
--

CREATE TABLE `Temp_Headers` (
  `tempHeaderId` int(10) UNSIGNED NOT NULL,
  `tempTitle` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tempInternal` tinyint(3) UNSIGNED NOT NULL,
  `tempOrderIndex` int(10) UNSIGNED NOT NULL,
  `tempUserId` int(10) UNSIGNED NOT NULL,
  `tempCreated` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Temp_Headers`
--

INSERT INTO `Temp_Headers` (`tempHeaderId`, `tempTitle`, `tempInternal`, `tempOrderIndex`, `tempUserId`, `tempCreated`) VALUES
(32, 'Boilers and Steam Opportunities to Consider', 0, 2, 58, '2020-07-14 18:53:33');

-- --------------------------------------------------------

--
-- Table structure for table `Temp_Pages`
--

CREATE TABLE `Temp_Pages` (
  `tempPageId` int(10) UNSIGNED NOT NULL,
  `tempPageType` int(10) UNSIGNED NOT NULL,
  `tempName` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tempTitle` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tempDescription` varchar(5000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tempImageUrl` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tempInternal` tinyint(3) UNSIGNED NOT NULL,
  `tempUserId` int(10) UNSIGNED NOT NULL,
  `tempCreated` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `userId` int(10) UNSIGNED NOT NULL,
  `username` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `hash` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `firstName` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastName` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` tinyint(3) UNSIGNED NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`userId`, `username`, `hash`, `firstName`, `lastName`, `email`, `role`, `created`) VALUES
(42, 'Silverware', 'd8e7859c74c2672a13a2388538143c99$631f9c78dbc16fbd3b013aa7903a8527cee7d46befeb496b7510b1dcb4ae95c0', 'Zachary', 'Thomas', 'silverware13@gmail.com', 4, '2020-05-14 20:39:15'),
(47, 'rogrogrog', '8a3c5ecabadca6102a92052e5f6160d3$59606e43e8086a5cb735dfc87244f218638a629133558c6701390129ec8bb71a', 'rog', 'rog', 'rog@gmail.com', 3, '2020-06-01 20:39:15'),
(51, 'JoeJunker', 'b755592eabbdac736d8c5907fa64fa11$fae30b426545c803420b3f7f0bd4f1e80fd99ea09336ea525c769ef7041d1679', 'Joe', 'Junker', 'joseph.f.junker@gmail.com', 4, '2020-06-02 20:39:15'),
(52, 'mattye', 'bc8f2478b1eb8785d085b8c1512933f2$47ff478fcee9b0f829ed70012cd2c406ed67b7bae6708c855b9072ef8adb662b', 'Ethan', 'Matty', 'mattye.eec@gmail.com', 4, '2020-06-10 20:39:15'),
(54, 'martzal', '27d9aeff2e1c3e683f042480b6990a5c$963d962575ce1108cf5785fc42778ad0483050a80c50e8d3d29632f6af73f1a9', 'Ali', 'Martz', 'martzal.eec@gmail.com', 3, '2020-06-28 20:39:15'),
(55, 'peterj', '73a148776eaf3db8dee5b4cc5af1542d$c4d554f54a266e74299e82af3884f39d4e36686054f90837f7753b2d4b77a6f4', 'Julian', 'Peter', 'peterj.eec@gmail.com', 3, '2020-06-30 20:39:15'),
(56, 'ryanfrench', '8fdce1d0b4394d7a6dd55dd4d1318d54$b36510750272738b7d2de631057527b3ac1547db5d9ef6da8728886d523eca99', 'Ryan', 'French', 'frenchr.eec@gmail.com', 3, '2020-07-05 20:39:15'),
(57, 'MatthewThomas', 'a532335063fda0518a4a347b0a295166$05c83d3322dbbe787d420353fa83b3ad7b38e5b163d9d784bf752c8b7ebedb15', 'Matthew', 'Thomas', 'matthewthomas.eec@gmail.com', 3, '2020-07-02 20:39:15'),
(58, 'ryanfrench2', '0f035817ef3a5ebb3b7bedc75f6d5245$950542aafbfdeeceb6e32fcf2d06f5b2c076465e6fce3ef36b052d9ba6290404', 'Ryan', 'French', 'frenchr@oregonstate.com', 3, '2020-07-08 20:47:39'),
(59, 'djunker', '78d288ab098c3cb5d6d2ba21034e69c1$24786ffa47a290b250ffff18f0cfd703b86c773cf5f911e75fcf6d19989e700d', 'Devlin', 'Junker', 'devlin.junker@gmail.com', 3, '2020-07-10 01:36:09'),
(60, 'taylorad', 'b320c2b10ea1a5fd6a5df5b60b476a1a$76c9c4d174243210d40e54aa87e6b14926de7e3d7c1b229e7fcea48e98d65d85', 'Adam', 'Taylor', 'taylorad.eec@gmail.com', 3, '2020-07-13 17:38:47'),
(61, 'Chris_Houck', 'd4bb5e0bfd9c00be21e9e9d844ad7f57$367a89d5eeaf2274ff80b316f9aeda9f79acd192fc1f3717ff852b3cb29c6416', 'Chris', 'Houck', 'houckch.eec@gmail.com', 3, '2020-07-14 20:59:54'),
(62, 'psukamto', 'bbd4de95486df84c2553cb4cabc1472a$d8d1b75623a7d7eb3b717020dc28b70ba1c9152992db10316e280aedb0f35d6c', 'Peter', 'Sukamto', 'sukamtop.eec@gmail.com', 3, '2020-07-20 22:20:37'),
(63, 'testUser', '1f9d6b0176ddee97a3a69102b00679fd$f95c8cef6dacedc921486f893f34cdcd497d0e70b36955f84a3f45caa86c6c5f', 'test', 'user', 'testuser@gmail.com', 3, '2020-07-28 20:21:12'),
(64, 'NewUser', '0f98b126f8c5f97567986f7344a65d35$b56cdfeeb26a024487d97ea457a4691c8059a5a41f6102362319a7010488ecf7', 'Zachary', 'Thomas', 'newUser@gmail.com', 1, '2020-08-04 20:49:52'),
(65, 'KarlHaapala', 'b57616ebf0b31e2b470945548ebb37c3$ce2a1a37a4eeb500f9ff3d7ae5a436bd96f996cc7035089b06c66296ef664a0e', 'Karl', 'Haapala', 'Karl.Haapala@oregonstate.edu', 3, '2020-08-10 16:43:08'),
(66, 'BrianFronk', 'e19515b3011f1b9ae350416702e366ae$bc12ddf1a36485efdc2f3076306c0f3fbf8e0ebc161228b3d96df617b3003a54', 'Brian', 'Fronk', 'Brian.Fronk@oregonstate.edu', 1, '2020-08-17 17:50:49'),
(67, 'testEditor', '378a3004a2a67d4de86381f1167f67f0$667800fc22bccfb093ed7370d527f1b07e7b3cf3a54acfd43e71edc477c1391f', 'Test', 'Editor', 'testeditor@gmail.com', 3, '2020-09-01 02:00:00'),
(68, 'newUser1', '6722e86ced77c549439d1a1746634998$4a86c207b6c1d91696c82191547f9a6068888fecaa1c137cee77621c74a8cf8f', 'new', 'user', 'newUser1@gmail.com', 1, '2020-09-14 10:31:05'),
(69, 'testEditor1', 'fbb3b3a0d4f8be764fbe6bdc27f6d983$2ce25602f589f0e5be6a55d9141875272a99496e3d6b343cad56f1949eaf48bd', 'test', 'editor', 'testeditor1@gmail.com', 3, '2020-09-22 20:46:41');

-- --------------------------------------------------------

--
-- Table structure for table `Views`
--

CREATE TABLE `Views` (
  `viewId` int(10) UNSIGNED NOT NULL,
  `pageId` int(10) UNSIGNED NOT NULL,
  `userId` int(10) UNSIGNED NOT NULL,
  `viewName` varchar(500) NOT NULL,
  `public` tinyint(3) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Views`
--

INSERT INTO `Views` (`viewId`, `pageId`, `userId`, `viewName`, `public`) VALUES
(10, 2, 51, 'Opportunities ', 0),
(11, 2, 51, 'Opportunities ', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Cards`
--
ALTER TABLE `Cards`
  ADD PRIMARY KEY (`cardId`),
  ADD KEY `user_card_fk` (`userId`),
  ADD KEY `header_fk` (`headerId`);

--
-- Indexes for table `Categories`
--
ALTER TABLE `Categories`
  ADD PRIMARY KEY (`categoryId`),
  ADD UNIQUE KEY `singleName` (`singleName`),
  ADD UNIQUE KEY `pluralName` (`pluralName`),
  ADD KEY `user_category_fk` (`userId`);

--
-- Indexes for table `Filters`
--
ALTER TABLE `Filters`
  ADD PRIMARY KEY (`filterId`),
  ADD KEY `viewId_filter_fk` (`viewId`),
  ADD KEY `headerId_filter_fk` (`headerId`);

--
-- Indexes for table `Headers`
--
ALTER TABLE `Headers`
  ADD PRIMARY KEY (`headerId`),
  ADD KEY `user_header_fk` (`userId`),
  ADD KEY `page_fk` (`pageId`);

--
-- Indexes for table `History_Cards`
--
ALTER TABLE `History_Cards`
  ADD PRIMARY KEY (`historyId`);

--
-- Indexes for table `History_Headers`
--
ALTER TABLE `History_Headers`
  ADD PRIMARY KEY (`historyId`);

--
-- Indexes for table `History_Items`
--
ALTER TABLE `History_Items`
  ADD PRIMARY KEY (`historyId`),
  ADD KEY `history_card_item_fk` (`parentId`);

--
-- Indexes for table `History_Pages`
--
ALTER TABLE `History_Pages`
  ADD PRIMARY KEY (`historyId`);

--
-- Indexes for table `Home`
--
ALTER TABLE `Home`
  ADD PRIMARY KEY (`mainHeader`);

--
-- Indexes for table `Icons`
--
ALTER TABLE `Icons`
  ADD PRIMARY KEY (`iconType`);

--
-- Indexes for table `Items`
--
ALTER TABLE `Items`
  ADD PRIMARY KEY (`itemId`),
  ADD KEY `card_fk` (`cardId`),
  ADD KEY `iconId_fk` (`iconType`);

--
-- Indexes for table `Notifications`
--
ALTER TABLE `Notifications`
  ADD PRIMARY KEY (`notificationId`);

--
-- Indexes for table `Pages`
--
ALTER TABLE `Pages`
  ADD PRIMARY KEY (`pageId`),
  ADD KEY `user_page_fk` (`userId`),
  ADD KEY `category_fk` (`pageType`);

--
-- Indexes for table `Quick_Titles`
--
ALTER TABLE `Quick_Titles`
  ADD PRIMARY KEY (`titleId`);

--
-- Indexes for table `Requests`
--
ALTER TABLE `Requests`
  ADD PRIMARY KEY (`requestId`);

--
-- Indexes for table `Request_Comments`
--
ALTER TABLE `Request_Comments`
  ADD PRIMARY KEY (`commentId`),
  ADD KEY `comment_request_fk` (`requestId`);

--
-- Indexes for table `Request_Objects`
--
ALTER TABLE `Request_Objects`
  ADD PRIMARY KEY (`requestObjectId`),
  ADD KEY `request_object_fk` (`requestId`);

--
-- Indexes for table `Sources`
--
ALTER TABLE `Sources`
  ADD PRIMARY KEY (`sourceId`),
  ADD KEY `sources_pages_fk` (`pageId`);

--
-- Indexes for table `Sponsors`
--
ALTER TABLE `Sponsors`
  ADD PRIMARY KEY (`sponsorId`);

--
-- Indexes for table `Temp_Cards`
--
ALTER TABLE `Temp_Cards`
  ADD PRIMARY KEY (`tempCardId`),
  ADD KEY `fk_user_tempCard` (`tempUserId`);

--
-- Indexes for table `Temp_Headers`
--
ALTER TABLE `Temp_Headers`
  ADD PRIMARY KEY (`tempHeaderId`),
  ADD KEY `fk_user_tempHeader` (`tempUserId`);

--
-- Indexes for table `Temp_Pages`
--
ALTER TABLE `Temp_Pages`
  ADD PRIMARY KEY (`tempPageId`),
  ADD KEY `fk_user_tempPage` (`tempUserId`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`userId`),
  ADD UNIQUE KEY `userName` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `Views`
--
ALTER TABLE `Views`
  ADD PRIMARY KEY (`viewId`),
  ADD KEY `pageId_view_fk` (`pageId`),
  ADD KEY `userId_view_fk` (`userId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Cards`
--
ALTER TABLE `Cards`
  MODIFY `cardId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=237;

--
-- AUTO_INCREMENT for table `Categories`
--
ALTER TABLE `Categories`
  MODIFY `categoryId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `Filters`
--
ALTER TABLE `Filters`
  MODIFY `filterId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=160;

--
-- AUTO_INCREMENT for table `Headers`
--
ALTER TABLE `Headers`
  MODIFY `headerId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT for table `History_Cards`
--
ALTER TABLE `History_Cards`
  MODIFY `historyId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=104;

--
-- AUTO_INCREMENT for table `History_Headers`
--
ALTER TABLE `History_Headers`
  MODIFY `historyId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `History_Items`
--
ALTER TABLE `History_Items`
  MODIFY `historyId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=750;

--
-- AUTO_INCREMENT for table `History_Pages`
--
ALTER TABLE `History_Pages`
  MODIFY `historyId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `Icons`
--
ALTER TABLE `Icons`
  MODIFY `iconType` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `Items`
--
ALTER TABLE `Items`
  MODIFY `itemId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6529;

--
-- AUTO_INCREMENT for table `Notifications`
--
ALTER TABLE `Notifications`
  MODIFY `notificationId` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `Pages`
--
ALTER TABLE `Pages`
  MODIFY `pageId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- AUTO_INCREMENT for table `Quick_Titles`
--
ALTER TABLE `Quick_Titles`
  MODIFY `titleId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `Requests`
--
ALTER TABLE `Requests`
  MODIFY `requestId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `Request_Comments`
--
ALTER TABLE `Request_Comments`
  MODIFY `commentId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `Request_Objects`
--
ALTER TABLE `Request_Objects`
  MODIFY `requestObjectId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `Sources`
--
ALTER TABLE `Sources`
  MODIFY `sourceId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `Sponsors`
--
ALTER TABLE `Sponsors`
  MODIFY `sponsorId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `userId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- AUTO_INCREMENT for table `Views`
--
ALTER TABLE `Views`
  MODIFY `viewId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Cards`
--
ALTER TABLE `Cards`
  ADD CONSTRAINT `header_fk` FOREIGN KEY (`headerId`) REFERENCES `Headers` (`headerId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_card_fk` FOREIGN KEY (`userId`) REFERENCES `Users` (`userId`);

--
-- Constraints for table `Categories`
--
ALTER TABLE `Categories`
  ADD CONSTRAINT `user_category_fk` FOREIGN KEY (`userId`) REFERENCES `Users` (`userId`);

--
-- Constraints for table `Filters`
--
ALTER TABLE `Filters`
  ADD CONSTRAINT `headerId_filter_fk` FOREIGN KEY (`headerId`) REFERENCES `Headers` (`headerId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `viewId_filter_fk` FOREIGN KEY (`viewId`) REFERENCES `Views` (`viewId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Headers`
--
ALTER TABLE `Headers`
  ADD CONSTRAINT `page_fk` FOREIGN KEY (`pageId`) REFERENCES `Pages` (`pageId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_header_fk` FOREIGN KEY (`userId`) REFERENCES `Users` (`userId`);

--
-- Constraints for table `History_Items`
--
ALTER TABLE `History_Items`
  ADD CONSTRAINT `history_card_item_fk` FOREIGN KEY (`parentId`) REFERENCES `History_Cards` (`historyId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Items`
--
ALTER TABLE `Items`
  ADD CONSTRAINT `card_fk` FOREIGN KEY (`cardId`) REFERENCES `Cards` (`cardId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `iconId_fk` FOREIGN KEY (`iconType`) REFERENCES `Icons` (`iconType`);

--
-- Constraints for table `Pages`
--
ALTER TABLE `Pages`
  ADD CONSTRAINT `category_fk` FOREIGN KEY (`pageType`) REFERENCES `Categories` (`categoryId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_page_fk` FOREIGN KEY (`userId`) REFERENCES `Users` (`userId`);

--
-- Constraints for table `Request_Comments`
--
ALTER TABLE `Request_Comments`
  ADD CONSTRAINT `comment_request_fk` FOREIGN KEY (`requestId`) REFERENCES `Requests` (`requestId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Request_Objects`
--
ALTER TABLE `Request_Objects`
  ADD CONSTRAINT `request_object_fk` FOREIGN KEY (`requestId`) REFERENCES `Requests` (`requestId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Sources`
--
ALTER TABLE `Sources`
  ADD CONSTRAINT `sources_pages_fk` FOREIGN KEY (`pageId`) REFERENCES `Pages` (`pageId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Temp_Cards`
--
ALTER TABLE `Temp_Cards`
  ADD CONSTRAINT `fk_tempCard` FOREIGN KEY (`tempCardId`) REFERENCES `Cards` (`cardId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_user_tempCard` FOREIGN KEY (`tempUserId`) REFERENCES `Users` (`userId`);

--
-- Constraints for table `Temp_Headers`
--
ALTER TABLE `Temp_Headers`
  ADD CONSTRAINT `fk_tempHeader` FOREIGN KEY (`tempHeaderId`) REFERENCES `Headers` (`headerId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_user_tempHeader` FOREIGN KEY (`tempUserId`) REFERENCES `Users` (`userId`);

--
-- Constraints for table `Temp_Pages`
--
ALTER TABLE `Temp_Pages`
  ADD CONSTRAINT `fk_tempPage` FOREIGN KEY (`tempPageId`) REFERENCES `Pages` (`pageId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_user_tempPage` FOREIGN KEY (`tempUserId`) REFERENCES `Users` (`userId`);

--
-- Constraints for table `Views`
--
ALTER TABLE `Views`
  ADD CONSTRAINT `pageId_view_fk` FOREIGN KEY (`pageId`) REFERENCES `Pages` (`pageId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `userId_view_fk` FOREIGN KEY (`userId`) REFERENCES `Users` (`userId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
