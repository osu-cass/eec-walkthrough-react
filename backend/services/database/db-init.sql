-- phpMyAdmin SQL Dump
-- version 4.9.4
-- https://www.phpmyadmin.net/
--
-- Host: engr-db.engr.oregonstate.edu:3307
-- Generation Time: Jun 18, 2020 at 12:39 PM
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
(3, 1, 0, 2, 'Figures, Charts, and Tables', 2, '2020-06-17 17:09:17', 1),
(8, 2, 0, 1, 'Reduce Compressed Air Pressure\r\n', 1, '2020-05-22 21:22:22', 1),
(9, 1, 0, 1, 'Pros', 1, '2020-06-02 20:58:31', 1),
(13, 1, 0, 1, 'Cons', 1, '2020-05-23 22:20:20', 0),
(16, 1, 0, 1, 'Caveats', 1, '2020-05-23 22:27:44', 0),
(17, 1, 0, 1, 'Best Practices', 1, '2020-05-23 22:28:37', 0),
(18, 1, 0, 1, 'Rules of Thumb', 1, '2020-05-23 22:31:49', 0),
(19, 1, 0, 7, 'Tips', 1, '2020-05-23 22:33:25', 0),
(27, 2, 0, 2, 'Reduce Compressed Air Required', 1, '2020-05-23 23:11:46', 0),
(29, 1, 0, 9, 'Site Resource Test', 1, '2020-05-24 15:42:55', 0),
(30, 3, 0, 4, 'Test', 1, '2020-05-25 03:22:57', 0),
(36, 1, 0, 9, 'Tools', 1, '2020-06-09 19:49:41', 0),
(42, 3, 0, 5, 'Test for Meeting', 1, '2020-06-09 05:47:48', 0),
(47, 16, 0, 1, 'Engines', 47, '2020-06-16 09:03:35', 1),
(48, 17, 0, 1, 'Signs of Turbulence ', 47, '2020-06-09 18:51:47', 0),
(49, 18, 0, 1, 'Environment', 47, '2020-06-16 09:03:55', 1),
(52, 20, 0, 1, 'Test', 47, '2020-06-09 21:15:46', 0),
(53, 18, 0, 2, 'New card', 42, '2020-06-11 21:47:58', 0),
(54, 17, 0, 2, 'This card', 42, '2020-06-16 21:10:31', 1),
(55, 21, 0, 1, 'Basic Air', 42, '2020-06-12 00:12:01', 0),
(57, 18, 0, 3, 'Newest Card', 42, '2020-06-12 04:41:06', 0),
(58, 22, 0, 1, 'Bolt', 42, '2020-06-13 01:17:33', 0),
(59, 23, 0, 1, 'Cheap Brands', 42, '2020-06-16 09:14:53', 0),
(60, 18, 0, 4, 'Some Links', 42, '2020-06-18 17:38:20', 1);

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
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `approved` tinyint(3) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Headers`
--

INSERT INTO `Headers` (`headerId`, `pageId`, `orderIndex`, `title`, `userId`, `created`, `approved`) VALUES
(1, 2, 1, 'Compressed Air General', 2, '2020-05-22 21:22:38', 1),
(2, 2, 1, 'Compressed Air Opportunities to Consider', 1, '2020-05-22 21:22:38', 1),
(3, 1, 1, 'Boilers', 1, '2020-05-22 21:22:38', 1),
(4, 3, 1, 'Refrigeration', 2, '2020-05-22 21:22:38', 1),
(15, 1, 2, 'Test', 1, '2020-06-09 18:04:02', 0),
(16, 25, 1, 'Engine Info', 1, '2020-06-16 09:03:41', 1),
(17, 25, 2, 'Turbulence', 47, '2020-06-09 18:51:20', 0),
(18, 25, 3, 'Economics', 47, '2020-06-09 18:56:36', 0),
(19, 1, 3, 'New Header', 42, '2020-06-09 19:19:11', 0),
(20, 1, 4, 'Test Test', 47, '2020-06-09 21:15:35', 0),
(21, 27, 1, 'General Info about Air', 42, '2020-06-12 00:11:28', 0),
(22, 5, 1, 'Lightning', 42, '2020-06-13 01:17:09', 0),
(23, 26, 1, 'Types of Air Conditioners', 42, '2020-06-16 09:13:15', 0);

-- --------------------------------------------------------

--
-- Table structure for table `Icons`
--

CREATE TABLE `Icons` (
  `iconType` int(10) UNSIGNED NOT NULL,
  `typeKeyword` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `typeName` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL
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
(13, 'Opportunity Description', 'angle-right'),
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
  `created` timestamp NULL DEFAULT current_timestamp(),
  `approved` tinyint(3) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Items`
