import { defaultRead } from "/opt/db.js";

const itemName = "Student";
let readItemsQuery = "SELECT * FROM alunos";

let local = `aws>lambda>Read>${itemName}>handler`;
const isDebugging = false;

async function handler(event) {
  isDebugging && console.log(local + ">{event: ", event, "}");

  return await readItems();
}

async function readItems() {
  local += `>read${itemName}`;
  const itemList = null;
  const exists = true;
  return await defaultRead(readItemsQuery, itemList, exists);
}
export { handler };
