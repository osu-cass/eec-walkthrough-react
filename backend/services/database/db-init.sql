-- phpMyAdmin SQL Dump
-- version 4.9.4
-- https://www.phpmyadmin.net/
--
-- Host: classmysql.engr.oregonstate.edu:3306
-- Generation Time: May 19, 2020 at 02:27 AM
-- Server version: 10.4.11-MariaDB-log
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
-- Database: `capstone_2019_thomasza`
--

-- --------------------------------------------------------

--
-- Table structure for table `Cards`
--

CREATE TABLE `Cards` (
  `cardId` int(10) UNSIGNED NOT NULL,
  `headerId` int(10) UNSIGNED NOT NULL,
  `title` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` int(10) UNSIGNED NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `approved` tinyint(3) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Cards`
--

INSERT INTO `Cards` (`cardId`, `headerId`, `title`, `userId`, `created`, `approved`) VALUES
(1, 3, 'Boiler Card', 2, '2020-05-17 22:21:14', 1),
(2, 3, 'Danger', 2, '2020-05-17 22:48:56', 1),
(3, 1, 'Figures, Charts, and Tables', 2, '2020-05-17 22:53:11', 1);

-- --------------------------------------------------------

--
-- Table structure for table `Headers`
--

CREATE TABLE `Headers` (
  `headerId` int(10) UNSIGNED NOT NULL,
  `pageId` int(10) UNSIGNED NOT NULL,
  `title` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` int(10) UNSIGNED NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `approved` tinyint(3) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Headers`
--

INSERT INTO `Headers` (`headerId`, `pageId`, `title`, `userId`, `created`, `approved`) VALUES
(1, 2, 'Compressed Air', 2, '2020-05-17 22:17:52', 1),
(2, 2, 'Compressed Air Opportunities to Consider', 1, '2020-05-17 22:18:33', 1),
(3, 1, 'Boilers', 1, '2020-05-19 06:14:17', 1),
(4, 3, 'Refrigeration', 2, '2020-05-19 06:14:17', 1);

-- --------------------------------------------------------

--
-- Table structure for table `Industries_Subjects`
--

CREATE TABLE `Industries_Subjects` (
  `industryId` int(10) UNSIGNED NOT NULL,
  `subjectId` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Industries_Subjects`
--

INSERT INTO `Industries_Subjects` (`industryId`, `subjectId`) VALUES
(4, 1),
(4, 2),
(5, 1),
(5, 3);

-- --------------------------------------------------------

--
-- Table structure for table `Items`
--

CREATE TABLE `Items` (
  `itemId` int(10) UNSIGNED NOT NULL,
  `cardId` int(10) UNSIGNED NOT NULL,
  `parentId` int(10) UNSIGNED NOT NULL,
  `iconType` smallint(5) UNSIGNED NOT NULL,
  `contentText` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contentUrl` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contentLabel` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` int(10) UNSIGNED NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `approved` tinyint(3) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Items`
--

INSERT INTO `Items` (`itemId`, `cardId`, `parentId`, `iconType`, `contentText`, `contentUrl`, `contentLabel`, `userId`, `created`, `approved`) VALUES
(1, 1, 0, 5, 'Hot 1', '', '', 2, '2020-05-17 22:45:43', 1),
(2, 1, 1, 5, 'Hot 2', '', '', 2, '2020-05-17 22:46:12', 1),
(3, 1, 2, 5, 'Hot 3', '', '', 2, '2020-05-17 22:47:24', 1),
(4, 1, 3, 5, 'Hot 4', '', '', 2, '2020-05-17 22:47:52', 1),
(5, 1, 3, 5, 'Hot 4 again', '', '', 1, '2020-05-17 22:48:12', 1),
(6, 2, 0, 6, 'electric', '', '', 1, '2020-05-17 22:50:27', 1),
(7, 3, 0, 20, '', 'https://i.imgur.com/V0dkW5l.png', 'Screw compressor power vs output for various control strategies', 1, '2020-05-17 22:54:48', 1),
(8, 3, 0, 20, '', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Two-Stage_Air_Compressor_assembled_on_a_vertical_tank_and_equipped_with_a_Joule-Thomson_%28JT%29_type_refrigerated_compressed_air_dryer.jpg/1024px-Two-Stage_Air_Compressor_assembled_on_a_vertical_tank_and_equipped_with_a_Joule-Thomson_%28JT%29_type_refrigerated_compressed_air_dryer.jpg', 'Technical Illustration of a two-stage air compressor', 2, '2020-05-17 22:54:48', 1);

-- --------------------------------------------------------

--
-- Table structure for table `Pages`
--

CREATE TABLE `Pages` (
  `pageId` int(10) UNSIGNED NOT NULL,
  `pageType` tinyint(3) UNSIGNED NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `imageUrl` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` int(10) UNSIGNED NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `approved` tinyint(3) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Pages`
--

INSERT INTO `Pages` (`pageId`, `pageType`, `name`, `title`, `description`, `imageUrl`, `userId`, `created`, `approved`) VALUES
(1, 0, 'Boilers', 'A boiler is a closed vessel in which fluid (generally water) is heated.', 'In a fossil fuel power plant using a steam cycle for power generation, the primary heat source will be combustion of coal, oil, or natural gas. In some cases byproduct fuel such as the carbon-monoxide rich offgasses of a coke battery can be burned to heat a boiler; biofuels such as bagasse, where economically available, can also be used. In a nuclear power plant, boilers called steam generators are heated by the heat produced by nuclear fission. Where a large volume of hot gas is available from some process, a heat recovery steam generator or recovery boiler can use the heat to produce steam, with little or no extra fuel consumed; such a configuration is common in a combined cycle power plant where a gas turbine and a steam boiler are used. In all cases the combustion product waste gases are separate from the working fluid of the steam cycle, making these systems examples of External combustion engines.', '../images/boiler.png', 1, '2020-05-18 01:37:54', 1),
(2, 0, 'Compressed Air', 'Compressed air is a common utility found in most industrial facilities', 'Compressed air has been a key industrial utility since the 1800\'s. It can drive pneumatic cylinders, air motors, diaprham pumps and controls. It is capable of reasonably high force actuation, and is a common required utility in equipment packages. It can be used and is often misused to generate air flow for agitation, blow-off, cooling, and motive force applications. Screw compressors currently comprise the majority of industrial compressed air installations, but reciprocating and centrifugal compressors can be found in older or special installations/applications.', '../images/aircompressor.png', 2, '2020-05-18 01:37:54', 1),
(3, 0, 'Refrigeration', 'Refrigeration is the process of cooling a space, substance, or system to lower and/or maintain its temperature below the ambient one (while the removed heat is rejected at a higher temperature). ', 'Refrigeration has had a large impact on industry, lifestyle, agriculture, and settlement patterns. The idea of preserving food dates back to at least the ancient Roman and Chinese empires. However, mechanical refrigeration technology has rapidly evolved in the last century, from ice harvesting to temperature-controlled rail cars. The introduction of refrigerated rail cars contributed to the westward expansion of the United States, allowing settlement in areas that were not on main transport channels such as rivers, harbors, or valley trails. Settlements were also developing in infertile parts of the country, filled with newly discovered natural resources.  These new settlement patterns sparked the building of large cities which are able to thrive in areas that were otherwise thought to be inhospitable, such as Houston, Texas, and Las Vegas, Nevada. In most developed countries, cities are heavily dependent upon refrigeration in supermarkets in order to obtain their food for daily consum', '../images/refrigeration.png', 1, '2020-05-18 01:37:54', 1),
(4, 1, 'Plywood', 'Plywood is a material manufactured from thin layers or \"plies\" of wood veneer that are glued together with adjacent layers having their wood grain rotated up to 90 degrees to one another.', 'All plywoods bind resin and wood fibre sheets (cellulose cells are long, strong and thin) to form a composite material. This alternation of the grain is called cross-graining and has several important benefits: it reduces the tendency of wood to split when nailed at the edges; it reduces expansion and shrinkage, providing improved dimensional stability; and it makes the strength of the panel consistent across all directions. There is usually an odd number of plies, so that the sheet is balanced—this reduces warping. Because plywood is bonded with grains running against one another and with an odd number of composite parts, it has high stiffness perpendicular to the grain direction of the surface ply.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Spruce_plywood.JPG/300px-Spruce_plywood.JPG', 2, '2020-05-18 01:37:54', 1),
(5, 1, 'Electricity', 'Electricity is the set of physical phenomena associated with the presence and motion of matter that has a property of electric charge.', 'When a charge is placed in a location with a non-zero electric field, a force will act on it. The magnitude of this force is given by Coulomb\'s law. Thus, if that charge were to move, the electric field would be doing work on the electric charge. Thus we can speak of electric potential at a certain point in space, which is equal to the work done by an external agent in carrying a unit of positive charge from an arbitrarily chosen reference point to that point without any acceleration and is typically measured in volts.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Lightning3.jpg/220px-Lightning3.jpg', 1, '2020-05-18 01:37:54', 1);

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `userId` int(10) UNSIGNED NOT NULL,
  `userName` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `firstName` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastName` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` tinyint(3) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`userId`, `userName`, `password`, `firstName`, `lastName`, `email`, `role`) VALUES
(1, 'John1234', 'XozpE-34__woqpZX', 'John', 'Doe', 'doejohn@oregonstate.edu', 1),
(2, 'Jane5678', 'iopwerZowPo!', 'Jane', 'Doe', 'doejane@oregonstate.edu', 3);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Cards`
--
ALTER TABLE `Cards`
  ADD PRIMARY KEY (`cardId`),
  ADD UNIQUE KEY `headerId_title` (`headerId`,`title`) USING BTREE,
  ADD KEY `user_card_fk` (`userId`);

--
-- Indexes for table `Headers`
--
ALTER TABLE `Headers`
  ADD PRIMARY KEY (`headerId`),
  ADD UNIQUE KEY `pageId_title` (`pageId`,`title`) USING BTREE,
  ADD KEY `user_header_fk` (`userId`);

--
-- Indexes for table `Industries_Subjects`
--
ALTER TABLE `Industries_Subjects`
  ADD PRIMARY KEY (`industryId`,`subjectId`),
  ADD KEY `subject_fk` (`subjectId`);

--
-- Indexes for table `Items`
--
ALTER TABLE `Items`
  ADD PRIMARY KEY (`itemId`),
  ADD KEY `card_fk` (`cardId`),
  ADD KEY `user_item_fk` (`userId`);

--
-- Indexes for table `Pages`
--
ALTER TABLE `Pages`
  ADD PRIMARY KEY (`pageId`),
  ADD UNIQUE KEY `pageType_name` (`pageType`,`name`) USING BTREE,
  ADD KEY `user_page_fk` (`userId`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`userId`),
  ADD UNIQUE KEY `userName` (`userName`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Cards`
--
ALTER TABLE `Cards`
  MODIFY `cardId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Headers`
--
ALTER TABLE `Headers`
  MODIFY `headerId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `Items`
--
ALTER TABLE `Items`
  MODIFY `itemId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `Pages`
--
ALTER TABLE `Pages`
  MODIFY `pageId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `userId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

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
-- Constraints for table `Industries_Subjects`
--
ALTER TABLE `Industries_Subjects`
  ADD CONSTRAINT `industry_fk` FOREIGN KEY (`industryId`) REFERENCES `Pages` (`pageId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `subject_fk` FOREIGN KEY (`subjectId`) REFERENCES `Pages` (`pageId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Items`
--
ALTER TABLE `Items`
  ADD CONSTRAINT `card_fk` FOREIGN KEY (`cardId`) REFERENCES `Cards` (`cardId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_item_fk` FOREIGN KEY (`userId`) REFERENCES `Users` (`userId`);

--
-- Constraints for table `Pages`
--
ALTER TABLE `Pages`
  ADD CONSTRAINT `user_page_fk` FOREIGN KEY (`userId`) REFERENCES `Users` (`userId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
