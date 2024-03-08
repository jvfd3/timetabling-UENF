import emptyObjects from "../../config/emptyObjects";
import {
  defaultDBCreate,
  defaultDBRead,
  defaultDBUpdate,
  defaultDBDelete,
  defaultHandleError,
} from "../../DB/defaultAxiosFunctions";
import {
  refreshShownItem,
  removeItemInListById,
  replaceNewItemInListById,
} from "../auxCRUD";

const itemName = "professor";

function createProfessor({
  professors,
  setProfessors,
  professor,
  setProfessor,
}) {
  const emptyProfessor = emptyObjects.professor;

  function getNewProfessor(newId) {
    const newProfessor = { ...emptyProfessor, id: newId };
    return newProfessor;
  }

  function insertNewProfessorFromDB(newId) {
    const newProfessor = getNewProfessor(newId);
    setProfessor(newProfessor);
    setProfessors((oldProfessors) => [...oldProfessors, newProfessor]);
  }

  defaultDBCreate(itemName, emptyProfessor)
    .then(insertNewProfessorFromDB)
    .catch(defaultHandleError);
}

function readProfessor({ professors, setProfessors, setProfessor, professor }) {
  function insertNewProfessorsFromDB(professoresFromDB) {
    setProfessors(professoresFromDB);

    const showedProfessor = refreshShownItem(
      professor,
      professors,
      professoresFromDB
    );
    setProfessor(showedProfessor);
  }

  defaultDBRead(itemName)
    .then(insertNewProfessorsFromDB)
    .catch(defaultHandleError);
}

function updateProfessor({ professors, setProfessors, professor }) {
  function updateProfessorOnList(newProfessor) {
    // setProfessor(newProfessor);
    setProfessors((oldProfessors) => {
      const updatedProfessors = replaceNewItemInListById(
        newProfessor,
        oldProfessors
      );
      return updatedProfessors;
    });
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
      setProfessors((oldProfessors) => {
        const updatedProfessorList = removeItemInListById(
          deletedProfessor,
          oldProfessors
        );
        return updatedProfessorList;
      });

      const updatedProfessorList = removeItemInListById(
        deletedProfessor,
        professors
      );
      const newProfessor = refreshShownItem(
        professor,
        professors,
        updatedProfessorList
      );
      setProfessor(newProfessor);
    }
  }

  defaultDBDelete(itemName, professor)
    .then(deleteProfessorOnList)
    .catch(defaultHandleError);
}

export { createProfessor, readProfessor, updateProfessor, deleteProfessor };
