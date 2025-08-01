import { defaultDelete, checkExistance } from "../dbConnection.js";

const deleteItemQuery = "DELETE FROM `salas` WHERE `id` = ?";
const checkQuery = "SELECT * FROM `salas` WHERE `id` = ?";
const itemName = "Room";
let local = `aws>lambda>Delete>${itemName}>handler`;
const isDebugging = false;

async function deleteRoom(req, res) {
  // isDebugging && console.log(local + ">{event: ", event, "}");

  const idToDelete = event.pathParameters.id;
  return await deleteItem(idToDelete);
}

async function deleteItem(itemIdToDelete) {
  local += ">deleteItem";
  const itemList = [itemIdToDelete];
  const exists = await checkExistance(checkQuery, itemList);
  return await defaultDelete(deleteItemQuery, itemList, exists);
}

export { deleteRoom };
