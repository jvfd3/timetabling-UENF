import { defaultUpdate, checkExistance } from "../dbConnection.js";

const updateItemQuery =
  "UPDATE `alunos` SET  `nome` = ?, `curso` = ?, `anoEntrada` = ?, `matricula` = ? WHERE `id` = ?";
const checkQuery = "SELECT * FROM `alunos` WHERE `id` = ?";

const itemName = "Student";
let local = `aws>lambda>Update>${itemName}>handler`;
const isDebugging = false;

function convertToList(student) {
  isDebugging && console.log(local, student);
  /* Vai ser nulo se algum item não for definido */
  const values = [
    student?.name ?? student?.nome ?? null,
    student?.course ?? student?.curso ?? null,
    student?.entryYear ?? student?.anoEntrada ?? null,
    student?.enrollmentCode ?? student?.matricula ?? null,
    student?.id ?? null,
  ];
  isDebugging && console.log(local + ">{newValues: ", values, "}");
  return values;
}

async function updateStudent(req, res) {
  isDebugging && console.log(local + ">{req: ", req, "}");
  // For some reason the event payload for Create is built different.
  const newItem = req?.newItem ?? req?.body?.newItem;
  isDebugging && console.log(local + ">{itemToUpdate: ", newItem, "}");
  const payload = await updateItem(newItem);
  isDebugging && console.log(local + ">{payload final: ", payload, "}");
  res.status(payload?.statusCode).json(payload?.body);
}

async function updateItem(itemToUpdate) {
  local += `>update${itemName}`;
  const itemList = convertToList(itemToUpdate);
  const exists = await checkExistance(checkQuery, [itemToUpdate?.id]);
  return await defaultUpdate(updateItemQuery, itemList, exists);
}

export { updateStudent };
