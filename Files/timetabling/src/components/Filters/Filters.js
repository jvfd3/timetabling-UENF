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
  SelectFilterV2Year,
  SelectFilterV2Semester,
  SelectFilterV2Professor,
  SelectFilterV2Room,
  SelectFilterV2ExpectedSemester,
} from "../mySelects";

function FilterYear(filterYearStates) {
  // console.log("filterYearStates", filterYearStates);
  return (
    <div className="defaultFilterStyle">
      Ano:
      <SelectFilterV2Year {...filterYearStates} />
    </div>
  );
}

function FilterSemester(filterSemesterStates) {
  return (
    <div className="defaultFilterStyle">
      Semestre:
      <SelectFilterV2Semester {...filterSemesterStates} />
    </div>
  );
}

function FilterProfessor(filterProfessorStates) {
  return (
    <div className="defaultFilterStyle">
      Professor:
      <SelectFilterV2Professor {...filterProfessorStates} />
    </div>
  );
}

function FilterRoom(filterRoomStates) {
  return (
    <div className="defaultFilterStyle">
      Sala:
      <SelectFilterV2Room {...filterRoomStates} />
    </div>
  );
}

function FilterExpectedSemester(filterExpectedSemesterStates) {
  return (
    <div className="defaultFilterStyle">
      Semestre Esperado:
      <SelectFilterV2ExpectedSemester {...filterExpectedSemesterStates} />
    </div>
  );
}

function MultiClassesFilters({ classTimeStates, classStates }) {
  const { classTimes, setFilteredClassTimes, setClassTime } = classTimeStates;
  const { classes, setFilteredClasses, setClassItem } = classStates;

  const years = options.constantValues.years;
  const semesters = options.constantValues.semesters;

  const [year, setYear] = useState(years[14]);
  const [semester, setSemester] = useState(semesters[0]);

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

  function updateOuterStates() {
    const filteredClassTimes = filterList(classTimes, year, semester);
    const filteredClasses = filterList(classes, year, semester);
    const newClassTime = filteredClassTimes?.[0];
    const newClassItem = filteredClasses?.[0];
    const message = `Turmas: ${filteredClasses.length}`;
    const yearValue = year?.value ?? year;
    const semesterValue = semester?.value ?? semester;
    const finalMessage = `${yearValue}-${semesterValue}: ${message}`;
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
  }, [year, semester]);

  return (
    <div className="MultiTurmasFilters">
      <FilterYear {...props.year} />
      <FilterSemester {...props.semester} />
    </div>
  );
}

function CCTableFilters({ setCurrentClasses, allSplittedClasses }) {
  const years = options.constantValues.years;
  const semesters = options.constantValues.semesters;

  const [year, setYear] = useState(years[10]);
  const [semester, setSemester] = useState(semesters[0]);
  const [professor, setProfessor] = useState(null);
  const [room, setRoom] = useState(null);
  const [expectedSemester, setExpectedSemester] = useState(null);

  const props = {
    year: { year, setYear },
    semester: { semester, setSemester },
    professor: { professor, setProfessor },
    room: { room, setRoom },
    expectedSemester: { expectedSemester, setExpectedSemester },
  };

  useEffect(() => {
    let filtering = allSplittedClasses;
    filtering = filterYear(filtering, year);
    filtering = filterSemester(filtering, semester);
    filtering = filterProfessor(filtering, professor);
    filtering = filterRoom(filtering, room);
    filtering = filterExpectedSemester(filtering, expectedSemester);
    setCurrentClasses(filtering);
  }, [year, semester, professor, room, expectedSemester]);

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

export { MultiClassesFilters, CCTableFilters };
