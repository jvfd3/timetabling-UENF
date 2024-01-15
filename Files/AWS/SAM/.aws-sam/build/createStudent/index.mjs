import { defaultCreate } from "/opt/db.js";

const createItemQuery =
  "INSERT INTO alunos(`anoEntrada`, `curso`, `matricula`, `nome`) VALUES(?, ?, ?, ?)";

const itemName = "Student";
let local = `aws>lambda>Create>${itemName}>handler`;
const isDebugging = false;

function convertToList(student) {
  isDebugging && console.log(local, student);
  /* Vai ser nulo se algum item não for definido */
  const values = [
    student?.anoEntrada ?? null,
    student?.curso ?? null,
    student?.matricula ?? null,
    student?.nome ?? null,
  ];
  isDebugging && console.log(local + ">{newValues: ", values, "}");
  return values;
}

async function handler(event) {
  isDebugging && console.log(local + ">{event: ", event, "}");
  // For some reason the event payload for Create is built different.
  const newItem = event?.newItem ?? JSON.parse(event?.body)?.newItem;
  isDebugging && console.log(local + ">{newItem: ", newItem, "}");
  return await createItem(newItem);
}

async function createItem(newItem) {
  local += `>create${itemName}`;
  const itemList = convertToList(newItem);
  const exists = true;
  return await defaultCreate(createItemQuery, itemList, exists);
}

export { handler };
