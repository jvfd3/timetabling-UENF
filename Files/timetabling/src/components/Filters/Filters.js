import "./Filters.css";
import myStyles from "../../config/myStyles";
import { useEffect, useState } from "react";
import { readRoom } from "../../helpers/CRUDFunctions/roomCRUD";
import { readSubject } from "../../helpers/CRUDFunctions/subjectCRUD";
import { readProfessor } from "../../helpers/CRUDFunctions/professorCRUD";
import { getDefaultYearSemesterValues } from "../../helpers/auxFunctions";
import {
  refreshShownItem,
  getDefaultClassItem,
  getDefaultClassTime,
} from "../../helpers/auxCRUD";
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

function FilterYear(filterYearStates) {
  // console.log("filterYearStates", filterYearStates);
  return (
    <div className={filterStyles.item}>
      Ano:
      <SelectFilterYear {...filterYearStates} />
    </div>
  );
}

function FilterSemester(filterSemesterStates) {
  return (
    <div className={filterStyles.item}>
      Semestre:
      <SelectFilterSemester {...filterSemesterStates} />
    </div>
  );
}

function FilterDay(filterDayStates) {
  return (
    <div className={filterStyles.item}>
      Dia:
      <SelectFilterDay {...filterDayStates} />
    </div>
  );
}

function FilterHour(filterHourStates) {
  return (
    <div className={filterStyles.item}>
      Hora:
      <SelectFilterHour {...filterHourStates} />
    </div>
  );
}

function FilterExpectedSemester(filterExpectedSemesterStates) {
  return (
    <div className={filterStyles.item}>
      Semestre Esperado:
      <SelectFilterExpectedSemester {...filterExpectedSemesterStates} />
    </div>
  );
}

function FilterSubject(filterSubjectStates) {
  return (
    <div className={filterStyles.item}>
      Disciplina:
      <SelectFilterSubject {...filterSubjectStates} />
    </div>
  );
}

function FilterProfessor(filterProfessorStates) {
  return (
    <div className={filterStyles.item}>
      Professor:
      <SelectFilterProfessor {...filterProfessorStates} />
    </div>
  );
}

function FilterRoom(filterRoomStates) {
  return (
    <div className={filterStyles.item}>
      Sala:
      <SelectFilterRoom {...filterRoomStates} />
    </div>
  );
}

function MultiClassesFilters({ classTimeStates, classStates }) {
  const { classTimes, setFilteredClassTimes, setClassTime } = classTimeStates;
  const { classes, setFilteredClasses, setClassItem } = classStates;

  const defaultYearSemester = getDefaultYearSemesterValues();

  const [year, setYear] = useState(defaultYearSemester.year);
  const [semester, setSemester] = useState(defaultYearSemester.semester);

  const props = {
    year: { year, setYear },
    semester: { semester, setSemester },
  };

  function filterList(list, year, semester) {
    let filteredList = list;
    filteredList = filterYear(filteredList, year);
    filteredList = filterSemester(filteredList, semester);
    return filteredList;
  }

  const defaultClassItem = getDefaultClassItem(year, semester);
  const defaultClassTime = getDefaultClassTime(year, semester);

  const statesToWatchFor = [year, semester, classes];

  function updateOuterStates() {
    const filteredClassTimes = filterList(classTimes, year, semester);
    const filteredClasses = filterList(classes, year, semester);

    const newClassTime = filteredClassTimes?.[0] ?? defaultClassItem;
    const newClassItem = filteredClasses?.[0] ?? defaultClassTime;
    // const message = `Turmas: ${filteredClasses.length}`;
    // const yearValue = year?.value ?? year;
    // const semesterValue = semester?.value ?? semester;
    // const finalMessage = `${yearValue}-${semesterValue}: ${message}`;
    // console.log(finalMessage);

    setFilteredClassTimes(filteredClassTimes);
    setFilteredClasses(filteredClasses);
    setClassTime(newClassTime);
    setClassItem(newClassItem);
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

  const statesToWatchFor = [year, semester, day, hour, classTimes];

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
  CCTableFilters,
  ClassesFilters,
  ViewTableFilters,
};
