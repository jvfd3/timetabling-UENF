import { defaultDelete, checkExistance } from "../dbConnection.js";

const deleteItemQuery = "DELETE FROM `horarios` WHERE `id` = ?";
const checkQuery = "SELECT * FROM `horarios` WHERE `id` = ?";
const itemName = "ClassData";
let local = `aws>lambda>Delete>${itemName}>handler`;
const isDebugging = false;

async function deleteClassTime(event) {
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

export { deleteClassTime };
