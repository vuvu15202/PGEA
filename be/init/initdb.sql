-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: demo_adminpage_1
-- ------------------------------------------------------
-- Server version	5.7.44-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `api`
--

DROP TABLE IF EXISTS `api`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `isDelete` tinyint(1) DEFAULT NULL,
  `createdBy` varchar(255) DEFAULT NULL,
  `deletedBy` varchar(255) DEFAULT NULL,
  `createdAt` bigint(20) DEFAULT NULL,
  `updatedAt` bigint(20) DEFAULT NULL,
  `deletedAt` bigint(20) DEFAULT NULL,
  `actionPath` varchar(255) DEFAULT NULL,
  `description` text,
  `requireRoleIds` longtext,
  `apiVersion` varchar(255) DEFAULT NULL,
  `method` varchar(255) DEFAULT NULL,
  `userIdField` varchar(255) DEFAULT NULL,
  `whereByUserField` longtext,
  `ignoreFields` longtext,
  `conditions` longtext,
  `selectedFields` longtext,
  `enableCaptcha` tinyint(1) DEFAULT NULL,
  `fieldAllowValue` longtext,
  `boolExpression` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api`
--

LOCK TABLES `api` WRITE;
/*!40000 ALTER TABLE `api` DISABLE KEYS */;
INSERT INTO `api` VALUES (1,0,'1',NULL,1563815468603,1563815468603,0,'auth/sign-in/account','Đăng nhập hệ thống bằng tài khoản và mật khẩu được cấp','[]','public','POST','','{}','[]','{}','[]',1,'{}',''),(2,0,'1',NULL,1567068694951,1622481377365,0,'socket/init','khởi tạo kết nối socket. Đưa người dùng vào room để nhận thông báo','[3,5,6]','common','POST','','{}','[]','{}','[]',0,'{}',''),(3,0,'1',NULL,1566552943003,1622481390311,0,'auth/logout','đăng xuất','[5,3,6]','common','POST','','{}','[]','{}','[]',0,'{}',''),(4,0,'1',NULL,1571907996363,1674588948419,0,'file/upload-image','upload file to server','[3]','admin','POST','','{}','[]','{}','[]',0,'{}',''),(5,0,'1',NULL,1571908421941,1571908421941,0,'file/download-file','người dùng download file','[3]','admin','GET','','{}','[]','{}','[]',0,'{}',''),(6,0,'1',NULL,1678439941264,1678439941264,0,'file/upload-file','upload file import','[1]','admin','POST','','{}','[]','{\"isDelete\":false}','[]',0,'{}',''),(7,0,'1',NULL,1702014048859,1702014390995,0,'admin/query','truy vấn sql từ xa','[1]','admin','POST','','{}','[]','{}','[]',0,'{}',''),(8,0,'1',NULL,1719545036206,1719545036206,0,'auth/register','API đăng ký tài khoản ','[]','public','POST','','{}','[]','{\"isDelete\":false}','[]',1,'{}','');
/*!40000 ALTER TABLE `api` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth`
--

