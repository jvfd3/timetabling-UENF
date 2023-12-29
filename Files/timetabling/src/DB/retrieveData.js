import {
  getFullHorarios,
  splittedToUnified2,
  getTurmasDoAnoSemestre,
  splittedToUnified,
} from "../helpers/auxFunctions";

// import { readTurmas } from "../../../DB/AWS/axiosConnection";

function processRawData(rawData) {
  let unifiedHorarios = splittedToUnified2(rawData);
  // let turmasFiltradas = getTurmasDoAnoSemestre(unifiedTurmas, ano, semestre);
  return unifiedHorarios;
}

function getTurmasData(setTurmas) {
  let nodeEnv = process.env.NODE_ENV;
  let readyForDB = false;
  if (nodeEnv !== "development" && readyForDB) {
    readTurmas().then((dbTurmas) => {
      let unified = processRawData(dbTurmas);
      setTurmas(unified);
      return unified;
    });
  }
  let localTurmas = getFullHorarios();
  let unified = processRawData(localTurmas);
  // setTurmas(unified);
  return unified;
}

export { getTurmasData };
