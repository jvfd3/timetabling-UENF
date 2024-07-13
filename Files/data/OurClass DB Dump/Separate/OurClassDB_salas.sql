CREATE DATABASE  IF NOT EXISTS `OurClassDB` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `OurClassDB`;
-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: ourclassuirds.cgsgwtemx5r8.us-east-2.rds.amazonaws.com    Database: OurClassDB
-- ------------------------------------------------------
-- Server version	8.0.35

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
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `salas`
--

DROP TABLE IF EXISTS `salas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `salas` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `capacidade` int unsigned DEFAULT NULL,
  `idBlock` int DEFAULT NULL,
  `bloco` varchar(255) DEFAULT NULL,
  `codigo` varchar(255) DEFAULT NULL,
  `descricao` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `salas`
--

LOCK TABLES `salas` WRITE;
/*!40000 ALTER TABLE `salas` DISABLE KEYS */;
INSERT INTO `salas` VALUES (1,20,1,'E1','217','Desenho'),(2,24,7,'P5','inf1',''),(3,24,7,'P5','inf2',''),(4,24,7,'P5','111',''),(5,24,7,'P5','112',''),(6,30,5,'P3','Bcct','Bancada do CCT'),(7,35,5,'P3','104','Prédio do CCT'),(8,35,5,'P3','105','Prédio do CCT'),(9,35,5,'P3','107','Prédio do CCT'),(10,35,5,'P3','109A','Prédio do CCT'),(11,35,5,'P3','203A','Prédio do CCT'),(12,35,5,'P3','208','Prédio do CCT'),(13,35,5,'P3','209B','Lab Fis CCT'),(14,35,1,'E1','205','LCMAT'),(15,35,1,'E1','206',''),(16,35,1,'E1','211',''),(17,35,1,'E1','219',''),(18,35,1,'E1','220',''),(19,35,12,'P10','3',''),(20,40,5,'P3','108','Prédio do CCT'),(21,40,5,'P3','109B','Prédio do CCT'),(22,40,5,'P3','206','Prédio do CCT'),(23,40,5,'P3','207','Prédio do CCT'),(24,40,12,'P10','1',''),(25,40,12,'P10','2',''),(26,65,5,'P3','106','Prédio do CCT'),(35,NULL,1,'E1','113',NULL),(36,6,7,'P5','116',NULL),(37,510,20,'Apitão','Principal','Anfiteatro'),(38,143,20,'Apitão','1','Anfiteatro'),(39,130,20,'Apitão','2','Anfiteatro'),(40,132,20,'Apitão','3','Anfiteatro'),(41,136,20,'Apitão','4','Anfiteatro'),(42,108,20,'Apitão','Cinema',''),(43,1,7,'P5','119','Sala dos professores'),(49,50,5,'P3','1','Auditório'),(50,55,7,'P5','2','Auditório'),(51,15,5,'P3','205','Laboratório de Física');
/*!40000 ALTER TABLE `salas` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-13 11:38:21
