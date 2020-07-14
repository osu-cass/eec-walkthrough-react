-- phpMyAdmin SQL Dump
-- version 4.9.4
-- https://www.phpmyadmin.net/
--
-- Host: engr-db.engr.oregonstate.edu:3307
-- Generation Time: Jul 14, 2020 at 12:22 AM
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
(30, 3, 0, 30, 'Test', 42, '2020-06-23 05:53:07', 1),
(47, 16, 0, 80, 'Engines', 42, '2020-06-30 06:58:38', 1),
(49, 18, 0, 60, 'Environment', 42, '2020-06-30 06:11:14', 1),
(59, 23, 0, 59, 'Cheap Brands', 42, '2020-06-23 05:51:09', 1),
(60, 18, 0, 49, 'Some Links', 42, '2020-06-18 17:38:20', 1),
(64, 21, 0, 64, 'Lorem ipsum dolor', 42, '2020-06-23 05:50:47', 0),
(65, 17, 0, 65, 'Signs of Turbulence', 42, '2020-06-23 05:55:59', 0),
(66, 4, 10, 66, 'Facilisis volutpat est velit egestas.', 42, '2020-06-23 09:22:49', 1),
(67, 16, 1, 67, 'More Airplanes', 42, '2020-06-23 09:14:09', 1),
(68, 27, 1, 69, 'Plywood Images', 42, '2020-06-23 22:18:31', 1),
(69, 27, 0, 68, 'Plywood Info', 42, '2020-06-23 09:20:59', 1),
(70, 3, 0, 70, 'Boiler Facts', 42, '2020-06-23 09:26:47', 0),
(72, 1, 1, 72, 'Gallery: Industrial Air Compressors, Dryers, Receiver Tanks and Compressed Air Applications', 51, '2020-07-01 20:56:20', 1),
(73, 3, 1, 73, 'Image Gallery Test', 51, '2020-06-27 20:12:51', 0),
(74, 3, 0, 74, 'U.S.DOE Energy Tip Sheets', 51, '2020-06-27 20:45:48', 1),
(75, 1, 0, 75, 'U.S. Department of Energy Tip Sheets', 42, '2020-06-30 06:38:25', 1),
(76, 1, 0, 76, 'General Off Site Resource Links', 51, '2020-06-29 20:51:39', 1),
(77, 2, 0, 77, 'Improve Compressor Efficiency', 56, '2020-07-03 00:20:51', 1),
(80, 16, 0, 47, 'New Card', 42, '2020-06-30 20:59:15', 1),
(81, 29, 0, 81, 'Pros', 51, '2020-07-01 18:14:32', 0),
(82, 30, 0, 82, 'Use More Efficient Pump Control', 55, '2020-07-01 18:19:29', 0),
(83, 30, 0, 83, 'Reduce Flow Required', 51, '2020-07-01 21:21:37', 0),
(84, 30, 0, 84, 'Reduce Head Required', 51, '2020-07-01 21:28:45', 0),
(85, 30, 0, 85, 'Improve Pump Efficiency', 51, '2020-07-01 21:42:32', 0),
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
(111, 33, 0, 111, 'Charts, Tables, Figures', 56, '2020-07-02 23:15:52', 0),
(112, 33, 0, 112, 'Standard Data to Collect', 51, '2020-07-02 23:17:15', 0),
(113, 33, 0, 113, 'Data Collection Equipment', 51, '2020-07-02 23:21:12', 0),
(114, 33, 0, 114, 'Data Collection Guides', 56, '2020-07-02 23:29:16', 0),
(115, 33, 0, 115, 'Analysis Tools', 56, '2020-07-02 23:33:30', 0),
(116, 33, 0, 116, 'In Depth Site Resources', 56, '2020-07-02 23:44:26', 0),
(117, 33, 0, 117, 'Off Site Resource Links', 56, '2020-07-02 23:47:53', 0),
(118, 28, 0, 118, 'Motor Controls', 56, '2020-07-03 00:08:01', 1),
(119, 28, 0, 119, 'Turn of Motors (Consider Load Shedding)', 51, '2020-07-07 23:38:14', 1),
(120, 28, 0, 120, 'Power Quality', 56, '2020-07-03 00:19:36', 1),
(121, 18, 10, 121, 'A new internal card', 42, '2020-07-07 02:04:39', 1),
(122, 29, 0, 122, 'Cons', 55, '2020-07-07 17:54:57', 0),
(123, 29, 0, 123, 'General Off Site Resource Links', 55, '2020-07-07 18:00:00', 0),
(124, 29, 0, 124, 'U.S. Department of Energy Tip Sheets', 55, '2020-07-07 20:31:56', 0),
(125, 29, 0, 125, 'Figures, Charts, and Tables', 55, '2020-07-07 20:33:57', 0),
(126, 37, 0, 126, 'Common Technologies Used in Wastewater (covered elsewhere in this guide)', 51, '2020-07-07 20:57:07', 0),
(127, 18, 0, 127, '3', 42, '2020-07-07 21:21:54', 0),
(128, 18, 10, 128, 'eoowerwerwer', 42, '2020-07-07 21:23:36', 1),
(129, 40, 0, 129, 'Heat Exchangers', 58, '2020-07-10 18:20:49', 0),
(130, 40, 0, 130, 'Insulation', 58, '2020-07-10 18:36:22', 0),
(131, 40, 0, 131, 'Cooling Towers', 58, '2020-07-10 18:45:42', 0);

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
(3, 1, 3, 'Boilers', 0, 51, '2020-05-22 21:22:38', 1),
(4, 3, 4, 'Refrigeration', 0, 42, '2020-05-22 21:22:38', 1),
(16, 25, 17, 'Engine Info', 0, 51, '2020-06-16 09:03:41', 1),
(17, 25, 18, 'Turbulence', 0, 47, '2020-06-09 18:51:20', 1),
(18, 25, 16, 'Economics', 0, 47, '2020-06-09 18:56:36', 1),
(21, 27, 21, 'General Info about Air', 0, 42, '2020-06-12 00:11:28', 1),
(23, 26, 23, 'Types of Air Conditioners', 0, 42, '2020-06-16 09:13:15', 1),
(27, 4, 27, 'Plywood Images', 0, 42, '2020-06-23 09:18:19', 1),
(28, 44, 33, 'Motor Opportunities to Consider', 0, 56, '2020-06-29 23:07:40', 1),
(29, 45, 29, 'Pumps Overview', 0, 51, '2020-07-01 18:13:15', 0),
(30, 45, 30, 'Pumping Opportunities to Consider', 0, 51, '2020-07-01 18:15:04', 0),
(31, 46, 31, 'Boilers and Steam Overview', 0, 56, '2020-07-02 19:43:04', 1),
(32, 46, 32, 'Boiler and Steam System Opportunities to Consider', 0, 56, '2020-07-02 21:40:38', 1),
(33, 44, 28, 'Motors Overview', 0, 56, '2020-07-02 23:12:01', 1),
(34, 47, 34, 'Thermal Systems Overview', 0, 58, '2020-07-03 03:41:29', 0),
(35, 25, 35, 'Air Header Test', 0, 42, '2020-07-07 02:15:51', 1),
(36, 50, 36, 'Wastewater Overview', 0, 51, '2020-07-07 20:49:35', 0),
(37, 50, 37, 'Wastewater Technologies Consider', 0, 51, '2020-07-07 20:50:10', 0),
(38, 50, 38, 'Wastewater Opportunities to Consider2', 0, 51, '2020-07-07 20:52:27', 0),
(40, 47, 40, 'Thermal Systems Opportunities to Consider', 0, 58, '2020-07-10 17:59:49', 0);

-- --------------------------------------------------------

--
-- Table structure for table `Home`
--

