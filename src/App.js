import React, { useContext } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  createBrowserRouter,
} from "react-router-dom";
import { Navbar } from "./pages/Navbar";
import { Welcome } from "./pages/Welcome";
import { Profile } from "./pages/Profile";
import AuthForm from "./components/Auth/AuthForm";
import ContextProvider from "./context/ContexProvider";
import { Expenses } from "./pages/Expenses";
import { useSelector } from "react-redux";
 
import './App.css';


function App() {

const istheme = useSelector((state)=>state.prem.theme);
 
  const isAuthenticated = useSelector((state)=>state.auth.isAuthenticated);
  return (
    <BrowserRouter>
      <div className={istheme ? 'dark-theme' : ''}> 
      <h>display page</h>
        <Navbar />
        <Routes>
          {!isAuthenticated && <Route path="/Login" element={<AuthForm />} />}
          {isAuthenticated && <Route path="Welcome" element={<Welcome />} />}
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Expenses" element={<Expenses />} />
        </Routes>
        </div>
    </BrowserRouter>
  );
}

export default App;
