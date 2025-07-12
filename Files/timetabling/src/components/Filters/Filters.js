import "./Filters.css";
import text from "../../config/frontText";
import myStyles from "../../config/myStyles";
import emptyObjects from "../../config/emptyObjects";
import { useEffect, useState } from "react";
import { splitTurmas } from "../../helpers/conflicts/auxConflictFunctions";
import { refreshShownItem } from "../../helpers/auxCRUD";
import {
  getDefaultYearSemesterValues,
  getValueFromDataWithPropArray,
} from "../../helpers/auxFunctions";
import {
  filterDay,
  filterYear,
  filterHour,
  filterRoom,
  filterSubject,
  filterSemester,
  filterProfessor,
  filterExpectedSemester,
} from "../../helpers/filteringFunc";
import {
  SelectFilterDay,
  SelectFilterYear,
  SelectFilterHour,
  SelectFilterRoom,
  SelectFilterSubject,
  SelectFilterSemester,
  SelectFilterProfessor,
  SelectFilterExpectedSemester,
} from "../mySelects";

const filterStyles = myStyles.classNames.local.component.filters;
const frontText = text.component.filters;

function FilterYear({ setClassItemFilter }) {
  const defaultYearSemester = getDefaultYearSemesterValues();
  const [year, setYear] = useState(defaultYearSemester.year);
  const filterYearStates = { year, setYear };

  useEffect(() => {
    setClassItemFilter((prevClassItemFilter) => ({
      ...prevClassItemFilter,
      ano: year,
    }));
  }, [year]);

  return (
    <div className={filterStyles.item}>
      {frontText.year}
      <SelectFilterYear {...filterYearStates} />
    </div>
  );
}

function FilterSemester({ setClassItemFilter }) {
  const defaultYearSemester = getDefaultYearSemesterValues();
  const [semester, setSemester] = useState(defaultYearSemester.semester);
  const filterSemesterStates = { semester, setSemester };

  useEffect(() => {
    setClassItemFilter((prevClassItemFilter) => ({
      ...prevClassItemFilter,
      semestre: semester,
    }));
  }, [semester]);

  return (
    <div className={filterStyles.item}>
      {frontText.semester}
      <SelectFilterSemester {...filterSemesterStates} />
    </div>
  );
}

function FilterExpectedSemester({ classItemFilter, setClassItemFilter }) {
  const defaultSemester = classItemFilter?.expectedSemester;
  const [expectedSemester, setExpectedSemester] = useState(defaultSemester);
  const filterExpectedSemesterStates = {
    expectedSemester,
    setExpectedSemester,
  };

  function updateClassItemFilter() {
    setClassItemFilter((prevClassItemFilter) => ({
      ...prevClassItemFilter,
      expectedSemester: expectedSemester,
    }));
  }

  useEffect(() => {
    updateClassItemFilter();
  }, [expectedSemester]);

  return (
    <div className={filterStyles.item}>
      {frontText.expectedCategory}
      <SelectFilterExpectedSemester {...filterExpectedSemesterStates} />
    </div>
  );
}

function FilterSubject({ setClassItemFilter, subjectStates }) {
  const [subject, setSubject] = useState(null);
  const filterSubjectStates = { ...subjectStates, subject, setSubject };

  useEffect(() => {
    setClassItemFilter((prevClassItemFilter) => ({
      ...prevClassItemFilter,
      disciplina: subject,
    }));
  }, [subject]);

  return (
    <div className={filterStyles.item}>
      {frontText.subject}
      <SelectFilterSubject {...filterSubjectStates} />
    </div>
  );
}

function FilterProfessor({ setClassItemFilter, professorStates }) {
  const [professor, setProfessor] = useState(null);
  const filterProfessorStates = { ...professorStates, professor, setProfessor };

  useEffect(() => {
    setClassItemFilter((prevClassItemFilter) => ({
      ...prevClassItemFilter,
      professor: professor,
    }));
  }, [professor]);

  return (
    <div className={filterStyles.item}>
      {frontText.professor}
      <SelectFilterProfessor {...filterProfessorStates} />
    </div>
  );
}

