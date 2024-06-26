import './App.css'
import { useEffect, useContext } from "react";
import { Context } from "./main";
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register"
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./components/Home/Home";
import HeroSection from "./components/Home/HeroSection";
import NotFound from './components/NotFound/NotFound';

import axios from "axios";
import { Toaster } from "react-hot-toast";


function App() {
  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);

  useEffect(() => {

  }, [isAuthorized]);


  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <Toaster />
      </BrowserRouter>
    </>
  )
}

export default App
