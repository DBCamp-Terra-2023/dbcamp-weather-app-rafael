import React from 'react';
import './App.css';
import Register from "./pages/Register/register";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Header/>
      <Register />
      <Footer/>

    </div>
  );
}

export default App;
