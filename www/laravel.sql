-- Adminer 4.2.5 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `access_pages`;
CREATE TABLE `access_pages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(50) NOT NULL,
  `page_id` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `access_pages` (`id`, `user_id`, `page_id`) VALUES
(60,	'13',	'1'),
(61,	'13',	'2'),
(62,	'13',	'3'),
(63,	'13',	'4'),
(64,	'13',	'5'),
(65,	'13',	'1'),
(66,	'12',	'2'),
(67,	'12',	'6'),
(68,	'12',	'7'),
(69,	'14',	'6'),
(70,	'14',	'7'),
(84,	'158',	'1'),
(85,	'158',	'2'),
(86,	'158',	'3'),
(87,	'158',	'4'),
(93,	'166',	'3'),
(94,	'166',	'4'),
(95,	'166',	'5'),
(96,	'158',	'6'),
(97,	'158',	'7'),
(98,	'158',	'8'),
(99,	'158',	'9'),
(100,	'158',	'10'),
(101,	'158',	'11');

DROP TABLE IF EXISTS `account`;
CREATE TABLE `account` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `account` (`id`, `username`, `password`) VALUES
(1,	'admin',	'admin!'),
(3,	'laravel',	'administrator');

DROP TABLE IF EXISTS `app_tracker`;
CREATE TABLE `app_tracker` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(220) NOT NULL,
  `attempts` int(11) DEFAULT NULL,
  `datefrom` varchar(220) DEFAULT NULL,
  `datevisit` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `area` varchar(220) CHARACTER SET utf8 DEFAULT NULL,
  `divisions` varchar(220) CHARACTER SET utf8 DEFAULT NULL,
  `aunit` varchar(220) CHARACTER SET utf8 DEFAULT NULL,
  `score_bottle` time DEFAULT NULL,
  `isdisplay` int(11) DEFAULT '1',
  `total_score_bottles` varchar(50) CHARACTER SET utf8 NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `app_tracker` (`id`, `user_id`, `attempts`, `datefrom`, `datevisit`, `area`, `divisions`, `aunit`, `score_bottle`, `isdisplay`, `total_score_bottles`) VALUES
(32,	'o90645',	1,	'2-17-2017',	'2017-02-19 15:34:23',	'1',	'1',	'1',	'05:33:00',	1,	'0'),
(33,	'o90645',	1,	'2-19-2017',	'2017-02-19 08:41:39',	'1',	'1',	'1',	'04:41:00',	1,	'0'),
(34,	'admin',	1,	'2-19-2017',	'2017-02-19 14:26:24',	'1',	'1',	'1',	'10:26:00',	1,	'0'),
(35,	'admin2',	1,	'2-19-2017',	'2017-02-19 15:02:43',	'1',	'1',	'1',	'11:01:00',	1,	'0'),
(36,	'admin3',	1,	'2-19-2017',	'2017-02-19 15:02:50',	'1',	'1',	'1',	'11:01:00',	1,	'0'),
(37,	'user1',	1,	'2-19-2017',	'2017-02-19 15:33:34',	'1',	'1',	'1',	'11:01:00',	1,	'0'),
(38,	'user5',	1,	'2-18-2017',	'2017-02-19 15:03:11',	'1',	'1',	'1',	'11:01:00',	1,	'0'),
(39,	'user5',	1,	'2-17-2017',	'2017-02-19 15:03:17',	'1',	'1',	'1',	'11:01:00',	1,	'0'),
(40,	'admin',	1,	'2-20-2017',	'2017-02-20 06:16:23',	'1',	'1',	'1',	'02:15:00',	1,	'0'),
(41,	'admin',	1,	'2017-11-20',	'2017-02-20 08:44:27',	'1',	'1',	'1',	'04:44:00',	1,	'0'),
(42,	'admin',	1,	'2017-11-20',	'2017-02-20 08:44:27',	'1',	'1',	'1',	'04:44:00',	1,	'0'),
(43,	'admin',	1,	'2017-1-20',	'2017-02-20 08:45:36',	'1',	'1',	'1',	'04:45:00',	1,	'0'),
(44,	'admin',	1,	'2017-2-20',	'2017-02-20 08:46:56',	'1',	'1',	'1',	'04:47:00',	1,	'0'),
(45,	'o90645',	1,	'2017-2-20',	'2017-02-20 13:19:25',	'1',	'1',	'1',	'09:19:00',	1,	'0'),
(46,	'o90645',	1,	'2017-2-21',	'2017-02-20 16:51:59',	'1',	'1',	'1',	'12:52:00',	1,	'0'),
(47,	'o90645',	1,	'2-21-2017',	'2017-02-20 19:32:48',	'1',	'1',	'1',	'03:32:00',	1,	'0'),
(48,	'undefined',	1,	'undefined',	'2017-02-21 10:29:50',	'undefined',	'undefined',	'undefined',	'00:00:00',	1,	'0'),
(49,	'o90645',	1,	'2017-2-22',	'2017-02-21 16:09:37',	'1',	'1',	'1',	'12:09:00',	1,	'0');

DROP TABLE IF EXISTS `area`;
CREATE TABLE `area` (
  `id` int(10) NOT NULL,
  `area` varchar(20) COLLATE latin1_general_ci NOT NULL,
  `unit` varchar(20) COLLATE latin1_general_ci NOT NULL,
  `score` int(10) NOT NULL,
  `currentscore` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

INSERT INTO `area` (`id`, `area`, `unit`, `score`, `currentscore`) VALUES
(1,	'Coastal BC',	'West',	0,	0),
(2,	'LML B.C West',	'West',	0,	0),
(3,	'LML B.C. East',	'West',	0,	0),
(4,	'Interior BC',	'West',	0,	0),
(5,	'Southern Alberta',	'West',	0,	0),
(6,	'Northern Alberta',	'West',	0,	0),
(7,	'Manitoba',	'West',	0,	0),
(8,	'Saskatchewan',	'West',	0,	0),
(9,	'London/Chatham',	'Central',	0,	0),
(10,	'Barrie/Northern Onta',	'Central',	0,	0),
(11,	'B/H/K Central',	'Central',	0,	0),
(12,	'B/H/K East',	'Central',	0,	0),
(13,	'B/H/K West',	'Central',	0,	0),
(14,	'Quebec East',	'East',	0,	0),
(15,	'Montreal SF',	'East',	0,	0),
(16,	'Ottawa / Outaouais',	'East',	0,	0),
(17,	'NFLD',	'East',	0,	0),
(18,	'Maritimes',	'East',	0,	0),
(19,	'Montreal LF',	'East',	0,	0);

DROP TABLE IF EXISTS `db_users`;
CREATE TABLE `db_users` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(15) NOT NULL,
  `user_email` varchar(40) NOT NULL,
  `user_pass` varchar(255) NOT NULL,
  `joining_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `db_users` (`user_id`, `user_name`, `user_email`, `user_pass`, `joining_date`) VALUES
