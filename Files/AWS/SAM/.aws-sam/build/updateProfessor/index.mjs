import { defaultUpdate, checkExistance } from "/opt/db.js";

const updateItemQuery =
  "UPDATE `professores` SET `apelido` = ?, `curso` = ?, `laboratorio` = ?, `nome` = ? WHERE `id` = ?";
const checkQuery = "SELECT * FROM `professores` WHERE `id` = ?";
const itemName = "Professor";
let local = `aws>lambda>Update>${itemName}>handler`;
const isDebugging = false;

async function handler(event) {
  isDebugging && console.log(local + ">{event: ", event, "}");
  // For some reason the event payload for Create is built different.
  const newItem = event?.newItem ?? JSON.parse(event?.body)?.newItem;
  isDebugging && console.log(local + ">{itemToUpdate: ", newItem, "}");
  return await updateItem(newItem);
}

async function updateItem(itemToUpdate) {
  local += `>update${itemName}`;
  const itemList = convertToList(itemToUpdate);
  const exists = await checkExistance(checkQuery, [itemToUpdate.id]);
  return await defaultUpdate(updateItemQuery, itemList, exists);
}

function convertToList(professor) {
  /* Vai ser nulo se algum item não for definido */
  const values = [
    professor?.apelido ?? null,
    professor?.curso ?? null,
    professor?.laboratorio ?? null,
    professor?.nome ?? null,
    professor?.id ?? null,
  ];
  return values;
}

export { handler };
