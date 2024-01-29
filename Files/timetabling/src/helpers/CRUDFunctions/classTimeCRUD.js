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
    };
    return newClassTime;
  }

  function insertNewClassTime(newId) {
    const newClassTime = getNewClassTime(newId);
    const newClassTimes = [...classItem.horarios, newClassTime];
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
    // console.log("currentClassTime", dataFromDB.length);
    setClassTime(currentClassTime);
    setClassTimes(dataFromDB);
  }

  // console.log("readingClassTime");
  defaultDBRead(itemName)
    .then((data) => {
      // console.log(data.length);
      insertNewClassTimesFromDB(data);
    })
    .catch(defaultHandleError);
}

function updateClassTime(classTimeStates) {
  const { classes, setClasses, classItem, setClassItem, classTime } =
    classTimeStates;

  function updateClassTimeFromDB(newClassTime) {
    const classTimes = classItem?.horarios ?? [];
    const updatedClassTimes = replaceNewItemInListById(
      newClassTime,
      classTimes
    );
    const newClassItem = { ...classItem, horarios: updatedClassTimes };
    const updatedClasses = replaceNewItemInListById(newClassItem, classes);
    setClassItem(newClassItem);
    setClasses(updatedClasses);
  }

  // updateClassTimeFromDB(classTime);

  defaultDBUpdate(itemName, classTime)
    .then(updateClassTimeFromDB)
    .catch(defaultHandleError);
}

function deleteClassTime(classTimeStates) {
  const { classes, setClasses, classItem, setClassItem, classTime } =
    classTimeStates;

  function deleteClassTimeFromDB(deletedClassTime) {
    const classTimes = classItem?.horarios ?? [];
    const updatedClassTimes = removeItemInListById(
      deletedClassTime,
      classTimes
    );
    const newClassItem = { ...classItem, horarios: updatedClassTimes };
    const updatedClasses = replaceNewItemInListById(newClassItem, classes);
    setClassItem(newClassItem);
    setClasses(updatedClasses);
  }

  defaultDBDelete(itemName, classTime)
    .then(deleteClassTimeFromDB)
    .catch(defaultHandleError);
}

export { createClassTime, readClassTime, updateClassTime, deleteClassTime };
