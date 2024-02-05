import React from "react";
import text from "../../../config/frontText";
import myStyles from "../../../config/myStyles";

const defaultClassNames = myStyles.classNames.default;
const pageTexts = text.page.notFound;

function NotFound() {
  return (
    <div className={defaultClassNames.containerCards}>
      <h1>{pageTexts.title}</h1>
      <p>{pageTexts.message}</p>
    </div>
  );
}

export default NotFound;
