import React from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "../ui/components/Header";
import Home from "../pages/Home/home";
import Register from "../pages/Register/register";
import Listing from "../pages/Listing/listing";
import Footer from "../ui/components/Footer";
import ErrorPage from "../pages/Error/error-page";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <div>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/listing" element={<Listing/>}/>
          <Route path="*" element={<ErrorPage/>}/>
        </Routes>
        <Footer/>
      </div>
    </BrowserRouter>
  );
}
