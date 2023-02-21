 import React, { useContext } from "react";


 import {
  BrowserRouter,
  Routes,
  Route,
  createBrowserRouter,
} from "react-router-dom";
import { Navbar } from "./pages/Navbar";
import {Welcome} from "./pages/Welcome";
import { Profile } from "./pages/Profile";
import AuthForm from "./components/Auth/AuthForm";
import ContextProvider from "./context/ContexProvider";
import {Expenses} from "./pages/Expenses";


import AuthContext from "./context/auth-contex";
function App() {
  const ctx = useContext(AuthContext);
  return (
  
  <BrowserRouter>
 <ContextProvider>
   <Navbar/>
  <Routes>
   { !ctx.isLoggedIn && <Route path="/Login" element={<AuthForm />} /> }
   { ctx.isLoggedIn && <Route path ="Welcome" element={<Welcome/>}/>   }
     <Route path="/Profile"  element = {<Profile/>}/> 
    <Route path ="/Expenses" element={<Expenses/>}/>
  </Routes>
  </ContextProvider>
  </BrowserRouter>
 
  );
}

export default App;
