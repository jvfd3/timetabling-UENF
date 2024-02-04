import React, { useEffect, useState } from "react";
import text from "../../../../config/frontText";
import myStyles from "../../../../config/myStyles";
import configInfo from "../../../../config/configInfo";
import CRUDPageSelection from "../../../../components/PageSelection/PageSelect";
import { sqlDataFromJson } from "../../../../DB/local/dataFromJSON";
import { CRUDButtonsContainer } from "../../../../components/CRUDButtons";
// import { scrollThroughAlunos } from "../functions/firulas/minhasFirulas";
import {
  SelectStudentItem,
  SelectStudentYear,
  SelectStudentCourse,
} from "../../../../components/mySelects";
import {
  TextInputStudentId,
  TextInputStudentName,
  TextInputStudentEnrollment,
} from "../../../../components/MyTextFields";
import {
  createStudent,
  readStudent,
  updateStudent,
  deleteStudent,
} from "../../../../helpers/CRUDFunctions/studentCRUD";

const defaultClassNames = myStyles.classNames.default;
const pageTexts = text.page.students;

function StudentSelection(studentStates) {
  const studentCRUDFunctions = {
    createFunc: () => createStudent(studentStates),
    readFunc: () => readStudent(studentStates),
    updateFunc: () => updateStudent(studentStates),
    deleteFunc: () => deleteStudent(studentStates),
  };

  return (
    <div className={defaultClassNames.containerItemSelection}>
      <CRUDButtonsContainer {...studentCRUDFunctions} />
      <SelectStudentItem {...studentStates} />
    </div>
  );
}

function BaseInfoCard(studentStates) {
  return (
    <div className={defaultClassNames.containerCardBaseInfo}>
      <h3>{pageTexts.title}</h3>
      <table className={defaultClassNames.componentTable}>
        <tbody>
          <tr>
            <th>{pageTexts.tableTitles.year}</th>
            <td>
              <SelectStudentYear {...studentStates} />
            </td>
          </tr>
          <tr>
            <th>{pageTexts.tableTitles.course}</th>
            <td>
              <SelectStudentCourse {...studentStates} />
            </td>
          </tr>
          <tr>
            <th>{pageTexts.tableTitles.enrollment}</th>
            <td>
              <TextInputStudentEnrollment {...studentStates} />
            </td>
          </tr>
          <tr>
            <th>{pageTexts.tableTitles.name}</th>
            <td>
              <TextInputStudentName {...studentStates} />
            </td>
          </tr>
          <tr>
            <th>{pageTexts.tableTitles.id}</th>
            <td>
              <TextInputStudentId {...studentStates} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function StudentCard(studentStates) {
  return (
    <div className={defaultClassNames.containerCardsHolder}>
      <BaseInfoCard {...studentStates} />
      {/* <StudentClasses {...studentStates} /> */}
      {/* <StudentProgress {...studentStates} /> */}
    </div>
  );
}

function Students() {
  const defaultStudents = sqlDataFromJson.students ?? [];

  const [students, setStudents] = useState(defaultStudents);
  const [student, setStudent] = useState(
    students?.[configInfo.defaultIndexes.student] ?? students?.[0]
  ); // JVFD

  const studentStates = { students, setStudents, student, setStudent };

  useEffect(() => {
    readStudent(studentStates);
  }, []);

  return (
    <div className={defaultClassNames.containerCards}>
      <StudentSelection {...studentStates} />
      <StudentCard {...studentStates} />
    </div>
  );
}

function CRUDStudents() {
  const defaultPageValue = configInfo.pageSelection.students;
  return (
    <div className={defaultClassNames.background}>
      <CRUDPageSelection defaultValue={defaultPageValue} />
      <Students />
    </div>
  );
}

export default CRUDStudents;
