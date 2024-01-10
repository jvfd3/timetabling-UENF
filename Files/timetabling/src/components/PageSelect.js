// import "../defaultStyle.css";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import options from "../DB/local/options";
import { changePageByScrolling } from "../helpers/firulas/minhasFirulas";
// import { changePageByScrolling } from "../functions/firulas/minhasFirulas";

const CRUDPageSelection = (props) => {
  let pages = options.constantValues.pageSelection;
  const navigate = useNavigate();

  const handleChange = (selectedOption) => {
    navigate(options.constantValues.routing.urlPath + selectedOption.value);
  };

  // Filtrar as opções para remover Not Found e Main CRUD
  const filteredOptions = Object.values(pages).filter(
    (option) => option.label !== "Not Found"
  );

  /*
  useEffect(() => {
    const keydownHandler = (event) => {
      if (event.key === "s") {
        document.body.style.overflow = "hidden";
      }
    };

    const keyupHandler = (event) => {
      if (event.key === "s") {
        document.body.style.overflow = "auto";
      }
    };

    window.addEventListener("keydown", keydownHandler);
    window.addEventListener("keyup", keyupHandler);

    return () => {
      window.removeEventListener("keydown", keydownHandler);
      window.removeEventListener("keyup", keyupHandler);
    };
  }, []);
  */

  const formatOptionLabel = ({ label }) => (
    <div style={{ display: "flex" }}>{label}</div>
  );

  return (
    <div className="PageSelection">
      <div
        className="PageSelectionSelect"
        onWheel={(event) => {
          // changePageByScrolling(event);
          let itemStates = [filteredOptions, props, handleChange];
          changePageByScrolling(event, itemStates);
        }}
      >
        <Select
          className="SelectList"
          styles={options.SelectStyles.fullItem}
          placeholder={"Selecionar CRUD"}
          options={filteredOptions} // Use as opções filtradas aqui
          defaultValue={props.defaultValue}
          formatOptionLabel={formatOptionLabel}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default CRUDPageSelection;
