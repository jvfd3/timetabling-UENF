import React from "react";
import configInfo from "../../../config/configInfo";
import CRUDPageSelection from "../../../components/PageSelect";
import myStyles from "../../../config/myStyles";

const defaultClassNames = myStyles.classNames.default;

function notFound() {
  const defaultPageValue = configInfo.pageSelection.notFound;
  return (
    <div className={defaultClassNames.background}>
      <CRUDPageSelection defaultValue={defaultPageValue} />
        <h1>Is this a 404 page?</h1>
        <p>I guess not. 💠</p>
      <div className={defaultClassNames.containerCards}>
      </div>
    </div>
  );
}

export default notFound;
