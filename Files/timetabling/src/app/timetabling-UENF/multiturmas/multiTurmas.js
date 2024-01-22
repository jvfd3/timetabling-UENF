import "./multiTurmas.css";
import React, { useState, useEffect, useRef } from "react";
import options from "../../../DB/local/options";
import CRUDPageSelection from "../../../components/PageSelect";
import {
  SelectSala,
  SelectDia,
  SelectHoraTang,
  SelectDuracao,
  SelectAnoSemestre,
  SelectClassSubject,
  SelectClassProfessor,
} from "../../../components/mySelects";
import { getTurmasDoAnoSemestre } from "../../../helpers/auxFunctions";
import { NumberInputMultiClassesExpectedDemand } from "../../../components/MyTextFields";
import {
  SmartCreateClassItem,
  SmartDeleteClassItem,
  SmartCreateClassTime,
  SmartDeleteClassTime,
} from "../../../components/Buttons/Smart/Smart";
import { getClassesData } from "../../../DB/retrieveData";
import { baseClassItemConflicts } from "../../../helpers/conflicts/centralConflicts";
import { sqlDataFromJson } from "../../../DB/local/dataFromJSON";
import { InputDisciplina } from "../../../components/Buttons/Dumb/Dumb";
import { splitTurmas } from "../../../helpers/conflicts/auxiliarConflictsFunctions";
import {
  createClass,
  readClass,
  updateClass,
  deleteClass,
} from "../../../helpers/CRUDFunctions/classCRUD";
import { MultiClassesFilters } from "../../../components/Filters/Filters";

/* COMPONENTS STRUCTURE
- CRUDclass
  - CRUDPageSelection
  - Turmas
    - NoOfferedClasses
    - MultiClassesCard
      - MultiTurmasTitle
        - h2
        - SelectAnoSemestre
      - ClassesTable
        - TableHeader
        - tbody
          - TableRow
            - SmartDeleteClassItem
            - SelectMultiClassesSubject
            - SelectMultiClassesProfessor
            - NumberInputDemandaEstimada
            - ClassTimeTable
              - SmartCreateClassTime
              - ClassTimeTableRow
                - SmartDeleteClassTime
                - SelectSala
                - SelectDia
                - SelectHoraTang
                - SelectDuracao
*/

function ClassTableHeader({ classesStates, currentSemesterProps }) {
  const createClassProps = {
    classesStates,
    ...currentSemesterProps,
    createClassDB: createClass,
  };
  return (
    <thead>
      <tr>
        <th>
          <SmartCreateClassItem {...createClassProps} />
        </th>
        <th>Código - Nome</th>
        <th>Professor</th>
        <th>Demanda Estimada</th>
        <th colSpan={5}>Horários</th>
      </tr>
    </thead>
  );
}

/* Remaining selects, but should be removed later */
function ClassTimeTableRow(classTimeTableRowProps) {
  const { classItem, setClassItem, classTime, classTimeIndex, conflicts } =
    classTimeTableRowProps;
  const currentClassTimeId = classTime.idHorario;
  const professorConflicts = conflicts.raw.professor.alloc;
  const singleDemandConflicts =
    conflicts.raw.expectedDemand.singleTurmaCapacity;
  // console.log("singleDemandConflicts", singleDemandConflicts);

  const conflictStyles = {
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
      for (const conflict of professorConflicts) {
        if (conflict.from.idHorario === classTime.idHorario) {
          return true;
        }
      }
    }
    return false;
  }

  if (singleDemandConflicts.length > 0) {
    for (const conflict of singleDemandConflicts) {
      if (conflict.idClassTime === horario.idHorario) {
        conflictStyles.classRoom = conflicts.styled.demand;
      }
    }
  }

  const classTimeTableRowKey = `ClassTimeTableRow: ${currentClassTimeId}-${classTimeIndex}`;

  return (
    <tr key={classTimeTableRowKey}>
      <td>
        <SmartDeleteClassTime
          turma={classItem}
          setTurma={setClassItem}
          idHorario={currentClassTimeId}
        />
      </td>
      <td {...conflictStyles.classRoom}>
        <SelectSala
          lTurma={classItem}
          setLTurma={setClassItem}
          indexHorario={classTimeIndex}
        />
      </td>
      <td {...conflictStyles.day}>
        <SelectDia
          lTurma={classItem}
          setLTurma={setClassItem}
          indexHorario={classTimeIndex}
        />
      </td>
      <td {...conflictStyles.hour}>
        <SelectHoraTang
          lTurma={classItem}
          setLTurma={setClassItem}
          indexHorario={classTimeIndex}
        />
      </td>
      <td>
        <SelectDuracao
          lTurma={classItem}
          setLTurma={setClassItem}
          indexHorario={classTimeIndex}
        />
      </td>
    </tr>
  );
}

