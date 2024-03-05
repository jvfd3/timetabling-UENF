import { defaultCreate } from "/opt/db.js";

const createItemQuery =
  "INSERT INTO `turmas` (`ano`, `semestre`, `idDisciplina`, `idProfessor`, `demandaEstimada`,`description`) VALUES (?, ?, ?, ?, ?, ?)";

const itemName = "classItem";
let local = `aws>lambda>Create>${itemName}>handler`;
const isDebugging = false;

function convertToList(classItem) {
  isDebugging && console.log(local, classItem);
  /* Vai ser nulo se algum item não for definido */
  const values = [
    classItem?.year ?? classItem?.ano ?? null,
    classItem?.semester ?? classItem?.semestre ?? null,
    classItem?.idSubject ??
      classItem?.subject?.id ??
      classItem?.idDisciplina ??
      classItem?.disciplina?.id ??
      null,
    classItem?.idProfessor ?? classItem?.professor?.id ?? null,
    classItem?.expectedDemand ?? classItem?.demandaEstimada ?? null,
    classItem?.description ?? null,
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
