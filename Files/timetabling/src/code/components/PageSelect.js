import "../CSS/defaultStyle.css";
import Select from "react-select";
import options from "../temp/options";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const CRUDPageSelection = (props) => {
  const navigate = useNavigate();

  const handleChange = (selectedOption) => {
    navigate(options.constantValues.routing.urlPath+selectedOption.value);
  };

  // Filtrar as opções para remover Not Found e Main CRUD
  const filteredOptions = Object.values(options.constantValues.pageSelection).filter(
    (option) => option.label !== "Not Found"
  );

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

  function changePageByScrolling(event) {
    let diretion = event.deltaY > 0 ? "down" : "up";
    // console.log("Scrolling ", diretion);
    let index = filteredOptions.findIndex(
      (option) => option.value === props.defaultValue.value
    );
    // console.log("Came from Index: ", index);
    index += diretion === "up" ? -1 : 1;
    // console.log("Trying to go to Index: ", index);
    index = index < 0 ? filteredOptions.length - 1 : index;
    index = index >= filteredOptions.length ? 0 : index;
    // console.log("Actually going to Index: ", index);
    let newOption = filteredOptions[index];
    // console.log("new Page: ", newOption);
    handleChange(newOption);
  }

  const formatOptionLabel = ({ label }) => (
    <div style={{ display: "flex" }}>{label}</div>
  );

  return (
    <div className="PageSelection">
      <div className="PageSelectionSelect" onWheel={changePageByScrolling}>
        <Select
          className="SelectList"
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
