import React from "react";
import options from "../../../DB/local/options";
import CRUDPageSelection from "../../../components/PageSelect";

function notFound() {
  const defaultPageValue = options.constantValues.pageSelection.notFound;
  return (
    <div className="background">
      <CRUDPageSelection defaultValue={defaultPageValue} />
      <div className="CRUDContainComponents">
        <h1>Is this a 404 page?</h1>
        <p>I guess not. 💠</p>
      </div>
    </div>
  );
}

export default notFound;
