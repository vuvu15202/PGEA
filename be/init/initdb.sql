-- MySQL dump 10.13  Distrib 8.0.24, for Linux (x86_64)
--
-- Host: localhost    Database: demo_adminpage_1
-- ------------------------------------------------------
-- Server version	8.0.24

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
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
  `id` bigint NOT NULL AUTO_INCREMENT,
  `isDelete` tinyint(1) DEFAULT NULL,
  `createdBy` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `deletedBy` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `createdAt` bigint DEFAULT NULL,
  `updatedAt` bigint DEFAULT NULL,
  `deletedAt` bigint DEFAULT NULL,
  `actionPath` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `requireRoleIds` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `apiVersion` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `method` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `userIdField` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `whereByUserField` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `ignoreFields` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `conditions` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `selectedFields` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `enableCaptcha` tinyint(1) DEFAULT NULL,
  `fieldAllowValue` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `boolExpression` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api`
--

LOCK TABLES `api` WRITE;
/*!40000 ALTER TABLE `api` DISABLE KEYS */;
INSERT INTO `api` (id, isDelete, createdBy, deletedBy, createdAt, updatedAt, deletedAt, actionPath, `description`, requireRoleIds, apiVersion, method, userIdField, whereByUserField, ignoreFields, conditions, selectedFields, enableCaptcha, fieldAllowValue, boolExpression)
VALUES (1,0,'1',NULL,1563815468603,1563815468603,0,'auth/sign-in/account','Đăng nhập hệ thống bằng tài khoản và mật khẩu được cấp','[]','public','POST','','{}','[]','{}','[]',1,'{}',''),(2,0,'1',NULL,1567068694951,1622481377365,0,'socket/init','khởi tạo kết nối socket. Đưa người dùng vào room để nhận thông báo','[3,5,6]','common','POST','','{}','[]','{}','[]',0,'{}',''),(3,0,'1',NULL,1566552943003,1622481390311,0,'auth/logout','đăng xuất','[5,3,6]','common','POST','','{}','[]','{}','[]',0,'{}',''),(4,0,'1',NULL,1571907996363,1674588948419,0,'file/upload-image','upload file to server','[3]','admin','POST','','{}','[]','{}','[]',0,'{}',''),(5,0,'1',NULL,1571908421941,1571908421941,0,'file/download-file','người dùng download file','[3]','admin','GET','','{}','[]','{}','[]',0,'{}',''),(6,0,'1',NULL,1678439941264,1678439941264,0,'file/upload-file','upload file import','[1]','admin','POST','','{}','[]','{\"isDelete\":false}','[]',0,'{}',''),(7,0,'1',NULL,1702014048859,1702014390995,0,'admin/query','truy vấn sql từ xa','[1]','admin','POST','','{}','[]','{}','[]',0,'{}','');
/*!40000 ALTER TABLE `api` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `archive`
--

-- DROP TABLE IF EXISTS `archive`;
-- /*!40101 SET @saved_cs_client     = @@character_set_client */;
-- /*!50503 SET character_set_client = utf8mb4 */;
-- CREATE TABLE `archive` (
--   `id` bigint NOT NULL AUTO_INCREMENT,
--   `createdAt` bigint DEFAULT NULL,
--   `fromModel` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
--   `originalRecord` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci,
--   `originalRecordId` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci,
--   PRIMARY KEY (`id`),
--   UNIQUE KEY `id` (`id`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
-- /*!40101 SET character_set_client = @saved_cs_client */;

-- --
-- -- Dumping data for table `archive`
-- --

-- LOCK TABLES `archive` WRITE;
-- /*!40000 ALTER TABLE `archive` DISABLE KEYS */;
-- /*!40000 ALTER TABLE `archive` ENABLE KEYS */;
-- UNLOCK TABLES;

--
-- Table structure for table `auth`
--

DROP TABLE IF EXISTS `auth`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `isDelete` tinyint(1) DEFAULT NULL,
  `createdBy` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `deletedBy` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `createdAt` bigint DEFAULT NULL,
  `updatedAt` bigint DEFAULT NULL,
  `deletedAt` bigint DEFAULT NULL,
  `key` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `type` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `activated` tinyint DEFAULT '1',
  `firstLoginAt` bigint DEFAULT NULL,
  `lastLoginAt` bigint DEFAULT NULL,
  `lastChangePasswordAt` bigint DEFAULT NULL,
  `payload` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `user` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth`
--

