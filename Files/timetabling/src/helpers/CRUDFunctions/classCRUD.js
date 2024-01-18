import {
  defaultDBCreate,
  defaultDBRead,
  defaultDBUpdate,
  defaultDBDelete,
  defaultHandleError,
} from "../../DB/AWS/defaultAxiosFunctions";
import options from "../../DB/local/options";

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
  function updateClassFromList(oldArray, newClass) {
    const newArray = oldArray.map((iterClass) => {
      const idIterClass = iterClass?.id ?? iterClass?.idTurma;
      const idNewClass = newClass?.id ?? newClass?.idTurma;
      const hasSameId = idIterClass === idNewClass;
      return hasSameId ? newClass : iterClass;
    });
    return newArray;
  }

  function updateClassOnList(newClass) {
    const updatedClasses = updateClassFromList(classes, newClass);
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

  function getListWithItemRemoved(oldList, idToDelete) {
    const newArray = oldList.filter((iterOldItem) => {
      const oldId = iterOldItem?.id ?? iterOldItem?.idTurma;
      const isEqual = oldId == idToDelete;
      return !isEqual;
    });
    return newArray;
  }

  function findIndexFromList(list, idToFind) {
    const index = list.findIndex((iterClass) => {
      const iterId = iterClass?.id ?? iterClass?.idTurma;
      const isEqual = iterId == idToFind;
      return isEqual;
    });
    return index;
  }

  function deleteItemOnList(itemToDelete, itemsToDeleteFrom = classes) {
    const idToDelete = itemToDelete?.id ?? itemToDelete?.idTurma;
    if (itemToDelete) {
      // let index = findIndexFromList(itemsToDeleteFrom, idToDelete);
      const newItemList = getListWithItemRemoved(itemsToDeleteFrom, idToDelete);
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
