import { defaultCreate } from "/opt/db.js";

const createItemQuery =
  "INSERT INTO disciplinas(`nome`, `apelido`, `periodo`, `codigo`) VALUES(?, ?, ?, ?)";
const itemName = "Subject";
let local = `aws>lambda>Create>${itemName}>handler`;
const isDebugging = false;

async function handler(event) {
  isDebugging && console.log(local + ">{event: ", event, "}");
  // For some reason the event payload for Create is built different.
  const newItem = event?.newItem ?? JSON.parse(event?.body)?.newItem;
  isDebugging && console.log(">>>", newItem, "<<<");
  return await createItem(newItem);
}

async function createItem(newItem) {
  local += `>create${itemName}`;
  const itemList = convertToList(newItem);
  const exists = true;
  return await defaultCreate(createItemQuery, itemList, exists);
}

function convertToList(subject) {
  isDebugging && console.log(subject);
  const values = [
    /* Vai ser nulo se algum item não for definido */
    subject?.nome ?? null,
    subject?.apelido ?? null,
    subject?.periodo ?? null,
    subject?.codigo ?? null,
  ];
  isDebugging && console.log(">>>", values, "<<<");
  return values;
}

export { handler };
