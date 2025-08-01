import { defaultDelete, checkExistance } from "../dbConnection.js";

const deleteItemQuery = "DELETE FROM `professores` WHERE `id` = ?";
const checkQuery = "SELECT * FROM `professores` WHERE `id` = ?";
const itemName = "Professor";
let local = `aws>lambda>Delete>${itemName}>handler`;
const isDebugging = false;

async function deleteProfessor(req, res) {
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

export { deleteProfessor };
