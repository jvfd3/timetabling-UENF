import { defaultUpdate, checkExistance } from "/opt/db.js";

const updateItemQuery =
  "UPDATE `disciplinas` SET `nome` = ?, `apelido` = ?, `periodo` = ?, `codigo` = ? WHERE `id` = ?";
const checkQuery = "SELECT * FROM `disciplinas` WHERE `id` = ?";
const itemName = "Subject";
let local = `aws>lambda>Update>${itemName}>handler`;
const isDebugging = false;

function convertToList(subject) {
  isDebugging && console.log(local, subject);
  /* Vai ser nulo se algum item não for definido */
  const values = [
    subject?.name ?? subject?.nome ?? null,
    subject?.alias ?? subject?.apelido ?? null,
    subject?.expectedSemester ?? subject?.periodo ?? null,
    subject?.code ?? subject?.codigo ?? null,
    subject?.id ?? null,
  ];
  isDebugging && console.log(local + ">{newValues: ", values, "}");
  return values;
}

async function handler(req, res) {
  isDebugging && console.log(local + ">{event: ", event, "}");
  // For some reason the event payload for Create is built different.
  const newItem = req?.newItem ?? JSON.parse(req?.body)?.newItem;
  isDebugging && console.log(local + ">{itemToUpdate: ", newItem, "}");
  return await updateItem(newItem);
}

async function updateItem(itemToUpdate) {
  local += `>update${itemName}`;
  const itemList = convertToList(itemToUpdate);
  const exists = await checkExistance(checkQuery, [itemToUpdate.id]);
  return await defaultUpdate(updateItemQuery, itemList, exists);
}

export { handler };
