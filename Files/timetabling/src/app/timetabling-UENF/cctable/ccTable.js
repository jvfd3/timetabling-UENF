import React, { useState } from "react";
import options from "../../../DB/local/options";
import CRUDPageSelection from "../../../components/PageSelect";
import "./ccTable.css";
import { getTurmasData } from "../../../DB/retrieveData";
import { splitTurmas } from "../../../helpers/conflicts/auxiliarConflictsFunctions";
import { filterDay, filterHour } from "../../../helpers/filters";
import { FilteringSelects } from "../../../components/filteringSelects";

function VisualizacaoCC() {
  let turmas = getTurmasData();
  let allSplittedClasses = splitTurmas(turmas);
  const [currentClasses, setCurrentClasses] = useState(allSplittedClasses);

  let classesStates = {
    currentClasses,
    setCurrentClasses,
    allSplittedClasses,
  };

  function TabelaCC({ curClasses }) {
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
        let turmasDaHora = filterHour(curClasses, hora);
        // console.log("turmasDaHora", turmasDaHora);
        // console.log("hora", hora);
        let colunasDosDias = options.constantValues.days.map((dia) => {
          let turmasDoDia = filterDay(turmasDaHora, dia.value);

          function CellContent({ turmas }) {
            function getCellMessage(turma) {
              // console.log("turma", turma.sala);
              let subject = turma.disciplina;
              let prof = turma.professor;
              let room = turma.sala;
              let subjectInfo = "";
              let profInfo = "";
              let roomInfo = "";
              if (subject) {
                subjectInfo += `${subject?.periodo} - ${subject?.apelido}`;
              } else {
                subjectInfo = "Discip. indef.";
              }
              if (prof) {
                profInfo += `${prof.apelido}`;
              } else {
                profInfo = "Prof. indef.";
              }

              if (room) {
                roomInfo += `${room?.bloco}${
                  room?.codigo ? "-" + room?.codigo : ""
                }`;
              } else {
                roomInfo = "Sala indef.";
              }
              let cellMessage = `${subjectInfo} (${profInfo} / ${roomInfo})`;
              return cellMessage;
            }

            let listaDeTurmas = turmas.map((turma) => {
              let cellMessage = getCellMessage(turma);
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
        <FilteringSelects {...classesStates} />
        <TabelaCC curClasses={currentClasses} />
      </div>
    </div>
  );
}

function CCTable() {
  let defaultPageValue = options.constantValues.pageSelection.CCTable;
  return (
    <div className="background">
      <CRUDPageSelection defaultValue={defaultPageValue} />
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
