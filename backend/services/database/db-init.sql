-- phpMyAdmin SQL Dump
-- version 4.9.4
-- https://www.phpmyadmin.net/
--
-- Host: classmysql.engr.oregonstate.edu:3306
-- Generation Time: Jun 04, 2020 at 11:40 PM
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
  `orderIndex` int(10) UNSIGNED NOT NULL,
  `title` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` int(10) UNSIGNED NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `approved` tinyint(3) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Cards`
--

INSERT INTO `Cards` (`cardId`, `headerId`, `orderIndex`, `title`, `userId`, `created`, `approved`) VALUES
(1, 3, 1, 'Boiler Card', 2, '2020-05-22 21:22:22', 1),
(2, 3, 1, 'Danger', 2, '2020-05-22 21:22:22', 1),
(3, 1, 2, 'Figures, Charts, and Tables', 2, '2020-05-23 17:18:45', 1),
(8, 2, 1, 'Reduce Compressed Air Pressure\r\n', 1, '2020-05-22 21:22:22', 1),
(9, 1, 1, 'Pros', 1, '2020-06-02 20:58:31', 1),
(13, 1, 1, 'Cons', 1, '2020-05-23 22:20:20', 0),
(16, 1, 1, 'Caveats', 1, '2020-05-23 22:27:44', 0),
(17, 1, 1, 'Best Practices', 1, '2020-05-23 22:28:37', 0),
(18, 1, 1, 'Rules of Thumb', 1, '2020-05-23 22:31:49', 0),
(19, 1, 7, 'Tips', 1, '2020-05-23 22:33:25', 0),
(27, 2, 2, 'Reduce Compressed Air Required', 1, '2020-05-23 23:11:46', 0),
(29, 1, 9, 'Site Resource Test', 1, '2020-05-24 15:42:55', 0),
(30, 3, 4, 'Test', 1, '2020-05-25 03:22:57', 0),
(36, 1, 9, 'Test', 1, '2020-05-26 21:16:51', 0),
(41, 3, 4, 'a', 1, '2020-06-02 22:51:25', 0),
(42, 3, 5, 'swa', 1, '2020-06-02 22:52:01', 0),
(43, 4, 1, 'Test', 1, '2020-06-03 00:27:34', 0);

-- --------------------------------------------------------

--
-- Table structure for table `Headers`
--

