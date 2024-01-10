import "./alunos.css";
import React, { useState } from "react";
import options from "../../../DB/local/options";
import CRUDPageSelection from "../../../components/PageSelect";
import { allLocalJsonData } from "../../../DB/local/dataFromJSON";
import {
  SelectStudentCourse,
  SelectStudentYear,
  StudentSelection,
} from "../../../components/mySelects";
import {
  TextInputStudentId,
  TextInputStudentMatricula,
  TextInputStudentName,
} from "../../../components/MyTextFields";
// import { scrollThroughAlunos } from "../functions/firulas/minhasFirulas";

function InformacoesBaseDoAluno(studentStates) {
  const { student } = studentStates;
  const { id, anoEntrada, curso, matricula, nome } = student;
  return (
    <div className="showBasicDataCard">
      <h3>INFORMAÇÕES DO ALUNO</h3>
      <table className="showBasicDataTable">
        <thead>
          <tr>
            <th>Informação</th>
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
              {curso}
              <SelectStudentCourse {...studentStates} />
            </td>
          </tr>
          <tr>
            <th>Matrícula</th>
            <td>
              <TextInputStudentMatricula {...studentStates} />
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
      <InformacoesBaseDoAluno {...studentStates} />
    </div>
  );
}

function Students() {
  const [students, setStudents] = useState(allLocalJsonData.SQL.alunos); // [dados_agrupados[38]
  const [student, setStudent] = useState(students[38]); // JVFD

  let studentStates = { students, setStudents, student, setStudent };

  return (
    <div className="CRUDContainComponents">
      <StudentSelection {...studentStates} />
      <StudentCard {...studentStates} />
    </div>
  );
}

function CRUDstudents() {
  return (
    <div className="background">
      <CRUDPageSelection
        defaultValue={options.constantValues.pageSelection.alunos}
      />
      <Students />
    </div>
  );
}

export default CRUDstudents;
