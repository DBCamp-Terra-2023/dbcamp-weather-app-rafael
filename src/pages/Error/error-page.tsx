import React from "react";

interface RouteError {
  statusText?: string;
  message?: string;
}

export default function ErrorPage() {

  return (
    <div id="error-page">
      <br/>
      <h1>Oops! ⚡</h1>
      <br/>
      <p>Desculpe, um erro inesperado aconteceu. 🌧️</p>
      <br/>
      <p>As vezes é necessário um pouco de chuva para se ter um lindo arco-íris. 🌈</p>
      <br/>
    </div>
  );
}
