import "./multiTurmas.css";
import React, { useState, useEffect } from "react";
import {
  SelectClassSubject,
  SelectClassProfessor,
} from "../../../components/mySelects";
import { NumberInputMultiClassesExpectedDemand } from "../../../components/MyTextFields";
import {
  SmartCreateClassItem,
  SmartDeleteClassItem,
  SmartUpdateClassItem,
} from "../../../components/Buttons/Smart/Smart";
import { baseClassItemConflicts } from "../../../helpers/conflicts/centralConflicts";
import {
  InputDisciplina,
  UpdateInfo,
} from "../../../components/Buttons/Dumb/Dumb";
import {
  createClass,
  readClass,
  updateClass,
  deleteClass,
} from "../../../helpers/CRUDFunctions/classCRUD";
import { MultiClassesFilters } from "../../../components/Filters/Filters";
import { readClassTime } from "../../../helpers/CRUDFunctions/classTimeCRUD";
import ClassTimeTable from "../../../components/ClassTimeTable/ClassTimeTable";
import {
  getDefaultClassItem,
  getDefaultClassTime,
} from "../../../helpers/auxCRUD";

function ClassTableHeader(globalStates) {
  const { classStates } = globalStates;

  const createStates = {
    classesStates: classStates,
    year: classStates.classItem.ano,
    semester: classStates.classItem.semestre,
    createClassDB: createClass,
  };
  return (
    <thead>
      <tr>
        <th>
          <SmartCreateClassItem {...createStates} />
        </th>
        <th>Código - Nome</th>
        <th>Professor</th>
        <th>Demanda Estimada</th>
        <th colSpan={5}>Horários</th>
      </tr>
    </thead>
  );
}

function ClassItemTableRow(classTableRowProps) {
  const { iterClassItem, classes, setClasses, semester } = classTableRowProps;

  const [classItemRow, setClassItemRow] = useState(iterClassItem);

  const conflicts = baseClassItemConflicts(classes, classItemRow, semester);

  // console.log("NewConflicts", conflicts);

  const rowClassStates = {
    classes,
    setClasses,
    classItem: classItemRow,
    setClassItem: setClassItemRow,
    conflicts,
    deleteClassDB: deleteClass,
  };

  /* What a cursed way of doing it... */
  rowClassStates.updateClassItemDB = () => updateClass(rowClassStates);

  const classItemRowKey = `ClassItemTableRow: ${classItemRow?.idTurma}-${classItemRow?.disciplina?.codigoDisciplina}-${classItemRow?.professor?.nome}`;

  return (
    <tr key={classItemRowKey}>
      <td>
        <SmartDeleteClassItem {...rowClassStates} />
        <SmartUpdateClassItem {...rowClassStates} />
      </td>
      <td {...conflicts.styled.disciplina}>
        <SelectClassSubject {...rowClassStates} />
      </td>
      <td {...conflicts.styled.professor}>
        <SelectClassProfessor {...rowClassStates} />
      </td>
      <td {...conflicts.styled.demand}>
        <NumberInputMultiClassesExpectedDemand {...rowClassStates} />
      </td>
      <td>
        <ClassTimeTable {...rowClassStates} />
      </td>
    </tr>
  );
}

function ClassesTable(globalStates) {
  const { classStates } = globalStates;
  const { filteredClasses, setClasses, classItem } = classStates;
  // const { semester } = currentSemesterProps;
  // console.log("classes", classes);
  return (
    <table className="showBasicDataTable">
      <ClassTableHeader {...globalStates} />
      <tbody>
        {filteredClasses.map((iterClassItem, iterClassItemIndex) => {
          const classItemTableRowProps = {
            iterClassItem,
            classes: filteredClasses,
            setClasses,
            semester: classItem.semestre,
          };
          const classItemTableRowKey = `ClassItemTableRow: ${iterClassItem?.idTurma}-${iterClassItem?.disciplina?.codigo}-${iterClassItem?.professor?.nome}-${iterClassItemIndex}`;
          return (
            <ClassItemTableRow
              {...classItemTableRowProps}
              key={classItemTableRowKey}
            />
          );
        })}
      </tbody>
    </table>
  );
}

function MultiClassesCardHeader(globalStates) {
  return (
    <div className="MultiTurmasTitle">
      <h2>MultiTurmas</h2>
      <MultiClassesFilters {...globalStates} />
    </div>
  );
}

function NoOfferedClasses(globalStates) {
  const { classStates } = globalStates;
  // const { classItem } = classStates;
  // console.log("item", classStates);

  const createStates = {
    classesStates: classStates,
    year: classStates.classItem.ano,
    semester: classStates.classItem.semestre,
    createClassDB: createClass,
  };
  return (
    <div
      className="infoCard"
      style={{
        display: "flex",
        flexDirection: "row",
        textAlignLast: "center",
        alignItems: "center",
      }}
    >
      <p>Ainda não há turmas cadastradas. Para criar uma turma clique aqui: </p>
      <SmartCreateClassItem {...createStates} />
    </div>
  );
}

function MultiClassesCard(globalStates) {
  const { classStates } = globalStates;
  const hasClasses = classStates.filteredClasses.length > 0;
  return (
    <div className="infoCard">
      <MultiClassesCardHeader {...globalStates} />
      <div className="showBasicDataCard">
        {hasClasses ? (
          <ClassesTable {...globalStates} />
        ) : (
          <NoOfferedClasses {...globalStates} />
        )}
      </div>
    </div>
  );
}

function MultiClassesRefactor() {
  const [classTimes, setClassTimes] = useState([]);
  const [filteredClassTimes, setFilteredClassTimes] = useState([]);
  const [classTime, setClassTime] = useState(getDefaultClassTime());

  const [classes, setClasses] = useState([]);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [classItem, setClassItem] = useState(getDefaultClassItem());

  const classTimeStates = {
    classTimes,
    setClassTimes,
    filteredClassTimes,
    setFilteredClassTimes,
    classTime,
    setClassTime,
  };
  const classStates = {
    classes,
    setClasses,
    filteredClasses,
    setFilteredClasses,
    classItem,
    setClassItem,
  };

  const globalStates = { classTimeStates, classStates };

  useEffect(() => {
    readClassTime(classTimeStates);
    readClass(classStates);
  }, []);

  useEffect(() => {
    // console.log("filteredClassTimes", filteredClassTimes);
    // console.log("filteredClasses", filteredClasses);
  }, [filteredClassTimes, filteredClasses]);

  return (
    <div className="CRUDContainComponents">
      <MultiClassesCard {...globalStates} />
    </div>
  );
}

export { MultiClassesRefactor };
