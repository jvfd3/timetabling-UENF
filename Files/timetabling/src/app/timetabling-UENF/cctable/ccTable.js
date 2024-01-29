import "./ccTable.css";
import React, { useState } from "react";
import options from "../../../DB/local/options";
import CRUDPageSelection from "../../../components/PageSelect";
import { getClassesData } from "../../../DB/retrieveData";
import { splitTurmas } from "../../../helpers/conflicts/auxConflictFunctions";
import { filterDay, filterHour } from "../../../helpers/filteringFunc";
import { CCTableFilters } from "../../../components/Filters/Filters";

function CCTableView() {
  const turmas = getClassesData();
  const allSplittedClasses = splitTurmas(turmas);
  const [currentClasses, setCurrentClasses] = useState(allSplittedClasses);

  function CCTable2({ curClasses }) {
    function Header() {
      function TopLeft() {
        return <th className="TopLeftCorner"></th>;
      }

      function TopRow() {
        const daysList = options.constantValues.days;
        const days = daysList.map((day, index) => {
          return (
            <th key={index} className="DiasHeader">
              {day.label}
            </th>
          );
        });

        return [days];
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
        const turmasDaHora = filterHour(curClasses, hora);
        // console.log("turmasDaHora", turmasDaHora);
        // console.log("hora", hora);
        const daysColumn = options.constantValues.days.map((dia) => {
          const turmasDoDia = filterDay(turmasDaHora, dia.value);

          function CellContent({ turmas }) {
            function getCellMessage(turma) {
              // console.log("turma", turma.sala);
              const subject = turma.disciplina;
              const prof = turma.professor;
              const room = turma.sala;
              const subjectInfo = subject
                ? `${subject?.periodo} - ${subject?.apelido}`
                : "Discip. indef.";
              const profInfo = prof ? `${prof.apelido}` : "Prof. indef.";
              const roomInfo = room
                ? `${room?.bloco}${room?.codigo ? "-" + room?.codigo : ""}`
                : "Sala indef.";
              const cellMessage = `${subjectInfo} (${profInfo} / ${roomInfo})`;
              return cellMessage;
            }

            const listaDeTurmas = turmas.map((turma) => {
              const cellMessage = getCellMessage(turma);
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
            {daysColumn}
          </tr>
        );
      }
      const hoursTangList = options.constantValues.hoursTang;
      return (
        <tbody>
          {hoursTangList.map((iterHour) => (
            <Linha key={`Linha: ${iterHour.hora}`} hora={iterHour.hora} />
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

  const filterStates = { allSplittedClasses, setCurrentClasses };

  return (
    <div className="CRUDContainComponents">
      <div className="infoCard">
        <CCTableFilters {...filterStates} />
        <CCTable2 curClasses={currentClasses} />
      </div>
    </div>
  );
}

function CCTable() {
  const defaultPageValue = options.constantValues.pageSelection.CCTable;
  return (
    <div className="background">
      <CRUDPageSelection defaultValue={defaultPageValue} />
      <CCTableView />
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
