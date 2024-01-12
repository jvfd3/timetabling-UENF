import {
  defaultDBCreate,
  defaultDBRead,
  defaultDBUpdate,
  defaultDBDelete,
  defaultHandleError,
} from "../../DB/AWS/defaultAxiosFunctions";

const itemName = "professores";

function createProfessor({
  professors,
  setProfessors,
  professor,
  setProfessor,
}) {
  function insertNewProfessorFromDB(newId) {
    const newProfessor = { ...professor, id: newId };
    setProfessor(newProfessor);
    setProfessors([...professors, newProfessor]);
  }
  defaultDBCreate(itemName, professor)
    .then(insertNewProfessorFromDB)
    .catch(defaultHandleError);
}

function readProfessor({ setProfessors, setProfessor }) {
  function insertNewProfessorsFromDB(professoresFromDB) {
    const lastProfessor = professoresFromDB[professoresFromDB.length - 1];
    setProfessor(lastProfessor);
    setProfessors(professoresFromDB);
  }

  defaultDBRead(itemName)
    .then(insertNewProfessorsFromDB)
    .catch(defaultHandleError);
}

function updateProfessor({ professors, setProfessors, professor }) {
  function updateProfessorFromList(oldArray, newProfessor) {
    const newArray = oldArray.map((oldProfessor) => {
      const hasSameId = oldProfessor.id === newProfessor.id;
      return hasSameId ? newProfessor : oldProfessor;
    });
    return newArray;
  }

  function updateProfessorOnList(newProfessor) {
    const updatedProfessors = updateProfessorFromList(professors, newProfessor);
    setProfessors(updatedProfessors);
  }

  defaultDBUpdate(itemName, professor)
    .then(updateProfessorOnList)
    .catch(defaultHandleError);
}

function deleteProfessor({
  professors,
  setProfessors,
  professor,
  setProfessor,
}) {
  function deleteProfessorFromList(oldArray, deletedProfessor) {
    const newArray = oldArray.filter((oldProfessor) => {
      const oldId = oldProfessor.id;
      const idToDelete = deletedProfessor.id;
      return oldId !== idToDelete;
    });
    return newArray;
  }

  function deleteProfessorOnList(deletedProfessor) {
    if (deletedProfessor) {
      const updatedProfessorList = deleteProfessorFromList(
        professors,
        deletedProfessor
      );

      const index = professors.findIndex((p) => p.id === deletedProfessor.id);
      let newProfessor = null;
      if (index > 0) {
        newProfessor = updatedProfessorList[index - 1]; // continua do anterior
      } else if (updatedProfessorList.length > 0) {
        newProfessor = updatedProfessorList[0];
        // Se estou apagando o primeiro e ainda tem mais...
      } else {
        console.error(
          "Uai, não tem mais professores! Como diria o Silvio Santos: 'Está certo disto?'"
        );
      }

      setProfessor(newProfessor);
      setProfessors(updatedProfessorList);
    }
  }

  defaultDBDelete(itemName, professor)
    .then(deleteProfessorOnList)
    .catch(defaultHandleError);
}

export { createProfessor, readProfessor, updateProfessor, deleteProfessor };
