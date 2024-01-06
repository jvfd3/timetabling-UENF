import React, { useState } from "react";
import options from "../../../DB/local/options";
import CRUDPageSelection from "../../../components/PageSelect";
import {
  // getApelidoDisciplina,
  // getApelidoProfessor,
  getFullHorarios,
  // getPeriodoEsperado,
  getTurmasDaHora,
  getTurmasDoAnoSemestre,
  getTurmasDoDia,
} from "../../../helpers/auxFunctions";
import { SelectAnoSemestre } from "../../../components/mySelects";
import "./ccTable.css";
import { getTurmasData } from "../../../DB/retrieveData";
import { splitTurmas } from "../../../helpers/conflicts/auxiliarConflictsFunctions";

function VisualizacaoCC() {
  let semesters = options.constantValues.semesters;
  let years = options.constantValues.years;
  const [ano, setAno] = useState(years[10]);
  const [semestre, setSemestre] = useState(semesters[0]);

  let myTimeStates = {
    ano,
    setAno,
    semestre,
    setSemestre,
  };

  let turmas = getTurmasData();

  let TurmasDoSemestre = getTurmasDoAnoSemestre(
    turmas,
    ano.value,
    semestre.value
  );

  let splittedCurrentClasses = splitTurmas(TurmasDoSemestre);

  // console.log("TurmasDoSemestre", TurmasDoSemestre);

  function TabelaCC() {
    function Header() {
      function TopLeft() {
        return <th className="TopLeftCorner"></th>;
      }

      function TopRow() {
        let dias = options.constantValues.days.map((dia, index) => {
          return (
            <th key={index} className="DiasHeader">
              {dia.label}
            </th>
          );
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
      function Linha({ hora }) {
        let turmasDaHora = getTurmasDaHora(splittedCurrentClasses, hora);
        // console.log("turmasDaHora", turmasDaHora);
        // console.log("hora", hora);
        let colunasDosDias = options.constantValues.days.map((dia) => {
          let turmasDoDia = getTurmasDoDia(turmasDaHora, dia.value);

          function CellContent({ turmas }) {
            let listaDeTurmas = turmas.map((turma) => {
              // console.log("turma", turma.sala);
              let subject = turma.disciplina;
              let sala = turma.sala;
              let subjectInfo = `${subject.periodo} - ${subject.apelido}`;
              let profInfo = `${turma.professor.apelido}`;
              let roomInfo = `${sala.bloco}${
                sala.codigo ? "-" + sala.codigo : ""
              }`;
              let cellMessage = `${subjectInfo} (${profInfo} / ${roomInfo})`;
              return (
                <div
                  key={`ChaveCellContent: ${turma.idTurma}-${turma.idHorario}`}
                  className="eachClassInCell"
                >
                  {cellMessage}
                </div>
              );
            });

            return listaDeTurmas;
          }

          return (
            <td
              key={`Key Coluna: ${dia.value}-${hora}`}
              className="ContentCell"
            >
              <CellContent turmas={turmasDoDia} />
            </td>
          );
        });

        return (
          <tr key={`Linha: ${hora}`}>
            <td className="HorariosCol" key={`Linha: ${hora}, Header: ${hora}`}>
              {hora}
            </td>
            {colunasDosDias}
          </tr>
        );
      }

      return (
        <tbody>
          {options.constantValues.hoursTang.map((hora, rowIndex) => (
            <Linha key={`Linha: ${hora.hora}`} hora={hora.hora} />
          ))}
        </tbody>
      );
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
        <SelectAnoSemestre {...myTimeStates} />
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
