import { sortProfessors } from "../../components/Sorts/sortingFunctions";
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

import configInfo from "../../config/configInfo";

const itemName = configInfo.endpoints.professor;

function createProfessor({ setProfessors, setProfessor }) {
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

function readProfessor({ professors, setProfessors, setProfessor }) {
  function insertNewProfessorsFromDB(professoresFromDB) {
    const defaultSortedProfessors = sortProfessors(professoresFromDB);
    setProfessors(defaultSortedProfessors);

    setProfessor((oldProfessor) => {
      const showedProfessor = refreshShownItem(
        oldProfessor,
        professors,
        defaultSortedProfessors
      );
      return showedProfessor;
    });
  }

  defaultDBRead(itemName)
    .then(insertNewProfessorsFromDB)
    .catch(defaultHandleError);
}

function updateProfessor({ setProfessors, professor }) {
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

function deleteProfessor({ setProfessors, professor, setProfessor }) {
  function deleteProfessorOnList(deletedProfessor) {
    if (deletedProfessor) {
      setProfessors((oldProfessors) => {
        const updatedProfessorList = removeItemInListById(
          deletedProfessor,
          oldProfessors
        );
        const showedProfessor = refreshShownItem(
          professor,
          oldProfessors,
          updatedProfessorList
        );
        setProfessor(showedProfessor);
        return updatedProfessorList;
      });
    }
  }

  defaultDBDelete(itemName, professor)
    .then(deleteProfessorOnList)
    .catch(defaultHandleError);
}

export { createProfessor, readProfessor, updateProfessor, deleteProfessor };
