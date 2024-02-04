import React from "react";
import text from "../../../config/frontText";
import myStyles from "../../../config/myStyles";
import configInfo from "../../../config/configInfo";
import CRUDPageSelection from "../../../components/PageSelection/PageSelect";

const defaultClassNames = myStyles.classNames.default;
const pageTexts = text.page.notFound;

function notFound() {
  const defaultPageValue = configInfo.pageSelection.notFound;
  return (
    <div className={defaultClassNames.background}>
      <CRUDPageSelection defaultValue={defaultPageValue} />
      <div className={defaultClassNames.containerCards}>
        <h1>{pageTexts.title}</h1>
        <p>{pageTexts.message}</p>
      </div>
    </div>
  );
}

export default notFound;
