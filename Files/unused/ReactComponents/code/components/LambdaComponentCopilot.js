import React, { useEffect, useState } from "react";
import axios from "axios";
import options from "../../temp/options";
import { customQuery, customQuery2 } from "../../DB/oneQueryToRuleThemAll";

const LambdaCopilot = () => {
  const [query, setQuery] = useState("SELECT * FROM disciplinas");
  const [result, setResult] = useState("");

  const query3 = async () => {
    try {
      // const response = await customQuery(query);
      const response = await customQuery2(query);
      console.log("response", response);
      // let receivedData = JSON.parse(response);
      // console.log("response", receivedData);
      // setResult(receivedData);
    } catch (error) {
      console.error("Erro ao executar a query:", error);
    }
  };

  async function query2() {
    const result = await customQuery("SELECT * FROM turmas");
    // console.log(JSON.parse(result));
  }

  async function query1() {
    let endpoint = options.AWS.fullEndpoint;
    axios
      .get(endpoint)
      .then((response) => {
        // let receivedData = JSON.parse(response);
        // console.log("receivedData", receivedData);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
  async function executeQuery() {
    // query1();
    // query2();
    query3();
  }

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Digite sua query"
      />
      <button onClick={executeQuery}>Executar Query</button>
      <div>
        <h2>Resultado:</h2>
        <pre>{JSON.stringify(result, null, 2)}</pre>
      </div>
    </div>
  );
};

export { LambdaCopilot };
