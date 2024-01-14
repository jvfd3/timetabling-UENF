// professoresDelete->index.js
import { defaultDelete, dbExecute } from "/opt/db.js";

const itemName = "professor";
let local = `aws>lambda>${itemName}>Delete>handler`;

async function handler(event) {
  console.log(local + ">{event: ", event, "}");

  const idToDelete = event.pathParameters.id;
  return await deleteItem(idToDelete);
}

async function deleteItem(itemIdToDelete) {
  local += ">deleteItem";
  const deleteItemQuery = "DELETE FROM professores WHERE id = ?";

  const itemList = [itemIdToDelete];
  const exists = await checkExistance(itemList);
  return await defaultDelete(deleteItemQuery, itemList, exists);
}

async function checkExistance(idInList) {
  local += ">checkExistance";
  let message = local;
  const checkQuery = "SELECT * FROM professores WHERE id = ?";
  try {
    let queryResult = await dbExecute(checkQuery, idInList);
    const rows = queryResult[0] ?? [];
    return rows.length > 0;
  } catch (error) {
    message = `>Erro ao executar a {query: ${checkQuery}}`;
    console.error(message, error);
    return false;
  }
}

export { handler };
