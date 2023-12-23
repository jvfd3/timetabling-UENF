import {
  createProfessores,
  readProfessores,
  updateProfessores,
  deleteProfessores,
} from "./axiosConnection";

function safeCreateProfessores(professorStates) {
  const { professores, setProfessores, professor, setProfessor } =
    professorStates;
  createProfessores(professor)
    .then((newId) => {
      if (newId) {
        let newProfessor = { ...professor, idprofessor: newId };
        setProfessor(newProfessor);
        setProfessores([...professores, newProfessor]);
      }
    })
    .catch((error) => console.error(error));
}

function safeReadProfessores(professorStates) {
  const { /* professores, */ setProfessores, /* professor, */ setProfessor } =
    professorStates;
  readProfessores()
    .then((professoresFromDB) => {
      setProfessores(professoresFromDB);
      setProfessor(professoresFromDB[professoresFromDB.length - 1]);
    })
    .catch((error) => console.error(error));
}

function safeUpdateProfessores(professorStates) {
  const { professores, setProfessores, professor /* , setProfessor */ } =
    professorStates;
  function updateProfessorFromList(oldArray, newProfessor) {
    const newArray = oldArray.map((professorAntigo) => {
      return professorAntigo.idprofessor === newProfessor.idprofessor
        ? newProfessor
        : professorAntigo;
    });
    return newArray;
  }
  updateProfessores(professor)
    .then((newProfessor) => {
      setProfessores(updateProfessorFromList(professores, newProfessor));
    })
    .catch((error) => {
      console.error(error);
    });
}

function safeDeleteProfessores(professorStates) {
  const { professores, setProfessores, professor, setProfessor } =
    professorStates;
  function deleteProfessorFromList(oldArray, deletedProfessor) {
    const newArray = oldArray.filter(
      (oldProfessor) =>
        oldProfessor.idprofessor !== deletedProfessor.idprofessor
    );
    return newArray;
  }
  deleteProfessores(professor)
    .then((deletedProfessor) => {
      if (deletedProfessor) {
        let deletedProfessorList = deleteProfessorFromList(
          professores,
          deletedProfessor
        );

        setProfessores(deletedProfessorList);
        const index = professores.findIndex(
          (p) => p.idprofessor === deletedProfessor.idprofessor
        );
        if (index > 0) {
          setProfessor(deletedProfessorList[index - 1]); // continua do anterior
        } else if (deletedProfessorList.length > 0) {
          setProfessor(deletedProfessorList[0]); // Se estou apagando o primeiro e ainda tem mais...
        } else {
          setProfessor(null);
          console.error(
            "Uai, não tem mais professores! Como diria o Silvio Santos: 'Está certo disto?'"
          );
        }
      }
    })
    .catch((error) => console.error("internDelete>", error));
}

export {
  safeCreateProfessores,
  safeReadProfessores,
  safeUpdateProfessores,
  safeDeleteProfessores,
};
