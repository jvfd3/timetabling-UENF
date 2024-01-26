import "./multiTurmas.css";
import React from "react";
import options from "../../../DB/local/options";
import CRUDPageSelection from "../../../components/PageSelect";
import { MultiClassesRefactor } from "./multiClasses";

function CRUDMultiClasses() {
  const defaultPageValue = options.constantValues.pageSelection.multiClasses;
  return (
    <div className="background">
      <CRUDPageSelection defaultValue={defaultPageValue} />
      <MultiClassesRefactor />
    </div>
  );
}

export default CRUDMultiClasses;
