import { defaultCreate } from "../dbConnection.js";

const createItemQuery =
  "INSERT INTO `professores`(`nome`, `apelido`, `curso`, `laboratorio`) VALUES(?, ?, ?, ?)";

const itemName = "Professor";
let local = `aws>lambda>Create>${itemName}>handler`;
const isDebugging = false;

function convertToList(professor) {
  isDebugging && console.log(local, professor);
  /* Vai ser nulo se algum item não for definido */
  const values = [
    professor?.name ?? professor?.nome ?? null,
    professor?.alias ?? professor?.apelido ?? null,
    professor?.course ?? professor?.curso ?? null,
    professor?.laboratory ?? professor?.laboratorio ?? null,
  ];
  isDebugging && console.log(local + ">{newValues: ", values, "}");
  return values;
}

async function createProfessor(event) {
  // isDebugging && console.log(local + ">{event: ", event, "}");
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

export { createProfessor };
