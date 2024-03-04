import "./ClassTimeGridCC.css";
import myStyles from "../../config/myStyles";
import constantValues from "../../config/constantValues";
import { filterDay, filterHour } from "../../helpers/filteringFunc";
import { getCCTableClassCellText } from "../../helpers/visualizationText/textLabels";

const localClassNames = myStyles.classNames.local.component.ClassTimeGridCC;

function TopLeft() {
  return <th className={localClassNames.topLeftCorner}></th>;
}

function TopRow() {
  const daysList = constantValues.days;
  const days = daysList.map((day) => {
    const headerKey = `HeaderKey: ${day?.label}`;
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

function CellContent({ classTimes }) {
  // console.log(classTimes);
  const classesList = classTimes.map((iterClassTime) => {
    const cellText = getCCTableClassCellText(iterClassTime);
    const cellKey = `ChaveCellContent: ${iterClassTime?.idTurma}-${iterClassTime?.id}`;
    return (
      <div key={cellKey} className={localClassNames.eachClassInCell}>
        {cellText}
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
          key: rowKey,
        };
        return <Row {...rowProps} />;
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
