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
  - ordem (INT)
  - idTurma (INT, FK)
  - idSala (INT, FK)
*/

/*
Faça uma query que retorne todos os horarios.
idSala é uma chave estrangeira que referencia o id de Salas.
idTurma é uma chave estrangeira que referencia o id das turmas.
idDisciplina é uma chave estrangeira que referencia o id das disciplinas.
idProfessor é uma chave estrangeira que referencia o id dos professores.

todas as chaves estrangeiras devem ser válidas. Ou seja, não pode haver um horario com idSala = 1 se não existir uma sala com id = 1.
Porém pode haver um horario com idSala = NULL, pois nem todos os horarios tem uma sala. E nesses casos, ao invés de retornar um objeto de sala, deve retornar NULL. O mesmo vale para disciplinas e professores.
Mas caso haja um horário tenha idTurma = NULL ou faça referência a uma turma que não existe, a query deve retornar apenas os horários que tem turma.

A query deve retornar os seguintes campos:
- id (INT)
- dia (VARCHAR)
- horaInicio (INT)
- duracao (INT)
- ordem (INT)
- turma (JSON_OBJECT)
  - id (INT)
  - ano (INT)
  - semestre (INT)
  - demandaEstimada (INT)
  - disciplina (JSON_OBJECT)
    - id (INT)
    - periodo (INT)
    - codigo (VARCHAR)
    - apelido (VARCHAR)
    - nome (VARCHAR)
  - professor (JSON_OBJECT)
    - id (INT)
    - laboratorio (VARCHAR)
    - curso (VARCHAR)
    - apelido (VARCHAR)
    - nome (VARCHAR)
- sala (JSON_OBJECT)
  - id (INT)
  - idBlock (INT)
  - capacidade (INT)
  - bloco (VARCHAR)
  - codigo (VARCHAR)
  - descricao (VARCHAR)
*/

*/
*/

/*  QUERY: unified Classes and ClassTimes
    DESCRIPTION: returns all classes with their respective classTimes, professors, subjects and rooms
    STRUCTURE:
    turma: {
      id: INT,
      ano: INT,
      semestre: INT,
      demandaEstimada: INT,
      disciplina: {
        id: INT,
        periodo: INT,
        codigo: VARCHAR,
        apelido: VARCHAR,
        nome: VARCHAR
      },
      professor: {
        id: INT,
        laboratorio: VARCHAR,
        curso: VARCHAR,
        apelido: VARCHAR,
        nome: VARCHAR
      },
      horarios: [
        {
          id: INT,
          dia: VARCHAR,
          horaInicio: INT,
          duracao: INT,
          ordem: INT,
          sala: {
            id: INT,
            idBlock: INT,
            capacidade: INT,
            bloco: VARCHAR,
            codigo: VARCHAR,
            descricao: VARCHAR
          }
        }
      ]
    }
*/

SELECT
  t.id AS 'id',
  t.id AS 'idTurma',
  t.ano AS 'ano',
  t.semestre AS 'semestre',
  t.demandaEstimada AS 'demandaEstimada',
  CASE
    WHEN d.id IS NOT NULL THEN JSON_OBJECT(
      'id', d.id,
      'nome', d.nome,
      'apelido', d.apelido,
      'periodo', d.periodo,
      'codigo', d.codigo
    )
    ELSE NULL
  END as 'disciplina',
  CASE
    WHEN p.id IS NOT NULL THEN JSON_OBJECT(
      'id', p.id,
      'nome', p.nome,
      'apelido', p.apelido,
      'curso', p.curso,
      'laboratorio', p.laboratorio
    )
    ELSE NULL
  END as 'professor',
  CASE
    WHEN (
      SELECT COUNT(*)
      FROM horarios as h
      WHERE h.idTurma = t.id
    ) > 0 THEN (
      SELECT JSON_ARRAYAGG(
        JSON_OBJECT(
          'id', h.id,
          'dia', h.dia,
          'horaInicio', h.horaInicio,
          'duracao', h.duracao,
          'ordem', h.ordem,
          'idTurma', h.idTurma,
          'sala', CASE
            WHEN h.idSala IS NOT NULL THEN JSON_OBJECT(
              'id', s.id,
              'capacidade', s.capacidade,
              'idBlock', s.idBlock,
              'bloco', s.bloco,
              'codigo', s.codigo,
              'descricao', s.descricao
            )
            ELSE NULL
          END
        )
      )
      FROM horarios as h
      LEFT JOIN salas as s ON h.idSala = s.id
      WHERE h.idTurma = t.id
    )
    ELSE JSON_ARRAY()
  END as 'horarios'
FROM turmas as t
LEFT JOIN disciplinas as d ON t.idDisciplina = d.id
LEFT JOIN professores as p ON t.idProfessor = p.id;

