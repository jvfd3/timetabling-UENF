// professoresCreate->index.js
import { dbExecute } from "/opt/db.js";
import { getPayloadResponse } from "/opt/auxFunctions.js";
let local = "";
const itemName = "professor";

async function handler(event) {
  local = `aws>lambda>${itemName}>Create>handler`;
  console.log(local + ">{event: ", event, "}");
  let newItem = event?.newItem ?? JSON.parse(event?.body)?.newItem;
  console.log(">>>", newItem, "<<<");
  return await createItem(newItem);
}

async function createItem(newItem) {
  local += `>create${itemName}`;
  let createItemQuery =
    "INSERT INTO professores(`apelido`, `curso`, `laboratorio`, `nome`) VALUES(?, ?, ?, ?)";
  return await defaultCreate(createItemQuery, convertToList(newItem));
}

function convertToList(professor) {
  console.log(professor);
  const values = [
    /* Vai ser nulo se algum item não for definido */
    professor?.apelido ?? null,
    professor?.curso ?? null,
    professor?.laboratorio ?? null,
    professor?.nome ?? null,
  ];
  console.log(">>>", values, "<<<");
  return values;
}

async function defaultCreate(query, queryValues) {
  local += ">defaultCreate";
  let message = local;
  let queryResult = null;
  let localError = null;
  let statusCode = 500;
  try {
    queryResult = await dbExecute(query, queryValues);

    message += `>Item: ${queryValues} criado com sucesso.`;
    statusCode = 201;
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
