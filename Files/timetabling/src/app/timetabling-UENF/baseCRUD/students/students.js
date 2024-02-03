import React, { useEffect, useState } from "react";
import myStyles from "../../../../config/myStyles";
import configInfo from "../../../../config/configInfo";
import CRUDPageSelection from "../../../../components/PageSelect";
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

const baseInfoCard = {
  title: "INFORMAÇÕES DO ALUNO",
  tableTitles: {
    year: "Ano de entrada",
    course: "Curso",
    enrollment: "Matrícula",
    name: "Nome",
    id: "ID",
  },
};

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
      <h3>{baseInfoCard.title}</h3>
      <table className={defaultClassNames.componentTable}>
        <tbody>
          <tr>
            <th>{baseInfoCard.tableTitles.year}</th>
            <td>
              <SelectStudentYear {...studentStates} />
            </td>
          </tr>
          <tr>
            <th>{baseInfoCard.tableTitles.course}</th>
            <td>
              <SelectStudentCourse {...studentStates} />
            </td>
          </tr>
          <tr>
            <th>{baseInfoCard.tableTitles.enrollment}</th>
            <td>
              <TextInputStudentEnrollment {...studentStates} />
            </td>
          </tr>
          <tr>
            <th>{baseInfoCard.tableTitles.name}</th>
            <td>
              <TextInputStudentName {...studentStates} />
            </td>
          </tr>
          <tr>
            <th>{baseInfoCard.tableTitles.id}</th>
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
