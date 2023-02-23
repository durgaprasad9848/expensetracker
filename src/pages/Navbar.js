import React, { useEffect,useContext } from "react";
import {NavLink} from 'react-router-dom';
import AuthForm from "../components/Auth/AuthForm";
import { Welcome } from "./Welcome";
 
import { useSelector } from "react-redux";

export const Navbar = () =>{
    const isAuthenticated = useSelector((state)=>state.auth.isAuthenticated);
 
    return(<div>
        {(isAuthenticated)?<Welcome/> :<AuthForm/> }
    </div>);
}