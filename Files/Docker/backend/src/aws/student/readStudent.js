import { defaultRead } from "../dbConnection.js";

const itemName = "Student";
let readItemsQuery = "SELECT * FROM alunos";

let local = `aws>lambda>Read>${itemName}>handler`;
const isDebugging = false;

async function readStudent(event) {
  isDebugging && console.log(local + ">{event: ", event, "}");

  console.log("BACKEND");
  const promessa = await readItems();
  console.log("promessa que sai: ", promessa);
  console.log("saindo do BE");

  return promessa;
}

async function readItems() {
  local += `>read${itemName}`;
  const itemList = null;
  const exists = true;
  const promessa = await defaultRead(readItemsQuery, itemList, exists);

  return promessa;
}
export { readStudent };
