import options from "../../../DB/local/options";
import { filterDay, filterHour } from "../../../helpers/filteringFunc";
import "./ccTable.css";

function TopLeft() {
  return <th className="TopLeftCorner"></th>;
}

function TopRow() {
  const daysList = options.constantValues.days;
  const days = daysList.map((day, index) => {
    return (
      <th key={index} className="daysHeader">
        {day.label}
      </th>
    );
  });

  return [days];
}

function Header() {
  return (
    <thead>
      <tr className="HeaderRow">
        <TopLeft />
        <TopRow />
      </tr>
    </thead>
  );
}

function getCellMessage(classItem) {
  // console.log("classItem", classItem);
  const subject = classItem.disciplina;
  const prof = classItem.professor;
  const room = classItem.sala;
  const subjectInfo = subject
    ? `${subject?.periodo ?? "Período indefinido"} - ${
        subject?.apelido ?? "Apelido Indefinido"
      }`
    : "Discip. indef.";
  const profInfo = prof
    ? `${prof?.apelido ?? "Apelido Indefinido"}`
    : "Prof. indef.";
  const roomInfo = room
    ? `${room?.bloco ?? "Bloco indefinido"}${
        room?.codigo ? "-" + room?.codigo : ""
      }`
    : "Sala indef.";
  const cellMessage = `${subjectInfo} (${profInfo} / ${roomInfo})`;
  return cellMessage;
}

function CellContent({ classTimes }) {
  // console.log(classTimes);
  const classesList = classTimes.map((iterClassTime) => {
    const cellMessage = getCellMessage(iterClassTime);
    const cellKey = `ChaveCellContent: ${iterClassTime.idTurma}-${iterClassTime.idHorario}`;
    return (
      <div key={cellKey} className="eachClassInCell">
        {cellMessage}
      </div>
    );
  });

  return classesList;
}

function Row({ hour, classTimes }) {
  // console.log(hour);
  // console.log(classTimes);

  const classTimesHour = filterHour(classTimes, hour);
  const daysList = options.constantValues.days;
  const rowKey = `Linha: ${hour}, Header: ${hour}`;

  const daysColumn = daysList.map((iterDay) => {
    const classesDayHour = filterDay(classTimesHour, iterDay.value);
    const cellKey = `Key Coluna: ${iterDay.value}-${hour}`;
    // console.log(classesDayHour);
    return (
      <td key={cellKey} className="ContentCell">
        <CellContent classTimes={classesDayHour} />
      </td>
    );
  });

  return (
    <tr key={`Linha: ${hour}`}>
      <td key={rowKey} className="HorariosCol">
        {hour}
      </td>
      {daysColumn}
    </tr>
  );
}

function Body(classTimes) {
  // console.log(classTimes);
  const hoursTangList = options.constantValues.hoursTang;
  return (
    <tbody>
      {hoursTangList.map((iterHour) => {
        const rowKey = `Linha: ${iterHour.hora}`;
        const rowProps = {
          hour: iterHour.hora,
          ...classTimes,
        };
        return <Row key={rowKey} {...rowProps} />;
      })}
    </tbody>
  );
}

function CCTableDB(classTimes) {
  // console.log(classTimes);
  return (
    <table className="TabelaCC">
      <Header />
      <Body {...classTimes} />
    </table>
  );
}

export default CCTableDB;
