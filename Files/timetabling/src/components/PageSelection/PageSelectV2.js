import "./PageSelection.css";
import Select from "react-select";
import text from "../../config/frontText";
import myStyles from "../../config/myStyles";
import configInfo from "../../config/configInfo";
import { useLocation, useNavigate } from "react-router-dom";
import { changePageByScrolling } from "../../helpers/firulas/minhasFirulas";
import { useState } from "react";
// import { changePageByScrolling } from "../functions/firulas/minhasFirulas";

const localClassNames = myStyles.classNames.local.component.PageSelection;

function PageSelectV2() {
  const pages = Object.values(configInfo.pageSelection);
  const navigate = useNavigate();
  const location = useLocation().pathname.split("/");
  const thisPage = location[location.length - 1];
  const currentPageObject = pages.find((page) => page.url === thisPage);

  const filteredOptions = pages.filter(
    (iterPages) => iterPages.pageName !== "Not Found"
  );

  const [currentPage, setCurrentPage] = useState(currentPageObject);

  function handleChange(selectedOption) {
    setCurrentPage(selectedOption);
    const newPath = configInfo.routing.urlPath + selectedOption.url;
    navigate(newPath);
  }

  const selectProps = {
    placeholder: text.component.unexpectedPlaceholder,
    className: myStyles.selects.className,
    styles: myStyles.selects.fullItem,
    options: filteredOptions,
    value: currentPage,
    getOptionLabel: (selectedPage) => selectedPage.pageName,
    getOptionValue: (selectedPage) => selectedPage.url,
    // formatOptionLabel: ({ pageName }) => (
    //   <div style={{ display: "flex" }}>{pageName}</div>
    // ),
    onChange: handleChange,
  };

  return (
    <div className={localClassNames.PageSelection}>
      <div
        className={localClassNames.PageSelectionSelect}
        onWheel={({ deltaY }) => {
          const itemStates = {
            filteredOptions,
            currentPage,
            handleChange,
            deltaY,
          };
          changePageByScrolling(itemStates);
        }}
      >
        <Select {...selectProps} />
      </div>
    </div>
  );
}

export default PageSelectV2;
