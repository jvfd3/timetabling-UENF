import {
  createProfessores,
  readProfessores,
  updateProfessores,
  deleteProfessores,
} from "../../DB/AWS/axiosConnection";

function safeCreateProfessores(professorStates) {
  const { professors, setProfessors, professor, setProfessor } =
    professorStates;
  console.log("professor", professor);
  createProfessores(professor)
    .then((newId) => {
      if (newId) {
        let newProfessor = { ...professor, id: newId };
        setProfessor(newProfessor);
        setProfessors([...professors, newProfessor]);
      }
    })
    .catch((error) => console.error(error));
}

function safeReadProfessores(professorStates) {
  const { /* professores, */ setProfessors, /* professor, */ setProfessor } =
    professorStates;
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

function safeUpdateProfessores(professorStates) {
  const { professors, setProfessors, professor /* , setProfessor */ } =
    professorStates;
  function updateProfessorFromList(oldArray, newProfessor) {
    const newArray = oldArray.map((professorAntigo) => {
      return professorAntigo.id === newProfessor.id
        ? newProfessor
        : professorAntigo;
    });
    return newArray;
  }
  updateProfessores(professor)
    .then((newProfessor) => {
      // console.log("professores", professores[professores.length - 2]);
      const updatedProfessores = updateProfessorFromList(
        professors,
        newProfessor
      );
      // console.log(
      //   "updatedProfessores",
      //   updatedProfessores[updatedProfessores.length - 2]
      // );
      setProfessors(updatedProfessores);
    })
    .catch((error) => {
      console.error(error);
    });
}

function safeDeleteProfessores(professorStates) {
  const { professors, setProfessors, professor, setProfessor } =
    professorStates;
  function deleteProfessorFromList(oldArray, deletedProfessor) {
    const newArray = oldArray.filter((oldProfessor) => {
      let oldId = oldProfessor.id;
      let idToDelete = deletedProfessor.id;
      return oldId !== idToDelete;
    });
    return newArray;
  }
  deleteProfessores(professor)
    .then((deletedProfessor) => {
      if (deletedProfessor) {
        let deletedProfessorList = deleteProfessorFromList(
          professors,
          deletedProfessor
        );

        setProfessors(deletedProfessorList);
        const index = professors.findIndex((p) => p.id === deletedProfessor.id);
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

function createProfessor(professorStates) {
  console.log("createProfessor", professorStates.professor.id);
  safeCreateProfessores(professorStates);
}

function readProfessor(professorStates) {
  console.log("readProfessor", professorStates.professor.id);
  safeReadProfessores(professorStates);
}

function updateProfessor(professorStates) {
  console.log("updateProfessor", professorStates.professor.id);
  safeUpdateProfessores(professorStates);
}

function deleteProfessor(professorStates) {
  console.log("deleteProfessor", professorStates.professor.id);
  safeDeleteProfessores(professorStates);
}

export { createProfessor, readProfessor, updateProfessor, deleteProfessor };
