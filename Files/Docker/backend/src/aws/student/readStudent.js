import { defaultRead } from "../dbConnection.js";

const itemName = "Student";
let readItemsQuery = "SELECT * FROM alunos";
let local = `aws>lambda>Read>${itemName}>handler`;
const isDebugging = false;

// async function readStudent(req, res) {
// isDebugging && console.log(local + ">{event: ", event, "}");
// console.log("promessa que sai: ", promessa);
// return promessa;
async function readStudent(req, res) {
  // isDebugging && console.log(local + ">{req: ", req, "}");

  isDebugging && console.log("BACKEND");
  const payload = await readItems();
  isDebugging && console.log(local + ">{payload: ", payload, "}");
  isDebugging && console.log("Pre response");
  res.status(payload.statusCode).json(payload);
  isDebugging && console.log("saindo do BE");
}

async function readItems() {
  local += `>read${itemName}`;
  const itemList = null;
  const exists = true;
  const payload = await defaultRead(readItemsQuery, itemList, exists);
  return payload;
}
export { readStudent };
