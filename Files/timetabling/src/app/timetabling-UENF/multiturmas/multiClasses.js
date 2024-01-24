import "./multiTurmas.css";
import React, { useState, useEffect, useRef } from "react";
import options from "../../../DB/local/options";
import CRUDPageSelection from "../../../components/PageSelect";
import {
  SelectSala,
  SelectDia,
  SelectHoraTang,
  SelectDuracao,
  SelectAnoSemestre,
  SelectClassSubject,
  SelectClassProfessor,
} from "../../../components/mySelects";
import { getTurmasDoAnoSemestre } from "../../../helpers/auxFunctions";
import { NumberInputMultiClassesExpectedDemand } from "../../../components/MyTextFields";
import {
  SmartCreateClassItem,
  SmartDeleteClassItem,
  SmartCreateClassTime,
  SmartDeleteClassTime,
} from "../../../components/Buttons/Smart/Smart";
import { getClassesData } from "../../../DB/retrieveData";
import { baseClassItemConflicts } from "../../../helpers/conflicts/centralConflicts";
import { sqlDataFromJson } from "../../../DB/local/dataFromJSON";
import { InputDisciplina } from "../../../components/Buttons/Dumb/Dumb";
import { splitTurmas } from "../../../helpers/conflicts/auxiliarConflictsFunctions";
import {
  createClass,
  readClass,
  updateClass,
  deleteClass,
} from "../../../helpers/CRUDFunctions/classCRUD";
import { MultiClassesFilters } from "../../../components/Filters/Filters";
import { readClassTime } from "../../../helpers/CRUDFunctions/classTimeCRUD";
import ClassTimeTable from "../../../components/ClassTimeTable/ClassTimeTable";

function ClassTableHeader(globalStates) {
  return (
    <thead>
      <tr>
        <th>
          <SmartCreateClassItem />
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

  let test = {
    classItem: classItemRow,
  };
  // console.log(test);

  const conflicts = baseClassItemConflicts(classes, classItemRow, semester);

  // console.log("conflicts", conflicts);

  const rowClassStates = {
    classes,
    setClasses,
    classItem: classItemRow,
    setClassItem: setClassItemRow,
    conflicts,
  };

  const classItemRowKey = `ClassItemTableRow: ${classItemRow?.idTurma}-${classItemRow?.disciplina?.codigoDisciplina}-${classItemRow?.professor?.nome}`;

  return (
    <tr key={classItemRowKey}>
      <td>
        <SmartDeleteClassItem />
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

function NoOfferedClasses() {
  return (
    <div
      className="infoCard"
      style={{ display: "flex", flexDirection: "row", textAlignLast: "center" }}
    >
      <p>Ainda não há turmas cadastradas. Clique Aqui</p>
      <SmartCreateClassItem />
      <p>para criar uma turma</p>
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
        {hasClasses ? <ClassesTable {...globalStates} /> : <NoOfferedClasses />}
      </div>
    </div>
  );
}

function MultiClassesRefactor() {
  const [classTimes, setClassTimes] = useState([]);
  const [filteredClassTimes, setFilteredClassTimes] = useState([]);
  const [classTime, setClassTime] = useState({});
  const [classes, setClasses] = useState([]);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [classItem, setClassItem] = useState({});

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

  const states = { classTimeStates, classStates };

  useEffect(() => {
    readClassTime(classTimeStates);
    readClass(classStates);
  }, []);

  useEffect(() => {
    // console.log("filteredClassTimes", filteredClassTimes);
    // console.log("filteredClasses", filteredClasses);
  }, [filteredClassTimes, filteredClasses]);

  const conversion = {
    classesStates: {
      classes: filteredClasses,
      setClasses: setFilteredClasses,
    },
    currentSemesterProps: {
      semester: { value: 1 },
    },
  };

  return (
    <div className="CRUDContainComponents">
      <MultiClassesCard {...states} />
    </div>
  );
}

export { MultiClassesRefactor };
