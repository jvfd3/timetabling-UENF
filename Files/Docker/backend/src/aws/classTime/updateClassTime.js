import { defaultUpdate, checkExistance } from "../dbConnection.js";

const updateItemQuery =
  "UPDATE `horarios` SET `dia` = ?, `horaInicio` = ?, `duracao` = ?, `idTurma` = ?, `idSala` = ? WHERE `id` = ?";
const checkQuery = "SELECT * FROM `horarios` WHERE `id` = ?";
const itemName = "ClassData";
let local = `aws>lambda>Update>${itemName}>handler`;
const isDebugging = false;

function convertToList(classTime) {
  isDebugging && console.log(local, classTime);
  /* Vai ser nulo se algum item não for definido */
  const values = [
    classTime?.day ?? classTime?.dia ?? null,
    classTime?.startHour ?? classTime?.horaInicio ?? null,
    classTime?.duration ?? classTime?.duracao ?? null,
    classTime?.idClass ?? classTime?.idTurma ?? null,
    classTime?.idRoom ??
      classTime?.room?.id ??
      classTime?.sala?.id ??
      classTime?.idSala ??
      null,
    classTime?.id ?? null,
  ];
  isDebugging && console.log(local + ">{newValues: ", values, "}");
  return values;
}

async function updateClassTime(req, res) {
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

export { updateClassTime };
