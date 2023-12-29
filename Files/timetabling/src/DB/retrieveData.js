/* import {
  getTurmasDoAnoSemestre,
  splittedToUnified,
} from "../helpers/auxFunctions";

// import { readTurmas } from "../../../DB/AWS/axiosConnection";

function getMainTurmas(setTurmas) {
  readTurmas().then((turmas) => {
    let allTurmas = turmas;
    let unifiedTurmas = splittedToUnified(allTurmas);
    let turmasFiltradas = getTurmasDoAnoSemestre(unifiedTurmas, ano, semestre);
    setTurmas(turmasFiltradas);
  });
}

export { getMainTurmas };
 */
