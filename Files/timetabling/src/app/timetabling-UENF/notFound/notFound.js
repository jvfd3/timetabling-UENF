import React from "react";
import options from "../../../DB/local/options";
import CRUDPageSelection from "../../../components/PageSelect";

function notFound() {
  return (
    <div className="background">
      <div className="CRUDContainComponents">
        <CRUDPageSelection
          defaultValue={options.constantValues.pageSelection.notFound}
        />
        <h1 style={{ color: "white" }}>Is this a 404 page?</h1>
        <p style={{ color: "white" }}>I guess not. 💠</p>
      </div>
    </div>
  );
}

export default notFound;
