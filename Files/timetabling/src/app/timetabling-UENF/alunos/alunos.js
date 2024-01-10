import "./alunos.css";
import React, { useState } from "react";
import options from "../../../DB/local/options";
import CRUDPageSelection from "../../../components/PageSelect";
import { allLocalJsonData } from "../../../DB/local/dataFromJSON";
import { StudentSelection } from "../../../components/mySelects";
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
            <td>{anoEntrada}</td>
          </tr>
          <tr>
            <th>Curso</th>
            <td>{curso}</td>
          </tr>
          <tr>
            <th>Matrícula</th>
            <td>{matricula}</td>
          </tr>
          <tr>
            <th>Nome</th>
            <td>{nome}</td>
          </tr>
          <tr>
            <th>ID</th>
            <td>{id}</td>
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
