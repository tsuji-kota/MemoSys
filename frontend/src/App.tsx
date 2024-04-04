
import React,{useState} from 'react';
import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import './App.css';
import { ChakraProvider } from '@chakra-ui/react'
import Header from "./features/Header";
import Login from "./rootes/Login"
import Sign_up from "./rootes/Sign_up"
import Home from "./rootes/Home"
import Issue from "./rootes/Issue"




function App() {

  const [isLogin,SetisLogin] = useState(false);
  
  const setState = () => {
    SetisLogin(true) ;
  }
  return (
    
    <div className="App">
      <ChakraProvider>
      <Header isLogin={isLogin}/>
        <BrowserRouter>
            <Routes>
              <Route path="/"  element={ <Login setState={setState} /> }/> 
              <Route path="/sign_up" element={ <Sign_up /> } /> 
              <Route path="/home" element={<Home />} /> 
              <Route path="/Issue" element={<Issue />} />
            </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </div>
  );
}

export default App;