DROP TABLE IF EXISTS `auth`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `isDelete` tinyint(1) DEFAULT NULL,
  `createdBy` varchar(255) DEFAULT NULL,
  `deletedBy` varchar(255) DEFAULT NULL,
  `createdAt` bigint(20) DEFAULT NULL,
  `updatedAt` bigint(20) DEFAULT NULL,
  `deletedAt` bigint(20) DEFAULT NULL,
  `key` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `firstLoginAt` bigint(20) DEFAULT NULL,
  `lastLoginAt` bigint(20) DEFAULT NULL,
  `lastChangePasswordAt` bigint(20) DEFAULT NULL,
  `payload` longtext,
  `activated` tinyint(1) DEFAULT NULL,
  `user` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth`
--

LOCK TABLES `auth` WRITE;
/*!40000 ALTER TABLE `auth` DISABLE KEYS */;
INSERT INTO `auth` VALUES (1,0,NULL,NULL,1563071060589,1723501048058,0,'sys_admin','$2a$10$gJknLSwoPi4Ui6FZDfX0x.GWdUbZkitIYge4eweY5pYqsEcjO5E2G','up',1563075951190,1723501048057,1722877010131,'{}',1,1),(2,0,'1',NULL,1586870790021,1704267771830,0,'khangpq2','$2a$10$wAZuCuA5LzHKbpitKX.nZO5XJD57m.3ku6wgywJy2VgNrMFfvEobq','up',1623697042665,1704267771830,1623697031746,'{}',1,2),(3,0,'1',NULL,1620588926910,1677805174064,0,'sms','$2a$10$wAZuCuA5LzHKbpitKX.nZO5XJD57m.3ku6wgywJy2VgNrMFfvEobq','up',1620591328475,1677805174063,1677805153235,'{}',1,3),(4,0,'1',NULL,1622475226059,1622475226059,0,'public','$2a$10$wAZuCuA5LzHKbpitKX.nZO5XJD57m.3ku6wgywJy2VgNrMFfvEobq','up',0,0,0,'{}',1,4);
/*!40000 ALTER TABLE `auth` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `authpermission`
--

DROP TABLE IF EXISTS `authpermission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `authpermission` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `isDelete` tinyint(1) DEFAULT NULL,
  `createdBy` varchar(255) DEFAULT NULL,
  `deletedBy` varchar(255) DEFAULT NULL,
  `createdAt` bigint(20) DEFAULT NULL,
  `updatedAt` bigint(20) DEFAULT NULL,
  `deletedAt` bigint(20) DEFAULT NULL,
  `key` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `expiredAt` double DEFAULT NULL,
  `isUse` tinyint(1) DEFAULT NULL,
  `auth` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `token` (`token`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authpermission`
--

LOCK TABLES `authpermission` WRITE;
/*!40000 ALTER TABLE `authpermission` DISABLE KEYS */;
INSERT INTO `authpermission` VALUES (42,0,NULL,NULL,1723335802028,1723335802028,0,'ahihi123','up','fb056d0a208eb7aae4b425d4c795c375',1723422202028,0,33),(43,0,NULL,NULL,1723373711037,1723373711037,0,'thanhdq','up','ff92e1dbb148cd2646866cb6e0e3eae4',1723460111037,0,9),(44,0,NULL,NULL,1723373941658,1723373941658,0,'thanhdq','up','2ee4a24cef4e0a774ff4006b8cb9b9b5',1723460341657,0,9),(45,0,NULL,NULL,1723379641331,1723379641331,0,'account_test','up','8a95089da7a1898c3715af1fe65267a8',1723466041331,0,34),(46,0,NULL,NULL,1723379939229,1723379939229,0,'11212312341234','up','62522a51b8fd264a1f5a96cb6cfc2016',1723466339229,0,35),(47,0,NULL,NULL,1723380534277,1723380534277,0,'112','up','e48d5194155082c6bbfc83c816391a9e',1723466934238,0,36),(48,0,NULL,NULL,1723380802534,1723380802534,0,'112112g112gv112gvh112gvh','up','fd6024738d1579a7a230a969a9218063',1723467202534,0,37),(49,0,NULL,NULL,1723380885793,1723380885793,0,'cdhfjgs','up','aa942a7e1792a2c383e2792a731ff83c',1723467285793,0,38),(50,0,NULL,NULL,1723381120574,1723381120574,0,'sdfsdf','up','be402341ee4337e5d690c586046c57cb',1723467520574,0,39),(51,0,NULL,NULL,1723381388214,1723381388214,0,'account_test','up','9e74331439c856b2d24d553b84805015',1723467788214,0,34),(52,0,NULL,NULL,1723381561683,1723381561683,0,'sys_admin','up','c27ddfd20109065e210e46248d6f0a79',1723467961683,0,1),(53,0,NULL,NULL,1723406292411,1723406292411,0,'abc123','up','f23b480eb457657952998c2ed29327c1',1723492692411,0,40),(54,0,NULL,NULL,1723406499423,1723406499423,0,'sys_admin','up','3411dce30ddadf0b3d426221aa4dcd94',1723492899423,0,1),(56,0,NULL,NULL,1723486139689,1723486139689,0,'sys_admin','up','ba27122dff91f7ca9f79aef12b26ca6e',1723572539689,0,1),(57,0,NULL,NULL,1723486669430,1723486669430,0,'sys_admin','up','3654dc9f2d260f771000d3c0e8fa926d',1723573069430,0,1),(58,0,NULL,NULL,1723487510537,1723487510537,0,'sys_admin','up','82cec7d6438086daba1698b45b8c321e',1723573910537,0,1),(60,0,NULL,NULL,1723489412559,1723489412559,0,'aababcabcawsabcaws','up','4a718805a293e253296683bc1e0686ec',1723575812559,0,42),(61,0,NULL,NULL,1723489606357,1723489606357,0,'adds','up','52c43fb1c35783e8e17550bdedf5762b',1723576006357,0,43);
/*!40000 ALTER TABLE `authpermission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `authtoken`
--

DROP TABLE IF EXISTS `authtoken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `authtoken` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `isDelete` tinyint(1) DEFAULT NULL,
  `createdBy` varchar(255) DEFAULT NULL,
  `deletedBy` varchar(255) DEFAULT NULL,
  `createdAt` bigint(20) DEFAULT NULL,
  `updatedAt` bigint(20) DEFAULT NULL,
  `deletedAt` bigint(20) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `user` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `token` (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authtoken`
--

LOCK TABLES `authtoken` WRITE;
/*!40000 ALTER TABLE `authtoken` DISABLE KEYS */;
/*!40000 ALTER TABLE `authtoken` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `capt`
--

DROP TABLE IF EXISTS `capt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `capt` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `isDelete` tinyint(1) DEFAULT NULL,
  `createdBy` varchar(255) DEFAULT NULL,
  `deletedBy` varchar(255) DEFAULT NULL,
  `createdAt` bigint(20) DEFAULT NULL,
  `updatedAt` bigint(20) DEFAULT NULL,
  `deletedAt` bigint(20) DEFAULT NULL,
  `text` varchar(255) DEFAULT NULL,
  `expiredAt` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `capt`
--

LOCK TABLES `capt` WRITE;
/*!40000 ALTER TABLE `capt` DISABLE KEYS */;
/*!40000 ALTER TABLE `capt` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `changestatuslog`
--

DROP TABLE IF EXISTS `changestatuslog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `changestatuslog` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `isDelete` tinyint(1) DEFAULT NULL,
  `createdBy` varchar(255) DEFAULT NULL,
  `deletedBy` varchar(255) DEFAULT NULL,
  `createdAt` bigint(20) DEFAULT NULL,
  `updatedAt` bigint(20) DEFAULT NULL,
  `deletedAt` bigint(20) DEFAULT NULL,
  `forModel` varchar(255) DEFAULT NULL,
  `forModelId` varchar(255) DEFAULT NULL,
  `before` varchar(255) DEFAULT NULL,
  `after` varchar(255) DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `changestatuslog`
--

LOCK TABLES `changestatuslog` WRITE;
/*!40000 ALTER TABLE `changestatuslog` DISABLE KEYS */;
/*!40000 ALTER TABLE `changestatuslog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `conf`
--

DROP TABLE IF EXISTS `conf`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `conf` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `isDelete` tinyint(1) DEFAULT NULL,
  `createdBy` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `deletedBy` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `createdAt` bigint(20) DEFAULT NULL,
  `updatedAt` bigint(20) DEFAULT NULL,
  `deletedAt` bigint(20) DEFAULT NULL,
  `key` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `val` text COLLATE utf8_unicode_ci,
  `type` int(11) DEFAULT NULL,
  `desc` text COLLATE utf8_unicode_ci,
  `forfe` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conf`
--

LOCK TABLES `conf` WRITE;
/*!40000 ALTER TABLE `conf` DISABLE KEYS */;
INSERT INTO `conf` VALUES (1,0,'1',NULL,1563071060913,1680199156514,0,'BASE_URL','https://backend.bombasticlearninghub.com',2,'',0),(2,0,'1',NULL,1563071060913,1563071060913,0,'TTL_CAPTCHA','15',1,'Thời gian sống của mã captcha theo phút',0),(3,0,'1',NULL,1563071060913,1631300062108,0,'TTL_TOKEN','10080',1,'Thời gian sống của mã token đăng nhập theo phút',0),(4,0,'1',NULL,1563071060913,1719544793765,0,'EMAIL_ACCOUNT','vuvthe163299@fpt.edu.vn',2,'Tài khoản email dùng cho việc gửi các mail thông báo \nobt.support@codingclass.edu.vn|obt.support1@codingclass.edu.vn|obt.support2@codingclass.edu.vn|obt.support3@codingclass.edu.vn|obt.support4@codingclass.edu.vn',0),(5,0,'1',NULL,1563071060913,1722845838824,0,'EMAIL_PASSWORD','tahktjddigwlcfnw',2,'Password của email gửi thông báo\n',0),(6,0,'1',NULL,1563071060913,1719549332135,0,'EMAIL_HOST','smtp.gmail.com',2,'Server email host',0),(7,0,'1',NULL,1563071060913,1563071060913,0,'EMAIL_PORT','587',1,'Server email port',0),(8,0,'1',NULL,1563071060913,1719544691065,0,'EMAIL_FROM','PGEA Support',2,'Title sender',0),(9,0,'1',NULL,1563071060913,1563071060913,0,'DEFAULT_PASSWORD','hello_sailer',2,'Mật khẩu mặc định khi reset mật khẩu',0),(10,0,'1',NULL,1570430446846,1570430446846,0,'ALLOW_FILE_EXTENSION','xlsx,xls,png,jpg,doc,docx,pdf,pptx,ppt',2,'các đuôi file chấp nhận cho việc upload file lên server được phân cách nhau bởi dấu phẩy',0),(11,0,'1',NULL,1622478610587,1723486258939,0,'PUBLIC_USER_TOKEN','bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdXRoIjp7ImlkIjo0LCJpc0RlbGV0ZSI6ZmFsc2UsImNyZWF0ZWRCeSI6IjEiLCJkZWxldGVkQnkiOm51bGwsImNyZWF0ZWRBdCI6MTYyMjQ3NTIyNjA1OSwidXBkYXRlZEF0IjoxNjIyNDc1MjI2MDU5LCJkZWxldGVkQXQiOjAsImtleSI6InB1YmxpYyIsInBhc3N3b3JkIjoiJDJhJDEwJHdBWnVDdUE1THpIS2JwaXRLWC5uWk81WEpENTdtLjNrdTZ3Z3l3SnkyVmdOck1GZnZFb2JxIiwidHlwZSI6InVwIiwiZmlyc3RMb2dpbkF0IjowLCJsYXN0TG9naW5BdCI6MCwibGFzdENoYW5nZVBhc3N3b3JkQXQiOjAsInBheWxvYWQiOnt9LCJhY3RpdmF0ZWQiOnRydWUsInVzZXIiOjR9LCJ1c2VyIjp7ImlkIjo0LCJpc0RlbGV0ZSI6ZmFsc2UsImNyZWF0ZWRCeSI6IjEiLCJkZWxldGVkQnkiOm51bGwsImNyZWF0ZWRBdCI6MTYyMjQ3NTIyNjA0OSwidXBkYXRlZEF0IjoxNzIzNDgyNDQ2NDE0LCJkZWxldGVkQXQiOjAsIm5hbWUiOiJQdWJsaWMgVXNlciIsInBob25lIjoiIiwiZW1haWwiOiJ2dXZ1MTUyMDJAZ21haWwuY29tIiwicm9sZUlkIjpbNl0sImxvY2FsZSI6InZpIiwiZ2VuZGVyIjoibWFsZSIsImRlc2NyaXB0aW9uIjoiIiwibG9ja2VkIjpmYWxzZSwiZmlyc3RMb2dpbkF0IjowLCJmY21Ub2tlbiI6W10sImF2YXRhciI6IiIsImRvYiI6IiIsIm1vbmV5IjowLCJ1c2VyVHlwZSI6eyJpZCI6NiwiaXNEZWxldGUiOmZhbHNlLCJjcmVhdGVkQnkiOiIxIiwiZGVsZXRlZEJ5IjpudWxsLCJjcmVhdGVkQXQiOjE2MjA1ODg4MzAzOTAsInVwZGF0ZWRBdCI6MTY3ODM4MzgxNDQ0MiwiZGVsZXRlZEF0IjowLCJuYW1lIjoicHVibGljIiwiZGVzY3JpcHRpb24iOiIiLCJydWxlSWdub3JlUm9sZSI6WzQsMywyLDEsNV0sInJ1bGVPbmx5Vmlld0NyZWF0ZWRCeSI6dHJ1ZSwicnVsZVZpZXdVc2VyVHlwZSI6W10sImRlZmF1bHRSb2xlIjpbNl0sImRlZmF1bHRHcmFudFVzZXJUeXBlIjowfSwiYWNjb3VudCI6InB1YmxpYyIsImFnZSI6MH0sImFkZGl0aW9uSW5mbyI6e319.CN-2FqOOLVkrOUS4fw-jKV4xTa8BdZGASRABAdFaJw0',2,'PUBLIC_USER_TOKEN\n\n',1),(12,0,'1',NULL,1622478915835,1680198924268,0,'REGISTER_LINK','#/form?page=29&mode=signup',2,'#/form?page=29&mode=signup',1),(13,0,'1',NULL,1622481897251,1680198934128,0,'FORGOT_PASSWORD_LINK','#/form?page=30&mode=forgot',2,'#/form?page=30&mode=forgot',1),(14,0,'1',NULL,1622484897063,1722861307332,0,'RESET_FORGET_ACCOUNT_URL','https://fe.bombasticlearninghub.com/#/form?page=31&expired=true&mode=reset_pass&usingPublicSession=true&embed=%7B%22token%22%3A%22{{token}}%22%2C%22account%22%3A%22{{account}}%22%7D',2,'https://obt.codingclass.edu.vn/#/form?page=31&usingPublicSession=true&embed=%7B%22token%22%3A%22{{token}}%22%2C%22account%22%3A%22{{account}}%22%7D\n\nhttps://obt.codingclass.edu.vn/#/form?page=31&mode=reset_pass&usingPublicSession=true&embed={\"token\":\"{{token}}\",\"account\":\"{{account}}\"}\n{\"token\":\"token\",\"account\":\"account\"}\n\"%7B%22token%22%3A%22{{token}}%22%2C%22account%22%3A%22{{account}}%22%7D\"',0),(15,0,'1',NULL,1622487621354,1722861321214,0,'ACTIVE_ACCOUNT_URL','https://fe.bombasticlearninghub.com/#/form?page=32&expired=true&mode=activate&usingPublicSession=true&embed=%7B%22token%22%3A%22{{token}}%22%2C%22account%22%3A%22{{account}}%22%7D',2,'https://obt.codingclass.edu.vn/#/form?page=32&mode=activate&usingPublicSession=true&embed=%7B%22token%22%3A%22{{token}}%22%2C%22account%22%3A%22{{account}}%22%7D',0),(16,0,'1',NULL,1623698991545,1623698991545,0,'DEFAULT_USERTYPE_ON_REGISTING','3',1,'DEFAULT_USERTYPE_ON_REGISTING',0),(59,0,'1',NULL,1683817765119,1683817765119,0,'MAIL_PER_MINUTE','30',1,'MAIL_PER_MINUTE',0);
/*!40000 ALTER TABLE `conf` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fileupload`
--

DROP TABLE IF EXISTS `fileupload`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fileupload` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `isDelete` tinyint(1) DEFAULT NULL,
  `createdBy` varchar(255) DEFAULT NULL,
  `deletedBy` varchar(255) DEFAULT NULL,
  `createdAt` bigint(20) DEFAULT NULL,
  `updatedAt` bigint(20) DEFAULT NULL,
  `deletedAt` bigint(20) DEFAULT NULL,
  `fileName` text,
  `serverFileDir` varchar(255) DEFAULT NULL,
  `serverFileName` varchar(255) DEFAULT NULL,
  `fileType` varchar(255) DEFAULT NULL,
  `size` double DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `field` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fileupload`
--

LOCK TABLES `fileupload` WRITE;
/*!40000 ALTER TABLE `fileupload` DISABLE KEYS */;
/*!40000 ALTER TABLE `fileupload` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `language`
--

DROP TABLE IF EXISTS `language`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `language` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `isDelete` tinyint(1) DEFAULT NULL,
  `createdBy` varchar(255) DEFAULT NULL,
  `deletedBy` varchar(255) DEFAULT NULL,
  `createdAt` bigint(20) DEFAULT NULL,
  `updatedAt` bigint(20) DEFAULT NULL,
  `deletedAt` bigint(20) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `flag` varchar(255) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `language`
--

LOCK TABLES `language` WRITE;
/*!40000 ALTER TABLE `language` DISABLE KEYS */;
INSERT INTO `language` VALUES (1,0,'1',NULL,1,1,0,'Việt Nam','','vi'),(2,1,'1',NULL,1,1,0,'English','','en'),(3,1,'1',NULL,1,1,0,'日本語','','jpn');
/*!40000 ALTER TABLE `language` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `logauthen`
--

DROP TABLE IF EXISTS `logauthen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `logauthen` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `isDelete` tinyint(1) DEFAULT NULL,
  `createdBy` varchar(255) DEFAULT NULL,
  `deletedBy` varchar(255) DEFAULT NULL,
  `createdAt` bigint(20) DEFAULT NULL,
  `updatedAt` bigint(20) DEFAULT NULL,
  `deletedAt` bigint(20) DEFAULT NULL,
  `authId` varchar(255) DEFAULT NULL,
  `ip` varchar(255) DEFAULT NULL,
  `authenType` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `logauthen`
--

LOCK TABLES `logauthen` WRITE;
/*!40000 ALTER TABLE `logauthen` DISABLE KEYS */;
/*!40000 ALTER TABLE `logauthen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `logcallapi`
--

DROP TABLE IF EXISTS `logcallapi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `logcallapi` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `isDelete` tinyint(1) DEFAULT NULL,
  `createdBy` varchar(255) DEFAULT NULL,
  `deletedBy` varchar(255) DEFAULT NULL,
  `createdAt` bigint(20) DEFAULT NULL,
  `updatedAt` bigint(20) DEFAULT NULL,
  `deletedAt` bigint(20) DEFAULT NULL,
  `requestUrl` varchar(255) DEFAULT NULL,
  `requestMethod` varchar(255) DEFAULT NULL,
  `requestHeader` longtext,
  `requestData` text,
  `responseStatusCode` double DEFAULT NULL,
  `responseMessage` text,
  `apiDescription` text,
  `ip` varchar(255) DEFAULT NULL,
  `takeTime` double DEFAULT NULL,
  `userId` varchar(255) DEFAULT NULL,
  `authId` varchar(255) DEFAULT NULL,
  `apiVersion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `logcallapi`
--

LOCK TABLES `logcallapi` WRITE;
/*!40000 ALTER TABLE `logcallapi` DISABLE KEYS */;
/*!40000 ALTER TABLE `logcallapi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `logsmsemail`
--

DROP TABLE IF EXISTS `logsmsemail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `logsmsemail` (
  `id` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `isDelete` tinyint(1) DEFAULT NULL,
  `createdBy` varchar(255) DEFAULT NULL,
  `deletedBy` varchar(255) DEFAULT NULL,
  `createdAt` bigint(20) DEFAULT NULL,
  `updatedAt` bigint(20) DEFAULT NULL,
  `deletedAt` bigint(20) DEFAULT NULL,
  `to` varchar(255) DEFAULT NULL,
  `content` longtext,
  `type` varchar(255) DEFAULT NULL,
  `isSuccess` tinyint(1) DEFAULT NULL,
  `quantity` double DEFAULT NULL,
  `subject` text,
  `responseInfo` longtext,
  `payload` longtext,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `logsmsemail`
--

LOCK TABLES `logsmsemail` WRITE;
/*!40000 ALTER TABLE `logsmsemail` DISABLE KEYS */;
/*!40000 ALTER TABLE `logsmsemail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu`
--

DROP TABLE IF EXISTS `menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `isDelete` tinyint(1) DEFAULT NULL,
  `createdBy` varchar(255) DEFAULT NULL,
  `deletedBy` varchar(255) DEFAULT NULL,
  `createdAt` bigint(20) DEFAULT NULL,
  `updatedAt` bigint(20) DEFAULT NULL,
  `deletedAt` bigint(20) DEFAULT NULL,
  `name` text,
  `url` text,
  `icon` varchar(255) DEFAULT NULL,
  `roles` longtext,
  `parent` double DEFAULT NULL,
  `isParent` tinyint(1) DEFAULT NULL,
  `orderNumber` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu`
--

LOCK TABLES `menu` WRITE;
/*!40000 ALTER TABLE `menu` DISABLE KEYS */;
INSERT INTO `menu` VALUES (1,0,'1',NULL,1548317005258,1719518343483,0,'Quản lý Menu','/list?page=1','tabler:menu-2','[1]',4,0,0),(2,0,'1',NULL,1548642293027,1719518383507,0,'Quản lý trang','/list?page=3','tabler:file','[1]',4,0,1),(4,0,'1',NULL,1548832390577,1719518307147,0,'Cấu hình hệ thống','','tabler:settings','[1,5]',0,1,0),(5,0,'1',NULL,1548834894694,1719518481517,0,'Thông tin cấu hình','/list?page=5','tabler:tool','[1]',4,0,2),(6,0,'1',NULL,1550731521385,1723383664852,0,'Quản lý người dùng','/list?page=10','icon icon-user','[1,2]',0,1,0),(7,0,'1',NULL,1550731547115,1723383526647,0,'Người dùng','/list?page=10','icon icon-user','[1]',6,0,0),(8,0,'1',NULL,1563164550969,1719518512755,0,'Quản lý quyền','/list?page=8','tabler:users','[1]',4,0,3),(9,0,'1',NULL,1563169760462,1630925941857,0,'Quản lý nhóm quyền','/list?page=13','fa fa-users','[1]',4,0,4),(10,0,'1',NULL,1563789841049,1630925967810,0,'Quản lý API','/list?page=18','fa fa-plug','[1]',4,0,5),(11,0,'1',NULL,1563869401678,1563869401678,0,'Token generator','/form?page=20&mode=create','fa fa-key','[1]',4,0,6),(12,0,'1',NULL,1564374122708,1678065737377,0,'Log call api','/list?page=21','fa fa-history','[1]',36,0,7),(13,0,'1',NULL,1575877090153,1678065726786,0,'Log Email','/list?page=25','fa fa-send','[1]',36,0,8),(14,0,'1',NULL,1620589034537,1678065712917,0,'Log SMS','/list?page=27','fa fa-envelope','[1]',36,0,9),(15,0,'1',NULL,1622490845980,1622490913945,0,'Quay lại đăng nhập','/login','fa fa-sign-in','[6]',0,1,0),(31,0,'1',NULL,1677181778377,1678065696751,0,'Log app noti','/list?page=53','fa fa-history','[1]',36,0,8),(36,0,'1',NULL,1678065674955,1678065674955,0,'Log','','fa fa-history','[1]',0,1,0),(59,0,'6',NULL,1721827474900,1721827474900,0,'Tạo token người dùng','/list?page=33','fa fa-key','[1,2]',4,0,0);
/*!40000 ALTER TABLE `menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notice`
--

DROP TABLE IF EXISTS `notice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notice` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `isDelete` tinyint(1) DEFAULT NULL,
  `createdBy` varchar(255) DEFAULT NULL,
  `deletedBy` varchar(255) DEFAULT NULL,
  `createdAt` bigint(20) DEFAULT NULL,
  `updatedAt` bigint(20) DEFAULT NULL,
  `deletedAt` bigint(20) DEFAULT NULL,
  `subject` text,
  `content` text,
  `seen` tinyint(1) DEFAULT NULL,
  `level` varchar(255) DEFAULT NULL,
  `openUrl` text,
  `expiredAt` double DEFAULT NULL,
  `read` tinyint(1) DEFAULT NULL,
  `payload` longtext,
  `user` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notice`
--

LOCK TABLES `notice` WRITE;
/*!40000 ALTER TABLE `notice` DISABLE KEYS */;
/*!40000 ALTER TABLE `notice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `page`
--

DROP TABLE IF EXISTS `page`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `page` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `isDelete` tinyint(1) DEFAULT NULL,
  `createdBy` varchar(255) DEFAULT NULL,
  `deletedBy` varchar(255) DEFAULT NULL,
  `createdAt` bigint(20) DEFAULT NULL,
  `updatedAt` bigint(20) DEFAULT NULL,
  `deletedAt` bigint(20) DEFAULT NULL,
  `name` text,
  `desc` text,
  `schema` longtext,
  `buttons` longtext,
  `additionalGrid` longtext,
  `read` varchar(255) DEFAULT NULL,
  `roles` longtext,
  `apis` longtext,
  `grid` longtext,
  `languages` longtext,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `page`
--

LOCK TABLES `page` WRITE;
/*!40000 ALTER TABLE `page` DISABLE KEYS */;
INSERT INTO `page` VALUES (1,0,'1',NULL,1548299785797,1723502115485,0,'Quản lý menu','Quản lý menu','[]','[{\"method\":\"POST\",\"name\":\"\",\"url\":\"#/form?page=2&mode=edit&id=$\",\"requestFields\":\"\",\"responseFields\":\"\",\"mode\":\"edit\",\"title\":\"Sửa    \",\"icon\":\"fa fa-pencil\",\"backOnDone\":true,\"api\":\"\",\"color\":\"warning\",\"type\":\"button\",\"action\":\"formModal\",\"redirect\":\"/form?page=2&mode=edit&id=?\",\"modalQuery\":\" {\\\"page\\\": 2, \\\"mode\\\": \\\"edit\\\", \\\"id\\\":#id#}\",\"roles\":[]},{\"method\":\"POST\",\"title\":\"Tạo mới\",\"color\":\"success\",\"mode\":\"create\",\"icon\":\"fa fa-plus\",\"backOnDone\":false,\"api\":\"update\",\"type\":\"submit\",\"redirect\":\"/form?page=2&mode=create\",\"url\":\"#/form?page=2&mode=create\",\"action\":\"formModal\",\"hideExpression\":\"\",\"modalQuery\":\"{\\\"page\\\":2,\\\"mode\\\":\\\"create\\\"}\"},{\"mode\":\"destroy\",\"title\":\"Xóa\",\"roles\":[],\"color\":\"danger\",\"outline\":false,\"icon\":\"tabler:trash\",\"column\":\"\",\"hideExpression\":\"\",\"action\":\"api\",\"reportName\":\"\",\"modalQuery\":\"\",\"url\":\"\",\"target\":\"_self\",\"api\":\"destroy\",\"apiData\":\"\",\"confirm\":\"Bạn có chắc chắn muốn xóa menu này?\",\"backOnDone\":false,\"backOnDoneHref\":\"\",\"embedUrl\":false,\"type\":\"button\",\"showOnTop\":false,\"showOnFormOnly\":false}]','{\"highlight\":true,\"highlightColor\":\"orange\",\"highlightExpression\":\"{\\\"this.isParent\\\":{\\\"=\\\":true}}\"}','find','[1]','[{\"method\":\"GET\",\"name\":\"find\",\"url\":\"/api/menu\",\"requestFields\":\"\",\"responseFields\":\"\",\"type\":\"find\",\"roles\":[1],\"options\":[]},{\"method\":\"POST\",\"name\":\"create\",\"url\":\"/api/partner\",\"requestFields\":\"\",\"responseFields\":\"\",\"type\":\"create\",\"roles\":[1]},{\"method\":\"PATCH\",\"name\":\"update\",\"url\":\"/api/partner\",\"requestFields\":\"\",\"responseFields\":\"\",\"type\":\"update\",\"roles\":[1]},{\"name\":\"destroy\",\"type\":\"update\",\"url\":\"/api/menu\",\"method\":\"DELETE\",\"roles\":[1]}]','[{\"name\":\"ID\",\"field\":\"id\",\"hideExpression\":\"\",\"roles\":[],\"type\":\"number\",\"enumable\":false,\"modelSelect\":false,\"arraySelect\":false,\"display\":\"progressbar\",\"filterable\":true,\"bindButton\":false,\"formatNumber\":false,\"reverseColor\":true,\"stringID\":false},{\"name\":\"Tên\",\"type\":\"number\",\"field\":\"name\",\"color\":\"string\",\"filterable\":true},{\"name\":\"Cấu trúc\",\"field\":\"isParent\",\"type\":\"boolean\",\"enumable\":true,\"items\":[{\"key\":\"Con\",\"value\":0},{\"key\":\"Cha\",\"value\":1}],\"modelSelect\":false,\"filterable\":true,\"bindButton\":false},{\"name\":\"Thứ tự menu\",\"field\":\"orderNumber\",\"type\":\"number\",\"filterable\":true,\"filterRange\":true},{\"name\":\"Menu cha\",\"field\":\"parent\",\"type\":\"number\",\"modelSelect\":true,\"modelSelectApi\":\"find\",\"modelSelectField\":\"id,name\",\"select\":\"name\",\"filterable\":true,\"hiddenWhere\":[{\"key\":\"isParent\",\"value\":\"1\"}]},{\"name\":\"Ngày tạo\",\"type\":\"date\",\"field\":\"createdAt\",\"color\":\"date\"},{\"name\":\"Ngày sửa\",\"type\":\"date\",\"field\":\"updatedAt\"}]','[]'),(2,0,'1',NULL,1548299799986,1723448708634,0,'Thông tin menu','Sửa thông tin menu','[{\"name\":\"Tên menu\",\"field\":\"name\",\"placeholder\":\"\",\"roles\":[],\"required\":true,\"requiredExpression\":\"\",\"disabled\":false,\"disabledExpression\":\"\",\"type\":\"string\",\"widget\":\"Text\",\"isArrayInput\":false,\"hideExpression\":\"\",\"default\":\"\",\"arrayInput\":false,\"regex\":\"\",\"errorOnRegexFail\":\"\"},{\"name\":\"Menu cha\",\"required\":false,\"field\":\"parent\",\"type\":\"number\",\"api\":\"find_parent\",\"modelSelectField\":\"id,name\",\"widget\":\"SingleModel\",\"hideExpression\":\"{\\\"this.isParent\\\":{\\\"=\\\":true}}\",\"requiredExpression\":\"\"},{\"name\":\"Là menu cha\",\"required\":false,\"field\":\"isParent\",\"type\":\"boolean\",\"modelSelectField\":\"id,name\",\"default\":\"0\",\"widget\":\"Checkbox\",\"items\":[{\"key\":\"Cha\",\"value\":1},{\"key\":\"Con\",\"value\":0}],\"hideExpression\":\"\",\"requiredExpression\":\"\"},{\"name\":\"Thứ tự menu\",\"field\":\"orderNumber\",\"placeholder\":\"\",\"roles\":[],\"required\":false,\"requiredExpression\":\"\",\"disabled\":false,\"disabledExpression\":\"\",\"type\":\"number\",\"widget\":\"Text\",\"isArrayInput\":false,\"hideExpression\":\"\",\"default\":\"0\",\"arrayInput\":false,\"min\":\"0\",\"max\":\"\",\"enableReadNumber\":true},{\"name\":\"Url\",\"required\":false,\"field\":\"url\",\"type\":\"string\",\"widget\":\"Text\"},{\"name\":\"Icon\",\"required\":false,\"field\":\"icon\",\"type\":\"string\",\"widget\":\"Text\"},{\"name\":\"Phân quyền\",\"required\":true,\"field\":\"roles\",\"items\":{\"type\":\"integer\"},\"type\":\"number\",\"api\":\"find_roles\",\"modelSelectField\":\"id,name\",\"widget\":\"ArrayModel\",\"modelSelectMultiple\":false}]','[{\"method\":\"POST\",\"title\":\"Tạo mới menu\",\"color\":\"primary\",\"mode\":\"create\",\"icon\":\"fa fa-check\",\"backOnDone\":true,\"api\":\"create\",\"action\":\"api\",\"embedUrl\":false,\"type\":\"submit\"},{\"method\":\"POST\",\"title\":\"Lưu thông tin menu\",\"color\":\"primary\",\"mode\":\"edit\",\"icon\":\"fa fa-check\",\"backOnDone\":false,\"api\":\"update\",\"action\":\"api\",\"embedUrl\":false,\"confirm\":\"\",\"type\":\"submit\"}]','{}','find','[1]','[{\"method\":\"GET\",\"name\":\"find_parent\",\"url\":\"/api/menu\",\"requestFields\":\"\",\"responseFields\":\"\",\"type\":\"find\",\"options\":[],\"roles\":[1],\"criterias\":[{\"key\":\"isParent\",\"value\":1}]},{\"method\":\"GET\",\"name\":\"find\",\"url\":\"/api/menu\",\"requestFields\":\"\",\"responseFields\":\"\",\"roles\":[1],\"options\":[]},{\"method\":\"POST\",\"name\":\"create\",\"url\":\"/api/menu\",\"requestFields\":\"\",\"responseFields\":\"\",\"type\":\"create\",\"roles\":[1],\"boolExpression\":\"\"},{\"method\":\"PATCH\",\"name\":\"update\",\"url\":\"/api/menu\",\"requestFields\":\"\",\"responseFields\":\"\",\"type\":\"update\",\"roles\":[1],\"boolExpression\":\"\"},{\"method\":\"GET\",\"name\":\"find_roles\",\"url\":\"/api/role\",\"requestFields\":\"\",\"responseFields\":\"\",\"type\":\"find\",\"roles\":[1]}]','[]','[]'),(3,0,'1',NULL,1548315723585,1723484931676,0,'Danh sách trang','Danh sách trang','[]','[{\"type\":\"submit\",\"title\":\"Tạo mới\",\"color\":\"success\",\"mode\":\"create\",\"icon\":\"fa fa-plus\",\"backOnDone\":true,\"api\":\"\",\"action\":\"url\",\"url\":\"#/pageEditor?mode=create\"},{\"type\":\"button\",\"title\":\"Sửa\",\"color\":\"warning\",\"mode\":\"edit\",\"icon\":\"fa fa-pencil\",\"backOnDone\":false,\"api\":\"\",\"action\":\"url\",\"url\":\"#/pageEditor?mode=edit&id=$\"},{\"mode\":\"delete\",\"title\":\"Xóa trang\",\"roles\":[1,2],\"color\":\"danger\",\"outline\":false,\"icon\":\"tabler:trash\",\"column\":\"\",\"hideExpression\":\"\",\"action\":\"api\",\"reportName\":\"\",\"modalQuery\":\"\",\"url\":\"\",\"target\":\"_self\",\"api\":\"destroy\",\"apiData\":\"\",\"confirm\":\"Bạn có muốn xóa trang này không? \",\"backOnDone\":false,\"backOnDoneHref\":\"\",\"embedUrl\":false,\"type\":\"button\",\"showOnTop\":false,\"showOnFormOnly\":false}]','{}','find','[1]','[{\"method\":\"GET\",\"name\":\"find\",\"url\":\"/api/page\",\"requestFields\":\"\",\"responseFields\":\"\",\"type\":\"find\",\"roles\":[1],\"restrictFields\":\"\"},{\"name\":\"destroy\",\"type\":\"update\",\"url\":\"/api/page\",\"description\":\"Xóa page\",\"method\":\"DELETE\"}]','[{\"name\":\"ID\",\"type\":\"number\",\"field\":\"id\",\"filterable\":true,\"display\":\"\",\"reverseColor\":false,\"bindButton\":false},{\"name\":\"Tên\",\"type\":\"string\",\"field\":\"name\",\"filterable\":true},{\"name\":\"Mô tả\",\"type\":\"string\",\"field\":\"desc\",\"filterable\":true,\"stringID\":false},{\"name\":\"Tạo lúc\",\"field\":\"createdAt\",\"type\":\"date\",\"filterable\":true,\"filterRange\":true}]','[]'),(4,0,'1',NULL,1548316430901,1570785206183,0,'Thông tin trang','Thông tin trang','[]',NULL,'{}','find','[1]','[{\"method\":\"GET\",\"name\":\"find\",\"url\":\"/api/page\",\"requestFields\":\"\",\"responseFields\":\"\",\"type\":\"find\",\"roles\":[1]},{\"method\":\"POST\",\"name\":\"create\",\"url\":\"/api/page\",\"requestFields\":\"\",\"responseFields\":\"\",\"type\":\"create\",\"roles\":[1]},{\"method\":\"PATCH\",\"name\":\"update\",\"url\":\"/api/page\",\"requestFields\":\"\",\"responseFields\":\"\",\"type\":\"update\",\"roles\":[1]},{\"method\":\"GET\",\"name\":\"find_role\",\"url\":\"/api/role\",\"requestFields\":\"\",\"responseFields\":\"\",\"type\":\"find\",\"roles\":[1]},{\"name\":\"find_lang\",\"type\":\"find\",\"url\":\"/api/language\",\"description\":\"lấy danh sách ngôn ngữ\",\"method\":\"GET\",\"options\":[{\"key\":\"isDelete\",\"value\":\"0\"}],\"roles\":[3]}]',NULL,'[]'),(5,0,'1',NULL,1548834763347,1674719835334,0,'Cấu hình hệ thống','Cấu hình hệ thống','[]','[{\"type\":\"button\",\"title\":\"Sửa\",\"color\":\"warning\",\"mode\":\"edit\",\"icon\":\"fa fa-pencil\",\"backOnDone\":false,\"api\":\"\",\"action\":\"formModal\",\"url\":\"#/form?page=7&mode=edit&id=$\",\"modalQuery\":\" {\\\"page\\\": 7, \\\"mode\\\": \\\"edit\\\", \\\"id\\\":#id#}\",\"roles\":[1]},{\"type\":\"submit\",\"title\":\"Tạo mới\",\"color\":\"success\",\"mode\":\"create\",\"icon\":\"fa fa-plus\",\"backOnDone\":false,\"api\":\"\",\"action\":\"formModal\",\"url\":\"#/form?page=7&mode=create\",\"roles\":[1],\"modalQuery\":\"{\\\"page\\\":7,\\\"mode\\\":\\\"create\\\"}\"},{\"mode\":\"refresh\",\"title\":\"Đồng bộ cache\",\"color\":\"warning\",\"icon\":\"fa fa-refresh\",\"action\":\"api\",\"api\":\"refreshConfig\",\"type\":\"submit\"},{\"mode\":\"reset\",\"title\":\"Khởi tạo lại cache\",\"roles\":[1],\"color\":\"danger\",\"icon\":\"fa fa-refresh\",\"action\":\"api\",\"api\":\"resetCache\",\"backOnDone\":false,\"type\":\"submit\"}]','{}','find','[1]','[{\"method\":\"GET\",\"name\":\"find\",\"url\":\"/api/conf\",\"requestFields\":\"\",\"responseFields\":\"\",\"type\":\"find\",\"roles\":[1]},{\"method\":\"POST\",\"name\":\"refreshConfig\",\"url\":\"/api/admin/refresh-conf\",\"requestFields\":\"\",\"responseFields\":\"\",\"type\":\"create\",\"roles\":[1]},{\"url\":\"/api/admin/reset-cache\",\"name\":\"resetCache\",\"type\":\"create\",\"method\":\"POST\",\"roles\":[1]},{\"name\":\"migrate\",\"type\":\"create\",\"url\":\"/api/migrate\",\"description\":\"migrate database\",\"method\":\"POST\",\"enableCaptcha\":false,\"roles\":[1]}]','[{\"name\":\"ID\",\"type\":\"number\",\"field\":\"id\",\"filterable\":true,\"enumable\":false},{\"name\":\"Khóa\",\"type\":\"string\",\"field\":\"key\",\"filterable\":true},{\"name\":\"Kiểu dữ liệu\",\"type\":\"number\",\"field\":\"type\",\"enumable\":true,\"items\":[{\"key\":\"Số\",\"value\":\"1\"},{\"key\":\"Chuỗi\",\"value\":\"2\"}],\"filterable\":true},{\"name\":\"Dùng Cho Front-end\",\"field\":\"forFe\",\"type\":\"boolean\",\"enumable\":true,\"items\":[{\"key\":\"Đúng\",\"value\":1},{\"key\":\"Sai\",\"value\":0}],\"filterable\":true},{\"name\":\"Giá trị\",\"type\":\"string\",\"field\":\"val\",\"filterable\":true},{\"name\":\"Mô tả\",\"type\":\"string\",\"field\":\"desc\",\"filterable\":true},{\"name\":\"Ngày tạo\",\"type\":\"date\",\"field\":\"createdAt\",\"filterable\":true,\"filterRange\":true},{\"name\":\"Ngày sửa\",\"type\":\"date\",\"field\":\"updatedAt\",\"filterable\":true}]','[]'),(6,0,'1',NULL,1548835552142,1563032655156,0,'Thông tin trang','Thông tin trang','[]',NULL,'{}','find','[1]','[{\"method\":\"GET\",\"name\":\"find\",\"url\":\"/api/page\",\"requestFields\":\"\",\"responseFields\":\"\",\"type\":\"find\",\"roles\":[1]},{\"method\":\"POST\",\"name\":\"create\",\"url\":\"/api/page\",\"requestFields\":\"\",\"responseFields\":\"\",\"type\":\"create\",\"roles\":[1]},{\"method\":\"PATCH\",\"name\":\"update\",\"url\":\"/api/page\",\"requestFields\":\"\",\"responseFields\":\"\",\"type\":\"update\",\"roles\":[1]}]',NULL,'[]'),(7,0,'1',NULL,1548835566573,1685668055904,0,'Thông tin cấu hình','Cấu hình hệ thống','[{\"name\":\"Khóa\",\"field\":\"key\",\"type\":\"string\",\"disabled\":true,\"roles\":[2],\"widget\":\"Text\",\"required\":true},{\"name\":\"Khóa\",\"required\":true,\"field\":\"key\",\"type\":\"string\",\"modelSelectField\":\"id,name\",\"widget\":\"Text\",\"roles\":[1]},{\"name\":\"Dùng cho Front-end\",\"field\":\"forFe\",\"required\":false,\"type\":\"boolean\",\"widget\":\"Checkbox\",\"default\":\"0\"},{\"name\":\"Kiểu dữ liệu\",\"required\":true,\"field\":\"type\",\"items\":[{\"key\":\"Số\",\"value\":\"1\"},{\"key\":\"Chuỗi\",\"value\":\"2\"}],\"type\":\"number\",\"modelSelectField\":\"id,name\",\"widget\":\"Enum\",\"roles\":[1]},{\"field\":\"type\",\"name\":\"Kiểu dữ liệu\",\"required\":true,\"disabled\":true,\"roles\":[2],\"type\":\"number\",\"widget\":\"Enum\",\"items\":[{\"key\":\"Số\",\"value\":\"1\"},{\"key\":\"Chuỗi\",\"value\":\"2\"}]},{\"name\":\"Giá trị\",\"required\":true,\"field\":\"val\",\"type\":\"string\",\"modelSelectField\":\"id,name\",\"widget\":\"TextArea\"},{\"name\":\"Mô tả\",\"required\":false,\"field\":\"desc\",\"type\":\"string\",\"modelSelectField\":\"id,name\",\"widget\":\"TextArea\"}]','[{\"type\":\"submit\",\"title\":\"Tạo mới\",\"color\":\"primary\",\"mode\":\"create\",\"icon\":\"fa fa-check\",\"backOnDone\":true,\"api\":\"create\",\"action\":\"api\",\"url\":\"\",\"embedUrl\":false},{\"type\":\"submit\",\"title\":\"Sửa\",\"color\":\"primary\",\"mode\":\"edit\",\"icon\":\"fa fa-save\",\"backOnDone\":false,\"api\":\"update\",\"action\":\"api\",\"url\":\"\"}]','{}','find','[1]','[{\"method\":\"GET\",\"name\":\"find\",\"url\":\"/api/conf\",\"requestFields\":\"\",\"responseFields\":\"\",\"type\":\"find\",\"roles\":[1]},{\"method\":\"POST\",\"name\":\"create\",\"url\":\"/api/conf\",\"requestFields\":\"\",\"responseFields\":\"\",\"type\":\"create\",\"roles\":[1]},{\"method\":\"PATCH\",\"name\":\"update\",\"url\":\"/api/conf\",\"requestFields\":\"\",\"responseFields\":\"\",\"type\":\"update\",\"roles\":[1]}]','[{\"name\":\"ID\",\"type\":\"number\",\"field\":\"id\",\"filterable\":true,\"enumable\":false},{\"name\":\"Khóa\",\"type\":\"string\",\"field\":\"key\",\"filterable\":true},{\"name\":\"Giá trị\",\"type\":\"string\",\"field\":\"value\",\"filterable\":true},{\"name\":\"Mô tả\",\"type\":\"string\",\"field\":\"description\",\"filterable\":true},{\"name\":\"Ngày tạo\",\"type\":\"date\",\"field\":\"createdAt\"},{\"name\":\"Ngày sửa\",\"type\":\"date\",\"field\":\"updatedAt\"}]','[]'),(8,0,'1',NULL,1550730566915,1715313742568,0,'Quản lý quyền','','[]','[{\"type\":\"submit\",\"title\":\"Thêm quyền mới\",\"color\":\"success\",\"mode\":\"create\",\"icon\":\"fa fa-plus\",\"backOnDone\":false,\"api\":\"\",\"action\":\"url\",\"url\":\"#/form?page=9&mode=create\"},{\"type\":\"button\",\"title\":\"Edit\",\"color\":\"warning\",\"mode\":\"edit\",\"icon\":\"fa fa-pencil\",\"backOnDone\":false,\"api\":\"\",\"action\":\"formModal\",\"url\":\"#/form?page=9&mode=edit&id=$\",\"modalQuery\":\" {\\\"page\\\": 9, \\\"mode\\\": \\\"edit\\\", \\\"id\\\":#id#}\"}]','{}','find','[1]','[{\"method\":\"GET\",\"name\":\"find\",\"url\":\"/api/role\",\"requestFields\":\"\",\"responseFields\":\"\",\"type\":\"find\",\"roles\":[1]},{\"name\":\"find_user\",\"type\":\"find\",\"url\":\"/api/user\",\"roles\":[1],\"method\":\"GET\"}]','[{\"name\":\"ID\",\"type\":\"number\",\"field\":\"id\",\"filterable\":true},{\"name\":\"Tên\",\"type\":\"string\",\"field\":\"name\",\"enumable\":false,\"filterable\":true,\"bindButton\":false},{\"name\":\"Mô tả\",\"field\":\"description\",\"type\":\"string\",\"enumable\":false,\"filterable\":true},{\"name\":\"Thời gian tạo\",\"field\":\"createdAt\",\"type\":\"date\",\"filterable\":true,\"filterRange\":true},{\"name\":\"Người tạo\",\"field\":\"createdBy\",\"type\":\"number\",\"modelSelect\":true,\"modelSelectApi\":\"find_user\",\"filterable\":false,\"filterRange\":false}]','[]'),(9,0,'1',NULL,1550730623386,1563864789730,0,'Chi tiết quyền','Chi tiết quyền','[{\"name\":\"Tên\",\"required\":true,\"field\":\"name\",\"type\":\"string\",\"modelSelectField\":\"id,name\",\"widget\":\"Text\"},{\"name\":\"Mô tả \",\"field\":\"description\",\"type\":\"string\",\"required\":false,\"widget\":\"TextArea\"}]','[{\"type\":\"submit\",\"title\":\"Tạo mới\",\"color\":\"primary\",\"mode\":\"create\",\"icon\":\"fa fa-check\",\"backOnDone\":true,\"api\":\"create\",\"action\":\"api\",\"url\":\"\",\"embedUrl\":false,\"roles\":[1]},{\"type\":\"button\",\"title\":\"Lưu thông tin\",\"color\":\"primary\",\"mode\":\"edit\",\"icon\":\"fa fa-check\",\"backOnDone\":false,\"api\":\"update\",\"action\":\"api\",\"url\":\"\",\"embedUrl\":false,\"roles\":[1]}]','{}','find','[1]','[{\"method\":\"GET\",\"name\":\"find\",\"url\":\"/api/role\",\"requestFields\":\"\",\"responseFields\":\"\",\"type\":\"find\",\"roles\":[1]},{\"method\":\"POST\",\"name\":\"create\",\"url\":\"/api/role\",\"requestFields\":\"\",\"responseFields\":\"\",\"type\":\"create\",\"roles\":[1]},{\"method\":\"PATCH\",\"name\":\"update\",\"url\":\"/api/role\",\"requestFields\":\"\",\"responseFields\":\"\",\"type\":\"update\",\"roles\":[1]}]',NULL,'[]'),(10,0,'1',NULL,1550731284833,1723384129120,0,'Users','Danh sách người dùng','[]','[{\"type\":\"submit\",\"title\":\"Tạo mới\",\"color\":\"success\",\"mode\":\"createeee\",\"icon\":\"fa fa-plus\",\"backOnDone\":false,\"api\":\"\",\"action\":\"formModal\",\"url\":\"#/form?page=15&mode=create\",\"modalQuery\":\"{\\\"page\\\":15,\\\"mode\\\":\\\"create\\\"}\"},{\"type\":\"button\",\"title\":\"Cập nhật\",\"color\":\"warning\",\"mode\":\"edit\",\"icon\":\"fa fa-pencil\",\"backOnDone\":false,\"api\":\"\",\"action\":\"formModal\",\"url\":\"#/form?page=11&mode=edit&id=$\",\"modalQuery\":\"{\\\"page\\\": 11, \\\"mode\\\": \\\"edit\\\", \\\"id\\\":#id#}\"},{\"mode\":\"change_pass\",\"title\":\"Đổi MK\",\"color\":\"success\",\"icon\":\"fa fa-exchange\",\"action\":\"formModal\",\"modalQuery\":\"{\\\"page\\\":12,\\\"mode\\\":\\\"create\\\",\\\"embed\\\":\\\"{\\\\\\\"userId\\\\\\\":#id#}\\\"}\",\"type\":\"button\",\"embedUrl\":false,\"hideExpression\":\"\",\"outline\":true},{\"mode\":\"account\",\"title\":\"DS Tài khoản.    \",\"roles\":[1,2],\"color\":\"primary\",\"icon\":\"fa fa-user\",\"action\":\"listModal\",\"modalQuery\":\"{\\\"page\\\": 17,\\\"filter\\\":\\\"{\\\\\\\"user\\\\\\\":#id#,\\\\\\\"isDelete\\\\\\\":false}\\\"}\",\"type\":\"button\",\"url\":\"#/list?page=17&filter=%7B%22user%22%3A#id#%7D\",\"hideExpression\":\"\",\"embedUrl\":false},{\"type\":\"switch\",\"mode\":\"gender\",\"title\":\"gender\",\"color\":\"primary\",\"action\":\"\",\"showOnFormOnly\":false,\"showOnTop\":false}]','{}','find','[1]','[{\"method\":\"GET\",\"name\":\"find\",\"url\":\"/api/user/get-allow-adminpage-user\",\"requestFields\":\"\",\"responseFields\":\"\",\"type\":\"find\",\"roles\":[3],\"options\":[{\"key\":\"isDelete\",\"value\":\"0\"}]},{\"name\":\"export\",\"type\":\"find\",\"url\":\"/api/user\",\"method\":\"GET\",\"downloadReport\":\"userReport\",\"responseFields\":\"id,name,phone,email,identification,gender,address,point,username,role,group,source,partner\",\"roles\":[1]},{\"name\":\"find_usertype\",\"type\":\"find\",\"url\":\"/api/user/get-allow-user-type-only-adminpage-user\",\"roles\":[3],\"method\":\"GET\"},{\"name\":\"find_user\",\"type\":\"create\",\"url\":\"/api/user\",\"roles\":[1,2],\"method\":\"POST\"},{\"name\":\"find_partner\",\"type\":\"find\",\"url\":\"/api/partner\",\"description\":\"Lấy thông tin đối tác \",\"method\":\"GET\",\"roles\":[1,2]}]','[{\"name\":\"ID\",\"type\":\"number\",\"field\":\"id\",\"filterable\":true,\"bindButton\":false},{\"name\":\"Full name\",\"type\":\"string\",\"field\":\"name\",\"enumable\":false,\"filterable\":true},{\"name\":\"Phone number\",\"type\":\"number\",\"field\":\"phone\",\"enumable\":false,\"filterable\":true,\"formatNumber\":true},{\"name\":\"Email\",\"field\":\"email\",\"filterable\":true},{\"name\":\"Gender\",\"type\":\"string\",\"field\":\"gender\",\"enumable\":true,\"items\":[{\"key\":\"Trai\",\"value\":\"male\"},{\"key\":\"Gái\",\"value\":\"female\"},{\"key\":\"Khác\",\"value\":\"other\"}],\"filterable\":true,\"roles\":[1]},{\"name\":\"Grant type\",\"type\":\"number\",\"field\":\"userType\",\"enumable\":false,\"items\":[],\"filterable\":true,\"modelSelect\":true,\"modelSelectApi\":\"find_usertype\",\"modelSelectField\":\"id,name$$Tên\",\"select\":\"name\",\"roles\":[2,1]},{\"name\":\"Block status\",\"field\":\"locked\",\"type\":\"boolean\",\"enumable\":true,\"items\":[{\"key\":\"Locked\",\"value\":1},{\"key\":\"Active\",\"value\":0}],\"filterable\":false},{\"name\":\"Ngôn ngữ\",\"field\":\"locale\",\"roles\":[1],\"type\":\"string\",\"filterable\":true,\"bindButton\":false}]','[1]'),(11,0,'1',NULL,1550732188955,1723447924167,0,'Cập nhật thông tin người dùng','Cập nhật thông tin người dùng','[{\"name\":\"Fullname\",\"required\":true,\"field\":\"name\",\"type\":\"string\",\"modelSelectField\":\"id,name\",\"widget\":\"Text\",\"roles\":[]},{\"name\":\"Gender\",\"required\":false,\"field\":\"gender\",\"items\":[{\"key\":\"Male\",\"value\":\"male\"},{\"key\":\"Female\",\"value\":\"female\"},{\"key\":\"Other\",\"value\":\"other\"}],\"type\":\"number\",\"modelSelectField\":\"id,name\",\"widget\":\"Enum\",\"roles\":[1],\"requiredExpression\":\"\",\"hideExpression\":\"{\\\"this.gender\\\":{\\\"=\\\":\\\"male\\\"}}\"},{\"field\":\"phone\",\"name\":\"Phone number\",\"type\":\"string\",\"widget\":\"Text\",\"required\":false,\"regex\":\"^(09|08|07|03|05)\\\\d{8}$|^02\\\\d{9}$|^\\\\+\\\\d{1,3}\\\\d{9,10}|^$\",\"errorOnRegexFail\":\"hint: 0912345678 or +84123456789\"},{\"name\":\"Email\",\"required\":true,\"field\":\"email\",\"type\":\"string\",\"modelSelectField\":\"id,name\",\"widget\":\"Text\",\"regex\":\"(^$|^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\\\.(?:[a-zA-Z]{2}|com|org|net|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum)$)\",\"errorOnRegexFail\":\"is invalid!\"},{\"name\":\"Descripton\",\"required\":false,\"field\":\"descripton\",\"type\":\"string\",\"modelSelectField\":\"id,name\",\"widget\":\"TextArea\"},{\"name\":\"Nhóm quyền\",\"required\":true,\"field\":\"userType\",\"type\":\"number\",\"api\":\"find_user_type\",\"modelSelectField\":\"name,description\",\"widget\":\"SingleModel\",\"modelSelectMultiple\":false,\"roles\":[2,1],\"showWithId\":true},{\"name\":\"Partner\",\"field\":\"partner\",\"roles\":[2,1],\"required\":false,\"hideExpression\":\"{\\\"this.userType\\\":{\\\"nin\\\":[3,4]}}\",\"type\":\"number\",\"widget\":\"SingleModel\",\"api\":\"fimd_partner\",\"modelSelectField\":\"id,name\",\"select\":\"name\",\"disabled\":false},{\"name\":\"Quyền thêm\",\"required\":false,\"field\":\"roleId\",\"type\":\"number\",\"api\":\"find_role\",\"modelSelectField\":\"id,name\",\"widget\":\"ArrayModel\",\"roles\":[1],\"modelSelectMultiple\":true},{\"name\":\"Khóa người dùng\",\"required\":false,\"field\":\"locked\",\"type\":\"boolean\",\"api\":\"find_source\",\"modelSelectField\":\"id,name\",\"widget\":\"Checkbox\"}]','[{\"type\":\"submit\",\"title\":\"Create new\",\"color\":\"primary\",\"mode\":\"create\",\"icon\":\"fa fa-check\",\"backOnDone\":true,\"api\":\"create_user\",\"action\":\"api\",\"url\":\"\",\"embedUrl\":false},{\"type\":\"submit\",\"title\":\"Save\",\"color\":\"success\",\"mode\":\"edit\",\"icon\":\"fa fa-plus\",\"backOnDone\":false,\"api\":\"update_user\",\"action\":\"api\",\"url\":\"\",\"embedUrl\":false}]','{}','find','[1,2]','[{\"method\":\"GET\",\"name\":\"find\",\"url\":\"/api/user/get-allow-adminpage-user\",\"requestFields\":\"\",\"responseFields\":\"\",\"type\":\"find\",\"roles\":[3]},{\"method\":\"GET\",\"name\":\"find_role\",\"url\":\"/api/user/get-allow-role\",\"requestFields\":\"\",\"responseFields\":\"\",\"type\":\"find\",\"roles\":[3]},{\"name\":\"find_user_type\",\"type\":\"find\",\"url\":\"/api/user/get-allow-user-type-only-adminpage-user\",\"roles\":[3],\"method\":\"GET\"},{\"method\":\"PUT\",\"name\":\"update_user\",\"url\":\"/api/user/update-info\",\"requestFields\":\"\",\"responseFields\":\"\",\"type\":\"update\",\"roles\":[1,2]},{\"method\":\"POST\",\"name\":\"create_user\",\"url\":\"/api/user/add-new\",\"requestFields\":\"\",\"responseFields\":\"\",\"type\":\"create\",\"roles\":[1,2]},{\"name\":\"fimd_partner\",\"type\":\"find\",\"url\":\"/api/partner\",\"description\":\"lấy danh sách đối tác \",\"method\":\"GET\",\"responseFields\":\"\",\"roles\":[1,2]}]',NULL,'[]'),(12,0,'1',NULL,1550734369537,1723096681475,0,'Đổi mật khẩu','','[{\"name\":\"New password\",\"required\":true,\"field\":\"newPassword\",\"type\":\"string\",\"modelSelectField\":\"id,name\",\"widget\":\"Password\"},{\"name\":\"Retype new password\",\"field\":\"confirmPassword\",\"type\":\"string\",\"widget\":\"Password\",\"required\":true}]','[{\"type\":\"submit\",\"title\":\"Change password\",\"color\":\"primary\",\"mode\":\"create\",\"icon\":\"fa fa-exchange\",\"backOnDone\":false,\"api\":\"change_password\",\"action\":\"api\",\"url\":\"\",\"embedUrl\":true}]','{}','','[1,2]','[{\"method\":\"POST\",\"name\":\"change_password\",\"url\":\"/api/user/change-password-of-others\",\"requestFields\":\"\",\"responseFields\":\"\",\"type\":\"create\",\"roles\":[1,2]},{\"name\":\"find_auth\",\"type\":\"find\",\"url\":\"/api/auth\",\"roles\":[1,2],\"options\":[{\"key\":\"isDelete\",\"value\":\"0\"}],\"responseFields\":\"key,type\"}]',NULL,'[]'),(13,0,'1',NULL,1563164050519,1709016117385,0,'Quản lý nhóm quyền','Quản lý nhóm quyền','[]','[{\"mode\":\"edit\",\"title\":\"Sửa\",\"color\":\"warning\",\"icon\":\"fa fa-pencil\",\"action\":\"formModal\",\"modalQuery\":\" {\\\"page\\\": 14, \\\"mode\\\": \\\"edit\\\", \\\"id\\\":#id#}\",\"type\":\"button\"},{\"mode\":\"create\",\"title\":\"Tạo nhóm quyền mới\",\"color\":\"success\",\"icon\":\"fa fa-plus\",\"action\":\"url\",\"backOnDone\":true,\"url\":\"#/form?page=14&mode=create\",\"type\":\"submit\"}]','{}','find','[1]','[{\"name\":\"find\",\"type\":\"update\",\"url\":\"/api/userType\",\"roles\":[1],\"method\":\"GET\",\"options\":[{\"key\":\"isDelete\",\"value\":\"0\"}]},{\"name\":\"find_user\",\"type\":\"find\",\"url\":\"/api/user/get-allow-user\",\"method\":\"GET\",\"roles\":[2,1]},{\"name\":\"find_role\",\"type\":\"find\",\"url\":\"/api/role\",\"roles\":[1],\"method\":\"GET\"},{\"name\":\"find_user_type\",\"type\":\"find\",\"url\":\"/api/userType\",\"description\":\"Lấy danh sách các kiểu người dùng \",\"method\":\"GET\",\"roles\":[1,2]}]','[{\"name\":\"ID\",\"field\":\"id\",\"type\":\"number\",\"filterable\":true},{\"name\":\"Tên nhóm quyền demo\",\"field\":\"name\",\"type\":\"string\",\"filterable\":true},{\"name\":\"Mô tả nhóm quyền\",\"field\":\"description\",\"type\":\"string\",\"filterable\":true},{\"name\":\"Nhóm quyền mặc định cho tài khoản tạo dưới quyền\",\"field\":\"defaultGrantUserType\",\"type\":\"number\",\"modelSelect\":true,\"modelSelectApi\":\"find_user_type\",\"modelSelectField\":\"id,name$$Tên nhóm quyền\",\"filterable\":true},{\"field\":\"ruleIgnoreRole\",\"name\":\"Những role bị hạn chế\",\"type\":\"number\",\"modelSelect\":false,\"filterable\":true,\"modelSelectApi\":\"find_role\",\"enumable\":false,\"arraySelect\":true,\"modelSelectField\":\"id,name\",\"select\":\"name\",\"filterRange\":false},{\"field\":\"ruleOnlyViewCreatedBy\",\"name\":\"Chỉ được phép thấy người dùng cho chính mình tạo\",\"enumable\":true,\"items\":[{\"key\":\"Sai\",\"value\":0},{\"key\":\"Đúng\",\"value\":1}],\"type\":\"boolean\",\"filterable\":true,\"bindButton\":false},{\"name\":\"Những nhóm quyền được phép nhìn thấy\",\"field\":\"ruleViewUserType\",\"type\":\"number\",\"modelSelect\":false,\"modelSelectApi\":\"find_user_type\",\"filterable\":true,\"arraySelect\":true,\"modelSelectField\":\"id,name\",\"select\":\"name\"},{\"field\":\"defaultRole\",\"name\":\"Quyền mặc định\",\"type\":\"number\",\"modelSelect\":false,\"modelSelectApi\":\"find_role\",\"filterable\":true,\"arraySelect\":true,\"modelSelectField\":\"id,name\",\"select\":\"name\"},{\"name\":\"Ngày tạo\",\"field\":\"createdAt\",\"type\":\"date\",\"filterable\":true,\"filterRange\":true},{\"name\":\"Người tạo\",\"field\":\"createdBy\",\"type\":\"string\",\"modelSelect\":true,\"modelSelectApi\":\"find_user\",\"modelSelectField\":\"id,name\",\"select\":\"name\"}]','[]'),(14,0,'1',NULL,1563169145693,1586772934439,0,'Chi tiết nhóm quyền','Chi tiết nhóm quyền','[{\"name\":\"Tên\",\"required\":true,\"field\":\"name\",\"type\":\"string\",\"modelSelectField\":\"id,name\",\"widget\":\"Text\"},{\"name\":\"Mô tả \",\"field\":\"description\",\"type\":\"string\",\"required\":false,\"widget\":\"TextArea\"},{\"field\":\"defaultGrantUserType\",\"name\":\"Nhóm quyền phân mặc định cho tài khoản được tạo\",\"type\":\"number\",\"widget\":\"SingleModel\",\"modelSelectField\":\"id,name$$Tên nhóm quyền\",\"api\":\"find\"},{\"field\":\"ruleIgnoreRole\",\"type\":\"number\",\"widget\":\"ArrayModel\",\"modelSelectMultiple\":true,\"required\":false,\"api\":\"find_role\",\"name\":\"Những role bị hạn chế\",\"modelSelectField\":\"id,name,description\"},{\"field\":\"ruleOnlyViewCreatedBy\",\"name\":\"Chỉ được phép thấy những người dùng do chính mình tạo\",\"type\":\"boolean\",\"required\":false,\"widget\":\"Checkbox\",\"disabled\":false},{\"field\":\"ruleViewUserType\",\"name\":\"Những nhóm quyền được phép nhìn thấy\",\"type\":\"number\",\"required\":false,\"widget\":\"ArrayModel\",\"modelSelectMultiple\":true,\"api\":\"find\",\"modelSelectField\":\"id,name\"},{\"field\":\"defaultRole\",\"name\":\"Các quyền mặc định trong nhóm quyền\",\"type\":\"number\",\"required\":true,\"widget\":\"ArrayModel\",\"modelSelectMultiple\":true,\"api\":\"find_role\",\"modelSelectField\":\"id,name,description\"}]','[{\"type\":\"submit\",\"title\":\"Tạo mới\",\"color\":\"primary\",\"mode\":\"create\",\"icon\":\"fa fa-check\",\"backOnDone\":true,\"api\":\"create\",\"action\":\"api\",\"url\":\"\",\"embedUrl\":false,\"roles\":[1]},{\"type\":\"button\",\"title\":\"Lưu thông tin\",\"color\":\"primary\",\"mode\":\"edit\",\"icon\":\"fa fa-check\",\"backOnDone\":false,\"api\":\"update\",\"action\":\"api\",\"url\":\"\",\"embedUrl\":false,\"roles\":[1]}]','{}','find','[1]','[{\"method\":\"GET\",\"name\":\"find\",\"url\":\"/api/userType\",\"requestFields\":\"\",\"responseFields\":\"\",\"type\":\"find\",\"roles\":[1,2]},{\"method\":\"POST\",\"name\":\"create\",\"url\":\"/api/userType\",\"requestFields\":\"\",\"responseFields\":\"\",\"type\":\"create\",\"roles\":[1]},{\"method\":\"PATCH\",\"name\":\"update\",\"url\":\"/api/userType\",\"requestFields\":\"\",\"responseFields\":\"\",\"type\":\"update\",\"roles\":[1]},{\"name\":\"find_role\",\"type\":\"find\",\"url\":\"/api/role\",\"roles\":[1],\"options\":[],\"method\":\"GET\"}]',NULL,'[]'),(15,0,'1',NULL,1563273167312,1723447771661,0,'Create new user','Thông tin tạo mới người dùng','[{\"name\":\"Account name\",\"field\":\"account\",\"type\":\"string\",\"required\":true,\"widget\":\"Text\"},{\"name\":\"Password (At least 6 characters include both number and latin character)\",\"field\":\"password\",\"type\":\"string\",\"widget\":\"Password\",\"required\":true},{\"name\":\"Fullname\",\"required\":true,\"field\":\"name\",\"type\":\"string\",\"modelSelectField\":\"id,name\",\"widget\":\"Text\",\"roles\":[]},{\"name\":\"Gender\",\"required\":false,\"field\":\"gender\",\"items\":[{\"key\":\"Male\",\"value\":\"male\"},{\"key\":\"Female\",\"value\":\"female\"},{\"key\":\"Other\",\"value\":\"other\"}],\"type\":\"number\",\"modelSelectField\":\"id,name\",\"widget\":\"Enum\",\"default\":\"male\",\"roles\":[1]},{\"name\":\"Phone number\",\"field\":\"phone\",\"placeholder\":\"\",\"roles\":[],\"required\":false,\"requiredExpression\":\"\",\"disabled\":false,\"disabledExpression\":\"\",\"type\":\"string\",\"widget\":\"Text\",\"isArrayInput\":false,\"hideExpression\":\"\",\"default\":\"\",\"regex\":\"^(09|08|07|03|05)\\\\d{8}$|^02\\\\d{9}$|^\\\\+\\\\d{1,3}\\\\d{9,10}|^$\",\"errorOnRegexFail\":\"hint: 0912345678 or +84123456789\"},{\"name\":\"Email\",\"required\":true,\"field\":\"email\",\"type\":\"string\",\"modelSelectField\":\"id,name\",\"widget\":\"Text\",\"regex\":\"(^$|^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\\\.(?:[a-zA-Z]{2}|com|org|net|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum)$)\",\"errorOnRegexFail\":\"is invalid!\"},{\"name\":\"Description\",\"required\":false,\"field\":\"descripton\",\"type\":\"string\",\"modelSelectField\":\"id,name\",\"widget\":\"TextArea\"},{\"name\":\"Nhóm quyền\",\"required\":true,\"field\":\"userType\",\"type\":\"number\",\"api\":\"find_user_type\",\"modelSelectField\":\"id,name,description\",\"widget\":\"SingleModel\",\"modelSelectMultiple\":false,\"roles\":[1,2]},{\"name\":\"Partner\",\"field\":\"partner\",\"roles\":[2,1],\"requiredExpression\":\"\",\"hideExpression\":\"{\\\"this.userType\\\":{\\\"nin\\\":[3,4]}}\",\"required\":false,\"type\":\"number\",\"widget\":\"SingleModel\",\"api\":\"find_partner\",\"modelSelectField\":\"id,name\"},{\"name\":\"Quyền thêm\",\"required\":false,\"field\":\"roleId\",\"type\":\"number\",\"api\":\"find_role\",\"modelSelectField\":\"id,name\",\"widget\":\"ArrayModel\",\"roles\":[1],\"modelSelectMultiple\":true},{\"name\":\"Block user\",\"required\":false,\"field\":\"locked\",\"type\":\"boolean\",\"api\":\"find_source\",\"modelSelectField\":\"id,name\",\"widget\":\"Checkbox\"}]','[{\"type\":\"submit\",\"title\":\"Tạo người dùng mới\",\"color\":\"primary\",\"mode\":\"create\",\"icon\":\"fa fa-check\",\"backOnDone\":true,\"api\":\"create_user\",\"action\":\"api\",\"url\":\"\",\"embedUrl\":false},{\"type\":\"submit\",\"title\":\"Lưu thông tin người dùng\",\"color\":\"primary\",\"mode\":\"edit\",\"icon\":\"fa fa-check\",\"backOnDone\":false,\"api\":\"update_user\",\"action\":\"api\",\"url\":\"\",\"embedUrl\":false}]','{}','find','[1,2]','[{\"method\":\"GET\",\"name\":\"find\",\"url\":\"/api/user/get-allow-adminpage-user\",\"requestFields\":\"\",\"responseFields\":\"\",\"type\":\"find\",\"roles\":[3]},{\"method\":\"GET\",\"name\":\"find_role\",\"url\":\"/api/user/get-allow-role\",\"requestFields\":\"\",\"responseFields\":\"\",\"type\":\"find\",\"roles\":[3]},{\"name\":\"find_user_type\",\"type\":\"find\",\"url\":\"/api/user/get-allow-user-type-only-adminpage-user\",\"roles\":[3],\"method\":\"GET\"},{\"method\":\"POST\",\"name\":\"update_user\",\"url\":\"/api/user/update-info\",\"requestFields\":\"\",\"responseFields\":\"\",\"type\":\"update\",\"roles\":[1,2]},{\"method\":\"POST\",\"name\":\"create_user\",\"url\":\"/api/user/add-new\",\"requestFields\":\"\",\"responseFields\":\"\",\"type\":\"create\",\"roles\":[1,2]},{\"name\":\"find_partner\",\"type\":\"find\",\"url\":\"/api/partner\",\"description\":\"lấy danh sách đối tác \",\"method\":\"GET\",\"roles\":[2,1]}]','[]','[]'),(16,0,'1',NULL,1552722078556,1723447974277,0,'Thông tin người dùng','Thông tin cá nhân người đang đăng nhập','[{\"name\":\"Mã số tài khoản\",\"field\":\"id\",\"required\":false,\"disabled\":true,\"type\":\"number\",\"widget\":\"Text\"},{\"name\":\"Họ và tên\",\"field\":\"name\",\"type\":\"string\",\"widget\":\"Text\",\"pageId\":43},{\"name\":\"Giới tính\",\"field\":\"gender\",\"required\":false,\"disabled\":false,\"type\":\"string\",\"widget\":\"Enum\",\"items\":[{\"key\":\"Nam\",\"value\":\"male\"},{\"key\":\"Nữ\",\"value\":\"female\"},{\"key\":\"Khác\",\"value\":\"other\"}],\"default\":\"other\",\"roles\":[1]},{\"name\":\"Số điện thoại\",\"field\":\"phone\",\"type\":\"string\",\"widget\":\"Text\",\"disabled\":false,\"pageId\":43,\"required\":false,\"regex\":\"^(09|08|07|03|05)\\\\d{8}$|^02\\\\d{9}$|^\\\\+\\\\d{1,3}\\\\d{9,10}|^$\",\"errorOnRegexFail\":\"hint: 0912345678 or +84123456789\"},{\"name\":\"Email\",\"field\":\"email\",\"type\":\"string\",\"widget\":\"Text\",\"pageId\":43,\"required\":true,\"disabled\":true,\"regex\":\"(^$|^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\\\.(?:[a-zA-Z]{2}|com|org|net|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum)$)\",\"errorOnRegexFail\":\"is invalid!\"},{\"name\":\"Mô tả\",\"field\":\"description\",\"placeholder\":\"Giới thiệu bản t hân\",\"type\":\"string\",\"widget\":\"TextArea\"}]','[{\"mode\":\"edit\",\"title\":\"Update\",\"roles\":[3],\"color\":\"success\",\"icon\":\"fa fa-check\",\"action\":\"api\",\"api\":\"update\",\"type\":\"submit\"}]','{}','find','[3]','[{\"name\":\"find\",\"type\":\"find\",\"url\":\"/api/user\",\"options\":[{\"key\":\"id\",\"value\":\"--id\"}],\"method\":\"GET\",\"roles\":[3]},{\"name\":\"update\",\"type\":\"update\",\"url\":\"/api/user\",\"method\":\"PATCH\",\"options\":[],\"requestFields\":\"name,phone,gender,description\",\"roles\":[3],\"criterias\":[{\"key\":\"id\",\"value\":\"--id\"}],\"restrictFields\":\"email,money\"},{\"name\":\"change-password\",\"type\":\"create\",\"url\":\"/api/auth/change-password\",\"method\":\"POST\",\"roles\":[5,3]},{\"name\":\"logout\",\"type\":\"create\",\"url\":\"/api/auth/logout\",\"roles\":[3],\"method\":\"POST\"},{\"name\":\"refresh-token\",\"type\":\"create\",\"url\":\"/api/auth/sign-in/refresh-token\",\"roles\":[3],\"method\":\"POST\"}]',NULL,'[]'),(17,0,'1',NULL,1563365992501,1623836337211,0,'Danh sách tài khoản','','[]','[{\"mode\":\"create\",\"title\":\"Sinh Token\",\"roles\":[1],\"color\":\"danger\",\"icon\":\"fa fa-bomb\",\"action\":\"formModal\",\"modalQuery\":\"{\\\"page\\\":20,\\\"mode\\\":\\\"create\\\",\\\"embed\\\":\\\"{\\\\\\\"authId\\\\\\\":#id#}\\\",\\\"authId\\\":#id#}\",\"type\":\"button\",\"embedUrl\":true}]','{}','find','[1,2]','[{\"name\":\"find\",\"type\":\"find\",\"url\":\"/api/auth\",\"roles\":[1,2],\"options\":[{\"key\":\"isDelete\",\"value\":\"0\"}],\"method\":\"GET\"}]','[{\"name\":\"id\",\"field\":\"id\",\"type\":\"number\",\"filterable\":true,\"filterRange\":false},{\"name\":\"key\",\"field\":\"key\",\"type\":\"string\",\"filterable\":true},{\"name\":\"type\",\"field\":\"type\",\"type\":\"string\",\"filterable\":true},{\"name\":\"Activated\",\"field\":\"activated\",\"type\":\"boolean\",\"enumable\":true,\"items\":[{\"key\":\"False\",\"value\":0},{\"key\":\"True\",\"value\":1}],\"filterable\":true},{\"name\":\"Lần đầu đăng nhập\",\"field\":\"firstLoginAt\",\"type\":\"date\",\"filterable\":true,\"filterRange\":true},{\"name\":\"Lần cuối đăng nhập\",\"type\":\"date\",\"field\":\"lastLoginAt\",\"filterable\":true,\"filterRange\":true},{\"name\":\"Thời gian đổi mật khẩu gần nhất\",\"field\":\"lastChangePasswordAt\",\"type\":\"date\",\"filterable\":true,\"filterRange\":true},{\"name\":\"Tạo bởi\",\"field\":\"createdBy\",\"type\":\"number\",\"filterable\":true},{\"name\":\"ID người dùng\",\"field\":\"user\",\"type\":\"number\",\"filterable\":true}]','[]'),(18,0,'1',NULL,1563788255445,1723485333903,0,'Quản lý api public','','[]','[{\"mode\":\"create\",\"title\":\"Tạo mới\",\"roles\":[1],\"color\":\"success\",\"icon\":\"fa fa-plus\",\"action\":\"url\",\"backOnDone\":true,\"url\":\"#/form?page=19&mode=create\",\"type\":\"submit\"},{\"mode\":\"edit\",\"title\":\"Sửa\",\"color\":\"warning\",\"icon\":\"fa fa-pencil\",\"action\":\"formModal\",\"modalQuery\":\"{\\\"mode\\\":\\\"edit\\\",\\\"page\\\":19,\\\"id\\\":#id#}\",\"type\":\"button\",\"roles\":[1]},{\"mode\":\"destroy\",\"title\":\"Xóa\",\"roles\":[1,2],\"color\":\"danger\",\"outline\":false,\"icon\":\"tabler:trash\",\"column\":\"\",\"hideExpression\":\"\",\"action\":\"api\",\"reportName\":\"\",\"modalQuery\":\"\",\"url\":\"\",\"target\":\"_self\",\"api\":\"destroy\",\"apiData\":\"\",\"confirm\":\"Bạn có chắc muốn xóa API này không?\",\"backOnDone\":false,\"backOnDoneHref\":\"\",\"embedUrl\":false,\"type\":\"button\",\"showOnTop\":false,\"showOnFormOnly\":false}]','{}','find','[1]','[{\"name\":\"find\",\"type\":\"find\",\"url\":\"/api/api\",\"method\":\"GET\",\"roles\":[1]},{\"name\":\"destroy\",\"type\":\"update\",\"url\":\"/api/api\",\"description\":\"Xóa api\",\"method\":\"DELETE\"}]','[{\"name\":\"id\",\"field\":\"id\",\"type\":\"number\",\"filterable\":true},{\"name\":\"Mô tả api\",\"field\":\"description\",\"filterable\":true,\"type\":\"string\"},{\"name\":\"actionPath\",\"field\":\"actionPath\",\"type\":\"string\",\"enumable\":false,\"filterable\":true},{\"name\":\"Method\",\"field\":\"method\",\"type\":\"string\",\"enumable\":true,\"items\":[{\"key\":\"GET\",\"value\":\"GET\"},{\"key\":\"PUT\",\"value\":\"PUT\"},{\"key\":\"PATCH\",\"value\":\"PATCH\"},{\"key\":\"POST\",\"value\":\"POST\"},{\"key\":\"DELETE\",\"value\":\"DELETE\"}],\"filterable\":true},{\"name\":\"apiVersion\",\"field\":\"apiVersion\",\"filterable\":true,\"type\":\"string\"},{\"name\":\"enableCaptcha\",\"field\":\"enableCaptcha\",\"type\":\"boolean\",\"filterable\":true,\"enumable\":true,\"items\":[{\"key\":\"Qua captcha\",\"value\":1},{\"key\":\"Không qua captcha\",\"value\":0}]},{\"name\":\"fieldAllowValue\",\"field\":\"fieldAllowValue\",\"type\":\"string\",\"filterable\":true,\"bindButton\":false},{\"field\":\"requireRoleIds\",\"name\":\"requireRoleIds\",\"type\":\"string\",\"filterable\":true},{\"name\":\"userIdField\",\"field\":\"userIdField\",\"type\":\"string\",\"filterable\":true},{\"name\":\"conditions\",\"field\":\"conditions\",\"type\":\"string\",\"enumable\":false,\"filterable\":true},{\"name\":\"whereByUserField\",\"field\":\"whereByUserField\",\"type\":\"string\",\"filterable\":true},{\"name\":\"selectedFields\",\"field\":\"selectedFields\",\"type\":\"string\",\"filterable\":true},{\"name\":\"ignoreFields\",\"field\":\"ignoreFields\",\"type\":\"string\",\"filterable\":true},{\"name\":\"boolExpression\",\"field\":\"boolExpression\",\"type\":\"string\",\"filterable\":true}]','[]'),(19,0,'1',NULL,1563789917193,1567495938056,0,'Chi tiết api public','Chi tiết api public','[{\"name\":\"actionPath\",\"field\":\"actionPath\",\"type\":\"string\",\"required\":true,\"widget\":\"Text\"},{\"name\":\"description\",\"field\":\"description\",\"type\":\"string\",\"widget\":\"TextArea\"},{\"name\":\"requireRoleIds\",\"field\":\"requireRoleIds\",\"type\":\"number\",\"required\":false,\"widget\":\"ArrayModel\",\"api\":\"find_role\",\"modelSelectField\":\"id,name$$Tên\"},{\"name\":\"apiVersion\",\"field\":\"apiVersion\",\"type\":\"string\",\"required\":true,\"default\":\"public\",\"widget\":\"Text\"},{\"name\":\"method\",\"field\":\"method\",\"type\":\"string\",\"required\":true,\"widget\":\"Enum\",\"items\":[{\"key\":\"GET\",\"value\":\"GET\"},{\"key\":\"PUT\",\"value\":\"PUT\"},{\"key\":\"PATCH\",\"value\":\"PATCH\"},{\"key\":\"POST\",\"value\":\"POST\"},{\"key\":\"DELETE\",\"value\":\"DELETE\"}]},{\"name\":\"userIdField\",\"field\":\"userIdField\",\"type\":\"string\",\"required\":false,\"widget\":\"Text\"},{\"name\":\"whereByUserField\",\"field\":\"whereByUserField\",\"type\":\"string\",\"widget\":\"JSONViewer\",\"default\":\"{}\"},{\"name\":\"conditions\",\"field\":\"conditions\",\"type\":\"string\",\"widget\":\"JSONViewer\",\"default\":\"{\\\"isDelete\\\":false}\"},{\"name\":\"fieldAllowValue\",\"field\":\"fieldAllowValue\",\"type\":\"string\",\"required\":false,\"disabled\":false,\"widget\":\"JSONViewer\",\"default\":\"{}\"},{\"name\":\"ignoreFields\",\"field\":\"ignoreFields\",\"type\":\"string\",\"required\":false,\"widget\":\"JSONViewer\",\"default\":\"[]\"},{\"name\":\"selectedFields\",\"field\":\"selectedFields\",\"type\":\"string\",\"widget\":\"JSONViewer\",\"default\":\"[]\"},{\"name\":\"enableCaptcha\",\"field\":\"enableCaptcha\",\"type\":\"boolean\",\"required\":false,\"widget\":\"Checkbox\",\"default\":\"\"},{\"name\":\"boolExpression\",\"field\":\"boolExpression\",\"placeholder\":\"Biểu thức tính quyền truy cập api theo thông tin người dùng và dữ liệu gửi lên\",\"type\":\"string\",\"widget\":\"TextArea\"}]','[{\"mode\":\"create\",\"title\":\"Tạo mới\",\"roles\":[1],\"color\":\"success\",\"icon\":\"fa fa-plus\",\"action\":\"api\",\"backOnDone\":true,\"url\":\"#/form?page=23&mode=create\",\"type\":\"submit\",\"api\":\"create\",\"confirm\":\"Đồng ý tạo mới api?\"},{\"mode\":\"edit\",\"title\":\"Cập nhật\",\"color\":\"danger\",\"icon\":\"fa fa-save\",\"action\":\"api\",\"modalQuery\":\"{\\\"mode\\\":\\\"edit\\\",\\\"page\\\":23,\\\"id\\\":#id#}\",\"type\":\"submit\",\"roles\":[1],\"confirm\":\"Đồng ý cập nhật api?\",\"api\":\"update\"}]','{}','find','[1]','[{\"name\":\"find\",\"type\":\"find\",\"url\":\"/api/api\",\"method\":\"GET\",\"roles\":[1]},{\"name\":\"create\",\"type\":\"create\",\"url\":\"/api/api\",\"method\":\"POST\",\"roles\":[1],\"options\":[]},{\"name\":\"update\",\"type\":\"update\",\"url\":\"/api/api\",\"roles\":[1],\"method\":\"PATCH\"},{\"name\":\"find_role\",\"type\":\"find\",\"url\":\"/api/role\",\"method\":\"GET\",\"roles\":[1],\"options\":[{\"key\":\"isDelete\",\"value\":\"0\"}]}]','[{\"name\":\"id\",\"field\":\"id\",\"type\":\"number\",\"filterable\":true},{\"name\":\"Mô tả api\",\"field\":\"description\",\"filterable\":true,\"type\":\"string\"},{\"name\":\"actionPath\",\"field\":\"actionPath\",\"type\":\"string\",\"enumable\":false,\"filterable\":true},{\"name\":\"Method\",\"field\":\"method\",\"type\":\"string\",\"enumable\":true,\"items\":[{\"key\":\"GET\",\"value\":\"GET\"},{\"key\":\"PUT\",\"value\":\"PUT\"},{\"key\":\"PATCH\",\"value\":\"PATCH\"},{\"key\":\"POST\",\"value\":\"POST\"},{\"key\":\"DELETE\",\"value\":\"DELETE\"}],\"filterable\":true},{\"name\":\"apiVersion\",\"field\":\"apiVersion\",\"filterable\":true,\"type\":\"string\"},{\"name\":\"enableCaptcha\",\"field\":\"enableCaptcha\",\"type\":\"boolean\",\"filterable\":true},{\"field\":\"requireRoleIds\",\"name\":\"requireRoleIds\",\"type\":\"string\",\"filterable\":true},{\"name\":\"userIdField\",\"field\":\"userIdField\",\"type\":\"string\",\"filterable\":true},{\"name\":\"conditions\",\"field\":\"conditions\",\"type\":\"string\",\"enumable\":false,\"filterable\":true},{\"name\":\"whereByUserField\",\"field\":\"whereByUserField\",\"type\":\"string\",\"filterable\":true},{\"name\":\"selectedFields\",\"field\":\"selectedFields\",\"type\":\"string\",\"filterable\":true},{\"name\":\"ignoreFields\",\"field\":\"ignoreFields\",\"type\":\"string\",\"filterable\":true}]','[]'),(20,0,'1',NULL,1563868504113,1723448369395,0,'Gen token','','[{\"name\":\"ID tài khoản người dùng\",\"field\":\"authId\",\"required\":true,\"type\":\"number\",\"widget\":\"SingleModel\",\"api\":\"find_auth\",\"hiddenWhere\":[],\"modelSelectField\":\"id,key$$Tài khoản,type$$Loại tài khoản\",\"hideExpression\":\"\",\"select\":\"key\"},{\"name\":\"Thời gian sống token (phút - 0=Không giới hạn)\",\"field\":\"lifeTimeInMinutes\",\"type\":\"number\",\"required\":false,\"widget\":\"Text\",\"min\":\"0\",\"default\":\"0\"},{\"field\":\"email\",\"name\":\"Email nhận token\",\"type\":\"string\",\"widget\":\"Text\",\"regex\":\"(^$|^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\\\.(?:[a-zA-Z]{2}|com|org|net|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum)$)\",\"errorOnRegexFail\":\"is invalid!\"},{\"name\":\"Thông tin thêm\",\"field\":\"additionInfo\",\"type\":\"string\",\"widget\":\"JSONViewer\",\"default\":\"\"},{\"name\":\"Mã xác nhận\",\"field\":\"captcha\",\"type\":\"string\",\"required\":true,\"widget\":\"Captcha\"}]','[{\"mode\":\"create\",\"title\":\"Tạo token\",\"roles\":[1],\"color\":\"danger\",\"icon\":\"fa fa-bomb\",\"action\":\"api\",\"api\":\"gen_token\",\"type\":\"submit\",\"embedUrl\":true}]','{}','','[1]','[{\"type\":\"create\",\"name\":\"gen_token\",\"url\":\"/api/auth/gen-token\",\"method\":\"POST\",\"enableCaptcha\":true,\"roles\":[1]},{\"name\":\"find_auth\",\"type\":\"find\",\"url\":\"/api/auth\",\"method\":\"GET\",\"enableCaptcha\":false,\"roles\":[1]},{\"name\":\"find_user\",\"type\":\"find\",\"url\":\"/api/user\",\"method\":\"GET\",\"enableCaptcha\":false,\"roles\":[1]},{\"name\":\"send_sql\",\"type\":\"create\",\"url\":\"/api/admin/query\",\"method\":\"POST\",\"roles\":[1]}]',NULL,'[]'),(21,0,'1',NULL,1564373289181,1678065884607,0,'Log call api','','[]','[{\"mode\":\"edit\",\"title\":\"Chi tiết\",\"color\":\"primary\",\"icon\":\"fa fa-pencil\",\"action\":\"formModal\",\"modalQuery\":\"{\\\"page\\\":22,\\\"mode\\\":\\\"edit\\\",\\\"id\\\":\\\"#id#\\\"}\",\"type\":\"button\"}]','{\"highlight\":true,\"highlightExpression\":\"{\\\"this.responseStatusCode\\\":{\\\"nin\\\":[200,304]}}\",\"highlightColor\":\"red\"}','find','[1]','[{\"name\":\"find\",\"type\":\"find\",\"url\":\"/api/logcallapi\",\"method\":\"GET\",\"enableCaptcha\":false,\"roles\":[1]},{\"name\":\"find_auth\",\"type\":\"find\",\"url\":\"/api/auth\",\"description\":\"lấy thông tin authen\",\"method\":\"GET\",\"roles\":[1]}]','[{\"name\":\"id\",\"field\":\"id\",\"type\":\"string\",\"filterable\":true},{\"name\":\"requestUrl\",\"field\":\"requestUrl\",\"type\":\"string\",\"filterable\":true},{\"name\":\"requestMethod\",\"field\":\"requestMethod\",\"type\":\"string\",\"enumable\":false,\"filterable\":true},{\"name\":\"apiVersion\",\"field\":\"apiVersion\",\"type\":\"string\",\"filterable\":true},{\"name\":\"requestHeader\",\"field\":\"requestHeader\",\"type\":\"string\",\"filterable\":true},{\"name\":\"requestData\",\"field\":\"requestData\",\"type\":\"string\",\"filterable\":true},{\"name\":\"responseStatusCode\",\"field\":\"responseStatusCode\",\"type\":\"number\",\"filterable\":true,\"filterRange\":true},{\"name\":\"responseMessage\",\"field\":\"responseMessage\",\"type\":\"string\",\"filterable\":true},{\"name\":\"apiDescription\",\"field\":\"apiDescription\",\"filterable\":true},{\"name\":\"ip\",\"field\":\"ip\",\"type\":\"string\",\"filterable\":true},{\"name\":\"takeTime\",\"field\":\"takeTime\",\"type\":\"number\",\"filterable\":true,\"filterRange\":true},{\"name\":\"userId\",\"field\":\"userId\",\"type\":\"number\",\"filterable\":true},{\"name\":\"authId\",\"field\":\"authId\",\"type\":\"number\",\"filterable\":true,\"bindButton\":false,\"filterRange\":true,\"modelSelect\":true,\"modelSelectApi\":\"find_auth\",\"select\":\"key\",\"modelSelectField\":\"id,key,type\"},{\"name\":\"createdAt\",\"field\":\"createdAt\",\"type\":\"date\",\"filterable\":true,\"filterRange\":true}]','[]'),(22,0,'1',NULL,1564373767477,1678065916258,0,'Chi tiết log call api','','[{\"name\":\"requestUrl\",\"field\":\"requestUrl\",\"type\":\"string\",\"disabled\":true,\"widget\":\"Text\"},{\"name\":\"requestMethod\",\"field\":\"requestMethod\",\"type\":\"string\",\"disabled\":true,\"widget\":\"Text\"},{\"name\":\"apiVersion\",\"field\":\"apiVersion\",\"type\":\"string\",\"widget\":\"Text\"},{\"name\":\"requestHeader\",\"field\":\"requestHeader\",\"type\":\"string\",\"widget\":\"JSONViewer\"},{\"name\":\"requestData\",\"field\":\"requestData\",\"type\":\"string\",\"widget\":\"JSONViewer\"},{\"name\":\"responseStatusCode\",\"field\":\"responseStatusCode\",\"type\":\"number\",\"widget\":\"Text\",\"enableReadNumber\":false},{\"name\":\"responseMessage\",\"field\":\"responseMessage\",\"type\":\"string\",\"widget\":\"TextArea\"},{\"name\":\"apiDescription\",\"field\":\"apiDescription\",\"type\":\"string\",\"widget\":\"TextArea\"},{\"name\":\"ip\",\"field\":\"ip\",\"type\":\"string\",\"widget\":\"Text\"},{\"name\":\"takeTime\",\"field\":\"takeTime\",\"type\":\"number\",\"widget\":\"Text\"},{\"name\":\"userId\",\"field\":\"userId\",\"type\":\"number\",\"widget\":\"Text\"},{\"name\":\"authId\",\"field\":\"authId\",\"type\":\"number\",\"widget\":\"Text\"}]','[]','{}','find','[1]','[{\"name\":\"find\",\"type\":\"find\",\"url\":\"/api/logcallapi\",\"method\":\"GET\",\"roles\":[1]}]','[]','[]'),(23,0,'1',NULL,1676819688620,1723391117620,0,'Thông báo','Notice','[{\"name\":\"Test\",\"field\":\"test\",\"placeholder\":\"\",\"roles\":[],\"required\":false,\"requiredExpression\":\"\",\"disabled\":false,\"disabledExpression\":\"\",\"type\":\"string\",\"widget\":\"Text\",\"isArrayInput\":false,\"hideExpression\":\"\",\"default\":\"\",\"arrayInput\":true,\"regex\":\"\",\"errorOnRegexFail\":\"\"}]','[{\"mode\":\"edit\",\"roles\":[],\"title\":\"Chi tiết\",\"color\":\"info\",\"icon\":\"fa fa-pencil\",\"action\":\"formModal\",\"modalQuery\":\"{\\\"mode\\\":\\\"edit\\\",\\\"id\\\":#id#,\\\"page\\\":24}\",\"type\":\"button\"},{\"mode\":\"forgot\",\"title\":\"Close\",\"roles\":[1],\"color\":\"success\",\"outline\":false,\"icon\":\"fa fa-plus\",\"column\":\"\",\"hideExpression\":\"\",\"action\":\"formModal\",\"reportName\":\"\",\"modalQuery\":\"{\\\"page\\\":24,\\\"mode\\\":\\\"create\\\"}\",\"url\":\"\",\"target\":\"_self\",\"api\":\"\",\"apiData\":\"\",\"confirm\":\"\",\"backOnDone\":false,\"backOnDoneHref\":\"\",\"embedUrl\":false,\"type\":\"submit\",\"showOnTop\":false,\"showOnFormOnly\":false},{\"mode\":\"forgot\",\"title\":\"Forgot\",\"roles\":[],\"color\":\"default\",\"outline\":false,\"icon\":\"\",\"column\":\"\",\"hideExpression\":\"\",\"action\":\"api\",\"reportName\":\"\",\"modalQuery\":\"\",\"url\":\"\",\"target\":\"_self\",\"api\":\"get\",\"apiData\":\"\",\"confirm\":\"\",\"backOnDone\":false,\"backOnDoneHref\":\"\",\"embedUrl\":false,\"type\":\"submit\",\"showOnTop\":false,\"showOnFormOnly\":false}]','{\"highlight\":true,\"highlightColor\":\"green\",\"highlightExpression\":\"{this.responseStatusCode\\\":[\\\"nin\\\":[200,304]]}\"}','get','[6]','[{\"name\":\"find\",\"type\":\"find\",\"url\":\"/api/notice\",\"description\":\"get list notice\",\"method\":\"GET\",\"roles\":[3,5,6],\"criterias\":[{\"key\":\"user\",\"value\":\"--id\"}]},{\"name\":\"count\",\"type\":\"find\",\"url\":\"/api/notice/count\",\"method\":\"GET\",\"roles\":[5,3,6]},{\"name\":\"read\",\"type\":\"find\",\"url\":\"/api/notice/read\",\"description\":\"read message\",\"method\":\"GET\",\"roles\":[5,3,6]},{\"name\":\"get\",\"type\":\"find\",\"url\":\"/api/notice/get\",\"method\":\"GET\",\"roles\":[3,5,6]}]','[{\"name\":\"Id\",\"field\":\"id\",\"hideExpression\":\"\",\"roles\":[],\"type\":\"string\",\"enumable\":false,\"modelSelect\":false,\"arraySelect\":false,\"display\":\"image\",\"filterable\":true,\"bindButton\":false,\"filterRange\":false},{\"name\":\"Name\",\"field\":\"name\",\"hideExpression\":\"\",\"roles\":[],\"type\":\"string\",\"enumable\":false,\"modelSelect\":false,\"arraySelect\":false,\"display\":\"image\",\"filterable\":true,\"bindButton\":false,\"filterRange\":false}]','[]'),(24,0,'1',NULL,1676857826582,1678376755821,0,'Chi tiết thông báo','Notice','[{\"name\":\"user\",\"field\":\"user\",\"roles\":[1],\"type\":\"number\",\"widget\":\"SingleModel\",\"api\":\"find_user\",\"modelSelectField\":\"id,name,email,phone,money\",\"select\":\"name\"},{\"name\":\"Tiêu đề\",\"field\":\"subject\",\"required\":true,\"type\":\"string\",\"widget\":\"Text\"},{\"name\":\"Nội dung\",\"field\":\"content\",\"required\":false,\"type\":\"string\",\"widget\":\"HTML\",\"roles\":[]},{\"name\":\"level\",\"field\":\"level\",\"roles\":[1],\"type\":\"string\",\"widget\":\"Text\",\"default\":\"DELETE_ON_SEND\"},{\"name\":\"Nội dung\",\"field\":\"content\",\"required\":false,\"type\":\"string\",\"widget\":\"RichText\",\"roles\":[1]},{\"name\":\"payload\",\"field\":\"payload\",\"roles\":[1],\"type\":\"string\",\"widget\":\"JSONViewer\",\"default\":\"{}\"},{\"name\":\"expiredAt\",\"field\":\"expiredAt\",\"roles\":[1],\"type\":\"number\",\"widget\":\"Date\"}]','[{\"mode\":\"create\",\"title\":\"Tạo mới\",\"roles\":[1],\"color\":\"success\",\"icon\":\"fa fa-plus\",\"action\":\"api\",\"api\":\"create\",\"type\":\"submit\"},{\"mode\":\"edit\",\"title\":\"Chi tiết\",\"color\":\"info\",\"icon\":\"fa fa-info-cicle\",\"action\":\"api\",\"showOnFormOnly\":true,\"type\":\"submit\",\"api\":\"open_url_notice\",\"apiData\":\"{\\\"noticeId\\\":\\\"this.id\\\"}\",\"backOnDone\":false,\"showOnTop\":true,\"hideExpression\":\"[{\\\"this.openUrl\\\":{\\\"=\\\":\\\"\\\"}},{\\\"this.openUrl\\\":{\\\"=\\\":null}}]\"}]','{}','read','[3,5,6]','[{\"name\":\"find\",\"type\":\"find\",\"url\":\"/api/notice\",\"description\":\"get list notice\",\"method\":\"GET\",\"roles\":[3,5,6],\"criterias\":[{\"key\":\"user\",\"value\":\"--id\"}]},{\"name\":\"count\",\"type\":\"find\",\"url\":\"/api/notice/count\",\"method\":\"GET\",\"roles\":[5,3,6]},{\"name\":\"read\",\"type\":\"find\",\"url\":\"/api/notice/read\",\"description\":\"read message\",\"method\":\"GET\",\"roles\":[5,3,6]},{\"name\":\"get\",\"type\":\"find\",\"url\":\"/api/notice/get\",\"method\":\"GET\",\"roles\":[3,5,6]},{\"name\":\"find_user\",\"type\":\"find\",\"url\":\"/api/user\",\"method\":\"GET\",\"roles\":[1]},{\"name\":\"create\",\"type\":\"create\",\"url\":\"/api/notice\",\"description\":\"tạo mới thông báo người dùng\",\"method\":\"POST\",\"roles\":[1],\"requestFields\":\"user,subject,content,level,expiredAt,payload\"},{\"name\":\"open_url_notice\",\"type\":\"find\",\"url\":\"/api/notice/open-url\",\"description\":\"open-url notice\",\"method\":\"POST\",\"roles\":[3,5]}]','[{\"name\":\"ID\",\"field\":\"id\",\"type\":\"number\",\"formatNumber\":true,\"filterable\":true},{\"name\":\"Tiêu đề\",\"field\":\"subject\",\"type\":\"string\",\"filterable\":true},{\"name\":\"Nội dung\",\"field\":\"content\",\"type\":\"string\",\"filterable\":true}]','[]'),(25,0,'1',NULL,1575876747844,1699160663276,0,'Log Email','','[]','[{\"mode\":\"detail\",\"title\":\"Detail\",\"color\":\"info\",\"icon\":\"fa fa-pencil\",\"action\":\"formModal\",\"modalQuery\":\"{\\\"page\\\":26,\\\"mode\\\":\\\"edit\\\",\\\"id\\\":\\\"#id#\\\"}\",\"type\":\"button\",\"roles\":[]}]','{\"highlight\":true,\"highlightExpression\":\"{\\\"this.responseInfo\\\":{\\\"contains\\\":\\\"rejected: [\\\\\\\"\\\"}}\"}','find','[1]','[{\"name\":\"find\",\"type\":\"find\",\"url\":\"/api/logsmsemail\",\"description\":\"lấy đanh sách log gửi email\",\"method\":\"GET\",\"roles\":[1],\"options\":[{\"key\":\"type\",\"value\":\"EMAIL\"}]}]','[{\"name\":\"id\",\"field\":\"id\",\"type\":\"string\",\"filterable\":true,\"roles\":[1]},{\"name\":\"isSuccess\",\"field\":\"isSuccess\",\"type\":\"boolean\",\"enumable\":true,\"filterable\":true,\"items\":[{\"key\":\"Đã xử lý\",\"value\":1},{\"key\":\"Chưa xử lý\",\"value\":0}]},{\"name\":\"Created at\",\"field\":\"createdAt\",\"type\":\"date\",\"filterable\":true,\"filterRange\":true,\"roles\":[]},{\"name\":\"Updated at\",\"field\":\"updatedAt\",\"type\":\"date\",\"filterable\":true,\"filterRange\":true,\"roles\":[]},{\"name\":\"To\",\"field\":\"to\",\"type\":\"string\",\"filterable\":true},{\"name\":\"Subject\",\"field\":\"subject\",\"type\":\"string\",\"filterable\":true},{\"name\":\"Response Status\",\"field\":\"responseInfo\",\"type\":\"string\",\"filterable\":true},{\"name\":\"payload\",\"field\":\"payload\",\"roles\":[1],\"type\":\"string\",\"filterable\":true}]','[]'),(26,0,'1',NULL,1575877822131,1683819486759,0,'Log Email','','[{\"field\":\"createdAt\",\"name\":\"Created At\",\"disabled\":true,\"type\":\"number\",\"widget\":\"Date\"},{\"name\":\"To\",\"field\":\"to\",\"disabled\":true,\"type\":\"string\",\"widget\":\"Text\"},{\"field\":\"subject\",\"name\":\"Subject\",\"disabled\":true,\"type\":\"string\",\"widget\":\"TextArea\"},{\"name\":\"Content\",\"field\":\"content\",\"disabled\":true,\"type\":\"string\",\"widget\":\"HTML\"},{\"name\":\"Response Status\",\"field\":\"responseInfo\",\"disabled\":true,\"type\":\"string\",\"widget\":\"JSONViewer\"},{\"name\":\"payload\",\"field\":\"payload\",\"disabled\":true,\"type\":\"string\",\"widget\":\"JSONViewer\"}]','[]','{}','find','[1]','[{\"name\":\"find\",\"type\":\"find\",\"url\":\"/api/logsmsemail\",\"description\":\"lấy đanh sách log gửi email\",\"method\":\"GET\",\"roles\":[1,2],\"options\":[{\"key\":\"type\",\"value\":\"EMAIL\"}]}]','[{\"name\":\"id\",\"field\":\"id\",\"type\":\"string\",\"filterable\":true},{\"name\":\"Created at\",\"field\":\"createdAt\",\"type\":\"date\",\"filterable\":true,\"filterRange\":true},{\"name\":\"To\",\"field\":\"to\",\"type\":\"string\",\"filterable\":true},{\"name\":\"Subject\",\"field\":\"subject\",\"type\":\"string\",\"filterable\":true},{\"name\":\"Response Status\",\"field\":\"responseInfo\",\"type\":\"string\",\"filterable\":true},{\"name\":\"payload\",\"field\":\"payload\",\"roles\":[1],\"type\":\"string\",\"filterable\":true}]','[]'),(27,0,'1',NULL,1620589375909,1620591105150,0,'Log SMS','Log SMS','[]','[{\"mode\":\"create\",\"title\":\"Tạo mới\",\"roles\":[1],\"color\":\"success\",\"icon\":\"fa fa-plus\",\"action\":\"formModal\",\"modalQuery\":\"{\\\"page\\\":28,\\\"mode\\\":\\\"create\\\"}\",\"backOnDone\":false,\"type\":\"submit\"},{\"mode\":\"edit\",\"title\":\"Chi Tiết\",\"color\":\"warning\",\"icon\":\"fa fa-pencil\",\"action\":\"formModal\",\"modalQuery\":\"{\\\"page\\\":28,\\\"mode\\\":\\\"edit\\\",\\\"id\\\":\\\"#id#\\\"}\",\"type\":\"button\",\"embedUrl\":false}]','{}','find','[1,5]','[{\"name\":\"find\",\"type\":\"find\",\"url\":\"/api/receivedSms\",\"method\":\"GET\",\"roles\":[1],\"requestFields\":\"\"},{\"name\":\"create\",\"type\":\"create\",\"url\":\"/api/receivedSms\",\"method\":\"POST\",\"roles\":[1,5],\"requestFields\":\"phone,message,payload\"}]','[{\"name\":\"ID\",\"field\":\"id\",\"type\":\"number\",\"formatNumber\":false,\"filterable\":true,\"bindButton\":false},{\"name\":\"Phone Number\",\"field\":\"phone\",\"type\":\"string\",\"filterable\":true,\"stringID\":false},{\"name\":\"Message\",\"field\":\"message\",\"type\":\"string\",\"enumable\":false,\"filterable\":true},{\"name\":\"Processed\",\"field\":\"processed\",\"type\":\"boolean\",\"enumable\":true,\"items\":[{\"key\":\"Đã xử lý\",\"value\":1},{\"key\":\"Chưa xử lý\",\"value\":0}],\"filterable\":true},{\"name\":\"Created at\",\"field\":\"createdAt\",\"type\":\"date\",\"filterable\":true,\"filterRange\":true}]','[]'),(28,0,'1',NULL,1620589838668,1620591135180,0,'Log SMS','Log SMS','[{\"name\":\"Phone\",\"field\":\"phone\",\"required\":true,\"disabledExpression\":\"\",\"type\":\"string\",\"widget\":\"Text\"},{\"name\":\"Message\",\"field\":\"message\",\"required\":true,\"disabledExpression\":\"\",\"type\":\"string\",\"widget\":\"TextArea\"}]','[{\"mode\":\"create\",\"title\":\"Tạo mới\",\"roles\":[1],\"color\":\"success\",\"icon\":\"fa fa-plus\",\"action\":\"api\",\"modalQuery\":\"{\\\"page\\\":28,\\\"mode\\\":\\\"create\\\"}\",\"backOnDone\":true,\"type\":\"submit\",\"api\":\"create\"}]','{}','find','[1,5]','[{\"name\":\"find\",\"type\":\"find\",\"url\":\"/api/receivedSms\",\"method\":\"GET\",\"roles\":[1],\"requestFields\":\"\"},{\"name\":\"create\",\"type\":\"create\",\"url\":\"/api/receivedSms\",\"method\":\"POST\",\"roles\":[1,5],\"requestFields\":\"phone,message,payload\",\"responseFields\":\"phone\"}]','[{\"name\":\"ID\",\"field\":\"id\",\"type\":\"number\",\"formatNumber\":false,\"filterable\":true,\"bindButton\":false},{\"name\":\"Phone Number\",\"field\":\"phone\",\"type\":\"string\",\"filterable\":true,\"stringID\":false},{\"name\":\"Message\",\"field\":\"message\",\"type\":\"string\",\"enumable\":false,\"filterable\":true},{\"name\":\"Processed\",\"field\":\"processed\",\"type\":\"number\",\"enumable\":true,\"items\":[{\"key\":\"1\",\"value\":\"Đã xử lý\"},{\"key\":\"0\",\"value\":\"Chưa xử lý\"}],\"filterable\":true},{\"name\":\"Created at\",\"field\":\"createdAt\",\"type\":\"date\",\"filterable\":true,\"filterRange\":true}]','[]'),(29,0,'1',NULL,1622460830928,1723446807071,0,'Sign Up','Sign Up','[{\"name\":\"Account\",\"field\":\"account\",\"required\":true,\"type\":\"string\",\"widget\":\"Text\",\"regex\":\"^[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9])+[a-zA-Z0-9]$\",\"errorOnRegexFail\":\"chứa ký tự không hợp lệ hoặc chưa đủ 3 ký tự!\"},{\"name\":\"Password\",\"field\":\"password\",\"required\":true,\"type\":\"string\",\"widget\":\"Password\",\"regex\":\"^(?=.*\\\\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{6,}$\",\"errorOnRegexFail\":\"phải bao gồm cả chữ và số đồng thời ít nhất 6 ký tự (Không cho phép ký tự đặc biệt)!\"},{\"name\":\"Email\",\"field\":\"email\",\"required\":true,\"type\":\"string\",\"widget\":\"Text\",\"regex\":\"(^$|^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\\\.(?:[a-zA-Z]{2}|com|org|net|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum)$)\",\"errorOnRegexFail\":\"is invalid!\"},{\"name\":\"Mã captcha\",\"field\":\"captcha\",\"required\":true,\"type\":\"string\",\"widget\":\"Captcha\"}]','[{\"mode\":\"signup\",\"title\":\"Gửi thông tin đăng ký\",\"color\":\"success\",\"icon\":\"fa fa-plus\",\"action\":\"api\",\"backOnDone\":true,\"type\":\"submit\",\"api\":\"sign-up\",\"backOnDoneHref\":\"#/login\"}]','{}','','[6]','[{\"name\":\"sign-up\",\"type\":\"create\",\"url\":\"/api/auth/register\",\"description\":\"đăng ký người dùng mới\",\"method\":\"POST\",\"enableCaptcha\":true,\"roles\":[6]}]',NULL,'[]'),(30,0,'1',NULL,1622483633383,1723387907719,0,'Quên mật khẩu','Quên mật khẩu','[{\"name\":\"Account\",\"field\":\"account\",\"placeholder\":\"\",\"roles\":[],\"required\":true,\"requiredExpression\":\"\",\"disabled\":false,\"disabledExpression\":\"\",\"type\":\"string\",\"widget\":\"Text\",\"isArrayInput\":false,\"hideExpression\":\"\",\"default\":\"\",\"arrayInput\":true,\"regex\":\"^[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9])+[a-zA-Z0-9]$\",\"errorOnRegexFail\":\"chứa ký tự không hợp lệ hoặc chưa đủ 3 ký tự!\"},{\"name\":\"Mã captcha\",\"field\":\"captcha\",\"required\":true,\"type\":\"string\",\"widget\":\"Captcha\"}]','[{\"mode\":\"forgot\",\"title\":\"Yêu cầu cấp lại mật khẩu\",\"color\":\"primary\",\"icon\":\"fa fa-pencil\",\"action\":\"api\",\"backOnDone\":true,\"type\":\"submit\",\"api\":\"forgot\",\"backOnDoneHref\":\"#/login\",\"outline\":false,\"apiData\":\"{\\\"type\\\":\\\"up\\\"}\",\"showOnTop\":false}]','{}','-1','[6]','[{\"name\":\"forgot\",\"type\":\"create\",\"url\":\"/api/auth/forget-password\",\"description\":\"quên mật khẩu\",\"method\":\"POST\",\"enableCaptcha\":true,\"roles\":[6]}]','[]','[]'),(31,0,'1',NULL,1623689202236,1631521945630,0,'Đổi mật khẩu','Đổi mật khẩu','[{\"name\":\"Tài khoản\",\"field\":\"account\",\"required\":true,\"disabled\":true,\"type\":\"string\",\"widget\":\"Text\",\"placeholder\":\"Tài khoản\"},{\"name\":\"Mật khẩu\",\"field\":\"newPassword\",\"required\":true,\"disabled\":false,\"type\":\"string\",\"widget\":\"Password\",\"placeholder\":\"Mật khẩu mới\",\"regex\":\"^(?=.*\\\\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{6,}$\",\"errorOnRegexFail\":\"phải bao gồm cả chữ và số đồng thời ít nhất 6 ký tự!\"},{\"name\":\"Captcha\",\"field\":\"captcha\",\"required\":true,\"disabled\":false,\"type\":\"string\",\"widget\":\"Captcha\"}]','[{\"mode\":\"reset_pass\",\"title\":\"Đổi mật khẩu\",\"color\":\"success\",\"icon\":\"fa fa-change\",\"action\":\"api\",\"apiData\":\"{\\\"token\\\":\\\"this.token\\\"}\",\"api\":\"change_pass\",\"backOnDone\":true,\"backOnDoneHref\":\"#/login\",\"embedUrl\":true,\"type\":\"submit\"}]','{}','','[6]','[{\"name\":\"change_pass\",\"type\":\"create\",\"url\":\"/api/auth/change-forget-password\",\"description\":\"khôi phục mật khẩu tài khoản\",\"method\":\"POST\",\"enableCaptcha\":true,\"roles\":[6]}]',NULL,'[]'),(32,0,'1',NULL,1623699161444,1623699302702,0,'Kích hoạt tài khoản','Kích hoạt tài khoản','[{\"name\":\"Tài khoản\",\"field\":\"account\",\"required\":true,\"disabled\":true,\"type\":\"string\",\"widget\":\"Text\",\"placeholder\":\"Tài khoản\"},{\"name\":\"Captcha\",\"field\":\"captcha\",\"required\":true,\"disabled\":false,\"type\":\"string\",\"widget\":\"Captcha\"}]','[{\"mode\":\"activate\",\"title\":\"Xác nhận kích hoạt tài khoản\",\"color\":\"success\",\"icon\":\"fa fa-check\",\"action\":\"api\",\"apiData\":\"{\\\"token\\\":\\\"this.token\\\"}\",\"api\":\"activate_user\",\"backOnDone\":true,\"backOnDoneHref\":\"#/login\",\"embedUrl\":true,\"type\":\"submit\"}]','{}','','[6]','[{\"name\":\"activate_user\",\"type\":\"create\",\"url\":\"/api/auth/active-user\",\"description\":\"active user\",\"method\":\"POST\",\"enableCaptcha\":true,\"roles\":[6]}]',NULL,'[]');
/*!40000 ALTER TABLE `page` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `isDelete` tinyint(1) DEFAULT NULL,
  `createdBy` varchar(255) DEFAULT NULL,
  `deletedBy` varchar(255) DEFAULT NULL,
  `createdAt` bigint(20) DEFAULT NULL,
  `updatedAt` bigint(20) DEFAULT NULL,
  `deletedAt` bigint(20) DEFAULT NULL,
  `name` text,
  `description` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,0,'1',NULL,1563071061034,1563071061034,0,'Kỹ thuật','Đội kỹ thuật phát triển hệ thống'),(2,0,'1',NULL,1563071061034,1563071061034,0,'ADMIN',''),(3,0,'1',NULL,1563166328173,1563166328173,0,'BASIC',''),(4,0,'1',NULL,1570763890718,1570763890718,0,'INSIDER',''),(5,0,'1',NULL,1570763919447,1570763919447,0,'SMS_Services','quyền thực hiện ghi sms'),(6,0,'1',NULL,1571644382312,1622459644516,0,'Public','quyền cho người dùng sử dụng các public api'),(7,0,'1',NULL,1623698901536,1623698901536,0,'FPT_EDU','role cho người dùng có mail fpt edu'),(8,0,'1',NULL,1624515564049,1625037971613,0,'Akacoga','FSOFTER'),(9,0,'1',NULL,1631030293686,1631030293686,0,'Zooba Time','Zooba self time'),(10,0,'1',NULL,1674633233474,1674633233474,0,'Sổ nợ','quyền truy cập chức năng sổ ghi nợ'),(11,0,'1',NULL,1678266452285,1678266452285,0,'Mua hàng','Quyền mua hàng'),(12,0,'1',NULL,1683024969564,1722188409938,0,'SEDept User','Quyền cho GV môn SEa');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `isDelete` tinyint(1) DEFAULT NULL,
  `createdBy` varchar(255) DEFAULT NULL,
  `deletedBy` varchar(255) DEFAULT NULL,
  `createdAt` bigint(20) DEFAULT NULL,
  `updatedAt` bigint(20) DEFAULT NULL,
  `deletedAt` bigint(20) DEFAULT NULL,
  `name` text,
  `phone` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `roleId` longtext,
  `locale` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `description` text,
  `locked` tinyint(1) DEFAULT NULL,
  `firstLoginAt` bigint(20) DEFAULT NULL,
  `fcmToken` longtext,
  `avatar` varchar(255) DEFAULT NULL,
  `dob` varchar(255) DEFAULT NULL,
  `money` double DEFAULT NULL,
  `userType` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,0,'1',NULL,1563071061158,1723447157361,0,'Kim Thi Quyen','0329053889','vuvu15202@gmail.com','[]','vi','male','Day la system admin',0,1563075951205,'[]','','',10000,1),(2,0,'1',NULL,1586870789893,1723482843310,0,'Pham Quang Khang','329053888','quanglinhabc@gmail.com','[6]','vi','male','This is description',0,1623697042683,'[]','','',113000,6),(3,0,'1',NULL,1620588926898,1723482832866,0,'SMS','0329053888','vuvu15202@gmail.com','[]','vi','female','',0,1620591328491,'[]','','',0,5),(4,0,'1',NULL,1622475226049,1723482446414,0,'Public User','','vuvu15202@gmail.com','[]','vi','male','',0,0,'[]','','',0,6);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usertype`
--

DROP TABLE IF EXISTS `usertype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usertype` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `isDelete` tinyint(1) DEFAULT NULL,
  `createdBy` varchar(255) DEFAULT NULL,
  `deletedBy` varchar(255) DEFAULT NULL,
  `createdAt` bigint(20) DEFAULT NULL,
  `updatedAt` bigint(20) DEFAULT NULL,
  `deletedAt` bigint(20) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` text,
  `ruleIgnoreRole` longtext,
  `ruleOnlyViewCreatedBy` tinyint(1) DEFAULT NULL,
  `ruleViewUserType` longtext,
  `defaultRole` longtext,
  `defaultGrantUserType` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usertype`
--

LOCK TABLES `usertype` WRITE;
/*!40000 ALTER TABLE `usertype` DISABLE KEYS */;
INSERT INTO `usertype` VALUES (1,0,'1',NULL,1563071061509,1722753869395,0,'sys_admin','','[]',0,'[4,3,2,5,6,8,7]','[1,3,7,10]',2),(2,0,'1',NULL,1563071061509,1674633501298,0,'Admin','','[1]',1,'[3,4]','[3,2,10]',0),(3,0,'1',NULL,1570765665500,1570765665500,0,'Insider','','[1,2]',1,'[]','[4,3]',0),(4,0,'1',NULL,1570765717636,1570765717636,0,'Demo','','[]',0,'[]','[5,3]',0),(5,0,'1',NULL,1620588830343,1620588830343,0,'SMS','Nhóm quyền SMS','[6,4,3,2,1]',1,'[]','[5]',0),(6,0,'1',NULL,1620588830390,1678383814442,0,'public','','[4,3,2,1,5]',1,'[]','[6]',0),(7,0,'1',NULL,1624515735073,1673315282170,0,'Akacoga','nhóm quyền người dùng fsoft\ndsa\ndsa\ndsa\nd\nsa\nds\nad\nsa\nds\na\ndsa\nd\nsa\nds\nad\nsa\nds\nad\nsa\nds\nad\nsa\nds\nad\nsa\nds\na\ndsa\nd\nsa\nds\nad\nsa\ndsa\nds\na\n','[1,2,3,4,5,6,7]',0,'[]','[8,3]',0),(8,0,'1',NULL,1674633669159,1674633805178,0,'Sổ ghi nợ','Nhóm quyền cho người dùng sổ ghi nợ','[1,2,3,4,5,6,7,8,9]',1,'[]','[10,3]',0);
/*!40000 ALTER TABLE `usertype` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-15 19:27:57
