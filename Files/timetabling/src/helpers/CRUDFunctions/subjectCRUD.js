import emptyObjects from "../../config/emptyObjects";
import {
  defaultDBCreate,
  defaultDBRead,
  defaultDBUpdate,
  defaultDBDelete,
  defaultHandleError,
} from "../../DB/AWS/defaultAxiosFunctions";
import {
  refreshShownItem,
  removeItemInListById,
  replaceNewItemInListById,
} from "../auxCRUD";

const itemName = "subject";

function createSubject({ subjects, setSubjects, subject, setSubject }) {
  const emptySubject = emptyObjects.subject;

  function getNewSubject(newId) {
    const newSubject = { ...emptySubject, id: newId };
    return newSubject;
  }

  function insertNewSubjectFromDB(newId) {
    const newSubject = getNewSubject(newId);
    const newSubjects = [...subjects, newSubject];
    setSubject(newSubject);
    setSubjects(newSubjects);
  }

  defaultDBCreate(itemName, emptySubject)
    .then(insertNewSubjectFromDB)
    .catch(defaultHandleError);
}

function readSubject({ subjects, setSubjects, setSubject, subject }) {
  function insertNewSubjectsFromDB(subjectsFromDB) {
    setSubjects(subjectsFromDB);

    const showedSubject = refreshShownItem(subject, subjects, subjectsFromDB);
    setSubject(showedSubject);
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
      setSubjects(updatedSubjects);

      const showedSubject = refreshShownItem(
        subject,
        subjects,
        updatedSubjects
      );
      setSubject(showedSubject);
    }
  }

  defaultDBDelete(itemName, subject)
    .then(deleteSubjectOnList)
    .catch(defaultHandleError);
}

export { createSubject, readSubject, updateSubject, deleteSubject };
