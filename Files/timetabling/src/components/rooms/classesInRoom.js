import "./classesInRoom.css";
import { useEffect, useState } from "react";
import { getClassesData } from "../../DB/retrieveData";
import { getId } from "../../helpers/auxCRUD";
import { splitTurmas } from "../../helpers/conflicts/auxConflictFunctions";
import { readClassTime } from "../../helpers/CRUDFunctions/classTimeCRUD";
import { RoomsFilters } from "../Filters/Filters";
import {
  checkIndefinition,
  getProfessorLabel,
  getRoomLabel,
  getSubjectLabel,
} from "../../helpers/visualizationText/textLabels";

function TableHeader() {
  return (
    <thead>
      <tr>
        <th>idTurma</th>
        <th>Ano.Semestre</th>
        <th>Disciplina</th>
        <th>Professor</th>
        <th>Demanda Estimada</th>
        <th>idHorario</th>
        <th>Sala</th>
        <th>Dia</th>
        <th>Hora Início</th>
        <th>Duração</th>
      </tr>
    </thead>
  );
}

function NoClassesInRoom() {
  const noClassesInRoomText = "Não há turmas nesta sala";
  return <h5>{noClassesInRoomText}</h5>;
}

function ClassRow({ classTimes, classTime }) {
  const {
    idTurma,
    ano,
    semestre,
    disciplina,
    professor,
    demandaEstimada,
    idHorario,
    sala,
    dia,
    horaInicio,
    duracao,
  } = classTime;

  const yearSemesterText = `${ano}.${semestre}`;

  return (
    <tr>
      <td>{idTurma}</td>
      <td>{yearSemesterText}</td>
      <td>{getSubjectLabel(disciplina)}</td>
      <td>{getProfessorLabel(professor)}</td>
      <td>{demandaEstimada}</td>
      <td>{idHorario}</td>
      <td>{getRoomLabel(sala)}</td>
      <td>{checkIndefinition(dia)}</td>
      <td>{checkIndefinition(horaInicio)}</td>
      <td>{checkIndefinition(duracao)}</td>
    </tr>
  );
}

function HeaderFilter(classTimeStates) {
  const size = classTimeStates.filteredClassTimes.length;
  // console.log(classTimeStates);
  const classesInRoomTitle = "Turmas Nesta Sala: " + size;
  return (
    <div className="header">
      <h4>{classesInRoomTitle}</h4>
      <RoomsFilters {...classTimeStates} />
    </div>
  );
}

function ClassesInRoomTable({ classTimes }) {
  // console.log(classTimes);
  return (
    <table className="showBasicDataTable">
      <TableHeader />
      <tbody>
        {classTimes.map((iterClassTime) => {
          const classRowProps = { classTimes, classTime: iterClassTime };
          const classTimeRowKey = `class: ${getId(iterClassTime)}`;
          return <ClassRow key={classTimeRowKey} {...classRowProps} />;
        })}
      </tbody>
    </table>
  );
}

function ClassesInRoom(room) {
  // const {id, bloco, descricao, capacidade, codigo, idBlock} = room;

  const [classTimes, setClassTimes] = useState([]);
  const [filteredClassTimes, setFilteredClassTimes] = useState([]);

  const classTimeStates = {
    classTimes,
    setClassTimes,
    classTime: {},
    setClassTime: () => {},
    filteredClassTimes,
    setFilteredClassTimes,
    room,
  };

  useEffect(() => {
    readClassTime(classTimeStates);
  }, []);

  const hasClasses = filteredClassTimes.length > 0;
  // console.log(offlineFilteredClasses.length, hasClasses);

  return (
    <div className="showBasicDataCard">
      <HeaderFilter {...classTimeStates} />
      {hasClasses ? (
        <div>
          <ClassesInRoomTable classTimes={filteredClassTimes} />
          {/* <ClassesInRoomTable classes={offlineFilteredClasses} /> */}
        </div>
      ) : (
        <NoClassesInRoom />
      )}
    </div>
  );
}

export default ClassesInRoom;