/*  QUERY: splitted Classes and ClassTimes - Nested
    DESCRIPTION: returns all classtimes with their respective classes, professors, subjects and rooms
    STRUCTURE: 
    horario: {
      id: INT,
      dia: VARCHAR,
      horaInicio: INT,
      duracao: INT,
      ordem: INT,
      turma: {
        id: INT,
        ano: INT,
        semestre: INT,
        demandaEstimada: INT,
        disciplina: {
          id: INT,
          periodo: INT,
          codigo: VARCHAR,
          apelido: VARCHAR,
          nome: VARCHAR
        },
        professor: {
          id: INT,
          laboratorio: VARCHAR,
          curso: VARCHAR,
          apelido: VARCHAR,
          nome: VARCHAR
        }
      },
      sala: {
        id: INT,
        idBlock: INT,
        capacidade: INT,
        bloco: VARCHAR,
        codigo: VARCHAR,
        descricao: VARCHAR
      }
    }
*/

SELECT 
  h.id,
  h.dia,
  h.horaInicio,
  h.duracao,
  h.ordem,
  JSON_OBJECT(
    'id', t.id,
    'ano', t.ano,
    'semestre', t.semestre,
    'demandaEstimada', t.demandaEstimada,
    'disciplina', IF(t.idDisciplina IS NULL, NULL, JSON_OBJECT(
      'id', d.id,
      'periodo', d.periodo,
      'codigo', d.codigo,
      'apelido', d.apelido,
      'nome', d.nome
    )),
    'professor', IF(t.idProfessor IS NULL, NULL, JSON_OBJECT(
      'id', p.id,
      'laboratorio', p.laboratorio,
      'curso', p.curso,
      'apelido', p.apelido,
      'nome', p.nome
    ))
  ) AS turma,
  IF(h.idSala IS NULL, NULL, JSON_OBJECT(
    'id', s.id,
    'idBlock', s.idBlock,
    'capacidade', s.capacidade,
    'bloco', s.bloco,
    'codigo', s.codigo,
    'descricao', s.descricao
  )) AS sala
FROM 
  horarios h
JOIN 
  turmas t ON h.idTurma = t.id
LEFT JOIN 
  disciplinas d ON t.idDisciplina = d.id
LEFT JOIN 
  professores p ON t.idProfessor = p.id
LEFT JOIN 
  salas s ON h.idSala = s.id
WHERE 
  h.idTurma IS NOT NULL;

/*  QUERY: splitted Classes and ClassTimes - Not Nested - No empty classtimes
    DESCRIPTION: returns all classtimes with their respective classes, professors, subjects and rooms
    STRUCTURE: 
    horario: {
      idHorario: INT,
      dia: VARCHAR,
      horaInicio: INT,
      duracao: INT,
      ordem: INT,
      idTurma: INT,
      ano: INT,
      semestre: INT,
      demandaEstimada: INT,
      professor: {
        id: INT,
        laboratorio: VARCHAR,
        curso: VARCHAR,
        apelido: VARCHAR,
        nome: VARCHAR
      },
      disciplina: {
        id: INT,
        periodo: INT,
        codigo: VARCHAR,
        apelido: VARCHAR,
        nome: VARCHAR
      },
      sala: {
        id: INT,
        idBlock: INT,
        capacidade: INT,
        bloco: VARCHAR,
        codigo: VARCHAR,
        descricao: VARCHAR
      }
    }
*/
SELECT 
    t.ano AS 'ano',
    -- t.comment AS 'comment',
    t.demandaEstimada AS 'demandaEstimada',
    h.dia,
    IF(t.idDisciplina IS NULL, NULL, JSON_OBJECT(
        'id', d.id,
        'periodo', d.periodo,
        'codigo', d.codigo,
        'apelido', d.apelido,
        'nome', d.nome
    )) AS 'disciplina',
    h.duracao AS 'duracao',
    h.horaInicio AS 'horaInicio',
    h.id AS 'idHorario',
    t.id AS 'idTurma',
    IF(t.idProfessor IS NULL, NULL, JSON_OBJECT(
        'id', p.id,
        'laboratorio', p.laboratorio,
        'curso', p.curso,
        'apelido', p.apelido,
        'nome', p.nome
    )) AS 'professor',
    IF(h.idSala IS NULL, NULL, JSON_OBJECT(
        'id', s.id,
        'idBlock', s.idBlock,
        'capacidade', s.capacidade,
        'bloco', s.bloco,
        'codigo', s.codigo,
        'descricao', s.descricao
    )) AS sala,
    t.semestre AS 'semestre'
FROM 
    horarios h
JOIN 
    turmas t ON h.idTurma = t.id
