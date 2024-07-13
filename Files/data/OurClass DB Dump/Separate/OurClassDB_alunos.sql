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
-- Table structure for table `alunos`
--

DROP TABLE IF EXISTS `alunos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alunos` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `anoEntrada` int DEFAULT NULL,
  `curso` varchar(255) DEFAULT NULL,
  `matricula` varchar(255) DEFAULT NULL,
  `nome` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=333 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alunos`
--

LOCK TABLES `alunos` WRITE;
/*!40000 ALTER TABLE `alunos` DISABLE KEYS */;
INSERT INTO `alunos` VALUES (1,2014,'Ciência da Computação','00114110001','Augusto Amaral Pereira'),(2,2015,'Ciência da Computação','00115110002','Mateus Nunes Schulz'),(3,2015,'Ciência da Computação','00115110003','Ralf Cruz Mateus'),(4,2015,'Ciência da Computação','00115110004','Thiago Rodrigues'),(5,2016,'Ciência da Computação','00116110005','Ian Pontes Louzada'),(6,2016,'Ciência da Computação','00116110006','Jomacry Bruno Caetano'),(7,2016,'Ciência da Computação','00116110007','Leonardo Nascimento Dias'),(8,2016,'Ciência da Computação','00116110008','Matheus Dias'),(9,2017,'Ciência da Computação','00117110009','Maria Luíza De Souza Stel'),(10,2018,'Ciência da Computação','00118110010','Ariany Jasmyne Lopes Fran'),(11,2018,'Ciência da Computação','00118110011','Andre Do Valle Medeiros'),(12,2018,'Ciência da Computação','00118110012','Braulio De Oliveira Lopes'),(13,2018,'Ciência da Computação','00118110013','Caio Morais Velasque Silv'),(14,2018,'Ciência da Computação','00118110014','Caio Passos Ferreira Mach'),(15,2018,'Ciência da Computação','00118110015','Carlos Alberto Vergilio'),(16,2018,'Ciência da Computação','00118110016','Daniel De Faria Ferreira'),(17,2018,'Ciência da Computação','00118110017','Guilherme Oliveira Mussa'),(18,2018,'Ciência da Computação','00118110018','Isabely Gonçalves Mariano'),(19,2018,'Ciência da Computação','00118110019','Javier Ernesto Lopez Del'),(20,2018,'Ciência da Computação','00118110020','Jhonatan Alves Cossetti'),(21,2018,'Ciência da Computação','00118110021','João Victor Lima Kienen'),(22,2018,'Ciência da Computação','00118110022','José Marcos Nogueira Siqu'),(23,2018,'Ciência da Computação','00118110023','Josué Costa Da Silva'),(24,2018,'Ciência da Computação','00118110024','Josué Souza Da Silva'),(25,2018,'Ciência da Computação','00118110025','Luciano Gomes Da Silva Ju'),(26,2018,'Ciência da Computação','00118110026','Luis Fernando Peixoto Cab'),(27,2018,'Ciência da Computação','00118110027','Pedro Henrique Cordeiro M'),(28,2018,'Ciência da Computação','00118110028','Yro Manhães Marques'),(29,2018,'Ciência da Computação','00118110029','Yuri Garcia Campos'),(30,2019,'Ciência da Computação','00119110030','Adriano Ribeiro da Silva'),(31,2019,'Ciência da Computação','00119110031','Alysson De Jesus'),(32,2019,'Ciência da Computação','00119110032','Andre Angelo'),(33,2019,'Ciência da Computação','00119110033','Daniel Brito Dos Santos'),(34,2019,'Ciência da Computação','00119110034','Daniel Terra'),(35,2019,'Ciência da Computação','00119110035','Daniel Viter'),(36,2019,'Ciência da Computação','00119110036','Eduardo Ferreira'),(37,2019,'Ciência da Computação','00119110037','Gabriel Marques'),(38,2019,'Ciência da Computação','00119110038','João Bosco'),(39,2019,'Ciência da Computação','00119110039','João Vítor Fernandes Dias'),(40,2019,'Ciência da Computação','00119110040','João Víttor Vieira Pinto'),(41,2019,'Ciência da Computação','00119110041','José Lucio'),(42,2019,'Ciência da Computação','00119110042','Juliana Ramos'),(43,2019,'Ciência da Computação','00119110043','Larissa Ribeiro'),(44,2019,'Ciência da Computação','00119110044','Mateus De Souza'),(45,2019,'Ciência da Computação','00119110045','Nicole De Souza'),(46,2019,'Ciência da Computação','00119110046','Paulo Lucas'),(47,2019,'Ciência da Computação','00119110047','Paulo Roberto'),(48,2019,'Ciência da Computação','00119110048','Pedro Sousa'),(49,2019,'Ciência da Computação','00119110049','Ricardo William'),(50,2019,'Ciência da Computação','00119110050','Romulo Souza'),(51,2020,'Ciência da Computação','20201100051','Andras Milan'),(52,2020,'Ciência da Computação','20201100052','Daniel Gomes Silva'),(53,2020,'Ciência da Computação','20201100053','Davi Ciafrino Abud'),(54,2020,'Ciência da Computação','20201100054','Binha Ferraz Dauma'),(55,2020,'Ciência da Computação','20201100055','Estefanio Ribeiro'),(56,2020,'Ciência da Computação','20201100056','Frederico Rangel Sader'),(57,2020,'Ciência da Computação','20201100057','Gabriel Pessanha'),(58,2020,'Ciência da Computação','20201100058','Heitor Maia Azevedo'),(59,2020,'Ciência da Computação','20201100059','Hudson Cosme'),(60,2020,'Ciência da Computação','20201100060','João Victor Do Couto'),(61,2020,'Ciência da Computação','20201100061','Jose Arthur De Mello'),(62,2020,'Ciência da Computação','20201100062','Julia Costa De Souza'),(63,2020,'Ciência da Computação','20201100063','Kaio Monte Cristo'),(64,2020,'Ciência da Computação','20201100064','Kayo Dos Santos Veloso'),(65,2020,'Ciência da Computação','20201100065','Lucas Gomes Bichara'),(66,2020,'Ciência da Computação','20201100066','Lucas Nathã Monteiro'),(67,2020,'Ciência da Computação','20201100067','Luiz Miguel Guedes'),(68,2020,'Ciência da Computação','20201100068','Matheus Saraiva'),(69,2020,'Ciência da Computação','20201100069','Matheus De Souza'),(70,2020,'Ciência da Computação','20201100070','Mauricio Junior De Macedo'),(71,2020,'Ciência da Computação','20201100071','Nathan Gabriel Rodrigues'),(72,2020,'Ciência da Computação','20201100072','Otavio Moore'),(73,2020,'Ciência da Computação','20201100073','Victor De Oliveira Silva'),(74,2020,'Ciência da Computação','20201100074','Wellington Barrada Pacheco'),(75,2021,'Ciência da Computação','20211100075','Carlos Alexandre Titoneli'),(76,2021,'Ciência da Computação','20211100076','Davi Ximenes'),(77,2021,'Ciência da Computação','20211100077','Diogo Siqueira Santos'),(78,2021,'Ciência da Computação','20211100078','Enzo Alberoni'),(79,2021,'Ciência da Computação','20211100079','Enzo Souza'),(80,2021,'Ciência da Computação','20211100080','Eric Hoffmann'),(81,2021,'Ciência da Computação','20211100081','Fabiano Ribeiro'),(82,2021,'Ciência da Computação','20211100082','Gabriel Fassarela'),(83,2021,'Ciência da Computação','20211100083','Gabriel Viana De Almeida'),(84,2021,'Ciência da Computação','20211100084','João Pedro De Oliveira'),(85,2021,'Ciência da Computação','20211100085','João Pedro Santesso'),(86,2021,'Ciência da Computação','20211100086','Julia Cavalcanti'),(87,2021,'Ciência da Computação','20211100087','Luiz Gabriel Licassali'),(88,2021,'Ciência da Computação','20211100088','Marcos Campos'),(89,2021,'Ciência da Computação','20211100089','Mariana Cossetti'),(90,2021,'Ciência da Computação','20211100090','Marlan Musser'),(91,2021,'Ciência da Computação','20211100091','Matheus Tavares'),(92,2021,'Ciência da Computação','20211100092','Nathan De Oliveira'),(93,2021,'Ciência da Computação','20211100093','Pedro Victor Rocha'),(94,2021,'Ciência da Computação','20211100094','Thallys De Souza Costa'),(95,2021,'Ciência da Computação','20211100095','Tiago Batista Carvalho'),(96,2021,'Ciência da Computação','20211100096','Vitor Leal Lima'),(97,2022,'Ciência da Computação','20221100097','Arthur Moi'),(98,2022,'Ciência da Computação','20221100098','Breno Foly'),(99,2022,'Ciência da Computação','20221100099','Cicero Davel'),(100,2022,'Ciência da Computação','20221100100','Davi Fabris'),(101,2022,'Ciência da Computação','20221100101','Davi Rodrigues'),(102,2022,'Ciência da Computação','20221100102','Felipe Sousa Garcia'),(103,2022,'Ciência da Computação','20221100103','Gabriel Pinheiro'),(104,2022,'Ciência da Computação','20221100104','Gabriel Wagner'),(105,2022,'Ciência da Computação','20221100105','Gabriela Santos'),(106,2022,'Ciência da Computação','20221100106','Ian Martins'),(107,2022,'Ciência da Computação','20221100107','Igor Ezequiel Duarte'),(108,2022,'Ciência da Computação','20221100108','João Berchmans'),(109,2022,'Ciência da Computação','20221100109','Kaue Dos Santos'),(110,2022,'Ciência da Computação','20221100110','Luiz Fernando Barreto'),(111,2022,'Ciência da Computação','20221100111','Marcos Vinicios Dias'),(112,2022,'Ciência da Computação','20221100112','Mateus Do Nascimento'),(113,2022,'Ciência da Computação','20221100113','Matheus Da Costa Gama'),(114,2022,'Ciência da Computação','20221100114','Pablo Henrique Chaves'),(115,2022,'Ciência da Computação','20221100115','Paulo Fernando'),(116,2022,'Ciência da Computação','20221100116','Pedro Cordeiro Ferreira'),(117,2022,'Ciência da Computação','20221100117','Pedro Lozer De Deus'),(118,2022,'Ciência da Computação','20221100118','Rhiquelme Luis'),(119,2022,'Ciência da Computação','20221100119','Rodrigo Loiola'),(120,2022,'Ciência da Computação','20221100120','Tárcio Peixoto Derossi'),(121,2022,'Ciência da Computação','20221100121','Wanderson Carlos Ramos'),(122,2023,'Ciência da Computação','20231100122','Alice Aparecida Ines'),(123,2023,'Ciência da Computação','20231100123','Arthur Pereira Da Silva'),(124,2023,'Ciência da Computação','20231100124','Barbara Teodoro De Sa'),(125,2023,'Ciência da Computação','20231100125','Bernardo Rocha De Oliveira'),(126,2023,'Ciência da Computação','20231100126','Bruno Nunes Dos Santos'),(127,2023,'Ciência da Computação','20231100127','Caio De Souza Lana'),(128,2023,'Ciência da Computação','20231100128','Emanuel Peixoto Gomes'),(129,2023,'Ciência da Computação','20231100129','Felipe Barcelos Nogueira'),(130,2023,'Ciência da Computação','20231100130','Filipe Samuel Pires'),(131,2023,'Ciência da Computação','20231100131','Hugo Ribeiro Facini'),(132,2023,'Ciência da Computação','20231100132','Isadora Nunes Miranda'),(133,2023,'Ciência da Computação','20231100133','João Berchmans Degli'),(134,2023,'Ciência da Computação','20231100134','Juan Augusto Cristo'),(135,2023,'Ciência da Computação','20231100135','Lucas Aguiar Amado'),(136,2023,'Ciência da Computação','20231100136','Manuela Dos Santos'),(137,2023,'Ciência da Computação','20231100137','Maria Carvalhido Izabel Barreto'),(138,2023,'Ciência da Computação','20231100138','Maria Eduarda Sampaio Zampirolo'),(139,2023,'Ciência da Computação','20231100139','Maria Luiza Souza Da Silva'),(140,2023,'Ciência da Computação','20231100140','Mateus Magalhaes Costa Ferreira'),(141,2023,'Ciência da Computação','20231100141','Nicolas Thaynara De Carvalho'),(142,2023,'Ciência da Computação','20231100142','Renata Couto Lopes'),(143,2023,'Ciência da Computação','20231100143','Thiago Da Costa'),(144,2023,'Ciência da Computação','20231100144','Vinícius Hissa Azevedo'),(145,2023,'Ciência da Computação','20231100145','Zadoque Pires'),(326,2017,'Ciência da Computação','123','123');
/*!40000 ALTER TABLE `alunos` ENABLE KEYS */;
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

-- Dump completed on 2024-07-13 11:38:18
