// professoresCreate->index.js
import { dbExecute } from "/opt/db.js";
import { getPayloadResponse } from "/opt/auxFunctions.js";
let local = "";
const itemName = "sala";

async function handler(event) {
  local = `aws>lambda>${itemName}>Create>handler`;
  console.log(local + ">{event: ", event, "}");
  let newItem = event.newItem;
  return await createItem(newItem);
}

async function createItem(newItem) {
  local += `>create${itemName}`;
  let createItemQuery =
    "INSERT INTO salas(`capacidade`, `idBlock`, `bloco`, `codigo`, `descricao`) VALUES(?, ?, ?, ?, ?)";
  return await defaultCreate(createItemQuery, convertToList(newItem));
}

function convertToList(room) {
  const values = [
    /* Vai ser nulo se algum item não for definido */
    room.capacidade ?? null,
    room.idBlock ?? null,
    room.bloco ?? null,
    room.codigo ?? null,
    room.descricao ?? null,
  ];
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
