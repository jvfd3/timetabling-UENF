// professoresUpdate->index.js
import { dbExecute, getPayloadResponse } from "/opt/db.js";

const itemName = "professor";
let local = `aws>lambda>Update>${itemName}>handler`;

async function handler(event) {
  console.log(local + ">{event: ", event, "}");
  // For some reason the event payload for Create is built different.
  const newItem = event?.newItem ?? JSON.parse(event?.body)?.newItem;
  console.log(local + ">{itemToUpdate: ", newItem, "}");
  return await updateItem(newItem);
}

async function updateItem(itemToUpdate) {
  local += ">updateItem";
  const updateItemQuery =
    "UPDATE `professores` SET `apelido` = ?, `curso` = ?, `laboratorio` = ?, `nome` = ? WHERE `id` = ?";
  const itemList = convertToList(itemToUpdate);
  console.log(">{itemList: ", itemList, "}");
  const exists = await checkExistance([itemToUpdate.id]);
  console.log(">{exists: ", exists, "}");
  return await defaultUpdate(updateItemQuery, itemList, exists);
}

function convertToList(professor) {
  const values = [
    /* Vai ser nulo se algum item não for definido */
    professor.apelido ?? null,
    professor?.curso ?? null,
    professor?.laboratorio ?? null,
    professor?.nome ?? null,
    professor?.id ?? null,
  ];
  return values;
}

async function checkExistance(idInList) {
  local += ">checkExistance";
  let message = local;
  const checkQuery = "SELECT * FROM `professores` WHERE `id` = ?";
  try {
    console.log(">{checkQuery: ", idInList, "}");
    const queryResult = await dbExecute(checkQuery, idInList);
    console.log(">{queryResult: ", queryResult[0], "}");
    const rows = queryResult[0] ?? [];
    return rows.length > 0;
  } catch (error) {
    message = `>Erro ao executar a {query: ${checkQuery}}`;
    console.error(message, error);
    return false;
  }
}

async function defaultUpdate(query, queryValues, exists) {
  const action = "UPDAT";
  local += `>default${action}E`;
  let message = local;
  const notFoundMessage =
    local + `>Exists?>Not found item with id ${queryValues[4]}.`;
  const successMessage =
    local +
    `>Item ${action}ED successfully: Item with id ${queryValues[4]} now has the values: ${queryValues}.`;
  const errorMessage = local + `>Error while ${action}ING`;
  let queryResult = null;
  let localError = null;
  let statusCode = 404;
  if (!exists) {
    message = notFoundMessage;
  } else {
    try {
      queryResult = await dbExecute(query, queryValues);
      queryResult[1] = null; // remove excessive metadata
      message = successMessage;
      statusCode = 200;
      console.log(message, statusCode, queryResult);
    } catch (error) {
      statusCode = 500;
      localError = error;
      message = errorMessage;
      console.error(message, statusCode, error);
    }
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
