import "./componentStyles.css";
import Select from "react-select";
import options from "../temp/options";
import { useNavigate } from "react-router-dom";

const formatOptionLabel = ({ label }) => (
  <div style={{ display: "flex" }}>{label}</div>
);

const CRUDPageSelection = (props) => {
  const navigate = useNavigate();

  const handleChange = (selectedOption) => {
    navigate(selectedOption.url_path);
  };

  // Filtrar as opções para remover Not Found e Main CRUD
  const filteredOptions = options.CRUD_list.filter(
    (option) => option.label !== "Not Found" && option.label !== "Main CRUD"
  );

  function chagePageByScrolling(event) {
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

  return (
    <div className="CRUD-page-selection" onWheel={chagePageByScrolling}>
      <Select
        placeholder={"Selecionar CRUD"}
        options={filteredOptions} // Use as opções filtradas aqui
        className="SelectList-base"
        defaultValue={props.defaultValue}
        formatOptionLabel={formatOptionLabel}
        onChange={handleChange}
      />
    </div>
  );
};

export default CRUDPageSelection;
