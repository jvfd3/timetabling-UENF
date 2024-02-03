import React, { useEffect, useState } from "react";
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

const classNames = {
  selectionBar: "selectionBar",
  showBasicDataCard: "showBasicDataCard",
  showBasicDataTable: "showBasicDataTable",
  infoCard: "infoCard",
  CRUDContainComponents: "CRUDContainComponents",
  background: "background",
};

function StudentSelection(studentStates) {
  const studentCRUDFunctions = {
    createFunc: () => createStudent(studentStates),
    readFunc: () => readStudent(studentStates),
    updateFunc: () => updateStudent(studentStates),
    deleteFunc: () => deleteStudent(studentStates),
  };

  return (
    <div className={classNames.selectionBar}>
      <CRUDButtonsContainer {...studentCRUDFunctions} />
      <SelectStudentItem {...studentStates} />
    </div>
  );
}

function BaseInfoCard(studentStates) {
  return (
      <h3>INFORMAÇÕES DO ALUNO</h3>
    <div className={classNames.showBasicDataCard}>
      <table className={classNames.showBasicDataTable}>
        <tbody>
          <tr>
            <th>Ano de entrada</th>
            <td>
              <SelectStudentYear {...studentStates} />
            </td>
            {/* <td>{anoEntrada}</td> */}
          </tr>
          <tr>
            <th>Curso</th>
            <td>
              {/* Debugging Purpose */}
              {/* {studentStates.student.curso} */}
              <SelectStudentCourse {...studentStates} />
            </td>
          </tr>
          <tr>
            <th>Matrícula</th>
            <td>
              <TextInputStudentEnrollment {...studentStates} />
            </td>
          </tr>
          <tr>
            <th>Nome</th>
            <td>
              <TextInputStudentName {...studentStates} />
            </td>
          </tr>
          <tr>
            <th>ID</th>
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
    <div className={classNames.infoCard}>
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
    <div className={classNames.CRUDContainComponents}>
      <StudentSelection {...studentStates} />
      <StudentCard {...studentStates} />
    </div>
  );
}

function CRUDStudents() {
  const defaultPageValue = configInfo.pageSelection.students;
  return (
    <div className={classNames.background}>
      <CRUDPageSelection defaultValue={defaultPageValue} />
      <Students />
    </div>
  );
}

export default CRUDStudents;
