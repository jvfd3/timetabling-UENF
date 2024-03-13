import "./ClassTimeViewTable.css";
import text from "../../config/frontText";
import myStyles from "../../config/myStyles";
import { readClass } from "../../helpers/CRUDFunctions/classCRUD";
import { splitTurmas } from "../../helpers/conflicts/auxConflictFunctions";
import { sortClassTimes } from "../Sorts/sortingFunctions";
import { ViewTableFilters } from "../Filters/Filters";
import { useEffect, useState } from "react";
import { getDefaultClassItem, getId } from "../../helpers/auxCRUD";
import {
  getSubjectViewTableText,
  checkIndefinition,
  getProfessorViewTableText,
  getRoomFormatLabel,
} from "../../helpers/visualizationText/textLabels";

const defaultClassNames = myStyles.classNames.default;
const localClassNames = myStyles.classNames.local.component.classTimeViewTable;
const frontText = text.component.classTimeViewTable.tableTitles;

function NoSelectedItem({ customPageStates }) {
  const { specificTexts } = customPageStates;
  return <h2>{specificTexts.noSelectedItem}</h2>;
}

function NoClasses({ customPageStates }) {
  return <h5>{customPageStates.specificTexts.noClassesTitle}</h5>;
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

function ClassRow({ splittedClassItem }) {
  const {
    idTurma,
    ano,
    semestre,
    disciplina,
    professor,
    demandaEstimada,
    idHorario,
    id,
    sala,
    dia,
    horaInicio,
    duracao,
  } = splittedClassItem;

  // use ClassTime later to check for conflicts
  const yearSemesterText = `${ano}.${semestre}`;

  return (
    <tr>
      <td>{idTurma}</td>
      <td>{yearSemesterText}</td>
      <td>{getSubjectViewTableText(disciplina)}</td>
      <td>{getProfessorViewTableText(professor)}</td>
      <td>{demandaEstimada}</td>
      <td>{id ?? idHorario}</td>
      <td>{getRoomFormatLabel(sala)}</td>
      <td>{checkIndefinition(dia)}</td>
      <td>{checkIndefinition(horaInicio)}</td>
      <td>{checkIndefinition(duracao)}</td>
    </tr>
  );
}

function HeaderFilter(classesStates) {
  const { customPageStates, classStates } = classesStates;
  const size = classStates.splittedClasses.length;
  const classesInRoomTitle = customPageStates.specificTexts.headerTitle + size;
  const viewTableProps = {
    ...classStates,
    baseFilter: customPageStates.baseFilter,
    baseValueToFilter: customPageStates.baseValueToFilter,
  };
  return (
    <div className={localClassNames.header}>
      <h2>{classesInRoomTitle}</h2>
      <ViewTableFilters {...viewTableProps} />
    </div>
  );
}

function ClassesTable({ classStates }) {
  const { splittedClasses } = classStates;
  const orderedSplittedClasses = sortClassTimes(splittedClasses);

  return (
    <table className={defaultClassNames.componentTable}>
      <TableHeader />
      <tbody>
        {orderedSplittedClasses.map((iterSplittedClassItem) => {
          const classRowProps = {
            splittedClassItem: iterSplittedClassItem,
            key: `class: ${getId(iterSplittedClassItem)}`,
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

  const [classes, setClasses] = useState([]);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [classItemFilter, setClassItemFilter] = useState(getDefaultClassItem());
  const [splittedClasses, setSplittedClasses] = useState([]);
  const [classItem, setClassItem] = useState(null);

  const classStates = {
    classes,
    setClasses,
    classItem,
    setClassItem,
    filteredClasses,
    setFilteredClasses,
    classItemFilter,
    setClassItemFilter,
    splittedClasses,
    setSplittedClasses,
  };

  const classesStates = {
    customPageStates,
    classStates,
  };

  useEffect(() => {
    readClass(classStates);
  }, []);

  useEffect(() => {
    const newSplittedClasses = splitTurmas(filteredClasses);
    setSplittedClasses(newSplittedClasses);
  }, [filteredClasses]);

  const isSet = customPageStates.baseValueToFilter?.id;
  const hasClasses = splittedClasses.length > 0;

  return (
    <div className={defaultClassNames.containerCardBaseInfo}>
      {!isSet ? (
        <NoSelectedItem {...classesStates} />
      ) : (
        <>
          <HeaderFilter {...classesStates} />
          {isSet && hasClasses ? (
            <ClassesTable {...classesStates} />
          ) : (
            <NoClasses {...classesStates} />
          )}
        </>
      )}
    </div>
  );
}

export default ClassesTableView;
