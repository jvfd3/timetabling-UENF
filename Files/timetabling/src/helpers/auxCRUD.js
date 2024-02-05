import emptyObjects from "../config/emptyObjects";
import { getDefaultYearSemesterValues } from "./auxFunctions";

function getId(item) {
  const id =
    item?.id ?? item?.idHorario ?? item?.idClassTime ?? item?.idTurma ?? null;
  // if (id === null) {
  //   console.log("No id found:", item);
  // }
  return id;
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
  /*
  traverse list of items, find item with same id, and return index of that item. If not found, returns -1.
  */
  const idItem = getId(item);
  const index = oldArray.findIndex((iterItem) => {
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

  // console.log("item", item);
  // console.log("indexInNew", indexInNew, newItems);
  // console.log("indexInOld", indexInOld);

  if (indexInNew !== -1) {
    // READING
    // console.log("keepCurrent");
    // The current item is in the new list, so keep it
    showedItem = newItems[indexInNew];
  } else if (indexInOld !== -1 && newItems.length > 0) {
    // DELETING
    if (indexInOld >= newItems.length) {
      // console.log("keepLast");
      // The current item is above the new items limit, so keep the last
      showedItem = newItems[newItems.length - 1]; //Get Last item
    } else if (indexInOld === 0) {
      // console.log("keepFirst");
      // The current item is below the new items limit, so keep the first
      showedItem = newItems[0]; //Get First item
    } else {
      // console.log("keepMiddle");
      // The current item is in the middle of the new items, so keep the previous
      showedItem = newItems[indexInOld - 1]; // Get Previous item
    }
  }

  return showedItem;
}

export {
  // replaceNewClassTimeInList,
  // replaceNewClassItemInList,
  refreshShownItem,
  getItemFromListById, // Room Select
  getItemIndexInListById, // Read
  replaceNewItemInListById, // Update
  removeItemInListById, // Delete
  getDefaultClassItem, // CreateClass
  getDefaultClassTime, // CreateClass
  getId, // Many places
};