CREATE TABLE `Home` (
  `mainHeader` varchar(1000) NOT NULL,
  `secondaryHeader` varchar(1000) NOT NULL,
  `sectionsTitle` varchar(1000) NOT NULL,
  `assessments` varchar(1000) NOT NULL,
  `industries` varchar(1000) NOT NULL,
  `processes` varchar(1000) NOT NULL,
  `productivity` varchar(1000) NOT NULL,
  `technologies` varchar(1000) NOT NULL,
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

INSERT INTO `Home` (`mainHeader`, `secondaryHeader`, `sectionsTitle`, `assessments`, `industries`, `processes`, `productivity`, `technologies`, `sectionsFooter`, `tidbitsHeader`, `tidbitsTitle`, `tidbitsFooter`, `linksHeader`, `linksTitlePrefix`, `linksTitlePostfixInternal`, `linksTitlePostfixDownload`, `linksFooter`, `disclaimerHeader`, `disclaimerText`) VALUES
('Welcome to the Industrial Walkthrough Checklist & Reference!', 'This purpose of this guide is to provide users with an easily accessible reference of common efficiency improvement opportunities to look for in an industrial facility.', 'This guide is broken down into sections:', 'An introduction to a method for evaluating or estimating.', 'An overview of the industry is followed by a list of common related subjects.', 'An introduction to a process or technique.', 'An introduction to a specific improvement opportunity to consider.', 'An introduction to an industrial technology.', '', 'Each section includes a number of useful pertinent \"tidbits\" identified by a preceding icon', 'These include', 'Note: \"tidbit\" types can be toggled between \"hidden\" and \"unhidden\" by clicking the icon in the header bars of each section.', 'Each section also references in depth learning resources that offer deeper information about the topic. These are identified by a pair of icons', 'A preceding icon identifies the type of learning resource offered', 'A trailing icon identifies the learning resource as internal or external', 'A second trailing icon will indicate when the learning resource is a download', '', 'Disclaimer', 'The primary objective of the OSU EEC is to promote energy efficiency, waste minimization, and productivity in the industrial, commercial, agricultural, and residential sectors. A key strategy has included performance of energy and efficiency site assessments. This work is intended is to provide background and tools that will be helpful in identifying and evaluating potential opportunities.\r\n\r\nWe believe Industrial Walkthrough Checklist & Reference to be a reasonably accurate representation of opportunities to reduce energy use, lower waste generation, and make production practices more efficient. However, the OSU EEC cannot guarantee the accuracy, completeness, or usefulness of the information contained on this website, nor assume any liability for damages resulting from the use of any information, equipment, method or process disclosed on this website.\r\n\r\nPollution prevention recommendations are not intended to deal with the issue of compliance with applicable environmental regulations. Questions regarding compliance should be addressed to either a reputable consulting engineering firm experienced with environmental regulations or to the appropriate regulatory agency. Clients are encouraged to develop positive working relationships with regulators so that compliance issues can be addressed and resolved.\r\n\r\nThe assumptions and equations used to arrive at energy, waste, productivity, and cost savings for the opportunities are presented on this website. We believe the assumptions to be conservative. If you would like to revise the assumptions you may follow the calculation methodologies presented using adjusted assumptions to develop your own revised estimates of energy, waste, productivity, and cost savings.\r\n\r\nPlease feel welcome to contact the OSU EEC if you would like to discuss the content of this website or if you have another question about energy use or pollution prevention.');

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
  `created` timestamp NULL DEFAULT current_timestamp(),
  `approved` tinyint(3) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Items`
--

INSERT INTO `Items` (`itemId`, `cardId`, `orderIndex`, `indentation`, `iconType`, `contentText`, `contentUrl`, `contentLabel`, `contentMode`, `created`, `approved`) VALUES
(7, 3, 1, 0, 20, '', 'https://i.imgur.com/V0dkW5l.png', 'Screw compressor power vs output for various control strategies', 0, '2020-06-17 17:09:09', 1),
(25, 9, 1, 0, 1, 'Versatile. Offers compact energy density. ', '', '', 0, '2020-06-02 22:38:04', 1),
(26, 9, 1, 0, 1, 'Spark free for potentially explosive environments', '', '', 0, '2020-06-10 03:40:29', 1),
(28, 16, 1, 0, 4, 'Take care to avoid potential dangerous air injection associated with directing compressed air flow directly onto skin', '', '', 0, '2020-05-23 22:30:55', 1),
(29, 17, 1, 0, 7, 'Looped distribution systems can help maintain uniform pressure throughout a compressed air system.', '', '', 0, '2020-05-23 22:30:57', 1),
(30, 17, 2, 0, 7, 'Well sized compressed air lines reduce pressure loss', '', '', 0, '2020-05-23 22:30:58', 1),
(31, 17, 3, 0, 7, 'A well designed compressed air system should typically have a maximum 10 PSI pressure drop in delivering air to at any end-use in the system', '', '', 0, '2020-05-23 22:31:00', 1),
(32, 13, 1, 0, 2, 'Extremely energy intensive. ', '', '', 0, '2020-05-23 22:52:18', 1),
(33, 18, 1, 0, 3, 'Expect a 1% drop in compressor energy and cost per 2 PSI in compressor outlet pressure drop', '', '', 0, '2020-06-10 03:40:49', 1),
(34, 18, 1, 0, 3, '85 PSI is the standard required minimum inlet pressure for most common industrial pneumatic equipment', '', '', 0, '2020-06-10 03:40:49', 1),
(36, 18, 1, 0, 3, '80 to 90% of energy for compressed air is lost as heat', '', '', 0, '2020-06-10 03:40:49', 1),
(37, 19, 1, 0, 8, 'Use a pressure gage with standard quick connects typically used in compressed air lines to diagnose line pressure drops', '', '', 0, '2020-05-23 22:33:25', 1),
(43, 13, 1, 0, 2, 'Function provided can often be replace with significantly lower power approach.', '', '', 0, '2020-06-09 19:50:02', 1),
(160, 60, 1, 0, 17, 'This is an internal resource. The link connects to some resource at OSU. We are not worried about this being a dead link.', 'http://placekitten.com/300/300', 'Some Link', 0, '2020-06-18 17:37:19', 1),
(161, 60, 2, 0, 17, 'This is an external resource. We worry that it might be a dead link, so we want to track the date.', 'http://placekitten.com/500/500', 'Another Link', 1, NULL, 1),
(162, 9, 1, 0, 1, 'Can be used as an easy quick fix for many issues', '', '', 0, '2020-06-22 19:18:35', 1),
(163, 9, 1, 0, 1, 'Familiar utility for industrial personnel', '', '', 0, '2020-06-22 19:18:36', 1),
(164, 9, 1, 0, 1, 'A single mechanical energy input at the compressor can be distributed throughout a facility. ', '', '', 0, '2020-06-22 19:18:36', 1),
(165, 18, 4, 0, 3, 'Over 5 HP of electrical power is required for each 1 HP of compressed air power', '', '', 0, '2020-06-22 19:21:00', 1),
(166, 19, 1, 0, 8, 'Determine the leak load by checking compressor output when there is no productive air use', '', '', 0, '2020-06-22 19:29:30', 1),
(191, 64, 1, 0, 1, 'Lorem ipsum dolor sit amet', '', '', 0, '2020-06-23 05:50:48', 0),
(192, 64, 1, 0, 1, 'Facilisis volutpat est velit egestas.', '', '', 0, '2020-06-23 05:50:48', 0),
(194, 59, 1, 0, 20, '', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQotWb6qWsAky6knQEWv1tYmhJn3iXJOzXliagMoEDeTkgLwucE&usqp=CAU', 'AC1', 0, '2020-06-23 05:51:09', 1),
(195, 59, 1, 0, 20, '', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQBhnfIntaYkvfxgPDkqPcFzVMXih4gRj4Gv_HEJY8sxU6kCJgbb-J4GxbhmWKQtb3tKWtt5XVG&usqp=CAc', 'AC2', 0, '2020-06-23 05:51:09', 1),
(196, 59, 1, 0, 20, '', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRrLtOorN06C4SPJapwT-0YPq06ZNlXUEdEhdC1OmNZY8ccvB0h&usqp=CAU', 'AC3', 0, '2020-06-23 05:51:09', 1),
(197, 30, 1, 0, 20, '', 'https://www.hurstboiler.com/images2/series-300_shrink.png', 'Boiler Picture', 0, '2020-06-23 05:53:07', 1),
(198, 30, 1, 0, 2, 'Lectus mauris ultrices eros in cursus.', '', '', 0, '2020-06-23 05:53:07', 1),
(199, 30, 1, 0, 17, 'Hurst Series 300', 'https://www.hurstboiler.com/boilers/scotch_marine/series_300', 'Big boiler link', 1, '2020-06-27 20:48:34', 1),
(208, 65, 1, 0, 4, 'Eu consequat ac felis donec et odio.', '', '', 0, '2020-06-23 05:55:59', 0),
(245, 67, 1, 0, 20, '', 'https://image.shutterstock.com/image-photo/commercial-airplane-flying-above-clouds-600w-553131187.jpg', 'Sunset', 0, '2020-06-23 09:14:37', 1),
(246, 67, 1, 0, 20, '', 'https://image.shutterstock.com/image-photo/white-passenger-plane-climbs-through-600w-523950889.jpg', 'Up', 0, '2020-06-23 09:14:37', 1),
(247, 67, 1, 0, 20, '', 'https://image.shutterstock.com/image-vector/flat-airplane-illustration-view-flying-600w-443359132.jpg', 'Cartoon', 0, '2020-06-23 09:14:37', 1),
(248, 67, 1, 0, 20, '', 'https://image.shutterstock.com/image-photo/beautiful-scenic-city-view-sunset-600w-766500919.jpg', 'Window Seat', 0, '2020-06-23 09:14:37', 1),
(259, 69, 1, 0, 15, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', '', '', 0, '2020-06-23 09:20:59', 1),
(263, 69, 1, 0, 11, 'Pretium lectus quam id leo in vitae turpis massa. Placerat vestibulum lectus mauris ultrices eros in cursus turpis.', '', '', 0, '2020-06-23 09:21:00', 1),
(271, 70, 1, 0, 15, 'Pretium lectus quam id leo in vitae turpis massa.', '', '', 0, '2020-06-23 09:26:47', 0),
(294, 59, 1, 0, 20, '', 'http://placekitten.com/200/300', 'AC Cat 1', 0, '2020-06-23 21:08:22', 0),
(295, 59, 1, 0, 20, '', 'http://placekitten.com/300/200', 'AC Cat 2', 0, '2020-06-23 21:08:22', 0),
(296, 59, 1, 0, 20, '', 'http://placekitten.com/1200/500', 'AC Cat 3', 0, '2020-06-23 21:08:22', 0),
(297, 59, 1, 0, 20, '', 'http://placekitten.com/200/300', 'AC Cat 4', 0, '2020-06-23 21:08:22', 0),
(298, 59, 1, 0, 20, '', 'http://placekitten.com/700/800', 'AC Cat 5', 0, '2020-06-23 21:08:22', 0),
(299, 59, 1, 0, 20, '', 'http://placekitten.com/400/400', 'AC Cat 6', 0, '2020-06-23 21:08:22', 0),
(300, 59, 1, 0, 20, '', 'http://placekitten.com/800/800', 'AC Cat 7', 0, '2020-06-23 21:08:22', 0),
(301, 59, 1, 0, 20, '', 'http://placekitten.com/2000/1500', 'AC Cat 8', 0, '2020-06-23 21:08:22', 0),
(302, 59, 1, 0, 20, '', 'http://placekitten.com/5000/5000', 'AC Cat 9', 0, '2020-06-23 21:08:22', 0),
(303, 59, 1, 0, 20, '', 'http://placekitten.com/1500/2000', 'AC Cat 10', 0, '2020-06-23 21:08:22', 0),
(304, 59, 1, 0, 20, '', 'http://placekitten.com/200/200', 'AC Cat 11', 0, '2020-06-23 21:08:22', 0),
(305, 59, 1, 0, 20, '', 'http://placekitten.com/500/1200', 'AC Cat 12', 0, '2020-06-23 21:08:22', 0),
(313, 68, 1, 0, 20, '', 'https://image.shutterstock.com/image-photo/plywood-boards-on-furniture-industry-600w-439702138.jpg', 'Plywood A', 0, '2020-06-23 22:18:31', 1),
(314, 68, 1, 0, 20, '', 'https://image.shutterstock.com/image-photo/high-resolution-plywood-board-wall-600w-1054866629.jpg', 'Plywood B', 0, '2020-06-23 22:18:31', 1),
(315, 68, 1, 0, 20, '', 'https://image.shutterstock.com/image-photo/closeup-plywood-sheets-600w-737467363.jpg', 'Plywood C', 0, '2020-06-23 22:18:31', 1),
(316, 68, 1, 0, 20, '', 'https://image.shutterstock.com/image-photo/plywood-industry-construction-parts-cuttings-600w-1236143197.jpg', 'Plywood D', 0, '2020-06-23 22:18:31', 1),
(317, 68, 1, 0, 20, '', 'https://image.shutterstock.com/image-photo/warehouse-fiberboard-chipboard-construction-materials-600w-1035511318.jpg', 'Plywood E', 0, '2020-06-23 22:18:31', 1),
(318, 68, 1, 0, 20, '', 'https://image.shutterstock.com/image-photo/plywood-residential-building-materials-600w-1005863455.jpg', 'Plywood F', 0, '2020-06-23 22:18:31', 1),
(327, 73, 1, 0, 20, '', 'https://live.staticflickr.com/3821/13183445925_e4cab33b53_h.jpg', 'Wood fired boiler', 0, '2020-06-27 20:42:02', 0),
(337, 74, 1, 0, 17, 'See steam system sheets', 'https://www.energy.gov/eere/amo/tip-sheets-system', 'U.S.DOE Energy Tip Sheets by System', 1, '2020-06-27 20:57:47', 1),
(338, 74, 1, 0, 17, '.', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam15_benchmark.pdf', 'Benchmark the Fuel Cost of Steam Generation', 1, '2020-06-27 20:57:47', 1),
(339, 74, 1, 0, 17, '.', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam7_surfaces.pdf', 'Clean Firetube Boiler Waterside Heat Transfer Surfaces', 1, '2020-06-27 20:57:48', 1),
(383, 76, 1, 0, 17, 'This sourcebook is designed to provide compressed air system users with a reference that outlines opportunities for system performance improvements.', 'https://www.compressedairchallenge.org/data/sites/1/media/library/sourcebook/Improving_Compressed_Air-Sourcebook.pdf', 'Improving Compressed Air System Performance. A Sourcebook for Industry.  Third Edition. U.S.DOE', 1, '2020-06-29 21:22:31', 1),
(384, 76, 1, 0, 17, 'MEASUR is open source software that consists of the following DOE legacy energy system assessment tools (updated): Pumping System Assessment Tool (PSAT), Process Heating Assessment and Survey Tool (PHAST), Fan System Assessment Tool (FSAT), Steam System Assessment Tool (SSAT)/ Steam System Modeler (SSMT), AIRMaster+ (Last accessed 12/2/2019)   ', 'https://www.energy.gov/eere/amo/measur', 'U.S. Department of Energy MEASUR analysis tool', 1, '2020-06-29 20:55:45', 1),
(385, 76, 1, 0, 17, 'An informational page with analysis tools, case studies, tip sheets, and checklists', 'https://www.bpa.gov/EE/Sectors/Industrial/Pages/Compressed-Air.aspx', 'Bonneville Power Administration Compressed Air Page', 1, '2020-06-29 20:55:45', 1),
(621, 49, 0, 0, 2, 'Uses a lot of fossil fuels', '', '', 0, '2020-06-30 06:11:15', 1),
(622, 49, 0, 1, 4, 'Hurts birds', '', '', 0, '2020-06-30 06:11:15', 1),
(623, 49, 0, 2, 5, 'Uses a lot of steel', '', '', 0, '2020-06-30 06:11:15', 1),
(637, 75, 0, 0, 17, 'See compressed air tip sheets', 'https://www.energy.gov/eere/amo/tip-sheets-system', 'U.S.DOE Energy Tip Sheets by System', 1, '2020-07-01 00:33:10', 1),
(638, 75, 0, 0, 17, '$empty', 'https://www.energy.gov/sites/prod/files/2014/05/f16/compressed_air11.pdf', 'Alternative Strategies for Low-Pressure End Uses', 1, '2020-06-30 06:38:26', 1),
(639, 75, 0, 0, 17, '$empty', 'https://www.energy.gov/sites/prod/files/2014/05/f16/compressed_air4.pdf', 'Analyzing Your Compressed Air System', 1, '2020-06-30 06:38:26', 1),
(667, 47, 0, 0, 5, 'Jet fuel is flammable', '', '', 0, '2020-06-30 09:33:41', 1),
(668, 47, 0, 1, 4, 'Be careful', '', '', 0, '2020-06-30 09:33:41', 1),
(669, 47, 0, 2, 20, '', 'https://blog.klm.com/assets/uploads/2018/12/Jet-engine-KLM-768x510.jpg', 'KLM Jet Engine', 0, '2020-06-30 09:33:41', 1),
(670, 47, 0, 0, 24, 'Learn more about Jet Engines', 'https://en.wikipedia.org/wiki/Jet_engine', 'Wikipedia - Jet Engines', 1, '2020-06-30 09:33:41', 1),
(687, 80, 0, 0, 15, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '', '', 0, '2020-06-30 20:59:15', 1),
(688, 80, 0, 1, 13, 'Nulla suscipit enim aliquet turpis iaculis accumsan.', '', '', 0, '2020-06-30 20:59:15', 1),
(689, 80, 0, 1, 13, 'Aliquam scelerisque tellus nec lectus blandit condimentum.', '', '', 0, '2020-06-30 20:59:15', 1),
(690, 80, 0, 1, 13, 'Sed laoreet ligula eget accumsan auctor.', '', '', 0, '2020-06-30 20:59:15', 1),
(695, 47, 0, 0, 5, 'Jet fuel is flammable', '', '', 0, '2020-07-01 00:34:18', 0),
(696, 47, 0, 1, 4, 'Be careful', '', '', 0, '2020-07-01 00:34:18', 0),
(697, 47, 0, 2, 20, '', 'https://blog.klm.com/assets/uploads/2018/12/Jet-engine-KLM-768x510.jpg', 'KLM Jet Engine', 0, '2020-07-01 00:34:18', 0),
(698, 47, 0, 0, 24, 'Learn more about Jet Engines', 'https://en.wikipedia.org/wiki/Jet_engine', 'Wikipedia - Jet Engines', 2, '2020-07-01 00:34:18', 0),
(733, 81, 0, 0, 1, 'Centrifugal pumps are capable of developing a wide range of flow and pressures', '', '', 0, '2020-07-01 18:14:32', 0),
(779, 72, 0, 0, 20, '', 'https://live.staticflickr.com/65535/50066459491_bb3c3291c5_b.jpg', 'Dry sprinkler systems need compressed air', 0, '2020-07-01 21:19:36', 1),
(780, 72, 0, 0, 20, '', 'https://live.staticflickr.com/65535/50065906203_65746ac38f_b.jpg', 'Blow off wand and hose', 0, '2020-07-01 21:19:36', 1),
(781, 72, 0, 0, 20, '', 'https://live.staticflickr.com/65535/50065907458_f8a2a9a7e0_b.jpg', 'Air Motors used to mix paint can be replaced with explosion proof electric motors', 0, '2020-07-01 21:19:36', 1),
(782, 72, 0, 0, 20, '', 'https://live.staticflickr.com/65535/50066721727_a6607851c0_b.jpg', 'Compressed Air Receiver Tank', 0, '2020-07-01 21:19:36', 1),
(783, 72, 0, 0, 20, '', 'https://live.staticflickr.com/65535/50065907313_a2869ef070_b.jpg', 'Industrial Screw Compressor', 0, '2020-07-01 21:19:36', 1),
(784, 72, 0, 0, 20, '', 'https://live.staticflickr.com/65535/50065907073_1a989d028d_b.jpg', 'Compressed Air Receiver Tamk', 0, '2020-07-01 21:19:36', 1),
(785, 72, 0, 0, 20, '', 'https://live.staticflickr.com/65535/50065907213_978efa0976_b.jpg', 'Blow off wands with and without engineered nozzles', 0, '2020-07-01 21:19:36', 1),
(786, 72, 0, 0, 20, '', 'https://live.staticflickr.com/65535/50066720932_da2c3b0b6c_b.jpg', 'Small reciprocating industrial air compressor', 0, '2020-07-01 21:19:36', 1),
(787, 72, 0, 0, 20, '', 'https://live.staticflickr.com/65535/50065907503_d75eb615cf_b.jpg', 'Desiccant compressed air dryer ', 0, '2020-07-01 21:19:36', 1),
(788, 72, 0, 0, 20, '', 'https://live.staticflickr.com/65535/50066722032_f62637039d_b.jpg', 'Compressed Air Receiver Tank', 0, '2020-07-01 21:19:36', 1),
(789, 72, 0, 0, 20, '', 'https://live.staticflickr.com/65535/50065907438_e7f7d53ba4_b.jpg', 'Refrigerated compressed air dryer', 0, '2020-07-01 21:19:36', 1),
(827, 83, 0, 0, 11, 'Eliminate Overflow \"Control\" on Tanks', '', '', 0, '2020-07-01 21:45:09', 0),
(828, 83, 0, 0, 11, 'Look for Opportunity to Reduced Defined Flow Requirements', '', '', 0, '2020-07-01 21:45:09', 0),
(834, 85, 0, 0, 11, 'Trim Pump Impeller for Better Efficiency at Typical Operating Points', '', '', 0, '2020-07-01 21:47:56', 0),
(835, 85, 0, 0, 11, 'Replace Pump with One Selected for Optimum Efficiency at Typical Operating Points', '', '', 0, '2020-07-01 21:47:56', 0),
(836, 85, 0, 0, 11, 'Replace or Overhaul Worn or Damaged Pumps', '', '', 0, '2020-07-01 21:47:56', 0),
(842, 84, 0, 0, 11, 'Reduce Line Losses (Larger Diameter Pipes, etc)', '', '', 0, '2020-07-01 21:53:17', 0),
(843, 84, 0, 0, 11, 'Use \"Least Closed Valve\" Strategy on Pumping Networks Serving Multiple End Points.', '', '', 0, '2020-07-01 21:53:17', 0),
(844, 84, 0, 0, 11, 'Eliminate or Reduce Fluid \"Free Fall\" at Discharge Point.', '', '', 0, '2020-07-01 21:53:17', 0),
(1101, 86, 0, 0, 11, 'Turn compressor(s) off when not needed - nights weekends etc	', '', '', 0, '2020-07-01 22:24:57', 1),
(1102, 86, 0, 0, 11, 'Serve low volume around the clock  requirement with separate smaller system', '', '', 0, '2020-07-01 22:24:57', 1),
(1103, 87, 0, 0, 11, 'Replace refrigerated compressed air dryer with more efficient refrigerated compressed air dryer', '', '', 0, '2020-07-01 22:28:10', 1),
(1104, 87, 0, 0, 11, 'Capture heat rejected by air compressors', '', '', 0, '2020-07-01 22:28:10', 1),
(1151, 29, 0, 0, 17, 'This guide focuses mainly on screw and reciprocating compressors. These are the most common types of compressors used in the northwest. Other types of compressors such as rotary vane, centrifugal, lobe and radial compressors are much less common and are only introduced in this guide.', 'https://drive.google.com/file/d/12Co0C6JBK5CqoYhZQBcD0VX6JVBXy86o/view', 'Assessing Industrial Air Compressors', 0, '2020-07-01 22:33:14', 1),
(1152, 29, 0, 0, 17, 'A short slideshow of common industrial compressed air equipment and applicatons', 'https://docs.google.com/presentation/d/1khB1tPIND-ooBy1yCCL-rDf09Gf4Q8nr/edit#slide=id.p7', 'Industrial Compressed Air (a slideshow)', 0, '2020-07-01 22:33:14', 1),
(1312, 8, 0, 0, 8, 'Reduced air pressure not only reduces air compressor energy required for a set volume of air, it will also result in less air volume consumed by leaks and unregulated air uses (although it can be hard to estimate the volume reduction).\r\n', '', '', 0, '2020-07-02 17:49:40', 1),
(1313, 8, 0, 0, 3, 'Expect a 1% drop in compressor energy and cost per 2 PSI in compressor outlet pressure drop (for standard nominal ~100 PSI range systems)', '', '', 0, '2020-07-02 17:49:40', 1),
(1314, 8, 0, 0, 11, 'Reduce compressed air system pressure to the 95-100 PSI range.', '', '', 0, '2020-07-02 17:49:40', 1),
(1315, 8, 0, 1, 10, 'System pressure is set over 100 PSI for a compressed air system serving standard industrial utilities and controls.\r\n', '', '', 0, '2020-07-02 17:49:40', 1),
(1316, 8, 0, 1, 8, 'Check end use requirements. Most equipment requires ~ 85 PSI. Allowing for a 10 PSI system distribution pressure drop should allow the minimum pressure to be set for 95 PSI	', '', '', 0, '2020-07-02 17:49:40', 1),
(1317, 8, 0, 1, 8, 'Try incrementally dropping pressure while checking to ensure no production issues occur', '', '', 0, '2020-07-02 17:49:40', 1),
(1318, 8, 0, 1, 15, 'Set up data loggers to collect compressor power over time ', '', '', 0, '2020-07-02 17:49:40', 1),
(1319, 8, 0, 1, 15, 'Collect pressure settings: current and proposed', '', '', 0, '2020-07-02 17:49:40', 1),
(1320, 8, 0, 1, 17, 'An OSU EEC Analysis Template in Microsoft Excel Format', 'https://drive.google.com/open?id=1ZrFL3Cc2rmiRL-lkODnqn4smkZo7BiRX', 'Analysis Template: Reduce Compressed Air Pressure ', 2, '2020-07-02 17:49:40', 1),
(1321, 8, 0, 1, 12, 'Reduce line pressure losses in compressed air distribution system:', '', '', 0, '2020-07-02 17:49:40', 1),
(1322, 8, 0, 2, 10, 'Pressure drops more than 10 PSI from the compressor to any location at any time (particularly remote locations or near shorter duration high volume uses)?', '', '', 0, '2020-07-02 17:49:40', 1),
(1323, 8, 0, 2, 8, 'Pay close attention to oil filters, complex fittings, poor takeoffs, and bottlenecked and overly small pipe diameters', '', '', 0, '2020-07-02 17:49:40', 1),
(1324, 8, 0, 2, 8, 'Critically evaluate regulator placement (and settings)	', '', '', 0, '2020-07-02 17:49:40', 1),
(1325, 8, 0, 1, 12, 'Add receivers close to equipment with periodic high volume air uses (that might be creating local pressure drops).', '', '', 0, '2020-07-02 17:49:40', 1),
(1326, 8, 0, 2, 10, 'Local pressure drops periodically appear in parts of the system .', '', '', 0, '2020-07-02 17:49:40', 1),
(1327, 8, 0, 0, 11, 'Serve high pressure compressed air end use with separate system or a booster	', '', '', 0, '2020-07-02 17:49:40', 1),
(1328, 8, 0, 1, 10, 'An entire plant air system is set at a high pressure because a few pieces of equipment require higher pressure air.		', '', '', 0, '2020-07-02 17:49:40', 1),
(1329, 8, 0, 1, 15, 'Inventory equipment needing higher than average pressures, noting minimum pressure and estimating air volume required.', '', '', 0, '2020-07-02 17:49:40', 1),
(1336, 88, 0, 0, 1, 'Versatile.', '', '', 0, '2020-07-02 19:58:43', 1),
(1337, 88, 0, 0, 1, 'Familiar utility for many industrial personnel.', '', '', 0, '2020-07-02 19:58:43', 1),
(1338, 88, 0, 0, 1, 'A single thermal energy input at the boiler can be distributed throughout a facility.', '', '', 0, '2020-07-02 19:58:43', 1),
(1339, 88, 0, 0, 1, 'Limiting the number of combustion sources by serving applications with steam can reduce administrative cost of managing and reporting multiple emissions sources to governing agencies.', '', '', 0, '2020-07-02 19:58:43', 1),
(1340, 88, 0, 0, 1, 'Use of a dual fuel boiler (for example: one that can use natural gas or fuel oil) can also reduce vulnerability to natural gas interruptions when thermal needs are served with steam instead of a local combustion system.', '', '', 0, '2020-07-02 19:58:43', 1),
(1341, 88, 0, 0, 1, 'Steam engines can be useful for applications that might result in an initial locked rotor and potential electric motor damage, such as pumping cold semi-solidified bunker fuel.', '', '', 0, '2020-07-02 19:58:43', 1),
(1342, 89, 0, 0, 2, 'System distribution energy and mass losses can result in significant overall system efficiency reductions.', '', '', 0, '2020-07-02 20:01:03', 1),
(1343, 90, 0, 0, 4, 'Boilers can be bombs if not properly set up and maintained.', '', '', 0, '2020-07-02 20:01:49', 1),
(1344, 91, 0, 0, 3, '1 boiler horsepower (BoHP) = 33,479 Btu/hr', '', '', 0, '2020-07-02 20:08:42', 1),
(1345, 91, 0, 0, 3, 'Exhaust gases are typically best kept above 300 °F to avoid corrosive condensation.', '', '', 0, '2020-07-02 20:08:42', 1),
(1346, 91, 0, 0, 3, 'Ideal exhaust temperatures should not be more than 100 - 150 °F greater than the steam temperature. If a boiler is well designed and heat exchanger surfaces are in good condition, ideal exhaust temperatures should be achievable.', '', '', 0, '2020-07-02 20:08:42', 1),
(1347, 92, 0, 0, 8, 'Keep a steam table handy (phone app or pocket reference) to convert steam temperature to pressure for typical saturated conditions.', '', '', 0, '2020-07-02 20:10:02', 1),
(1350, 93, 0, 0, 7, 'Regular, scheduled boiler tunes. Typically every 6 to 12 months.', '', '', 0, '2020-07-02 20:12:22', 1),
(1351, 93, 0, 0, 7, 'Low O2 controls', '', '', 0, '2020-07-02 20:12:22', 1),
(1361, 97, 0, 0, 17, 'An OSU EEC Data Collection Sheet in Microsoft Excel Format', 'https://drive.google.com/file/d/1mMRMAUYKDCpE5bQmX-KqajjAOwXuEzaL/view?usp=sharing', 'Boiler Data Collection Sheet', 0, '2020-07-02 20:46:30', 1),
(1371, 98, 0, 0, 21, 'A link to the U.S.DOE\'s MEASUR Analysis Tool Package (free download)', 'https://www.energy.gov/eere/amo/measur', 'U.S.DOE Steam System Analysis Tool', 1, '2020-07-08 20:17:15', 1),
(1372, 98, 0, 0, 21, 'An OSU EEC Analysis Tool in Microsoft Excel Format', 'https://drive.google.com/file/d/1HEL3S8xl50-B12ooH4wocqUznwJWAjzQ/view?usp=sharing', 'Combustion Efficiency Analysis Tool (CEAT)', 0, '2020-07-02 21:18:17', 1),
(1405, 94, 0, 0, 20, '', 'add later', 'Boiler Combustion Efficiency with Stack Temp and O2 (add later)', 0, '2020-07-02 21:55:22', 0),
(1406, 94, 0, 0, 20, '', 'add later', 'Abbreviated Steam Table (add later)', 0, '2020-07-02 21:55:22', 0),
(1407, 102, 0, 0, 11, 'Shut down equipment when not needed - nights, weekends, etc.', '', '', 0, '2020-07-02 21:56:36', 1),
(1408, 103, 0, 0, 11, 'Minimize the continuous blowdown rate with a conductivity sensor', '', '', 0, '2020-07-02 21:58:49', 1),
(1409, 103, 0, 0, 11, 'Install blowdown heat recovery', '', '', 0, '2020-07-02 21:58:49', 1),
(1410, 104, 0, 0, 11, 'Replace damper controls on draft fans with variable speed control', '', '', 0, '2020-07-02 22:01:14', 1),
(1411, 105, 0, 0, 11, 'Return more/all condensate back to the boiler', '', '', 0, '2020-07-02 22:03:34', 1),
(1412, 105, 0, 0, 11, 'Recover Flash Steam (for Chris to flesh out) ', '', '', 0, '2020-07-02 22:03:34', 1),
(1575, 108, 0, 0, 3, '1 HP = 0.746 kW', '', '', 0, '2020-07-02 23:14:11', 1),
(1576, 109, 0, 0, 8, 'Tip #1', '', '', 0, '2020-07-02 23:14:41', 0),
(1577, 110, 0, 0, 7, 'BP #1', '', '', 0, '2020-07-02 23:15:09', 0),
(1578, 111, 0, 0, 20, '', 'later', 'A graphic', 0, '2020-07-02 23:15:52', 0),
(1652, 114, 0, 0, 17, 'An OSU EEC Data Collection Sheet in Microsoft Excel Format', 'https://drive.google.com/file/d/1PptW62lQbbN71Miefkx1I960UwnVHFA4/view?usp=sharing', 'Motor Data Collection Sheet', 0, '2020-07-02 23:29:16', 0),
(1665, 116, 0, 0, 17, 'An OSU EEC Report Appendix in Microsoft Word Format', 'https://drive.google.com/file/d/138fM99GFgSjGUAjvqU1x2cjvxDXCu8-a/view?usp=sharing', 'Motors Appendix', 0, '2020-07-02 23:53:23', 0),
(1666, 116, 0, 0, 24, 'An OSU EEC Training Webpage', 'https://eec.oregonstate.edu/industrial-motors-training', 'Industrial Motors Training', 0, '2020-07-02 23:53:23', 0),
(1667, 116, 0, 0, 22, 'An OSU EEC Google Slideshow', 'https://docs.google.com/presentation/d/1eG8ygZ-gpYPzbjnpJKLcm_bmoIUImD7CcBU0ZExhfH4/edit?usp=sharing', 'Motor Assessment Fundamentals', 0, '2020-07-02 23:53:23', 0),
(1668, 116, 0, 0, 22, 'An IAC Training Slideshow', 'https://docs.google.com/presentation/d/153S2O7Ns9vJzLqHQnifW03rE52y4d-KGAPgC3e3D8zc/edit?usp=sharing', 'Motors Training', 0, '2020-07-02 23:53:23', 0),
(1669, 116, 0, 0, 22, 'An OSU EEC Google Slideshow', 'https://docs.google.com/presentation/d/1lbgHebPEVJEB17Yqp--r6gARKWkA4YB45nHJx3OEwXg/edit?usp=sharing', 'Power Factor', 0, '2020-07-02 23:53:23', 0),
(1798, 77, 0, 0, 11, 'Reduce Inlet Air Temperature ', '', '', 1, '2020-07-03 00:24:40', 1),
(1799, 77, 0, 1, 13, 'Reducing the inlet air temperature of oil-injected screw compressors increases mass flow rate while maintaining power input. To efficiently maintain current mass flow rate a variable frequency drive is required to reduce the motor speed and associated power.', '', '', 0, '2020-07-03 00:24:40', 1),
(1800, 77, 0, 1, 10, 'High ambient temperature at the air inlet', '', '', 0, '2020-07-03 00:24:40', 1),
(1801, 77, 0, 1, 10, 'Difficulty meeting a compressor\'s rated air capacity', '', '', 0, '2020-07-03 00:24:40', 1),
(1802, 77, 0, 1, 10, 'A compressor running hotter than its specifications', '', '', 0, '2020-07-03 00:24:40', 1),
(1803, 77, 0, 2, 4, 'Other factors may be at play such as significant air leaks increasing the load on the compressor', '', '', 0, '2020-07-03 00:24:40', 1),
(1804, 77, 0, 1, 3, '1.9% efficiency (scfm/kW) improvement per 10 °F reduction at inlet', '', '', 0, '2020-07-03 00:24:40', 1),
(1805, 77, 0, 1, 15, 'Compressor make, model, and nameplate data', '', '', 0, '2020-07-03 00:24:40', 1),
(1806, 77, 0, 1, 15, 'Motor nameplate data, live power reading, and one week of amperage data', '', '', 0, '2020-07-03 00:24:40', 1),
(1807, 77, 0, 1, 15, 'Complete picture of compressed air system and control strategy', '', '', 0, '2020-07-03 00:24:40', 1),
(1808, 77, 0, 1, 15, 'Average ambient temperature at current and proposed inlet locations', '', '', 0, '2020-07-03 00:24:40', 1),
(1809, 77, 0, 1, 12, 'Move air inlet to coolest location to reduce power and energy consumption', '', '', 0, '2020-07-03 00:24:40', 1),
(1810, 77, 0, 1, 8, 'If implementation requires much more than re-ducting, the chances of this opportunitity being worthwhile are low. ', '', '', 0, '2020-07-03 00:24:40', 1),
(1811, 77, 0, 1, 21, 'An OSU EEC Analysis Template in Microsoft Excel Format', 'https://oregonstate.box.com/s/zk1aol8rf88aul9klflbxkikz6l2ku47', 'Analysis Template: Reduce Inlet Air Temperature', 2, '2020-07-03 00:24:40', 1),
(1812, 77, 0, 1, 17, 'An article from Compressed Air Best Practices by  Tim Dugan, P.E., President, Compression Engineering Corporation', 'https://www.airbestpractices.com/system-assessments/compressor-controls/inlet-air-temperature-impacts-air-compressor-performance', 'Inlet Air Temperature Impacts on Air Compressor Performance', 1, '2020-07-03 00:24:40', 1),
(1813, 77, 0, 0, 11, 'Use a more efficient control strategy', '', '', 1, '2020-07-03 00:24:40', 1),
(1814, 77, 0, 0, 11, 'Use a compressed air sequencer for multiple compressors', '', '', 0, '2020-07-03 00:24:40', 1),
(1828, 101, 0, 0, 11, 'Tune the boiler regularly', '', '', 0, '2020-07-03 00:26:01', 1),
(1829, 101, 0, 1, 10, 'O2 readings in the exhaust are high for the fuel type (>3% for gaseous fuels, >8% for solid fuels)', '', '', 0, '2020-07-03 00:26:01', 1),
(1830, 101, 0, 1, 15, 'Combustion analysis at representative firing rates (high, medium, low, standby)', '', '', 0, '2020-07-03 00:26:01', 1),
(1831, 101, 0, 1, 15, 'Firing rate over time', '', '', 0, '2020-07-03 00:26:01', 1),
(1832, 101, 0, 1, 21, 'An OSU EEC Analysis Template in Microsoft Excel Format (unapproved, old style)', 'https://drive.google.com/file/d/1Z9GbxV0nr-OuxT2cNLxkdo82Wpq-h70m/view?usp=sharing', 'Boiler Tune Template', 0, '2020-07-03 00:26:01', 1),
(1833, 101, 0, 0, 11, 'Install O2 Controls to maintain optimum combustion efficiency throughout the operating range', '', '', 0, '2020-07-03 00:26:01', 1),
(1834, 101, 0, 1, 10, 'The boiler spends a significant portion of time at partial fire and lower efficiency', '', '', 0, '2020-07-03 00:26:01', 1),
(1835, 101, 0, 0, 11, 'Clean heat exchanger surfaces and reduce the exhaust temperature', '', '', 0, '2020-07-03 00:26:01', 1),
(1836, 101, 0, 1, 10, 'Stack temperature exceeds steam temperature by over 150 ˚F', '', '', 0, '2020-07-03 00:26:01', 1),
(1837, 101, 0, 1, 12, 'Clean the fire side. Soot can accumulate and inhibit heat transfer.', '', '', 0, '2020-07-03 00:26:01', 1),
(1838, 101, 0, 1, 12, 'Clean the water side. Scale can accumulate and inhibit heat transfer is the water chemistry is off', '', '', 0, '2020-07-03 00:26:01', 1),
(1839, 101, 0, 0, 11, 'Install an economizer (for Matt to flesh out)', '', '', 0, '2020-07-03 00:26:01', 1),
(1840, 101, 0, 0, 11, 'Install a condensing economizer (for Matt to flesh out)', '', '', 0, '2020-07-03 00:26:01', 1),
(1877, 120, 0, 0, 11, 'Correct Power Factor (for Ethan to flesh out)', '', '', 0, '2020-07-03 00:28:39', 1),
(1878, 120, 0, 1, 10, 'Power factor below ##%', '', '', 0, '2020-07-03 00:28:39', 1),
(1897, 100, 0, 0, 24, 'See steam tip sheets', 'https://www.energy.gov/eere/amo/tip-sheets-system', 'U.S.DOE Energy Tip Sheets by System', 1, '2020-07-03 03:01:04', 1),
(1898, 100, 0, 0, 17, 'United Nations Industrial Development Organization Document', 'https://www.unido.org/sites/default/files/2017-11/SSO-Manual-Print-FINAL-20161109-One-Page-V2.pdf', 'Manual for Industrial Steam Systems Assessment and Optimization', 1, '2020-07-03 03:01:04', 1),
(1899, 100, 0, 0, 17, 'CleaverBrooks Document', 'http://cleaverbrooks.com/reference-center/insights/Boiler%20Efficiency%20Guide.pdf', 'Boiler Efficiency Guide', 1, '2020-07-03 03:01:04', 1),
(1900, 100, 0, 0, 25, 'Pacific NW Boiler Vendor', 'https://coleindust.com/', 'Cole Industrial', 1, '2020-07-03 03:01:04', 1),
(1901, 100, 0, 0, 25, 'Pacific NW Boiler Vendor', 'https://www.nationwideboiler.com/pacific-combustion-engineering.html', 'Pacific Combustion Engineering', 1, '2020-07-03 03:01:04', 1),
(1902, 100, 0, 0, 25, 'Boiler Manufacturer', 'http://cleaverbrooks.com/', 'CleaverBrooks', 1, '2020-07-03 03:01:04', 1),
(1903, 117, 0, 0, 24, 'See motor tip sheets', 'https://www.energy.gov/eere/amo/tip-sheets-system', 'U.S.DOE Energy Tip Sheets by System', 1, '2020-07-03 03:02:27', 0),
(1904, 117, 0, 0, 24, 'External Website with Industrial Motor Articles', 'https://www.plantservices.com/category/motors_drives_power_trans', 'Plant Services: Industrial Motors', 1, '2020-07-03 03:02:27', 0),
(1905, 117, 0, 0, 24, 'EASA Accreditation Auditor', 'https://www.greenmotors.org/', 'Green Motors Practices Group', 1, '2020-07-03 03:02:27', 0),
(1968, 107, 0, 0, 11, 'Replace standard efficiency motors with NEMA premium efficiency motors', '', '', 0, '2020-07-03 03:12:11', 1),
(1969, 107, 0, 1, 10, 'Standard efficiency motors used in high energy consumer applications ', '', '', 0, '2020-07-03 03:12:11', 1),
(1970, 107, 0, 0, 11, 'Replace oversized motors', '', '', 0, '2020-07-03 03:12:11', 1),
(1971, 107, 0, 1, 10, 'Motor consistently operating at less than half of full load', '', '', 0, '2020-07-03 03:12:11', 1),
(1972, 107, 0, 0, 11, 'Replace Standard V-Belts with Notched V-Belts', '', '', 0, '2020-07-03 03:12:11', 1),
(1973, 107, 0, 1, 13, 'Notched V-belts have grooves perpendicular to the length of the belt to reduce bending resistance. ', '', '', 0, '2020-07-03 03:12:11', 1),
(1974, 107, 0, 1, 10, 'Numerous belt-driven motors are used throughout a facility ', '', '', 0, '2020-07-03 03:12:11', 1),
(1975, 107, 0, 1, 3, 'Notched V-belts are approximately 2% more efficient than standard belts. The OSU EEC uses 1.5% as a conservative estimate.', '', '', 0, '2020-07-03 03:12:11', 1),
(1976, 107, 0, 1, 14, 'Are V-belts or synchronous belts more suited to the application?', '', '', 0, '2020-07-03 03:12:11', 1),
(1977, 107, 0, 1, 1, 'Run cooler, last longer, and are more efficient than standard V-belts', '', '', 0, '2020-07-03 03:12:11', 1),
(1978, 107, 0, 1, 1, 'Don\'t require retrofits if standard V-belts are already used', '', '', 0, '2020-07-03 03:12:11', 1),
(1979, 107, 0, 1, 1, 'More suitable than synchronous drives if vibrational damping is needed or the application causes sudden torque changes', '', '', 0, '2020-07-03 03:12:11', 1),
(1980, 107, 0, 1, 2, 'Sharp efficiency reduction at high torque due to increased slippage', '', '', 0, '2020-07-03 03:12:11', 1),
(1981, 107, 0, 1, 2, 'Like standard V-belts, notched belts degrade in efficiency over time if not properly maintained', '', '', 0, '2020-07-03 03:12:11', 1),
(1982, 107, 0, 1, 2, 'V-belts may perform worse in dirty environments than synchronous belts', '', '', 0, '2020-07-03 03:12:11', 1),
(1983, 107, 0, 1, 12, 'Incrementally install notched V-belts as old belts are replaced.', '', '', 0, '2020-07-03 03:12:11', 1),
(1984, 107, 0, 1, 7, 'Regular scheduled maintenance and re-tensioning ', '', '', 0, '2020-07-03 03:12:11', 1),
(1985, 107, 0, 1, 20, '', 'https://drive.google.com/file/d/1uk3x2VpKQ9FrRUOvU4nQ9U2zHfQsBXGC/view?usp=sharing', 'Thermal Image of Notched vs Standard V-belt', 0, '2020-07-03 03:12:11', 1),
(1986, 107, 0, 1, 21, 'An OSU EEC Analysis Template in Microsoft Excel Format', 'https://drive.google.com/file/d/19tm7mcwn9jYIj_xDkJ7Ki9buPw0gc2Kl/view?usp=sharing', 'Install Notched V-Belts Template', 0, '2020-07-03 03:12:11', 1),
(1987, 107, 0, 0, 11, 'Replace V-Belt Drives with Synchronous Belt Drives ', '', '', 0, '2020-07-03 03:12:11', 1),
(1988, 107, 0, 1, 13, 'Synchronous drives use toothed belts and mated grooved sprockets to transfer power rather than friction. Synchronous belt drives operate more efficient and require less maintenance than V-belt drives.', '', '', 0, '2020-07-03 03:12:11', 1),
(1989, 107, 0, 1, 10, 'Numerous belt-driven motors are used throughout a facility ', '', '', 0, '2020-07-03 03:12:11', 1),
(1990, 107, 0, 1, 3, 'Synchronous drives consistently operate with 98% efficiency', '', '', 0, '2020-07-03 03:12:11', 1),
(1991, 107, 0, 1, 14, 'Are V-belts or synchronous belts more suited to the application?', '', '', 0, '2020-07-03 03:12:11', 1),
(1992, 107, 0, 1, 1, 'Maintain efficiency over a wide load range', '', '', 0, '2020-07-03 03:12:11', 1),
(1993, 107, 0, 1, 1, 'Work well in oily and wet environments', '', '', 0, '2020-07-03 03:12:11', 1),
(1994, 107, 0, 1, 1, 'Require minimal maintenance and re-tensioning ', '', '', 0, '2020-07-03 03:12:11', 1),
(1995, 107, 0, 1, 2, 'Require installation of mating grooved sprockets', '', '', 0, '2020-07-03 03:12:11', 1),
(1996, 107, 0, 1, 2, 'Noisier and transfer more vibration than V-belts', '', '', 0, '2020-07-03 03:12:11', 1),
(1997, 107, 0, 1, 2, 'Vulnerable to sudden torque changes that can shear the belt\'s teeth', '', '', 0, '2020-07-03 03:12:11', 1),
(1998, 107, 0, 1, 12, 'Consider consulting a power transmission specialist to determine viability and savings potential from retrofitting V-belt drives with synchronous belts. Install notched belts where synchronous are not cost effective.', '', '', 0, '2020-07-03 03:12:11', 1),
(1999, 118, 0, 0, 11, 'Use variable frequency drives where appropriate', '', '', 0, '2020-07-03 03:15:14', 1),
(2000, 118, 0, 1, 10, 'Large motors that are throttle controlled', '', '', 0, '2020-07-03 03:15:14', 1),
(2005, 115, 0, 0, 21, 'An OSU EEC analysis tool in microsoft excel format used to calculate power from measured amperage and voltage.', 'https://drive.google.com/file/d/1xJMeEKUM93lyxace7UUiIH_BdKf44Dxe/view?usp=sharing', 'Motor Analysis Tool (MAT)', 0, '2020-07-03 03:38:14', 0),
(2006, 115, 0, 0, 21, 'An OSU EEC analysis tool in microsoft excel format used to calculate power from logged amperage data.', 'https://drive.google.com/file/d/1NMKuuxdUv9nNvFXOpR_tmd_-Yw6XUbpW/view?usp=sharing', 'Motor Analysis Tool (MAT) for Dataloggers', 0, '2020-07-03 03:38:14', 0),
(2096, 106, 0, 0, 11, 'Insulate steam lines', '', '', 0, '2020-07-03 17:30:31', 1),
(2097, 106, 0, 0, 11, 'Insulate valves and fittings', '', '', 0, '2020-07-03 17:30:31', 1),
(2098, 106, 0, 0, 11, 'Insulate condensate lines', '', '', 0, '2020-07-03 17:30:31', 1),
(2099, 106, 0, 0, 21, 'An OSU EEC Analysis Template in Microsoft Excel Format', 'https://drive.google.com/file/d/1Et50Qc77pWtPkZcorKcPG_RSuK-Vc_lx/view?usp=sharing', 'Insulation Template', 0, '2020-07-03 17:30:31', 1),
(2100, 106, 0, 0, 21, 'North American Insulation Manufacturers Association Software Download', 'https://insulationinstitute.org/tools-resources/free-3e-plus/?cn-reloaded=1', 'NAIMA 3E Plus Insulation Tool', 1, '2020-07-03 17:30:31', 1),
(2101, 106, 0, 0, 11, 'Insulate steam lines', '', '', 0, '2020-07-03 17:31:09', 0),
(2102, 106, 0, 0, 11, 'Insulate valves and fittings', '', '', 0, '2020-07-03 17:31:09', 0),
(2103, 106, 0, 0, 11, 'Insulate condensate lines', '', '', 0, '2020-07-03 17:31:09', 0),
(2104, 106, 0, 0, 21, 'An OSU EEC Analysis Template in Microsoft Excel Format', 'https://drive.google.com/file/d/1Et50Qc77pWtPkZcorKcPG_RSuK-Vc_lx/view?usp=sharing', 'Insulation Template  (almost approved)', 0, '2020-07-03 17:31:09', 0),
(2105, 106, 0, 0, 21, 'North American Insulation Manufacturers Association Software Download', 'https://insulationinstitute.org/tools-resources/free-3e-plus/?cn-reloaded=1', 'NAIMA 3E Plus Insulation Tool', 1, '2020-07-03 17:31:09', 0),
(2108, 100, 0, 0, 24, 'See steam tip sheets', 'https://www.energy.gov/eere/amo/tip-sheets-system', 'U.S.DOE Energy Tip Sheets by System', 1, '2020-07-07 20:54:30', 0),
(2109, 100, 0, 0, 17, 'United Nations Industrial Development Organization Document', 'https://www.unido.org/sites/default/files/2017-11/SSO-Manual-Print-FINAL-20161109-One-Page-V2.pdf', 'Manual for Industrial Steam Systems Assessment and Optimization', 1, '2020-07-03 17:55:16', 0),
(2110, 100, 0, 0, 17, 'CleaverBrooks Document', 'http://cleaverbrooks.com/reference-center/insights/Boiler%20Efficiency%20Guide.pdf', 'Boiler Efficiency Guide', 1, '2020-07-03 17:55:16', 0),
(2111, 100, 0, 0, 25, 'Pacific NW Boiler Vendor', 'https://coleindust.com/', 'Cole Industrial', 1, '2020-07-03 17:55:16', 0),
(2112, 100, 0, 0, 25, 'Pacific NW Boiler Vendor', 'https://www.nationwideboiler.com/pacific-combustion-engineering.html', 'Pacific Combustion Engineering', 1, '2020-07-03 17:55:16', 0),
(2113, 100, 0, 0, 25, 'Boiler Manufacturer', 'http://cleaverbrooks.com/', 'CleaverBrooks', 1, '2020-07-03 17:55:16', 0),
(2114, 100, 0, 0, 8, 'ADD A LINK TO STEAM TABLES SOMEWHERE', '', '', 1, '2020-07-03 17:55:16', 0),
(2115, 99, 0, 0, 22, 'An OSU EEC Google Slideshow', 'https://docs.google.com/presentation/d/1A-bLNUv7hCuBV2zMsS0A4JEKPNVxaKnIwUMoVZCFr2w/edit?usp=sharing', 'Steam Systems', 0, '2020-07-03 17:55:50', 1),
(2116, 99, 0, 0, 17, 'An OSU EEC Appendix in Microsoft Word Format', 'https://drive.google.com/file/d/1Jh6CaIDd6ugCo6FYqviyVK-O49ic_275/view?usp=sharing', 'Combustion Appendix', 0, '2020-07-03 17:55:50', 1),
(2117, 95, 0, 0, 15, 'Boiler Nameplate Data: Rated Capacity', '', '', 0, '2020-07-03 17:57:24', 1),
(2118, 95, 0, 0, 15, 'Combustion Analysis: Excess O2, Stack Temperature, Inlet / Ambient Temperature ', '', '', 0, '2020-07-03 17:57:24', 1),
(2119, 95, 0, 0, 15, 'Capacity over time', '', '', 0, '2020-07-03 17:57:24', 1),
(2120, 66, 0, 0, 15, 'Pharetra massa massa ultricies mi quis hendrerit dolor.', '', '', 0, '2020-07-07 01:57:28', 1),
(2121, 66, 0, 0, 11, 'Vitae semper quis lectus nulla.', '', '', 0, '2020-07-07 01:57:28', 1),
(2122, 66, 0, 0, 11, 'Lectus mauris ultrices eros in cursus.', '', '', 0, '2020-07-07 01:57:28', 1),
(2123, 121, 0, 0, 11, 'Check', '', '', 0, '2020-07-07 02:04:39', 1),
(2124, 121, 0, 0, 13, 'text text text', '', '', 0, '2020-07-07 02:04:39', 1),
(2125, 27, 0, 0, 13, 'Energy savings associated with reductions in compressed air use are very dependent on the compressor control strategy. In the worst case, a compressor with blow off control might not yield any energy savings with compressed air use reductions, and one with inlet modulation might yield only a small part of potential savings.', '', '', 0, '2020-07-07 16:17:13', 1),
(2126, 27, 0, 0, 11, 'Reduce compressed air leaks', '', '', 0, '2020-07-07 16:17:13', 1),
(2127, 27, 0, 1, 13, 'Compressed air is an expensive utility, but leaks can go uncorrected as they do not make a mess.', '', '', 0, '2020-07-07 16:17:13', 1),
(2128, 27, 0, 1, 10, 'The compressed air leak rate exceeds 20 to 30% of air used in the process.', '', '', 0, '2020-07-07 16:17:13', 1),
(2129, 27, 0, 1, 8, 'Determine the leak load by checking compressor output when there is no productive use (typically during breaks or after hours.)', '', '', 0, '2020-07-07 16:17:13', 1),
(2130, 27, 0, 1, 8, 'Sonic equipment can be used to identify leak locations and estimate associated losses.', '', '', 0, '2020-07-07 16:17:13', 1),
(2131, 27, 0, 1, 15, 'Air use during idle period (often inferred from datalog of power or amps over time)', '', '', 0, '2020-07-07 16:17:13', 1),
(2132, 27, 0, 1, 15, 'Air use during production (often inferred from datalog of power or amps over time)', '', '', 0, '2020-07-07 16:17:13', 1),
(2133, 27, 0, 1, 15, 'Compressor power over time', '', '', 0, '2020-07-07 16:17:13', 1),
(2134, 27, 0, 1, 17, 'An OSU EEC Analysis Template in Microsoft Excel Format', 'vhttps://drive.google.com/drive/u/0/folders/1pJoEFwdmULog_SRARRlqzFfzX5cpV6cI', 'Analysis Template: Repair Compressed Air Leaks ', 2, '2020-07-07 16:17:13', 1),
(2135, 27, 0, 0, 11, 'Eliminate the use of compressed air “quick fixes” by correcting base issues', '', '', 0, '2020-07-07 16:17:13', 1),
(2136, 27, 0, 1, 13, 'Compressed air is a handy utility that can be used for a temporary resolution of miscellaneous production issues, at the cost of expensive air use. Often these fixes persist without correction of the underlying issue.', '', '', 0, '2020-07-07 16:17:13', 1),
(2137, 27, 0, 1, 10, 'Compressed air used as a temporary quick fix for applications such as cooling bearings, or moving lightweight items that are getting stuck on conveyor.', '', '', 0, '2020-07-07 16:17:13', 1),
(2138, 27, 0, 0, 11, 'Use alternative to vortex coolers', '', '', 0, '2020-07-07 16:17:13', 1),
(2139, 27, 0, 1, 13, 'Vortex coolers are an interesting technology that can take a compressed air inlet stream and yield two streams, one that is cold and one that is warm. They are sometimes used to cool electrical cabinets, but in many cases can be replaced with lower energy solutions such as air conditioning or simple fans.', '', '', 0, '2020-07-07 16:17:13', 1),
(2140, 27, 0, 1, 10, 'Vortex cabinet cooler in use at a facility   ', '', '', 0, '2020-07-07 16:17:13', 1),
(2141, 27, 0, 0, 11, 'Use engineered nozzles for compressed air blow-off applications', '', '', 0, '2020-07-07 16:17:13', 1),
(2142, 27, 0, 1, 13, 'Engineered air nozzles can develop effective air flow with a smaller volume of compressed air by entraining atmospheric air in the air stream.', '', '', 0, '2020-07-07 16:17:13', 1),
(2143, 27, 0, 1, 10, 'Compressed air blowing applications using simple open lines or apertures  ', '', '', 0, '2020-07-07 16:17:13', 1),
(2144, 27, 0, 0, 11, 'Interlock compressed air delivery with equipment or application served.', '', '', 0, '2020-07-07 16:17:13', 1),
(2145, 27, 0, 1, 13, 'Interlocking a compressed air valve to close when supported equipment is idle can eliminate significant unneeded air use. This can range from an entire packaging line to and isolated ink sprayer that blows air constantly while introducing ink to mark product periodically.', '', '', 0, '2020-07-07 16:17:13', 1),
(2146, 27, 0, 1, 10, 'Idle equipment with active compressed air blowing applications or leaks ', '', '', 0, '2020-07-07 16:17:13', 1),
(2147, 27, 0, 0, 11, 'Serve lower pressure end use with blower or fan', '', '', 0, '2020-07-07 16:17:13', 1),
(2148, 27, 0, 1, 13, 'Compressed air is an energy intensive utility with significant heat of compression losses.  These losses can be avoided if the air is not pressurized significantly above that needed for the application. Fans and blowers can develop a like airflow with significantly less energy. ', '', '', 0, '2020-07-07 16:17:13', 1),
(2149, 27, 0, 1, 10, 'Compressed air used for clearing material, blowing off water, agitating tanks of fluid, or any applications with compressed air regulated to a low pressure', '', '', 0, '2020-07-07 16:17:13', 1),
(2150, 27, 0, 0, 11, 'Reduce the frequency or duration of intermittent air uses', '', '', 0, '2020-07-07 16:17:13', 1),
(2151, 27, 0, 0, 11, 'Replace desiccant based air dryer with a refrigerated air dryer if air drying needs permit.', '', '', 0, '2020-07-07 16:17:13', 1),
(2152, 27, 0, 0, 11, 'Use desiccant based air dryer with more efficient desiccant bed regeneration', '', '', 0, '2020-07-07 16:17:13', 1),
(2153, 27, 0, 0, 11, 'Replace pneumatic hand tools with battery powered hand tools', '', '', 0, '2020-07-07 16:17:13', 1),
(2172, 122, 0, 0, 2, 'test', '', '', 0, '2020-07-07 17:54:57', 0),
(2179, 123, 0, 0, 17, 'MEASUR is open source software that consists of the following DOE legacy energy system assessment tools (updated): Pumping System Assessment Tool (PSAT), Process Heating Assessment and Survey Tool (PHAST), Fan System Assessment Tool (FSAT), Steam System Assessment Tool (SSAT)/ Steam System Modeler (SSMT), AIRMaster+ (Last accessed 12/2/2019)   ', 'https://www.energy.gov/eere/amo/measur', 'U.S. Department of Energy MEASUR analysis tool', 1, '2020-07-07 18:00:00', 0),
(2210, 82, 0, 0, 11, 'Replace Valve Control with Variable Speed Drive Control', '', '', 0, '2020-07-07 20:28:47', 0),
(2211, 82, 0, 1, 13, 'Pumps are often designed to operate at specific conditions, installing a Variable Speed Drive can allow the pump to supply a wider range of flows while remaining near it\'s best efficiency point', '', '', 0, '2020-07-07 20:28:47', 0),
(2212, 82, 0, 1, 10, 'Pumps throttled or supplying excess fluid to a process', '', '', 0, '2020-07-07 20:28:47', 0),
(2213, 82, 0, 1, 8, 'Pumps operating over a range of flow conditions may be particularly suited for VFD control', '', '', 0, '2020-07-07 20:28:47', 0),
(2214, 82, 0, 1, 14, 'Would a resized pump or impeller trim be more suitable for the application?', '', '', 0, '2020-07-07 20:28:47', 0),
(2215, 82, 0, 1, 1, 'Allows efficient operation over wider range of flow conditions', '', '', 0, '2020-07-07 20:28:47', 0),
(2216, 82, 0, 1, 2, 'VFDs are expensive - becoming more affordable in recent years', '', '', 0, '2020-07-07 20:28:47', 0),
(2217, 82, 0, 1, 4, 'Networks with multiple pumps operating in parallel or series need to be carefully considered before recommending VFD control', '', '', 0, '2020-07-07 20:28:47', 0),
(2218, 82, 0, 1, 4, 'VFDs can harm the motor if they are not properly installed', '', '', 0, '2020-07-07 20:28:47', 0),
(2219, 82, 0, 1, 7, 'Install grounding shaft to divert VFD induced voltages away from the motor', '', '', 0, '2020-07-07 20:28:47', 0),
(2220, 82, 0, 1, 15, 'Pump nameplate/motor nameplate', '', '', 0, '2020-07-07 20:28:47', 0),
(2221, 82, 0, 1, 15, 'Flow rates, pressure readings, live amperage data', '', '', 0, '2020-07-07 20:28:47', 0),
(2222, 82, 0, 1, 17, 'An OSU EEC Analysis Template in Microsoft Excel Format', 'https://oregonstate.app.box.com/file/606303033065', 'Analysis Template: Install VFDs on Process Pumps', 2, '2020-07-07 20:28:47', 0),
(2223, 82, 0, 0, 11, 'Eliminate Bypass Control', '', '', 0, '2020-07-07 20:28:47', 0),
(2224, 82, 0, 0, 11, 'Replace On/Off Control with Continuous Flow Control ', '', '', 0, '2020-07-07 20:28:47', 0),
(2225, 124, 0, 0, 17, 'See pump tip sheets', 'https://www.energy.gov/eere/amo/tip-sheets-system', 'U.S.DOE Energy Tip Sheets by System', 1, '2020-07-07 20:31:56', 0),
(2227, 125, 0, 0, 20, '', 'https://www.pumpsandsystems.com/understanding-pump-curves', 'Sample Pump Curve', 0, '2020-07-07 20:36:10', 0),
(2228, 125, 0, 0, 20, '', 'https://www.pumpsandsystems.com/understanding-pump-curves', 'Sample Pump and System Curve', 0, '2020-07-07 20:36:10', 0),
(2229, 125, 0, 0, 20, '', 'https://fluidcontrolproducts.net/catolog/pumps/centrifugal-pumps/cpvc-price-pump-open-box/', 'Sample Pump Nameplate', 0, '2020-07-07 20:36:10', 0),
(2236, 60, 0, 0, 17, 'This is an internal resource. The link connects to some resource at OSU. We are not worried about this being a dead link.', 'http://placekitten.com/300/300', 'Some Link', 0, '2020-07-07 21:20:15', 0),
(2237, 60, 0, 0, 17, 'This is an external resource. We worry that it might be a dead link, so we want to track the date.', 'http://placekitten.com/500/500', 'Another Link', 1, '2020-07-07 21:20:15', 0),
(2238, 60, 0, 0, 26, 'Hello', '', '', 1, '2020-07-07 21:20:15', 0),
(2239, 60, 0, 0, 27, 'hi', '', '', 0, '2020-07-07 21:20:15', 0),
(2240, 127, 0, 0, 16, '1', '', '', 0, '2020-07-07 21:21:54', 0),
(2241, 127, 0, 0, 4, '2', '', '', 0, '2020-07-07 21:21:54', 0),
(2242, 128, 0, 0, 11, 'w', '', '', 0, '2020-07-07 21:23:36', 1),
(2243, 128, 0, 0, 2, 'w', '', '', 0, '2020-07-07 21:23:36', 1),
(2244, 128, 0, 0, 11, 'w222', '', '', 0, '2020-07-07 21:33:22', 0),
(2245, 128, 0, 0, 2, 'w', '', '', 0, '2020-07-07 21:33:22', 0),
(2260, 126, 0, 0, 17, '$empty', '/subjects/45', 'Pumps', 0, '2020-07-07 23:32:33', 0),
(2261, 119, 0, 0, 11, 'Manually reduce equipment operation time', '', '', 0, '2020-07-07 23:38:14', 1),
(2262, 119, 0, 0, 11, 'Automatically control equipment operation time', '', '', 0, '2020-07-07 23:38:14', 1),
(2263, 119, 0, 0, 11, 'Interlock equipment with a related process', '', '', 0, '2020-07-07 23:38:14', 1),
(2264, 119, 0, 0, 11, 'Operate equipment in batches rather than continuously ', '', '', 0, '2020-07-07 23:38:14', 1),
(2265, 119, 0, 1, 10, 'Equipment is idle for significant periods of time', '', '', 0, '2020-07-07 23:38:14', 1),
(2267, 96, 0, 0, 27, 'Combustion Analyzer ', '', '', 0, '2020-07-08 20:15:53', 1),
(2268, 112, 0, 0, 15, 'Motor Inventory ', '', '', 0, '2020-07-08 22:27:29', 0),
(2269, 112, 0, 1, 26, 'Motor ID, Location, Application', '', '', 0, '2020-07-08 22:27:29', 0),
(2270, 112, 0, 1, 26, 'Nameplate Data ', '', '', 0, '2020-07-08 22:27:29', 0),
(2271, 112, 0, 1, 26, 'Load Factor, Use Factor (operation hours)', '', '', 0, '2020-07-08 22:27:29', 0),
(2272, 112, 0, 1, 26, 'Drive Type', '', '', 0, '2020-07-08 22:27:29', 0),
(2273, 112, 0, 1, 26, 'Controls', '', '', 0, '2020-07-08 22:27:29', 0),
(2275, 113, 0, 0, 27, 'Power Quality Analyzer ', '', '', 0, '2020-07-08 22:29:50', 0),
(2303, 131, 0, 0, 11, 'Condenser qater temperature adjustment ', '', '', 0, '2020-07-10 18:45:42', 0),
(2304, 131, 0, 0, 11, 'Chilled water supply temperature adjustment', '', '', 0, '2020-07-10 18:45:42', 0);
INSERT INTO `Items` (`itemId`, `cardId`, `orderIndex`, `indentation`, `iconType`, `contentText`, `contentUrl`, `contentLabel`, `contentMode`, `created`, `approved`) VALUES
(2305, 131, 0, 0, 11, 'Fan motor controls (variable speed)', '', '', 0, '2020-07-10 18:45:42', 0),
(2309, 120, 0, 0, 11, 'Correct Power Factor (Ethan)', '', '', 0, '2020-07-10 18:53:01', 0),
(2310, 120, 0, 1, 10, 'Power factor below ##%', '', '', 0, '2020-07-10 18:53:01', 0),
(2311, 101, 0, 0, 11, 'Tune the boiler regularly', '', '', 0, '2020-07-10 18:53:47', 0),
(2312, 101, 0, 1, 10, 'O2 readings in the exhaust are high for the fuel type (>3% for gaseous fuels, >8% for solid fuels)', '', '', 0, '2020-07-10 18:53:47', 0),
(2313, 101, 0, 1, 15, 'Combustion analysis at representative firing rates (high, medium, low, standby)', '', '', 0, '2020-07-10 18:53:47', 0),
(2314, 101, 0, 1, 15, 'Firing rate over time', '', '', 0, '2020-07-10 18:53:47', 0),
(2315, 101, 0, 1, 21, 'An OSU EEC Analysis Template in Microsoft Excel Format (unapproved, old style)', 'https://drive.google.com/file/d/1Z9GbxV0nr-OuxT2cNLxkdo82Wpq-h70m/view?usp=sharing', 'Boiler Tune Template', 0, '2020-07-10 18:53:47', 0),
(2316, 101, 0, 0, 11, 'Install O2 Controls to maintain optimum combustion efficiency throughout the operating range', '', '', 0, '2020-07-10 18:53:47', 0),
(2317, 101, 0, 1, 10, 'The boiler spends a significant portion of time at partial fire and lower efficiency', '', '', 0, '2020-07-10 18:53:47', 0),
(2318, 101, 0, 0, 11, 'Clean heat exchanger surfaces and reduce the exhaust temperature', '', '', 0, '2020-07-10 18:53:47', 0),
(2319, 101, 0, 1, 10, 'Stack temperature exceeds steam temperature by over 150 ˚F', '', '', 0, '2020-07-10 18:53:47', 0),
(2320, 101, 0, 1, 12, 'Clean the fire side. Soot can accumulate and inhibit heat transfer.', '', '', 0, '2020-07-10 18:53:47', 0),
(2321, 101, 0, 1, 12, 'Clean the water side. Scale can accumulate and inhibit heat transfer is the water chemistry is off', '', '', 0, '2020-07-10 18:53:47', 0),
(2322, 101, 0, 0, 11, 'Install an economizer  (Matt)', '', '', 0, '2020-07-10 18:53:47', 0),
(2323, 101, 0, 0, 11, 'Install a condensing economizer  (Matt)', '', '', 0, '2020-07-10 18:53:47', 0),
(2324, 105, 0, 0, 11, 'Return more/all condensate back to the boiler', '', '', 0, '2020-07-10 18:54:00', 0),
(2325, 105, 0, 0, 11, 'Recover Flash Steam (Chris) ', '', '', 0, '2020-07-10 18:54:00', 0),
(2326, 129, 0, 0, 11, 'Pre-heat combustion air (Adam)', '', '', 0, '2020-07-10 18:54:39', 0),
(2327, 129, 0, 1, 13, 'Air-to-air heat transfer (regenerators/recuperators)', '', '', 0, '2020-07-10 18:54:39', 0),
(2328, 129, 0, 0, 11, 'Install a heat pipe to recovery process heat (Matt)', '', '', 0, '2020-07-10 18:54:39', 0),
(2329, 129, 0, 1, 13, 'Air-to-air heat transfer (typically for 150-850 ˚F processes)', '', '', 0, '2020-07-10 18:54:39', 0),
(2330, 129, 0, 0, 11, 'Install a shell and tube heat exchanger to recover process heat (Matt)', '', '', 0, '2020-07-10 18:54:39', 0),
(2331, 129, 0, 1, 13, 'Liquid-to-liquid heat transfer ', '', '', 0, '2020-07-10 18:54:39', 0),
(2332, 129, 0, 0, 11, 'Install an economizer to pre-heat boiler make-up water (Matt)', '', '', 0, '2020-07-10 18:54:39', 0),
(2333, 129, 0, 1, 13, 'Air-to-liquid heat transfer ', '', '', 0, '2020-07-10 18:54:39', 0),
(2334, 130, 0, 0, 11, 'Insulate hot surfaces (Julian)', '', '', 0, '2020-07-10 18:54:46', 0);

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
(1, 2, 'z - testing: stuff', 'A boiler is a closed vessel in which fluid (generally water) is heated.', 'In a <b> fossil fuel power plant</b> using a steam cycle for power generation, the primary heat source will be combustion of coal, oil, or natural gas. In some cases byproduct fuel such as the carbon-monoxide rich offgasses of a coke battery can be burned to heat a boiler; biofuels such as bagasse, where economically available, can also be used. In a nuclear power plant, boilers called steam generators are heated by the heat produced by nuclear fission. Where a large volume of hot gas is available from some process, a heat recovery steam generator or recovery boiler can use the heat to produce steam, with little or no extra fuel consumed; such a configuration is common in a combined cycle power plant where a gas turbine and a steam boiler are used. In all cases the combustion product waste gases are separate from the working fluid of the steam cycle, making these systems examples of External combustion engines.', '../images/boiler.png', 0, 51, '2020-05-18 01:37:54', 0),
(2, 2, 'Compressed Air', 'Compressed air is a common utility found in most industrial facilities', 'Compressed air has been a key industrial utility since the 1800\'s. It can drive pneumatic cylinders, air motors, diaphragm pumps and controls. It is capable of reasonably high force actuation, and is a common required utility in equipment packages. It can be used and is often misused to generate air flow for agitation, blow-off, cooling, and motive force applications. Screw compressors currently comprise the majority of industrial compressed air installations, but reciprocating and centrifugal compressors can be found in older or special installations/applications.', '../images/aircompressor.png', 0, 56, '2020-06-29 19:15:43', 1),
(3, 2, 'z - testing: more sutff', 'Refrigeration is the process of cooling a space, substance, or system to lower and/or maintain its temperature below the ambient one (while the removed heat is rejected at a higher temperature). ', 'Refrigeration has had a large impact on industry, lifestyle, agriculture, and settlement patterns. The idea of preserving food dates back to at least the ancient Roman and Chinese empires. However, mechanical refrigeration technology has rapidly evolved in the last century, from ice harvesting to temperature-controlled rail cars. The introduction of refrigerated rail cars contributed to the westward expansion of the United States, allowing settlement in areas that were not on main transport channels such as rivers, harbors, or valley trails. Settlements were also developing in infertile parts of the country, filled with newly discovered natural resources.  These new settlement patterns sparked the building of large cities which are able to thrive in areas that were otherwise thought to be inhospitable, such as Houston, Texas, and Las Vegas, Nevada.', '../images/refrigeration.png', 0, 51, '2020-06-23 20:58:07', 0),
(4, 1, 'z - test Plywood', 'Plywood is a material manufactured from thin layers or \"plies\" of wood veneer that are glued together with adjacent layers having their wood grain rotated up to 90 degrees to one another.', 'All plywoods bind resin and wood fibre sheets (cellulose cells are long, strong and thin) to form a composite material. This alternation of the grain is called cross-graining and has several important benefits: it reduces the tendency of wood to split when nailed at the edges; it reduces expansion and shrinkage, providing improved dimensional stability; and it makes the strength of the panel consistent across all directions. There is usually an odd number of plies, so that the sheet is balanced—this reduces warping. Because plywood is bonded with grains running against one another and with an odd number of composite parts, it has high stiffness perpendicular to the grain direction of the surface ply.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Spruce_plywood.JPG/300px-Spruce_plywood.JPG', 0, 51, '2020-05-18 01:37:54', 0),
(5, 1, 'z - test Electricity', 'Electricity is the set of physical phenomena associated with the presence and motion of matter that has a property of electric charge.', 'When a charge is placed in a location with a non-zero electric field, a force will act on it. The magnitude of this force is given by Coulomb\'s law. Thus, if that charge were to move, the electric field would be doing work on the electric charge. Thus we can speak of electric potential at a certain point in space, which is equal to the work done by an external agent in carrying a unit of positive charge from an arbitrarily chosen reference point to that point without any acceleration and is typically measured in volts.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Lightning3.jpg/220px-Lightning3.jpg', 0, 51, '2020-05-18 01:37:54', 0),
(25, 2, 'z - testing: Airplanes', 'They fly', 'An airplane or aeroplane (informally plane) is a powered, fixed-wing aircraft that is propelled forward by thrust from a jet engine, propeller or rocket engine. Airplanes come in a variety of sizes, shapes, and wing configurations. The broad spectrum of uses for airplanes includes recreation, transportation of goods and people, military, and research. Worldwide, commercial aviation transports more than four billion passengers annually on airliners[1] and transports more than 200 billion tonne-kilometers[2] of cargo annually, which is less than 1% of the world\'s cargo movement.[3] Most airplanes are flown by a pilot on board the aircraft, but some are designed to be remotely or computer-controlled such as drones.\n\nhello', 'https://scx1.b-cdn.net/csz/news/800/2019/toomanyairpl.jpg', 0, 42, '2020-05-30 09:13:53', 0),
(26, 2, 'z - testing: Air Conditioners', 'System for controlling the humidity, ventilation, and temperature in a building or vehicle', 'Pretium lectus quam id leo in vitae turpis massa. Placerat vestibulum lectus mauris ultrices eros in cursus turpis. Convallis a cras semper auctor neque vitae. Dignissim diam quis enim lobortis scelerisque fermentum dui faucibus. Non diam phasellus vestibulum lorem sed. Id diam vel quam elementum pulvinar. Ut faucibus pulvinar elementum integer enim neque volutpat. Morbi tristique senectus et netus. Suspendisse potenti nullam ac tortor vitae. Ut morbi tincidunt augue interdum velit euismod in pellentesque massa. Nibh tellus molestie nunc non blandit massa enim. Arcu cursus vitae congue mauris rhoncus. Massa placerat duis ultricies ultrices.', 'https://www.alternativeheatingandair.com/wp-content/uploads/2017/07/DN-N4A3-R-grid.png', 0, 51, '2020-05-30 09:13:53', 0),
(27, 1, 'z - test Air', 'Atmosphere of Earth', 'The atmosphere of Earth is the layer of gases, commonly known as air, that surrounds the planet Earth and is retained by Earth\'s gravity. The atmosphere of Earth protects life on Earth by creating pressure allowing for liquid water to exist on the Earth\'s surface, absorbing ultraviolet solar radiation, warming the surface through heat retention (greenhouse effect), and reducing temperature extremes between day and night (the diurnal temperature variation).\r\n\r\nBy volume, dry air contains 78.09% nitrogen, 20.95% oxygen, 0.93% argon, 0.04% carbon dioxide, and small amounts of other gases.[8] Air also contains a variable amount of water vapor, on average around 1% at sea level, and 0.4% over the entire atmosphere. Air composition, temperature, and atmospheric pressure vary with altitude, and air suitable for use in photosynthesis by terrestrial plants and breathing of terrestrial animals is found only in Earth\'s troposphere and in artificial atmospheres.', 'https://www.thoughtco.com/thmb/u4lrTQTaL53yjnngajEkywr3MmM=/1941x1456/smart/filters:no_upscale()/GettyImages-914450516-5a831486642dca0037213a33.jpg', 0, 51, '2020-05-30 09:14:40', 0),
(44, 2, 'Motors and Controls', 'Electrical Motors and Motor Controls (Variable Speed Drives, etc) are crucial to most mechanized industrial processes and equipment.', 'Motors are a crucial part of any mechanized process and provide a means to do the majority of the mechanical work in most facilities.  Motors convert electrical energy into mechanical work to provide power to a wide range of applications including air compressors, fans, pumps, hydraulics, mixers, conveyors, and much more.', 'https://live.staticflickr.com/65535/50069229503_243696380c_b.jpg', 0, 51, '2020-06-29 23:04:50', 0),
(45, 2, 'Pumps', 'Pumps provide a typical utility required throughout industry.', 'Centrifugal pumps are the most common type found in industry, followed by positive displacement pumps (used in hydraulics), pneumatic diaphragm pumps, peristaltic pumps, and other specialty pumps. \n\nUnless otherwise noted this section speaks to centrifugal pumps when addressing pump performance and efficiency. Changes in hydraulic energy required (pressure and flow) will translate to any pumping system. ', 'https://live.staticflickr.com/65535/50066427331_ddae8822f2_b.jpg', 0, 51, '2020-07-01 18:11:01', 0),
(46, 2, 'Boilers and Steam', 'Boilers and Steam Systems are found in a large subset of industrial facilities', 'Steam energy offered a great breakthrough in the 1800’s, providing mechanical energy through steam engines. Steam is now more commonly used for heating in cooking vessels, material drying, building heat,  etc. Direct injection of steam can add moisture along with heat. ', 'https://live.staticflickr.com/65535/50070285347_17c30ab100_b.jpg', 0, 51, '2020-07-02 19:39:56', 1),
(47, 2, 'Thermal Systems', 'Many industrial processes require encouraging or resisting thermal energy transfer.', 'Heat transfer technologies include heat exchangers, cooling towers, fan cooling, direct impingement and other methods.  Heat transfer is discouraged with insulation, vacuums, reduced emissivity, etc. ', 'https://live.staticflickr.com/65535/50069411093_68ab30e548_b.jpg', 0, 58, '2020-07-02 21:31:22', 0),
(48, 2, 'Refrigeration', 'Refrigeration technology is important in many industrial processes.', 'Vapor compression is the most common refrigeration technology. Mechanical energy input to a compressor enables absorbing heat in cooler environment and discharging it to a warmer environment. ', 'https://live.staticflickr.com/65535/50070312237_69edda5158_b.jpg', 0, 51, '2020-07-02 22:10:36', 0),
(49, 3, 'Utility Billing', 'Utility bills and associated potential savings are based on more than the commodity.', 'Utility bills are based not only on the commodity. They can also be based on the rate of use (Dem...', 'https://www.bing.com/images/search?view=detailV2&ccid=Z3%2fFVsU%2b&id=60963F9A86CC05CA8E3879EC9CD61C', 0, 42, '2020-07-02 22:40:27', 0),
(50, 1, 'Wastewater Treatment', 'Municipalities and industry need to treat wastewater before discharging it to the environment.', 'Wastewater treatment systems can address a multitude of potential issues including: PH levels, oxygen demand (chemical or biological), pathogens, turbidity, debris and other contamination.\n\nCommon processes might include screening, filtration, sedimentation settling, PH balancing, disinfection, aeration, and anaerobic digestion.', 'https://live.staticflickr.com/65535/50087489383_757fc9c91e_b.jpg', 0, 51, '2020-07-07 20:46:38', 0);

-- --------------------------------------------------------

--
-- Table structure for table `Temp_Cards`
--

CREATE TABLE `Temp_Cards` (
  `tempCardId` int(10) UNSIGNED NOT NULL,
  `tempCardType` tinyint(3) UNSIGNED NOT NULL,
  `tempTitle` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tempUserId` int(10) UNSIGNED NOT NULL,
  `tempCreated` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Temp_Cards`
--

INSERT INTO `Temp_Cards` (`tempCardId`, `tempCardType`, `tempTitle`, `tempUserId`, `tempCreated`) VALUES
(47, 0, 'Engines', 42, '2020-06-30 21:10:53'),
(59, 1, 'Strange AC Units', 42, '2020-06-23 09:10:21'),
(60, 0, 'Some Links', 42, '2020-07-07 21:20:01'),
(100, 0, 'Off Site Resource Links', 51, '2020-07-03 17:55:16'),
(101, 0, 'Improve Boiler Combustion Efficiency ', 58, '2020-07-03 17:28:05'),
(105, 0, 'Improve the Condensate System', 58, '2020-07-10 18:54:00'),
(106, 0, 'Reduce Heat Loss', 51, '2020-07-03 17:31:09'),
(120, 0, 'Power Quality', 58, '2020-07-10 18:52:52'),
(128, 10, 'eoowerwerwer', 42, '2020-07-07 21:33:22');

-- --------------------------------------------------------

--
-- Table structure for table `Temp_Headers`
--

CREATE TABLE `Temp_Headers` (
  `tempHeaderId` int(10) UNSIGNED NOT NULL,
  `tempTitle` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tempInternal` tinyint(3) UNSIGNED NOT NULL,
  `tempUserId` int(10) UNSIGNED NOT NULL,
  `tempCreated` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `Temp_Pages`
--

CREATE TABLE `Temp_Pages` (
  `tempPageId` int(10) UNSIGNED NOT NULL,
  `tempPageType` int(10) UNSIGNED NOT NULL,
  `tempName` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tempTitle` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tempDescription` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
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
(42, 'Silverware', 'd8e7859c74c2672a13a2388538143c99$631f9c78dbc16fbd3b013aa7903a8527cee7d46befeb496b7510b1dcb4ae95c0', 'Zachary', 'Thomas', 'thomasza@oregonstate.edu', 4, '2020-05-14 20:39:15'),
(47, 'rogrogrog', '8a3c5ecabadca6102a92052e5f6160d3$59606e43e8086a5cb735dfc87244f218638a629133558c6701390129ec8bb71a', 'rog', 'rog', 'rog@gmail.com', 4, '2020-06-01 20:39:15'),
(51, 'JoeJunker', 'b755592eabbdac736d8c5907fa64fa11$fae30b426545c803420b3f7f0bd4f1e80fd99ea09336ea525c769ef7041d1679', 'Joe', 'Junker', 'joseph.f.junker@gmail.com', 4, '2020-06-02 20:39:15'),
(52, 'mattye', '162359f020e75cd94459a944800b5af8$034d4ce4efe2e595ff579efd68a2f4e0a2b72c16efb54ac333e6be521434d38d', 'Ethan', 'Matty', 'mattye.eec@gmail.com', 4, '2020-06-10 20:39:15'),
(54, 'martzal', '27d9aeff2e1c3e683f042480b6990a5c$963d962575ce1108cf5785fc42778ad0483050a80c50e8d3d29632f6af73f1a9', 'Ali', 'Martz', 'martzal.eec@gmail.com', 3, '2020-06-28 20:39:15'),
(55, 'peterj', '73a148776eaf3db8dee5b4cc5af1542d$c4d554f54a266e74299e82af3884f39d4e36686054f90837f7753b2d4b77a6f4', 'Julian', 'Peter', 'peterj.eec@gmail.com', 3, '2020-06-30 20:39:15'),
(56, 'ryanfrench', '8fdce1d0b4394d7a6dd55dd4d1318d54$b36510750272738b7d2de631057527b3ac1547db5d9ef6da8728886d523eca99', 'Ryan', 'French', 'frenchr.eec@gmail.com', 3, '2020-07-05 20:39:15'),
(57, 'MatthewThomas', 'a532335063fda0518a4a347b0a295166$05c83d3322dbbe787d420353fa83b3ad7b38e5b163d9d784bf752c8b7ebedb15', 'Matthew', 'Thomas', 'matthewthomas.eec@gmail.com', 3, '2020-07-02 20:39:15'),
(58, 'ryanfrench2', '0f035817ef3a5ebb3b7bedc75f6d5245$950542aafbfdeeceb6e32fcf2d06f5b2c076465e6fce3ef36b052d9ba6290404', 'Ryan', 'French', 'frenchr@oregonstate.com', 3, '2020-07-08 20:47:39'),
(59, 'djunker', '78d288ab098c3cb5d6d2ba21034e69c1$24786ffa47a290b250ffff18f0cfd703b86c773cf5f911e75fcf6d19989e700d', 'Devlin', 'Junker', 'devlin.junker@gmail.com', 3, '2020-07-10 01:36:09'),
(60, 'taylorad', 'b320c2b10ea1a5fd6a5df5b60b476a1a$76c9c4d174243210d40e54aa87e6b14926de7e3d7c1b229e7fcea48e98d65d85', 'Adam', 'Taylor', 'taylorad.eec@gmail.com', 1, '2020-07-13 17:38:47');

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
-- Indexes for table `Headers`
--
ALTER TABLE `Headers`
  ADD PRIMARY KEY (`headerId`),
  ADD KEY `user_header_fk` (`userId`),
  ADD KEY `page_fk` (`pageId`);

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
-- Indexes for table `Pages`
--
ALTER TABLE `Pages`
  ADD PRIMARY KEY (`pageId`),
  ADD KEY `user_page_fk` (`userId`);

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
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Cards`
--
ALTER TABLE `Cards`
  MODIFY `cardId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=132;

--
-- AUTO_INCREMENT for table `Headers`
--
ALTER TABLE `Headers`
  MODIFY `headerId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `Icons`
--
ALTER TABLE `Icons`
  MODIFY `iconType` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `Items`
--
ALTER TABLE `Items`
  MODIFY `itemId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2335;

--
-- AUTO_INCREMENT for table `Pages`
--
ALTER TABLE `Pages`
  MODIFY `pageId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `userId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

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
-- Constraints for table `Headers`
--
ALTER TABLE `Headers`
  ADD CONSTRAINT `page_fk` FOREIGN KEY (`pageId`) REFERENCES `Pages` (`pageId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_header_fk` FOREIGN KEY (`userId`) REFERENCES `Users` (`userId`);

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
  ADD CONSTRAINT `user_page_fk` FOREIGN KEY (`userId`) REFERENCES `Users` (`userId`);

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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
