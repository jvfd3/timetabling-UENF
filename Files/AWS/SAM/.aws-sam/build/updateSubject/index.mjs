import { defaultUpdate, checkExistance } from "/opt/db.js";

const updateItemQuery =
  "UPDATE `disciplinas` SET `periodo` = ?, `codigo` = ?, `apelido` = ?, `nome` = ? WHERE `id` = ?";
const checkQuery = "SELECT * FROM `disciplinas` WHERE `id` = ?";
const itemName = "Subject";
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

function convertToList(subject) {
  /* Vai ser nulo se algum item não for definido */
  const values = [
    subject?.periodo ?? null,
    subject?.codigo ?? null,
    subject?.apelido ?? null,
    subject?.nome ?? null,
    subject?.id ?? null,
  ];
  return values;
}

export { handler };