LEFT JOIN 
    disciplinas d ON t.idDisciplina = d.id
LEFT JOIN 
    professores p ON t.idProfessor = p.id
LEFT JOIN 
    salas s ON h.idSala = s.id
WHERE 
    h.idTurma IS NOT NULL;


/* DEBUG: QUERY - splitted Classes and ClassTimes - Not Nested - No empty classtimes */

SELECT 
    t.ano AS 'ano',
    t.semestre AS 'semestre',
    h.id AS 'idHorario',
    t.id AS 'idTurma',
    d.id AS 'idDisciplina',
    p.id AS 'idProfessor',
    s.id AS 'idSala'
FROM 
    horarios h
JOIN 
    turmas t ON h.idTurma = t.id
LEFT JOIN 
    disciplinas d ON t.idDisciplina = d.id
LEFT JOIN 
    professores p ON t.idProfessor = p.id
LEFT JOIN 
    salas s ON h.idSala = s.id
WHERE 
    h.idTurma IS NOT NULL;


/*  QUERY: splitted Classes and ClassTimes - Not Nested - With empty classtimes
    DESCRIPTION: returns all classtimes with their respective classes, professors, subjects and rooms
    STRUCTURE: 
    horario: {
      idHorario: INT,
      dia: VARCHAR,
      horaInicio: INT,
      duracao: INT,
      ordem: INT,
      idTurma: INT,
      ano: INT,
      semestre: INT,
      demandaEstimada: INT,
      professor: {
        id: INT,
        laboratorio: VARCHAR,
        curso: VARCHAR,
        apelido: VARCHAR,
        nome: VARCHAR
      },
      disciplina: {
        id: INT,
        periodo: INT,
        codigo: VARCHAR,
        apelido: VARCHAR,
        nome: VARCHAR
      },
      sala: {
        id: INT,
        idBlock: INT,
        capacidade: INT,
        bloco: VARCHAR,
        codigo: VARCHAR,
        descricao: VARCHAR
      }
    }
*/

SELECT 
    t.ano AS 'ano',
    -- t.comment AS 'comment',
    t.demandaEstimada AS 'demandaEstimada',
    h.dia,
    IF(t.idDisciplina IS NULL, NULL, JSON_OBJECT(
        'id', d.id,
        'periodo', d.periodo,
        'codigo', d.codigo,
        'apelido', d.apelido,
        'nome', d.nome
    )) AS 'disciplina',
    h.duracao AS 'duracao',
    h.horaInicio AS 'horaInicio',
    h.id AS 'idHorario',
    t.id AS 'idTurma',
    IF(t.idProfessor IS NULL, NULL, JSON_OBJECT(
        'id', p.id,
        'laboratorio', p.laboratorio,
        'curso', p.curso,
        'apelido', p.apelido,
        'nome', p.nome
    )) AS 'professor',
    IF(h.idSala IS NULL, NULL, JSON_OBJECT(
        'id', s.id,
        'idBlock', s.idBlock,
        'capacidade', s.capacidade,
        'bloco', s.bloco,
        'codigo', s.codigo,
        'descricao', s.descricao
    )) AS sala,
    t.semestre AS 'semestre'
FROM
    turmas t
LEFT JOIN
    horarios h ON h.idTurma = t.id
LEFT JOIN
    disciplinas d ON t.idDisciplina = d.id
LEFT JOIN
    professores p ON t.idProfessor = p.id
LEFT JOIN
    salas s ON h.idSala = s.id
WHERE
    t.id IS NOT NULL;

/* COUNTING */

SELECT 
  t.ano AS 'ano',
  t.semestre AS 'semestre',
  COUNT(*) AS 'count'
FROM 
  horarios h
JOIN 
  turmas t ON h.idTurma = t.id
WHERE 
  h.idTurma IS NOT NULL
GROUP BY 
  t.ano, t.semestre;

/* DEBUG: QUERY - splitted Classes and ClassTimes - Not Nested - With empty classtimes
*/

SELECT 
    t.ano AS 'ano',
    t.semestre AS 'semestre',
    h.id AS 'idHorario',
    t.id AS 'idTurma',
    d.id AS 'idDisciplina',
    p.id AS 'idProfessor',
    s.id AS 'idSala'
FROM
    turmas t
LEFT JOIN
    horarios h ON h.idTurma = t.id
LEFT JOIN
    disciplinas d ON t.idDisciplina = d.id
LEFT JOIN
    professores p ON t.idProfessor = p.id
LEFT JOIN
    salas s ON h.idSala = s.id
WHERE
    t.id IS NOT NULL;

/* counting */

SELECT 
    t.ano AS 'ano',
    t.semestre AS 'semestre',
    COUNT(*) AS 'count'