(1,	'developer',	'jraymund.niconi@gmail.com',	'$2y$10$q2/u2onJVjK5.2xTe3.otO7/ykFFyWKH5t9PUs9n2.GIEPeXWstpu',	'2016-10-25 18:30:26'),
(2,	'adminer',	'jraymund@gmail.com',	'$2y$10$nMcU2SsepFVA9HJbCQDNWuxgEALKK2IAvgpybONISeMx1oJGcrGJ.',	'2016-10-30 10:33:20'),
(3,	'joroni2',	'jraymund@gmail2.com',	'$2y$10$DyLzHM1FvTRLQ3YisyaCfuNherxb.J6iFtlMJqZglXW9pmMpU.EbO',	'2016-10-30 17:20:58'),
(0,	'rdeguzman',	'rdeguzman@coca-cola.com',	'$2y$10$w7H9YOjWDnDMtXt1sv4CUOx9prVX/fxENBZ4CAEVvm3hC40uSrfyu',	'2016-11-02 09:56:53'),
(0,	'administrator',	'email@email.com',	'$2y$10$eRnjDAkSdepX1tu51gRUCucOAAxD7HZlLQ1/0h2YGtOmeTgFElA.m',	'2016-11-04 17:48:19');

DROP TABLE IF EXISTS `divisionss`;
CREATE TABLE `divisionss` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(220) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `divisionss` (`id`, `name`) VALUES
(1,	'Small Format'),
(2,	'Large Format'),
(3,	'Generalist'),
(4,	'Marchandiser');