function getClassTimePropValue(prevClassItemFilter, propName, propValue) {
  const oldClassTimeFilter = {
    ...emptyObjects.classTime,
    ...prevClassItemFilter?.horarios?.[0],
  };
  const newPropValue = !propValue ? null : propValue;

  const newClassItemFilter = {
    ...prevClassItemFilter,
    horarios: [{ ...oldClassTimeFilter, [propName]: newPropValue }],
  };

  // console.log(newClassItemFilter);
  return newClassItemFilter;
}

function FilterRoom({ setClassItemFilter, roomStates }) {
  const [room, setRoom] = useState(null);
  const filterRoomStates = { ...roomStates, room, setRoom };
  const propName = "sala";

  useEffect(() => {
    setClassItemFilter((prevClassItemFilter) =>
      getClassTimePropValue(prevClassItemFilter, propName, room)
    );
  }, [room]);

  return (
    <div className={filterStyles.item}>
      {frontText.room}
      <SelectFilterRoom {...filterRoomStates} />
    </div>
  );
}

function FilterDay({ setClassItemFilter }) {
  const [day, setDay] = useState(null);
  const filterDayStates = { day, setDay };

  useEffect(() => {
    setClassItemFilter((prevClassItemFilter) =>
      getClassTimePropValue(prevClassItemFilter, "dia", day)
    );
  }, [day]);

  return (
    <div className={filterStyles.item}>
      {frontText.day}
      <SelectFilterDay {...filterDayStates} />
    </div>
  );
}

function FilterHour({ setClassItemFilter }) {
  const [hour, setHour] = useState(null);
  const filterHourStates = { hour, setHour };

  useEffect(() => {
    setClassItemFilter((prevClassItemFilter) =>
      getClassTimePropValue(prevClassItemFilter, "horaInicio", hour)
    );
  }, [hour]);

  return (
    <div className={filterStyles.item}>
      {frontText.hour}
      <SelectFilterHour {...filterHourStates} />
    </div>
  );
}

function filterClassTimes(classes, filterFunction, filterValue) {
  if (filterValue === null || filterValue === undefined) {
    return classes;
  }

  // Splitted classes are used to filter the classes
  const splittedClasses = splitTurmas(classes);
  // Filter classes based on selected value (null by default)
  const filteredSplittedClasses = filterFunction(splittedClasses, filterValue);
  // Get the ids of the filtered classes
  const filteredIds = filteredSplittedClasses.map(
    (iterSplittedClassItem) => iterSplittedClassItem?.idTurma
  );
  // get the classes that have the filtered ids
  const filteredClasses = classes.filter((iterClassItem) =>
    filteredIds.includes(iterClassItem?.id)
  );

  // const debug = {
  //   classes: classes.length,
  //   splittedClasses: splittedClasses.length,
  //   filteredSplittedClasses: filteredSplittedClasses.length,
  //   filteredClasses: filteredClasses.length,
  //   classesToReturn: classesToReturn.length,
  // };
  // console.log(debug);

  return filteredClasses;
}

function filterClassCategory(classes, expectedSemester) {
  let filtering = classes;

  filtering = filterExpectedSemester(filtering, expectedSemester);
  if (expectedSemester === 14) {
    filtering = classes.filter((iterClass) => {
      const valueToCheck = getValueFromDataWithPropArray(iterClass, [
        ["disciplina"],
        ["periodo"],
      ]);

      const isValidValue = valueToCheck !== null && valueToCheck !== undefined;
      const isCSSubject = valueToCheck <= 12 && isValidValue;

      return isCSSubject;
    });
  }

  return filtering;
}