LOCK TABLES `auth` WRITE;
/*!40000 ALTER TABLE `auth` DISABLE KEYS */;
INSERT INTO `auth` (id, isDelete, createdBy, deletedBy, createdAt, updatedAt, deletedAt, `key`, password, type, activated, firstLoginAt, lastLoginAt, lastChangePasswordAt, payload, user)
VALUES 
(1,0,NULL,NULL,1563071060589,1715319048469,0,'sys_admin','$2a$10$NWwbSE.GnxGPTVYOSDHdseHZuRi67wexXx6SAqp.BgMmFn8aMmTwC','up',1,1563075951190,1715319048469,1626070493823,'{}',1),
(2,0,'1',NULL,1586870790021,1704267771830,0,'khangpq2','$2a$10$2KaWoU9uxaLJKq5vrCTvgebXTjoSl8NfJkt6J.56M/ANFk3rbuREO','up',1,1623697042665,1704267771830,1623697031746,'{}',2),
(3,0,'1',NULL,1620588926910,1677805174064,0,'sms','$2a$10$y2mP/E3kou.6S8KDcSw7xO4SWSVHQ4kbunhFlekkRsfpAaaDSy62u','up',1,1620591328475,1677805174063,1677805153235,'{}',3),
(4,0,'1',NULL,1622475226059,1622475226059,0,'public','$2a$10$I2gql/yESHkHXYvfTHHVVOX/CCPZAxZhnjZeCmV3ztbMRM.RI9Cly','up',1,0,0,0,'{}',4),
(5,0,NULL,NULL,1623701509324,1709388834171,0,'khangpqmse0086','$2a$10$nktAGU/eaF63ZmdN6Z4pieN51X.EcGghjpTFZShaqoob7lKMIsquu','up',1,1623701559662,1709388834171,1685006125890,'{}',5);
/*!40000 ALTER TABLE `auth` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `authresetpassword`
--

DROP TABLE IF EXISTS `authresetpassword`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `authresetpassword` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `isDelete` tinyint(1) DEFAULT NULL,
  `createdBy` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `deletedBy` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `createdAt` bigint DEFAULT NULL,
  `updatedAt` bigint DEFAULT NULL,
  `deletedAt` bigint DEFAULT NULL,
  `key` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `type` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `token` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `expiredAt` double DEFAULT NULL,
  `isUse` tinyint(1) DEFAULT NULL,
  `auth` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `token` (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authresetpassword`
--

LOCK TABLES `authresetpassword` WRITE;
/*!40000 ALTER TABLE `authresetpassword` DISABLE KEYS */;
/*!40000 ALTER TABLE `authresetpassword` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `capt`
--

DROP TABLE IF EXISTS `capt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `capt` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `isDelete` tinyint(1) DEFAULT NULL,
  `createdBy` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `deletedBy` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `createdAt` bigint DEFAULT NULL,
  `updatedAt` bigint DEFAULT NULL,
  `deletedAt` bigint DEFAULT NULL,
  `text` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `expiredAt` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=59737 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
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
  `id` bigint NOT NULL AUTO_INCREMENT,
  `isDelete` tinyint(1) DEFAULT NULL,
  `createdBy` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `deletedBy` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `createdAt` bigint DEFAULT NULL,
  `updatedAt` bigint DEFAULT NULL,
  `deletedAt` bigint DEFAULT NULL,
  `forModel` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `forModelId` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `before` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `after` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `changestatuslog_forModel_forModelId_index` (`forModel`,`forModelId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
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
  `id` bigint NOT NULL AUTO_INCREMENT,
  `isDelete` tinyint(1) DEFAULT NULL,
  `createdBy` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `deletedBy` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `createdAt` bigint DEFAULT NULL,
  `updatedAt` bigint DEFAULT NULL,
  `deletedAt` bigint DEFAULT NULL,
  `key` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `val` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `type` int DEFAULT NULL,
  `desc` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `forfe` tinyint DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conf`
--

LOCK TABLES `conf` WRITE;
/*!40000 ALTER TABLE `conf` DISABLE KEYS */;
INSERT INTO `conf`(id, isDelete, createdBy, deletedBy, createdAt, updatedAt, deletedAt, `key`, val, `type`, `desc`, forfe) 
VALUES (1,0,'1',NULL,1563071060913,1680199156514,0,'BASE_URL','https://backend.ongbantat.store',2,'',0),
(2,0,'1',NULL,1563071060913,1563071060913,0,'TTL_CAPTCHA','15',1,'Thời gian sống của mã captcha theo phút',0),
(3,0,'1',NULL,1563071060913,1631300062108,0,'TTL_TOKEN','10080',1,'Thời gian sống của mã token đăng nhập theo phút',0),
(4,0,'1',NULL,1563071060913,1683821539684,0,'EMAIL_ACCOUNT','support.no-reply@ongbantat.store',2,'Tài khoản email dùng cho việc gửi các mail thông báo \nobt.support@codingclass.edu.vn|obt.support1@codingclass.edu.vn|obt.support2@codingclass.edu.vn|obt.support3@codingclass.edu.vn|obt.support4@codingclass.edu.vn',0),
(5,0,'1',NULL,1563071060913,1683744687063,0,'EMAIL_PASSWORD','',2,'Password của email gửi thông báo\n',0),
(6,0,'1',NULL,1563071060913,1563071060913,0,'EMAIL_HOST','smtp.office365.com',2,'Server email host',0),
(7,0,'1',NULL,1563071060913,1563071060913,0,'EMAIL_PORT','587',1,'Server email port',0),
(8,0,'1',NULL,1563071060913,1563071060913,0,'EMAIL_FROM','OBT SUPPORT',2,'Title sender',0),
(9,0,'1',NULL,1563071060913,1563071060913,0,'DEFAULT_PASSWORD','hello_sailer',2,'Mật khẩu mặc định khi reset mật khẩu',0),
(10,0,'1',NULL,1570430446846,1570430446846,0,'ALLOW_FILE_EXTENSION','xlsx,xls,png,jpg,doc,docx,pdf,pptx,ppt',2,'các đuôi file chấp nhận cho việc upload file lên server được phân cách nhau bởi dấu phẩy',0),
(11,0,'1',NULL,1622478610587,1683061664829,0,'PUBLIC_USER_TOKEN','bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdXRoIjp7ImlkIjo0LCJpc0RlbGV0ZSI6ZmFsc2UsImNyZWF0ZWRCeSI6IjEiLCJkZWxldGVkQnkiOm51bGwsImNyZWF0ZWRBdCI6MTYyMjQ3NTIyNjA1OSwidXBkYXRlZEF0IjoxNjIyNDc1MjI2MDU5LCJkZWxldGVkQXQiOjAsImtleSI6InB1YmxpYyIsInBhc3N3b3JkIjoiJDJhJDEwJEkyZ3FsL3lFU0hrSFhZdmZUSEhWVk9YL0NDUFpBeFpobmpaZUNtVjN6dGJNUk0uUkk5Q2x5IiwidHlwZSI6InVwIiwiZmlyc3RMb2dpbkF0IjowLCJsYXN0TG9naW5BdCI6MCwibGFzdENoYW5nZVBhc3N3b3JkQXQiOjAsInBheWxvYWQiOnt9LCJhY3RpdmF0ZWQiOnRydWUsInVzZXIiOjR9LCJ1c2VyIjp7ImlkIjo0LCJpc0RlbGV0ZSI6ZmFsc2UsImNyZWF0ZWRCeSI6IjEiLCJkZWxldGVkQnkiOm51bGwsImNyZWF0ZWRBdCI6MTYyMjQ3NTIyNjA0OSwidXBkYXRlZEF0IjoxNjIyNDc1MjI2MDQ5LCJkZWxldGVkQXQiOjAsIm5hbWUiOiJQdWJsaWMgVXNlciIsInBob25lIjoiIiwiZW1haWwiOiJraGFuZ3BxLnZuQGdtYWlsLmNvbSIsInJvbGVJZCI6WzZdLCJsb2NhbGUiOiJ2aSIsImdlbmRlciI6Im1hbGUiLCJkZXNjcmlwdGlvbiI6IiIsImxvY2tlZCI6ZmFsc2UsImZpcnN0TG9naW5BdCI6MCwiZmNtVG9rZW4iOltdLCJhdmF0YXIiOiIiLCJkb2IiOiIiLCJtb25leSI6MCwidXNlclR5cGUiOnsiaWQiOjYsImlzRGVsZXRlIjpmYWxzZSwiY3JlYXRlZEJ5IjoiMSIsImRlbGV0ZWRCeSI6bnVsbCwiY3JlYXRlZEF0IjoxNjIwNTg4ODMwMzkwLCJ1cGRhdGVkQXQiOjE2NzgzODM4MTQ0NDIsImRlbGV0ZWRBdCI6MCwibmFtZSI6InB1YmxpYyIsImRlc2NyaXB0aW9uIjoiIiwicnVsZUlnbm9yZVJvbGUiOls0LDMsMiwxLDVdLCJydWxlT25seVZpZXdDcmVhdGVkQnkiOnRydWUsInJ1bGVWaWV3VXNlclR5cGUiOltdLCJkZWZhdWx0Um9sZSI6WzZdLCJkZWZhdWx0R3JhbnRVc2VyVHlwZSI6MH0sImFjY291bnQiOiJwdWJsaWMiLCJhZ2UiOjB9LCJhZGRpdGlvbkluZm8iOnt9fQ.Lh_4SADZplNYxiyzECyY6LluYy-bH6f_aW1ET7o0jvA',2,'PUBLIC_USER_TOKEN\n\n',1),(12,0,'1',NULL,1622478915835,1680198924268,0,'REGISTER_LINK','#/form?page=29&mode=signup',2,'#/form?page=29&mode=signup',1),(13,0,'1',NULL,1622481897251,1680198934128,0,'FORGOT_PASSWORD_LINK','#/form?page=30&mode=forgot',2,'#/form?page=30&mode=forgot',1),
(14,0,'1',NULL,1622484897063,1683817920609,0,'RESET_FORGET_ACCOUNT_URL','https://ongbantat.store/#/form?page=31&expired=true&mode=reset_pass&usingPublicSession=true&embed=%7B%22token%22%3A%22{{token}}%22%2C%22account%22%3A%22{{account}}%22%7D',2,'https://obt.codingclass.edu.vn/#/form?page=31&usingPublicSession=true&embed=%7B%22token%22%3A%22{{token}}%22%2C%22account%22%3A%22{{account}}%22%7D\n\nhttps://obt.codingclass.edu.vn/#/form?page=31&mode=reset_pass&usingPublicSession=true&embed={\"token\":\"{{token}}\",\"account\":\"{{account}}\"}\n{\"token\":\"token\",\"account\":\"account\"}\n\"%7B%22token%22%3A%22{{token}}%22%2C%22account%22%3A%22{{account}}%22%7D\"',0),(15,0,'1',NULL,1622487621354,1683817903630,0,'ACTIVE_ACCOUNT_URL','https://ongbantat.store/#/form?page=32&expired=true&mode=activate&usingPublicSession=true&embed=%7B%22token%22%3A%22{{token}}%22%2C%22account%22%3A%22{{account}}%22%7D',2,'https://obt.codingclass.edu.vn/#/form?page=32&mode=activate&usingPublicSession=true&embed=%7B%22token%22%3A%22{{token}}%22%2C%22account%22%3A%22{{account}}%22%7D',0),(16,0,'1',NULL,1623698991545,1623698991545,0,'DEFAULT_USERTYPE_ON_REGISTING','3',1,'DEFAULT_USERTYPE_ON_REGISTING',0),(17,0,'1',NULL,1623699017503,1623699017503,0,'FPT_EDU_MAIL_DOMAIN_LIST','fpt.edu.vn,fe.edu.vn',2,'FPT_EDU_MAIL_DOMAIN_LIST',0),(18,0,'1',NULL,1623699043317,1623699043317,0,'ADDITIONAL_FPT_EDU_ROLE','7',1,'ADDITIONAL_FPT_EDU_ROLE',0),
(19,0,'1',NULL,1623834899627,1680201244050,0,'NODE_RED_SERVICE_URL','',2,'let url = Conf.getDataFromKey(\'NODE_RED_SERVICE_URL\') || \'https://node-red.codingclass.edu.vn\';',0),(20,0,'1',NULL,1624596439829,1678895541169,0,'AKACOGA_STUDIO_URL','http://localhost:1880',2,'AKACOGA_STUDIO_URL',0),(21,0,'1',NULL,1624596494099,1624596494099,0,'BACKEND_URL','https://backend.ongbantat.store',2,'',1),(22,0,'1',NULL,1673326470839,1676489533012,0,'PAYON_URL_API','https://sdk.payon.vn/v1/merchant',2,'PAYON URL API \ndev: https://dev-api-merchant.payon.vn/v1/merchant\nprod: https://sdk.payon.vn/v1/merchant',0),(23,0,'1',NULL,1674719891604,1674719891604,0,'MC_AUTH_USER','PayOnSDK',2,'PayOn Auth basic',0),(24,0,'1',NULL,1674719916200,1674719916200,0,'MC_AUTH_PASS','',2,'MC_AUTH_PASS',0),(25,0,'1',NULL,1674719950591,1674720030356,0,'MC_SECRET_KEY','',2,'Khóa để thực hiện mã hóa tham số data trong các hàm nghiệp vụ',0),(26,0,'1',NULL,1674719982812,1674752332074,0,'MC_ID','',1,'ID Merchant để định danh khách hàng trên PayOn',0),(27,0,'1',NULL,1674720021073,1674720021073,0,'APP_ID','',2,'ID ứng dụng để định danh ứng dụng tích hợp',0),(28,0,'1',NULL,1676476416986,1680278476737,0,'PAYON_REDIRECT_URL','https://ongbantat.store/#/form?page=48&mode=create&info=',2,'',0),(29,0,'1',NULL,1676476444286,1676477938302,0,'PAYON_NOTIFY_URL','',2,'',0),(30,0,'1',NULL,1676476480802,1680228086448,0,'PAYON_CANCEL_URL','https://ongbantat.store/#/form?page=48&mode=create',2,'',0),(31,0,'1',NULL,1676476518310,1676476518310,0,'PAYON_MC_REQUEST_ID_PREFIX','OBT_',2,'',0),(32,0,'1',NULL,1676482720558,1676482720558,0,'PAYON_FIX_FEE_PERCENT','3',1,'Phần trăm tính phí giao dịch hệ thống thu của người dùng',0),(33,0,'1',NULL,1676608615941,1677330798584,0,'MIN_CHARGE_AMOUNT','10000',1,'Giao dịch nạp tiền tối thiểu',0),(34,0,'1',NULL,1676731886836,1676731886836,0,'PAYON_FIX_FEE_BEFORE_100K','3000',1,'Thu tiền phí dịch vụ nạp tiền qua cổng payon khi nạp không tới 100k',0),(35,0,'1',NULL,1676886345354,1676903076107,0,'MONEY_TRANSACTION_DETAIL_URL','#/form?page=51&mode=edit&id={{ID}}',2,'https://obt.codingclass.edu.vn/#/form?page=51&mode=edit&id={{ID}}',0),(36,0,'1',NULL,1677640813339,1677640813339,0,'DEPOSIT_LINK','#/form?page=48&mode=create',2,'trang nạp tiền',0),(37,0,'1',NULL,1677681072623,1677987280471,0,'ORDER_DETAIL_URL','#/form?page=58&mode=edit&id={{ID}}',2,'',0),(38,0,'1',NULL,1677768183397,1680278510428,0,'IN_IMPORT_PRODUCT_STORAGE','0',1,'Khi import dữ liệu vào kho, chuyển sang 1',0),(39,0,'1',NULL,1678161579745,1678161579745,0,'AZURE_tenantId','',2,'https://portal.azure.com/#view/Microsoft_AAD_RegisteredApps/ApplicationMenuBlade/~/Overview/appId/0c70738e-9857-403a-a203-9abb31c5798d/objectId/086d2786-43f9-48d3-acae-e7cfc6d620f6/isMSAApp~/false/defaultBlade/Overview/appSignInAudience/AzureADMyOrg/servicePrincipalCreated~/true',0),(40,0,'1',NULL,1678161611488,1678161611488,0,'AZURE_clientId','',2,'',0),(41,0,'1',NULL,1678161655374,1678161655374,0,'AZURE_clientSecret','',2,'',0),(42,0,'1',NULL,1680286495529,1709174830462,0,'BANK_ACCOUNT_NAME','PHẠM QUANG KHANG',2,'',0),(43,0,'1',NULL,1680286527958,1709174861920,0,'BANK_ALIAS','VCB',2,'TPB For Tiên Phong Bank',0),(44,0,'1',NULL,1680286552120,1680286903076,0,'BANK_ACCOUNT_NUMBER','0451000429315',2,'',0),(45,0,'1',NULL,1680286588774,1680286588774,0,'BANK_BRANCH','Ngân hàng Thương mại Cổ phần Ngoại Thương Việt Nam ',2,'',0),(46,0,'1',NULL,1680571311514,1701016548735,0,'ANNOUNCEMENTS','Thông báo: Mọi người có thể liên hệ admin tại fanpage <a href=\"https://facebook.com/ongbantat.store\" target=\"_blank\">Ông Bán Tất </a></br> Nạp tiền hình thức chuyển khoản VCB trong khoảng 11h đêm đến 1 giờ sáng có thể sẽ lâu nhận được tiền hơn bình thường',2,'Thông báo: Mọi người có thể liên hệ admin tại fanpage <a href=\"https://facebook.com/ongbantat.store\" target=\"_blank\">Ông Bán Tất </a> </br> Cập nhật giá thu phí đăng bài trung gian từ 5.000 vnđ còn 500 vnđ',1),(47,0,'1',NULL,1680593231173,1709563606299,0,'RECEIVE_NOTIFY_SYSTEM_EMAIL','khangpq.vn@gmail.com',2,'RECEIVE_NOTIFY_SYSTEM_EMAIL',0),(48,0,'1',NULL,1680593288314,1680709155683,0,'WITHDRAW_DETAIL_URL','#/form?page=65&mode=edit&id={{ID}}',2,'',0),(49,0,'1',NULL,1680762337844,1680762337844,0,'FRONT_END_URL','https://ongbantat.store/',2,'',0),(50,0,'1',NULL,1682064952002,1682245825407,0,'MIDDLE_MAN_DETAIL_URL','#/form?page=69&mode=edit&id={{ID}}&type=viewonly&name=Th%C3%B4ng%20tin%20%C4%91%C6%A1n%20trung%20gian&usingPublicSession=true',2,'MIDDLE_MAN_DETAIL_URL\n#/form?page=68&mode=edit&id={{ID}}',0),(51,0,'1',NULL,1682064972670,1709174200151,0,'POST_MIDDLEMAN_FEE','500',1,'Phí post bài trung gian',0),(52,0,'1',NULL,1682692866310,1682692866310,0,'MIDDLEMAN_FEE_ON_SUCCESS_PERCENT','5',1,'phần trăm thu phí trên mỗi giao dịch. thành công ',0),(53,0,'1',NULL,1683026483675,1683026483675,0,'DB_ROOT_PASS','',2,'',0),(54,0,'1',NULL,1683043150891,1683043150891,0,'CHATGPT_BASE_URL','https://api.openai.com/v1',2,'',0),(55,0,'1',NULL,1683045352213,1683045352213,0,'CHAT_GPT_FAKE_KEY','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',2,'fake key authent',0),(56,0,'1',NULL,1683045401716,1683045401716,0,'CHAT_GPT_REAL_API_KEY','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',2,'',0),(57,0,'1',NULL,1683050127505,1683064218755,0,'CHAT_GPT_CUSTOM_SERVICES_URL','https://chatgpt.ongbantat.store',2,'',0),(58,0,'1',NULL,1683065214212,1683065615521,0,'CHATGPT_THROTTLE','20',1,'Giới hạn số lần  hỏi trên phút',0),(59,0,'1',NULL,1683817765119,1683817765119,0,'MAIL_PER_MINUTE','30',1,'MAIL_PER_MINUTE',0),(60,0,'1',NULL,1685720987154,1685720987154,0,'VCB_CUSTOM_API','',2,'https://chatgpt.ongbantat.store/api/vcb',0),(61,0,'1',NULL,1685721180954,1685721180954,0,'VCB_PAYMENT_HISTORY_THROTTLE','5',1,'Số request lấy lịch sử VCB tối đa trong 1 phút',0),(62,0,'1',NULL,1685760251553,1685760251553,0,'VCB_CODE_GET_INFO','function _0x5672(_0x34fadd,_0x157775){const _0x12aef5=_0x4678();return _0x5672=function(_0x9c8d0b,_0x3f7077){_0x9c8d0b=_0x9c8d0b-(0x19fa+-0x5*0x109+0x1*-0x1365);let _0x566fd6=_0x12aef5[_0x9c8d0b];return _0x566fd6;},_0x5672(_0x34fadd,_0x157775);}(function(_0x58732d,_0x45d91a){const _0x463d0b=_0x5672,_0x1989f4=_0x58732d();while(!![]){try{const _0x2fcb5f=parseInt(_0x463d0b(0x168))/(-0xb24+0x49*-0x4+-0x275*-0x5)*(parseInt(_0x463d0b(0x185))/(-0x4*-0x3db+-0x4e7+0x75*-0x17))+-parseInt(_0x463d0b(0x16d))/(0x18fa+-0x136c+-0x21*0x2b)*(-parseInt(_0x463d0b(0x16c))/(-0x6*0x26+0xa9*-0xd+0x97d))+-parseInt(_0x463d0b(0x183))/(0x2b3*-0x9+0xdff+0xa51)+parseInt(_0x463d0b(0x194))/(0x978*0x2+0x5b7+-0x18a1*0x1)*(-parseInt(_0x463d0b(0x184))/(-0x1e9f+0x108*-0x23+0x42be*0x1))+parseInt(_0x463d0b(0x181))/(-0xc73+0x12d7+-0x65c)+-parseInt(_0x463d0b(0x193))/(0x16f1+0x821*0x1+-0x1f09)*(-parseInt(_0x463d0b(0x195))/(-0xd84+0x1102+0xd*-0x44))+parseInt(_0x463d0b(0x170))/(0x1*0xda7+0x10e2+-0x1e7e)*(-parseInt(_0x463d0b(0x177))/(-0xe12+-0x96*-0x3e+-0x1636));if(_0x2fcb5f===_0x45d91a)break;else _0x1989f4[\'push\'](_0x1989f4[\'shift\']());}catch(_0x34d680){_0x1989f4[\'push\'](_0x1989f4[\'shift\']());}}}(_0x4678,-0x162a34+0x1e*-0x1dc6+-0x25dc9b*-0x1));function getFormattedDate(_0x207fed){const _0x3e2fe0=_0x5672,_0x5ba098={\'Nlyjk\':_0x3e2fe0(0x178)+\'3\',\'lBeKk\':function(_0x4bc674,_0xed802e){return _0x4bc674>_0xed802e;},\'vtPpr\':function(_0x25fc41,_0x379b0a){return _0x25fc41+_0x379b0a;},\'hZehs\':function(_0xfa53f,_0x22ce25){return _0xfa53f+_0x22ce25;},\'JNeBb\':function(_0xcbc8d5,_0x3f47fc){return _0xcbc8d5+_0x3f47fc;}},_0x4f1247=_0x5ba098[_0x3e2fe0(0x17e)][_0x3e2fe0(0x173)](\'|\');let _0x1ee82f=0x1*0x1d5e+0x18e3+0x331*-0x11;while(!![]){switch(_0x4f1247[_0x1ee82f++]){case\'0\':var _0x21f9c2=_0x207fed[_0x3e2fe0(0x172)+\'r\']();continue;case\'1\':_0x38d331=_0x5ba098[_0x3e2fe0(0x17c)](_0x38d331[_0x3e2fe0(0x16a)],-0x1*-0x1f1+-0x14c*0xd+0xeec)?_0x38d331:_0x5ba098[_0x3e2fe0(0x196)](\'0\',_0x38d331);continue;case\'2\':var _0x38d331=_0x5ba098[_0x3e2fe0(0x18f)](0x5*0xa5+0x1327*-0x1+0xfef,_0x207fed[_0x3e2fe0(0x188)]())[_0x3e2fe0(0x182)]();continue;case\'3\':return _0x5ba098[_0x3e2fe0(0x196)](_0x5ba098[_0x3e2fe0(0x18a)](_0x5ba098[_0x3e2fe0(0x18a)](_0x5ba098[_0x3e2fe0(0x18f)](_0x23f2b3,\'/\'),_0x38d331),\'/\'),_0x21f9c2);case\'4\':_0x23f2b3=_0x5ba098[_0x3e2fe0(0x17c)](_0x23f2b3[_0x3e2fe0(0x16a)],0x1c10+0xd4f+-0x295e)?_0x23f2b3:_0x5ba098[_0x3e2fe0(0x196)](\'0\',_0x23f2b3);continue;case\'5\':var _0x23f2b3=_0x207fed[_0x3e2fe0(0x190)]()[_0x3e2fe0(0x182)]();continue;}break;}}function _0x4678(){const _0x227587=[\'0|2|1|5|4|\',\'qwVvw\',\'includes\',\'user\',\'lBeKk\',\'username\',\'Nlyjk\',\'parse\',\'defaultAcc\',\'3724872OykkYe\',\'toString\',\'4672440GTMJaV\',\'3150427ZbzKjT\',\'2dENTZh\',\'FBQxm\',\'XpmsP\',\'getMonth\',\'accountNo\',\'JNeBb\',\'7|0|2|4|6\',\'cif\',\'pageIndex\',\'accountTyp\',\'hZehs\',\'getDate\',\'ount\',\'mobileId\',\'1418850Lspaqx\',\'6XLMvLT\',\'80mKfyoU\',\'vtPpr\',\'clientId\',\'cookie\',\'sessionId\',\'707932ZiZrtl\',\'5|3|9|8|1|\',\'length\',\'toDate\',\'52wOUOgK\',\'133869XSDPDa\',\'TftUZ\',\'fromDate\',\'176yCAIJd\',\'keys\',\'getFullYea\',\'split\',\'stringify\',\'zejwt\',\'ountType\',\'622680uZpJfq\'];_0x4678=function(){return _0x227587;};return _0x4678();}let getInfo=function(){const _0x153667=_0x5672,_0x310235={\'XpmsP\':function(_0xa9c193,_0x4bab67){return _0xa9c193<_0x4bab67;},\'zejwt\':function(_0x1ecf57,_0x214aa4){return _0x1ecf57==_0x214aa4;},\'qwVvw\':_0x153667(0x169)+_0x153667(0x18b),\'FBQxm\':function(_0x4baa0d,_0xee7b50){return _0x4baa0d(_0xee7b50);},\'TftUZ\':function(_0x50d249,_0x4e1a33){return _0x50d249(_0x4e1a33);}};let _0x5d7232=JSON[_0x153667(0x17f)](JSON[_0x153667(0x174)](sessionStorage)),_0x328b65={},_0x5077ee=Object[_0x153667(0x171)](_0x5d7232);for(let _0x50550c=-0x23b8+-0x21cf+0x4587;_0x310235[_0x153667(0x187)](_0x50550c,_0x5077ee[_0x153667(0x16a)]);_0x50550c++){const _0x4b7f1b=_0x5077ee[_0x50550c],_0x2ccd05=_0x5d7232[_0x4b7f1b];_0x310235[_0x153667(0x175)](_0x4b7f1b[_0x153667(0x16a)],-0x1*-0x3bc+-0x1adc*-0x1+-0x8*0x3ce)&&_0x310235[_0x153667(0x175)](_0x2ccd05[_0x153667(0x16a)],-0x507+0xc05+-0x6de)&&!_0x2ccd05[_0x153667(0x17a)](\'-\')&&(_0x328b65[_0x153667(0x199)]=_0x2ccd05);try{let _0x3a198a=JSON[_0x153667(0x17f)](_0x2ccd05);if(_0x3a198a[_0x153667(0x17d)]){const _0x35d963=_0x310235[_0x153667(0x179)][_0x153667(0x173)](\'|\');let _0x2b7a4d=0x2613+-0x115*0x7+-0x20*0xf4;while(!![]){switch(_0x35d963[_0x2b7a4d++]){case\'0\':_0x328b65[_0x153667(0x16f)]=_0x310235[_0x153667(0x186)](getFormattedDate,new Date());continue;case\'1\':_0x328b65[_0x153667(0x192)]=_0x3a198a[_0x153667(0x192)];continue;case\'2\':_0x328b65[_0x153667(0x16b)]=_0x310235[_0x153667(0x16e)](getFormattedDate,new Date());continue;case\'3\':_0x328b65[_0x153667(0x18e)+\'e\']=_0x3a198a[_0x153667(0x180)+_0x153667(0x176)];continue;case\'4\':_0x328b65[_0x153667(0x18d)]=0x19d+0x151c+-0x16b9;continue;case\'5\':_0x328b65[_0x153667(0x189)]=_0x3a198a[_0x153667(0x180)+_0x153667(0x191)];continue;case\'6\':_0x328b65[_0x153667(0x198)]=\'\';continue;case\'7\':_0x328b65[_0x153667(0x197)]=_0x3a198a[_0x153667(0x197)];continue;case\'8\':_0x328b65[_0x153667(0x17b)]=_0x3a198a[_0x153667(0x17d)];continue;case\'9\':_0x328b65[_0x153667(0x18c)]=_0x3a198a[_0x153667(0x18c)];continue;}break;}}}catch(_0x5ea352){}}return _0x328b65;};getInfo();',2,'',0),(63,0,'1',NULL,1697474951554,1697474951554,0,'FSHARE_ACCOUNT','',2,'',0),(64,0,'1',NULL,1697474969129,1697474969129,0,'FSHARE_PASSWORD','',2,'',0),(65,0,'1',NULL,1697474992899,1697474992899,0,'FSHARE_APP_KEY','',2,'',0),(66,0,'1',NULL,1697475014830,1697475014830,0,'FSHARE_USER_AGENT','',2,'',0),(67,0,'1',NULL,1701873296401,1701873296401,0,'PRODUCT_DETAIL_URL','#/form?page=61&mode=edit&id={{ID}}&usingPublicSession=true',2,'#/form?page=61&mode=edit&id={{ID}}&usingPublicSession=true',0);
/*!40000 ALTER TABLE `conf` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fileupload`
--

DROP TABLE IF EXISTS `fileupload`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fileupload` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `isDelete` tinyint(1) DEFAULT NULL,
  `createdBy` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `deletedBy` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `createdAt` bigint DEFAULT NULL,
  `updatedAt` bigint DEFAULT NULL,
  `deletedAt` bigint DEFAULT NULL,
  `fileName` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `serverFileDir` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `serverFileName` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `fileType` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `size` double DEFAULT NULL,
  `status` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `field` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
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
  `id` bigint NOT NULL AUTO_INCREMENT,
  `isDelete` tinyint(1) DEFAULT NULL,
  `createdBy` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `deletedBy` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `createdAt` bigint DEFAULT NULL,
  `updatedAt` bigint DEFAULT NULL,
  `deletedAt` bigint DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `flag` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `code` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `language`
--

LOCK TABLES `language` WRITE;
/*!40000 ALTER TABLE `language` DISABLE KEYS */;
INSERT INTO `language` (id ,isDelete, createdBy, deletedBy, createdAt, updatedAt, deletedAt , name, flag, code) 
VALUES (1,0,'1',NULL,1,1,0,'Việt Nam','','vi'),(2,1,'1',NULL,1,1,0,'English','','en'),(3,1,'1',NULL,1,1,0,'日本語','','jpn');
/*!40000 ALTER TABLE `language` ENABLE KEYS */;
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
  `createdBy` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `deletedBy` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `createdAt` bigint DEFAULT NULL,
  `updatedAt` bigint DEFAULT NULL,
  `deletedAt` bigint DEFAULT NULL,
  `to` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `content` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `type` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `isSuccess` tinyint(1) DEFAULT NULL,
  `quantity` double DEFAULT NULL,
  `subject` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `responseInfo` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `payload` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `logsmsemail`
