import "./NotOfferedSubjects.css";
import text from "../../../config/frontText";
import myStyles from "../../../config/myStyles";
import sqlDataFromJson from "../../../DB/dataFromJSON";
import { SmartInputSubject } from "../../Buttons/Smart/Smart";
import { getId } from "../../../helpers/auxCRUD";
import { getDefaultYearSemesterValues } from "../../../helpers/auxFunctions";
import { sortNotOfferedSubjects } from "../../Sorts/sortingFunctions";

const defaultClassNames = myStyles.classNames.default;
const frontText = text.component.nonOfferedSubjects;

function isSameParity(subject, semester) {
  const subjectParity = subject?.periodo % 2;
  const semesterParity = semester % 2;
  const sameParity = subjectParity === semesterParity;
  return sameParity;
}

function getListOfNotOfferedSubjects(classes, semester, subjects = []) {
  const allSubjects = subjects.length > 0 ? subjects : sqlDataFromJson.subjects; // Should get from DB

  // Remover disciplinas com período esperado maior que 10
  const notNullSemesterSubjects = allSubjects.filter(
    (subject) => subject?.periodo !== null
  );
  const CSSubjects = notNullSemesterSubjects.filter(
    (subject) => subject.periodo <= 10
  );

  // Neste código, filter(Boolean) remove todos os valores falsy do array, incluindo null e undefined.
  const offeredSubjectsCodes = classes
    .map((classItem) => classItem?.disciplina?.codigo)
    .filter(Boolean);

  // Listar todas os código-nomes de disciplinas que são de semestre ímpar
  // Filtrar todas que são de periodoEsperado%2 == 1
  const isSummerSemester = semester === 3;
  const semesterSubjects = isSummerSemester
    ? CSSubjects
    : CSSubjects.filter((subject) => isSameParity(subject, semester));

  // Percorrer cada disciplina em semesterSubject e, caso o código da disciplina esteja na lista de disciplinas oferecidas, remover da lista.
  const nonOfferedSubjects = semesterSubjects.filter((subject) => {
    return !offeredSubjectsCodes.includes(subject.codigo);
  });

  return nonOfferedSubjects;
}

function AllSubjectsWereOffered() {
  return (
    <div>
      <h1>{frontText.mainTitle}</h1>
      <p>{frontText.subtitle}</p>
    </div>
  );
}

function NotOfferedSubjectRow(notOfferedSubjectProps) {
  const { subjects } = notOfferedSubjectProps;
  const subject = subjects?.[0];
  const code = subject?.codigo;
  const semester = subject?.periodo;
  const name = subject?.nome;

  const newHighlight =
    myStyles.classNames.local.component.notOfferedSubjects.highlight;
  const isFirstSemester = semester === 1;
  const firstSemesterHighlight = isFirstSemester ? newHighlight : "";

  const inputProps = {
    ...notOfferedSubjectProps,
    inputConfig: { size: "2em" },
  };

  return (
    <tr key={code}>
      <td className={firstSemesterHighlight}>
        <SmartInputSubject {...inputProps} />
      </td>
      <td className={firstSemesterHighlight}>{semester}</td>
      <td className={firstSemesterHighlight}>{code}</td>
      <td className={firstSemesterHighlight}>{name}</td>
    </tr>
  );
}

function NonOfferedSubjectsTable(unofferedSubjectsProps) {
  const { currentSemester, subjects } = unofferedSubjectsProps;

  const semesterMessages = {
    1: "do período ímpar",
    2: "do período par",
    3: "dos períodos",
  };

  const semesterMessage = semesterMessages[currentSemester.semester] || "";

  const inputProps = {
    ...unofferedSubjectsProps,
    inputConfig: {
      text: semesterMessage,
      size: "4em",
    },
  };

  return (
    <div className={defaultClassNames.containerCardBaseInfo}>
      <h1>{frontText.baseMessage + semesterMessage}</h1>
      <table className={defaultClassNames.componentTable}>
        <thead>
          <tr>
            <th>
              <SmartInputSubject {...inputProps} />
            </th>
            <th>{frontText.header.expectedSemester}</th>
            <th>{frontText.header.code}</th>
            <th>{frontText.header.name}</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((iterSubject) => {
            const notOfferedSubjectProps = {
              ...inputProps,
              subjects: [iterSubject],
              key: getId(iterSubject),
            };
            return <NotOfferedSubjectRow {...notOfferedSubjectProps} />;
          })}
        </tbody>
      </table>
    </div>
  );
}

function NotOfferedSubjects(multiClassesStates) {
  const { classStates, classTimeStates, selectStates, currentSemester } =
    multiClassesStates;

  const nonOfferedSubjects = getListOfNotOfferedSubjects(
    classStates.filteredClasses,
    currentSemester.semester,
    selectStates.subjectStates.subjects
  );

  const sortedNotOfferedSubjects = sortNotOfferedSubjects(nonOfferedSubjects);

  const notOfferedSubjectsProps = {
    classTimeStates,
    classStates,
    currentSemester,
    subjects: sortedNotOfferedSubjects,
  };

  const hasSubjects = sortedNotOfferedSubjects.length > 0;

  return (
    <div>
      {hasSubjects ? (
        <NonOfferedSubjectsTable {...notOfferedSubjectsProps} />
      ) : (
        <AllSubjectsWereOffered />
      )}
    </div>
  );
}

export default NotOfferedSubjects;
