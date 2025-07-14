import { useEffect, useState } from "react";
import emptyObjects from "../config/emptyObjects";
import { getDefaultYearSemesterValues } from "./auxFunctions";
import { readRoom } from "./CRUDFunctions/roomCRUD";
import { readSubject } from "./CRUDFunctions/subjectCRUD";
import { readProfessor } from "./CRUDFunctions/professorCRUD";
import configInfo from "../config/configInfo";

const isDebugging = configInfo.isDebugging;

function getId(item) {
  const id =
    item?.id ?? item?.idHorario ?? item?.idClassTime ?? item?.idTurma ?? null;
  if (id === null) {
    isDebugging && console.log("No id found:", item);
  }
  return id;
}

function getStatusCode(item) {
  const statusCode = item?.statusCode ?? item?.status ?? null;
  return statusCode;
}

function getItemFromListById(item, items) {
  const idItem = getId(item);
  const foundItem = items.find((iterItem) => {
    const idIterItem = getId(iterItem);
    const hasSameId = idIterItem === idItem;
    return hasSameId;
  });
  return foundItem;
}

function getItemIndexInListById(item, oldArray) {
  // traverse list of items, find item with same id, and return index of that item. If not found, returns -1.
  const idItem = getId(item);
  const index = oldArray?.findIndex((iterItem) => {
    const idIterItem = getId(iterItem);
    const hasSameId = idIterItem === idItem;
    return hasSameId;
  });
  return index;
}

function replaceNewItemInListById(newItem, oldArray) {
  const idNewItem = getId(newItem);
  const newArray = oldArray.map((iterItem) => {
    const idIterItem = getId(iterItem);
    const hasSameId = idIterItem === idNewItem;
    return hasSameId ? newItem : iterItem;
  });
  return newArray;
}

function removeItemInListById(item, oldArray) {
  const idItem = getId(item);
  const newArray = oldArray.filter((iterItem) => {
    const idIterItem = getId(iterItem);
    const hasSameId = idIterItem === idItem;
    return !hasSameId;
  });
  return newArray;
}

function getDefaultClassItem(year, semester) {
  const defaultYearSemester = getDefaultYearSemesterValues();

  const defaultClassItem = {
    ...emptyObjects.classItem,
    ano: year ?? defaultYearSemester.year,
    semestre: semester ?? defaultYearSemester.semester,
  };

  return defaultClassItem;
}

function getDefaultClassItemFilter() {
  const defaultClassItemFilter = {
    ...getDefaultClassItem(),
    expectedSemester: 14,
  };
  return defaultClassItemFilter;
}

function getDefaultClassTime(year, semester) {
  const defaultYearSemester = getDefaultYearSemesterValues();

  const defaultClassTime = {
    ...emptyObjects.classTime,
    ano: year ?? defaultYearSemester.year,
    semestre: semester ?? defaultYearSemester.semester,
  };

  return defaultClassTime;
}

function refreshShownItem(item, oldItems, newItems) {
  const indexInNew = getItemIndexInListById(item, newItems);
  const indexInOld = getItemIndexInListById(item, oldItems);

  let showedItem = null;

  // isDebugging && console.log("item", item);
  // isDebugging && console.log("indexInNew", indexInNew, newItems);
  // isDebugging && console.log("indexInOld", indexInOld, oldItems);

  if (indexInNew !== -1) {
    // READING
    // isDebugging && console.log("keepCurrent");
    // The current item is in the new list, so keep it
    showedItem = newItems[indexInNew] ?? null;
  } else if (indexInOld !== -1 && newItems.length > 0) {
    // DELETING
    // isDebugging && console.log("keepLast|First|Middle");
    if (indexInOld >= newItems.length) {
      // isDebugging && console.log("keepLast");
      // The current item is above the new items limit, so keep the last
      showedItem = newItems[newItems.length - 1]; //Get Last item
    } else if (indexInOld === 0) {
      // isDebugging && console.log("keepFirst");
      // The current item is below the new items limit, so keep the first
      showedItem = newItems[0]; //Get First item
    } else {
      // isDebugging && console.log("keepMiddle");
      // The current item is in the middle of the new items, so keep the previous
      showedItem = newItems[indexInOld - 1]; // Get Previous item
    }
  } else {
    // CREATING
    // isDebugging && console.log("Doing Nothing?");
  }

  return showedItem;
}

function getSelectStates() {
  const [professors, setProfessors] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [rooms, setRooms] = useState([]);

  const professorStates = {
    professors,
    setProfessors,
    professor: {},
    setProfessor: () => {},
  };
  const subjectStates = {
    subjects,
    setSubjects,
    subject: {},
    setSubject: () => {},
  };
  const roomStates = {
    rooms,
    setRooms,
    room: {},
    setRoom: () => {},
  };

  useEffect(() => {
    readRoom(roomStates);
    readSubject(subjectStates);
    readProfessor(professorStates);
  }, []);

  const selectStates = { professorStates, subjectStates, roomStates };

  return selectStates;
}

export {
  // replaceNewClassTimeInList,
  // replaceNewClassItemInList,
  getDefaultClassItemFilter, // MultiClasses and CCTable Filters
  refreshShownItem,
  getItemFromListById, // Room Select
  getItemIndexInListById, // Read
  replaceNewItemInListById, // Update
  removeItemInListById, // Delete
  getDefaultClassItem, // CreateClass
  getDefaultClassTime, // CreateClass
  getId, // Many places
  getSelectStates, // Everywhere that needs DB select values
  getStatusCode, // defaultAxiosFunctions
};
