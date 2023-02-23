import React, { useContext, useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Card, Nav } from "react-bootstrap";
import { useSelector,useDispatch } from "react-redux";
// import { auth } from 'firebase/app';
// import 'firebase/auth';
//import AuthContext from "../context/auth-contex";
import { logout } from "../components/redux/Auth";
 

import { useNavigate } from "react-router-dom";

export const Welcome = () => {
  //const ctx = useContext(AuthContext);
  const navigate = useNavigate();
  const token = useSelector((state)=>state.auth.email);
  const dispatch = useDispatch();


  const emailverify = async () => {
  //  const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDRuVNpK483qXGu6QL_IOKaFmOV7seq2_4`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken: token,
          }),
        }
      );
      if (response.ok) {
        const result = await response.json();
        console.log("Email verification sent", result);
      } else {
        throw new Error("Failed to send email verification");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      
        <center>
          <h1>Welcome to Expense Tracker </h1>
        </center>
        <div>
          <NavLink to="/">
            <button> Home </button>{" "}
          </NavLink>
          <NavLink to="/Profile">
            <button> user profile </button>{" "}
          </NavLink>
          <NavLink to="/Expenses">
            <button>Expenses</button>
          </NavLink>
          <button onClick={() => {dispatch(logout()); navigate("/"); }}>Logout</button>
        </div>
        <div>
          <button onClick={emailverify}>Verify email</button>
        </div>
    
    </div>
  );
};
