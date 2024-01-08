import React, { useState, useEffect, useRef } from "react";
import options from "../../../DB/local/options";
import CRUDPageSelection from "../../../components/PageSelect";
import {
  SelectDisciplina,
  SelectProfessor,
  SelectSala,
  SelectDia,
  SelectHoraTang,
  SelectDuracao,
  SelectAnoSemestre,
  SelectTesting,
} from "../../../components/mySelects";
// import {
//   centralConflicts,
//   coloredConflicts,
//   conflictsDisciplinaPeriodo,
// } from "../../../helpers/conflicts/centralConflicts";
import "./multiTurmas.css";
import { getTurmasDoAnoSemestre } from "../../../helpers/auxFunctions";
import { NumberInputDemandaEstimada } from "../../../components/MyTextFields";
import {
  SmartCreateTurma,
  SmartDeleteTurma,
  SmartCreateHora,
  SmartDeleteHora,
} from "../../../components/Buttons/Smart/Smart";
import { getTurmasData } from "../../../DB/retrieveData";
import { baseTurmaConflicts } from "../../../helpers/conflicts/centralConflicts";
import { allLocalJsonData } from "../../../DB/local/dataFromJSON";
import { InputDisciplina } from "../../../components/Buttons/Dumb/Dumb";

/* ESTRUTURA DOS COMPONENTES
- CRUDclass
  - CRUDPageSelection
  - Turmas
    - SemTurmas
    - TurmasCard
      - MultiTurmasTitle
        - h2
        - SelectAnoSemestre
      - TurmasTable
        - TableHeader
        - tbody
          - TableRow
            - SmartDeleteTurma
            - SelectDisciplina
            - SelectProfessor
            - NumberInputDemandaEstimada
            - HorariosTable
              - SmartCreateHora
              - HorariosTableRow
                - SmartDeleteHora
                - SelectSala
                - SelectDia
                - SelectHoraTang
                - SelectDuracao
*/

function TableHeader(myProps) {
  const { myTurmasProps, myCurrentSemestreProps } = myProps;
  const { turmas, setTurmas, classIndex, classTimeIndex } = myTurmasProps;
  const { semestre, ano } = myCurrentSemestreProps;
  const createStates = {
    turmas,
    setTurmas,
    semestre,
    ano,
    classIndex,
    classTimeIndex,
  };
  // console.log("TableHeader>2", classIndex);
  return (
    <thead>
      <tr>
        <th>
          <SmartCreateTurma {...createStates} />
        </th>
        <th>Código - Nome</th>
        <th>Professor</th>
        <th>Demanda Estimada</th>
        <th colSpan={2}>Horarios</th>
      </tr>
    </thead>
  );
}

function HorariosTableRow(myProps) {
  const { turmas, turma, setTurma, horario, indexHorario, conflicts } = myProps;

  let professorConflicts = conflicts.raw.professor.alloc;
  let singleDemandConflicts = conflicts.raw.expectedDemand.singleTurmaCapacity;
  // console.log("singleDemandConflicts", singleDemandConflicts);

  let conflictStyles = {
    day: {},
    hour: {},
    classRoom: {
      title: "Sala",
      style: { backgroundColor: "" },
    },
  };
  /*
  professorConflicts é uma lista de conflitos podendo ter 0 ou mais conflitos.
  cada conflito é um objeto com a seguinte estrutura:
  {
    from: {
      idTurma: "T01",
      idHorario: "H01",
    },
    time: {
      day: "SEGUNDA",
      hour: "8",
    },
    to: [
      {
        idTurma: "T02",
        idHorario: "H01",
      },
      {
        idTurma: "T03",
        idHorario: "H01",
      },
    ],
    type: {
      name: "Conflito de alocação múltipla",
      weight: 3,
    },
  }
  a turma recebida nas props é a turma que está sendo renderizada.
  ela tem a seguinte estrutura relevante:
  {
    idTurma: "T01",
    horarios: [
      {
      idHorario: "H01",
      dia: "SEG",
      horaInicio: 8,
      duracao: 2,
      idTurma: T01
      },
    ]
  }
  e horário é o horário que está sendo renderizado.

  O que eu desejo é que, caso o horário que está sendo renderizado esteja em conflito com algum outro horário, ele seja colorido. Para isso, deve-se comprar o idHorario do horário que está sendo renderizado cada um dos idHorario do professorConflicts.to. Caso haja um match, o horário deve ser colorido.
  */

  // console.log(classDay, classHour + "h");
  // console.log("conflicts", conflicts);

  if (isConflict(professorConflicts)) {
    conflictStyles.day = conflicts.styled.professor;
    conflictStyles.hour = conflicts.styled.professor;
  }

  function isConflict(conflicts) {
    if (conflicts.length > 0) {
      for (let conflict of professorConflicts) {
        if (conflict.from.idHorario === horario.idHorario) {
          return true;
        }
      }
    }
    return false;
  }

  if (singleDemandConflicts.length > 0) {
    for (let conflict of singleDemandConflicts) {
      if (conflict.idClassTime === horario.idHorario) {
        conflictStyles.classRoom = conflicts.styled.demand;
      }
    }
  }

  return (
    <tr
      key={`HorariosTableRow>tr: ${horario.idHorario}-${horario.ordem}-${indexHorario}`}
    >
      <td>
        <SmartDeleteHora
          turma={turma}
          setTurma={setTurma}
          indexHorario={indexHorario}
        />
      </td>
      <td {...conflictStyles.classRoom}>
        <SelectSala
          lTurma={turma}
          setLTurma={setTurma}
          indexHorario={indexHorario}
        />
      </td>
      <td {...conflictStyles.day}>
        <SelectDia
          lTurma={turma}
          setLTurma={setTurma}
          indexHorario={indexHorario}
        />
      </td>
      <td {...conflictStyles.hour}>
        <SelectHoraTang
          lTurma={turma}
          setLTurma={setTurma}
          indexHorario={indexHorario}
        />
      </td>
      <td>
        <SelectDuracao
          lTurma={turma}
          setLTurma={setTurma}
          indexHorario={indexHorario}
        />
      </td>
    </tr>
  );
}