/* Remaining SmartCreateClassTime props */
function ClassTimeTable({ classes, classItem, setClassItem, conflicts }) {
  const classTimeTableHeaderKey = `ClassTimeTableHeader: ${classItem.idTurma}`;
  return (
    <table>
      <thead>
        <tr key={classTimeTableHeaderKey}>
          <th>
            <SmartCreateClassTime />
          </th>
          <th>Sala</th>
          <th>Dia</th>
          <th>Hora Início</th>
          <th>Duração</th>
        </tr>
      </thead>
      <tbody>
        {classItem.horarios.map((iterClassTime, classTimeIndex) => {
          const classTimeTableRowProps = {
            classes,
            classItem,
            setClassItem,
            classTime: iterClassTime,
            classTimeIndex,
            conflicts,
          };
          const keyValue = `ClassTimeTable>ClassTimeTableRow: ${iterClassTime.idHorario}-${classTimeIndex}`;
          return (
            <ClassTimeTableRow {...classTimeTableRowProps} key={keyValue} />
          );
        })}
      </tbody>
    </table>
  );
}

function ClassItemTableRow(classTableRowProps) {
  const { iterClassItem, classes, setClasses, semester } = classTableRowProps;

  const [classItemRow, setClassItemRow] = useState(iterClassItem);

  const conflicts = baseClassItemConflicts(
    classes,
    classItemRow,
    semester.value
  );

  const rowClassStates = {
    classes,
    setClasses,
    classItem: classItemRow,
    setClassItem: setClassItemRow,
    conflicts,
  };

  const classItemRowKey = `ClassItemTableRow: ${classItemRow?.idTurma}-${classItemRow?.disciplina?.codigoDisciplina}-${classItemRow?.professor?.nome}`;

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
  // console.log("classItemRow", classItemRow);
  // console.log("conflicts", conflicts);

  console.log(classTableRowProps);

  return (
    <tr key={classItemRowKey}>
      <td>
        <SmartDeleteClassItem />
      </td>
      <td {...conflicts.styled.disciplina}>
        <SelectClassSubject {...rowClassStates} />
      </td>
      <td {...conflicts.styled.professor}>
        <SelectClassProfessor {...rowClassStates} />
      </td>
      <td {...conflicts.styled.demand}>
        <NumberInputMultiClassesExpectedDemand {...rowClassStates} />
      </td>
      <td>
        {classItemRow.horarios === null ||
        classItemRow.horarios.length === 0 ? (
          <SmartCreateClassTime />
        ) : (
          <ClassTimeTable {...rowClassStates} />
        )}
      </td>
    </tr>
  );
}

function ClassesTable(ClassesTableProps) {
  const { classesStates, currentSemesterProps } = ClassesTableProps;
  const { classes, setClasses } = classesStates;
  const { semester } = currentSemesterProps;
  return (
    <table className="showBasicDataTable">
      <ClassTableHeader {...ClassesTableProps} />
      <tbody>
        {classes.map((iterClassItem, iterClassItemIndex) => {
          const classItemTableRowProps = {
            iterClassItem,
            classes,
            setClasses,
            semester,
          };
          const classItemTableRowKey = `ClassItemTableRow: ${iterClassItem?.idTurma}-${iterClassItem?.disciplina?.codigo}-${iterClassItem?.professor?.nome}-${iterClassItemIndex}`;
          return (
            <ClassItemTableRow
              {...classItemTableRowProps}
              key={classItemTableRowKey}
            />
          );
        })}
      </tbody>
    </table>
  );
}

/* Remaining Create Item props */
function NoOfferedClasses() {
  return (
    <div
      className="infoCard"
      style={{ display: "flex", flexDirection: "row", textAlignLast: "center" }}
    >
      <p>Ainda não há turmas cadastradas. Clique Aqui</p>
      <SmartCreateClassItem />
      <p>para criar uma turma</p>
    </div>
  );
}

function MultiClassesCardHeader(currentSemesterProps) {
  // const { classes, setClasses, classItem, setClassItem } = classesStates;
  return (
    <div className="MultiTurmasTitle">
      <h2>MultiTurmas</h2>
      <SelectAnoSemestre {...currentSemesterProps} />
      {/* <MultiClassesFilters {...englishStates} /> */}
    </div>
  );
}

function MultiClassesCard(ClassesTableProps) {
  const { classesStates, currentSemesterProps } = ClassesTableProps;
  const hasClasses = classesStates.classes.length > 0;
  return (
    <div className="infoCard">
      <MultiClassesCardHeader {...currentSemesterProps} />
      {hasClasses ? (
        <ClassesTable {...ClassesTableProps} />
      ) : (
        <NoOfferedClasses />
      )}
    </div>
  );
}

