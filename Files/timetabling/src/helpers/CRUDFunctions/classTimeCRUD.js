import {
  defaultDBCreate,
  defaultDBRead,
  defaultDBUpdate,
  defaultDBDelete,
  defaultHandleError,
} from "../../DB/AWS/defaultAxiosFunctions";
import options from "../../DB/local/options";

const itemName = "classTime";

function createClassTime(classTimeStates) {
  const { classTimes, setClassTimes, classTime, setClassTime } =
    classTimeStates;
  function getNewClassTime(newId) {
    const newClassTime = {
      ...options.emptyObjects.classTime,
      id: newId,
      idClassTime: newId,
      idHorario: newId,
    };
    return newClassTime;
  }

  function insertNewClassTime(newId) {
    const newClassTime = getNewClassTime(newId);
    setClassTime(newClassTime);
    setClassTimes([...classTimes, newClassTime]);
  }

  defaultDBCreate(itemName, classTime)
    .then(insertNewClassTime)
    .catch(defaultHandleError);
}

function readClassTime(classTimeStates) {
  const { classTimes, setClassTimes, classTime, setClassTime } =
    classTimeStates;
  function getIndexFromCurrentClassTime(currentClassTime) {
    /* percorra a lista de salas, encontre a sala que tenha o mesmo id, e retorne o índice dessa classTime */
    const index = classTimes.findIndex(
      (iterClassTime) =>
        iterClassTime.idClassTime === currentClassTime.idClassTime
    );
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

  function updateClassTimeFromList(oldArray, newClassTime) {
    const newArray = oldArray.map((iterClassTime) => {
      const idIterClassTime = iterClassTime?.id ?? iterClassTime?.idHorario;
      const idNewClassTime = newClassTime?.id ?? newClassTime?.idHorario;
      const hasSameId = idIterClassTime === idNewClassTime;
      return hasSameId ? newClassTime : iterClassTime;
    });
    return newArray;
  }

  function updateClassTimeFromDB() {
    const updatedClassTimes = updateClassTimeFromList(classTimes, classTime);
    setClassTimes(updatedClassTimes);
  }

  defaultDBUpdate(itemName, classTime)
    .then(updateClassTimeFromDB)
    .catch(defaultHandleError);
}

function deleteClassTime(classTimeStates) {
  const { classTimes, setClassTimes, classTime, setClassTime } =
    classTimeStates;

  function deleteClassTimeFromList(oldArray, newClassTime) {
    const newArray = oldArray.filter((iterClassTime) => {
      const idIterClassTime = iterClassTime?.id ?? iterClassTime?.idHorario;
      const idNewClassTime = newClassTime?.id ?? newClassTime?.idHorario;
      const hasSameId = idIterClassTime === idNewClassTime;
      return !hasSameId;
    });
    return newArray;
  }

  function deleteClassTimeFromDB() {
    const updatedClassTimes = deleteClassTimeFromList(classTimes, classTime);
    setClassTimes(updatedClassTimes);
  }

  defaultDBDelete(itemName, classTime)
    .then(deleteClassTimeFromDB)
    .catch(defaultHandleError);
}

export { createClassTime, readClassTime, updateClassTime, deleteClassTime };
