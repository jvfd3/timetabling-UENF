import React from "react";
import text from "../../../config/frontText";
import myStyles from "../../../config/myStyles";

const defaultClassNames = myStyles.classNames.default;
const pageTexts = text.page.main;

function Logo() {
  return (
    <img
      src={process.env.PUBLIC_URL + "/OurClass.png"}
      alt="Logo OurClass"
      style={{ width: "30%", margin: "auto", display: "block" }}
    />
  );
}

function Instructions() {
  return (
    <div className={defaultClassNames.containerCardBaseInfo}>
      <h3>{pageTexts.instructions.header}</h3>
      {pageTexts.instructions.subHeaders.map((info) => (
        <div key={info.key}>
          <h5>{info.title}</h5>
          <p>{info.description}</p>
        </div>
      ))}
    </div>
  );
}

function Shortcuts() {
  return (
    <div className={defaultClassNames.containerCardBaseInfo}>
      <h4>{pageTexts.shortcuts.header}</h4>
      <ul>
        {pageTexts.shortcuts.infoList.map((info) => (
          <li key={info.key}>
            <strong>{info.title}</strong> <p>{info.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Main() {
  return (
    <div className={defaultClassNames.containerCards}>
      <Logo />
      <Instructions />
      <Shortcuts />
    </div>
  );
}

export default Main;
