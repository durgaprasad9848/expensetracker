import React from "react";
import {NavLink} from 'react-router-dom';
import {Card} from 'react-bootstrap';
export const Welcome = () => {
  return (
    <div>
      <Card>
        <center><h1>Welcome to Expense Tracker </h1></center>
        <NavLink to ="/Profile"><button> user prefile is incomplete</button> </NavLink>
        
      </Card>
    </div>
  );
};
