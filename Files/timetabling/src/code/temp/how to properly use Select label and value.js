import React, { useState } from "react";
import options from "../temp/options";
import CRUDPageSelection from "../components/PageSelect";
import "../CSS/defaultStyle.css";
import Select from "react-select";

function MainPage() {
  const oldData = [
    { value: "a", label: "A" },
    { value: "b", label: "B" },
    { value: "c", label: "C" },
    { value: "d", label: "D" },
  ];
  const newData = [
    { chave1: "a2", chave2: "A2" },
    { chave1: "b2", chave2: "B2" },
    { chave1: "c2", chave2: "C2" },
    { chave1: "d2", chave2: "D2" },
  ];
  const newNewData = [
    { chave1: "a3", chave2: "B" },
    { chave1: "b3", chave2: "B" },
    { chave1: "c3", chave2: "C" },
    { chave1: "d3", chave2: "C" },
  ];
  const [data1, setData1] = useState(oldData[0]);
  const [data2, setData2] = useState(newData[0]);
  const [data3, setData3] = useState(newNewData[0]);
  return (
    <div className="background">
      <div className="CRUDContainComponents">
        <CRUDPageSelection defaultValue={options.CRUD.main} />
        <Select
          placeholder="OLD"
          value={data1}
          options={oldData}
          isMulti={true}
          onChange={setData1}
          getOptionLabel={(option) => `${option.value}: ${option.label}`}
        />
        <Select
          placeholder="NEW"
          value={data2}
          options={newData}
          isMulti={true}
          onChange={setData2}
          getOptionLabel={(option) => option.chave1}
          getOptionValue={(option) => option.chave2}
          formatOptionLabel={({ chave1, chave2 }, { context }) => {
            return context === "value" ? `${chave1}` : `${chave1}: ${chave2}`;
          }}
        />
        <Select
          placeholder="NEW"
          value={data3}
          options={newNewData}
          isMulti={true}
          onChange={setData3}
          getOptionValue={(option) => option.chave2}
          // getOptionValue={(option) => option.chave1}
          getOptionLabel={(option) => option.chave1}
          // getOptionLabel={(option) => option.chave2}
          formatOptionLabel={({ chave1, chave2 }, { context }) => {
            return context === "value" ? `${chave1}` : `${chave1}: ${chave2}`;
          }}
        />
        <h1 className="whiteColor">Welcome to my monograph's website!</h1>
        <p className="whiteColor">This is the main page.</p>
      </div>
    </div>
  );
}

export default MainPage;
