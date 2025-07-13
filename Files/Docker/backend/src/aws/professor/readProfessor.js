import { defaultRead } from "../dbConnection.js";

const readItemsQuery = "SELECT * FROM professores";

const itemName = "Professor";
let local = `aws>lambda>Read>${itemName}>handler`;
const isDebugging = false;

async function readProfessor(req, res) {
  // isDebugging && console.log(local + ">{event: ", event, "}");
  const payload = await readItems();
  // isDebugging && console.log(local + ">{req: ", req, "}");
  isDebugging && console.log(local + payload);
  res.status(payload.statusCode).json(payload);
  // return payload;
}

async function readItems() {
  local += `>read${itemName}`;
  const itemList = null;
  const exists = true;
  return await defaultRead(readItemsQuery, itemList, exists);
}

export { readProfessor };