--

INSERT INTO `Items` (`itemId`, `cardId`, `orderIndex`, `parentId`, `iconType`, `contentText`, `contentUrl`, `contentLabel`, `userId`, `created`, `approved`) VALUES
(7, 3, 1, NULL, 20, '', 'https://i.imgur.com/V0dkW5l.png', 'Screw compressor power vs output for various control strategies', 1, '2020-06-17 17:09:09', 0),
(23, 8, 1, NULL, 8, 'Reduced air pressure not only reduces air compressor energy required for a set volume of air, it will also result in less air volume consumed by leaks and unregulated air uses (although it can be hard to estimate the volume reduction).\r\n', '', '', 1, '2020-05-22 21:23:14', 1),
(24, 8, 1, NULL, 11, 'System pressure is set over 100 PSI for a compressed air system serving standard industrial utilities and controls.\r\n', '', '', 2, '2020-05-22 21:23:14', 1),
(25, 9, 1, NULL, 1, 'Versatile. Offers compact energy density. Easy quick fix for many issues. ', '', '', 1, '2020-06-02 22:38:04', 1),
(26, 9, 1, NULL, 1, 'Spark free for potentially explosive environments', '', '', 2, '2020-06-10 03:40:29', 1),
(28, 16, 1, NULL, 5, 'May be windy', '', '', 1, '2020-05-23 22:30:55', 0),
(29, 17, 1, NULL, 7, 'Looped distribution systems can help maintain uniform pressure throughout a compressed air system.', '', '', 1, '2020-05-23 22:30:57', 0),
(30, 17, 2, NULL, 7, 'Well sized compressed air lines reduce pressure loss', '', '', 1, '2020-05-23 22:30:58', 0),
(31, 17, 3, NULL, 7, 'A well designed compressed air system should typically have a maximum 10 PSI pressure drop in delivering air to at any end-use in the system', '', '', 1, '2020-05-23 22:31:00', 0),
(32, 13, 1, NULL, 2, 'Energy intensive. Function provided can often be replace with significantly lower power approach.\r\n', '', '', 2, '2020-05-23 22:52:18', 1),
(33, 18, 1, NULL, 3, 'Expect a 1% drop in compressor energy and cost per 2 PSI in compressor outlet pressure drop', '', '', 1, '2020-06-10 03:40:49', 1),
(34, 18, 1, NULL, 3, '85 PSI is the standard required minimum inlet pressure for most common industrial pneumatic equipment', '', '', 1, '2020-06-10 03:40:49', 1),
(36, 18, 1, NULL, 3, '80 to 90% of energy for compressed air is lost as heat', '', '', 1, '2020-06-10 03:40:49', 1),
(37, 19, 1, NULL, 8, 'A pressure gauge with a standard quick connect used in compressed air lines can be useful in diagnosing pressure drops', '', '', 1, '2020-05-23 22:33:25', 0),
(43, 13, 1, NULL, 2, 'Burns', '', '', 1, '2020-06-09 19:50:02', 1),
(68, 27, 1, NULL, 8, 'Energy savings associated with reductions in compressed air use are very dependent on the compressor control strategy. In the worst case, a compressor with blow off control might not yield any energy savings with compressed air use reductions, and one with inlet modulation might yield only a small part of potential savings.', '', '', 1, '2020-06-10 21:42:26', 1),
(69, 27, 1, NULL, 10, 'Compressed air leak volume exceeds 20 to 30% of air used in the process.', '', '', 1, '2020-06-10 21:42:26', 1),
(70, 27, 1, NULL, 11, 'Reduce compressed air leaks', '', '', 1, '2020-06-10 21:42:26', 1),
(71, 27, 1, 70, 13, 'Compressed air is an expensive utility, but leaks can go uncorrected as they do not make a mess.', '', '', 1, '2020-06-10 21:42:26', 1),
(72, 27, 5, 70, 12, 'Determine the leak load by checking compressor output when there is no productive use (typically during breaks or after hours.)', '', '', 1, '2020-06-10 21:42:26', 1),
(73, 29, 1, NULL, 17, 'This guide focuses mainly on screw and reciprocating compressors. These are the most common types of compressors used in the northwest. Other types of compressors such as rotary vane, centrifugal, lobe and radial compressors are much less common and are only introduced in this guide.', 'https://drive.google.com/file/d/12Co0C6JBK5CqoYhZQBcD0VX6JVBXy86o/view', 'Assessing Industrial Air Compressor', 1, '2020-05-24 15:54:25', 0),
(74, 30, 1, NULL, 20, '', 'https://www.hurstboiler.com/images2/series-300_shrink.png', 'Boiler Picture', 1, '2020-06-09 16:57:45', 1),
(75, 30, 1, NULL, 14, 'Some text about boilers!', '', '', 1, '2020-06-09 21:22:33', 1),
(76, 30, 1, NULL, 19, 'Hurst Series 300', 'https://www.hurstboiler.com/boilers/scotch_marine/series_300', 'Big boiler link', 1, '2020-06-09 21:22:33', 1),
(85, 36, 1, NULL, 20, '', 'https://images-na.ssl-images-amazon.com/images/I/81LtIK5MYQL._AC_SY450_.jpg', 'Compressed Can of Air', 1, '2020-06-09 19:49:41', 1),
(112, 42, 1, NULL, 20, '', 'https://i.imgur.com/TUQvrsV.jpeg', 'a', 1, '2020-06-09 21:15:17', 1),
(113, 42, 1, 112, 15, 'Test test', '', '', 1, '2020-06-09 19:15:38', 1),
(114, 42, 1, 113, 17, 'One to three', '', '', 1, '2020-06-09 19:15:39', 1),
(115, 42, 1, 114, 9, 'aa', '', '', 1, '2020-06-09 21:15:18', 1),
(121, 47, 1, NULL, 5, 'Jet fuel is flammable', '', '', 47, '2020-06-09 18:46:20', 1),
(122, 47, 1, 121, 4, 'Be careful', '', '', 47, '2020-06-09 18:46:20', 1),
(123, 47, 1, NULL, 20, '', 'https://blog.klm.com/assets/uploads/2018/12/Jet-engine-KLM-768x510.jpg', 'KLM Jet Engine', 47, '2020-06-09 18:53:49', 1),
(124, 48, 1, NULL, 4, 'Windy', '', '', 47, '2020-06-09 19:44:31', 1),
(126, 47, 4, NULL, 19, 'Learn more about Jet Engines', 'https://en.wikipedia.org/wiki/Jet_engine', 'Wikipedia - Jet Engines', 47, '2020-06-09 18:53:49', 0),
(127, 49, 1, NULL, 2, 'Uses a lot of fossil fuels', '', '', 47, '2020-06-09 18:58:12', 1),
(128, 49, 1, 127, 4, 'Hurts birds', '', '', 47, '2020-06-09 18:58:12', 1),
(129, 49, 3, NULL, 5, 'Uses a lot of steel', '', '', 47, '2020-06-09 18:58:12', 0),
(136, 48, 2, 124, 6, 'Thunder', '', '', 47, '2020-06-09 19:44:38', 0),
(139, 52, 1, NULL, 20, 'Test C', '', '', 47, '2020-06-09 21:15:46', 0),
(140, 30, 1, 74, 16, '1', '', '', 47, '2020-06-09 21:22:52', 1),
(141, 30, 1, 140, 5, '2', '', '', 47, '2020-06-09 21:22:52', 1),
(142, 30, 1, 141, 16, '3', '', '', 47, '2020-06-09 21:22:52', 1),
(143, 30, 1, 142, 6, '4', '', '', 47, '2020-06-09 21:22:52', 1),
(144, 30, 1, 143, 17, '5', '', '', 47, '2020-06-09 21:22:52', 1),
(145, 30, 1, 144, 2, 'a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6a6', '', '', 47, '2020-06-09 21:22:52', 1),
(146, 53, 1, NULL, 5, 'New item', '', '', 42, '2020-06-11 21:47:58', 0),
(147, 54, 1, NULL, 6, 'bolt', '', '', 42, '2020-06-11 23:29:51', 0),
(148, 55, 1, NULL, 5, 'there is fire', '', '', 42, '2020-06-12 00:12:21', 1),
(149, 55, 1, NULL, 6, 'there is bolt', '', '', 42, '2020-06-12 00:12:21', 1),
(150, 55, 1, 149, 3, 'there is thumb', '', '', 42, '2020-06-12 00:12:21', 1),
(152, 57, 1, NULL, 16, 'file123', '', '', 42, '2020-06-12 04:41:06', 0),
(153, 58, 1, NULL, 6, 'Zap 1', '', '', 42, '2020-06-13 01:17:33', 0),
(154, 58, 1, 153, 6, 'Zap 2', '', '', 42, '2020-06-13 01:17:33', 0),
(155, 58, 1, 154, 6, 'Zap 3', '', '', 42, '2020-06-13 01:17:33', 0),
(156, 59, 1, NULL, 20, '', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQotWb6qWsAky6knQEWv1tYmhJn3iXJOzXliagMoEDeTkgLwucE&usqp=CAU', 'AC1', 42, '2020-06-16 09:16:19', 0),
(157, 59, 1, NULL, 20, '', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQBhnfIntaYkvfxgPDkqPcFzVMXih4gRj4Gv_HEJY8sxU6kCJgbb-J4GxbhmWKQtb3tKWtt5XVG&usqp=CAc', 'AC2', 42, '2020-06-16 09:16:48', 0),
(158, 59, 1, NULL, 20, '', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRrLtOorN06C4SPJapwT-0YPq06ZNlXUEdEhdC1OmNZY8ccvB0h&usqp=CAU', 'AC3', 42, '2020-06-16 09:16:48', 0),
(159, 59, 4, 158, 6, 'A family of air conditioners', '', '', 42, '2020-06-16 09:16:48', 0),
(160, 60, 1, NULL, 18, 'This is an internal resource. The link connects to some resource at OSU. We are not worried about this being a dead link.', 'http://placekitten.com/300/300', 'Some Link', 42, '2020-06-18 17:37:19', 0),
(161, 60, 2, NULL, 19, 'This is an external resource. We worry that it might be a dead link, so we want to track the date.', 'http://placekitten.com/500/500', 'Another Link', 42, '2020-06-18 17:38:01', 0);

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
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
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
(41, 'Seth45', 'oteroipietroitroeiporte888', 'Seth', 'Kratzer', 'Seth45@yahoo.com', 3),
(42, 'Silverware', 'Dwzp342=Z2!', 'Zachary', 'Thomas', 'thomasza@oregonstate.edu', 4),
(47, 'rogrogrog', 'test1234', 'rog', 'rog', 'rog@gmail.com', 4),
(51, 'JoeJunker', 'use2havefun', 'Joe', 'Junker', 'joseph.f.junker@gmail.com', 4),
(52, 'mattye', 'efficiency', 'Ethan', 'Matty', 'mattye.eec@gmail.com', 4);

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
  ADD UNIQUE KEY `typeKeyword` (`typeKeyword`),
  ADD UNIQUE KEY `typeName` (`typeName`);

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
  MODIFY `cardId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `Headers`
--
ALTER TABLE `Headers`
  MODIFY `headerId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `Icons`
--
ALTER TABLE `Icons`
  MODIFY `iconType` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `Items`
--
ALTER TABLE `Items`
  MODIFY `itemId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=162;

--
-- AUTO_INCREMENT for table `Pages`
--
ALTER TABLE `Pages`
  MODIFY `pageId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `userId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

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