DROP TABLE IF EXISTS `messageofday`;
CREATE TABLE `messageofday` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(220) COLLATE latin1_general_ci NOT NULL,
  `video` varchar(200) COLLATE latin1_general_ci NOT NULL,
  `text` varchar(1000) COLLATE latin1_general_ci NOT NULL,
  `audio` varchar(100) COLLATE latin1_general_ci DEFAULT NULL,
  `textF` varchar(1000) COLLATE latin1_general_ci NOT NULL,
  `image` varchar(200) COLLATE latin1_general_ci NOT NULL,
  `is_live` int(11) NOT NULL DEFAULT '0',
  `timestamp` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

INSERT INTO `messageofday` (`id`, `name`, `video`, `text`, `audio`, `textF`, `image`, `is_live`, `timestamp`) VALUES
(15,	'Vestibulum quis tortor auctor',	'freedoginrain.mp4',	'test',	'',	'',	'',	0,	'2017-01-17 13:42:33'),
(16,	'Lorem ipsum dolor ',	'freestormcell.mp4',	'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sodales ipsum vitae ultricies faucibus. Morbi dapibus aliquet nulla laoreet vehicula. Nullam a nunc a magna varius ultricies. ',	'dasdad',	'',	'',	0,	'2016-12-07 21:51:52'),
(17,	'Dog Walk',	'freeseaturtleswimming.mp4',	'sdfsdfdsfsdf',	'',	'',	'',	0,	'2017-01-16 08:26:11'),
(19,	'Jeff Kirkland December Video Message',	'Jeff Kirkland December Video Message-SD.mp4',	'Jeff Kirkland December Video Message',	'',	'',	'',	0,	'2016-12-07 21:51:39'),
(20,	'Jeff Kirkland December Video Message',	'Jeff Kirkland December Video Message-SD.mp4',	'Jeff Kirkland December Video Message',	'',	'',	'',	0,	'2017-01-17 17:19:04'),
(21,	'Dog Labrador',	'doglabrador.mp4',	'fgertertrt',	NULL,	'',	'',	1,	'2017-01-17 17:02:31');

DROP TABLE IF EXISTS `pages`;
CREATE TABLE `pages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `url` varchar(100) NOT NULL,
  `status` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `pages` (`id`, `name`, `url`, `status`) VALUES
(1,	'Admin',	'admin',	'show'),
(2,	'View User',	'admin/view/user',	'show'),
(3,	'Add User',	'admin/add/user',	'show'),
(4,	'Edit User',	'admin/edit/user/{id}',	'hide'),
(5,	'Edit User Access',	'admin/edit/user/access/{id}',	''),
(6,	'View Question',	'admin/view/question',	'show'),
(7,	'Add Question',	'admin/add/question',	'show'),
(8,	'Edit Question',	'admin/edit/question/{company_id}',	'hide'),
(9,	'View Video',	'admin/view/video',	'show'),
(10,	'Add Video',	'admin/add/video',	'show'),
(11,	'Edit Video',	'admin/edit/video/{id}',	'hide');

DROP TABLE IF EXISTS `qt_ans`;
CREATE TABLE `qt_ans` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question_id` int(11) NOT NULL,
  `option` text NOT NULL,
  `option_id` varchar(10) NOT NULL,
  `correct` varchar(220) NOT NULL,
  `incorrect` varchar(220) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `qt_ans` (`id`, `question_id`, `option`, `option_id`, `correct`, `incorrect`) VALUES
