/* O que esta página deve fazer?

- Fazer uma visualização bonitinha para os selects:
  - Select de Código: Disciplina deve estar em cima na esquerda
  - Select de Período: à esquerda do Select de código
  - Select de professores deve estar abaixo do Select de Códigos.
  - Select de requisitos deve estar abaixo do Select de professores.
- [x] Devo obter as informações das disciplinas do JSONBIN
- Transformar as informações para que cada nome de disciplina esteja na key "label" e o código na key "value"
- devo converter a lista de codigos de requisitos para uma lista de dicionários com a estrutura {label: "nome", value: "codigo"}
  - essa lista deve ser definida como value do Select de requisitos
- a seleção de disciplinas é a seleção principal, seu valor base deve ser a disciplina monografia
- ao alterar a disciplina, deve-se alterar todos os outros selects.
- ao alterar cada um dos selects, deve-se alterar o valor do estado da página.
- para cada disciplina, deve-se vasculhar quais são os professores que o têm na lista de disciplinas que ministram.
  - Os professores encontrados devem se tornar uma lista de dicionários com a estrutura {value = "nome do professor", label = "laboratório"}
  - esse valor deve estar definido como value no Select de Docentes
- ao alterar cada um dos selects, a alteração deve ser enviada ao JSONBIN. - DO LATER
*/
import React, { useState, useEffect } from "react";
import "../CSS/ccTable.css";
import "../CSS/defaultStyle.css";
import options from "../temp/options";
import CRUDPageSelection from "../components/PageSelect";
import { allLocalJsonData } from "../../DB/dataFromJSON";
import { splitTurmas } from "../functions/conflicts/auxiliarConflictsFunctions";
import {
  getApelidoDisciplina,
  getApelidoProfessor,
  getPeriodoEsperado,
  getTurmasDaHora,
  getTurmasDoAnoSemestre,
  getTurmasDoDia,
} from "../functions/auxFunctions";
import { SelectAnoSemestre } from "../components/mySelects";

function VisualizacaoCC() {
  let semestres = options.constantValues.semesters;
  let anos = options.constantValues.years;
  const [ano, setAno] = useState(anos[10]);
  const [semestre, setSemestre] = useState(semestres[0]);

  let turmas = allLocalJsonData.dynamic.turmas;
  let TurmasDoSemestre = getTurmasDoAnoSemestre(
    turmas,
    ano.value,
    semestre.value
  );
  let splittedTurmasDoSemestre = splitTurmas(TurmasDoSemestre);

  function TabelaCC() {
    function Header() {
      function TopLeft() {
        return <th className="TopLeftCorner"></th>;
      }

      function TopRow() {
        let dias = options.constantValues.days.map((dia) => {
          return <th className="DiasHeader">{dia.label}</th>;
        });

        return [dias];
      }
      return (
        <thead>
          <tr className="HeaderRow">
            <TopLeft />
            <TopRow />
          </tr>
        </thead>
      );
    }

    function Body() {
      function Linha(props) {
        let { hora } = props;
        let horaValue = hora.hora;
        let turmasDaHora = getTurmasDaHora(splittedTurmasDoSemestre, horaValue);
        let dias = options.constantValues.days.map((dia) => {
          let turmasDoDia = getTurmasDoDia(turmasDaHora, dia.value);

          function CellContent(props) {
            let { turmas } = props;

            let listaDeTurmas = turmas.map((turma) => {
              let periodo = getPeriodoEsperado(turma.codigoDisciplina);
              let apelidoDisciplina = getApelidoDisciplina(
                turma.codigoDisciplina
              );
              let apelidoProfessor = getApelidoProfessor(turma.professor);
              return (
                <div className="eachClassInCell">
                  {periodo} - {apelidoDisciplina} - ({apelidoProfessor} /{" "}
                  {turma.sala})
                </div>
              );
            });

            return listaDeTurmas;
          }

          return (
            <td className="ContentCell">
              <CellContent turmas={turmasDoDia} />
            </td>
          );
        });

        return (
          <tr>
            <td className="HorariosCol">{horaValue}</td>
            {dias}
          </tr>
        );
      }

      let linhas = options.constantValues.hoursTang.map((hora, rowIndex) => {
        return <Linha key={rowIndex} hora={hora} />;
      });

      return <tbody>{linhas}</tbody>;
    }

    return (
      <table className="TabelaCC">
        <Header />
        <Body />
      </table>
    );
  }

  return (
    <div className="CRUDContainComponents">
      <div className="infoCard">
        <SelectAnoSemestre
          ano={ano}
          setAno={setAno}
          semestre={semestre}
          setSemestre={setSemestre}
        />
        <TabelaCC />
      </div>
    </div>
  );
}

function CCTable() {
  let defaultPage = options.constantValues.pageSelection.CCTable;
  return (
    <div className="background">
      <CRUDPageSelection defaultValue={defaultPage} />
      <VisualizacaoCC />
    </div>
  );
}

export default CCTable;
