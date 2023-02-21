import React, { useContext, useState,useRef, useEffect } from "react";
import {NavLink} from 'react-router-dom';
import {Card, Nav} from 'react-bootstrap';

// import { auth } from 'firebase/app';
// import 'firebase/auth';
import AuthContext from "../context/auth-contex";

export const Welcome = () => {


    
    const ctx = useContext(AuthContext);

        // async function temp(){
        //     const data = await fetch("https://test-api-c7d27-default-rtdb.firebaseio.com/prasad.json")
        //     .then((response) => response.json())
        //     .then((data) => {
            
        //       console.log("fetched", data);
        //     });
        // }
        // temp();
  


    
   
  //  const [verificationStatus, setVerificationStatus] = useState(null);
    // const [pstate,setpstate] = useState("");
    // var locstate = localStorage.getItem("pState");
    // if(locstate){
    //     setpstate("");
    // }
    // else{ 
    //     setpstate("is incomplete");
    // }


   

    // useEffect(()=>{


      //     async function apple(){
      //       console.log("HI");
        
      //  //     const file = `${localStorage.getItem("email")}`;
      //       const response = await fetch(
      //         `https://test-api-c7d27-default-rtdb.firebaseio.com/prasad.json`,
      //         {
      //           method: "POST",
      //           body: JSON.stringify(userdata),
      //           headers: {
      //             "Content-Type": "application/json",
      //           },
      //         }
      //       );
      //       const result = await response.json();


      //       const data = await fetch("https://test-api-c7d27-default-rtdb.firebaseio.com/prasad.json")
      //       .then((response) => response.json())
      //       .then((data) => {
            
      //         console.log("fetched", data);
      //       });


      //       console.log(result);
      //       }
      //       apple();

      //  setFetch(false);
    //   console.log("hi",userdata);

    // },[userdata]);

 


     
    

   

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
        <NavLink to ="/Expenses"><button>Expenses</button></NavLink>
        <button onClick={()=>ctx.removeToken()}>Logout</button>
        </div>
        <div>
        <button onClick={emailverify}>Verify email</button>
        </div>
        
      </Card>
      
    </div>
  );
};
