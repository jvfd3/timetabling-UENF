import {
  defaultDBCreate,
  defaultDBRead,
  defaultDBUpdate,
  defaultDBDelete,
  defaultHandleError,
} from "../../DB/AWS/defaultAxiosFunctions";
import {
  getId,
  getItemFromListById,
  getItemIndexInListById,
  removeItemInListById,
  replaceNewItemInListById,
} from "../auxCRUD";
import options from "../../DB/local/options";

const itemName = "classData";

function createClass({ classes, setClasses, classItem, setClassItem }) {
  function getNewClassItem(newId) {
    const newClass = {
      ...options.emptyObjects.classItem,
      ano: classItem.ano,
      semestre: classItem.semestre,
      id: newId,
      idTurma: newId,
    };
    return newClass;
  }

  function insertNewClass(newId) {
    const newClass = getNewClassItem(newId);
    const newClasses = [...classes, newClass];
    setClassItem(newClass);
    setClasses(newClasses);
  }
  // insertNewClass(123);
  defaultDBCreate(itemName, classItem)
    .then(insertNewClass)
    .catch(defaultHandleError);
}

function readClass({ setClasses, classItem, setClassItem }) {
  function insertNewClassesFromDB(dataFromDB) {
    const index = getItemIndexInListById(classItem, dataFromDB);
    const lastItem = dataFromDB[dataFromDB.length - 1];
    const keepCurrentClass = dataFromDB?.[index];
    const showedClass = keepCurrentClass ?? lastItem;
    setClassItem(showedClass);
    setClasses(dataFromDB);
  }

  defaultDBRead(itemName)
    .then(insertNewClassesFromDB)
    .catch(defaultHandleError);
}

function updateClass(classStates) {
  const { classes, setClasses, classItem, setClassItem } = classStates;

  function updateClassOnList(newClass) {
    const updatedClasses = replaceNewItemInListById(newClass, classes);
    setClassItem(newClass);
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
      const index = getItemIndexInListById(classToDelete, classes);
      let newItem = null;
      if (index > 0) {
        newItem = classes[index - 1];
      } else if (filteredClasses.length > 0) {
        newItem = classes[0];
      } else {
        console.error(
          "deleteClass: Não há mais classes para serem exibidas na lista"
        );
      }
      // const newItem = options.emptyObjects.classItem;
      setClassItem(newItem);
      setClasses(newItemList);
    }
  }

  // deleteItemOnList(classItem, classes);
  classItem.id = classItem.idTurma;
  defaultDBDelete(itemName, classItem)
    .then(deleteClassOnList)
    .catch(defaultHandleError);
}

export { createClass, readClass, updateClass, deleteClass };
