import { defaultRead } from "../dbConnection.js";

const readItemsQuery = "SELECT * FROM professores";

const itemName = "Professor";
let local = `aws>lambda>Read>${itemName}>handler`;
const isDebugging = false;

async function readProfessor(event) {
  isDebugging && console.log(local + ">{event: ", event, "}");

  return await readItems();
}

async function readItems() {
  local += `>read${itemName}`;
  const itemList = null;
  const exists = true;
  return await defaultRead(readItemsQuery, itemList, exists);
}

export { readProfessor };
