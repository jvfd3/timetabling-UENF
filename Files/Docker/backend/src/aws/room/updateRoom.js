import { defaultUpdate, checkExistance } from "../dbConnection.js";

const updateItemQuery =
  "UPDATE `salas` SET  `capacidade` = ?, `idBlock` = ?, `bloco` = ?, `codigo` = ?, `descricao` = ? WHERE `id` = ?";
const checkQuery = "SELECT * FROM `salas` WHERE `id` = ?";
const itemName = "Room";
let local = `aws>lambda>Update>${itemName}>handler`;
const isDebugging = false;

function convertToList(room) {
  isDebugging && console.log(local, room);
  /* Vai ser nulo se algum item não for definido */
  const values = [
    room?.capacity ?? room?.capacidade ?? null,
    room?.idBlock ?? room?.idBlock ?? null,
    room?.block ?? room?.bloco ?? null,
    room?.code ?? room?.codigo ?? null,
    room?.description ?? room?.descricao ?? null,
    room?.id ?? null,
  ];
  isDebugging && console.log(local + ">{newValues: ", values, "}");
  return values;
}

async function updateRoom(req, res) {
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

export { updateRoom };
