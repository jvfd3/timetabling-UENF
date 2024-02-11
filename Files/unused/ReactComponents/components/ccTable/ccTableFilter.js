function CCTableFiltersOffline({ setCurrentClasses, allSplittedClasses }) {
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

export default CCTableFiltersOffline;
