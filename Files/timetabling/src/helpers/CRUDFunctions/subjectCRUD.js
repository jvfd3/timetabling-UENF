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

const itemName = "subject";

function createSubject({ setSubjects, setSubject }) {
  const emptySubject = emptyObjects.subject;

  function getNewSubject(newId) {
    const newSubject = { ...emptySubject, id: newId };
    return newSubject;
  }

  function insertNewSubjectFromDB(newId) {
    const newSubject = getNewSubject(newId);
    setSubject(newSubject);
    setSubjects((oldSubjects) => [...oldSubjects, newSubject]);
  }

  defaultDBCreate(itemName, emptySubject)
    .then(insertNewSubjectFromDB)
    .catch(defaultHandleError);
}

function readSubject({ subjects, setSubjects, setSubject }) {
  function insertNewSubjectsFromDB(subjectsFromDB) {
    setSubjects(subjectsFromDB);

    setSubject((oldSubject) => {
      const showedSubject = refreshShownItem(
        oldSubject,
        subjects,
        subjectsFromDB
      );
      return showedSubject;
    });
  }

  defaultDBRead(itemName)
    .then(insertNewSubjectsFromDB)
    .catch(defaultHandleError);
}

function updateSubject({ setSubjects, subject }) {
  function updateSubjectOnList(newSubject) {
    // setSubject(newSubject);
    setSubjects((oldSubjects) => {
      const updatedSubjects = replaceNewItemInListById(newSubject, oldSubjects);
      return updatedSubjects;
    });
  }

  defaultDBUpdate(itemName, subject)
    .then(updateSubjectOnList)
    .catch(defaultHandleError);
}

function deleteSubject({ setSubjects, subject, setSubject }) {
  function deleteSubjectOnList(deletedSubject) {
    if (deletedSubject) {
      setSubjects((oldSubjects) => {
        const updatedSubjects = removeItemInListById(
          deletedSubject,
          oldSubjects
        );
        const showedSubject = refreshShownItem(
          subject,
          oldSubjects,
          updatedSubjects
        );
        setSubject(showedSubject);
        return updatedSubjects;
      });
    }
  }

  defaultDBDelete(itemName, subject)
    .then(deleteSubjectOnList)
    .catch(defaultHandleError);
}

export { createSubject, readSubject, updateSubject, deleteSubject };
