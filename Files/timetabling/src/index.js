import "./defaultStyle.css";
import React from "react";
import ReactDOM from "react-dom/client";
import MyRouting from "./app/routing/routing";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <MyRouting />
  </React.StrictMode>
);
