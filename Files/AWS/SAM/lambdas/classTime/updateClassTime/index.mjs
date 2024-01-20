import { defaultUpdate, checkExistance } from "/opt/db.js";

const updateItemQuery =
  "UPDATE `horarios` SET `dia` = ?, `horaInicio` = ?, `duracao` = ?, `ordem` = ?, `idTurma` = ?, `idSala` = ? WHERE `id` = ?";
const checkQuery = "SELECT * FROM `horarios` WHERE `id` = ?";
const itemName = "ClassData";
let local = `aws>lambda>Update>${itemName}>handler`;
const isDebugging = false;

function convertToList(classTime) {
  isDebugging && console.log(local, classTime);
  /* Vai ser nulo se algum item não for definido */
  const values = [
    classTime?.dia ?? null,
    classTime?.horaInicio ?? null,
    classTime?.duracao ?? null,
    classTime?.ordem ?? null,
    classTime?.idTurma ?? null,
    classTime?.sala?.id ?? classTime?.idSala ?? null,
    classTime?.id ?? null,
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
