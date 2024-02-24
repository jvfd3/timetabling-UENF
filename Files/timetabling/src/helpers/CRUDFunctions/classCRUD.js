import emptyObjects from "../../config/emptyObjects";
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

const itemName = "classData";

function createClass(createClassStates) {
  const { classes, setClasses, classItem, setClassItem, year, semester } =
    createClassStates;

  const newClassItem = {
    ...emptyObjects.classItem,
    ano: year ?? classItem?.ano,
    semestre: semester ?? classItem?.semestre,
    disciplina: classItem?.disciplina ?? null,
  };

  function getNewClassItem(newId) {
    const newClass = { ...newClassItem, id: newId };
    return newClass;
  }

  function insertNewClass(newId) {
    const newClass = getNewClassItem(newId);
    const newClasses = [...classes, newClass];
    setClassItem(newClass);
    setClasses(newClasses);
  }

  defaultDBCreate(itemName, newClassItem)
    .then(insertNewClass)
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
    .catch(defaultHandleError);
}

export { createClass, readClass, updateClass, deleteClass };
