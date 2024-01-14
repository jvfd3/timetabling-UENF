// turmasRead->index.js
import { dbExecute } from "/opt/db.js";
import { getPayloadResponse } from "/opt/auxFunctions.js";
let local = "";

async function handler(event) {
  local = "aws>lambda>turmas>Read>handler";
  console.log(local + ">{event: ", event, "}");

  return await readTurmas();
}

async function readTurmas() {
  local += ">readTurmas";
  let readTurmasQuery =
    "WITH turmasCTE AS ( SELECT t.id AS idTurma, t.ano AS ano, t.semestre AS semestre, t.demandaEstimada AS demandaEstimada, p.nome AS nomeProfessor, p.apelido AS apelidoProfessor, p.curso AS cursoProfessor, p.laboratorio AS laboratorioProfessor, d.nome AS nomeDisciplina, d.apelido AS apelidoDisciplina, d.codigo AS codigoDisciplina, d.periodo AS periodoDisciplina FROM turmas AS t JOIN professores AS p ON t.idProfessor = p.id JOIN disciplinas AS d ON t.idDisciplina = d.id ) SELECT t.idTurma, h.id AS idHorario, t.ano, t.semestre, t.demandaEstimada, t.nomeProfessor, t.apelidoProfessor, t.cursoProfessor, t.laboratorioProfessor, t.nomeDisciplina, t.apelidoDisciplina, t.codigoDisciplina, t.periodoDisciplina, h.ordem AS ordemHorario, h.dia AS diaHorario, h.horaInicio AS horaInicio, h.duracao AS duracao, s.capacidade AS capacidadeSala, s.bloco AS bloco, s.codigo AS codigoSala, s.descricao AS descricao FROM horarios AS h JOIN salas AS s ON h.idSala = s.id JOIN turmasCTE AS t ON h.idTurma = t.idTurma ORDER BY h.idTurma, h.ordem;";
  return await defaultRead(readTurmasQuery, null);
}

async function defaultRead(query, queryValues) {
  local += ">defaultRead";
  let message = local;
  let queryResult = null;
  let localError = null;
  let statusCode = 500;
  try {
    queryResult = await dbExecute(query);
    queryResult[1] = null; // remove excessive metadata
    message = `>itens lidos com sucesso: ${queryResult.length}`;
    statusCode = 200;
    console.log(message, statusCode, queryResult);
  } catch (error) {
    statusCode = 500;
    localError = error;
    message = local + ">Erro ao executar a leitura.";
    console.error(message, statusCode, error);
  }
  return getPayloadResponse(
    message,
    query,
    queryValues,
    queryResult,
    localError,
    statusCode
  );
}

export { handler };
