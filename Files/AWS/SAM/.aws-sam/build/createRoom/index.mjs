import { defaultCreate } from "/opt/db.js";

const createItemQuery =
  "INSERT INTO `salas` (`capacidade`, `idBlock`, `bloco`, `codigo`, `descricao`) VALUES (?, ?, ?, ?, ?)";

const itemName = "Room";
let local = `aws>lambda>Create>${itemName}>handler`;
const isDebugging = false;

function convertToList(room) {
  isDebugging && console.log(local, room);
  /* Vai ser nulo se algum item não for definido */
  const values = [
    room?.capacidade ?? null,
    room?.idBlock ?? null,
    room?.bloco ?? null,
    room?.codigo ?? null,
    room?.descricao ?? null,
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
