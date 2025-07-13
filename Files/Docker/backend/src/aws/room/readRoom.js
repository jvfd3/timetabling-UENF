import { defaultRead } from "../dbConnection.js";

const readItemsQuery = "SELECT * FROM `salas`";
const itemName = "Room";
let local = `aws>lambda>Read>${itemName}>handler>`;
const isDebugging = false;

async function readRoom(req, res) {
  // isDebugging && console.log(local + ">{event: ", event, "}");
  // isDebugging && console.log(local + ">{req: ", req, "}");
  const payload = await readItems();
  // isDebugging && console.log(local + payload.statusCode);
  // payload.body = payload;
  // const parsedPayload = JSON.parse(payload);
  isDebugging && console.log(local + ">{payload: ", payload, "}");

  res.status(payload.statusCode).json(payload);
  // isDebugging && console.log(local + ">{payload: ", payload, "}");
  // return await readItems();
}

async function readItems() {
  local += `read${itemName}>`;
  const itemList = null;
  const exists = true;
  return await defaultRead(readItemsQuery, itemList, exists);
}

export { readRoom };
