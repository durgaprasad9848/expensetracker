import React, { useState } from "react";
import {NavLink} from 'react-router-dom';
import {Card} from 'react-bootstrap';
export const Welcome = () => {
 
    // const [pstate,setpstate] = useState("");
    // var locstate = localStorage.getItem("pState");
    // if(locstate){
    //     setpstate("");
    // }
    // else{ 
    //     setpstate("is incomplete");
    // }
  return (
    <div>
      <Card>
        <center><h1>Welcome to Expense Tracker </h1></center>
        <NavLink to ="/Profile"><button> user profile </button> </NavLink>
        
      </Card>
    </div>
  );
};
