import React from "react";
import options from "../temp/options";
import CRUDPageSelection from "../components/PageSelect";
import "../CSS/defaultStyle.css";
import ConflictsWorkbench from "../components/ConflictsWorkbench";

function Main() {
  return (
    <div className="CRUDContainComponents">
      <h1>Welcome to my monograph's website!</h1>
      <ConflictsWorkbench />
      <p>This is the main page.</p>
      <h4>Atalhos</h4>
      <ul>
        <li>
          <strong>Mudar páginas</strong>: passar o mouse por cima do menu no
          canto superior esquerdo da tela e usar o scroll do mouse
        </li>
        <li>
          <strong>Selecionar um item</strong>: passar o mouse por cima da
          seleção de itens e usar o scroll do mouse
        </li>
        <li>
          <strong>Obs.</strong>: quando a página é longa e tem scroll,
          pressione a letra "s" para impedir a rolagem da página e poder usar o
          scroll do mouse para selecionar itens.
        </li>
      </ul>
    </div>
  );
}

function MainPage() {
  return (
    <div className="background">
      <CRUDPageSelection defaultValue={options.constantValues.pageSelection.main} />
      <Main />
    </div>
  );
}

export default MainPage;
