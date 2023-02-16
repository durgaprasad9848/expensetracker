import React, { useState } from "react";
import {NavLink} from 'react-router-dom';
import {Card} from 'react-bootstrap';

// import { auth } from 'firebase/app';
// import 'firebase/auth';


export const Welcome = () => {
 

  //  const [verificationStatus, setVerificationStatus] = useState(null);
    // const [pstate,setpstate] = useState("");
    // var locstate = localStorage.getItem("pState");
    // if(locstate){
    //     setpstate("");
    // }
    // else{ 
    //     setpstate("is incomplete");
    // }

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
        <NavLink to ="/Profile"><button> user profile </button> </NavLink>
        <button onClick={emailverify}>Verify email</button>
   
        
      </Card>
    </div>
  );
};
