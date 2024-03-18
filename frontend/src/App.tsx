
import React from 'react';
import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import './App.css';
import { ChakraProvider } from '@chakra-ui/react'
import Header from "./features/Header";
import Login from "./rootes/Login/Login"
import Sign_up from "./rootes/Sign_up"

function App() {
  return (
    
    <div className="App">
      <ChakraProvider>
      <Header />
        <BrowserRouter>

            <Routes>
              <Route path="/login" element={ <Login /> } /> 
              <Route path="/sign_up" element={ <Sign_up /> } /> 
            </Routes>
        </BrowserRouter>
      </ChakraProvider>


    </div>
  );
}

export default App;