(1,	1,	'237mL glass',	'true',	'<p><span>Correct!</span> 237mL glass is not considered to be Sparkling IC</p>',	'<p><span>Wrong!</span> 237mL glass is not considered to be Sparkling IC</p>'),
(2,	1,	'414mL',	'false',	'CORRECT!   237mL glass is not considered to be Sparkling IC',	'WRONG!    237mL glass is not considered to be Sparkling IC'),
(3,	1,	'500mL',	'false',	'CORRECT!   237mL glass is not considered to be Sparkling IC',	'WRONG!    237mL glass is not considered to be Sparkling IC'),
(4,	1,	'310mL sleek can',	'false',	'CORRECT!   237mL glass is not considered to be Sparkling IC',	'WRONG!    237mL glass is not considered to be Sparkling IC'),
(7,	2,	'ASM',	'false',	'CORRECT!  The Small Format Director needs to approve an equipment swap before the work order is placed through coketech.ca.',	'WRONG!   The Small Format Director needs to approve an equipment swap before the work order is placed through coketech.ca.'),
(8,	2,	'Small Format Director',	'true',	'CORRECT!  The Small Format Director needs to approve an equipment swap before the work order is placed through coketech.ca.',	'WRONG!   The Small Format Director needs to approve an equipment swap before the work order is placed through coketech.ca.'),
(9,	2,	'DSM',	'false',	'CORRECT!  The Small Format Director needs to approve an equipment swap before the work order is placed through coketech.ca.',	'WRONG!   The Small Format Director needs to approve an equipment swap before the work order is placed through coketech.ca.'),
(10,	2,	'SUVP',	'false',	'CORRECT!   The minimum order size required for an FSOP customer located within 90km of the Distribution Centre  is $190.',	'WRONG!  The minimum order size required for an FSOP customer located within 90km of the Distribution Centre  is $190.'),
(11,	3,	'$250 ',	'true',	'CORRECT!   The minimum order size required for a Convenience Retail customer located within 90km of the Distribution Centre is $250.',	'WRONG!   The minimum order size required for a Convenience Retail customer located within 90km of the Distribution Centre is $250.'),
(12,	3,	'$190 ',	'false',	'CORRECT!   The minimum order size required for a Convenience Retail customer located within 90km of the Distribution Centre is $250.',	'WRONG!   The minimum order size required for a Convenience Retail customer located within 90km of the Distribution Centre is $250.'),
(13,	3,	'$280 ',	'false',	'CORRECT!   The minimum order size required for a Convenience Retail customer located within 90km of the Distribution Centre is $250.',	'WRONG!   The minimum order size required for a Convenience Retail customer located within 90km of the Distribution Centre is $250.'),
(14,	3,	'$475 ',	'false',	'CORRECT!   The minimum order size required for a Convenience Retail customer located within 90km of the Distribution Centre is $250.',	'WRONG!   The minimum order size required for a Convenience Retail customer located within 90km of the Distribution Centre is $250.'),
(18,	4,	'$250 ',	'false',	'CORRECT!  The minimum order size required for an FSOP customer located within 90km of the Distribution Centre  is $190.',	'WRONG!   The minimum order size required for an FSOP customer located within 90km of the Distribution Centre  is $190.'),
(19,	4,	'$280 ',	'false',	'CORRECT!   The minimum order size required for an FSOP customer located within 90km of the Distribution Centre  is $190.',	'WRONG!   The minimum order size required for an FSOP customer located within 90km of the Distribution Centre  is $190.'),
(20,	4,	'$475 ',	'false',	'CORRECT!   The minimum order size required for an FSOP customer located within 90km of the Distribution Centre  is $190.',	'WRONG!   The minimum order size required for an FSOP customer located within 90km of the Distribution Centre  is $190.'),
(21,	4,	'$190 ',	'true',	'CORRECT!   The minimum order size required for an FSOP customer located within 90km of the Distribution Centre  is $190.',	'WRONG!   The minimum order size required for an FSOP customer located within 90km of the Distribution Centre  is $190.'),
(25,	5,	'$280',	'false',	'CORRECT!   The minimum order size required for an FSOP customer located within 90km of the Distribution Centre  is $190.',	'WRONG!   The minimum order size required for an FSOP customer located within 90km of the Distribution Centre  is $190.'),
(26,	5,	'475',	'false',	'CORRECT!   The minimum order size required for an FSOP customer located within 90km of the Distribution Centre  is $190.',	'WRONG!   The minimum order size required for an FSOP customer located within 90km of the Distribution Centre  is $190.'),
(27,	5,	'$190',	'true',	'CORRECT!   The minimum order size required for an FSOP customer located within 90km of the Distribution Centre  is $190.',	'WRONG!   The minimum order size required for an FSOP customer located within 90km of the Distribution Centre  is $190.'),
(28,	5,	'$250',	'false',	'CORRECT!   The minimum order size required for an FSOP customer located within 90km of the Distribution Centre  is $190.',	'WRONG!   The minimum order size required for an FSOP customer located within 90km of the Distribution Centre  is $190.');

