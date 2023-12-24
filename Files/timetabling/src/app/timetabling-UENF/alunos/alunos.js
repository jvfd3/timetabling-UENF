import React, { useState } from "react";
import Select from "react-select";
import options from "../../../DB/local/options";
import CRUDPageSelection from "../../../components/PageSelect";
import { allLocalJsonData } from "../../../DB/local/dataFromJSON";
import "./alunos.css";
// import { scrollThroughAlunos } from "../functions/firulas/minhasFirulas";

const dados_agrupados = allLocalJsonData.SQL.alunos

function Alunos() {
  const [aluno, setAluno] = useState(dados_agrupados[38]); // JVFD

  function StudentSelection(props) {
    return (
      <div
        className="SelectionBar"
        onWheel={(event) => {
          // let itemStates = [dados_agrupados, setAluno, aluno];
          // scrollThroughAlunos(event, itemStates);
        }}
      >
        <Select
          className="itemSelectionBar"
          // defaultValue={props.default_student}
          value={props.student}
          styles={options.SelectStyles.fullItem}
          onChange={props.change_student}
          placeholder={"Nome do aluno"}
          isClearable={false}
          isSearchable={true}
          options={dados_agrupados}
          getOptionValue={(option) => option.matricula}
          getOptionLabel={(option) => option.nome}
          formatOptionLabel={(option) => `${option.matricula}: ${option.nome}`}
        />
      </div>
    );
  }

  function StudentCard(props) {
    const { student, change_student } = props;

    function InformacoesBaseDoAluno() {
      return (
        <div className="showBasicDataCard">
          <h3>INFORMAÇÕES DO ALUNO</h3>
          <table className="showBasicDataTable">
            <thead></thead>
            <tbody>
              <tr>
                <th>Ano</th>
                <td>{student.anoEntrada}</td>
              </tr>
              <tr>
                <th>Curso</th>
                <td>{student.curso}</td>
              </tr>
              <tr>
                <th>Nome</th>
                <td>{student.nome}</td>
              </tr>
              <tr>
                <th>Matrícula</th>
                <td>{student.matricula}</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }

    return (
      <div className="infoCard">
        <InformacoesBaseDoAluno />
        {/* <InformacoesDisciplinasAluno /> */}
      </div>
    );
  }

  return (
    <div className="CRUDContainComponents">
      <StudentSelection student={aluno} change_student={setAluno} />
      <StudentCard student={aluno} change_student={setAluno} />
    </div>
  );
}

function CRUDstudents() {
  return (
    <div className="background">
      <CRUDPageSelection
        defaultValue={options.constantValues.pageSelection.alunos}
      />
      <Alunos />
    </div>
  );
}

export default CRUDstudents;
