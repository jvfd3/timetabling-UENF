import emptyObjects from "../../config/emptyObjects";
import {
  defaultDBCreate,
  defaultDBRead,
  defaultDBUpdate,
  defaultDBDelete,
  defaultHandleError,
} from "../../DB/defaultAxiosFunctions";
import {
  getId,
  refreshShownItem,
  removeItemInListById,
  replaceNewItemInListById,
} from "../auxCRUD";

const itemName = "classTime";

function createClassTime(classTimeStates) {
  const { classes, setClasses, classItem, setClassItem, newClassTimeValues } =
    classTimeStates;

  const baseClassTime = {
    ...emptyObjects.classTime,
    idTurma: getId(classItem),
    duracao: newClassTimeValues?.duration ?? newClassTimeValues?.duracao ?? 2,
    dia: newClassTimeValues?.day ?? newClassTimeValues?.dia ?? null,
    horaInicio:
      newClassTimeValues?.startHour ?? newClassTimeValues?.horaInicio ?? null,
    sala: newClassTimeValues?.room ?? newClassTimeValues?.sala ?? null,
  };

  function getNewClassTime(newId) {
    const newClassTime = { ...baseClassTime, id: newId };
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

function readClassTime({ classTimes, setClassTimes, classTime, setClassTime }) {
  function insertNewClassTimesFromDB(dataFromDB) {
    setClassTimes(dataFromDB);

    const showedClassTime = refreshShownItem(classTime, classTimes, dataFromDB);
    setClassTime(showedClassTime);
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
