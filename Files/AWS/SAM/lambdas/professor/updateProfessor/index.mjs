import { defaultUpdate, checkExistance } from "/opt/db.js";

const updateItemQuery =
  "UPDATE `professores` SET  `nome` = ?, `apelido` = ?, `curso` = ?, `laboratorio` = ? WHERE `id` = ?";
const checkQuery = "SELECT * FROM `professores` WHERE `id` = ?";
const itemName = "Professor";
let local = `aws>lambda>Update>${itemName}>handler`;
const isDebugging = false;

function convertToList(professor) {
  isDebugging && console.log(local, professor);
  /* Vai ser nulo se algum item não for definido */
  const values = [
    professor?.name ?? professor?.nome ?? null,
    professor?.alias ?? professor?.apelido ?? null,
    professor?.course ?? professor?.curso ?? null,
    professor?.laboratory ?? professor?.laboratorio ?? null,
    professor?.id ?? null,
  ];
  isDebugging && console.log(local + ">{newValues: ", values, "}");
  return values;
}

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

export { handler };
