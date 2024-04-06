
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
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";




function App() {

  const [isLogin,SetisLogin] = useState(false);
  const [loginUserId,SetloginUserId] = useState("");
  const [UserName,SetUserName] = useState("");

  
  const setState = (loginUserId: string , UserName: string) => {
    SetisLogin(true) ;
    SetloginUserId(loginUserId);
    SetUserName(UserName);
    console.log("UserName",UserName)
  }

  return (
    
    <div className="App">
      <ChakraProvider>
      <Header isLogin={isLogin} UserName={UserName} loginUserId={loginUserId}  />
        <BrowserRouter>
            <Routes>
              <Route path="/"  element={ <Login setState={setState}/> }/> 
              <Route path="/sign_up" element={ <Sign_up /> } /> 
              <Route path="/home" element={<Home loginUserId={loginUserId} />} /> 
              <Route path="/Issue" element={<Issue loginUserId={loginUserId}/>} />
            </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </div>
  );
}

export default App;
