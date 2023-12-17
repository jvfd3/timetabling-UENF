import React, { useEffect, useState } from "react";
import axios from "axios";
import options from "../temp/options";

function LambdaCopilot() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  let endpoint = options.AWS.fullEndpoint;

  useEffect(() => {
    axios
      .get(endpoint)
      .then((response) => {
        let receivedData = JSON.parse(response.data.body);
        console.log("receivedData", receivedData);
        setData(receivedData);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return "Carregando...";
  if (error) return `Erro: ${error}`;

  return (
    <div>
      <h1>Resultados da Query SQL</h1>
      {data &&
        data.map((item, index) => (
          <div key={index}>
            {/* Substitua "campo" pelo nome do campo que você deseja exibir */}
            {/* <p>{item.campo}</p> */}
          </div>
        ))}
    </div>
  );
}

export { LambdaCopilot };
