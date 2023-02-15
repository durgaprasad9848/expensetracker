import React, { useEffect,useContext } from "react";
import {NavLink} from 'react-router-dom';
import AuthForm from "../components/Auth/AuthForm";
import { Welcome } from "./Welcome";

import AuthContext from "../context/auth-contex";


export const Navbar = () =>{
    const ctx = useContext(AuthContext);
    console.log(ctx.isLoggedIn);
    return(<div>
        {(ctx.isLoggedIn)?<Welcome/> :<AuthForm/> }
    </div>);
}