/*
Tenho o seguinte banco de dados:

- disciplinas
  - id (INT, PK)
  - periodo (INT)
  - codigo (VARCHAR)
  - apelido (VARCHAR)
  - nome (VARCHAR)
- professores
  - id (INT, PK)
  - laboratorio (VARCHAR)
  - curso (VARCHAR)
  - apelido (VARCHAR)
  - nome (VARCHAR)
- salas
  - id (INT, PK)
  - idBlock (INT)
  - bloco (VARCHAR)
  - capacidade (INT)
  - codigo (VARCHAR)
  - descricao (VARCHAR)
- turmas
  - id (INT, PK)
  - ano (INT)
  - semestre (INT)
  - demandaEstimada (INT)
  - idDisciplina (INT, FK)
  - idProfessor (INT, FK)
- horarios
  - id (INT, PK)
  - dia (VARCHAR)
  - horaInicio (INT)
  - duracao (INT)
  - idTurma (INT, FK)
  - idSala (INT, FK)
*/

CREATE TABLE `alunos` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `anoEntrada` int DEFAULT NULL,
  `curso` varchar(255),
  `matricula` varchar(255),
  `nome` varchar(255),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=326 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE `disciplinas` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `periodo` int unsigned DEFAULT NULL,
  `codigo` varchar(255),
  `apelido` varchar(255),
  `nome` varchar(255),
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE `professores` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `laboratorio` varchar(255),
  `curso` varchar(255),
  `apelido` varchar(255),
  `nome` varchar(255),
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=128 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE `salas` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `capacidade` int unsigned DEFAULT NULL,
  `idBlock` int DEFAULT NULL,
  `bloco` varchar(255),
  `codigo` varchar(255),
  `descricao` varchar(255),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE `turmas` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `ano` int unsigned DEFAULT NULL,
  `semestre` int unsigned DEFAULT NULL,
  `demandaEstimada` int unsigned DEFAULT NULL,
  `idProfessor` int unsigned DEFAULT NULL,
  `idDisciplina` int unsigned DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `idTurmaProfessor_idx` (`idProfessor`),
  KEY `idTurmaDisciplina_idx` (`idDisciplina`),
  CONSTRAINT `idTurmaDisciplina` FOREIGN KEY (`idDisciplina`) REFERENCES `disciplinas` (`id`),
  CONSTRAINT `idTurmaProfessor` FOREIGN KEY (`idProfessor`) REFERENCES `professores` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20290509 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE `horarios` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `dia` ENUM('SEG', 'TER', 'QUA', 'QUI', 'SEX'),
  `horaInicio` int unsigned DEFAULT NULL,
  `duracao` int unsigned DEFAULT NULL,
  `idTurma` int unsigned DEFAULT NULL,
  `idSala` int unsigned DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `idHorarioSala_idx` (`idSala`),
  KEY `idHorarioTurma_idx` (`idTurma`),
  CONSTRAINT `idHorarioSala` FOREIGN KEY (`idSala`) REFERENCES `salas` (`id`),
  CONSTRAINT `idHorarioTurma` FOREIGN KEY (`idTurma`) REFERENCES `turmas` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2028030895 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
