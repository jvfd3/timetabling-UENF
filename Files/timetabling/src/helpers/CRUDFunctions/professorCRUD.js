import {
  updateProfessores,
  deleteProfessores,
} from "../../DB/AWS/axiosConnection";
import {
  defaultDBCreate,
  defaultDBRead,
} from "../../DB/AWS/defaultAxiosFunctions";

function handleError(error) {
  console.error("Default error handling", error);
}

function createProfessor({
  professors,
  setProfessors,
  professor,
  setProfessor,
}) {
  function insertNewProfessorFromDB(newId) {
    let newProfessor = { ...professor, id: newId };
    setProfessor(newProfessor);
    setProfessors([...professors, newProfessor]);
  }
  defaultDBCreate("professores", professor)
    .then(insertNewProfessorFromDB)
    .catch(handleError);
}

function readProfessor({ setProfessors, setProfessor }) {
  function insertNewProfessorsFromDB(professoresFromDB) {
    setProfessors(professoresFromDB);
    let lastProfessor = professoresFromDB[professoresFromDB.length - 1];
    setProfessor(lastProfessor);
  }

  defaultDBRead("professores")
    .then(insertNewProfessorsFromDB)
    .catch(handleError);
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

function updateProfessor(professorStates) {
  console.log("updateProfessor", professorStates.professor.id);
  safeUpdateProfessores(professorStates);
}

function deleteProfessor(professorStates) {
  console.log("deleteProfessor", professorStates.professor.id);
  safeDeleteProfessores(professorStates);
}

export { createProfessor, readProfessor, updateProfessor, deleteProfessor };