function HorariosTable(myProps) {
  const { rowStates, myTurmasProps, conflicts } = myProps;
  const { rowTurma, setRowTurma } = rowStates;
  const { turmas, setTurmas, turma, setTurma, classTimeIndex } = myTurmasProps;
  const createHourProps = {
    turmas,
    setTurmas,
    rowTurma,
    setRowTurma,
    classTimeIndex,
  };
  return (
    <table>
      <thead>
        <tr key={`LinhaHorarios-${rowTurma.idTurma}`}>
          <th>
            <SmartCreateHora {...createHourProps} />
          </th>
          <th>Sala</th>
          <th>Dia</th>
          <th>Hora Início</th>
          <th>Duração</th>
        </tr>
      </thead>
      <tbody>
        {rowTurma.horarios.map((horario, index) => (
          <HorariosTableRow
            key={`HorariosTable>HorariosTableRow: ${horario.idHorario}-${horario.ordem}-${index}`}
            turmas={turmas}
            turma={rowTurma}
            setTurma={setRowTurma}
            horario={horario}
            conflicts={conflicts}
            indexHorario={index}
          />
        ))}
      </tbody>
    </table>
  );
}

function TableRow(myProps) {
  const { lTurma, myTurmasProps, myCurrentSemestreProps } = myProps;
  const { turmas, setTurmas, turma, setTurma, classTimeIndex } = myTurmasProps;
  const { semestre, ano } = myCurrentSemestreProps;

  const [rowTurma, setRowTurma] = useState(lTurma);
  const rowStates = { rowTurma, setRowTurma };
  const createHourProps = {
    turmas,
    setTurmas,
    rowTurma,
    setRowTurma,
    classTimeIndex,
  };

  /*
  Pretendo percorrer todas as turmas e verificar se há conflitos entre elas.
  Para isso, preciso de uma função que receba a lista de turmas e a turma em questão.
  Essa função deve retornar um objeto com os conflitos encontrados.
  Esse objeto deve ser usado para colorir a linha da tabela.
  Esse objeto deve ter a seguinte estrutura:
  {
    conflitosDisciplinaPeriodo: {
      title: "Conflitos Disciplina Período",
      style: { backgroundColor: "#6560f0" },
    },
    conflitosProfessor: {
      title: "Conflitos Professor",
      style: { backgroundColor: "#84d47d" },
    },
    conflitosDemanda: {
      title: "Conflitos Demanda",
      style: { backgroundColor: "#d9b57c" },
    },
  }
  */
  let conflicts = baseTurmaConflicts(turmas, rowTurma, semestre.value);
  // console.log("rowTurma", rowTurma);
  // console.log("conflicts", conflicts);

  return (
    <tr
      key={`TableRow>tr: ${lTurma.idTurma}-${lTurma.disciplina?.codigoDisciplina}-${lTurma?.professor?.nome}`}
    >
      <td>
        <SmartDeleteTurma
          turmas={turmas}
          setTurmas={setTurmas}
          turma={rowTurma}
        />
      </td>
      <td {...conflicts.styled.disciplina}>
        <SelectDisciplina lTurma={rowTurma} setLTurma={setRowTurma} />
      </td>
      <td {...conflicts.styled.professor}>
        <SelectProfessor lTurma={rowTurma} setLTurma={setRowTurma} />
      </td>
      <td {...conflicts.styled.demand}>
        <NumberInputDemandaEstimada lTurma={rowTurma} setLTurma={setRowTurma} />
      </td>
      <td>
        {rowTurma.horarios === null || rowTurma.horarios.length === 0 ? (
          <SmartCreateHora {...createHourProps} />
        ) : (
          <HorariosTable
            rowStates={rowStates}
            myTurmasProps={myTurmasProps}
            conflicts={conflicts}
          />
        )}
      </td>
    </tr>
  );
}

