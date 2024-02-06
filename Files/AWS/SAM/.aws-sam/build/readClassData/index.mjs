import { defaultRead } from "/opt/db.js";

const readItemsQuery = getQuery();

const itemName = "ClassData";
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
    t.id AS 'id',\
    t.id AS 'idTurma',\
    t.ano AS 'ano',\
    t.semestre AS 'semestre',\
    t.demandaEstimada AS 'demandaEstimada',\
    CASE\
      WHEN d.id IS NOT NULL THEN JSON_OBJECT(\
        'id', d.id,\
        'nome', d.nome,\
        'apelido', d.apelido,\
        'periodo', d.periodo,\
        'codigo', d.codigo\
      )\
      ELSE NULL\
    END as 'disciplina',\
    CASE\
      WHEN p.id IS NOT NULL THEN JSON_OBJECT(\
        'id', p.id,\
        'nome', p.nome,\
        'apelido', p.apelido,\
        'curso', p.curso,\
        'laboratorio', p.laboratorio\
      )\
      ELSE NULL\
    END as 'professor',\
    CASE\
      WHEN (\
        SELECT COUNT(*)\
        FROM horarios as h\
        WHERE h.idTurma = t.id\
      ) > 0 THEN (\
        SELECT JSON_ARRAYAGG(\
          JSON_OBJECT(\
            'id', h.id,\
            'dia', h.dia,\
            'horaInicio', h.horaInicio,\
            'duracao', h.duracao,\
            'idTurma', h.idTurma,\
            'sala', CASE\
              WHEN h.idSala IS NOT NULL THEN JSON_OBJECT(\
                'id', s.id,\
                'capacidade', s.capacidade,\
                'idBlock', s.idBlock,\
                'bloco', s.bloco,\
                'codigo', s.codigo,\
                'descricao', s.descricao\
              )\
              ELSE NULL\
            END\
          )\
        )\
        FROM horarios as h\
        LEFT JOIN salas as s ON h.idSala = s.id\
        WHERE h.idTurma = t.id\
      )\
      ELSE JSON_ARRAY()\
    END as 'horarios'\
  FROM turmas as t\
  LEFT JOIN disciplinas as d ON t.idDisciplina = d.id\
  LEFT JOIN professores as p ON t.idProfessor = p.id;\
  ";
  return bigSelectQuery;
}

export { handler };
