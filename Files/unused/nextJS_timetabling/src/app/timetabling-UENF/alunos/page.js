"use client";
// import "../CSS/defaultStyle.css";
// import "../CSS/CRUD_alunos.css";
import React, { useState } from "react";
import Select from "react-select";
// import options from "@/helpers/options";
import { sqlDataFromJson } from "@/helpers/localDB/dataFromJSON";
import { getNomesDasDisciplinas } from "@/helpers/auxFunctions";
import options from "@/helpers/options";

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
    function scrollThroughAlunos(event) {
      let diretion = event.deltaY > 0 ? "down" : "up";
      let index = dados_agrupados.findIndex(
        (oneOfAlunos) => oneOfAlunos.matricula === aluno.matricula
      );
      index += diretion === "up" ? -1 : 1;
      index = index < 0 ? dados_agrupados.length - 1 : index;
      index = index >= dados_agrupados.length ? 0 : index;
      let newOption = dados_agrupados[index];
      setAluno(newOption);
    }
    return (
      <div className="SelectionBar" onWheel={scrollThroughAlunos}>
        <Select
          className="itemSelectionBar"
          styles={options.SelectStyles.fullItem}
          value={props.student}
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
      <Alunos />
    </div>
  );
}

export default CRUDstudents;
