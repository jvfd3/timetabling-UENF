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

const itemName = configInfo.endpoints.classData;

function createClass(createClassStates) {
  const { setClasses, setClassItem, classItemFilter } = createClassStates;

  function getBaseClassItem() {
    const defaultYearSemester = getDefaultYearSemesterValues();

    const filterYear = classItemFilter?.year ?? classItemFilter?.ano;
    const filterSemester =
      classItemFilter?.semester ?? classItemFilter?.semestre;
    const filterSubject =
      classItemFilter?.subject ?? classItemFilter?.disciplina;
    const filterExpectedDemand = // Cames from createPreFilledClass
      classItemFilter?.expectedDemand ?? classItemFilter?.demandaEstimada;
    const filterClassTimes =
      classItemFilter?.classTimes ?? classItemFilter?.horarios;

    const baseClassItem = {
      ...emptyObjects.classItem,
      id: "initial empty id", // Will be replaced by the DB query
      ano: filterYear ?? defaultYearSemester.year,
      semestre: filterSemester ?? defaultYearSemester.semester,
      disciplina: filterSubject ?? null,
      demandaEstimada: filterExpectedDemand ?? null,
      professor: classItemFilter?.professor ?? null,
      description: classItemFilter?.description ?? null,
      horarios: filterClassTimes ?? [],
    };

    return baseClassItem;
  }

  function getNewClassItem(newId) {
    const newClass = { ...getBaseClassItem(), id: newId };
    return newClass;
  }

  function getNewClassTimes(classTimes, classItemId) {
    const createClassTimeProps = { setClasses, setClassItem };

    classTimes.forEach((iterNewClassTime, index) => {
      function asyncCreateClassTime() {
        createClassTimeProps.newClassTimeValues = {
          ...iterNewClassTime,
          idTurma: classItemId,
        };

        createClassTime(createClassTimeProps);
      }

      const delay = (index + 1) * configInfo.AWS.defaultRequestDelay;
      const delayedFunction = asyncCreateClassTime;
      setTimeout(delayedFunction, delay);
    });
  }

  function insertNewClass(newId) {
    const newClassItem = getNewClassItem(newId);
    const classTimes = newClassItem?.classTimes ?? newClassItem?.horarios ?? [];
    const timelessClassItem = { ...newClassItem, horarios: [] };

    // classes should use that, but not multiclasses. But why the timelessClassItem?
    setClassItem && setClassItem(timelessClassItem);
    setClasses((oldClasses) => [...oldClasses, timelessClassItem]);
    getNewClassTimes(classTimes, newId);
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
    setClasses((oldClasses) => {
      const newClasses = removeItemInListById(classToDelete, oldClasses);
      const newClassItem = refreshShownItem(classItem, oldClasses, newClasses);
      setClassItem(newClassItem);
      return newClasses;
    });
  }

  deleteClassOnList(classItem); // optimistic delete (deletes even if there is an error in the server)
  defaultDBDelete(itemName, classItem)
    .then(deleteClassOnList)
    .catch((error) => {
      defaultHandleError(error);
      deleteClassOnList(classItem);
    });
}

export { createClass, readClass, updateClass, deleteClass };
