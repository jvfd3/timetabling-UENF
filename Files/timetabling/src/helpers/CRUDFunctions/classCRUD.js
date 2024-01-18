import {
  defaultDBCreate,
  defaultDBRead,
  defaultDBUpdate,
  defaultDBDelete,
  defaultHandleError,
} from "../../DB/AWS/defaultAxiosFunctions";
import options from "../../DB/local/options";
import {
  getId,
  getItemFromListById,
  getItemIndexInListById,
  removeItemInListById,
  replaceNewItemInListById,
} from "../auxCRUD";

const itemName = "classData";

function createClass({ classes, setClasses, classItem, setClassItem }) {
  function insertNewClass(newId) {
    let newClass = {
      ...options.emptyObjects.turma,
      ano: classItem.ano,
      semestre: classItem.semestre,
      id: newId,
      idTurma: newId,
    };
    setClassItem(newClass);
    setClasses([...classes, newClass]);
  }
  // insertNewClass(123);
  defaultDBCreate(itemName, classItem)
    .then(insertNewClass)
    .catch(defaultHandleError);
}

function readClass({ classes, setClasses, classItem, setClassItem }) {
  function insertNewClassesFromDB(dataFromDB) {
    function getIndexFromCurrentClass(currentClass) {
      /* percorra a lista de salas, encontre a sala que tenha o mesmo id, e retorne o índice dessa classItem */
      const index = classes.findIndex(
        (iterClassItem) => iterClassItem.idTurma === currentClass.idTurma
      );

      return index == -1 ? 0 : index;
    }
    const index = getIndexFromCurrentClass(classItem);
    const lastItem = dataFromDB[dataFromDB.length - 1];
    const currentClass = dataFromDB?.[index] ?? lastItem;
    setClassItem(currentClass);
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

  // updateClassOnList(classItem);
  console.log("updateClass: Atualizei prusinhô");
  defaultDBUpdate(itemName, classItem)
    .then(updateClassOnList)
    .catch(defaultHandleError);
}

function deleteClass(classStates) {
  const { classes, setClasses, classItem, setClassItem } = classStates;

  function findIndexFromList(list, idToFind) {
    const index = getItemIndexInListById(idToFind, list);
    return index;
  }

  function deleteItemOnList(itemToDelete, itemsToDeleteFrom = classes) {
    if (itemToDelete) {
      // let index = findIndexFromList(itemsToDeleteFrom, idToDelete);
      const newItemList = removeItemInListById(itemToDelete, itemsToDeleteFrom);
      // let newItem = null;

      /*
      [0, 1]
      [A, B] OLD
      [B] CASO 1
      [A] CASO 2

      [0]
      [A] OLD
      [] CASO 1
      */

      // console.log("index1", index);
      // index = index > newItemList.length - 1 ? newItemList.length : index;
      // console.log("index2", index);
      // index = index < 0 ? null : index;
      // console.log("index3", index);
      // if (index == null) {
      //  newItem = options.emptyObjects.turma;
      // } else {
      //   newItem = newItemList[index];
      // }
      const newItem = options.emptyObjects.turma;
      setClassItem(newItem);
      setClasses(newItemList);
    }
  }

  // deleteItemOnList(classItem, classes);
  classItem.id = classItem.idTurma;
  defaultDBDelete(itemName, classItem)
    .then(deleteItemOnList)
    .catch(defaultHandleError);
}

export { createClass, readClass, updateClass, deleteClass };
