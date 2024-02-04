import React from "react";
import configInfo from "../../../config/configInfo";
import CRUDPageSelection from "../../../components/PageSelection/PageSelect";
import myStyles from "../../../config/myStyles";

const defaultClassNames = myStyles.classNames.default;

const texts = {
  title: "Is this a 404 page?",
  message: "I guess not. 💠",
};

function notFound() {
  const defaultPageValue = configInfo.pageSelection.notFound;
  return (
    <div className={defaultClassNames.background}>
      <CRUDPageSelection defaultValue={defaultPageValue} />
      <div className={defaultClassNames.containerCards}>
        <h1>{texts.title}</h1>
        <p>{texts.message}</p>
      </div>
    </div>
  );
}

export default notFound;
