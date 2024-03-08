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
  const { setClasses, classItem, setClassItem, newClassTimeValues } =
    classTimeStates;

  const baseClassTime = {
    ...emptyObjects.classTime,
    idTurma: newClassTimeValues?.idTurma ?? getId(classItem),
    duracao: newClassTimeValues?.duration ?? newClassTimeValues?.duracao ?? 2,
    sala: newClassTimeValues?.room ?? newClassTimeValues?.sala ?? null,
    dia: newClassTimeValues?.day ?? newClassTimeValues?.dia ?? null,
    horaInicio:
      newClassTimeValues?.startHour ?? newClassTimeValues?.horaInicio ?? null,
  };

  function getNewClassTime(newId) {
    const newClassTime = { ...baseClassTime, id: newId };
    return newClassTime;
  }

  function insertNewClassTime(newId) {
    setClassItem((oldClassItem) => {
      const newClassTime = getNewClassTime(newId);
      const newClassTimes = [...oldClassItem.horarios, newClassTime];
      const newClassItem = { ...oldClassItem, horarios: newClassTimes };
      setClasses((oldClasses) => {
        const newClasses = replaceNewItemInListById(newClassItem, oldClasses);
        return newClasses;
      });
      return newClassItem;
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

  defaultDBRead(itemName)
    .then(insertNewClassTimesFromDB)
    .catch(defaultHandleError);
}

function updateClassTime({ setClasses, setClassItem, classTime }) {
  function updateClassTimeFromDB(newClassTime) {
    setClassItem((oldClassItem) => {
      const oldClassTimes = oldClassItem?.horarios ?? [];
      const newClassTimes = replaceNewItemInListById(
        newClassTime,
        oldClassTimes
      );
      const newClassItem = { ...oldClassItem, horarios: newClassTimes };
      setClasses((oldClasses) => {
        const updatedClasses = replaceNewItemInListById(
          newClassItem,
          oldClasses
        );
        return updatedClasses;
      });
      return newClassItem;
    });
  }

  defaultDBUpdate(itemName, classTime)
    .then(updateClassTimeFromDB)
    .catch(defaultHandleError);
}

function deleteClassTime({ setClasses, setClassItem, classTime }) {
  function deleteClassTimeFromDB(deletedClassTime) {
    setClassItem((oldClassItem) => {
      const oldClassTimes = oldClassItem?.horarios ?? [];
      const newClassTimes = removeItemInListById(
        deletedClassTime,
        oldClassTimes
      );
      const newClassItem = { ...oldClassItem, horarios: newClassTimes };
      setClasses((oldClasses) => {
        const newClasses = replaceNewItemInListById(newClassItem, oldClasses);
        return newClasses;
      });
      return newClassItem;
    });
  }

  defaultDBDelete(itemName, classTime)
    .then(deleteClassTimeFromDB)
    .catch((error) => {
      defaultHandleError(error);
      deleteClassTimeFromDB(classTime);
    });
}

export { createClassTime, readClassTime, updateClassTime, deleteClassTime };