DROP TABLE IF EXISTS `qt_info`;
CREATE TABLE `qt_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `question_id` int(11) DEFAULT NULL,
  `main` text NOT NULL,
  `results` text NOT NULL,
  `level1` text NOT NULL,
  `level2` text NOT NULL,
  `level3` text NOT NULL,
  `level4` text NOT NULL,
  `level5` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `qt_info` (`id`, `name`, `question_id`, `main`, `results`, `level1`, `level2`, `level3`, `level4`, `level5`) VALUES
(1,	'Test Your Knowledge!!',	1,	'sample.mp4',	'You\'ve won 1 bottle of Coke!',	'Genius!!!',	'Smart!!',	'Almost!',	'Oh Dear...',	'Stay in school...');

DROP TABLE IF EXISTS `qt_quest`;
CREATE TABLE `qt_quest` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question` text NOT NULL,
  `datefrom` date NOT NULL,
  `dateto` date NOT NULL,
  `status` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `qt_quest` (`id`, `question`, `datefrom`, `dateto`, `status`) VALUES
(1,	'Which of the following packages is not considered to be Sparkling IC?',	'0000-00-00',	'0000-00-00',	1),
(2,	'Who needs to approve any equipment swap before the work order is placed through coketech.ca?',	'0000-00-00',	'0000-00-00',	1),
(3,	'What is the minimum order size required for a Convenience Retail customer located within 90km of the Distribution Centre before we should key an order?',	'0000-00-00',	'0000-00-00',	1),
(4,	'What is the minimum order size required for an FSOP customer located within 90km of the Distribution Centre before we should key an order?',	'0000-00-00',	'0000-00-00',	1),
(5,	'In Convenience Retail, what is the maximum number of cooler clings per door?',	'0000-00-00',	'0000-00-00',	1);

