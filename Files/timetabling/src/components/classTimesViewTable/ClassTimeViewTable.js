import "./ClassTimeViewTable.css";
import text from "../../config/frontText";
import myStyles from "../../config/myStyles";
import { useEffect, useState } from "react";
import { getId } from "../../helpers/auxCRUD";
import { readClassTime } from "../../helpers/CRUDFunctions/classTimeCRUD";
import { sortClassTimes } from "../Sorts/sortingFunctions";
import { ViewTableFilters } from "../Filters/Filters";
import {
  getRoomLabel,
  getSubjectLabel,
  checkIndefinition,
  getProfessorLabel,
} from "../../helpers/visualizationText/textLabels";

const defaultClassNames = myStyles.classNames.default;
const localClassNames = myStyles.classNames.local.component.classTimeViewTable;
const frontText = text.component.classTimeViewTable.tableTitles;

function NoSelectedItem({ specificTexts }) {
  return <h2>{specificTexts.noSelectedItem}</h2>;
}

function NoClasses({ specificTexts }) {
  return <h5>{specificTexts.noClassesTitle}</h5>;
}

function TableHeader() {
  return (
    <thead>
      <tr>
        <th>{frontText.idTurma}</th>
        <th>{frontText.yearSemester}</th>
        <th>{frontText.subject}</th>
        <th>{frontText.professor}</th>
        <th>{frontText.demand}</th>
        <th>{frontText.idHorario}</th>
        <th>{frontText.room}</th>
        <th>{frontText.day}</th>
        <th>{frontText.startHour}</th>
        <th>{frontText.duration}</th>
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
  const classesInRoomTitle = classTimeStates.specificTexts.headerTitle + size;
  return (
    <div className={localClassNames.header}>
      <h2>{classesInRoomTitle}</h2>
      <ViewTableFilters {...classTimeStates} />
    </div>
  );
}

function ClassesTable({ classTimes }) {
  const orderedClassTimes = sortClassTimes(classTimes);

  return (
    <table className={defaultClassNames.componentTable}>
      <TableHeader />
      <tbody>
        {orderedClassTimes.map((iterClassTime) => {
          const classRowProps = {
            classTimes,
            classTime: iterClassTime,
            key: `class: ${getId(iterClassTime)}`,
          };
          return <ClassRow {...classRowProps} />;
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

  const isSet = customPageStates.baseValueToFilter?.id;
  const hasClasses = filteredClassTimes.length > 0;

  return (
    <div className={defaultClassNames.containerCardBaseInfo}>
      {!isSet ? (
        <NoSelectedItem {...classTimeStates} />
      ) : (
        <>
          <HeaderFilter {...classTimeStates} />
          {isSet && hasClasses ? (
            <ClassesTable classTimes={filteredClassTimes} />
          ) : (
            <NoClasses {...classTimeStates} />
          )}
        </>
      )}
    </div>
  );
}

export default ClassesTableView;
