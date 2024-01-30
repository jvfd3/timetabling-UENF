import {
  getFullHorarios,
  splittedToUnified2,
  getTurmasDoAnoSemestre,
  splittedToUnified,
} from "../../src/helpers/auxFunctions";

// import { readTurmas } from "../../../DB/AWS/axiosConnection";

function processRawData(rawData) {
  let processedData = rawData;
  // processedData = splittedToUnified2(processedData);
  // let turmasFiltradas = getTurmasDoAnoSemestre(unifiedTurmas, ano, semestre);
  return processedData;
}

function getClassesData(setTurmas) {
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
  // console.log("localTurmas", localTurmas);
  let unified = processRawData(localTurmas);
  // setTurmas(unified);
  return unified;
}

export { getClassesData };
