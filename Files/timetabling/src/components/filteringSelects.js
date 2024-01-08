import { useEffect, useState } from "react";
import options from "../DB/local/options";
import {
  filterExpectedSemester,
  filterProfessor,
  filterRoom,
  filterSemester,
  filterYear,
} from "../helpers/filters";
import {
  SelectFilterAno,
  SelectFilterExpectedSemester,
  SelectFilterProfessor,
  SelectFilterRoom,
  SelectFilterSemester,
} from "./mySelects";

function FilteringSelects({ setCurrentClasses, allSplittedClasses }) {
  let years = options.constantValues.years;
  let semesters = options.constantValues.semesters;
  const [ano, setAno] = useState(years[10]);
  const [semestre, setSemestre] = useState(semesters[0]);
  const [professor, setProfessor] = useState(null);
  const [room, setRoom] = useState(null);
  const [expectedSemester, setExpectedSemester] = useState(null);

  useEffect(() => {
    let filteringClasses = allSplittedClasses;
    filteringClasses = filterYear(filteringClasses, ano);
    filteringClasses = filterSemester(filteringClasses, semestre);
    filteringClasses = filterProfessor(filteringClasses, professor);
    filteringClasses = filterRoom(filteringClasses, room);
    filteringClasses = filterExpectedSemester(
      filteringClasses,
      expectedSemester
    );
    setCurrentClasses(filteringClasses);
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

export { FilteringSelects };
