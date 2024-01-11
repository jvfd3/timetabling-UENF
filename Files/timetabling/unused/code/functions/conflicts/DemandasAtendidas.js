import React from "react";
// import options from "../temp/options";
import "../CSS/defaultStyle.css";
import { allLocalJsonData, sqlDataFromJson } from "../../DB/dataFromJSON";
// import Tabela from "./Timetable";
import {
  testingTurmas2022_1,
  // splitTurmas,
  // getSplittedTurmasPorAnoESemestre,
  searchListForKeyWithValue,
  // getNumeroDeConflitos,
} from "../functions/conflicts/auxiliarConflictsFunctions";

/*  #### Demandas dos alunos

1. Padrão
   1. Selecionar um ano
   2. Selecionar um semestre
   3. Lista de turmas
   4. Filtrar as turmas do ano e semestre selecionados
2. Aquisição dos dados
   3. Lista de andamento dos alunos
       1. Converter a lista de disciplinas "cursando" em um objeto de listas de demandas por matérias
          1. `codigoDisciplina`
             1. `listaDeAlunos`
   4. Lista de turmas
       1. Criar uma lista com todas as disciplinas que têm turmas
3. Preparação dos dados
   1. Para cada disciplina demandada
      1. procurar quantas turmas dessa disciplina existem
      2. Aloca o valor à `codigoDisciplina`.numeroDeTurmas
   2. Quero por fim ter um objeto de objetos com os seguintes valores
      1. `codigoDisciplina`
         1. `listaDeAlunos`
         2. `numeroDeTurmas`
4. Mostrar os resultados
   1. Para cada disciplina demandada
      1. Adicionar uma linha na tabela
         1. `codigoDisciplina`
         2. `numeroDeTurmas`
         3. `numeroDeAlunos`

*/

function CalculoDemandasAtendidas() {
  let turmas = allLocalJsonData.tests.demandaTurmas;
  turmas = testingTurmas2022_1(turmas);

  let andamentos = allLocalJsonData.tests.demandaAndamentoAlunos;
  let disciplinasDemandadas = andamentoToDemanda(andamentos);
  let atendimentoDeDemandas = getAtendimentoDeDemandas(
    turmas,
    disciplinasDemandadas
  );

  console.log("Disciplinas demandadas", disciplinasDemandadas);
  console.log("Demandas atendidas", atendimentoDeDemandas);

  function andamentoToDemanda(andamentos) {
    let disciplinasSendoCursadas = {};

    for (let matricula in andamentos) {
      let disciplinas = andamentos[matricula].cursando;
      disciplinas.forEach((disciplina) => {
        if (!disciplinasSendoCursadas[disciplina]) {
          disciplinasSendoCursadas[disciplina] = {
            alunosDemandando: [matricula],
          };
        } else {
          disciplinasSendoCursadas[disciplina].alunosDemandando.push(matricula);
        }
      });
    }
    return disciplinasSendoCursadas;
  }

  function getAtendimentoDeDemandas(
    turmas,
    disciplinasDemandadas,
    verbose = false
  ) {
    /* Essa função deve percorrer a lista de disciplinas demandadas e verificar quantas turmas existem para cada uma delas
    Depois vai preencher o objeto de disciplinas demandadas com o número de turmas
    Com o seguinte formato:
    disciplinasDemandadas = {
      codigoDisciplina: {
        alunosDemandando: [matricula],
        numeroDeTurmas: 0
      }
    }
    */
    let atendimentoDeDisciplinas = { ...disciplinasDemandadas };
    for (let codigoDisciplina in disciplinasDemandadas) {
      let turmasDessaDisciplina = searchListForKeyWithValue(
        turmas,
        ["disciplina", "codigo"],
        codigoDisciplina,
        verbose
      );
      atendimentoDeDisciplinas[codigoDisciplina].turmas = turmasDessaDisciplina;
      atendimentoDeDisciplinas[codigoDisciplina].numeroDeTurmas =
        turmasDessaDisciplina.length;
    }
    return atendimentoDeDisciplinas;
  }

  function TabelaDemandasAtendidas() {
    let linhasDaTabela = [];
    for (let codigoDisciplina in atendimentoDeDemandas) {
      let disciplina = disciplinasDemandadas[codigoDisciplina];
      console.log(disciplina);
      let linhaDaTabela = (
        <tr key={codigoDisciplina}>
          <td>{codigoDisciplina}</td>
          <td>{disciplina.numeroDeTurmas}</td>
          <td>{disciplina.alunosDemandando.length}</td>
        </tr>
      );
      linhasDaTabela.push(linhaDaTabela);
    }

    return (
      <table>
        <thead>
          <tr>
            <th>Código da Disciplina</th>
            <th>Número de Turmas</th>
            <th>Número de Alunos Demandando</th>
          </tr>
        </thead>
        <tbody>{linhasDaTabela}</tbody>
      </table>
    );
  }

  return (
    <div>
      <TabelaDemandasAtendidas />
    </div>
  );
}

export default CalculoDemandasAtendidas;
