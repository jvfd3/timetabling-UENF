import "../CSS/defaultStyle.css";

import React from "react";
import options from "../temp/options";
import CRUDPageSelection from "../components/PageSelect";

function notFound() {
  return (
    <div className="background">
      <div className="CRUDContainComponents">
        <CRUDPageSelection defaultValue={options.constantValues.pageSelection.notFound} />
        <h1 className="whiteColor">Is this a 404 page?</h1>
        <p className="whiteColor">I guess not. 💠</p>
      </div>
    </div>
  );
}

export default notFound;
