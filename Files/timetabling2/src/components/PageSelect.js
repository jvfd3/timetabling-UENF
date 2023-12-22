"use client";
// import "../CSS/defaultStyle.css";

import Select from "react-select";
import options from "@/helpers/options";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

// import { useNavigate } from "react-router-dom";
// import { changePageByScrolling } from "../functions/firulas/minhasFirulas";
// import { changePageByScrolling } from "../functions/firulas/minhasFirulas";

const isClient = typeof window !== "undefined";

const PageSelection = ({ defaultValue }) => {
  let pages = options.constantValues.pageSelection;
  const router = useRouter();
  // const pathName = usePathname();
  // console.log("pathName", pathName);

  const handleChange = (selectedOption) => {
    // navigate(options.constantValues.routing.urlPath + selectedOption.value);
    // console.log("selectedOption", selectedOption);
    let newUrl = options.constantValues.routing.urlPath + selectedOption.value;
    // console.log("newUrl", newUrl);
    // console.log("pathname", pathName);
    router.push(newUrl);
  };

  // Filtrar as opções para remover Not Found e Main CRUD
  const filteredOptions = Object.values(pages).filter(
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

  const formatOptionLabel = ({ label }) => (
    <div style={{ display: "flex" }}>{label}</div>
  );

  /* Usado por algum motivo pelo NextJS */
  /*  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) {
    return null;
  } */

  return (
    <div className="PageSelection">
      <div
        className="PageSelectionSelect"
        onWheel={(event) => {
          // changePageByScrolling(event);
          // let itemStates = [filteredOptions, props, handleChange];
          // changePageByScrolling(event, itemStates);
        }}
      >
        <Select
          className="SelectList"
          styles={options.SelectStyles.fullItem}
          placeholder={"Selecionar CRUD"}
          options={filteredOptions} // Use as opções filtradas aqui
          defaultValue={defaultValue}
          formatOptionLabel={formatOptionLabel}
          onChange={handleChange}
          inputId="my-unique-select-input-id" // Adicione esta linha
        />
      </div>
    </div>
  );
};

export default PageSelection;
