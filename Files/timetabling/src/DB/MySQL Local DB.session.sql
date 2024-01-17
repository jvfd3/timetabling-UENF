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
SELECT
  t.id AS 'id',
  t.ano AS 'ano',
  t.semestre AS 'semestre',
  t.demandaEstimada AS 'demandaEstimada',
  JSON_OBJECT(
    'id', d.id,
    'nome', d.nome,
    'apelido', d.apelido,
    'periodo', d.periodo,
    'codigo', d.codigo
  ) as 'disciplina',
  JSON_OBJECT(
    'id', p.id,
    'nome', p.nome,
    'apelido', p.apelido,
    'curso', p.curso,
    'laboratorio', p.laboratorio
  ) as 'professor',
  (
    SELECT JSON_ARRAYAGG(
      JSON_OBJECT(
        'id', h.id,
        'dia', h.dia,
        'horaInicio', h.horaInicio,
        'duracao', h.duracao,
        'ordem', h.ordem,
        'sala', JSON_OBJECT(
            'id', s.id,
            'capacidade', s.capacidade,
            'idBlock', s.idBlock,
            'bloco', s.bloco,
            'codigo', s.codigo,
            'descricao', s.descricao
        )
      )
    )
    FROM horarios as h
    JOIN salas as s ON h.idSala = s.id
    WHERE h.idTurma = t.id
  ) as 'horarios'
FROM turmas as t
LEFT JOIN disciplinas as d ON t.idDisciplina = d.id
LEFT JOIN professores as p ON t.idProfessor = p.id;

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