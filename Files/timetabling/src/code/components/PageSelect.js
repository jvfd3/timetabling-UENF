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

  return (
    <div className="CRUD-page-selection">
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
