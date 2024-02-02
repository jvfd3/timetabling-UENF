import emptyObjects from "../../config/emptyObjects";
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

const itemName = "subject";

function createSubject({ subjects, setSubjects, subject, setSubject }) {
  function getNewSubject(newId) {
    const emptySubject = emptyObjects.subject;
    const newSubject = { ...emptySubject, periodo: 0, id: newId };
    return newSubject;
  }

  function insertNewSubjectFromDB(newId) {
    const newSubject = getNewSubject(newId);
    const newSubjects = [...subjects, newSubject];
    setSubject(newSubject);
    setSubjects(newSubjects);
  }

  defaultDBCreate(itemName, subject)
    .then(insertNewSubjectFromDB)
    .catch(defaultHandleError);
}

function readSubject({ setSubjects, setSubject, subject }) {
  function insertNewSubjectsFromDB(subjectsFromDB) {
    const showedSubject = keepOldItem(subject, subjectsFromDB);
    setSubject(showedSubject);
    setSubjects(subjectsFromDB);
  }

  defaultDBRead(itemName)
    .then(insertNewSubjectsFromDB)
    .catch(defaultHandleError);
}

function updateSubject({ subjects, setSubjects, subject }) {
  function updateSubjectOnList(newSubject) {
    const updatedSubjects = replaceNewItemInListById(newSubject, subjects);
    // setSubject(newSubject);
    setSubjects(updatedSubjects);
  }

  defaultDBUpdate(itemName, subject)
    .then(updateSubjectOnList)
    .catch(defaultHandleError);
}

function deleteSubject({ subjects, setSubjects, subject, setSubject }) {
  function deleteSubjectOnList(deletedSubject) {
    if (deletedSubject) {
      const updatedSubjects = removeItemInListById(deletedSubject, subjects);
      const showedSubject = keepOldItem(subject, updatedSubjects);
      setSubject(showedSubject);
      setSubjects(updatedSubjects);
    }
  }

  defaultDBDelete(itemName, subject)
    .then(deleteSubjectOnList)
    .catch(defaultHandleError);
}

export { createSubject, readSubject, updateSubject, deleteSubject };
