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
-- Table structure for table `laboratories`
--

DROP TABLE IF EXISTS `laboratories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `laboratories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `center` varchar(255) DEFAULT NULL,
  `alias` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `laboratories`
--

LOCK TABLES `laboratories` WRITE;
/*!40000 ALTER TABLE `laboratories` DISABLE KEYS */;
INSERT INTO `laboratories` VALUES (1,'CBB','LBCT','Laboratório de Biologia Celular e Tecidual'),(2,'CBB','LBR','Laboratório de Biologia do Reconhecer'),(3,'CBB','LBT','Laboratório de Biotecnologia'),(4,'CBB','LCA','Laboratório de Ciências Ambientais'),(5,'CBB','LFBM','Laboratório de Fisiologia e Bioquímica de Microrganismos'),(6,'CBB','LQFPP','Laboratório de Química e Função de Proteínas e Peptídeos'),(7,'CCH','LCC','Laboratório de Ciências Cognitivas'),(8,'CCH','LCL','Laboratório de Cognição e Linguagem'),(9,'CCH','LEEA','Laboratório de Estudos do Espaço Antrópico'),(10,'CCH','LEEL','Laboratório de Estudos da Educação e Linguagem'),(11,'CCH','LESCE','Laboratório de Estudo da Sociedade Civil e Estado'),(12,'CCH','LEXPED','Laboratório de Experimentação Pedagógicia'),(13,'CCH','LGPP','Laboratório de Gestão e Políticas Públicas'),(14,'CCH','LPT','Laboratorio de Pesquisa e Tecnologia de Educação'),(15,'CCT','LAMAV','Laboratório de Materiais Avançados'),(16,'CCT','LAMET','Laboratório de Meteorologia'),(17,'CCT','LCENG','Laboratório de Ciências de Engenharia'),(18,'CCT','LCFIS','Laboratorio de Ciencias Fisicas'),(19,'CCT','LCMAT','Laboratorio de Ciencias Matematicas'),(20,'CCT','LCQUI','Laboratório de Ciências Químicas'),(21,'CCT','LECIV','Laboratório de Engenharia Civil'),(22,'CCT','LENEP','Laboratorio de Engenharia e Exploracao de Petroleo'),(23,'CCT','LEPROD','Laboratório de Engenharia de Produção'),(24,'CCT','LMCCT','Laboratório Matrícula CCT'),(25,'CCTA','LCCA','Laboratório de Clínicas e Cirurgia Animal'),(26,'CCTA','LEAG','Laboratório de Engenharia Agrícola'),(27,'CCTA','LEF','Laboratório de Entomologia e Fitopatologia'),(28,'CCTA','LFBM','Laboratório de Fisiologia e Bioquímica de Microrganimos'),(29,'CCTA','LFIT','Laboratório de Fitotecnia'),(30,'CCTA','LMCCTA','Laboratório Matrícula Ccta'),(31,'CCTA','LMGA','Laboratório de Melhoramento Genético Animal'),(32,'CCTA','LMGV','Laboratório de Melhoramento Genético Vegetal'),(33,'CCTA','LMPA','Laboratório de Morfologia e Patologia Animal'),(34,'CCTA','LPP','Laboratório de Proteção de Plantas'),(35,'CCTA','LRGBG','Laboratório de Recursos Genéticos-banco de Germoplasma'),(36,'CCTA','LSA','Laboratório de Sanidade Animal'),(37,'CCTA','LSOL','Laboratório de Solos'),(38,'CCTA','LTA','Laboratório de Tecnologia de Alimentos'),(39,'CCTA','LZNA','Laboratório de Zootecnia e Nutrição Animal'),(40,'CCTA','LZO','Laboratório de Zootecnia');
/*!40000 ALTER TABLE `laboratories` ENABLE KEYS */;
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

-- Dump completed on 2024-07-13 11:38:29
