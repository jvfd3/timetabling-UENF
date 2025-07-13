import { defaultRead } from "../dbConnection.js";

const readItemsQuery = "SELECT * FROM disciplinas";
const itemName = "Subject";
let local = `aws>lambda>Read>${itemName}>handler`;
const isDebugging = false;

async function readSubject(req, res) {
  isDebugging && console.log(local + ">{event: ", req, "}");
  const payload = await readItems();
  res.status(payload.statusCode).json(payload);
}

async function readItems() {
  local += `>read${itemName}`;
  const itemList = null;
  const exists = true;
  return await defaultRead(readItemsQuery, itemList, exists);
}

export { readSubject };
