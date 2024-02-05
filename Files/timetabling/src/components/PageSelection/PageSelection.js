import "./PageSelection.css";
import myStyles from "../../config/myStyles";
import getCurrentPage from "./auxPageSelection";
import configInfo from "../../config/configInfo";
import { useNavigate } from "react-router-dom";
import { changePageByScrolling } from "../../helpers/firulas/minhasFirulas";
import { useState } from "react";
import { SelectPage } from "../mySelects";
// import { changePageByScrolling } from "../functions/firulas/minhasFirulas";

const localClassNames = myStyles.classNames.local.component.PageSelection;

function PageSelection() {
  const pageObjectList = configInfo.pageSelection;
  const pagesList = Object.values(pageObjectList);

  const navigate = useNavigate();
  const thisPage = getCurrentPage();

  const [currentPage, setCurrentPage] = useState(thisPage);

  const filteredOptions = pagesList.filter(
    (iterPages) => iterPages.url !== pageObjectList.notFound.url
  );

  function handleChange(selectedOption) {
    setCurrentPage(selectedOption);
    const newPath = configInfo.routing.urlPath + selectedOption.url;
    navigate(newPath);
  }

  const scrollStates = {
    options: filteredOptions,
    currentItem: currentPage,
    handleChange,
  };

  const pageStates = { currentPage, setCurrentPage: handleChange };

  return (
    <div className={localClassNames.PageSelection}>
      <div
        className={localClassNames.PageSelectionHighlight}
        onWheel={({ deltaY }) => {
          const itemStates = { ...scrollStates, deltaY };
          changePageByScrolling(itemStates);
        }}
      >
        <SelectPage {...pageStates} />
      </div>
    </div>
  );
}

export default PageSelection;
