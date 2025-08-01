import { defaultDelete, checkExistance } from "../dbConnection.js";

const deleteItemQuery = "DELETE FROM `alunos` WHERE `id` = ?";

const checkQuery = "SELECT * FROM `alunos` WHERE `id` = ?";
const itemName = "Student";
let local = `aws>lambda>Delete>${itemName}>handler`;
const isDebugging = false;

async function deleteStudent(req, res) {
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

export { deleteStudent };
