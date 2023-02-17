import React, { useContext, useState,useRef, useEffect } from "react";
import {NavLink} from 'react-router-dom';
import {Card} from 'react-bootstrap';

// import { auth } from 'firebase/app';
// import 'firebase/auth';
import AuthContext from "../context/auth-contex";

export const Welcome = () => {

    const amount = useRef(null);
    const disc = useRef(null);
    const cat = useRef(null);
    
    const ctx = useContext(AuthContext);
    
    const[userdata,setData] = useState([]);
  //  const [verificationStatus, setVerificationStatus] = useState(null);
    // const [pstate,setpstate] = useState("");
    // var locstate = localStorage.getItem("pState");
    // if(locstate){
    //     setpstate("");
    // }
    // else{ 
    //     setpstate("is incomplete");
    // }
     
    const submithandler = (e) =>{
       e.preventDefault();
        const newdata = {amount:amount.current.value, disc: disc.current.value, cat: cat.current.value};
         setData([...userdata,newdata]);
        
    
    }

   

    const emailverify = async() =>{
        const token = localStorage.getItem('token');
        try{
        const response = await fetch(
            `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDRuVNpK483qXGu6QL_IOKaFmOV7seq2_4`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                requestType: 'VERIFY_EMAIL',
                idToken: token,
              })
            }
          );
          if (response.ok) {
            const result = await response.json();
            console.log('Email verification sent',result);
          } else {
            throw new Error('Failed to send email verification');
          }
        } catch (error) {
          console.error(error);
        }
      }



    //   const handleVerifyEmail = async () => {
    //     try {
    //       const user = auth().currentUser;
    //       await user.reload();
    //       if (user.emailVerified) {
    //         setVerificationStatus('Email verified');
    //         console.log('Email verified');
    //       } else {
    //         setVerificationStatus('Email not verified');
    //       }
    //     } catch (error) {
    //       console.error(error);
    //       setVerificationStatus('Error verifying email');
    //     }
    //   }

    
  return (
    <div>
      <Card>
        <center><h1>Welcome to Expense Tracker </h1></center>
        <div>
        <NavLink to ="/Welcome"><button> Home </button> </NavLink>
        <NavLink to ="/Profile"><button> user profile </button> </NavLink>
        <button onClick={()=>ctx.removeToken()}>Logout</button>
        </div>
        <div>
        <button onClick={emailverify}>Verify email</button>
        </div>
        
      </Card>
      <Card>
        <form>
            <div>
                <label>Money spend : </label>
                <input type="text" ref={amount}></input>
            </div>
            <div>
                <label>Money Description : </label>
                <input type="text" ref={disc}></input>
            </div>
            <div>
                <label>Category</label>
                <select ref={cat}>
                    <option value={"Food"}>Food</option>
                    <option value={"Petrol"}>Petrol</option>
                    <option value={"Travel"}>Traveling</option>
                    <option value={"Movies"}>Movies</option>
                </select>
            </div>
            <button onClick={submithandler}>Submit</button>
        </form>


        <ul> 
        {userdata.map((person, index) => (
          <li key={index}>{`${person.amount} - ${person.cat} - ${person.disc}`}</li>
        ))}
      </ul>
     
      </Card>
    </div>
  );
};
