import emptyObjects from "../../config/emptyObjects";
import { getDefaultYearSemesterValues } from "../auxFunctions";
import {
  getId,
  refreshShownItem,
  removeItemInListById,
  replaceNewItemInListById,
} from "../auxCRUD";
import {
  defaultDBCreate,
  defaultDBRead,
  defaultDBUpdate,
  defaultDBDelete,
  defaultHandleError,
} from "../../DB/defaultAxiosFunctions";
import { createClassTime } from "./classTimeCRUD";
import configInfo from "../../config/configInfo";

const itemName = "classData";

function createClass(createClassStates) {
  const { classes, setClasses, classItem, setClassItem, year, semester } =
    createClassStates;

  const currentSemester = getDefaultYearSemesterValues();

  const newClassItem = {
    ...emptyObjects.classItem,
    ano: year ?? classItem?.year ?? classItem?.ano ?? currentSemester.year,
    semestre:
      semester ??
      classItem?.semester ??
      classItem?.semestre ??
      currentSemester.semester,
    disciplina: classItem?.subject ?? classItem?.disciplina ?? null,
    professor: classItem?.professor ?? null,
    demandaEstimada:
      classItem?.expectedDemand ?? classItem?.demandaEstimada ?? null,
    description: classItem?.description ?? null,
  };

  function getNewClassItem(newId) {
    const newClass = { ...newClassItem, id: newId };
    return newClass;
  }

  function getNewClassTimes(newClass, newClassTimes) {
    let tempClass = { ...newClass };
    async function asyncCreateClassTimeDB(newClassTime) {
      const createClassTimeProps = {
        classes: [...classes, tempClass],
        classItem: tempClass,
        setClasses,
        setClassItem,
        newClassTimeValues: { ...newClassTime },
      };
      createClassTime(createClassTimeProps);
    }
    /* 
    async function createClassTimesSequentially(newClassTimes) {
      for (const iterNewClassTime of newClassTimes) {
        await asyncCreateClassTimeDB(iterNewClassTime);
      }
    }
    createClassTimesSequentially(newClassTimes);
    */
    newClassTimes.forEach((iterNewClassTime, index) => {
      setTimeout(() => {
        asyncCreateClassTimeDB(iterNewClassTime);
        // console.log(index);
      }, (index + 1) * configInfo.AWS.defaultRequestDelay);
    });

    return newClassTimes;
  }

  function insertNewClass(newId) {
    const newClass = getNewClassItem(newId);
    const newClasses = [...classes, newClass];
    const hasClassTimes = classItem?.horarios.length > 0;
    if (hasClassTimes) {
      getNewClassTimes(newClass, classItem?.horarios);
    } else {
      setClassItem(newClass);
      setClasses(newClasses);
    }
  }

  insertNewClass(null);
  defaultDBCreate(itemName, newClassItem)
    .then((id) => insertNewClass(id))
    .catch(defaultHandleError);
}

function readClass({ classes, setClasses, classItem, setClassItem }) {
  function insertNewClassesFromDB(dataFromDB) {
    setClasses(dataFromDB);

    const showedClassItem = refreshShownItem(classItem, classes, dataFromDB);
    setClassItem(showedClassItem);
  }

  defaultDBRead(itemName)
    .then(insertNewClassesFromDB)
    .catch(defaultHandleError);
}

function updateClass(classStates) {
  const { classes, setClasses, classItem, setClassItem } = classStates;

  function updateClassOnList(newClass) {
    const updatedClasses = replaceNewItemInListById(newClass, classes);
    // setClassItem(newClass);
    setClasses(updatedClasses);
  }

  defaultDBUpdate(itemName, classItem)
    .then(updateClassOnList)
    .catch(defaultHandleError);
}

function deleteClass({ classes, setClasses, classItem, setClassItem }) {
  function deleteClassOnList(classToDelete) {
    if (classToDelete) {
      const filteredClasses = removeItemInListById(classToDelete, classes);
      setClasses(filteredClasses);

      const newItem = refreshShownItem(classItem, classes, filteredClasses);
      setClassItem(newItem);
    }
  }

  // deleteItemOnList(classItem, classes);
  classItem.id = getId(classItem);
  defaultDBDelete(itemName, classItem)
    .then(deleteClassOnList)
    .catch((error) => {
      defaultHandleError(error);
      deleteClassOnList(classItem);
    });
}

export { createClass, readClass, updateClass, deleteClass };
