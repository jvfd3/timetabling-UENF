import options from "../../DB/local/options";
import {
  defaultDBCreate,
  defaultDBRead,
  defaultDBUpdate,
  defaultDBDelete,
  defaultHandleError,
} from "../../DB/AWS/defaultAxiosFunctions";
import {
  getId,
  keepOldItem,
  removeItemInListById,
  getItemIndexInListById,
  replaceNewItemInListById,
} from "../auxCRUD";

const itemName = "classData";

function createClass(createClassStates) {
  const { classes, setClasses, classItem, setClassItem, year, semester } =
    createClassStates;

  function getNewClassItem(newId) {
    const emptyClass = options.emptyObjects.classItem;
    const newClass = {
      ...emptyClass,
      ano: year ?? classItem?.ano,
      semestre: semester ?? classItem?.semestre,
      disciplina: classItem?.disciplina ?? null,
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

  defaultDBCreate(itemName, classItem)
    .then(insertNewClass)
    .catch(defaultHandleError);
}

function readClass({ setClasses, classItem, setClassItem }) {
  function insertNewClassesFromDB(dataFromDB) {
    const showedClassItem = keepOldItem(classItem, dataFromDB);
    setClassItem(showedClassItem);
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
      const index = getItemIndexInListById(classToDelete, classes);
      let newItem = null;
      if (index > 0) {
        newItem = classes[index - 1];
      } else if (filteredClasses.length > 0) {
        newItem = classes[0];
      } else {
        const errorMessage =
          "deleteClass: Não há mais classes para serem exibidas na lista";
        console.error(errorMessage);
      }
      setClassItem(newItem);
      setClasses(filteredClasses);
    }
  }

  // deleteItemOnList(classItem, classes);
  classItem.id = getId(classItem);
  defaultDBDelete(itemName, classItem)
    .then(deleteClassOnList)
    .catch(defaultHandleError);
}

export { createClass, readClass, updateClass, deleteClass };
