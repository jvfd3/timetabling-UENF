import React from "react";
import myStyles from "../../../config/myStyles";
import configInfo from "../../../config/configInfo";
import CRUDPageSelection from "../../../components/PageSelect";

const defaultClassNames = myStyles.classNames.default;

const mainPageText = {
  instructions: {
    header: "Instruções",
    subHeaders: [
      {
        key: 1,
        title: "Objetivo:",
        description:
          "O objetivo desta aplicação é facilitar a visualização e manipulação de dados de horários de aulas.",
      },
      {
        key: 2,
        title: "Como usar:",
        description:
          "Adicione as informações de disciplina, salas, professores, turmas e horários. Veja os conflitos que surgem na página MultiTurmas e resolva-os. A grade final criada pode ser visualizada na página ccTable.",
      },
    ],
  },
  shortcuts: {
    header: "Atalhos",
    infoList: [
      {
        key: 1,
        title: "Mudar páginas:",
        description:
          "passar o mouse por cima do menu no canto superior esquerdo da tela e usar o scroll do mouse",
      },
      {
        key: 2,
        title: "Selecionar um item:",
        description:
          "passar o mouse por cima da seleção de itens e usar o scroll do mouse",
      },
    ],
  },
};

function Logo() {
  return (
    <img
      src={process.env.PUBLIC_URL + "/logos/OurClass.png"}
      alt="Logo OurClass"
      style={{ width: "30%", margin: "auto", display: "block" }}
    />
  );
}

function Instructions() {
  return (
    <div className={defaultClassNames.containerCardBaseInfo}>
      <h3>{mainPageText.instructions.header}</h3>
      {mainPageText.instructions.subHeaders.map((info) => (
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
      <h4>{mainPageText.shortcuts.header}</h4>
      <ul>
        {mainPageText.shortcuts.infoList.map((info) => (
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

function MainPage() {
  const defaultPageValue = configInfo.pageSelection.main;
  return (
    <div className={defaultClassNames.background}>
      <CRUDPageSelection defaultValue={defaultPageValue} />
      <Main />
    </div>
  );
}

export default MainPage;
