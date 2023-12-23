import "../CSS/defaultStyle.css";
import "../CSS/CRUD_alunos.css";
import React, { useState } from "react";
import options from "../temp/options";
import CRUDPageSelection from "../components/PageSelect";
import Select from "react-select";
import { allLocalJsonData } from "../../DB/dataFromJSON";
import { getNomesDasDisciplinas } from "../functions/auxFunctions";
// import { scrollThroughAlunos } from "../functions/firulas/minhasFirulas";

let andamentoAlunosJsonData = allLocalJsonData.dynamic.andamentoAlunos;
const dados_agrupados = juntarTodasAsInformacoes();

function juntarTodasAsInformacoes() {
  let alunos_RS = allLocalJsonData.static.infoAlunos;
  let alunosProgressao = andamentoAlunosJsonData;
  let geral = [];

  for (let i = 0; i < alunos_RS.length; i++) {
    let filled_aluno = alunos_RS[i];
    let progressao_desse_aluno = alunosProgressao[filled_aluno.matricula];
    let cursando = getNomesDasDisciplinas(progressao_desse_aluno.cursando);
    let naofeitas = getNomesDasDisciplinas(progressao_desse_aluno.naofeitas);
    let aprovadas = getNomesDasDisciplinas(progressao_desse_aluno.aprovadas);
    filled_aluno["cursando"] = cursando;
    filled_aluno["naofeitas"] = naofeitas;
    filled_aluno["aprovadas"] = aprovadas;
    geral.push(filled_aluno);
  }
  return geral;
}

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

    function InformacoesDisciplinasAluno() {
      function SelectDisciplinas(props) {
        const { myPlaceHolder, myOptions, current_student, update_student } =
          props;
        return (
          <Select
            className="manyDisciplinasMultiSelect"
            placeholder={myPlaceHolder}
            options={allLocalJsonData.static.infoDisciplinasCC}
            value={myOptions}
            onChange={(option) => {
              let myStudent = { ...current_student };
              myStudent[myPlaceHolder] = option;
              update_student(myStudent);
            }}
            isMulti={true}
            isClearable={false}
            isSearchable={true}
            getOptionValue={(option) => option.codigo}
            getOptionLabel={(option) => option.nome}
            formatOptionLabel={({ codigo, nome }) => {
              let text = `${codigo}: ${nome}`;
              return text;
            }}
          />
        );
      }

      return (
        <div className="showBasicDataCard">
          <h3>Andamento do Aluno</h3>
          <div>
            <table>
              <thead>
                <tr>
                  <th>Cursando</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <SelectDisciplinas
                      myPlaceHolder="cursando"
                      myOptions={student.cursando}
                      current_student={student}
                      update_student={change_student}
                    />
                  </td>
                </tr>
              </tbody>
            </table>

            <table>
              <thead>
                <tr>
                  <th>Não Feitas</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <SelectDisciplinas
                      myPlaceHolder="naofeitas"
                      myOptions={student.naofeitas}
                      current_student={student}
                      update_student={change_student}
                    />
                  </td>
                </tr>
              </tbody>
            </table>

            <table>
              <thead>
                <tr>
                  <th>Aprovadas</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <SelectDisciplinas
                      myPlaceHolder="aprovadas"
                      myOptions={student.aprovadas}
                      current_student={student}
                      update_student={change_student}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    return (
      <div className="infoCard">
        <InformacoesBaseDoAluno />
        <InformacoesDisciplinasAluno />
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
