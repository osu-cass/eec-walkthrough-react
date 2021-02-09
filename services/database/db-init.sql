-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: engr-db.engr.oregonstate.edu:3307
-- Generation Time: Feb 08, 2021 at 04:51 PM
-- Server version: 10.3.13-MariaDB-log
-- PHP Version: 7.4.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
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
-- Table structure for table `Answers`
--

CREATE TABLE `Answers` (
  `answerId` int(10) UNSIGNED NOT NULL,
  `questionId` int(10) UNSIGNED NOT NULL,
  `groupId` int(10) UNSIGNED NOT NULL,
  `text` varchar(5000) NOT NULL,
  `correct` tinyint(3) UNSIGNED NOT NULL,
  `approved` tinyint(3) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Answers`
--

INSERT INTO `Answers` (`answerId`, `questionId`, `groupId`, `text`, `correct`, `approved`) VALUES
(261, 1, 0, 'sql injection', 0, 1),
(262, 1, 0, 'social engineering', 1, 1),
(263, 1, 0, 'rainbow table attack', 0, 1),
(264, 1, 0, 'yodeling', 0, 1),
(275, 33, 0, 'p = v × i', 0, 1),
(276, 33, 0, 'p = v ÷ i', 0, 1),
(277, 33, 0, 'p = v × i × √3', 1, 1),
(278, 33, 0, 'p = (v × i) ÷ √3', 0, 1),
(402, 4, 0, '10%-15%', 0, 1),
(403, 4, 0, '35%-40%', 0, 1),
(404, 4, 0, '65%-70%', 0, 1),
(405, 4, 0, '85%-90%', 1, 1),
(406, 5, 0, '0.5', 0, 1),
(407, 5, 0, '1', 1, 1),
(408, 5, 0, '2', 0, 1),
(409, 5, 0, '4', 0, 1),
(410, 6, 0, 'true', 1, 1),
(411, 6, 0, 'false', 0, 1),
(412, 8, 0, '1', 0, 1),
(413, 8, 0, '2', 0, 1),
(414, 8, 0, '5', 0, 1),
(415, 8, 0, '10', 1, 1),
(416, 9, 0, 'true', 1, 1),
(417, 9, 0, 'false', 0, 1),
(418, 10, 0, 'use high-pressure equipment when other equipment', 0, 1),
(419, 10, 0, 'increase system pressure and use regulators elsewhere', 0, 1),
(420, 10, 0, 'add a booster or use a separate high-pressure system', 1, 1),
(421, 10, 0, 'install a higher capacity compressor', 0, 1),
(422, 11, 0, 'open blowing (clean up, cooling bearings, etc.)', 0, 1),
(423, 11, 0, 'cooling cabinets (control panels and control centers', 0, 1),
(424, 11, 0, 'vacuum generation (venturis)', 0, 1),
(425, 11, 0, 'all of the above', 1, 1),
(426, 12, 0, '80', 1, 1),
(427, 12, 1, '85', 1, 1),
(428, 36, 0, '20', 1, 1),
(429, 36, 1, '30', 1, 1),
(430, 36, 0, '20%', 1, 1),
(431, 36, 1, '30%', 1, 1),
(432, 22, 0, 'axial', 0, 1),
(433, 22, 0, 'mixed flow', 0, 1),
(434, 22, 0, 'radial', 0, 1),
(435, 22, 0, 'all of the above', 1, 1),
(436, 23, 0, 'true', 1, 1),
(437, 23, 0, 'false', 0, 1),
(438, 24, 0, '27', 0, 1),
(439, 24, 0, '100', 0, 1),
(440, 24, 0, '2.31', 1, 1),
(441, 24, 0, '6.5', 0, 1),
(442, 25, 0, '-10', 1, 1),
(443, 25, 1, '10', 1, 1),
(444, 26, 0, 'true', 0, 1),
(445, 26, 0, 'false', 1, 1),
(446, 27, 0, '1/8', 1, 1),
(447, 27, 0, 'eighth', 1, 1),
(448, 27, 0, 'an eighth', 1, 1),
(449, 27, 0, 'one eighth', 1, 1),
(450, 28, 0, 'true', 1, 1),
(451, 28, 0, 'false', 0, 1),
(452, 29, 0, 'true', 1, 1),
(453, 29, 0, 'false', 0, 1),
(454, 30, 0, 'hydraulic', 1, 1),
(455, 30, 1, 'brake', 1, 1),
(456, 30, 0, 'brake', 1, 1),
(457, 30, 1, 'hydraulic', 1, 1),
(458, 31, 0, 'logarithmic', 0, 1),
(459, 31, 0, 'linear', 0, 1),
(460, 31, 0, 'square', 0, 1),
(461, 31, 0, 'cubic', 1, 1),
(462, 37, 0, 'true', 0, 1),
(463, 37, 0, 'false', 1, 1),
(574, 38, 0, 'dry bulb', 1, 1),
(575, 38, 0, 'drybulb', 1, 1),
(576, 38, 0, 'dry-bulb', 1, 1),
(577, 39, 0, 'wetbulb', 1, 1),
(578, 39, 0, 'wet-bulb', 1, 1),
(579, 39, 0, 'wet bulb', 1, 1),
(580, 40, 0, 'compressor', 1, 1),
(581, 40, 0, 'compressors', 1, 1),
(582, 40, 1, 'condensor', 1, 1),
(583, 40, 1, 'condensors', 1, 1),
(584, 40, 2, 'expansion valve', 1, 1),
(585, 40, 2, 'expansionvalve', 1, 1),
(586, 40, 3, 'evaporator', 1, 1),
(587, 40, 2, 'expansion-valve', 1, 1),
(588, 40, 3, 'evaporators', 1, 1),
(589, 13, 0, '6', 1, 1),
(590, 13, 1, '12', 1, 1),
(591, 14, 0, '20-40', 0, 1),
(592, 14, 0, '100-150', 1, 1),
(593, 14, 0, '300-350', 0, 1),
(594, 14, 0, '500-550', 0, 1),
(595, 15, 0, 'true', 1, 1),
(596, 15, 0, 'false', 0, 1),
(597, 16, 0, '30', 0, 1),
(598, 16, 0, '35', 0, 1),
(599, 16, 0, '40', 1, 1),
(600, 16, 0, '45', 0, 1),
(601, 17, 0, 'true', 1, 1),
(602, 17, 0, 'false', 0, 1),
(603, 18, 0, 'keep the steam from entering a process', 0, 1),
(604, 18, 0, 'store steam for later use', 0, 1),
(605, 18, 0, 'drain condensate from steam lines', 1, 1),
(606, 18, 0, 'none, their use is born out of misconception', 0, 1),
(607, 19, 0, '4%', 0, 1),
(608, 19, 0, '6%', 0, 1),
(609, 19, 0, '8%', 0, 1),
(610, 19, 0, '10%', 1, 1),
(611, 20, 0, 'daily', 0, 1),
(612, 20, 0, 'weekly to monthly', 1, 1),
(613, 20, 0, 'annually', 0, 1),
(614, 20, 0, 'when production is halted', 0, 1),
(615, 21, 0, 'a, b, c', 0, 1),
(616, 21, 0, 'a, c, d', 1, 1),
(617, 21, 0, 'a, d', 0, 1),
(618, 21, 0, 'a, b, c, d', 0, 1),
(619, 34, 0, '$5,000', 0, 1),
(620, 34, 0, '$10,000', 0, 1),
(621, 34, 0, '$50,000', 1, 1),
(622, 34, 0, '$100,000', 0, 1),
(623, 35, 0, 'combustion efficiency', 1, 1),
(627, 40, 0, 'compressor', 1, 0),
(628, 40, 0, 'compressors', 1, 0),
(629, 40, 1, 'condensor', 1, 0),
(630, 40, 1, 'condensors', 1, 0),
(631, 40, 2, 'expansion valve', 1, 0),
(632, 40, 2, 'expansionvalve', 1, 0),
(633, 40, 2, 'expansion-valve', 1, 0),
(634, 40, 3, 'evaporator', 1, 0),
(635, 40, 3, 'evaporators', 1, 0),
(640, 42, 0, 'compression', 0, 0),
(641, 42, 0, 'condensation', 0, 0),
(642, 42, 0, 'expansion', 0, 0),
(643, 42, 0, 'evaporation', 1, 0),
(648, 43, 0, '60', 0, 0),
(649, 43, 0, '100', 0, 0),
(650, 43, 0, '90', 1, 0),
(651, 43, 0, '80', 0, 0),
(654, 45, 0, '2', 1, 0),
(655, 45, 0, 'two', 1, 0),
(656, 46, 0, '25', 1, 0),
(657, 47, 0, '1.5', 1, 0),
(658, 48, 0, '120', 1, 0),
(661, 44, 0, 'true', 1, 0),
(662, 44, 0, 'false', 0, 0),
(675, 41, 0, 'using \"1234\"', 1, 1),
(676, 41, 0, 'using your street address', 1, 1),
(677, 41, 0, 'using your name', 1, 1),
(678, 3, 0, 'mouse', 1, 0),
(679, 3, 1, 'keyboard', 1, 0),
(680, 3, 0, 'clicker', 1, 0),
(681, 3, 1, 'typer', 1, 0),
(683, 2, 0, 'burglar', 0, 1),
(684, 2, 0, 'hacker', 1, 1),
(685, 2, 0, 'vandal', 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `Banners`
--

CREATE TABLE `Banners` (
  `bannerId` int(10) UNSIGNED NOT NULL,
  `imageUrl` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Banners`
--

INSERT INTO `Banners` (`bannerId`, `imageUrl`) VALUES
(32, '/uploads/user_42/be19ca0ceb80eff619054bcc36a35adb.jpg'),
(33, '/uploads/user_42/fc6f4b14282cbab7f8d1796c2bba54a9.jpg'),
(34, '/uploads/user_51/02c8c22931b7818ec5698892d0461e38.jpg'),
(35, '/uploads/user_51/22bf861b8225bf416406b73abae9bda6.jpg'),
(36, '/uploads/user_51/1f622a009196f6a2364201932f0802ea.jpg'),
(37, '/uploads/user_51/c88534d9718aa047bca68eb86b879783.jpg');

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
(3, 1, 0, 29, 'Figures, Charts, and Tables', 51, '2021-02-04 02:45:38', 1),
(8, 2, 0, 8, 'Reduce Compressed Air Pressure\r\n', 51, '2020-07-02 17:49:40', 1),
(9, 1, 0, 3, 'Pros', 51, '2021-02-08 23:20:34', 1),
(13, 1, 0, 9, 'Cons', 58, '2021-01-13 22:10:08', 1),
(16, 1, 0, 13, 'Caveats', 42, '2020-05-23 22:27:44', 1),
(17, 1, 0, 16, 'Best Practices', 42, '2020-05-23 22:28:37', 1),
(18, 1, 0, 17, 'Rules of Thumb', 42, '2020-05-23 22:31:49', 1),
(19, 1, 0, 18, 'Tips', 42, '2020-05-23 22:33:25', 1),
(27, 2, 0, 27, 'Reduce Compressed Air Required', 51, '2020-07-07 16:17:13', 1),
(29, 1, 0, 19, 'Additional In Depth Site Resources', 58, '2021-01-28 23:03:56', 1),
(72, 1, 1, 72, 'Gallery: Industrial Air Compressors, Dryers, Receiver Tanks and Compressed Air Applications', 51, '2021-02-04 02:46:02', 1),
(75, 1, 0, 75, 'U.S. Department of Energy Tip Sheets', 42, '2020-06-30 06:38:25', 1),
(76, 1, 0, 76, 'General Off Site Resource Links', 51, '2020-06-29 20:51:39', 1),
(77, 2, 0, 77, 'Improve Compressor Efficiency', 51, '2020-12-14 21:45:53', 0),
(81, 29, 0, 1, 'Pros', 51, '2020-07-01 18:14:32', 1),
(82, 30, 0, 82, 'Use More Efficient Pump Control', 51, '2020-07-01 18:19:29', 1),
(83, 30, 0, 83, 'Reduce Flow Required', 51, '2020-07-01 21:21:37', 1),
(84, 30, 0, 84, 'Reduce Head Required', 51, '2020-07-01 21:28:45', 1),
(85, 30, 0, 85, 'Improve Pump Efficiency', 51, '2021-02-03 23:53:01', 1),
(86, 2, 0, 86, 'Reduce Air Compressor Run Time', 51, '2020-07-01 22:24:57', 1),
(87, 2, 0, 87, 'Other Opportunities', 51, '2020-07-01 22:28:10', 1),
(88, 31, 0, 88, 'Pros', 56, '2020-07-02 19:58:20', 1),
(89, 31, 0, 89, 'Cons', 56, '2020-07-02 20:01:03', 1),
(90, 31, 0, 90, 'Caveats', 61, '2021-01-26 22:53:06', 1),
(91, 31, 0, 91, 'Rules of Thumb', 61, '2021-01-26 22:53:23', 1),
(92, 31, 0, 92, 'Tips', 56, '2020-07-02 20:10:02', 1),
(93, 31, 0, 93, 'Best Practices', 56, '2020-07-02 20:12:06', 1),
(94, 31, 10, 94, 'Charts, Tables, Figures', 61, '2020-07-02 20:14:45', 0),
(95, 31, 0, 95, 'Standard Data to Collect', 61, '2021-02-02 21:12:14', 1),
(96, 31, 0, 96, 'Data Collection Equipment', 51, '2021-02-02 21:12:34', 1),
(97, 31, 0, 97, 'Data Collection Guides', 56, '2020-07-02 20:44:49', 1),
(98, 31, 0, 98, 'Analysis Tools', 56, '2020-07-02 20:52:07', 1),
(99, 31, 10, 99, 'Internal Resources', 61, '2021-02-02 21:13:48', 1),
(100, 31, 0, 100, 'Off Site Resource Links', 56, '2020-07-02 21:38:17', 1),
(101, 32, 0, 101, 'Improve Boiler Combustion Efficiency', 51, '2020-10-29 21:57:22', 1),
(102, 32, 0, 102, 'Reduce Run Time', 56, '2020-07-02 21:56:36', 1),
(103, 32, 0, 103, 'Optimize Blowdown', 56, '2020-07-02 21:58:49', 1),
(104, 32, 0, 104, 'Minimize Draft Fan Energy ', 56, '2020-07-02 22:01:14', 1),
(105, 32, 0, 105, 'Improve the Condensate System', 61, '2020-10-29 21:50:47', 1),
(106, 32, 0, 106, 'Reduce Heat Loss', 51, '2020-07-02 22:11:55', 1),
(107, 28, 0, 107, 'Motor and Transmission Efficiency', 51, '2021-02-04 00:26:25', 1),
(108, 33, 0, 2, 'Rules of Thumb', 51, '2021-02-05 21:11:06', 1),
(109, 33, 0, 3, 'Tips', 51, '2021-02-05 21:10:34', 1),
(110, 33, 0, 4, 'Best Practices', 51, '2021-02-08 17:55:35', 1),
(112, 33, 0, 5, 'Standard Data to Collect', 51, '2020-07-02 23:17:15', 1),
(113, 33, 0, 6, 'Data Collection Equipment', 51, '2020-07-02 23:21:12', 1),
(114, 33, 0, 7, 'Data Collection Guides', 56, '2020-07-02 23:29:16', 1),
(115, 33, 0, 8, 'Analysis Tools', 56, '2020-07-02 23:33:30', 1),
(116, 33, 0, 1, 'In Depth Site Resources', 51, '2020-07-02 23:44:26', 1),
(117, 33, 0, 9, 'Off Site Resource Links', 51, '2020-07-02 23:47:53', 1),
(118, 28, 0, 118, 'Motor Controls', 51, '2021-01-26 20:10:14', 1),
(119, 28, 0, 119, 'Turn off Motors (Consider Load Shedding)', 61, '2021-02-04 00:27:26', 1),
(122, 29, 0, 2, 'Cons', 55, '2020-07-07 17:54:57', 1),
(123, 29, 0, 3, 'General Off Site Resource Links', 55, '2020-07-07 18:00:00', 1),
(124, 29, 2, 4, 'U.S. Department of Energy Tip Sheets', 42, '2021-02-09 00:02:03', 1),
(125, 29, 10, 9, 'Figures, Charts, and Tables', 51, '2020-07-07 20:33:57', 1),
(126, 37, 0, 126, 'Common Technologies Used in Wastewater (covered elsewhere in this guide)', 51, '2020-07-07 20:57:07', 1),
(129, 40, 0, 129, 'Heat Exchangers', 60, '2020-07-10 18:20:49', 0),
(130, 40, 0, 130, 'Insulation', 55, '2020-07-10 18:36:22', 0),
(131, 40, 0, 131, 'Cooling Systems', 58, '2020-07-10 18:45:42', 0),
(133, 41, 0, 1, 'Pros', 51, '2020-07-20 21:20:19', 1),
(134, 41, 0, 2, 'Cons', 51, '2020-07-20 21:20:35', 1),
(136, 41, 0, 3, 'Rules of Thumb', 51, '2020-07-20 21:21:25', 1),
(137, 41, 0, 4, 'Tips', 58, '2020-07-20 21:21:56', 0),
(138, 41, 0, 5, 'Best Practices', 58, '2020-07-20 21:22:23', 1),
(139, 41, 1, 6, 'Charts, Tables, Figures', 51, '2020-07-20 22:09:40', 1),
(140, 41, 0, 8, 'Standard Data to Collect', 58, '2020-07-20 22:10:28', 0),
(141, 41, 0, 9, 'Data Collection Equipment', 58, '2020-07-20 22:11:29', 0),
(142, 41, 0, 11, 'Analysis Tools', 58, '2020-07-20 22:12:33', 0),
(143, 41, 0, 12, 'In Depth Site Resources', 58, '2020-07-20 22:13:43', 0),
(144, 41, 0, 13, 'Off Site Resource Links', 58, '2020-07-20 22:14:24', 0),
(154, 47, 10, 2, 'Review/Analyze Pre-Assessment Package Information', 51, '2020-09-03 20:04:30', 1),
(155, 47, 10, 1, 'Identify Potential Sites to Work With', 51, '2021-01-26 19:32:22', 1),
(156, 47, 10, 4, 'Hold an Initial Remote Assessment Meeting with the Client', 52, '2021-01-26 19:26:00', 1),
(157, 47, 10, 5, 'Develop a Preliminary Energy Balance', 51, '2020-09-03 20:05:07', 1),
(158, 47, 10, 6, 'Develop a List of Potential Opportunities to Study', 52, '2021-01-26 19:26:47', 1),
(161, 47, 10, 3, 'Preliminary Research', 51, '2020-09-03 20:04:11', 1),
(162, 47, 10, 162, 'Arrange a Client Guided Remote Tour by Phone.', 52, '2021-01-26 19:27:01', 1),
(163, 38, 0, 163, 'Efficient Aeration', 51, '2020-08-06 22:27:59', 1),
(164, 36, 0, 164, 'Additional in Depth Site Resources', 51, '2020-08-06 22:32:54', 1),
(165, 47, 0, 165, 'Next Step?......', 51, '2020-08-06 22:36:00', 1),
(166, 48, 0, 166, 'Opportunity Flags', 62, '2020-08-10 21:04:25', 0),
(168, 50, 0, 168, 'Pros', 61, '2020-08-12 21:45:00', 0),
(169, 50, 0, 169, 'Caveats', 62, '2020-08-12 21:56:54', 0),
(170, 50, 0, 170, 'Opportunity Flag', 62, '2020-08-12 22:02:27', 0),
(171, 50, 0, 171, 'Data to Collect', 62, '2020-08-12 23:11:45', 0),
(172, 50, 0, 172, 'How to estimate facility efficiency (D-score)', 61, '2020-08-12 23:14:40', 0),
(173, 50, 0, 173, 'Methodologies for creating new layouts', 61, '2020-08-14 21:00:05', 0),
(174, 50, 0, 174, 'Systematic Layout Planning (SLP)', 62, '2020-08-14 21:43:28', 0),
(175, 38, 0, 175, 'Anaerobic Digestion', 51, '2020-08-17 18:11:37', 1),
(176, 38, 0, 176, 'Other Opportunities', 51, '2020-08-17 18:16:44', 1),
(178, 29, 0, 5, 'Best Practices', 51, '2020-08-20 22:33:59', 1),
(179, 29, 0, 6, 'Standard Data to Collect', 51, '2020-08-18 21:05:04', 1),
(180, 29, 0, 7, 'Rules of Thumb', 51, '2020-08-18 21:05:56', 1),
(182, 29, 0, 8, 'Caveats', 42, '2021-02-09 00:02:21', 1),
(183, 29, 1, 11, 'Gallery: Pump Types etc.', 51, '2020-08-19 21:46:41', 1),
(184, 50, 0, 184, 'How to calculate layout efficiency savings', 62, '2020-08-24 19:51:09', 0),
(185, 50, 0, 185, 'Determining cost savings', 62, '2020-08-24 20:10:02', 0),
(186, 54, 0, 2, 'Pros', 52, '2020-08-26 16:04:13', 1),
(187, 54, 0, 3, 'Cons', 52, '2020-08-26 16:13:30', 1),
(189, 54, 0, 6, 'General Off Site Resource Links', 52, '2020-08-26 16:44:39', 1),
(190, 54, 0, 5, 'Standard Data to Collect', 51, '2020-08-26 16:57:31', 1),
(192, 55, 0, 192, 'Install Capacitors', 51, '2020-08-26 17:36:17', 1),
(193, 54, 0, 1, 'What is power factor?', 51, '2020-08-26 17:43:30', 1),
(194, 56, 0, 194, 'Industrial Assessment Center and Department of Energy', 51, '2020-08-27 00:24:17', 1),
(195, 56, 0, 195, 'Other Government Tools', 51, '2020-08-27 00:29:22', 1),
(196, 57, 0, 196, 'Tips and Guides', 57, '2020-08-27 00:38:47', 1),
(197, 57, 0, 197, 'Tools', 51, '2020-08-27 00:40:11', 1),
(199, 48, 0, 199, 'Pros', 62, '2020-09-02 22:05:59', 0),
(200, 48, 0, 200, 'Cons', 62, '2020-09-02 22:11:35', 0),
(201, 48, 0, 201, 'Modeling Simple Queuing Systems', 62, '2020-09-02 22:53:29', 0),
(202, 60, 10, 202, 'History Reports', 58, '2020-09-04 19:38:18', 0),
(203, 60, 10, 203, 'How to Complete a Publish Request', 58, '2020-09-04 20:44:09', 0),
(204, 59, 10, 2, 'Creating Pages', 58, '2020-09-07 23:37:09', 0),
(205, 59, 10, 1, 'Tips', 51, '2020-09-07 23:40:51', 0),
(206, 59, 10, 206, 'Adding Images', 51, '2020-09-07 23:43:10', 0),
(207, 60, 10, 207, 'How to Review and Approve Content for Publishing', 58, '2020-09-08 17:49:46', 0),
(208, 59, 10, 208, 'Adding References', 58, '2020-09-08 18:55:48', 0),
(211, 63, 2, 1, 'Ventilation Improvements', 52, '2020-09-09 19:06:46', 1),
(212, 63, 2, 3, 'Reduce Material Losses', 52, '2020-09-09 19:36:40', 1),
(214, 63, 2, 2, 'Increase Spray/Paint Booth Efficiency', 52, '2020-09-10 17:01:56', 1),
(215, 63, 2, 215, 'Reduce Compressed Air Leaks', 52, '2020-09-10 20:11:02', 1),
(222, 62, 0, 222, 'Additional in Depth Site Resources', 52, '2020-09-15 19:40:23', 1),
(223, 64, 10, 1, 'Measuring Electricity Use', 54, '2020-09-17 19:39:07', 0),
(224, 64, 10, 2, 'Electric Rate Schedules', 54, '2020-09-17 19:57:57', 0),
(225, 64, 10, 3, 'Common Electricity Charges', 54, '2020-09-17 19:59:38', 0),
(228, 65, 10, 228, 'Measuring Natural Gas Use', 54, '2020-09-23 21:45:05', 0),
(229, 65, 10, 229, 'Natural Gas Rate Schedules', 54, '2020-09-23 21:49:22', 0),
(230, 65, 10, 230, 'Common Natural Gas Charges', 54, '2020-09-23 21:55:01', 0),
(231, 66, 10, 231, 'Measuring Water Use', 54, '2020-09-23 22:00:24', 0),
(232, 66, 10, 232, 'Water Rate Schedules', 54, '2020-09-23 22:22:08', 0),
(233, 66, 10, 233, 'Common Water Charges', 54, '2020-09-23 22:26:50', 0),
(236, 70, 10, 236, 'Consolidate Meters', 42, '2020-10-14 20:45:46', 0),
(240, 72, 0, 240, 'Filters allow users to show or hide select types of information by icon type', 42, '2020-11-18 01:44:25', 0),
(241, 47, 0, 241, 'Opportunity Meeting and Task Designations', 55, '2020-11-20 16:45:04', 1),
(242, 47, 0, 242, 'Report Drafting', 55, '2020-11-20 16:46:09', 1),
(243, 47, 0, 243, 'Report Presentation to Client', 55, '2020-11-20 16:47:38', 1),
(244, 47, 10, 244, 'Post-Assessment Meetings', 60, '2020-11-23 23:11:25', 1),
(247, 75, 10, 247, 'Simulation', 61, '2020-11-28 23:50:18', 0),
(248, 75, 10, 248, 'Additive Manufacturing', 61, '2020-11-28 23:50:57', 0),
(249, 75, 10, 249, 'Cloud Computing', 61, '2020-11-28 23:51:50', 0),
(250, 74, 10, 2, 'General Off Site Resource Links', 61, '2020-11-29 00:01:54', 0),
(251, 74, 0, 1, 'Summary', 61, '2020-11-29 00:29:29', 0),
(252, 76, 10, 2, 'Gallery', 61, '2020-11-29 00:42:43', 0),
(253, 76, 10, 1, 'Summary', 61, '2020-11-30 18:04:41', 0),
(254, 76, 10, 3, 'General Off Site Resource Links', 61, '2020-11-30 18:07:00', 0),
(260, 78, 0, 260, 'Reduce System Lift', 58, '2020-12-14 19:47:45', 0),
(261, 34, 0, 261, 'Pros', 57, '2020-12-18 17:35:43', 0),
(262, 34, 0, 262, 'Cons', 57, '2020-12-18 17:36:01', 0),
(263, 34, 0, 263, 'Best Practices', 57, '2020-12-18 17:36:22', 0),
(264, 34, 0, 264, 'Rules of Thumb', 61, '2020-12-18 17:36:43', 0),
(265, 34, 0, 265, 'Useful Resources', 57, '2020-12-21 20:26:45', 0),
(267, 78, 0, 267, 'Reduce Compressor Power', 58, '2020-12-22 22:24:28', 0),
(268, 78, 0, 268, 'Reduce Fan Power', 58, '2020-12-22 22:36:22', 0),
(269, 63, 0, 269, 'Improve welding efficiency', 52, '2020-12-22 23:10:37', 0),
(270, 41, 2, 7, 'Key Terms and Concepts', 51, '2020-12-24 21:58:24', 0),
(271, 41, 0, 10, 'Data Collection Guides', 58, '2020-12-30 18:24:27', 0),
(272, 78, 0, 272, 'Minimize Heat Loss', 42, '2020-12-31 19:16:10', 0),
(274, 79, 0, 274, 'How to enter a formula', 42, '2021-01-10 23:08:40', 0),
(275, 79, 0, 275, 'Common Formulas', 42, '2021-01-10 23:25:29', 0),
(276, 69, 10, 3, 'Common Questions', 54, '2021-01-11 21:26:39', 0),
(278, 80, 0, 278, 'Opportunity to Consider (Use Title Case for Card Titles)', 42, '2021-01-20 20:22:07', 0),
(284, 29, 0, 12, 'Data Collection Guides', 42, '2021-01-25 17:04:13', 0),
(285, 29, 0, 10, 'Data Collection Equipment', 51, '2021-01-25 17:07:02', 1),
(286, 29, 0, 13, 'Key Terms and Concepts', 55, '2021-01-25 17:08:21', 0),
(287, 33, 2, 10, 'U.S. Department of Energy Tip Sheets', 42, '2021-02-08 22:15:41', 1),
(288, 29, 2, 15, 'Additional in Depth External Resources', 42, '2021-02-09 00:03:43', 1),
(289, 29, 0, 14, 'Additional in Depth Site Resources', 42, '2021-02-09 00:03:00', 1),
(290, 31, 2, 290, 'U.S. Department of Energy Tip Sheets', 42, '2021-02-08 23:58:04', 1),
(292, 81, 0, 292, 'Upgrade to digital systems', 61, '2021-02-04 05:48:39', 0),
(294, 69, 10, 1, 'Why Analyze Utilities?', 54, '2021-02-06 22:11:42', 0),
(295, 69, 10, 2, 'How to Analyze Utility Bills', 54, '2021-02-06 22:45:32', 0);

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
-- Table structure for table `Contributors`
--

CREATE TABLE `Contributors` (
  `contributorId` int(10) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `title` varchar(500) NOT NULL,
  `description` varchar(5000) NOT NULL,
  `imageUrl` varchar(5000) NOT NULL,
  `priority` int(10) UNSIGNED NOT NULL,
  `active` tinyint(3) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Contributors`
--

INSERT INTO `Contributors` (`contributorId`, `name`, `title`, `description`, `imageUrl`, `priority`, `active`) VALUES
(42, 'Some Name', 'This Title', 'some description', '9828f40a4c8f40f49a61e85c8fa30e4b.jpg', 10, 0),
(52, 'Ethan Matty', 'Operations Manager', 'Second year MS student in Mechanical Engineering', '/uploads/user_52/1e555c8f09bb32bcb116b0b290b91bb4.jpg', 10, 1),
(54, 'Ali Martz', 'Energy Analyst', 'Mechanical Engineering Bachelors Student', '/uploads/user_54/4434462abfd4ae3303e715ab41b32f8e.jpg', 10, 1),
(55, 'Julian Peter', 'Energy Analyst', 'Environmental engineering major.', '/uploads/user_42/11a622294200e1230f8cc66bfd7e3998.jpg', 10, 1),
(58, 'Ryan French', 'Energy Analyst', 'Undergraduate Physics Student', 'https://eec.oregonstate.edu/sites/eec.oregonstate.edu/files/ryan_0.jpg', 10, 1),
(61, 'Chris Houck', 'Operations Manager', 'Industrial engineering student with an emphasis in manufacturing systems. ', '/uploads/user_61/ee7d73982e975a0c68a52f09c604f4b1.jpg', 10, 1);

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
(30, 45, 30, 'Pumping Opportunities to Consider', 0, 51, '2021-02-03 23:25:03', 1),
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
(56, 62, 56, 'Self Assessment Tools', 0, 51, '2021-01-26 22:45:38', 1),
(57, 62, 57, 'Resources', 0, 51, '2021-01-26 22:47:18', 1),
(59, 65, 59, 'Creating Content', 1, 58, '2020-09-04 18:57:48', 0),
(60, 65, 60, 'Reviewing Content', 1, 58, '2020-09-04 19:23:27', 0),
(62, 69, 62, 'Metals Manufacturing Overview', 0, 52, '2021-02-03 22:42:53', 1),
(63, 69, 63, 'Metals Manufacturing Opportunities to Consider', 0, 52, '2021-01-26 21:53:41', 1),
(64, 49, 1, 'Electricity', 1, 54, '2020-09-17 19:22:43', 0),
(65, 49, 2, 'Natural Gas', 1, 54, '2020-09-17 20:04:02', 0),
(66, 49, 3, 'Water', 1, 54, '2020-09-17 20:08:44', 0),
(69, 49, 4, 'Analysis', 1, 54, '2020-10-14 18:28:03', 0),
(70, 49, 5, 'Electricity Opportunities to Consider', 1, 54, '2020-10-14 20:41:48', 0),
(71, 64, 71, 'Understanding the Guide', 0, 51, '2020-11-26 23:41:50', 1),
(72, 64, 72, 'Using the Guide', 0, 51, '2020-11-18 01:41:03', 0),
(74, 72, 3, 'Radio Frequency Identification (RFID)', 1, 61, '2020-11-28 23:26:46', 0),
(75, 72, 2, 'Technologies', 1, 61, '2020-11-28 23:49:06', 0),
(76, 72, 4, 'Machine Learning', 1, 61, '2020-11-29 00:38:27', 0),
(78, 48, 78, 'Refrigeration Opportunities to Consider', 0, 58, '2020-12-14 19:47:03', 0),
(79, 74, 79, 'Creating a Formula', 0, 42, '2021-01-10 23:05:51', 0),
(80, 65, 80, 'Style Standards', 0, 58, '2021-01-20 19:57:46', 0),
(81, 72, 81, 'Low Cost ideas', 1, 61, '2021-02-04 05:44:49', 0);

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
(103, 192, 55, 0, 'Install Capacitors', 0, '2020-10-13 20:18:20'),
(104, 105, 32, 0, 'Improve the Condensate System', 0, '2020-10-29 21:50:47'),
(105, 101, 32, 0, 'Improve Boiler Combustion Efficiency', 0, '2020-10-29 21:57:22'),
(106, 95, 31, 0, 'Standard Data to Collect', 0, '2020-10-29 22:05:47'),
(107, 96, 31, 0, 'Data Collection Equipment', 0, '2020-10-29 22:08:15'),
(108, 120, 28, 0, 'Power Quality', 1, '2020-12-14 19:44:17'),
(109, 119, 28, 0, 'Turn off Motors (Consider Load Shedding)', 0, '2020-12-14 19:44:42'),
(110, 77, 2, 0, 'Improve Compressor Efficiency', 0, '2020-12-14 21:45:53'),
(111, 13, 1, 0, 'Cons', 0, '2021-01-13 22:10:08'),
(112, 155, 47, 10, 'Identify Potential Sites to Work With', 0, '2021-01-26 19:25:33'),
(113, 156, 47, 10, 'Hold an Initial Remote Assessment Meeting with the Client', 0, '2021-01-26 19:26:00'),
(114, 158, 47, 10, 'Develop a List of Potential Opportunities to Study', 0, '2021-01-26 19:26:47'),
(115, 162, 47, 10, 'Arrange a Client Guided Remote Tour by Phone.', 0, '2021-01-26 19:27:01'),
(116, 241, 47, 0, 'Opportunity Meeting and Task Designations', 0, '2021-01-26 19:27:16'),
(117, 242, 47, 0, 'Report Drafting', 0, '2021-01-26 19:27:26'),
(118, 243, 47, 0, 'Report Presentation to Client', 0, '2021-01-26 19:27:41'),
(119, 244, 47, 10, 'Post-Assessment Meetings', 0, '2021-01-26 19:28:11'),
(120, 155, 47, 10, 'Identify Potential Sites to Work With', 0, '2021-01-26 19:32:22'),
(121, 118, 28, 0, 'Motor Controls', 0, '2021-01-26 20:10:14'),
(122, 222, 62, 0, 'Additional in Depth Site Resources', 0, '2021-01-26 21:41:32'),
(123, 214, 63, 2, 'Increase Spray/Paint Booth Efficiency', 0, '2021-01-26 21:51:42'),
(124, 211, 63, 2, 'Ventilation Improvements', 0, '2021-01-26 21:53:24'),
(125, 212, 63, 2, 'Reduce Material Losses', 0, '2021-01-26 21:54:37'),
(126, 215, 63, 2, 'Reduce Compressed Air Leaks', 0, '2021-01-26 21:54:46'),
(127, 288, 29, 0, 'Additional in Depth Site Resources', 0, '2021-01-26 22:01:23'),
(128, 285, 29, 0, 'Data Collection Equipment', 0, '2021-01-26 22:18:07'),
(129, 182, 29, 0, 'Caveats', 0, '2021-01-26 22:19:34'),
(130, 288, 29, 0, 'Additional in Depth External Resources', 0, '2021-01-26 22:21:07'),
(131, 194, 56, 0, 'Industrial Assessment Center and Department of Energy', 0, '2021-01-26 22:47:04'),
(132, 195, 56, 0, 'Other Government Tools', 0, '2021-01-26 22:47:09'),
(133, 196, 57, 0, 'Tips and Guides', 0, '2021-01-26 22:47:22'),
(134, 197, 57, 0, 'Tools', 0, '2021-01-26 22:47:29'),
(135, 90, 31, 0, 'Caveats', 0, '2021-01-26 22:53:06'),
(136, 91, 31, 0, 'Rules of Thumb', 0, '2021-01-26 22:53:23'),
(137, 29, 1, 0, 'Additional In Depth Site Resources', 0, '2021-01-28 23:03:56'),
(138, 290, 31, 2, 'U.S. Department of Energy Tip Sheets', 0, '2021-02-02 21:07:23'),
(139, 290, 31, 2, 'U.S. Department of Energy Tip Sheets', 0, '2021-02-02 21:08:33'),
(140, 95, 31, 0, 'Standard Data to Collect', 0, '2021-02-02 21:12:14'),
(141, 96, 31, 0, 'Data Collection Equipment', 0, '2021-02-02 21:12:34'),
(142, 99, 31, 10, 'Internal Resources', 0, '2021-02-02 21:13:48'),
(143, 124, 29, 2, 'U.S. Department of Energy Tip Sheets', 0, '2021-02-03 22:45:39'),
(144, 179, 29, 0, 'Standard Data to Collect', 0, '2021-02-03 22:48:15'),
(145, 125, 29, 10, 'Figures, Charts, and Tables', 0, '2021-02-03 22:49:14'),
(146, 183, 29, 1, 'Gallery: Pump Types etc.', 0, '2021-02-03 22:50:24'),
(147, 288, 29, 0, 'Additional in Depth External Resources', 0, '2021-02-03 22:53:13'),
(148, 289, 29, 0, 'Additional in Depth Site Resources', 0, '2021-02-03 22:54:55'),
(149, 82, 30, 0, 'Use More Efficient Pump Control', 0, '2021-02-03 23:08:27'),
(150, 83, 30, 0, 'Reduce Flow Required', 0, '2021-02-03 23:23:34'),
(151, 84, 30, 0, 'Reduce Head Required', 0, '2021-02-03 23:39:05'),
(152, 85, 30, 0, 'Improve Pump Efficiency', 0, '2021-02-03 23:48:05'),
(153, 288, 29, 2, 'Additional in Depth External Resources', 0, '2021-02-03 23:49:24'),
(154, 85, 30, 0, 'Improve Pump Efficiency', 0, '2021-02-03 23:53:01'),
(155, 108, 33, 0, 'Rules of Thumb', 0, '2021-02-03 23:56:28'),
(156, 109, 33, 0, 'Tips', 0, '2021-02-04 00:03:37'),
(157, 110, 33, 0, 'Best Practices', 0, '2021-02-04 00:03:44'),
(158, 112, 33, 0, 'Standard Data to Collect', 0, '2021-02-04 00:15:02'),
(159, 113, 33, 0, 'Data Collection Equipment', 0, '2021-02-04 00:15:23'),
(160, 114, 33, 0, 'Data Collection Guides', 0, '2021-02-04 00:16:10'),
(161, 115, 33, 0, 'Analysis Tools', 0, '2021-02-04 00:16:20'),
(162, 117, 33, 0, 'Off Site Resource Links', 0, '2021-02-04 00:16:52'),
(163, 287, 33, 2, 'U.S. Department of Energy Tip Sheets', 0, '2021-02-04 00:17:40'),
(164, 107, 28, 0, 'Motor and Transmission Efficiency', 0, '2021-02-04 00:26:25'),
(165, 119, 28, 0, 'Turn off Motors (Consider Load Shedding)', 0, '2021-02-04 00:27:26'),
(166, 116, 33, 0, 'In Depth Site Resources', 0, '2021-02-04 00:27:44'),
(167, 3, 1, 0, 'Figures, Charts, and Tables', 0, '2021-02-04 02:45:38'),
(168, 72, 1, 1, 'Gallery: Industrial Air Compressors, Dryers, Receiver Tanks and Compressed Air Applications', 0, '2021-02-04 02:46:02'),
(169, 109, 33, 0, 'Tips', 0, '2021-02-05 21:09:50'),
(170, 109, 33, 0, 'Tips', 0, '2021-02-05 21:10:34'),
(171, 108, 33, 0, 'Rules of Thumb', 0, '2021-02-05 21:11:06'),
(172, 110, 33, 0, 'Best Practices', 0, '2021-02-08 17:35:11'),
(173, 110, 33, 0, 'Best Practices', 0, '2021-02-08 17:36:19'),
(174, 110, 33, 0, 'Best Practices', 0, '2021-02-08 17:55:35'),
(175, 287, 33, 2, 'U.S. Department of Energy Tip Sheets', 0, '2021-02-08 22:15:41'),
(176, 9, 1, 0, 'Pros', 0, '2021-02-08 23:20:34'),
(177, 133, 41, 0, 'Pros', 0, '2021-02-08 23:36:42'),
(178, 134, 41, 0, 'Cons', 0, '2021-02-08 23:36:47'),
(179, 136, 41, 0, 'Rules of Thumb', 0, '2021-02-08 23:51:54'),
(180, 138, 41, 0, 'Best Practices', 0, '2021-02-08 23:52:58'),
(181, 139, 41, 1, 'Charts, Tables, Figures', 0, '2021-02-08 23:53:55'),
(182, 290, 31, 2, 'U.S. Department of Energy Tip Sheets', 0, '2021-02-08 23:58:04'),
(183, 124, 29, 2, 'U.S. Department of Energy Tip Sheets', 0, '2021-02-09 00:02:03'),
(184, 182, 29, 0, 'Caveats', 0, '2021-02-09 00:02:21'),
(185, 289, 29, 0, 'Additional in Depth Site Resources', 0, '2021-02-09 00:03:00'),
(186, 288, 29, 2, 'Additional in Depth External Resources', 0, '2021-02-09 00:03:43');

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
(43, 55, 61, 'Power Factor Correction Opportunities to Consider', 0, 0, '2020-10-13 20:18:20'),
(44, 71, 64, 'Understanding the Guide', 0, 0, '2020-11-26 23:41:50'),
(45, 63, 69, 'Metals Manufacturing Opportunities to Consider', 0, 0, '2021-01-26 21:53:41'),
(46, 56, 62, 'Self Assessment Tools', 1, 0, '2021-01-26 22:45:15'),
(47, 56, 62, 'Self Assessment Tools', 0, 0, '2021-01-26 22:45:38'),
(48, 57, 62, 'Resources', 0, 0, '2021-01-26 22:47:18'),
(49, 62, 69, 'Metals Manufacturing Overview', 0, 0, '2021-02-03 22:42:53'),
(50, 30, 45, 'Pumping Opportunities to Consider', 0, 0, '2021-02-03 23:25:03');

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
(749, 103, 6305, 192, 0, 1, 2, 'Automatically switching banks are more expensive than fixed banks or individual capacitors and lead to longer payback periods', '', '', 0, 0, 0, 0, '2020-10-13 20:17:59'),
(750, 104, 5965, 105, 0, 0, 15, 'Condensate flow and temperature', '', '', 1, 0, 0, 0, '2020-09-21 17:02:20'),
(751, 104, 5966, 105, 0, 0, 11, 'Return more/all condensate back to the boiler', '', '', 0, 0, 0, 0, '2020-09-21 17:02:20'),
(752, 104, 5967, 105, 0, 0, 11, 'Recover Flash Steam', '', '', 0, 0, 0, 0, '2020-09-21 17:02:20'),
(753, 104, 5968, 105, 0, 1, 10, 'Steam being released into atmosphere from the boiler system', '', '', 0, 0, 0, 0, '2020-09-21 17:02:20'),
(754, 104, 5969, 105, 0, 1, 1, 'Payback period is usually within a year', '', '', 0, 0, 0, 0, '2020-09-21 17:02:20'),
(755, 104, 5970, 105, 0, 1, 1, 'Condensate does not require any chemical treatment other than condensate polishing. ', '', '', 0, 0, 0, 0, '2020-09-21 17:02:20'),
(756, 104, 5971, 105, 0, 2, 8, 'A condensate polisher is similar to a water softener. Polishing removes the trace amount of mineral that are dissolved in the condensate after running though the boiler. ', '', '', 0, 0, 0, 0, '2020-09-21 17:02:20'),
(757, 104, 5972, 105, 0, 1, 1, 'Capturing and reusing the steam can reduce hog fuel by 14.5%', '', '', 0, 0, 0, 0, '2020-09-21 17:02:20'),
(758, 104, 5973, 105, 0, 1, 2, 'Maintenance crews will need training to work with steam recovery systems', '', '', 0, 0, 0, 0, '2020-09-21 17:02:20'),
(759, 104, 5974, 105, 0, 1, 2, 'There are usually no incentives for this opportunity, because the system usually pays for itself within a year.', '', '', 0, 0, 0, 0, '2020-09-21 17:02:20'),
(760, 104, 5975, 105, 0, 1, 3, 'A good recovery system can collect up to 80%', '', '', 0, 0, 0, 0, '2020-09-21 17:02:20'),
(761, 104, 5976, 105, 0, 1, 3, 'Steam recovery is most efficient when waste heat is high and flow is continuous', '', '', 0, 0, 0, 0, '2020-09-21 17:02:20'),
(762, 104, 5977, 105, 0, 1, 8, 'Multiple different types of steam traps available to fit company needs: Mechanical, Thermodynamic, or Thermostatic', '', '', 0, 0, 0, 0, '2020-09-21 17:02:20'),
(763, 104, 5978, 105, 0, 1, 23, 'Explains how steam traps work, brief history and lists several different types of traps in detail.', 'https://www.youtube.com/watch?v=IiRyxcCBTa0', 'Let\'s Talk Steam Traps', 1, 0, 0, 0, '2020-09-21 17:02:20'),
(764, 104, 5979, 105, 0, 1, 17, 'Contains specific information about flash steam recovery', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam12_lowpressure_steam.pdf', 'DOE Tip Sheet Flash Steam Recovery', 1, 0, 0, 0, '2020-09-21 17:02:20'),
(765, 104, 5980, 105, 0, 1, 24, 'Contains several pages with useful calculations for steam systems. This link leads to the flash steam page.', 'https://www.tlv.com/global/US/steam-theory/introduction-to-condensate-recovery.html', 'TLV Steam Theory', 1, 0, 0, 0, '2020-09-21 17:02:20'),
(766, 104, 5981, 105, 0, 1, 21, '$empty', 'https://oregonstate.app.box.com/file/337450150435', 'Flash Steam Recovery', 0, 0, 0, 0, '2020-09-21 17:02:20'),
(767, 105, 6546, 101, 0, 0, 11, 'Tune the boiler regularly', '', '', 0, 0, 0, 0, '2020-10-29 21:53:26'),
(768, 105, 6547, 101, 0, 1, 10, 'O2 readings in the exhaust are high for the fuel type (>3% for gaseous fuels, >8% for solid fuels)', '', '', 0, 0, 0, 0, '2020-10-29 21:53:26'),
(769, 105, 6548, 101, 0, 1, 15, 'Combustion analysis at representative firing rates (high, medium, low, standby)', '', '', 0, 0, 1, 0, '2020-10-29 21:53:26'),
(770, 105, 6549, 101, 0, 1, 15, 'Firing rate over time', '', '', 0, 0, 1, 0, '2020-10-29 21:53:26'),
(771, 105, 6550, 101, 0, 1, 21, 'An OSU EEC Analysis Template in Microsoft Excel Format (unapproved, old style)', 'https://drive.google.com/file/d/1Z9GbxV0nr-OuxT2cNLxkdo82Wpq-h70m/view?usp=sharing', 'Boiler Tune Template', 0, 0, 0, 0, '2020-10-29 21:53:26'),
(772, 105, 6551, 101, 0, 0, 11, 'Install O2 Controls to maintain optimum combustion efficiency throughout the operating range', '', '', 0, 0, 0, 0, '2020-10-29 21:53:26'),
(773, 105, 6552, 101, 0, 1, 10, 'The boiler spends a significant portion of time at partial fire and lower efficiency', '', '', 0, 0, 0, 0, '2020-10-29 21:53:26'),
(774, 105, 6553, 101, 0, 0, 11, 'Clean heat exchanger surfaces and reduce the exhaust temperature', '', '', 0, 0, 0, 0, '2020-10-29 21:53:26'),
(775, 105, 6554, 101, 0, 1, 10, 'Stack temperature exceeds steam temperature by over 150 ˚F', '', '', 0, 0, 0, 0, '2020-10-29 21:53:26'),
(776, 105, 6555, 101, 0, 1, 12, 'Clean the fire side. Soot can accumulate and inhibit heat transfer.', '', '', 0, 0, 0, 0, '2020-10-29 21:53:26'),
(777, 105, 6556, 101, 0, 1, 12, 'Clean the water side. Scale can accumulate and inhibit heat transfer is the water chemistry is off', '', '', 0, 0, 0, 0, '2020-10-29 21:53:26'),
(778, 105, 6557, 101, 0, 0, 11, 'Install an economizer', '', '', 0, 0, 0, 0, '2020-10-29 21:53:26'),
(779, 105, 6558, 101, 0, 1, 10, 'Boilers rated at 100 BoHP or higher operating at greater than 75 psig.', '', '', 0, 0, 0, 0, '2020-10-29 21:53:26'),
(780, 105, 6559, 101, 0, 1, 13, 'Economizers can be used to preheat incoming feedwater, reducing the energy required for boiling.', '', '', 0, 0, 0, 0, '2020-10-29 21:53:26'),
(781, 105, 6560, 101, 0, 1, 3, 'Typically increases efficiency by around 2-4%.', '', '', 0, 0, 0, 0, '2020-10-29 21:53:26'),
(782, 105, 6561, 101, 0, 1, 3, 'For every 40°F decrease in flue gas temperature there is a 1% increase in efficiency', '', '', 0, 0, 0, 0, '2020-10-29 21:53:26'),
(783, 105, 6562, 101, 0, 1, 3, 'Can often reduce fuel requirements by 10%', '', '', 0, 0, 0, 0, '2020-10-29 21:53:26'),
(784, 105, 6563, 101, 0, 1, 8, 'Best suited for boilers with flue gasses containing sulfur or other potentially acidic elements/compounds.', '', '', 0, 0, 0, 0, '2020-10-29 21:53:26');
INSERT INTO `History_Items` (`historyId`, `parentId`, `itemId`, `cardId`, `orderIndex`, `indentation`, `iconType`, `contentText`, `contentUrl`, `contentLabel`, `contentMode`, `internal`, `inline`, `sourceId`, `created`) VALUES
(785, 105, 6564, 101, 0, 1, 4, 'Flue gasses containing sulphur must remain above dew point. Condensation of sulphuric acid can cause corrosion and damage the system.', '', '', 0, 0, 0, 0, '2020-10-29 21:53:26'),
(786, 105, 6565, 101, 0, 1, 2, 'Cannot recover as much energy from the boiler stack as a condensing economizer.', '', '', 0, 0, 0, 0, '2020-10-29 21:53:26'),
(787, 105, 6566, 101, 0, 1, 14, 'Does the boiler contain potentially acidic elements/compounds such as sulfur?', '', '', 0, 0, 0, 0, '2020-10-29 21:53:26'),
(788, 105, 6567, 101, 0, 1, 14, 'Would a condensing economizer be a better alternative?', '', '', 0, 0, 0, 0, '2020-10-29 21:53:26'),
(789, 105, 6568, 101, 0, 1, 14, 'Is there adequate space for an economizer?', '', '', 0, 0, 0, 0, '2020-10-29 21:53:26'),
(790, 105, 6569, 101, 0, 1, 14, 'What is the greatest temperature that the flue gasses can be reduced by without causing condensation?', '', '', 0, 0, 0, 0, '2020-10-29 21:53:26'),
(791, 105, 6570, 101, 0, 1, 27, 'Combustion analyzer', '', '', 0, 0, 0, 0, '2020-10-29 21:53:26'),
(792, 105, 6571, 101, 0, 1, 15, 'Flue gas temperature', '', '', 0, 0, 1, 0, '2020-10-29 21:53:26'),
(793, 105, 6572, 101, 0, 1, 15, 'Fuel used', '', '', 0, 0, 1, 0, '2020-10-29 21:53:26'),
(794, 105, 6573, 101, 0, 1, 15, 'Operating hours', '', '', 0, 0, 1, 0, '2020-10-29 21:53:26'),
(795, 105, 6574, 101, 0, 1, 15, 'Water mass flowrate', '', '', 0, 0, 1, 0, '2020-10-29 21:53:26'),
(796, 105, 6575, 101, 0, 1, 15, 'Water temperatures', '', '', 0, 0, 1, 0, '2020-10-29 21:53:26'),
(797, 105, 6576, 101, 0, 1, 15, 'Steam temperature and pressure', '', '', 0, 0, 1, 0, '2020-10-29 21:53:26'),
(798, 105, 6577, 101, 0, 1, 15, 'Boiler efficiency', '', '', 0, 0, 1, 0, '2020-10-29 21:53:26'),
(799, 105, 6578, 101, 0, 1, 17, 'Department of Energy tip sheet that provides an example case study of a boiler feedwater economizer being installed, as well as general considerations.', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam3_recovery.pdf', 'Use Feedwater Economizers for Waste Heat Recovery', 1, 0, 0, 0, '2020-10-29 21:53:26'),
(800, 105, 6579, 101, 0, 0, 11, 'Install a condensing economizer', '', '', 0, 0, 0, 0, '2020-10-29 21:53:26'),
(801, 105, 6580, 101, 0, 1, 10, 'Boilers rate at 100 BoHP or higher operating at greater that 75 psig that do not user fuels with sulphurous products.', '', '', 0, 0, 0, 0, '2020-10-29 21:53:26'),
(802, 105, 6581, 101, 0, 1, 3, 'Can increase efficiency by up to 10%', '', '', 0, 0, 0, 0, '2020-10-29 21:53:26'),
(803, 105, 6582, 101, 0, 1, 3, 'Can increase boiler efficiency to over 90%', '', '', 0, 0, 0, 0, '2020-10-29 21:53:26'),
(804, 105, 6583, 101, 0, 1, 1, 'Can recover more energy from the boiler stack by reducing flue gas temperature below dew point.', '', '', 0, 0, 0, 0, '2020-10-29 21:53:26'),
(805, 105, 6584, 101, 0, 1, 2, 'Not recommended for use with fuels containing sulphur.', '', '', 0, 0, 0, 0, '2020-10-29 21:53:26'),
(806, 105, 6585, 101, 0, 1, 2, 'The condensed water may be acidic, requiring treatment before being disharged to sewer systems.', '', '', 0, 0, 0, 0, '2020-10-29 21:53:26'),
(807, 105, 6586, 101, 0, 1, 4, 'Fuels with sulphurous combustions can damage the boiler stack when condensing, creating sulphuric acid.', '', '', 0, 0, 0, 0, '2020-10-29 21:53:26'),
(808, 105, 6587, 101, 0, 1, 4, 'Boiler stacks are prone to corrosion due to water condensation.', '', '', 0, 0, 0, 0, '2020-10-29 21:53:26'),
(809, 105, 6588, 101, 0, 1, 14, 'Does the boiler\'s fuel contain potentially acidic elements/compounds such as sulfur?', '', '', 0, 0, 0, 0, '2020-10-29 21:53:26'),
(810, 105, 6589, 101, 0, 1, 14, 'What is the greatest temperature the flue gasses can be reduced by?', '', '', 0, 0, 0, 0, '2020-10-29 21:53:26'),
(811, 105, 6590, 101, 0, 1, 27, 'Combustion analyzer', '', '', 0, 0, 0, 0, '2020-10-29 21:53:26'),
(812, 105, 6591, 101, 0, 1, 15, 'Flue gas temperature', '', '', 0, 0, 1, 0, '2020-10-29 21:53:26'),
(813, 105, 6592, 101, 0, 1, 15, 'Flue gas composition', '', '', 0, 0, 1, 0, '2020-10-29 21:53:26'),
(814, 105, 6593, 101, 0, 1, 15, 'Fuel used', '', '', 0, 0, 1, 0, '2020-10-29 21:53:26'),
(815, 105, 6594, 101, 0, 1, 15, 'Operating hours', '', '', 0, 0, 1, 0, '2020-10-29 21:53:26'),
(816, 105, 6595, 101, 0, 1, 15, 'Water mass flowrate', '', '', 0, 0, 1, 0, '2020-10-29 21:53:26'),
(817, 105, 6596, 101, 0, 1, 15, 'Water temperatures', '', '', 0, 0, 1, 0, '2020-10-29 21:53:26'),
(818, 105, 6597, 101, 0, 1, 15, 'Steam temperature/pressure', '', '', 0, 0, 1, 0, '2020-10-29 21:53:26'),
(819, 105, 6598, 101, 0, 1, 15, 'Boiler efficiency', '', '', 0, 0, 1, 0, '2020-10-29 21:53:26'),
(820, 105, 6599, 101, 0, 1, 12, 'Complete a more in-depth study evaluating the benefits of a condensing economizer and how it may impact the water and how the boiler operates.', '', '', 0, 0, 0, 0, '2020-10-29 21:53:26'),
(821, 105, 6600, 101, 0, 1, 12, 'Contact a vendor for more implementation details. Condensing economizers are custom made for each boiler.', '', '', 0, 0, 0, 0, '2020-10-29 21:53:26'),
(822, 105, 6601, 101, 0, 1, 24, 'This webpage lists the epcific heats and gas constants for different gasses. This is uesd for calculating the properties of the flue gasses.', 'https://www.engineeringtoolbox.com/specific-heat-capacity-gases-d_159.html', 'Specific Heat and Individual Gas Constant of Gases', 1, 0, 0, 0, '2020-10-29 21:53:26'),
(823, 105, 6602, 101, 0, 1, 17, 'Department of Energy tip sheet that explains how a condensing economizer works and how it saves energy, along with example scenarios', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam26a_condensing.pdf', 'Consider Installing a Condensing Economizer', 1, 0, 0, 0, '2020-10-29 21:53:26'),
(824, 105, 6603, 101, 0, 1, 17, 'Department of Energy tip sheet that explains special considerations that need to be taken into account when choosing to do projects with condensing economizers.', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam26b_condensing.pdf', 'Considerations When Selecting a Condensing Economizer', 1, 0, 0, 0, '2020-10-29 21:53:26'),
(825, 106, 6623, 95, 0, 0, 15, 'Boiler Nameplate Data', '', '', 0, 0, 0, 0, '2020-10-29 22:04:51'),
(826, 106, 6624, 95, 0, 1, 26, ' Rated Capacity (Steam Production, Maximum Fuel Input)', '', '', 0, 0, 1, 0, '2020-10-29 22:04:51'),
(827, 106, 6625, 95, 0, 1, 26, 'Fan Horsepower', '', '', 0, 0, 1, 0, '2020-10-29 22:04:51'),
(828, 106, 6626, 95, 0, 1, 26, 'Make, Model, Serial Number', '', '', 0, 0, 1, 0, '2020-10-29 22:04:51'),
(829, 106, 6627, 95, 0, 0, 15, 'Combustion Analysis: ', '', '', 0, 0, 0, 0, '2020-10-29 22:04:51'),
(830, 106, 6628, 95, 0, 1, 26, 'Stack Temperature', '', '', 0, 0, 1, 0, '2020-10-29 22:04:51'),
(831, 106, 6629, 95, 0, 1, 26, 'Excess O2', '', '', 0, 0, 1, 0, '2020-10-29 22:04:51'),
(832, 106, 6630, 95, 0, 1, 26, ' Inlet / Ambient Temperature ', '', '', 0, 0, 1, 0, '2020-10-29 22:04:51'),
(833, 106, 6631, 95, 0, 0, 15, 'Capacity over time', '', '', 0, 0, 0, 0, '2020-10-29 22:04:51'),
(834, 106, 6632, 95, 0, 1, 26, 'Hourly steam production', '', '', 0, 0, 1, 0, '2020-10-29 22:04:51'),
(835, 106, 6633, 95, 0, 1, 26, 'Hourly energy use', '', '', 0, 0, 1, 0, '2020-10-29 22:04:51'),
(836, 106, 6634, 95, 0, 1, 8, 'Sometimes capacity must be inferred from fan energy, and characteristic fan energy curves', '', '', 0, 0, 0, 0, '2020-10-29 22:04:51'),
(837, 107, 6635, 96, 0, 0, 27, 'Combustion Analyzer ', '', '', 0, 0, 1, 0, '2020-10-29 22:08:04'),
(838, 107, 6636, 96, 0, 0, 27, 'Digital or Infrared Thermometer', '', '', 0, 0, 1, 0, '2020-10-29 22:08:04'),
(839, 107, 6637, 96, 0, 0, 8, 'An IR camera can help identify hot spots to insulate', '', '', 0, 0, 0, 0, '2020-10-29 22:08:04'),
(840, 108, 1877, 120, 0, 0, 11, 'Correct Power Factor (for Ethan to flesh out)', '', '', 0, 0, 0, 0, '2020-07-03 00:28:39'),
(841, 108, 1878, 120, 0, 1, 10, 'Power factor below ##%', '', '', 0, 0, 0, 0, '2020-07-03 00:28:39'),
(842, 109, 7043, 119, 0, 0, 11, 'Manually reduce equipment operation time', '', '', 0, 0, 0, 0, '2020-12-14 19:44:33'),
(843, 109, 7044, 119, 0, 0, 11, 'Automatically control equipment operation time', '', '', 0, 0, 0, 0, '2020-12-14 19:44:33'),
(844, 109, 7045, 119, 0, 0, 11, 'Interlock equipment with a related process', '', '', 0, 0, 0, 0, '2020-12-14 19:44:33'),
(845, 109, 7046, 119, 0, 0, 11, 'Operate equipment in batches rather than continuously ', '', '', 0, 0, 0, 0, '2020-12-14 19:44:33'),
(846, 109, 7047, 119, 0, 1, 10, 'Equipment is idle for significant periods of time', '', '', 0, 0, 0, 0, '2020-12-14 19:44:33'),
(847, 110, 6910, 77, 0, 0, 11, 'Reduce Inlet Air Temperature ', '', '', 1, 0, 0, 0, '2020-11-27 06:07:10'),
(848, 110, 6911, 77, 0, 1, 31, 'Reducing the inlet air temperature of oil-injected screw compressors increases mass flow rate while maintaining power input. To efficiently maintain current mass flow rate a variable frequency drive is required to reduce the motor speed and associated power.', '%zXz%', '%zXz%', 0, 0, 0, 0, '2020-11-27 06:07:10'),
(849, 110, 6912, 77, 0, 1, 10, 'High ambient temperature at the air inlet', '', '', 0, 0, 0, 0, '2020-11-27 06:07:10'),
(850, 110, 6913, 77, 0, 1, 10, 'Difficulty meeting a compressor\'s rated air capacity', '', '', 0, 0, 0, 0, '2020-11-27 06:07:10'),
(851, 110, 6914, 77, 0, 1, 10, 'A compressor running hotter than its specifications', '', '', 0, 0, 0, 0, '2020-11-27 06:07:10'),
(852, 110, 6915, 77, 0, 2, 8, 'Other factors may be at play such as significant air leaks increasing the load on the compressor', '', '', 0, 0, 0, 0, '2020-11-27 06:07:10'),
(853, 110, 6916, 77, 0, 1, 3, '1.9% efficiency (scfm/kW) improvement per 10 °F reduction at inlet', '', '', 0, 0, 0, 0, '2020-11-27 06:07:10'),
(854, 110, 6917, 77, 0, 1, 15, 'Compressor make, model, and nameplate data', '', '', 0, 0, 0, 0, '2020-11-27 06:07:10'),
(855, 110, 6918, 77, 0, 1, 15, 'Motor nameplate data, live power reading, and one week of amperage data', '', '', 0, 0, 0, 0, '2020-11-27 06:07:10'),
(856, 110, 6919, 77, 0, 1, 15, 'Complete picture of compressed air system and control strategy', '', '', 0, 0, 0, 0, '2020-11-27 06:07:10'),
(857, 110, 6920, 77, 0, 1, 15, 'Average ambient temperature at current and proposed inlet locations', '', '', 0, 0, 0, 0, '2020-11-27 06:07:10'),
(858, 110, 6921, 77, 0, 1, 12, 'Move air inlet to coolest location to reduce power and energy consumption', '', '', 0, 0, 0, 0, '2020-11-27 06:07:10'),
(859, 110, 6922, 77, 0, 1, 8, 'If implementation requires much more than re-ducting, the chances of this opportunitity being worthwhile are low. ', '', '', 0, 0, 0, 0, '2020-11-27 06:07:10'),
(860, 110, 6923, 77, 0, 1, 21, 'An OSU EEC Analysis Template in Microsoft Excel Format', 'https://oregonstate.box.com/s/zk1aol8rf88aul9klflbxkikz6l2ku47', 'Analysis Template: Reduce Inlet Air Temperature', 2, 0, 0, 0, '2020-11-27 06:07:10'),
(861, 110, 6924, 77, 0, 1, 17, 'An article from Compressed Air Best Practices by  Tim Dugan, P.E., President, Compression Engineering Corporation', 'https://www.airbestpractices.com/system-assessments/compressor-controls/inlet-air-temperature-impacts-air-compressor-performance', 'Inlet Air Temperature Impacts on Air Compressor Performance', 1, 0, 0, 0, '2020-11-27 06:07:10'),
(862, 110, 6925, 77, 0, 0, 11, 'Increase Primary Receiver Capacity', '', '', 0, 0, 0, 0, '2020-11-27 06:07:10'),
(863, 110, 6926, 77, 0, 1, 31, 'Insufficient receiver capacity can result in short cycling in oil-injected rotary screw compressors that use load-unload controls. Short cycling occurs when system demand forces a compressor to re-load before unload power has been fully realized, causing the compressor to cycle too frequently. Adding receiver capacity increases system efficiency by reducing cycling losses and time spent at partial loads. ', '%zXz%', '%zXz%', 0, 0, 0, 0, '2020-11-27 06:07:10'),
(864, 110, 6927, 77, 0, 1, 10, 'Current receiver capacity for an oil-injected rotary screw compressor is less than 3 gal/cfm', '', '', 0, 0, 0, 0, '2020-11-27 06:07:10'),
(865, 110, 6928, 77, 0, 1, 10, 'An oil-injected rotary screw compressor consistently unloads for less than 45 seconds', '', '', 0, 0, 0, 0, '2020-11-27 06:07:10'),
(866, 110, 6929, 77, 0, 1, 3, 'A minimum of 3 gal/cfm receiver capacity is recommended for oil-injected rotary screw compressors ', '', '', 0, 0, 0, 0, '2020-11-27 06:07:10'),
(867, 110, 6930, 77, 0, 1, 1, 'Improved system efficiency due to reduced cycling frequency ', '', '', 0, 0, 0, 0, '2020-11-27 06:07:10'),
(868, 110, 6931, 77, 0, 1, 1, 'Critical pressure applications are shielded from pressure fluctuations', '', '', 0, 0, 0, 0, '2020-11-27 06:07:10'),
(869, 110, 6932, 77, 0, 1, 1, 'Prevents overloading the compressor\'s motor by allowing for a lower pressure set point ', '', '', 0, 0, 0, 0, '2020-11-27 06:07:10'),
(870, 110, 6933, 77, 0, 1, 15, 'Compressor and motor nameplate data and specifications including unload capacity and power', '', '', 0, 0, 0, 0, '2020-11-27 06:07:10'),
(871, 110, 6934, 77, 0, 1, 15, 'Week-long amperage data log that represents typical operation to identify when and if short cycling occurs ', '', '', 0, 0, 0, 0, '2020-11-27 06:07:10'),
(872, 110, 6935, 77, 0, 1, 15, 'Current receiver capacity and operating pressure', '', '', 0, 0, 0, 0, '2020-11-27 06:07:10'),
(873, 110, 6936, 77, 0, 1, 21, 'An OSU EEC Analysis Template in Microsoft Excel Format', 'https://oregonstate.box.com/s/fksaccw3fhif7h70nkynzwlbbu26g608', 'Analysis Template: Increase Air Receiver Capacity', 2, 0, 0, 0, '2020-11-27 06:07:10'),
(874, 110, 6937, 77, 0, 1, 20, '', '/uploads/user_42/8bef9996285f82268e4fef3c0c42b38a.png', 'Effect of Receiver Capacity on Lubricant-Injected Rotary Compressor with Load-Unload Capacity Control', 0, 0, 0, 0, '2020-11-27 06:07:10'),
(875, 110, 6938, 77, 0, 0, 11, 'Use a more efficient control strategy', '', '', 1, 0, 0, 0, '2020-11-27 06:07:10'),
(876, 110, 6939, 77, 0, 0, 11, 'Use a compressed air sequencer for multiple compressors', '', '', 0, 0, 0, 0, '2020-11-27 06:07:10'),
(877, 111, 7501, 13, 0, 0, 2, 'Extremely energy intensive. ', '', '', 0, 0, 0, 0, '2020-12-16 23:55:51'),
(878, 111, 7502, 13, 0, 0, 2, 'Function provided can often be replaced with a significantly lower power approach.', '', '', 0, 0, 0, 0, '2020-12-16 23:55:51'),
(879, 112, 6802, 155, 0, 0, 26, 'Initiate a conversation with potential clients in follow up to industry requests, partner references, or direct contact.', '', '', 0, 0, 0, 0, '2020-11-20 16:41:05'),
(880, 112, 6803, 155, 0, 0, 26, 'Confirm suitability of the site and client for a remote IAC assessment', '', '', 0, 0, 0, 0, '2020-11-20 16:41:05'),
(881, 112, 6804, 155, 0, 1, 12, 'Let clients know of key IAC eligibility criteria (Annual Energy Cost between $100K and $2.5 Mil, less than 500 employees,...) ', '', '', 0, 0, 0, 0, '2020-11-20 16:41:05'),
(882, 112, 6805, 155, 0, 1, 14, 'Make sure clients are prepared for the effort required for a remote assessment (we are still learning what this is)', '', '', 0, 0, 0, 0, '2020-11-20 16:41:05'),
(883, 112, 6806, 155, 0, 2, 14, 'May be best to have an initial phone conversation with the client to determine how to best structure a remote audit based on their needs.', '', '', 0, 0, 0, 0, '2020-11-20 16:41:05'),
(884, 112, 6807, 155, 0, 1, 14, 'Ensure someone at the site can \"walk us through\" or at least go to targeted locations while with us on the phone to ask questions, perhaps get pictures or videos, and really dig into details. (This step is important for our contract with U.S.DOE)', '', '', 0, 0, 0, 0, '2020-11-20 16:41:05'),
(885, 112, 6808, 155, 0, 0, 26, 'Send the standard OSU Pre-Assessment Package to appropriate clients ', '', '', 0, 0, 0, 0, '2020-11-20 16:41:05'),
(886, 112, 6809, 155, 0, 1, 17, '', 'https://docs.google.com/document/d/1SSk8Ks463YfySrxLr5o5zK08DLoDzkGMIEkecBMs51s/edit', 'Pre_Assessment Package Template', 0, 0, 0, 0, '2020-11-20 16:41:05'),
(887, 113, 6830, 156, 0, 0, 31, 'This meeting is analogous to the what the OSU IAC has traditionally called the \"Pre-Audit Walkthrough Phone Call\" (excluding site visit logistics, safety and PPE discussion)', '%zXz%', '%zXz%', 0, 0, 0, 0, '2020-11-20 21:21:53'),
(888, 113, 6831, 156, 0, 0, 26, 'Have the client(s) verbally  \"walk us through\" their process, highlighting key energy intensive processes', '', '', 0, 0, 0, 0, '2020-11-20 21:21:53'),
(889, 113, 6832, 156, 0, 1, 14, 'Ask client(s) to let us know of any areas of concern or interest', '', '', 0, 0, 0, 0, '2020-11-20 21:21:53'),
(890, 113, 6833, 156, 0, 1, 14, 'Ask for rated capacity, estimated % of full capacity, and hours of operation for significant equipment discussed.', '', '', 0, 0, 0, 0, '2020-11-20 21:21:53'),
(891, 113, 6834, 156, 0, 2, 8, 'Estimates of the number of smaller motor of various sizes with average load and hours can also be helpful.', '', '', 0, 0, 0, 0, '2020-11-20 21:21:53'),
(892, 113, 6835, 156, 0, 1, 14, 'Are common utilities such as compressed air, lighting, heating, etc covered in the conversation?', '', '', 0, 0, 0, 0, '2020-11-20 21:21:53'),
(893, 113, 6836, 156, 0, 0, 26, 'Discuss proposed process for remote assessment going forward (we are still learning and developing this process)', '', '', 0, 0, 0, 0, '2020-11-20 21:21:53'),
(894, 113, 6837, 156, 0, 0, 8, 'Try to get more than one key contact at the site involved in the project. (Plant manager, Fiscal Decision Maker, Maintenance Manager, Floor Personnel, Energy Lead, etc)', '', '', 0, 0, 0, 0, '2020-11-20 21:21:53'),
(895, 113, 6838, 156, 0, 0, 17, '(Item not added yet)', 'abc.com', 'Pre-Audit Walkthrough Phone Call Checklist', 0, 0, 0, 0, '2020-11-20 21:21:53'),
(896, 113, 6839, 156, 0, 0, 14, 'How best could we get Utility & Incentive Representatives involved (if the client permits) ', '', '', 0, 0, 0, 0, '2020-11-20 21:21:53'),
(897, 113, 6840, 156, 0, 0, 26, 'At this point, an analyst should be assigned to start the general background. It may take more time to develop the general background while doing a remote assessment so it\'s best to start it early.', '', '', 0, 1, 0, 0, '2020-11-20 21:21:53'),
(898, 114, 6772, 158, 0, 0, 26, 'Review any areas of concern or interest voiced by the client', '', '', 0, 0, 0, 0, '2020-11-20 15:49:57'),
(899, 114, 6773, 158, 0, 0, 26, 'Review typical opportunities found in the energy intensive systems identified at the facility ', '', '', 0, 0, 0, 0, '2020-11-20 15:49:57'),
(900, 114, 6774, 158, 0, 1, 8, 'This Industrial Walkthrough Checklist & Reference will offer more and more ideas for potential opportunities as it is developed over time', '', '', 0, 0, 0, 0, '2020-11-20 15:49:57'),
(901, 114, 6775, 158, 0, 0, 26, 'Review the list of typical opportunities found in the site\'s industrial sector developed in Preliminary Research', '', '', 0, 0, 0, 0, '2020-11-20 15:49:57'),
(902, 114, 6776, 158, 0, 0, 26, 'Pick the brain of anyone with experience in the subject', '', '', 0, 0, 0, 0, '2020-11-20 15:49:57'),
(903, 114, 6777, 158, 0, 0, 26, 'Brainstorm on opportunities as a team and compile a list', '', '', 0, 0, 0, 0, '2020-11-20 15:49:57'),
(904, 114, 6778, 158, 0, 0, 26, 'Develop a table of potential recommendations, and if possible: total energy used by the system related to each opportunity, a high/low estimate of potential % savings,  and the range of potential cost and energy savings potential.', '', '', 0, 0, 0, 0, '2020-11-20 15:49:57'),
(905, 114, 6779, 158, 0, 1, 17, '(Item not added yet)', 'osu.edu', 'Example Table of Potential Opportunities', 0, 0, 0, 0, '2020-11-20 15:49:57'),
(906, 114, 6780, 158, 0, 1, 8, 'Once you have a table of potential recommendations, make a data collection checklist for each recommendation and keep it up to date as you continue to work with the client. The data collection checklist should include all the information you need to develop each opportunity into a recommendation.', '', '', 0, 0, 0, 0, '2020-11-20 15:49:57'),
(907, 114, 6781, 158, 0, 1, 26, 'Review any documents or information you already have and start checking things off your data collection checklist.', '', '', 0, 0, 0, 0, '2020-11-20 15:49:57'),
(908, 114, 6782, 158, 0, 1, 26, 'For the information you don\'t have, make requests to the client over time or consider sharing the entire data collection checklist with them. If the checklist is lengthy, consider the first option and request information for one or two systems at a time so they remain engaged. In either case, the checklist that you share with the client should be formatted nicely. It should be clear exactly which system or piece of equipment you are talking about. ', '', '', 0, 0, 0, 0, '2020-11-20 15:49:57'),
(909, 115, 6783, 162, 0, 0, 31, 'This is a requirement for U.S.DOE to accept our remote assessment as a deliverable on our contract. It might be done in one session or iteratively in multiple sessions.', '%zXz%', '%zXz%', 0, 0, 0, 0, '2020-11-20 15:52:48'),
(910, 115, 6784, 162, 0, 0, 26, 'Begin with a review of preparatory work including the intitial energy balance, and list of possible opportunities.', '', '', 0, 0, 0, 0, '2020-11-20 15:52:48'),
(911, 115, 6785, 162, 0, 0, 26, 'Discuss the best strategy to use for a Guided Remote Tour. This might be: ', '', '', 0, 0, 0, 0, '2020-11-20 15:52:48'),
(912, 115, 6786, 162, 0, 1, 12, 'A standard tour of the process from start to finish, but this could be an overly long time for a Zoom meeting. ', '', '', 0, 0, 0, 0, '2020-11-20 15:52:48'),
(913, 115, 6787, 162, 0, 1, 12, 'A series of shorter remote targeted tours of areas of specific interest. ', '', '', 0, 0, 0, 0, '2020-11-20 15:52:48'),
(914, 115, 6788, 162, 0, 2, 8, 'This strategy is being used by a number of assessment teams', '', '', 0, 0, 0, 0, '2020-11-20 15:52:48'),
(915, 115, 6789, 162, 0, 2, 1, 'Can simplify scheduling if only key team members must join tours of particular areas.  Others can participate based on availability.', '', '', 0, 0, 0, 0, '2020-11-20 15:52:48'),
(916, 115, 6790, 162, 0, 2, 8, 'Come prepared to these meetings with an agenda and an approximate timeline for the meeting. All participants should have questions ready so the meeting can move efficiently.', '', '', 0, 0, 0, 0, '2020-11-20 15:52:48'),
(917, 116, 6815, 241, 0, 0, 31, 'Upon completion of a remote guided tour, the assessment team will meet to determine which opportunities should be pursued.', '%zXz%', '%zXz%', 0, 0, 0, 0, '2020-11-20 16:48:31'),
(918, 116, 6816, 241, 0, 0, 31, 'If possible, this meeting should include the client.', '%zXz%', '%zXz%', 0, 0, 0, 0, '2020-11-20 16:48:31'),
(919, 117, 6814, 242, 0, 0, 31, 'Report drafting process will follow a timeline similar to that used for in person assessments.', '%zXz%', '%zXz%', 0, 0, 0, 0, '2020-11-20 16:47:53'),
(920, 118, 6841, 243, 0, 0, 31, 'Once the report has been compiled and made it through the review process, a meeting with the client will be scheduled to present the findings and recommendations in the report.', '%zXz%', '%zXz%', 0, 0, 0, 0, '2020-11-20 21:33:31'),
(921, 118, 6842, 243, 0, 1, 31, 'This is something that we may start doing for all assessments moving forward.', '%zXz%', '%zXz%', 0, 0, 0, 0, '2020-11-20 21:33:31'),
(922, 118, 6843, 243, 0, 1, 31, 'If possible, this meeting should include all analysts involved in the report.', '%zXz%', '%zXz%', 0, 0, 0, 0, '2020-11-20 21:33:31'),
(923, 119, 6844, 244, 0, 0, 9, 'Working remotely changes the dynamic of working as a team. It is important to have expectations for meetings post-assessment in order to meet the deadline.', '', '', 0, 0, 0, 0, '2020-11-23 23:11:25'),
(924, 119, 6845, 244, 0, 1, 12, 'Schedule a team meeting within three business days of the assessment', '', '', 0, 0, 0, 0, '2020-11-23 23:11:25'),
(925, 119, 6846, 244, 0, 2, 8, 'The intention of this meeting should be to debrief after the assessment. Topics such as opportunities, best-practices, and AR/OMC assignments should be discussed. ', '', '', 0, 0, 0, 0, '2020-11-23 23:11:25'),
(926, 119, 6847, 244, 0, 1, 12, 'Schedule team meeting one week after debrief meeting.', '', '', 0, 0, 0, 0, '2020-11-23 23:11:25'),
(927, 119, 6848, 244, 0, 2, 8, 'The intention of this meeting should be for analysts to update the lead analyst and PA on their assignments. Additionally, any questions analysts have for the facility should be addressed.', '', '', 0, 0, 0, 0, '2020-11-23 23:11:25'),
(928, 119, 6849, 244, 0, 1, 12, 'Schedule 10-15 minute individual meetings with each analyst. The frequency of these meetings should be determined by the lead. At a minimum, every two weeks is recommended. ', '', '', 0, 0, 0, 0, '2020-11-23 23:11:25'),
(929, 119, 6850, 244, 0, 2, 8, 'Any issues or questions analysts have encountered should be discussed. ', '', '', 0, 0, 0, 0, '2020-11-23 23:11:25'),
(930, 119, 6851, 244, 0, 2, 8, 'Be sure to invite the PA, but their attendance should not be required unless previously discussed.', '', '', 0, 0, 0, 0, '2020-11-23 23:11:25'),
(931, 119, 6852, 244, 0, 0, 7, 'Take notes on every meeting. As the lead, it is your responsibility to make sure nothing gets forgotten.', '', '', 0, 0, 0, 0, '2020-11-23 23:11:25'),
(932, 120, 12163, 155, 0, 0, 26, 'Initiate a conversation with potential clients in follow up to industry requests, partner references, or direct contact.', '', '', 0, 0, 0, 0, '2021-01-26 19:31:58'),
(933, 120, 12164, 155, 0, 0, 26, 'Confirm suitability of the site and client for a remote IAC assessment', '', '', 0, 0, 0, 0, '2021-01-26 19:31:58'),
(934, 120, 12165, 155, 0, 1, 12, 'Let clients know of key IAC eligibility criteria (Annual Energy Cost between $100K and $2.5 Mil, less than 500 employees,...) ', '', '', 0, 0, 0, 0, '2021-01-26 19:31:58'),
(935, 120, 12166, 155, 0, 1, 14, 'Make sure clients are prepared for the effort required for a remote assessment (we are still learning what this is)', '', '', 0, 0, 0, 0, '2021-01-26 19:31:58'),
(936, 120, 12167, 155, 0, 2, 14, 'May be best to have an initial phone conversation with the client to determine how to best structure a remote audit based on their needs.', '', '', 0, 0, 0, 0, '2021-01-26 19:31:58'),
(937, 120, 12168, 155, 0, 1, 14, 'Ensure someone at the site can \"walk us through\" or at least go to targeted locations while with us on the phone to ask questions, perhaps get pictures or videos, and really dig into details. (This step is important for our contract with U.S.DOE)', '', '', 0, 0, 0, 0, '2021-01-26 19:31:58'),
(938, 120, 12169, 155, 0, 0, 26, 'Send the standard OSU Pre-Assessment Package to appropriate clients ', '', '', 0, 0, 0, 0, '2021-01-26 19:31:58'),
(939, 120, 12170, 155, 0, 1, 17, '<p>(item not added yet)</p>', 'https://docs.google.com/document/d/1SSk8Ks463YfySrxLr5o5zK08DLoDzkGMIEkecBMs51s/edit', 'Pre_Assessment Package Template', 0, 0, 0, 0, '2021-01-26 19:31:58'),
(940, 121, 12294, 118, 0, 0, 11, 'Use variable frequency drives where appropriate', '', '', 0, 0, 0, 0, '2021-01-26 20:10:03'),
(941, 121, 12295, 118, 0, 1, 10, '<p>Large motors attached to loads that are resistance controlled (throttle valves, brakes, etc)</p>', '', '', 0, 0, 0, 0, '2021-01-26 20:10:03'),
(942, 122, 5788, 222, 0, 0, 17, 'This report details the vehicle assembly process and common energy saving opportunities associated with each step. References to case studies, implementation costs and payback periods are included. Opportunities are included for the following systems: motors, compressed air, steam, lighting, HVAC, materials handling, painting and stamping.', 'https://www.osti.gov/biblio/927881', 'Energy Efficiency Improvement and Cost Saving Opportunities for the Vehicle Assembly Industry', 1, 0, 0, 0, '2020-09-15 19:40:23'),
(943, 123, 12351, 214, 0, 0, 31, 'Conditioning air for painting, drying and treating emissions all represent sources of energy consumption in a painting process. Energy saving measures may be available at each one of these steps.', '%zXz%', '%zXz%', 0, 0, 0, 13, '2021-01-26 21:51:29'),
(944, 123, 12352, 214, 0, 0, 11, 'Reduce airflow in paint booth', '', '', 0, 0, 0, 0, '2021-01-26 21:51:29'),
(945, 123, 12353, 214, 0, 1, 31, '<p>Air must be exhausted from paint booths to remove evaporated solvent, oversprayed paint particles and pollutants such as volatile organic compounds (VOCs). The energy consumed by the ventilation system depends on the target outlet concentration of VOCs. VOCs come from the paint and they are removed from the exhaust air stream through filtration or incineration.</p>', '%zXz%', '%zXz%', 0, 0, 0, 13, '2021-01-26 21:51:29'),
(946, 123, 12354, 214, 0, 1, 26, 'Reducing the amount of air that is exhausted from the paint booth reduces the amount of fuel required to raise the temperature of the inlet air to the target temperature, and reduces the volume of exhaust air that must be treated.', '', '', 0, 0, 0, 0, '2021-01-26 21:51:29'),
(947, 123, 12355, 214, 0, 1, 4, 'If the air flow rate through the booth is too low, cold spots may be present which lead to poor application and condensation.', '', '', 0, 0, 0, 13, '2021-01-26 21:51:29'),
(948, 123, 12356, 214, 0, 1, 26, '<p>Some paint booths also function as curing ovens, these are often called \"spray and bake\" systems. During spray mode the booth operates with a high flow rate of low temperature (60-90<span class=\"ql-formula\" data-value=\"\\degree\">﻿<span contenteditable=\"false\"><span class=\"katex\"><span class=\"katex-mathml\"><math><semantics><mrow><mi>°</mi></mrow><annotation encoding=\"application/x-tex\">\\degree</annotation></semantics></math></span><span class=\"katex-html\" aria-hidden=\"true\"><span class=\"base\"><span class=\"strut\" style=\"height:0.69444em;vertical-align:0em\"></span><span class=\"mord\">°</span></span></span></span></span>﻿</span>F, 15-32<span class=\"ql-formula\" data-value=\"\\degree\">﻿<span contenteditable=\"false\"><span class=\"katex\"><span class=\"katex-mathml\"><math><semantics><mrow><mi>°</mi></mrow><annotation encoding=\"application/x-tex\">\\degree</annotation></semantics></math></span><span class=\"katex-html\" aria-hidden=\"true\"><span class=\"base\"><span class=\"strut\" style=\"height:0.69444em;v', '', '', 0, 0, 0, 0, '2021-01-26 21:51:29'),
(949, 123, 12357, 214, 0, 1, 7, 'For air recirculating ovens, 90% of the air in the booth should be recirculated', '', '', 0, 0, 0, 13, '2021-01-26 21:51:29'),
(950, 123, 12358, 214, 0, 1, 3, '<p>For every 2,000 hrs/yr that an oven operates, every 10 cubic meters per hour (5.9 CFM) of exhaust flow loses 150 kWh at 50C (512 kBtu at 122<span class=\"ql-formula\" data-value=\"\\degree\">﻿<span contenteditable=\"false\"><span class=\"katex\"><span class=\"katex-mathml\"><math><semantics><mrow><mi>°</mi></mrow><annotation encoding=\"application/x-tex\">\\degree</annotation></semantics></math></span><span class=\"katex-html\" aria-hidden=\"true\"><span class=\"base\"><span class=\"strut\" style=\"height:0.69444em;vertical-align:0em\"></span><span class=\"mord\">°</span></span></span></span></span>﻿</span>F), 400 kWh at 100<span class=\"ql-formula\" data-value=\"\\degree\">﻿<span contenteditable=\"false\"><span class=\"katex\"><span class=\"katex-mathml\"><math><semantics><mrow><mi>°</mi></mrow><annotation encoding=\"application/x-tex\">\\degree</annotation></semantics></math></span><span class=\"katex-html\" aria-hidden=\"true\"><span class=\"base\"><span class=\"strut\" style=\"height:0.69444em;vertical-align:0em\"></span><span ', '', '', 0, 0, 0, 13, '2021-01-26 21:51:29'),
(951, 123, 12359, 214, 0, 1, 12, 'Turn down air flow rates during breaks to realize immediate cost savings.', '', '', 0, 0, 0, 0, '2021-01-26 21:51:29'),
(952, 123, 12360, 214, 0, 1, 1, 'Computer-controlled ventilation systems can operate based on solvent concentration in the paint booth or by spray gun operation.', '', '', 0, 0, 0, 13, '2021-01-26 21:51:29'),
(953, 123, 12361, 214, 0, 0, 11, 'Exhaust heat recovery', '', '', 0, 0, 0, 0, '2021-01-26 21:51:29'),
(954, 123, 12362, 214, 0, 1, 8, 'Heat recovery measures typically save 30-60% of energy consumption associated with a paint booth and have a 1-3 year payback period', '', '', 0, 0, 0, 12, '2021-01-26 21:51:29'),
(955, 123, 12363, 214, 0, 1, 1, 'Rotary heat exchangers can be installed on paint booths to save up to 50% of the exhausted heat', '', '', 0, 0, 0, 13, '2021-01-26 21:51:29'),
(956, 123, 12364, 214, 0, 1, 2, 'Heat recovered from paint booths is low-grade heat', '', '', 0, 0, 0, 0, '2021-01-26 21:51:29'),
(957, 123, 12365, 214, 0, 1, 2, 'These installations are of interest mainly to large scale painting operations', '', '', 0, 0, 0, 0, '2021-01-26 21:51:29'),
(958, 123, 12366, 214, 0, 1, 2, 'Heat wheels do not perform well with streams that have particles or where condensation occur', '', '', 0, 0, 0, 0, '2021-01-26 21:51:29'),
(959, 123, 12367, 214, 0, 0, 11, 'Change to powder-based paints', '', '', 0, 0, 0, 0, '2021-01-26 21:51:29'),
(960, 123, 12368, 214, 0, 1, 1, 'Powder-based paints do not have solvents, the paint particles are attracted to the part by an applied electrostatic charge. The energy requirement for powder-based painting can be up to 30% lower due to the reduced energy consumption associated with eliminating VOCs from the exhaust stream.', '', '', 0, 0, 0, 13, '2021-01-26 21:51:29'),
(961, 123, 12369, 214, 0, 1, 8, 'These measures can save 18-30% of energy consumption associated with a paint booth and have a 2-3 year payback period', '', '', 0, 0, 0, 12, '2021-01-26 21:51:29'),
(962, 123, 12370, 214, 0, 0, 11, 'Install an air-to-fuel ratio control system on the paint booth air heater', '', '', 0, 0, 0, 0, '2021-01-26 21:51:29'),
(963, 123, 12371, 214, 0, 1, 3, 'This may reduce energy consumption associated with combustion by 5-15% depending on demand', '', '', 0, 0, 0, 13, '2021-01-26 21:51:29'),
(964, 123, 12372, 214, 0, 0, 11, 'Install activated carbon filters to remove VOCs from the exhaust stream', '', '', 0, 0, 0, 0, '2021-01-26 21:51:29'),
(965, 123, 12373, 214, 0, 1, 26, 'Activated carbon filters capture and concentrate VOCs from the exhaust stream reducing the amount of air that must be treated by incineration', '', '', 0, 0, 0, 0, '2021-01-26 21:51:29'),
(966, 123, 12374, 214, 0, 0, 11, '<p>Install occupancy sensors in paint booth</p>', '', '', 0, 1, 0, 0, '2021-01-26 21:51:29'),
(967, 123, 12375, 214, 0, 0, 11, '<p>Turn off high-intensity lighting when paint booth is not being used</p>', '', '', 0, 1, 0, 0, '2021-01-26 21:51:29'),
(968, 123, 12376, 214, 0, 0, 11, '<p>Use direct-to-metal paint to eliminate the priming process</p>', '', '', 0, 1, 0, 0, '2021-01-26 21:51:29'),
(969, 124, 12378, 211, 0, 0, 11, 'Install localized welding ventilation', '', '', 0, 0, 0, 0, '2021-01-26 21:53:18'),
(970, 124, 12379, 211, 0, 1, 31, '<p>Welding processes must be well ventilated to protect personnel from fumes. Controlled ventilation can reduce the amount of air exhausted outside, and therefore energy losses, while adequately ventilating the welding process.</p>', '%zXz%', '%zXz%', 0, 0, 0, 0, '2021-01-26 21:53:18'),
(971, 124, 12380, 211, 0, 1, 26, 'Reduce ventilation energy losses by installing localized ducting above welding stations', '', '', 0, 0, 0, 0, '2021-01-26 21:53:18'),
(972, 124, 12381, 211, 0, 1, 26, 'Welding areas must be ventilated to maintain air quality standards specified by the Oregon Health and Safety Administration (OSHA)', '', '', 0, 0, 0, 0, '2021-01-26 21:53:18'),
(973, 124, 12382, 211, 0, 1, 15, 'Identify the source of heating and cooling for the building and the associated cost of operating the equipment. This may be packaged HVAC units , gas/electric heaters, etc. ', '', '', 0, 0, 0, 0, '2021-01-26 21:53:18'),
(974, 124, 12383, 211, 0, 1, 15, 'Heating degree days for the local area. Temperature bin data can be obtained from the National Ocean and Atmospheric Administration (NOAA).', '', '', 0, 0, 0, 0, '2021-01-26 21:53:18'),
(975, 124, 12384, 211, 0, 1, 15, 'Current exhaust air flow rate and the minimum exhaust air flow rate required by health and safety regulations', '', '', 0, 0, 0, 0, '2021-01-26 21:53:18'),
(976, 124, 12385, 211, 0, 1, 15, 'Quantity of welders or welding stations', '', '', 0, 0, 0, 0, '2021-01-26 21:53:18'),
(977, 124, 12386, 211, 0, 1, 15, 'Approximate the proposed length of ventilation required for the installation to estimate the cost of implementation', '', '', 0, 0, 0, 0, '2021-01-26 21:53:18'),
(978, 125, 8634, 212, 0, 0, 11, 'Increase Spray Paint Efficiency', '', '', 0, 0, 0, 0, '2020-12-22 22:54:00'),
(979, 125, 8635, 212, 0, 1, 8, 'Training paint personnel to reduce overspray in painting applications can significantly reduce annual paint consumption, extend booth filter life, and reduce associated disposal costs. ', '', '', 0, 0, 0, 0, '2020-12-22 22:54:00'),
(980, 125, 8636, 212, 0, 1, 26, 'Paint booths are often present in metals manufacturing facilities that produce final products or components', '', '', 0, 0, 0, 0, '2020-12-22 22:54:00'),
(981, 125, 8637, 212, 0, 1, 26, 'Operator spray technique and equipment settings can be adjusted to minimize paint overspray. Equipment settings include paint gun adjustment, equipment maintenance, and paint gun distance and orientation.', '', '', 0, 0, 0, 0, '2020-12-22 22:54:00'),
(982, 125, 8638, 212, 0, 1, 1, 'Painting efficiency can be improved by as much 25% for even the most experienced painters with increased attention to application techniques', '', '', 0, 0, 0, 6, '2020-12-22 22:54:00'),
(983, 125, 8639, 212, 0, 1, 15, 'Annual consumption of paint and associated cost', '', '', 0, 0, 0, 0, '2020-12-22 22:54:00'),
(984, 125, 8640, 212, 0, 1, 3, 'Proposed savings can be conservatively estimated at 10-15% reduction in paint consumption. Percent savings may approach 25% if the recommended techniques are replicated and adhered to.', '', '', 0, 0, 0, 0, '2020-12-22 22:54:00'),
(985, 126, 8641, 215, 0, 0, 31, '<p>The following opportunities are specific to metals manufacturing facilities. For more opportunities related to compressed air, go to the <a href=\"https://walkthrough.eec.oregonstate.edu/wiki/technologies/2\" rel=\"noopener noreferrer\" target=\"_blank\">Compressed Air</a> Technologies page.</p>', '%zXz%', '%zXz%', 0, 0, 0, 0, '2020-12-22 22:56:20'),
(986, 126, 8642, 215, 0, 0, 11, 'Replace the pistons on stamping die cushions with air actuators', '', '', 0, 0, 0, 0, '2020-12-22 22:56:20'),
(987, 126, 8643, 215, 0, 1, 31, 'Die cushions on large stamping presses are used to support inserts in the lower die.', '%zXz%', '%zXz%', 0, 0, 0, 13, '2020-12-22 22:56:20'),
(988, 126, 8644, 215, 0, 1, 26, 'Die cushions can produce significant air leaks, up to 100 CFM in some cases, after moderate use. Air actuators are more resilient and can operate without air leaks for over five years.', '', '', 0, 0, 0, 13, '2020-12-22 22:56:20'),
(989, 127, 12387, 288, 0, 0, 24, '<p></p>', 'https://www.dxpe.com/different-types-centrifugal-pumps-applications/', '<p>Different Types of Centrifugal Pumps and Their Applications</p>', 1, 0, 0, 0, '2021-01-26 21:56:11'),
(990, 127, 12388, 288, 0, 0, 24, '<p></p>', 'https://www.aquaculturealliance.org/advocate/cavitation-the-pump-disease/', '<p>Cavitation, the ‘pump disease</p><p><br></p>', 1, 0, 0, 0, '2021-01-26 21:56:11'),
(991, 127, 12389, 288, 0, 0, 24, '<p></p>', 'https://www.deppmann.com/blog/service-tip-of-the-month/pump-cavitation/', '<p>Pump Cavitation</p><p><br></p>', 1, 0, 0, 0, '2021-01-26 21:56:11'),
(992, 128, 12398, 285, 0, 0, 27, '<p>Flow meter (ultrasonic or in-line)</p>', '', '', 0, 0, 0, 0, '2021-01-26 22:03:13'),
(993, 128, 12399, 285, 0, 0, 27, '<p>Pressure gage</p>', '', '', 0, 0, 0, 0, '2021-01-26 22:03:13'),
(994, 128, 12400, 285, 0, 0, 27, '<p>Digital Multimeter</p>', '', '', 0, 0, 0, 0, '2021-01-26 22:03:13'),
(995, 129, 12390, 182, 0, 0, 4, 'Improperly designed pump systems can lead to low pressures at the pump inlet which can lead to cavitation. This can seriously damage the pump and reduce its operating life.', '', '', 0, 0, 0, 0, '2021-01-26 22:00:30'),
(996, 129, 12391, 182, 0, 0, 24, 'Online resource discussing how cavitation occurs and how to detect and prevent it from happening.', 'https://modernpumpingtoday.com/detecting-pump-cavitation/', '<p>Detecting Pump Cavitation </p>', 1, 0, 0, 0, '2021-01-26 22:00:30'),
(997, 130, 12443, 288, 0, 0, 24, '<p></p>', 'https://www.dxpe.com/different-types-centrifugal-pumps-applications/', '<p>Different Types of Centrifugal Pumps and Their Applications</p>', 1, 0, 0, 0, '2021-01-26 22:21:00'),
(998, 130, 12444, 288, 0, 0, 24, '<p></p>', 'https://www.aquaculturealliance.org/advocate/cavitation-the-pump-disease/', '<p>Cavitation, the ‘pump disease</p><p><br></p>', 1, 0, 0, 0, '2021-01-26 22:21:00'),
(999, 130, 12445, 288, 0, 0, 24, '<p></p>', 'https://www.deppmann.com/blog/service-tip-of-the-month/pump-cavitation/', '<p>Pump Cavitation</p><p><br></p>', 1, 0, 0, 0, '2021-01-26 22:21:00'),
(1000, 131, 12469, 194, 0, 0, 26, 'The IAC Industrial Control Systems Cybersecurity Assessment Tool is a 20-question survey that can provide a starting place for a cybersecurity program. This tool is located on the Industrial Assessment Center’s cybersecurity webpage, as well as several other cybersecurity resources.', '', '', 0, 0, 0, 0, '2021-01-26 22:46:27'),
(1001, 131, 12470, 194, 0, 1, 21, ' ', 'https://iac.university/cybersecurity', 'Industrial Control Systems Cybersecurity Assessment Tool', 1, 0, 0, 0, '2021-01-26 22:46:27'),
(1002, 131, 12471, 194, 0, 0, 26, 'The US Department of Energy released the Cybersecurity Capability Maturity Model (C2M2) to evaluate an organization’s cybersecurity capabilities regardless of their structure, size, or organization type. This includes a self-evaluation and proposed model.', '', '', 1, 0, 0, 0, '2021-01-26 22:46:27'),
(1003, 131, 12472, 194, 0, 1, 21, ' ', 'https://www.energy.gov/ceser/activities/cybersecurity-critical-energy-infrastructure/energy-sector-cybersecurity-0-0 ', 'Cybersecurity Capability Maturity Model (C2M2)', 1, 0, 0, 0, '2021-01-26 22:46:27'),
(1004, 132, 12473, 195, 0, 0, 26, 'The Cybersecurity and Infrastructure Security Agency (CISA, a part of the US Department of Homeland Security) has created the Cyber Security Evaluation Tool (CSET). This tool is a provides a comprehensive self-assessment and recommendations to fix potential vulnerabilities. The CSET focuses on industrial control systems and information technology network security.', '', '', 0, 0, 0, 0, '2021-01-26 22:46:33'),
(1005, 132, 12474, 195, 0, 1, 21, ' ', 'https://us-cert.cisa.gov/ics/Assessments', 'Cyber Security Evaluation Tool (CSET)', 1, 0, 0, 0, '2021-01-26 22:46:33'),
(1006, 132, 12475, 195, 0, 0, 26, 'CISA also offers the Cyber Resilience Review which is a free non-technical cybersecurity self-assessment. This process can also be completed with professionals from the Department of Homeland Security.', '', '', 1, 0, 0, 0, '2021-01-26 22:46:33'),
(1007, 132, 12476, 195, 0, 1, 21, ' ', 'https://us-cert.cisa.gov/resources/assessments ', 'Cyber Resilience Review ', 1, 0, 0, 0, '2021-01-26 22:46:33'),
(1008, 133, 4956, 196, 0, 0, 26, 'The Federal Communications Commission released ten tips for small business cyber security after meeting with public and private leaders.', '', '', 0, 0, 0, 0, '2020-08-27 00:40:27'),
(1009, 133, 4957, 196, 0, 1, 24, ' ', 'https://www.fcc.gov/general/cybersecurity-small-business', 'Cybersecurity for Small Business', 1, 0, 0, 0, '2020-08-27 00:40:27'),
(1010, 133, 4958, 196, 0, 0, 26, 'The Cybersecurity and Infrastructure Security Agency (CISA, a part of the US Department of Homeland Security) also has resources focused on increasing the security of industrial control systems.', '', '', 1, 0, 0, 0, '2020-08-27 00:40:27'),
(1011, 133, 4959, 196, 0, 1, 24, ' ', 'https://us-cert.cisa.gov/ics', 'Industrial Control Systems', 1, 0, 0, 0, '2020-08-27 00:40:27'),
(1012, 134, 12477, 197, 0, 0, 26, 'Researchers from the University of Illinois Urbana-Champaign have developed a tool for manufacturers to simplify the understanding of cybersecurity standards created by the National Institute of Standards and Technology. This tool also follows DFARS, the Department of Defense’s acquisition regulations.', '', '', 0, 0, 0, 0, '2021-01-26 22:46:48'),
(1013, 134, 12478, 197, 0, 1, 21, ' ', 'https://iti.illinois.edu/news/new-software-tool-help-manufacturing-companies-meet-complex-cyber-security-standards ', 'The Dashboard', 1, 0, 0, 0, '2021-01-26 22:46:48'),
(1014, 135, 7799, 90, 0, 0, 4, 'Boilers can be bombs if not properly set up and maintained.', '', '', 0, 0, 0, 0, '2020-12-18 18:36:17'),
(1015, 135, 7800, 90, 0, 1, 23, 'M5 Industries founder shows potential damages due to safety system failure', 'https://www.youtube.com/watch?v=jbreKn4PoAc', 'Boiler system failure', 1, 1, 0, 0, '2020-12-18 18:36:17'),
(1016, 136, 7801, 91, 0, 0, 3, '1 boiler horsepower (BoHP) = 33,479 Btu/hr', '', '', 0, 0, 0, 0, '2020-12-18 18:38:14'),
(1017, 136, 7802, 91, 0, 0, 3, 'Exhaust gases are typically best kept above 300 °F to avoid corrosive condensation.', '', '', 0, 0, 0, 0, '2020-12-18 18:38:14'),
(1018, 136, 7803, 91, 0, 0, 3, 'Ideal exhaust temperatures should not be more than 100 - 150 °F greater than the steam temperature. If a boiler is well designed and heat exchanger surfaces are in good condition, ideal exhaust temperatures should be achievable.', '', '', 0, 0, 0, 0, '2020-12-18 18:38:14'),
(1019, 136, 7804, 91, 0, 0, 3, 'For every 40°F decrease in flue gas temperature there is a 1% increase in efficiency', '', '', 0, 0, 0, 0, '2020-12-18 18:38:14'),
(1020, 137, 9174, 29, 0, 0, 17, 'This guide focuses mainly on screw and reciprocating compressors. These are the most common types of compressors used in the northwest. Other types of compressors such as rotary vane, centrifugal, lobe and radial compressors are much less common and are only introduced in this guide.', 'https://drive.google.com/file/d/12Co0C6JBK5CqoYhZQBcD0VX6JVBXy86o/view', 'Assessing Industrial Air Compressors', 0, 0, 0, 0, '2020-12-23 19:54:32'),
(1021, 137, 9175, 29, 0, 0, 22, 'A short slideshow of common industrial compressed air equipment and applicatons', 'https://docs.google.com/presentation/d/1khB1tPIND-ooBy1yCCL-rDf09Gf4Q8nr/edit#slide=id.p7', 'Industrial Compressed Air (a slideshow)', 0, 0, 0, 0, '2020-12-23 19:54:32'),
(1022, 138, 12660, 290, 0, 0, 17, '', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam15_benchmark.pdf', '<p>Benchmark the Fuel Cost of Steam Generation</p>', 1, 0, 0, 0, '2021-02-02 21:07:04'),
(1023, 138, 12661, 290, 0, 0, 17, '', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam7_surfaces.pdf', '<p>Clean Firetube Boiler Waterside Heat Transfer Surfaces</p>', 1, 0, 0, 0, '2021-02-02 21:07:04'),
(1024, 138, 12662, 290, 0, 0, 17, '', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam26a_condensing.pdf', '<p>Consider Installing a Condensing Economizer</p>', 1, 0, 0, 0, '2021-02-02 21:07:04'),
(1025, 138, 12663, 290, 0, 0, 17, '', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam22_backpressure.pdf', '<p>Consider Installing High-Pressure Boilers with Backpressure Turbine-Generators</p>', 1, 0, 0, 0, '2021-02-02 21:07:04'),
(1026, 138, 12664, 290, 0, 0, 17, '', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam25_firetube_boilers.pdf', '<p>Consider Installing Turbulators on Two- and Three-Pass Firetube Boilers</p>', 1, 0, 0, 0, '2021-02-02 21:07:04'),
(1027, 138, 12665, 290, 0, 0, 17, '', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam21_rotating_equip.pdf', '<p>Consider Steam Turbine Drives for Rotating Equipment</p>', 1, 0, 0, 0, '2021-02-02 21:07:04'),
(1028, 138, 12666, 290, 0, 0, 17, '', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam26b_condensing.pdf', '<p>Considerations When Selecting a Condensing Economizer</p>', 1, 0, 0, 0, '2021-02-02 21:07:04'),
(1029, 138, 12667, 290, 0, 0, 17, '', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam19_vessels.pdf', '<p>Cover Heated, Open Vessels</p>', 1, 0, 0, 0, '2021-02-02 21:07:04'),
(1030, 138, 12668, 290, 0, 0, 17, '', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam18_steam_systems.pdf', '<p>Deaerators in Industrial Steam Systems</p>', 1, 0, 0, 0, '2021-02-02 21:07:04'),
(1031, 138, 12669, 290, 0, 0, 17, '', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam12_lowpressure_steam.pdf', '<p>Flash High-Pressure Condensate to Regenerate Low-Pressure Steam</p>', 1, 0, 0, 0, '2021-02-02 21:07:04'),
(1032, 138, 12670, 290, 0, 0, 17, '', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam1_traps.pdf', '<p>Inspect and Repair Steam Traps</p>', 1, 0, 0, 0, '2021-02-02 21:07:04'),
(1033, 138, 12671, 290, 0, 0, 17, '', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam23_control_system.pdf', '<p>Install an Automatic Blowdown-Control System</p>', 1, 0, 0, 0, '2021-02-02 21:07:04'),
(1034, 138, 12672, 290, 0, 0, 17, '', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam17_valves_fittings.pdf', '<p>Install Removable Insulation on Valves and Fittings</p>', 1, 0, 0, 0, '2021-02-02 21:07:04'),
(1035, 138, 12673, 290, 0, 0, 17, '', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam2_insulate.pdf', '<p>Insulate Steam Distribution and Condensate Return Lines</p>', 1, 0, 0, 0, '2021-02-02 21:07:04'),
(1036, 138, 12674, 290, 0, 0, 17, '', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam4_boiler_efficiency.pdf', '<p>Improve Your Boiler’s Combustion Efficiency</p>', 1, 0, 0, 0, '2021-02-02 21:07:04'),
(1037, 138, 12675, 290, 0, 0, 17, '', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam9_blowdown.pdf', '<p>Minimize Boiler Blowdown&nbsp;</p>', 1, 0, 0, 0, '2021-02-02 21:07:04'),
(1038, 138, 12676, 290, 0, 0, 17, '', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam16_cycling_losses.pdf', '<p>Minimize Boiler Short Cycling Losses</p>', 1, 0, 0, 0, '2021-02-02 21:07:04'),
(1039, 138, 12677, 290, 0, 0, 17, '', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam10_boiler_blowdown.pdf', '<p>Recover Heat from Boiler Blowdown</p>', 1, 0, 0, 0, '2021-02-02 21:07:04');
INSERT INTO `History_Items` (`historyId`, `parentId`, `itemId`, `cardId`, `orderIndex`, `indentation`, `iconType`, `contentText`, `contentUrl`, `contentLabel`, `contentMode`, `internal`, `inline`, `sourceId`, `created`) VALUES
(1040, 138, 12678, 290, 0, 0, 17, '', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam20_turbogenerators.pdf', '<p>Replace Pressure-Reducing Valves with Backpressure Turbogenerators</p>', 1, 0, 0, 0, '2021-02-02 21:07:04'),
(1041, 138, 12679, 290, 0, 0, 17, '', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam8_boiler.pdf', '<p>Return Condensate to the Boiler</p>', 1, 0, 0, 0, '2021-02-02 21:07:04'),
(1042, 138, 12680, 290, 0, 0, 17, '', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam24_burners.pdf', '<p>Upgrade Boilers with Energy-Efficient Burners</p>', 1, 0, 0, 0, '2021-02-02 21:07:04'),
(1043, 138, 12681, 290, 0, 0, 17, '', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam3_recovery.pdf', '<p>Use Feedwater Economizers for Waste Heat Recovery</p>', 1, 0, 0, 0, '2021-02-02 21:07:04'),
(1044, 138, 12682, 290, 0, 0, 17, '', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam14_chillers.pdf', '<p>Use Low-Grade Waste Steam to Power Absorption Chillers</p>', 1, 0, 0, 0, '2021-02-02 21:07:04'),
(1045, 138, 12683, 290, 0, 0, 17, '', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam29_use_steam.pdf', '<p>Use Steam Jet Ejectors or Thermocompressors to Reduce Venting of Low-Pressure Steam</p>', 1, 0, 0, 0, '2021-02-02 21:07:04'),
(1046, 138, 12684, 290, 0, 0, 17, '', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam11_waste_steam.pdf', '<p>Use Vapor Recompression to Recover Low-Pressure Waste Steam</p>', 1, 0, 0, 0, '2021-02-02 21:07:04'),
(1047, 138, 12685, 290, 0, 0, 17, '', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam13_vent_condenser.pdf', '<p>Use a Vent Condenser to Recover Flash Steam Energy</p>', 1, 0, 0, 0, '2021-02-02 21:07:04'),
(1048, 139, 12686, 290, 0, 0, 17, '', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam15_benchmark.pdf', '<p>Benchmark the Fuel Cost of Steam Generation</p>', 1, 0, 0, 0, '2021-02-02 21:08:23'),
(1049, 139, 12687, 290, 0, 0, 17, '', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam7_surfaces.pdf', '<p>Clean Firetube Boiler Waterside Heat Transfer Surfaces</p>', 1, 0, 0, 0, '2021-02-02 21:08:23'),
(1050, 139, 12688, 290, 0, 0, 17, '', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam26a_condensing.pdf', '<p>Consider Installing a Condensing Economizer</p>', 1, 0, 0, 0, '2021-02-02 21:08:23'),
(1051, 139, 12689, 290, 0, 0, 17, '', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam22_backpressure.pdf', '<p>Consider Installing High-Pressure Boilers with Backpressure Turbine-Generators</p>', 1, 0, 0, 0, '2021-02-02 21:08:23'),
(1052, 139, 12690, 290, 0, 0, 17, '', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam25_firetube_boilers.pdf', '<p>Consider Installing Turbulators on Two- and Three-Pass Firetube Boilers</p>', 1, 0, 0, 0, '2021-02-02 21:08:23'),
(1053, 139, 12691, 290, 0, 0, 17, '', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam21_rotating_equip.pdf', '<p>Consider Steam Turbine Drives for Rotating Equipment</p>', 1, 0, 0, 0, '2021-02-02 21:08:23'),
(1054, 139, 12692, 290, 0, 0, 17, '', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam26b_condensing.pdf', '<p>Considerations When Selecting a Condensing Economizer</p>', 1, 0, 0, 0, '2021-02-02 21:08:23'),
(1055, 139, 12693, 290, 0, 0, 17, '', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam19_vessels.pdf', '<p>Cover Heated, Open Vessels</p>', 1, 0, 0, 0, '2021-02-02 21:08:23'),
(1056, 139, 12694, 290, 0, 0, 17, '', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam18_steam_systems.pdf', '<p>Deaerators in Industrial Steam Systems</p>', 1, 0, 0, 0, '2021-02-02 21:08:23'),
(1057, 139, 12695, 290, 0, 0, 17, '', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam12_lowpressure_steam.pdf', '<p>Flash High-Pressure Condensate to Regenerate Low-Pressure Steam</p>', 1, 0, 0, 0, '2021-02-02 21:08:23'),
(1058, 139, 12696, 290, 0, 0, 17, '', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam1_traps.pdf', '<p>Inspect and Repair Steam Traps</p>', 1, 0, 0, 0, '2021-02-02 21:08:23'),
(1059, 139, 12697, 290, 0, 0, 17, '', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam23_control_system.pdf', '<p>Install an Automatic Blowdown-Control System</p>', 1, 0, 0, 0, '2021-02-02 21:08:23'),
(1060, 139, 12698, 290, 0, 0, 17, '', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam17_valves_fittings.pdf', '<p>Install Removable Insulation on Valves and Fittings</p>', 1, 0, 0, 0, '2021-02-02 21:08:23'),
(1061, 139, 12699, 290, 0, 0, 17, '', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam2_insulate.pdf', '<p>Insulate Steam Distribution and Condensate Return Lines</p>', 1, 0, 0, 0, '2021-02-02 21:08:23'),
(1062, 139, 12700, 290, 0, 0, 17, '', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam4_boiler_efficiency.pdf', '<p>Improve Your Boiler’s Combustion Efficiency</p>', 1, 0, 0, 0, '2021-02-02 21:08:23'),
(1063, 139, 12701, 290, 0, 0, 17, '', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam9_blowdown.pdf', '<p>Minimize Boiler Blowdown&nbsp;</p>', 1, 0, 0, 0, '2021-02-02 21:08:23'),
(1064, 139, 12702, 290, 0, 0, 17, '', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam16_cycling_losses.pdf', '<p>Minimize Boiler Short Cycling Losses</p>', 1, 0, 0, 0, '2021-02-02 21:08:23'),
(1065, 139, 12703, 290, 0, 0, 17, '', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam10_boiler_blowdown.pdf', '<p>Recover Heat from Boiler Blowdown</p>', 1, 0, 0, 0, '2021-02-02 21:08:23'),
(1066, 139, 12704, 290, 0, 0, 17, '', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam20_turbogenerators.pdf', '<p>Replace Pressure-Reducing Valves with Backpressure Turbogenerators</p>', 1, 0, 0, 0, '2021-02-02 21:08:23'),
(1067, 139, 12705, 290, 0, 0, 17, '', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam8_boiler.pdf', '<p>Return Condensate to the Boiler</p>', 1, 0, 0, 0, '2021-02-02 21:08:23'),
(1068, 139, 12706, 290, 0, 0, 17, '', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam24_burners.pdf', '<p>Upgrade Boilers with Energy-Efficient Burners</p>', 1, 0, 0, 0, '2021-02-02 21:08:23'),
(1069, 139, 12707, 290, 0, 0, 17, '', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam3_recovery.pdf', '<p>Use Feedwater Economizers for Waste Heat Recovery</p>', 1, 0, 0, 0, '2021-02-02 21:08:23'),
(1070, 139, 12708, 290, 0, 0, 17, '', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam14_chillers.pdf', '<p>Use Low-Grade Waste Steam to Power Absorption Chillers</p>', 1, 0, 0, 0, '2021-02-02 21:08:23'),
(1071, 139, 12709, 290, 0, 0, 17, '', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam29_use_steam.pdf', '<p>Use Steam Jet Ejectors or Thermocompressors to Reduce Venting of Low-Pressure Steam</p>', 1, 0, 0, 0, '2021-02-02 21:08:23'),
(1072, 139, 12710, 290, 0, 0, 17, '', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam11_waste_steam.pdf', '<p>Use Vapor Recompression to Recover Low-Pressure Waste Steam</p>', 1, 0, 0, 0, '2021-02-02 21:08:23'),
(1073, 139, 12711, 290, 0, 0, 17, '', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam13_vent_condenser.pdf', '<p>Use a Vent Condenser to Recover Flash Steam Energy</p>', 1, 0, 0, 0, '2021-02-02 21:08:23'),
(1074, 139, 12712, 290, 0, 0, 24, 'See steam tip sheets', 'https://www.energy.gov/eere/amo/tip-sheets-system', '<p>U.S.DOE Energy Tip Sheets by System</p>', 1, 0, 0, 0, '2021-02-02 21:08:23'),
(1075, 140, 7805, 95, 0, 0, 15, 'Boiler Nameplate Data', '', '', 0, 0, 0, 0, '2020-12-18 18:40:35'),
(1076, 140, 7806, 95, 0, 1, 26, ' Rated Capacity (Steam Production, Maximum Fuel Input)', '', '', 0, 0, 1, 0, '2020-12-18 18:40:35'),
(1077, 140, 7807, 95, 0, 1, 26, 'Fan Horsepower', '', '', 0, 0, 1, 0, '2020-12-18 18:40:35'),
(1078, 140, 7808, 95, 0, 1, 26, 'Make, Model, Serial Number', '', '', 0, 0, 1, 0, '2020-12-18 18:40:35'),
(1079, 140, 7809, 95, 0, 0, 15, 'Combustion Analysis: ', '', '', 0, 0, 0, 0, '2020-12-18 18:40:35'),
(1080, 140, 7810, 95, 0, 1, 26, 'Stack Temperature', '', '', 0, 0, 1, 0, '2020-12-18 18:40:35'),
(1081, 140, 7811, 95, 0, 1, 26, 'Excess O2', '', '', 0, 0, 1, 0, '2020-12-18 18:40:35'),
(1082, 140, 7812, 95, 0, 1, 26, ' Inlet / Ambient Temperature ', '', '', 0, 0, 1, 0, '2020-12-18 18:40:35'),
(1083, 140, 7813, 95, 0, 0, 15, 'Capacity over time', '', '', 0, 0, 0, 0, '2020-12-18 18:40:35'),
(1084, 140, 7814, 95, 0, 1, 26, 'Hourly steam production', '', '', 0, 0, 1, 0, '2020-12-18 18:40:35'),
(1085, 140, 7815, 95, 0, 1, 26, 'Hourly energy use', '', '', 0, 0, 1, 0, '2020-12-18 18:40:35'),
(1086, 140, 7816, 95, 0, 1, 8, 'Sometimes capacity must be inferred from fan energy, and characteristic fan energy curves', '', '', 0, 0, 0, 0, '2020-12-18 18:40:35'),
(1087, 140, 7817, 95, 0, 0, 15, 'Fuel used', '', '', 0, 0, 1, 0, '2020-12-18 18:40:35'),
(1088, 141, 12479, 96, 0, 0, 27, 'Combustion Analyzer ', '', '', 0, 0, 0, 0, '2021-01-26 22:55:09'),
(1089, 141, 12480, 96, 0, 0, 27, '<p>Digital Contact or Infrared Thermometer</p>', '', '', 0, 0, 0, 0, '2021-01-26 22:55:09'),
(1090, 141, 12481, 96, 0, 0, 8, 'An IR camera can help identify hot spots to insulate', '', '', 0, 0, 0, 0, '2021-01-26 22:55:09'),
(1091, 142, 8083, 99, 0, 0, 22, 'An OSU EEC Google Slideshow', 'https://docs.google.com/presentation/d/1A-bLNUv7hCuBV2zMsS0A4JEKPNVxaKnIwUMoVZCFr2w/edit?usp=sharing', 'Steam Systems', 0, 0, 0, 0, '2020-12-19 19:21:00'),
(1092, 142, 8084, 99, 0, 0, 17, 'An OSU EEC Appendix in Microsoft Word Format', 'https://drive.google.com/file/d/1Jh6CaIDd6ugCo6FYqviyVK-O49ic_275/view?usp=sharing', 'Combustion Appendix', 0, 0, 0, 0, '2020-12-19 19:21:00'),
(1093, 143, 12457, 124, 0, 0, 17, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/05/f16/adjust_speed_pumping.pdf', '<p>Adjustable Speed Pumping Applications</p>', 1, 0, 0, 0, '2021-01-26 22:37:12'),
(1094, 143, 12458, 124, 0, 0, 17, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/05/f16/pumping1_conduct.pdf', '<p>Conduct an In-Plant Pumping System Survey</p>', 1, 0, 0, 0, '2021-01-26 22:37:12'),
(1095, 143, 12459, 124, 0, 0, 17, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/05/f16/centrifug_pumps_control.pdf', '<p>Control Strategies for Centrifugal Pumps with Variable Flow Rate Requirements</p>', 1, 0, 0, 0, '2021-01-26 22:37:12'),
(1096, 143, 12460, 124, 0, 0, 17, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/05/f16/control_valves_pumping_ts10.pdf', '<p>Energy Savings Opportunities in Control Valves&nbsp;</p>', 1, 0, 0, 0, '2021-01-26 22:37:12'),
(1097, 143, 12461, 124, 0, 0, 17, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/05/f16/maintain_pumping_systemsts5.pdf', '<p>Maintain Pumping Systems Effectively</p>', 1, 0, 0, 0, '2021-01-26 22:37:12'),
(1098, 143, 12462, 124, 0, 0, 17, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/05/f16/match_pumps_to_system.pdf', '<p>Match Pumps to System Requirements</p>', 1, 0, 0, 0, '2021-01-26 22:37:12'),
(1099, 143, 12463, 124, 0, 0, 17, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/05/f16/optimize_parallel_pumping.pdf', '<p>Optimize Parallel Pumping Systems&nbsp;</p>', 1, 0, 0, 0, '2021-01-26 22:37:12'),
(1100, 143, 12464, 124, 0, 0, 17, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/05/f16/pump_selection.pdf', '<p>Pump Selection Considerations</p>', 1, 0, 0, 0, '2021-01-26 22:37:12'),
(1101, 143, 12465, 124, 0, 0, 17, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/05/f16/reduce_pumping_costs.pdf', '<p>Reduce Pumping Costs through Optimum Pipe Sizing</p>', 1, 0, 0, 0, '2021-01-26 22:37:12'),
(1102, 143, 12466, 124, 0, 0, 17, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/05/f16/efficient_centrifug_pumps.pdf', '<p>Select an Energy-Efficient Centrifugal Pump</p>', 1, 0, 0, 0, '2021-01-26 22:37:12'),
(1103, 143, 12467, 124, 0, 0, 17, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/05/f16/test_pumping_system__pumping_systemts4.pdf', '<p>Test for Pumping System Efficiency</p>', 1, 0, 0, 0, '2021-01-26 22:37:12'),
(1104, 143, 12468, 124, 0, 0, 17, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/05/f16/trim_replace_impellers7.pdf', '<p>Trim or Replace Impellers on Oversized Pumps</p>', 1, 0, 0, 0, '2021-01-26 22:37:12'),
(1105, 144, 12747, 179, 0, 0, 15, 'Pump nameplate', '', '', 0, 0, 1, 0, '2021-02-03 22:47:47'),
(1106, 144, 12748, 179, 0, 0, 15, 'Motor nameplate', '', '', 0, 0, 1, 0, '2021-02-03 22:47:47'),
(1107, 144, 12749, 179, 0, 0, 15, 'Pump curve data', '', '', 0, 0, 1, 0, '2021-02-03 22:47:47'),
(1108, 144, 12750, 179, 0, 0, 15, 'Pump RPM', '', '', 0, 0, 1, 0, '2021-02-03 22:47:47'),
(1109, 144, 12751, 179, 0, 0, 15, 'Pump inlet and outlet diameter', '', '', 0, 0, 1, 0, '2021-02-03 22:47:47'),
(1110, 144, 12752, 179, 0, 0, 15, 'Pump type', '', '', 0, 0, 1, 0, '2021-02-03 22:47:47'),
(1111, 144, 12753, 179, 0, 0, 15, 'Simultaneous live amperage or power, flow rate, and inlet &amp; outlet operating pressure (system head)', '', '', 0, 0, 1, 0, '2021-02-03 22:47:47'),
(1112, 145, 12756, 125, 0, 0, 32, '', '/uploads/user_55/215ed3c31cbc4dec9d0ffcdc21ee5a39.jpg', 'Sample Pump Curve', 0, 0, 0, 0, '2021-02-03 22:49:07'),
(1113, 145, 12757, 125, 0, 0, 32, '', '/uploads/user_55/83a92c72662cbec1f08d0c7686c6af33.jpg', 'Sample Pump Nameplate', 0, 0, 0, 0, '2021-02-03 22:49:07'),
(1114, 146, 12758, 183, 0, 0, 20, '', '/uploads/user_51/b3eaaad1e725ebf461f901a693ec6753.jpg', '<p>Pump Impeller and Body With Cavitation Marks</p>', 0, 0, 0, 0, '2021-02-03 22:49:43'),
(1115, 146, 12759, 183, 0, 0, 20, '', '/uploads/user_51/8f6ed30ce2cbd75b6d40f99b796cd6c2.jpg', '<p>Centrifugal Pump</p>', 0, 0, 0, 0, '2021-02-03 22:49:43'),
(1116, 146, 12760, 183, 0, 0, 20, '', '/uploads/user_51/7f680841f445d41826bd3285a8e05234.jpg', '<p>Centrifugal (Vertical Turbine) Pump</p>', 0, 0, 0, 0, '2021-02-03 22:49:43'),
(1117, 147, 12451, 288, 0, 0, 24, '<p></p>', 'https://www.dxpe.com/different-types-centrifugal-pumps-applications/', '<p>Different Types of Centrifugal Pumps and Their Applications</p>', 1, 0, 0, 0, '2021-01-26 22:29:04'),
(1118, 147, 12452, 288, 0, 0, 24, '<p></p>', 'https://www.aquaculturealliance.org/advocate/cavitation-the-pump-disease/', '<p>Cavitation, the ‘pump disease</p><p><br></p>', 1, 0, 0, 0, '2021-01-26 22:29:04'),
(1119, 147, 12453, 288, 0, 0, 24, '<p></p>', 'https://www.deppmann.com/blog/service-tip-of-the-month/pump-cavitation/', '<p>Pump Cavitation</p><p><br></p>', 1, 0, 0, 0, '2021-01-26 22:29:04'),
(1120, 147, 12454, 288, 0, 0, 17, '<p>IAC University Guide:</p>', 'https://iac.university/technicalDocs/industr/ch6.pdf', '<p> PRIMEMOVERS OF ENERGY: PUMPS</p>', 1, 0, 0, 0, '2021-01-26 22:29:04'),
(1121, 147, 12455, 288, 0, 0, 17, '<p></p>', 'https://www.unido.org/sites/default/files/2017-11/PSO-Manual-PRINT-FINAL-20161109-One-Page.pdf', '<p>Manual for Industrial Pump Systems Assessment and Optimization</p>', 1, 0, 0, 0, '2021-01-26 22:29:04'),
(1122, 147, 12456, 288, 0, 0, 17, '<p>BC Hydro Document </p>', 'https://www.bchydro.com/content/dam/BCHydro/customer-portal/documents/power-smart/alliance/programs/industrial-basics-of-industrial-pumps-for-small-pump-program.pdf', '<p>Basics Of Industrial Pumps For Small Pump&nbsp;</p>', 1, 0, 0, 0, '2021-01-26 22:29:04'),
(1123, 148, 12446, 289, 0, 0, 22, '<p></p>', 'https://docs.google.com/presentation/d/11sXImoslkAlPdYkWdo9k30ZGqip8-wWytO7_oLm4y7E/edit#slide=id.p8', '<p>Pumps - a slideshow</p>', 0, 0, 0, 0, '2021-01-26 22:23:41'),
(1124, 149, 12822, 82, 0, 0, 31, 'One of the most common and inefficient methods to control a centrifugal pump is to restrict its flow. As the pressure is increased the flow is reduced. However, work required to deliver the reduced flow is greater than would otherwise be required.', '', '', 0, 0, 0, 0, '2021-02-03 23:08:09'),
(1125, 149, 12823, 82, 0, 0, 8, 'If pump is oversized and flow is constantly at a reduced level see recommendations improving pump efficiency by using an optimally sized pump.', '', '', 0, 0, 0, 0, '2021-02-03 23:08:09'),
(1126, 149, 12824, 82, 0, 0, 11, 'Replace Valve Control with Variable Speed Drive Control', '', '', 0, 0, 0, 0, '2021-02-03 23:08:09'),
(1127, 149, 12825, 82, 0, 1, 31, 'Pumps are often designed to operate at specific conditions, installing a Variable Speed Drive can allow the pump to supply a wider range of flows while remaining near it\'s best efficiency point', '%zXz%', '%zXz%', 0, 0, 0, 0, '2021-02-03 23:08:09'),
(1128, 149, 12826, 82, 0, 1, 10, 'Pumps throttled or supplying excess fluid to a process', '', '', 0, 0, 0, 0, '2021-02-03 23:08:09'),
(1129, 149, 12827, 82, 0, 1, 8, 'Pumps operating over a range of flow conditions may be particularly suited for VFD control', '', '', 0, 0, 0, 0, '2021-02-03 23:08:09'),
(1130, 149, 12828, 82, 0, 1, 14, 'Would a resized pump or impeller trim be more suitable for the application?', '', '', 0, 0, 0, 0, '2021-02-03 23:08:09'),
(1131, 149, 12829, 82, 0, 1, 1, 'Allows efficient operation over wider range of flow conditions', '', '', 0, 0, 0, 0, '2021-02-03 23:08:09'),
(1132, 149, 12830, 82, 0, 1, 2, 'VFDs are expensive - becoming more affordable in recent years', '', '', 0, 0, 0, 0, '2021-02-03 23:08:09'),
(1133, 149, 12831, 82, 0, 1, 4, 'Networks with multiple pumps operating in parallel or series need to be carefully considered before recommending VFD control', '', '', 0, 0, 0, 0, '2021-02-03 23:08:09'),
(1134, 149, 12832, 82, 0, 1, 4, 'For high static head conditions (pumping to high pressure vessel or high elevation tank) take care in evaluating pump operation with VFD control.  Pumps can be forced into low efficiency, high wear conditions with inappropriate high static head VFD control.', '', '', 1, 0, 0, 0, '2021-02-03 23:08:09'),
(1135, 149, 12833, 82, 0, 1, 4, 'VFDs can harm the motor if they are not properly installed', '', '', 0, 0, 0, 0, '2021-02-03 23:08:09'),
(1136, 149, 12834, 82, 0, 1, 7, 'Install grounding shaft to divert VFD induced voltages away from the motor', '', '', 0, 0, 0, 0, '2021-02-03 23:08:09'),
(1137, 149, 12835, 82, 0, 1, 15, 'Pump nameplate/motor nameplate', '', '', 0, 0, 0, 0, '2021-02-03 23:08:09'),
(1138, 149, 12836, 82, 0, 1, 15, 'Flow rates, pressure readings, live amperage data', '', '', 0, 0, 0, 0, '2021-02-03 23:08:09'),
(1139, 149, 12837, 82, 0, 1, 17, 'An OSU EEC Analysis Template in Microsoft Excel Format', 'https://oregonstate.app.box.com/file/606303033065', 'Analysis Template: Install VFDs on Process Pumps', 2, 0, 0, 0, '2021-02-03 23:08:09'),
(1140, 149, 12838, 82, 0, 0, 11, 'Eliminate Bypass Control', '', '', 0, 0, 0, 0, '2021-02-03 23:08:09'),
(1141, 149, 12839, 82, 0, 1, 31, 'Bypass controls can be an extremely inefficient method for controlling flow. In the best case, pump energy use is constant regardless of required flow. In the worst case, energy used increases with reduced flow. In this case a reduction in flow requires more energy to recirculate the diverted fluid and does not add any value to the finished product. ', '', '', 0, 0, 0, 0, '2021-02-03 23:08:09'),
(1142, 149, 12840, 82, 0, 0, 11, 'Replace On/Off Control with Continuous Flow Control When Appropriate', '', '', 0, 0, 0, 0, '2021-02-03 23:08:09'),
(1143, 149, 12841, 82, 0, 1, 31, 'For a set total volume of liquid to move, On/Off control results in higher velocity, flow rate, and friction loss to overcome than delivering the same volume over a longer period of time at a slower velocity and flow rate. ', '', '', 0, 0, 0, 0, '2021-02-03 23:08:09'),
(1144, 150, 12858, 83, 0, 0, 11, 'Eliminate \"Overflow Control\" on Tanks', '', '', 0, 0, 0, 0, '2021-02-03 23:21:16'),
(1145, 150, 12859, 83, 0, 1, 31, '\"Overflow Control\" refers to systems designed with a pump that operates continuously  to fill a vessel and then keeps operating when full, allowing excess fill to spill out as overflow. Energy to move this excess fluid is lost. ', '', '', 0, 0, 0, 0, '2021-02-03 23:21:16'),
(1146, 150, 12860, 83, 0, 0, 11, 'Look for Opportunity to Reduced Defined Flow Requirements ', '', '', 0, 0, 0, 0, '2021-02-03 23:21:16'),
(1147, 150, 12861, 83, 0, 1, 31, ' If flow that must be developed by a pump can be reduced, energy can be saved. For example: cooling water flows can exceed that needed by the end uses. Pumps can instead be controlled to maintain a set temperature increase or return temperature on the cooling water.', '', '', 0, 0, 0, 0, '2021-02-03 23:21:16'),
(1148, 151, 12867, 84, 0, 0, 11, 'Reduce Line Losses (Larger Diameter Pipes, etc)', '', '', 0, 0, 0, 0, '2021-02-03 23:38:18'),
(1149, 151, 12868, 84, 0, 1, 31, 'The work a pump must perform increases with line losses. Clearing obstructions, using larger diameter lines and fittings, and using parallel lines when available can reduce the head loss the pump must overcome.', '', '', 0, 0, 0, 0, '2021-02-03 23:38:18'),
(1150, 151, 12869, 84, 0, 0, 11, 'Use \"Least Closed Valve\" Strategy on Pumping Networks Serving Multiple End Points.', '', '', 0, 0, 0, 0, '2021-02-03 23:38:18'),
(1151, 151, 12870, 84, 0, 1, 31, 'If a pumping network serves multiple end uses, for the lowest required pumping pressure and energy, at least one end use should not require a valve to reduce pressure to target levels for the end use. This can require specialized control if target end use pressures vary.', '', '', 0, 0, 0, 0, '2021-02-03 23:38:18'),
(1152, 151, 12871, 84, 0, 0, 11, 'Eliminate or Reduce Fluid \"Free Fall\" at Discharge Point.', '', '', 0, 0, 0, 0, '2021-02-03 23:38:18'),
(1153, 151, 12872, 84, 0, 1, 31, '\"Free Fall\" distance at a discharge point represents additional head that the pumping system must provide. If a \"down tube\" is added to the discharge, the siphon effect will reduce head required.', '', '', 0, 0, 0, 0, '2021-02-03 23:38:18'),
(1154, 151, 12873, 84, 0, 1, 4, 'Take care to ensure that the siphon effect will not induce flow when not desired: for instance emptying a tank when not intended. ', '', '', 0, 0, 0, 0, '2021-02-03 23:38:18'),
(1155, 151, 12874, 84, 0, 0, 11, 'Look for Opportunity to Reduced Defined Pressure Requirements ', '', '', 0, 0, 0, 0, '2021-02-03 23:38:18'),
(1156, 151, 12875, 84, 0, 1, 31, 'If pressure that must be developed by a pump can be reduced, energy can be saved. For example pumps often deliver flow to an end point at a pressure that must be reduced with a valve to a maximum pressure for the application.', '', '', 0, 0, 0, 0, '2021-02-03 23:38:18'),
(1157, 152, 12895, 85, 0, 0, 31, 'Pump efficiency is very dependent upon flow and pressure, and the pump\'s operating characteristics. For a particular pump at a given rpm there is one optimal operating point of flow and pressure. As the pressure changes, flow changes and operating efficiency is also affected. If system conditions have changed since the initial selection of the pump, it may be operating at a particularly inefficient operating point.  If flow requirements are significantly reduced after selection,  the resulting oversized pump often works continuously against a throttle causing even greater inefficiencies.', '', '', 0, 0, 0, 0, '2021-02-03 23:47:27'),
(1158, 152, 12896, 85, 0, 0, 8, 'If a pump is oversized to handle variable flow requirements then see the recommendation for more efficient controls', '', '', 0, 0, 0, 0, '2021-02-03 23:47:27'),
(1159, 152, 12897, 85, 0, 0, 11, 'Trim Pump Impeller for Better Efficiency at Typical Operating Points', '', '', 0, 0, 0, 0, '2021-02-03 23:47:27'),
(1160, 152, 12898, 85, 0, 0, 31, 'A pump\'s operating characteristics can be adjusted by re-sizing the impeller. On a given system, it may be possible to achieve greater efficiency with a different pump impeller.', '', '', 0, 0, 0, 0, '2021-02-03 23:47:27'),
(1161, 152, 12899, 85, 0, 0, 11, 'Replace Pump with One Selected for Optimum Efficiency at Typical Operating Points', '', '', 0, 0, 0, 0, '2021-02-03 23:47:27'),
(1162, 152, 12900, 85, 0, 1, 10, 'Older pumps that have not been adjusted or calibrated to fit existing demand.', '', '', 0, 0, 0, 0, '2021-02-03 23:47:27'),
(1163, 152, 12901, 85, 0, 1, 15, 'Pressure across the pump', '', '', 0, 0, 0, 0, '2021-02-03 23:47:27'),
(1164, 152, 12902, 85, 0, 1, 15, 'Fluid flow rate', '', '', 0, 0, 0, 0, '2021-02-03 23:47:27'),
(1165, 152, 12903, 85, 0, 1, 15, 'Operating hours', '', '', 0, 0, 0, 0, '2021-02-03 23:47:27'),
(1166, 152, 12904, 85, 0, 1, 15, 'Pump curve and nameplate', '', '', 0, 0, 0, 0, '2021-02-03 23:47:27'),
(1167, 152, 12905, 85, 0, 1, 15, 'Elevation change', '', '', 0, 0, 0, 0, '2021-02-03 23:47:27'),
(1168, 152, 12906, 85, 0, 1, 15, 'Type of fluid', '', '', 0, 0, 0, 0, '2021-02-03 23:47:27'),
(1169, 152, 12907, 85, 0, 1, 27, 'Power Quality Analyzer (PQA)', '', '', 0, 0, 0, 0, '2021-02-03 23:47:27'),
(1170, 152, 12908, 85, 0, 1, 27, 'Ultrasonic flow meter', '', '', 0, 0, 0, 0, '2021-02-03 23:47:27'),
(1171, 152, 12909, 85, 0, 1, 8, 'Try to find nearby pressure gauges to estimate pressure change across the pump.', '', '', 0, 0, 0, 0, '2021-02-03 23:47:27'),
(1172, 152, 12910, 85, 0, 1, 8, 'Pick a pump based on its best efficiency point matching current operating conditions.', '', '', 0, 0, 0, 0, '2021-02-03 23:47:27'),
(1173, 152, 12911, 85, 0, 1, 14, 'Would installing a variable frequency drive (VFD), trimming the impeller, replacing the motor, or using a belt sheave be a better option?', '', '', 0, 0, 0, 0, '2021-02-03 23:47:27'),
(1174, 152, 12912, 85, 0, 1, 4, 'When modifying or replacing pumps and fans, or adjusting their rpm, be sure that they can operate under all conditions anticipated for the given system. System pressure or head should not exceed the maximum pressure or head the fan or pump can sustain. Surge points should be avoided.', '', '', 0, 0, 0, 0, '2021-02-03 23:47:27'),
(1175, 152, 12913, 85, 0, 0, 11, 'Replace or Overhaul Worn or Damaged Pumps', '', '', 0, 0, 0, 0, '2021-02-03 23:47:27'),
(1176, 152, 12914, 85, 0, 1, 31, 'All pumps experience wear over time. This can result in reduced efficiency. If a pump ever operates in a cavitation condition, for example if its inlet gets blocked, it can experience significant damage and a great reduction in efficiency. Monitoring pump performance over time, and periodically checking efficiency can identify these conditions. ', '', '', 0, 0, 0, 0, '2021-02-03 23:47:27'),
(1177, 153, 12915, 288, 0, 0, 24, '', 'https://www.dxpe.com/different-types-centrifugal-pumps-applications/', '<p>Different Types of Centrifugal Pumps and Their Applications</p>', 1, 0, 0, 0, '2021-02-03 23:49:17'),
(1178, 153, 12916, 288, 0, 0, 24, '', 'https://www.aquaculturealliance.org/advocate/cavitation-the-pump-disease/', '<p>Cavitation, the ‘pump disease</p><p><br></p>', 1, 0, 0, 0, '2021-02-03 23:49:17'),
(1179, 153, 12917, 288, 0, 0, 24, '', 'https://www.deppmann.com/blog/service-tip-of-the-month/pump-cavitation/', '<p>Pump Cavitation</p><p><br></p>', 1, 0, 0, 0, '2021-02-03 23:49:17'),
(1180, 153, 12918, 288, 0, 0, 17, 'IAC University Guide:', 'https://iac.university/technicalDocs/industr/ch6.pdf', '<p> PRIMEMOVERS OF ENERGY: PUMPS</p>', 1, 0, 0, 0, '2021-02-03 23:49:17'),
(1181, 153, 12919, 288, 0, 0, 17, '', 'https://www.unido.org/sites/default/files/2017-11/PSO-Manual-PRINT-FINAL-20161109-One-Page.pdf', '<p>Manual for Industrial Pump Systems Assessment and Optimization</p>', 1, 0, 0, 0, '2021-02-03 23:49:17'),
(1182, 153, 12920, 288, 0, 0, 17, 'BC Hydro Document ', 'https://www.bchydro.com/content/dam/BCHydro/customer-portal/documents/power-smart/alliance/programs/industrial-basics-of-industrial-pumps-for-small-pump-program.pdf', '<p>Basics Of Industrial Pumps For Small Pump&nbsp;</p>', 1, 0, 0, 0, '2021-02-03 23:49:17'),
(1183, 154, 12921, 85, 0, 0, 31, 'Pump efficiency is very dependent upon flow and pressure, and the pump\'s operating characteristics. For a particular pump at a given rpm there is one optimal operating point of flow and pressure. As the pressure changes, flow changes and operating efficiency is also affected. If system conditions have changed since the initial selection of the pump, it may be operating at a particularly inefficient operating point.  If flow requirements are significantly reduced after selection,  the resulting oversized pump often works continuously against a throttle causing even greater inefficiencies.', '', '', 0, 0, 0, 0, '2021-02-03 23:50:01'),
(1184, 154, 12922, 85, 0, 0, 8, 'If a pump is oversized to handle variable flow requirements then see the recommendation for more efficient controls', '', '', 0, 0, 0, 0, '2021-02-03 23:50:01'),
(1185, 154, 12923, 85, 0, 0, 11, 'Trim Pump Impeller for Better Efficiency at Typical Operating Points', '', '', 0, 0, 0, 0, '2021-02-03 23:50:01'),
(1186, 154, 12924, 85, 0, 0, 31, 'A pump\'s operating characteristics can be adjusted by re-sizing the impeller. On a given system, it may be possible to achieve greater efficiency with a different pump impeller.', '', '', 0, 0, 0, 0, '2021-02-03 23:50:01'),
(1187, 154, 12925, 85, 0, 0, 11, 'Replace Pump with One Selected for Optimum Efficiency at Typical Operating Points', '', '', 0, 0, 0, 0, '2021-02-03 23:50:01'),
(1188, 154, 12926, 85, 0, 1, 10, 'Older pumps that have not been adjusted or calibrated to fit existing demand.', '', '', 0, 0, 0, 0, '2021-02-03 23:50:01'),
(1189, 154, 12927, 85, 0, 1, 15, 'Pressure across the pump', '', '', 0, 0, 1, 0, '2021-02-03 23:50:01'),
(1190, 154, 12928, 85, 0, 1, 15, 'Fluid flow rate', '', '', 0, 0, 1, 0, '2021-02-03 23:50:01'),
(1191, 154, 12929, 85, 0, 1, 15, 'Operating hours', '', '', 0, 0, 1, 0, '2021-02-03 23:50:01'),
(1192, 154, 12930, 85, 0, 1, 15, 'Pump curve and nameplate', '', '', 0, 0, 1, 0, '2021-02-03 23:50:01'),
(1193, 154, 12931, 85, 0, 1, 15, 'Elevation change', '', '', 0, 0, 1, 0, '2021-02-03 23:50:01'),
(1194, 154, 12932, 85, 0, 1, 15, 'Type of fluid', '', '', 0, 0, 1, 0, '2021-02-03 23:50:01'),
(1195, 154, 12933, 85, 0, 1, 27, 'Power Quality Analyzer (PQA)', '', '', 0, 0, 0, 0, '2021-02-03 23:50:01'),
(1196, 154, 12934, 85, 0, 1, 27, 'Ultrasonic flow meter', '', '', 0, 0, 0, 0, '2021-02-03 23:50:01'),
(1197, 154, 12935, 85, 0, 1, 8, 'Try to find nearby pressure gauges to estimate pressure change across the pump.', '', '', 0, 0, 0, 0, '2021-02-03 23:50:01'),
(1198, 154, 12936, 85, 0, 1, 8, 'Pick a pump based on its best efficiency point matching current operating conditions.', '', '', 0, 0, 0, 0, '2021-02-03 23:50:01'),
(1199, 154, 12937, 85, 0, 1, 14, 'Would installing a variable frequency drive (VFD), trimming the impeller, replacing the motor, or using a belt sheave be a better option?', '', '', 0, 0, 0, 0, '2021-02-03 23:50:01'),
(1200, 154, 12938, 85, 0, 1, 4, 'When modifying or replacing pumps and fans, or adjusting their rpm, be sure that they can operate under all conditions anticipated for the given system. System pressure or head should not exceed the maximum pressure or head the fan or pump can sustain. Surge points should be avoided.', '', '', 0, 0, 0, 0, '2021-02-03 23:50:01'),
(1201, 154, 12939, 85, 0, 0, 11, 'Replace or Overhaul Worn or Damaged Pumps', '', '', 0, 0, 0, 0, '2021-02-03 23:50:01'),
(1202, 154, 12940, 85, 0, 1, 31, 'All pumps experience wear over time. This can result in reduced efficiency. If a pump ever operates in a cavitation condition, for example if its inlet gets blocked, it can experience significant damage and a great reduction in efficiency. Monitoring pump performance over time, and periodically checking efficiency can identify these conditions. ', '', '', 0, 0, 0, 0, '2021-02-03 23:50:01'),
(1203, 155, 12957, 108, 0, 0, 3, '1 HP = 0.746 kW', '', '', 0, 0, 0, 0, '2021-02-03 23:56:17'),
(1204, 155, 12958, 108, 0, 0, 3, 'Cost to operate a motor at 75% load for a full year = $60/HP (Assumes $0.05/kWh)', '', '', 0, 1, 0, 0, '2021-02-03 23:56:17'),
(1205, 155, 12959, 108, 0, 0, 3, 'Estimate 1.2 Full Load Amps per horsepower for motors on 460 Volt systems (2.4 amps per horsepower on 230 volt systems)', '', '', 0, 0, 0, 0, '2021-02-03 23:56:17'),
(1206, 156, 12965, 109, 0, 0, 8, 'For AC induction/asynchronous motors \"slip\" offers one way to estimate motor load if amps or power are not obtainable. For example if a nominal 1800 RPM motor nameplate lists an RPM of 1750 (for full load), the actual reduction in RPM with load is linear with the % of full load. For example If you use a strobe to measure an RPM of 1775 RPM, then the motor load factor is 50% .', '', '', 0, 0, 0, 0, '2021-02-04 00:03:10'),
(1207, 157, 12297, 110, 0, 0, 7, '<p>Serve high operating hour, high horsepower loads with premium efficiency motors.</p>', '', '', 0, 0, 0, 0, '2021-01-26 20:12:07'),
(1208, 158, 13093, 112, 0, 0, 32, '', '/uploads/user_51/f31fecd9ff9993ef2850535efecca34a.png', '<p><br></p>', 0, 0, 0, 0, '2021-02-04 00:14:42'),
(1209, 158, 13094, 112, 0, 0, 12, 'Collect Motor Inventory', '', '', 0, 0, 0, 0, '2021-02-04 00:14:42'),
(1210, 158, 13095, 112, 0, 1, 15, 'Motor Identification', '', '', 0, 0, 0, 0, '2021-02-04 00:14:42'),
(1211, 158, 13096, 112, 0, 2, 26, 'Motor ID', '', '', 0, 0, 1, 0, '2021-02-04 00:14:42'),
(1212, 158, 13097, 112, 0, 2, 26, 'Location', '', '', 0, 0, 1, 0, '2021-02-04 00:14:42'),
(1213, 158, 13098, 112, 0, 2, 26, 'Application', '', '', 0, 0, 1, 0, '2021-02-04 00:14:42'),
(1214, 158, 13099, 112, 0, 1, 15, 'Nameplate Data ', '', '', 0, 0, 0, 0, '2021-02-04 00:14:42'),
(1215, 158, 13100, 112, 0, 2, 26, 'Horsepower', '', '', 0, 0, 1, 0, '2021-02-04 00:14:42'),
(1216, 158, 13101, 112, 0, 2, 26, 'Full Load Amps', '', '', 0, 0, 1, 0, '2021-02-04 00:14:42'),
(1217, 158, 13102, 112, 0, 2, 26, 'Se<s>﻿</s>rvice Factor', '', '', 0, 0, 1, 0, '2021-02-04 00:14:42'),
(1218, 158, 13103, 112, 0, 2, 26, 'RPM', '', '', 0, 0, 1, 0, '2021-02-04 00:14:42'),
(1219, 158, 13104, 112, 0, 2, 26, 'Efficiency - if available', '', '', 0, 0, 1, 0, '2021-02-04 00:14:42'),
(1220, 158, 13105, 112, 0, 2, 26, 'Motor Type', '', '', 0, 0, 1, 0, '2021-02-04 00:14:42'),
(1221, 158, 13106, 112, 0, 2, 26, '(Any additional data on nameplate)', '', '', 0, 0, 1, 0, '2021-02-04 00:14:42'),
(1222, 158, 13107, 112, 0, 2, 8, 'A photo is an ideal way to capture all nameplate data', '', '', 0, 0, 1, 0, '2021-02-04 00:14:42'),
(1223, 158, 13108, 112, 0, 1, 15, 'Operating hours', '', '', 0, 0, 0, 0, '2021-02-04 00:14:42'),
(1224, 158, 13109, 112, 0, 1, 15, 'Use Factor (% of time on during operation hours)', '', '', 0, 0, 0, 0, '2021-02-04 00:14:42'),
(1225, 158, 13110, 112, 0, 1, 15, 'Load Factor (% of full load)', '', '', 0, 0, 0, 0, '2021-02-04 00:14:42'),
(1226, 158, 13111, 112, 0, 1, 15, 'Drive Type', '', '', 0, 0, 0, 0, '2021-02-04 00:14:42'),
(1227, 158, 13112, 112, 0, 1, 15, 'Controls', '', '', 0, 0, 0, 0, '2021-02-04 00:14:42'),
(1228, 159, 12203, 113, 0, 0, 27, 'Power Quality Analyzer ', '', '', 0, 0, 0, 0, '2021-01-26 19:50:58'),
(1229, 159, 12204, 113, 0, 0, 27, '<p>Strobe (optional: to measure slip)</p>', '', '', 0, 0, 0, 0, '2021-01-26 19:50:58'),
(1230, 160, 1652, 114, 0, 0, 17, 'An OSU EEC Data Collection Sheet in Microsoft Excel Format', 'https://drive.google.com/file/d/1PptW62lQbbN71Miefkx1I960UwnVHFA4/view?usp=sharing', 'Motor Data Collection Sheet', 0, 0, 0, 0, '2020-07-02 23:29:16'),
(1231, 161, 2005, 115, 0, 0, 21, 'An OSU EEC analysis tool in microsoft excel format used to calculate power from measured amperage and voltage.', 'https://drive.google.com/file/d/1xJMeEKUM93lyxace7UUiIH_BdKf44Dxe/view?usp=sharing', 'Motor Analysis Tool (MAT)', 0, 0, 0, 0, '2020-07-03 03:38:14'),
(1232, 161, 2006, 115, 0, 0, 21, 'An OSU EEC analysis tool in microsoft excel format used to calculate power from logged amperage data.', 'https://drive.google.com/file/d/1NMKuuxdUv9nNvFXOpR_tmd_-Yw6XUbpW/view?usp=sharing', 'Motor Analysis Tool (MAT) for Dataloggers', 0, 0, 0, 0, '2020-07-03 03:38:14'),
(1233, 162, 12323, 117, 0, 0, 24, 'External Website with Industrial Motor Articles', 'https://www.plantservices.com/category/motors_drives_power_trans', 'Plant Services: Industrial Motors', 1, 0, 0, 0, '2021-01-26 20:42:47'),
(1234, 162, 12324, 117, 0, 0, 24, 'EASA Accreditation Auditor', 'https://www.greenmotors.org/', 'Green Motors Practices Group', 1, 0, 0, 0, '2021-01-26 20:42:47'),
(1235, 163, 12306, 287, 0, 0, 24, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/04/f15/whentopurchase_nema_motor_systemts1.pdf', '<p>When to Purchase Premium Efficiency Motors</p>', 1, 0, 0, 0, '2021-01-26 20:39:06'),
(1236, 163, 12307, 287, 0, 0, 24, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/04/f15/estimate_motor_efficiency_motor_systemts2.pdf', '<p>Estimating Motor Efficiency in the Field</p>', 1, 0, 0, 0, '2021-01-26 20:39:06'),
(1237, 163, 12308, 287, 0, 0, 24, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/04/f15/extend_motor_operlife_motor_systemts3.pdf', '<p>Extend the Operating Life of Your Motor</p>', 1, 0, 0, 0, '2021-01-26 20:39:06'),
(1238, 163, 12309, 287, 0, 0, 24, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/04/f15/importance_motor_shaft_motor_systemts4.pdf', '<p>The Importance of Motor Shaft Alignment</p><p><br></p>', 1, 0, 0, 0, '2021-01-26 20:39:06'),
(1239, 163, 12310, 287, 0, 0, 24, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/04/f15/avoid_nuisance_motorsys_ts6.pdf', '<p>Avoid Nuisance Tripping with Premium Efficiency Motors</p>', 1, 0, 0, 0, '2021-01-26 20:39:06'),
(1240, 163, 12311, 287, 0, 0, 24, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/04/f15/eliminate_voltage_unbalanced_motor_systemts7.pdf', '<p>Eliminate Voltage Unbalance&nbsp;</p>', 1, 0, 0, 0, '2021-01-26 20:39:06'),
(1241, 163, 12312, 287, 0, 0, 24, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/04/f15/motor_tip_sheet8.pdf', '<p>Eliminate Excessive In-Plant Distribution System Voltage Drops</p>', 1, 0, 0, 0, '2021-01-26 20:39:06'),
(1242, 163, 12313, 287, 0, 0, 24, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/04/f15/motor_tip_sheet9.pdf', '<p>Improve Motor Operation at Off-Design Voltages</p>', 1, 0, 0, 0, '2021-01-26 20:39:06'),
(1243, 163, 12314, 287, 0, 0, 24, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/04/f15/motor_tip_sheet10.pdf', '<p>Turn Motors Off When Not in Use&nbsp;</p>', 1, 0, 0, 0, '2021-01-26 20:39:06'),
(1244, 163, 12315, 287, 0, 0, 24, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/04/f15/motor_tip_sheet11.pdf', '<p>Adjustable Speed Drive Part-Load Efficiency</p>', 1, 0, 0, 0, '2021-01-26 20:39:06'),
(1245, 163, 12316, 287, 0, 0, 24, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/04/f15/motor_tip_sheet12.pdf', '<p>Is It Cost-Effective to Replace Old Eddy-Current Drives?</p>', 1, 0, 0, 0, '2021-01-26 20:39:06'),
(1246, 163, 12317, 287, 0, 0, 24, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/04/f15/motor_tip_sheet13.pdf', '<p>Magnetically Coupled Adjustable Speed Motor Drives</p>', 1, 0, 0, 0, '2021-01-26 20:39:06'),
(1247, 163, 12318, 287, 0, 0, 24, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/04/f15/motor_tip_sheet14.pdf', '<p>When Should Inverter-Duty Motors Be Specified?</p>', 1, 0, 0, 0, '2021-01-26 20:39:06'),
(1248, 163, 12319, 287, 0, 0, 24, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/04/f15/motor_tip_sheet15.pdf', '<p>Minimize Adverse Motor and Adjustable Speed Drive Interactions</p>', 1, 0, 0, 0, '2021-01-26 20:39:06'),
(1249, 164, 13147, 107, 0, 0, 11, 'Replace standard efficiency motors with NEMA premium efficiency motors', '', '', 0, 0, 0, 0, '2021-02-04 00:25:40'),
(1250, 164, 13148, 107, 0, 1, 10, 'Standard efficiency motors used in high energy consumer applications ', '', '', 0, 0, 0, 0, '2021-02-04 00:25:40'),
(1251, 164, 13149, 107, 0, 0, 11, 'Replace oversized motors', '', '', 0, 0, 0, 0, '2021-02-04 00:25:40'),
(1252, 164, 13150, 107, 0, 1, 31, 'It is common for a facility to choose an oversized motor as a conservative measure. Motors consume the least amount of energy when they operate at their highest efficiency. For most motors, this is from 75% to 110% of their rated load. As motor loading drops below 50%, the efficiency and power factor drops rapidly. ', '', '', 0, 0, 0, 0, '2021-02-04 00:25:40'),
(1253, 164, 13151, 107, 0, 1, 10, 'Motor consistently operating at less than half of full load', '', '', 0, 0, 0, 0, '2021-02-04 00:25:40'),
(1254, 164, 13152, 107, 0, 1, 15, 'Power measurements (kW) to determine motor loading is preferred over amperage reading because they take into account the changes in power factor and amperage that occur as the motor loading changes', '', '', 0, 0, 0, 0, '2021-02-04 00:25:40'),
(1255, 164, 13153, 107, 0, 0, 11, 'Replace Standard V-Belts with Notched V-Belts', '', '', 0, 0, 0, 0, '2021-02-04 00:25:40'),
(1256, 164, 13154, 107, 0, 1, 31, 'Notched V-belts have grooves perpendicular to the length of the belt to reduce bending resistance. ', '%zXz%', '%zXz%', 0, 0, 0, 0, '2021-02-04 00:25:40'),
(1257, 164, 13155, 107, 0, 1, 10, 'Numerous belt-driven motors are used throughout a facility ', '', '', 0, 0, 0, 0, '2021-02-04 00:25:40'),
(1258, 164, 13156, 107, 0, 1, 3, 'Notched V-belts are approximately 2% more efficient than standard belts. The OSU EEC uses 1.5% as a conservative estimate.', '', '', 0, 0, 0, 0, '2021-02-04 00:25:40'),
(1259, 164, 13157, 107, 0, 1, 14, 'Are V-belts or synchronous belts more suited to the application?', '', '', 0, 0, 0, 0, '2021-02-04 00:25:40'),
(1260, 164, 13158, 107, 0, 1, 1, 'Run cooler, last longer, and are more efficient than standard V-belts', '', '', 0, 0, 0, 0, '2021-02-04 00:25:40'),
(1261, 164, 13159, 107, 0, 1, 1, 'Don\'t require retrofits if standard V-belts are already used', '', '', 0, 0, 0, 0, '2021-02-04 00:25:40'),
(1262, 164, 13160, 107, 0, 1, 1, 'More suitable than synchronous drives if vibrational damping is needed or the application causes sudden torque changes', '', '', 0, 0, 0, 0, '2021-02-04 00:25:40'),
(1263, 164, 13161, 107, 0, 1, 2, 'Sharp efficiency reduction at high torque due to increased slippage', '', '', 0, 0, 0, 0, '2021-02-04 00:25:40'),
(1264, 164, 13162, 107, 0, 1, 2, 'Like standard V-belts, notched belts degrade in efficiency over time if not properly maintained', '', '', 0, 0, 0, 0, '2021-02-04 00:25:40'),
(1265, 164, 13163, 107, 0, 1, 2, 'V-belts may perform worse in dirty environments than synchronous belts', '', '', 0, 0, 0, 0, '2021-02-04 00:25:40'),
(1266, 164, 13164, 107, 0, 1, 12, 'Incrementally install notched V-belts as old belts are replaced.', '', '', 0, 0, 0, 0, '2021-02-04 00:25:40'),
(1267, 164, 13165, 107, 0, 1, 7, 'Regular scheduled maintenance and re-tensioning ', '', '', 0, 0, 0, 0, '2021-02-04 00:25:40'),
(1268, 164, 13166, 107, 0, 1, 20, '', 'https://drive.google.com/file/d/1uk3x2VpKQ9FrRUOvU4nQ9U2zHfQsBXGC/view?usp=sharing', 'Thermal Image of Notched vs Standard V-belt', 0, 1, 0, 0, '2021-02-04 00:25:40'),
(1269, 164, 13167, 107, 0, 1, 21, 'An OSU EEC Analysis Template in Microsoft Excel Format', 'https://drive.google.com/file/d/19tm7mcwn9jYIj_xDkJ7Ki9buPw0gc2Kl/view?usp=sharing', 'Install Notched V-Belts Template', 0, 0, 0, 0, '2021-02-04 00:25:40'),
(1270, 164, 13168, 107, 0, 0, 11, 'Replace V-Belt Drives with Synchronous Belt Drives (Sometimes called High Torque Drives)', '', '', 0, 0, 0, 0, '2021-02-04 00:25:40'),
(1271, 164, 13169, 107, 0, 1, 31, 'Synchronous drives use toothed belts and mated grooved sprockets to transfer power based on positive engagement rather than friction. Synchronous belt drives operate more efficiently and require less maintenance than V-belt drives.', '%zXz%', '%zXz%', 0, 0, 0, 0, '2021-02-04 00:25:40'),
(1272, 164, 13170, 107, 0, 1, 10, 'Numerous belt-driven motors are used throughout a facility ', '', '', 0, 0, 0, 0, '2021-02-04 00:25:40'),
(1273, 164, 13171, 107, 0, 1, 3, 'Synchronous drives consistently operate with 98% efficiency', '', '', 0, 0, 0, 0, '2021-02-04 00:25:40'),
(1274, 164, 13172, 107, 0, 1, 14, 'Are V-belts or synchronous belts more suited to the application?', '', '', 0, 0, 0, 0, '2021-02-04 00:25:40'),
(1275, 164, 13173, 107, 0, 1, 1, 'Maintain efficiency over a wide load range', '', '', 0, 0, 0, 0, '2021-02-04 00:25:40'),
(1276, 164, 13174, 107, 0, 1, 1, 'Work well in oily and wet environments', '', '', 0, 0, 0, 0, '2021-02-04 00:25:40'),
(1277, 164, 13175, 107, 0, 1, 1, 'Require minimal maintenance and re-tensioning ', '', '', 0, 0, 0, 0, '2021-02-04 00:25:40'),
(1278, 164, 13176, 107, 0, 1, 2, 'Require installation of mating grooved sprockets', '', '', 0, 0, 0, 0, '2021-02-04 00:25:40'),
(1279, 164, 13177, 107, 0, 1, 2, 'Noisier and transfer more vibration than V-belts', '', '', 0, 0, 0, 0, '2021-02-04 00:25:40'),
(1280, 164, 13178, 107, 0, 1, 2, 'Vulnerable to sudden torque changes that can shear the belt\'s teeth', '', '', 0, 0, 0, 0, '2021-02-04 00:25:40'),
(1281, 164, 13179, 107, 0, 1, 4, 'If the belt is meant to be the weakest link in the motor driven system, for example, if the system tends to jam, then a standard V-belt is the better choice. A synchronous belt is much less likely to be the failure point in a jam, leading to potential damage of much more expensive components. ', '', '', 0, 0, 0, 0, '2021-02-04 00:25:40'),
(1282, 164, 13180, 107, 0, 1, 12, 'Consider consulting a power transmission specialist to determine viability and savings potential from retrofitting V-belt drives with synchronous belts. Install notched belts where synchronous are not cost effective.', '', '', 0, 0, 0, 0, '2021-02-04 00:25:40'),
(1283, 165, 7972, 119, 0, 0, 10, 'Equipment is idle for significant periods of time', '', '', 0, 0, 0, 0, '2020-12-19 00:46:45'),
(1284, 165, 7973, 119, 0, 0, 11, 'Manually reduce equipment operation time', '', '', 0, 0, 0, 0, '2020-12-19 00:46:45'),
(1285, 165, 7974, 119, 0, 1, 31, '<p>Turn off equipment during lunch, breaks, and other times when equipment is not in use.</p>', '', '', 0, 0, 0, 0, '2020-12-19 00:46:45'),
(1286, 165, 7975, 119, 0, 1, 1, 'No cost option', '', '', 0, 0, 0, 0, '2020-12-19 00:46:45'),
(1287, 165, 7976, 119, 0, 1, 2, 'This measure is only as reliable as the operators', '', '', 0, 0, 0, 0, '2020-12-19 00:46:45'),
(1288, 165, 7977, 119, 0, 0, 11, 'Operate equipment in batches rather than continuously ', '', '', 0, 0, 0, 0, '2020-12-19 00:46:45'),
(1289, 165, 7978, 119, 0, 1, 1, 'No cost option', '', '', 0, 0, 0, 0, '2020-12-19 00:46:45'),
(1290, 165, 7979, 119, 0, 1, 2, 'Batch processing also has potential for increasing demand charges if the equipment is more heavily loaded.', '', '', 0, 0, 0, 0, '2020-12-19 00:46:45'),
(1291, 165, 7980, 119, 0, 0, 11, 'Interlock equipment with a related process', '', '', 0, 0, 0, 0, '2020-12-19 00:46:45'),
(1292, 165, 7981, 119, 0, 1, 31, '<p>If a particular piece of equipment is dedicated to specific process that requires additional equipment, they can all be interlocked so all will be de-energized when the operator turns off one piece of equipment.</p>', '', '', 0, 0, 0, 0, '2020-12-19 00:46:45'),
(1293, 165, 7982, 119, 0, 1, 1, 'More reliable then having operators turn of multiple pieces of equipment', '', '', 0, 0, 0, 0, '2020-12-19 00:46:45'),
(1294, 165, 7983, 119, 0, 0, 11, 'Automatically control equipment operation time', '', '', 0, 0, 0, 0, '2020-12-19 00:46:45'),
(1295, 165, 7984, 119, 0, 0, 31, '<p>Timers, level sensors, material sensors, and other controls can be used to automatically turn off equipment that is not currently being utilized and automatically turn on when needed.</p>', '', '', 0, 0, 0, 0, '2020-12-19 00:46:45'),
(1296, 165, 7985, 119, 0, 0, 1, 'Can obtain efficiencies of batch processing automatically', '', '', 0, 0, 0, 0, '2020-12-19 00:46:45'),
(1297, 165, 7986, 119, 0, 0, 4, 'Special care must be taken to avoid creating a safety hazard', '', '', 0, 0, 0, 0, '2020-12-19 00:46:45'),
(1298, 166, 12960, 116, 0, 0, 24, 'An OSU EEC Training Webpage', 'https://eec.oregonstate.edu/industrial-motors-training', 'Industrial Motors Training', 0, 0, 0, 0, '2021-02-03 23:58:30'),
(1299, 166, 12961, 116, 0, 0, 22, 'An OSU EEC Google Slideshow', 'https://docs.google.com/presentation/d/1eG8ygZ-gpYPzbjnpJKLcm_bmoIUImD7CcBU0ZExhfH4/edit?usp=sharing', 'Motor Assessment Fundamentals', 0, 0, 0, 0, '2021-02-03 23:58:30'),
(1300, 166, 12962, 116, 0, 0, 22, 'An IAC Training Slideshow', 'https://docs.google.com/presentation/d/153S2O7Ns9vJzLqHQnifW03rE52y4d-KGAPgC3e3D8zc/edit?usp=sharing', 'Motors Training', 0, 0, 0, 0, '2021-02-03 23:58:30'),
(1301, 166, 12963, 116, 0, 0, 22, 'An OSU EEC Google Slideshow', 'https://docs.google.com/presentation/d/1lbgHebPEVJEB17Yqp--r6gARKWkA4YB45nHJx3OEwXg/edit?usp=sharing', 'Power Factor', 0, 0, 0, 0, '2021-02-03 23:58:30'),
(1302, 166, 12964, 116, 0, 0, 17, 'An OSU EEC Report Appendix in Microsoft Word Format', 'https://drive.google.com/file/d/138fM99GFgSjGUAjvqU1x2cjvxDXCu8-a/view?usp=sharing', 'Motors Appendix', 0, 0, 0, 0, '2021-02-03 23:58:30'),
(1303, 167, 12564, 3, 0, 0, 32, '', 'https://i.imgur.com/V0dkW5l.png', 'Screw compressor power vs output for various control strategies', 0, 0, 0, 0, '2021-01-28 23:04:45'),
(1304, 168, 12565, 72, 0, 0, 20, '', 'https://live.staticflickr.com/65535/50066459491_bb3c3291c5_b.jpg', 'Dry sprinkler systems need compressed air', 0, 0, 0, 0, '2021-01-28 23:05:35'),
(1305, 168, 12566, 72, 0, 0, 20, '', 'https://live.staticflickr.com/65535/50065906203_65746ac38f_b.jpg', 'Blow off wand and hose', 0, 0, 0, 0, '2021-01-28 23:05:35'),
(1306, 168, 12567, 72, 0, 0, 20, '', 'https://live.staticflickr.com/65535/50065907458_f8a2a9a7e0_b.jpg', 'Air Motors used to mix paint can be replaced with explosion proof electric motors', 0, 0, 0, 0, '2021-01-28 23:05:35'),
(1307, 168, 12568, 72, 0, 0, 20, '', 'https://live.staticflickr.com/65535/50066721727_a6607851c0_b.jpg', 'Compressed Air Receiver Tank', 0, 0, 0, 0, '2021-01-28 23:05:35'),
(1308, 168, 12569, 72, 0, 0, 20, '', 'https://live.staticflickr.com/65535/50065907313_a2869ef070_b.jpg', 'Industrial Screw Compressor', 0, 0, 0, 0, '2021-01-28 23:05:35'),
(1309, 168, 12570, 72, 0, 0, 20, '', 'https://live.staticflickr.com/65535/50065907073_1a989d028d_b.jpg', 'Compressed Air Receiver Tamk', 0, 0, 0, 0, '2021-01-28 23:05:35'),
(1310, 168, 12571, 72, 0, 0, 20, '', 'https://live.staticflickr.com/65535/50065907213_978efa0976_b.jpg', '<p>Blow off wands with and without an engineered nozzle</p>', 0, 0, 0, 0, '2021-01-28 23:05:35');
INSERT INTO `History_Items` (`historyId`, `parentId`, `itemId`, `cardId`, `orderIndex`, `indentation`, `iconType`, `contentText`, `contentUrl`, `contentLabel`, `contentMode`, `internal`, `inline`, `sourceId`, `created`) VALUES
(1311, 168, 12572, 72, 0, 0, 20, '', 'https://live.staticflickr.com/65535/50066720932_da2c3b0b6c_b.jpg', 'Small reciprocating industrial air compressor', 0, 0, 0, 0, '2021-01-28 23:05:35'),
(1312, 168, 12573, 72, 0, 0, 20, '', 'https://live.staticflickr.com/65535/50065907503_d75eb615cf_b.jpg', 'Desiccant compressed air dryer ', 0, 0, 0, 0, '2021-01-28 23:05:35'),
(1313, 168, 12574, 72, 0, 0, 20, '', 'https://live.staticflickr.com/65535/50066722032_f62637039d_b.jpg', 'Compressed Air Receiver Tank', 0, 0, 0, 0, '2021-01-28 23:05:35'),
(1314, 168, 12575, 72, 0, 0, 20, '', 'https://live.staticflickr.com/65535/50065907438_e7f7d53ba4_b.jpg', 'Refrigerated compressed air dryer', 0, 0, 0, 0, '2021-01-28 23:05:35'),
(1315, 169, 13237, 109, 0, 0, 8, 'For AC induction/asynchronous motors \"slip\" offers one way to estimate motor load if amps or power are not obtainable. For example if a nominal 1800 RPM motor nameplate lists an RPM of 1750 (for full load), the actual reduction in RPM with load is linear with the % of full load. For example If you use a strobe to measure an RPM of 1775 RPM on the same motor, then the motor load factor is 50% . If it is a 100 HP motor, it is working against a 50 HP load.', '', '', 0, 0, 0, 0, '2021-02-05 21:09:42'),
(1316, 170, 13238, 109, 0, 0, 8, '<strong>Slip Measurement</strong> - For AC induction/asynchronous motors \"slip\" offers one way to estimate motor load if amps or power are not obtainable. For example if a nominal 1800 RPM motor nameplate lists an RPM of 1750 (for full load), the actual reduction in RPM with load is linear with the % of full load. For example If you use a strobe to measure an RPM of 1775 RPM on the same motor, then the motor load factor is 50% . If it is a 100 HP motor, it is working against a 50 HP load.', '', '', 0, 0, 0, 0, '2021-02-05 21:10:17'),
(1317, 171, 13239, 108, 0, 0, 3, '1 HP = 0.746 kW', '', '', 0, 0, 0, 0, '2021-02-05 21:11:01'),
(1318, 171, 13240, 108, 0, 0, 3, 'Cost to operate a motor at 75% load for a full year = $60/HP (Assumes $0.05/kWh)', '', '', 0, 1, 0, 0, '2021-02-05 21:11:01'),
(1319, 171, 13241, 108, 0, 0, 3, 'Estimate 1.2 Full Load Amps per horsepower for motors on nominal 460 Volt systems (2.4 amps per horsepower on 230 volt systems)', '', '', 0, 0, 0, 0, '2021-02-05 21:11:01'),
(1320, 172, 13259, 110, 0, 0, 7, '<p>Serve high operating hour, high horsepower loads with premium efficiency motors.</p>', '', '', 0, 0, 0, 0, '2021-02-08 17:34:32'),
(1321, 172, 13260, 110, 0, 0, 7, '<p>Setting and maintaining correct tensioning and alignment on belt drives is important to obtain optimum drive efficiency. </p>', '', '', 0, 0, 0, 0, '2021-02-08 17:34:32'),
(1322, 173, 13261, 110, 0, 0, 7, '<p>Serve high operating hour, high horsepower loads with premium efficiency motors.</p>', '', '', 0, 0, 0, 0, '2021-02-08 17:36:13'),
(1323, 173, 13262, 110, 0, 0, 7, '<p>For optimum drive efficiency set and maintain correct tensioning and alignment on belt drives.</p>', '', '', 0, 0, 0, 0, '2021-02-08 17:36:13'),
(1324, 174, 13263, 110, 0, 0, 7, '<p>Serve high operating hour, high horsepower loads with premium efficiency motors.</p>', '', '', 0, 0, 0, 0, '2021-02-08 17:55:24'),
(1325, 174, 13264, 110, 0, 0, 7, '<p>For optimum belt drive efficiency set and maintain correct tensioning and alignment on belt drives.</p>', '', '', 0, 0, 0, 0, '2021-02-08 17:55:24'),
(1326, 175, 13265, 287, 0, 0, 24, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/04/f15/whentopurchase_nema_motor_systemts1.pdf', 'When to Purchase Premium Efficiency Motors', 1, 0, 0, 0, '2021-02-08 22:15:24'),
(1327, 175, 13266, 287, 0, 0, 24, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/04/f15/estimate_motor_efficiency_motor_systemts2.pdf', 'Estimating Motor Efficiency in the Field', 1, 0, 0, 0, '2021-02-08 22:15:24'),
(1328, 175, 13267, 287, 0, 0, 24, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/04/f15/extend_motor_operlife_motor_systemts3.pdf', 'Extend the Operating Life of Your Motor', 1, 0, 0, 0, '2021-02-08 22:15:24'),
(1329, 175, 13268, 287, 0, 0, 24, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/04/f15/importance_motor_shaft_motor_systemts4.pdf', 'The Importance of Motor Shaft Alignment', 1, 0, 0, 0, '2021-02-08 22:15:24'),
(1330, 175, 13269, 287, 0, 0, 24, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/04/f15/avoid_nuisance_motorsys_ts6.pdf', 'Avoid Nuisance Tripping with Premium Efficiency Motors', 1, 0, 0, 0, '2021-02-08 22:15:24'),
(1331, 175, 13270, 287, 0, 0, 24, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/04/f15/eliminate_voltage_unbalanced_motor_systemts7.pdf', 'Eliminate Voltage Unbalance', 1, 0, 0, 0, '2021-02-08 22:15:24'),
(1332, 175, 13271, 287, 0, 0, 24, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/04/f15/motor_tip_sheet8.pdf', 'Eliminate Excessive In-Plant Distribution System Voltage Drops', 1, 0, 0, 0, '2021-02-08 22:15:24'),
(1333, 175, 13272, 287, 0, 0, 24, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/04/f15/motor_tip_sheet9.pdf', 'Improve Motor Operation at Off-Design Voltages', 1, 0, 0, 0, '2021-02-08 22:15:24'),
(1334, 175, 13273, 287, 0, 0, 24, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/04/f15/motor_tip_sheet10.pdf', 'Turn Motors Off When Not in Use', 1, 0, 0, 0, '2021-02-08 22:15:24'),
(1335, 175, 13274, 287, 0, 0, 24, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/04/f15/motor_tip_sheet11.pdf', 'Adjustable Speed Drive Part-Load Efficiency', 1, 0, 0, 0, '2021-02-08 22:15:24'),
(1336, 175, 13275, 287, 0, 0, 24, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/04/f15/motor_tip_sheet12.pdf', 'Is It Cost-Effective to Replace Old Eddy-Current Drives?', 1, 0, 0, 0, '2021-02-08 22:15:24'),
(1337, 175, 13276, 287, 0, 0, 24, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/04/f15/motor_tip_sheet13.pdf', 'Magnetically Coupled Adjustable Speed Motor Drives', 1, 0, 0, 0, '2021-02-08 22:15:24'),
(1338, 175, 13277, 287, 0, 0, 24, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/04/f15/motor_tip_sheet14.pdf', 'When Should Inverter-Duty Motors Be Specified?', 1, 0, 0, 0, '2021-02-08 22:15:24'),
(1339, 175, 13278, 287, 0, 0, 24, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/04/f15/motor_tip_sheet15.pdf', 'Minimize Adverse Motor and Adjustable Speed Drive Interactions', 1, 0, 0, 0, '2021-02-08 22:15:24'),
(1340, 176, 13353, 9, 0, 0, 1, 'Versatile. Offers compact energy density. ', '', '', 0, 0, 0, 0, '2021-02-08 23:20:27'),
(1341, 176, 13354, 9, 0, 0, 1, 'Spark free for potentially explosive environments', '', '', 0, 0, 0, 0, '2021-02-08 23:20:27'),
(1342, 176, 13355, 9, 0, 0, 1, 'Can be used as an easy quick fix for many issues', '', '', 0, 0, 0, 0, '2021-02-08 23:20:27'),
(1343, 176, 13356, 9, 0, 0, 1, 'Familiar utility for industrial personnel', '', '', 0, 0, 0, 0, '2021-02-08 23:20:27'),
(1344, 176, 13357, 9, 0, 0, 1, 'A single mechanical energy input at the compressor can be distributed throughout a facility. ', '', '', 0, 0, 0, 0, '2021-02-08 23:20:27'),
(1345, 177, 13384, 133, 0, 0, 31, '<p>Vapor Compression Refrigeration: </p>', '%zXz%', '%zXz%', 0, 0, 0, 0, '2021-02-08 23:35:25'),
(1346, 177, 13385, 133, 0, 0, 1, 'Provides reliable climate control for temperature sensitive applications', '', '', 0, 0, 0, 0, '2021-02-08 23:35:25'),
(1347, 177, 13386, 133, 0, 0, 1, 'Lower typical energy requirements than other forms of refrigeration such as absorption and steam-jet ', '', '', 0, 0, 0, 0, '2021-02-08 23:35:25'),
(1348, 178, 13387, 134, 0, 0, 31, '<p>Vapor Compression Refrigeration:</p>', '%zXz%', '%zXz%', 0, 0, 0, 0, '2021-02-08 23:36:09'),
(1349, 178, 13388, 134, 0, 0, 2, 'More energy intensive than other cooling systems such as cooling towers and outside air economizers', '', '', 0, 0, 0, 0, '2021-02-08 23:36:09'),
(1350, 178, 13389, 134, 0, 0, 2, 'Numerous interconnected components contribute to high capital cost and upkeep', '', '', 0, 0, 0, 0, '2021-02-08 23:36:09'),
(1351, 179, 13412, 136, 0, 0, 3, '1 ton = 12,000 Btu/hr = 3.52 kW', '', '', 0, 0, 0, 0, '2021-02-08 23:51:04'),
(1352, 179, 13413, 136, 0, 0, 3, '<p>1-1.5% compressor power reduction per 1°F decrease in condensing temperature</p>', '', '', 0, 0, 0, 20, '2021-02-08 23:51:04'),
(1353, 179, 13414, 136, 0, 1, 31, '<p>(To be conservative, the OSU EEC estimates a 1% power drop per °F drop)</p>', '%zXz%', '%zXz%', 0, 0, 0, 0, '2021-02-08 23:51:04'),
(1354, 179, 13415, 136, 0, 0, 3, '<p>2-3% compressor power reduction per 1°F increase in suction temperature for centrifugal machines</p>', '', '', 0, 0, 0, 21, '2021-02-08 23:51:04'),
(1355, 179, 13416, 136, 0, 1, 31, '<p>(To be conservative, the OSU EEC estimates a 2% power drop per 1°F increase)</p>', '%zXz%', '%zXz%', 0, 0, 0, 0, '2021-02-08 23:51:04'),
(1356, 179, 13417, 136, 0, 0, 3, '5% compressor power reduction from switching to thermo-syphon oil cooling from liquid-injection cooling', '', '', 0, 0, 0, 0, '2021-02-08 23:51:04'),
(1357, 179, 13418, 136, 0, 0, 3, '14,500 Btu/hr per ton produced is rejected in the condensers', '', '', 0, 0, 0, 0, '2021-02-08 23:51:04'),
(1358, 180, 10624, 138, 0, 0, 7, 'Implement a robust energy management program that includes appropriate training of key personnel and establishes identifiable roles to create a culture of continual improvement towards energy efficiency', '', '', 0, 0, 0, 0, '2020-12-31 19:21:19'),
(1359, 180, 10625, 138, 0, 0, 7, 'Use \"free cooling\" by taking advantage of low ambient air temperature whenever possible to turn down or shut down refrigeration equipment', '', '', 0, 0, 0, 0, '2020-12-31 19:21:19'),
(1360, 180, 10626, 138, 0, 0, 7, 'Apply waste heat from a refrigeration system to nearby heating applications', '', '', 0, 0, 0, 0, '2020-12-31 19:21:19'),
(1361, 181, 13440, 139, 0, 0, 32, '', '/uploads/user_58/46e54440c2be9608320703b9efb9b082.jpg', 'Simple Refrigeration Cycle', 0, 0, 0, 0, '2021-02-08 23:53:18'),
(1362, 181, 13441, 139, 0, 0, 32, '', '/uploads/user_58/d64fd1cf30ad7eeb7bc82c88f7aeec1c.jpg', 'Mollier Diagram', 0, 0, 0, 0, '2021-02-08 23:53:18'),
(1363, 182, 13506, 290, 0, 0, 17, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam15_benchmark.pdf', 'Benchmark the Fuel Cost of Steam Generation', 1, 0, 0, 0, '2021-02-08 23:57:44'),
(1364, 182, 13507, 290, 0, 0, 17, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam7_surfaces.pdf', 'Clean Firetube Boiler Waterside Heat Transfer Surfaces', 1, 0, 0, 0, '2021-02-08 23:57:44'),
(1365, 182, 13508, 290, 0, 0, 17, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam26a_condensing.pdf', 'Consider Installing a Condensing Economizer', 1, 0, 0, 0, '2021-02-08 23:57:44'),
(1366, 182, 13509, 290, 0, 0, 17, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam22_backpressure.pdf', 'Consider Installing High-Pressure Boilers with Backpressure Turbine-Generators', 1, 0, 0, 0, '2021-02-08 23:57:44'),
(1367, 182, 13510, 290, 0, 0, 17, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam25_firetube_boilers.pdf', 'Consider Installing Turbulators on Two- and Three-Pass Firetube Boilers', 1, 0, 0, 0, '2021-02-08 23:57:44'),
(1368, 182, 13511, 290, 0, 0, 17, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam21_rotating_equip.pdf', 'Consider Steam Turbine Drives for Rotating Equipment', 1, 0, 0, 0, '2021-02-08 23:57:44'),
(1369, 182, 13512, 290, 0, 0, 17, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam26b_condensing.pdf', 'Considerations When Selecting a Condensing Economizer', 1, 0, 0, 0, '2021-02-08 23:57:44'),
(1370, 182, 13513, 290, 0, 0, 17, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam19_vessels.pdf', 'Cover Heated, Open Vessels', 1, 0, 0, 0, '2021-02-08 23:57:44'),
(1371, 182, 13514, 290, 0, 0, 17, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam18_steam_systems.pdf', 'Deaerators in Industrial Steam Systems', 1, 0, 0, 0, '2021-02-08 23:57:44'),
(1372, 182, 13515, 290, 0, 0, 17, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam12_lowpressure_steam.pdf', 'Flash High-Pressure Condensate to Regenerate Low-Pressure Steam', 1, 0, 0, 0, '2021-02-08 23:57:44'),
(1373, 182, 13516, 290, 0, 0, 17, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam1_traps.pdf', 'Inspect and Repair Steam Traps', 1, 0, 0, 0, '2021-02-08 23:57:44'),
(1374, 182, 13517, 290, 0, 0, 17, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam23_control_system.pdf', 'Install an Automatic Blowdown-Control System', 1, 0, 0, 0, '2021-02-08 23:57:44'),
(1375, 182, 13518, 290, 0, 0, 17, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam17_valves_fittings.pdf', 'Install Removable Insulation on Valves and Fittings', 1, 0, 0, 0, '2021-02-08 23:57:44'),
(1376, 182, 13519, 290, 0, 0, 17, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam2_insulate.pdf', 'Insulate Steam Distribution and Condensate Return Lines', 1, 0, 0, 0, '2021-02-08 23:57:44'),
(1377, 182, 13520, 290, 0, 0, 17, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam4_boiler_efficiency.pdf', 'Improve Your Boiler’s Combustion Efficiency', 1, 0, 0, 0, '2021-02-08 23:57:44'),
(1378, 182, 13521, 290, 0, 0, 17, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam9_blowdown.pdf', 'Minimize Boiler Blowdown', 1, 0, 0, 0, '2021-02-08 23:57:44'),
(1379, 182, 13522, 290, 0, 0, 17, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam16_cycling_losses.pdf', 'Minimize Boiler Short Cycling Losses', 1, 0, 0, 0, '2021-02-08 23:57:44'),
(1380, 182, 13523, 290, 0, 0, 17, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam10_boiler_blowdown.pdf', 'Recover Heat from Boiler Blowdown', 1, 0, 0, 0, '2021-02-08 23:57:44'),
(1381, 182, 13524, 290, 0, 0, 17, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam20_turbogenerators.pdf', 'Replace Pressure-Reducing Valves with Backpressure Turbogenerators', 1, 0, 0, 0, '2021-02-08 23:57:44'),
(1382, 182, 13525, 290, 0, 0, 17, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam8_boiler.pdf', 'Return Condensate to the Boiler', 1, 0, 0, 0, '2021-02-08 23:57:44'),
(1383, 182, 13526, 290, 0, 0, 17, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam24_burners.pdf', 'Upgrade Boilers with Energy-Efficient Burners', 1, 0, 0, 0, '2021-02-08 23:57:44'),
(1384, 182, 13527, 290, 0, 0, 17, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam3_recovery.pdf', 'Use Feedwater Economizers for Waste Heat Recovery', 1, 0, 0, 0, '2021-02-08 23:57:44'),
(1385, 182, 13528, 290, 0, 0, 17, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam14_chillers.pdf', 'Use Low-Grade Waste Steam to Power Absorption Chillers', 1, 0, 0, 0, '2021-02-08 23:57:44'),
(1386, 182, 13529, 290, 0, 0, 17, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam29_use_steam.pdf', 'Use Steam Jet Ejectors or Thermocompressors to Reduce Venting of Low-Pressure Steam', 1, 0, 0, 0, '2021-02-08 23:57:44'),
(1387, 182, 13530, 290, 0, 0, 17, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam11_waste_steam.pdf', 'Use Vapor Recompression to Recover Low-Pressure Waste Steam', 1, 0, 0, 0, '2021-02-08 23:57:44'),
(1388, 182, 13531, 290, 0, 0, 17, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam13_vent_condenser.pdf', 'Use a Vent Condenser to Recover Flash Steam Energy', 1, 0, 0, 0, '2021-02-08 23:57:44'),
(1389, 182, 13532, 290, 0, 0, 24, 'See steam tip sheets', 'https://www.energy.gov/eere/amo/tip-sheets-system', 'U.S.DOE Energy Tip Sheets by System', 1, 0, 0, 0, '2021-02-08 23:57:44'),
(1390, 183, 13533, 124, 0, 0, 17, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/05/f16/adjust_speed_pumping.pdf', 'Adjustable Speed Pumping Applications', 1, 0, 0, 0, '2021-02-09 00:01:56'),
(1391, 183, 13534, 124, 0, 0, 17, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/05/f16/pumping1_conduct.pdf', 'Conduct an In-Plant Pumping System Survey', 1, 0, 0, 0, '2021-02-09 00:01:56'),
(1392, 183, 13535, 124, 0, 0, 17, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/05/f16/centrifug_pumps_control.pdf', 'Control Strategies for Centrifugal Pumps with Variable Flow Rate Requirements', 1, 0, 0, 0, '2021-02-09 00:01:56'),
(1393, 183, 13536, 124, 0, 0, 17, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/05/f16/control_valves_pumping_ts10.pdf', 'Energy Savings Opportunities in Control Valves', 1, 0, 0, 0, '2021-02-09 00:01:56'),
(1394, 183, 13537, 124, 0, 0, 17, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/05/f16/maintain_pumping_systemsts5.pdf', 'Maintain Pumping Systems Effectively', 1, 0, 0, 0, '2021-02-09 00:01:56'),
(1395, 183, 13538, 124, 0, 0, 17, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/05/f16/match_pumps_to_system.pdf', 'Match Pumps to System Requirements', 1, 0, 0, 0, '2021-02-09 00:01:56'),
(1396, 183, 13539, 124, 0, 0, 17, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/05/f16/optimize_parallel_pumping.pdf', 'Optimize Parallel Pumping Systems', 1, 0, 0, 0, '2021-02-09 00:01:56'),
(1397, 183, 13540, 124, 0, 0, 17, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/05/f16/pump_selection.pdf', 'Pump Selection Considerations', 1, 0, 0, 0, '2021-02-09 00:01:56'),
(1398, 183, 13541, 124, 0, 0, 17, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/05/f16/reduce_pumping_costs.pdf', 'Reduce Pumping Costs through Optimum Pipe Sizing', 1, 0, 0, 0, '2021-02-09 00:01:56'),
(1399, 183, 13542, 124, 0, 0, 17, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/05/f16/efficient_centrifug_pumps.pdf', 'Select an Energy-Efficient Centrifugal Pump', 1, 0, 0, 0, '2021-02-09 00:01:56'),
(1400, 183, 13543, 124, 0, 0, 17, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/05/f16/test_pumping_system__pumping_systemts4.pdf', 'Test for Pumping System Efficiency', 1, 0, 0, 0, '2021-02-09 00:01:56'),
(1401, 183, 13544, 124, 0, 0, 17, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/05/f16/trim_replace_impellers7.pdf', 'Trim or Replace Impellers on Oversized Pumps', 1, 0, 0, 0, '2021-02-09 00:01:56'),
(1402, 184, 13545, 182, 0, 0, 4, 'Improperly designed pump systems can lead to low pressures at the pump inlet which can lead to cavitation. This can seriously damage the pump and reduce its operating life.', '', '', 0, 0, 0, 0, '2021-02-09 00:02:17'),
(1403, 184, 13546, 182, 0, 0, 24, 'Online resource discussing how cavitation occurs and how to detect and prevent it from happening.', 'https://modernpumpingtoday.com/detecting-pump-cavitation/', 'Detecting Pump Cavitation', 1, 0, 0, 0, '2021-02-09 00:02:17'),
(1404, 185, 13548, 289, 0, 0, 22, '<p></p>', 'https://docs.google.com/presentation/d/11sXImoslkAlPdYkWdo9k30ZGqip8-wWytO7_oLm4y7E/edit#slide=id.p8', 'Pumps - a slideshow', 0, 0, 0, 0, '2021-02-09 00:02:55'),
(1405, 186, 13549, 288, 0, 0, 24, '<p></p>', 'https://www.dxpe.com/different-types-centrifugal-pumps-applications/', 'Different Types of Centrifugal Pumps and Their Applications', 1, 0, 0, 0, '2021-02-09 00:03:34'),
(1406, 186, 13550, 288, 0, 0, 24, '<p></p>', 'https://www.aquaculturealliance.org/advocate/cavitation-the-pump-disease/', 'Cavitation, the ‘pump disease', 1, 0, 0, 0, '2021-02-09 00:03:34'),
(1407, 186, 13551, 288, 0, 0, 24, '<p></p>', 'https://www.deppmann.com/blog/service-tip-of-the-month/pump-cavitation/', 'Pump Cavitation', 1, 0, 0, 0, '2021-02-09 00:03:34'),
(1408, 186, 13552, 288, 0, 0, 17, 'IAC University Guide:', 'https://iac.university/technicalDocs/industr/ch6.pdf', 'PRIMEMOVERS OF ENERGY: PUMPS', 1, 0, 0, 0, '2021-02-09 00:03:34'),
(1409, 186, 13553, 288, 0, 0, 17, '<p></p>', 'https://www.unido.org/sites/default/files/2017-11/PSO-Manual-PRINT-FINAL-20161109-One-Page.pdf', 'Manual for Industrial Pump Systems Assessment and Optimization', 1, 0, 0, 0, '2021-02-09 00:03:34'),
(1410, 186, 13554, 288, 0, 0, 17, 'BC Hydro Document ', 'https://www.bchydro.com/content/dam/BCHydro/customer-portal/documents/power-smart/alliance/programs/industrial-basics-of-industrial-pumps-for-small-pump-program.pdf', 'Basics Of Industrial Pumps For Small Pump', 1, 0, 0, 0, '2021-02-09 00:03:34');

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
(16, 61, 7, 'Power Factor Correction', 'Improving power factor increases the capacity of a facility\'s electrical distribution network and can lead to significant savings on electrical utility costs.', 'High reactive power, or kVAR, can reduce the capacity of utility lines and transformers to supply kilowatts of real power, which creates additional expenses for the electrical service provider. This higher cost is directly billed to customers who are metered for reactive power. Improving power factor will avoid electric power billing penalties and electrical power losses due to the increased current required to perform a given job. Increasing power factor will increase the capacity of the distribution system.', '/uploads/user_52/ec8550a6c0caa67f935129b59a4c8185.jpg', 0, 0, '2020-10-13 20:18:20'),
(17, 64, 0, 'How to Use EEC Walkthrough', 'Find what you need to know quickly', 'This guide is designed to allow the user to \"drill down\" to a specific subject of interest, perhaps associated with a current project. Each topic includes an overview including a quick summary of key things to know, along with links to more in depth resources. This section is followed by a list of common efficiency improvement opportunities to consider along with associated information.', '/uploads/user_51/a8a32589238ec2625ded26ec4774f529.jpg', 0, 0, '2020-11-26 23:41:58'),
(18, 69, 1, 'Metals Manufacturing', 'Industrial metals manufacturing processes may include casting, forging, bending, forming, spinning, welding, cutting and finishing to produce a final product.', 'Metals manufacturing includes production of raw stock, replacement parts and final products. Many production processes are common among all metals manufacturing facilities.', '/uploads/user_52/0baf5657b6e1ac3fef0b0e048672324b.jpg', 0, 0, '2021-01-26 03:46:14'),
(19, 62, 5, 'Cybersecurity', 'Industrial Assessment Center resources for increasing cybersecurity.', 'Cybersecurity is becoming increasingly important as more industries adopt newer and more sophisticated controls for smart manufacturing or data collection to increase production and equipment efficiency. As part of our outreach on energy efficiency, we also provide information and resources about cybersecurity. Using some of the self-assessment tools and other informational resources provided on this page can be an important part of a facility’s plan to regularly evaluate their cybersecurity status.\n\nThe National Institute of Standards and Technology (NIST) Manufacturing Extension Partnership stated that 61% of small businesses experienced a cyber attack within the last 12 months, making up 58% of cyber attack victims. Furthermore, 34% of targets were manufacturing facilities and the median cost per attack was $60,000.', 'https://live.staticflickr.com/6044/6999839463_ae02bb6a7e_b.jpg', 1, 0, '2021-01-26 22:51:18'),
(20, 45, 2, 'Pumps', 'Pumps provide a typical utility required throughout industry.', 'Centrifugal pumps are the most common type found in industry, followed by positive displacement pumps (used in hydraulics), pneumatic diaphragm pumps, peristaltic pumps, and other specialty pumps. \n\nUnless otherwise noted this section speaks to centrifugal pumps when addressing pump performance and efficiency. Changes in hydraulic energy required (pressure and flow) will translate to any pumping system. \n\nCentrifugal pumps generally come in one of three classes: radial flow, mixed flow, and axial flow.', 'https://live.staticflickr.com/65535/50066427331_ddae8822f2_b.jpg', 0, 0, '2021-02-03 23:25:19'),
(21, 44, 2, 'Motors and Controls', 'Electrical Motors and Motor Controls (Variable Speed Drives, etc) are crucial to most mechanized industrial processes and equipment.', 'Motors are a crucial part of any mechanized process and provide a means to do the majority of the mechanical work in most facilities.  Motors convert electrical energy into mechanical work to provide power to a wide range of applications including air compressors, fans, pumps, hydraulics, mixers, conveyors, and much more. The majority of industrial motors are three-phase AC induction/asynchronous motors due to their reliability and low cost.', 'https://live.staticflickr.com/65535/50069229503_243696380c_b.jpg', 0, 0, '2021-02-04 00:27:59');

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
(13, 'Opportunity Description', 'angle-right', 0, '#000000'),
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
(28, 'EEC Walkthrough Page', 'star', 3, '#FFC83D'),
(31, 'Text Field', 'font', 4, '#000000'),
(32, 'Full Image', 'picture-o', 2, '#32C332');

-- --------------------------------------------------------

--
-- Table structure for table `Info`
--

CREATE TABLE `Info` (
  `infoId` int(10) UNSIGNED NOT NULL,
  `title` varchar(150) NOT NULL,
  `text` varchar(5000) NOT NULL,
  `icon` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Info`
--

INSERT INTO `Info` (`infoId`, `title`, `text`, `icon`) VALUES
(1, 'Our Goal', 'The OSU EEC / IAC  works towards a more efficient industrial sector by promoting energy and resource efficiency and effecting immediate and long-term impacts on local economic profitability through reduced energy and resource waste.', 'trophy'),
(2, 'About this Guide', 'The OSU EEC / IAC  offers this guide as a tool for users to learn more about their chosen specific industrial efficiency topics and identify specific actions to take to improve a site’s efficiency.  It is offered to industrial site personnel, industrial consultants, nationwide Industrial Assessment Center student analysts, and others working to increase industrial efficiency and competitiveness.', 'newspaper'),
(3, 'Our Team', 'This guide includes content developed by past OSU EEC Alumni & Faculty that participated the OSU Energy Efficiency Center and Industrial Assessment Center project since its inception in 1986. New Content is being added regularly by current OSU EEC Students & Faculty.', '');

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
  `contentText` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
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
(28, 16, 1, 0, 4, 'Take care to avoid potential dangerous air injection associated with directing compressed air flow directly onto skin', '', '', 0, 0, 0, 0, '2020-05-23 22:30:55', 1),
(29, 17, 1, 0, 7, 'Looped distribution systems can help maintain uniform pressure throughout a compressed air system.', '', '', 0, 0, 0, 0, '2020-05-23 22:30:57', 1),
(30, 17, 2, 0, 7, 'Well sized compressed air lines reduce pressure loss', '', '', 0, 0, 0, 0, '2020-05-23 22:30:58', 1),
(31, 17, 3, 0, 7, 'A well designed compressed air system should typically have a maximum 10 PSI pressure drop in delivering air to at any end-use in the system', '', '', 0, 0, 0, 0, '2020-05-23 22:31:00', 1),
(33, 18, 1, 0, 3, 'Expect a 1% drop in compressor energy and cost per 2 PSI in compressor outlet pressure drop', '', '', 0, 0, 0, 0, '2020-07-18 00:08:08', 1),
(34, 18, 1, 0, 3, '85 PSI is the standard required minimum inlet pressure for most common industrial pneumatic equipment', '', '', 0, 0, 0, 0, '2020-07-18 00:08:07', 1),
(36, 18, 1, 0, 3, '80 to 90% of energy for compressed air is lost as heat', '', '', 0, 0, 0, 0, '2020-07-18 00:08:04', 1),
(37, 19, 1, 0, 8, 'Use a pressure gage with standard quick connects typically used in compressed air lines to diagnose line pressure drops', '', '', 0, 0, 0, 0, '2020-07-18 00:08:04', 1),
(165, 18, 4, 0, 3, 'Over 5 HP of electrical power is required for each 1 HP of compressed air power', '', '', 0, 0, 0, 0, '2020-06-22 19:21:00', 1),
(166, 19, 1, 0, 8, 'Determine the leak load by checking compressor output when there is no productive air use', '', '', 0, 0, 0, 0, '2020-06-22 19:29:30', 1),
(383, 76, 1, 0, 17, 'This sourcebook is designed to provide compressed air system users with a reference that outlines opportunities for system performance improvements.', 'https://www.compressedairchallenge.org/data/sites/1/media/library/sourcebook/Improving_Compressed_Air-Sourcebook.pdf', 'Improving Compressed Air System Performance. A Sourcebook for Industry.  Third Edition. U.S.DOE', 1, 0, 0, 0, '2020-10-01 02:51:40', 1),
(384, 76, 1, 0, 17, 'MEASUR is open source software that consists of the following DOE legacy energy system assessment tools (updated): Pumping System Assessment Tool (PSAT), Process Heating Assessment and Survey Tool (PHAST), Fan System Assessment Tool (FSAT), Steam System Assessment Tool (SSAT)/ Steam System Modeler (SSMT), AIRMaster+ (Last accessed 12/2/2019)   ', 'https://www.energy.gov/eere/amo/measur', 'U.S. Department of Energy MEASUR analysis tool', 1, 0, 0, 0, '2021-01-14 22:03:34', 1),
(385, 76, 1, 0, 17, 'An informational page with analysis tools, case studies, tip sheets, and checklists', 'https://www.bpa.gov/EE/Sectors/Industrial/Pages/Compressed-Air.aspx', 'Bonneville Power Administration Compressed Air Page', 1, 0, 0, 0, '2020-06-29 20:55:45', 1),
(637, 75, 0, 0, 17, 'See compressed air tip sheets', 'https://www.energy.gov/eere/amo/tip-sheets-system', 'U.S.DOE Energy Tip Sheets by System', 1, 0, 0, 0, '2020-07-01 00:33:10', 1),
(638, 75, 0, 0, 17, '', 'https://www.energy.gov/sites/prod/files/2014/05/f16/compressed_air11.pdf', 'Alternative Strategies for Low-Pressure End Uses', 1, 0, 0, 0, '2020-06-30 06:38:26', 1),
(639, 75, 0, 0, 17, '', 'https://www.energy.gov/sites/prod/files/2014/05/f16/compressed_air4.pdf', 'Analyzing Your Compressed Air System', 1, 0, 0, 0, '2020-06-30 06:38:26', 1),
(733, 81, 0, 0, 1, 'Centrifugal pumps are capable of developing a wide range of flow and pressures', '', '', 0, 0, 0, 0, '2020-07-01 18:14:32', 1),
(1101, 86, 0, 0, 11, 'Turn compressor(s) off when not needed - nights weekends etc	', '', '', 0, 0, 0, 0, '2020-07-01 22:24:57', 1),
(1102, 86, 0, 0, 11, 'Serve low volume around the clock  requirement with separate smaller system', '', '', 0, 0, 0, 0, '2020-07-01 22:24:57', 1),
(1103, 87, 0, 0, 11, 'Replace refrigerated compressed air dryer with more efficient refrigerated compressed air dryer', '', '', 0, 0, 0, 0, '2020-07-01 22:28:10', 1),
(1104, 87, 0, 0, 11, 'Capture heat rejected by air compressors', '', '', 0, 0, 0, 0, '2020-07-01 22:28:10', 1),
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
(1347, 92, 0, 0, 8, 'Keep a steam table handy (phone app or pocket reference) to convert steam temperature to pressure for typical saturated conditions.', '', '', 0, 0, 0, 0, '2020-07-02 20:10:02', 1),
(1350, 93, 0, 0, 7, 'Regular, scheduled boiler tunes. Typically every 6 to 12 months.', '', '', 0, 0, 0, 0, '2020-07-02 20:12:22', 1),
(1351, 93, 0, 0, 7, 'Low O2 controls', '', '', 0, 0, 0, 0, '2020-07-02 20:12:22', 1),
(1361, 97, 0, 0, 17, 'An OSU EEC Data Collection Sheet in Microsoft Excel Format', 'https://drive.google.com/file/d/1mMRMAUYKDCpE5bQmX-KqajjAOwXuEzaL/view?usp=sharing', 'Boiler Data Collection Sheet', 0, 0, 0, 0, '2020-07-02 20:46:30', 1),
(1371, 98, 0, 0, 21, 'A link to the U.S.DOE\'s MEASUR Analysis Tool Package (free download)', 'https://www.energy.gov/eere/amo/measur', 'U.S.DOE Steam System Analysis Tool', 1, 0, 0, 0, '2020-08-10 17:43:19', 1),
(1372, 98, 0, 0, 21, 'An OSU EEC Analysis Tool in Microsoft Excel Format', 'https://drive.google.com/file/d/1HEL3S8xl50-B12ooH4wocqUznwJWAjzQ/view?usp=sharing', 'Combustion Efficiency Analysis Tool (CEAT)', 0, 0, 0, 0, '2020-07-02 21:18:17', 1),
(1407, 102, 0, 0, 11, 'Shut down equipment when not needed - nights, weekends, etc.', '', '', 0, 0, 0, 0, '2020-07-02 21:56:36', 1),
(1408, 103, 0, 0, 11, 'Minimize the continuous blowdown rate with a conductivity sensor', '', '', 0, 0, 0, 0, '2020-07-02 21:58:49', 1),
(1409, 103, 0, 0, 11, 'Install blowdown heat recovery', '', '', 0, 0, 0, 0, '2020-07-02 21:58:49', 1),
(1410, 104, 0, 0, 11, 'Replace damper controls on draft fans with variable speed control', '', '', 0, 0, 0, 0, '2020-07-02 22:01:14', 1),
(1652, 114, 0, 0, 17, 'An OSU EEC Data Collection Sheet in Microsoft Excel Format', 'https://drive.google.com/file/d/1PptW62lQbbN71Miefkx1I960UwnVHFA4/view?usp=sharing', 'Motor Data Collection Sheet', 0, 0, 0, 0, '2020-07-02 23:29:16', 1),
(1897, 100, 0, 0, 24, 'See steam tip sheets', 'https://www.energy.gov/eere/amo/tip-sheets-system', 'U.S.DOE Energy Tip Sheets by System', 1, 0, 0, 0, '2020-08-10 17:50:55', 1),
(1898, 100, 0, 0, 17, 'United Nations Industrial Development Organization Document', 'https://www.unido.org/sites/default/files/2017-11/SSO-Manual-Print-FINAL-20161109-One-Page-V2.pdf', 'Manual for Industrial Steam Systems Assessment and Optimization', 1, 0, 0, 0, '2020-07-03 03:01:04', 1),
(1899, 100, 0, 0, 17, 'CleaverBrooks Document', 'http://cleaverbrooks.com/reference-center/insights/Boiler%20Efficiency%20Guide.pdf', 'Boiler Efficiency Guide', 1, 0, 0, 0, '2020-07-28 05:08:05', 1),
(1900, 100, 0, 0, 25, 'Pacific NW Boiler Vendor', 'https://coleindust.com/', 'Cole Industrial', 1, 0, 0, 0, '2020-07-03 03:01:04', 1),
(1901, 100, 0, 0, 25, 'Pacific NW Boiler Vendor', 'https://www.nationwideboiler.com/pacific-combustion-engineering.html', 'Pacific Combustion Engineering', 1, 0, 0, 0, '2020-07-03 03:01:04', 1),
(1902, 100, 0, 0, 25, 'Boiler Manufacturer', 'http://cleaverbrooks.com/', 'CleaverBrooks', 1, 0, 0, 0, '2020-07-03 03:01:04', 1),
(2005, 115, 0, 0, 21, 'An OSU EEC analysis tool in microsoft excel format used to calculate power from measured amperage and voltage.', 'https://drive.google.com/file/d/1xJMeEKUM93lyxace7UUiIH_BdKf44Dxe/view?usp=sharing', 'Motor Analysis Tool (MAT)', 0, 0, 0, 0, '2020-07-03 03:38:14', 1),
(2006, 115, 0, 0, 21, 'An OSU EEC analysis tool in microsoft excel format used to calculate power from logged amperage data.', 'https://drive.google.com/file/d/1NMKuuxdUv9nNvFXOpR_tmd_-Yw6XUbpW/view?usp=sharing', 'Motor Analysis Tool (MAT) for Dataloggers', 0, 0, 0, 0, '2020-07-03 03:38:14', 1),
(2096, 106, 0, 0, 11, 'Insulate steam lines', '', '', 0, 0, 0, 0, '2020-07-03 17:30:31', 1),
(2097, 106, 0, 0, 11, 'Insulate valves and fittings', '', '', 0, 0, 0, 0, '2020-07-03 17:30:31', 1),
(2098, 106, 0, 0, 11, 'Insulate condensate lines', '', '', 0, 0, 0, 0, '2020-07-03 17:30:31', 1),
(2099, 106, 0, 0, 21, 'An OSU EEC Analysis Template in Microsoft Excel Format', 'https://drive.google.com/file/d/1Et50Qc77pWtPkZcorKcPG_RSuK-Vc_lx/view?usp=sharing', 'Insulation Template', 0, 0, 0, 0, '2020-07-03 17:30:31', 1),
(2100, 106, 0, 0, 21, 'North American Insulation Manufacturers Association Software Download', 'https://insulationinstitute.org/tools-resources/free-3e-plus/?cn-reloaded=1', 'NAIMA 3E Plus Insulation Tool', 1, 0, 0, 0, '2020-07-03 17:30:31', 1),
(2125, 27, 0, 0, 31, 'Energy savings associated with reductions in compressed air use are very dependent on the compressor control strategy. In the worst case, a compressor with blow off control might not yield any energy savings with compressed air use reductions, and one with inlet modulation might yield only a small part of potential savings.', '%zXz%', '%zXz%', 0, 0, 0, 0, '2020-07-07 16:17:13', 1),
(2126, 27, 0, 0, 11, 'Reduce compressed air leaks', '', '', 0, 0, 0, 0, '2020-07-07 16:17:13', 1),
(2127, 27, 0, 1, 31, 'Compressed air is an expensive utility, but leaks can go uncorrected as they do not make a mess.', '%zXz%', '%zXz%', 0, 0, 0, 0, '2020-07-07 16:17:13', 1),
(2128, 27, 0, 1, 10, 'The compressed air leak rate exceeds 20 to 30% of air used in the process.', '', '', 0, 0, 0, 0, '2020-07-07 16:17:13', 1),
(2129, 27, 0, 1, 8, 'Determine the leak load by checking compressor output when there is no productive use (typically during breaks or after hours.)', '', '', 0, 0, 0, 0, '2020-07-07 16:17:13', 1),
(2130, 27, 0, 1, 8, 'Sonic equipment can be used to identify leak locations and estimate associated losses.', '', '', 0, 0, 0, 0, '2020-07-07 16:17:13', 1),
(2131, 27, 0, 1, 15, 'Air use during idle period (often inferred from datalog of power or amps over time)', '', '', 0, 0, 0, 0, '2020-07-07 16:17:13', 1),
(2132, 27, 0, 1, 15, 'Air use during production (often inferred from datalog of power or amps over time)', '', '', 0, 0, 0, 0, '2020-07-07 16:17:13', 1),
(2133, 27, 0, 1, 15, 'Compressor power over time', '', '', 0, 0, 0, 0, '2020-07-07 16:17:13', 1),
(2134, 27, 0, 1, 17, 'An OSU EEC Analysis Template in Microsoft Excel Format', 'vhttps://drive.google.com/drive/u/0/folders/1pJoEFwdmULog_SRARRlqzFfzX5cpV6cI', 'Analysis Template: Repair Compressed Air Leaks ', 2, 0, 0, 0, '2020-07-07 16:17:13', 1),
(2135, 27, 0, 0, 11, 'Eliminate the use of compressed air “quick fixes” by correcting base issues', '', '', 0, 0, 0, 0, '2020-07-07 16:17:13', 1),
(2136, 27, 0, 1, 31, 'Compressed air is a handy utility that can be used for a temporary resolution of miscellaneous production issues, at the cost of expensive air use. Often these fixes persist without correction of the underlying issue.', '%zXz%', '%zXz%', 0, 0, 0, 0, '2020-07-07 16:17:13', 1),
(2137, 27, 0, 1, 10, 'Compressed air used as a temporary quick fix for applications such as cooling bearings, or moving lightweight items that are getting stuck on conveyor.', '', '', 0, 0, 0, 0, '2020-07-07 16:17:13', 1),
(2138, 27, 0, 0, 11, 'Use alternative to vortex coolers', '', '', 0, 0, 0, 0, '2020-07-07 16:17:13', 1),
(2139, 27, 0, 1, 31, 'Vortex coolers are an interesting technology that can take a compressed air inlet stream and yield two streams, one that is cold and one that is warm. They are sometimes used to cool electrical cabinets, but in many cases can be replaced with lower energy solutions such as air conditioning or simple fans.', '%zXz%', '%zXz%', 0, 0, 0, 0, '2020-07-07 16:17:13', 1),
(2140, 27, 0, 1, 10, 'Vortex cabinet cooler in use at a facility   ', '', '', 0, 0, 0, 0, '2020-07-07 16:17:13', 1),
(2141, 27, 0, 0, 11, 'Use engineered nozzles for compressed air blow-off applications', '', '', 0, 0, 0, 0, '2020-07-07 16:17:13', 1),
(2142, 27, 0, 1, 31, 'Engineered air nozzles can develop effective air flow with a smaller volume of compressed air by entraining atmospheric air in the air stream.', '%zXz%', '%zXz%', 0, 0, 0, 0, '2020-07-07 16:17:13', 1),
(2143, 27, 0, 1, 10, 'Compressed air blowing applications using simple open lines or apertures  ', '', '', 0, 0, 0, 0, '2020-07-07 16:17:13', 1),
(2144, 27, 0, 0, 11, 'Interlock compressed air delivery with equipment or application served.', '', '', 0, 0, 0, 0, '2020-07-07 16:17:13', 1),
(2145, 27, 0, 1, 31, 'Interlocking a compressed air valve to close when supported equipment is idle can eliminate significant unneeded air use. This can range from an entire packaging line to and isolated ink sprayer that blows air constantly while introducing ink to mark product periodically.', '%zXz%', '%zXz%', 0, 0, 0, 0, '2020-07-07 16:17:13', 1),
(2146, 27, 0, 1, 10, 'Idle equipment with active compressed air blowing applications or leaks ', '', '', 0, 0, 0, 0, '2020-07-07 16:17:13', 1),
(2147, 27, 0, 0, 11, 'Serve lower pressure end use with blower or fan', '', '', 0, 0, 0, 0, '2020-07-07 16:17:13', 1),
(2148, 27, 0, 1, 31, 'Compressed air is an energy intensive utility with significant heat of compression losses.  These losses can be avoided if the air is not pressurized significantly above that needed for the application. Fans and blowers can develop a like airflow with significantly less energy. ', '%zXz%', '%zXz%', 0, 0, 0, 0, '2020-07-07 16:17:13', 1),
(2149, 27, 0, 1, 10, 'Compressed air used for clearing material, blowing off water, agitating tanks of fluid, or any applications with compressed air regulated to a low pressure', '', '', 0, 0, 0, 0, '2020-07-07 16:17:13', 1),
(2150, 27, 0, 0, 11, 'Reduce the frequency or duration of intermittent air uses', '', '', 0, 0, 0, 0, '2020-07-07 16:17:13', 1),
(2151, 27, 0, 0, 11, 'Replace desiccant based air dryer with a refrigerated air dryer if air drying needs permit.', '', '', 0, 0, 0, 0, '2020-07-07 16:17:13', 1),
(2152, 27, 0, 0, 11, 'Use desiccant based air dryer with more efficient desiccant bed regeneration', '', '', 0, 0, 0, 0, '2020-07-07 16:17:13', 1),
(2153, 27, 0, 0, 11, 'Replace pneumatic hand tools with battery powered hand tools', '', '', 0, 0, 0, 0, '2020-07-07 16:17:13', 1),
(2179, 123, 0, 0, 17, 'MEASUR is open source software that consists of the following DOE legacy energy system assessment tools (updated): Pumping System Assessment Tool (PSAT), Process Heating Assessment and Survey Tool (PHAST), Fan System Assessment Tool (FSAT), Steam System Assessment Tool (SSAT)/ Steam System Modeler (SSMT), AIRMaster+ (Last accessed 12/2/2019)   ', 'https://www.energy.gov/eere/amo/measur', 'U.S. Department of Energy MEASUR analysis tool', 1, 0, 0, 0, '2020-07-07 18:00:00', 1),
(3892, 164, 0, 0, 24, '', 'https://eec.oregonstate.edu/wastewater-treatment-training-module', 'Wastewater Treatment Training', 0, 0, 0, 0, '2020-08-06 22:33:54', 1),
(4118, 163, 0, 0, 11, 'Control Aeration to Hold a Minimum Dissolved Oxygen Level', '', '', 0, 0, 0, 0, '2020-08-06 23:36:56', 1),
(4119, 163, 0, 0, 11, 'Replace Standard Aeration Fans with High Efficiency Turbo Blowers', '', '', 0, 0, 0, 0, '2020-08-06 23:36:56', 1),
(4120, 163, 0, 0, 11, 'Improve Efficiency of Fine Bubble Diffusers', '', '', 0, 0, 0, 0, '2020-08-06 23:36:56', 1),
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
(4444, 175, 0, 0, 11, 'Use digester gas in a dual fuel boiler', '', '', 0, 0, 0, 0, '2020-08-17 18:11:37', 1),
(4445, 175, 0, 0, 11, 'Clean and concentrate digester gas for sale to natural gas utility', '', '', 0, 0, 0, 0, '2020-08-17 18:11:37', 1),
(4446, 176, 0, 0, 11, 'Control UV Disinfection to minimum required', '', '', 0, 0, 0, 0, '2020-08-17 18:16:44', 1),
(4447, 126, 0, 0, 17, '', '/wiki/technologies/45', 'Pumps', 0, 0, 0, 0, '2020-08-17 20:33:44', 1),
(4506, 165, 0, 0, 26, 'What will we do next?', '', '', 0, 0, 0, 0, '2020-08-17 21:32:04', 1),
(4507, 165, 0, 0, 26, 'How can we get incentive program personnel involved (ETO, ESU, utility reps)?', '', '', 0, 0, 0, 0, '2020-08-17 21:32:04', 1),
(4546, 122, 0, 0, 2, 'Actual efficiency can easily vary from 50 percent to 80 percent for optimum operation of a particular pump', '', '', 0, 0, 0, 0, '2020-08-18 21:24:36', 1),
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
(4625, 157, 0, 0, 26, 'Develop a table of significant energy using equipment including collected rated capacity, estimated % of full capacity, and hours of operation', '', '', 0, 0, 0, 0, '2020-08-18 21:54:52', 1),
(4626, 157, 0, 1, 12, 'Calculate an initial estimate of annual energy used by each piece of equipment', '', '', 0, 0, 0, 0, '2020-08-18 21:54:52', 1),
(4627, 157, 0, 1, 12, 'Develop a pie chart showing % of total site energy each modeled equipment item uses, and remaining unidentified energy use.', '', '', 0, 0, 0, 0, '2020-08-18 21:54:52', 1),
(4628, 157, 0, 2, 14, 'Does the total modeled energy exceed the actual energy in the bills? (If so, revise the model.) ', '', '', 0, 0, 0, 0, '2020-08-18 21:54:52', 1),
(4629, 157, 0, 1, 12, 'Plan to continually revise and improve this balance over the process of the remote assessment.', '', '', 0, 0, 0, 0, '2020-08-18 21:54:52', 1),
(4630, 157, 0, 2, 14, 'Does more equipment come up that can be added?', '', '', 0, 0, 0, 0, '2020-08-18 21:54:52', 1),
(4631, 157, 0, 2, 14, 'Does better data become available on any modeled equipment to improve its annual energy use estimate?', '', '', 0, 0, 0, 0, '2020-08-18 21:54:52', 1),
(4632, 157, 0, 1, 17, '(Item not added yet)', 'osu.edu', 'Example Energy Balance', 0, 0, 0, 0, '2020-08-18 21:54:52', 1),
(4641, 161, 0, 0, 26, 'Review the client\'s web site', '', '', 0, 0, 0, 0, '2020-08-19 22:39:25', 1),
(4642, 161, 0, 0, 26, 'Develop a list of typical opportunities found in the site\'s industrial sector. BE SURE to add any newly identified opportunities to this site!', '', '', 0, 0, 0, 0, '2020-08-19 22:39:25', 1),
(4643, 161, 0, 1, 7, 'Assign each of the searches suggested below to one member of the assessment team. ', '', '', 0, 0, 0, 0, '2020-08-19 22:39:25', 1),
(4644, 161, 0, 1, 8, ' The IAC University Database allows you to search for common recommendations made by SIC or NAICS code ', '', '', 0, 0, 0, 0, '2020-08-19 22:39:25', 1),
(4645, 161, 0, 2, 24, '', 'https://iac.university/searchRecommendations', 'IAC University: Search IAC Recommendations', 1, 0, 0, 0, '2020-08-19 22:39:25', 1),
(4646, 161, 0, 2, 1, 'The IAC University Database also allows you to search for the top 10 recommendations, the number of assessments and results by industry grouping. Note: one useful search field under assessments: \"Product Type\" can help find similar assessments.', '', '', 0, 0, 0, 0, '2020-08-19 22:39:25', 1),
(4647, 161, 0, 1, 8, 'Search the OSU IAC Project Management Database to see what we have recommended in the past at similar sites. Note: the search box in the upper right corner is a useful tool for this.', '', '', 0, 0, 0, 0, '2020-08-19 22:39:25', 1),
(4648, 161, 0, 2, 24, '', 'https://eec.oregonstate.edu/tracking2/modules/login/login.php', 'EEC Project Management', 0, 0, 0, 0, '2020-08-19 22:39:25', 1),
(4649, 161, 0, 1, 8, 'General internet and literature research can surface new opportunities to consider.  BE SURE to add any newly identified resources to this site!', '', '', 0, 0, 0, 0, '2020-08-19 22:39:25', 1),
(4650, 161, 0, 2, 1, 'U.S.DOE, Vendor, Other IAC, State Energy Office, and Industrial Association web sites are all among good places to search for resources.', '', '', 0, 0, 0, 0, '2020-08-19 22:39:25', 1),
(4651, 161, 0, 1, 17, '(item not added yet)', 'abc.com', 'Example List of Common Opportunities', 0, 0, 0, 0, '2020-08-19 22:39:25', 1),
(4706, 180, 0, 0, 3, 'One PSI = 2.31 Feet of water', '', '', 0, 0, 0, 0, '2020-08-20 00:48:42', 1),
(4707, 180, 0, 0, 3, 'When designing a pump system it is important to consider the pump\'s net positive suction head required (NPSHR). A general design criteria is that the net positive suction head available (NPSHA) exceeds the NPSHR by at least 25% over the expected range of operating flow rates.', '', '', 0, 0, 0, 0, '2020-08-20 00:48:42', 1),
(4711, 178, 0, 0, 7, 'Install pressure gauges on all pump outlets for a key indicator of system performance.', '', '', 0, 0, 0, 0, '2020-08-20 22:33:47', 1),
(4712, 178, 0, 0, 7, 'Install a pressure gage at the inlets of pumps not drawing from a local reservoir for a 2nd key indicator of system performance', '', '', 1, 0, 0, 0, '2020-08-20 22:33:47', 1),
(4713, 178, 0, 0, 7, 'Install flow meters on high operating cost pumps or banks of pumps for a 3rd key indicator of system performance', '', '', 1, 0, 0, 0, '2020-08-20 22:33:47', 1),
(4714, 178, 0, 1, 8, 'Consider needs of temporary ultrasonic flow meters for pump installations that will not include an in-line flow meter. ', '', '', 1, 0, 0, 0, '2020-08-20 22:33:47', 1),
(4715, 178, 0, 0, 7, 'Operate pumps between 85% and 110% of their best efficiency point (BEP)', '', '', 0, 0, 0, 0, '2020-08-20 22:33:47', 1),
(4716, 178, 0, 0, 7, 'Use VFD control if the pump operates at multiple flow conditions, particularly for looped flow circuits.', '', '', 0, 0, 0, 0, '2020-08-20 22:33:47', 1),
(4717, 178, 0, 1, 4, 'For high static head conditions (pumping to high pressure vessel or high elevation tank) take care in evaluating pump operation with VFD control.  Pumps can be forced into low efficiency, high wear conditions with inappropriate high static head VFD control.', '', '', 1, 0, 0, 0, '2020-08-20 22:33:47', 1),
(4718, 178, 0, 0, 17, 'Comprehensive list of pump selection, installation, and operation best practices.', 'http://www.flowserve.com/sites/default/files/2016-07/pss-10-13.5-e.pdf', 'Flowserve: Best Practices for ANSI Pumps', 1, 0, 0, 0, '2020-08-20 22:33:47', 1),
(4760, 174, 0, 0, 26, 'A qualitative, visual strategy for designing a layout.', '', '', 0, 0, 0, 0, '2020-08-22 22:13:57', 0),
(4761, 174, 0, 0, 26, 'Begin with creating a matrix with every department listed as a header for columns and rows (see figure 1). This is known as a from/to diagram.', '', '', 0, 0, 0, 0, '2020-08-22 22:13:57', 0),
(4762, 174, 0, 0, 20, '', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPsAAADJCAMAAADSHrQyAAAAgVBMVEX///8AAABiYmLt7e2NjY3k5OTY2NidnZ24uLhNTU29vb339/fAwMA9PT2qqqodHR2Dg4NeXl44ODjd3d3n5+fu7u59fX309PSRkZGHh4fJycmkpKSxsbGlpaVTU1PU1NRzc3NFRUWXl5dqamoSEhIuLi4nJyczMzMYGBgcHBwTExNqJpk3AAARIElEQVR4nO2dC3eiOhCAJwIiDxEbBATkqXT3/v8feJMAgpB0bY1VS2fP2VMnMOaTJISZZAD4lfuIRWXwKRAdd7XydSTdoLruPpSoRjb/OHS18pWkAcAK+a9MAHwGjzUAjeoCbIEHGiCi0ZqjYIctBTxMTiUfsfe4qt8sjN0uXMJROuTPNcHGxsLTULrfBbrhwHZVWZsULbdZ4dOfQzfMNMmLCNAWIsN/YXjK7r1BVLXsBmFHOEJKCrYf6Xgb5UVAjkI51JAtAHQXb5GxoyoIqqWpP7b+twhjLyDKW/aCsvu57hF2N4jzU1TR5k3+7d4hI7/QofD3dasCqFT82PrfIox93bCT/h6pAdPZlH3v6OBG1fKCXXcAF1mjslaw3D6a4OtC2YPyoJMxrqycQ0jvcuUhjr3a0SOsH3SnJuyxQ9hr1jMyotswdtJO1ENsPprg6xLT/4KSDu9ZHOs7piRUWn2IAJalFzFdfAArAY8dVioRGfNIB9HBKl8YXSi4eHQNHidB9Oga/Mqv/Mqv/MqvfEWckKt2EUL85zJSwFN7RO9zT9BJCVrySk4CWxZCKdeUZHFKrtonN/W/CqcAAd9V4Rlk6s+F1xPRd9d8tUXs4294OFipDvfR018FVrqb6oUeGo/O/hKVU6LrwY73K5LrrnELvssLlDhmzPO27TdvNa+dbkSuuYad14ji49vbhvt8u35/4116wq5pnN9dsthbTfN5bZK2+ZpzUf77mJ', 'Figure 1 - From-to Matrix', 0, 0, 0, 0, '2020-08-22 22:13:57', 0),
(4763, 174, 0, 0, 26, 'Use this information to create a space-relation diagram. See figure 2.', '', '', 0, 0, 0, 0, '2020-08-22 22:13:57', 0),
(4764, 174, 0, 0, 20, '', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAATAAAACmCAMAAABqbSMrAAAAeFBMVEX////e3t7t7e309PRxcXH6+vrCwsKNjY11dXWTk5ODg4PT09OsrKy2trba2trp6elDQ0OioqLIyMiysrJqamoAAACJiYlLS0upqamcnJx+fn5dXV26urrOzs7Gxsbi4uIoKChhYWFSUlIeHh40NDRAQEA5OTkrKyuPAHKLAAAWMUlEQVR4nO2dDZuqqtfGEQRFBDfiMOKAnObsc57v/w0f1F6szLRpmvb5d18zZWZlv2Cx1uJFAL5B7rOa1Xv0HZ/6B4uo+ecNe8x5/DEi+fzz9AXsWC9gK/UCtlIvYCv1ArZSL2Ar9QK2Uj0w3G8KPPH8C9iJOmBo02/63T4/bEXd3QvYiTpgikeFzArDEh3uPTA5o0Ry2hW+F7ATdcAyToXNAC1ywokO+3xMbOLsq4RNKACTDmgbG5Q6k4d7CIg0ubFpm4AXsDMFYKIARW6VjbwvpFWhyBVAgAKFuxewM23dClyT4T4nx8+/gJ3o5Yet1AvYSr2ArdQL2Eq9gK3UC9hKvYCt1BgYlig8oghI5Ha9ay9gJ2pHwAzCIaIEusYaJNt9L2DHKt4P/ZKIAqBBBmSHy209/hewI7FsVMJgAJaABiTdjeDDzhewsTgF1ajnOwE4RgWNoBFAwmHfC9hIhqOYj2yYl/tNttv9XwaG/32b1+fx8Q3z8bFbgc+3/tPANlcOOAKGK0SS/20/DH9cOeB9tF1UWHasvheYj85VfOUN76o1wFwDsrLb+FZg4nde1zVNGxru82473P36whveVyuAWQrSwZf/VmCsPyNLch6MImKDa/c5+5JHajkwo2CFhk0iYTEjmHyphA1nJAigqanJ4Nr9gcAaFqW7feLvv8b6+++330c7/vqKydkDC9xdo0T/6I8DhuMi1MgLKnKJ7ndGW2ChaKncKji4eX8asCLGhl8+pn', 'Figure 2  - Space Relationship Diagram', 0, 0, 0, 0, '2020-08-22 22:13:57', 0),
(4765, 174, 0, 0, 26, 'Convert the space-relationship diagram into a facility layout.', '', '', 0, 0, 0, 0, '2020-08-22 22:13:57', 0),
(4822, 184, 0, 0, 26, 'First, calculate the D-scores for the original layout (D0) and the proposed layout (D1).', '', '', 0, 0, 0, 0, '2020-08-24 19:51:09', 0),
(4823, 184, 0, 0, 26, 'Calculate layout efficiency savings by finding the percent difference in d-scores (i.e. D0 - D1 / D1).', '', '', 0, 0, 0, 0, '2020-08-24 19:51:09', 0),
(4824, 184, 0, 0, 26, 'Layout efficiency savings are an important measure in itself and will result in increased productivity, however, translating this figure into monetary cost savings is necessary.', '', '', 0, 0, 0, 0, '2020-08-24 19:51:09', 0),
(4842, 189, 0, 0, 17, 'This guide provides information on the fundamentals of power factor, how to improve power factor, example savings calculations for mulitple scenarios, and how to select the right capactior specific applications. Information on harmonics is also included.', 'https://www.eaton.com/ecm/groups/public/%40pub/%40electrical/documents/content/sa02607001e.pdf', 'Eaton - Power Factor Correction: A Guide for the Plant Engineer', 1, 0, 0, 0, '2020-10-13 20:21:27', 1),
(4843, 189, 0, 0, 17, 'This manual provides technical information for assessing many systems that are commonly found in small to medium sized industrial manufacturing facilities. Chapter 4 section 4.1.4 specifically addresses power factor improvement.', 'https://iac.university/technicalDocs/industr/ch4.pdf', 'Essentials of Industrial Assessments, Chapter 4, Electricity', 1, 0, 0, 0, '2020-10-13 20:21:28', 1),
(4844, 189, 0, 0, 23, 'This video produced by the The Engineering Mindset on YouTube explains what power factor is, how to calculate power factor, what poor power factor is, and how resistors and capacitors affect power factor.', 'https://www.youtube.com/watch?v=Tv_7XWf96gg', 'Power Factor Explained', 1, 0, 0, 0, '2020-10-13 20:21:29', 1),
(4956, 196, 0, 0, 26, 'The Federal Communications Commission released ten tips for small business cyber security after meeting with public and private leaders.', '', '', 0, 0, 0, 0, '2020-08-27 00:40:27', 1),
(4957, 196, 0, 1, 24, ' ', 'https://www.fcc.gov/general/cybersecurity-small-business', 'Cybersecurity for Small Business', 1, 0, 0, 0, '2020-08-27 00:40:27', 1),
(4958, 196, 0, 0, 26, 'The Cybersecurity and Infrastructure Security Agency (CISA, a part of the US Department of Homeland Security) also has resources focused on increasing the security of industrial control systems.', '', '', 1, 0, 0, 0, '2020-08-27 00:40:27', 1),
(4959, 196, 0, 1, 24, ' ', 'https://us-cert.cisa.gov/ics', 'Industrial Control Systems', 1, 0, 0, 0, '2020-08-27 00:40:27', 1),
(4971, 185, 0, 0, 26, 'Cost savings from improved layouts are the result of reduced material handling costs. Material handling costs typically refer to time and energy spent using manual labor, vehicles (e.g. forklifts), or conveyors to move product or inventory around the facility. ', '', '', 0, 0, 0, 0, '2020-08-29 20:20:27', 0),
(4972, 185, 0, 0, 26, 'For rough estimates of cost savings, calculating the cost of work flow of the original layout and multiplying it by the layout efficiency savings will suffice. For example, if it costs $1,000/day to move materials, and the layout efficiency savings are 10%, then savings are $100/day. ', '', '', 0, 0, 0, 0, '2020-08-29 20:20:27', 0),
(4973, 185, 0, 0, 26, 'Calculating daily material handling costs are most easily estimated using hourly operating costs of material handling systems and how long the specific system operates a day.', '', '', 0, 0, 0, 0, '2020-08-29 20:20:27', 0),
(4974, 185, 0, 0, 26, 'For more precise estimates, reduction in work flow for each work unit (e.g. inventory, personnel, etc.) needs to be determined. ', '', '', 0, 0, 0, 0, '2020-08-29 20:20:27', 0),
(4978, 166, 0, 0, 10, 'Significant levels of work in progress (WIP) inventory immediately upstream of a workstation.', '', '', 0, 0, 0, 0, '2020-09-02 21:55:04', 0),
(4979, 166, 0, 0, 10, 'Machine or workstation with prolonged down times.', '', '', 0, 0, 0, 0, '2020-09-02 21:55:04', 0),
(4982, 199, 0, 0, 1, 'Alleviating bottlenecks is often the most valuable productivity opportunity. ', '', '', 0, 0, 0, 0, '2020-09-02 22:07:11', 0),
(4983, 199, 0, 0, 1, 'Basic analysis and cost savings estimation requires few variable values.', '', '', 0, 0, 0, 0, '2020-09-02 22:07:11', 0),
(4984, 200, 0, 0, 2, 'Precise analysis requires a deep understanding of how the entire production line operates. Statistics based simulation is often the only way to achieve this.', '', '', 0, 0, 0, 0, '2020-09-02 22:11:35', 0),
(4985, 200, 0, 0, 2, 'Unless time studies on how product flows into and out of the workstation are conducted, several assumptions are required even for basic analysis.', '', '', 0, 0, 0, 0, '2020-09-02 22:11:35', 0),
(5005, 201, 0, 0, 26, 'In its simplest form, a workstation with one machine and one queue can be represented as a markov chain in a \"birth-death\" process. ', '', '', 0, 0, 0, 0, '2020-09-03 21:21:21', 0),
(5006, 201, 0, 0, 26, 'A markov chain is a set of states where the probability or rate at which a state is active is not dependent on its history/prior states.', '', '', 0, 0, 0, 0, '2020-09-03 21:21:21', 0),
(5007, 201, 0, 0, 26, 'In a birth-death process of a simple process (one workstation and queue), the birth rate is the rate at which product enters the system (inter-arrival times) while the death rate is the rate at which product leaves the system (effective processing times).', '', '', 0, 0, 0, 0, '2020-09-03 21:21:21', 0),
(5008, 201, 0, 0, 20, '', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAeUAAABoCAMAAAD4txjiAAAAjVBMVEX///8AAAD39/doaGj6+vrw8PDU1NRfX1/s7Ozz8/Po6Oj29vby8vLg4ODr6+vOzs5ISEiHh4fa2tpvb2++vr7IyMimpqZ8fHx5eXnQ0NBxcXG3t7dqamrCwsKRkZGxsbFWVlZQUFCfn5+Tk5OioqIzMzNBQUEjIyMbGxtDQ0MLCws5OTkYGBgrKys0NDRN/y7SAAAVlklEQVR4nO1deX+rqNd3QTEmxOACxl3M0i3z/l/eg0nbm0SCuKTTeX73+8f9TKf2iBzOfgBN+4u/+Iu/+Iv/91gb89GylvPR+hEsZhnwcjEHlacClvPRwsV8tH4EBM9BJUpmlJTnoDDnE8DwH2s2Wj+CUJ+Div/x6z97pdvzEdNnVAw/gnk0GZ5FJTwT3oycsXQMZiP2E0B7cwYq6+o0A5WnwjxtZqPVHA9oNmI/gfKwn0GTbfcv0XQqz8TqENW+xkw8g2kx6jxOuTMyh3z8CKzKrhoNu+cfAB3LqizFgVb4841rdjSVhk031sp8Oq30TUtP2jaB00n9DPz3dX6wMMr5EgflfiSXjZONjqjxvV+rxxY10aJ9SrR8OpcBjbm7iZb2f0aWaaGtjwhj3EZC1lhZJvx7TzkrqDvr4GaEV/F/gpizejqX3Yov5qLR0H9Glmv+0eUufo+WGR8zHsllPntaVODDb48vjNhuvNmo+dVspH4E2INnKRxtl88otvEvd8E0lObzpW+McCqF7RzDUIat2WdHO5rkgNoAzcbl7XouSr8Z+gd1f39u+Hlo9E1o/bcyD4NguP428nSOemeD+9+dsd5y+O7q3xngs7FGthfF/Ps/aDjJZ3ftlDBKM/MLWYwppayMBpFd2yHZURx8kzETToUWJBoTOfoRaWhiwsrMaKCf8RbfOK2A1dUZMMsyWFVZgtm4d9lRSTB/2Z8JaA', 'Birth Death Markov Chain', 0, 0, 0, 0, '2020-09-03 21:21:21', 0),
(5111, 202, 0, 0, 31, 'The History Report tool displays all content added or edited during a selected date range.', '%zXz%', '%zXz%', 0, 0, 0, 0, '2020-09-04 20:46:22', 0),
(5112, 202, 0, 1, 26, 'A header on each entry shows the type of material (page, header, or card) added, edited or deleted, the name and location of the material, and the date/time of the update.', '', '', 0, 0, 0, 0, '2020-09-04 20:46:22', 0),
(5113, 202, 0, 1, 8, 'Select \"Show Duplicates\" to view a complete history of all edits made to all pages, headers, and cards. Red highlighted content consists of old edits while green highlighted content is the most recent edit made during the selected date range. Yellow highlighted content is material that was only added or updated once. Unhighlighted content predates the selected date range. ', '', '', 0, 0, 0, 0, '2020-09-04 20:46:22', 0),
(5114, 202, 0, 1, 8, 'Unselect \"Show Duplicates\" to display only the most recent edit made to a page, header, or card.', '', '', 0, 0, 0, 0, '2020-09-04 20:46:22', 0),
(5115, 202, 0, 1, 8, 'Select \"Show Removals\" to view deleted content. ', '', '', 0, 0, 0, 0, '2020-09-04 20:46:22', 0),
(5156, 207, 0, 0, 26, 'From the main sidebar menu, go to the Publish Requests page.', '', '', 0, 0, 0, 0, '2020-09-08 17:53:50', 0),
(5157, 207, 0, 0, 26, 'Find the publish request you wish to review from the list of live requests and click on the green Review Request button. ', '', '', 0, 0, 0, 0, '2020-09-08 17:53:50', 0),
(5158, 207, 0, 0, 26, 'A page will open where users can view the currently published content as well as the content to be approved. Users can also add comments, suggest changes, and give approval. Similar to a chatroom format, these entries appear in chronological order which allows for an ongoing dialogue between the author and reviewers. ', '', '', 0, 0, 0, 0, '2020-09-08 17:53:50', 0),
(5159, 207, 0, 0, 8, 'Click \"Close Request\" to delete a publish request. ', '', '', 0, 0, 0, 0, '2020-09-08 17:53:50', 0),
(5160, 203, 0, 0, 31, 'New and updated content must be approved before being published to the site. Multiple items can be submitted for approval in a single publish request. ', '%zXz%', '%zXz%', 0, 0, 0, 0, '2020-09-08 18:03:24', 0),
(5161, 203, 0, 1, 26, 'To add a page, header or card to a publish request, go to the content in Edit Mode and click the green review button.', '', '', 0, 0, 0, 0, '2020-09-08 18:03:24', 0),
(5162, 203, 0, 1, 26, 'After all items have been added, go to the Publish Requests page and select Create a Publish Request. Add a title and include the author\'s and reviewer\'s name as well as any additional notes in the description. ', '', '', 0, 0, 0, 0, '2020-09-08 18:03:24', 0),
(5163, 203, 0, 1, 26, 'Double-check that the Content to Publish includes the intended material then submit the publish request. ', '', '', 0, 0, 0, 0, '2020-09-08 18:03:24', 0),
(5164, 203, 0, 1, 8, 'Be reasonable and strategic with what material is lumped together in a single publish request. Submitting two unrelated technology pages together for example will probably just bog down the review process. ', '', '', 0, 0, 0, 0, '2020-09-08 18:03:24', 0),
(5181, 208, 0, 0, 31, 'It is always important to cite where information is coming from. A library of sources exists on each page that referenced within content-carrying cards. ', '%zXz%', '%zXz%', 0, 0, 0, 0, '2020-09-08 18:57:38', 0),
(5182, 208, 0, 1, 26, 'To add a reference, click \"Add Source\" in the header of any page in Edit Mode. ', '', '', 0, 0, 0, 0, '2020-09-08 18:57:38', 0),
(5183, 208, 0, 1, 26, 'Use IEEE formatting for all references and include a URL if applicable. ', '', '', 0, 0, 0, 0, '2020-09-08 18:57:38', 0),
(5184, 208, 0, 1, 26, 'To connect a source to an item, click \"Edit Card\" and use the source dropdown menu to the right of the item to select the source. ', '', '', 0, 0, 0, 0, '2020-09-08 18:57:38', 0),
(5185, 208, 0, 1, 17, '', 'https://oregonstate.box.com/s/rm1jtvnmfhb2oyt1wyvzaztgc3w1ww5q', 'IEEE Reference Guide', 0, 0, 0, 0, '2020-09-08 18:57:38', 0),
(5188, 204, 0, 0, 31, 'To create a new page, first open the sidebar menu and select \"Show Edit Buttons\" near the bottom of the menu. Simply select the category for the new page and click \"Create a Page\". ', '%zXz%', '%zXz%', 0, 0, 0, 0, '2020-09-08 21:47:25', 0),
(5189, 204, 0, 1, 26, 'A page consists of a concise yet descriptive title, a summary of the page\'s purpose, and a description of what can be found on the page and how it can be used. ', '', '', 0, 0, 0, 0, '2020-09-08 21:47:25', 0),
(5190, 204, 0, 1, 26, 'Within a page editors can create headers and cards. Headers allow for content-carrying cards to be organized into sections and categories.', '', '', 0, 0, 0, 0, '2020-09-08 21:47:25', 0),
(5287, 187, 0, 0, 2, 'Capacitors can amplify harmonics if nonlinear loads are present. Examples of nonlinear loads include variable frequency drives, induction furnaces, arc welders and arc furnaces.', '', '', 0, 0, 0, 4, '2020-09-09 17:57:39', 1),
(5303, 186, 0, 0, 1, 'Improving power factor extends equipment life by reducing the total line current which reduces operating temperatures.', '', '', 0, 0, 0, 0, '2020-09-09 18:12:30', 1),
(5304, 186, 0, 0, 1, 'Improving power factor can significantly reduce monthly electrical utility charges.', '', '', 0, 0, 0, 0, '2020-09-09 18:12:30', 1),
(5305, 186, 0, 0, 1, 'Capacitors have no moving parts and require little to no maintenance. It is recommended to check fuses on a regular basis. All capacitors should be checked annually to ensure proper operation.', '', '', 0, 0, 0, 5, '2020-09-09 18:12:30', 1),
(5788, 222, 0, 0, 17, 'This report details the vehicle assembly process and common energy saving opportunities associated with each step. References to case studies, implementation costs and payback periods are included. Opportunities are included for the following systems: motors, compressed air, steam, lighting, HVAC, materials handling, painting and stamping.', 'https://www.osti.gov/biblio/927881', 'Energy Efficiency Improvement and Cost Saving Opportunities for the Vehicle Assembly Industry', 1, 0, 0, 0, '2020-09-15 19:40:23', 1),
(5830, 224, 0, 0, 26, 'Generally, different classes of rate schedules are assigned to consumers based on the application of and type of electricity demanded.', '', '', 0, 0, 0, 0, '2020-09-17 19:57:57', 0),
(5831, 224, 0, 1, 26, 'An industrial, three-phase rate schedule is commonly assigned to industry consumers.', '', '', 0, 0, 0, 0, '2020-09-17 19:57:57', 0),
(5832, 224, 0, 0, 26, 'The specific details and charges of a rate schedule often varies depending on the electric company.  ', '', '', 0, 0, 0, 0, '2020-09-17 19:57:57', 0),
(5833, 224, 0, 1, 26, 'Consult the rate schedule provided by your electric company for your rates and charges.', '', '', 0, 0, 0, 0, '2020-09-17 19:57:57', 0),
(5834, 225, 0, 0, 26, 'Base Charge', '', '', 0, 0, 0, 0, '2020-09-17 19:59:38', 0),
(5835, 225, 0, 0, 26, 'Metered Demand', '', '', 0, 0, 0, 0, '2020-09-17 19:59:38', 0),
(5836, 225, 0, 0, 26, 'Reactive Power', '', '', 0, 0, 0, 0, '2020-09-17 19:59:38', 0),
(5837, 225, 0, 0, 26, 'City Tax', '', '', 0, 0, 0, 0, '2020-09-17 19:59:38', 0),
(5838, 225, 0, 0, 26, 'Public Purpose Charge', '', '', 0, 0, 0, 0, '2020-09-17 19:59:38', 0),
(5965, 105, 0, 0, 15, 'Condensate flow and temperature', '', '', 1, 0, 0, 0, '2020-09-21 17:02:20', 1),
(5966, 105, 0, 0, 11, 'Return more/all condensate back to the boiler', '', '', 0, 0, 0, 0, '2020-09-21 17:02:20', 1),
(5967, 105, 0, 0, 11, 'Recover Flash Steam', '', '', 0, 0, 0, 0, '2020-09-21 17:02:20', 1),
(5968, 105, 0, 1, 10, 'Steam being released into atmosphere from the boiler system', '', '', 0, 0, 0, 0, '2020-09-21 17:02:20', 1),
(5969, 105, 0, 1, 1, 'Payback period is usually within a year', '', '', 0, 0, 0, 0, '2020-09-21 17:02:20', 1),
(5970, 105, 0, 1, 1, 'Condensate does not require any chemical treatment other than condensate polishing. ', '', '', 0, 0, 0, 0, '2020-09-21 17:02:20', 1),
(5971, 105, 0, 2, 8, 'A condensate polisher is similar to a water softener. Polishing removes the trace amount of mineral that are dissolved in the condensate after running though the boiler. ', '', '', 0, 0, 0, 0, '2020-09-21 17:02:20', 1),
(5972, 105, 0, 1, 1, 'Capturing and reusing the steam can reduce hog fuel by 14.5%', '', '', 0, 0, 0, 0, '2020-09-21 17:02:20', 1),
(5973, 105, 0, 1, 2, 'Maintenance crews will need training to work with steam recovery systems', '', '', 0, 0, 0, 0, '2020-09-21 17:02:20', 1),
(5974, 105, 0, 1, 2, 'There are usually no incentives for this opportunity, because the system usually pays for itself within a year.', '', '', 0, 0, 0, 0, '2020-09-21 17:02:20', 1),
(5975, 105, 0, 1, 3, 'A good recovery system can collect up to 80%', '', '', 0, 0, 0, 0, '2020-09-21 17:02:20', 1),
(5976, 105, 0, 1, 3, 'Steam recovery is most efficient when waste heat is high and flow is continuous', '', '', 0, 0, 0, 0, '2020-09-21 17:02:20', 1),
(5977, 105, 0, 1, 8, 'Multiple different types of steam traps available to fit company needs: Mechanical, Thermodynamic, or Thermostatic', '', '', 0, 0, 0, 0, '2020-09-21 17:02:20', 1),
(5978, 105, 0, 1, 23, 'Explains how steam traps work, brief history and lists several different types of traps in detail.', 'https://www.youtube.com/watch?v=IiRyxcCBTa0', 'Let\'s Talk Steam Traps', 1, 0, 0, 0, '2020-09-21 17:02:20', 1),
(5979, 105, 0, 1, 17, 'Contains specific information about flash steam recovery', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam12_lowpressure_steam.pdf', 'DOE Tip Sheet Flash Steam Recovery', 1, 0, 0, 0, '2020-09-21 17:02:20', 1),
(5980, 105, 0, 1, 24, 'Contains several pages with useful calculations for steam systems. This link leads to the flash steam page.', 'https://www.tlv.com/global/US/steam-theory/introduction-to-condensate-recovery.html', 'TLV Steam Theory', 1, 0, 0, 0, '2020-09-21 17:02:20', 1),
(5981, 105, 0, 1, 21, '', 'https://oregonstate.app.box.com/file/337450150435', 'Flash Steam Recovery', 0, 0, 0, 0, '2020-09-21 17:02:20', 1),
(6206, 230, 0, 0, 26, 'Base charge', '', '', 0, 0, 0, 0, '2020-09-23 21:55:38', 0),
(6207, 230, 0, 0, 26, 'Supply rate', '', '', 0, 0, 0, 0, '2020-09-23 21:55:38', 0),
(6208, 230, 0, 0, 26, 'Transport fees', '', '', 0, 0, 0, 0, '2020-09-23 21:55:38', 0),
(6209, 230, 0, 0, 26, 'City tax', '', '', 0, 0, 0, 0, '2020-09-23 21:55:38', 0),
(6210, 230, 0, 0, 26, 'Public purpose charge', '', '', 0, 0, 0, 0, '2020-09-23 21:55:38', 0),
(6231, 232, 0, 0, 26, 'Generally, water companies assign different classes of rate schedules depending on the application.', '', '', 0, 0, 0, 0, '2020-09-23 22:25:06', 0),
(6232, 232, 0, 1, 26, 'An industrial or commercial rate schedule is often assigned to industry consumers', '', '', 0, 0, 0, 0, '2020-09-23 22:25:06', 0),
(6233, 232, 0, 0, 26, 'The specific details and charges of a rate schedule often varies depending on the water company.', '', '', 0, 0, 0, 0, '2020-09-23 22:25:06', 0),
(6234, 232, 0, 1, 26, 'Consult the rate schedule provided by your electric company for your rates and charges.', '', '', 0, 0, 0, 0, '2020-09-23 22:25:06', 0);
INSERT INTO `Items` (`itemId`, `cardId`, `orderIndex`, `indentation`, `iconType`, `contentText`, `contentUrl`, `contentLabel`, `contentMode`, `internal`, `inline`, `sourceId`, `created`, `approved`) VALUES
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
(6528, 223, 0, 1, 28, '', 'https://walkthrough.eec.oregonstate.edu/wiki/utilities/61', 'Power Factor Correction', 0, 0, 0, 0, '2020-10-16 21:38:02', 0),
(6546, 101, 0, 0, 11, 'Tune the boiler regularly', '', '', 0, 0, 0, 0, '2020-10-29 21:53:26', 1),
(6547, 101, 0, 1, 10, 'O2 readings in the exhaust are high for the fuel type (>3% for gaseous fuels, >8% for solid fuels)', '', '', 0, 0, 0, 0, '2020-10-29 21:53:26', 1),
(6548, 101, 0, 1, 15, 'Combustion analysis at representative firing rates (high, medium, low, standby)', '', '', 0, 0, 1, 0, '2020-10-29 21:53:26', 1),
(6549, 101, 0, 1, 15, 'Firing rate over time', '', '', 0, 0, 1, 0, '2020-10-29 21:53:26', 1),
(6550, 101, 0, 1, 21, 'An OSU EEC Analysis Template in Microsoft Excel Format (unapproved, old style)', 'https://drive.google.com/file/d/1Z9GbxV0nr-OuxT2cNLxkdo82Wpq-h70m/view?usp=sharing', 'Boiler Tune Template', 0, 0, 0, 0, '2020-10-29 21:53:26', 1),
(6551, 101, 0, 0, 11, 'Install O2 Controls to maintain optimum combustion efficiency throughout the operating range', '', '', 0, 0, 0, 0, '2020-10-29 21:53:26', 1),
(6552, 101, 0, 1, 10, 'The boiler spends a significant portion of time at partial fire and lower efficiency', '', '', 0, 0, 0, 0, '2020-10-29 21:53:26', 1),
(6553, 101, 0, 0, 11, 'Clean heat exchanger surfaces and reduce the exhaust temperature', '', '', 0, 0, 0, 0, '2020-10-29 21:53:26', 1),
(6554, 101, 0, 1, 10, 'Stack temperature exceeds steam temperature by over 150 ˚F', '', '', 0, 0, 0, 0, '2020-10-29 21:53:26', 1),
(6555, 101, 0, 1, 12, 'Clean the fire side. Soot can accumulate and inhibit heat transfer.', '', '', 0, 0, 0, 0, '2020-10-29 21:53:26', 1),
(6556, 101, 0, 1, 12, 'Clean the water side. Scale can accumulate and inhibit heat transfer is the water chemistry is off', '', '', 0, 0, 0, 0, '2020-10-29 21:53:26', 1),
(6557, 101, 0, 0, 11, 'Install an economizer', '', '', 0, 0, 0, 0, '2020-10-29 21:53:26', 1),
(6558, 101, 0, 1, 10, 'Boilers rated at 100 BoHP or higher operating at greater than 75 psig.', '', '', 0, 0, 0, 0, '2020-10-29 21:53:26', 1),
(6559, 101, 0, 1, 31, 'Economizers can be used to preheat incoming feedwater, reducing the energy required for boiling.', '%zXz%', '%zXz%', 0, 0, 0, 0, '2020-10-29 21:53:26', 1),
(6560, 101, 0, 1, 3, 'Typically increases efficiency by around 2-4%.', '', '', 0, 0, 0, 0, '2020-10-29 21:53:26', 1),
(6561, 101, 0, 1, 3, 'For every 40°F decrease in flue gas temperature there is a 1% increase in efficiency', '', '', 0, 0, 0, 0, '2020-10-29 21:53:26', 1),
(6562, 101, 0, 1, 3, 'Can often reduce fuel requirements by 10%', '', '', 0, 0, 0, 0, '2020-10-29 21:53:26', 1),
(6563, 101, 0, 1, 8, 'Best suited for boilers with flue gasses containing sulfur or other potentially acidic elements/compounds.', '', '', 0, 0, 0, 0, '2020-10-29 21:53:26', 1),
(6564, 101, 0, 1, 4, 'Flue gasses containing sulphur must remain above dew point. Condensation of sulphuric acid can cause corrosion and damage the system.', '', '', 0, 0, 0, 0, '2020-10-29 21:53:26', 1),
(6565, 101, 0, 1, 2, 'Cannot recover as much energy from the boiler stack as a condensing economizer.', '', '', 0, 0, 0, 0, '2020-10-29 21:53:26', 1),
(6566, 101, 0, 1, 14, 'Does the boiler contain potentially acidic elements/compounds such as sulfur?', '', '', 0, 0, 0, 0, '2020-10-29 21:53:26', 1),
(6567, 101, 0, 1, 14, 'Would a condensing economizer be a better alternative?', '', '', 0, 0, 0, 0, '2020-10-29 21:53:26', 1),
(6568, 101, 0, 1, 14, 'Is there adequate space for an economizer?', '', '', 0, 0, 0, 0, '2020-10-29 21:53:26', 1),
(6569, 101, 0, 1, 14, 'What is the greatest temperature that the flue gasses can be reduced by without causing condensation?', '', '', 0, 0, 0, 0, '2020-10-29 21:53:26', 1),
(6570, 101, 0, 1, 27, 'Combustion analyzer', '', '', 0, 0, 0, 0, '2020-10-29 21:53:26', 1),
(6571, 101, 0, 1, 15, 'Flue gas temperature', '', '', 0, 0, 1, 0, '2020-10-29 21:53:26', 1),
(6572, 101, 0, 1, 15, 'Fuel used', '', '', 0, 0, 1, 0, '2020-10-29 21:53:26', 1),
(6573, 101, 0, 1, 15, 'Operating hours', '', '', 0, 0, 1, 0, '2020-10-29 21:53:26', 1),
(6574, 101, 0, 1, 15, 'Water mass flowrate', '', '', 0, 0, 1, 0, '2020-10-29 21:53:26', 1),
(6575, 101, 0, 1, 15, 'Water temperatures', '', '', 0, 0, 1, 0, '2020-10-29 21:53:26', 1),
(6576, 101, 0, 1, 15, 'Steam temperature and pressure', '', '', 0, 0, 1, 0, '2020-10-29 21:53:26', 1),
(6577, 101, 0, 1, 15, 'Boiler efficiency', '', '', 0, 0, 1, 0, '2020-10-29 21:53:26', 1),
(6578, 101, 0, 1, 17, 'Department of Energy tip sheet that provides an example case study of a boiler feedwater economizer being installed, as well as general considerations.', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam3_recovery.pdf', 'Use Feedwater Economizers for Waste Heat Recovery', 1, 0, 0, 0, '2020-10-29 21:53:26', 1),
(6579, 101, 0, 0, 11, 'Install a condensing economizer', '', '', 0, 0, 0, 0, '2020-10-29 21:53:26', 1),
(6580, 101, 0, 1, 10, 'Boilers rate at 100 BoHP or higher operating at greater that 75 psig that do not user fuels with sulphurous products.', '', '', 0, 0, 0, 0, '2020-10-29 21:53:26', 1),
(6581, 101, 0, 1, 3, 'Can increase efficiency by up to 10%', '', '', 0, 0, 0, 0, '2020-10-29 21:53:26', 1),
(6582, 101, 0, 1, 3, 'Can increase boiler efficiency to over 90%', '', '', 0, 0, 0, 0, '2020-10-29 21:53:26', 1),
(6583, 101, 0, 1, 1, 'Can recover more energy from the boiler stack by reducing flue gas temperature below dew point.', '', '', 0, 0, 0, 0, '2020-10-29 21:53:26', 1),
(6584, 101, 0, 1, 2, 'Not recommended for use with fuels containing sulphur.', '', '', 0, 0, 0, 0, '2020-10-29 21:53:26', 1),
(6585, 101, 0, 1, 2, 'The condensed water may be acidic, requiring treatment before being disharged to sewer systems.', '', '', 0, 0, 0, 0, '2020-10-29 21:53:26', 1),
(6586, 101, 0, 1, 4, 'Fuels with sulphurous combustions can damage the boiler stack when condensing, creating sulphuric acid.', '', '', 0, 0, 0, 0, '2020-10-29 21:53:26', 1),
(6587, 101, 0, 1, 4, 'Boiler stacks are prone to corrosion due to water condensation.', '', '', 0, 0, 0, 0, '2020-10-29 21:53:26', 1),
(6588, 101, 0, 1, 14, 'Does the boiler\'s fuel contain potentially acidic elements/compounds such as sulfur?', '', '', 0, 0, 0, 0, '2020-10-29 21:53:26', 1),
(6589, 101, 0, 1, 14, 'What is the greatest temperature the flue gasses can be reduced by?', '', '', 0, 0, 0, 0, '2020-10-29 21:53:26', 1),
(6590, 101, 0, 1, 27, 'Combustion analyzer', '', '', 0, 0, 0, 0, '2020-10-29 21:53:26', 1),
(6591, 101, 0, 1, 15, 'Flue gas temperature', '', '', 0, 0, 1, 0, '2020-10-29 21:53:26', 1),
(6592, 101, 0, 1, 15, 'Flue gas composition', '', '', 0, 0, 1, 0, '2020-10-29 21:53:26', 1),
(6593, 101, 0, 1, 15, 'Fuel used', '', '', 0, 0, 1, 0, '2020-10-29 21:53:26', 1),
(6594, 101, 0, 1, 15, 'Operating hours', '', '', 0, 0, 1, 0, '2020-10-29 21:53:26', 1),
(6595, 101, 0, 1, 15, 'Water mass flowrate', '', '', 0, 0, 1, 0, '2020-10-29 21:53:26', 1),
(6596, 101, 0, 1, 15, 'Water temperatures', '', '', 0, 0, 1, 0, '2020-10-29 21:53:26', 1),
(6597, 101, 0, 1, 15, 'Steam temperature/pressure', '', '', 0, 0, 1, 0, '2020-10-29 21:53:26', 1),
(6598, 101, 0, 1, 15, 'Boiler efficiency', '', '', 0, 0, 1, 0, '2020-10-29 21:53:26', 1),
(6599, 101, 0, 1, 12, 'Complete a more in-depth study evaluating the benefits of a condensing economizer and how it may impact the water and how the boiler operates.', '', '', 0, 0, 0, 0, '2020-10-29 21:53:26', 1),
(6600, 101, 0, 1, 12, 'Contact a vendor for more implementation details. Condensing economizers are custom made for each boiler.', '', '', 0, 0, 0, 0, '2020-10-29 21:53:26', 1),
(6601, 101, 0, 1, 24, 'This webpage lists the epcific heats and gas constants for different gasses. This is uesd for calculating the properties of the flue gasses.', 'https://www.engineeringtoolbox.com/specific-heat-capacity-gases-d_159.html', 'Specific Heat and Individual Gas Constant of Gases', 1, 0, 0, 0, '2020-10-29 21:53:26', 1),
(6602, 101, 0, 1, 17, 'Department of Energy tip sheet that explains how a condensing economizer works and how it saves energy, along with example scenarios', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam26a_condensing.pdf', 'Consider Installing a Condensing Economizer', 1, 0, 0, 0, '2020-10-29 21:53:26', 1),
(6603, 101, 0, 1, 17, 'Department of Energy tip sheet that explains special considerations that need to be taken into account when choosing to do projects with condensing economizers.', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam26b_condensing.pdf', 'Considerations When Selecting a Condensing Economizer', 1, 0, 0, 0, '2020-10-29 21:53:26', 1),
(6772, 158, 0, 0, 26, 'Review any areas of concern or interest voiced by the client', '', '', 0, 0, 0, 0, '2020-11-20 15:49:57', 1),
(6773, 158, 0, 0, 26, 'Review typical opportunities found in the energy intensive systems identified at the facility ', '', '', 0, 0, 0, 0, '2020-11-20 15:49:57', 1),
(6774, 158, 0, 1, 8, 'This Industrial Walkthrough Checklist & Reference will offer more and more ideas for potential opportunities as it is developed over time', '', '', 0, 0, 0, 0, '2020-11-20 15:49:57', 1),
(6775, 158, 0, 0, 26, 'Review the list of typical opportunities found in the site\'s industrial sector developed in Preliminary Research', '', '', 0, 0, 0, 0, '2020-11-20 15:49:57', 1),
(6776, 158, 0, 0, 26, 'Pick the brain of anyone with experience in the subject', '', '', 0, 0, 0, 0, '2020-11-20 15:49:57', 1),
(6777, 158, 0, 0, 26, 'Brainstorm on opportunities as a team and compile a list', '', '', 0, 0, 0, 0, '2020-11-20 15:49:57', 1),
(6778, 158, 0, 0, 26, 'Develop a table of potential recommendations, and if possible: total energy used by the system related to each opportunity, a high/low estimate of potential % savings,  and the range of potential cost and energy savings potential.', '', '', 0, 0, 0, 0, '2020-11-20 15:49:57', 1),
(6779, 158, 0, 1, 17, '(Item not added yet)', 'osu.edu', 'Example Table of Potential Opportunities', 0, 0, 0, 0, '2020-11-20 15:49:57', 1),
(6780, 158, 0, 1, 8, 'Once you have a table of potential recommendations, make a data collection checklist for each recommendation and keep it up to date as you continue to work with the client. The data collection checklist should include all the information you need to develop each opportunity into a recommendation.', '', '', 0, 0, 0, 0, '2020-11-20 15:49:57', 1),
(6781, 158, 0, 1, 26, 'Review any documents or information you already have and start checking things off your data collection checklist.', '', '', 0, 0, 0, 0, '2020-11-20 15:49:57', 1),
(6782, 158, 0, 1, 26, 'For the information you don\'t have, make requests to the client over time or consider sharing the entire data collection checklist with them. If the checklist is lengthy, consider the first option and request information for one or two systems at a time so they remain engaged. In either case, the checklist that you share with the client should be formatted nicely. It should be clear exactly which system or piece of equipment you are talking about. ', '', '', 0, 0, 0, 0, '2020-11-20 15:49:57', 1),
(6783, 162, 0, 0, 31, 'This is a requirement for U.S.DOE to accept our remote assessment as a deliverable on our contract. It might be done in one session or iteratively in multiple sessions.', '%zXz%', '%zXz%', 0, 0, 0, 0, '2020-11-20 15:52:48', 1),
(6784, 162, 0, 0, 26, 'Begin with a review of preparatory work including the intitial energy balance, and list of possible opportunities.', '', '', 0, 0, 0, 0, '2020-11-20 15:52:48', 1),
(6785, 162, 0, 0, 26, 'Discuss the best strategy to use for a Guided Remote Tour. This might be: ', '', '', 0, 0, 0, 0, '2020-11-20 15:52:48', 1),
(6786, 162, 0, 1, 12, 'A standard tour of the process from start to finish, but this could be an overly long time for a Zoom meeting. ', '', '', 0, 0, 0, 0, '2020-11-20 15:52:48', 1),
(6787, 162, 0, 1, 12, 'A series of shorter remote targeted tours of areas of specific interest. ', '', '', 0, 0, 0, 0, '2020-11-20 15:52:48', 1),
(6788, 162, 0, 2, 8, 'This strategy is being used by a number of assessment teams', '', '', 0, 0, 0, 0, '2020-11-20 15:52:48', 1),
(6789, 162, 0, 2, 1, 'Can simplify scheduling if only key team members must join tours of particular areas.  Others can participate based on availability.', '', '', 0, 0, 0, 0, '2020-11-20 15:52:48', 1),
(6790, 162, 0, 2, 8, 'Come prepared to these meetings with an agenda and an approximate timeline for the meeting. All participants should have questions ready so the meeting can move efficiently.', '', '', 0, 0, 0, 0, '2020-11-20 15:52:48', 1),
(6814, 242, 0, 0, 31, 'Report drafting process will follow a timeline similar to that used for in person assessments.', '%zXz%', '%zXz%', 0, 0, 0, 0, '2020-11-20 16:47:53', 1),
(6815, 241, 0, 0, 31, 'Upon completion of a remote guided tour, the assessment team will meet to determine which opportunities should be pursued.', '%zXz%', '%zXz%', 0, 0, 0, 0, '2020-11-20 16:48:31', 1),
(6816, 241, 0, 0, 31, 'If possible, this meeting should include the client.', '%zXz%', '%zXz%', 0, 0, 0, 0, '2020-11-20 16:48:31', 1),
(6830, 156, 0, 0, 31, 'This meeting is analogous to the what the OSU IAC has traditionally called the \"Pre-Audit Walkthrough Phone Call\" (excluding site visit logistics, safety and PPE discussion)', '%zXz%', '%zXz%', 0, 0, 0, 0, '2020-11-20 21:21:53', 1),
(6831, 156, 0, 0, 26, 'Have the client(s) verbally  \"walk us through\" their process, highlighting key energy intensive processes', '', '', 0, 0, 0, 0, '2020-11-20 21:21:53', 1),
(6832, 156, 0, 1, 14, 'Ask client(s) to let us know of any areas of concern or interest', '', '', 0, 0, 0, 0, '2020-11-20 21:21:53', 1),
(6833, 156, 0, 1, 14, 'Ask for rated capacity, estimated % of full capacity, and hours of operation for significant equipment discussed.', '', '', 0, 0, 0, 0, '2020-11-20 21:21:53', 1),
(6834, 156, 0, 2, 8, 'Estimates of the number of smaller motor of various sizes with average load and hours can also be helpful.', '', '', 0, 0, 0, 0, '2020-11-20 21:21:53', 1),
(6835, 156, 0, 1, 14, 'Are common utilities such as compressed air, lighting, heating, etc covered in the conversation?', '', '', 0, 0, 0, 0, '2020-11-20 21:21:53', 1),
(6836, 156, 0, 0, 26, 'Discuss proposed process for remote assessment going forward (we are still learning and developing this process)', '', '', 0, 0, 0, 0, '2020-11-20 21:21:53', 1),
(6837, 156, 0, 0, 8, 'Try to get more than one key contact at the site involved in the project. (Plant manager, Fiscal Decision Maker, Maintenance Manager, Floor Personnel, Energy Lead, etc)', '', '', 0, 0, 0, 0, '2020-11-20 21:21:53', 1),
(6838, 156, 0, 0, 17, '(Item not added yet)', 'abc.com', 'Pre-Audit Walkthrough Phone Call Checklist', 0, 0, 0, 0, '2020-11-20 21:21:53', 1),
(6839, 156, 0, 0, 14, 'How best could we get Utility & Incentive Representatives involved (if the client permits) ', '', '', 0, 0, 0, 0, '2020-11-20 21:21:53', 1),
(6840, 156, 0, 0, 26, 'At this point, an analyst should be assigned to start the general background. It may take more time to develop the general background while doing a remote assessment so it\'s best to start it early.', '', '', 0, 1, 0, 0, '2020-11-20 21:21:53', 1),
(6841, 243, 0, 0, 31, 'Once the report has been compiled and made it through the review process, a meeting with the client will be scheduled to present the findings and recommendations in the report.', '%zXz%', '%zXz%', 0, 0, 0, 0, '2020-11-20 21:33:31', 1),
(6842, 243, 0, 1, 31, 'This is something that we may start doing for all assessments moving forward.', '%zXz%', '%zXz%', 0, 0, 0, 0, '2020-11-20 21:33:31', 1),
(6843, 243, 0, 1, 31, 'If possible, this meeting should include all analysts involved in the report.', '%zXz%', '%zXz%', 0, 0, 0, 0, '2020-11-20 21:33:31', 1),
(6844, 244, 0, 0, 9, 'Working remotely changes the dynamic of working as a team. It is important to have expectations for meetings post-assessment in order to meet the deadline.', '', '', 0, 0, 0, 0, '2020-11-23 23:11:25', 1),
(6845, 244, 0, 1, 12, 'Schedule a team meeting within three business days of the assessment', '', '', 0, 0, 0, 0, '2020-11-23 23:11:25', 1),
(6846, 244, 0, 2, 8, 'The intention of this meeting should be to debrief after the assessment. Topics such as opportunities, best-practices, and AR/OMC assignments should be discussed. ', '', '', 0, 0, 0, 0, '2020-11-23 23:11:25', 1),
(6847, 244, 0, 1, 12, 'Schedule team meeting one week after debrief meeting.', '', '', 0, 0, 0, 0, '2020-11-23 23:11:25', 1),
(6848, 244, 0, 2, 8, 'The intention of this meeting should be for analysts to update the lead analyst and PA on their assignments. Additionally, any questions analysts have for the facility should be addressed.', '', '', 0, 0, 0, 0, '2020-11-23 23:11:25', 1),
(6849, 244, 0, 1, 12, 'Schedule 10-15 minute individual meetings with each analyst. The frequency of these meetings should be determined by the lead. At a minimum, every two weeks is recommended. ', '', '', 0, 0, 0, 0, '2020-11-23 23:11:25', 1),
(6850, 244, 0, 2, 8, 'Any issues or questions analysts have encountered should be discussed. ', '', '', 0, 0, 0, 0, '2020-11-23 23:11:25', 1),
(6851, 244, 0, 2, 8, 'Be sure to invite the PA, but their attendance should not be required unless previously discussed.', '', '', 0, 0, 0, 0, '2020-11-23 23:11:25', 1),
(6852, 244, 0, 0, 7, 'Take notes on every meeting. As the lead, it is your responsibility to make sure nothing gets forgotten.', '', '', 0, 0, 0, 0, '2020-11-23 23:11:25', 1),
(6907, 240, 0, 0, 8, 'Filters are available on each published page. Clicking on the icons located on each header will filter associated items out or back into the list below.  ', '', '', 0, 0, 0, 0, '2020-11-24 22:19:06', 0),
(6908, 240, 0, 1, 32, '', '/uploads/user_51/f6503d4e177523d18823ae1f14314853.png', 'Typical Header', 0, 0, 0, 0, '2020-11-24 22:19:06', 0),
(6909, 240, 0, 1, 8, 'Clicking on the last three icons will bring back all items, hide all items, or hide the filter icon list.', '', '', 0, 0, 0, 0, '2020-11-24 22:19:06', 0),
(6952, 251, 0, 0, 31, '<p>RFID is used to track products. Companies need to keep track of products for inventory control, determining production schedules, and traceability. Some small companies still use paper and clipboard, which has a large margin for error as production scales up. Many companies have made the transition to barcode scanning which is faster and more reliable when shared among many people. It still has a drawback of requiring an operator to scan at appropriate points. If an operator forgets to scan, or enters incorrect information during a scan, product can end up “lost” in storage. RFID has the advantage of not requiring a constant scanning and can be located even if the product is “lost”.&nbsp;</p>', '%zXz%', '%zXz%', 0, 0, 0, 0, '2020-11-29 00:29:29', 0),
(6953, 250, 0, 0, 24, 'Springer', 'http://link.springer.com/10.1007/s10586-017-0767-x', 'Yang et al.  “Towards product customization and personalization in IoT-enabled cloud manufacturing,”', 1, 0, 0, 0, '2020-11-29 00:36:24', 0),
(6954, 250, 0, 0, 24, 'Science Direct', 'http://www.sciencedirect.com/science/article/pii/S0925527314002825', 'Guo et al. “An RFID-based intelligent decision support system architecture for production monitoring and scheduling in a distributed manufacturing environment,”', 1, 0, 0, 0, '2020-11-29 00:36:24', 0),
(6955, 250, 0, 0, 24, 'MDPI (Open Source)', 'https://www.mdpi.com/2079-9292/6/1/14', 'T. Kamigaki, “Object‐Oriented RFID with IoT: A Design Concept of Information Systems in Manufacturing,”', 1, 0, 0, 0, '2020-11-29 00:36:24', 0),
(6961, 252, 0, 0, 32, '', 'https://miro.medium.com/max/464/1*UKIHA2AHtB9WPG-KrfwSZg.png', 'What Machine Learning Really is?', 0, 0, 0, 0, '2020-11-29 00:44:32', 0),
(6963, 248, 0, 0, 31, '<p>Additive Manufacturing means depositing material onto a work surface to incrementally build a part.  Although many of the modern additive manufacturing technologies were invented in the 1980\'s and 1990\'s, it was not until early 2000\'s when it started receiving media coverage for printing a kidney. A few years later companies started to sell home hobbies printers which were capable of printing plastics. </p>', '%zXz%', '%zXz%', 0, 0, 0, 0, '2020-11-30 17:46:53', 0),
(6964, 248, 0, 0, 31, '<p>Because of the speed at which small parts can be produced, industry often refers to \"rapid prototyping\". Since production lines are so specialized to mass produce a single part, the cost associated with retooling or modifying the production line to make prototypes is high even for the simplest parts. Once the CAD models are done, minimal modification are needed to being production with rapid prototyping. </p>', '%zXz%', '%zXz%', 0, 0, 0, 0, '2020-11-30 17:46:53', 0),
(6965, 253, 0, 0, 31, '<p>Machine Learning refers to algorithms that allow a machine to update its program to better match the desired output. At its core machine learning is linear algebra and statistics, which makes it very similar to mathematic regression models. The advantage is that these algorithms do not assume that the process follows any particular model (assumptions like linearity, interaction between variables, significance of variables, or independence of variables) </p>', '%zXz%', '%zXz%', 0, 0, 0, 0, '2020-11-30 18:04:41', 0),
(6966, 253, 0, 0, 31, '<p>For small companies where they vary multiple process parameters to get different outcomes, a machine learning system can be developed to help find the ideal parameters for each outcome. </p>', '%zXz%', '%zXz%', 0, 0, 0, 0, '2020-11-30 18:04:41', 0),
(6967, 254, 0, 0, 24, '', 'https://linkinghub.elsevier.com/retrieve/pii/S235197891830475X', 'Rethinking Human-Machine Learning in Industry 4.0: How Does the Paradigm Shift Treat the Role of Human Learning?', 1, 0, 0, 0, '2020-11-30 18:07:00', 0),
(6968, 254, 0, 0, 24, '', 'https://towardsdatascience.com/the-actual-difference-between-statistics-and-machine-learning-64b49f07ea3', 'The Actual Difference Between Statistics and Machine Learning', 1, 0, 0, 0, '2020-11-30 18:07:00', 0),
(7029, 87, 0, 0, 11, 'Replace refrigerated compressed air dryer with more efficient refrigerated compressed air dryer', '', '', 0, 0, 0, 0, '2020-12-14 15:58:03', 0),
(7030, 87, 0, 0, 11, 'Capture heat rejected by air compressors', '', '', 0, 0, 0, 0, '2020-12-14 15:58:03', 0),
(7455, 144, 0, 0, 24, 'An guide to industrial refrigeration systems and associated best practicers. Developed by Cascade Energy.', 'https://cascadeenergy.com/wp-content/uploads/2013/10/industrial-refridgeration-best-practices-guide.pdf', 'Industrial Refrigeration - Best Practices Guide ', 1, 0, 0, 0, '2020-12-16 01:38:16', 0),
(7456, 144, 0, 0, 24, 'A chapter from Rutgers University\'s training manual for conducting industrial assessments.', 'https://iac.university/technicalDocs/industr/ch7.pdf', 'Essentials of Industrial Assessments - Ch. 7: Thermal Applications', 1, 0, 0, 0, '2020-12-16 01:38:16', 0),
(7490, 131, 0, 0, 11, 'Use outside air to partially or fully meet cooling requirements. ', '', '', 0, 0, 0, 0, '2020-12-16 22:51:37', 0),
(7491, 131, 0, 1, 31, '<p>If outside air is sufficiently cool an economizer may be used to circulate outside air to a cooled space, process, or equipment while ducting warm air outside. This is the least energy intensive cooling method and should be pursued if conditions permit it.</p>', '', '', 0, 0, 0, 0, '2020-12-16 22:51:37', 0),
(7492, 131, 0, 1, 10, 'Current cooling requirements are met by direct or indirect evaporative cooling equipment and outdoor temperatures do not exceed desired process temperatures.', '', '', 0, 0, 0, 0, '2020-12-16 22:51:37', 0),
(7493, 131, 0, 1, 8, 'Use outside air during colder months to turn down or shut off other cooling equipment. ', '', '', 0, 0, 0, 0, '2020-12-16 22:51:37', 0),
(7494, 131, 0, 1, 1, 'Inexpensive, few moving parts, and easy to maintain.', '', '', 0, 0, 0, 0, '2020-12-16 22:51:37', 0),
(7495, 131, 0, 1, 2, 'Reliability depends on the consistency of ambient conditions. ', '', '', 0, 0, 0, 0, '2020-12-16 22:51:37', 0),
(7496, 131, 0, 0, 11, 'Install a cooling tower to reduce the chiller load.', '', '', 0, 0, 0, 0, '2020-12-16 22:51:37', 0),
(7497, 131, 0, 1, 31, '<p>Cooling towers make use of evaporative cooling to supply cooled water to a process. Cooling towers may be used as standalone equipment or added to a chiller system to reduce the load when outside conditions are ideal. There are three common types of cooling towers used today: forced-draft, induced-draft, and hyperbolic (natural draft). </p>', '', '', 0, 0, 0, 0, '2020-12-16 22:51:37', 0),
(7498, 131, 0, 0, 11, 'Condenser water temperature adjustment ', '', '', 0, 0, 0, 0, '2020-12-16 22:51:37', 0),
(7499, 131, 0, 0, 11, 'Chilled water supply temperature adjustment', '', '', 0, 0, 0, 0, '2020-12-16 22:51:37', 0),
(7500, 131, 0, 0, 11, 'Fan motor controls (variable speed)', '', '', 0, 0, 0, 0, '2020-12-16 22:51:37', 0),
(7501, 13, 0, 0, 2, 'Extremely energy intensive. ', '', '', 0, 0, 0, 0, '2020-12-16 23:55:51', 1),
(7502, 13, 0, 0, 2, 'Function provided can often be replaced with a significantly lower power approach.', '', '', 0, 0, 0, 0, '2020-12-16 23:55:51', 1),
(7785, 86, 0, 0, 11, 'Turn compressor(s) off when not needed - nights weekends etc	', '', '', 0, 0, 0, 0, '2020-12-18 17:30:08', 0),
(7786, 86, 0, 1, 2, 'This measure is only as reliable as the operators', '', '', 0, 0, 0, 0, '2020-12-18 17:30:08', 0),
(7787, 86, 0, 0, 11, 'Serve low volume around the clock  requirement with separate smaller system', '', '', 0, 0, 0, 0, '2020-12-18 17:30:08', 0),
(7796, 264, 0, 0, 3, 'Rules of Thumb', '', '', 0, 0, 0, 0, '2020-12-18 18:22:26', 0),
(7799, 90, 0, 0, 4, 'Boilers can be bombs if not properly set up and maintained.', '', '', 0, 0, 0, 0, '2020-12-18 18:36:17', 1),
(7800, 90, 0, 1, 23, 'M5 Industries founder shows potential damages due to safety system failure', 'https://www.youtube.com/watch?v=jbreKn4PoAc', 'Boiler system failure', 1, 1, 0, 0, '2020-12-18 18:36:17', 1),
(7801, 91, 0, 0, 3, '1 boiler horsepower (BoHP) = 33,479 Btu/hr', '', '', 0, 0, 0, 0, '2020-12-18 18:38:14', 1),
(7802, 91, 0, 0, 3, 'Exhaust gases are typically best kept above 300 °F to avoid corrosive condensation.', '', '', 0, 0, 0, 0, '2020-12-18 18:38:14', 1),
(7803, 91, 0, 0, 3, 'Ideal exhaust temperatures should not be more than 100 - 150 °F greater than the steam temperature. If a boiler is well designed and heat exchanger surfaces are in good condition, ideal exhaust temperatures should be achievable.', '', '', 0, 0, 0, 0, '2020-12-18 18:38:14', 1),
(7804, 91, 0, 0, 3, 'For every 40°F decrease in flue gas temperature there is a 1% increase in efficiency', '', '', 0, 0, 0, 0, '2020-12-18 18:38:14', 1),
(7805, 95, 0, 0, 15, 'Boiler Nameplate Data', '', '', 0, 0, 0, 0, '2020-12-18 18:40:35', 1),
(7806, 95, 0, 1, 26, ' Rated Capacity (Steam Production, Maximum Fuel Input)', '', '', 0, 0, 1, 0, '2020-12-18 18:40:35', 1),
(7807, 95, 0, 1, 26, 'Fan Horsepower', '', '', 0, 0, 1, 0, '2020-12-18 18:40:35', 1),
(7808, 95, 0, 1, 26, 'Make, Model, Serial Number', '', '', 0, 0, 1, 0, '2020-12-18 18:40:35', 1),
(7809, 95, 0, 0, 15, 'Combustion Analysis: ', '', '', 0, 0, 0, 0, '2020-12-18 18:40:35', 1),
(7810, 95, 0, 1, 26, 'Stack Temperature', '', '', 0, 0, 1, 0, '2020-12-18 18:40:35', 1),
(7811, 95, 0, 1, 26, 'Excess O2', '', '', 0, 0, 1, 0, '2020-12-18 18:40:35', 1),
(7812, 95, 0, 1, 26, ' Inlet / Ambient Temperature ', '', '', 0, 0, 1, 0, '2020-12-18 18:40:35', 1),
(7813, 95, 0, 0, 15, 'Capacity over time', '', '', 0, 0, 0, 0, '2020-12-18 18:40:35', 1),
(7814, 95, 0, 1, 26, 'Hourly steam production', '', '', 0, 0, 1, 0, '2020-12-18 18:40:35', 1),
(7815, 95, 0, 1, 26, 'Hourly energy use', '', '', 0, 0, 1, 0, '2020-12-18 18:40:35', 1),
(7816, 95, 0, 1, 8, 'Sometimes capacity must be inferred from fan energy, and characteristic fan energy curves', '', '', 0, 0, 0, 0, '2020-12-18 18:40:35', 1),
(7817, 95, 0, 0, 15, 'Fuel used', '', '', 0, 0, 1, 0, '2020-12-18 18:40:35', 1),
(7894, 105, 0, 0, 15, 'Condensate flow and temperature', '', '', 1, 0, 0, 0, '2020-12-18 19:51:16', 0),
(7895, 105, 0, 0, 11, 'Return more/all condensate back to the boiler', '', '', 0, 0, 0, 0, '2020-12-18 19:51:16', 0),
(7896, 105, 0, 0, 11, 'Recover Flash Steam', '', '', 0, 0, 0, 0, '2020-12-18 19:51:16', 0),
(7897, 105, 0, 1, 10, 'Steam being released into atmosphere from the boiler system', '', '', 0, 0, 0, 0, '2020-12-18 19:51:16', 0),
(7898, 105, 0, 1, 1, 'Payback period is usually within a year', '', '', 0, 0, 0, 0, '2020-12-18 19:51:16', 0),
(7899, 105, 0, 1, 1, 'Condensate does not require any chemical treatment other than condensate polishing. ', '', '', 0, 0, 0, 0, '2020-12-18 19:51:16', 0),
(7900, 105, 0, 2, 8, 'A condensate polisher is similar to a water softener. Polishing removes the trace amount of mineral that are dissolved in the condensate after running though the boiler. ', '', '', 0, 0, 0, 0, '2020-12-18 19:51:16', 0),
(7901, 105, 0, 1, 1, 'Capturing and reusing the steam can reduce hog fuel by 14.5%', '', '', 0, 0, 0, 0, '2020-12-18 19:51:16', 0),
(7902, 105, 0, 1, 2, 'Maintenance crews will need training to work with steam recovery systems', '', '', 0, 0, 0, 0, '2020-12-18 19:51:16', 0),
(7903, 105, 0, 1, 2, 'There are usually no incentives for this opportunity, because the system usually pays for itself within a year.', '', '', 0, 0, 0, 0, '2020-12-18 19:51:16', 0),
(7904, 105, 0, 1, 3, 'A good recovery system can collect up to 80% of the condensate', '', '', 0, 0, 0, 0, '2020-12-18 19:51:16', 0),
(7905, 105, 0, 1, 3, 'Steam recovery is most efficient when waste heat is high and flow is continuous', '', '', 0, 0, 0, 0, '2020-12-18 19:51:16', 0),
(7906, 105, 0, 1, 8, 'Multiple different types of steam traps available to fit company needs: Mechanical, Thermodynamic, or Thermostatic', '', '', 0, 0, 0, 0, '2020-12-18 19:51:16', 0),
(7907, 105, 0, 1, 17, 'Contains specific information about flash steam recovery', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam12_lowpressure_steam.pdf', 'DOE Tip Sheet Flash Steam Recovery', 1, 0, 0, 0, '2020-12-20 02:04:22', 0),
(7908, 105, 0, 1, 21, '', 'https://oregonstate.app.box.com/file/337450150435', 'Flash Steam Recovery', 0, 1, 0, 0, '2020-12-18 19:51:16', 0),
(7909, 105, 0, 0, 11, 'Fix or replace faulty steam traps', '', '', 1, 0, 0, 0, '2020-12-18 19:51:16', 0),
(7910, 105, 0, 1, 8, 'Use an ultrasonic testing equipment to detect faulty steam traps', '', '', 1, 0, 0, 0, '2020-12-18 19:51:16', 0),
(7911, 105, 0, 0, 23, 'Explains how steam traps work, brief history and lists several different types of traps in detail.', 'https://www.youtube.com/watch?v=IiRyxcCBTa0', 'Let\'s Talk Steam Traps', 1, 0, 0, 0, '2020-12-20 02:05:40', 0),
(7912, 105, 0, 0, 24, 'Contains several pages with useful calculations for steam systems. This link leads to the flash steam page.', 'https://www.tlv.com/global/US/steam-theory/introduction-to-condensate-recovery.html', 'TLV Steam Theory', 1, 0, 0, 0, '2020-12-20 02:05:48', 0),
(7919, 263, 0, 0, 7, 'Perform regular maintenance on heat exchangers and heat transfer surfaces to reduce fouling.', '', '', 0, 0, 0, 0, '2020-12-18 23:01:16', 0),
(7920, 263, 0, 0, 7, 'Regularly inspect the integrity of insulation to ensure proper function.', '', '', 0, 0, 0, 0, '2020-12-18 23:01:16', 0),
(7921, 263, 0, 0, 7, 'Use a thermal imaging camera or infrared thermometer to check for hot spots in insulation.', '', '', 0, 0, 0, 0, '2020-12-18 23:01:16', 0),
(7972, 119, 0, 0, 10, 'Equipment is idle for significant periods of time', '', '', 0, 0, 0, 0, '2020-12-19 00:46:45', 1),
(7973, 119, 0, 0, 11, 'Manually reduce equipment operation time', '', '', 0, 0, 0, 0, '2020-12-19 00:46:45', 1),
(7974, 119, 0, 1, 31, '<p>Turn off equipment during lunch, breaks, and other times when equipment is not in use.</p>', '', '', 0, 0, 0, 0, '2020-12-19 00:46:45', 1),
(7975, 119, 0, 1, 1, 'No cost option', '', '', 0, 0, 0, 0, '2020-12-19 00:46:45', 1),
(7976, 119, 0, 1, 2, 'This measure is only as reliable as the operators', '', '', 0, 0, 0, 0, '2020-12-19 00:46:45', 1),
(7977, 119, 0, 0, 11, 'Operate equipment in batches rather than continuously ', '', '', 0, 0, 0, 0, '2020-12-19 00:46:45', 1),
(7978, 119, 0, 1, 1, 'No cost option', '', '', 0, 0, 0, 0, '2020-12-19 00:46:45', 1),
(7979, 119, 0, 1, 2, 'Batch processing also has potential for increasing demand charges if the equipment is more heavily loaded.', '', '', 0, 0, 0, 0, '2020-12-19 00:46:45', 1),
(7980, 119, 0, 0, 11, 'Interlock equipment with a related process', '', '', 0, 0, 0, 0, '2020-12-19 00:46:45', 1),
(7981, 119, 0, 1, 31, '<p>If a particular piece of equipment is dedicated to specific process that requires additional equipment, they can all be interlocked so all will be de-energized when the operator turns off one piece of equipment.</p>', '', '', 0, 0, 0, 0, '2020-12-19 00:46:45', 1),
(7982, 119, 0, 1, 1, 'More reliable then having operators turn of multiple pieces of equipment', '', '', 0, 0, 0, 0, '2020-12-19 00:46:45', 1),
(7983, 119, 0, 0, 11, 'Automatically control equipment operation time', '', '', 0, 0, 0, 0, '2020-12-19 00:46:45', 1),
(7984, 119, 0, 0, 31, '<p>Timers, level sensors, material sensors, and other controls can be used to automatically turn off equipment that is not currently being utilized and automatically turn on when needed.</p>', '', '', 0, 0, 0, 0, '2020-12-19 00:46:45', 1),
(7985, 119, 0, 0, 1, 'Can obtain efficiencies of batch processing automatically', '', '', 0, 0, 0, 0, '2020-12-19 00:46:45', 1),
(7986, 119, 0, 0, 4, 'Special care must be taken to avoid creating a safety hazard', '', '', 0, 0, 0, 0, '2020-12-19 00:46:45', 1),
(7989, 94, 0, 0, 20, '', 'add later', 'Boiler Combustion Efficiency with Stack Temp and O2 (add later)', 0, 0, 0, 0, '2020-12-19 18:58:04', 0),
(7990, 94, 0, 0, 20, '', 'add later', 'Abbreviated Steam Table (add later)', 0, 0, 0, 0, '2020-12-19 18:58:04', 0),
(8002, 97, 0, 0, 17, 'An OSU EEC Data Collection Sheet in Microsoft Excel Format', 'https://drive.google.com/file/d/1mMRMAUYKDCpE5bQmX-KqajjAOwXuEzaL/view?usp=sharing', 'Boiler Data Collection Sheet', 0, 0, 0, 0, '2020-12-19 19:07:34', 0),
(8003, 98, 0, 0, 21, 'A link to the U.S.DOE\'s MEASUR Analysis Tool Package (free download)', 'https://www.energy.gov/eere/amo/measur', 'U.S.DOE Steam System Analysis Tool', 1, 0, 0, 0, '2020-12-19 19:12:24', 0),
(8004, 98, 0, 0, 21, 'An OSU EEC Analysis Tool in Microsoft Excel Format', 'https://drive.google.com/file/d/1HEL3S8xl50-B12ooH4wocqUznwJWAjzQ/view?usp=sharing', 'Combustion Efficiency Analysis Tool (CEAT)', 0, 1, 0, 0, '2020-12-19 19:12:24', 0),
(8083, 99, 0, 0, 22, 'An OSU EEC Google Slideshow', 'https://docs.google.com/presentation/d/1A-bLNUv7hCuBV2zMsS0A4JEKPNVxaKnIwUMoVZCFr2w/edit?usp=sharing', 'Steam Systems', 0, 0, 0, 0, '2020-12-19 19:21:00', 1),
(8084, 99, 0, 0, 17, 'An OSU EEC Appendix in Microsoft Word Format', 'https://drive.google.com/file/d/1Jh6CaIDd6ugCo6FYqviyVK-O49ic_275/view?usp=sharing', 'Combustion Appendix', 0, 0, 0, 0, '2020-12-19 19:21:00', 1),
(8085, 102, 0, 0, 11, 'Shut down equipment when not needed', '', '', 0, 0, 0, 0, '2020-12-19 19:25:47', 0),
(8086, 102, 0, 1, 1, 'No cost option', '', '', 0, 0, 0, 0, '2020-12-19 19:25:47', 0),
(8087, 102, 0, 1, 2, 'This measure is only as reliable as the operator', '', '', 0, 0, 0, 0, '2020-12-19 19:25:47', 0),
(8100, 103, 0, 0, 31, '<p>As water is evaporated to steam, solids in the water remain in the solution. To keep dissolved solids from building up to excessive levels, the boiler water is drained and replaced with fresh water. This is called \"blow-down\". The difference in temperature between the replacement water and the hot boiler water represents an energy loss. To minimize this loss, blow-down should be keep to the minimum required to keep dissolved solids at an acceptable level. The rate of continuous blow-down depends on the quality of the feedwater and the amount of condensate returned.</p>', '', '', 0, 0, 0, 0, '2020-12-19 19:28:10', 0),
(8101, 103, 0, 0, 1, 'Reducing blow-down will also reduce the amount of water treatment chemicals required', '', '', 0, 0, 0, 0, '2020-12-19 19:28:10', 0),
(8102, 103, 0, 0, 11, 'Minimize the continuous blowdown rate with a conductivity sensor', '', '', 0, 0, 0, 0, '2020-12-19 19:28:10', 0),
(8103, 103, 0, 0, 11, 'Install blowdown heat recovery', '', '', 0, 0, 0, 0, '2020-12-19 19:28:10', 0),
(8140, 168, 0, 0, 1, 'Can result in significant savings and increased productivity', '', '', 0, 0, 0, 0, '2020-12-20 03:10:25', 0),
(8141, 168, 0, 0, 1, 'Easy to estimate cost savings/benefits given sufficient, accurate data', '', '', 0, 0, 0, 0, '2020-12-20 03:10:25', 0),
(8142, 168, 0, 1, 8, 'Software packages exist to calculate savings', '', '', 0, 0, 0, 0, '2020-12-20 03:10:25', 0),
(8143, 168, 0, 0, 1, 'Opportunity and cost saving methodology is applicable to how inventory is stored and located.', '', '', 0, 0, 0, 0, '2020-12-20 03:10:25', 0),
(8144, 172, 0, 0, 31, '<p>The D-score is a method to compare potential facility layout. The D-score represents the effort required to move product. The layout with the lowest D-score will require the least effort for moving product thus has the largest savings.</p>', '', '', 0, 0, 0, 0, '2020-12-20 03:56:15', 0),
(8145, 172, 0, 0, 26, 'Layout efficiency (D) is the summation of distance traveled (d) * number of units (x) * relative moving cost (f). In other words, D = Sum (fi *xi*di) for all i.', '', '', 0, 0, 0, 0, '2020-12-20 03:56:15', 0),
(8146, 172, 0, 0, 26, 'Distance traveled between departments (d) is typically calculated rectilinearly, or the sum of the horizontal and vertical differences between the centroids of two departments.   ', '', '', 0, 0, 0, 0, '2020-12-20 03:56:15', 0),
(8147, 172, 0, 0, 26, 'Relative moving cost (f) is a subjective measurement. It is an easy way to take into account all factors that are unique to a facility. If the movement cost is average, it should assume a value of 1. Therefore, if a material requires twice the effort to move compared to the average material it should assume a value of 2.', '', '', 0, 0, 0, 0, '2020-12-20 03:56:15', 0),
(8148, 172, 0, 1, 26, 'An example a high relative moving cost would be when product is moved uphill. Moving the product uphill requires twice the effort, while moving downhill requires half the effort. Therefore uphill will have f=2, while downhill has f=1/2. ', '', '', 0, 0, 0, 0, '2020-12-20 03:56:15', 0),
(8149, 172, 0, 0, 26, 'Calculating D-scores should be done tabularly.  ', '', '', 0, 0, 0, 0, '2020-12-20 03:56:15', 0),
(8166, 173, 0, 0, 31, '<p>Evaluating a D-score is best to use technique to identify the most viable options. The most inefficient layouts are often not considered a viable option because they are the result of future space, workstation, and product expansions that were not considered in the original design of the facility layout.</p>', '', '', 0, 0, 0, 0, '2020-12-20 04:21:40', 0),
(8167, 173, 0, 0, 10, 'Look for departments with the highest flow. The distance between these departments should be minimized. ', '', '', 0, 0, 0, 0, '2020-12-20 04:21:40', 0),
(8168, 173, 0, 0, 9, 'Heuristic algorithms can be used for a more scientific approach at achieving optimal layouts.', '', '', 0, 0, 0, 0, '2020-12-20 04:21:40', 0),
(8169, 173, 0, 0, 12, 'Try many different designs. The cost for a failed design now is nothing, but can be huge once it has been implemented. ', '', '', 0, 0, 0, 0, '2020-12-20 04:21:40', 0),
(8170, 173, 0, 1, 8, 'For layouts with obvious flow inefficiencies, using intuition to reorganize departments may be sufficient to achieve savings.', '', '', 0, 0, 0, 0, '2020-12-20 04:21:40', 0),
(8171, 173, 0, 0, 4, 'Optimum is not always the best. Always consult facility personal about potential drawback.', '', '', 0, 0, 0, 0, '2020-12-20 04:21:40', 0),
(8172, 173, 0, 1, 4, 'Keep in mind the cost for relocating departments. A good layout will minimize the D-score as well as the initial investment. ', '', '', 0, 0, 0, 0, '2020-12-20 04:21:40', 0),
(8173, 173, 0, 1, 4, 'Keep in mind potential logistic issues. If all the traffic runs though the same route the potential benefits of shorter distance could be lost by creating traffic jams and safety hazards. ', '', '', 0, 0, 0, 0, '2020-12-20 04:21:40', 0);
INSERT INTO `Items` (`itemId`, `cardId`, `orderIndex`, `indentation`, `iconType`, `contentText`, `contentUrl`, `contentLabel`, `contentMode`, `internal`, `inline`, `sourceId`, `created`, `approved`) VALUES
(8182, 265, 0, 0, 17, 'Thermodynamic properties of water/steam from the Heat Exchanger Design Handbook by C. F. Beaton, published in 1986. This is useful for finding the enthalpy of water/steam for calculating heat transfer.', 'http://thermopedia.com/content/1150/', 'Water/Steam Property Tables', 1, 0, 0, 0, '2020-12-21 20:26:45', 0),
(8183, 265, 0, 0, 24, 'Lists the specific heats of common fluids. This is used for calculating the amount of heat that can be exchanged between the two fluid streams.', 'https://www.engineeringtoolbox.com/specific-heat-fluids-d_151.html', 'Common Fluid Specific Heats', 1, 0, 0, 0, '2020-12-21 20:26:45', 0),
(8184, 265, 0, 0, 24, 'List of densities for common fluids. This is useful if the fluid\'s volumetric flowrate is known, but not the mass flowrate.', 'https://www.engineeringtoolbox.com/liquids-densities-d_743.html', 'Common Fluid Densities', 1, 0, 0, 0, '2020-12-21 20:26:45', 0),
(8185, 265, 0, 0, 24, 'Heat Exchanger Heat Transfer Coefficients\nConfirmed valid Dec 16, 2020, 5:33 PM\nEstimated heat exchanger heat transfer coefficients for use in calculating the amount of heat transferred between the two fluid streams.', 'https://www.engineeringtoolbox.com/heat-transfer-coefficients-exchangers-d_450.html', 'Heat Exchanger Heat Transfer Coefficients', 1, 0, 0, 0, '2020-12-21 20:26:45', 0),
(8634, 212, 0, 0, 11, 'Increase Spray Paint Efficiency', '', '', 0, 0, 0, 0, '2020-12-22 22:54:00', 1),
(8635, 212, 0, 1, 8, 'Training paint personnel to reduce overspray in painting applications can significantly reduce annual paint consumption, extend booth filter life, and reduce associated disposal costs. ', '', '', 0, 0, 0, 0, '2020-12-22 22:54:00', 1),
(8636, 212, 0, 1, 26, 'Paint booths are often present in metals manufacturing facilities that produce final products or components', '', '', 0, 0, 0, 0, '2020-12-22 22:54:00', 1),
(8637, 212, 0, 1, 26, 'Operator spray technique and equipment settings can be adjusted to minimize paint overspray. Equipment settings include paint gun adjustment, equipment maintenance, and paint gun distance and orientation.', '', '', 0, 0, 0, 0, '2020-12-22 22:54:00', 1),
(8638, 212, 0, 1, 1, 'Painting efficiency can be improved by as much 25% for even the most experienced painters with increased attention to application techniques', '', '', 0, 0, 0, 6, '2020-12-22 22:54:00', 1),
(8639, 212, 0, 1, 15, 'Annual consumption of paint and associated cost', '', '', 0, 0, 0, 0, '2020-12-22 22:54:00', 1),
(8640, 212, 0, 1, 3, 'Proposed savings can be conservatively estimated at 10-15% reduction in paint consumption. Percent savings may approach 25% if the recommended techniques are replicated and adhered to.', '', '', 0, 0, 0, 0, '2020-12-22 22:54:00', 1),
(8641, 215, 0, 0, 31, '<p>The following opportunities are specific to metals manufacturing facilities. For more opportunities related to compressed air, go to the <a href=\"https://walkthrough.eec.oregonstate.edu/wiki/technologies/2\" rel=\"noopener noreferrer\" target=\"_blank\">Compressed Air</a> Technologies page.</p>', '%zXz%', '%zXz%', 0, 0, 0, 0, '2020-12-22 22:56:20', 1),
(8642, 215, 0, 0, 11, 'Replace the pistons on stamping die cushions with air actuators', '', '', 0, 0, 0, 0, '2020-12-22 22:56:20', 1),
(8643, 215, 0, 1, 31, 'Die cushions on large stamping presses are used to support inserts in the lower die.', '%zXz%', '%zXz%', 0, 0, 0, 13, '2020-12-22 22:56:20', 1),
(8644, 215, 0, 1, 26, 'Die cushions can produce significant air leaks, up to 100 CFM in some cases, after moderate use. Air actuators are more resilient and can operate without air leaks for over five years.', '', '', 0, 0, 0, 13, '2020-12-22 22:56:20', 1),
(8698, 269, 0, 0, 11, 'Replace transformer-rectifier welders with inverter-based welders', '', '', 0, 0, 0, 0, '2020-12-22 23:42:28', 0),
(8699, 269, 0, 1, 1, 'Inverter welders are lightweight which makes them easier to transport around a facility', '', '', 0, 0, 0, 7, '2020-12-22 23:42:28', 0),
(8700, 269, 0, 1, 1, 'Stable arc characteristics of inverter welders increase weld quality and consistency', '', '', 0, 0, 0, 13, '2020-12-22 23:42:28', 0),
(8701, 269, 0, 1, 1, 'Inverter welders are capable of producing high-quality welds for multiple welding styles such as stick, MIG, TIG, FCAW, and arc gouging', '', '', 0, 0, 0, 7, '2020-12-22 23:42:28', 0),
(8702, 269, 0, 1, 26, 'High-efficiency welders provide 10-40% energy savings compared to older units', '', '', 0, 0, 0, 13, '2020-12-22 23:42:28', 0),
(8703, 269, 0, 1, 26, 'Inverter welders use smaller ferrite cores in the inverter\'s power transformer which minimizes idle power draw and resistive losses in the transformer coils. Additionally, smaller cooling fans can be used to cool inverter-based welders', '', '', 0, 0, 0, 7, '2020-12-22 23:42:28', 0),
(8704, 269, 0, 0, 11, 'utilize robotic welding', '', '', 0, 0, 0, 0, '2020-12-22 23:42:28', 0),
(9174, 29, 0, 0, 17, 'This guide focuses mainly on screw and reciprocating compressors. These are the most common types of compressors used in the northwest. Other types of compressors such as rotary vane, centrifugal, lobe and radial compressors are much less common and are only introduced in this guide.', 'https://drive.google.com/file/d/12Co0C6JBK5CqoYhZQBcD0VX6JVBXy86o/view', 'Assessing Industrial Air Compressors', 0, 0, 0, 0, '2020-12-23 19:54:32', 1),
(9175, 29, 0, 0, 22, 'A short slideshow of common industrial compressed air equipment and applicatons', 'https://docs.google.com/presentation/d/1khB1tPIND-ooBy1yCCL-rDf09Gf4Q8nr/edit#slide=id.p7', 'Industrial Compressed Air (a slideshow)', 0, 0, 0, 0, '2020-12-23 19:54:32', 1),
(9176, 143, 0, 0, 17, 'A guide for assessing the efficiency of industrial vapor-compression systems. ', 'https://drive.google.com/file/d/1fG5U5cbw9c2UM0jSFZn8yOX9ewEiIuSE/view?usp=sharing', 'Assessing Industrial Refrigeration Efficiency', 0, 0, 0, 0, '2020-12-23 19:55:20', 0),
(9177, 143, 0, 0, 22, 'A short slideshow of common industrial refrigeration equipment and applications', 'https://docs.google.com/presentation/d/1A_qeQoVK6A7ConfE-uMVPdkRep-s9PUlnrELmOuNo8g/edit?usp=sharing', 'Industrial Refrigeration (a slideshow)', 0, 0, 0, 0, '2020-12-23 19:55:20', 0),
(9522, 137, 0, 0, 8, 'Tip', '', '', 0, 0, 0, 0, '2020-12-24 17:45:37', 0),
(9544, 140, 0, 0, 31, '<p>System Data</p>', '', '', 0, 0, 0, 0, '2020-12-24 17:49:22', 0),
(9545, 140, 0, 1, 15, 'Refrigerant Type', '', '', 0, 0, 0, 0, '2020-12-24 17:49:22', 0),
(9546, 140, 0, 1, 15, 'Cooling capacity (tons)', '', '', 0, 0, 0, 0, '2020-12-24 17:49:22', 0),
(9547, 140, 0, 0, 31, '<p>Compressor Data</p>', '', '', 0, 0, 0, 0, '2020-12-24 17:49:22', 0),
(9548, 140, 0, 1, 15, 'Type - centrifugal, rotary-screw, reciprocating ', '', '', 0, 0, 0, 0, '2020-12-24 17:49:22', 0),
(9549, 140, 0, 1, 15, 'Compressor and motor nameplates', '', '', 0, 0, 0, 0, '2020-12-24 17:49:22', 0),
(9550, 140, 0, 1, 15, 'Data log of compressor power to determine energy consumption', '', '', 0, 0, 0, 0, '2020-12-24 17:49:22', 0),
(9551, 140, 0, 1, 15, 'Lift - difference between discharge (condensing) and suction (evaporating) pressures', '', '', 0, 0, 0, 0, '2020-12-24 17:49:22', 0),
(9552, 140, 0, 0, 31, '<p>Condenser Data</p>', '', '', 0, 0, 0, 0, '2020-12-24 17:49:22', 0),
(9553, 140, 0, 1, 15, 'Type - air-cooled, water-cooled, evaporative', '', '', 0, 0, 0, 0, '2020-12-24 17:49:22', 0),
(9554, 140, 0, 1, 15, 'Associated fan/pump data including nameplates and speeds', '', '', 0, 0, 0, 0, '2020-12-24 17:49:22', 0),
(9555, 140, 0, 1, 15, 'Current condensing pressure/temperature', '', '', 0, 0, 0, 0, '2020-12-24 17:49:22', 0),
(9556, 140, 0, 1, 15, 'Minimum condensing pressure/temperature', '', '', 0, 0, 0, 0, '2020-12-24 17:49:22', 0),
(9557, 140, 0, 1, 15, 'Dry and/or wet bulb ambient temperatures ', '', '', 0, 0, 0, 0, '2020-12-24 17:49:22', 0),
(9558, 140, 0, 2, 26, 'Approach temperature difference is measured relative to wet bulb temperature for condensing units', '', '', 0, 0, 0, 0, '2020-12-24 17:49:22', 0),
(9559, 140, 0, 2, 26, 'Approach temperature difference is measured relative to dry bulb temperature for air-cooled units', '', '', 0, 0, 0, 0, '2020-12-24 17:49:22', 0),
(9560, 140, 0, 0, 31, '<p>Evaporator Data</p>', '', '', 0, 0, 0, 0, '2020-12-24 17:49:22', 0),
(9561, 140, 0, 1, 15, 'Type - refrigerant-to-air coils (A.K.A. evap. fan coil), heat exchanger (refrigerant-to-fluid)', '', '', 0, 0, 0, 0, '2020-12-24 17:49:22', 0),
(9562, 140, 0, 1, 15, 'Associated fan/pump data including nameplates and speeds', '', '', 0, 0, 0, 0, '2020-12-24 17:49:22', 0),
(9563, 140, 0, 1, 15, 'Current evaporating pressure/temperature', '', '', 0, 0, 0, 0, '2020-12-24 17:49:22', 0),
(9564, 140, 0, 1, 15, 'Maximum evaporating pressure/temperature', '', '', 0, 0, 0, 0, '2020-12-24 17:49:22', 0),
(9604, 260, 0, 0, 31, '<p>System lift is the difference between suction and discharge pressure at the compressor stage in the refrigeration cycle. Lift can be reduced by either increasing the suction pressure, decreasing the discharge pressure, or a combination of both. Minimizing lift improves system efficiency by increasing efficiency at the compressor stage. </p>', '', '', 0, 0, 0, 0, '2020-12-24 18:08:58', 0),
(9605, 260, 0, 0, 11, 'Increase suction pressure (raise evaporator temperature)', '', '', 0, 0, 0, 0, '2020-12-24 18:08:58', 0),
(9606, 260, 0, 1, 31, '<p>Increasing suction pressure raises compressor capacity, thereby allowing the compressor to operate at a lower percentage of its full-load capacity.</p>', '', '', 0, 0, 0, 0, '2020-12-24 18:08:58', 0),
(9607, 260, 0, 1, 10, 'Suction temperature is lower than 10 to 15°F below the target space/product temperature', '', '', 0, 0, 0, 0, '2020-12-24 18:08:58', 0),
(9608, 260, 0, 2, 12, 'Add evaporator capacity to increase suction pressure. Compressor savings will generally pay for the cost of installing and operating additional evaporators.', '', '', 0, 0, 0, 0, '2020-12-24 18:08:58', 0),
(9609, 260, 0, 1, 10, 'Back-pressure regulation is used to raise pressure to selected system branches with higher temperature loads', '', '', 0, 0, 0, 0, '2020-12-24 18:08:58', 0),
(9610, 260, 0, 2, 12, 'Operate loads requiring higher suction pressures and loads requiring lower suction pressures on separate systems', '', '', 0, 0, 0, 0, '2020-12-24 18:08:58', 0),
(9611, 260, 0, 1, 7, 'Set suction pressure to put the evaporator fan power and compressor power at a combined minimum. If fan savings are unavailable the suction pressure should be set as high as possible. ', '', '', 0, 0, 0, 21, '2020-12-24 18:08:58', 0),
(9612, 260, 0, 1, 8, 'Increasing suction pressure may allow operators to turn off a compressor or to use a smaller compressor in place of a larger one.', '', '', 0, 0, 0, 21, '2020-12-24 18:08:58', 0),
(9613, 260, 0, 1, 8, 'Install larger evaporator coils to maintain cooling capacity while decreasing the approach temperature difference', '', '', 0, 0, 0, 21, '2020-12-24 18:08:58', 0),
(9614, 260, 0, 1, 3, '2-3% compressor power reduction per 1°F increase in suction temperature for centrifugal machines', '', '', 0, 0, 0, 21, '2020-12-24 18:08:58', 0),
(9615, 260, 0, 1, 15, 'Current and proposed suction pressures/temperatures ', '', '', 0, 0, 0, 0, '2020-12-24 18:08:58', 0),
(9616, 260, 0, 1, 15, 'Current compressor energy use', '', '', 0, 0, 0, 0, '2020-12-24 18:08:58', 0),
(9617, 260, 0, 2, 12, 'Set data loggers to record power consumption over the compressor(s) typical operating range.', '', '', 0, 0, 0, 0, '2020-12-24 18:08:58', 0),
(9618, 260, 0, 1, 20, '', '/uploads/user_58/697b47f5ecb8474a9482471ddce67959.png', 'Pressure Enthalpy Diagram - Effect of Increasing Suction Pressure', 0, 0, 0, 0, '2020-12-24 18:08:58', 0),
(9619, 260, 0, 2, 31, '<p>The transition from point 4 to point 1 on the enthalpy pressure diagram represents the pressure and enthalpy changes associated with compression. Increasing suction pressure reduces both the pressure change (lift) and enthalpy change (work).</p>', '', '', 0, 0, 0, 0, '2020-12-24 18:08:58', 0),
(9620, 260, 0, 1, 4, 'Energy savings may only be available if efficient part-load compressor controls are used.', '', '', 0, 0, 0, 0, '2020-12-24 18:08:58', 0),
(9621, 260, 0, 0, 11, 'Decrease discharge/condensing pressure', '', '', 0, 0, 0, 0, '2020-12-24 18:08:58', 0),
(9622, 260, 0, 1, 31, '<p>Decreasing discharge pressure lowers the load on the compressor, and thereby reduces compressor power.</p>', '', '', 0, 0, 0, 0, '2020-12-24 18:08:58', 0),
(9623, 260, 0, 1, 10, 'If the condensing temperature is higher than its corresponding saturated condensing temperature, discharge pressure may be reduced. ', '', '', 0, 0, 0, 0, '2020-12-24 18:08:58', 0),
(9624, 260, 0, 1, 10, 'The condensers are operating below their full capacity. ', '', '', 0, 0, 0, 0, '2020-12-24 18:08:58', 0),
(9625, 260, 0, 1, 10, 'Approach temperature in the condensers exceeds 20°F ', '', '', 0, 0, 0, 0, '2020-12-24 18:08:58', 0),
(9626, 260, 0, 2, 12, 'Add condensing capacity to lower the approach temperature to 10-15°F above ambient. Compressor savings typically pay for the cost of installing and operating additional compressors.', '', '', 0, 0, 0, 0, '2020-12-24 18:08:58', 0),
(9627, 260, 0, 1, 7, 'Set a minimum discharge temperature, above which the discharge will be allowed to \"float\", responding to changes in the ambient saturation temperature. ', '', '', 0, 0, 0, 0, '2020-12-24 18:08:58', 0),
(9628, 260, 0, 1, 8, 'Keep an eye out for gradually increasing discharge temperature. This may indicate scaling in the condenser tubes which reduces heat transfer. Implement adequate water treatment to avoid this potential issue. ', '', '', 0, 0, 0, 0, '2020-12-24 18:08:58', 0),
(9629, 260, 0, 1, 3, 'The refrigerant condensing temperature should not be less than 35°F above the refrigerant evaporator temperature. ', '', '', 0, 0, 0, 20, '2020-12-24 18:08:58', 0),
(9630, 260, 0, 1, 3, '1-1.5% compressor power reduction per 1°F decrease in condensing temperature', '', '', 0, 0, 0, 20, '2020-12-24 18:08:58', 0),
(9631, 260, 0, 1, 15, 'Current and proposed discharge pressures', '', '', 0, 0, 0, 0, '2020-12-24 18:08:58', 0),
(9632, 260, 0, 1, 15, 'Dry and wet bulb discharge temperatures: current and proposed', '', '', 0, 0, 0, 0, '2020-12-24 18:08:58', 0),
(9633, 260, 0, 1, 15, 'Current compressor energy use', '', '', 0, 0, 0, 0, '2020-12-24 18:08:58', 0),
(9634, 260, 0, 2, 12, 'Set data loggers to record power consumption over the compressor(s) typical operating range.', '', '', 0, 0, 0, 0, '2020-12-24 18:08:58', 0),
(9635, 260, 0, 1, 4, 'Setting condensing pressure too low may cause expansion valves to malfunction ', '', '', 0, 0, 0, 0, '2020-12-24 18:08:58', 0),
(9636, 260, 0, 2, 12, 'Use a centrifugal pump to sub-cool liquid refrigerant after the condenser', '', '', 0, 0, 0, 0, '2020-12-24 18:08:58', 0),
(9637, 260, 0, 1, 4, 'Condensing temperature may be limited by the use of liquid-injection oil cooling', '', '', 0, 0, 0, 0, '2020-12-24 18:08:58', 0),
(9638, 260, 0, 2, 12, 'Switch to thermo-syphon cooling (see Reduce Compressor Power opportunity card for more information)', '', '', 0, 0, 0, 0, '2020-12-24 18:08:58', 0),
(9639, 260, 0, 1, 20, '', '/uploads/user_58/9875ac7b565991bba7a34c7c470c3c58.png', 'Pressure Enthalpy Diagram - Effect of Decreasing Discharge Pressure', 0, 0, 0, 0, '2020-12-24 18:08:58', 0),
(9640, 260, 0, 1, 31, '<p>The transition from point 4 to point 1 on the enthalpy pressure diagram represents the pressure and enthalpy changes associated with compression. Decreasing discharge pressure reduces both the pressure change (lift) and enthalpy change (work).</p>', '', '', 0, 0, 0, 0, '2020-12-24 18:08:58', 0),
(9641, 260, 0, 0, 11, 'Implement floating suction pressure', '', '', 0, 0, 0, 0, '2020-12-24 18:08:58', 0),
(9642, 260, 0, 0, 11, 'Implement floating discharge pressure', '', '', 0, 0, 0, 0, '2020-12-24 18:08:58', 0),
(9900, 142, 0, 0, 21, 'An OSU EEC Analysis Tool in Microsoft Excel Format', 'https://oregonstate.box.com/s/icsszqfo8sosqqj0jvjn741xvbw6y59v', 'Fan Control Analysis Tool (FCAT)', 0, 0, 0, 0, '2020-12-28 21:52:19', 0),
(10261, 141, 0, 0, 27, 'Digital Multimeter ', '', '', 0, 0, 0, 0, '2020-12-28 22:44:33', 0),
(10262, 141, 0, 0, 27, 'Power Data Logger', '', '', 0, 0, 0, 0, '2020-12-28 22:44:33', 0),
(10263, 141, 0, 0, 27, 'Sling Psychrometer ', '', '', 0, 0, 0, 0, '2020-12-28 22:44:33', 0),
(10264, 141, 0, 0, 27, 'Digital Thermometer', '', '', 0, 0, 0, 0, '2020-12-28 22:44:33', 0),
(10265, 141, 0, 0, 27, 'Airflow Meter', '', '', 0, 0, 0, 0, '2020-12-28 22:44:33', 0),
(10610, 271, 0, 0, 17, 'An OSU EEC Data Collection Sheet in PDF Format', 'https://drive.google.com/file/d/1B0rxYFZTuA85roOGFeeOd__c9ZdvaZzs/view?usp=sharing', 'Refrigeration Data Collection Sheet', 2, 0, 0, 0, '2020-12-30 18:26:44', 0),
(10624, 138, 0, 0, 7, 'Implement a robust energy management program that includes appropriate training of key personnel and establishes identifiable roles to create a culture of continual improvement towards energy efficiency', '', '', 0, 0, 0, 0, '2020-12-31 19:21:19', 1),
(10625, 138, 0, 0, 7, 'Use \"free cooling\" by taking advantage of low ambient air temperature whenever possible to turn down or shut down refrigeration equipment', '', '', 0, 0, 0, 0, '2020-12-31 19:21:19', 1),
(10626, 138, 0, 0, 7, 'Apply waste heat from a refrigeration system to nearby heating applications', '', '', 0, 0, 0, 0, '2020-12-31 19:21:19', 1),
(10871, 267, 0, 0, 11, 'Minimize excess refrigeration loads', '', '', 0, 0, 0, 0, '2020-12-31 19:39:17', 0),
(10872, 267, 0, 1, 31, '<p>Compressor power can be directly related to refrigeration load by the Coefficient of Performance (see Key Terms and Concepts for more information). Reducing excess refrigeration loads lowers compressor power to save energy.</p>', '', '', 0, 0, 0, 0, '2020-12-31 19:39:17', 0),
(10873, 267, 0, 1, 10, 'Excess heat gain is a substantial part of the refrigeration load from:', '', '', 0, 0, 0, 0, '2020-12-31 19:39:17', 0),
(10874, 267, 0, 2, 26, 'Lights', '', '', 0, 0, 0, 0, '2020-12-31 19:39:17', 0),
(10875, 267, 0, 2, 26, 'Open doors', '', '', 0, 0, 0, 0, '2020-12-31 19:39:17', 0),
(10876, 267, 0, 2, 26, 'Poor insulation ', '', '', 0, 0, 0, 0, '2020-12-31 19:39:17', 0),
(10877, 267, 0, 2, 26, 'Door weatherstripping ', '', '', 0, 0, 0, 0, '2020-12-31 19:39:17', 0),
(10878, 267, 0, 2, 26, 'Defrost', '', '', 0, 0, 0, 0, '2020-12-31 19:39:17', 0),
(10879, 267, 0, 2, 26, 'Floor heating', '', '', 0, 0, 0, 0, '2020-12-31 19:39:17', 0),
(10880, 267, 0, 1, 15, 'Data to collect', '', '', 0, 0, 0, 0, '2020-12-31 19:39:17', 0),
(10881, 267, 0, 2, 26, 'Room dimensions', '', '', 0, 0, 0, 0, '2020-12-31 19:39:17', 0),
(10882, 267, 0, 2, 26, 'Insulation thickness', '', '', 0, 0, 0, 0, '2020-12-31 19:39:17', 0),
(10883, 267, 0, 2, 26, 'Wall, ceiling and door temperatures', '', '', 0, 0, 0, 0, '2020-12-31 19:39:17', 0),
(10884, 267, 0, 2, 26, 'Outside temperature', '', '', 0, 0, 0, 0, '2020-12-31 19:39:17', 0),
(10885, 267, 0, 2, 26, 'Door dimensions', '', '', 0, 0, 0, 0, '2020-12-31 19:39:17', 0),
(10886, 267, 0, 2, 26, 'Number and type of doors', '', '', 0, 0, 0, 0, '2020-12-31 19:39:17', 0),
(10887, 267, 0, 2, 26, 'Time the doors spend open', '', '', 0, 0, 0, 0, '2020-12-31 19:39:17', 0),
(10888, 267, 0, 2, 26, 'Number, type, power and operating hours of lights', '', '', 0, 0, 0, 0, '2020-12-31 19:39:17', 0),
(10889, 267, 0, 2, 26, 'Lighting level in room', '', '', 0, 0, 0, 0, '2020-12-31 19:39:17', 0),
(10890, 267, 0, 3, 27, 'Light Meter', '', '', 0, 0, 0, 0, '2020-12-31 19:39:17', 0),
(10891, 267, 0, 1, 12, 'Suggested Actions', '', '', 0, 0, 0, 0, '2020-12-31 19:39:17', 0),
(10892, 267, 0, 2, 26, 'Install more efficient lighting', '', '', 0, 0, 0, 0, '2020-12-31 19:39:17', 0),
(10893, 267, 0, 2, 26, 'Increase insulation ', '', '', 0, 0, 0, 0, '2020-12-31 19:39:17', 0),
(10894, 267, 0, 2, 26, 'Reduce time doors spend open with automatic quick-close doors', '', '', 0, 0, 0, 0, '2020-12-31 19:39:17', 0),
(10895, 267, 0, 2, 26, 'Install air or strip curtains', '', '', 0, 0, 0, 0, '2020-12-31 19:39:17', 0),
(10896, 267, 0, 0, 11, 'Use thermo-syphon oil cooling', '', '', 0, 0, 0, 0, '2020-12-31 19:39:17', 0),
(10897, 267, 0, 1, 31, '<p>Liquid injection oil cooling typically consumes 5% to 15% of the compressor power to recompress injected refrigerant, while thermosyphon cooling does not consume compressor power. Thermosyphon cooling uses a heat exchanger near the compressor to cool the oil, which may require an additional condenser. This will result in increased fan energy, but less than the energy used by the compressor.</p>', '', '', 0, 0, 0, 0, '2020-12-31 19:39:17', 0),
(10898, 267, 0, 1, 10, 'Liquid-injection cooling is used to cool large compressors', '', '', 0, 0, 0, 0, '2020-12-31 19:39:17', 0),
(10899, 267, 0, 1, 3, '5% compressor power reduction from switching to thermo-syphon oil cooling from liquid-injection cooling', '', '', 0, 0, 0, 0, '2020-12-31 19:39:17', 0),
(10900, 267, 0, 1, 15, 'Annual compressor energy consumption', '', '', 0, 0, 0, 0, '2020-12-31 19:39:17', 0),
(10901, 267, 0, 1, 15, 'Refrigerant mass flow rate', '', '', 0, 0, 0, 0, '2020-12-31 19:39:17', 0),
(10902, 267, 0, 2, 26, 'Compressor volumetric flow rate', '', '', 0, 0, 0, 0, '2020-12-31 19:39:17', 0),
(10903, 267, 0, 2, 26, 'Intake refrigerant density', '', '', 0, 0, 0, 0, '2020-12-31 19:39:17', 0),
(10904, 267, 0, 0, 11, 'Install an economizer', '', '', 0, 0, 0, 0, '2020-12-31 19:39:17', 0),
(10905, 267, 0, 1, 31, '<p>After expansion, the refrigerant exists as a low-pressure liquid-vapor mixture. An economizer separates the vapor in the mixture from the liquid . Liquid refrigerant is directed to the evaporator while gas refrigerant is directed to a secondary suction port at the compressor. Refrigerant mass flow rate through the evaporators is reduced for a given load which has the effect of increasing the refrigeration capacity, thereby allowing the compressor to operate at a lower partial load.</p>', '', '', 0, 0, 0, 0, '2020-12-31 19:39:17', 0),
(10906, 267, 0, 1, 10, 'A secondary suction port is available on a screw compressor, and suction temperature is below 15 °F', '', '', 0, 0, 0, 0, '2020-12-31 19:39:17', 0),
(10907, 267, 0, 1, 8, 'Look for simple refrigeration systems used to achieve low temperatures', '', '', 0, 0, 0, 0, '2020-12-31 19:39:17', 0),
(10908, 267, 0, 1, 12, 'Contact the compressor manufacturer to determine intermediate pressure limitations and availability of economizer packages', '', '', 0, 0, 0, 0, '2020-12-31 19:39:17', 0),
(10909, 267, 0, 1, 15, 'Compressor nameplate', '', '', 0, 0, 0, 0, '2020-12-31 19:39:17', 0),
(10910, 267, 0, 1, 15, 'Measure compressor power', '', '', 0, 0, 0, 0, '2020-12-31 19:39:17', 0),
(10911, 267, 0, 1, 4, 'Economizers are only available for screw compressors and are only effective at certain percentages of compressor capacity', '', '', 0, 0, 0, 0, '2020-12-31 19:39:17', 0),
(10912, 267, 0, 0, 11, 'Operate multiple compressors economically', '', '', 0, 0, 0, 0, '2020-12-31 19:39:17', 0),
(10913, 267, 0, 1, 31, '<p>The use of multiple compressors is needed when a single machine cannot meet the demand of a refrigeration load. Depending on the type and capacity of compressors used and demand variability, different sequencing strategies will be more or less effective. The strategy that achieves the lowest combined power while adequately meeting system demand should be pursued.</p>', '', '', 0, 0, 0, 0, '2020-12-31 19:39:17', 0),
(10914, 267, 0, 1, 10, 'Multiple screw compressor(s) operating below 50% of the full-load capacity while sharing a load', '', '', 0, 0, 0, 0, '2020-12-31 19:39:17', 0),
(10915, 267, 0, 1, 7, 'Use a variable speed drive to control the output of a trim compressor while running other compressors at full capacity', '', '', 0, 0, 0, 0, '2020-12-31 19:39:17', 0),
(10916, 267, 0, 1, 8, 'Screw compressors are best suited for operating near their full-load capacities', '', '', 0, 0, 0, 0, '2020-12-31 19:39:17', 0),
(10917, 267, 0, 1, 8, 'Reciprocating compressors have nearly linear unloading characteristics, making them more suitable as trim compressors', '', '', 0, 0, 0, 0, '2020-12-31 19:39:17', 0),
(10918, 267, 0, 1, 20, '', 'https://www.researchgate.net/profile/Douglas_Reindl/publication/223757544/figure/fig2/AS:394026189639689@1470954572099/Part-load-performance-of-the-screw-and-reciprocating-compressor.png', 'Part-load performance of the reciprocating and screw compressor', 0, 0, 0, 24, '2020-12-31 19:39:17', 0),
(10919, 267, 0, 1, 12, 'Obtain unloading curves from the manufacturers of each compressor to determine an optimum load sharing strategy', '', '', 0, 0, 0, 0, '2020-12-31 19:39:17', 0),
(10920, 267, 0, 0, 31, '<p><strong class=\"ql-size-large\">Reciprocating Compressors﻿</strong></p>', '', '', 0, 0, 0, 0, '2020-12-31 19:39:17', 0),
(10921, 267, 0, 1, 14, 'Are multiple equally sized reciprocating compressors sharing a load?', '', '', 0, 0, 0, 0, '2020-12-31 19:39:17', 0),
(10922, 267, 0, 1, 12, 'Split the load to equalize pressure losses in the dry (unloaded) suction line in each compressor to optimize performance', '', '', 0, 0, 0, 24, '2020-12-31 19:39:17', 0),
(10923, 267, 0, 0, 31, '<p><strong class=\"ql-size-large\">Screw Compressors</strong></p>', '', '', 0, 0, 0, 0, '2020-12-31 19:39:17', 0),
(10924, 267, 0, 1, 14, 'Are multiple equally sized screw compressors in use? ', '', '', 0, 0, 0, 0, '2020-12-31 19:39:17', 0),
(10925, 267, 0, 1, 12, 'Sequence compressors so that a compressor never operates below 50% of its full-load capacity. ', '', '', 0, 0, 0, 0, '2020-12-31 19:39:17', 0),
(10926, 267, 0, 1, 8, 'Depending on the specific unloading characteristics of the compressors in use, there will be a crossover point where operating one or multiple compressors at full-load and one compressor at a partial load will be more economical than sharing the load equally. The crossover point occurs around 66% of the combined capacity of the compressors. ', '', '', 0, 0, 0, 24, '2020-12-31 19:39:17', 0),
(10927, 267, 0, 1, 14, 'Are two un-equally sized screw compressors in use? ', '', '', 0, 0, 0, 0, '2020-12-31 19:39:17', 0),
(10928, 267, 0, 1, 12, 'Operate the larger compressor at full capacity with the smaller at partial load up to a crossover point where it becomes more economical to run the smaller compressor at full-load and the larger at partial load. This crossover point depends on the relative compressor sizes. ', '', '', 0, 0, 0, 24, '2020-12-31 19:39:17', 0),
(10929, 267, 0, 0, 31, '<p><strong class=\"ql-size-large\">Centrifugal Compressors</strong></p>', '', '', 0, 0, 0, 0, '2020-12-31 19:39:17', 0),
(10930, 267, 0, 1, 12, 'Operate multiple centrifugal compressors at equal partial loads to minimize power', '', '', 0, 0, 0, 0, '2020-12-31 19:39:17', 0),
(10931, 267, 0, 1, 20, '', '/uploads/user_58/50c4d876db9ee3096978b1db3ac7c1a8.png', 'Partial Load Requirement for Centrifugal Refrigeration Compressors', 0, 0, 0, 20, '2020-12-31 19:39:17', 0),
(10932, 268, 0, 0, 11, 'Install VFDs on condenser fans', '', '', 0, 0, 0, 0, '2020-12-31 19:41:36', 0),
(10933, 268, 0, 1, 31, '<p>Typically condenser fans cycle on and off to maintain condensing temperature resulting in an average part-load power. A variable frequency drive can reduce this part-load power by efficiently slowing fan speed. </p>', '', '', 0, 0, 0, 0, '2020-12-31 19:41:36', 0),
(10934, 268, 0, 1, 10, 'Single or two-speed fans demand a lot of power', '', '', 0, 0, 0, 0, '2020-12-31 19:41:36', 0),
(10935, 268, 0, 1, 3, 'Ideal fan power is proportional to the cube of fan speed with a VFD', '', '', 0, 0, 0, 0, '2020-12-31 19:41:36', 0),
(10936, 268, 0, 1, 3, 'At 50% speed fans will consume about 15% of full-load power while still providing 50% airflow', '', '', 0, 0, 0, 0, '2020-12-31 19:41:36', 0),
(10937, 268, 0, 1, 8, 'Use the FCAT, an OSU EEC Microsoft Excel analysis tool (located under \"Analysis Tools\" above) to estimate fan energy savings ', '', '', 0, 0, 0, 0, '2020-12-31 19:41:36', 0),
(10938, 268, 0, 1, 15, 'Minimum condensing temperature', '', '', 0, 0, 0, 0, '2020-12-31 19:41:36', 0),
(10939, 268, 0, 1, 15, 'Total fan power', '', '', 0, 0, 0, 0, '2020-12-31 19:41:36', 0),
(10940, 268, 0, 1, 15, 'Wet and dry bulb temperatures (use bin weather data if temperature cannot be recorded over time)', '', '', 0, 0, 0, 0, '2020-12-31 19:41:36', 0),
(10941, 268, 0, 1, 15, 'Condenser MATD (measured with all fans turned on)', '', '', 0, 0, 0, 0, '2020-12-31 19:41:36', 0),
(10942, 268, 0, 1, 15, 'Fan use factor (may be available from trend logs on electronic control systems)', '', '', 0, 0, 0, 0, '2020-12-31 19:41:36', 0),
(10943, 268, 0, 0, 11, 'Install VFDs on evaporator fans', '', '', 0, 0, 0, 0, '2020-12-31 19:41:36', 0),
(10944, 268, 0, 1, 31, '<p>Typically evaporator fans cycle on and off to maintain product or storage space temperature, resulting in an average part-load power. A variable frequency drive can reduce this part-load power by efficiently slowing fan speed.</p>', '', '', 0, 0, 0, 0, '2020-12-31 19:41:36', 0),
(10945, 268, 0, 1, 10, 'Single or two-speed fans demand a lot of power', '', '', 0, 0, 0, 0, '2020-12-31 19:41:36', 0),
(10946, 268, 0, 1, 1, 'Improved product quality through maintaining consistent temperature control and constant (although lower) airflow', '', '', 0, 0, 0, 25, '2020-12-31 19:41:36', 0),
(10947, 268, 0, 1, 1, 'Improved working conditions through reduced wind-chill and fan noise ', '', '', 0, 0, 0, 25, '2020-12-31 19:41:36', 0),
(10948, 268, 0, 1, 1, 'Ability to adjust fan speed to meet specific demands of different products', '', '', 0, 0, 0, 25, '2020-12-31 19:41:36', 0),
(10949, 268, 0, 1, 2, 'Requires higher capital investment that may result in long paybacks for seasonal storage applications', '', '', 0, 0, 0, 0, '2020-12-31 19:41:36', 0),
(10950, 268, 0, 1, 3, 'Ideal fan power is proportional to the cube of fan speed with a VFD', '', '', 0, 0, 0, 0, '2020-12-31 19:41:36', 0),
(10951, 268, 0, 1, 3, 'At 50% speed fans will consume about 15% of full-load power while still providing 50% airflow', '', '', 0, 0, 0, 0, '2020-12-31 19:41:36', 0),
(10952, 268, 0, 1, 8, 'Use the FCAT, an OSU EEC Microsoft Excel analysis tool (located under \"Analysis Tools\" above) to estimate fan energy savings ', '', '', 0, 0, 0, 0, '2020-12-31 19:41:36', 0),
(10953, 268, 0, 1, 15, 'Suction pressure', '', '', 0, 0, 0, 0, '2020-12-31 19:41:36', 0),
(10954, 268, 0, 1, 15, 'Total fan power', '', '', 0, 0, 0, 0, '2020-12-31 19:41:36', 0),
(10955, 268, 0, 1, 15, 'Dry bulb temperature', '', '', 0, 0, 0, 0, '2020-12-31 19:41:36', 0),
(10956, 268, 0, 1, 15, 'Evaporator approach temperature difference', '', '', 0, 0, 0, 0, '2020-12-31 19:41:36', 0),
(10957, 268, 0, 1, 15, 'Fan cycling schedule', '', '', 0, 0, 0, 0, '2020-12-31 19:41:36', 0),
(10958, 268, 0, 0, 20, '', '/uploads/user_58/63d57fca0ba546bbea9f90a68a0f91df.png', 'Fan Power vs Capacity for 1-speed, 2-speed, and VFD Controls', 0, 0, 0, 0, '2020-12-31 19:41:36', 0),
(11036, 236, 0, 0, 10, 'Meters that consistently have relatively low charges (<$500 per month)', '', '', 0, 0, 0, 0, '2021-01-04 21:52:57', 0),
(11037, 236, 0, 0, 11, 'Combine multiple small meters together', '', '', 0, 0, 0, 0, '2021-01-04 21:52:57', 0),
(11038, 236, 0, 0, 11, 'Combine a small meter with a larger meter', '', '', 0, 0, 0, 0, '2021-01-04 21:52:57', 0),
(11061, 272, 0, 0, 11, 'Recover heat rejected from condensers', '', '', 0, 0, 0, 0, '2021-01-05 22:25:04', 0),
(11062, 272, 0, 1, 31, '<p>Most often, the heat rejected from the condensers can be used to heat a nearby process stream, thereby lowering the associated heating load.</p>', '', '', 0, 0, 0, 0, '2021-01-05 22:25:04', 0),
(11063, 272, 0, 1, 10, 'A low-temperature process is located nearby water-cooled condensers', '', '', 0, 0, 0, 0, '2021-01-05 22:25:04', 0),
(11064, 272, 0, 2, 12, 'Install split condensers to reduce the cooling tower load. A split condenser first uses a nearby process steam to precool the refrigerant before it enters a second condenser that uses cooling tower water. ', '', '', 0, 0, 0, 0, '2021-01-05 22:25:04', 0),
(11065, 272, 0, 1, 3, '14,500 Btu/hr per ton produced is rejected in the condensers', '', '', 0, 0, 0, 0, '2021-01-05 22:25:04', 0),
(11066, 272, 0, 1, 15, 'Refrigeration capacity (tons)', '', '', 0, 0, 0, 0, '2021-01-05 22:25:04', 0),
(11067, 272, 0, 1, 15, 'Temperature of refrigerant entering the condensers', '', '', 0, 0, 0, 0, '2021-01-05 22:25:04', 0),
(11068, 272, 0, 1, 15, 'Temperature of the process stream to be heated', '', '', 0, 0, 0, 0, '2021-01-05 22:25:04', 0),
(11069, 272, 0, 1, 15, 'Mass flow rates of refrigerant and process stream', '', '', 0, 0, 0, 0, '2021-01-05 22:25:04', 0),
(11070, 272, 0, 1, 15, 'Refrigerant and process fluid properties', '', '', 0, 0, 0, 0, '2021-01-05 22:25:04', 0),
(11071, 272, 0, 0, 11, 'Insulate hot/cold surfaces', '', '', 0, 0, 0, 0, '2021-01-05 22:25:04', 0),
(11072, 272, 0, 1, 31, '<p>Un-insulated cold/hot lines or tanks create unnecessary heat transfer and can result in large energy losses. Simply adding appropriate insulation on these surfaces will result in substantial energy savings.</p><p><br></p>', '', '', 0, 0, 0, 0, '2021-01-05 22:25:04', 0),
(11073, 272, 0, 1, 8, 'See Insulation on the Thermal Systems page for more information', '', '', 0, 0, 0, 0, '2021-01-05 22:25:04', 0),
(11074, 272, 0, 0, 11, 'Use hot gas defrost', '', '', 0, 0, 0, 0, '2021-01-05 22:25:04', 0),
(11075, 272, 0, 1, 31, '<p>When air cooling units operate below 32 ºF, frost inevitably builds up on evaporator coils. Frost acts as an insulator and hinders heat exchanger performance. As a result, a defrost cycle must be implemented for these systems.</p>', '', '', 0, 0, 0, 0, '2021-01-05 22:25:04', 0),
(11076, 272, 0, 1, 10, 'Electric resistance defrost current in place', '', '', 0, 0, 0, 0, '2021-01-05 22:25:04', 0),
(11077, 272, 0, 2, 12, 'Cycle hot refrigerant from the compressor discharge through the evaporator coils to melt frost.', '', '', 0, 0, 0, 0, '2021-01-05 22:25:04', 0),
(11078, 272, 0, 1, 3, 'Savings will generally be on the order of 10-20% of the total system use', '', '', 0, 0, 0, 0, '2021-01-05 22:25:04', 0),
(11079, 272, 0, 1, 15, 'Defrost cycle schedule ', '', '', 0, 0, 0, 0, '2021-01-05 22:25:04', 0),
(11080, 272, 0, 1, 15, 'Power of the current electric defrost system', '', '', 0, 0, 0, 0, '2021-01-05 22:25:04', 0),
(11081, 272, 0, 1, 15, 'Distance from compressor discharge to evaporators to determine the amount of piping required', '', '', 0, 0, 0, 0, '2021-01-05 22:25:04', 0),
(11103, 274, 0, 0, 32, '', '/uploads/user_42/9915d3d9bce8b642f08c1e19a116661d.png', 'When creating / editing a card. Press the formula (fx) button on the toolbar to enter a formula.', 0, 0, 0, 0, '2021-01-10 23:24:00', 0),
(11104, 274, 0, 0, 32, '', '/uploads/user_42/37c1d806826ddac4b33787518f99bda5.png', 'We can add as many formulas as we want. We can also mix in plain text.', 0, 0, 0, 0, '2021-01-10 23:24:00', 0),
(11143, 261, 0, 0, 1, '<p>Reducing thermal losses is an easy way to increase energy efficiency by reducing energy generation costs.</p>', '', '', 0, 0, 0, 0, '2021-01-12 21:08:43', 0),
(11144, 261, 0, 0, 1, 'Most processes involving heat transfer can benefit from either additional insulation or the installation of heat exchangers.', '', '', 0, 0, 0, 0, '2021-01-12 21:08:43', 0),
(11145, 261, 0, 0, 1, 'Strategies to increase efficiency in thermal systems can be combined and are not all mutually exclusive.', '', '', 0, 0, 0, 0, '2021-01-12 21:08:43', 0),
(11146, 261, 0, 0, 1, '<p>Some vendors sell heat exchanger and insulation packages for equipment already made to fit.</p>', '', '', 0, 0, 0, 0, '2021-01-12 21:08:43', 0),
(11147, 261, 0, 0, 1, '<p>Simple surfaces are relatively cheap to insulate.</p>', '', '', 0, 0, 0, 0, '2021-01-12 21:08:43', 0),
(11148, 262, 0, 0, 2, '<p>Heat exchangers are highly customized systems, often requiring non-generic quotes and high costs. Physical space is a factor to consider.</p>', '', '', 0, 0, 0, 0, '2021-01-12 21:09:27', 0),
(11149, 262, 0, 0, 2, 'Complex surface geometries can be difficult to insulate and require more custom solutions.', '', '', 0, 0, 0, 0, '2021-01-12 21:09:27', 0),
(11150, 262, 0, 0, 2, 'Some fuel types produce combustion gasses that may not be compatible with all heat exchangers, requiring higher cost specialty equipment.', '', '', 0, 0, 0, 0, '2021-01-12 21:09:27', 0),
(11345, 130, 0, 0, 11, 'Insulate hot surfaces', '', '', 0, 0, 0, 0, '2021-01-12 23:06:47', 0),
(11346, 130, 0, 1, 31, 'Un-insulated or poorly insulated surfaces are a significant source of lost energy. Temperature differentials between the surfaces and surroundings act as a driving force for the heat transfer between these bodies. The rate of this heat transfer is directly proportional to the magnitude of the temperature differential. Insulating these surfaces will decrease this rate of heat transfer, saving energy and improving system efficiency.', '%zXz%', '%zXz%', 0, 0, 0, 0, '2021-01-12 23:06:47', 0),
(11347, 130, 0, 1, 10, 'Facility has significant amount of uninsulated, high temperature surfaces such as steam lines, boilers, or other thermal equipment', '', '', 0, 0, 0, 0, '2021-01-12 23:06:47', 0),
(11348, 130, 0, 1, 14, 'Is there a large temperature differential between the surface and the surroundings to drive significant heat loss?', '', '', 0, 0, 0, 0, '2021-01-12 23:06:47', 0),
(11349, 130, 0, 1, 8, 'When touring a facility, if you feel heat radiating off of a surface or piece of equipment this may signal an opportunity', '', '', 0, 0, 0, 0, '2021-01-12 23:06:47', 0),
(11350, 130, 0, 1, 3, 'Insulating steam lines can reduce energy losses by as much 90% (DOE Tip Sheet)', '', '', 0, 0, 0, 0, '2021-01-12 23:06:47', 0),
(11351, 130, 0, 1, 3, 'Any surface over 120 F should be insulated (DOE Tip Sheet)', '', '', 0, 0, 0, 0, '2021-01-12 23:06:47', 0),
(11352, 130, 0, 1, 1, 'Insulating hot surfaces can improve safety along with reducing heat loss', '', '', 0, 0, 0, 0, '2021-01-12 23:06:47', 0),
(11353, 130, 0, 1, 2, 'Some insulation materials are expensive', '', '', 0, 0, 0, 0, '2021-01-12 23:06:47', 0),
(11354, 130, 0, 1, 4, 'Many different types of insulation exist and not all are suitable for specific case. Take this into consideration when choosing an insulation material', '', '', 0, 0, 0, 0, '2021-01-12 23:06:47', 0),
(11355, 130, 0, 1, 8, 'As insulation thickness is increased, there is a diminishing return on the energy saved, choose the most economical option that offers sufficient energy reduction while minimizing material cost', '', '', 0, 0, 0, 0, '2021-01-12 23:06:47', 0),
(11356, 130, 0, 1, 15, 'Surface temperature, material, geometry, surface area', '', '', 0, 0, 0, 0, '2021-01-12 23:06:47', 0),
(11357, 130, 0, 1, 15, 'Equipment operating hours', '', '', 0, 0, 0, 0, '2021-01-12 23:06:47', 0),
(11358, 130, 0, 1, 15, 'Motor nameplate information if applicable', '', '', 0, 0, 0, 0, '2021-01-12 23:06:47', 0),
(11359, 130, 0, 1, 15, 'Process fuel or electricity costs', '', '', 0, 0, 0, 0, '2021-01-12 23:06:47', 0),
(11360, 130, 0, 1, 27, 'Digital or Infrared Contact Thermometer', '', '', 0, 0, 0, 0, '2021-01-12 23:06:47', 0),
(11361, 130, 0, 1, 27, 'Thermal Imager', '', '', 0, 0, 0, 0, '2021-01-12 23:06:47', 0),
(11362, 130, 0, 1, 20, '', 'https://www.buyinsulationproductstore.com/blog/dollar-amount-savings-by-installing-fiberglass-pipe-insulation-on-steam-piping/', 'Sample thermal image showing the different heat signatures of insulated vs. uninsulated pipes', 0, 0, 0, 0, '2021-01-12 23:06:47', 0),
(11363, 130, 0, 1, 20, '', 'https://www.tcorr.com.au/coating-inspection/inspection-of-pipe-and-tank-linings/', '<p>Sample thermal image capture of uninsulated steam generating equipment</p>', 0, 0, 0, 0, '2021-01-12 23:06:47', 0),
(11364, 130, 0, 1, 24, 'US DOE Steam Tip Sheet #17', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam17_valves_fittings.pdf', 'Install Removable Insulation on Valves and Fittings', 1, 0, 0, 0, '2021-01-12 23:06:47', 0),
(11365, 130, 0, 1, 24, 'US DOE Steam Tip Sheet #2', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam2_insulate.pdf', 'Insulate Steam Distribution and Condensate Return Lines', 1, 0, 0, 0, '2021-01-12 23:06:47', 0),
(11366, 130, 0, 1, 21, '3E Plus Software', 'https://insulationinstitute.org/tools-resources/free-3e-plus/', 'PIpe Insulation | Calculate Thickness | 3E Plus Software', 1, 0, 0, 0, '2021-01-12 23:06:47', 0),
(11367, 130, 0, 1, 17, 'Example recommendation involving the installation of insulation on two drying silos', 'https://oregonstate.app.box.com/file/656776414288', 'Drying Silo Insulation', 0, 0, 0, 0, '2021-01-12 23:06:47', 0),
(11368, 130, 0, 1, 17, 'Example recommendation invovling the installation of insulation on injection barrels in a plastics and injection molding facility', 'https://oregonstate.app.box.com/file/606287338448', 'Insulate Injection Barrels', 0, 0, 0, 0, '2021-01-12 23:06:47', 0),
(11369, 130, 0, 1, 21, 'Template used to develop and present an analysis of the energy savings associated with insulating a facility\'s equipment or other hot surfaces', 'https://oregonstate.app.box.com/folder/51071018894', 'Analysis Template: Install Insulation', 0, 0, 0, 0, '2021-01-12 23:06:47', 0),
(11418, 129, 0, 0, 11, '<p>Install a Heat Exchanger Between Two Fluid Flows</p>', '', '', 0, 0, 0, 0, '2021-01-13 17:16:01', 0),
(11419, 129, 0, 1, 10, '<p>Two liquid, gas, or air flows with a large temperature difference where at least one stream requires heat treatment.</p>', '', '', 0, 0, 0, 0, '2021-01-13 17:16:01', 0),
(11420, 129, 0, 1, 31, 'Heat exchange between two fluids can be beneficial for both streams, such as hot milk coming out of pasteurization for cooling being used to preheat incoming milk. Less energy is required now to cool the pasteurized milk and the raw milk requires less heat to be added for pasteurization.', '%zXz%', '%zXz%', 0, 0, 0, 0, '2021-01-13 17:16:01', 0),
(11421, 129, 0, 1, 7, 'Heat exchangers are most effective when configured for counter-flow heat transfer', '', '', 0, 0, 0, 0, '2021-01-13 17:16:01', 0),
(11422, 129, 0, 1, 8, 'The higher the temperature difference between the fluid streams, the more heat can be exchanged', '', '', 0, 0, 0, 0, '2021-01-13 17:16:01', 0),
(11423, 129, 0, 1, 14, 'How much can the temperature of the two fluid streams change without negatively affecting the process the fluids are required for?', '', '', 0, 0, 0, 0, '2021-01-13 17:16:01', 0),
(11424, 129, 0, 1, 14, 'Can these streams be reasonably close together physically to fit into a heat exchanger?', '', '', 0, 0, 0, 0, '2021-01-13 17:16:01', 0),
(11425, 129, 0, 1, 14, 'Is there space in the room to accomodate a heat exchanger?', '', '', 0, 0, 0, 0, '2021-01-13 17:16:01', 0),
(11426, 129, 0, 1, 14, 'What kind of heat exchanger best fits the fluid stream? There are several different types.', '', '', 0, 0, 0, 0, '2021-01-13 17:16:01', 0),
(11427, 129, 0, 1, 14, 'Is the fluid stream clean or dirty?', '', '', 0, 0, 0, 0, '2021-01-13 17:16:01', 0),
(11428, 129, 0, 1, 15, 'System operation hours', '', '', 0, 0, 0, 0, '2021-01-13 17:16:01', 0),
(11429, 129, 0, 1, 15, 'Fluid properties', '', '', 0, 0, 0, 0, '2021-01-13 17:16:01', 0),
(11430, 129, 0, 1, 15, 'Density', '', '', 0, 0, 0, 0, '2021-01-13 17:16:01', 0),
(11431, 129, 0, 1, 15, 'Mass flowrate (volumetric is fine if the density is known)', '', '', 0, 0, 0, 0, '2021-01-13 17:16:01', 0),
(11432, 129, 0, 1, 15, 'Specific heat', '', '', 0, 0, 0, 0, '2021-01-13 17:16:01', 0),
(11433, 129, 0, 1, 15, 'Heating process efficiency', '', '', 0, 0, 0, 0, '2021-01-13 17:16:01', 0),
(11434, 129, 0, 1, 15, 'Available floor space', '', '', 0, 0, 0, 0, '2021-01-13 17:16:01', 0),
(11435, 129, 0, 1, 27, 'Contact thermometer (if safe)', '', '', 0, 0, 0, 0, '2021-01-13 17:16:01', 0),
(11436, 129, 0, 1, 27, 'IR thermometer', '', '', 0, 0, 0, 0, '2021-01-13 17:16:01', 0),
(11437, 129, 0, 1, 27, 'Ultrasonic flow meter if fluid flowrate is unknown and the temperatures are safe for the equipment', '', '', 0, 0, 0, 0, '2021-01-13 17:16:01', 0),
(11438, 129, 0, 1, 4, 'Pressure drop across the heat exchanger could cause a loss of performance in downstream processes', '', '', 0, 0, 0, 0, '2021-01-13 17:16:01', 0),
(11439, 129, 0, 1, 4, 'Heat exchangers can foul over time without proper maintenance and cleaning, reducing their effectiveness', '', '', 0, 0, 0, 0, '2021-01-13 17:16:01', 0),
(11440, 129, 0, 1, 4, 'Heat exchangers can become hot and should not be placed where someone may come into contact with it inadvertently', '', '', 0, 0, 0, 0, '2021-01-13 17:16:01', 0),
(11441, 129, 0, 1, 20, '', '/uploads/user_57/5a7446a3d0397ab25dc6ba0548b1ee14.png', 'A spiral heat exchanger is installed for heat transfer between hot sludge coming from anaerobic digestion and cool sludge coming from aerobic digestion. At this facility sludge was being heated going into the anaerobic digestor and then cooled when leaving to enter the aerobic digestor.', 0, 0, 0, 0, '2021-01-13 17:16:01', 0),
(11442, 129, 0, 1, 20, '', '/uploads/user_57/205aebaf756291f066a0d8a016affa14.png', 'Raw milk and pasteurized milk in this process pass through a plate heat exchanger. In the pasteurization process, raw milk is heated to kill bacteria, but must be cooled afterwards. To reduce both the heating and cooling loads, the pasteurized milk preheats the raw milk while also cooling itself.', 0, 0, 0, 0, '2021-01-13 17:16:01', 0),
(11443, 129, 0, 1, 17, 'Describes heat exchanger design for sludge in wastewater treatment facilities. This paper also contains the relevant thermodynamic properties of sludge. Understand that the characteristics of wastewater sludge is not consistent between facilities.', 'https://www.witpress.com/elibrary/wit-transactions-on-modelling-and-simulation/46/18010', 'Importance of experimental measurements and simulations for ‘sludge-to-energy’ systems', 1, 0, 0, 0, '2021-01-13 17:16:01', 0),
(11444, 129, 0, 0, 11, 'Pre-heat combustion air', '', '', 0, 0, 0, 0, '2021-01-13 17:16:01', 0),
(11445, 129, 0, 1, 10, 'Look to see if a high temperature oven/furnace is currently recycling hot air from stack.', '', '', 0, 0, 0, 0, '2021-01-13 17:16:01', 0),
(11446, 129, 0, 1, 31, 'Two different heat exchangers can be used for this opportunity, recuperators and regenerators. ', '%zXz%', '%zXz%', 0, 0, 0, 0, '2021-01-13 17:16:01', 0),
(11447, 129, 0, 2, 31, '<p><strong>Recuperators </strong>work like a standard air-to-air heat exchanger. There is a hot flow and a cold flow in which energy is transferred between with the use of internal tubes or plates. The two streams are kept in separate ducts to keep the gasses from mixing.</p>', '%zXz%', '%zXz%', 0, 0, 0, 0, '2021-01-13 17:16:01', 0),
(11448, 129, 0, 2, 1, 'Design versatility makes it easier to apply a recuperator to most applications. ', '', '', 0, 0, 0, 0, '2021-01-13 17:16:01', 0),
(11449, 129, 0, 2, 2, 'Temperature applications are dependent on material available for heat exchanger tubes. ', '', '', 0, 0, 0, 0, '2021-01-13 17:16:01', 0),
(11450, 129, 0, 2, 20, '', 'https://cdn4.explainthatstuff.com/how-heat-exchangers-work.png', 'Recuperator Schematic', 0, 0, 0, 26, '2021-01-13 17:16:01', 0),
(11451, 129, 0, 2, 31, '<p><strong>Regenerators </strong>act as heating vessels for both the combustion air and flue gases. Regenerators alternate between heating the storage medium and then taking heat from it. Usually at least two regenerators and burners are needed so that the process is uninterrupted.</p>', '%zXz%', '%zXz%', 0, 0, 0, 0, '2021-01-13 17:16:01', 0),
(11452, 129, 0, 2, 1, 'Ceramic heat sinks allow for applications in extreme temperature environments.', '', '', 0, 0, 0, 0, '2021-01-13 17:16:01', 0),
(11453, 129, 0, 2, 1, 'Resistant to corrosive environments. ', '', '', 0, 0, 0, 0, '2021-01-13 17:16:01', 0),
(11454, 129, 0, 2, 2, 'Large amount of space required.', '', '', 1, 0, 0, 0, '2021-01-13 17:16:01', 0),
(11455, 129, 0, 2, 20, '', 'https://image.slidesharecdn.com/heatexchangertypesandapplication-171015153006/95/heat-exchanger-types-and-application-13-638.jpg?cb=1508081873', 'Regenerator Schematic', 0, 0, 0, 27, '2021-01-13 17:16:01', 0),
(11456, 129, 0, 1, 4, 'Take care not to lower exhaust stack temperature too low as it can cause corrosion. This happens because the surface temperature of the stack is lower than the dew point of the flue gas flowing through the stack, causing moisture to accumulate.', '', '', 0, 0, 0, 0, '2021-01-13 17:16:01', 0),
(11457, 129, 0, 1, 8, 'Some flue gasses are corrosive and can damage installed heat exchanges. When performing an analysis, research which heat exchangers are best designed for the process in question. ', '', '', 0, 0, 0, 0, '2021-01-13 17:16:01', 0),
(11458, 129, 0, 1, 15, 'Flue gas temperature', '', '', 0, 0, 0, 0, '2021-01-13 17:16:01', 0),
(11459, 129, 0, 1, 15, 'Inlet air temperature', '', '', 0, 0, 0, 0, '2021-01-13 17:16:01', 0),
(11460, 129, 0, 1, 15, 'Fuel feed rate', '', '', 0, 0, 0, 0, '2021-01-13 17:16:01', 0),
(11461, 129, 0, 1, 15, 'Excess oxygen', '', '', 0, 0, 0, 0, '2021-01-13 17:16:01', 0),
(11462, 129, 0, 1, 15, 'Operation hours', '', '', 0, 0, 0, 0, '2021-01-13 17:16:01', 0),
(11463, 129, 0, 1, 27, 'Combustion analyzer', '', '', 0, 0, 0, 0, '2021-01-13 17:16:01', 0),
(11464, 129, 0, 1, 17, '', 'https://www.energy.gov/sites/prod/files/2014/05/f16/et_preheated.pdf', 'D.O.E. Tip Sheet', 1, 0, 0, 0, '2021-01-13 17:16:01', 0),
(11465, 129, 0, 1, 17, '', 'https://www.energysolutionscenter.org/gas_solutions/regenerators_and_recuperators.aspx#:~:text=Regenerators%20and%20recuperators%20are%20heat,metallic%20heat%20exchanger%20(recuperators).&text=The%20heat%20recovered%20by%20a,combustion%20air%20to%20a%20furnace.', 'Regenerators vs. Recuperators ', 1, 0, 0, 0, '2021-01-13 17:16:01', 0),
(12083, 286, 0, 0, 26, '<p>-</p>', '', '', 0, 0, 0, 0, '2021-01-25 17:08:21', 0),
(12163, 155, 0, 0, 26, 'Initiate a conversation with potential clients in follow up to industry requests, partner references, or direct contact.', '', '', 0, 0, 0, 0, '2021-01-26 19:31:58', 1);
INSERT INTO `Items` (`itemId`, `cardId`, `orderIndex`, `indentation`, `iconType`, `contentText`, `contentUrl`, `contentLabel`, `contentMode`, `internal`, `inline`, `sourceId`, `created`, `approved`) VALUES
(12164, 155, 0, 0, 26, 'Confirm suitability of the site and client for a remote IAC assessment', '', '', 0, 0, 0, 0, '2021-01-26 19:31:58', 1),
(12165, 155, 0, 1, 12, 'Let clients know of key IAC eligibility criteria (Annual Energy Cost between $100K and $2.5 Mil, less than 500 employees,...) ', '', '', 0, 0, 0, 0, '2021-01-26 19:31:58', 1),
(12166, 155, 0, 1, 14, 'Make sure clients are prepared for the effort required for a remote assessment (we are still learning what this is)', '', '', 0, 0, 0, 0, '2021-01-26 19:31:58', 1),
(12167, 155, 0, 2, 14, 'May be best to have an initial phone conversation with the client to determine how to best structure a remote audit based on their needs.', '', '', 0, 0, 0, 0, '2021-01-26 19:31:58', 1),
(12168, 155, 0, 1, 14, 'Ensure someone at the site can \"walk us through\" or at least go to targeted locations while with us on the phone to ask questions, perhaps get pictures or videos, and really dig into details. (This step is important for our contract with U.S.DOE)', '', '', 0, 0, 0, 0, '2021-01-26 19:31:58', 1),
(12169, 155, 0, 0, 26, 'Send the standard OSU Pre-Assessment Package to appropriate clients ', '', '', 0, 0, 0, 0, '2021-01-26 19:31:58', 1),
(12170, 155, 0, 1, 17, '<p>(item not added yet)</p>', 'https://docs.google.com/document/d/1SSk8Ks463YfySrxLr5o5zK08DLoDzkGMIEkecBMs51s/edit', 'Pre_Assessment Package Template', 0, 0, 0, 0, '2021-01-26 19:31:58', 1),
(12203, 113, 0, 0, 27, 'Power Quality Analyzer ', '', '', 0, 0, 0, 0, '2021-01-26 19:50:58', 1),
(12204, 113, 0, 0, 27, '<p>Strobe (optional: to measure slip)</p>', '', '', 0, 0, 0, 0, '2021-01-26 19:50:58', 1),
(12294, 118, 0, 0, 11, 'Use variable frequency drives where appropriate', '', '', 0, 0, 0, 0, '2021-01-26 20:10:03', 1),
(12295, 118, 0, 1, 10, '<p>Large motors attached to loads that are resistance controlled (throttle valves, brakes, etc)</p>', '', '', 0, 0, 0, 0, '2021-01-26 20:10:03', 1),
(12323, 117, 0, 0, 24, 'External Website with Industrial Motor Articles', 'https://www.plantservices.com/category/motors_drives_power_trans', 'Plant Services: Industrial Motors', 1, 0, 0, 0, '2021-02-04 00:17:05', 1),
(12324, 117, 0, 0, 24, 'EASA Accreditation Auditor', 'https://www.greenmotors.org/', 'Green Motors Practices Group', 1, 0, 0, 0, '2021-02-04 00:17:06', 1),
(12351, 214, 0, 0, 31, 'Conditioning air for painting, drying and treating emissions all represent sources of energy consumption in a painting process. Energy saving measures may be available at each one of these steps.', '%zXz%', '%zXz%', 0, 0, 0, 13, '2021-01-26 21:51:29', 1),
(12352, 214, 0, 0, 11, 'Reduce airflow in paint booth', '', '', 0, 0, 0, 0, '2021-01-26 21:51:29', 1),
(12353, 214, 0, 1, 31, '<p>Air must be exhausted from paint booths to remove evaporated solvent, oversprayed paint particles and pollutants such as volatile organic compounds (VOCs). The energy consumed by the ventilation system depends on the target outlet concentration of VOCs. VOCs come from the paint and they are removed from the exhaust air stream through filtration or incineration.</p>', '%zXz%', '%zXz%', 0, 0, 0, 13, '2021-01-26 21:51:29', 1),
(12354, 214, 0, 1, 26, 'Reducing the amount of air that is exhausted from the paint booth reduces the amount of fuel required to raise the temperature of the inlet air to the target temperature, and reduces the volume of exhaust air that must be treated.', '', '', 0, 0, 0, 0, '2021-01-26 21:51:29', 1),
(12355, 214, 0, 1, 4, 'If the air flow rate through the booth is too low, cold spots may be present which lead to poor application and condensation.', '', '', 0, 0, 0, 13, '2021-01-26 21:51:29', 1),
(12356, 214, 0, 1, 26, '<p>Some paint booths also function as curing ovens, these are often called \"spray and bake\" systems. During spray mode the booth operates with a high flow rate of low temperature (60-90<span class=\"ql-formula\" data-value=\"\\degree\">﻿<span contenteditable=\"false\"><span class=\"katex\"><span class=\"katex-mathml\"><math><semantics><mrow><mi>°</mi></mrow><annotation encoding=\"application/x-tex\">\\degree</annotation></semantics></math></span><span class=\"katex-html\" aria-hidden=\"true\"><span class=\"base\"><span class=\"strut\" style=\"height:0.69444em;vertical-align:0em\"></span><span class=\"mord\">°</span></span></span></span></span>﻿</span>F, 15-32<span class=\"ql-formula\" data-value=\"\\degree\">﻿<span contenteditable=\"false\"><span class=\"katex\"><span class=\"katex-mathml\"><math><semantics><mrow><mi>°</mi></mrow><annotation encoding=\"application/x-tex\">\\degree</annotation></semantics></math></span><span class=\"katex-html\" aria-hidden=\"true\"><span class=\"base\"><span class=\"strut\" style=\"height:0.69444em;vertical-align:0em\"></span><span class=\"mord\">°</span></span></span></span></span>﻿</span>C) air. During the curing mode, the temperature set point is raised to the 80-200<span class=\"ql-formula\" data-value=\"\\degree\">﻿<span contenteditable=\"false\"><span class=\"katex\"><span class=\"katex-mathml\"><math><semantics><mrow><mi>°</mi></mrow><annotation encoding=\"application/x-tex\">\\degree</annotation></semantics></math></span><span class=\"katex-html\" aria-hidden=\"true\"><span class=\"base\"><span class=\"strut\" style=\"height:0.69444em;vertical-align:0em\"></span><span class=\"mord\">°</span></span></span></span></span>﻿</span>F (27-93<span class=\"ql-formula\" data-value=\"\\degree\">﻿<span contenteditable=\"false\"><span class=\"katex\"><span class=\"katex-mathml\"><math><semantics><mrow><mi>°</mi></mrow><annotation encoding=\"application/x-tex\">\\degree</annotation></semantics></math></span><span class=\"katex-html\" aria-hidden=\"true\"><span class=\"base\"><span class=\"strut\" style=\"height:0.69444em;vertical-align:0em\"></span><span class=\"mord\">°</span></span></span></span></span>﻿</span>C) range.</p>', '', '', 0, 0, 0, 0, '2021-01-26 21:51:29', 1),
(12357, 214, 0, 1, 7, 'For air recirculating ovens, 90% of the air in the booth should be recirculated', '', '', 0, 0, 0, 13, '2021-01-26 21:51:29', 1),
(12358, 214, 0, 1, 3, '<p>For every 2,000 hrs/yr that an oven operates, every 10 cubic meters per hour (5.9 CFM) of exhaust flow loses 150 kWh at 50C (512 kBtu at 122<span class=\"ql-formula\" data-value=\"\\degree\">﻿<span contenteditable=\"false\"><span class=\"katex\"><span class=\"katex-mathml\"><math><semantics><mrow><mi>°</mi></mrow><annotation encoding=\"application/x-tex\">\\degree</annotation></semantics></math></span><span class=\"katex-html\" aria-hidden=\"true\"><span class=\"base\"><span class=\"strut\" style=\"height:0.69444em;vertical-align:0em\"></span><span class=\"mord\">°</span></span></span></span></span>﻿</span>F), 400 kWh at 100<span class=\"ql-formula\" data-value=\"\\degree\">﻿<span contenteditable=\"false\"><span class=\"katex\"><span class=\"katex-mathml\"><math><semantics><mrow><mi>°</mi></mrow><annotation encoding=\"application/x-tex\">\\degree</annotation></semantics></math></span><span class=\"katex-html\" aria-hidden=\"true\"><span class=\"base\"><span class=\"strut\" style=\"height:0.69444em;vertical-align:0em\"></span><span class=\"mord\">°</span></span></span></span></span>﻿</span>C (1.4 MMBtu at 212<span class=\"ql-formula\" data-value=\"\\degree\">﻿<span contenteditable=\"false\"><span class=\"katex\"><span class=\"katex-mathml\"><math><semantics><mrow><mi>°</mi></mrow><annotation encoding=\"application/x-tex\">\\degree</annotation></semantics></math></span><span class=\"katex-html\" aria-hidden=\"true\"><span class=\"base\"><span class=\"strut\" style=\"height:0.69444em;vertical-align:0em\"></span><span class=\"mord\">°</span></span></span></span></span>﻿</span>F), 600 kWh at 150<span class=\"ql-formula\" data-value=\"\\degree\">﻿<span contenteditable=\"false\"><span class=\"katex\"><span class=\"katex-mathml\"><math><semantics><mrow><mi>°</mi></mrow><annotation encoding=\"application/x-tex\">\\degree</annotation></semantics></math></span><span class=\"katex-html\" aria-hidden=\"true\"><span class=\"base\"><span class=\"strut\" style=\"height:0.69444em;vertical-align:0em\"></span><span class=\"mord\">°</span></span></span></span></span>﻿</span>C (2.0 MMBtu at 302<span class=\"ql-formula\" data-value=\"\\degree\">﻿<span contenteditable=\"false\"><span class=\"katex\"><span class=\"katex-mathml\"><math><semantics><mrow><mi>°</mi></mrow><annotation encoding=\"application/x-tex\">\\degree</annotation></semantics></math></span><span class=\"katex-html\" aria-hidden=\"true\"><span class=\"base\"><span class=\"strut\" style=\"height:0.69444em;vertical-align:0em\"></span><span class=\"mord\">°</span></span></span></span></span>﻿</span>F), and 750 kWh at 200<span class=\"ql-formula\" data-value=\"\\degree\">﻿<span contenteditable=\"false\"><span class=\"katex\"><span class=\"katex-mathml\"><math><semantics><mrow><mi>°</mi></mrow><annotation encoding=\"application/x-tex\">\\degree</annotation></semantics></math></span><span class=\"katex-html\" aria-hidden=\"true\"><span class=\"base\"><span class=\"strut\" style=\"height:0.69444em;vertical-align:0em\"></span><span class=\"mord\">°</span></span></span></span></span>﻿</span>C (2.6 MMBtu at 392<span class=\"ql-formula\" data-value=\"\\degree\">﻿<span contenteditable=\"false\"><span class=\"katex\"><span class=\"katex-mathml\"><math><semantics><mrow><mi>°</mi></mrow><annotation encoding=\"application/x-tex\">\\degree</annotation></semantics></math></span><span class=\"katex-html\" aria-hidden=\"true\"><span class=\"base\"><span class=\"strut\" style=\"height:0.69444em;vertical-align:0em\"></span><span class=\"mord\">°</span></span></span></span></span>﻿</span>F)</p>', '', '', 0, 0, 0, 13, '2021-01-26 21:51:29', 1),
(12359, 214, 0, 1, 12, 'Turn down air flow rates during breaks to realize immediate cost savings.', '', '', 0, 0, 0, 0, '2021-01-26 21:51:29', 1),
(12360, 214, 0, 1, 1, 'Computer-controlled ventilation systems can operate based on solvent concentration in the paint booth or by spray gun operation.', '', '', 0, 0, 0, 13, '2021-01-26 21:51:29', 1),
(12361, 214, 0, 0, 11, 'Exhaust heat recovery', '', '', 0, 0, 0, 0, '2021-01-26 21:51:29', 1),
(12362, 214, 0, 1, 8, 'Heat recovery measures typically save 30-60% of energy consumption associated with a paint booth and have a 1-3 year payback period', '', '', 0, 0, 0, 12, '2021-01-26 21:51:29', 1),
(12363, 214, 0, 1, 1, 'Rotary heat exchangers can be installed on paint booths to save up to 50% of the exhausted heat', '', '', 0, 0, 0, 13, '2021-01-26 21:51:29', 1),
(12364, 214, 0, 1, 2, 'Heat recovered from paint booths is low-grade heat', '', '', 0, 0, 0, 0, '2021-01-26 21:51:29', 1),
(12365, 214, 0, 1, 2, 'These installations are of interest mainly to large scale painting operations', '', '', 0, 0, 0, 0, '2021-01-26 21:51:29', 1),
(12366, 214, 0, 1, 2, 'Heat wheels do not perform well with streams that have particles or where condensation occur', '', '', 0, 0, 0, 0, '2021-01-26 21:51:29', 1),
(12367, 214, 0, 0, 11, 'Change to powder-based paints', '', '', 0, 0, 0, 0, '2021-01-26 21:51:29', 1),
(12368, 214, 0, 1, 1, 'Powder-based paints do not have solvents, the paint particles are attracted to the part by an applied electrostatic charge. The energy requirement for powder-based painting can be up to 30% lower due to the reduced energy consumption associated with eliminating VOCs from the exhaust stream.', '', '', 0, 0, 0, 13, '2021-01-26 21:51:29', 1),
(12369, 214, 0, 1, 8, 'These measures can save 18-30% of energy consumption associated with a paint booth and have a 2-3 year payback period', '', '', 0, 0, 0, 12, '2021-01-26 21:51:29', 1),
(12370, 214, 0, 0, 11, 'Install an air-to-fuel ratio control system on the paint booth air heater', '', '', 0, 0, 0, 0, '2021-01-26 21:51:29', 1),
(12371, 214, 0, 1, 3, 'This may reduce energy consumption associated with combustion by 5-15% depending on demand', '', '', 0, 0, 0, 13, '2021-01-26 21:51:29', 1),
(12372, 214, 0, 0, 11, 'Install activated carbon filters to remove VOCs from the exhaust stream', '', '', 0, 0, 0, 0, '2021-01-26 21:51:29', 1),
(12373, 214, 0, 1, 26, 'Activated carbon filters capture and concentrate VOCs from the exhaust stream reducing the amount of air that must be treated by incineration', '', '', 0, 0, 0, 0, '2021-01-26 21:51:29', 1),
(12374, 214, 0, 0, 11, '<p>Install occupancy sensors in paint booth</p>', '', '', 0, 1, 0, 0, '2021-01-26 21:51:29', 1),
(12375, 214, 0, 0, 11, '<p>Turn off high-intensity lighting when paint booth is not being used</p>', '', '', 0, 1, 0, 0, '2021-01-26 21:51:29', 1),
(12376, 214, 0, 0, 11, '<p>Use direct-to-metal paint to eliminate the priming process</p>', '', '', 0, 1, 0, 0, '2021-01-26 21:51:29', 1),
(12378, 211, 0, 0, 11, 'Install localized welding ventilation', '', '', 0, 0, 0, 0, '2021-01-26 21:53:18', 1),
(12379, 211, 0, 1, 31, '<p>Welding processes must be well ventilated to protect personnel from fumes. Controlled ventilation can reduce the amount of air exhausted outside, and therefore energy losses, while adequately ventilating the welding process.</p>', '%zXz%', '%zXz%', 0, 0, 0, 0, '2021-01-26 21:53:18', 1),
(12380, 211, 0, 1, 26, 'Reduce ventilation energy losses by installing localized ducting above welding stations', '', '', 0, 0, 0, 0, '2021-01-26 21:53:18', 1),
(12381, 211, 0, 1, 26, 'Welding areas must be ventilated to maintain air quality standards specified by the Oregon Health and Safety Administration (OSHA)', '', '', 0, 0, 0, 0, '2021-01-26 21:53:18', 1),
(12382, 211, 0, 1, 15, 'Identify the source of heating and cooling for the building and the associated cost of operating the equipment. This may be packaged HVAC units , gas/electric heaters, etc. ', '', '', 0, 0, 0, 0, '2021-01-26 21:53:18', 1),
(12383, 211, 0, 1, 15, 'Heating degree days for the local area. Temperature bin data can be obtained from the National Ocean and Atmospheric Administration (NOAA).', '', '', 0, 0, 0, 0, '2021-01-26 21:53:18', 1),
(12384, 211, 0, 1, 15, 'Current exhaust air flow rate and the minimum exhaust air flow rate required by health and safety regulations', '', '', 0, 0, 0, 0, '2021-01-26 21:53:18', 1),
(12385, 211, 0, 1, 15, 'Quantity of welders or welding stations', '', '', 0, 0, 0, 0, '2021-01-26 21:53:18', 1),
(12386, 211, 0, 1, 15, 'Approximate the proposed length of ventilation required for the installation to estimate the cost of implementation', '', '', 0, 0, 0, 0, '2021-01-26 21:53:18', 1),
(12398, 285, 0, 0, 27, '<p>Flow meter (ultrasonic or in-line)</p>', '', '', 0, 0, 0, 0, '2021-01-26 22:03:13', 1),
(12399, 285, 0, 0, 27, '<p>Pressure gage</p>', '', '', 0, 0, 0, 0, '2021-01-26 22:03:13', 1),
(12400, 285, 0, 0, 27, '<p>Digital Multimeter</p>', '', '', 0, 0, 0, 0, '2021-01-26 22:03:13', 1),
(12469, 194, 0, 0, 26, 'The IAC Industrial Control Systems Cybersecurity Assessment Tool is a 20-question survey that can provide a starting place for a cybersecurity program. This tool is located on the Industrial Assessment Center’s cybersecurity webpage, as well as several other cybersecurity resources.', '', '', 0, 0, 0, 0, '2021-01-26 22:46:27', 1),
(12470, 194, 0, 1, 21, ' ', 'https://iac.university/cybersecurity', 'Industrial Control Systems Cybersecurity Assessment Tool', 1, 0, 0, 0, '2021-01-26 22:46:27', 1),
(12471, 194, 0, 0, 26, 'The US Department of Energy released the Cybersecurity Capability Maturity Model (C2M2) to evaluate an organization’s cybersecurity capabilities regardless of their structure, size, or organization type. This includes a self-evaluation and proposed model.', '', '', 1, 0, 0, 0, '2021-01-26 22:46:27', 1),
(12472, 194, 0, 1, 21, ' ', 'https://www.energy.gov/ceser/activities/cybersecurity-critical-energy-infrastructure/energy-sector-cybersecurity-0-0 ', 'Cybersecurity Capability Maturity Model (C2M2)', 1, 0, 0, 0, '2021-01-26 22:46:27', 1),
(12473, 195, 0, 0, 26, 'The Cybersecurity and Infrastructure Security Agency (CISA, a part of the US Department of Homeland Security) has created the Cyber Security Evaluation Tool (CSET). This tool is a provides a comprehensive self-assessment and recommendations to fix potential vulnerabilities. The CSET focuses on industrial control systems and information technology network security.', '', '', 0, 0, 0, 0, '2021-01-26 22:46:33', 1),
(12474, 195, 0, 1, 21, ' ', 'https://us-cert.cisa.gov/ics/Assessments', 'Cyber Security Evaluation Tool (CSET)', 1, 0, 0, 0, '2021-01-26 22:46:33', 1),
(12475, 195, 0, 0, 26, 'CISA also offers the Cyber Resilience Review which is a free non-technical cybersecurity self-assessment. This process can also be completed with professionals from the Department of Homeland Security.', '', '', 1, 0, 0, 0, '2021-01-26 22:46:33', 1),
(12476, 195, 0, 1, 21, ' ', 'https://us-cert.cisa.gov/resources/assessments ', 'Cyber Resilience Review ', 1, 0, 0, 0, '2021-01-26 22:46:33', 1),
(12477, 197, 0, 0, 26, 'Researchers from the University of Illinois Urbana-Champaign have developed a tool for manufacturers to simplify the understanding of cybersecurity standards created by the National Institute of Standards and Technology. This tool also follows DFARS, the Department of Defense’s acquisition regulations.', '', '', 0, 0, 0, 0, '2021-01-26 22:46:48', 1),
(12478, 197, 0, 1, 21, ' ', 'https://iti.illinois.edu/news/new-software-tool-help-manufacturing-companies-meet-complex-cyber-security-standards ', 'The Dashboard', 1, 0, 0, 0, '2021-01-26 22:46:48', 1),
(12479, 96, 0, 0, 27, 'Combustion Analyzer ', '', '', 0, 0, 0, 0, '2021-01-26 22:55:09', 1),
(12480, 96, 0, 0, 27, '<p>Digital Contact or Infrared Thermometer</p>', '', '', 0, 0, 0, 0, '2021-01-26 22:55:09', 1),
(12481, 96, 0, 0, 8, 'An IR camera can help identify hot spots to insulate', '', '', 0, 0, 0, 0, '2021-01-26 22:55:09', 1),
(12506, 276, 0, 0, 14, 'Why is the incremental cost of a meter relatively low?', '', '', 0, 0, 0, 0, '2021-01-27 18:07:34', 0),
(12507, 276, 0, 1, 26, 'The provider may be purchasing the utility as a commodity', '', '', 0, 0, 0, 0, '2021-01-27 18:07:34', 0),
(12508, 276, 0, 1, 12, 'Consult your provider\'s website or utility representative', '', '', 0, 0, 0, 0, '2021-01-27 18:07:34', 0),
(12509, 276, 0, 0, 14, 'What is reactive power and how is it charged?', '', '', 0, 0, 0, 0, '2021-01-27 18:07:34', 0),
(12510, 276, 0, 1, 12, '<p>See Power Factor Correction Page</p>', '', '', 0, 0, 0, 0, '2021-01-27 18:07:34', 0),
(12511, 276, 0, 0, 14, 'What if there are numerous meters under $500 per month?', '', '', 0, 0, 0, 0, '2021-01-27 18:07:34', 0),
(12512, 276, 0, 1, 26, 'Some small meters may be consolidated into one for analysis', '', '', 0, 0, 0, 0, '2021-01-27 18:07:34', 0),
(12513, 276, 0, 1, 26, 'Alternatively, other small meters significantly less than $500 per month may also be omitted from analysis', '', '', 0, 0, 0, 0, '2021-01-27 18:07:34', 0),
(12514, 276, 0, 0, 14, 'Why does the published rate schedules from the provider not match the rates on the bills?', '', '', 0, 0, 0, 0, '2021-01-27 18:07:34', 0),
(12515, 276, 0, 1, 26, 'Check the publish date on the rate schedule.  It may be outdated, particularly for online resources.', '', '', 0, 0, 0, 0, '2021-01-27 18:07:34', 0),
(12516, 276, 0, 1, 12, 'Use the most recent rate for analysis', '', '', 0, 0, 0, 0, '2021-01-27 18:07:34', 0),
(12517, 276, 0, 1, 8, 'These analyses are estimates.  It is okay if discrepancies between the bills and the rate schedules.', '', '', 0, 0, 0, 0, '2021-01-27 18:07:34', 0),
(12527, 214, 0, 0, 31, 'Conditioning air for painting, drying and treating emissions all represent sources of energy consumption in a painting process. Energy saving measures may be available at each one of these steps.', '%zXz%', '%zXz%', 0, 0, 0, 13, '2021-01-28 23:00:31', 0),
(12528, 214, 0, 0, 11, 'Reduce airflow in paint booth', '', '', 0, 0, 0, 0, '2021-01-28 23:00:31', 0),
(12529, 214, 0, 1, 31, '<p>Air must be exhausted from paint booths to remove evaporated solvent, oversprayed paint particles and pollutants such as volatile organic compounds (VOCs). The energy consumed by the ventilation system depends on the target outlet concentration of VOCs. VOCs come from the paint and they are removed from the exhaust air stream through filtration or incineration.</p>', '%zXz%', '%zXz%', 0, 0, 0, 13, '2021-01-28 23:00:31', 0),
(12530, 214, 0, 1, 26, 'Reducing the amount of air that is exhausted from the paint booth reduces the amount of fuel required to raise the temperature of the inlet air to the target temperature, and reduces the volume of exhaust air that must be treated.', '', '', 0, 0, 0, 0, '2021-01-28 23:00:31', 0),
(12531, 214, 0, 1, 4, 'If the air flow rate through the booth is too low, cold spots may be present which lead to poor application and condensation.', '', '', 0, 0, 0, 13, '2021-01-28 23:00:31', 0),
(12532, 214, 0, 1, 26, '<p>Some paint booths also function as curing ovens, these are often called \"spray and bake\" systems. During spray mode the booth operates with a high flow rate of low temperature (60-90<span class=\"ql-formula\" data-value=\"\\degree\">﻿<span contenteditable=\"false\"><span class=\"katex\"><span class=\"katex-mathml\"><math><semantics><mrow><mi>°</mi></mrow><annotation encoding=\"application/x-tex\">\\degree</annotation></semantics></math></span><span class=\"katex-html\" aria-hidden=\"true\"><span class=\"base\"><span class=\"strut\" style=\"height:0.69444em;vertical-align:0em\"></span><span class=\"mord\">°</span></span></span></span></span>﻿</span>F, 15-32<span class=\"ql-formula\" data-value=\"\\degree\">﻿<span contenteditable=\"false\"><span class=\"katex\"><span class=\"katex-mathml\"><math><semantics><mrow><mi>°</mi></mrow><annotation encoding=\"application/x-tex\">\\degree</annotation></semantics></math></span><span class=\"katex-html\" aria-hidden=\"true\"><span class=\"base\"><span class=\"strut\" style=\"height:0.69444em;vertical-align:0em\"></span><span class=\"mord\">°</span></span></span></span></span>﻿</span>C) air. During the curing mode, the temperature set point is raised to the 80-200<span class=\"ql-formula\" data-value=\"\\degree\">﻿<span contenteditable=\"false\"><span class=\"katex\"><span class=\"katex-mathml\"><math><semantics><mrow><mi>°</mi></mrow><annotation encoding=\"application/x-tex\">\\degree</annotation></semantics></math></span><span class=\"katex-html\" aria-hidden=\"true\"><span class=\"base\"><span class=\"strut\" style=\"height:0.69444em;vertical-align:0em\"></span><span class=\"mord\">°</span></span></span></span></span>﻿</span>F (27-93<span class=\"ql-formula\" data-value=\"\\degree\">﻿<span contenteditable=\"false\"><span class=\"katex\"><span class=\"katex-mathml\"><math><semantics><mrow><mi>°</mi></mrow><annotation encoding=\"application/x-tex\">\\degree</annotation></semantics></math></span><span class=\"katex-html\" aria-hidden=\"true\"><span class=\"base\"><span class=\"strut\" style=\"height:0.69444em;vertical-align:0em\"></span><span class=\"mord\">°</span></span></span></span></span>﻿</span>C) range.</p>', '', '', 0, 0, 0, 0, '2021-01-28 23:00:31', 0),
(12533, 214, 0, 1, 7, 'For air recirculating ovens, 90% of the air in the booth should be recirculated', '', '', 0, 0, 0, 13, '2021-01-28 23:00:31', 0),
(12534, 214, 0, 1, 3, '<p>For every 2,000 hrs/yr that an oven operates, every 10 cubic meters per hour (5.9 CFM) of exhaust flow loses 150 kWh at 50C (512 kBtu at 122<span class=\"ql-formula\" data-value=\"\\degree\">﻿<span contenteditable=\"false\"><span class=\"katex\"><span class=\"katex-mathml\"><math><semantics><mrow><mi>°</mi></mrow><annotation encoding=\"application/x-tex\">\\degree</annotation></semantics></math></span><span class=\"katex-html\" aria-hidden=\"true\"><span class=\"base\"><span class=\"strut\" style=\"height:0.69444em;vertical-align:0em\"></span><span class=\"mord\">°</span></span></span></span></span>﻿</span>F), 400 kWh at 100<span class=\"ql-formula\" data-value=\"\\degree\">﻿<span contenteditable=\"false\"><span class=\"katex\"><span class=\"katex-mathml\"><math><semantics><mrow><mi>°</mi></mrow><annotation encoding=\"application/x-tex\">\\degree</annotation></semantics></math></span><span class=\"katex-html\" aria-hidden=\"true\"><span class=\"base\"><span class=\"strut\" style=\"height:0.69444em;vertical-align:0em\"></span><span class=\"mord\">°</span></span></span></span></span>﻿</span>C (1.4 MMBtu at 212<span class=\"ql-formula\" data-value=\"\\degree\">﻿<span contenteditable=\"false\"><span class=\"katex\"><span class=\"katex-mathml\"><math><semantics><mrow><mi>°</mi></mrow><annotation encoding=\"application/x-tex\">\\degree</annotation></semantics></math></span><span class=\"katex-html\" aria-hidden=\"true\"><span class=\"base\"><span class=\"strut\" style=\"height:0.69444em;vertical-align:0em\"></span><span class=\"mord\">°</span></span></span></span></span>﻿</span>F), 600 kWh at 150<span class=\"ql-formula\" data-value=\"\\degree\">﻿<span contenteditable=\"false\"><span class=\"katex\"><span class=\"katex-mathml\"><math><semantics><mrow><mi>°</mi></mrow><annotation encoding=\"application/x-tex\">\\degree</annotation></semantics></math></span><span class=\"katex-html\" aria-hidden=\"true\"><span class=\"base\"><span class=\"strut\" style=\"height:0.69444em;vertical-align:0em\"></span><span class=\"mord\">°</span></span></span></span></span>﻿</span>C (2.0 MMBtu at 302<span class=\"ql-formula\" data-value=\"\\degree\">﻿<span contenteditable=\"false\"><span class=\"katex\"><span class=\"katex-mathml\"><math><semantics><mrow><mi>°</mi></mrow><annotation encoding=\"application/x-tex\">\\degree</annotation></semantics></math></span><span class=\"katex-html\" aria-hidden=\"true\"><span class=\"base\"><span class=\"strut\" style=\"height:0.69444em;vertical-align:0em\"></span><span class=\"mord\">°</span></span></span></span></span>﻿</span>F), and 750 kWh at 200<span class=\"ql-formula\" data-value=\"\\degree\">﻿<span contenteditable=\"false\"><span class=\"katex\"><span class=\"katex-mathml\"><math><semantics><mrow><mi>°</mi></mrow><annotation encoding=\"application/x-tex\">\\degree</annotation></semantics></math></span><span class=\"katex-html\" aria-hidden=\"true\"><span class=\"base\"><span class=\"strut\" style=\"height:0.69444em;vertical-align:0em\"></span><span class=\"mord\">°</span></span></span></span></span>﻿</span>C (2.6 MMBtu at 392<span class=\"ql-formula\" data-value=\"\\degree\">﻿<span contenteditable=\"false\"><span class=\"katex\"><span class=\"katex-mathml\"><math><semantics><mrow><mi>°</mi></mrow><annotation encoding=\"application/x-tex\">\\degree</annotation></semantics></math></span><span class=\"katex-html\" aria-hidden=\"true\"><span class=\"base\"><span class=\"strut\" style=\"height:0.69444em;vertical-align:0em\"></span><span class=\"mord\">°</span></span></span></span></span>﻿</span>F)</p>', '', '', 0, 0, 0, 13, '2021-01-28 23:00:31', 0),
(12535, 214, 0, 1, 12, 'Turn down air flow rates during breaks to realize immediate cost savings.', '', '', 0, 0, 0, 0, '2021-01-28 23:00:31', 0),
(12536, 214, 0, 1, 1, 'Computer-controlled ventilation systems can operate based on solvent concentration in the paint booth or by spray gun operation.', '', '', 0, 0, 0, 13, '2021-01-28 23:00:31', 0),
(12537, 214, 0, 0, 11, 'Exhaust heat recovery', '', '', 0, 0, 0, 0, '2021-01-28 23:00:31', 0),
(12538, 214, 0, 1, 8, 'Heat recovery measures typically save 30-60% of energy consumption associated with a paint booth and have a 1-3 year payback period', '', '', 0, 0, 0, 12, '2021-01-28 23:00:31', 0),
(12539, 214, 0, 1, 1, 'Rotary heat exchangers can be installed on paint booths to save up to 50% of the exhausted heat', '', '', 0, 0, 0, 13, '2021-01-28 23:00:31', 0),
(12540, 214, 0, 1, 2, 'Heat recovered from paint booths is low-grade heat', '', '', 0, 0, 0, 0, '2021-01-28 23:00:31', 0),
(12541, 214, 0, 1, 2, 'These installations are of interest mainly to large scale painting operations', '', '', 0, 0, 0, 0, '2021-01-28 23:00:31', 0),
(12542, 214, 0, 1, 2, 'Heat wheels do not perform well with streams that have particles or where condensation occur', '', '', 0, 0, 0, 0, '2021-01-28 23:00:31', 0),
(12543, 214, 0, 0, 11, 'Change to powder-based paints', '', '', 0, 0, 0, 0, '2021-01-28 23:00:31', 0),
(12544, 214, 0, 1, 1, 'Powder-based paints do not have solvents, the paint particles are attracted to the part by an applied electrostatic charge. The energy requirement for powder-based painting can be up to 30% lower due to the reduced energy consumption associated with eliminating VOCs from the exhaust stream.', '', '', 0, 0, 0, 13, '2021-01-28 23:00:31', 0),
(12545, 214, 0, 1, 8, 'These measures can save 18-30% of energy consumption associated with a paint booth and have a 2-3 year payback period', '', '', 0, 0, 0, 12, '2021-01-28 23:00:31', 0),
(12546, 214, 0, 0, 11, 'Install an air-to-fuel ratio control system on the paint booth air heater', '', '', 0, 0, 0, 0, '2021-01-28 23:00:31', 0),
(12547, 214, 0, 1, 3, 'This may reduce energy consumption associated with combustion by 5-15% depending on demand', '', '', 0, 0, 0, 13, '2021-01-28 23:00:31', 0),
(12548, 214, 0, 0, 11, 'Install activated carbon filters to remove VOCs from the exhaust stream', '', '', 0, 0, 0, 0, '2021-01-28 23:00:31', 0),
(12549, 214, 0, 1, 26, 'Activated carbon filters capture and concentrate VOCs from the exhaust stream reducing the amount of air that must be treated by incineration', '', '', 0, 0, 0, 0, '2021-01-28 23:00:31', 0),
(12550, 214, 0, 0, 11, '<p>Install occupancy sensors in paint booth</p>', '', '', 0, 1, 0, 0, '2021-01-28 23:00:31', 0),
(12551, 214, 0, 0, 11, '<p>Turn off high-intensity lighting when paint booth is not being used</p>', '', '', 0, 1, 0, 0, '2021-01-28 23:00:31', 0),
(12552, 214, 0, 0, 11, '<p>Use direct-to-metal paint to eliminate the priming process</p>', '', '', 0, 1, 0, 0, '2021-01-28 23:00:31', 0),
(12560, 215, 0, 0, 31, '<p>The following opportunities are specific to metals manufacturing facilities. For more opportunities related to compressed air, go to the <a href=\"https://walkthrough.eec.oregonstate.edu/wiki/technologies/2\">Compressed Air</a> Technologies page.</p>', '%zXz%', '%zXz%', 0, 0, 0, 0, '2021-01-28 23:01:56', 0),
(12561, 215, 0, 0, 11, 'Replace the pistons on stamping die cushions with air actuators', '', '', 0, 0, 0, 0, '2021-01-28 23:01:56', 0),
(12562, 215, 0, 1, 31, 'Die cushions on large stamping presses are used to support inserts in the lower die.', '%zXz%', '%zXz%', 0, 0, 0, 13, '2021-01-28 23:01:56', 0),
(12563, 215, 0, 1, 26, 'Die cushions can produce significant air leaks, up to 100 CFM in some cases, after moderate use. Air actuators are more resilient and can operate without air leaks for over five years.', '', '', 0, 0, 0, 13, '2021-01-28 23:01:56', 0),
(12564, 3, 0, 0, 32, '', 'https://i.imgur.com/V0dkW5l.png', 'Screw compressor power vs output for various control strategies', 0, 0, 0, 0, '2021-01-28 23:04:45', 1),
(12565, 72, 0, 0, 20, '', 'https://live.staticflickr.com/65535/50066459491_bb3c3291c5_b.jpg', 'Dry sprinkler systems need compressed air', 0, 0, 0, 0, '2021-01-28 23:05:35', 1),
(12566, 72, 0, 0, 20, '', 'https://live.staticflickr.com/65535/50065906203_65746ac38f_b.jpg', 'Blow off wand and hose', 0, 0, 0, 0, '2021-01-28 23:05:35', 1),
(12567, 72, 0, 0, 20, '', 'https://live.staticflickr.com/65535/50065907458_f8a2a9a7e0_b.jpg', 'Air Motors used to mix paint can be replaced with explosion proof electric motors', 0, 0, 0, 0, '2021-01-28 23:05:35', 1),
(12568, 72, 0, 0, 20, '', 'https://live.staticflickr.com/65535/50066721727_a6607851c0_b.jpg', 'Compressed Air Receiver Tank', 0, 0, 0, 0, '2021-01-28 23:05:35', 1),
(12569, 72, 0, 0, 20, '', 'https://live.staticflickr.com/65535/50065907313_a2869ef070_b.jpg', 'Industrial Screw Compressor', 0, 0, 0, 0, '2021-01-28 23:05:35', 1),
(12570, 72, 0, 0, 20, '', 'https://live.staticflickr.com/65535/50065907073_1a989d028d_b.jpg', 'Compressed Air Receiver Tamk', 0, 0, 0, 0, '2021-01-28 23:05:35', 1),
(12571, 72, 0, 0, 20, '', 'https://live.staticflickr.com/65535/50065907213_978efa0976_b.jpg', '<p>Blow off wands with and without an engineered nozzle</p>', 0, 0, 0, 0, '2021-01-28 23:05:35', 1),
(12572, 72, 0, 0, 20, '', 'https://live.staticflickr.com/65535/50066720932_da2c3b0b6c_b.jpg', 'Small reciprocating industrial air compressor', 0, 0, 0, 0, '2021-01-28 23:05:35', 1),
(12573, 72, 0, 0, 20, '', 'https://live.staticflickr.com/65535/50065907503_d75eb615cf_b.jpg', 'Desiccant compressed air dryer ', 0, 0, 0, 0, '2021-01-28 23:05:35', 1),
(12574, 72, 0, 0, 20, '', 'https://live.staticflickr.com/65535/50066722032_f62637039d_b.jpg', 'Compressed Air Receiver Tank', 0, 0, 0, 0, '2021-01-28 23:05:35', 1),
(12575, 72, 0, 0, 20, '', 'https://live.staticflickr.com/65535/50065907438_e7f7d53ba4_b.jpg', 'Refrigerated compressed air dryer', 0, 0, 0, 0, '2021-01-28 23:05:35', 1),
(12576, 101, 0, 0, 11, 'Tune the boiler regularly', '', '', 0, 0, 0, 0, '2021-02-02 20:48:00', 0),
(12577, 101, 0, 1, 10, 'O2 readings in the exhaust are high for the fuel type (&gt;3% for gaseous fuels, &gt;8% for solid fuels)', '', '', 0, 0, 0, 0, '2021-02-02 20:48:00', 0),
(12578, 101, 0, 1, 15, 'Combustion analysis at representative firing rates (high, medium, low, standby)', '', '', 0, 0, 1, 0, '2021-02-02 20:48:00', 0),
(12579, 101, 0, 1, 15, 'Firing rate over time', '', '', 0, 0, 1, 0, '2021-02-02 20:48:00', 0),
(12580, 101, 0, 1, 21, 'An OSU EEC Analysis Template in Microsoft Excel Format (unapproved, old style)', 'https://drive.google.com/file/d/1Z9GbxV0nr-OuxT2cNLxkdo82Wpq-h70m/view?usp=sharing', 'Boiler Tune Template', 0, 1, 0, 0, '2021-02-02 20:48:00', 0),
(12581, 101, 0, 0, 11, 'Install O2 Controls to maintain optimum combustion efficiency throughout the operating range', '', '', 0, 0, 0, 0, '2021-02-02 20:48:00', 0),
(12582, 101, 0, 1, 10, 'The boiler spends a significant portion of time at partial fire and lower efficiency', '', '', 0, 0, 0, 0, '2021-02-02 20:48:00', 0),
(12583, 101, 0, 0, 11, 'Clean heat exchanger surfaces and reduce the exhaust temperature', '', '', 0, 0, 0, 0, '2021-02-02 20:48:00', 0),
(12584, 101, 0, 1, 10, 'Stack temperature exceeds steam temperature by over 150 ˚F', '', '', 0, 0, 0, 0, '2021-02-02 20:48:00', 0),
(12585, 101, 0, 1, 12, 'Clean the fire side. Soot can accumulate and inhibit heat transfer.', '', '', 0, 0, 0, 0, '2021-02-02 20:48:00', 0),
(12586, 101, 0, 1, 12, 'Clean the water side. Scale can accumulate and inhibit heat transfer is the water chemistry is off', '', '', 0, 0, 0, 0, '2021-02-02 20:48:00', 0),
(12587, 101, 0, 0, 11, 'Install an economizer (non condensing)', '', '', 0, 0, 0, 0, '2021-02-02 20:48:00', 0),
(12588, 101, 0, 1, 10, 'Boilers rated at 100 BoHP or higher operating at greater than 75 psig.', '', '', 0, 0, 0, 0, '2021-02-02 20:48:00', 0),
(12589, 101, 0, 1, 31, 'Economizers can be used to preheat incoming feedwater, reducing the energy required for boiling.', '%zXz%', '%zXz%', 0, 0, 0, 0, '2021-02-02 20:48:00', 0),
(12590, 101, 0, 1, 3, 'Typically increases efficiency by around 2-4%.', '', '', 0, 0, 0, 0, '2021-02-02 20:48:00', 0),
(12591, 101, 0, 1, 3, 'For every 40°F decrease in flue gas temperature there is a 1% increase in efficiency', '', '', 0, 0, 0, 0, '2021-02-02 20:48:00', 0),
(12592, 101, 0, 1, 3, 'Can often reduce fuel requirements by 10%', '', '', 0, 0, 0, 0, '2021-02-02 20:48:00', 0),
(12593, 101, 0, 1, 8, 'Best suited for boilers with flue gasses containing sulfur or other potentially acidic elements/compounds.', '', '', 0, 0, 0, 0, '2021-02-02 20:48:00', 0),
(12594, 101, 0, 1, 4, 'Flue gasses containing sulphur must remain above dew point. Condensation of sulphuric acid can cause corrosion and damage the system.', '', '', 0, 0, 0, 0, '2021-02-02 20:48:00', 0),
(12595, 101, 0, 1, 2, 'Cannot recover as much energy from the boiler stack as a condensing economizer.', '', '', 0, 0, 0, 0, '2021-02-02 20:48:00', 0),
(12596, 101, 0, 1, 14, 'Does the boiler contain potentially acidic elements/compounds such as sulfur?', '', '', 0, 0, 0, 0, '2021-02-02 20:48:00', 0),
(12597, 101, 0, 1, 14, 'Would a condensing economizer be a better alternative?', '', '', 0, 0, 0, 0, '2021-02-02 20:48:00', 0),
(12598, 101, 0, 1, 14, 'Is there adequate space for an economizer?', '', '', 0, 0, 0, 0, '2021-02-02 20:48:00', 0),
(12599, 101, 0, 1, 14, 'What is the greatest temperature that the flue gasses can be reduced by without causing condensation?', '', '', 0, 0, 0, 0, '2021-02-02 20:48:00', 0),
(12600, 101, 0, 1, 27, 'Combustion analyzer', '', '', 0, 0, 0, 0, '2021-02-02 20:48:00', 0),
(12601, 101, 0, 1, 15, 'Flue gas temperature', '', '', 0, 0, 1, 0, '2021-02-02 20:48:00', 0),
(12602, 101, 0, 1, 15, 'Fuel used', '', '', 0, 0, 1, 0, '2021-02-02 20:48:00', 0),
(12603, 101, 0, 1, 15, 'Operating hours', '', '', 0, 0, 1, 0, '2021-02-02 20:48:00', 0),
(12604, 101, 0, 1, 15, 'Water mass flowrate', '', '', 0, 0, 1, 0, '2021-02-02 20:48:00', 0),
(12605, 101, 0, 1, 15, 'Water temperatures', '', '', 0, 0, 1, 0, '2021-02-02 20:48:00', 0),
(12606, 101, 0, 1, 15, 'Steam temperature and pressure', '', '', 0, 0, 1, 0, '2021-02-02 20:48:00', 0),
(12607, 101, 0, 1, 15, 'Boiler efficiency', '', '', 0, 0, 1, 0, '2021-02-02 20:48:00', 0),
(12608, 101, 0, 1, 17, 'Department of Energy tip sheet that provides an example case study of a boiler feedwater economizer being installed, as well as general considerations.', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam3_recovery.pdf', 'Use Feedwater Economizers for Waste Heat Recovery', 1, 0, 0, 0, '2021-02-02 20:48:00', 0),
(12609, 101, 0, 0, 11, 'Install a condensing economizer', '', '', 0, 0, 0, 0, '2021-02-02 20:48:00', 0),
(12610, 101, 0, 1, 10, 'Boilers rate at 100 BoHP or higher operating at greater that 75 psig that do not user fuels with sulphurous products.', '', '', 0, 0, 0, 0, '2021-02-02 20:48:00', 0),
(12611, 101, 0, 1, 3, 'Can increase efficiency by up to 10%', '', '', 0, 0, 0, 0, '2021-02-02 20:48:00', 0),
(12612, 101, 0, 1, 3, 'Can increase boiler efficiency to over 90%', '', '', 0, 0, 0, 0, '2021-02-02 20:48:00', 0),
(12613, 101, 0, 1, 1, 'Can recover more energy from the boiler stack by reducing flue gas temperature below dew point.', '', '', 0, 0, 0, 0, '2021-02-02 20:48:00', 0),
(12614, 101, 0, 1, 2, 'Not recommended for use with fuels containing sulphur.', '', '', 0, 0, 0, 0, '2021-02-02 20:48:00', 0),
(12615, 101, 0, 1, 2, 'The condensed water may be acidic, requiring treatment before being disharged to sewer systems.', '', '', 0, 0, 0, 0, '2021-02-02 20:48:00', 0),
(12616, 101, 0, 1, 4, 'Fuels with sulphurous combustions can damage the boiler stack when condensing, creating sulphuric acid.', '', '', 0, 0, 0, 0, '2021-02-02 20:48:00', 0),
(12617, 101, 0, 1, 4, 'Boiler stacks are prone to corrosion due to water condensation.', '', '', 0, 0, 0, 0, '2021-02-02 20:48:00', 0),
(12618, 101, 0, 1, 14, 'Does the boiler\'s fuel contain potentially acidic elements/compounds such as sulfur?', '', '', 0, 0, 0, 0, '2021-02-02 20:48:00', 0),
(12619, 101, 0, 1, 14, 'What is the greatest temperature the flue gasses can be reduced by?', '', '', 0, 0, 0, 0, '2021-02-02 20:48:00', 0),
(12620, 101, 0, 1, 27, 'Combustion analyzer', '', '', 0, 0, 0, 0, '2021-02-02 20:48:00', 0),
(12621, 101, 0, 1, 15, 'Flue gas temperature', '', '', 0, 0, 1, 0, '2021-02-02 20:48:00', 0),
(12622, 101, 0, 1, 15, 'Flue gas composition', '', '', 0, 0, 1, 0, '2021-02-02 20:48:00', 0),
(12623, 101, 0, 1, 15, 'Fuel used', '', '', 0, 0, 1, 0, '2021-02-02 20:48:00', 0),
(12624, 101, 0, 1, 15, 'Operating hours', '', '', 0, 0, 1, 0, '2021-02-02 20:48:00', 0),
(12625, 101, 0, 1, 15, 'Water mass flowrate', '', '', 0, 0, 1, 0, '2021-02-02 20:48:00', 0),
(12626, 101, 0, 1, 15, 'Water temperatures', '', '', 0, 0, 1, 0, '2021-02-02 20:48:00', 0),
(12627, 101, 0, 1, 15, 'Steam temperature/pressure', '', '', 0, 0, 1, 0, '2021-02-02 20:48:00', 0),
(12628, 101, 0, 1, 15, 'Boiler efficiency', '', '', 0, 0, 1, 0, '2021-02-02 20:48:00', 0),
(12629, 101, 0, 1, 12, 'Complete a more in-depth study evaluating the benefits of a condensing economizer and how it may impact the water and how the boiler operates.', '', '', 0, 0, 0, 0, '2021-02-02 20:48:00', 0),
(12630, 101, 0, 1, 12, 'Contact a vendor for more implementation details. Condensing economizers are custom made for each boiler.', '', '', 0, 0, 0, 0, '2021-02-02 20:48:00', 0),
(12631, 101, 0, 1, 24, 'This webpage lists the epcific heats and gas constants for different gasses. This is uesd for calculating the properties of the flue gasses.', 'https://www.engineeringtoolbox.com/specific-heat-capacity-gases-d_159.html', 'Specific Heat and Individual Gas Constant of Gases', 1, 0, 0, 0, '2021-02-02 20:48:00', 0),
(12632, 101, 0, 1, 17, 'Department of Energy tip sheet that explains how a condensing economizer works and how it saves energy, along with example scenarios', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam26a_condensing.pdf', 'Consider Installing a Condensing Economizer', 1, 0, 0, 0, '2021-02-02 20:48:00', 0),
(12633, 101, 0, 1, 17, 'Department of Energy tip sheet that explains special considerations that need to be taken into account when choosing to do projects with condensing economizers.', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam26b_condensing.pdf', 'Considerations When Selecting a Condensing Economizer', 1, 0, 0, 0, '2021-02-02 20:48:00', 0),
(12713, 100, 0, 0, 17, 'United Nations Industrial Development Organization Document', 'https://www.unido.org/sites/default/files/2017-11/SSO-Manual-Print-FINAL-20161109-One-Page-V2.pdf', 'Manual for Industrial Steam Systems Assessment and Optimization', 1, 0, 0, 0, '2021-02-02 21:08:52', 0),
(12714, 100, 0, 0, 25, 'Pacific NW Boiler Vendor', 'https://coleindust.com/', 'Cole Industrial', 1, 0, 0, 0, '2021-02-02 21:08:52', 0),
(12715, 100, 0, 0, 25, 'Pacific NW Boiler Vendor', 'https://www.nationwideboiler.com/pacific-combustion-engineering.html', 'Pacific Combustion Engineering', 1, 0, 0, 0, '2021-02-02 21:08:52', 0),
(12716, 100, 0, 0, 25, 'Boiler Manufacturer', 'http://cleaverbrooks.com/', 'CleaverBrooks', 1, 0, 0, 0, '2021-02-02 21:08:52', 0),
(12717, 100, 0, 0, 24, 'TLV Steam Theory site. Contains several pages that explain steam systems and equations.', 'https://www.tlv.com/global/US/steam-theory/how-to-read-a-steam-table.html', 'TLV Steam Theory\nHow to read a Steam Table', 1, 0, 0, 0, '2021-02-02 21:08:52', 0),
(12718, 100, 0, 0, 24, 'Engineering Toolbox, Complete steam tables with options for converting units', 'https://www.engineeringtoolbox.com/saturated-steam-properties-d_273.html', 'Steam Table', 1, 0, 0, 0, '2021-02-02 21:08:52', 0),
(12719, 212, 0, 0, 11, 'Increase Spray Painting Efficiency', '', '', 0, 0, 0, 0, '2021-02-03 22:30:27', 0),
(12720, 212, 0, 1, 8, 'Training paint personnel to reduce overspray in painting applications can significantly reduce annual paint consumption, extend booth filter life, and reduce associated disposal costs. ', '', '', 0, 0, 0, 0, '2021-02-03 22:30:27', 0),
(12721, 212, 0, 1, 26, 'Paint booths are often present in metals manufacturing facilities that produce final products or components', '', '', 0, 0, 0, 0, '2021-02-03 22:30:27', 0),
(12722, 212, 0, 1, 26, 'Operator spray technique and equipment settings can be adjusted to minimize paint overspray. Equipment settings include paint gun adjustment, equipment maintenance, and paint gun distance and orientation.', '', '', 0, 0, 0, 0, '2021-02-03 22:30:27', 0),
(12723, 212, 0, 1, 1, 'Painting efficiency can be improved by as much 25% for even the most experienced painters with increased attention to application techniques', '', '', 0, 0, 0, 6, '2021-02-03 22:30:27', 0),
(12724, 212, 0, 1, 15, 'Annual consumption of paint and associated cost', '', '', 0, 0, 0, 0, '2021-02-03 22:30:27', 0),
(12725, 212, 0, 1, 3, 'Proposed savings can be conservatively estimated at 10-15% reduction in paint consumption. Percent savings may approach 25% if the recommended techniques are replicated and adhered to.', '', '', 0, 0, 0, 0, '2021-02-03 22:30:27', 0),
(12747, 179, 0, 0, 15, 'Pump nameplate', '', '', 0, 0, 1, 0, '2021-02-03 22:47:47', 1),
(12748, 179, 0, 0, 15, 'Motor nameplate', '', '', 0, 0, 1, 0, '2021-02-03 22:47:47', 1),
(12749, 179, 0, 0, 15, 'Pump curve data', '', '', 0, 0, 1, 0, '2021-02-03 22:47:47', 1),
(12750, 179, 0, 0, 15, 'Pump RPM', '', '', 0, 0, 1, 0, '2021-02-03 22:47:47', 1),
(12751, 179, 0, 0, 15, 'Pump inlet and outlet diameter', '', '', 0, 0, 1, 0, '2021-02-03 22:47:47', 1),
(12752, 179, 0, 0, 15, 'Pump type', '', '', 0, 0, 1, 0, '2021-02-03 22:47:47', 1),
(12753, 179, 0, 0, 15, 'Simultaneous live amperage or power, flow rate, and inlet &amp; outlet operating pressure (system head)', '', '', 0, 0, 1, 0, '2021-02-03 22:47:47', 1),
(12756, 125, 0, 0, 32, '', '/uploads/user_55/215ed3c31cbc4dec9d0ffcdc21ee5a39.jpg', 'Sample Pump Curve', 0, 0, 0, 0, '2021-02-03 22:49:07', 1),
(12757, 125, 0, 0, 32, '', '/uploads/user_55/83a92c72662cbec1f08d0c7686c6af33.jpg', 'Sample Pump Nameplate', 0, 0, 0, 0, '2021-02-03 22:49:07', 1),
(12758, 183, 0, 0, 20, '', '/uploads/user_51/b3eaaad1e725ebf461f901a693ec6753.jpg', '<p>Pump Impeller and Body With Cavitation Marks</p>', 0, 0, 0, 0, '2021-02-03 22:49:43', 1),
(12759, 183, 0, 0, 20, '', '/uploads/user_51/8f6ed30ce2cbd75b6d40f99b796cd6c2.jpg', '<p>Centrifugal Pump</p>', 0, 0, 0, 0, '2021-02-03 22:49:43', 1),
(12760, 183, 0, 0, 20, '', '/uploads/user_51/7f680841f445d41826bd3285a8e05234.jpg', '<p>Centrifugal (Vertical Turbine) Pump</p>', 0, 0, 0, 0, '2021-02-03 22:49:43', 1),
(12761, 247, 0, 0, 31, 'Simulation is the process where a physical system is simplified and reproduced in a way that will approximate the area of interest. The complexity of a simulation ranges from simple static simulation such as Monty Carlo simulations done with spreadsheets to dynamic and complex systems with multiple sources of input such as online multiplayer games. In industry simulations are useful for modeling how a machine will function to predict failures, finding bottlenecks in processes, identifying potential cash flow issues and many other things.', '%zXz%', '%zXz%', 0, 0, 0, 0, '2021-02-03 22:53:41', 0),
(12762, 247, 0, 0, 31, 'Small scale simulation is an often overlooked part of manufacturing. Although think of the CAD models that contain moving parts, there are many opportunities for simulations of financial outcomes that would be to complex to solve with stochastic models. One of the common tools for such a situations call Crystal Ball. Financial simulation are most practical when they are designed by an season decision maker who can use their intuition to determine possible outcome, opposed to a computer programmer who lacks the knowledge about the real world system. ', '', '', 0, 0, 0, 0, '2021-02-03 22:53:41', 0),
(12822, 82, 0, 0, 31, 'One of the most common and inefficient methods to control a centrifugal pump is to restrict its flow. As the pressure is increased the flow is reduced. However, work required to deliver the reduced flow is greater than would otherwise be required.', '', '', 0, 0, 0, 0, '2021-02-03 23:08:09', 1),
(12823, 82, 0, 0, 8, 'If pump is oversized and flow is constantly at a reduced level see recommendations improving pump efficiency by using an optimally sized pump.', '', '', 0, 0, 0, 0, '2021-02-03 23:08:09', 1),
(12824, 82, 0, 0, 11, 'Replace Valve Control with Variable Speed Drive Control', '', '', 0, 0, 0, 0, '2021-02-03 23:08:09', 1),
(12825, 82, 0, 1, 31, 'Pumps are often designed to operate at specific conditions, installing a Variable Speed Drive can allow the pump to supply a wider range of flows while remaining near it\'s best efficiency point', '%zXz%', '%zXz%', 0, 0, 0, 0, '2021-02-03 23:08:09', 1),
(12826, 82, 0, 1, 10, 'Pumps throttled or supplying excess fluid to a process', '', '', 0, 0, 0, 0, '2021-02-03 23:08:09', 1),
(12827, 82, 0, 1, 8, 'Pumps operating over a range of flow conditions may be particularly suited for VFD control', '', '', 0, 0, 0, 0, '2021-02-03 23:08:09', 1),
(12828, 82, 0, 1, 14, 'Would a resized pump or impeller trim be more suitable for the application?', '', '', 0, 0, 0, 0, '2021-02-03 23:08:09', 1),
(12829, 82, 0, 1, 1, 'Allows efficient operation over wider range of flow conditions', '', '', 0, 0, 0, 0, '2021-02-03 23:08:09', 1),
(12830, 82, 0, 1, 2, 'VFDs are expensive - becoming more affordable in recent years', '', '', 0, 0, 0, 0, '2021-02-03 23:08:09', 1),
(12831, 82, 0, 1, 4, 'Networks with multiple pumps operating in parallel or series need to be carefully considered before recommending VFD control', '', '', 0, 0, 0, 0, '2021-02-03 23:08:09', 1),
(12832, 82, 0, 1, 4, 'For high static head conditions (pumping to high pressure vessel or high elevation tank) take care in evaluating pump operation with VFD control.  Pumps can be forced into low efficiency, high wear conditions with inappropriate high static head VFD control.', '', '', 1, 0, 0, 0, '2021-02-03 23:08:09', 1),
(12833, 82, 0, 1, 4, 'VFDs can harm the motor if they are not properly installed', '', '', 0, 0, 0, 0, '2021-02-03 23:08:09', 1),
(12834, 82, 0, 1, 7, 'Install grounding shaft to divert VFD induced voltages away from the motor', '', '', 0, 0, 0, 0, '2021-02-03 23:08:09', 1),
(12835, 82, 0, 1, 15, 'Pump nameplate/motor nameplate', '', '', 0, 0, 0, 0, '2021-02-03 23:08:09', 1),
(12836, 82, 0, 1, 15, 'Flow rates, pressure readings, live amperage data', '', '', 0, 0, 0, 0, '2021-02-03 23:08:09', 1),
(12837, 82, 0, 1, 17, 'An OSU EEC Analysis Template in Microsoft Excel Format', 'https://oregonstate.app.box.com/file/606303033065', 'Analysis Template: Install VFDs on Process Pumps', 2, 0, 0, 0, '2021-02-03 23:08:09', 1),
(12838, 82, 0, 0, 11, 'Eliminate Bypass Control', '', '', 0, 0, 0, 0, '2021-02-03 23:08:09', 1);
INSERT INTO `Items` (`itemId`, `cardId`, `orderIndex`, `indentation`, `iconType`, `contentText`, `contentUrl`, `contentLabel`, `contentMode`, `internal`, `inline`, `sourceId`, `created`, `approved`) VALUES
(12839, 82, 0, 1, 31, 'Bypass controls can be an extremely inefficient method for controlling flow. In the best case, pump energy use is constant regardless of required flow. In the worst case, energy used increases with reduced flow. In this case a reduction in flow requires more energy to recirculate the diverted fluid and does not add any value to the finished product. ', '', '', 0, 0, 0, 0, '2021-02-03 23:08:09', 1),
(12840, 82, 0, 0, 11, 'Replace On/Off Control with Continuous Flow Control When Appropriate', '', '', 0, 0, 0, 0, '2021-02-03 23:08:09', 1),
(12841, 82, 0, 1, 31, 'For a set total volume of liquid to move, On/Off control results in higher velocity, flow rate, and friction loss to overcome than delivering the same volume over a longer period of time at a slower velocity and flow rate. ', '', '', 0, 0, 0, 0, '2021-02-03 23:08:09', 1),
(12858, 83, 0, 0, 11, 'Eliminate \"Overflow Control\" on Tanks', '', '', 0, 0, 0, 0, '2021-02-03 23:21:16', 1),
(12859, 83, 0, 1, 31, '\"Overflow Control\" refers to systems designed with a pump that operates continuously  to fill a vessel and then keeps operating when full, allowing excess fill to spill out as overflow. Energy to move this excess fluid is lost. ', '', '', 0, 0, 0, 0, '2021-02-03 23:21:16', 1),
(12860, 83, 0, 0, 11, 'Look for Opportunity to Reduced Defined Flow Requirements ', '', '', 0, 0, 0, 0, '2021-02-03 23:21:16', 1),
(12861, 83, 0, 1, 31, ' If flow that must be developed by a pump can be reduced, energy can be saved. For example: cooling water flows can exceed that needed by the end uses. Pumps can instead be controlled to maintain a set temperature increase or return temperature on the cooling water.', '', '', 0, 0, 0, 0, '2021-02-03 23:21:16', 1),
(12867, 84, 0, 0, 11, 'Reduce Line Losses (Larger Diameter Pipes, etc)', '', '', 0, 0, 0, 0, '2021-02-03 23:38:18', 1),
(12868, 84, 0, 1, 31, 'The work a pump must perform increases with line losses. Clearing obstructions, using larger diameter lines and fittings, and using parallel lines when available can reduce the head loss the pump must overcome.', '', '', 0, 0, 0, 0, '2021-02-03 23:38:18', 1),
(12869, 84, 0, 0, 11, 'Use \"Least Closed Valve\" Strategy on Pumping Networks Serving Multiple End Points.', '', '', 0, 0, 0, 0, '2021-02-03 23:38:18', 1),
(12870, 84, 0, 1, 31, 'If a pumping network serves multiple end uses, for the lowest required pumping pressure and energy, at least one end use should not require a valve to reduce pressure to target levels for the end use. This can require specialized control if target end use pressures vary.', '', '', 0, 0, 0, 0, '2021-02-03 23:38:18', 1),
(12871, 84, 0, 0, 11, 'Eliminate or Reduce Fluid \"Free Fall\" at Discharge Point.', '', '', 0, 0, 0, 0, '2021-02-03 23:38:18', 1),
(12872, 84, 0, 1, 31, '\"Free Fall\" distance at a discharge point represents additional head that the pumping system must provide. If a \"down tube\" is added to the discharge, the siphon effect will reduce head required.', '', '', 0, 0, 0, 0, '2021-02-03 23:38:18', 1),
(12873, 84, 0, 1, 4, 'Take care to ensure that the siphon effect will not induce flow when not desired: for instance emptying a tank when not intended. ', '', '', 0, 0, 0, 0, '2021-02-03 23:38:18', 1),
(12874, 84, 0, 0, 11, 'Look for Opportunity to Reduced Defined Pressure Requirements ', '', '', 0, 0, 0, 0, '2021-02-03 23:38:18', 1),
(12875, 84, 0, 1, 31, 'If pressure that must be developed by a pump can be reduced, energy can be saved. For example pumps often deliver flow to an end point at a pressure that must be reduced with a valve to a maximum pressure for the application.', '', '', 0, 0, 0, 0, '2021-02-03 23:38:18', 1),
(12921, 85, 0, 0, 31, 'Pump efficiency is very dependent upon flow and pressure, and the pump\'s operating characteristics. For a particular pump at a given rpm there is one optimal operating point of flow and pressure. As the pressure changes, flow changes and operating efficiency is also affected. If system conditions have changed since the initial selection of the pump, it may be operating at a particularly inefficient operating point.  If flow requirements are significantly reduced after selection,  the resulting oversized pump often works continuously against a throttle causing even greater inefficiencies.', '', '', 0, 0, 0, 0, '2021-02-03 23:50:01', 1),
(12922, 85, 0, 0, 8, 'If a pump is oversized to handle variable flow requirements then see the recommendation for more efficient controls', '', '', 0, 0, 0, 0, '2021-02-03 23:50:01', 1),
(12923, 85, 0, 0, 11, 'Trim Pump Impeller for Better Efficiency at Typical Operating Points', '', '', 0, 0, 0, 0, '2021-02-03 23:50:01', 1),
(12924, 85, 0, 0, 31, 'A pump\'s operating characteristics can be adjusted by re-sizing the impeller. On a given system, it may be possible to achieve greater efficiency with a different pump impeller.', '', '', 0, 0, 0, 0, '2021-02-03 23:50:01', 1),
(12925, 85, 0, 0, 11, 'Replace Pump with One Selected for Optimum Efficiency at Typical Operating Points', '', '', 0, 0, 0, 0, '2021-02-03 23:50:01', 1),
(12926, 85, 0, 1, 10, 'Older pumps that have not been adjusted or calibrated to fit existing demand.', '', '', 0, 0, 0, 0, '2021-02-03 23:50:01', 1),
(12927, 85, 0, 1, 15, 'Pressure across the pump', '', '', 0, 0, 1, 0, '2021-02-03 23:50:01', 1),
(12928, 85, 0, 1, 15, 'Fluid flow rate', '', '', 0, 0, 1, 0, '2021-02-03 23:50:01', 1),
(12929, 85, 0, 1, 15, 'Operating hours', '', '', 0, 0, 1, 0, '2021-02-03 23:50:01', 1),
(12930, 85, 0, 1, 15, 'Pump curve and nameplate', '', '', 0, 0, 1, 0, '2021-02-03 23:50:01', 1),
(12931, 85, 0, 1, 15, 'Elevation change', '', '', 0, 0, 1, 0, '2021-02-03 23:50:01', 1),
(12932, 85, 0, 1, 15, 'Type of fluid', '', '', 0, 0, 1, 0, '2021-02-03 23:50:01', 1),
(12933, 85, 0, 1, 27, 'Power Quality Analyzer (PQA)', '', '', 0, 0, 0, 0, '2021-02-03 23:50:01', 1),
(12934, 85, 0, 1, 27, 'Ultrasonic flow meter', '', '', 0, 0, 0, 0, '2021-02-03 23:50:01', 1),
(12935, 85, 0, 1, 8, 'Try to find nearby pressure gauges to estimate pressure change across the pump.', '', '', 0, 0, 0, 0, '2021-02-03 23:50:01', 1),
(12936, 85, 0, 1, 8, 'Pick a pump based on its best efficiency point matching current operating conditions.', '', '', 0, 0, 0, 0, '2021-02-03 23:50:01', 1),
(12937, 85, 0, 1, 14, 'Would installing a variable frequency drive (VFD), trimming the impeller, replacing the motor, or using a belt sheave be a better option?', '', '', 0, 0, 0, 0, '2021-02-03 23:50:01', 1),
(12938, 85, 0, 1, 4, 'When modifying or replacing pumps and fans, or adjusting their rpm, be sure that they can operate under all conditions anticipated for the given system. System pressure or head should not exceed the maximum pressure or head the fan or pump can sustain. Surge points should be avoided.', '', '', 0, 0, 0, 0, '2021-02-03 23:50:01', 1),
(12939, 85, 0, 0, 11, 'Replace or Overhaul Worn or Damaged Pumps', '', '', 0, 0, 0, 0, '2021-02-03 23:50:01', 1),
(12940, 85, 0, 1, 31, 'All pumps experience wear over time. This can result in reduced efficiency. If a pump ever operates in a cavitation condition, for example if its inlet gets blocked, it can experience significant damage and a great reduction in efficiency. Monitoring pump performance over time, and periodically checking efficiency can identify these conditions. ', '', '', 0, 0, 0, 0, '2021-02-03 23:50:01', 1),
(12949, 179, 0, 0, 15, 'Pump nameplate', '', '', 0, 0, 1, 0, '2021-02-03 23:51:35', 0),
(12950, 179, 0, 0, 15, 'Motor nameplate', '', '', 0, 0, 1, 0, '2021-02-03 23:51:35', 0),
(12951, 179, 0, 0, 15, 'Pump curve data', '', '', 0, 0, 1, 0, '2021-02-03 23:51:35', 0),
(12952, 179, 0, 0, 15, 'Pump RPM', '', '', 0, 0, 1, 0, '2021-02-03 23:51:35', 0),
(12953, 179, 0, 0, 15, 'Pump inlet and outlet diameter', '', '', 0, 0, 1, 0, '2021-02-03 23:51:35', 0),
(12954, 179, 0, 0, 15, 'Pump type', '', '', 0, 0, 1, 0, '2021-02-03 23:51:35', 0),
(12955, 179, 0, 0, 15, 'Type of fluid (specific gravity, kinematic viscosity)', '', '', 0, 0, 1, 0, '2021-02-03 23:51:35', 0),
(12956, 179, 0, 0, 15, 'Simultaneous live amperage or power, flow rate, and inlet &amp; outlet operating pressure (system head)', '', '', 0, 0, 1, 0, '2021-02-03 23:51:35', 0),
(12960, 116, 0, 0, 24, 'An OSU EEC Training Webpage', 'https://eec.oregonstate.edu/industrial-motors-training', 'Industrial Motors Training', 0, 0, 0, 0, '2021-02-03 23:58:30', 1),
(12961, 116, 0, 0, 22, 'An OSU EEC Google Slideshow', 'https://docs.google.com/presentation/d/1eG8ygZ-gpYPzbjnpJKLcm_bmoIUImD7CcBU0ZExhfH4/edit?usp=sharing', 'Motor Assessment Fundamentals', 0, 0, 0, 0, '2021-02-03 23:58:30', 1),
(12962, 116, 0, 0, 22, 'An IAC Training Slideshow', 'https://docs.google.com/presentation/d/153S2O7Ns9vJzLqHQnifW03rE52y4d-KGAPgC3e3D8zc/edit?usp=sharing', 'Motors Training', 0, 0, 0, 0, '2021-02-03 23:58:30', 1),
(12963, 116, 0, 0, 22, 'An OSU EEC Google Slideshow', 'https://docs.google.com/presentation/d/1lbgHebPEVJEB17Yqp--r6gARKWkA4YB45nHJx3OEwXg/edit?usp=sharing', 'Power Factor', 0, 0, 0, 0, '2021-02-03 23:58:30', 1),
(12964, 116, 0, 0, 17, 'An OSU EEC Report Appendix in Microsoft Word Format', 'https://drive.google.com/file/d/138fM99GFgSjGUAjvqU1x2cjvxDXCu8-a/view?usp=sharing', 'Motors Appendix', 0, 0, 0, 0, '2021-02-03 23:58:30', 1),
(13093, 112, 0, 0, 32, '', '/uploads/user_51/f31fecd9ff9993ef2850535efecca34a.png', '<p><br></p>', 0, 0, 0, 0, '2021-02-04 00:14:42', 1),
(13094, 112, 0, 0, 12, 'Collect Motor Inventory', '', '', 0, 0, 0, 0, '2021-02-04 00:14:42', 1),
(13095, 112, 0, 1, 15, 'Motor Identification', '', '', 0, 0, 0, 0, '2021-02-04 00:14:42', 1),
(13096, 112, 0, 2, 26, 'Motor ID', '', '', 0, 0, 1, 0, '2021-02-04 00:14:42', 1),
(13097, 112, 0, 2, 26, 'Location', '', '', 0, 0, 1, 0, '2021-02-04 00:14:42', 1),
(13098, 112, 0, 2, 26, 'Application', '', '', 0, 0, 1, 0, '2021-02-04 00:14:42', 1),
(13099, 112, 0, 1, 15, 'Nameplate Data ', '', '', 0, 0, 0, 0, '2021-02-04 00:14:42', 1),
(13100, 112, 0, 2, 26, 'Horsepower', '', '', 0, 0, 1, 0, '2021-02-04 00:14:42', 1),
(13101, 112, 0, 2, 26, 'Full Load Amps', '', '', 0, 0, 1, 0, '2021-02-04 00:14:42', 1),
(13102, 112, 0, 2, 26, 'Se<s>﻿</s>rvice Factor', '', '', 0, 0, 1, 0, '2021-02-04 00:14:42', 1),
(13103, 112, 0, 2, 26, 'RPM', '', '', 0, 0, 1, 0, '2021-02-04 00:14:42', 1),
(13104, 112, 0, 2, 26, 'Efficiency - if available', '', '', 0, 0, 1, 0, '2021-02-04 00:14:42', 1),
(13105, 112, 0, 2, 26, 'Motor Type', '', '', 0, 0, 1, 0, '2021-02-04 00:14:42', 1),
(13106, 112, 0, 2, 26, '(Any additional data on nameplate)', '', '', 0, 0, 1, 0, '2021-02-04 00:14:42', 1),
(13107, 112, 0, 2, 8, 'A photo is an ideal way to capture all nameplate data', '', '', 0, 0, 1, 0, '2021-02-04 00:14:42', 1),
(13108, 112, 0, 1, 15, 'Operating hours', '', '', 0, 0, 0, 0, '2021-02-04 00:14:42', 1),
(13109, 112, 0, 1, 15, 'Use Factor (% of time on during operation hours)', '', '', 0, 0, 0, 0, '2021-02-04 00:14:42', 1),
(13110, 112, 0, 1, 15, 'Load Factor (% of full load)', '', '', 0, 0, 0, 0, '2021-02-04 00:14:42', 1),
(13111, 112, 0, 1, 15, 'Drive Type', '', '', 0, 0, 0, 0, '2021-02-04 00:14:42', 1),
(13112, 112, 0, 1, 15, 'Controls', '', '', 0, 0, 0, 0, '2021-02-04 00:14:42', 1),
(13147, 107, 0, 0, 11, 'Replace standard efficiency motors with NEMA premium efficiency motors', '', '', 0, 0, 0, 0, '2021-02-04 00:25:40', 1),
(13148, 107, 0, 1, 10, 'Standard efficiency motors used in high energy consumer applications ', '', '', 0, 0, 0, 0, '2021-02-04 00:25:40', 1),
(13149, 107, 0, 0, 11, 'Replace oversized motors', '', '', 0, 0, 0, 0, '2021-02-04 00:25:40', 1),
(13150, 107, 0, 1, 31, 'It is common for a facility to choose an oversized motor as a conservative measure. Motors consume the least amount of energy when they operate at their highest efficiency. For most motors, this is from 75% to 110% of their rated load. As motor loading drops below 50%, the efficiency and power factor drops rapidly. ', '', '', 0, 0, 0, 0, '2021-02-04 00:25:40', 1),
(13151, 107, 0, 1, 10, 'Motor consistently operating at less than half of full load', '', '', 0, 0, 0, 0, '2021-02-04 00:25:40', 1),
(13152, 107, 0, 1, 15, 'Power measurements (kW) to determine motor loading is preferred over amperage reading because they take into account the changes in power factor and amperage that occur as the motor loading changes', '', '', 0, 0, 0, 0, '2021-02-04 00:25:40', 1),
(13153, 107, 0, 0, 11, 'Replace Standard V-Belts with Notched V-Belts', '', '', 0, 0, 0, 0, '2021-02-04 00:25:40', 1),
(13154, 107, 0, 1, 31, 'Notched V-belts have grooves perpendicular to the length of the belt to reduce bending resistance. ', '%zXz%', '%zXz%', 0, 0, 0, 0, '2021-02-04 00:25:40', 1),
(13155, 107, 0, 1, 10, 'Numerous belt-driven motors are used throughout a facility ', '', '', 0, 0, 0, 0, '2021-02-04 00:25:40', 1),
(13156, 107, 0, 1, 3, 'Notched V-belts are approximately 2% more efficient than standard belts. The OSU EEC uses 1.5% as a conservative estimate.', '', '', 0, 0, 0, 0, '2021-02-04 00:25:40', 1),
(13157, 107, 0, 1, 14, 'Are V-belts or synchronous belts more suited to the application?', '', '', 0, 0, 0, 0, '2021-02-04 00:25:40', 1),
(13158, 107, 0, 1, 1, 'Run cooler, last longer, and are more efficient than standard V-belts', '', '', 0, 0, 0, 0, '2021-02-04 00:25:40', 1),
(13159, 107, 0, 1, 1, 'Don\'t require retrofits if standard V-belts are already used', '', '', 0, 0, 0, 0, '2021-02-04 00:25:40', 1),
(13160, 107, 0, 1, 1, 'More suitable than synchronous drives if vibrational damping is needed or the application causes sudden torque changes', '', '', 0, 0, 0, 0, '2021-02-04 00:25:40', 1),
(13161, 107, 0, 1, 2, 'Sharp efficiency reduction at high torque due to increased slippage', '', '', 0, 0, 0, 0, '2021-02-04 00:25:40', 1),
(13162, 107, 0, 1, 2, 'Like standard V-belts, notched belts degrade in efficiency over time if not properly maintained', '', '', 0, 0, 0, 0, '2021-02-04 00:25:40', 1),
(13163, 107, 0, 1, 2, 'V-belts may perform worse in dirty environments than synchronous belts', '', '', 0, 0, 0, 0, '2021-02-04 00:25:40', 1),
(13164, 107, 0, 1, 12, 'Incrementally install notched V-belts as old belts are replaced.', '', '', 0, 0, 0, 0, '2021-02-04 00:25:40', 1),
(13165, 107, 0, 1, 7, 'Regular scheduled maintenance and re-tensioning ', '', '', 0, 0, 0, 0, '2021-02-04 00:25:40', 1),
(13166, 107, 0, 1, 20, '', 'https://drive.google.com/file/d/1uk3x2VpKQ9FrRUOvU4nQ9U2zHfQsBXGC/view?usp=sharing', 'Thermal Image of Notched vs Standard V-belt', 0, 1, 0, 0, '2021-02-04 00:25:40', 1),
(13167, 107, 0, 1, 21, 'An OSU EEC Analysis Template in Microsoft Excel Format', 'https://drive.google.com/file/d/19tm7mcwn9jYIj_xDkJ7Ki9buPw0gc2Kl/view?usp=sharing', 'Install Notched V-Belts Template', 0, 0, 0, 0, '2021-02-04 00:25:40', 1),
(13168, 107, 0, 0, 11, 'Replace V-Belt Drives with Synchronous Belt Drives (Sometimes called High Torque Drives)', '', '', 0, 0, 0, 0, '2021-02-04 00:25:40', 1),
(13169, 107, 0, 1, 31, 'Synchronous drives use toothed belts and mated grooved sprockets to transfer power based on positive engagement rather than friction. Synchronous belt drives operate more efficiently and require less maintenance than V-belt drives.', '%zXz%', '%zXz%', 0, 0, 0, 0, '2021-02-04 00:25:40', 1),
(13170, 107, 0, 1, 10, 'Numerous belt-driven motors are used throughout a facility ', '', '', 0, 0, 0, 0, '2021-02-04 00:25:40', 1),
(13171, 107, 0, 1, 3, 'Synchronous drives consistently operate with 98% efficiency', '', '', 0, 0, 0, 0, '2021-02-04 00:25:40', 1),
(13172, 107, 0, 1, 14, 'Are V-belts or synchronous belts more suited to the application?', '', '', 0, 0, 0, 0, '2021-02-04 00:25:40', 1),
(13173, 107, 0, 1, 1, 'Maintain efficiency over a wide load range', '', '', 0, 0, 0, 0, '2021-02-04 00:25:40', 1),
(13174, 107, 0, 1, 1, 'Work well in oily and wet environments', '', '', 0, 0, 0, 0, '2021-02-04 00:25:40', 1),
(13175, 107, 0, 1, 1, 'Require minimal maintenance and re-tensioning ', '', '', 0, 0, 0, 0, '2021-02-04 00:25:40', 1),
(13176, 107, 0, 1, 2, 'Require installation of mating grooved sprockets', '', '', 0, 0, 0, 0, '2021-02-04 00:25:40', 1),
(13177, 107, 0, 1, 2, 'Noisier and transfer more vibration than V-belts', '', '', 0, 0, 0, 0, '2021-02-04 00:25:40', 1),
(13178, 107, 0, 1, 2, 'Vulnerable to sudden torque changes that can shear the belt\'s teeth', '', '', 0, 0, 0, 0, '2021-02-04 00:25:40', 1),
(13179, 107, 0, 1, 4, 'If the belt is meant to be the weakest link in the motor driven system, for example, if the system tends to jam, then a standard V-belt is the better choice. A synchronous belt is much less likely to be the failure point in a jam, leading to potential damage of much more expensive components. ', '', '', 0, 0, 0, 0, '2021-02-04 00:25:40', 1),
(13180, 107, 0, 1, 12, 'Consider consulting a power transmission specialist to determine viability and savings potential from retrofitting V-belt drives with synchronous belts. Install notched belts where synchronous are not cost effective.', '', '', 0, 0, 0, 0, '2021-02-04 00:25:40', 1),
(13181, 77, 0, 0, 11, 'Reduce Inlet Air Temperature ', '', '', 1, 1, 0, 0, '2021-02-04 02:47:29', 0),
(13182, 77, 0, 1, 31, 'Reducing the inlet air temperature of oil-injected screw compressors increases mass flow rate while maintaining power input. To efficiently maintain current mass flow rate a variable frequency drive is required to reduce the motor speed and associated power.', '%zXz%', '%zXz%', 0, 1, 0, 0, '2021-02-04 02:47:29', 0),
(13183, 77, 0, 1, 10, 'High ambient temperature at the air inlet', '', '', 0, 1, 0, 0, '2021-02-04 02:47:29', 0),
(13184, 77, 0, 1, 10, 'Difficulty meeting a compressor\'s rated air capacity', '', '', 0, 1, 0, 0, '2021-02-04 02:47:29', 0),
(13185, 77, 0, 1, 10, 'A compressor running hotter than its specifications', '', '', 0, 1, 0, 0, '2021-02-04 02:47:29', 0),
(13186, 77, 0, 2, 8, 'Other factors may be at play such as significant air leaks increasing the load on the compressor', '', '', 0, 1, 0, 0, '2021-02-04 02:47:29', 0),
(13187, 77, 0, 1, 3, '1.9% efficiency (scfm/kW) improvement per 10 °F reduction at inlet', '', '', 0, 1, 0, 0, '2021-02-04 02:47:29', 0),
(13188, 77, 0, 1, 15, 'Compressor make, model, and nameplate data', '', '', 0, 1, 0, 0, '2021-02-04 02:47:29', 0),
(13189, 77, 0, 1, 15, 'Motor nameplate data, live power reading, and one week of amperage data', '', '', 0, 1, 0, 0, '2021-02-04 02:47:29', 0),
(13190, 77, 0, 1, 15, 'Complete picture of compressed air system and control strategy', '', '', 0, 1, 0, 0, '2021-02-04 02:47:29', 0),
(13191, 77, 0, 1, 15, 'Average ambient temperature at current and proposed inlet locations', '', '', 0, 1, 0, 0, '2021-02-04 02:47:29', 0),
(13192, 77, 0, 1, 12, 'Move air inlet to coolest location to reduce power and energy consumption', '', '', 0, 1, 0, 0, '2021-02-04 02:47:29', 0),
(13193, 77, 0, 1, 8, 'If implementation requires much more than re-ducting, the chances of this opportunitity being worthwhile are low. ', '', '', 0, 1, 0, 0, '2021-02-04 02:47:29', 0),
(13194, 77, 0, 1, 21, 'An OSU EEC Analysis Template in Microsoft Excel Format', 'https://oregonstate.box.com/s/zk1aol8rf88aul9klflbxkikz6l2ku47', 'Analysis Template: Reduce Inlet Air Temperature', 2, 1, 0, 0, '2021-02-04 02:47:29', 0),
(13195, 77, 0, 1, 17, 'An article from Compressed Air Best Practices by  Tim Dugan, P.E., President, Compression Engineering Corporation', 'https://www.airbestpractices.com/system-assessments/compressor-controls/inlet-air-temperature-impacts-air-compressor-performance', 'Inlet Air Temperature Impacts on Air Compressor Performance', 1, 1, 0, 0, '2021-02-04 02:47:29', 0),
(13196, 77, 0, 0, 11, 'Increase Primary Receiver Capacity', '', '', 0, 0, 0, 0, '2021-02-04 02:47:29', 0),
(13197, 77, 0, 1, 31, 'Insufficient receiver capacity can result in short cycling in oil-injected rotary screw compressors that use load-unload controls. Short cycling occurs when system demand forces a compressor to re-load before unload power has been fully realized, causing the compressor to cycle too frequently. Adding receiver capacity increases system efficiency by reducing cycling losses and time spent at partial loads. ', '%zXz%', '%zXz%', 0, 0, 0, 0, '2021-02-04 02:47:29', 0),
(13198, 77, 0, 1, 10, 'Current receiver capacity for an oil-injected rotary screw compressor is less than 3 gal/cfm', '', '', 0, 0, 0, 0, '2021-02-04 02:47:29', 0),
(13199, 77, 0, 1, 10, 'An oil-injected rotary screw compressor consistently unloads for less than 45 seconds', '', '', 0, 0, 0, 0, '2021-02-04 02:47:29', 0),
(13200, 77, 0, 1, 3, 'A minimum of 3 gal/cfm receiver capacity is recommended for oil-injected rotary screw compressors ', '', '', 0, 0, 0, 0, '2021-02-04 02:47:29', 0),
(13201, 77, 0, 1, 1, 'Improved system efficiency due to reduced cycling frequency ', '', '', 0, 0, 0, 0, '2021-02-04 02:47:29', 0),
(13202, 77, 0, 1, 1, 'Critical pressure applications are shielded from pressure fluctuations', '', '', 0, 0, 0, 0, '2021-02-04 02:47:29', 0),
(13203, 77, 0, 1, 1, 'Prevents overloading the compressor\'s motor by allowing for a lower pressure set point ', '', '', 0, 0, 0, 0, '2021-02-04 02:47:29', 0),
(13204, 77, 0, 1, 15, 'Compressor and motor nameplate data and specifications including unload capacity and power', '', '', 0, 0, 0, 0, '2021-02-04 02:47:29', 0),
(13205, 77, 0, 1, 15, 'Week-long amperage data log that represents typical operation to identify when and if short cycling occurs ', '', '', 0, 0, 0, 0, '2021-02-04 02:47:29', 0),
(13206, 77, 0, 1, 15, 'Current receiver capacity and operating pressure', '', '', 0, 0, 0, 0, '2021-02-04 02:47:29', 0),
(13207, 77, 0, 1, 21, 'An OSU EEC Analysis Template in Microsoft Excel Format', 'https://oregonstate.box.com/s/fksaccw3fhif7h70nkynzwlbbu26g608', 'Analysis Template: Increase Air Receiver Capacity', 2, 0, 0, 0, '2021-02-04 02:47:29', 0),
(13208, 77, 0, 1, 20, '', '/uploads/user_42/8bef9996285f82268e4fef3c0c42b38a.png', 'Effect of Receiver Capacity on Lubricant-Injected Rotary Compressor with Load-Unload Capacity Control', 0, 0, 0, 0, '2021-02-04 02:47:29', 0),
(13209, 77, 0, 0, 11, 'Use a more efficient control strategy', '', '', 1, 0, 0, 0, '2021-02-04 02:47:29', 0),
(13210, 77, 0, 0, 11, 'Use a compressed air sequencer for multiple compressors', '', '', 0, 0, 0, 0, '2021-02-04 02:47:29', 0),
(13211, 249, 0, 0, 31, 'The roots for cloud computing come from early days of computers where a centralized computer would serve several terminals. Instead of having to have all the software and hardware required for complex calculation at your personal computer, cloud computing allows a user to send the information though the internet to a centralized computing system to where it can be done more efficiently.', '%zXz%', '%zXz%', 0, 0, 0, 0, '2021-02-04 05:35:03', 0),
(13221, 292, 0, 0, 8, 'At some point we will need to figure out a better name for this card', '', '', 0, 0, 0, 0, '2021-02-04 05:48:39', 0),
(13222, 292, 0, 0, 11, 'Replace clipboards with tablets', '', '', 0, 0, 0, 0, '2021-02-04 05:48:39', 0),
(13223, 292, 0, 1, 1, 'Low cost solution', '', '', 0, 0, 0, 0, '2021-02-04 05:48:39', 0),
(13224, 292, 0, 1, 1, 'Less time spent traveling to office and looking for papers', '', '', 0, 0, 0, 0, '2021-02-04 05:48:39', 0),
(13225, 292, 0, 1, 1, 'Information can be logged much faster', '', '', 0, 0, 0, 0, '2021-02-04 05:48:39', 0),
(13226, 292, 0, 1, 1, 'Doubles as a camera', '', '', 0, 0, 0, 0, '2021-02-04 05:48:39', 0),
(13227, 292, 0, 1, 4, 'Breakable', '', '', 0, 0, 0, 0, '2021-02-04 05:48:39', 0),
(13228, 292, 0, 1, 4, 'Needs network connection for some features', '', '', 0, 0, 0, 0, '2021-02-04 05:48:39', 0),
(13229, 292, 0, 1, 2, 'Limited battery', '', '', 0, 0, 0, 0, '2021-02-04 05:48:39', 0),
(13238, 109, 0, 0, 8, '<strong>Slip Measurement</strong> - For AC induction/asynchronous motors \"slip\" offers one way to estimate motor load if amps or power are not obtainable. For example if a nominal 1800 RPM motor nameplate lists an RPM of 1750 (for full load), the actual reduction in RPM with load is linear with the % of full load. For example If you use a strobe to measure an RPM of 1775 RPM on the same motor, then the motor load factor is 50% . If it is a 100 HP motor, it is working against a 50 HP load.', '', '', 0, 0, 0, 0, '2021-02-05 21:10:17', 1),
(13239, 108, 0, 0, 3, '1 HP = 0.746 kW', '', '', 0, 0, 0, 0, '2021-02-05 21:11:01', 1),
(13240, 108, 0, 0, 3, 'Cost to operate a motor at 75% load for a full year = $60/HP (Assumes $0.05/kWh)', '', '', 0, 1, 0, 0, '2021-02-05 21:11:01', 1),
(13241, 108, 0, 0, 3, 'Estimate 1.2 Full Load Amps per horsepower for motors on nominal 460 Volt systems (2.4 amps per horsepower on 230 volt systems)', '', '', 0, 0, 0, 0, '2021-02-05 21:11:01', 1),
(13243, 294, 0, 0, 26, 'Analyzing utilities is an excellent way to identify where energy is used, how much energy is consumed, and seasonal or yearly trends in energy consumption that are not readily apparent from individual billing statements alone. Additionally, a utility analysis estimate also can indicate the areas where implementing more efficient technologies or practices will yield the greatest savings.', '', '', 0, 0, 0, 0, '2021-02-06 22:11:42', 0),
(13244, 295, 0, 0, 26, 'Gather at least 12-14 consecutive months of billing statements.', '', '', 0, 0, 0, 0, '2021-02-06 22:45:32', 0),
(13245, 295, 0, 0, 26, 'Table the breakdowns of the monthly charges of each meter individually', '', '', 0, 0, 0, 0, '2021-02-06 22:45:32', 0),
(13246, 295, 0, 1, 8, 'Spreadsheet applications and software such as Microsoft Excel are helpful tools.', '', '', 0, 0, 0, 0, '2021-02-06 22:45:32', 0),
(13247, 295, 0, 1, 26, 'Each meter gets one table that breaks down the monthly utility charges for the year under examination.', '', '', 0, 0, 0, 0, '2021-02-06 22:45:32', 0),
(13248, 295, 0, 1, 26, 'Ex. For an electricity meter, log the energy used (in kWh), the demand (in kW-mo), and the reactive power (in kVAR).', '', '', 0, 0, 0, 0, '2021-02-06 22:45:32', 0),
(13249, 295, 0, 0, 26, 'Locate the rate charge for the utility either from the provider or the billing statements.', '', '', 0, 0, 0, 0, '2021-02-06 22:45:32', 0),
(13250, 295, 0, 0, 26, 'Calculate the monetary costs and any other pertinent information of each breakdown using the meter tables and rate schedules.', '', '', 0, 0, 0, 0, '2021-02-06 22:45:32', 0),
(13251, 295, 0, 1, 26, 'Ex. For electricity, calculating the Power Factor from the reactive power given in statements is useful for examining whether implementing power factor correction solutions will result in annual cost savings.', '', '', 0, 0, 0, 0, '2021-02-06 22:45:32', 0),
(13252, 295, 0, 1, 26, 'Calculating quantity and cost averages per month is very useful for examining trends and areas of opportunity for annual savings.', '', '', 0, 0, 0, 0, '2021-02-06 22:45:32', 0),
(13253, 295, 0, 1, 8, 'Pay close attention to the billing statements and the rate schedules if differing charge rates apply to the utility (ex. on and off-peak demand for electricity).', '', '', 0, 0, 0, 0, '2021-02-06 22:45:32', 0),
(13254, 295, 0, 0, 26, 'Graph or chart parameters of interest to examine trends.', '', '', 0, 0, 0, 0, '2021-02-06 22:45:32', 0),
(13255, 295, 0, 1, 26, 'Ex. For electricity, graphing the month against the energy used provides a visual on when equipment on that meter use the most energy during the year, and charting the percentage of energy use, demand, and other fees for the meter can visually show where the greatest potential for savings lie.', '', '', 0, 0, 0, 0, '2021-02-06 22:45:32', 0),
(13256, 275, 0, 0, 31, '<strong>This is a list of some common math symbols / formulas and how to create them:</strong>', '', '', 0, 0, 0, 0, '2021-02-07 03:41:40', 0),
(13257, 275, 0, 0, 31, '<p></p><p>x^5 <strong><em>is displayed as...</em></strong><span class=\"ql-formula\" data-value=\"x^5\">﻿<span contenteditable=\"false\"><span class=\"katex\"><span class=\"katex-mathml\"><math><semantics><mrow><msup><mi>x</mi><mn>5</mn></msup></mrow><annotation encoding=\"application/x-tex\">x^5</annotation></semantics></math></span><span class=\"katex-html\" aria-hidden=\"true\"><span class=\"base\"><span class=\"strut\" style=\"height:0.814108em;vertical-align:0em\"></span><span class=\"mord\"><span class=\"mord mathnormal\">x</span><span class=\"msupsub\"><span class=\"vlist-t\"><span class=\"vlist-r\"><span class=\"vlist\" style=\"height:0.814108em\"><span style=\"top:-3.063em;margin-right:0.05em\"><span class=\"pstrut\" style=\"height:2.7em\"></span><span class=\"sizing reset-size6 size3 mtight\"><span class=\"mord mtight\">5</span></span></span></span></span></span></span></span></span></span></span></span>﻿</span></p><p></p><p>x_5 <strong><em>is displayed as... </em></strong><span class=\"ql-formula\" data-value=\"x_5\">﻿<span contenteditable=\"false\"><span class=\"katex\"><span class=\"katex-mathml\"><math><semantics><mrow><msub><mi>x</mi><mn>5</mn></msub></mrow><annotation encoding=\"application/x-tex\">x_5</annotation></semantics></math></span><span class=\"katex-html\" aria-hidden=\"true\"><span class=\"base\"><span class=\"strut\" style=\"height:0.58056em;vertical-align:-0.15em\"></span><span class=\"mord\"><span class=\"mord mathnormal\">x</span><span class=\"msupsub\"><span class=\"vlist-t vlist-t2\"><span class=\"vlist-r\"><span class=\"vlist\" style=\"height:0.301108em\"><span style=\"top:-2.55em;margin-left:0em;margin-right:0.05em\"><span class=\"pstrut\" style=\"height:2.7em\"></span><span class=\"sizing reset-size6 size3 mtight\"><span class=\"mord mtight\">5</span></span></span></span><span class=\"vlist-s\">​</span></span><span class=\"vlist-r\"><span class=\"vlist\" style=\"height:0.15em\"><span></span></span></span></span></span></span></span></span></span></span>﻿</span></p><p></p><p>\\Pi <strong><em>is displayed as... </em></strong><span class=\"ql-formula\" data-value=\"\\Pi\">﻿<span contenteditable=\"false\"><span class=\"katex\"><span class=\"katex-mathml\"><math><semantics><mrow><mi>Π</mi></mrow><annotation encoding=\"application/x-tex\">\\Pi</annotation></semantics></math></span><span class=\"katex-html\" aria-hidden=\"true\"><span class=\"base\"><span class=\"strut\" style=\"height:0.68333em;vertical-align:0em\"></span><span class=\"mord\">Π</span></span></span></span></span>﻿</span></p><p></p><p>\\dfrac{3}{5} <strong><em>is displayed as... </em></strong><span class=\"ql-formula\" data-value=\"\\dfrac{3}{5}\">﻿<span contenteditable=\"false\"><span class=\"katex\"><span class=\"katex-mathml\"><math><semantics><mrow><mstyle displaystyle=\"true\" scriptlevel=\"0\"><mfrac><mn>3</mn><mn>5</mn></mfrac></mstyle></mrow><annotation encoding=\"application/x-tex\">\\dfrac{3}{5}</annotation></semantics></math></span><span class=\"katex-html\" aria-hidden=\"true\"><span class=\"base\"><span class=\"strut\" style=\"height:2.00744em;vertical-align:-0.686em\"></span><span class=\"mord\"><span class=\"mopen nulldelimiter\"></span><span class=\"mfrac\"><span class=\"vlist-t vlist-t2\"><span class=\"vlist-r\"><span class=\"vlist\" style=\"height:1.32144em\"><span style=\"top:-2.314em\"><span class=\"pstrut\" style=\"height:3em\"></span><span class=\"mord\"><span class=\"mord\">5</span></span></span><span style=\"top:-3.23em\"><span class=\"pstrut\" style=\"height:3em\"></span><span class=\"frac-line\" style=\"border-bottom-width:0.04em\"></span></span><span style=\"top:-3.677em\"><span class=\"pstrut\" style=\"height:3em\"></span><span class=\"mord\"><span class=\"mord\">3</span></span></span></span><span class=\"vlist-s\">​</span></span><span class=\"vlist-r\"><span class=\"vlist\" style=\"height:0.686em\"><span></span></span></span></span></span><span class=\"mclose nulldelimiter\"></span></span></span></span></span></span>﻿</span></p><p></p><p>\\sum_{i=1}^n <strong><em>is displayed as... </em></strong><span class=\"ql-formula\" data-value=\"\\sum_{i=1}^n\">﻿<span contenteditable=\"false\"><span class=\"katex\"><span class=\"katex-mathml\"><math><semantics><mrow><mo>∑</mo><mrow><mi>i</mi><mo>=</mo><mn>1</mn></mrow><mi>n</mi></mrow><annotation encoding=\"application/x-tex\">\\sum_{i=1}^n</annotation></semantics></math></span><span class=\"katex-html\" aria-hidden=\"true\"><span class=\"base\"><span class=\"strut\" style=\"height:1.104em;vertical-align:-0.29971em\"></span><span class=\"mop\"><span class=\"mop op-symbol small-op\" style=\"position:relative\">∑</span><span class=\"msupsub\"><span class=\"vlist-t vlist-t2\"><span class=\"vlist-r\"><span class=\"vlist\" style=\"height:0.804292em\"><span style=\"top:-2.40029em;margin-left:0em;margin-right:0.05em\"><span class=\"pstrut\" style=\"height:2.7em\"></span><span class=\"sizing reset-size6 size3 mtight\"><span class=\"mord mtight\"><span class=\"mord mathnormal mtight\">i</span><span class=\"mrel mtight\">=</span><span class=\"mord mtight\">1</span></span></span></span><span style=\"top:-3.2029em;margin-right:0.05em\"><span class=\"pstrut\" style=\"height:2.7em\"></span><span class=\"sizing reset-size6 size3 mtight\"><span class=\"mord mathnormal mtight\">n</span></span></span></span><span class=\"vlist-s\">​</span></span><span class=\"vlist-r\"><span class=\"vlist\" style=\"height:0.29971em\"><span></span></span></span></span></span></span></span></span></span></span>﻿</span></p><p></p><p>\\displaystyle\\sum_{i=1}^n <strong><em>is displayed as... </em></strong><span class=\"ql-formula\" data-value=\"\\displaystyle\\sum_{i=1}^n\">﻿<span contenteditable=\"false\"><span class=\"katex\"><span class=\"katex-mathml\"><math><semantics><mrow><mstyle scriptlevel=\"0\" displaystyle=\"true\"><munderover><mo>∑</mo><mrow><mi>i</mi><mo>=</mo><mn>1</mn></mrow><mi>n</mi></munderover></mstyle></mrow><annotation encoding=\"application/x-tex\">\\displaystyle\\sum_{i=1}^n</annotation></semantics></math></span><span class=\"katex-html\" aria-hidden=\"true\"><span class=\"base\"><span class=\"strut\" style=\"height:2.92907em;vertical-align:-1.27767em\"></span><span class=\"mop op-limits\"><span class=\"vlist-t vlist-t2\"><span class=\"vlist-r\"><span class=\"vlist\" style=\"height:1.6514em\"><span style=\"top:-1.87233em;margin-left:0em\"><span class=\"pstrut\" style=\"height:3.05em\"></span><span class=\"sizing reset-size6 size3 mtight\"><span class=\"mord mtight\"><span class=\"mord mathnormal mtight\">i</span><span class=\"mrel mtight\">=</span><span class=\"mord mtight\">1</span></span></span></span><span style=\"top:-3.05001em\"><span class=\"pstrut\" style=\"height:3.05em\"></span><span><span class=\"mop op-symbol\">∑</span></span></span><span style=\"top:-4.30001em;margin-left:0em\"><span class=\"pstrut\" style=\"height:3.05em\"></span><span class=\"sizing reset-size6 size3 mtight\"><span class=\"mord mathnormal mtight\">n</span></span></span></span><span class=\"vlist-s\">​</span></span><span class=\"vlist-r\"><span class=\"vlist\" style=\"height:1.27767em\"><span></span></span></span></span></span></span></span></span></span>﻿</span>F = G </p><p></p><p>\\dfrac{m_1 m_2}{r^2} <strong><em>is displayed as... </em></strong><span class=\"ql-formula\" data-value=\"F = G \\dfrac{m_1 m_2}{r^2}\">﻿<span contenteditable=\"false\"><span class=\"katex\"><span class=\"katex-mathml\"><math><semantics><mrow><mi>F</mi><mo>=</mo><mi>G</mi><mstyle displaystyle=\"true\" scriptlevel=\"0\"><mfrac><mrow><msub><mi>m</mi><mn>1</mn></msub><msub><mi>m</mi><mn>2</mn></msub></mrow><msup><mi>r</mi><mn>2</mn></msup></mfrac></mstyle></mrow><annotation encoding=\"application/x-tex\">F = G \\dfrac{m_1 m_2}{r^2}</annotation></semantics></math></span><span class=\"katex-html\" aria-hidden=\"true\"><span class=\"base\"><span class=\"strut\" style=\"height:0.68333em;vertical-align:0em\"></span><span class=\"mord mathnormal\" style=\"margin-right:0.13889em\">F</span><span class=\"mspace\" style=\"margin-right:0.277778em\"></span><span class=\"mrel\">=</span><span class=\"mspace\" style=\"margin-right:0.277778em\"></span></span><span class=\"base\"><span class=\"strut\" style=\"height:1.79356em;vertical-align:-0.686em\"></span><span class=\"mord mathnormal\">G</span><span class=\"mord\"><span class=\"mopen nulldelimiter\"></span><span class=\"mfrac\"><span class=\"vlist-t vlist-t2\"><span class=\"vlist-r\"><span class=\"vlist\" style=\"height:1.10756em\"><span style=\"top:-2.314em\"><span class=\"pstrut\" style=\"height:3em\"></span><span class=\"mord\"><span class=\"mord\"><span class=\"mord mathnormal\" style=\"margin-right:0.02778em\">r</span><span class=\"msupsub\"><span class=\"vlist-t\"><span class=\"vlist-r\"><span class=\"vlist\" style=\"height:0.740108em\"><span style=\"top:-2.989em;margin-right:0.05em\"><span class=\"pstrut\" style=\"height:2.7em\"></span><span class=\"sizing reset-size6 size3 mtight\"><span class=\"mord mtight\">2</span></span></span></span></span></span></span></span></span></span><span style=\"top:-3.23em\"><span class=\"pstrut\" style=\"height:3em\"></span><span class=\"frac-line\" style=\"border-bottom-width:0.04em\"></span></span><span style=\"top:-3.677em\"><span class=\"pstrut\" style=\"height:3em\"></span><span class=\"mord\"><span class=\"mord\"><span class=\"mord mathnormal\">m</span><span class=\"msupsub\"><span class=\"vlist-t vlist-t2\"><span class=\"vlist-r\"><span class=\"vlist\" style=\"height:0.301108em\"><span style=\"top:-2.55em;margin-left:0em;margin-right:0.05em\"><span class=\"pstrut\" style=\"height:2.7em\"></span><span class=\"sizing reset-size6 size3 mtight\"><span class=\"mord mtight\">1</span></span></span></span><span class=\"vlist-s\">​</span></span><span class=\"vlist-r\"><span class=\"vlist\" style=\"height:0.15em\"><span></span></span></span></span></span></span><span class=\"mord\"><span class=\"mord mathnormal\">m</span><span class=\"msupsub\"><span class=\"vlist-t vlist-t2\"><span class=\"vlist-r\"><span class=\"vlist\" style=\"height:0.301108em\"><span style=\"top:-2.55em;margin-left:0em;margin-right:0.05em\"><span class=\"pstrut\" style=\"height:2.7em\"></span><span class=\"sizing reset-size6 size3 mtight\"><span class=\"mord mtight\">2</span></span></span></span><span class=\"vlist-s\">​</span></span><span class=\"vlist-r\"><span class=\"vlist\" style=\"height:0.15em\"><span></span></span></span></span></span></span></span></span></span><span class=\"vlist-s\">​</span></span><span class=\"vlist-r\"><span class=\"vlist\" style=\"height:0.686em\"><span></span></span></span></span></span><span class=\"mclose nulldelimiter\"></span></span></span></span></span></span>﻿</span></p><p></p><p>\\displaystyle\\sum_{i=1}^n i^3 = \\dfrac{n^2(n + 1)^2}{4} <strong><em>is displayed as...</em></strong><span class=\"ql-formula\" data-value=\"\\displaystyle\\sum_{i=1}^n i^3 = \\dfrac{n^2(n + 1)^2}{4}\">﻿<span contenteditable=\"false\"><span class=\"katex\"><span class=\"katex-mathml\"><math><semantics><mrow><mstyle scriptlevel=\"0\" displaystyle=\"true\"><munderover><mo>∑</mo><mrow><mi>i</mi><mo>=</mo><mn>1</mn></mrow><mi>n</mi></munderover><msup><mi>i</mi><mn>3</mn></msup><mo>=</mo><mfrac><mrow><msup><mi>n</mi><mn>2</mn></msup><mo stretchy=\"false\">(</mo><mi>n</mi><mo>+</mo><mn>1</mn><msup><mo stretchy=\"false\">)</mo><mn>2</mn></msup></mrow><mn>4</mn></mfrac></mstyle></mrow><annotation encoding=\"application/x-tex\">\\displaystyle\\sum_{i=1}^n i^3 = \\dfrac{n^2(n + 1)^2}{4}</annotation></semantics></math></span><span class=\"katex-html\" aria-hidden=\"true\"><span class=\"base\"><span class=\"strut\" style=\"height:2.92907em;vertical-align:-1.27767em\"></span><span class=\"mop op-limits\"><span class=\"vlist-t vlist-t2\"><span class=\"vlist-r\"><span class=\"vlist\" style=\"height:1.6514em\"><span style=\"top:-1.87233em;margin-left:0em\"><span class=\"pstrut\" style=\"height:3.05em\"></span><span class=\"sizing reset-size6 size3 mtight\"><span class=\"mord mtight\"><span class=\"mord mathnormal mtight\">i</span><span class=\"mrel mtight\">=</span><span class=\"mord mtight\">1</span></span></span></span><span style=\"top:-3.05001em\"><span class=\"pstrut\" style=\"height:3.05em\"></span><span><span class=\"mop op-symbol\">∑</span></span></span><span style=\"top:-4.30001em;margin-left:0em\"><span class=\"pstrut\" style=\"height:3.05em\"></span><span class=\"sizing reset-size6 size3 mtight\"><span class=\"mord mathnormal mtight\">n</span></span></span></span><span class=\"vlist-s\">​</span></span><span class=\"vlist-r\"><span class=\"vlist\" style=\"height:1.27767em\"><span></span></span></span></span></span><span class=\"mspace\" style=\"margin-right:0.166667em\"></span><span class=\"mord\"><span class=\"mord mathnormal\">i</span><span class=\"msupsub\"><span class=\"vlist-t\"><span class=\"vlist-r\"><span class=\"vlist\" style=\"height:0.864108em\"><span style=\"top:-3.113em;margin-right:0.05em\"><span class=\"pstrut\" style=\"height:2.7em\"></span><span class=\"sizing reset-size6 size3 mtight\"><span class=\"mord mtight\">3</span></span></span></span></span></span></span></span><span class=\"mspace\" style=\"margin-right:0.277778em\"></span><span class=\"mrel\">=</span><span class=\"mspace\" style=\"margin-right:0.277778em\"></span></span><span class=\"base\"><span class=\"strut\" style=\"height:2.17711em;vertical-align:-0.686em\"></span><span class=\"mord\"><span class=\"mopen nulldelimiter\"></span><span class=\"mfrac\"><span class=\"vlist-t vlist-t2\"><span class=\"vlist-r\"><span class=\"vlist\" style=\"height:1.49111em\"><span style=\"top:-2.314em\"><span class=\"pstrut\" style=\"height:3em\"></span><span class=\"mord\"><span class=\"mord\">4</span></span></span><span style=\"top:-3.23em\"><span class=\"pstrut\" style=\"height:3em\"></span><span class=\"frac-line\" style=\"border-bottom-width:0.04em\"></span></span><span style=\"top:-3.677em\"><span class=\"pstrut\" style=\"height:3em\"></span><span class=\"mord\"><span class=\"mord\"><span class=\"mord mathnormal\">n</span><span class=\"msupsub\"><span class=\"vlist-t\"><span class=\"vlist-r\"><span class=\"vlist\" style=\"height:0.814108em\"><span style=\"top:-3.063em;margin-right:0.05em\"><span class=\"pstrut\" style=\"height:2.7em\"></span><span class=\"sizing reset-size6 size3 mtight\"><span class=\"mord mtight\">2</span></span></span></span></span></span></span></span><span class=\"mopen\">(</span><span class=\"mord mathnormal\">n</span><span class=\"mspace\" style=\"margin-right:0.222222em\"></span><span class=\"mbin\">+</span><span class=\"mspace\" style=\"margin-right:0.222222em\"></span><span class=\"mord\">1</span><span class=\"mclose\"><span class=\"mclose\">)</span><span class=\"msupsub\"><span class=\"vlist-t\"><span class=\"vlist-r\"><span class=\"vlist\" style=\"height:0.814108em\"><span style=\"top:-3.063em;margin-right:0.05em\"><span class=\"pstrut\" style=\"height:2.7em\"></span><span class=\"sizing reset-size6 size3 mtight\"><span class=\"mord mtight\">2</span></span></span></span></span></span></span></span></span></span></span><span class=\"vlist-s\">​</span></span><span class=\"vlist-r\"><span class=\"vlist\" style=\"height:0.686em\"><span></span></span></span></span></span><span class=\"mclose nulldelimiter\"></span></span></span></span></span></span>﻿</span></p>', '', '', 0, 0, 0, 0, '2021-02-07 03:41:40', 0),
(13258, 275, 0, 0, 24, '', 'https://katex.org/docs/supported.html', 'Full list of functions supported by KaTeX', 1, 0, 0, 0, '2021-02-07 03:41:40', 0),
(13263, 110, 0, 0, 7, '<p>Serve high operating hour, high horsepower loads with premium efficiency motors.</p>', '', '', 0, 0, 0, 0, '2021-02-08 17:55:24', 1),
(13264, 110, 0, 0, 7, '<p>For optimum belt drive efficiency set and maintain correct tensioning and alignment on belt drives.</p>', '', '', 0, 0, 0, 0, '2021-02-08 17:55:24', 1),
(13265, 287, 0, 0, 24, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/04/f15/whentopurchase_nema_motor_systemts1.pdf', 'When to Purchase Premium Efficiency Motors', 1, 0, 0, 0, '2021-02-08 22:15:24', 1),
(13266, 287, 0, 0, 24, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/04/f15/estimate_motor_efficiency_motor_systemts2.pdf', 'Estimating Motor Efficiency in the Field', 1, 0, 0, 0, '2021-02-08 22:15:24', 1),
(13267, 287, 0, 0, 24, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/04/f15/extend_motor_operlife_motor_systemts3.pdf', 'Extend the Operating Life of Your Motor', 1, 0, 0, 0, '2021-02-08 22:15:24', 1),
(13268, 287, 0, 0, 24, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/04/f15/importance_motor_shaft_motor_systemts4.pdf', 'The Importance of Motor Shaft Alignment', 1, 0, 0, 0, '2021-02-08 22:15:24', 1),
(13269, 287, 0, 0, 24, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/04/f15/avoid_nuisance_motorsys_ts6.pdf', 'Avoid Nuisance Tripping with Premium Efficiency Motors', 1, 0, 0, 0, '2021-02-08 22:15:24', 1),
(13270, 287, 0, 0, 24, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/04/f15/eliminate_voltage_unbalanced_motor_systemts7.pdf', 'Eliminate Voltage Unbalance', 1, 0, 0, 0, '2021-02-08 22:15:24', 1),
(13271, 287, 0, 0, 24, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/04/f15/motor_tip_sheet8.pdf', 'Eliminate Excessive In-Plant Distribution System Voltage Drops', 1, 0, 0, 0, '2021-02-08 22:15:24', 1),
(13272, 287, 0, 0, 24, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/04/f15/motor_tip_sheet9.pdf', 'Improve Motor Operation at Off-Design Voltages', 1, 0, 0, 0, '2021-02-08 22:15:24', 1),
(13273, 287, 0, 0, 24, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/04/f15/motor_tip_sheet10.pdf', 'Turn Motors Off When Not in Use', 1, 0, 0, 0, '2021-02-08 22:15:24', 1),
(13274, 287, 0, 0, 24, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/04/f15/motor_tip_sheet11.pdf', 'Adjustable Speed Drive Part-Load Efficiency', 1, 0, 0, 0, '2021-02-08 22:15:24', 1),
(13275, 287, 0, 0, 24, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/04/f15/motor_tip_sheet12.pdf', 'Is It Cost-Effective to Replace Old Eddy-Current Drives?', 1, 0, 0, 0, '2021-02-08 22:15:24', 1),
(13276, 287, 0, 0, 24, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/04/f15/motor_tip_sheet13.pdf', 'Magnetically Coupled Adjustable Speed Motor Drives', 1, 0, 0, 0, '2021-02-08 22:15:24', 1),
(13277, 287, 0, 0, 24, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/04/f15/motor_tip_sheet14.pdf', 'When Should Inverter-Duty Motors Be Specified?', 1, 0, 0, 0, '2021-02-08 22:15:24', 1),
(13278, 287, 0, 0, 24, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/04/f15/motor_tip_sheet15.pdf', 'Minimize Adverse Motor and Adjustable Speed Drive Interactions', 1, 0, 0, 0, '2021-02-08 22:15:24', 1),
(13329, 211, 0, 0, 11, 'Install localized welding ventilation', '', '', 0, 0, 0, 0, '2021-02-08 22:59:34', 0),
(13330, 211, 0, 1, 31, '<p>Welding processes must be well ventilated to protect personnel from fumes. Controlled ventilation can reduce the amount of air exhausted outside, and therefore energy losses, while adequately ventilating the welding process.</p>', '%zXz%', '%zXz%', 0, 0, 0, 0, '2021-02-08 22:59:34', 0),
(13331, 211, 0, 1, 26, 'Reduce ventilation energy losses by installing localized ducting above welding stations', '', '', 0, 0, 0, 0, '2021-02-08 22:59:34', 0),
(13332, 211, 0, 1, 26, '<p>Welding areas must be ventilated to maintain air quality standards specified by local authorities. </p>', '', '', 0, 0, 0, 0, '2021-02-08 22:59:34', 0),
(13333, 211, 0, 2, 24, '<p></p>', 'https://osha.oregon.gov/Pages/index.aspx', 'In Oregon this would be Oregon Occupational Safety and Health (OSHA)', 1, 0, 0, 0, '2021-02-08 22:59:34', 0),
(13334, 211, 0, 1, 15, 'Identify the source of heating and cooling for the building and the associated cost of operating the equipment. This may be packaged HVAC units , gas/electric heaters, etc. ', '', '', 0, 0, 0, 0, '2021-02-08 22:59:34', 0),
(13335, 211, 0, 1, 15, 'Heating degree days for the local area. Temperature bin data can be obtained from the National Ocean and Atmospheric Administration (NOAA).', '', '', 0, 0, 0, 0, '2021-02-08 22:59:34', 0),
(13336, 211, 0, 1, 15, 'Current exhaust air flow rate and the minimum exhaust air flow rate required by health and safety regulations', '', '', 0, 0, 0, 0, '2021-02-08 22:59:34', 0),
(13337, 211, 0, 1, 15, 'Quantity of welders or welding stations', '', '', 0, 0, 0, 0, '2021-02-08 22:59:34', 0),
(13338, 211, 0, 1, 15, 'Approximate the proposed length of ventilation required for the installation to estimate the cost of implementation', '', '', 0, 0, 0, 0, '2021-02-08 22:59:34', 0),
(13353, 9, 0, 0, 1, 'Versatile. Offers compact energy density. ', '', '', 0, 0, 0, 0, '2021-02-08 23:20:27', 1),
(13354, 9, 0, 0, 1, 'Spark free for potentially explosive environments', '', '', 0, 0, 0, 0, '2021-02-08 23:20:27', 1),
(13355, 9, 0, 0, 1, 'Can be used as an easy quick fix for many issues', '', '', 0, 0, 0, 0, '2021-02-08 23:20:27', 1),
(13356, 9, 0, 0, 1, 'Familiar utility for industrial personnel', '', '', 0, 0, 0, 0, '2021-02-08 23:20:27', 1),
(13357, 9, 0, 0, 1, 'A single mechanical energy input at the compressor can be distributed throughout a facility. ', '', '', 0, 0, 0, 0, '2021-02-08 23:20:27', 1),
(13373, 205, 0, 0, 8, '<p><strong>Internal Content: </strong>When adding a new page, header, card, or item: select \"Internal (not viewable by the public)\" for material intended to be used by EEC personnel only (such as this instructions page).</p>', '', '', 0, 0, 0, 0, '2021-02-08 23:29:06', 0),
(13374, 205, 0, 0, 8, '<p><strong>View/Edit/Move Mode: </strong>Use the toggle in the top right corner of any page header to switch between View Mode, Edit Mode, and Move Mode. The mode shown on the toggle is the mode the page is currently in.</p>', '', '', 0, 0, 0, 0, '2021-02-08 23:29:06', 0);
INSERT INTO `Items` (`itemId`, `cardId`, `orderIndex`, `indentation`, `iconType`, `contentText`, `contentUrl`, `contentLabel`, `contentMode`, `internal`, `inline`, `sourceId`, `created`, `approved`) VALUES
(13375, 205, 0, 0, 8, '<p><strong>Internal Links:</strong> Links to other Walkthrough Checklist Pages should use a truncated form starting with /wiki. For instance a link to the Compressed Air page should be shortened from: </p><p>\"<em>https://walkthrough.eec.oregonstate.edu/wiki/technologies/2\" </em></p><p>to</p><p><em>\"/wiki/technologies/2\". </em></p><p>This will insure links continue to work if the site is hosted in a new location.</p>', '', '', 0, 0, 0, 0, '2021-02-08 23:29:06', 0),
(13376, 206, 0, 0, 31, 'When creating pages or cards there are two methods for adding images:', '%zXz%', '%zXz%', 0, 0, 0, 0, '2021-02-08 23:31:29', 0),
(13377, 206, 0, 1, 26, 'You may enter an image URL. This is a web address that points to a specific image (ex: https://placekitten.com/300/200).', '', '', 0, 0, 0, 0, '2021-02-08 23:31:29', 0),
(13378, 206, 0, 2, 4, 'Always include \"https\" at the start of your image address and never \"http\". This ensures that the image is being sent over a secure network. A published page with HTTP images will display as \"Not Secure\" in most browsers, which will make users less confident when using our application.', '', '', 0, 0, 0, 0, '2021-02-08 23:31:29', 0),
(13379, 206, 0, 2, 4, '<p>Not all images can be linked.  Check to ensure the image renders afterwards.</p>', '', '', 0, 0, 0, 0, '2021-02-08 23:31:29', 0),
(13380, 206, 0, 2, 4, '<p>Do not add images that are copyright reserved</p>', '', '', 0, 0, 0, 0, '2021-02-08 23:31:29', 0),
(13381, 206, 0, 1, 26, 'You may upload an image. Valid images have the file format JPG, PNG, or GIF. Images are not allowed to be larger than six megabytes. ', '', '', 0, 0, 0, 0, '2021-02-08 23:31:29', 0),
(13382, 206, 0, 2, 12, 'Only upload images that you have intellectual property rights to use. This means that you should not use images that you did not create unless you have gotten express permission to use them from the creator.', '', '', 0, 0, 0, 0, '2021-02-08 23:31:29', 0),
(13383, 206, 0, 2, 7, 'If you want to use an image in multiple locations. Upload the image by submitting some content, then edit the content and you will see that the image has a URL that you can copy. You can reuse this URL anywhere on the website, this is the preferred method as it saves space on the server by only uploading the image once.', '', '', 0, 0, 0, 0, '2021-02-08 23:31:29', 0),
(13384, 133, 0, 0, 31, '<p>Vapor Compression Refrigeration: </p>', '%zXz%', '%zXz%', 0, 0, 0, 0, '2021-02-08 23:35:25', 1),
(13385, 133, 0, 0, 1, 'Provides reliable climate control for temperature sensitive applications', '', '', 0, 0, 0, 0, '2021-02-08 23:35:25', 1),
(13386, 133, 0, 0, 1, 'Lower typical energy requirements than other forms of refrigeration such as absorption and steam-jet ', '', '', 0, 0, 0, 0, '2021-02-08 23:35:25', 1),
(13387, 134, 0, 0, 31, '<p>Vapor Compression Refrigeration:</p>', '%zXz%', '%zXz%', 0, 0, 0, 0, '2021-02-08 23:36:09', 1),
(13388, 134, 0, 0, 2, 'More energy intensive than other cooling systems such as cooling towers and outside air economizers', '', '', 0, 0, 0, 0, '2021-02-08 23:36:09', 1),
(13389, 134, 0, 0, 2, 'Numerous interconnected components contribute to high capital cost and upkeep', '', '', 0, 0, 0, 0, '2021-02-08 23:36:09', 1),
(13412, 136, 0, 0, 3, '1 ton = 12,000 Btu/hr = 3.52 kW', '', '', 0, 0, 0, 0, '2021-02-08 23:51:04', 1),
(13413, 136, 0, 0, 3, '<p>1-1.5% compressor power reduction per 1°F decrease in condensing temperature</p>', '', '', 0, 0, 0, 20, '2021-02-08 23:51:04', 1),
(13414, 136, 0, 1, 31, '<p>(To be conservative, the OSU EEC estimates a 1% power drop per °F drop)</p>', '%zXz%', '%zXz%', 0, 0, 0, 0, '2021-02-08 23:51:04', 1),
(13415, 136, 0, 0, 3, '<p>2-3% compressor power reduction per 1°F increase in suction temperature for centrifugal machines</p>', '', '', 0, 0, 0, 21, '2021-02-08 23:51:04', 1),
(13416, 136, 0, 1, 31, '<p>(To be conservative, the OSU EEC estimates a 2% power drop per 1°F increase)</p>', '%zXz%', '%zXz%', 0, 0, 0, 0, '2021-02-08 23:51:04', 1),
(13417, 136, 0, 0, 3, '5% compressor power reduction from switching to thermo-syphon oil cooling from liquid-injection cooling', '', '', 0, 0, 0, 0, '2021-02-08 23:51:04', 1),
(13418, 136, 0, 0, 3, '14,500 Btu/hr per ton produced is rejected in the condensers', '', '', 0, 0, 0, 0, '2021-02-08 23:51:04', 1),
(13419, 278, 0, 0, 31, '<p>[Optional opportunity category summary]</p><p>In most cases, related opportunities may be grouped together by a common theme usually related to the avenue through which energy is saved. For example, in refrigeration systems, reducing the compressor power is a common mode of energy savings and there are numerous actions that can be taken to achieve this effect.</p><p></p><p>Below is the suggested order of descriptions, items, graphics, and resources to include. Feel free to deviate where it makes sense and don\'t feel the need to use every icon available. </p>', '', '', 0, 0, 0, 0, '2021-02-08 23:51:26', 0),
(13420, 278, 0, 0, 11, '<p>Phrase the opportunity using an action statement like in an AR description (no closing punctuation) Ex.) Install an economizer, Upgrade to more efficient equipment, etc.</p>', '', '', 0, 0, 0, 0, '2021-02-08 23:51:26', 0),
(13421, 278, 0, 1, 31, '<p>An optional opportunity summary is written using complete sentences. </p>', '', '', 0, 0, 0, 0, '2021-02-08 23:51:26', 0),
(13422, 278, 0, 1, 10, '<p>Opportunity items follow a bullet-list style format</p>', '', '', 0, 0, 0, 0, '2021-02-08 23:51:26', 0),
(13423, 278, 0, 1, 3, '<p>Complete sentences with closing punctuation are not necessary although may be used.</p>', '', '', 0, 0, 0, 0, '2021-02-08 23:51:26', 0),
(13424, 278, 0, 1, 7, '<p>Best Practice</p>', '', '', 0, 0, 0, 0, '2021-02-08 23:51:26', 0),
(13425, 278, 0, 1, 1, '<p>Pros</p>', '', '', 0, 0, 0, 0, '2021-02-08 23:51:26', 0),
(13426, 278, 0, 1, 2, '<p>Cons</p>', '', '', 0, 0, 0, 0, '2021-02-08 23:51:26', 0),
(13427, 278, 0, 1, 4, '<p>Caveat</p>', '', '', 0, 0, 0, 0, '2021-02-08 23:51:26', 0),
(13428, 278, 0, 1, 14, '<p>Question to ask</p>', '', '', 0, 0, 0, 0, '2021-02-08 23:51:26', 0),
(13429, 278, 0, 1, 8, '<p>General tips may be added</p>', '', '', 0, 0, 0, 0, '2021-02-08 23:51:26', 0),
(13430, 278, 0, 1, 27, '<p>Equipment </p>', '', '', 0, 0, 0, 0, '2021-02-08 23:51:26', 0),
(13431, 278, 0, 1, 27, '<p>Items may be added inline to create a horizontal list</p>', '', '', 0, 0, 1, 0, '2021-02-08 23:51:26', 0),
(13432, 278, 0, 1, 15, '<p>Standalone datum</p>', '', '', 0, 0, 0, 0, '2021-02-08 23:51:26', 0),
(13433, 278, 0, 2, 8, '<p>Tips related to specific items may be added in this fashion</p>', '', '', 0, 0, 0, 0, '2021-02-08 23:51:26', 0),
(13434, 278, 0, 1, 15, '<p>Related data may be categorized into bulleted lists</p>', '', '', 1, 0, 0, 0, '2021-02-08 23:51:26', 0),
(13435, 278, 0, 2, 26, '<p>Related datum 1</p>', '', '', 0, 0, 0, 0, '2021-02-08 23:51:26', 0),
(13436, 278, 0, 2, 26, '<p>Related datum 2</p>', '', '', 0, 0, 0, 0, '2021-02-08 23:51:26', 0),
(13437, 278, 0, 2, 26, '<p>Related datum 3</p>', '', '', 0, 0, 0, 0, '2021-02-08 23:51:26', 0),
(13438, 278, 0, 1, 12, '<p>Suggested action</p>', '', '', 0, 0, 0, 0, '2021-02-08 23:51:26', 0),
(13439, 278, 0, 1, 17, '<p>Include graphics and resources at the end of an opportunity section.</p>', 'https://docs.google.com/document/d/1yDee1KpuIohxs36RELVCpm19-N96h4keDRt_eupD5Bw/edit?usp=sharing', 'EEC Writing Standards', 1, 0, 0, 0, '2021-02-08 23:51:26', 0),
(13440, 139, 0, 0, 32, '', '/uploads/user_58/46e54440c2be9608320703b9efb9b082.jpg', 'Simple Refrigeration Cycle', 0, 0, 0, 0, '2021-02-08 23:53:18', 1),
(13441, 139, 0, 0, 32, '', '/uploads/user_58/d64fd1cf30ad7eeb7bc82c88f7aeec1c.jpg', 'Mollier Diagram', 0, 0, 0, 0, '2021-02-08 23:53:18', 1),
(13442, 106, 0, 0, 31, 'As the steam goes though the pipes it will lose energy to the surrounding environment. Although the pipes may be completely leak free, the effects of lost energy are the same as a leak. Insulating the steam system will require less fuel to get the necessary amount of steam to the end user. ', '', '', 1, 0, 0, 0, '2021-02-08 23:55:32', 0),
(13443, 106, 0, 0, 10, 'Exposed pipes, valves, or fittings', '', '', 1, 0, 0, 0, '2021-02-08 23:55:32', 0),
(13444, 106, 0, 0, 11, 'Insulate steam lines', '', '', 0, 0, 0, 0, '2021-02-08 23:55:32', 0),
(13445, 106, 0, 0, 11, 'Insulate valves and fittings', '', '', 0, 0, 0, 0, '2021-02-08 23:55:32', 0),
(13446, 106, 0, 0, 11, 'Insulate condensate lines', '', '', 0, 0, 0, 0, '2021-02-08 23:55:32', 0),
(13447, 106, 0, 0, 21, 'An OSU EEC Analysis Template in Microsoft Excel Format', 'https://drive.google.com/file/d/1Et50Qc77pWtPkZcorKcPG_RSuK-Vc_lx/view?usp=sharing', 'Insulation Template', 0, 1, 0, 0, '2021-02-08 23:55:32', 0),
(13448, 106, 0, 1, 26, 'The Insulation Template is almost approved', '', '', 1, 1, 0, 0, '2021-02-08 23:55:32', 0),
(13449, 106, 0, 0, 21, 'North American Insulation Manufacturers Association Software Download', 'https://insulationinstitute.org/tools-resources/free-3e-plus/?cn-reloaded=1', 'NAIMA 3E Plus Insulation Tool', 1, 0, 0, 0, '2021-02-08 23:55:32', 0),
(13450, 270, 0, 0, 26, '<p><strong>Approach Temperature</strong></p>', '', '', 0, 0, 0, 0, '2021-02-08 23:55:46', 0),
(13451, 270, 0, 1, 31, '<p>Temperature difference between the liquid/gas in the heat exchanger as it exists compared with the surrounding medium that serves as a heat source or sink.</p>', '', '', 0, 0, 0, 0, '2021-02-08 23:55:46', 0),
(13452, 270, 0, 0, 26, '<p><strong>Condenser</strong></p>', '', '', 0, 0, 0, 0, '2021-02-08 23:55:46', 0),
(13453, 270, 0, 1, 31, '<p>Heat exchanger in which the refrigerant absorbs energy from its surroundings and changes from a liquid to a gas.</p>', '', '', 0, 0, 0, 0, '2021-02-08 23:55:46', 0),
(13454, 270, 0, 0, 26, '<p><strong>Compressor Work</strong></p>', '', '', 0, 0, 0, 0, '2021-02-08 23:55:46', 0),
(13455, 270, 0, 1, 31, '<p>Change in enthalpy as the refrigerant is compressed.</p>', '', '', 0, 0, 0, 0, '2021-02-08 23:55:46', 0),
(13456, 270, 0, 0, 26, '<p><strong>Cooling Effect</strong></p>', '', '', 0, 0, 0, 0, '2021-02-08 23:55:46', 0),
(13457, 270, 0, 1, 31, '<p>Heat exchanger in which refrigerant gives off energy to its surroundings and condenses from a gas to a liquid.</p>', '', '', 0, 0, 0, 0, '2021-02-08 23:55:46', 0),
(13458, 270, 0, 0, 26, '<p><strong>Discharge, Condensing, High-side Pressure</strong></p>', '', '', 0, 0, 0, 0, '2021-02-08 23:55:46', 0),
(13459, 270, 0, 1, 31, '<p>Change in enthalpy in the evaporator as the refrigerant absorbs energy and changes from a liquid to a gas.</p>', '', '', 0, 0, 0, 0, '2021-02-08 23:55:46', 0),
(13460, 270, 0, 0, 26, '<p><strong>Enthalpy</strong></p>', '', '', 0, 0, 0, 0, '2021-02-08 23:55:46', 0),
(13461, 270, 0, 1, 31, '<p>Pressure at the compressor discharge at which the refrigerant condenses. Condensing pressure fluctuates with outside temperatures in air-cooled or evaporative units.</p>', '', '', 0, 0, 0, 0, '2021-02-08 23:55:46', 0),
(13462, 270, 0, 0, 26, '<p><strong>Evaporator</strong></p>', '', '', 0, 0, 0, 0, '2021-02-08 23:55:46', 0),
(13463, 270, 0, 1, 31, '<p>Enthalpy is sometimes called total energy because it includes internal energy (U), the work done in a particular process (pV), and change of phase.</p>', '', '', 0, 0, 0, 0, '2021-02-08 23:55:46', 0),
(13464, 270, 0, 0, 26, '<p><strong>Latent Heat of Vaporization</strong></p>', '', '', 0, 0, 0, 0, '2021-02-08 23:55:46', 0),
(13465, 270, 0, 1, 31, '<p>Approach temperature difference across a heat exchanger with the heat transfer coefficient maximized. This can be measured for clean condensers or evaporators with all heat exchange fans running at full power.</p>', '', '', 0, 0, 0, 0, '2021-02-08 23:55:46', 0),
(13466, 270, 0, 0, 26, '<p><strong>Minimum Approach Temperature Difference (MATD)</strong></p>', '', '', 0, 0, 0, 0, '2021-02-08 23:55:46', 0),
(13467, 270, 0, 1, 31, '<p>Air-cooled and evaporative condensers control the maintain minimum discharge pressure by cycling fans or controlling speed. Plant personnel control the minimum pressure set point.</p>', '', '', 0, 0, 0, 0, '2021-02-08 23:55:46', 0),
(13468, 270, 0, 0, 26, '<p><strong>Minimum Discharge Pressure</strong></p>', '', '', 0, 0, 0, 0, '2021-02-08 23:55:46', 0),
(13469, 270, 0, 1, 31, '<p>The refrigerant is the \"working fluid\" which evaporates to absorb the latent heat of vaporization from its surroundings, thereby cooling its surroundings. To permit refrigerant to operate continuously, the refrigerant vapor is compressed and reconverted to liquid effectively moving energy from where the refrigerant vaporizes to where it condenses.</p>', '', '', 0, 0, 0, 0, '2021-02-08 23:55:46', 0),
(13470, 270, 0, 0, 26, '<p><strong>Refrigerant</strong></p>', '', '', 0, 0, 0, 0, '2021-02-08 23:55:46', 0),
(13471, 270, 0, 1, 31, '<p>Change in enthalpy as the refrigerant condenses.</p>', '', '', 0, 0, 0, 0, '2021-02-08 23:55:46', 0),
(13472, 270, 0, 0, 26, '<p><strong>Rejected Heat</strong></p>', '', '', 0, 0, 0, 0, '2021-02-08 23:55:46', 0),
(13473, 270, 0, 1, 31, '<p>Change in enthalpy as the refrigerant evaporates from a saturated liquid to a saturated vapor at a specified pressure.</p>', '', '', 0, 0, 0, 0, '2021-02-08 23:55:46', 0),
(13474, 270, 0, 0, 26, '<p><strong>Suction, Low-side Pressure</strong></p>', '', '', 0, 0, 0, 0, '2021-02-08 23:55:46', 0),
(13475, 270, 0, 1, 31, '<p>Pressure at the inlet to the compressor is also the pressure at which the refrigerant evaporates.</p>', '', '', 0, 0, 0, 0, '2021-02-08 23:55:46', 0),
(13476, 270, 0, 0, 26, '<p><strong>Tons</strong></p>', '', '', 0, 0, 0, 0, '2021-02-08 23:55:46', 0),
(13477, 270, 0, 1, 31, '<p>A measure of the cooling capacity usually applied to larger cooling systems and heat pumps. One ton of cooling represents the ability to absorb energy at a rate originally determined by melting one short ton (2,000 lbs) of ice in 24 hours. Now, 1 ton = 12,000 Btu/hr = 3.52 kW.</p>', '', '', 0, 0, 0, 0, '2021-02-08 23:55:46', 0),
(13478, 270, 0, 0, 31, '<p><strong>Approach Temperature﻿</strong></p>', '', '', 0, 0, 0, 0, '2021-02-08 23:55:46', 0),
(13479, 270, 0, 1, 26, 'Temperature difference between the liquid/gas in the heat exchanger as it exists compared with the surrounding medium that serves as a heat source or sink.', '', '', 0, 0, 0, 0, '2021-02-08 23:55:46', 0),
(13480, 270, 0, 0, 31, '<p></p><p><strong>Condenser﻿</strong></p>', '', '', 0, 0, 0, 0, '2021-02-08 23:55:46', 0),
(13481, 270, 0, 1, 26, 'Heat exchanger in which refrigerant gives off energy to its surroundings and condenses from a gas to a liquid.', '', '', 0, 0, 0, 0, '2021-02-08 23:55:46', 0),
(13482, 270, 0, 0, 31, '<p></p><p><strong>Cooling Effect</strong></p>', '', '', 0, 0, 0, 0, '2021-02-08 23:55:46', 0),
(13483, 270, 0, 1, 26, 'Change in enthalpy in the evaporator as the refrigerant absorbs energy and changes from a liquid to a gas.', '', '', 0, 0, 0, 0, '2021-02-08 23:55:46', 0),
(13484, 270, 0, 0, 31, '<p></p><p><strong>Compressor Work</strong></p>', '', '', 0, 0, 0, 0, '2021-02-08 23:55:46', 0),
(13485, 270, 0, 1, 26, 'Change in enthalpy as the refrigerant is compressed.', '', '', 0, 0, 0, 0, '2021-02-08 23:55:46', 0),
(13486, 270, 0, 0, 31, '<p></p><p><strong>Discharge, Condensing, High-side Pressure</strong></p>', '', '', 0, 0, 0, 0, '2021-02-08 23:55:46', 0),
(13487, 270, 0, 1, 26, 'Pressure at the compressor discharge at which the refrigerant condenses. Condensing pressure fluctuates with outside temperatures in air-cooled or evaporative units.', '', '', 0, 0, 0, 0, '2021-02-08 23:55:46', 0),
(13488, 270, 0, 0, 31, '<p></p><p><strong>Enthalpy</strong></p>', '', '', 0, 0, 0, 0, '2021-02-08 23:55:46', 0),
(13489, 270, 0, 1, 26, 'Enthalpy is sometimes called total energy because it includes internal energy (U), the work done in a particular process (pV), and change of phase.', '', '', 0, 0, 0, 0, '2021-02-08 23:55:46', 0),
(13490, 270, 0, 0, 31, '<p></p><p><strong>Evaporator</strong></p>', '', '', 0, 0, 0, 0, '2021-02-08 23:55:46', 0),
(13491, 270, 0, 1, 26, 'Heat exchanger in which the refrigerant absorbs energy from its surroundings and changes from a liquid to a gas.', '', '', 0, 0, 0, 0, '2021-02-08 23:55:46', 0),
(13492, 270, 0, 0, 31, '<p></p><p><strong>Latent Heat of Vaporization</strong></p>', '', '', 0, 0, 0, 0, '2021-02-08 23:55:46', 0),
(13493, 270, 0, 1, 26, 'Change in enthalpy as the refrigerant evaporates from a saturated liquid to a saturated vapor at a specified pressure.', '', '', 0, 0, 0, 0, '2021-02-08 23:55:46', 0),
(13494, 270, 0, 0, 31, '<p></p><p><strong>Minimum Approach Temperature Difference (MATD)</strong></p>', '', '', 0, 0, 0, 0, '2021-02-08 23:55:46', 0),
(13495, 270, 0, 1, 26, 'Approach temperature difference across a heat exchanger with the heat transfer coefficient maximized. This can be measured for clean condensers or evaporators with all heat exchange fans running at full power.', '', '', 0, 0, 0, 0, '2021-02-08 23:55:46', 0),
(13496, 270, 0, 0, 31, '<p></p><p><strong>Minimum Discharge Pressure</strong></p>', '', '', 0, 0, 0, 0, '2021-02-08 23:55:46', 0),
(13497, 270, 0, 1, 26, 'Air-cooled and evaporative condensers control the maintain minimum discharge pressure by cycling fans or controlling speed. Plant personnel control the minimum pressure set point.', '', '', 0, 0, 0, 0, '2021-02-08 23:55:46', 0),
(13498, 270, 0, 0, 31, '<p></p><p><strong>Refrigerant</strong></p>', '', '', 0, 0, 0, 0, '2021-02-08 23:55:46', 0),
(13499, 270, 0, 1, 26, 'The refrigerant is the \"working fluid\" which evaporates to absorb the latent heat of vaporization from its surroundings, thereby cooling its surroundings. To permit refrigerant to operate continuously, the refrigerant vapor is compressed and reconverted to liquid effectively moving energy from where the refrigerant vaporizes to where it condenses.', '', '', 0, 0, 0, 0, '2021-02-08 23:55:46', 0),
(13500, 270, 0, 0, 31, '<p></p><p><strong>Rejected Heat</strong></p>', '', '', 0, 0, 0, 0, '2021-02-08 23:55:46', 0),
(13501, 270, 0, 1, 26, 'Change in enthalpy as the refrigerant condenses.', '', '', 0, 0, 0, 0, '2021-02-08 23:55:46', 0),
(13502, 270, 0, 0, 31, '<p></p><p><strong>Suction, Low-side Pressure</strong></p>', '', '', 0, 0, 0, 0, '2021-02-08 23:55:46', 0),
(13503, 270, 0, 1, 26, 'Pressure at the inlet to the compressor is also the pressure at which the refrigerant evaporates.', '', '', 0, 0, 0, 0, '2021-02-08 23:55:46', 0),
(13504, 270, 0, 0, 31, '<p></p><p><strong>Tons</strong></p>', '', '', 0, 0, 0, 0, '2021-02-08 23:55:46', 0),
(13505, 270, 0, 1, 26, 'A measure of the cooling capacity usually applied to larger cooling systems and heat pumps. One ton of cooling represents the ability to absorb energy at a rate originally determined by melting one short ton (2,000 lbs) of ice in 24 hours. Now, 1 ton = 12,000 Btu/hr = 3.52 kW.', '', '', 0, 0, 0, 0, '2021-02-08 23:55:46', 0),
(13506, 290, 0, 0, 17, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam15_benchmark.pdf', 'Benchmark the Fuel Cost of Steam Generation', 1, 0, 0, 0, '2021-02-08 23:57:44', 1),
(13507, 290, 0, 0, 17, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam7_surfaces.pdf', 'Clean Firetube Boiler Waterside Heat Transfer Surfaces', 1, 0, 0, 0, '2021-02-08 23:57:44', 1),
(13508, 290, 0, 0, 17, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam26a_condensing.pdf', 'Consider Installing a Condensing Economizer', 1, 0, 0, 0, '2021-02-08 23:57:44', 1),
(13509, 290, 0, 0, 17, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam22_backpressure.pdf', 'Consider Installing High-Pressure Boilers with Backpressure Turbine-Generators', 1, 0, 0, 0, '2021-02-08 23:57:44', 1),
(13510, 290, 0, 0, 17, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam25_firetube_boilers.pdf', 'Consider Installing Turbulators on Two- and Three-Pass Firetube Boilers', 1, 0, 0, 0, '2021-02-08 23:57:44', 1),
(13511, 290, 0, 0, 17, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam21_rotating_equip.pdf', 'Consider Steam Turbine Drives for Rotating Equipment', 1, 0, 0, 0, '2021-02-08 23:57:44', 1),
(13512, 290, 0, 0, 17, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam26b_condensing.pdf', 'Considerations When Selecting a Condensing Economizer', 1, 0, 0, 0, '2021-02-08 23:57:44', 1),
(13513, 290, 0, 0, 17, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam19_vessels.pdf', 'Cover Heated, Open Vessels', 1, 0, 0, 0, '2021-02-08 23:57:44', 1),
(13514, 290, 0, 0, 17, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam18_steam_systems.pdf', 'Deaerators in Industrial Steam Systems', 1, 0, 0, 0, '2021-02-08 23:57:44', 1),
(13515, 290, 0, 0, 17, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam12_lowpressure_steam.pdf', 'Flash High-Pressure Condensate to Regenerate Low-Pressure Steam', 1, 0, 0, 0, '2021-02-08 23:57:44', 1),
(13516, 290, 0, 0, 17, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam1_traps.pdf', 'Inspect and Repair Steam Traps', 1, 0, 0, 0, '2021-02-08 23:57:44', 1),
(13517, 290, 0, 0, 17, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam23_control_system.pdf', 'Install an Automatic Blowdown-Control System', 1, 0, 0, 0, '2021-02-08 23:57:44', 1),
(13518, 290, 0, 0, 17, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam17_valves_fittings.pdf', 'Install Removable Insulation on Valves and Fittings', 1, 0, 0, 0, '2021-02-08 23:57:44', 1),
(13519, 290, 0, 0, 17, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam2_insulate.pdf', 'Insulate Steam Distribution and Condensate Return Lines', 1, 0, 0, 0, '2021-02-08 23:57:44', 1),
(13520, 290, 0, 0, 17, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam4_boiler_efficiency.pdf', 'Improve Your Boiler’s Combustion Efficiency', 1, 0, 0, 0, '2021-02-08 23:57:44', 1),
(13521, 290, 0, 0, 17, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam9_blowdown.pdf', 'Minimize Boiler Blowdown', 1, 0, 0, 0, '2021-02-08 23:57:44', 1),
(13522, 290, 0, 0, 17, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam16_cycling_losses.pdf', 'Minimize Boiler Short Cycling Losses', 1, 0, 0, 0, '2021-02-08 23:57:44', 1),
(13523, 290, 0, 0, 17, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam10_boiler_blowdown.pdf', 'Recover Heat from Boiler Blowdown', 1, 0, 0, 0, '2021-02-08 23:57:44', 1),
(13524, 290, 0, 0, 17, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam20_turbogenerators.pdf', 'Replace Pressure-Reducing Valves with Backpressure Turbogenerators', 1, 0, 0, 0, '2021-02-08 23:57:44', 1),
(13525, 290, 0, 0, 17, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam8_boiler.pdf', 'Return Condensate to the Boiler', 1, 0, 0, 0, '2021-02-08 23:57:44', 1),
(13526, 290, 0, 0, 17, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam24_burners.pdf', 'Upgrade Boilers with Energy-Efficient Burners', 1, 0, 0, 0, '2021-02-08 23:57:44', 1),
(13527, 290, 0, 0, 17, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam3_recovery.pdf', 'Use Feedwater Economizers for Waste Heat Recovery', 1, 0, 0, 0, '2021-02-08 23:57:44', 1),
(13528, 290, 0, 0, 17, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam14_chillers.pdf', 'Use Low-Grade Waste Steam to Power Absorption Chillers', 1, 0, 0, 0, '2021-02-08 23:57:44', 1),
(13529, 290, 0, 0, 17, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam29_use_steam.pdf', 'Use Steam Jet Ejectors or Thermocompressors to Reduce Venting of Low-Pressure Steam', 1, 0, 0, 0, '2021-02-08 23:57:44', 1),
(13530, 290, 0, 0, 17, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam11_waste_steam.pdf', 'Use Vapor Recompression to Recover Low-Pressure Waste Steam', 1, 0, 0, 0, '2021-02-08 23:57:44', 1),
(13531, 290, 0, 0, 17, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam13_vent_condenser.pdf', 'Use a Vent Condenser to Recover Flash Steam Energy', 1, 0, 0, 0, '2021-02-08 23:57:44', 1),
(13532, 290, 0, 0, 24, 'See steam tip sheets', 'https://www.energy.gov/eere/amo/tip-sheets-system', 'U.S.DOE Energy Tip Sheets by System', 1, 0, 0, 0, '2021-02-08 23:57:44', 1),
(13533, 124, 0, 0, 17, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/05/f16/adjust_speed_pumping.pdf', 'Adjustable Speed Pumping Applications', 1, 0, 0, 0, '2021-02-09 00:01:56', 1),
(13534, 124, 0, 0, 17, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/05/f16/pumping1_conduct.pdf', 'Conduct an In-Plant Pumping System Survey', 1, 0, 0, 0, '2021-02-09 00:01:56', 1),
(13535, 124, 0, 0, 17, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/05/f16/centrifug_pumps_control.pdf', 'Control Strategies for Centrifugal Pumps with Variable Flow Rate Requirements', 1, 0, 0, 0, '2021-02-09 00:01:56', 1),
(13536, 124, 0, 0, 17, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/05/f16/control_valves_pumping_ts10.pdf', 'Energy Savings Opportunities in Control Valves', 1, 0, 0, 0, '2021-02-09 00:01:56', 1),
(13537, 124, 0, 0, 17, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/05/f16/maintain_pumping_systemsts5.pdf', 'Maintain Pumping Systems Effectively', 1, 0, 0, 0, '2021-02-09 00:01:56', 1),
(13538, 124, 0, 0, 17, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/05/f16/match_pumps_to_system.pdf', 'Match Pumps to System Requirements', 1, 0, 0, 0, '2021-02-09 00:01:56', 1),
(13539, 124, 0, 0, 17, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/05/f16/optimize_parallel_pumping.pdf', 'Optimize Parallel Pumping Systems', 1, 0, 0, 0, '2021-02-09 00:01:56', 1),
(13540, 124, 0, 0, 17, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/05/f16/pump_selection.pdf', 'Pump Selection Considerations', 1, 0, 0, 0, '2021-02-09 00:01:56', 1),
(13541, 124, 0, 0, 17, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/05/f16/reduce_pumping_costs.pdf', 'Reduce Pumping Costs through Optimum Pipe Sizing', 1, 0, 0, 0, '2021-02-09 00:01:56', 1),
(13542, 124, 0, 0, 17, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/05/f16/efficient_centrifug_pumps.pdf', 'Select an Energy-Efficient Centrifugal Pump', 1, 0, 0, 0, '2021-02-09 00:01:56', 1),
(13543, 124, 0, 0, 17, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/05/f16/test_pumping_system__pumping_systemts4.pdf', 'Test for Pumping System Efficiency', 1, 0, 0, 0, '2021-02-09 00:01:56', 1),
(13544, 124, 0, 0, 17, '<p></p>', 'https://www.energy.gov/sites/prod/files/2014/05/f16/trim_replace_impellers7.pdf', 'Trim or Replace Impellers on Oversized Pumps', 1, 0, 0, 0, '2021-02-09 00:01:56', 1),
(13545, 182, 0, 0, 4, 'Improperly designed pump systems can lead to low pressures at the pump inlet which can lead to cavitation. This can seriously damage the pump and reduce its operating life.', '', '', 0, 0, 0, 0, '2021-02-09 00:02:17', 1),
(13546, 182, 0, 0, 24, 'Online resource discussing how cavitation occurs and how to detect and prevent it from happening.', 'https://modernpumpingtoday.com/detecting-pump-cavitation/', 'Detecting Pump Cavitation', 1, 0, 0, 0, '2021-02-09 00:02:17', 1),
(13547, 284, 0, 0, 17, '<p>-</p>', '-', '*Add link to data collection guide', 0, 0, 0, 0, '2021-02-09 00:02:41', 0),
(13548, 289, 0, 0, 22, '<p></p>', 'https://docs.google.com/presentation/d/11sXImoslkAlPdYkWdo9k30ZGqip8-wWytO7_oLm4y7E/edit#slide=id.p8', 'Pumps - a slideshow', 0, 0, 0, 0, '2021-02-09 00:02:55', 1),
(13549, 288, 0, 0, 24, '<p></p>', 'https://www.dxpe.com/different-types-centrifugal-pumps-applications/', 'Different Types of Centrifugal Pumps and Their Applications', 1, 0, 0, 0, '2021-02-09 00:03:34', 1),
(13550, 288, 0, 0, 24, '<p></p>', 'https://www.aquaculturealliance.org/advocate/cavitation-the-pump-disease/', 'Cavitation, the ‘pump disease', 1, 0, 0, 0, '2021-02-09 00:03:34', 1),
(13551, 288, 0, 0, 24, '<p></p>', 'https://www.deppmann.com/blog/service-tip-of-the-month/pump-cavitation/', 'Pump Cavitation', 1, 0, 0, 0, '2021-02-09 00:03:34', 1),
(13552, 288, 0, 0, 17, 'IAC University Guide:', 'https://iac.university/technicalDocs/industr/ch6.pdf', 'PRIMEMOVERS OF ENERGY: PUMPS', 1, 0, 0, 0, '2021-02-09 00:03:34', 1),
(13553, 288, 0, 0, 17, '<p></p>', 'https://www.unido.org/sites/default/files/2017-11/PSO-Manual-PRINT-FINAL-20161109-One-Page.pdf', 'Manual for Industrial Pump Systems Assessment and Optimization', 1, 0, 0, 0, '2021-02-09 00:03:34', 1),
(13554, 288, 0, 0, 17, 'BC Hydro Document ', 'https://www.bchydro.com/content/dam/BCHydro/customer-portal/documents/power-smart/alliance/programs/industrial-basics-of-industrial-pumps-for-small-pump-program.pdf', 'Basics Of Industrial Pumps For Small Pump', 1, 0, 0, 0, '2021-02-09 00:03:34', 1);

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

--
-- Dumping data for table `Notifications`
--

INSERT INTO `Notifications` (`notificationId`, `requestId`, `userId`, `text`, `type`) VALUES
(96, 12, 47, 'The request \"Refrigeration Opportunity: Reduce System Lift\" is awaiting an orange review', 2),
(101, 12, 56, 'The request \"Refrigeration Opportunity: Reduce System Lift\" is awaiting an orange review', 2),
(104, 12, 59, 'The request \"Refrigeration Opportunity: Reduce System Lift\" is awaiting an orange review', 2),
(105, 12, 60, 'The request \"Refrigeration Opportunity: Reduce System Lift\" is awaiting an orange review', 2),
(107, 12, 62, 'The request \"Refrigeration Opportunity: Reduce System Lift\" is awaiting an orange review', 2),
(108, 12, 63, 'The request \"Refrigeration Opportunity: Reduce System Lift\" is awaiting an orange review', 2),
(109, 12, 65, 'The request \"Refrigeration Opportunity: Reduce System Lift\" is awaiting an orange review', 2),
(110, 12, 67, 'The request \"Refrigeration Opportunity: Reduce System Lift\" is awaiting an orange review', 2),
(114, 13, 47, 'The request \"Refrigeration Page\" is awaiting an orange review', 2),
(119, 13, 56, 'The request \"Refrigeration Page\" is awaiting an orange review', 2),
(122, 13, 59, 'The request \"Refrigeration Page\" is awaiting an orange review', 2),
(123, 13, 60, 'The request \"Refrigeration Page\" is awaiting an orange review', 2),
(125, 13, 62, 'The request \"Refrigeration Page\" is awaiting an orange review', 2),
(126, 13, 63, 'The request \"Refrigeration Page\" is awaiting an orange review', 2),
(127, 13, 65, 'The request \"Refrigeration Page\" is awaiting an orange review', 2),
(128, 13, 67, 'The request \"Refrigeration Page\" is awaiting an orange review', 2),
(139, 0, 56, 'martzal has submitted a contributor card that is awaiting review', 6),
(144, 0, 56, 'peterj has submitted a contributor card that is awaiting review', 6),
(168, 14, 47, 'The request \"Pump Page\" is awaiting a black review from a qualified reviewer', 3),
(171, 14, 54, 'The request \"Pump Page\" is awaiting a black review from a qualified reviewer', 3),
(173, 14, 56, 'The request \"Pump Page\" is awaiting a black review from a qualified reviewer', 3),
(174, 14, 57, 'The request \"Pump Page\" is awaiting a black review from a qualified reviewer', 3),
(176, 14, 59, 'The request \"Pump Page\" is awaiting a black review from a qualified reviewer', 3),
(177, 14, 60, 'The request \"Pump Page\" is awaiting a black review from a qualified reviewer', 3),
(179, 14, 62, 'The request \"Pump Page\" is awaiting a black review from a qualified reviewer', 3),
(180, 14, 63, 'The request \"Pump Page\" is awaiting a black review from a qualified reviewer', 3),
(181, 14, 65, 'The request \"Pump Page\" is awaiting a black review from a qualified reviewer', 3),
(182, 14, 67, 'The request \"Pump Page\" is awaiting a black review from a qualified reviewer', 3),
(183, 14, 69, 'The request \"Pump Page\" is awaiting a black review from a qualified reviewer', 3),
(188, 0, 56, 'Chris_Houck has submitted a contributor card that is awaiting review', 6),
(189, 0, 58, 'Chris_Houck has submitted a contributor card that is awaiting review', 6),
(191, 15, 47, 'The request \"Boiler and Steam\" is awaiting an orange review', 2),
(194, 15, 54, 'The request \"Boiler and Steam\" is awaiting an orange review', 2),
(196, 15, 56, 'The request \"Boiler and Steam\" is awaiting an orange review', 2),
(199, 15, 59, 'The request \"Boiler and Steam\" is awaiting an orange review', 2),
(200, 15, 60, 'The request \"Boiler and Steam\" is awaiting an orange review', 2),
(202, 15, 62, 'The request \"Boiler and Steam\" is awaiting an orange review', 2),
(203, 15, 63, 'The request \"Boiler and Steam\" is awaiting an orange review', 2),
(204, 15, 65, 'The request \"Boiler and Steam\" is awaiting an orange review', 2),
(205, 15, 67, 'The request \"Boiler and Steam\" is awaiting an orange review', 2),
(206, 15, 69, 'The request \"Boiler and Steam\" is awaiting an orange review', 2),
(271, 0, 56, 'ryanfrench2 has submitted a contributor card that is awaiting review', 6),
(292, 20, 47, 'The request \"How to create KaTeX formulas\" is awaiting an orange review', 2),
(295, 20, 54, 'The request \"How to create KaTeX formulas\" is awaiting an orange review', 2),
(296, 20, 55, 'The request \"How to create KaTeX formulas\" is awaiting an orange review', 2),
(297, 20, 56, 'The request \"How to create KaTeX formulas\" is awaiting an orange review', 2),
(298, 20, 57, 'The request \"How to create KaTeX formulas\" is awaiting an orange review', 2),
(300, 20, 59, 'The request \"How to create KaTeX formulas\" is awaiting an orange review', 2),
(301, 20, 60, 'The request \"How to create KaTeX formulas\" is awaiting an orange review', 2),
(303, 20, 62, 'The request \"How to create KaTeX formulas\" is awaiting an orange review', 2),
(304, 20, 63, 'The request \"How to create KaTeX formulas\" is awaiting an orange review', 2),
(305, 20, 65, 'The request \"How to create KaTeX formulas\" is awaiting an orange review', 2),
(306, 20, 67, 'The request \"How to create KaTeX formulas\" is awaiting an orange review', 2),
(307, 20, 69, 'The request \"How to create KaTeX formulas\" is awaiting an orange review', 2),
(310, 16, 47, 'The request \"Thermal Systems Overview\" is awaiting a black review from a qualified reviewer', 3),
(313, 16, 54, 'The request \"Thermal Systems Overview\" is awaiting a black review from a qualified reviewer', 3),
(314, 16, 55, 'The request \"Thermal Systems Overview\" is awaiting a black review from a qualified reviewer', 3),
(315, 16, 56, 'The request \"Thermal Systems Overview\" is awaiting a black review from a qualified reviewer', 3),
(317, 16, 58, 'The request \"Thermal Systems Overview\" is awaiting a black review from a qualified reviewer', 3),
(318, 16, 59, 'The request \"Thermal Systems Overview\" is awaiting a black review from a qualified reviewer', 3),
(319, 16, 60, 'The request \"Thermal Systems Overview\" is awaiting a black review from a qualified reviewer', 3),
(321, 16, 62, 'The request \"Thermal Systems Overview\" is awaiting a black review from a qualified reviewer', 3),
(322, 16, 63, 'The request \"Thermal Systems Overview\" is awaiting a black review from a qualified reviewer', 3),
(323, 16, 65, 'The request \"Thermal Systems Overview\" is awaiting a black review from a qualified reviewer', 3),
(324, 16, 67, 'The request \"Thermal Systems Overview\" is awaiting a black review from a qualified reviewer', 3),
(325, 16, 69, 'The request \"Thermal Systems Overview\" is awaiting a black review from a qualified reviewer', 3),
(328, 21, 47, 'The request \"Thermal Systems - Heat Exchangers\" is awaiting an orange review', 2),
(331, 21, 54, 'The request \"Thermal Systems - Heat Exchangers\" is awaiting an orange review', 2),
(332, 21, 55, 'The request \"Thermal Systems - Heat Exchangers\" is awaiting an orange review', 2),
(333, 21, 56, 'The request \"Thermal Systems - Heat Exchangers\" is awaiting an orange review', 2),
(336, 21, 59, 'The request \"Thermal Systems - Heat Exchangers\" is awaiting an orange review', 2),
(337, 21, 60, 'The request \"Thermal Systems - Heat Exchangers\" is awaiting an orange review', 2),
(339, 21, 62, 'The request \"Thermal Systems - Heat Exchangers\" is awaiting an orange review', 2),
(340, 21, 63, 'The request \"Thermal Systems - Heat Exchangers\" is awaiting an orange review', 2),
(341, 21, 65, 'The request \"Thermal Systems - Heat Exchangers\" is awaiting an orange review', 2),
(342, 21, 67, 'The request \"Thermal Systems - Heat Exchangers\" is awaiting an orange review', 2),
(343, 21, 69, 'The request \"Thermal Systems - Heat Exchangers\" is awaiting an orange review', 2),
(374, 0, 51, 'Silverware has submitted a contributor card that is awaiting review', 6),
(375, 0, 52, 'Silverware has submitted a contributor card that is awaiting review', 6),
(376, 0, 56, 'Silverware has submitted a contributor card that is awaiting review', 6),
(377, 0, 58, 'Silverware has submitted a contributor card that is awaiting review', 6),
(378, 0, 66, 'Silverware has submitted a contributor card that is awaiting review', 6);

-- --------------------------------------------------------

--
-- Table structure for table `Observations`
--

CREATE TABLE `Observations` (
  `observationId` int(10) UNSIGNED NOT NULL,
  `pageId` int(10) UNSIGNED NOT NULL,
  `userId` int(10) UNSIGNED NOT NULL,
  `type` tinyint(4) NOT NULL,
  `text` varchar(5000) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `hidden` tinyint(3) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Observations`
--

INSERT INTO `Observations` (`observationId`, `pageId`, `userId`, `type`, `text`, `created`, `hidden`) VALUES
(3, 62, 42, 1, 'some feedback1', '2021-01-05 22:03:21', 1),
(4, 62, 42, 2, 'some feedback2', '2021-01-05 22:03:21', 1);

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
(2, 2, 'Compressed Air', 'Compressed air is a common utility found in most industrial facilities', 'Compressed air has been a key industrial utility since the 1800\'s. It can drive pneumatic cylinders, air motors, diaphragm pumps and controls. It is capable of reasonably high force actuation, and is a common required utility in equipment packages. It can be used and is often misused to generate air flow for agitation, blow-off, cooling, and motive force applications. Screw compressors currently comprise the majority of industrial compressed air installations, but reciprocating and centrifugal compressors can be found in older or special installations/applications.', '/uploads/user_42/fe1402c50e24309eb11f4209c73e2daf.png', 0, 42, '2021-02-08 23:20:34', 1),
(44, 2, 'Motors and Controls', 'Electrical Motors and Motor Controls (Variable Speed Drives, etc) are crucial to most mechanized industrial processes and equipment.', 'Motors are a crucial part of any mechanized process and provide a means to do the majority of the mechanical work in most facilities.  Motors convert electrical energy into mechanical work to provide power to a wide range of applications including air compressors, fans, pumps, hydraulics, mixers, conveyors, and much more. The majority of industrial motors are three-phase AC induction/asynchronous motors due to their reliability and low cost.', 'https://live.staticflickr.com/65535/50069229503_243696380c_b.jpg', 0, 51, '2021-02-08 22:15:41', 1),
(45, 2, 'Pumps', 'Pumps provide a typical utility required throughout industry.', 'Centrifugal pumps are the most common type found in industry, followed by positive displacement pumps (used in hydraulics), pneumatic diaphragm pumps, peristaltic pumps, and other specialty pumps. \n\nUnless otherwise noted this section speaks to centrifugal pumps when addressing pump performance and efficiency. Changes in hydraulic energy required (pressure and flow) will translate to any pumping system. \n\nCentrifugal pumps generally come in one of three classes: radial flow, mixed flow, and axial flow.', 'https://live.staticflickr.com/65535/50066427331_ddae8822f2_b.jpg', 0, 55, '2021-02-09 00:03:43', 1),
(46, 2, 'Boilers and Steam', 'Boilers and Steam Systems are found in a large subset of industrial facilities', 'Steam energy offered a great breakthrough in the 1800’s, providing mechanical energy through steam engines. Steam is now more commonly used for heating in cooking vessels, material drying, building heat,  etc. Direct injection of steam can add moisture along with heat. ', 'https://live.staticflickr.com/65535/50070285347_17c30ab100_b.jpg', 0, 51, '2021-02-08 23:58:04', 1),
(47, 2, 'Thermal Systems', 'Many industrial processes require encouraging or resisting thermal energy transfer.', 'Managing the rate at which heat is exchanged in a process can greatly increase energy efficiency. These recommendations reduce the costs associated with generating heat for a process or cooling a system. This can be done through installing insulation or heat exchangers. \n\nInsulation resists heat transfer, requiring less energy input for systems by helping to maintain current temperatures. This is ideal for systems involving plastic/metal extrusions, blow molding, steam, ovens, and more. \n\nHeat exchangers increase heat transfer, allowing process heat to be reused. This solution focuses on repurposing heat that may otherwise be lost, such as combustion gas from an oven or steam condensate being returned to the city. This can save energy in processes like pasteurization, aerobic and anaerobic digestion, ovens, and steam.\n\nOther methods exist for thermal systems, such as fan cooling, managing emissivity, and direct impingement.\n\nOften these recommendations are not mutually exclusive. An oven may benefit from added insulation on the walls while also installing a recuperator to preheat combustion fuel with exhaust gasses. The outside of a shell and tube or concentric tube heat exchanger can be covered in insulation.', 'https://live.staticflickr.com/65535/50069411093_68ab30e548_b.jpg', 0, 57, '2020-07-02 21:31:22', 0),
(48, 2, 'Refrigeration', 'Vapor compression refrigeration (VCR) technology is important in many industrial processes.', 'Refrigeration is the process of absorbing heat from a medium, such as air and water, and rejecting it to the ambient environment by using work. Many opportunities are available that minimize work in industrial refrigeration systems to provide energy and cost savings. Work can be minimized by reducing refrigeration loads, improving system efficiency through optimized set points and control strategies, and mitigating energy loss through increased insulation and heat recovery. \n\nCommon industrial applications include temperature controlled warehouses, food storage, and water chiller systems. Improving the energy efficiency of such systems not only reduces energy consumption, but can often reduce labor costs by lessening maintenance requirements, and improve productivity and product quality through increased system reliability. \n\nAll components of a refrigeration system are interconnected; discharge and suction pressures, condenser and evaporator capacities, and compressor outputs all affect each other and must be considered together as a unit. Refrigeration load, controls, maintenance, initial capital investment, and the long term life-cycle costs are all important factors when designing a refrigeration system. Careful consideration of the system as a whole at the onset, and ongoing energy and operational management is vital to getting the best use out of a refrigeration system.', 'https://live.staticflickr.com/65535/50070312237_69edda5158_b.jpg', 0, 58, '2021-02-08 23:53:55', 0),
(49, 7, 'Utility Billing', 'Utility bills and associated potential savings are based on more than the commodity.', 'They can also be based on the rate of use, when use occurs, how the commodity is obtained, or how the commodity is measured. Understanding utility bills is essential to identifying potential areas of resource savings and implementing solutions.', '/uploads/user_51/b4dac29e96ac268589a068d7c53a9eb1.jpg', 1, 51, '2020-07-02 22:40:27', 0),
(50, 1, 'Wastewater Treatment', 'Municipalities and industry need to treat wastewater before discharging it to the environment.', 'Wastewater treatment systems can address a multitude of potential issues including: PH levels, oxygen demand (chemical or biological), pathogens, turbidity, debris and other contamination.\n\nCommon processes might include screening, filtration, sedimentation settling, PH balancing, disinfection, aeration, and anaerobic digestion.', 'https://live.staticflickr.com/65535/50087489383_757fc9c91e_b.jpg', 0, 51, '2020-07-07 20:46:38', 0),
(54, 5, 'Remote Assessments', '2020 Covid-19 Remote Assessments Protocol (Draft): A developing summary of the OSU IAC approach for remote assessments in the time of Covid -19', 'With Covid-19 limiting ability for in person facility assessments, the OSU EEC / IAC is focusing on developing a robust protocol for assessing sites remotely.  Once in person assessments are possible, these techniques will only improve the ability of the center to prepare for a typical site visit.\n\nIn the mean time, on the positive side, the team will not have to stop to put on chains on the way to an assessment.', 'https://live.staticflickr.com/65535/50193329247_ef0c9291de_b.jpg', 1, 51, '2021-01-26 19:32:22', 1),
(56, 3, 'Combined Heat and Power', 'Combined Heat and Power allows sites to use the waste heat of electrical generation.', 'CHP', '/uploads/user_51/4fc231c9bf3304da95662d9884280c6a.png', 0, 51, '2020-08-07 00:33:29', 0),
(57, 4, 'Optimize Facility Layout', 'Improve productivity through the location of departments and workstations and the workflow of personnel and materials.', 'Facility layout has a significant and often underestimated effect on the productivity of a facility. Movement of any form of work represents a non-value-added (NVA) process. Re-arranging the location of workstations and inventory to eliminate movement creates value in several forms. Most typically, fewer labor hours are spent moving materials, and sometimes energy is saved if operating hours of vehicles (e.g. forklifts or conveyors) are reduced. The most lucrative savings for the facility is increased productivity if delivery lead times between workstations are reduced, increasing utilization of the downstream workstation.', 'https://www.manexconsulting.com/wp-content/uploads/Layout-Optimization-Blog.jpg', 0, 62, '2020-08-07 19:21:05', 0),
(58, 4, 'Queuing Line Optimization', 'The operation of queues and their respective workstations determine the overall production efficiency of a facility.', 'Optimizing the queuing system of a workstation has significant effects on product output. Little\'s law and queuing theory helps simplify any production system into a set of easy to estimate variables. While extensive research, data collection, and possibly simulation should be employed before making any change to a part of the production system, basic analysis can reveal opportunities for cost savings through increased productivity.', 'https://www.umav.org/wp-content/uploads/2019/04/Car-Assembly-Line.jpg', 0, 62, '2020-08-10 19:57:05', 0),
(61, 7, 'Power Factor Correction', 'Improving power factor increases the capacity of a facility\'s electrical distribution network and can lead to significant savings on electrical utility costs.', 'High reactive power, or kVAR, can reduce the capacity of utility lines and transformers to supply kilowatts of real power, which creates additional expenses for the electrical service provider. This higher cost is directly billed to customers who are metered for reactive power. Improving power factor will avoid electric power billing penalties and electrical power losses due to the increased current required to perform a given job. Increasing power factor will increase the capacity of the distribution system.', '/uploads/user_52/ec8550a6c0caa67f935129b59a4c8185.jpg', 0, 52, '2020-08-26 15:55:35', 1),
(62, 5, 'Cybersecurity', 'Industrial Assessment Center resources for increasing cybersecurity.', 'Cybersecurity is becoming increasingly important as more industries adopt newer and more sophisticated controls for smart manufacturing or data collection to increase production and equipment efficiency. As part of our outreach on energy efficiency, we also provide information and resources about cybersecurity. Using some of the self-assessment tools and other informational resources provided on this page can be an important part of a facility’s plan to regularly evaluate their cybersecurity status.\n\nThe National Institute of Standards and Technology (NIST) Manufacturing Extension Partnership stated that 61% of small businesses experienced a cyber attack within the last 12 months, making up 58% of cyber attack victims. Furthermore, 34% of targets were manufacturing facilities and the median cost per attack was $60,000.', 'https://live.staticflickr.com/6044/6999839463_ae02bb6a7e_b.jpg', 1, 57, '2021-01-26 22:51:18', 1),
(64, 0, 'How to Use EEC Walkthrough', 'Find what you need to know quickly', 'This guide is designed to allow the user to \"drill down\" to a specific subject of interest, perhaps associated with a current project. Each topic includes an overview including a quick summary of key things to know, along with links to more in depth resources. This section is followed by a list of common efficiency improvement opportunities to consider along with associated information.', '/uploads/user_51/a8a32589238ec2625ded26ec4774f529.jpg', 0, 51, '2020-11-26 23:41:58', 1),
(65, 0, 'How to Edit EEC Walkthrough', 'An analyst oriented guide for creating, editing, and reviewing content on the EEC Industrial Walkthrough Checklist.', 'Description', 'https://picsum.photos/seed/picsum/700/700', 1, 42, '2020-08-31 22:17:53', 0),
(69, 1, 'Metals Manufacturing', 'Industrial metals manufacturing processes may include casting, forging, bending, forming, spinning, welding, cutting and finishing to produce a final product.', 'Metals manufacturing includes production of raw stock, replacement parts and final products. Many production processes are common among all metals manufacturing facilities.', '/uploads/user_52/0baf5657b6e1ac3fef0b0e048672324b.jpg', 0, 52, '2021-02-03 22:42:53', 1),
(72, 5, 'Smart Manufacturing', 'Smart Manufacturing Summary', 'Lists smart manufacturing technologies that could be applied to assessments.\nImage is from https://www.trianagroup.com. This image is only a placeholder for what I would really like to use. This image might not be suitable to under copyright laws', '/uploads/user_61/1cffd701d341b07912a60941dbbbb22b.jpg', 1, 61, '2020-11-28 23:23:04', 0),
(74, 0, 'How to create KaTeX formulas', 'KaTeX allows us to easily type up complex formulas', 'KaTeX is a powerful typesetting library that allows us to type up formulas that can be rendered on any page. This allows us to avoid writing out formulas by hand and then uploading them as image files when we want to display math equations.', '/uploads/user_42/7a6f3ee9d0f860779791d6cc07f2c20b.png', 1, 42, '2021-01-10 23:05:27', 0);

-- --------------------------------------------------------

--
-- Table structure for table `Questions`
--

CREATE TABLE `Questions` (
  `questionId` int(10) UNSIGNED NOT NULL,
  `pageId` int(10) UNSIGNED NOT NULL,
  `text` varchar(5000) NOT NULL,
  `type` int(11) UNSIGNED NOT NULL,
  `priority` int(11) UNSIGNED NOT NULL,
  `imageUrl` varchar(5000) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `approved` tinyint(3) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Questions`
--

INSERT INTO `Questions` (`questionId`, `pageId`, `text`, `type`, `priority`, `imageUrl`, `created`, `approved`) VALUES
(1, 62, 'What is often the most effective method for bypassing security?', 1, 2, '', '2021-01-05 22:04:36', 1),
(2, 62, 'What do you call a person who is trying to steal important information from our organization electronically?', 1, 4, '', '2021-01-26 22:50:15', 1),
(3, 62, 'What are the names of these two devices?', 3, 6, '/uploads/user_42/db309b887fde585de15cbacce2283779.jpg', '2021-01-26 22:50:56', 0),
(4, 2, 'Compressing air is inefficient, with as much as ___ of the input energy lost as heat.', 1, 0, '', '2020-12-21 22:47:43', 1),
(5, 2, 'Rule of Thumb: Air compressor power is reduced by ___ % for ever 2 psig reduction in pressure.', 1, 0, '', '2020-12-21 22:47:43', 1),
(6, 2, 'True or False: Unloading controls may be added to an air compressor to increase part-load efficiency.', 1, 0, '', '2020-12-21 22:47:43', 1),
(8, 2, 'It is a red flag if the pressure drop from the air compressor to the end use is greater than ___ %.', 1, 0, '', '2020-12-21 22:47:43', 1),
(9, 2, 'True or False: A properly designed heat recovery unit can recover 50-90% of heat rejected from an air compressor.', 1, 0, '', '2020-12-21 22:47:43', 1),
(10, 2, 'What is the best way to accommodate high-pressure equipment among other lower pressure equipment?', 1, 0, '', '2020-12-21 22:47:43', 1),
(11, 2, 'Which of the following are inefficient applications for compressed air?', 1, 0, '', '2020-12-21 22:47:43', 1),
(12, 2, 'The typical required pressure range for most industrial equipment is ___ to ___ psig. ', 3, 0, '', '2020-12-21 22:47:43', 1),
(13, 46, 'It is best to tune a boiler every ___ to ___ months.', 3, 0, '', '2020-12-21 22:47:43', 1),
(14, 46, 'In boiler systems ideal stack exhaust temperatures range from ___ to ___ °F. ', 1, 0, '', '2020-12-21 22:47:43', 1),
(15, 46, 'True or False: Returned condensate is ideally between 130-225 °F.', 1, 0, '', '2020-12-21 22:47:43', 1),
(16, 46, 'Boiler efficiency can be increase by 1% for every ___ °F reduction in stack exhaust temperature.', 1, 0, '', '2020-12-21 22:47:43', 1),
(17, 46, 'True or False: Boiler blowdown rates often range from 1% to 8% of the feed water flow rate, but they can be as high as 20%.', 1, 0, '', '2020-12-21 22:47:43', 1),
(18, 46, 'What is the purpose of a steam trap? ', 1, 0, '', '2020-12-21 22:47:43', 1),
(19, 46, 'On a well designed natural gas-fired boiler, an excess air percentage of ___ is attainable. ', 1, 0, '', '2020-12-21 22:47:43', 1),
(20, 46, 'How often should a high-pressure steam trap be checked? ', 1, 0, '', '2020-12-21 22:47:43', 1),
(21, 46, 'A complete automatic blowdown system consists of which of the following components?\na) Low or high-pressure conductivity probe\nb) Flue gas analyzer\nc) Temperature compensation and signal conditioning equipment\nd) Blowdown modulating valve ', 1, 0, '', '2020-12-21 22:47:43', 1),
(22, 45, 'Common types of centrifugal pumps include:', 1, 0, '', '2020-12-21 22:47:43', 1),
(23, 45, 'True or False: A pump\'s operating point can be determined by finding the intersection of the system and pump curves.', 1, 0, '', '2020-12-21 22:47:43', 1),
(24, 45, 'Rule of thumb: 1 PSI of pressure is approximately equivalent to ____ ft. of water head. ', 1, 0, '', '2020-12-21 22:47:43', 1),
(25, 45, 'It is considered a best practice to operate within ___ % and ___ % of the best efficiency point on the head versus flow curve.', 3, 0, '', '2020-12-21 22:47:43', 1),
(26, 45, 'True or False: Valves will modify the pump curve. ', 1, 0, '', '2020-12-21 22:47:43', 1),
(27, 45, 'If pump speed is reduced by 1/2, the hydraulic horsepower required to maintain the flow drops by ___. ', 2, 0, '', '2020-12-21 22:47:43', 1),
(28, 45, 'True or False: Adding pumps in parallel increases the capacity of the system without increasing the head.', 1, 0, '', '2020-12-21 22:47:43', 1),
(29, 45, 'True or False: Adding pumps in series increases the discharge head with little increase in capacity.', 1, 0, '', '2020-12-21 22:47:43', 1),
(30, 45, 'Pumping efficiency is the ratio of ___ horsepower to ___ horsepower. ', 3, 0, '', '2020-12-21 22:47:43', 1),
(31, 45, 'The relationship between power and flow rate is: ', 1, 0, '', '2020-12-21 22:47:43', 1),
(33, 44, 'The correct equation for three phase power is: ', 1, 0, '', '2020-12-21 22:47:43', 1),
(34, 46, 'What is the threshold annual boiler system cost at which a hand-held computer based combustion analyzer is recommended?', 1, 0, '', '2020-12-21 22:47:43', 1),
(35, 46, 'The ratio of useful heat transferred to the steam to the heat content of the fuel is known as ________________. ', 2, 0, '', '2020-12-21 22:47:43', 1),
(36, 2, 'It is a red flag if a leak load exceeds ___% to ___% of total air production.', 3, 0, '', '2020-12-21 22:47:43', 1),
(37, 45, 'True or False: all of the following are signs of cavitation: capacity loss, inability to build the same head, reduced efficiency, excessive noise and vibration, frequent overhauling.', 1, 0, '', '2020-12-21 22:47:43', 1),
(38, 48, 'The air temperature at a specific time, shielded from moisture is known as the ______ temperature.', 2, 0, '', '2020-12-21 22:47:43', 1),
(39, 48, 'The temperature air would have if it were cooled to saturation by the evaporation of water is known as the ______ temperature.', 2, 0, '', '2020-12-21 22:47:43', 1),
(40, 48, 'Name the four primary components of a refrigeration system.', 3, 0, '', '2020-12-21 22:47:43', 1),
(41, 62, 'What is a bad practice for naming a password?', 4, 1, '', '2021-01-18 22:15:17', 1),
(42, 48, 'At which stage is the refrigeration load applied? ', 1, 0, '', '2020-12-22 22:21:30', 0),
(43, 46, 'Installing a condensing economizer can increase boiler efficiency to over _____%.', 1, 0, '', '2021-01-04 17:30:45', 0),
(44, 2, 'True or False: Receiver tanks may be installed to ensure sufficient air pressure is available at higher demand end uses?', 1, 0, '', '2021-01-04 17:34:17', 0),
(45, 44, 'Notched V-belts are approximately ____% more efficient than standard belt-driven motors.', 2, 0, '', '2021-01-04 17:35:31', 0),
(46, 45, 'Rule of Thumb: A general design criteria is that the net positive suction head available (NPSHA) exceeds the net positive suction head required (NPSHR) by at least ___% over the expected flow range.', 2, 0, '', '2021-01-04 17:37:30', 0),
(47, 48, 'Rule of Thumb: Expect a ___% compressor power reduction per 1 degree Fahrenheit decrease in condensing temperature.', 2, 0, '', '2021-01-04 17:39:11', 0),
(48, 47, 'Rule of Thumb: Any thermal system with a surface temperature greater than _____ degree F should be insulated.', 2, 0, '', '2021-01-04 17:40:27', 0);

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
(6, 'Utility Billing - Electricity', 'This introduces the utilities page and covers electricity billing structure.  Other utilities are to follow in a similar fashion, so I\'m wanting to check organization and content before reviewing any others.  Last note:  I have no idea what picture to put for the page, so very much open to any suggestions. Thanks!', 1, '2020-10-16 22:04:13', 54),
(11, 'Refrigeration opportunity - reduce system lift', 'Two methods for reducing system lift are included: increase suction pressure and decrease discharge pressure. ', 4, '2020-12-16 01:40:52', 58),
(12, 'Refrigeration Opportunity: Reduce System Lift', 'A card containing two methods for reducing system lift: increase suction pressure and decrease discharge pressure.', 1, '2020-12-16 01:43:02', 58),
(13, 'Refrigeration Page', 'Brief summary of industrial refrigeration systems and design factors to consider. ', 1, '2020-12-16 01:45:12', 58),
(14, 'Pump Page', 'Quite a bit of content related to pumps in general as well as a couple of opportunities.', 2, '2020-12-19 00:49:42', 55),
(15, 'Boiler and Steam', 'Updates to add additional descriptions to some recommendations. \nSeveral items contain minor grammar changes.\nChanges some of the resources from public to internal, as they require access to OSU box folders', 1, '2020-12-20 02:12:40', 61),
(16, 'Thermal Systems Overview', 'The overview, useful links, pros, cons, and best practices.', 2, '2020-12-21 20:35:42', 57),
(20, 'How to create KaTeX formulas', 'An internal page that shows editors how to create KaTeX formulas.', 1, '2021-01-10 23:48:46', 42),
(21, 'Thermal Systems - Heat Exchangers', 'Just the heat exchanger section, not the others.', 1, '2021-01-15 19:20:58', 57);

-- --------------------------------------------------------

--
-- Table structure for table `Request_Comments`
--

CREATE TABLE `Request_Comments` (
  `commentId` int(10) UNSIGNED NOT NULL,
  `requestId` int(10) UNSIGNED NOT NULL,
  `targetId` varchar(100) NOT NULL,
  `comment` mediumtext NOT NULL,
  `review` int(10) UNSIGNED NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `userId` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Request_Comments`
--

INSERT INTO `Request_Comments` (`commentId`, `requestId`, `targetId`, `comment`, `review`, `created`, `userId`) VALUES
(31, 5, 'C214', '<p>I know what you are talking about when you mention ovens (paint booths that also can be used as curing oven) but the idea should be introduced somehow. </p>', 0, '2020-11-03 21:12:22', 51),
(32, 5, 'C214', '<p>Cast ROT in imperial units as well</p>', 0, '2020-11-03 21:14:45', 51),
(33, 5, 'C214', '<p>Two items to add. We often suggest occupancy sensors on Paint Booths to turn them off after a set period of inactivity. We also have focused on ensuring the high intensity lighting is also off when not needed. </p>', 0, '2020-11-03 21:18:45', 51),
(34, 5, 'C212', '<p>Should mention that over spray reduction can also reduce need to replace paint booth air filters and associated material and waste costs. </p>', 0, '2020-11-03 21:22:20', 51),
(35, 5, 'C213', '<p>Hmm, I like the ETO information, but we should identify that it is a local opportunity somehow. Perhaps it should start as a suggestion to check on potential incentives with ETO as an example. (Makes me think we should create a specific bullet for incentives (and cost?) information </p>', 0, '2020-11-03 21:23:58', 51),
(36, 5, 'C213', '<p>We need to identify the energy cost used in the estimate of savings for upgrading a single transformer-rectifier welder</p>', 0, '2020-11-03 21:29:01', 51),
(37, 5, 'C215', '<p>We should add hot link to the compressed air section</p>', 0, '2020-11-03 21:30:49', 51),
(38, 5, '0', '<p>LMSA: Wanted to move this along ;-) And use this review function more to see if anything needs to change. I have a power point  I will send you. We should add any opportunities in the power point that are not here but specific to metals. </p>', 1, '2020-11-03 21:53:55', 51),
(39, 12, '0', '<p>I would put a pressure-enthalpy chart somewhere on the page so that there is a visual \"this is suction, this is discharge, and this is what lift looks like\" indication. I think that would make it more clear for someone familiar with refrigeration, but maybe confused about the wording.</p>', 1, '2020-12-17 19:55:40', 57),
(40, 12, '0', '<p>\"If fan savings are unavailable the suction pressure should be set as high as possible.\" is unclear to me. Would this not increase fan power? How does this help?</p>', 0, '2020-12-17 19:57:26', 57),
(41, 12, '0', '<p>Clarify what a compressor operational profile is. Energy use over time? Operating hours? Control scheme? Similarly, explain stuff like float.</p><p><br></p><p>I think the page is mostly good, but needs clarification in some of the technical stuff. Maybe this doesn\'t fit on the card, but something higher on the page explaining the importance of pressure in the refrigeration cycle, what float is, where in the cycle suction and discharge pressures play their respective roles, etc. That would make things much better on the page.</p>', 0, '2020-12-17 20:04:58', 57),
(42, 13, '0', '<p>\"such as air and water\" instead of \"typically air and water\"</p><p><br></p><p><br></p>', 1, '2020-12-17 20:10:09', 57),
(43, 13, '0', '<p>\"Improving the energy efficiency of such systems not only reduces energy consumption, but can often reduce labor costs and improve productivity, product quality, and system reliability.\"</p><p><br></p><p>how? explain</p>', 0, '2020-12-17 20:10:33', 57),
(44, 14, 'C82', '<p>\"Replace Valve Control with<em><u> Variable Speed Drive</u></em> Control\"</p><p>For the rest of the page VSD is referred to as VFD. While the terms are almost interchangeable, I think it would be less confusing to pick one term to use, unless otherwise stated.   </p>', 1, '2020-12-19 18:10:09', 61),
(45, 14, 'C84', '<p>What is the \"Least Closed Valve Strategy\"? </p><p>A short description would be very helpful for someone who is not familiar with pumps.</p>', 1, '2020-12-19 18:22:40', 61),
(46, 14, 'C82', '<p>Data to collect section should be near the recommendation instead of at the bottom</p>', 1, '2020-12-19 18:29:50', 61),
(47, 14, '0', '<p>Overall the page looks good. Headers and recommendation titles are clear. Page is nicely organized by sections. Benefits and drawback are highlighted. Important information is included.</p><p>I would suggest that the Gallery card is made internal until the pictures are put in.</p><p>I suggest looking at the pump overview section. It looks like the cards are out of order. I was thinking that the data collection should be at top, and links at bottom.</p>', 2, '2020-12-19 18:44:06', 61),
(48, 15, 'C96', '<p>Changed so that the two measuring equipment were on separate lines</p>', 0, '2020-12-20 02:55:21', 61),
(49, 15, 'C97', '<p>Changed to internal reference</p>', 0, '2020-12-20 02:55:55', 61),
(50, 15, 'C98', '<p>Changed to internal reference</p>', 0, '2020-12-20 02:56:32', 61),
(51, 15, 'C101', '<p>Changed Template to internal reference.</p>', 0, '2020-12-20 02:58:16', 61),
(52, 15, 'C101', '<p>This card is very full. Any suggestions about splitting up the card or removing items?</p>', 0, '2020-12-20 02:59:00', 61),
(53, 15, 'C103', '<p>This description was borrowed from an old EEC guide book. </p><p>It seems good, but is it too much?</p>', 0, '2020-12-20 03:01:57', 61),
(54, 15, 'C105', '<p>Any additional items needed for \"Fix faulty steam traps\"?</p>', 0, '2020-12-20 03:03:22', 61),
(55, 16, 'P47', '<p>change \"focus\" to \"focuses\"</p>', 0, '2020-12-22 00:57:07', 55),
(56, 16, 'P47', '<p>change \"Often times\" to \"Often\"</p>', 0, '2020-12-22 00:58:40', 55),
(57, 16, 'C261', '<ul><li>maybe reword \"reducing generation costs\" this is a bit unclear</li><li>remove first \"equipment\" from from fourth pro</li><li>change \"cheaper\" to \"cheap\"</li></ul>', 0, '2020-12-22 01:05:22', 55),
(58, 16, 'C262', '<p>add \"often\" prior to \"requiring non-generic quotes and high costs\"</p><p>change \"in consideration\" to \"to consider\" in the second sentence of the first bullet</p>', 0, '2020-12-22 01:07:54', 55),
(59, 16, '0', '<p>Overall looks good. I think you got quite a bit of important information in there. Links are great. I suggested a few changes to the wording but it all looks nice!</p>', 0, '2020-12-22 01:10:53', 55),
(62, 16, '0', '<p>Thanks Julian!</p>', 2, '2021-01-12 21:13:10', 57);

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
(28, 6, 225, 3),
(35, 11, 260, 3),
(36, 12, 260, 3),
(37, 13, 48, 1),
(38, 14, 183, 3),
(39, 14, 179, 3),
(40, 14, 125, 3),
(41, 14, 45, 1),
(42, 14, 82, 3),
(43, 14, 83, 3),
(44, 14, 84, 3),
(45, 14, 85, 3),
(46, 15, 90, 3),
(47, 15, 91, 3),
(48, 15, 95, 3),
(49, 15, 96, 3),
(50, 15, 97, 3),
(51, 15, 98, 3),
(52, 15, 99, 3),
(53, 15, 100, 3),
(54, 15, 32, 2),
(55, 15, 101, 3),
(56, 15, 102, 3),
(57, 15, 103, 3),
(58, 15, 105, 3),
(59, 15, 106, 3),
(60, 16, 47, 1),
(61, 16, 34, 2),
(62, 16, 261, 3),
(63, 16, 262, 3),
(64, 16, 263, 3),
(65, 16, 265, 3),
(75, 20, 74, 1),
(76, 20, 79, 2),
(77, 20, 274, 3),
(78, 20, 275, 3),
(79, 21, 40, 2),
(80, 21, 129, 3);

-- --------------------------------------------------------

--
-- Table structure for table `Scores`
--

CREATE TABLE `Scores` (
  `scoreId` int(10) UNSIGNED NOT NULL,
  `pageId` int(10) UNSIGNED NOT NULL,
  `questionId` int(10) UNSIGNED NOT NULL,
  `userId` int(10) UNSIGNED NOT NULL,
  `text` varchar(5000) NOT NULL,
  `invalid` tinyint(3) UNSIGNED NOT NULL,
  `correct` tinyint(3) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Scores`
--

INSERT INTO `Scores` (`scoreId`, `pageId`, `questionId`, `userId`, `text`, `invalid`, `correct`) VALUES
(51, 2, 4, 58, '85%-90%', 0, 1),
(52, 2, 5, 58, '1', 0, 1),
(53, 2, 6, 58, 'true', 0, 1),
(54, 2, 8, 58, '10', 0, 1),
(55, 2, 9, 58, 'true', 0, 1),
(56, 2, 10, 58, 'add a booster or use a separate high-pressure system', 0, 1),
(57, 2, 11, 58, 'all of the above', 0, 1),
(58, 2, 12, 58, '80', 0, 1),
(59, 2, 12, 58, '85', 0, 1),
(60, 46, 13, 58, '6', 0, 1),
(61, 46, 13, 58, '12', 0, 1),
(62, 46, 14, 58, '100-150', 0, 1),
(63, 46, 15, 58, 'true', 0, 1),
(64, 46, 16, 58, '40', 0, 1),
(65, 46, 17, 58, 'true', 0, 1),
(66, 46, 18, 58, 'drain condensate from steam lines', 0, 1),
(67, 46, 19, 58, '10%', 0, 1),
(68, 46, 20, 58, 'weekly to monthly', 0, 1),
(69, 46, 21, 58, 'a, c, d', 0, 1),
(70, 45, 22, 58, 'all of the above', 0, 1),
(71, 45, 23, 58, 'true', 0, 1),
(72, 45, 24, 58, '2.31', 0, 1),
(73, 45, 25, 58, '-10', 0, 1),
(74, 45, 25, 58, '10', 0, 1),
(75, 45, 26, 58, 'false', 0, 1),
(76, 45, 27, 58, '1/8', 0, 1),
(77, 45, 28, 58, 'true', 0, 1),
(78, 45, 29, 58, 'true', 0, 1),
(79, 45, 30, 58, 'hydraulic', 0, 1),
(80, 45, 30, 58, 'brake', 0, 1),
(81, 45, 31, 58, 'cubic', 0, 1),
(136, 2, 4, 42, '85%-90%', 0, 1),
(137, 2, 5, 42, '1', 0, 1),
(138, 2, 6, 42, 'true', 0, 1),
(139, 2, 8, 42, '10', 0, 1),
(140, 2, 9, 42, 'true', 0, 1),
(141, 2, 10, 42, 'add a booster or use a separate high-pressure system', 0, 1),
(142, 2, 11, 42, 'all of the above', 0, 1),
(143, 2, 12, 42, '80', 0, 1),
(144, 2, 12, 42, '85', 0, 1),
(145, 2, 36, 42, '20', 0, 1),
(146, 2, 36, 42, '30', 0, 1),
(153, 48, 38, 58, 'dry bulb', 0, 1),
(154, 48, 39, 58, 'wet bulb', 0, 1),
(155, 48, 40, 58, 'condensor', 0, 1),
(156, 48, 40, 58, 'compressor', 0, 1),
(157, 48, 40, 58, 'evaporator', 0, 1),
(158, 48, 40, 58, 'expansion valve', 0, 1),
(159, 46, 13, 61, '6', 0, 1),
(160, 46, 13, 61, '12', 0, 1),
(161, 46, 14, 61, '300-350', 0, 0),
(162, 46, 15, 61, 'true', 0, 1),
(163, 46, 16, 61, '40', 0, 1),
(164, 46, 17, 61, 'false', 0, 0),
(165, 46, 18, 61, 'drain condensate from steam lines', 0, 1),
(166, 46, 19, 61, '8%', 0, 0),
(167, 46, 20, 61, 'weekly to monthly', 0, 1),
(168, 46, 21, 61, 'a, b, c, d', 0, 0),
(169, 46, 34, 61, '$50,000', 0, 1),
(170, 46, 35, 61, '', 0, 0),
(202, 62, 41, 42, 'using \"1234\"', 0, 1),
(203, 62, 41, 42, 'using your street address', 0, 1),
(204, 62, 41, 42, 'using your name', 0, 1),
(205, 62, 1, 42, 'social engineering', 0, 1),
(206, 62, 2, 42, 'hacker', 0, 1),
(207, 62, 3, 42, 'mouse', 0, 1),
(208, 62, 3, 42, 'keyboard', 0, 1);

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
(17, 49, '<p>\"Natural Gas Explained: Natural Gas Prices.\"  US Energy Information Administration.  Available: https://www.eia.gov/energyexplained/natural-gas/prices.php.  [Accessed: Oct. 16, 2020].</p>'),
(18, 2, '<p>Test Source</p>'),
(19, 45, '<p>Demo</p>'),
(20, 48, '<p>M.R. Muller, M. Simek, J. Mak, B. Mitrovic. <em>Essentials of Industrial Assessments - A Training Manual v.3.0 - Ch 7 Thermal Applications, </em>(2015). Accessed: Dec. 14, 2020. [Online]. Available: https://iac.university/technicalDocs/industr/ch7.pdf</p>'),
(21, 48, '<p>Cascade Energy Engineering, Inc. <em>Industrial Refrigeration - Best Practices Guide</em>, 3 ed. (2010). Accessed: Dec. 14, 2020. [Online]. Available: https://cascadeenergy.com/wp-content/uploads/2013/10/industrial-refridgeration-best-practices-guide.pdf</p>'),
(22, 47, '<p>M.R. Muller, M. Simek, J. Mak, B. Mitrovic. <em>Essentials of Industrial Assessments - A Training Manual v.3.0 - Ch 7 Thermal Applications, </em>(2015). Accessed: Dec. 14, 2020. [Online]. Available: https://iac.university/technicalDocs/industr/ch7.pdf</p>'),
(24, 48, '<p>K. A. Manske, D. T. Reindl, S. A. Klein, \"Load Sharing Strategies in Multiple Compressor Refrigeration Systems,\" International Refrigeration and Air Conditioning Conference, 2000. Accessed: Dec. 23, 2020. [Online]. Available: https://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.824.8925&amp;rep=rep1&amp;type=pdf</p>'),
(25, 48, '<p>S. Scott, F. Gordon. \"Evaporative Fan VFD Market Transformation Initiative - Market Progress Evaluation Report #3,\" Northwest Energy Efficiency Alliance, 2002. Accessed: Dec. 28, 2020. [Online]. Available: https://neea.org/img/uploads/Evaporator-Fan-VFD-No-3275A7011CA06.pdf</p>'),
(26, 47, '<p>C. Woodford. \"Heat Exchangers.\" Explainthatstuff.com. https://www.explainthatstuff.com/how-heat-exchangers-work.html (accessed Jan. 12, 2021).</p>'),
(27, 47, '<p>\"Rotary Regenerator.\" Ventelation-System.com. http://old.ventilation-system.com/cat/vut-r-wh-ec/ (accessed Jan. 12, 2021).</p>');

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
(25, 'Industrial Assessment Center', 'U.S. Department of Energy, Office of Energy Efficiency & Renewable Energy, Advanced Manufacturing Office, Industrial Assessment Centers', 'https://www.energy.gov/eere/amo/industrial-assessment-centers-iacs', '/uploads/user_42/8936b3254b55ec513b042662758f9a68.png', 0),
(26, 'Bonneville Power Administration Energy Efficiency Industrial Sector', 'Bonneville Power Administration Energy Efficiency Industrial Sector', 'https://www.bpa.gov/EE/Sectors/Industrial/Pages/default.aspx  ', '/uploads/user_51/dcf767f2b3dee899ff1a8a33502a271f.png', 1);

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
(86, 0, 'Reduce Air Compressor Run Time', 86, 61, '2020-12-18 17:30:08'),
(87, 0, 'Other Opportunities', 87, 58, '2020-12-14 15:57:53'),
(97, 10, 'Data Collection Guides', 97, 61, '2020-12-19 19:07:34'),
(98, 0, 'Analysis Tools', 98, 61, '2020-12-19 19:12:24'),
(100, 0, 'Off Site Resource Links', 100, 51, '2020-07-03 17:55:16'),
(101, 0, 'Improve Boiler Combustion Efficiency', 101, 51, '2020-12-19 19:14:38'),
(102, 0, 'Reduce Run Time', 102, 61, '2020-12-19 19:25:47'),
(103, 0, 'Optimize Blowdown', 103, 61, '2020-12-18 18:55:02'),
(105, 0, 'Improve the Condensate System', 105, 61, '2020-10-29 21:51:42'),
(106, 0, 'Reduce Heat Loss', 106, 42, '2020-07-03 17:31:09'),
(179, 0, 'Standard Data to Collect', 6, 51, '2021-02-03 23:51:20'),
(211, 0, 'Ventilation Improvements', 1, 51, '2021-01-28 23:00:14'),
(212, 0, 'Reduce Material Losses', 3, 51, '2021-01-28 23:01:45'),
(214, 0, 'Increase Spray/Paint Booth Efficiency', 2, 51, '2021-01-28 23:00:31'),
(215, 0, 'Reduce Compressed Air Leaks', 215, 51, '2021-01-28 23:01:56');

-- --------------------------------------------------------

--
-- Table structure for table `Temp_Contributors`
--

CREATE TABLE `Temp_Contributors` (
  `tempContributorId` int(10) UNSIGNED NOT NULL,
  `tempName` varchar(100) NOT NULL,
  `tempTitle` varchar(500) NOT NULL,
  `tempDescription` varchar(5000) NOT NULL,
  `tempImageUrl` varchar(5000) NOT NULL,
  `tempPriority` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Temp_Contributors`
--

INSERT INTO `Temp_Contributors` (`tempContributorId`, `tempName`, `tempTitle`, `tempDescription`, `tempImageUrl`, `tempPriority`) VALUES
(42, 'Zachary Thomas', 'Full-Stack Developer', 'Helped develop the \"Industrial Walkthrough Checklist & Guide\" application.\nOregon State University alumnus.', '/uploads/user_42/90e4705e29c3c10fdafad6cb5012ee0b.png', 10);

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
-- Table structure for table `Temp_Questions`
--

CREATE TABLE `Temp_Questions` (
  `tempQuestionId` int(10) UNSIGNED NOT NULL,
  `tempText` varchar(5000) NOT NULL,
  `tempType` int(10) UNSIGNED NOT NULL,
  `tempPriority` int(10) UNSIGNED NOT NULL,
  `tempImageUrl` varchar(5000) NOT NULL,
  `tempCreated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Temp_Questions`
--

INSERT INTO `Temp_Questions` (`tempQuestionId`, `tempText`, `tempType`, `tempPriority`, `tempImageUrl`, `tempCreated`) VALUES
(40, 'Name the four primary components of a mechanical compression refrigeration system.', 3, 0, '', '2020-12-22 19:45:58');

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
(42, 'Silverware', 'd8e7859c74c2672a13a2388538143c99$631f9c78dbc16fbd3b013aa7903a8527cee7d46befeb496b7510b1dcb4ae95c0', 'Zachary', 'Thomas', 'silverware13@gmail.com', 5, '2020-05-14 20:39:15'),
(47, 'rogrogrog', '8a3c5ecabadca6102a92052e5f6160d3$59606e43e8086a5cb735dfc87244f218638a629133558c6701390129ec8bb71a', 'rog', 'rog', 'rog@gmail.com', 4, '2020-06-01 20:39:15'),
(51, 'JoeJunker', 'b755592eabbdac736d8c5907fa64fa11$fae30b426545c803420b3f7f0bd4f1e80fd99ea09336ea525c769ef7041d1679', 'Joe', 'Junker', 'joseph.f.junker@gmail.com', 5, '2020-06-02 20:39:15'),
(52, 'mattye', 'bc8f2478b1eb8785d085b8c1512933f2$47ff478fcee9b0f829ed70012cd2c406ed67b7bae6708c855b9072ef8adb662b', 'Ethan', 'Matty', 'mattye.eec@gmail.com', 5, '2020-06-10 20:39:15'),
(54, 'martzal', '27d9aeff2e1c3e683f042480b6990a5c$963d962575ce1108cf5785fc42778ad0483050a80c50e8d3d29632f6af73f1a9', 'Ali', 'Martz', 'martzal.eec@gmail.com', 4, '2020-06-28 20:39:15'),
(55, 'peterj', '73a148776eaf3db8dee5b4cc5af1542d$c4d554f54a266e74299e82af3884f39d4e36686054f90837f7753b2d4b77a6f4', 'Julian', 'Peter', 'peterj.eec@gmail.com', 4, '2020-06-30 20:39:15'),
(56, 'ryanfrench', '8fdce1d0b4394d7a6dd55dd4d1318d54$b36510750272738b7d2de631057527b3ac1547db5d9ef6da8728886d523eca99', 'Ryan', 'French', 'frenchr.eec@gmail.com', 5, '2020-07-05 20:39:15'),
(57, 'MatthewThomas', 'a532335063fda0518a4a347b0a295166$05c83d3322dbbe787d420353fa83b3ad7b38e5b163d9d784bf752c8b7ebedb15', 'Matthew', 'Thomas', 'matthewthomas.eec@gmail.com', 4, '2020-07-02 20:39:15'),
(58, 'ryanfrench2', '0f035817ef3a5ebb3b7bedc75f6d5245$950542aafbfdeeceb6e32fcf2d06f5b2c076465e6fce3ef36b052d9ba6290404', 'Ryan', 'French', 'frenchr@oregonstate.com', 5, '2020-07-08 20:47:39'),
(59, 'djunker', '78d288ab098c3cb5d6d2ba21034e69c1$24786ffa47a290b250ffff18f0cfd703b86c773cf5f911e75fcf6d19989e700d', 'Devlin', 'Junker', 'devlin.junker@gmail.com', 4, '2020-07-10 01:36:09'),
(60, 'taylorad', 'b320c2b10ea1a5fd6a5df5b60b476a1a$76c9c4d174243210d40e54aa87e6b14926de7e3d7c1b229e7fcea48e98d65d85', 'Adam', 'Taylor', 'taylorad.eec@gmail.com', 4, '2020-07-13 17:38:47'),
(61, 'Chris_Houck', 'd4bb5e0bfd9c00be21e9e9d844ad7f57$367a89d5eeaf2274ff80b316f9aeda9f79acd192fc1f3717ff852b3cb29c6416', 'Chris', 'Houck', 'houckch.eec@gmail.com', 4, '2020-07-14 20:59:54'),
(62, 'psukamto', 'bbd4de95486df84c2553cb4cabc1472a$d8d1b75623a7d7eb3b717020dc28b70ba1c9152992db10316e280aedb0f35d6c', 'Peter', 'Sukamto', 'sukamtop.eec@gmail.com', 4, '2020-07-20 22:20:37'),
(63, 'testUser', '1f9d6b0176ddee97a3a69102b00679fd$f95c8cef6dacedc921486f893f34cdcd497d0e70b36955f84a3f45caa86c6c5f', 'test', 'user', 'testuser@gmail.com', 4, '2020-07-28 20:21:12'),
(64, 'NewUser', '0f98b126f8c5f97567986f7344a65d35$b56cdfeeb26a024487d97ea457a4691c8059a5a41f6102362319a7010488ecf7', 'Zachary', 'Thomas', 'newUser@gmail.com', 1, '2020-08-04 20:49:52'),
(65, 'KarlHaapala', 'b57616ebf0b31e2b470945548ebb37c3$ce2a1a37a4eeb500f9ff3d7ae5a436bd96f996cc7035089b06c66296ef664a0e', 'Karl', 'Haapala', 'Karl.Haapala@oregonstate.edu', 4, '2020-08-10 16:43:08'),
(66, 'BrianFronk', '28e517971b951fcd7fd56e726698c3e4$a14e0637da80e9f7fe81c9acb40b4c309adea2393043d3b17ea8a51add078230', 'Brian', 'Fronk', 'Brian.Fronk@oregonstate.edu', 5, '2020-08-17 17:50:49'),
(67, 'testEditor', '378a3004a2a67d4de86381f1167f67f0$667800fc22bccfb093ed7370d527f1b07e7b3cf3a54acfd43e71edc477c1391f', 'Test', 'Editor', 'testeditor@gmail.com', 4, '2020-09-01 02:00:00'),
(68, 'newUser1', '6722e86ced77c549439d1a1746634998$4a86c207b6c1d91696c82191547f9a6068888fecaa1c137cee77621c74a8cf8f', 'new', 'user', 'newUser1@gmail.com', 1, '2020-09-14 10:31:05'),
(69, 'testEditor1', 'fbb3b3a0d4f8be764fbe6bdc27f6d983$2ce25602f589f0e5be6a55d9141875272a99496e3d6b343cad56f1949eaf48bd', 'test', 'editor', 'testeditor1@gmail.com', 4, '2020-09-22 20:46:41'),
(70, 'testExternalEditor', '096ce25eaae6bb651145bdf3b01e5717$f461afb7d38f1ce565b8076a085c39b182796bb0b534868b00d58febf0374c96', 'test', 'external', 'test_external@gmail.com', 3, '2020-11-10 20:21:31'),
(71, 'InternalTour', '98fe56551af872f230e1cc206ec6856d$722d5bfb97a9fe666647bfb7cb751eb1963c289b0fe7886633bc779f9e3003bf', 'Internal', 'Tour', 'jomoma22@gmail.com', 3, '2021-02-02 19:51:47'),
(72, 'androidUserTest', '4053e4c485f6c2548ea5ff14a23f59b2$458919290ec85490238795b8216049e74c56fe521e96ef252f4a95da950f351d', 'android', 'user', 'testAndroid@gmail.com', 1, '2021-02-07 02:55:33');

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
-- Indexes for table `Answers`
--
ALTER TABLE `Answers`
  ADD PRIMARY KEY (`answerId`),
  ADD KEY `question_answer_fk` (`questionId`);

--
-- Indexes for table `Banners`
--
ALTER TABLE `Banners`
  ADD PRIMARY KEY (`bannerId`);

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
-- Indexes for table `Contributors`
--
ALTER TABLE `Contributors`
  ADD PRIMARY KEY (`contributorId`);

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
-- Indexes for table `Info`
--
ALTER TABLE `Info`
  ADD PRIMARY KEY (`infoId`);

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
-- Indexes for table `Observations`
--
ALTER TABLE `Observations`
  ADD PRIMARY KEY (`observationId`),
  ADD KEY `obs_user_fk` (`userId`),
  ADD KEY `obs_page_fk` (`pageId`);

--
-- Indexes for table `Pages`
--
ALTER TABLE `Pages`
  ADD PRIMARY KEY (`pageId`),
  ADD KEY `user_page_fk` (`userId`),
  ADD KEY `category_fk` (`pageType`);

--
-- Indexes for table `Questions`
--
ALTER TABLE `Questions`
  ADD PRIMARY KEY (`questionId`),
  ADD KEY `question_page_fk` (`pageId`);

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
-- Indexes for table `Scores`
--
ALTER TABLE `Scores`
  ADD PRIMARY KEY (`scoreId`),
  ADD KEY `score_question_fk` (`questionId`),
  ADD KEY `score_user_fk` (`userId`),
  ADD KEY `score_page_fk` (`pageId`);

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
-- Indexes for table `Temp_Contributors`
--
ALTER TABLE `Temp_Contributors`
  ADD PRIMARY KEY (`tempContributorId`);

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
-- Indexes for table `Temp_Questions`
--
ALTER TABLE `Temp_Questions`
  ADD PRIMARY KEY (`tempQuestionId`);

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
-- AUTO_INCREMENT for table `Answers`
--
ALTER TABLE `Answers`
  MODIFY `answerId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=687;

--
-- AUTO_INCREMENT for table `Banners`
--
ALTER TABLE `Banners`
  MODIFY `bannerId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `Cards`
--
ALTER TABLE `Cards`
  MODIFY `cardId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=296;

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
  MODIFY `headerId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- AUTO_INCREMENT for table `History_Cards`
--
ALTER TABLE `History_Cards`
  MODIFY `historyId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=187;

--
-- AUTO_INCREMENT for table `History_Headers`
--
ALTER TABLE `History_Headers`
  MODIFY `historyId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `History_Items`
--
ALTER TABLE `History_Items`
  MODIFY `historyId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1411;

--
-- AUTO_INCREMENT for table `History_Pages`
--
ALTER TABLE `History_Pages`
  MODIFY `historyId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `Icons`
--
ALTER TABLE `Icons`
  MODIFY `iconType` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `Info`
--
ALTER TABLE `Info`
  MODIFY `infoId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Items`
--
ALTER TABLE `Items`
  MODIFY `itemId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13555;

--
-- AUTO_INCREMENT for table `Notifications`
--
ALTER TABLE `Notifications`
  MODIFY `notificationId` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=379;

--
-- AUTO_INCREMENT for table `Observations`
--
ALTER TABLE `Observations`
  MODIFY `observationId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `Pages`
--
ALTER TABLE `Pages`
  MODIFY `pageId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- AUTO_INCREMENT for table `Questions`
--
ALTER TABLE `Questions`
  MODIFY `questionId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `Quick_Titles`
--
ALTER TABLE `Quick_Titles`
  MODIFY `titleId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `Requests`
--
ALTER TABLE `Requests`
  MODIFY `requestId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `Request_Comments`
--
ALTER TABLE `Request_Comments`
  MODIFY `commentId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT for table `Request_Objects`
--
ALTER TABLE `Request_Objects`
  MODIFY `requestObjectId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- AUTO_INCREMENT for table `Scores`
--
ALTER TABLE `Scores`
  MODIFY `scoreId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=209;

--
-- AUTO_INCREMENT for table `Sources`
--
ALTER TABLE `Sources`
  MODIFY `sourceId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `Sponsors`
--
ALTER TABLE `Sponsors`
  MODIFY `sponsorId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `userId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT for table `Views`
--
ALTER TABLE `Views`
  MODIFY `viewId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Answers`
--
ALTER TABLE `Answers`
  ADD CONSTRAINT `question_answer_fk` FOREIGN KEY (`questionId`) REFERENCES `Questions` (`questionId`) ON DELETE CASCADE ON UPDATE CASCADE;

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
-- Constraints for table `Contributors`
--
ALTER TABLE `Contributors`
  ADD CONSTRAINT `fk_user_contributor` FOREIGN KEY (`contributorId`) REFERENCES `Users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

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
-- Constraints for table `Observations`
--
ALTER TABLE `Observations`
  ADD CONSTRAINT `obs_page_fk` FOREIGN KEY (`pageId`) REFERENCES `Pages` (`pageId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `obs_user_fk` FOREIGN KEY (`userId`) REFERENCES `Users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Pages`
--
ALTER TABLE `Pages`
  ADD CONSTRAINT `category_fk` FOREIGN KEY (`pageType`) REFERENCES `Categories` (`categoryId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_page_fk` FOREIGN KEY (`userId`) REFERENCES `Users` (`userId`);

--
-- Constraints for table `Questions`
--
ALTER TABLE `Questions`
  ADD CONSTRAINT `question_page_fk` FOREIGN KEY (`pageId`) REFERENCES `Pages` (`pageId`) ON DELETE CASCADE ON UPDATE CASCADE;

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
-- Constraints for table `Scores`
--
ALTER TABLE `Scores`
  ADD CONSTRAINT `score_page_fk` FOREIGN KEY (`pageId`) REFERENCES `Pages` (`pageId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `score_question_fk` FOREIGN KEY (`questionId`) REFERENCES `Questions` (`questionId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `score_user_fk` FOREIGN KEY (`userId`) REFERENCES `Users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

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
-- Constraints for table `Temp_Contributors`
--
ALTER TABLE `Temp_Contributors`
  ADD CONSTRAINT `fk_user_tempContributor` FOREIGN KEY (`tempContributorId`) REFERENCES `Users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

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
-- Constraints for table `Temp_Questions`
--
ALTER TABLE `Temp_Questions`
  ADD CONSTRAINT `temp_question_fk` FOREIGN KEY (`tempQuestionId`) REFERENCES `Questions` (`questionId`) ON DELETE CASCADE ON UPDATE CASCADE;

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
