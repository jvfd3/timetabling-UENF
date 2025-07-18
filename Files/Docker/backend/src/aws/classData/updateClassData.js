import { defaultUpdate, checkExistance } from "../dbConnection.js";

const updateItemQuery =
  "UPDATE `turmas` SET  `ano` = ?, `semestre` = ?, `idDisciplina` = ?, `idProfessor` = ?, `demandaEstimada` = ?, `description` = ? WHERE `id` = ?";

const checkQuery = "SELECT * FROM `turmas` WHERE `id` = ?";
const itemName = "ClassData";
let local = `aws>lambda>Update>${itemName}>handler`;
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
    classItem?.id ?? null,
  ];
  isDebugging && console.log(local + ">{newValues: ", values, "}");
  return values;
}

async function updateClassData(req, res) {
  // isDebugging && console.log(local + ">{event: ", event, "}");
  // For some reason the event payload for Create is built different.
  const newItem = req?.newItem ?? req?.body?.newItem;
  isDebugging && console.log(local + ">{itemToUpdate: ", newItem, "}");
  const payload = await updateItem(newItem);
  isDebugging && console.log(local + ">{payload final: ", payload, "}");
  res.status(payload.statusCode).json(payload.body);
}

async function updateItem(itemToUpdate) {
  local += `>update${itemName}`;
  const itemList = convertToList(itemToUpdate);
  const exists = await checkExistance(checkQuery, [itemToUpdate.id]);
  return await defaultUpdate(updateItemQuery, itemList, exists);
}

export { updateClassData };
