import React, { useState } from "react";
import text from "../../config/frontText";
import myStyles from "../../config/myStyles";
import ClassTimeTable from "../ClassTimeTable/ClassTimeTable";
import { getId } from "../../helpers/auxCRUD";
import { getClassItemConflicts } from "../../helpers/conflicts/centralConflicts";
import { NumberInputMultiClassesExpectedDemand } from "../MyTextFields";
import { SelectClassProfessor, SelectClassSubject } from "../mySelects";
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

const frontText = text.component.classItemTable.tableTitles;
const defaultClassNames = myStyles.classNames.default;

function ClassTableHeader(createStates) {
  return (
    <thead>
      <tr>
        <th>
          <SmartCreateClassItem {...createStates} />
        </th>
        <th>{frontText.subject}</th>
        <th>{frontText.professor}</th>
        <th>{frontText.expectedDemand}</th>
        <th colSpan={5}>{frontText.classTimes}</th>
      </tr>
    </thead>
  );
}

function ClassItemTableRow(classItemRowStates) {
  const { classItem, filteredClasses } = classItemRowStates;
  const [oldClassItem, setOldClassItem] = useState(classItem);
  const conflicts = getClassItemConflicts(filteredClasses, classItem);
  const classTimeTableProps = { ...classItemRowStates, conflicts };

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
      <td {...conflicts.styled.subject.merged}>
        <SelectClassSubject {...classItemRowStates} />
      </td>
      <td {...conflicts.styled.professor.merged}>
        <SelectClassProfessor {...classItemRowStates} />
      </td>
      <td {...conflicts.styled.expectedDemand.merged}>
        <NumberInputMultiClassesExpectedDemand {...classItemRowStates} />
      </td>
      <td>
        <ClassTimeTable {...classTimeTableProps} />
      </td>
    </tr>
  );
}

function ClassesTable(globalStates) {
  const { classStates } = globalStates;
  const { filteredClasses } = classStates;

  const createStates = {
    classesStates: classStates,
    year: classStates.classItem?.ano,
    semester: classStates.classItem?.semestre,
    createClassDB: createClass,
  };

  return (
    <table className={defaultClassNames.componentTable}>
      <ClassTableHeader {...createStates} />
      <tbody>
        {filteredClasses.map((iterClassItem) => {
          const classItemRowProps = {
            ...classStates,
            classItem: iterClassItem,
            key: `ClassItemTableRow: ${getId(iterClassItem)}`,
          };
          return <ClassItemTableRow {...classItemRowProps} />;
        })}
      </tbody>
    </table>
  );
}

export default ClassesTable;