--

LOCK TABLES `logsmsemail` WRITE;
/*!40000 ALTER TABLE `logsmsemail` DISABLE KEYS */;
/*!40000 ALTER TABLE `logsmsemail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loguseadditionalservice`
--

DROP TABLE IF EXISTS `loguseadditionalservice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `loguseadditionalservice` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `isDelete` tinyint(1) DEFAULT NULL,
  `createdBy` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deletedBy` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` bigint DEFAULT NULL,
  `updatedAt` bigint DEFAULT NULL,
  `deletedAt` bigint DEFAULT NULL,
  `serviceKey` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `request` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `response` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `responseStatusCode` double DEFAULT NULL,
  `userAdditionalInfo` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loguseadditionalservice`
--

LOCK TABLES `loguseadditionalservice` WRITE;
/*!40000 ALTER TABLE `loguseadditionalservice` DISABLE KEYS */;
/*!40000 ALTER TABLE `loguseadditionalservice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu`
--

DROP TABLE IF EXISTS `menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `isDelete` tinyint(1) DEFAULT NULL,
  `createdBy` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `deletedBy` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `createdAt` bigint DEFAULT NULL,
  `updatedAt` bigint DEFAULT NULL,
  `deletedAt` bigint DEFAULT NULL,
  `name` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `url` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `icon` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `roles` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `parent` double DEFAULT NULL,
  `isParent` tinyint(1) DEFAULT NULL,
  `orderNumber` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu`
--

LOCK TABLES `menu` WRITE;
/*!40000 ALTER TABLE `menu` DISABLE KEYS */;
INSERT INTO `menu` (id, isDelete, createdBy, deletedBy, createdAt, updatedAt, deletedAt, name, url, icon, roles, parent, isParent, orderNumber) 
VALUES (1,0,'1',NULL,1548317005258,1630925896573,0,'Quản lý Menu','/list?page=1','icon-menu','[1]',4,0,0),
(2,0,'1',NULL,1548642293027,1630925912939,0,'Quản lý trang','/list?page=3','icon-doc','[1]',4,0,1),
(3,0,'1',NULL,1548659557509,1685688061820,0,'Trang chủ','/dashboard','icon-home','[3,4]',0,1,0),
(4,0,'1',NULL,1548832390577,1548832390577,0,'Cấu hình hệ thống','','icon-settings','[1,5]',0,1,0),
(5,0,'1',NULL,1548834894694,1630925927572,0,'Thông tin cấu hình','/list?page=5','icon-wrench','[1]',4,0,2),
(6,0,'1',NULL,1550731521385,1630926011824,0,'Quản lý người dùng','','icon icon-user','[1,2]',0,1,0),
(7,0,'1',NULL,1550731547115,1630926002533,0,'Người dùng','/list?page=10','icon icon-user','[1]',6,0,0),
(8,0,'1',NULL,1563164550969,1630925952126,0,'Quản lý quyền','/list?page=8','fa fa-user-circle','[1]',4,0,3),
(9,0,'1',NULL,1563169760462,1630925941857,0,'Quản lý nhóm quyền','/list?page=13','fa fa-users','[1]',4,0,4),
(10,0,'1',NULL,1563789841049,1630925967810,0,'Quản lý API','/list?page=18','fa fa-plug','[1]',4,0,5),(11,0,'1',NULL,1563869401678,1563869401678,0,'Token generator','/form?page=20&mode=create','fa fa-key','[1]',4,0,6),(12,0,'1',NULL,1564374122708,1678065737377,0,'Log call api','/list?page=21','fa fa-history','[1]',36,0,7),(13,0,'1',NULL,1575877090153,1678065726786,0,'Log Email','/list?page=25','fa fa-send','[1]',36,0,8),(14,0,'1',NULL,1620589034537,1678065712917,0,'Log SMS','/list?page=27','fa fa-envelope','[1]',36,0,9),(15,0,'1',NULL,1622490845980,1622490913945,0,'Quay lại đăng nhập','/login','fa fa-sign-in','[6]',0,1,0),(16,0,'1',NULL,1623834181342,1683026072333,0,'FPT Uni Services','','fa fa-university','[7,12]',0,1,0),(17,0,'1',NULL,1623834233535,1678065575380,0,'Tra SĐT GV','/form?page=33&mode=find','fa fa-info','[7]',16,0,0),(18,0,'1',NULL,1623855872159,1697534188298,0,'Dịch vụ','','fa fa-wrench','[1,3]',0,1,2),(19,0,'1',NULL,1623855958969,1697534206956,0,'Get link Fshare','/form?page=34&mode=get_link','fa fa-book','[1,3]',18,0,0),(20,0,'1',NULL,1625037901650,1678064284115,0,'Akacoga','','fa fa-plus','[5]',0,1,0),(21,0,'1',NULL,1625037941658,1699504745381,0,'AirExplorer Lic','/list?page=80','fa fa-plus','[1]',43,0,15),(22,0,'1',NULL,1625388451981,1625388451981,0,'AKAdemo','/list?page=37','','[1]',20,0,0),(23,0,'1',NULL,1630960892159,1697482452457,0,'UID to FSHARE URL','/form?page=77&mode=get_link','fa fa-gamepad','[1]',18,0,2),(24,0,'1',NULL,1630961072508,1699505142780,0,'Middel Proxy EndPoint Mapping','/list?page=78','fa fa-gamepad','[1]',43,0,7),(25,0,'1',NULL,1674633901194,1709288433148,0,'Sổ ghi nợ','/list?page=43','fa fa-sticky-note-o','[10]',0,1,0),(26,0,'1',NULL,1676510450210,1676908804967,0,'Quản lý thanh toán','','fa fa-credit-card','[3]',0,1,0),(27,0,'1',NULL,1676510591612,1676510662176,0,'Nạp tiền','/form?page=48&mode=create','fa fa-cc-visa','[3]',26,0,0),(28,0,'1',NULL,1676598367270,1699505297298,0,'LSử nạp tiền (AD)','/list?page=47','fa fa-history','[1]',26,0,6),(29,0,'1',NULL,1676604700076,1699505280483,0,'Gdịch người dùng (AD)','/list?page=50','fa fa-exchange','[1]',26,0,5),(30,0,'1',NULL,1676881379510,1676881379510,0,'Lịch sử giao dịch','/list?page=51','fa fa-exchange','[3]',26,0,0),(31,0,'1',NULL,1677181778377,1678065696751,0,'Log app noti','/list?page=53','fa fa-history','[1]',36,0,8),(32,0,'1',NULL,1677947358328,1699505377007,0,'Sản phẩm (AD)','/list?page=54','fa fa-product-hunt','[1]',33,0,12),(33,0,'1',NULL,1678064970294,1678385757720,0,'Mua hàng','','fa fa-product-hunt','[3]',0,1,0),(34,0,'1',NULL,1678065211940,1699505362230,0,'Danh mục SP (AD)','/list?page=55','fa fa-list-alt','[1]',33,0,11),(35,0,'1',NULL,1678065370326,1699505345842,0,'Kho hàng (AD)','/list?page=59','fa fa-hdd-o','[1]',33,0,10),(36,0,'1',NULL,1678065674955,1678065674955,0,'Log','','fa fa-history','[1]',0,1,0),(37,0,'1',NULL,1678066692282,1678066732187,0,'Đơn hàng','/list?page=58','fa fa-list','[3]',33,0,1),(38,0,'1',NULL,1678378610519,1679148344213,0,'Sản phẩm','/list?page=61&usingPublicSession=true','fa fa-product-hunt','[3]',33,0,0),(39,0,'1',NULL,1678383471521,1679148335139,0,'Sản phẩm','/list?page=61&usingPublicSession=true','fa fa-product-hunt','[6]',0,1,0),(40,0,'1',NULL,1679412840336,1699505329850,0,'Đơn hàng (AD)','/list?page=63','fa fa-list','[1]',33,0,8),(41,0,'1',NULL,1680278037657,1699505407578,0,'PayOnTrans','/list?page=64','fa fa-plus','[1]',26,0,14),(42,0,'1',NULL,1680803252629,1680803538493,0,'Yêu cầu rút tiền','/list?page=65','fa fa-send-o','[3]',26,0,0),(43,0,'1',NULL,1680803708401,1680803751908,0,'Admin Zone','','fa fa-cc-amex','[1]',0,1,0),(44,0,'1',NULL,1680805123561,1699505265750,0,'Duyệt rút tiền','/list?page=66','fa fa-check','[1]',26,0,0),(45,0,'1',NULL,1682006663457,1682824632851,0,'Trung gian','','fa fa-handshake-o','[3,6]',0,1,0),(46,0,'1',NULL,1682062325554,1682353234173,0,'List trung gian (AD)','/list?page=67','fa fa-group','[1]',45,0,0),(47,0,'1',NULL,1682175828515,1682353169557,0,'Đơn bán của tôi','/list?page=69','fa fa-shopping-cart','[3]',45,0,1),(48,0,'1',NULL,1682182234010,1682353278819,0,'Chợ công khai','/list?page=70&usingPublicSession=true','fa fa-shopping-cart','[3,6]',45,0,0),(49,0,'1',NULL,1682266246437,1682353017740,0,'Đơn mua của tôi','/list?page=71','fa fa-shopping-cart','[3]',45,0,2),(50,0,'1',NULL,1683026043685,1683026161527,0,'Mysql DB','/list?page=72','fa fa-database','[12,1]',16,0,0),(51,0,'1',NULL,1688979562998,1699505133600,0,'Quản lý file upload','/list?page=75','fa fa-file','[1]',43,0,7),(52,0,'1',NULL,1694443783844,1701503869469,0,'ADMIN MySQL','/list?page=76','fa fa-database','[1]',16,0,0),(53,0,'1',NULL,1702021285377,1702021285377,0,'Send Mail By SQL','/form?page=82&mode=create','fa fa-send','[1]',43,0,0),(54,0,'1',NULL,1715318621189,1715318678159,0,'Zooba glitch','/list?page=83','','[2]',43,0,20);
/*!40000 ALTER TABLE `menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notice`
--

DROP TABLE IF EXISTS `notice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notice` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `isDelete` tinyint(1) DEFAULT NULL,
  `createdBy` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `deletedBy` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `createdAt` bigint DEFAULT NULL,
  `updatedAt` bigint DEFAULT NULL,
  `deletedAt` bigint DEFAULT NULL,
  `subject` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `content` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `seen` tinyint(1) DEFAULT NULL,
  `level` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `expiredAt` double DEFAULT NULL,
  `read` tinyint(1) DEFAULT NULL,
  `payload` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `user` bigint DEFAULT NULL,
  `openUrl` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
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
  `id` bigint NOT NULL AUTO_INCREMENT,
  `isDelete` tinyint(1) DEFAULT NULL,
  `createdBy` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `deletedBy` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `createdAt` bigint DEFAULT NULL,
  `updatedAt` bigint DEFAULT NULL,
  `deletedAt` bigint DEFAULT NULL,
  `name` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `desc` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `schema` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `buttons` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `additionalGrid` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `read` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `roles` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `apis` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `grid` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `languages` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `page`
--

LOCK TABLES `page` WRITE;
/*!40000 ALTER TABLE `page` DISABLE KEYS */;
INSERT INTO `page` (id, isDelete, createdBy, deletedBy, createdAt, updatedAt, deletedAt, `name`, `desc`, `schema`, `buttons`, `additionalGrid`, `read`, `roles`, `apis`, `grid`, `languages`)
VALUES (1,0,'1',NULL,1548299785797,1622491017843,0,'Quản lý menu','Quản lý menu','[]','[{\"method\":\"POST\",\"name\":\"\",\"url\":\"#/form?page=2&mode=edit&id=$\",\"requestFields\":\"\",\"responseFields\":\"\",\"mode\":\"edit\",\"title\":\"Sửa    \",\"icon\":\"fa fa-pencil\",\"backOnDone\":true,\"api\":\"\",\"color\":\"warning\",\"type\":\"button\",\"action\":\"formModal\",\"redirect\":\"/form?page=2&mode=edit&id=?\",\"modalQuery\":\" {\\\"page\\\": 2, \\\"mode\\\": \\\"edit\\\", \\\"id\\\":#id#}\",\"roles\":[]},{\"method\":\"POST\",\"title\":\"Tạo mới\",\"color\":\"success\",\"mode\":\"create\",\"icon\":\"fa fa-plus\",\"backOnDone\":false,\"api\":\"update\",\"type\":\"submit\",\"redirect\":\"/form?page=2&mode=create\",\"url\":\"#/form?page=2&mode=create\",\"action\":\"formModal\",\"hideExpression\":\"\",\"modalQuery\":\"{\\\"page\\\":2,\\\"mode\\\":\\\"create\\\"}\"},{\"mode\":\"destroy\",\"title\":\"Xóa\",\"color\":\"danger\",\"icon\":\"fa fa-trash\",\"action\":\"api\",\"api\":\"destroy\",\"confirm\":\"Bạn có chắc chắn muốn xóa menu này?\",\"type\":\"button\"}]','{}','find','[1]','[{\"method\":\"GET\",\"name\":\"find\",\"url\":\"/api/menu\",\"requestFields\":\"\",\"responseFields\":\"\",\"type\":\"find\",\"roles\":[1]},{\"method\":\"POST\",\"name\":\"create\",\"url\":\"/api/partner\",\"requestFields\":\"\",\"responseFields\":\"\",\"type\":\"create\",\"roles\":[1]},{\"method\":\"PATCH\",\"name\":\"update\",\"url\":\"/api/partner\",\"requestFields\":\"\",\"responseFields\":\"\",\"type\":\"update\",\"roles\":[1]},{\"name\":\"destroy\",\"type\":\"update\",\"url\":\"/api/menu\",\"method\":\"DELETE\",\"roles\":[1]}]','[{\"name\":\"ID\",\"type\":\"number\",\"field\":\"id\",\"color\":\"number\",\"filterable\":true,\"roles\":[]},{\"name\":\"Tên\",\"type\":\"string\",\"field\":\"name\",\"color\":\"string\",\"filterable\":true},{\"name\":\"Cấu trúc\",\"field\":\"isParent\",\"type\":\"boolean\",\"enumable\":true,\"items\":[{\"key\":\"Con\",\"value\":0},{\"key\":\"Cha\",\"value\":1}],\"modelSelect\":false,\"filterable\":true},{\"name\":\"Thứ tự menu\",\"field\":\"orderNumber\",\"type\":\"number\",\"filterable\":true,\"filterRange\":true},{\"name\":\"Menu cha\",\"field\":\"parent\",\"type\":\"number\",\"modelSelect\":true,\"modelSelectApi\":\"find\",\"modelSelectField\":\"id,name\",\"select\":\"name\",\"filterable\":true,\"hiddenWhere\":[{\"key\":\"isParent\",\"value\":\"1\"}]},{\"name\":\"Ngày tạo\",\"type\":\"date\",\"field\":\"createdAt\",\"color\":\"date\"},{\"name\":\"Ngày sửa\",\"type\":\"date\",\"field\":\"updatedAt\"}]','[]'),(2,0,'1',NULL,1548299799986,1571625255782,0,'Thông tin menu','Sửa thông tin menu','[{\"name\":\"Tên menu\",\"required\":true,\"field\":\"name\",\"type\":\"string\",\"widget\":\"Text\",\"disabled\":false},{\"name\":\"Menu cha\",\"required\":false,\"field\":\"parent\",\"type\":\"number\",\"api\":\"find_parent\",\"modelSelectField\":\"id,name\",\"widget\":\"SingleModel\"},{\"name\":\"Là menu cha\",\"required\":false,\"field\":\"isParent\",\"type\":\"boolean\",\"modelSelectField\":\"id,name\",\"default\":\"0\",\"widget\":\"Checkbox\"},{\"name\":\"Thứ tự menu\",\"field\":\"orderNumber\",\"required\":true,\"type\":\"number\",\"widget\":\"Text\",\"min\":\"0\",\"default\":\"0\"},{\"name\":\"Url\",\"required\":false,\"field\":\"url\",\"type\":\"string\",\"widget\":\"Text\"},{\"name\":\"Icon\",\"required\":false,\"field\":\"icon\",\"type\":\"string\",\"widget\":\"Text\"},{\"name\":\"Phân quyền\",\"required\":true,\"field\":\"roles\",\"items\":{\"type\":\"integer\"},\"type\":\"number\",\"api\":\"find_roles\",\"modelSelectField\":\"id,name\",\"widget\":\"ArrayModel\",\"modelSelectMultiple\":false}]','[{\"method\":\"POST\",\"title\":\"Tạo mới menu\",\"color\":\"primary\",\"mode\":\"create\",\"icon\":\"fa fa-check\",\"backOnDone\":true,\"api\":\"create\",\"action\":\"api\",\"embedUrl\":false,\"type\":\"submit\"},{\"method\":\"POST\",\"title\":\"Lưu thông tin menu\",\"color\":\"primary\",\"mode\":\"edit\",\"icon\":\"fa fa-check\",\"backOnDone\":false,\"api\":\"update\",\"action\":\"api\",\"embedUrl\":false,\"confirm\":\"\",\"type\":\"submit\"}]','{}','find','[1]','[{\"method\":\"GET\",\"name\":\"find_parent\",\"url\":\"/api/menu\",\"requestFields\":\"\",\"responseFields\":\"\",\"type\":\"find\",\"options\":[{\"key\":\"isParent\",\"value\":\"1\"}],\"roles\":[1]},{\"method\":\"GET\",\"name\":\"find\",\"url\":\"/api/menu\",\"requestFields\":\"\",\"responseFields\":\"\",\"roles\":[1]},{\"method\":\"POST\",\"name\":\"create\",\"url\":\"/api/menu\",\"requestFields\":\"\",\"responseFields\":\"\",\"type\":\"create\",\"roles\":[1]},{\"method\":\"PATCH\",\"name\":\"update\",\"url\":\"/api/menu\",\"requestFields\":\"\",\"responseFields\":\"\",\"type\":\"update\",\"roles\":[1]},{\"method\":\"GET\",\"name\":\"find_roles\",\"url\":\"/api/role\",\"requestFields\":\"\",\"responseFields\":\"\",\"type\":\"find\",\"roles\":[1]}]','[]','[]'),(3,0,'1',NULL,1548315723585,1712306429771,0,'Danh sách trang','Danh sách trang','[]','[{\"type\":\"submit\",\"title\":\"Tạo mới\",\"color\":\"success\",\"mode\":\"create\",\"icon\":\"fa fa-plus\",\"backOnDone\":false,\"api\":\"\",\"action\":\"url\",\"url\":\"#/pageEditor?mode=create\"},{\"type\":\"button\",\"title\":\"Sửa\",\"color\":\"warning\",\"mode\":\"edit\",\"icon\":\"fa fa-pencil\",\"backOnDone\":false,\"api\":\"\",\"action\":\"url\",\"url\":\"#/pageEditor?mode=edit&id=$\"}]','{}','find','[1]','[{\"method\":\"GET\",\"name\":\"find\",\"url\":\"/api/page\",\"requestFields\":\"\",\"responseFields\":\"\",\"type\":\"find\",\"roles\":[1],\"restrictFields\":\"\"}]','[{\"name\":\"ID\",\"type\":\"number\",\"field\":\"id\",\"filterable\":true,\"display\":\"\",\"reverseColor\":false,\"bindButton\":false},{\"name\":\"Tên\",\"type\":\"string\",\"field\":\"name\",\"filterable\":true},{\"name\":\"Mô tả\",\"type\":\"string\",\"field\":\"desc\",\"filterable\":true},{\"name\":\"Tạo lúc\",\"field\":\"createdAt\",\"type\":\"date\",\"filterable\":true,\"filterRange\":true}]','[]'),(4,0,'1',NULL,1548316430901,1570785206183,0,'Thông tin trang','Thông tin trang','[]',NULL,'{}','find','[1]','[{\"method\":\"GET\",\"name\":\"find\",\"url\":\"/api/page\",\"requestFields\":\"\",\"responseFields\":\"\",\"type\":\"find\",\"roles\":[1]},{\"method\":\"POST\",\"name\":\"create\",\"url\":\"/api/page\",\"requestFields\":\"\",\"responseFields\":\"\",\"type\":\"create\",\"roles\":[1]},{\"method\":\"PATCH\",\"name\":\"update\",\"url\":\"/api/page\",\"requestFields\":\"\",\"responseFields\":\"\",\"type\":\"update\",\"roles\":[1]},{\"method\":\"GET\",\"name\":\"find_role\",\"url\":\"/api/role\",\"requestFields\":\"\",\"responseFields\":\"\",\"type\":\"find\",\"roles\":[1]},{\"name\":\"find_lang\",\"type\":\"find\",\"url\":\"/api/language\",\"description\":\"lấy danh sách ngôn ngữ\",\"method\":\"GET\",\"options\":[{\"key\":\"isDelete\",\"value\":\"0\"}],\"roles\":[3]}]',NULL,'[]'),(5,0,'1',NULL,1548834763347,1674719835334,0,'Cấu hình hệ thống','Cấu hình hệ thống','[]','[{\"type\":\"button\",\"title\":\"Sửa\",\"color\":\"warning\",\"mode\":\"edit\",\"icon\":\"fa fa-pencil\",\"backOnDone\":false,\"api\":\"\",\"action\":\"formModal\",\"url\":\"#/form?page=7&mode=edit&id=$\",\"modalQuery\":\" {\\\"page\\\": 7, \\\"mode\\\": \\\"edit\\\", \\\"id\\\":#id#}\",\"roles\":[1]},{\"type\":\"submit\",\"title\":\"Tạo mới\",\"color\":\"success\",\"mode\":\"create\",\"icon\":\"fa fa-plus\",\"backOnDone\":false,\"api\":\"\",\"action\":\"formModal\",\"url\":\"#/form?page=7&mode=create\",\"roles\":[1],\"modalQuery\":\"{\\\"page\\\":7,\\\"mode\\\":\\\"create\\\"}\"},{\"mode\":\"refresh\",\"title\":\"Đồng bộ cache\",\"color\":\"warning\",\"icon\":\"fa fa-refresh\",\"action\":\"api\",\"api\":\"refreshConfig\",\"type\":\"submit\"},{\"mode\":\"reset\",\"title\":\"Khởi tạo lại cache\",\"roles\":[1],\"color\":\"danger\",\"icon\":\"fa fa-refresh\",\"action\":\"api\",\"api\":\"resetCache\",\"backOnDone\":false,\"type\":\"submit\"}]','{}','find','[1]','[{\"method\":\"GET\",\"name\":\"find\",\"url\":\"/api/conf\",\"requestFields\":\"\",\"responseFields\":\"\",\"type\":\"find\",\"roles\":[1]},{\"method\":\"POST\",\"name\":\"refreshConfig\",\"url\":\"/api/admin/refresh-conf\",\"requestFields\":\"\",\"responseFields\":\"\",\"type\":\"create\",\"roles\":[1]},{\"url\":\"/api/admin/reset-cache\",\"name\":\"resetCache\",\"type\":\"create\",\"method\":\"POST\",\"roles\":[1]},{\"name\":\"migrate\",\"type\":\"create\",\"url\":\"/api/migrate\",\"description\":\"migrate database\",\"method\":\"POST\",\"enableCaptcha\":false,\"roles\":[1]}]','[{\"name\":\"ID\",\"type\":\"number\",\"field\":\"id\",\"filterable\":true,\"enumable\":false},{\"name\":\"Khóa\",\"type\":\"string\",\"field\":\"key\",\"filterable\":true},{\"name\":\"Kiểu dữ liệu\",\"type\":\"number\",\"field\":\"type\",\"enumable\":true,\"items\":[{\"key\":\"Số\",\"value\":\"1\"},{\"key\":\"Chuỗi\",\"value\":\"2\"}],\"filterable\":true},{\"name\":\"Dùng Cho Front-end\",\"field\":\"forFe\",\"type\":\"boolean\",\"enumable\":true,\"items\":[{\"key\":\"Đúng\",\"value\":1},{\"key\":\"Sai\",\"value\":0}],\"filterable\":true},{\"name\":\"Giá trị\",\"type\":\"string\",\"field\":\"val\",\"filterable\":true},{\"name\":\"Mô tả\",\"type\":\"string\",\"field\":\"desc\",\"filterable\":true},{\"name\":\"Ngày tạo\",\"type\":\"date\",\"field\":\"createdAt\",\"filterable\":true,\"filterRange\":true},{\"name\":\"Ngày sửa\",\"type\":\"date\",\"field\":\"updatedAt\",\"filterable\":true}]','[]'),(6,0,'1',NULL,1548835552142,1563032655156,0,'Thông tin trang','Thông tin trang','[]',NULL,'{}','find','[1]','[{\"method\":\"GET\",\"name\":\"find\",\"url\":\"/api/page\",\"requestFields\":\"\",\"responseFields\":\"\",\"type\":\"find\",\"roles\":[1]},{\"method\":\"POST\",\"name\":\"create\",\"url\":\"/api/page\",\"requestFields\":\"\",\"responseFields\":\"\",\"type\":\"create\",\"roles\":[1]},{\"method\":\"PATCH\",\"name\":\"update\",\"url\":\"/api/page\",\"requestFields\":\"\",\"responseFields\":\"\",\"type\":\"update\",\"roles\":[1]}]',NULL,'[]'),(7,0,'1',NULL,1548835566573,1685668055904,0,'Thông tin cấu hình','Cấu hình hệ thống','[{\"name\":\"Khóa\",\"field\":\"key\",\"type\":\"string\",\"disabled\":true,\"roles\":[2],\"widget\":\"Text\",\"required\":true},{\"name\":\"Khóa\",\"required\":true,\"field\":\"key\",\"type\":\"string\",\"modelSelectField\":\"id,name\",\"widget\":\"Text\",\"roles\":[1]},{\"name\":\"Dùng cho Front-end\",\"field\":\"forFe\",\"required\":false,\"type\":\"boolean\",\"widget\":\"Checkbox\",\"default\":\"0\"},{\"name\":\"Kiểu dữ liệu\",\"required\":true,\"field\":\"type\",\"items\":[{\"key\":\"Số\",\"value\":\"1\"},{\"key\":\"Chuỗi\",\"value\":\"2\"}],\"type\":\"number\",\"modelSelectField\":\"id,name\",\"widget\":\"Enum\",\"roles\":[1]},{\"field\":\"type\",\"name\":\"Kiểu dữ liệu\",\"required\":true,\"disabled\":true,\"roles\":[2],\"type\":\"number\",\"widget\":\"Enum\",\"items\":[{\"key\":\"Số\",\"value\":\"1\"},{\"key\":\"Chuỗi\",\"value\":\"2\"}]},{\"name\":\"Giá trị\",\"required\":true,\"field\":\"val\",\"type\":\"string\",\"modelSelectField\":\"id,name\",\"widget\":\"TextArea\"},{\"name\":\"Mô tả\",\"required\":false,\"field\":\"desc\",\"type\":\"string\",\"modelSelectField\":\"id,name\",\"widget\":\"TextArea\"}]','[{\"type\":\"submit\",\"title\":\"Tạo mới\",\"color\":\"primary\",\"mode\":\"create\",\"icon\":\"fa fa-check\",\"backOnDone\":true,\"api\":\"create\",\"action\":\"api\",\"url\":\"\",\"embedUrl\":false},{\"type\":\"submit\",\"title\":\"Sửa\",\"color\":\"primary\",\"mode\":\"edit\",\"icon\":\"fa fa-save\",\"backOnDone\":false,\"api\":\"update\",\"action\":\"api\",\"url\":\"\"}]','{}','find','[1]','[{\"method\":\"GET\",\"name\":\"find\",\"url\":\"/api/conf\",\"requestFields\":\"\",\"responseFields\":\"\",\"type\":\"find\",\"roles\":[1]},{\"method\":\"POST\",\"name\":\"create\",\"url\":\"/api/conf\",\"requestFields\":\"\",\"responseFields\":\"\",\"type\":\"create\",\"roles\":[1]},{\"method\":\"PATCH\",\"name\":\"update\",\"url\":\"/api/conf\",\"requestFields\":\"\",\"responseFields\":\"\",\"type\":\"update\",\"roles\":[1]}]','[{\"name\":\"ID\",\"type\":\"number\",\"field\":\"id\",\"filterable\":true,\"enumable\":false},{\"name\":\"Khóa\",\"type\":\"string\",\"field\":\"key\",\"filterable\":true},{\"name\":\"Giá trị\",\"type\":\"string\",\"field\":\"value\",\"filterable\":true},{\"name\":\"Mô tả\",\"type\":\"string\",\"field\":\"description\",\"filterable\":true},{\"name\":\"Ngày tạo\",\"type\":\"date\",\"field\":\"createdAt\"},{\"name\":\"Ngày sửa\",\"type\":\"date\",\"field\":\"updatedAt\"}]','[]'),(8,0,'1',NULL,1550730566915,1715313742568,0,'Quản lý quyền','','[]','[{\"type\":\"submit\",\"title\":\"Thêm quyền mới\",\"color\":\"success\",\"mode\":\"create\",\"icon\":\"fa fa-plus\",\"backOnDone\":false,\"api\":\"\",\"action\":\"url\",\"url\":\"#/form?page=9&mode=create\"},{\"type\":\"button\",\"title\":\"Edit\",\"color\":\"warning\",\"mode\":\"edit\",\"icon\":\"fa fa-pencil\",\"backOnDone\":false,\"api\":\"\",\"action\":\"formModal\",\"url\":\"#/form?page=9&mode=edit&id=$\",\"modalQuery\":\" {\\\"page\\\": 9, \\\"mode\\\": \\\"edit\\\", \\\"id\\\":#id#}\"}]','{}','find','[1]','[{\"method\":\"GET\",\"name\":\"find\",\"url\":\"/api/role\",\"requestFields\":\"\",\"responseFields\":\"\",\"type\":\"find\",\"roles\":[1]},{\"name\":\"find_user\",\"type\":\"find\",\"url\":\"/api/user\",\"roles\":[1],\"method\":\"GET\"}]','[{\"name\":\"ID\",\"type\":\"number\",\"field\":\"id\",\"filterable\":true},{\"name\":\"Tên\",\"type\":\"string\",\"field\":\"name\",\"enumable\":false,\"filterable\":true,\"bindButton\":false},{\"name\":\"Mô tả\",\"field\":\"description\",\"type\":\"string\",\"enumable\":false,\"filterable\":true},{\"name\":\"Thời gian tạo\",\"field\":\"createdAt\",\"type\":\"date\",\"filterable\":true,\"filterRange\":true},{\"name\":\"Người tạo\",\"field\":\"createdBy\",\"type\":\"number\",\"modelSelect\":true,\"modelSelectApi\":\"find_user\",\"filterable\":false,\"filterRange\":false}]','[]'),(9,0,'1',NULL,1550730623386,1563864789730,0,'Chi tiết quyền','Chi tiết quyền','[{\"name\":\"Tên\",\"required\":true,\"field\":\"name\",\"type\":\"string\",\"modelSelectField\":\"id,name\",\"widget\":\"Text\"},{\"name\":\"Mô tả \",\"field\":\"description\",\"type\":\"string\",\"required\":false,\"widget\":\"TextArea\"}]','[{\"type\":\"submit\",\"title\":\"Tạo mới\",\"color\":\"primary\",\"mode\":\"create\",\"icon\":\"fa fa-check\",\"backOnDone\":true,\"api\":\"create\",\"action\":\"api\",\"url\":\"\",\"embedUrl\":false,\"roles\":[1]},{\"type\":\"button\",\"title\":\"Lưu thông tin\",\"color\":\"primary\",\"mode\":\"edit\",\"icon\":\"fa fa-check\",\"backOnDone\":false,\"api\":\"update\",\"action\":\"api\",\"url\":\"\",\"embedUrl\":false,\"roles\":[1]}]','{}','find','[1]','[{\"method\":\"GET\",\"name\":\"find\",\"url\":\"/api/role\",\"requestFields\":\"\",\"responseFields\":\"\",\"type\":\"find\",\"roles\":[1]},{\"method\":\"POST\",\"name\":\"create\",\"url\":\"/api/role\",\"requestFields\":\"\",\"responseFields\":\"\",\"type\":\"create\",\"roles\":[1]},{\"method\":\"PATCH\",\"name\":\"update\",\"url\":\"/api/role\",\"requestFields\":\"\",\"responseFields\":\"\",\"type\":\"update\",\"roles\":[1]}]',NULL,'[]'),(10,0,'1',NULL,1550731284833,1685687972806,0,'Users','Danh sách người dùng','[]','[{\"type\":\"submit\",\"title\":\"Tạo mới\",\"color\":\"success\",\"mode\":\"create\",\"icon\":\"fa fa-plus\",\"backOnDone\":false,\"api\":\"\",\"action\":\"formModal\",\"url\":\"#/form?page=15&mode=create\",\"modalQuery\":\"{\\\"page\\\":15,\\\"mode\\\":\\\"create\\\"}\"},{\"type\":\"button\",\"title\":\"Cập nhật\",\"color\":\"warning\",\"mode\":\"edit\",\"icon\":\"fa fa-pencil\",\"backOnDone\":false,\"api\":\"\",\"action\":\"formModal\",\"url\":\"#/form?page=11&mode=edit&id=$\",\"modalQuery\":\"{\\\"page\\\": 11, \\\"mode\\\": \\\"edit\\\", \\\"id\\\":#id#}\"},{\"mode\":\"change_pass\",\"title\":\"Đổi MK\",\"color\":\"success\",\"icon\":\"fa fa-exchange\",\"action\":\"formModal\",\"modalQuery\":\"{\\\"page\\\":12,\\\"mode\\\":\\\"create\\\",\\\"embed\\\":\\\"{\\\\\\\"userId\\\\\\\":#id#}\\\"}\",\"type\":\"button\",\"embedUrl\":false,\"hideExpression\":\"\",\"outline\":true},{\"mode\":\"account\",\"title\":\"DS Tài khoản.    \",\"roles\":[1,2],\"color\":\"primary\",\"icon\":\"fa fa-user\",\"action\":\"listModal\",\"modalQuery\":\"{\\\"page\\\": 17,\\\"filter\\\":\\\"{\\\\\\\"user\\\\\\\":#id#,\\\\\\\"isDelete\\\\\\\":false}\\\"}\",\"type\":\"button\",\"url\":\"#/list?page=17&filter=%7B%22user%22%3A#id#%7D\",\"hideExpression\":\"\"}]','{}','find','[1]','[{\"method\":\"GET\",\"name\":\"find\",\"url\":\"/api/user/get-allow-adminpage-user\",\"requestFields\":\"\",\"responseFields\":\"\",\"type\":\"find\",\"roles\":[3],\"options\":[{\"key\":\"isDelete\",\"value\":\"0\"}]},{\"name\":\"export\",\"type\":\"find\",\"url\":\"/api/user\",\"method\":\"GET\",\"downloadReport\":\"userReport\",\"responseFields\":\"id,name,phone,email,identification,gender,address,point,username,role,group,source,partner\",\"roles\":[1]},{\"name\":\"find_usertype\",\"type\":\"find\",\"url\":\"/api/user/get-allow-user-type-only-adminpage-user\",\"roles\":[3],\"method\":\"GET\"},{\"name\":\"find_user\",\"type\":\"find\",\"url\":\"/api/user\",\"roles\":[1,2],\"method\":\"GET\"},{\"name\":\"find_partner\",\"type\":\"find\",\"url\":\"/api/partner\",\"description\":\"Lấy thông tin đối tác \",\"method\":\"GET\",\"roles\":[1,2]}]','[{\"name\":\"ID\",\"type\":\"number\",\"field\":\"id\",\"filterable\":true},{\"name\":\"Số tiền\",\"field\":\"money\",\"type\":\"number\",\"formatNumber\":true,\"filterable\":true,\"filterRange\":true},{\"name\":\"Full name\",\"type\":\"string\",\"field\":\"name\",\"enumable\":false,\"filterable\":true},{\"name\":\"Phone number\",\"type\":\"string\",\"field\":\"phone\",\"enumable\":false,\"filterable\":true},{\"name\":\"Email\",\"type\":\"string\",\"field\":\"email\",\"enumable\":false,\"filterable\":true},{\"name\":\"Gender\",\"type\":\"string\",\"field\":\"gender\",\"enumable\":true,\"items\":[{\"key\":\"Trai\",\"value\":\"male\"},{\"key\":\"Gái\",\"value\":\"female\"},{\"key\":\"Khác\",\"value\":\"other\"}],\"filterable\":true,\"roles\":[1]},{\"name\":\"Grant type\",\"type\":\"number\",\"field\":\"userType\",\"enumable\":false,\"items\":[],\"filterable\":true,\"modelSelect\":true,\"modelSelectApi\":\"find_usertype\",\"modelSelectField\":\"id,name$$Tên\",\"select\":\"name\",\"roles\":[2,1]},{\"name\":\"Description\",\"field\":\"description\",\"type\":\"string\",\"modelSelect\":false,\"filterable\":true},{\"name\":\"Block status\",\"field\":\"locked\",\"type\":\"boolean\",\"enumable\":true,\"items\":[{\"key\":\"Locked\",\"value\":1},{\"key\":\"Active\",\"value\":0}],\"filterable\":true},{\"field\":\"firstLoginAt\",\"name\":\"Lần đầu đăng nhập\",\"roles\":[1,2,8],\"type\":\"date\",\"enumable\":false,\"filterable\":true,\"bindButton\":false,\"filterRange\":true},{\"enumable\":false,\"modelSelect\":false,\"name\":\"Tạo bởi\",\"field\":\"createdBy\",\"roles\":[1,2],\"type\":\"number\",\"modelSelectApi\":\"find_user\",\"filterable\":true},{\"name\":\"Ngôn ngữ\",\"field\":\"locale\",\"roles\":[1],\"type\":\"string\",\"filterable\":true,\"bindButton\":false}]','[]'),(11,0,'1',NULL,1550732188955,1683618481621,0,'Cập nhật thông tin người dùng','Cập nhật thông tin người dùng','[{\"name\":\"Fullname\",\"required\":true,\"field\":\"name\",\"type\":\"string\",\"modelSelectField\":\"id,name\",\"widget\":\"Text\",\"roles\":[]},{\"name\":\"Gender\",\"required\":false,\"field\":\"gender\",\"items\":[{\"key\":\"Male\",\"value\":\"male\"},{\"key\":\"Female\",\"value\":\"female\"},{\"key\":\"Other\",\"value\":\"other\"}],\"type\":\"number\",\"modelSelectField\":\"id,name\",\"widget\":\"Enum\",\"roles\":[1]},{\"field\":\"phone\",\"name\":\"Phone number\",\"type\":\"string\",\"widget\":\"Text\",\"required\":false},{\"name\":\"Email\",\"required\":true,\"field\":\"email\",\"type\":\"string\",\"modelSelectField\":\"id,name\",\"widget\":\"Text\",\"regex\":\"(^$|^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\\\.(?:[a-zA-Z]{2}|com|org|net|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum)$)\",\"errorOnRegexFail\":\"không hợp lệ\"},{\"name\":\"Descripton\",\"required\":false,\"field\":\"descripton\",\"type\":\"string\",\"modelSelectField\":\"id,name\",\"widget\":\"TextArea\"},{\"name\":\"Nhóm quyền\",\"required\":true,\"field\":\"userType\",\"type\":\"number\",\"api\":\"find_user_type\",\"modelSelectField\":\"id,name,description\",\"widget\":\"SingleModel\",\"modelSelectMultiple\":false,\"roles\":[2,1]},{\"name\":\"Partner\",\"field\":\"partner\",\"roles\":[2,1],\"required\":false,\"hideExpression\":\"{\\\"this.userType\\\":{\\\"nin\\\":[3,4]}}\",\"type\":\"number\",\"widget\":\"SingleModel\",\"api\":\"fimd_partner\",\"modelSelectField\":\"id,name\",\"select\":\"name\",\"disabled\":false},{\"name\":\"Quyền thêm\",\"required\":false,\"field\":\"roleId\",\"type\":\"number\",\"api\":\"find_role\",\"modelSelectField\":\"id,name\",\"widget\":\"ArrayModel\",\"roles\":[1],\"modelSelectMultiple\":true},{\"name\":\"Khóa người dùng\",\"required\":false,\"field\":\"locked\",\"type\":\"boolean\",\"api\":\"find_source\",\"modelSelectField\":\"id,name\",\"widget\":\"Checkbox\"}]','[{\"type\":\"submit\",\"title\":\"Create new\",\"color\":\"primary\",\"mode\":\"create\",\"icon\":\"fa fa-check\",\"backOnDone\":true,\"api\":\"create_user\",\"action\":\"api\",\"url\":\"\",\"embedUrl\":false},{\"type\":\"submit\",\"title\":\"Save\",\"color\":\"success\",\"mode\":\"edit\",\"icon\":\"fa fa-plus\",\"backOnDone\":false,\"api\":\"update_user\",\"action\":\"api\",\"url\":\"\",\"embedUrl\":false}]','{}','find','[1,2]','[{\"method\":\"GET\",\"name\":\"find\",\"url\":\"/api/user/get-allow-adminpage-user\",\"requestFields\":\"\",\"responseFields\":\"\",\"type\":\"find\",\"roles\":[3]},{\"method\":\"GET\",\"name\":\"find_role\",\"url\":\"/api/user/get-allow-role\",\"requestFields\":\"\",\"responseFields\":\"\",\"type\":\"find\",\"roles\":[3]},{\"name\":\"find_user_type\",\"type\":\"find\",\"url\":\"/api/user/get-allow-user-type-only-adminpage-user\",\"roles\":[3],\"method\":\"GET\"},{\"method\":\"POST\",\"name\":\"update_user\",\"url\":\"/api/user/update-info\",\"requestFields\":\"\",\"responseFields\":\"\",\"type\":\"update\",\"roles\":[1,2]},{\"method\":\"POST\",\"name\":\"create_user\",\"url\":\"/api/user/add-new\",\"requestFields\":\"\",\"responseFields\":\"\",\"type\":\"create\",\"roles\":[1,2]},{\"name\":\"fimd_partner\",\"type\":\"find\",\"url\":\"/api/partner\",\"description\":\"lấy danh sách đối tác \",\"method\":\"GET\",\"responseFields\":\"\",\"roles\":[1,2]}]',NULL,'[]'),(12,0,'1',NULL,1550734369537,1623699995758,0,'Đổi mật khẩu','','[{\"name\":\"New password\",\"required\":true,\"field\":\"newPassword\",\"type\":\"string\",\"modelSelectField\":\"id,name\",\"widget\":\"Password\"},{\"name\":\"Retype new password\",\"field\":\"confirmPassword\",\"type\":\"string\",\"widget\":\"Password\",\"required\":true}]','[{\"type\":\"submit\",\"title\":\"Change password\",\"color\":\"primary\",\"mode\":\"create\",\"icon\":\"fa fa-exchange\",\"backOnDone\":false,\"api\":\"change_password\",\"action\":\"api\",\"url\":\"\",\"embedUrl\":true}]','{}','','[1,2]','[{\"method\":\"POST\",\"name\":\"change_password\",\"url\":\"/api/user/change-password-of-others\",\"requestFields\":\"\",\"responseFields\":\"\",\"type\":\"create\",\"roles\":[1,2]},{\"name\":\"find_auth\",\"type\":\"find\",\"url\":\"/api/auth\",\"roles\":[1,2],\"options\":[{\"key\":\"isDelete\",\"value\":\"0\"}],\"responseFields\":\"key,type\"}]',NULL,'[]'),(13,0,'1',NULL,1563164050519,1709016117385,0,'Quản lý nhóm quyền','Quản lý nhóm quyền','[]','[{\"mode\":\"edit\",\"title\":\"Sửa\",\"color\":\"warning\",\"icon\":\"fa fa-pencil\",\"action\":\"formModal\",\"modalQuery\":\" {\\\"page\\\": 14, \\\"mode\\\": \\\"edit\\\", \\\"id\\\":#id#}\",\"type\":\"button\"},{\"mode\":\"create\",\"title\":\"Tạo nhóm quyền mới\",\"color\":\"success\",\"icon\":\"fa fa-plus\",\"action\":\"url\",\"backOnDone\":true,\"url\":\"#/form?page=14&mode=create\",\"type\":\"submit\"}]','{}','find','[1]','[{\"name\":\"find\",\"type\":\"update\",\"url\":\"/api/userType\",\"roles\":[1],\"method\":\"GET\",\"options\":[{\"key\":\"isDelete\",\"value\":\"0\"}]},{\"name\":\"find_user\",\"type\":\"find\",\"url\":\"/api/user/get-allow-user\",\"method\":\"GET\",\"roles\":[2,1]},{\"name\":\"find_role\",\"type\":\"find\",\"url\":\"/api/role\",\"roles\":[1],\"method\":\"GET\"},{\"name\":\"find_user_type\",\"type\":\"find\",\"url\":\"/api/userType\",\"description\":\"Lấy danh sách các kiểu người dùng \",\"method\":\"GET\",\"roles\":[1,2]}]','[{\"name\":\"ID\",\"field\":\"id\",\"type\":\"number\",\"filterable\":true},{\"name\":\"Tên nhóm quyền demo\",\"field\":\"name\",\"type\":\"string\",\"filterable\":true},{\"name\":\"Mô tả nhóm quyền\",\"field\":\"description\",\"type\":\"string\",\"filterable\":true},{\"name\":\"Nhóm quyền mặc định cho tài khoản tạo dưới quyền\",\"field\":\"defaultGrantUserType\",\"type\":\"number\",\"modelSelect\":true,\"modelSelectApi\":\"find_user_type\",\"modelSelectField\":\"id,name$$Tên nhóm quyền\",\"filterable\":true},{\"field\":\"ruleIgnoreRole\",\"name\":\"Những role bị hạn chế\",\"type\":\"number\",\"modelSelect\":false,\"filterable\":true,\"modelSelectApi\":\"find_role\",\"enumable\":false,\"arraySelect\":true,\"modelSelectField\":\"id,name\",\"select\":\"name\",\"filterRange\":false},{\"field\":\"ruleOnlyViewCreatedBy\",\"name\":\"Chỉ được phép thấy người dùng cho chính mình tạo\",\"enumable\":true,\"items\":[{\"key\":\"Sai\",\"value\":0},{\"key\":\"Đúng\",\"value\":1}],\"type\":\"boolean\",\"filterable\":true,\"bindButton\":false},{\"name\":\"Những nhóm quyền được phép nhìn thấy\",\"field\":\"ruleViewUserType\",\"type\":\"number\",\"modelSelect\":false,\"modelSelectApi\":\"find_user_type\",\"filterable\":true,\"arraySelect\":true,\"modelSelectField\":\"id,name\",\"select\":\"name\"},{\"field\":\"defaultRole\",\"name\":\"Quyền mặc định\",\"type\":\"number\",\"modelSelect\":false,\"modelSelectApi\":\"find_role\",\"filterable\":true,\"arraySelect\":true,\"modelSelectField\":\"id,name\",\"select\":\"name\"},{\"name\":\"Ngày tạo\",\"field\":\"createdAt\",\"type\":\"date\",\"filterable\":true,\"filterRange\":true},{\"name\":\"Người tạo\",\"field\":\"createdBy\",\"type\":\"string\",\"modelSelect\":true,\"modelSelectApi\":\"find_user\",\"modelSelectField\":\"id,name\",\"select\":\"name\"}]','[]'),(14,0,'1',NULL,1563169145693,1586772934439,0,'Chi tiết nhóm quyền','Chi tiết nhóm quyền','[{\"name\":\"Tên\",\"required\":true,\"field\":\"name\",\"type\":\"string\",\"modelSelectField\":\"id,name\",\"widget\":\"Text\"},{\"name\":\"Mô tả \",\"field\":\"description\",\"type\":\"string\",\"required\":false,\"widget\":\"TextArea\"},{\"field\":\"defaultGrantUserType\",\"name\":\"Nhóm quyền phân mặc định cho tài khoản được tạo\",\"type\":\"number\",\"widget\":\"SingleModel\",\"modelSelectField\":\"id,name$$Tên nhóm quyền\",\"api\":\"find\"},{\"field\":\"ruleIgnoreRole\",\"type\":\"number\",\"widget\":\"ArrayModel\",\"modelSelectMultiple\":true,\"required\":false,\"api\":\"find_role\",\"name\":\"Những role bị hạn chế\",\"modelSelectField\":\"id,name,description\"},{\"field\":\"ruleOnlyViewCreatedBy\",\"name\":\"Chỉ được phép thấy những người dùng do chính mình tạo\",\"type\":\"boolean\",\"required\":false,\"widget\":\"Checkbox\",\"disabled\":false},{\"field\":\"ruleViewUserType\",\"name\":\"Những nhóm quyền được phép nhìn thấy\",\"type\":\"number\",\"required\":false,\"widget\":\"ArrayModel\",\"modelSelectMultiple\":true,\"api\":\"find\",\"modelSelectField\":\"id,name\"},{\"field\":\"defaultRole\",\"name\":\"Các quyền mặc định trong nhóm quyền\",\"type\":\"number\",\"required\":true,\"widget\":\"ArrayModel\",\"modelSelectMultiple\":true,\"api\":\"find_role\",\"modelSelectField\":\"id,name,description\"}]','[{\"type\":\"submit\",\"title\":\"Tạo mới\",\"color\":\"primary\",\"mode\":\"create\",\"icon\":\"fa fa-check\",\"backOnDone\":true,\"api\":\"create\",\"action\":\"api\",\"url\":\"\",\"embedUrl\":false,\"roles\":[1]},{\"type\":\"button\",\"title\":\"Lưu thông tin\",\"color\":\"primary\",\"mode\":\"edit\",\"icon\":\"fa fa-check\",\"backOnDone\":false,\"api\":\"update\",\"action\":\"api\",\"url\":\"\",\"embedUrl\":false,\"roles\":[1]}]','{}','find','[1]','[{\"method\":\"GET\",\"name\":\"find\",\"url\":\"/api/userType\",\"requestFields\":\"\",\"responseFields\":\"\",\"type\":\"find\",\"roles\":[1,2]},{\"method\":\"POST\",\"name\":\"create\",\"url\":\"/api/userType\",\"requestFields\":\"\",\"responseFields\":\"\",\"type\":\"create\",\"roles\":[1]},{\"method\":\"PATCH\",\"name\":\"update\",\"url\":\"/api/userType\",\"requestFields\":\"\",\"responseFields\":\"\",\"type\":\"update\",\"roles\":[1]},{\"name\":\"find_role\",\"type\":\"find\",\"url\":\"/api/role\",\"roles\":[1],\"options\":[],\"method\":\"GET\"}]',NULL,'[]'),(15,0,'1',NULL,1563273167312,1623699938347,0,'Create new user','Thông tin tạo mới người dùng','[{\"name\":\"Account name\",\"field\":\"account\",\"type\":\"string\",\"required\":true,\"widget\":\"Text\"},{\"name\":\"Password (At least 6 characters include both number and latin character)\",\"field\":\"password\",\"type\":\"string\",\"widget\":\"Password\",\"required\":true},{\"name\":\"Fullname\",\"required\":true,\"field\":\"name\",\"type\":\"string\",\"modelSelectField\":\"id,name\",\"widget\":\"Text\",\"roles\":[]},{\"name\":\"Gender\",\"required\":false,\"field\":\"gender\",\"items\":[{\"key\":\"Male\",\"value\":\"male\"},{\"key\":\"Female\",\"value\":\"female\"},{\"key\":\"Other\",\"value\":\"other\"}],\"type\":\"number\",\"modelSelectField\":\"id,name\",\"widget\":\"Enum\",\"default\":\"male\",\"roles\":[1]},{\"field\":\"phone\",\"name\":\"Phone number\",\"type\":\"string\",\"widget\":\"Text\",\"required\":false},{\"name\":\"Email\",\"required\":true,\"field\":\"email\",\"type\":\"string\",\"modelSelectField\":\"id,name\",\"widget\":\"Text\",\"regex\":\"(^$|^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\\\.(?:[a-zA-Z]{2}|com|org|net|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum)$)\",\"errorOnRegexFail\":\"is invalid!\"},{\"name\":\"Description\",\"required\":false,\"field\":\"descripton\",\"type\":\"string\",\"modelSelectField\":\"id,name\",\"widget\":\"TextArea\"},{\"name\":\"Nhóm quyền\",\"required\":true,\"field\":\"userType\",\"type\":\"number\",\"api\":\"find_user_type\",\"modelSelectField\":\"id,name,description\",\"widget\":\"SingleModel\",\"modelSelectMultiple\":false,\"roles\":[1,2]},{\"name\":\"Partner\",\"field\":\"partner\",\"roles\":[2,1],\"requiredExpression\":\"\",\"hideExpression\":\"{\\\"this.userType\\\":{\\\"nin\\\":[3,4]}}\",\"required\":true,\"type\":\"number\",\"widget\":\"SingleModel\",\"api\":\"find_partner\",\"modelSelectField\":\"id,name\"},{\"name\":\"Quyền thêm\",\"required\":false,\"field\":\"roleId\",\"type\":\"number\",\"api\":\"find_role\",\"modelSelectField\":\"id,name\",\"widget\":\"ArrayModel\",\"roles\":[1],\"modelSelectMultiple\":true},{\"name\":\"Block user\",\"required\":false,\"field\":\"locked\",\"type\":\"boolean\",\"api\":\"find_source\",\"modelSelectField\":\"id,name\",\"widget\":\"Checkbox\"}]','[{\"type\":\"submit\",\"title\":\"Tạo người dùng mới\",\"color\":\"primary\",\"mode\":\"create\",\"icon\":\"fa fa-check\",\"backOnDone\":true,\"api\":\"create_user\",\"action\":\"api\",\"url\":\"\",\"embedUrl\":false},{\"type\":\"submit\",\"title\":\"Lưu thông tin người dùng\",\"color\":\"primary\",\"mode\":\"edit\",\"icon\":\"fa fa-check\",\"backOnDone\":false,\"api\":\"update_user\",\"action\":\"api\",\"url\":\"\",\"embedUrl\":false}]','{}','find','[1,2]','[{\"method\":\"GET\",\"name\":\"find\",\"url\":\"/api/user/get-allow-adminpage-user\",\"requestFields\":\"\",\"responseFields\":\"\",\"type\":\"find\",\"roles\":[3]},{\"method\":\"GET\",\"name\":\"find_role\",\"url\":\"/api/user/get-allow-role\",\"requestFields\":\"\",\"responseFields\":\"\",\"type\":\"find\",\"roles\":[3]},{\"name\":\"find_user_type\",\"type\":\"find\",\"url\":\"/api/user/get-allow-user-type-only-adminpage-user\",\"roles\":[3],\"method\":\"GET\"},{\"method\":\"POST\",\"name\":\"update_user\",\"url\":\"/api/user/update-info\",\"requestFields\":\"\",\"responseFields\":\"\",\"type\":\"update\",\"roles\":[1,2]},{\"method\":\"POST\",\"name\":\"create_user\",\"url\":\"/api/user/add-new\",\"requestFields\":\"\",\"responseFields\":\"\",\"type\":\"create\",\"roles\":[1,2]},{\"name\":\"find_partner\",\"type\":\"find\",\"url\":\"/api/partner\",\"description\":\"lấy danh sách đối tác \",\"method\":\"GET\",\"roles\":[2,1]}]',NULL,'[]'),(16,0,'1',NULL,1552722078556,1681057638366,0,'Thông tin người dùng','Thông tin cá nhân người đang đăng nhập','[{\"name\":\"Mã số tài khoản\",\"field\":\"id\",\"required\":false,\"disabled\":true,\"type\":\"number\",\"widget\":\"Text\"},{\"name\":\"Họ và tên\",\"field\":\"name\",\"type\":\"string\",\"widget\":\"Text\",\"pageId\":43},{\"name\":\"Giới tính\",\"field\":\"gender\",\"required\":false,\"disabled\":false,\"type\":\"string\",\"widget\":\"Enum\",\"items\":[{\"key\":\"Nam\",\"value\":\"male\"},{\"key\":\"Nữ\",\"value\":\"female\"},{\"key\":\"Khác\",\"value\":\"other\"}],\"default\":\"other\",\"roles\":[1]},{\"name\":\"Số điện thoại\",\"field\":\"phone\",\"type\":\"string\",\"widget\":\"Text\",\"disabled\":false,\"pageId\":43,\"required\":false},{\"name\":\"Email\",\"field\":\"email\",\"type\":\"string\",\"widget\":\"Text\",\"pageId\":43,\"required\":true,\"disabled\":true},{\"name\":\"Mô tả\",\"field\":\"description\",\"placeholder\":\"Giới thiệu bản t hân\",\"type\":\"string\",\"widget\":\"TextArea\"}]','[{\"mode\":\"edit\",\"title\":\"Update\",\"roles\":[3],\"color\":\"success\",\"icon\":\"fa fa-check\",\"action\":\"api\",\"api\":\"update\",\"type\":\"submit\"}]','{}','find','[3]','[{\"name\":\"find\",\"type\":\"find\",\"url\":\"/api/user\",\"options\":[{\"key\":\"id\",\"value\":\"--id\"}],\"method\":\"GET\",\"roles\":[3]},{\"name\":\"update\",\"type\":\"update\",\"url\":\"/api/user\",\"method\":\"PATCH\",\"options\":[],\"requestFields\":\"name,phone,gender,description\",\"roles\":[3],\"criterias\":[{\"key\":\"id\",\"value\":\"--id\"}],\"restrictFields\":\"email,money\"},{\"name\":\"change-password\",\"type\":\"create\",\"url\":\"/api/auth/change-password\",\"method\":\"POST\",\"roles\":[5,3]},{\"name\":\"logout\",\"type\":\"create\",\"url\":\"/api/auth/logout\",\"roles\":[3],\"method\":\"POST\"},{\"name\":\"refresh-token\",\"type\":\"create\",\"url\":\"/api/auth/sign-in/refresh-token\",\"roles\":[3],\"method\":\"POST\"}]',NULL,'[]'),(17,0,'1',NULL,1563365992501,1623836337211,0,'Danh sách tài khoản','','[]','[{\"mode\":\"create\",\"title\":\"Sinh Token\",\"roles\":[1],\"color\":\"danger\",\"icon\":\"fa fa-bomb\",\"action\":\"formModal\",\"modalQuery\":\"{\\\"page\\\":20,\\\"mode\\\":\\\"create\\\",\\\"embed\\\":\\\"{\\\\\\\"authId\\\\\\\":#id#}\\\",\\\"authId\\\":#id#}\",\"type\":\"button\",\"embedUrl\":true}]','{}','find','[1,2]','[{\"name\":\"find\",\"type\":\"find\",\"url\":\"/api/auth\",\"roles\":[1,2],\"options\":[{\"key\":\"isDelete\",\"value\":\"0\"}],\"method\":\"GET\"}]','[{\"name\":\"id\",\"field\":\"id\",\"type\":\"number\",\"filterable\":true,\"filterRange\":false},{\"name\":\"key\",\"field\":\"key\",\"type\":\"string\",\"filterable\":true},{\"name\":\"type\",\"field\":\"type\",\"type\":\"string\",\"filterable\":true},{\"name\":\"Activated\",\"field\":\"activated\",\"type\":\"boolean\",\"enumable\":true,\"items\":[{\"key\":\"False\",\"value\":0},{\"key\":\"True\",\"value\":1}],\"filterable\":true},{\"name\":\"Lần đầu đăng nhập\",\"field\":\"firstLoginAt\",\"type\":\"date\",\"filterable\":true,\"filterRange\":true},{\"name\":\"Lần cuối đăng nhập\",\"type\":\"date\",\"field\":\"lastLoginAt\",\"filterable\":true,\"filterRange\":true},{\"name\":\"Thời gian đổi mật khẩu gần nhất\",\"field\":\"lastChangePasswordAt\",\"type\":\"date\",\"filterable\":true,\"filterRange\":true},{\"name\":\"Tạo bởi\",\"field\":\"createdBy\",\"type\":\"number\",\"filterable\":true},{\"name\":\"ID người dùng\",\"field\":\"user\",\"type\":\"number\",\"filterable\":true}]','[]'),(18,0,'1',NULL,1563788255445,1708962447236,0,'Quản lý api public','','[]','[{\"mode\":\"create\",\"title\":\"Tạo mới\",\"roles\":[1],\"color\":\"success\",\"icon\":\"fa fa-plus\",\"action\":\"url\",\"backOnDone\":true,\"url\":\"#/form?page=19&mode=create\",\"type\":\"submit\"},{\"mode\":\"edit\",\"title\":\"Sửa\",\"color\":\"warning\",\"icon\":\"fa fa-pencil\",\"action\":\"formModal\",\"modalQuery\":\"{\\\"mode\\\":\\\"edit\\\",\\\"page\\\":19,\\\"id\\\":#id#}\",\"type\":\"button\",\"roles\":[1]}]','{}','find','[1]','[{\"name\":\"find\",\"type\":\"find\",\"url\":\"/api/api\",\"method\":\"GET\",\"roles\":[1]}]','[{\"name\":\"id\",\"field\":\"id\",\"type\":\"number\",\"filterable\":true},{\"name\":\"Mô tả api\",\"field\":\"description\",\"filterable\":true,\"type\":\"string\"},{\"name\":\"actionPath\",\"field\":\"actionPath\",\"type\":\"string\",\"enumable\":false,\"filterable\":true},{\"name\":\"Method\",\"field\":\"method\",\"type\":\"string\",\"enumable\":true,\"items\":[{\"key\":\"GET\",\"value\":\"GET\"},{\"key\":\"PUT\",\"value\":\"PUT\"},{\"key\":\"PATCH\",\"value\":\"PATCH\"},{\"key\":\"POST\",\"value\":\"POST\"},{\"key\":\"DELETE\",\"value\":\"DELETE\"}],\"filterable\":true},{\"name\":\"apiVersion\",\"field\":\"apiVersion\",\"filterable\":true,\"type\":\"string\"},{\"name\":\"enableCaptcha\",\"field\":\"enableCaptcha\",\"type\":\"boolean\",\"filterable\":true,\"enumable\":true,\"items\":[{\"key\":\"Qua captcha\",\"value\":1},{\"key\":\"Không qua captcha\",\"value\":0}]},{\"name\":\"fieldAllowValue\",\"field\":\"fieldAllowValue\",\"type\":\"string\",\"filterable\":true,\"bindButton\":false},{\"field\":\"requireRoleIds\",\"name\":\"requireRoleIds\",\"type\":\"string\",\"filterable\":true},{\"name\":\"userIdField\",\"field\":\"userIdField\",\"type\":\"string\",\"filterable\":true},{\"name\":\"conditions\",\"field\":\"conditions\",\"type\":\"string\",\"enumable\":false,\"filterable\":true},{\"name\":\"whereByUserField\",\"field\":\"whereByUserField\",\"type\":\"string\",\"filterable\":true},{\"name\":\"selectedFields\",\"field\":\"selectedFields\",\"type\":\"string\",\"filterable\":true},{\"name\":\"ignoreFields\",\"field\":\"ignoreFields\",\"type\":\"string\",\"filterable\":true},{\"name\":\"boolExpression\",\"field\":\"boolExpression\",\"type\":\"string\",\"filterable\":true}]','[]'),(19,0,'1',NULL,1563789917193,1567495938056,0,'Chi tiết api public','Chi tiết api public','[{\"name\":\"actionPath\",\"field\":\"actionPath\",\"type\":\"string\",\"required\":true,\"widget\":\"Text\"},{\"name\":\"description\",\"field\":\"description\",\"type\":\"string\",\"widget\":\"TextArea\"},{\"name\":\"requireRoleIds\",\"field\":\"requireRoleIds\",\"type\":\"number\",\"required\":false,\"widget\":\"ArrayModel\",\"api\":\"find_role\",\"modelSelectField\":\"id,name$$Tên\"},{\"name\":\"apiVersion\",\"field\":\"apiVersion\",\"type\":\"string\",\"required\":true,\"default\":\"public\",\"widget\":\"Text\"},{\"name\":\"method\",\"field\":\"method\",\"type\":\"string\",\"required\":true,\"widget\":\"Enum\",\"items\":[{\"key\":\"GET\",\"value\":\"GET\"},{\"key\":\"PUT\",\"value\":\"PUT\"},{\"key\":\"PATCH\",\"value\":\"PATCH\"},{\"key\":\"POST\",\"value\":\"POST\"},{\"key\":\"DELETE\",\"value\":\"DELETE\"}]},{\"name\":\"userIdField\",\"field\":\"userIdField\",\"type\":\"string\",\"required\":false,\"widget\":\"Text\"},{\"name\":\"whereByUserField\",\"field\":\"whereByUserField\",\"type\":\"string\",\"widget\":\"JSONViewer\",\"default\":\"{}\"},{\"name\":\"conditions\",\"field\":\"conditions\",\"type\":\"string\",\"widget\":\"JSONViewer\",\"default\":\"{\\\"isDelete\\\":false}\"},{\"name\":\"fieldAllowValue\",\"field\":\"fieldAllowValue\",\"type\":\"string\",\"required\":false,\"disabled\":false,\"widget\":\"JSONViewer\",\"default\":\"{}\"},{\"name\":\"ignoreFields\",\"field\":\"ignoreFields\",\"type\":\"string\",\"required\":false,\"widget\":\"JSONViewer\",\"default\":\"[]\"},{\"name\":\"selectedFields\",\"field\":\"selectedFields\",\"type\":\"string\",\"widget\":\"JSONViewer\",\"default\":\"[]\"},{\"name\":\"enableCaptcha\",\"field\":\"enableCaptcha\",\"type\":\"boolean\",\"required\":false,\"widget\":\"Checkbox\",\"default\":\"\"},{\"name\":\"boolExpression\",\"field\":\"boolExpression\",\"placeholder\":\"Biểu thức tính quyền truy cập api theo thông tin người dùng và dữ liệu gửi lên\",\"type\":\"string\",\"widget\":\"TextArea\"}]','[{\"mode\":\"create\",\"title\":\"Tạo mới\",\"roles\":[1],\"color\":\"success\",\"icon\":\"fa fa-plus\",\"action\":\"api\",\"backOnDone\":true,\"url\":\"#/form?page=23&mode=create\",\"type\":\"submit\",\"api\":\"create\",\"confirm\":\"Đồng ý tạo mới api?\"},{\"mode\":\"edit\",\"title\":\"Cập nhật\",\"color\":\"danger\",\"icon\":\"fa fa-save\",\"action\":\"api\",\"modalQuery\":\"{\\\"mode\\\":\\\"edit\\\",\\\"page\\\":23,\\\"id\\\":#id#}\",\"type\":\"submit\",\"roles\":[1],\"confirm\":\"Đồng ý cập nhật api?\",\"api\":\"update\"}]','{}','find','[1]','[{\"name\":\"find\",\"type\":\"find\",\"url\":\"/api/api\",\"method\":\"GET\",\"roles\":[1]},{\"name\":\"create\",\"type\":\"create\",\"url\":\"/api/api\",\"method\":\"POST\",\"roles\":[1],\"options\":[]},{\"name\":\"update\",\"type\":\"update\",\"url\":\"/api/api\",\"roles\":[1],\"method\":\"PATCH\"},{\"name\":\"find_role\",\"type\":\"find\",\"url\":\"/api/role\",\"method\":\"GET\",\"roles\":[1],\"options\":[{\"key\":\"isDelete\",\"value\":\"0\"}]}]','[{\"name\":\"id\",\"field\":\"id\",\"type\":\"number\",\"filterable\":true},{\"name\":\"Mô tả api\",\"field\":\"description\",\"filterable\":true,\"type\":\"string\"},{\"name\":\"actionPath\",\"field\":\"actionPath\",\"type\":\"string\",\"enumable\":false,\"filterable\":true},{\"name\":\"Method\",\"field\":\"method\",\"type\":\"string\",\"enumable\":true,\"items\":[{\"key\":\"GET\",\"value\":\"GET\"},{\"key\":\"PUT\",\"value\":\"PUT\"},{\"key\":\"PATCH\",\"value\":\"PATCH\"},{\"key\":\"POST\",\"value\":\"POST\"},{\"key\":\"DELETE\",\"value\":\"DELETE\"}],\"filterable\":true},{\"name\":\"apiVersion\",\"field\":\"apiVersion\",\"filterable\":true,\"type\":\"string\"},{\"name\":\"enableCaptcha\",\"field\":\"enableCaptcha\",\"type\":\"boolean\",\"filterable\":true},{\"field\":\"requireRoleIds\",\"name\":\"requireRoleIds\",\"type\":\"string\",\"filterable\":true},{\"name\":\"userIdField\",\"field\":\"userIdField\",\"type\":\"string\",\"filterable\":true},{\"name\":\"conditions\",\"field\":\"conditions\",\"type\":\"string\",\"enumable\":false,\"filterable\":true},{\"name\":\"whereByUserField\",\"field\":\"whereByUserField\",\"type\":\"string\",\"filterable\":true},{\"name\":\"selectedFields\",\"field\":\"selectedFields\",\"type\":\"string\",\"filterable\":true},{\"name\":\"ignoreFields\",\"field\":\"ignoreFields\",\"type\":\"string\",\"filterable\":true}]','[]'),(20,0,'1',NULL,1563868504113,1680198815266,0,'Gen token','','[{\"name\":\"ID tài khoản người dùng\",\"field\":\"authId\",\"required\":true,\"type\":\"number\",\"widget\":\"SingleModel\",\"api\":\"find_auth\",\"hiddenWhere\":[],\"modelSelectField\":\"id,key$$Tài khoản,type$$Loại tài khoản\",\"hideExpression\":\"\",\"select\":\"key\"},{\"name\":\"Thời gian sống token (phút - 0=Không giới hạn)\",\"field\":\"lifeTimeInMinutes\",\"type\":\"number\",\"required\":false,\"widget\":\"Text\",\"min\":\"0\",\"default\":\"0\"},{\"field\":\"email\",\"name\":\"Email nhận token\",\"type\":\"string\",\"widget\":\"Text\"},{\"name\":\"Thông tin thêm\",\"field\":\"additionInfo\",\"type\":\"string\",\"widget\":\"JSONViewer\",\"default\":\"\"},{\"name\":\"Mã xác nhận\",\"field\":\"captcha\",\"type\":\"string\",\"required\":true,\"widget\":\"Captcha\"}]','[{\"mode\":\"create\",\"title\":\"Tạo token\",\"roles\":[1],\"color\":\"danger\",\"icon\":\"fa fa-bomb\",\"action\":\"api\",\"api\":\"gen_token\",\"type\":\"submit\",\"embedUrl\":true}]','{}','','[1]','[{\"type\":\"create\",\"name\":\"gen_token\",\"url\":\"/api/auth/gen-token\",\"method\":\"POST\",\"enableCaptcha\":true,\"roles\":[1]},{\"name\":\"find_auth\",\"type\":\"find\",\"url\":\"/api/auth\",\"method\":\"GET\",\"enableCaptcha\":false,\"roles\":[1]},{\"name\":\"find_user\",\"type\":\"find\",\"url\":\"/api/user\",\"method\":\"GET\",\"enableCaptcha\":false,\"roles\":[1]},{\"name\":\"send_sql\",\"type\":\"create\",\"url\":\"/api/admin/query\",\"method\":\"POST\",\"roles\":[1]}]',NULL,'[]'),(21,0,'1',NULL,1564373289181,1678065884607,0,'Log call api','','[]','[{\"mode\":\"edit\",\"title\":\"Chi tiết\",\"color\":\"primary\",\"icon\":\"fa fa-pencil\",\"action\":\"formModal\",\"modalQuery\":\"{\\\"page\\\":22,\\\"mode\\\":\\\"edit\\\",\\\"id\\\":\\\"#id#\\\"}\",\"type\":\"button\"}]','{\"highlight\":true,\"highlightExpression\":\"{\\\"this.responseStatusCode\\\":{\\\"nin\\\":[200,304]}}\",\"highlightColor\":\"red\"}','find','[1]','[{\"name\":\"find\",\"type\":\"find\",\"url\":\"/api/logcallapi\",\"method\":\"GET\",\"enableCaptcha\":false,\"roles\":[1]},{\"name\":\"find_auth\",\"type\":\"find\",\"url\":\"/api/auth\",\"description\":\"lấy thông tin authen\",\"method\":\"GET\",\"roles\":[1]}]','[{\"name\":\"id\",\"field\":\"id\",\"type\":\"string\",\"filterable\":true},{\"name\":\"requestUrl\",\"field\":\"requestUrl\",\"type\":\"string\",\"filterable\":true},{\"name\":\"requestMethod\",\"field\":\"requestMethod\",\"type\":\"string\",\"enumable\":false,\"filterable\":true},{\"name\":\"apiVersion\",\"field\":\"apiVersion\",\"type\":\"string\",\"filterable\":true},{\"name\":\"requestHeader\",\"field\":\"requestHeader\",\"type\":\"string\",\"filterable\":true},{\"name\":\"requestData\",\"field\":\"requestData\",\"type\":\"string\",\"filterable\":true},{\"name\":\"responseStatusCode\",\"field\":\"responseStatusCode\",\"type\":\"number\",\"filterable\":true,\"filterRange\":true},{\"name\":\"responseMessage\",\"field\":\"responseMessage\",\"type\":\"string\",\"filterable\":true},{\"name\":\"apiDescription\",\"field\":\"apiDescription\",\"filterable\":true},{\"name\":\"ip\",\"field\":\"ip\",\"type\":\"string\",\"filterable\":true},{\"name\":\"takeTime\",\"field\":\"takeTime\",\"type\":\"number\",\"filterable\":true,\"filterRange\":true},{\"name\":\"userId\",\"field\":\"userId\",\"type\":\"number\",\"filterable\":true},{\"name\":\"authId\",\"field\":\"authId\",\"type\":\"number\",\"filterable\":true,\"bindButton\":false,\"filterRange\":true,\"modelSelect\":true,\"modelSelectApi\":\"find_auth\",\"select\":\"key\",\"modelSelectField\":\"id,key,type\"},{\"name\":\"createdAt\",\"field\":\"createdAt\",\"type\":\"date\",\"filterable\":true,\"filterRange\":true}]','[]'),(22,0,'1',NULL,1564373767477,1678065916258,0,'Chi tiết log call api','','[{\"name\":\"requestUrl\",\"field\":\"requestUrl\",\"type\":\"string\",\"disabled\":true,\"widget\":\"Text\"},{\"name\":\"requestMethod\",\"field\":\"requestMethod\",\"type\":\"string\",\"disabled\":true,\"widget\":\"Text\"},{\"name\":\"apiVersion\",\"field\":\"apiVersion\",\"type\":\"string\",\"widget\":\"Text\"},{\"name\":\"requestHeader\",\"field\":\"requestHeader\",\"type\":\"string\",\"widget\":\"JSONViewer\"},{\"name\":\"requestData\",\"field\":\"requestData\",\"type\":\"string\",\"widget\":\"JSONViewer\"},{\"name\":\"responseStatusCode\",\"field\":\"responseStatusCode\",\"type\":\"number\",\"widget\":\"Text\",\"enableReadNumber\":false},{\"name\":\"responseMessage\",\"field\":\"responseMessage\",\"type\":\"string\",\"widget\":\"TextArea\"},{\"name\":\"apiDescription\",\"field\":\"apiDescription\",\"type\":\"string\",\"widget\":\"TextArea\"},{\"name\":\"ip\",\"field\":\"ip\",\"type\":\"string\",\"widget\":\"Text\"},{\"name\":\"takeTime\",\"field\":\"takeTime\",\"type\":\"number\",\"widget\":\"Text\"},{\"name\":\"userId\",\"field\":\"userId\",\"type\":\"number\",\"widget\":\"Text\"},{\"name\":\"authId\",\"field\":\"authId\",\"type\":\"number\",\"widget\":\"Text\"}]','[]','{}','find','[1]','[{\"name\":\"find\",\"type\":\"find\",\"url\":\"/api/logcallapi\",\"method\":\"GET\",\"roles\":[1]}]','[]','[]'),(23,0,'1',NULL,1676819688620,1676877976124,0,'Thông báo','Notice','[]','[{\"mode\":\"edit\",\"roles\":[],\"title\":\"Chi tiết\",\"color\":\"info\",\"icon\":\"fa fa-pencil\",\"action\":\"formModal\",\"modalQuery\":\"{\\\"mode\\\":\\\"edit\\\",\\\"id\\\":#id#,\\\"page\\\":24}\",\"type\":\"button\"},{\"mode\":\"create\",\"title\":\"Tạo mới\",\"roles\":[1],\"color\":\"success\",\"icon\":\"fa fa-plus\",\"action\":\"formModal\",\"modalQuery\":\"{\\\"page\\\":24,\\\"mode\\\":\\\"create\\\"}\",\"type\":\"submit\"}]','{}','get','[3,5,6]','[{\"name\":\"find\",\"type\":\"find\",\"url\":\"/api/notice\",\"description\":\"get list notice\",\"method\":\"GET\",\"roles\":[3,5,6],\"criterias\":[{\"key\":\"user\",\"value\":\"--id\"}]},{\"name\":\"count\",\"type\":\"find\",\"url\":\"/api/notice/count\",\"method\":\"GET\",\"roles\":[5,3,6]},{\"name\":\"read\",\"type\":\"find\",\"url\":\"/api/notice/read\",\"description\":\"read message\",\"method\":\"GET\",\"roles\":[5,3,6]},{\"name\":\"get\",\"type\":\"find\",\"url\":\"/api/notice/get\",\"method\":\"GET\",\"roles\":[3,5,6]}]','[{\"name\":\"ID\",\"field\":\"id\",\"type\":\"number\",\"formatNumber\":true,\"filterable\":true},{\"name\":\"Tiêu đề\",\"field\":\"subject\",\"type\":\"string\",\"filterable\":true},{\"name\":\"Đã xem\",\"field\":\"seen\",\"type\":\"boolean\",\"filterable\":true,\"enumable\":true,\"items\":[{\"key\":\"False\",\"value\":0},{\"key\":\"True\",\"value\":1}]},{\"name\":\"Đã đọc\",\"field\":\"read\",\"type\":\"boolean\",\"filterable\":true,\"enumable\":true,\"items\":[{\"key\":\"False\",\"value\":0},{\"key\":\"True\",\"value\":1}]}]','[]'),(24,0,'1',NULL,1676857826582,1678376755821,0,'Chi tiết thông báo','Notice','[{\"name\":\"user\",\"field\":\"user\",\"roles\":[1],\"type\":\"number\",\"widget\":\"SingleModel\",\"api\":\"find_user\",\"modelSelectField\":\"id,name,email,phone,money\",\"select\":\"name\"},{\"name\":\"Tiêu đề\",\"field\":\"subject\",\"required\":true,\"type\":\"string\",\"widget\":\"Text\"},{\"name\":\"Nội dung\",\"field\":\"content\",\"required\":false,\"type\":\"string\",\"widget\":\"HTML\",\"roles\":[]},{\"name\":\"level\",\"field\":\"level\",\"roles\":[1],\"type\":\"string\",\"widget\":\"Text\",\"default\":\"DELETE_ON_SEND\"},{\"name\":\"Nội dung\",\"field\":\"content\",\"required\":false,\"type\":\"string\",\"widget\":\"RichText\",\"roles\":[1]},{\"name\":\"payload\",\"field\":\"payload\",\"roles\":[1],\"type\":\"string\",\"widget\":\"JSONViewer\",\"default\":\"{}\"},{\"name\":\"expiredAt\",\"field\":\"expiredAt\",\"roles\":[1],\"type\":\"number\",\"widget\":\"Date\"}]','[{\"mode\":\"create\",\"title\":\"Tạo mới\",\"roles\":[1],\"color\":\"success\",\"icon\":\"fa fa-plus\",\"action\":\"api\",\"api\":\"create\",\"type\":\"submit\"},{\"mode\":\"edit\",\"title\":\"Chi tiết\",\"color\":\"info\",\"icon\":\"fa fa-info-cicle\",\"action\":\"api\",\"showOnFormOnly\":true,\"type\":\"submit\",\"api\":\"open_url_notice\",\"apiData\":\"{\\\"noticeId\\\":\\\"this.id\\\"}\",\"backOnDone\":false,\"showOnTop\":true,\"hideExpression\":\"[{\\\"this.openUrl\\\":{\\\"=\\\":\\\"\\\"}},{\\\"this.openUrl\\\":{\\\"=\\\":null}}]\"}]','{}','read','[3,5,6]','[{\"name\":\"find\",\"type\":\"find\",\"url\":\"/api/notice\",\"description\":\"get list notice\",\"method\":\"GET\",\"roles\":[3,5,6],\"criterias\":[{\"key\":\"user\",\"value\":\"--id\"}]},{\"name\":\"count\",\"type\":\"find\",\"url\":\"/api/notice/count\",\"method\":\"GET\",\"roles\":[5,3,6]},{\"name\":\"read\",\"type\":\"find\",\"url\":\"/api/notice/read\",\"description\":\"read message\",\"method\":\"GET\",\"roles\":[5,3,6]},{\"name\":\"get\",\"type\":\"find\",\"url\":\"/api/notice/get\",\"method\":\"GET\",\"roles\":[3,5,6]},{\"name\":\"find_user\",\"type\":\"find\",\"url\":\"/api/user\",\"method\":\"GET\",\"roles\":[1]},{\"name\":\"create\",\"type\":\"create\",\"url\":\"/api/notice\",\"description\":\"tạo mới thông báo người dùng\",\"method\":\"POST\",\"roles\":[1],\"requestFields\":\"user,subject,content,level,expiredAt,payload\"},{\"name\":\"open_url_notice\",\"type\":\"find\",\"url\":\"/api/notice/open-url\",\"description\":\"open-url notice\",\"method\":\"POST\",\"roles\":[3,5]}]','[{\"name\":\"ID\",\"field\":\"id\",\"type\":\"number\",\"formatNumber\":true,\"filterable\":true},{\"name\":\"Tiêu đề\",\"field\":\"subject\",\"type\":\"string\",\"filterable\":true},{\"name\":\"Nội dung\",\"field\":\"content\",\"type\":\"string\",\"filterable\":true}]','[]'),(25,0,'1',NULL,1575876747844,1699160663276,0,'Log Email','','[]','[{\"mode\":\"detail\",\"title\":\"Detail\",\"color\":\"info\",\"icon\":\"fa fa-pencil\",\"action\":\"formModal\",\"modalQuery\":\"{\\\"page\\\":26,\\\"mode\\\":\\\"edit\\\",\\\"id\\\":\\\"#id#\\\"}\",\"type\":\"button\",\"roles\":[]}]','{\"highlight\":true,\"highlightExpression\":\"{\\\"this.responseInfo\\\":{\\\"contains\\\":\\\"rejected: [\\\\\\\"\\\"}}\"}','find','[1]','[{\"name\":\"find\",\"type\":\"find\",\"url\":\"/api/logsmsemail\",\"description\":\"lấy đanh sách log gửi email\",\"method\":\"GET\",\"roles\":[1],\"options\":[{\"key\":\"type\",\"value\":\"EMAIL\"}]}]','[{\"name\":\"id\",\"field\":\"id\",\"type\":\"string\",\"filterable\":true,\"roles\":[1]},{\"name\":\"isSuccess\",\"field\":\"isSuccess\",\"type\":\"boolean\",\"enumable\":true,\"filterable\":true,\"items\":[{\"key\":\"Đã xử lý\",\"value\":1},{\"key\":\"Chưa xử lý\",\"value\":0}]},{\"name\":\"Created at\",\"field\":\"createdAt\",\"type\":\"date\",\"filterable\":true,\"filterRange\":true,\"roles\":[]},{\"name\":\"Updated at\",\"field\":\"updatedAt\",\"type\":\"date\",\"filterable\":true,\"filterRange\":true,\"roles\":[]},{\"name\":\"To\",\"field\":\"to\",\"type\":\"string\",\"filterable\":true},{\"name\":\"Subject\",\"field\":\"subject\",\"type\":\"string\",\"filterable\":true},{\"name\":\"Response Status\",\"field\":\"responseInfo\",\"type\":\"string\",\"filterable\":true},{\"name\":\"payload\",\"field\":\"payload\",\"roles\":[1],\"type\":\"string\",\"filterable\":true}]','[]'),(26,0,'1',NULL,1575877822131,1683819486759,0,'Log Email','','[{\"field\":\"createdAt\",\"name\":\"Created At\",\"disabled\":true,\"type\":\"number\",\"widget\":\"Date\"},{\"name\":\"To\",\"field\":\"to\",\"disabled\":true,\"type\":\"string\",\"widget\":\"Text\"},{\"field\":\"subject\",\"name\":\"Subject\",\"disabled\":true,\"type\":\"string\",\"widget\":\"TextArea\"},{\"name\":\"Content\",\"field\":\"content\",\"disabled\":true,\"type\":\"string\",\"widget\":\"HTML\"},{\"name\":\"Response Status\",\"field\":\"responseInfo\",\"disabled\":true,\"type\":\"string\",\"widget\":\"JSONViewer\"},{\"name\":\"payload\",\"field\":\"payload\",\"disabled\":true,\"type\":\"string\",\"widget\":\"JSONViewer\"}]','[]','{}','find','[1]','[{\"name\":\"find\",\"type\":\"find\",\"url\":\"/api/logsmsemail\",\"description\":\"lấy đanh sách log gửi email\",\"method\":\"GET\",\"roles\":[1,2],\"options\":[{\"key\":\"type\",\"value\":\"EMAIL\"}]}]','[{\"name\":\"id\",\"field\":\"id\",\"type\":\"string\",\"filterable\":true},{\"name\":\"Created at\",\"field\":\"createdAt\",\"type\":\"date\",\"filterable\":true,\"filterRange\":true},{\"name\":\"To\",\"field\":\"to\",\"type\":\"string\",\"filterable\":true},{\"name\":\"Subject\",\"field\":\"subject\",\"type\":\"string\",\"filterable\":true},{\"name\":\"Response Status\",\"field\":\"responseInfo\",\"type\":\"string\",\"filterable\":true},{\"name\":\"payload\",\"field\":\"payload\",\"roles\":[1],\"type\":\"string\",\"filterable\":true}]','[]'),(27,0,'1',NULL,1620589375909,1620591105150,0,'Log SMS','Log SMS','[]','[{\"mode\":\"create\",\"title\":\"Tạo mới\",\"roles\":[1],\"color\":\"success\",\"icon\":\"fa fa-plus\",\"action\":\"formModal\",\"modalQuery\":\"{\\\"page\\\":28,\\\"mode\\\":\\\"create\\\"}\",\"backOnDone\":false,\"type\":\"submit\"},{\"mode\":\"edit\",\"title\":\"Chi Tiết\",\"color\":\"warning\",\"icon\":\"fa fa-pencil\",\"action\":\"formModal\",\"modalQuery\":\"{\\\"page\\\":28,\\\"mode\\\":\\\"edit\\\",\\\"id\\\":\\\"#id#\\\"}\",\"type\":\"button\",\"embedUrl\":false}]','{}','find','[1,5]','[{\"name\":\"find\",\"type\":\"find\",\"url\":\"/api/receivedSms\",\"method\":\"GET\",\"roles\":[1],\"requestFields\":\"\"},{\"name\":\"create\",\"type\":\"create\",\"url\":\"/api/receivedSms\",\"method\":\"POST\",\"roles\":[1,5],\"requestFields\":\"phone,message,payload\"}]','[{\"name\":\"ID\",\"field\":\"id\",\"type\":\"number\",\"formatNumber\":false,\"filterable\":true,\"bindButton\":false},{\"name\":\"Phone Number\",\"field\":\"phone\",\"type\":\"string\",\"filterable\":true,\"stringID\":false},{\"name\":\"Message\",\"field\":\"message\",\"type\":\"string\",\"enumable\":false,\"filterable\":true},{\"name\":\"Processed\",\"field\":\"processed\",\"type\":\"boolean\",\"enumable\":true,\"items\":[{\"key\":\"Đã xử lý\",\"value\":1},{\"key\":\"Chưa xử lý\",\"value\":0}],\"filterable\":true},{\"name\":\"Created at\",\"field\":\"createdAt\",\"type\":\"date\",\"filterable\":true,\"filterRange\":true}]','[]'),(28,0,'1',NULL,1620589838668,1620591135180,0,'Log SMS','Log SMS','[{\"name\":\"Phone\",\"field\":\"phone\",\"required\":true,\"disabledExpression\":\"\",\"type\":\"string\",\"widget\":\"Text\"},{\"name\":\"Message\",\"field\":\"message\",\"required\":true,\"disabledExpression\":\"\",\"type\":\"string\",\"widget\":\"TextArea\"}]','[{\"mode\":\"create\",\"title\":\"Tạo mới\",\"roles\":[1],\"color\":\"success\",\"icon\":\"fa fa-plus\",\"action\":\"api\",\"modalQuery\":\"{\\\"page\\\":28,\\\"mode\\\":\\\"create\\\"}\",\"backOnDone\":true,\"type\":\"submit\",\"api\":\"create\"}]','{}','find','[1,5]','[{\"name\":\"find\",\"type\":\"find\",\"url\":\"/api/receivedSms\",\"method\":\"GET\",\"roles\":[1],\"requestFields\":\"\"},{\"name\":\"create\",\"type\":\"create\",\"url\":\"/api/receivedSms\",\"method\":\"POST\",\"roles\":[1,5],\"requestFields\":\"phone,message,payload\",\"responseFields\":\"phone\"}]','[{\"name\":\"ID\",\"field\":\"id\",\"type\":\"number\",\"formatNumber\":false,\"filterable\":true,\"bindButton\":false},{\"name\":\"Phone Number\",\"field\":\"phone\",\"type\":\"string\",\"filterable\":true,\"stringID\":false},{\"name\":\"Message\",\"field\":\"message\",\"type\":\"string\",\"enumable\":false,\"filterable\":true},{\"name\":\"Processed\",\"field\":\"processed\",\"type\":\"number\",\"enumable\":true,\"items\":[{\"key\":\"1\",\"value\":\"Đã xử lý\"},{\"key\":\"0\",\"value\":\"Chưa xử lý\"}],\"filterable\":true},{\"name\":\"Created at\",\"field\":\"createdAt\",\"type\":\"date\",\"filterable\":true,\"filterRange\":true}]','[]'),(29,0,'1',NULL,1622460830928,1673325186851,0,'Sign Up','Sign Up','[{\"name\":\"Account\",\"field\":\"account\",\"required\":true,\"type\":\"string\",\"widget\":\"Text\",\"regex\":\"^[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9])+[a-zA-Z0-9]$\",\"errorOnRegexFail\":\"chứa ký tự không hợp lệ hoặc chưa đủ 3 ký tự!\"},{\"name\":\"Password\",\"field\":\"password\",\"required\":true,\"type\":\"string\",\"widget\":\"Password\",\"regex\":\"^(?=.*\\\\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{6,}$\",\"errorOnRegexFail\":\"phải bao gồm cả chữ và số đồng thời ít nhất 6 ký tự (Không cho phép ký tự đặc biệt)!\"},{\"name\":\"Email\",\"field\":\"email\",\"required\":true,\"type\":\"string\",\"widget\":\"Text\",\"regex\":\"^(?:[\\\\w\\\\!\\\\#\\\\$\\\\%\\\\&\\\\\'\\\\*\\\\+\\\\-\\\\/\\\\=\\\\?\\\\^\\\\`\\\\{\\\\|\\\\}\\\\~]+\\\\.)*[\\\\w\\\\!\\\\#\\\\$\\\\%\\\\&\\\\\'\\\\*\\\\+\\\\-\\\\/\\\\=\\\\?\\\\^\\\\`\\\\{\\\\|\\\\}\\\\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\\\\-](?!\\\\.)){0,61}[a-zA-Z0-9]?\\\\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\\\\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\\\\[(?:(?:[01]?\\\\d{1,2}|2[0-4]\\\\d|25[0-5])\\\\.){3}(?:[01]?\\\\d{1,2}|2[0-4]\\\\d|25[0-5])\\\\]))$\",\"errorOnRegexFail\":\"Không đúng định dạng\"},{\"name\":\"Mã captcha\",\"field\":\"captcha\",\"required\":true,\"type\":\"string\",\"widget\":\"Captcha\"}]','[{\"mode\":\"signup\",\"title\":\"Gửi thông tin đăng ký\",\"color\":\"success\",\"icon\":\"fa fa-plus\",\"action\":\"api\",\"backOnDone\":true,\"type\":\"submit\",\"api\":\"sign-up\",\"backOnDoneHref\":\"#/login\"}]','{}','','[6]','[{\"name\":\"sign-up\",\"type\":\"create\",\"url\":\"/api/auth/register\",\"description\":\"đăng ký người dùng mới\",\"method\":\"POST\",\"enableCaptcha\":true,\"roles\":[6]}]',NULL,'[]'),(30,0,'1',NULL,1622483633383,1680198315199,0,'Quên mật khẩu','Quên mật khẩu','[{\"name\":\"Account\",\"field\":\"account\",\"required\":true,\"type\":\"string\",\"widget\":\"Text\",\"regex\":\"^[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9])+[a-zA-Z0-9]$\",\"errorOnRegexFail\":\"chứa ký tự không hợp lệ hoặc chưa đủ 3 ký tự!\"},{\"name\":\"Mã captcha\",\"field\":\"captcha\",\"required\":true,\"type\":\"string\",\"widget\":\"Captcha\"}]','[{\"mode\":\"forgot\",\"title\":\"Yêu cầu cấp lại mật khẩu\",\"color\":\"primary\",\"icon\":\"fa fa-pencil\",\"action\":\"api\",\"backOnDone\":true,\"type\":\"submit\",\"api\":\"forgot\",\"backOnDoneHref\":\"#/login\",\"outline\":false,\"apiData\":\"{\\\"type\\\":\\\"up\\\"}\"}]','{}','','[6]','[{\"name\":\"forgot\",\"type\":\"create\",\"url\":\"/api/auth/forget-password\",\"description\":\"quên mật khẩu\",\"method\":\"POST\",\"enableCaptcha\":true,\"roles\":[6]}]',NULL,'[]'),(31,0,'1',NULL,1623689202236,1631521945630,0,'Đổi mật khẩu','Đổi mật khẩu','[{\"name\":\"Tài khoản\",\"field\":\"account\",\"required\":true,\"disabled\":true,\"type\":\"string\",\"widget\":\"Text\",\"placeholder\":\"Tài khoản\"},{\"name\":\"Mật khẩu\",\"field\":\"newPassword\",\"required\":true,\"disabled\":false,\"type\":\"string\",\"widget\":\"Password\",\"placeholder\":\"Mật khẩu mới\",\"regex\":\"^(?=.*\\\\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{6,}$\",\"errorOnRegexFail\":\"phải bao gồm cả chữ và số đồng thời ít nhất 6 ký tự!\"},{\"name\":\"Captcha\",\"field\":\"captcha\",\"required\":true,\"disabled\":false,\"type\":\"string\",\"widget\":\"Captcha\"}]','[{\"mode\":\"reset_pass\",\"title\":\"Đổi mật khẩu\",\"color\":\"success\",\"icon\":\"fa fa-change\",\"action\":\"api\",\"apiData\":\"{\\\"token\\\":\\\"this.token\\\"}\",\"api\":\"change_pass\",\"backOnDone\":true,\"backOnDoneHref\":\"#/login\",\"embedUrl\":true,\"type\":\"submit\"}]','{}','','[6]','[{\"name\":\"change_pass\",\"type\":\"create\",\"url\":\"/api/auth/change-forget-password\",\"description\":\"khôi phục mật khẩu tài khoản\",\"method\":\"POST\",\"enableCaptcha\":true,\"roles\":[6]}]',NULL,'[]'),(32,0,'1',NULL,1623699161444,1623699302702,0,'Kích hoạt tài khoản','Kích hoạt tài khoản','[{\"name\":\"Tài khoản\",\"field\":\"account\",\"required\":true,\"disabled\":true,\"type\":\"string\",\"widget\":\"Text\",\"placeholder\":\"Tài khoản\"},{\"name\":\"Captcha\",\"field\":\"captcha\",\"required\":true,\"disabled\":false,\"type\":\"string\",\"widget\":\"Captcha\"}]','[{\"mode\":\"activate\",\"title\":\"Xác nhận kích hoạt tài khoản\",\"color\":\"success\",\"icon\":\"fa fa-check\",\"action\":\"api\",\"apiData\":\"{\\\"token\\\":\\\"this.token\\\"}\",\"api\":\"activate_user\",\"backOnDone\":true,\"backOnDoneHref\":\"#/login\",\"embedUrl\":true,\"type\":\"submit\"}]','{}','','[6]','[{\"name\":\"activate_user\",\"type\":\"create\",\"url\":\"/api/auth/active-user\",\"description\":\"active user\",\"method\":\"POST\",\"enableCaptcha\":true,\"roles\":[6]}]',NULL,'[]');
/*!40000 ALTER TABLE `page` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `receivedsms`
--

DROP TABLE IF EXISTS `receivedsms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `receivedsms` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `isDelete` tinyint(1) DEFAULT NULL,
  `createdBy` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `deletedBy` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `createdAt` bigint DEFAULT NULL,
  `updatedAt` bigint DEFAULT NULL,
  `deletedAt` bigint DEFAULT NULL,
  `phone` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `message` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `payload` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `processed` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `receivedsms`
--

LOCK TABLES `receivedsms` WRITE;
/*!40000 ALTER TABLE `receivedsms` DISABLE KEYS */;
/*!40000 ALTER TABLE `receivedsms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `isDelete` tinyint(1) DEFAULT NULL,
  `createdBy` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `deletedBy` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `createdAt` bigint DEFAULT NULL,
  `updatedAt` bigint DEFAULT NULL,
  `deletedAt` bigint DEFAULT NULL,
  `name` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `description` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` (id, isDelete, createdBy, deletedBy, createdAt, updatedAt, deletedAt, `name`, `description`)
VALUES (1,0,'1',NULL,1563071061034,1563071061034,0,'Kỹ thuật','Đội kỹ thuật phát triển hệ thống'),(2,0,'1',NULL,1563071061034,1563071061034,0,'ADMIN',''),(3,0,'1',NULL,1563166328173,1563166328173,0,'BASIC',''),(4,0,'1',NULL,1570763890718,1570763890718,0,'INSIDER',''),(5,0,'1',NULL,1570763919447,1570763919447,0,'SMS_Services','quyền thực hiện ghi sms'),(6,0,'1',NULL,1571644382312,1622459644516,0,'Public','quyền cho người dùng sử dụng các public api'),(7,0,'1',NULL,1623698901536,1623698901536,0,'FPT_EDU','role cho người dùng có mail fpt edu'),(8,0,'1',NULL,1624515564049,1625037971613,0,'Akacoga','FSOFTER'),(9,0,'1',NULL,1631030293686,1631030293686,0,'Zooba Time','Zooba self time'),(10,0,'1',NULL,1674633233474,1674633233474,0,'Sổ nợ','quyền truy cập chức năng sổ ghi nợ'),(11,0,'1',NULL,1678266452285,1678266452285,0,'Mua hàng','Quyền mua hàng'),(12,0,'1',NULL,1683024969564,1683024969564,0,'SEDept User','Quyền cho GV môn SE');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `isDelete` tinyint(1) DEFAULT NULL,
  `createdBy` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `deletedBy` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `createdAt` bigint DEFAULT NULL,
  `updatedAt` bigint DEFAULT NULL,
  `deletedAt` bigint DEFAULT NULL,
  `name` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `phone` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `roleId` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `locale` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `gender` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `locked` tinyint(1) DEFAULT NULL,
  `firstLoginAt` bigint DEFAULT NULL,
  `fcmToken` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `dob` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `userType` bigint DEFAULT NULL,
  `money` double DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (id, isDelete, createdBy, deletedBy, createdAt, updatedAt, deletedAt, `name`, phone, email, roleId, locale, gender, description, locked, firstLoginAt, fcmToken, avatar, dob, userType, money)
VALUES (1,0,'1',NULL,1563071061158,1715228805827,0,'system_admin','0981604050','khangpq.vn@gmail.com','[]','vi','male','hello',0,1563075951205,'[]','','',1,10000),(2,0,'1',NULL,1586870789893,1704784553994,0,'Pham Quang Khang','0981604050','khangpq.vn@gmail.com','[]','vi','male','',0,1623697042683,'[]','','',3,113000),(3,0,'1',NULL,1620588926898,1620591328491,0,'SMS','','khangpq@codingclass.edu.vn','[]','vi','male','',0,1620591328491,'[]','','',5,0),(4,0,'1',NULL,1622475226049,1622475226049,0,'Public User','','khangpq.vn@gmail.com','[]','vi','male','',0,0,'[]','','',6,0),(5,0,NULL,NULL,1623701509312,1704256772553,0,'khangpqmse0086','','khangpqmse0086@fpt.edu.vn','[]','vi','other','',0,1623701559679,'[]','','',3,1003250);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usertype`
--

DROP TABLE IF EXISTS `usertype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usertype` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `isDelete` tinyint(1) DEFAULT NULL,
  `createdBy` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `deletedBy` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `createdAt` bigint DEFAULT NULL,
  `updatedAt` bigint DEFAULT NULL,
  `deletedAt` bigint DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `ruleIgnoreRole` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `ruleOnlyViewCreatedBy` tinyint(1) DEFAULT NULL,
  `ruleViewUserType` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `defaultRole` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `defaultGrantUserType` int DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usertype`
--

LOCK TABLES `usertype` WRITE;
/*!40000 ALTER TABLE `usertype` DISABLE KEYS */;
INSERT INTO `usertype` (id, isDelete, createdBy, deletedBy, createdAt, updatedAt, deletedAt, `name`, description, ruleIgnoreRole, ruleOnlyViewCreatedBy, ruleViewUserType, defaultRole, defaultGrantUserType)
VALUES (1,0,'1',NULL,1563071061509,1678777910356,0,'sys_admin','','[1]',0,'[4,3,2,5,6,8,7]','[1,3,7,10]',2),(2,0,'1',NULL,1563071061509,1674633501298,0,'Admin','','[1]',1,'[3,4]','[3,2,10]',0),(3,0,'1',NULL,1570765665500,1570765665500,0,'Insider','','[1,2]',1,'[]','[4,3]',0),(4,0,'1',NULL,1570765717636,1570765717636,0,'Demo','','[]',0,'[]','[5,3]',0),(5,0,'1',NULL,1620588830343,1620588830343,0,'SMS','Nhóm quyền SMS','[6,4,3,2,1]',1,'[]','[5]',0),(6,0,'1',NULL,1620588830390,1678383814442,0,'public','','[4,3,2,1,5]',1,'[]','[6]',0),(7,0,'1',NULL,1624515735073,1673315282170,0,'Akacoga','nhóm quyền người dùng fsoft\ndsa\ndsa\ndsa\nd\nsa\nds\nad\nsa\nds\na\ndsa\nd\nsa\nds\nad\nsa\nds\nad\nsa\nds\nad\nsa\nds\nad\nsa\nds\na\ndsa\nd\nsa\nds\nad\nsa\ndsa\nds\na\n','[1,2,3,4,5,6,7]',0,'[]','[8,3]',0),(8,0,'1',NULL,1674633669159,1674633805178,0,'Sổ ghi nợ','Nhóm quyền cho người dùng sổ ghi nợ','[1,2,3,4,5,6,7,8,9]',1,'[]','[10,3]',0);
/*!40000 ALTER TABLE `usertype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'demo_adminpage_1'
--

--
-- Dumping routines for database 'demo_adminpage_1'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-12 22:59:34
