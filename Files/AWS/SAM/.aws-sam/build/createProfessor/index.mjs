import { defaultCreate } from "/opt/db.js";

const createItemQuery =
  "INSERT INTO `professores`(`nome`, `apelido`, `curso`, `laboratorio`) VALUES(?, ?, ?, ?)";

const itemName = "Professor";
let local = `aws>lambda>Create>${itemName}>handler`;
const isDebugging = false;

function convertToList(professor) {
  isDebugging && console.log(local, professor);
  /* Vai ser nulo se algum item não for definido */
  const values = [
    professor?.nome ?? null,
    professor?.apelido ?? null,
    professor?.curso ?? null,
    professor?.laboratorio ?? null,
  ];
  isDebugging && console.log(local + ">{newValues: ", values, "}");
  return values;
}

async function handler(event) {
  isDebugging && console.log(local + ">{event: ", event, "}");
  // For some reason the event payload for Create is built different.
  const newItem = event?.newItem ?? JSON.parse(event?.body)?.newItem;
  isDebugging && console.log(local + ">{itemToUpdate: ", newItem, "}");
  return await createItem(newItem);
}

async function createItem(newItem) {
  local += `>create${itemName}`;
  const itemList = convertToList(newItem);
  const exists = true;
  return await defaultCreate(createItemQuery, itemList, exists);
}

export { handler };
