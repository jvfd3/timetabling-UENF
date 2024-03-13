import myStyles from "../../config/myStyles";

const defaultClassNames = myStyles.classNames.default;

function NoSelectedObject({ title }) {
  return (
    <div className={defaultClassNames.containerCardsHolder}>
      <div className={defaultClassNames.containerCardBaseInfo}>
        <h2>{title}</h2>
      </div>
    </div>
  );
}

export default NoSelectedObject;
