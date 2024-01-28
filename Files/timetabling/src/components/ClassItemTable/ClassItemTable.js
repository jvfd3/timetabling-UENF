import "./ClassItemTable.css";
import React, { useState } from "react";
import { getClassItemConflicts } from "../../helpers/conflicts/centralConflicts";
import { NumberInputMultiClassesExpectedDemand } from "../MyTextFields";
import { SelectClassProfessor, SelectClassSubject } from "../mySelects";
import ClassTimeTable from "../ClassTimeTable/ClassTimeTable";
import {
  createClass,
  deleteClass,
  updateClass,
} from "../../helpers/CRUDFunctions/classCRUD";
import {
  SmartCreateClassItem,
  SmartDeleteClassItem,
  SmartUpdateClassItem,
} from "../Buttons/Smart/Smart";
import { getId } from "../../helpers/auxCRUD";

function ClassTableHeader(createStates) {
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

function ClassItemTableRow(classItemRowStates) {
  const { classItem, filteredClasses } = classItemRowStates;

  const [oldClassItem, setOldClassItem] = useState(classItem);

  const conflicts = getClassItemConflicts(filteredClasses, classItem);

  const classTimeTableProps = {
    ...classItemRowStates,
    conflicts,
  };

  const CRUDClassItemProps = {
    classItem,
    oldClassItem,
    setOldClassItem,
    deleteClassItemDB: () => deleteClass(classItemRowStates),
    updateClassItemDB: () => updateClass(classItemRowStates),
  };

  const classItemRowKey = `ClassItemTableRow: ${classItem?.idTurma}-${classItem?.disciplina?.id}-${classItem?.professor?.id}`;

  return (
    <tr key={classItemRowKey}>
      <td>
        <SmartDeleteClassItem {...CRUDClassItemProps} />
        <SmartUpdateClassItem {...CRUDClassItemProps} />
      </td>
      <td {...conflicts.styled.subject}>
        <SelectClassSubject {...classItemRowStates} />
      </td>
      <td {...conflicts.styled.professor}>
        <SelectClassProfessor {...classItemRowStates} />
      </td>
      <td {...conflicts.styled.expectedDemand}>
        <NumberInputMultiClassesExpectedDemand {...classItemRowStates} />
      </td>
      <td>
        <ClassTimeTable {...classTimeTableProps} />
      </td>
    </tr>
  );
}

function ClassesTable(classStates) {
  const { filteredClasses } = classStates;

  const createStates = {
    classesStates: classStates,
    year: classStates.classItem.ano,
    semester: classStates.classItem.semestre,
    createClassDB: createClass,
  };

  return (
    <table className="showBasicDataTable">
      <ClassTableHeader {...createStates} />
      <tbody>
        {filteredClasses.map((iterClassItem) => {
          const classItemRowProps = {
            ...classStates,
            classItem: iterClassItem,
          };
          const classItemRowKey = `ClassItemTableRow: ${getId(iterClassItem)}`;
          return (
            <ClassItemTableRow {...classItemRowProps} key={classItemRowKey} />
          );
        })}
      </tbody>
    </table>
  );
}

export default ClassesTable;
