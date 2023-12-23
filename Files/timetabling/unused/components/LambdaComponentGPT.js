// LambdaComponent.js
import React, { useEffect, useState } from "react";
// import { API } from "aws-amplify";

const LambdaComponent = () => {
  const [lambdaResult, setLambdaResult] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const result = await API.get("lambdaFunction", "/path"); // Substitua 'lambdaFunction' e '/path' pelos valores corretos
        // setLambdaResult(result);
      } catch (error) {
        console.error("Erro ao chamar a função Lambda:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Resultado da Função Lambda:</h2>
      <pre>{JSON.stringify(lambdaResult, null, 2)}</pre>
    </div>
  );
};

export default LambdaComponent;
