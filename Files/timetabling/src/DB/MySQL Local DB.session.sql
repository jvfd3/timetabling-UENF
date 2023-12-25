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
  - capacidade (INT)
  - bloco (VARCHAR)
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
    t.ano,
    t.semestre,
    t.demandaEstimada,
    t.NomeProfessor,
    t.ApelidoProfessor,
    t.CursoProfessor,
    t.LaboratorioProfessor,
    t.NomeDisciplina,
    t.ApelidoDisciplina,
    t.CodigoDisciplina,
    t.PeriodoDisciplina,
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
JOIN turmasCTE AS t
  ON h.idTurma = t.idTurma
ORDER BY h.idTurma, h.ordem;