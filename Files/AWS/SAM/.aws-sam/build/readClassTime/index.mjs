import { defaultRead } from "/opt/db.js";

const readItemsQuery = getQuery();

const itemName = "ClassTime";
let local = `aws>lambda>Read>${itemName}>handler`;
const isDebugging = false;

async function handler(event) {
  isDebugging && console.log(local + ">{event: ", event, "}");

  return await readItems();
}

async function readItems() {
  local += `>read${itemName}`;
  const itemList = null;
  const exists = true;
  return await defaultRead(readItemsQuery, itemList, exists);
}

function getQuery() {
  const bigSelectQuery =
    "\
  SELECT\
    t.ano AS 'ano',\
    t.semestre AS 'semestre',\
    t.demandaEstimada AS 'demandaEstimada',\
    h.comment AS 'comment',\
    t.id AS 'idTurma',\
    IF(t.idDisciplina IS NULL, NULL, JSON_OBJECT(\
        'id', d.id,\
        'periodo', d.periodo,\
        'codigo', d.codigo,\
        'apelido', d.apelido,\
        'nome', d.nome\
    )) AS 'disciplina',\
    IF(t.idProfessor IS NULL, NULL, JSON_OBJECT(\
        'id', p.id,\
        'laboratorio', p.laboratorio,\
        'curso', p.curso,\
        'apelido', p.apelido,\
        'nome', p.nome\
    )) AS 'professor',\
    h.dia,\
    h.horaInicio AS 'horaInicio',\
    h.duracao AS 'duracao',\
    h.id AS 'idHorario',\
    IF(h.idSala IS NULL, NULL, JSON_OBJECT(\
        'id', s.id,\
        'idBlock', s.idBlock,\
        'capacidade', s.capacidade,\
        'bloco', s.bloco,\
        'codigo', s.codigo,\
        'descricao', s.descricao\
    )) AS sala\
  FROM\
    turmas t\
  LEFT JOIN\
    horarios h ON h.idTurma = t.id\
  LEFT JOIN\
    disciplinas d ON t.idDisciplina = d.id\
  LEFT JOIN\
    professores p ON t.idProfessor = p.id\
  LEFT JOIN\
    salas s ON h.idSala = s.id\
  WHERE\
    t.id IS NOT NULL;\
  ";
  return bigSelectQuery;
}

export { handler };
