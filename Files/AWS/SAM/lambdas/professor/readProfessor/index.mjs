// professoresRead->index.js
import { defaultRead } from "/opt/db.js";

const itemName = "professor";
let local = `aws>lambda>Read>${itemName}>handler`;

async function handler(event) {
  console.log(local + ">{event: ", event, "}");

  return await readItem();
}

async function readItem() {
  local += `>read${itemName}`;
  const readItemQuery = "SELECT * FROM professores";
  const itemList = null;
  const exists = true;
  return await defaultRead(readItemQuery, itemList, exists);
}

export { handler };
