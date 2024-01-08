import React, { useEffect, useState } from "react";
import options from "../../../DB/local/options";
import CRUDPageSelection from "../../../components/PageSelect";
import {
  // getApelidoDisciplina,
  // getApelidoProfessor,
  // getFullHorarios,
  // getPeriodoEsperado,
  getTurmasDaHora,
  getTurmasDoAnoSemestre,
  getTurmasDoDia,
} from "../../../helpers/auxFunctions";
import {
  SelectAnoSemestre,
  SelectFilterAno,
  SelectFilterExpectedSemester,
  SelectFilterProfessor,
  SelectFilterRoom,
  SelectFilterSemester,
} from "../../../components/mySelects";
import "./ccTable.css";
import { getTurmasData } from "../../../DB/retrieveData";
import { splitTurmas } from "../../../helpers/conflicts/auxiliarConflictsFunctions";
import { allLocalJsonData } from "../../../DB/local/dataFromJSON";
import {
  filterExpectedSemester,
  filterProfessor,
  filterRoom,
} from "../../../helpers/filters";

function FilteringSelects(filterProps) {
  let {
    ano,
    setAno,
    semestre,
    setSemestre,
    professor,
    setProfessor,
    room,
    setRoom,
    expectedSemester,
    setExpectedSemester,
  } = filterProps;
  let myTimeStates = {
    ano,
    setAno,
    semestre,
    setSemestre,
  };
  let anoProps = {
    ano,
    setAno,
  };
  let semestreProps = {
    semestre,
    setSemestre,
  };
  let professorProps = {
    professor,
    setProfessor,
  };
  let roomProps = {
    room,
    setRoom,
  };
  let expectedSemesterProps = {
    expectedSemester,
    setExpectedSemester,
  };
  return (
    <div className="filterHeader">
      <SelectAnoSemestre {...myTimeStates} />
      <SelectFilterAno {...anoProps} />
      <SelectFilterSemester {...semestreProps} />
      <SelectFilterProfessor {...professorProps} />
      <SelectFilterRoom {...roomProps} />
      <SelectFilterExpectedSemester {...expectedSemesterProps} />
    </div>
  );
}

function VisualizacaoCC() {
  let years = options.constantValues.years;
  let semesters = options.constantValues.semesters;
  const [ano, setAno] = useState(years[10]);
  const [semestre, setSemestre] = useState(semesters[0]);
  const [professor, setProfessor] = useState(null);
  const [room, setRoom] = useState(null);
  const [expectedSemester, setExpectedSemester] = useState(null);

  let turmas = getTurmasData();

  let splittedCurrentClasses = splitTurmas(turmas);
  // let TurmasDoSemestre = getTurmasDoAnoSemestre(
  //   turmas,
  //   ano.value,
  //   semestre.value
  // );

  const [currentClasses, setCurrentClasses] = useState(splittedCurrentClasses);

  useEffect(() => {
    let filteringClasses = splittedCurrentClasses;
    filteringClasses = filterProfessor(filteringClasses, professor);
    filteringClasses = filterRoom(filteringClasses, room);
    filteringClasses = filterExpectedSemester(
      filteringClasses,
      expectedSemester
    );
    setCurrentClasses(filteringClasses);
  }, [ano, semestre, professor, room, expectedSemester]);

  const filterProps = {
    ano,
    setAno,
    semestre,
    setSemestre,
    professor,
    setProfessor,
    room,
    setRoom,
    expectedSemester,
    setExpectedSemester,
  };
  // filterProfessor(splittedCurrentClasses, tempprofessor);
  // filterRoom(splittedCurrentClasses, room);
  filterExpectedSemester(splittedCurrentClasses, expectedSemester);

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
        let turmasDaHora = getTurmasDaHora(curClasses, hora);
        // console.log("turmasDaHora", turmasDaHora);
        // console.log("hora", hora);
        let colunasDosDias = options.constantValues.days.map((dia) => {
          let turmasDoDia = getTurmasDoDia(turmasDaHora, dia.value);

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
        <FilteringSelects {...filterProps} />
        <TabelaCC curClasses={currentClasses} />
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