function NotOfferedSubjects({ classesStates, currentSemesterProps }) {
  const { classes, setClasses, classIndex } = classesStates;
  const { year, semester } = currentSemesterProps;
  const yearValue = year?.value;
  const semesterValue = semester?.value;
  // console.log(semesterValue);
  // console.log("classes", classes);
  // Percorra cada turma em classes e preencha uma lista dos códigos das disciplinas oferecidas pelas classes
  const disciplinasOferecidas = classes
    .map((iterClassItem) => iterClassItem?.disciplina?.codigo)
    .filter(Boolean);
  // Neste código, filter(Boolean) remove todos os valores falsy do array, incluindo null e undefined.
  // console.log("disciplinasOferecidas", disciplinasOferecidas);

  const allSubjects = sqlDataFromJson.subjects;

  // Listar todas os código-nomes de disciplinas que são de semestre ímpar
  // Filtrar todas que são de periodoEsperado%2 == 1

  function checkParity(subject, semester) {
    const subjectParity = subject?.periodo % 2;
    const semesterParity = semester % 2;
    const sameParity = subjectParity === semesterParity;
    return sameParity;
  }
  const isSummerSemester = semesterValue === 3;
  const semesterSubject = !isSummerSemester
    ? allSubjects.filter((subject) => checkParity(subject, semesterValue))
    : allSubjects;

  // Percorrer cada disciplina em semesterSubject e, caso o código da disciplina esteja na lista de disciplinas oferecidas, remover da lista.
  const nonOfferedSubjects = semesterSubject.filter((disciplina) => {
    return !disciplinasOferecidas.includes(disciplina.codigo);
  });

  // console.log("nonOfferedSubjects", nonOfferedSubjects);

  function addSubjectsToClasses(subjects) {
    // console.log("subjects", subjects);
    const classesToAdd = subjects.map((subject) => {
      classIndex.current += 1;
      const blankClass = options.emptyObjects.classItem;
      const newClassItem = {
        ...blankClass,
        idTurma: `${yearValue}0${semesterValue}-${classIndex.current}`,
        disciplina: subject,
        ano: yearValue,
        semestre: semesterValue,
      };
      return newClassItem;
    });
    // console.log("classesToAdd", classesToAdd);
    setClasses([...classes, ...classesToAdd]);
  }

  // Se o período da disciplina for 1, aplicar o className EnfasePrimeiroPeriodo
  function SubjectsTableBody() {
    return (
      <tbody>
        {nonOfferedSubjects.map((iterSubject) => (
          <tr key={iterSubject.codigo}>
            <td
              className={
                iterSubject.periodo === 1 ? "EnfasePrimeiroPeriodo" : ""
              }
            >
              <InputDisciplina
                text={`Criar uma turma para a disciplina ${iterSubject.codigo}`}
                insertDiscFunc={() => {
                  addSubjectsToClasses([iterSubject]);
                }}
              />
            </td>
            <td
              className={
                iterSubject.periodo === 1 ? "EnfasePrimeiroPeriodo" : ""
              }
            >
              {`${iterSubject.periodo} - (${iterSubject.codigo}) ${iterSubject.nome}`}
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
            // {semesterValue === 1 ? "ím" : ""}par ainda não oferecidas
            semesterValue === 1
              ? " período ímpar "
              : semesterValue === 2
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
                    addSubjectsToClasses(nonOfferedSubjects)
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
      {nonOfferedSubjects.length === 0 ? (
        <DisciplinasMínimasForamOferecidas />
      ) : (
        <TabelaDeDisciplinasASereOferecidas />
      )}
    </div>
  );
}

function MultiClasses() {
  const classIndex = useRef(sqlDataFromJson.classes.length);
  const classTimeIndex = useRef(sqlDataFromJson.classtimes.length);

  const [year, setYear] = useState(options.constantValues.years[14]);
  const [semester, setSemester] = useState(options.constantValues.semesters[0]);

  const unifiedClassTimes = getClassesData();
  const filteredClasses = getTurmasDoAnoSemestre(
    unifiedClassTimes,
    year.value,
    semester.value
  );

  const [classes, setClasses] = useState(filteredClasses);
  const [classItem, setClassItem] = useState(classes[0]);

  const unifiedClasses = unifiedClassTimes;
  const allSplittedClasses = splitTurmas(unifiedClasses);

  useEffect(() => {
    const newFilteredTurmas = getTurmasDoAnoSemestre(
      unifiedClassTimes,
      year.value,
      semester.value
    );
    setClassItem(newFilteredTurmas[0]);
    setClasses(newFilteredTurmas);
  }, [year, semester]);

  const currentSemesterProps = { year, setYear, semester, setSemester };
  const classesStates = {
    classes,
    setClasses,
    classItem,
    setClassItem,
    classIndex,
    classTimeIndex,
    allSplittedClasses,
  };

  const baseProps = { classesStates, currentSemesterProps };

  return (
    <div className="CRUDContainComponents">
      <MultiClassesCard {...baseProps} />
      <NotOfferedSubjects {...baseProps} />
    </div>
  );
}

function CRUDMultiClasses() {
  const defaultPageValue = options.constantValues.pageSelection.multiClasses;
  return (
    <div className="background">
      <CRUDPageSelection defaultValue={defaultPageValue} />
      <MultiClasses />
    </div>
  );
}

export default CRUDMultiClasses;
