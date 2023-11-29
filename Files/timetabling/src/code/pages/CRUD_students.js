import "../CSS/CRUD_students.css";
import "../CSS/defaultStyle.css";
import "../components/studentCard/studentCard.css";
import React, { useState } from "react";
import options from "../temp/options";
import CRUDPageSelection from "../components/PageSelect";

import Select from "react-select";
import "../components/componentStyles.css";

import { allLocalJsonData } from "../../DB/dataFromJSON";

import { getNomesDasDisciplinas } from "../functions/getListaDisciplinas";

let andamentoAlunosJsonData = allLocalJsonData.dynamic.andamentoAlunos;

// function getNomeDisciplina(codigoDisciplina) {
//   let disciplina = infoDisciplinasJsonData.find(
//     (disciplina) => disciplina.codigo === codigoDisciplina
//   );
//   return disciplina.nome;
// }

// function getNomesDasDisciplinas(listaDeCodigos) {
//   let listaDeCodigosNomes = [];
//   for (let i = 0; i < listaDeCodigos.length; i++) {
//     let codigo = listaDeCodigos[i];
//     let nome = getNomeDisciplina(codigo);
//     // listaDeCodigosNomes.push({ [codigo]: nome });
//     listaDeCodigosNomes.push({ value: codigo, label: nome });
//   }
//   return listaDeCodigosNomes;
// }

function juntarTodasAsInformacoes() {
  let alunos_RS = allLocalJsonData.static.infoAlunos;

  //   infoAlunosJsonData.map((aluno) => ({
  //   value: aluno.matricula,
  //   label: aluno.nome,
  //   ano_entrada: aluno.ano_entrada,
  //   curso: aluno.curso,
  // }));
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

const dados_agrupados = juntarTodasAsInformacoes();

function StudentSelection(props) {
  return (
    <div>
      <Select
        className="StudentSelection"
        // defaultValue={props.default_student}
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

function SelectDisciplinas(props) {
  const { myPlaceHolder, myOptions, current_student, update_student } = props;
  return (
    <div>
      <Select
        placeholder={myPlaceHolder}
        options={allLocalJsonData.static.infoDisciplinasCC}
        value={myOptions}
        onChange={(option) => {
          let myStudent = { ...current_student };
          myStudent[myPlaceHolder] = option;
          update_student(myStudent);
        }}
        isMulti={true}
        className="SelectDisciplinas"
        isClearable={false}
        isSearchable={true}
        getOptionValue={(option) => option.codigo}
        getOptionLabel={(option) => option.nome}
        formatOptionLabel={({ codigo, nome }) => {
          let text = `${codigo}: ${nome}`;
          return text;
        }}
      />
    </div>
  );
}

function StudentCard(props) {
  const { student, change_student } = props;
  return (
    <div className="card">
      <div className="card-header">
        <h3>Informações do Aluno</h3>
      </div>
      <div className="card-body">
        <table className="table">
          <tbody>
            <tr>
              <td>ANO:</td>
              <td>{student.ano_entrada}</td>
            </tr>
            <tr>
              <td>CURSO:</td>
              <td>{student.curso}</td>
            </tr>
            <tr>
              <td>NOME:</td>
              <td>{student.nome}</td>
            </tr>
            <tr>
              <td>MATRÍCULA:</td>
              <td>{student.matricula}</td>
            </tr>
          </tbody>
        </table>
        <table className="table">
          <thead>
            <tr>
              <th>Cursando</th>
              <th>Não Feitas</th>
              <th>Aprovadas</th>
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
              <td>
                <SelectDisciplinas
                  myPlaceHolder="naofeitas"
                  myOptions={student.naofeitas}
                  current_student={student}
                  update_student={change_student}
                />
              </td>
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

function CRUDstudents() {
  const [aluno, setAluno] = useState(dados_agrupados[38]);

  return (
    <div className="background">
      <div className="CRUD-contain-components">
        <CRUDPageSelection defaultValue={options.CRUD.crud_alunos} />
        <div className="CRUD-outro">
          <div className="CRUD-properties">
            <StudentSelection student={aluno} change_student={setAluno} />
            <StudentCard student={aluno} change_student={setAluno} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CRUDstudents;
