import "./PageSelection.css";
import Select from "react-select";
import text from "../../config/frontText";
import myStyles from "../../config/myStyles";
import configInfo from "../../config/configInfo";
import { useNavigate } from "react-router-dom";
import { changePageByScrolling } from "../../helpers/firulas/minhasFirulas";
// import { changePageByScrolling } from "../functions/firulas/minhasFirulas";

const localClassNames = myStyles.classNames.local.component.PageSelection;

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

  const formatOptionLabel = ({ pageName }) => (
    <div style={{ display: "flex" }}>{pageName}</div>
  );

  return (
    <div className={localClassNames.PageSelection}>
      <div
        className={localClassNames.PageSelectionSelect}
        onWheel={(event) => {
          // changePageByScrolling(event);
          const itemStates = [filteredOptions, props, handleChange];
          changePageByScrolling(event, itemStates);
        }}
      >
        <Select
          placeholder={text.component.unexpectedPlaceholder}
          className={myStyles.selects.className}
          styles={myStyles.selects.fullItem}
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
