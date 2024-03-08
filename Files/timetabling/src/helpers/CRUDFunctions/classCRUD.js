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

  const baseClassItem = {
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
    const newClass = { ...baseClassItem, id: newId };
    return newClass;
  }

  function getNewClassTimes(timelessClassItem, classTimes) {
    async function asyncCreateClassTimeDB(newClassTime) {
      const createClassTimeProps = {
        setClasses,
        setClassItem,
        newClassTimeValues: {
          ...newClassTime,
          idTurma: getId(timelessClassItem),
        },
      };
      createClassTime(createClassTimeProps);
    }
    classTimes.forEach((iterNewClassTime, index) => {
      setTimeout(() => {
        asyncCreateClassTimeDB(iterNewClassTime);
      }, (index + 1) * configInfo.AWS.defaultRequestDelay);
    });
  }

  function insertNewClass(newId) {
    const newClassItem = getNewClassItem(newId);
    const classTimes = newClassItem?.classTimes ?? newClassItem?.horarios ?? [];
    const timelessClassItem = { ...newClassItem, horarios: [] };
    setClassItem(timelessClassItem);
    setClasses((oldClasses) => [...oldClasses, newClassItem]);
    getNewClassTimes(timelessClassItem, classTimes);
  }

  defaultDBCreate(itemName, baseClassItem)
    .then(insertNewClass)
    .catch(defaultHandleError);
}

function readClass({ classes, setClasses, setClassItem }) {
  function insertNewClassesFromDB(classesFromDB) {
    setClasses(classesFromDB);

    setClassItem((oldClassItem) => {
      const showedClassItem = refreshShownItem(
        oldClassItem,
        classes,
        classesFromDB
      );
      return showedClassItem;
    });
  }

  defaultDBRead(itemName)
    .then(insertNewClassesFromDB)
    .catch(defaultHandleError);
}

function updateClass({ setClasses, classItem }) {
  function updateClassOnList(newClass) {
    // setClassItem(newClass);
    setClasses((oldClasses) => {
      const updatedClasses = replaceNewItemInListById(newClass, oldClasses);
      return updatedClasses;
    });
  }

  defaultDBUpdate(itemName, classItem)
    .then(updateClassOnList)
    .catch(defaultHandleError);
}

function deleteClass({ setClasses, classItem, setClassItem }) {
  function deleteClassOnList(classToDelete) {
    if (classToDelete) {
      setClasses((oldClasses) => {
        const newClasses = removeItemInListById(classToDelete, oldClasses);
        const newClassItem = refreshShownItem(
          classItem,
          oldClasses,
          newClasses
        );
        setClassItem(newClassItem);
        return newClasses;
      });
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
