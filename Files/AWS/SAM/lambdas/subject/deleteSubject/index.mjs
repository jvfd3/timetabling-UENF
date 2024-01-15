import { defaultDelete, checkExistance } from "/opt/db.js";

const deleteItemQuery = "DELETE FROM `disciplinas` WHERE `id` = ?";
const checkQuery = "SELECT * FROM `disciplinas` WHERE `id` = ?";
const itemName = "Subject";
let local = `aws>lambda>Delete>${itemName}>handler`;
const isDebugging = false;

async function handler(event) {
  isDebugging && console.log(local + ">{event: ", event, "}");

  const idToDelete = event.pathParameters.id;
  return await deleteItem(idToDelete);
}

async function deleteItem(itemIdToDelete) {
  local += ">deleteItem";
  const itemList = [itemIdToDelete];
  const exists = await checkExistance(checkQuery, itemList);
  return await defaultDelete(deleteItemQuery, itemList, exists);
}

export { handler };
