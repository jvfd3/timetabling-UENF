import "./Filters.css";
import text from "../../config/frontText";
import myStyles from "../../config/myStyles";
import emptyObjects from "../../config/emptyObjects";
import { useEffect, useState } from "react";
import { readRoom } from "../../helpers/CRUDFunctions/roomCRUD";
import { readSubject } from "../../helpers/CRUDFunctions/subjectCRUD";
import { splitTurmas } from "../../helpers/conflicts/auxConflictFunctions";
import { readProfessor } from "../../helpers/CRUDFunctions/professorCRUD";
import { refreshShownItem } from "../../helpers/auxCRUD";
import { getDefaultYearSemesterValues } from "../../helpers/auxFunctions";
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

function FilterYear(filterYearStates) {
  return (
    <div className={filterStyles.item}>
      {frontText.year}
      <SelectFilterYear {...filterYearStates} />
    </div>
  );
}

function FilterYear2({ setClassItemFilter }) {
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

function FilterSemester(filterSemesterStates) {
  return (
    <div className={filterStyles.item}>
      {frontText.semester}
      <SelectFilterSemester {...filterSemesterStates} />
    </div>
  );
}

function FilterSemester2({ setClassItemFilter }) {
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

function FilterDay(filterDayStates) {
  return (
    <div className={filterStyles.item}>
      {frontText.day}
      <SelectFilterDay {...filterDayStates} />
    </div>
  );
}

function FilterHour(filterHourStates) {
  return (
    <div className={filterStyles.item}>
      {frontText.hour}
      <SelectFilterHour {...filterHourStates} />
    </div>
  );
}

function FilterExpectedSemester(filterExpectedSemesterStates) {
  return (
    <div className={filterStyles.item}>
      {frontText.expectedSemester}
      <SelectFilterExpectedSemester {...filterExpectedSemesterStates} />
    </div>
  );
}

function FilterExpectedSemester2({ setClassItemFilter }) {
  const [expectedSemester, setExpectedSemester] = useState(1);
  const filterExpectedSemesterStates = {
    expectedSemester,
    setExpectedSemester,
  };

  useEffect(() => {
    setClassItemFilter((prevClassItemFilter) => ({
      ...prevClassItemFilter,
      expectedSemester: expectedSemester,
    }));
  }, [expectedSemester]);

  return (
    <div className={filterStyles.item}>
      {frontText.expectedSemester}
      <SelectFilterExpectedSemester {...filterExpectedSemesterStates} />
    </div>
  );
}

function FilterSubject(filterSubjectStates) {
  return (
    <div className={filterStyles.item}>
      {frontText.subject}
      <SelectFilterSubject {...filterSubjectStates} />
    </div>
  );
}

function FilterSubject2({ setClassItemFilter }) {
  const [subject, setSubject] = useState(null);
  const filterSubjectStates = { subject, setSubject };

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

function FilterProfessor(filterProfessorStates) {
  return (
    <div className={filterStyles.item}>
      {frontText.professor}
      <SelectFilterProfessor {...filterProfessorStates} />
    </div>
  );
}

function FilterProfessor2({ setClassItemFilter, professors }) {
  const [professor, setProfessor] = useState(null);
  const filterProfessorStates = { professor, setProfessor, professors };

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

function FilterRoom(filterRoomStates) {
  return (
    <div className={filterStyles.item}>
      {frontText.room}
      <SelectFilterRoom {...filterRoomStates} />
    </div>
  );
}

function FilterRoom2({ setClassItemFilter, rooms }) {
  const [room, setRoom] = useState(null);
  const filterRoomStates = { room, setRoom, rooms };

  useEffect(() => {
    setClassItemFilter((prevClassItemFilter) => ({
      ...prevClassItemFilter,
      horarios: room
        ? [
            {
              ...emptyObjects.classTime,
              sala: { ...room },
            },
          ]
        : [],
    }));
  }, [room]);

  return (
    <div className={filterStyles.item}>
      {frontText.room}
      <SelectFilterRoom {...filterRoomStates} />
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

  /*
  const debug = {
    classes: classes.length,
    splittedClasses: splittedClasses.length,
    filteredSplittedClasses: filteredSplittedClasses.length,
    filteredClasses: filteredClasses.length,
    classesToReturn: classesToReturn.length,
  };
  console.log(debug);
  */
  return filteredClasses;
}

function MultiClassesFilters(globalStates) {
  const { classTimeStates, classStates, selectStates } = globalStates;
  // const { classTimes, setFilteredClassTimes, setClassTime } = classTimeStates;
  const { classes, setFilteredClasses, setClassItem } = classStates;
  const { professors, subjects, rooms } = selectStates;

  const defaultYearSemester = getDefaultYearSemesterValues();

  const [year, setYear] = useState(defaultYearSemester.year);
  const [semester, setSemester] = useState(defaultYearSemester.semester);
  const [expectedSemester, setExpectedSemester] = useState(null);
  const [professor, setProfessor] = useState(null);
  const [subject, setSubject] = useState(null);
  const [room, setRoom] = useState(null);
  const statesToWatchFor = [
    year,
    room,
    subject,
    classes,
    semester,
    professor,
    expectedSemester,
  ];

  const props = {
    year: { year, setYear },
    room: { rooms, room, setRoom },
    semester: { semester, setSemester },
    subject: { subjects, subject, setSubject },
    professor: { professors, professor, setProfessor },
    expectedSemester: { expectedSemester, setExpectedSemester },
  };

  function filterList(list, year, semester) {
    let filteredList = list;

    filteredList = filterYear(filteredList, year);
    filteredList = filterSemester(filteredList, semester);
    filteredList = filterSubject(filteredList, subject);
    filteredList = filterProfessor(filteredList, professor);
    filteredList = filterClassTimes(filteredList, filterRoom, room);
    filteredList = filterExpectedSemester(filteredList, expectedSemester);

    return filteredList;
  }

  function updateClassItem(year, semester, professor, subject, room) {
    const newClassItem = {
      ...emptyObjects.classItem,
      ano: year,
      semestre: semester,
      professor: professor,
      disciplina: subject,
      horarios: room
        ? [
            {
              ...emptyObjects.classTime,
              sala: { ...room },
            },
          ]
        : [],
    };
    setClassItem(newClassItem);
  }

  function updateOuterStates() {
    const filteredClasses = filterList(classes, year, semester);
    setFilteredClasses(filteredClasses);
    updateClassItem(year, semester, professor, subject, room);
  }

  useEffect(() => {
    updateOuterStates();
  }, []);

  useEffect(() => {
    updateOuterStates();
  }, statesToWatchFor);

  return (
    <div className={filterStyles.block}>
      <FilterYear {...props.year} />
      <FilterSemester {...props.semester} />
      <FilterSubject {...props.subject} />
      <FilterExpectedSemester {...props.expectedSemester} />
      <FilterProfessor {...props.professor} />
      <FilterRoom {...props.room} />
    </div>
  );
}

function MultiClassesFilters2(filterStates) {
  const {
    setFilteredClasses,
    setClassItemFilter,
    classItemFilter,
    classes,
    selectStates,
  } = filterStates;

  const filterProps = { ...selectStates, setClassItemFilter };
  const statesToWatchFor = [classes, classItemFilter];

  function filterList(classList, classItemFilter) {
    let filteredList = classList;

    const room = classItemFilter?.horarios?.[0]?.sala;
    const expectedSemester = classItemFilter?.expectedSemester;

    filteredList = filterYear(filteredList, classItemFilter?.ano);
    filteredList = filterSemester(filteredList, classItemFilter?.semestre);
    filteredList = filterSubject(filteredList, classItemFilter?.disciplina);
    filteredList = filterProfessor(filteredList, classItemFilter?.professor);
    filteredList = filterClassTimes(filteredList, filterRoom, room);
    filteredList = filterExpectedSemester(filteredList, expectedSemester);

    return filteredList;
  }

  function updateOuterStates() {
    const filteredClasses = filterList(classes, classItemFilter);
    setFilteredClasses(filteredClasses);
  }

  useEffect(() => {
    updateOuterStates();
  }, statesToWatchFor);

  return (
    <div className={filterStyles.block}>
      <FilterYear2 {...filterProps} />
      <FilterSemester2 {...filterProps} />
      <FilterSubject2 {...filterProps} />
      <FilterExpectedSemester2 {...filterProps} />
      <FilterProfessor2 {...filterProps} />
      <FilterRoom2 {...filterProps} />
    </div>
  );
}

function CCTableFilters(classTimeStates) {
  const { classTimes, setFilteredClassTimes, setClassTime } = classTimeStates;

  const defaultYearSemester = getDefaultYearSemesterValues();

  const [year, setYear] = useState(defaultYearSemester.year);
  const [semester, setSemester] = useState(defaultYearSemester.semester);

  const [subjects, setSubjects] = useState([]);
  const [professors, setProfessors] = useState([]);
  const [rooms, setRooms] = useState([]);

  const [subject, setSubject] = useState(null);
  const [expectedSemester, setExpectedSemester] = useState(null);
  const [professor, setProfessor] = useState(null);
  const [room, setRoom] = useState(null);

  const selectStates = {
    professors,
    setProfessors,
    professor: {},
    setProfessor: () => {},
    subjects,
    setSubjects,
    subject: {},
    setSubject: () => {},
    rooms,
    setRooms,
    room: {},
    setRoom: () => {},
  };

  const props = {
    year: { year, setYear },
    semester: { semester, setSemester },
    expectedSemester: { expectedSemester, setExpectedSemester },
    subject: { subjects, subject, setSubject },
    professor: { professors, professor, setProfessor },
    room: { rooms, room, setRoom },
  };

  const statesToWatchFor = [
    year,
    semester,
    expectedSemester,
    subject,
    professor,
    room,
    classTimes,
  ];

  function filterList(list) {
    let filtering = list;

    filtering = filterYear(filtering, year);
    filtering = filterSemester(filtering, semester);
    filtering = filterSubject(filtering, subject);
    filtering = filterExpectedSemester(filtering, expectedSemester);
    filtering = filterProfessor(filtering, professor);
    filtering = filterRoom(filtering, room);

    return filtering;
  }

  function updateOuterStates() {
    const filteredClassTimes = filterList(classTimes);
    setFilteredClassTimes(filteredClassTimes);
  }

  useEffect(() => {
    readRoom(selectStates);
    readProfessor(selectStates);
    readSubject(selectStates);
    updateOuterStates();
  }, []);

  useEffect(() => {
    updateOuterStates();
  }, statesToWatchFor);

  return (
    <div className={filterStyles.block}>
      <FilterYear {...props.year} />
      <FilterSemester {...props.semester} />
      <FilterSubject {...props.subject} />
      <FilterExpectedSemester {...props.expectedSemester} />
      <FilterProfessor {...props.professor} />
      <FilterRoom {...props.room} />
    </div>
  );
}

function ClassesFilters(classStates) {
  const { classes, setFilteredClasses, setClassItem, classItem } = classStates;

  const defaultYearSemester = getDefaultYearSemesterValues();

  const [year, setYear] = useState(defaultYearSemester.year);
  const [semester, setSemester] = useState(defaultYearSemester.semester);

  const props = {
    year: { year, setYear },
    semester: { semester, setSemester },
  };

  const statesToWatchFor = [year, semester, classes];

  function filterList(list, year, semester) {
    let filteredList = list;

    filteredList = filterYear(filteredList, year);
    filteredList = filterSemester(filteredList, semester);

    return filteredList;
  }

  useEffect(() => {
    const filteredClasses = filterList(classes, year, semester);
    setFilteredClasses(filteredClasses);

    const newClassItem = refreshShownItem(classItem, classes, filteredClasses);
    setClassItem(newClassItem);
  }, statesToWatchFor);

  return (
    <div className={filterStyles.block}>
      <FilterYear {...props.year} />
      <FilterSemester {...props.semester} />
    </div>
  );
}

function ViewTableFilters(classTimeStates) {
  const { classTimes, setFilteredClassTimes, baseFilter, baseValueToFilter } =
    classTimeStates;
  // console.log("classTimes", classTimes.length);

  const defaultYearSemester = getDefaultYearSemesterValues();

  const [year, setYear] = useState(defaultYearSemester.year);
  const [semester, setSemester] = useState(defaultYearSemester.semester);
  const [day, setDay] = useState(null);
  const [hour, setHour] = useState(null);

  const props = {
    year: { year, setYear },
    semester: { semester, setSemester },
    day: { day, setDay },
    hour: { hour, setHour },
  };

  const statesToWatchFor = [
    year,
    semester,
    day,
    hour,
    classTimes,
    baseValueToFilter,
  ];

  function filterList(list, year, semester) {
    let filteredList = list;

    filteredList = filterYear(filteredList, year);
    filteredList = filterSemester(filteredList, semester);
    filteredList = baseFilter(filteredList, baseValueToFilter);
    filteredList = filterDay(filteredList, day);
    filteredList = filterHour(filteredList, hour);

    return filteredList;
  }

  function updateOuterStates() {
    const filteredClassTimes = filterList(classTimes, year, semester);
    setFilteredClassTimes(filteredClassTimes);
  }

  useEffect(() => {
    updateOuterStates();
  }, []);

  useEffect(() => {
    updateOuterStates();
  }, statesToWatchFor);

  return (
    <div className={filterStyles.block}>
      <FilterYear {...props.year} />
      <FilterSemester {...props.semester} />
      <FilterDay {...props.day} />
      <FilterHour {...props.hour} />
    </div>
  );
}

export {
  MultiClassesFilters,
  MultiClassesFilters2,
  CCTableFilters,
  ClassesFilters,
  ViewTableFilters,
};