function TurmasTable(myProps) {
  const { myTurmasProps, myCurrentSemestreProps } = myProps;
  const { turmas, setTurmas, turma, setTurma } = myTurmasProps;
  return (
    <table className="showBasicDataTable">
      <TableHeader {...myProps} />
      <tbody>
        {turmas.map((lTurma, index) => (
          <TableRow
            lTurma={lTurma}
            myTurmasProps={myTurmasProps}
            myCurrentSemestreProps={myCurrentSemestreProps}
            key={`TableRow: ${lTurma.idTurma}-${lTurma.disciplina?.codigoDisciplina}-${lTurma?.professor?.nome}-${index}`}
          />
        ))}
      </tbody>
    </table>
  );
}

function SemTurmas(myProps) {
  const { myTurmasProps, myCurrentSemestreProps } = myProps;
  const { turmas, setTurmas, classIndex, classTimeIndex } = myTurmasProps;
  const { semestre, ano } = myCurrentSemestreProps;
  const createStates = {
    turmas,
    setTurmas,
    semestre,
    ano,
    classIndex,
    classTimeIndex,
  };
  return (
    <div
      className="infoCard"
      style={{ display: "flex", flexDirection: "row", textAlignLast: "center" }}
    >
      <p>Ainda não há turmas cadastradas. Clique Aqui</p>
      <SmartCreateTurma {...createStates} />
      <p>para criar uma turma</p>
    </div>
  );
}

function TurmasCard(myProps) {
  const { myTurmasProps, myCurrentSemestreProps } = myProps;
  const { turmas, setTurmas, turma, setTurma } = myTurmasProps;

  return (
    <div className="infoCard">
      <div className="MultiTurmasTitle">
        <h2>MultiTurmas</h2>
        <SelectAnoSemestre {...myCurrentSemestreProps} />
      </div>
      {turmas.length === 0 ? (
        <SemTurmas {...myProps} />
      ) : (
        <TurmasTable {...myProps} />
      )}
    </div>
  );
}

