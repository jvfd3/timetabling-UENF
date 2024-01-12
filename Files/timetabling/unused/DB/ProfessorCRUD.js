import {
  createProfessores,
  // readProfessores,
  updateProfessores,
  deleteProfessores,
} from "../../DB/AWS/axiosConnection";

function safeReadProfessores(professorStates) {
  const { setProfessors, setProfessor } = professorStates;
  readProfessores()
    .then((professoresFromDB) => {
      // console.log("professoresFromDB", professoresFromDB);
      setProfessors(professoresFromDB);
      let lastProfessor = professoresFromDB[professoresFromDB.length - 1];
      // console.log("lastProfessor", lastProfessor);
      setProfessor(lastProfessor);
    })
    .catch((error) => console.error(error));
}
