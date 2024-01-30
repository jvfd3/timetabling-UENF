import {
  defaultDBCreate,
  defaultDBRead,
  defaultDBUpdate,
  defaultDBDelete,
  defaultHandleError,
} from "../../DB/AWS/defaultAxiosFunctions";
import options from "../../DB/local/options";
import {
  getItemIndexInListById,
  removeItemInListById,
  replaceNewItemInListById,
} from "../auxCRUD";

const itemName = "subject";

function createSubject({ subjects, setSubjects, subject, setSubject }) {
  function getNewSubject(newId) {
    const emptySubject = options.emptyObjects.subject;
    const newSubject = { ...emptySubject, periodo: 0, id: newId };
    return newSubject;
  }

  function insertNewSubjectFromDB(newId) {
    const newSubject = getNewSubject(newId);
    setSubject(newSubject);
    setSubjects([...subjects, newSubject]);
  }

  defaultDBCreate(itemName, subject)
    .then(insertNewSubjectFromDB)
    .catch(defaultHandleError);
}

function readSubject({ setSubjects, setSubject, subject }) {
  function insertNewSubjectsFromDB(subjectsFromDB) {
    const index = getItemIndexInListById(subject, subjectsFromDB);
    const keepCurrentSubject = subjectsFromDB?.[index];
    const lastSubject = subjectsFromDB[subjectsFromDB.length - 1];
    const showedSubject = keepCurrentSubject ?? lastSubject;
    // console.log("subjectsFromDB", subjectsFromDB);
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
      setSubjects(updatedSubjects);
    }
  }

  defaultDBDelete(itemName, subject)
    .then(deleteSubjectOnList)
    .catch(defaultHandleError);
}

export { createSubject, readSubject, updateSubject, deleteSubject };
