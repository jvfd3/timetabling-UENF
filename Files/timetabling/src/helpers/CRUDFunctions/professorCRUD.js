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
      const deletedProfessorList = deleteProfessorFromList(
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
  }

  defaultDBDelete(itemName, professor)
    .then(deleteProfessorOnList)
    .catch(defaultHandleError);
}

export { createProfessor, readProfessor, updateProfessor, deleteProfessor };
