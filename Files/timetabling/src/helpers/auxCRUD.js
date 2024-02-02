import options from "../DB/local/options";
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
    ...options.emptyObjects.classItem,
    ano: year ?? defaultYearSemester.year,
    semestre: semester ?? defaultYearSemester.semester,
  };

  return defaultClassItem;
}

function getDefaultClassTime(year, semester) {
  const defaultYearSemester = getDefaultYearSemesterValues();

  const defaultClassTime = {
    ...options.emptyObjects.classTime,
    ano: year ?? defaultYearSemester.year,
    semestre: semester ?? defaultYearSemester.semester,
  };

  return defaultClassTime;
}

function keepOldItem(item, items) {
  /*
  // Deletion case - use this to keep the previous item
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
  */

  const index = getItemIndexInListById(item, items);
  const keepCurrentItem = items?.[index];
  const previous = items?.[index - 1];
  const next = items?.[index + 1];
  const lastItem = items?.[items.length - 1];
  const firstItem = items?.[0];

  const debug = {
    curr: getId(item),
    kept: getId(keepCurrentItem),
    prev: getId(previous),
    next: getId(next),
    last: getId(lastItem),
    frst: getId(firstItem),
  };

  console.log(debug);

  const showedItem =
    keepCurrentItem ?? previous ?? next ?? lastItem ?? firstItem ?? null;
  return showedItem;
}

export {
  // replaceNewClassTimeInList,
  // replaceNewClassItemInList,
  keepOldItem,
  getItemFromListById, // Room Select
  getItemIndexInListById, // Read
  replaceNewItemInListById, // Update
  removeItemInListById, // Delete
  getDefaultClassItem, // CreateClass
  getDefaultClassTime, // CreateClass
  getId, // Many places
};
