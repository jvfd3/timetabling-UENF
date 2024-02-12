import "./ClassTimeGridCC.css";
import constantValues from "../../config/constantValues";
import { filterDay, filterHour } from "../../helpers/filteringFunc";
import myStyles from "../../config/myStyles";

const localClassNames = myStyles.classNames.local.component.ClassTimeGridCC;

function TopLeft() {
  return <th className={localClassNames.topLeftCorner}></th>;
}

function TopRow() {
  const daysList = constantValues.days;
  const days = daysList.map((day) => {
    const headerKey = `HeaderKey: ${day.label}`;
    return (
      <th key={headerKey} className={localClassNames.daysHeader}>
        {day.label}
      </th>
    );
  });

  return [days];
}

function Header() {
  return (
    <thead>
      <tr className={localClassNames.headerRow}>
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
    const cellKey = `ChaveCellContent: ${iterClassTime.idTurma}-${iterClassTime.id}`;
    return (
      <div key={cellKey} className={localClassNames.eachClassInCell}>
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
  const daysList = constantValues.days;
  const rowKey = `Header Row: ${hour}`;
  const rowColKey = `${rowKey}, Header: ${hour}`;

  const daysColumn = daysList.map((iterDay) => {
    const classesDayHour = filterDay(classTimesHour, iterDay.value);
    const cellKey = `Column Key: ${iterDay.value}-${hour}`;
    // console.log(classesDayHour);
    return (
      <td key={cellKey} className={localClassNames.contentCell}>
        <CellContent classTimes={classesDayHour} />
      </td>
    );
  });

  return (
    <tr key={rowKey}>
      <td key={rowColKey} className={localClassNames.horariosCol}>
        {hour}
      </td>
      {daysColumn}
    </tr>
  );
}

function Body({ classTimes }) {
  // console.log(classTimes);
  const hoursTangList = constantValues.hoursTang;
  return (
    <tbody>
      {hoursTangList.map((iterHour) => {
        const rowKey = `Body Row: ${iterHour.hora}`;
        const rowProps = {
          hour: iterHour.hora,
          classTimes,
        };
        return <Row key={rowKey} {...rowProps} />;
      })}
    </tbody>
  );
}

function ClassTimeGridCC(classTimes) {
  // console.log(classTimes);
  return (
    <table className={localClassNames.table}>
      <Header />
      <Body {...classTimes} />
    </table>
  );
}

export default ClassTimeGridCC;
