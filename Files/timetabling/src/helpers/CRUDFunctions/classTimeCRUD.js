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
    setClassItem((oldClassItem) => {
      const newClassTime = getNewClassTime(newId);
      const newClassTimes = [...oldClassItem.horarios, newClassTime];
      const newItem = { ...oldClassItem, horarios: newClassTimes };
      setClasses((oldClasses) => {
        const newClasses = replaceNewItemInListById(newItem, oldClasses);
        return newClasses;
      });
      return newItem;
    });
  }

  defaultDBCreate(itemName, baseClassTime)
    .then(insertNewClassTime)
    .catch(defaultHandleError);
}

function readClassTime({ classTimes, setClassTimes, setClassTime }) {
  function insertNewClassTimesFromDB(dataFromDB) {
    setClassTimes(dataFromDB);

    setClassTime((oldClassTime) => {
      const showedClassTime = refreshShownItem(
        oldClassTime,
        classTimes,
        dataFromDB
      );
      return showedClassTime;
    });
  }

  // console.log("readingClassTime");
  defaultDBRead(itemName)
    .then(insertNewClassTimesFromDB)
    .catch(defaultHandleError);
}

function updateClassTime({ setClasses, setClassItem, classTime }) {
  function updateClassTimeFromDB(newClassTime) {
    setClassItem((oldClassItem) => {
      const oldClassTimes = oldClassItem?.horarios ?? [];
      const updatedClassTimes = replaceNewItemInListById(
        newClassTime,
        oldClassTimes
      );
      const newClassItem = { ...oldClassItem, horarios: updatedClassTimes };
      setClasses((oldClasses) => {
        // Maybe I should put this setClasses inside the setClassItem callback function to deal with the async nature of the state update
        const updatedClasses = replaceNewItemInListById(
          newClassItem,
          oldClasses
        );
        return updatedClasses;
      });
      return newItem;
    });
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

    setClassItem((oldClassItem) => {
      const oldClassTimes = oldClassItem?.horarios ?? [];
      const updatedClassTimes = removeItemInListById(
        deletedClassTime,
        oldClassTimes
      );
      const newItem = { ...oldClassItem, horarios: updatedClassTimes };
      return newItem;
    });

    setClasses((oldClasses) => {
      // Maybe I should put this setClasses inside the setClassItem callback function to deal with the async nature of the state update
      const updatedClasses = replaceNewItemInListById(newClassItem, oldClasses);
      return updatedClasses;
    });
  }

  defaultDBDelete(itemName, classTime)
    .then(deleteClassTimeFromDB)
    .catch(defaultHandleError);
}

export { createClassTime, readClassTime, updateClassTime, deleteClassTime };
