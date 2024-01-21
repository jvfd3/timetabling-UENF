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
  SelectFilterAno,
  SelectFilterSemester,
  SelectFilterProfessor,
  SelectFilterRoom,
  SelectFilterExpectedSemester,
} from "../mySelects";

function FilterYear({ classes, setClasses }) {
  const [year, setYear] = useState(options.constantValues.years[14]);
  const filterYearStates = { year, setYear };

  useEffect(() => {
    let newClasses = classes;
    newClasses = filterYear(classes, year);
    setClasses(newClasses);
    // console.log("changedYear", year);
    // console.log("newClasses", newClasses.length);
  }, [year]);

  return (
    <div className="defaultFilterStyle">
      Ano:
      <SelectFilterV2Year {...filterYearStates} />
    </div>
  );
}

function FilterSemester({ classes, setClasses }) {
  const [semester, setSemester] = useState(options.constantValues.semesters[0]);
  const filterSemesterStates = { semester, setSemester };

  useEffect(() => {
    const newClasses = filterSemester(classes, semester);
    setClasses(newClasses);
    // console.log("changedSemester", semester);
    // console.log("newClasses", newClasses.length);
  }, [semester]);

  return (
    <div className="defaultFilterStyle">
      Semestre:
      <SelectFilterV2Semester {...filterSemesterStates} />
    </div>
  );
}

function FilterProfessor({ classes, setClasses }) {
  const [professor, setProfessor] = useState(null);
  const filterProfessorStates = { professor, setProfessor };

  useEffect(() => {
    const newClasses = filterProfessor(classes, professor);
    setClasses(newClasses);
    // console.log("changedProfessor", professor);
    // console.log("newClasses", newClasses.length);
  }, [professor]);

  return (
    <div className="defaultFilterStyle">
      Professor:
      <SelectFilterV2Professor {...filterProfessorStates} />
    </div>
  );
}

function FilterRoom({ classes, setClasses }) {
  const [room, setRoom] = useState(null);
  const filterRoomStates = { room, setRoom };

  useEffect(() => {
    const newClasses = filterRoom(classes, room);
    setClasses(newClasses);
    // console.log("changedRoom", room);
    // console.log("newClasses", newClasses.length);
  }, [room]);

  return (
    <div className="defaultFilterStyle">
      Sala:
      <SelectFilterV2Room {...filterRoomStates} />
    </div>
  );
}

function FilterExpectedSemester({ classes, setClasses }) {
  const [expectedSemester, setExpectedSemester] = useState(null);
  const filterExpectedSemesterStates = {
    expectedSemester,
    setExpectedSemester,
  };

  useEffect(() => {
    const newClasses = filterExpectedSemester(classes, expectedSemester);
    setClasses(newClasses);
    // console.log("changedExpectedSemester", expectedSemester);
    // console.log("newClasses", newClasses.length);
  }, [expectedSemester]);

  return (
    <div className="defaultFilterStyle">
      Semestre Esperado:
      <SelectFilterV2ExpectedSemester {...filterExpectedSemesterStates} />
    </div>
  );
}

function MultiClassesFilters(classesStates) {
  return (
    <div className="MultiTurmasFilters">
      <FilterYear {...classesStates} />
      <FilterSemester {...classesStates} />
    </div>
  );
}

function CCTableFilters(classesStates) {
  return (
    <div className="CCTableFilters">
      <FilterYear {...classesStates} />
      <FilterSemester {...classesStates} />
      <FilterProfessor {...classesStates} />
      <FilterRoom {...classesStates} />
      <FilterExpectedSemester {...classesStates} />
    </div>
  );
}

function FilteringSelects({ setCurrentClasses, allSplittedClasses }) {
  let years = options.constantValues.years;
  let semesters = options.constantValues.semesters;

  const [ano, setAno] = useState(years[10]);
  const [semestre, setSemestre] = useState(semesters[0]);
  const [professor, setProfessor] = useState(null);
  const [room, setRoom] = useState(null);
  const [expectedSemester, setExpectedSemester] = useState(null);

  useEffect(() => {
    let filtering = allSplittedClasses;
    filtering = filterYear(filtering, ano);
    filtering = filterSemester(filtering, semestre);
    filtering = filterProfessor(filtering, professor);
    filtering = filterRoom(filtering, room);
    filtering = filterExpectedSemester(filtering, expectedSemester);
    setCurrentClasses(filtering);
  }, [ano, semestre, professor, room, expectedSemester]);

  let anoProps = {
    ano,
    setAno,
  };
  let semestreProps = {
    semestre,
    setSemestre,
  };
  let professorProps = {
    professor,
    setProfessor,
  };
  let roomProps = {
    room,
    setRoom,
  };
  let expectedSemesterProps = {
    expectedSemester,
    setExpectedSemester,
  };

  return (
    <div className="filterHeader">
      Ano:
      <SelectFilterAno {...anoProps} />
      Semestre:
      <SelectFilterSemester {...semestreProps} />
      Professor:
      <SelectFilterProfessor {...professorProps} />
      Sala:
      <SelectFilterRoom {...roomProps} />
      Período esperado:
      <SelectFilterExpectedSemester {...expectedSemesterProps} />
    </div>
  );
}

export { MultiClassesFilters, CCTableFilters, FilteringSelects };
