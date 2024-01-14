// professoresCreate->index.js
import { defaultCreate } from "/opt/db.js";

const itemName = "professor";
let local = `aws>lambda>Create>${itemName}>handler`;

async function handler(event) {
  console.log(local + ">{event: ", event, "}");
  // For some reason the event payload for Create is built different.
  let newItem = event?.newItem ?? JSON.parse(event?.body)?.newItem;
  console.log(">>>", newItem, "<<<");
  return await createItem(newItem);
}

async function createItem(newItem) {
  local += `>create${itemName}`;
  const createItemQuery =
    "INSERT INTO professores(`apelido`, `curso`, `laboratorio`, `nome`) VALUES(?, ?, ?, ?)";
  const itemList = convertToList(newItem);
  const exists = true;
  return await defaultCreate(createItemQuery, itemList, exists);
}

function convertToList(professor) {
  console.log(professor);
  const values = [
    /* Vai ser nulo se algum item não for definido */
    professor?.apelido ?? null,
    professor?.curso ?? null,
    professor?.laboratorio ?? null,
    professor?.nome ?? null,
  ];
  console.log(">>>", values, "<<<");
  return values;
}

export { handler };
