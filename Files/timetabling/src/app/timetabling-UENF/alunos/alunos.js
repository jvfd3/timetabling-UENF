import "./alunos.css";
import React, { useState } from "react";
import options from "../../../DB/local/options";
import CRUDPageSelection from "../../../components/PageSelect";
import { sqlDataFromJson } from "../../../DB/local/dataFromJSON";
// import { scrollThroughAlunos } from "../functions/firulas/minhasFirulas";
import {
  SelectStudentItem,
  SelectStudentYear,
  SelectStudentCourse,
} from "../../../components/mySelects";
import {
  TextInputStudentEnrollment,
  TextInputStudentName,
  TextInputStudentId,
} from "../../../components/MyTextFields";
import {
  createStudent,
  readStudent,
  updateStudent,
  deleteStudent,
} from "../../../helpers/CRUDFunctions/studentCRUD";
import { CRUDButtonsContainer } from "../../../components/CRUDButtons";

function StudentSelection(studentStates) {
  const studentCRUDFunctions = {
    createFunc: () => createStudent(studentStates),
    readFunc: () => readStudent(studentStates),
    updateFunc: () => updateStudent(studentStates),
    deleteFunc: () => deleteStudent(studentStates),
  };

  return (
    <div className="SelectionBar">
      <CRUDButtonsContainer {...studentCRUDFunctions} />
      <SelectStudentItem {...studentStates} />
    </div>
  );
}

function StudentBaseInfo(studentStates) {
  return (
    <div className="showBasicDataCard">
      <h3>INFORMAÇÕES DO ALUNO</h3>
      <table className="showBasicDataTable">
        <thead>
          <tr>
            <th>Chave</th>
            <th>Valor</th>
          </tr>
        </thead>
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
    <div className="infoCard">
      <StudentBaseInfo {...studentStates} />
      {/* <StudentClasses {...studentStates} /> */}
      {/* <StudentProgress {...studentStates} /> */}
    </div>
  );
}

function Students() {
  const [students, setStudents] = useState(sqlDataFromJson.students);
  const [student, setStudent] = useState(students[38]); // JVFD

  let studentStates = { students, setStudents, student, setStudent };

  return (
    <div className="CRUDContainComponents">
      <StudentSelection {...studentStates} />
      <StudentCard {...studentStates} />
    </div>
  );
}

function CRUDStudents() {
  return (
    <div className="background">
      <CRUDPageSelection
        defaultValue={options.constantValues.pageSelection.students}
      />
      <Students />
    </div>
  );
}

export default CRUDStudents;
