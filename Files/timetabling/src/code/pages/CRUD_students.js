import "../CSS/CRUD_students.css";
import "../CSS/defaultStyle.css";
import "../components/studentCard/studentCard.css";
import React, { useState } from "react";
import options from "../temp/options";
import CRUDPageSelection from "../components/PageSelect";

import Select from "react-select";
import "../components/componentStyles.css";

import alunos_DB from "../../DB/JSON/static/alunos-ok.json";
import alunosProgressao_DB from "../../DB/JSON/dynamic/andamento_alunos-ok.json";
import disciplinasInfo_DB from "../../DB/JSON/static/disciplinas-cc-ok.json";

function getNomeDisciplina(codigoDisciplina) {
  // console.log(codigoDisciplina)
  let disciplina = disciplinasInfo_DB.ementa_cc.find(
    (disciplina) => disciplina.codigo === codigoDisciplina
  );
  return disciplina.nome;
}

function getNomesDasDisciplinas(listaDeCodigos) {
  let listaDeCodigosNomes = [];
  for (let i = 0; i < listaDeCodigos.length; i++) {
    let codigo = listaDeCodigos[i];
    // console.log(codigo);
    let nome = getNomeDisciplina(codigo);
    listaDeCodigosNomes.push({ [codigo]: nome });
  }
  return listaDeCodigosNomes;
}

function juntarTodasAsInformacoes() {
  let alunos = alunos_DB.alunos;
  let alunos_RS = alunos.map((aluno) => ({
    value: aluno.matricula,
    label: aluno.nome,
    ano_entrada: aluno.ano_entrada,
    curso: aluno.curso,
  }));
  let alunosProgressao = alunosProgressao_DB.andamento_alunos;

  let geral = [];

  for (let i = 0; i < alunos_RS.length; i++) {
    let filled_aluno = alunos_RS[i];
    let matricula = filled_aluno.value;
    let progressao_desse_aluno = alunosProgressao[matricula];
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
      {/* {console.log(dados_agrupados)} */}
      <Select
        className="StudentSelection"
        defaultValue={props.default_student}
        // onChange={ }

        placeholder={"Nome do aluno"}
        isClearable={false}
        isSearchable={true}
        options={dados_agrupados}
        getOptionLabel={(option) => `${option.value}: ${option.label}`}
      />
    </div>
  );
}

function StudentCard() {
  return <div></div>;
}

function CRUDstudents() {
  const [aluno, setAluno] = useState(dados_agrupados[38]);

  return (
    <div className="background">
      <div className="CRUD-contain-components">
        <CRUDPageSelection defaultValue={options.CRUD.crud_alunos} />
        <div className="CRUD-outro">
          <div className="CRUD-properties">
            <StudentSelection default_student={aluno} />
            <StudentCard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CRUDstudents;
