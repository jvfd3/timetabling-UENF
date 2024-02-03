// import "../defaultStyle.css";
import Select from "react-select";
import configInfo from "../config/configInfo";
import styleFunctions from "../config/styleFunctions";
import { useNavigate } from "react-router-dom";
import { changePageByScrolling } from "../helpers/firulas/minhasFirulas";
// import { changePageByScrolling } from "../functions/firulas/minhasFirulas";

function CRUDPageSelection(props) {
  const pages = configInfo.pageSelection;
  const navigate = useNavigate();

  const handleChange = (selectedOption) => {
    navigate(configInfo.routing.urlPath + selectedOption.url);
  };

  // Filtrar as opções para remover Not Found e Main CRUD
  const filteredOptions = Object.values(pages).filter(
    (option) => option.pageName !== "Not Found"
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

  const formatOptionLabel = ({ pageName }) => (
    <div style={{ display: "flex" }}>{pageName}</div>
  );

  return (
    <div className="PageSelection">
      <div
        className="PageSelectionSelect"
        onWheel={(event) => {
          // changePageByScrolling(event);
          const itemStates = [filteredOptions, props, handleChange];
          changePageByScrolling(event, itemStates);
        }}
      >
        <Select
          className="SelectList"
          placeholder={"Selecionar CRUD"}
          styles={styleFunctions.fullItem}
          options={filteredOptions}
          defaultValue={props.defaultValue}
          formatOptionLabel={formatOptionLabel}
          getOptionLabel={(option) => option.pageName}
          getOptionValue={(option) => option.url}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default CRUDPageSelection;
