import {
  defaultDBCreate,
  defaultDBRead,
  defaultDBUpdate,
  defaultDBDelete,
  defaultHandleError,
} from "../../DB/AWS/defaultAxiosFunctions";
import {
  getItemIndexInListById,
  removeItemInListById,
  replaceNewItemInListById,
} from "../auxCRUD";

const itemName = "subject";

function createSubject({ subjects, setSubjects, subject, setSubject }) {
  function insertNewSubjectFromDB(newId) {
    const newSubject = { ...subject, id: newId };
    setSubject(newSubject);
    setSubjects([...subjects, newSubject]);
  }
  defaultDBCreate(itemName, subject)
    .then(insertNewSubjectFromDB)
    .catch(defaultHandleError);
}

function readSubject({ setSubjects, setSubject }) {
  function insertNewSubjectsFromDB(subjectsFromDB) {
    const lastSubject = subjectsFromDB[subjectsFromDB.length - 1];
    setSubject(lastSubject);
    setSubjects(subjectsFromDB);
  }

  defaultDBRead(itemName)
    .then(insertNewSubjectsFromDB)
    .catch(defaultHandleError);
}

function updateSubject({ subjects, setSubjects, subject }) {
  function updateSubjectOnList(newSubject) {
    const updatedSubjects = replaceNewItemInListById(newSubject, subjects);
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
      const index = getItemIndexInListById(deletedSubject, subjects);
      let newSubject = null;
      if (index > 0) {
        newSubject = subjects[index - 1];
      } else if (updatedSubjects.length > 0) {
        newSubject = subjects[0];
      } else {
        console.error(
          "Uai, não tem mais professores! Como diria o Silvio Santos: 'Está certo disto?'"
        );
      }
      setSubject(newSubject);
    }
  }

  defaultDBDelete(itemName, subject)
    .then(deleteSubjectOnList)
    .catch(defaultHandleError);
}

export { createSubject, readSubject, updateSubject, deleteSubject };
