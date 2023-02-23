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


//import AuthContext from "./context/auth-contex";
function App() {
//  const ctx = useContext(AuthContext);

  const isAuthenticated = useSelector((state)=>state.auth.isAuthenticated);
  return (
    <BrowserRouter>
 
        <Navbar />
        <Routes>
          {!isAuthenticated && <Route path="/Login" element={<AuthForm />} />}
          {isAuthenticated && <Route path="Welcome" element={<Welcome />} />}
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Expenses" element={<Expenses />} />
        </Routes>
   
    </BrowserRouter>
  );
}

export default App;