function NotOfferedSubjects(props) {
  const { myTurmasProps, myCurrentSemestreProps } = props;
  const { turmas, setTurmas, turma, setTurma, classIndex } = myTurmasProps;
  const { semestre, ano } = myCurrentSemestreProps;
  let year = ano.value;
  let semester = semestre.value;
  // console.log(semester);
  // console.log("turmas", turmas);
  // Percorra cada turma em turmas e preencha uma lista dos códigos das disciplinas oferecidas pelas turmas
  let disciplinasOferecidas = turmas
    .map((turma) => turma.disciplina?.codigo)
    .filter(Boolean);
  // Neste código, filter(Boolean) remove todos os valores falsy do array, incluindo null e undefined.
  // console.log("disciplinasOferecidas", disciplinasOferecidas);

  // let TodasDisciplinas = allLocalJsonData.static.infoDisciplinasCC;
  let TodasDisciplinas = allLocalJsonData.SQL.disciplinas;

  // Listar todas os código-nomes de disciplinas que são de semestre ímpar
  // Filtrar todas que são de periodoEsperado%2 == 1
  let DisciplinasDoSemestre = TodasDisciplinas;
  if (semester !== 3) {
    DisciplinasDoSemestre = TodasDisciplinas.filter(
      (disciplina) => disciplina.periodo % 2 === semester % 2
    );
  }

  // Percorrer cada disciplina em DisciplinasDoSemestre e, caso o código da disciplina esteja na lista de disciplinas oferecidas, remover da lista.
  let DisciplinasAindaNaoOferecidas = DisciplinasDoSemestre.filter(
    (disciplina) => {
      return !disciplinasOferecidas.includes(disciplina.codigo);
    }
  );

  // console.log("DisciplinasAindaNaoOferecidas", DisciplinasAindaNaoOferecidas);

  function addSubjectsToClasses(subjects) {
    // console.log("subjects", subjects);
    let turmasToAdd = subjects.map((subject) => {
      classIndex.current += 1;
      let blankClass = options.emptyObjects.turma;
      let newTurma = {
        ...blankClass,
        idTurma: `${year}0${semester}-${classIndex.current}`,
        disciplina: subject,
        ano: year,
        semestre: semester,
      };
      return newTurma;
    });
    // console.log("turmasToAdd", turmasToAdd);
    setTurmas([...turmas, ...turmasToAdd]);
  }

  // Se o período da disciplina for 1, aplicar o className EnfasePrimeiroPeriodo
  function SubjectsTableBody() {
    return (
      <tbody>
        {DisciplinasAindaNaoOferecidas.map((disciplina) => (
          <tr key={disciplina.codigo}>
            <td
              className={
                disciplina.periodo === 1 ? "EnfasePrimeiroPeriodo" : ""
              }
            >
              <InputDisciplina
                text={`Criar uma turma para a disciplina ${disciplina.codigo}`}
                insertDiscFunc={() => {
                  addSubjectsToClasses([disciplina]);
                }}
              />
            </td>
            <td
              className={
                disciplina.periodo === 1 ? "EnfasePrimeiroPeriodo" : ""
              }
            >
              {`${disciplina.periodo} - (${disciplina.codigo}) ${disciplina.nome}`}
            </td>
          </tr>
        ))}
      </tbody>
    );
  }

  function TabelaDeDisciplinasASereOferecidas() {
    return (
      <div>
        <h1>
          Disciplinas ainda não oferecidas do
          {
            // Disciplinas do período{" "}
            // {semester === 1 ? "ím" : ""}par ainda não oferecidas
            semester === 1
              ? " período ímpar "
              : semester === 2
              ? " período par "
              : "s períodos "
          }
        </h1>
        <table className="showBasicDataTable">
          <thead>
            <tr>
              <th>
                <InputDisciplina
                  size="4em"
                  text="Adicionar todas as turmas pendentes"
                  insertDiscFunc={() =>
                    addSubjectsToClasses(DisciplinasAindaNaoOferecidas)
                  }
                />
              </th>
              <th>Período - (Código) Nome</th>
            </tr>
          </thead>
          <SubjectsTableBody />
        </table>
      </div>
    );
  }

  function DisciplinasMínimasForamOferecidas() {
    return (
      <div>
        <h1>Todas as disciplinas do período ímpar foram oferecidas 👍</h1>
      </div>
    );
  }

  return (
    <div>
      {DisciplinasAindaNaoOferecidas.length === 0 ? (
        <DisciplinasMínimasForamOferecidas />
      ) : (
        <TabelaDeDisciplinasASereOferecidas />
      )}
    </div>
  );
}

function Turmas() {
  const [ano, setAno] = useState(options.constantValues.years[14]);
  const [semestre, setSemestre] = useState(options.constantValues.semesters[0]);
  const [professor, setProfessor] = useState(null);
  const [disciplina, setDisciplina] = useState(null);
  const [sala, setSala] = useState(null);
  /* Filters States */

  let unifiedHorarios = getTurmasData();

  let filteredTurmas = getTurmasDoAnoSemestre(
    unifiedHorarios,
    ano.value,
    semestre.value
  );

  const [turmas, setTurmas] = useState(filteredTurmas);
  const [turma, setTurma] = useState(filteredTurmas[0]);
  /* useEffect(() => {
    setTurmas();
    setTurma();
  }, []); */

  const classIndex = useRef(turmas.length);
  const classTimeIndex = useRef(allLocalJsonData.SQL.horarios.length);
  // console.log("Turmas>1", classIndex);

  useEffect(() => {
    console.log("ano", ano.value, "semestre", semestre.value);
    // console.log(unifiedHorarios[unifiedHorarios.length - 1]);
    let newFilteredTurmas = getTurmasDoAnoSemestre(
      unifiedHorarios,
      ano.value,
      semestre.value
    );
    setTurmas(newFilteredTurmas);
    setTurma(newFilteredTurmas[0]);
  }, [ano, semestre]);

  let myCurrentSemestreProps = { ano, setAno, semestre, setSemestre };
  let myTurmasProps = {
    turmas,
    setTurmas,
    turma,
    setTurma,
    classIndex,
    classTimeIndex,
  };
  let myProps = { myTurmasProps, myCurrentSemestreProps };

  return (
    <div className="CRUDContainComponents">
      <TurmasCard {...myProps} />
      <NotOfferedSubjects {...myProps} />
    </div>
  );
}

function CRUDclass() {
  return (
    <div className="background">
      <CRUDPageSelection
        defaultValue={options.constantValues.pageSelection.multiTurmas}
      />
      <SelectTesting />
      <Turmas />
    </div>
  );
}

export default CRUDclass;
