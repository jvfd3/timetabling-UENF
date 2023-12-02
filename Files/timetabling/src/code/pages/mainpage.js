import React from "react";
import options from "../temp/options";
import CRUDPageSelection from "../components/PageSelect";
import "../CSS/defaultStyle.css";

function Main() {
  return (
    <div className="CRUDContainComponents">
      <h1>Welcome to my monograph's website!</h1>
      <p>This is the main page.</p>
    </div>
  );
}

function MainPage() {
  return (
    <div className="background">
      <CRUDPageSelection defaultValue={options.CRUD.main} />
      <Main />
    </div>
  );
}

export default MainPage;
