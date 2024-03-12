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
  getItemFromListById,
  refreshShownItem,
  removeItemInListById,
  replaceNewItemInListById,
} from "../auxCRUD";

const itemName = "classTime";

function createClassTime(classTimeStates) {
  // const { setClasses, classItem, setClassItem, newClassTimeValues } =
  //   classTimeStates;

  const { setClasses, classItemFilter, classItem, newClassTimeValues } =
    classTimeStates;

  function getBaseClassTime() {
    const room = newClassTimeValues?.room ?? newClassTimeValues?.sala;
    const day = newClassTimeValues?.day ?? newClassTimeValues?.dia;
    const duration =
      newClassTimeValues?.duration ?? newClassTimeValues?.duracao;
    const startHour =
      newClassTimeValues?.startHour ?? newClassTimeValues?.horaInicio;

    const debug = { room: classItemFilter };
    // console.log(debug);

    const baseClassTime = {
      ...emptyObjects.classTime,
      idTurma: newClassTimeValues?.idTurma ?? getId(classItem),
      duracao: duration ?? 2,
      sala: room ?? null,
      dia: day ?? null,
      horaInicio: startHour ?? null,
    };

    return baseClassTime;
  }

  function getNewClassTime(newId) {
    const newClassTime = { ...getBaseClassTime(), id: newId };
    return newClassTime;
  }

  function insertNewClassTime(newId) {
    const newClassTime = getNewClassTime(newId);
    const fakeClassItem = { id: newClassTime.idTurma };
    setClasses((oldClasses) => {
      const oldClassItem = getItemFromListById(fakeClassItem, oldClasses);
      const oldClassTimes = oldClassItem?.horarios ?? [];
      const newClassTimes = [...oldClassTimes, newClassTime];
      const newClassItem = { ...oldClassItem, horarios: newClassTimes };
      const newClasses = replaceNewItemInListById(newClassItem, oldClasses);
      return newClasses;
    });
  }

  defaultDBCreate(itemName, getBaseClassTime())
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

function deleteClassTime({ setClasses, classTime }) {
  function deleteClassTimeFromDB(deletedClassTime) {
    setClasses((oldClasses) => {
      const fakeClassItem = { id: deletedClassTime.idTurma };
      const oldClassItem = getItemFromListById(fakeClassItem, oldClasses);
      const oldClassTimes = oldClassItem?.horarios ?? [];
      const newClassTimes = removeItemInListById(
        deletedClassTime,
        oldClassTimes
      );
      const newClassItem = { ...oldClassItem, horarios: newClassTimes };
      const newClasses = replaceNewItemInListById(newClassItem, oldClasses);
      return newClasses;
    });
  }

  deleteClassTimeFromDB(classTime); // optimistic delete (deletes even if there is an error in the server)
  defaultDBDelete(itemName, classTime)
    .then(deleteClassTimeFromDB)
    .catch((error) => {
      defaultHandleError(error);
      deleteClassTimeFromDB(classTime);
    });
}

export { createClassTime, readClassTime, updateClassTime, deleteClassTime };
