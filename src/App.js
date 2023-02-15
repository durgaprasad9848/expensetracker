 import React, { useContext } from "react";


 import {
  BrowserRouter,
  Routes,
  Route,
  createBrowserRouter,
} from "react-router-dom";
import { Navbar } from "./pages/Navbar";
import {Welcome} from "./pages/Welcome";
import AuthForm from "./components/Auth/AuthForm";
import ContextProvider from "./context/ContexProvider";

import AuthContext from "./context/auth-contex";
function App() {
  const ctx = useContext(AuthContext);
  return (
  
  <BrowserRouter>
 <ContextProvider>
   <Navbar/>
  <Routes>
   { !ctx.isLoggedIn && <Route path="/Login" element={<AuthForm />} /> }
   { ctx.isLoggedIn && <Route path="/Welcome"  element = {<Welcome/>}/> }
    
  </Routes>
  </ContextProvider>
  </BrowserRouter>
 
  );
}

export default App;