CREATE TABLE `Headers` (
  `headerId` int(10) UNSIGNED NOT NULL,
  `pageId` int(10) UNSIGNED NOT NULL,
  `orderIndex` int(10) UNSIGNED NOT NULL,
  `title` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` int(10) UNSIGNED NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `approved` tinyint(3) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Headers`
--

INSERT INTO `Headers` (`headerId`, `pageId`, `orderIndex`, `title`, `userId`, `created`, `approved`) VALUES
(1, 2, 1, 'Compressed Air General', 2, '2020-05-22 21:22:38', 1),
(2, 2, 1, 'Compressed Air Opportunities to Consider', 1, '2020-05-22 21:22:38', 1),
(3, 1, 1, 'Boilers', 1, '2020-05-22 21:22:38', 1),
(4, 3, 1, 'Refrigeration', 2, '2020-05-22 21:22:38', 1);

-- --------------------------------------------------------

--
-- Table structure for table `Icons`
--

CREATE TABLE `Icons` (
  `iconType` int(10) UNSIGNED NOT NULL,
  `typeKeyword` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `typeName` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Icons`
--

INSERT INTO `Icons` (`iconType`, `typeKeyword`, `typeName`) VALUES
(1, 'Pros', 'plus'),
(2, 'Cons', 'minus'),
(3, 'Rules of Thumb', 'thumbs-up'),
(4, 'Caveats', 'skull'),
(5, 'Fire', 'fire'),
(6, 'Electricity', 'bolt'),
(7, 'Best Practices', 'trophy'),
(8, 'Tips', 'hand-point-right'),
(9, 'Blueprint', 'map'),
(10, 'Opportunity Chance', 'flag'),
(11, 'Opportunity', 'check-square'),
(12, 'Point', 'square-full'),
(13, 'Opportunity Description', 'opportunity-desc'),
(14, 'Question', 'question'),
(15, 'Note', 'pencil-alt'),
(16, 'File', 'file'),
(17, 'Document', 'copy'),
(18, 'In Depth Resource', 'info'),
(19, 'Link', 'link'),
(20, 'Figure', 'chart-area');

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
  `orderIndex` int(10) UNSIGNED NOT NULL,
  `parentId` int(10) UNSIGNED DEFAULT NULL,
  `iconType` int(10) UNSIGNED NOT NULL,
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

INSERT INTO `Items` (`itemId`, `cardId`, `orderIndex`, `parentId`, `iconType`, `contentText`, `contentUrl`, `contentLabel`, `userId`, `created`, `approved`) VALUES
(1, 1, 1, NULL, 5, 'This guide focuses mainly on screw and reciprocating compressors. These are the most common types of compressors used in the northwest. Other types of compressors such as rotary vane, centrifugal, lobe and radial compressors are much less common and are only introduced in this guide.\r\n', '', '', 2, '2020-05-23 18:41:12', 1),
(2, 1, 1, 1, 5, '80 to 90% of energy for compressed air is lost as heat\r\n', '', '', 2, '2020-05-23 18:41:04', 1),
(3, 1, 1, 2, 5, 'Nested under 85 psi\r\n', '', '', 2, '2020-05-23 18:41:00', 1),
(4, 1, 1, 3, 5, '85 PSI is the standard required minimum inlet pressure for most common industrial pneumatic equipment\r\n', '', '', 2, '2020-05-23 18:40:57', 1),
(5, 1, 1, 3, 5, 'Expect a 1% drop in compressor energy and cost per 2 PSI in compressor outlet pressure drop\r\n', '', '', 1, '2020-05-23 18:40:52', 1),
(6, 2, 1, NULL, 6, 'electric', '', '', 1, '2020-05-22 21:23:14', 1),
(7, 3, 1, NULL, 20, '', 'https://i.imgur.com/V0dkW5l.png', 'Screw compressor power vs output for various control strategies', 1, '2020-05-22 22:34:06', 1),
(8, 3, 1, NULL, 20, '', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Two-Stage_Air_Compressor_assembled_on_a_vertical_tank_and_equipped_with_a_Joule-Thomson_%28JT%29_type_refrigerated_compressed_air_dryer.jpg/1024px-Two-Stage_Air_Compressor_assembled_on_a_vertical_tank_and_equipped_with_a_Joule-Thomson_%28JT%29_type_refrigerated_compressed_air_dryer.jpg', 'Technical Illustration of a two-stage air compressor', 2, '2020-05-22 22:33:57', 1),
(23, 8, 1, NULL, 8, 'Reduced air pressure not only reduces air compressor energy required for a set volume of air, it will also result in less air volume consumed by leaks and unregulated air uses (although it can be hard to estimate the volume reduction).\r\n', '', '', 1, '2020-05-22 21:23:14', 1),
(24, 8, 1, NULL, 11, 'System pressure is set over 100 PSI for a compressed air system serving standard industrial utilities and controls.\r\n', '', '', 2, '2020-05-22 21:23:14', 1),
(25, 9, 1, NULL, 1, 'Versatile. Offers compact energy density. Easy quick fix for many issues. ', '', '', 1, '2020-06-02 22:38:04', 1),
(26, 9, 2, NULL, 1, 'Spark free for potentially explosive environments', '', '', 2, '2020-06-02 22:38:17', 1),
(28, 16, 1, NULL, 5, 'May be windy', '', '', 1, '2020-05-23 22:30:55', 0),
(29, 17, 1, NULL, 7, 'Looped distribution systems can help maintain uniform pressure throughout a compressed air system.', '', '', 1, '2020-05-23 22:30:57', 0),
(30, 17, 2, NULL, 7, 'Well sized compressed air lines reduce pressure loss', '', '', 1, '2020-05-23 22:30:58', 0),
(31, 17, 3, NULL, 7, 'A well designed compressed air system should typically have a maximum 10 PSI pressure drop in delivering air to at any end-use in the system', '', '', 1, '2020-05-23 22:31:00', 0),
(32, 13, 1, NULL, 2, 'Energy intensive. Function provided can often be replace with significantly lower power approach.\r\n', '', '', 2, '2020-05-23 22:52:18', 1),
(33, 18, 1, NULL, 3, 'Expect a 1% drop in compressor energy and cost per 2 PSI in compressor outlet pressure drop', '', '', 1, '2020-05-23 22:31:50', 0),
(34, 18, 2, NULL, 3, '85 PSI is the standard required minimum inlet pressure for most common industrial pneumatic equipment', '', '', 1, '2020-05-23 22:31:50', 0),
(35, 18, 3, 34, 3, 'Nested under 85 psi', '', '', 1, '2020-05-23 22:31:50', 0),
(36, 18, 4, NULL, 3, '80 to 90% of energy for compressed air is lost as heat', '', '', 1, '2020-05-23 22:31:50', 0),
(37, 19, 1, NULL, 8, 'A pressure gauge with a standard quick connect used in compressed air lines can be useful in diagnosing pressure drops', '', '', 1, '2020-05-23 22:33:25', 0),
(42, 13, 1, 32, 6, 'Long sentence', '', '', 2, '2020-05-23 22:52:17', 0),
(43, 13, 2, NULL, 5, 'Burns', '', '', 1, '2020-05-23 22:49:44', 1),
(68, 27, 1, NULL, 4, 'Energy savings associated with reductions in compressed air use are very dependant on the compressor control strategy. In the worst case, a compressor with blow off control might not yield any energy savings with compressed air use reductions, and one with inlet modulation might yield only a small part of potential savings.', '', '', 1, '2020-05-23 23:11:46', 0),
(69, 27, 2, NULL, 10, 'Compressed air leak volume exceeds 20 to 30% of air used in the process.', '', '', 1, '2020-05-23 23:11:47', 0),
(70, 27, 3, NULL, 11, 'Reduce compressed air leaks', '', '', 1, '2020-05-23 23:11:47', 0),
(71, 27, 4, 70, 13, 'Compressed air is an expensive utility, but leaks can go uncorrected as they do not make a mess.', '', '', 1, '2020-05-23 23:11:47', 0),
(72, 27, 5, 70, 12, 'Determine the leak load by checking compressor output when there is no productive use (typically during breaks or after hours.)', '', '', 1, '2020-05-23 23:11:47', 0),
(73, 29, 1, NULL, 17, 'This guide focuses mainly on screw and reciprocating compressors. These are the most common types of compressors used in the northwest. Other types of compressors such as rotary vane, centrifugal, lobe and radial compressors are much less common and are only introduced in this guide.', 'https://drive.google.com/file/d/12Co0C6JBK5CqoYhZQBcD0VX6JVBXy86o/view', 'Assessing Industrial Air Compressor', 1, '2020-05-24 15:54:25', 0),
(74, 30, 1, NULL, 20, '', 'https://www.hurstboiler.com/images2/series-300_shrink.png', 'Boiler Picture', 1, '2020-05-26 21:02:38', 0),
(75, 30, 2, NULL, 14, 'Some text about boilers', '', '', 1, '2020-05-25 03:22:57', 0),
(76, 30, 3, NULL, 19, 'Hurst Series 300', 'https://www.hurstboiler.com/boilers/scotch_marine/series_300', 'Big boiler link', 1, '2020-05-26 21:02:19', 0),
(84, 36, 1, NULL, 2, 'Test', '', '', 1, '2020-05-26 21:16:51', 0),
(85, 36, 2, NULL, 20, '', 'https://images-na.ssl-images-amazon.com/images/I/81LtIK5MYQL._AC_SY450_.jpg', 'Test', 1, '2020-05-26 21:16:51', 0),
(90, 9, 1, 25, 5, 'test', '', '', 1, '2020-06-02 22:42:01', 0),
(91, 41, 1, NULL, 4, 'a', '', '', 1, '2020-06-02 22:51:25', 0),
(92, 42, 1, NULL, 9, 'a', '', '', 1, '2020-06-02 22:52:01', 0),
(93, 42, 2, 92, 20, 'b', '', '', 1, '2020-06-02 22:52:01', 0),
(94, 42, 3, 93, 20, 'c', '', '', 1, '2020-06-02 22:52:02', 0),
(95, 42, 4, 93, 18, 'd', '', '', 1, '2020-06-02 22:52:02', 0),
(96, 42, 5, 95, 10, 'e', '', '', 1, '2020-06-02 22:52:02', 0);

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
(5, 1, 'Electricity', 'Electricity is the set of physical phenomena associated with the presence and motion of matter that has a property of electric charge.', 'When a charge is placed in a location with a non-zero electric field, a force will act on it. The magnitude of this force is given by Coulomb\'s law. Thus, if that charge were to move, the electric field would be doing work on the electric charge. Thus we can speak of electric potential at a certain point in space, which is equal to the work done by an external agent in carrying a unit of positive charge from an arbitrarily chosen reference point to that point without any acceleration and is typically measured in volts.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Lightning3.jpg/220px-Lightning3.jpg', 1, '2020-05-18 01:37:54', 1),
(24, 0, 'Test Subject', 'Test Test 123', 'Test Description', 'https://images-na.ssl-images-amazon.com/images/I/81LtIK5MYQL._AC_SY450_.jpg', 1, '2020-05-26 21:17:21', 0),
(25, 0, 'Airplanes', 'They fly', 'An airplane or aeroplane (informally plane) is a powered, fixed-wing aircraft that is propelled forward by thrust from a jet engine, propeller or rocket engine. Airplanes come in a variety of sizes, shapes, and wing configurations. The broad spectrum of uses for airplanes includes recreation, transportation of goods and people, military, and research. Worldwide, commercial aviation transports more than four billion passengers annually on airliners[1] and transports more than 200 billion tonne-kilometers[2] of cargo annually, which is less than 1% of the world\'s cargo movement.[3] Most airplanes are flown by a pilot on board the aircraft, but some are designed to be remotely or computer-controlled such as drones.', 'https://scx1.b-cdn.net/csz/news/800/2019/toomanyairpl.jpg', 1, '2020-05-30 09:13:53', 0),
(26, 0, 'Air Conditioning', 'It makes the air cold', 'Air conditioning (often referred to as AC, A/C, or air con)[1] is the process of removing heat and moisture from the interior of an occupied space to improve the comfort of occupants. Air conditioning can be used in both domestic and commercial environments. This process is most commonly used to achieve a more comfortable interior environment, typically for humans and other animals; however, air conditioning is also used to cool and dehumidify rooms filled with heat-producing electronic devices, such as computer servers, power amplifiers, and to display and store some delicate products, such as artwork.\r\n\r\nAir conditioners often use a fan to distribute the conditioned air to an enclosed space such as a building or a car to improve thermal comfort and indoor air quality. Electric refrigerant-based AC units range from small units that can cool a small bedroom, which can be carried by a single adult, to massive units installed on the roof of office towers that can cool an entire building.', 'https://images.homedepot-static.com/productImages/e3450cc4-058e-4350-94f2-248d6dd4c52b/svn/lg-electronics-window-air-conditioners-lw1216er-64_1000.jpg', 1, '2020-05-30 09:13:53', 0),
(27, 1, 'Air', 'Atmosphere of Earth', 'The atmosphere of Earth is the layer of gases, commonly known as air, that surrounds the planet Earth and is retained by Earth\'s gravity. The atmosphere of Earth protects life on Earth by creating pressure allowing for liquid water to exist on the Earth\'s surface, absorbing ultraviolet solar radiation, warming the surface through heat retention (greenhouse effect), and reducing temperature extremes between day and night (the diurnal temperature variation).\r\n\r\nBy volume, dry air contains 78.09% nitrogen, 20.95% oxygen, 0.93% argon, 0.04% carbon dioxide, and small amounts of other gases.[8] Air also contains a variable amount of water vapor, on average around 1% at sea level, and 0.4% over the entire atmosphere. Air composition, temperature, and atmospheric pressure vary with altitude, and air suitable for use in photosynthesis by terrestrial plants and breathing of terrestrial animals is found only in Earth\'s troposphere and in artificial atmospheres.', 'https://www.thoughtco.com/thmb/u4lrTQTaL53yjnngajEkywr3MmM=/1941x1456/smart/filters:no_upscale()/GettyImages-914450516-5a831486642dca0037213a33.jpg', 1, '2020-05-30 09:14:40', 0);

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `userId` int(10) UNSIGNED NOT NULL,
  `username` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `firstName` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastName` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` tinyint(3) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`userId`, `username`, `password`, `firstName`, `lastName`, `email`, `role`) VALUES
(1, 'John1234', 'XozpE-34__woqpZX', 'John', 'Doe', 'doejohn@oregonstate.edu', 4),
(2, 'Jane5678', 'iopwerZowPo!', 'Jane', 'Doe', 'doejane@oregonstate.edu', 3),
(8, 'KayVan', 'aerw34234dwsr24', 'Kyra', 'Vannest', 'kyra@gmail.com', 2),
(9, 'Emmmm', 'dafs234@!0234', 'Emmie', 'Henningsen', 'hennemmi@gmail.com', 3),
(10, 'jperson222', 'iweoriewopr#4234', 'John', 'Todd', 'jperson222@gmail.com', 1),
(11, 'DelTruax', 'weraqio234#', 'Delmar', 'Truax', 'DelTruax@gmail.com', 3),
(12, 'Lori1', 'wer0-=3249C', 'Lori', 'Prettyman', 'Lori1@gmail.com', 4),
(13, 'Brandee', 'aposirfewior$234', 'Brandee', 'Rentz', 'Brandee@gmail.com', 2),
(14, 'Cathie322', 'wep[ro23@#$234', 'Cathie', 'Brindle', 'Cathie322@gmail.com', 2),
(15, 'Anton6', 'oasopi0-324', 'Antonetta', 'Owuso', 'Anton6@gmail.com', 2),
(16, 'Roy321', ']2[34o2340-kcopzf', 'Roy', 'Wrinkle', 'Roy321@yahoo.com', 1),
(17, 'Eddie111', 'ewoep[o23[op4', 'Eddie', 'Beaufort', 'Eddie111@yahoo.com', 1),
(18, 'Cindi95', 'wp[erpo[234#234', 'Cindi', 'Beaufort', 'Cindi95@msn.com', 1),
(19, 'Shaneka', 'ertop[3[p4533', 'Shaneka', 'Estevez', 'Shaneka@gmail.com', 3),
(20, 'Trinity3', 'owe-=0r2-30=4[pas', 'Trinity', 'Warford', 'Trinity3@yahoo.com', 2),
(21, 'Rueben777', 'op[owerp[3#324', 'Rueben', 'Pella', 'Rueben777@oregonstate.edu', 4),
(22, 'Swindler111', 'wwer[pwop[ep[o344234234', 'Mira', 'Swindler', 'Swindler111@oregonstate.edu', 1),
(23, 'Tammy', 'wadsf[owepo[rp[234', 'Tammara', 'Stennis', 'Tammy@oregonstate.edu', 1),
(24, 'Buster', 'poweo[r2[34-0234', 'Buster', 'Clemente', 'Buster@yahoo.com', 1),
(25, 'plywood111', 'owr-0=o230podap[zxwr', 'Rhett', 'Hepworth', 'plywood111@gmail.com', 1),
(26, 'Lperson9', 'ewrop[p[ioixci$2123', 'Errol', 'Mcintosh', 'Lperson9@gmail.com', 1),
(27, 'NewAccount', 'pdsfpowep[rowe#3423424', 'Abraham', 'Buchan', 'NewAccount@yahoo.com', 1),
(28, 'MyUserName', 'P!sdop!faer34#', 'Sade', 'Kauppi', 'MyUserName@yahoo.com', 1),
(29, 'DogsAreGreat', 'DOWero2342340-asidx34', 'Lexie', 'Chupp', 'DogsAreGreat@gmail.com', 1),
(30, 'NewEmail552', 'po[sdop[[pop[ow####234', 'Delilah', 'Serna', 'NewEmail552@gmail.com', 1),
(31, 'Roll333', 'sppa[wop[op[wop[er#@$@$$@', 'Roland', 'Billings', 'Roll333@yahoo.com', 1),
(32, 'CatsAreGreat', 'OIAWE)PR23-=423-=4as', 'Tori', 'Brayman', 'CatsAreGreat@yahoo.com', 1),
(33, 'J_M', 'saopf[[powe3$@#$234', 'Joesephine', 'Morein', 'J_M@gmail.com', 1),
(34, 'C33', 'dsfgp[wepot[ri$', 'Carrol', 'Becker', 'C33@gmail.com', 1),
(35, 'Gayla2', 'ap[owep[orwp[oer32333', 'Gayla', 'Staley', 'Gayla2@yahoo.com', 1),
(36, 'Danyelle44', 'dspo[irt324545', 'Danyelle', 'Elmer', 'Danyelle44@yahoo.com', 1),
(37, 'Lois99', '324324234a[]pr][werp[]we', 'Lois', 'Malin', 'Lois99@gmail.com', 1),
(38, 'Gemstone42', 'dsap][fp][we][prw2423=-4', 'Amber', 'Liakos', 'Amber@gmail.com', 1),
(39, 'Bambi22', 'ootrioytoipryirty222', 'Bambi', 'Heuer', 'Bambi22@gmail.com', 3),
(40, 'Merriam', ']we[]rewp[rewp[wrep[34234', 'Dominica', 'Merriam', 'Merriam@yahoo.com', 2),
(41, 'Seth45', 'oteroipietroitroeiporte888', 'Seth', 'Kratzer', 'Seth45@yahoo.com', 1),
(42, 'Silverware', 'wd#X_o@32--41Z!', 'Zachary', 'Thomas', 'thomasza@oregonstate.edu', 4),
(46, 'new123', 'passwordnum', 'Tom', 'Bob', 'someemail@gmail.com', 1);

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
-- Indexes for table `Icons`
--
ALTER TABLE `Icons`
  ADD PRIMARY KEY (`iconType`),
  ADD UNIQUE KEY `typeKeyword` (`typeKeyword`) USING HASH,
  ADD UNIQUE KEY `typeName` (`typeName`) USING HASH;

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
  ADD KEY `user_item_fk` (`userId`),
  ADD KEY `parentId_fk` (`parentId`),
  ADD KEY `iconId_fk` (`iconType`);

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
  ADD UNIQUE KEY `userName` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Cards`
--
ALTER TABLE `Cards`
  MODIFY `cardId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `Headers`
--
ALTER TABLE `Headers`
  MODIFY `headerId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `Icons`
--
ALTER TABLE `Icons`
  MODIFY `iconType` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `Items`
--
ALTER TABLE `Items`
  MODIFY `itemId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=97;

--
-- AUTO_INCREMENT for table `Pages`
--
ALTER TABLE `Pages`
  MODIFY `pageId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `userId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

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
  ADD CONSTRAINT `iconId_fk` FOREIGN KEY (`iconType`) REFERENCES `Icons` (`iconType`),
  ADD CONSTRAINT `parentId_fk` FOREIGN KEY (`parentId`) REFERENCES `Items` (`itemId`) ON DELETE CASCADE ON UPDATE CASCADE,
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
