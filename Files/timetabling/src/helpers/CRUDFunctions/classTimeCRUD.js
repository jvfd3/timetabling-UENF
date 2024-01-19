import {
  defaultDBCreate,
  defaultDBRead,
  defaultDBUpdate,
  defaultDBDelete,
  defaultHandleError,
} from "../../DB/AWS/defaultAxiosFunctions";
import options from "../../DB/local/options";
import {
  getId,
  getItemIndexInListById,
  removeItemInListById,
  replaceNewItemInListById,
} from "../auxCRUD";

const itemName = "classTime";

function createClassTime(classTimeStates) {
  const { classes, setClasses, classItem, setClassItem } = classTimeStates;

  const baseClassTime = {
    ...options.emptyObjects.classTime,
    idTurma: getId(classItem),
    duracao: 2,
  };

  function getNewClassTime(newId) {
    const newClassTime = {
      ...baseClassTime,
      id: newId,
      idClassTime: newId,
      idHorario: newId,
    };
    return newClassTime;
  }

  function insertNewClassTime(newId) {
    const newClassTime = getNewClassTime(newId);
    const newClassTimes = [newClassTime, ...classItem.horarios];
    const newClassItem = { ...classItem, horarios: newClassTimes };
    const newClasses = replaceNewItemInListById(newClassItem, classes);
    setClassItem(newClassItem);
    setClasses(newClasses);
  }

  defaultDBCreate(itemName, baseClassTime)
    .then(insertNewClassTime)
    .catch(defaultHandleError);
}

function readClassTime(classTimeStates) {
  const { classTimes, setClassTimes, classTime, setClassTime } =
    classTimeStates;
  function getIndexFromCurrentClassTime(currentClassTime) {
    const index = getItemIndexInListById(currentClassTime, classTimes);
    return index == -1 ? 0 : index;
  }
  function insertNewClassTimesFromDB(dataFromDB) {
    const index = getIndexFromCurrentClassTime(classTime);
    const lastItem = dataFromDB[dataFromDB.length - 1];
    const currentClassTime = dataFromDB?.[index] ?? lastItem;
    setClassTime(currentClassTime);
    setClassTimes(dataFromDB);
  }

  defaultDBRead(itemName)
    .then(insertNewClassTimesFromDB)
    .catch(defaultHandleError);
}

function updateClassTime(classTimeStates) {
  const { classTimes, setClassTimes, classTime, setClassTime } =
    classTimeStates;

  function updateClassTimeFromDB() {
    const updatedClassTimes = replaceNewItemInListById(classTimes, classTime);
    setClassTimes(updatedClassTimes);
  }

  defaultDBUpdate(itemName, classTime)
    .then(updateClassTimeFromDB)
    .catch(defaultHandleError);
}

function deleteClassTime(classTimeStates) {
  const { classTimes, setClassTimes, classTime, setClassTime } =
    classTimeStates;

  function deleteClassTimeFromDB() {
    const updatedClassTimes = removeItemInListById(classTime, classTimes);
    setClassTimes(updatedClassTimes);
  }

  defaultDBDelete(itemName, classTime)
    .then(deleteClassTimeFromDB)
    .catch(defaultHandleError);
}

export { createClassTime, readClassTime, updateClassTime, deleteClassTime };
