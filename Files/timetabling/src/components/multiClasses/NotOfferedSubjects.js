import "./NotOfferedSubjects.css";
import { createClass } from "../../helpers/CRUDFunctions/classCRUD";
import { sqlDataFromJson } from "../../DB/local/dataFromJSON";
import { SmartInputSubject } from "../Buttons/Smart/Smart";
import myStyles from "../../config/myStyles";

const defaultClassNames = myStyles.classNames.default;

function isSameParity(subject, semester) {
  const subjectParity = subject?.periodo % 2;
  const semesterParity = semester % 2;
  const sameParity = subjectParity === semesterParity;
  return sameParity;
}

function getListOfNotOfferedSubjects(classes, semester, subjects = []) {
  const allSubjects = subjects.length > 0 ? subjects : sqlDataFromJson.subjects; // Should get from DB

  // Neste código, filter(Boolean) remove todos os valores falsy do array, incluindo null e undefined.
  const offeredSubjectsCodes = classes
    .map((classItem) => classItem?.disciplina?.codigo)
    .filter(Boolean);

  // Listar todas os código-nomes de disciplinas que são de semestre ímpar
  // Filtrar todas que são de periodoEsperado%2 == 1
  const isSummerSemester = semester === 3;
  const semesterSubjects = isSummerSemester
    ? allSubjects
    : allSubjects.filter((subject) => isSameParity(subject, semester));

  // Percorrer cada disciplina em semesterSubject e, caso o código da disciplina esteja na lista de disciplinas oferecidas, remover da lista.
  const nonOfferedSubjects = semesterSubjects.filter((subject) => {
    return !offeredSubjectsCodes.includes(subject.codigo);
  });

  return nonOfferedSubjects;
}

function AllSubjectsWereOffered() {
  const mainTitle = "Todas as disciplinas do período ímpar foram oferecidas 👍";
  const subtitle =
    "Isso é mesmo possível? Ou o código bugou em algum lugar? 🤔";

  return (
    <div>
      <h1>{mainTitle}</h1>
      <p>{subtitle}</p>
    </div>
  );
}

function NotOfferedSubjectRow({ iterSubject, classStates }) {
  const code = iterSubject.codigo;
  const semester = iterSubject.periodo;

  const newHighlight =
    myStyles.classNames.local.component.notOfferedSubjects.highlight;
  const isFirstSemester = semester === 1;
  const firstSemesterHighlight = isFirstSemester ? newHighlight : "";

  const inputProps = {
    classStates,
    createClassDB: createClass,
    subjects: [iterSubject],
  };

  return (
    <tr key={code}>
      <td className={firstSemesterHighlight}>
        <SmartInputSubject {...inputProps} />
      </td>
      <td className={firstSemesterHighlight}>
        {`${semester} - (${code}) ${iterSubject.nome}`}
      </td>
    </tr>
  );
}

function NonOfferedSubjectsTable(unofferedSubjectsProps) {
  const { semesterValue, nonOfferedSubjects, classStates } =
    unofferedSubjectsProps;

  const baseMessage = "Disciplinas ainda não oferecidas ";
  const semesterMessages = {
    1: "do período ímpar",
    2: "do período par",
    3: "dos períodos",
  };

  const semesterMessage = semesterMessages[semesterValue] || "";
  /* 
  let semesterMessage = "";
  semesterMessage += semesterValue === 1 ? "do período ímpar" : "";
  semesterMessage += semesterValue === 2 ? "do período par" : "";
  semesterMessage += semesterValue === 3 ? "dos períodos" : "";
  */

  const inputProps = {
    classStates,
    createClassDB: createClass,
    subjects: nonOfferedSubjects,
    inputConfig: {
      text: semesterMessage,
      size: "4em",
    },
  };

  const headerText = "Período - (Código) Nome";

  return (
    <div className={defaultClassNames.containerCardBaseInfo}>
      <h1>{baseMessage + semesterMessage}</h1>
      <table className={defaultClassNames.componentTable}>
        <thead>
          <tr>
            <th>
              <SmartInputSubject {...inputProps} />
            </th>
            <th>{headerText}</th>
          </tr>
        </thead>
        <tbody>
          {nonOfferedSubjects.map((iterSubject) => {
            const NotOfferedProps = {
              iterSubject,
              classStates,
            };
            const subjectRowKey = iterSubject.codigo;
            return (
              <NotOfferedSubjectRow {...NotOfferedProps} key={subjectRowKey} />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function NotOfferedSubjects(classStates) {
  // console.log(classStates);
  const { filteredClasses, classItem, subjects } = classStates;
  const semesterValue = classItem?.semestre;

  const nonOfferedSubjects = getListOfNotOfferedSubjects(
    filteredClasses,
    semesterValue,
    subjects
  );

  const someValuesProps = { nonOfferedSubjects, semesterValue, classStates };

  return (
    <div>
      {nonOfferedSubjects.length === 0 ? (
        <AllSubjectsWereOffered />
      ) : (
        <NonOfferedSubjectsTable {...someValuesProps} />
      )}
    </div>
  );
}

export default NotOfferedSubjects;
