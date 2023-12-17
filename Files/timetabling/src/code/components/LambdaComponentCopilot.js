import React, { useEffect, useState } from "react";
import axios from "axios";

function LambdaCopilot() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // let myEndpoint =
  // "https://4tw2l96f11.execute-api.us-east-2.amazonaws.com/estagioTeste";
  let smallEndpoint = "4tw2l96f11.execute-api.us-east-2";
  let stage = "estagioTeste";
  // let myLambdaFunction = "nodeMySQLRAR";
  let url = `https://${smallEndpoint}.amazonaws.com/${stage}`;
  // let url = myEndpoint + "/" + myLambdaFunction;
  // let url = myEndpoint;

  useEffect(() => {
    axios
      .get(url)
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
