import "./ccTable.css";
import React, { useEffect, useState } from "react";
import options from "../../../DB/local/options";
import CRUDPageSelection from "../../../components/PageSelection/PageSelect";
import { getClassesData } from "../../../DB/retrieveData";
import { splitTurmas } from "../../../helpers/conflicts/auxConflictFunctions";
import { getDefaultClassTime } from "../../../helpers/auxCRUD";
import { readClassTime } from "../../../helpers/CRUDFunctions/classTimeCRUD";
import { readSubject } from "../../../helpers/CRUDFunctions/subjectCRUD";
import { readProfessor } from "../../../helpers/CRUDFunctions/professorCRUD";
import { readRoom } from "../../../helpers/CRUDFunctions/roomCRUD";
import { filterDay, filterHour } from "../../../helpers/filteringFunc";

function getCellMessage(turma) {
  // console.log("turma", turma.sala);
  const subject = turma.disciplina;
  const prof = turma.professor;
  const room = turma.sala;
  const subjectInfo = subject
    ? `${subject?.periodo} - ${subject?.apelido}`
    : "Discip. indef.";
  const profInfo = prof ? `${prof.apelido}` : "Prof. indef.";
  const roomInfo = room
    ? `${room?.bloco}${room?.codigo ? "-" + room?.codigo : ""}`
    : "Sala indef.";
  const cellMessage = `${subjectInfo} (${profInfo} / ${roomInfo})`;
  return cellMessage;
}

function CellContent({ turmas }) {
  const listaDeTurmas = turmas.map((turma) => {
    const cellMessage = getCellMessage(turma);
    const cellKey = `ChaveCellContent: ${turma.idTurma}-${turma.idHorario}`;
    return (
      <div key={cellKey} className="eachClassInCell">
        {cellMessage}
      </div>
    );
  });

  return listaDeTurmas;
}

function Linha({ hora, curClasses }) {
  const turmasDaHora = filterHour(curClasses, hora);

  const daysColumn = options.constantValues.days.map((dia) => {
    const turmasDoDia = filterDay(turmasDaHora, dia.value);

    return (
      <td key={`Key Coluna: ${dia.value}-${hora}`} className="ContentCell">
        <CellContent turmas={turmasDoDia} />
      </td>
    );
  });

  return (
    <tr key={`Linha: ${hora}`}>
      <td className="HorariosCol" key={`Linha: ${hora}, Header: ${hora}`}>
        {hora}
      </td>
      {daysColumn}
    </tr>
  );
}

function TopRow() {
  const daysList = options.constantValues.days;
  const days = daysList.map((day, index) => {
    return (
      <th key={index} className="DiasHeader">
        {day.label}
      </th>
    );
  });

  return [days];
}

function TopLeft() {
  return <th className="TopLeftCorner"></th>;
}

function Header() {
  return (
    <thead>
      <tr className="HeaderRow">
        <TopLeft />
        <TopRow />
      </tr>
    </thead>
  );
}

function Body({ curClasses }) {
  const hoursTangList = options.constantValues.hoursTang;
  return (
    <tbody>
      {hoursTangList.map((iterHour) => (
        <Linha
          key={`Linha: ${iterHour.hora}`}
          hora={iterHour.hora}
          curClasses={curClasses}
        />
      ))}
    </tbody>
  );
}

function CCTableOffline({ curClasses }) {
  return (
    <table className="TabelaCC">
      <Header />
      <Body curClasses={curClasses} />
    </table>
  );
}

function CCTableView() {
  const [classTimes, setClassTimes] = useState([]);
  const [filteredClassTimes, setFilteredClassTimes] = useState([]);
  const [classTime, setClassTime] = useState(getDefaultClassTime());

  const [professors, setProfessors] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [rooms, setRooms] = useState([]);

  const classTimeStates = {
    classTimes,
    setClassTimes,
    filteredClassTimes,
    setFilteredClassTimes,
    classTime,
    setClassTime,
  };

  // console.log(classTimes.length, filteredClassTimes.length);

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

  useEffect(() => {
    // console.log("useEffect");
    readRoom(selectStates);
    readProfessor(selectStates);
    readSubject(selectStates);
    readClassTime(classTimeStates);
  }, []);

  const turmas = getClassesData();
  const allSplittedClasses = splitTurmas(turmas);
  const [currentClasses, setCurrentClasses] = useState(allSplittedClasses);

  const filterStates = { allSplittedClasses, setCurrentClasses };

  return (
    <div className="CRUDContainComponents">
      <div className="infoCard">
        <CCTableFiltersOffline {...filterStates} />
        <CCTableOffline curClasses={currentClasses} />
      </div>
    </div>
  );
}

function CCTable() {
  const defaultPageValue = options.constantValues.pageSelection.CCTable;
  return (
    <div className="background">
      <CRUDPageSelection defaultValue={defaultPageValue} />
      <CCTableView />
    </div>
  );
}

export default CCTable;