function MultiClassesFilters(filterStates) {
  const {
    classes,
    selectStates,
    classItemFilter,
    setClassItemFilter,
    setFilteredClasses,
  } = filterStates;

  const filterProps = { ...selectStates, classItemFilter, setClassItemFilter };
  const statesToWatchFor = [classes, classItemFilter];

  function filterList(classList, classItemFilter) {
    const expectedSemester = classItemFilter?.expectedSemester;
    const roomValue = classItemFilter?.horarios?.[0]?.sala;

    let filtering = classList;

    filtering = filterYear(filtering, classItemFilter?.ano);
    filtering = filterSemester(filtering, classItemFilter?.semestre);
    filtering = filterSubject(filtering, classItemFilter?.disciplina);
    filtering = filterProfessor(filtering, classItemFilter?.professor);
    filtering = filterClassCategory(filtering, expectedSemester);
    filtering = filterClassTimes(filtering, filterRoom, roomValue);

    return filtering;
  }

  function updateOuterStates() {
    const newFilteredClasses = filterList(classes, classItemFilter);
    setFilteredClasses(newFilteredClasses);
  }

  useEffect(() => {
    updateOuterStates();
  }, statesToWatchFor);

  return (
    <div className={filterStyles.block}>
      <FilterYear {...filterProps} />
      <FilterSemester {...filterProps} />
      <FilterExpectedSemester {...filterProps} />
      <FilterSubject {...filterProps} />
      <FilterProfessor {...filterProps} />
      <FilterRoom {...filterProps} />
    </div>
  );
}

function ClassesFilters(classStates) {
  const {
    classItem,
    setClassItem,
    classes,
    setFilteredClasses,
    classItemFilter,
    setClassItemFilter,
  } = classStates;

  const filterProps = { setClassItemFilter };
  const statesToWatchFor = [classes, classItemFilter, classItem];

  function filterList(classList, classItemFilter) {
    let filtering = classList;

    filtering = filterYear(filtering, classItemFilter?.ano);
    filtering = filterSemester(filtering, classItemFilter?.semestre);

    return filtering;
  }

  useEffect(() => {
    const newFilteredClasses = filterList(classes, classItemFilter);
    setFilteredClasses((oldFilteredClasses) => {
      setClassItem((oldClassItem) => {
        const newClassItem = refreshShownItem(
          oldClassItem,
          oldFilteredClasses,
          newFilteredClasses
        );
        return newClassItem;
      });
      return newFilteredClasses;
    });
  }, statesToWatchFor);

  return (
    <div className={filterStyles.block}>
      <FilterYear {...filterProps} />
      <FilterSemester {...filterProps} />
    </div>
  );
}

function ViewTableFilters(filterStates) {
  const {
    classes,
    classItemFilter,
    setClassItemFilter,
    setFilteredClasses,
    baseFilter,
    baseValueToFilter,
  } = filterStates;
  // console.log(baseFilter, baseValueToFilter);

  const filterProps = { setClassItemFilter };
  const statesToWatchFor = [classes, classItemFilter, baseValueToFilter];

  function filterList(classList, classItemFilter) {
    const dayValue = classItemFilter?.horarios?.[0]?.dia;
    const hourValue = classItemFilter?.horarios?.[0]?.horaInicio;

    let filtering = classList;

    filtering = filterYear(filtering, classItemFilter?.ano);
    filtering = filterSemester(filtering, classItemFilter?.semestre);

    filtering = filterClassTimes(filtering, filterDay, dayValue);
    filtering = filterClassTimes(filtering, filterHour, hourValue);
    filtering = filterClassTimes(filtering, baseFilter, baseValueToFilter);

    return filtering;
  }

  function updateOuterStates() {
    const newFilteredClasses = filterList(classes, classItemFilter);
    setFilteredClasses(newFilteredClasses);
  }

  useEffect(() => {
    updateOuterStates();
  }, statesToWatchFor);

  return (
    <div className={filterStyles.block}>
      <FilterYear {...filterProps} />
      <FilterSemester {...filterProps} />
      <FilterDay {...filterProps} />
      <FilterHour {...filterProps} />
    </div>
  );
}

export { MultiClassesFilters, ClassesFilters, ViewTableFilters };
