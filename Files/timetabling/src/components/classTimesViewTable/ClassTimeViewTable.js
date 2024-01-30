import "./ClassTimeViewTable.css";
import { useEffect, useState } from "react";
import { getId } from "../../helpers/auxCRUD";
import { readClassTime } from "../../helpers/CRUDFunctions/classTimeCRUD";
import { sortClassTimes } from "../Sorts/sortingFunctions";
import { ViewTableFilters } from "../Filters/Filters";
import {
  checkIndefinition,
  getProfessorLabel,
  getRoomLabel,
  getSubjectLabel,
} from "../../helpers/visualizationText/textLabels";

function NoClasses({ noClassesTitle }) {
  return <h5>{noClassesTitle}</h5>;
}

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

  // use ClassTime later to check for conflicts
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
  const classesInRoomTitle = classTimeStates.headerTitle + size;
  return (
    <div className="header">
      <h2>{classesInRoomTitle}</h2>
      <ViewTableFilters {...classTimeStates} />
    </div>
  );
}

function ClassesTable({ classTimes }) {
  const orderedClassTimes = sortClassTimes(classTimes);

  return (
    <table className="showBasicDataTable">
      <TableHeader />
      <tbody>
        {orderedClassTimes.map((iterClassTime) => {
          const classRowProps = { classTimes, classTime: iterClassTime };
          const classTimeRowKey = `class: ${getId(iterClassTime)}`;
          return <ClassRow key={classTimeRowKey} {...classRowProps} />;
        })}
      </tbody>
    </table>
  );
}

function ClassesTableView(customPageStates) {
  /* const {
    baseFilter,
    baseValueToFilter,
    headerTitle,
    noClassesTitle,
  } = customPageStates; */

  const [classTimes, setClassTimes] = useState([]);
  const [filteredClassTimes, setFilteredClassTimes] = useState([]);

  const classTimeStates = {
    ...customPageStates,
    classTimes,
    setClassTimes,
    classTime: {},
    setClassTime: () => {},
    filteredClassTimes,
    setFilteredClassTimes,
  };

  useEffect(() => {
    readClassTime(classTimeStates);
  }, []);

  const hasClasses = filteredClassTimes.length > 0;
  return (
    <div className="showBasicDataCard">
      <HeaderFilter {...classTimeStates} />
      {hasClasses ? (
        <div>
          <ClassesTable classTimes={filteredClassTimes} />
          {/* <ClassesInRoomTable classes={offlineFilteredClasses} /> */}
        </div>
      ) : (
        <NoClasses {...classTimeStates} />
      )}
    </div>
  );
}

export default ClassesTableView;