FROM
    turmas t
LEFT JOIN
    horarios h ON h.idTurma = t.id
WHERE
    t.id IS NOT NULL
GROUP BY 
    t.ano, t.semestre;

/* Selecionar dados de turma' */
SELECT
  t.ano AS ano,
  t.semestre AS semestre,
  t.demandaEstimada AS demandaEstimada,
  p.nome AS NomeProfessor,
  p.apelido AS ApelidoProfessor,
  p.curso AS CursoProfessor,
  p.laboratorio AS LaboratorioProfessor,
  d.nome AS NomeDisciplina,
  d.apelido AS ApelidoDisciplina,
  d.codigo AS CodigoDisciplina,
  d.periodo AS PeriodoDisciplina
  FROM turmas AS t
    JOIN professores AS p
      ON t.idProfessor = p.id
    JOIN disciplinas AS d
      ON t.idDisciplina = d.id;

/* Selecionar horários */
SELECT
    h.idTurma AS idTurma,
    h.ordem AS ordem,
    h.dia AS dia,
    h.horaInicio AS horaInicio,
    h.duracao AS duracao,
    s.capacidade AS capacidade,
    s.bloco AS bloco,
    s.codigo AS codigoSala,
    s.descricao AS descricao
  FROM horarios AS h
    JOIN salas AS s
      ON h.idSala = s.id
    JOIN turmas AS t
      ON h.idTurma = t.id
ORDER BY h.idTurma, h.ordem;

WITH turmasCTE AS (
  SELECT
    t.id AS idTurma,
    t.ano AS ano,
    t.semestre AS semestre,
    t.demandaEstimada AS demandaEstimada,
    p.nome AS NomeProfessor,
    p.apelido AS ApelidoProfessor,
    p.curso AS CursoProfessor,
    p.laboratorio AS LaboratorioProfessor,
    d.nome AS NomeDisciplina,
    d.apelido AS ApelidoDisciplina,
    d.codigo AS CodigoDisciplina,
    d.periodo AS PeriodoDisciplina
  FROM turmas AS t
    JOIN professores AS p
      ON t.idProfessor = p.id
    JOIN disciplinas AS d
      ON t.idDisciplina = d.id
)
SELECT
    t.id AS idTurma,
    t.ano,
    t.semestre,
    t.demandaEstimada,
    t.NomeProfessor AS nomeProfessor,
    t.ApelidoProfessor AS apelidoProfessor,
    t.CursoProfessor AS cursoProfessor,
    t.LaboratorioProfessor AS laboratorioProfessor,
    t.NomeDisciplina AS nomeDisciplina,
    t.ApelidoDisciplina AS apelidoDisciplina,
    t.CodigoDisciplina AS codigoDisciplina,
    t.PeriodoDisciplina AS periodoDisciplina,
    h.ordem AS ordem AS ordemHorario,
    h.dia AS diaHorario,
    h.horaInicio AS horaInicio,
    h.duracao AS duracao,
    s.capacidade AS capacidadeSala,
    s.bloco AS bloco,
    s.codigo AS codigoSala,
    s.descricao AS descricaoSala
FROM horarios AS h
JOIN salas AS s
  ON h.idSala = s.id
JOIN turmasCTE AS t
  ON h.idTurma = t.idTurma
ORDER BY h.idTurma, h.ordem;

WITH turmasCTE AS ( SELECT t.id AS idTurma, t.ano AS ano, t.semestre AS semestre, t.demandaEstimada AS demandaEstimada, p.nome AS NomeProfessor, p.apelido AS ApelidoProfessor, p.curso AS CursoProfessor, p.laboratorio AS LaboratorioProfessor, d.nome AS NomeDisciplina, d.apelido AS ApelidoDisciplina, d.codigo AS CodigoDisciplina, d.periodo AS PeriodoDisciplina FROM turmas AS t JOIN professores AS p ON t.idProfessor = p.id JOIN disciplinas AS d ON t.idDisciplina = d.id ) SELECT t.idTurma, h.id AS idHorario, t.ano, t.semestre, t.demandaEstimada, t.NomeProfessor, t.ApelidoProfessor, t.CursoProfessor, t.LaboratorioProfessor, t.NomeDisciplina, t.ApelidoDisciplina, t.CodigoDisciplina, t.PeriodoDisciplina, h.ordem AS ordem, h.dia AS dia, h.horaInicio AS horaInicio, h.duracao AS duracao, s.capacidade AS CapacidadeSala, s.bloco AS bloco, s.codigo AS codigoSala, s.descricao AS descricao FROM horarios AS h JOIN salas AS s ON h.idSala = s.id JOIN turmasCTE AS t ON h.idTurma = t.idTurma ORDER BY h.idTurma, h.ordem;