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


DROP TABLE IF EXISTS `account`;
CREATE TABLE `account` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


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


DROP TABLE IF EXISTS `area`;
CREATE TABLE `area` (
  `id` int(10) NOT NULL,
  `area` varchar(20) COLLATE latin1_general_ci NOT NULL,
  `unit` varchar(20) COLLATE latin1_general_ci NOT NULL,
  `score` int(10) NOT NULL,
  `currentscore` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;


DROP TABLE IF EXISTS `db_users`;
CREATE TABLE `db_users` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(15) NOT NULL,
  `user_email` varchar(40) NOT NULL,
  `user_pass` varchar(255) NOT NULL,
  `joining_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `divisionss`;
CREATE TABLE `divisionss` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(220) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


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


DROP TABLE IF EXISTS `pages`;
CREATE TABLE `pages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `url` varchar(100) NOT NULL,
  `status` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


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


DROP TABLE IF EXISTS `qt_quest`;
CREATE TABLE `qt_quest` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question` text NOT NULL,
  `datefrom` date NOT NULL,
  `dateto` date NOT NULL,
  `status` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


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


-- 2017-02-25 19:04:55
