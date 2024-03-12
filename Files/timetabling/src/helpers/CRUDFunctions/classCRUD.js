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
  const { setClasses, setClassItem, classItemFilter } = createClassStates;

  function getBaseClassItem() {
    const defaultYearSemester = getDefaultYearSemesterValues();

    const currYear = classItemFilter?.year ?? classItemFilter?.ano;
    const currSemester = classItemFilter?.semester ?? classItemFilter?.semestre;
    const currSubject = classItemFilter?.subject ?? classItemFilter?.disciplina;
    const currExpectedDemand =
      classItemFilter?.expectedDemand ?? classItemFilter?.demandaEstimada;
    const currClassTimes =
      classItemFilter?.classTimes ?? classItemFilter?.horarios;

    const baseClassItem = {
      ...emptyObjects.classItem,
      ano: currYear ?? defaultYearSemester.year,
      semestre: currSemester ?? defaultYearSemester.semester,
      disciplina: currSubject ?? null,
      demandaEstimada: currExpectedDemand ?? null,
      professor: classItemFilter?.professor ?? null,
      description: classItemFilter?.description ?? null,
      horarios: currClassTimes ?? [],
    };

    return baseClassItem;
  }

  function getNewClassItem(newId) {
    const newClass = { ...getBaseClassItem(), id: newId };
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
      const delay = (index + 1) * configInfo.AWS.defaultRequestDelay;
      setTimeout(() => {
        asyncCreateClassTimeDB(iterNewClassTime);
      }, delay);
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

  defaultDBCreate(itemName, getBaseClassItem())
    .then(insertNewClass)
    .catch(defaultHandleError);
}

function readClass({ setClasses, setClassItem }) {
  function insertNewClassesFromDB(classesFromDB) {
    setClasses((oldClasses) => {
      setClassItem((oldClassItem) => {
        const showedClassItem = refreshShownItem(
          oldClassItem,
          oldClasses,
          classesFromDB
        );
        return showedClassItem;
      });
      return classesFromDB;
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
