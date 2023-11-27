import "../CSS/CRUD_students.css";
import "../CSS/defaultStyle.css";
import "../components/studentCard/studentCard.css";
import React, { useState } from "react";
import options from "./options";
import CRUDPageSelection from "../components/PageSelect";

import Select from "react-select";
import "../components/componentStyles.css";

import alunos_DB from "../../DB/JSON/static/alunos-ok.json";
import alunosProgressao_DB from "../../DB/JSON/dynamic/andamento_alunos-ok.json";
import disciplinasInfo_DB from "../../DB/JSON/static/disciplinas-cc-ok.json";

const disciplinas_RS = disciplinasInfo_DB.map(
  (cada_objeto) => ({
    value: cada_objeto.codigo,
    label: cada_objeto.nome,
    // periodo: cada_objeto.periodo,
    // requisitos: cada_objeto.requisitos,
    // codigo_requisitos: cada_objeto.codigo_requisitos,
  })
);

const alunos_RS = alunos_DB.map((aluno) => ({
  ano: aluno.ano_entrada,
  curso: aluno.curso,
  label: aluno.nome,
  value: aluno.matricula,
}));

const DisciplinasSelectList = (props) => {
  const { placeholder, setNewValue, initial_options, current_options } = props;

  // setNewValue(disciplinas_do_aluno_nessa_categoria);

  return (
    <Select
      defaultValue={initial_options}
      value={current_options}
      onChange={setNewValue}
      // onChange={(option) => {setNewValue(disciplinas_do_aluno_nessa_categoria)}}
      
      options={disciplinas_RS}
      isMulti={true}
      isClearable={true}
      isSearchable={true}
      placeholder={placeholder}
      getOptionLabel={(option) =>
        true ? `${option.value}: ${option.label}` : `${option.label}`
      }
    />
  );
};

function StudentCard(props) {

  const {
    info_aluno,
  } = props;

  console.log(info_aluno)

  // const dados_cursando = info_disciplinas_card.cursando.map(
  //   (codigo_da_disciplina) =>
  //     disciplinas_RS.find((obj) => obj.value === codigo_da_disciplina)
  // );

/*   const dados_naofeitas = info_disciplinas_card.naofeitas.map(
    (codigo_da_disciplina) =>
      disciplinas_RS.find((obj) => obj.value === codigo_da_disciplina)
  );

  const dados_aprovadas = info_disciplinas_card.aprovadas.map(
    (codigo_da_disciplina) =>
      disciplinas_RS.find((obj) => obj.value === codigo_da_disciplina)
  );
 */
  const [cursando, setCursando] = useState(info_aluno.cursando);
  // const [naoFeita, setNaoFeita] = useState([]);
  // const [aprovadas, setAprovadas] = useState([]);

  // console.log("fixo", dados_cursando)
  // console.log("mudando", cursando)

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
              <td>{info_aluno.ano}</td>
            </tr>
            <tr>
              <td>CURSO:</td>
              <td>{info_aluno.curso}</td>
            </tr>
            <tr>
              <td>NOME:</td>
              <td>{info_aluno.label}</td>
            </tr>
            <tr>
              <td>MATRÍCULA:</td>
              <td>{info_aluno.value}</td>
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
                <DisciplinasSelectList
                  placeholder={"Cursando"}
                  setNewValue={setCursando}

                  initial_options={info_aluno.cursando}
                  current_options={cursando}
                />
              </td>
              <td>
                {/* <DisciplinasSelectList
                  lista_aluno={info_disciplinas_card.naofeitas}
                  lista_base={disciplinasInfo_DB}
                  placeholder={"Não Feitas"}
                /> */}
              </td>
              <td>
                {/* <DisciplinasSelectList
                  lista_aluno={info_disciplinas_card.aprovadas}
                  lista_base={disciplinasInfo_DB}
                  placeholder={"Aprovadas"}
                /> */}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function getFullStudentInfo(studentInfo) {
  const disciplinas_do_aluno = alunosProgressao_DB.andamento_alunos[studentInfo.value];

  
  const dados_cursando = disciplinas_do_aluno.cursando.map(
    (codigo_da_disciplina_que_esta_cursando) =>
      disciplinasInfo_DB.find((cada_disciplina) => cada_disciplina.value === codigo_da_disciplina_que_esta_cursando)
  );

  const juntando = {
    ...studentInfo,
    // ...disciplinas_do_aluno,
    cursando: dados_cursando,
  }
    // console.log("base: ", studentInfo)
    // console.log("disciplinas", disciplinas_do_aluno)
    // console.log("junto?", juntando)
  return juntando;
}

function CRUDstudents() {
  const [aluno, setAluno] = useState(getFullStudentInfo(alunos_RS[38]));

  return (
    <div className="background">
      <div className="CRUD-contain-components">
        <CRUDPageSelection defaultValue={options.CRUD.crud_alunos} />
        <div className="CRUD-outro">
          <div className="CRUD-properties">
            <Select
              onChange={(newValue) => {setAluno(getFullStudentInfo(newValue));}}

              placeholder={"Nome do aluno"}
              isClearable={false}
              isSearchable={true}
              options={alunos_RS}
              className="SelectList-base"
              getOptionLabel={(option) =>
                true ? `${option.value}: ${option.label}` : `${option.label}`
              }
            />
            <StudentCard
              info_aluno={aluno}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CRUDstudents;
