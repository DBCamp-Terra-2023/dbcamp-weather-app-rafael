import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 7000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div id="error-page">
      <br/>
      <h1>Oops! ⚡</h1>
      <br/>
      <p>Desculpe, um erro inesperado aconteceu. 🌧️</p>
      <br/>
      <p>As vezes é necessário um pouco de chuva para se ter um lindo arco-íris. 🌈</p>
      <br/>
      <p>Você será redirecionado para a página inicial em alguns segundos. 🌞</p>
      <br/>
    </div>
  );
}