import { sqlDataFromJson } from "../../DB/local/dataFromJSON";
import { InputDisciplina } from "../Buttons/Dumb/Dumb";

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

function addSubjectsToClasses() {}

function isSameParity(subject, semester) {
  const subjectParity = subject?.periodo % 2;
  const semesterParity = semester % 2;
  const sameParity = subjectParity === semesterParity;
  return sameParity;
}

function getListOfNotOfferedSubjects(classes, semester) {
  const allSubjects = sqlDataFromJson.subjects; // Should get from DB

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

function NotOfferedSubjectRow({ iterSubject }) {
  const code = iterSubject.codigo;
  const semester = iterSubject.periodo;

  const isFirstSemester = semester === 1;
  // Se o período da disciplina for 1, aplicar o className EnfasePrimeiroPeriodo
  const firstSemesterHighlight = isFirstSemester ? "EnfasePrimeiroPeriodo" : "";

  const inputProps = {
    text: `Criar uma turma para a disciplina ${code}`,
    insertDiscFunc: () => addSubjectsToClasses([iterSubject]),
  };

  return (
    <tr key={code}>
      <td className={firstSemesterHighlight}>
        <InputDisciplina {...inputProps} />
      </td>
      <td className={firstSemesterHighlight}>
        {`${semester} - (${code}) ${iterSubject.nome}`}
      </td>
    </tr>
  );
}

function NonOfferedSubjectsTable(someValuesProps) {
  const { semesterValue, nonOfferedSubjects } = someValuesProps;

  let baseMessage = "Disciplinas ainda não oferecidas ";
  let semesterMessage = "";
  semesterMessage += semesterValue === 1 ? "do período ímpar" : "";
  semesterMessage += semesterValue === 2 ? "do período par" : "";
  semesterMessage += semesterValue === 3 ? "dos períodos" : "";

  const inputText = `Adicionar todas as turmas pendentes ${semesterMessage}`;

  const inputProps = {
    size: "4em",
    text: inputText,
    insertDiscFunc: () => addSubjectsToClasses(nonOfferedSubjects),
  };

  const headerText = "Período - (Código) Nome";

  return (
    <div className="showBasicDataCard">
      <h1>{baseMessage + semesterMessage}</h1>
      <table className="showBasicDataTable">
        <thead>
          <tr>
            <th>
              <InputDisciplina {...inputProps} />
            </th>
            <th>{headerText}</th>
          </tr>
        </thead>
        <tbody>
          {nonOfferedSubjects.map((iterSubject) => {
            const NotOfferedProps = {
              iterSubject,
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

function NotOfferedSubjects({ filteredClasses, classItem }) {
  const semesterValue = classItem.semestre;

  const nonOfferedSubjects = getListOfNotOfferedSubjects(
    filteredClasses,
    semesterValue
  );

  const someValuesProps = {
    semesterValue,
    nonOfferedSubjects,
  };

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
