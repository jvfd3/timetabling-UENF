import "./Filters.css";
import { useEffect, useState } from "react";
import options from "../../DB/local/options";
import {
  filterExpectedSemester,
  filterProfessor,
  filterRoom,
  filterSemester,
  filterYear,
} from "../../helpers/filteringFunc";
import {
  SelectFilterYear,
  SelectFilterSemester,
  SelectFilterProfessor,
  SelectFilterRoom,
  SelectFilterExpectedSemester,
} from "../mySelects";
import { getDefaultYearSemesterValues } from "../../helpers/auxFunctions";
import {
  getDefaultClassItem,
  getDefaultClassTime,
} from "../../helpers/auxCRUD";

function FilterYear(filterYearStates) {
  // console.log("filterYearStates", filterYearStates);
  return (
    <div className="defaultFilterStyle">
      Ano:
      <SelectFilterYear {...filterYearStates} />
    </div>
  );
}

function FilterSemester(filterSemesterStates) {
  return (
    <div className="defaultFilterStyle">
      Semestre:
      <SelectFilterSemester {...filterSemesterStates} />
    </div>
  );
}

function FilterProfessor(filterProfessorStates) {
  return (
    <div className="defaultFilterStyle">
      Professor:
      <SelectFilterProfessor {...filterProfessorStates} />
    </div>
  );
}

function FilterRoom(filterRoomStates) {
  return (
    <div className="defaultFilterStyle">
      Sala:
      <SelectFilterRoom {...filterRoomStates} />
    </div>
  );
}

function FilterExpectedSemester(filterExpectedSemesterStates) {
  return (
    <div className="defaultFilterStyle">
      Semestre Esperado:
      <SelectFilterExpectedSemester {...filterExpectedSemesterStates} />
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
  }, [year, semester, classes]);

  return (
    <div className="MultiClassesFilters">
      <FilterYear {...props.year} />
      <FilterSemester {...props.semester} />
    </div>
  );
}

function CCTableFilters(globalStates) {
  const { classTimeStates, selectStates } = globalStates;
  const { classTimes, setFilteredClassTimes, setClassTime } = classTimeStates;
  const { professors, subjects, rooms } = selectStates;

  const years = options.constantValues.years;
  const yearIndex = options.config.defaultIndexes.year;
  const semesters = options.constantValues.semesters;
  const semesterIndex = options.config.defaultIndexes.semester;

  const [year, setYear] = useState(years[yearIndex]);
  const [semester, setSemester] = useState(semesters[semesterIndex]);
  const [professor, setProfessor] = useState(null);
  const [room, setRoom] = useState(null);
  const [expectedSemester, setExpectedSemester] = useState(null);

  const props = {
    year: { year, setYear },
    semester: { semester, setSemester },
    professor: { professors, professor, setProfessor },
    room: { rooms, room, setRoom },
    expectedSemester: { expectedSemester, setExpectedSemester },
  };

  useEffect(() => {
    let filtering = classTimes;
    filtering = filterYear(filtering, year);
    filtering = filterSemester(filtering, semester);
    filtering = filterProfessor(filtering, professor);
    filtering = filterRoom(filtering, room);
    filtering = filterExpectedSemester(filtering, expectedSemester);
    setFilteredClassTimes(filtering);
  }, [year, semester, professor, room, expectedSemester, classTimes]);

  return (
    <div className="CCTableFilters">
      <FilterYear {...props.year} />
      <FilterSemester {...props.semester} />
      <FilterProfessor {...props.professor} />
      <FilterRoom {...props.room} />
      <FilterExpectedSemester {...props.expectedSemester} />
    </div>
  );
}

function ClassesFilters(classStates) {
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

  useEffect(() => {
    let filteredClasses = filterList(classes, year, semester);
    let newClassItem = filteredClasses?.[0];
    setFilteredClasses(filteredClasses);
    setClassItem(newClassItem);
  }, [year, semester, classes]);

  return (
    <div className="ClassesFilters">
      <FilterYear {...props.year} />
      <FilterSemester {...props.semester} />
    </div>
  );
}

function RoomsFilters(classTimeStates) {
  const { classTimes, setFilteredClassTimes, room } = classTimeStates;
  // console.log("classTimes", classTimes.length);

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
    filteredList = filterRoom(filteredList, room);

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
  }, [year, semester, classTimes]);

  return (
    <div className="MultiClassesFilters">
      <FilterYear {...props.year} />
      <FilterSemester {...props.semester} />
    </div>
  );
}

export { MultiClassesFilters, CCTableFilters, ClassesFilters, RoomsFilters };
