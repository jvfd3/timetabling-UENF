import {
  defaultDBCreate,
  defaultDBRead,
  defaultDBUpdate,
  defaultDBDelete,
  defaultHandleError,
} from "../../DB/AWS/defaultAxiosFunctions";
import options from "../../DB/local/options";

const itemName = "classData";

function createClass({ turmas, setTurmas, turma, setTurma }) {
  console.log("createClass", turma.idTurma);
  function insertNewClass(newId) {
    let newClass = {
      ...options.emptyObjects.turma,
      ano: turma.ano,
      semestre: turma.semestre,
      id: newId,
      idTurma: newId,
    };
    setTurma(newClass);
    setTurmas([...turmas, newClass]);
  }
  insertNewClass(123);
  // defaultDBCreate(itemName, turma)
  //   .then(insertNewClass)
  //   .catch(defaultHandleError);
}

function readClass({ setTurma, setTurmas, turma, turmas }) {
  function insertNewClassesFromDB(dataFromDB) {
    function getIndexFromCurrentClass(currentClass) {
      /* percorra a lista de salas, encontre a sala que tenha o mesmo id, e retorne o índice dessa turma */
      const index = turmas.findIndex(
        (turma) => turma.idTurma === currentClass.idTurma
      );

      return index == -1 ? 0 : index;
    }
    const index = getIndexFromCurrentClass(turma);
    const lastItem = dataFromDB[dataFromDB.length - 1];
    const currentClass = dataFromDB?.[index] ?? lastItem;
    setTurma(currentClass);
    setTurmas(dataFromDB);
  }

  defaultDBRead(itemName)
    .then(insertNewClassesFromDB)
    .catch(defaultHandleError);
}

function updateClass(classStates) {
  console.log("updateClass", classStates.turma.idTurma);
}

function deleteClass(classStates) {
  const { classes, setClasses, classItem, setClassItem } = classStates;
  const idToDelete = classItem?.id ?? classItem?.idTurma;

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

  function deleteItemOnList(itemToDelete, itemsToDeleteFrom) {
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

  deleteItemOnList(classItem, classes);

  /* defaultDBDelete(itemName, classItem)
    .then(deleteItemOnList)
    .catch(defaultHandleError); */
}

export { createClass, readClass, updateClass, deleteClass };
