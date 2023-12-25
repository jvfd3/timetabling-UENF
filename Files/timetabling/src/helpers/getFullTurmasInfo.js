import { allLocalJsonData } from "../DB/local/dataFromJSON";

function getTurmas() {
  let turmas = allLocalJsonData.SQL.turmas;
  return turmas;
}

export { getTurmas };