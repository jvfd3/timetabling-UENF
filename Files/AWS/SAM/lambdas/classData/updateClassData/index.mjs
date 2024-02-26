import { defaultUpdate, checkExistance } from "/opt/db.js";

const updateItemQuery =
  "UPDATE `turmas` SET  `ano` = ?, `semestre` = ?, `idDisciplina` = ?, `idProfessor` = ?, `demandaEstimada` = ?, `description` = ? WHERE `id` = ?";

const checkQuery = "SELECT * FROM `turmas` WHERE `id` = ?";
const itemName = "ClassData";
let local = `aws>lambda>Update>${itemName}>handler`;
const isDebugging = false;

function convertToList(classData) {
  isDebugging && console.log(local, classData);
  /* Vai ser nulo se algum item não for definido */
  const values = [
    classItem?.year ?? classData?.ano ?? null,
    classItem?.semester ?? classData?.semestre ?? null,
    classItem?.idSubject ??
      classItem?.subject?.id ??
      classData?.idDisciplina ??
      classData?.disciplina?.id ??
      null,
    classItem?.idProfessor ?? classItem?.professor?.id ?? null,
    classItem?.expectedDemand ?? classData?.demandaEstimada ?? null,
    classData?.description ?? null,
    classData?.id ?? null,
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