DROP TABLE IF EXISTS `questionItem`;
CREATE TABLE `questionItem` (
  `company_id` int(11) NOT NULL AUTO_INCREMENT,
  `datefrom` date NOT NULL,
  `dateto` date NOT NULL,
  `division` varchar(120) NOT NULL,
  `question` text NOT NULL,
  `option_1` text NOT NULL,
  `option_2` text NOT NULL,
  `option_3` text NOT NULL,
  `option_4` text NOT NULL,
  `correct` text NOT NULL,
  `incorrect` text NOT NULL,
  `setnames` varchar(120) NOT NULL,
  `activated` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `questionItem` (`company_id`, `datefrom`, `dateto`, `division`, `question`, `option_1`, `option_2`, `option_3`, `option_4`, `correct`, `incorrect`, `setnames`, `activated`) VALUES
(7,	'2016-11-25',	'2016-11-27',	'Large Format',	'Which of the following packages is not considered to be Sparkling IC?',	'237mL glass',	'414mL',	'500mL',	'310mL sleek can',	'Correct: 237mL glass is not considered to be Sparkling IC',	'Incorrect: 237mL glass is not considered to be Sparkling IC',	'',	0),
(10,	'2016-11-15',	'2016-11-17',	'Small Format',	'Who needs to approve any equipment swap before the work order is placed through coketech.ca?',	'Small Format Director. Test',	'ASM',	'DSM',	'Test',	'Correct: The Small Format Director needs to approve an equipment swap before the work order is placed through coketech.ca.',	'Incorrect: The Small Format Director needs to approve an equipment swap before the work order is placed through coketech.ca.',	'',	0),
(11,	'2016-12-06',	'2016-12-08',	'Large Format',	'What is the minimum order size required for a Convenience Retail customer located within 90km of the Distribution Centre before we should key an order?',	'$250 ',	'$190 ',	'$280 ',	'$475 ',	'Correct: The minimum order size required for a Convenience Retail customer located within 90km of the Distribution Centre is $250.',	'Incorrect: The minimum order size required for a Convenience Retail customer located within 90km of the Distribution Centre is $250.',	'',	1),
(12,	'2016-11-15',	'2016-11-17',	'Small Format',	'What is the minimum order size required for an FSOP customer located within 90km of the Distribution Centre before we should key an order?',	'$190 ',	'$250 ',	'$280 ',	'{ $option_4 }}',	'Correct: The minimum order size required for an FSOP customer located within 90km of the Distribution Centre  is $190.',	'Wrong: The minimum order size required for an FSOP customer located within 90km of the Distribution Centre  is $190.',	'',	1),
(45,	'2017-01-15',	'2017-01-17',	'Small Format',	'In order for a cooler to qualify as &amp;quot;cooler at cash&amp;quot; the cooler must:',	'Be along path to purchase but not more than 10\' from cash and must contain RBS',	'be arms reach of the cash (4ft) and contain RBS',	'10\" ft from the entrance any contain any IC product',	'be along path to purchase but not more than 10\' from cash and contacin any IC product',	'Correct: In order to qualify as cooler at cash the cooler must be along path to purchase, but not more than 10ft from cash and it must contain RBS',	'Incorrect: In order to qualify as cooler at cash the cooler must be along path to purchase, but not more than 10ft from cash and it must contain RBS',	'',	0),
(46,	'2017-01-15',	'2017-01-17',	'Small Format',	'How many bi-monthly deals must a Champion customer run each period?',	'4',	'2',	'33',	'5',	'Correct: A Champion customer much run a minimum of 4 deals per period, one of which must be sparkling',	'Incorrect: A Champion customer much run a minimum of 4 deals per period, one of which must be sprakling',	'',	0),
(48,	'2017-01-15',	'2017-01-31',	'Large Format',	'In SFA, where do you find a survey?',	'Objectives & Insights ',	'Selling Aids',	'Dashboard',	'Sales Performance ',	'Correct: Surveys are found in the Objectives &amp;amp;amp; Insights tab',	'Incorrect: Surveys are found in the Objectives &amp;amp;amp; Insights tab',	'',	1),
(49,	'2017-01-15',	'2017-01-31',	'Large Format',	'Only __% of shoppers visit the beverage aisle.\r\n',	'28%',	'30%',	'15%',	'44%',	'Correct: Only 28% of shoppers visit the beverage aisle ',	'Incorrect: Only 28% of shoppers visit the beverage aisle ',	'',	1),
(70,	'2016-12-12',	'2016-12-16',	'Generalist',	'3 points',	'correct',	'wrong',	'wrong',	'wrong',	'correct',	'incorrect',	'',	1),
(71,	'2016-12-11',	'2016-12-16',	'Generalist',	'2 points',	'correct',	'wrong',	'wrong',	'wrong',	'correct',	'incorrect',	'',	1),
(72,	'2016-12-10',	'2016-12-16',	'Generalist',	'1 point',	'correct',	'wrong',	'wrong',	'wrong',	'correct',	'incorrect',	'',	1),
(73,	'2016-12-11',	'2016-12-16',	'Merchandiser',	'12/11/2016',	'y',	'n',	'n',	'n',	'y',	'n',	'',	1),
(76,	'2017-01-19',	'2017-01-21',	'Large Format',	'cffsfad',	'adfadasd',	'asdasd',	'asdasd',	'adasad',	'asdasd',	'asdad',	'',	1),
(77,	'2017-01-23',	'2017-01-25',	'Generalist',	'Q2',	'A2',	'W2',	'W2',	'W2',	'CI2',	'II2',	'',	1);

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `fname` varchar(50) NOT NULL,
  `lname` varchar(50) NOT NULL,
  `email` varchar(220) NOT NULL,
  `privilege` varchar(255) NOT NULL DEFAULT '3',
  `division` varchar(255) NOT NULL,
  `aunit` varchar(255) NOT NULL,
  `area` varchar(255) NOT NULL,
  `lang` varchar(255) NOT NULL,
  `avatar` varchar(500) NOT NULL,
  `remember_token` varchar(500) NOT NULL,
  `created_at` varchar(50) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  `time_added` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `user` (`id`, `username`, `password`, `fname`, `lname`, `email`, `privilege`, `division`, `aunit`, `area`, `lang`, `avatar`, `remember_token`, `created_at`, `updated_at`, `time_added`) VALUES
(147,	'editor',	'us3r@123',	'Raymund',	'Niconi',	'test@coca-cola.com',	'3',	'Small Format',	'west',	'Coastal BC',	'English',	'',	'',	'January, 15, 2017 - 12:01:50 PM',	'2017-01-16 17:31:17',	'January, 17, 2017 - 1:31:17 AM'),
(158,	'o90645',	'us3r@123',	'Raymund',	'Niconi',	'niconi@coca-cola.com',	'1',	'Small Format',	'west',	'Coastal BC',	'English',	'S2EZAL43IMG_0487.JPG',	'',	'January, 15, 2017 - 12:01:50 PM',	'2017-01-24 22:50:40',	'January, 15, 2017 - 8:32:05 PM'),
(166,	'admintest',	'1234',	'Admin Tests',	'Admin Test',	'admintest@emal.com',	'3',	'Small Format',	'west',	'Coastal BC',	'English',	'',	'',	'January, 15, 2017 - 10:44:05 PM',	'2017-01-16 17:05:47',	'January, 17, 2017 - 1:05:47 AM'),
(169,	'o90001',	'admin!',	'Mobile',	'App2',	'mobile@app.com',	'3',	'Small Format',	'west',	'Coastal BC',	'English',	'',	'',	'',	'2017-01-16 20:51:18',	'January, 17, 2017 - 4:51:18 AM'),
(170,	'o11111',	'123456',	'Raymund',	'Niconi',	'email@email.com',	'3',	'',	'',	'',	'',	'',	'',	'',	'2017-01-25 13:58:25',	''),
(171,	'12345',	'12345',	'Raym',	'Nic',	'Email@email.com',	'3',	'',	'',	'',	'',	'',	'',	'',	'0000-00-00 00:00:00',	'');

DROP TABLE IF EXISTS `user_results`;
CREATE TABLE `user_results` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(220) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `attempts` int(11) DEFAULT NULL,
  `datefrom` varchar(220) DEFAULT NULL,
  `area` varchar(220) CHARACTER SET utf8 DEFAULT NULL,
  `divisions` varchar(220) CHARACTER SET utf8 DEFAULT NULL,
  `aunit` varchar(220) CHARACTER SET utf8 DEFAULT NULL,
  `score_bottle` time DEFAULT NULL,
  `isdisplay` int(11) DEFAULT '0',
  `total_score_bottles` varchar(50) CHARACTER SET utf8 NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `user_results` (`id`, `user_id`, `attempts`, `datefrom`, `area`, `divisions`, `aunit`, `score_bottle`, `isdisplay`, `total_score_bottles`) VALUES
(149,	'o90645',	1,	'0000-00-00',	'1',	'1',	'1',	'02:14:00',	0,	'0'),
(150,	'o90645',	1,	'0000-00-00',	'1',	'1',	'1',	'02:16:00',	0,	'0'),
(151,	'o90645',	1,	'0000-00-00',	'1',	'1',	'1',	'02:20:00',	0,	'0'),
(152,	'o90645',	1,	'2-15-2017',	'1',	'1',	'1',	'02:24:00',	0,	'0');

-- 2017-02-25 19:21:43
