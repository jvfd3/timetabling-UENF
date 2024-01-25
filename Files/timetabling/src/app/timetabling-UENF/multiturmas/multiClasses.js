import "./multiTurmas.css";
import React, { useState, useEffect, useRef } from "react";
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
  const { iterClassItem, semester, classStates } = classTableRowProps;
  const {
    classes,
    setClasses,
    classItem,
    setClassItem,
    filteredClasses,
    setFilteredClasses,
  } = classStates;

  // console.log(iterClassItem.disciplina);
  const [classItemRow, setClassItemRow] = useState(iterClassItem);

  const conflicts = baseClassItemConflicts(
    filteredClasses,
    classItemRow,
    semester
  );

  // console.log("NewConflicts", conflicts);

  function customSetClassItem(newClassItem) {
    setClassItemRow(newClassItem);
    setClassItem(newClassItem);
  }

  function customUpdateClass() {
    const customUpdateStates = {
      classes,
      setClasses,
      classItem: classItemRow,
      setClassItem: customSetClassItem,
    };
    updateClass(customUpdateStates);
  }

  const rowClassStates = {
    classes,
    setClasses: () => {},
    // setClasses,
    classItem: classItemRow,
    oldClassItem: iterClassItem,
    setClassItem: customSetClassItem,
    conflicts,
    deleteClassDB: deleteClass,
    updateClassItemDB: customUpdateClass,
  };

  // /* What a cursed way of doing it... */
  // rowClassStates.updateClassItemDB = () => updateClass(rowClassStates);

  function debugList() {
    const tamanhoClasses = classes.length;
    const ultimaClasses = classes[tamanhoClasses - 1];
    const classesSubjectId = ultimaClasses?.disciplina?.id;
    console.log("classes", classesSubjectId);

    const tamanhoFilteredClasses = filteredClasses.length;
    const ultimaFilteredClasses = filteredClasses[tamanhoFilteredClasses - 1];
    const filteredClassesSubjectId = ultimaFilteredClasses?.disciplina?.id;
    console.log("filteredClasses", filteredClassesSubjectId);
  }

  function debugItem() {
    const subjectIter = iterClassItem?.disciplina?.id;
    const subjectRow = classItemRow?.disciplina?.id;
    const subjectItem = classItem?.disciplina?.id;
    console.log("iterClassItem", subjectIter);
    console.log("classItemRow", subjectRow);
    console.log("classItem", subjectItem);
  }

  function debug() {
    console.log("PIMBA");
    // debugList();
    debugItem();
  }

  // debug();

  const classItemRowKey = `ClassItemTableRow: ${classItemRow?.idTurma}-${classItemRow?.disciplina?.codigoDisciplina}-${classItemRow?.professor?.nome}`;

  return (
    <tr key={classItemRowKey}>
      <td>
        {/* <SmartDeleteClassItem {...rowClassStates} /> */}
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
  const {
    classes,
    setClasses,
    filteredClasses,
    setFilteredClasses,
    classItem,
    setClassItem,
  } = classStates;
  // const { semester } = currentSemesterProps;
  // console.log("classStates", classStates);
  return (
    <table className="showBasicDataTable">
      <ClassTableHeader {...globalStates} />
      <tbody>
        {filteredClasses.map((iterClassItem, iterClassItemIndex) => {
          const classItemTableRowProps = {
            iterClassItem,
            // classes: filteredClasses,
            // setClasses,
            classStates,
            // This could get the value from the default yearSemester just in case
            semester: classItem?.semestre,
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
