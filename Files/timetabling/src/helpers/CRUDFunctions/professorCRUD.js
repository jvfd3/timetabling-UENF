import options from "../../DB/local/options";
import {
  defaultDBCreate,
  defaultDBRead,
  defaultDBUpdate,
  defaultDBDelete,
  defaultHandleError,
} from "../../DB/AWS/defaultAxiosFunctions";
import {
  keepOldItem,
  removeItemInListById,
  getItemIndexInListById,
  replaceNewItemInListById,
} from "../auxCRUD";

const itemName = "professor";

function createProfessor({
  professors,
  setProfessors,
  professor,
  setProfessor,
}) {
  function getNewProfessor(newId) {
    const emptyProfessor = options.emptyObjects.professor;
    const newProfessor = { ...emptyProfessor, id: newId };
    return newProfessor;
  }

  function insertNewProfessorFromDB(newId) {
    const newProfessor = getNewProfessor(newId);
    const newProfessors = [...professors, newProfessor];
    setProfessor(newProfessor);
    setProfessors(newProfessors);
  }

  defaultDBCreate(itemName, professor)
    .then(insertNewProfessorFromDB)
    .catch(defaultHandleError);
}

function readProfessor({ setProfessors, setProfessor, professor }) {
  function insertNewProfessorsFromDB(professoresFromDB) {
    const showedProfessor = keepOldItem(professor, professoresFromDB);
    setProfessor(showedProfessor);
    setProfessors(professoresFromDB);
  }

  defaultDBRead(itemName)
    .then(insertNewProfessorsFromDB)
    .catch(defaultHandleError);
}

function updateProfessor({ professors, setProfessors, professor }) {
  function updateProfessorOnList(newProfessor) {
    const updatedProfessors = replaceNewItemInListById(
      newProfessor,
      professors
    );
    // setProfessor(newProfessor);
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
  function deleteProfessorOnList(deletedProfessor) {
    if (deletedProfessor) {
      const updatedProfessorList = removeItemInListById(
        deletedProfessor,
        professors
      );

      const index = getItemIndexInListById(deletedProfessor, professors);
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
