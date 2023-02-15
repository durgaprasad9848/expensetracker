import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../../context/auth-contex";
 
import classes from "./AuthForm.module.css";

const AuthForm = () => {




  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);





  const navigate = useNavigate();




  const emailRef = useRef();
  const passwordRef = useRef();
  const confpasswordRef = useRef();





  const ctx = useContext(AuthContext);
  console.log(ctx);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    var conformEnteredPassword = null;


    console.log(enteredEmail, enteredPassword);
    setIsLoading(true);
    if (isLogin) {
      console.log("login page");
      localStorage.setItem("email", enteredEmail.replace("@gmail.com", ""));
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDRuVNpK483qXGu6QL_IOKaFmOV7seq2_4",
          {
            method: "POST",
            body: JSON.stringify({
              email: enteredEmail,
              password: enteredPassword,
              returnSecureToken: true,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setIsLoading(false);
        if (!response.ok) {
          throw new Error(data.error.message);
        }
        console.log(data.idToken);
        ctx.storeToken(data.idToken);
     //   navigate("/Welcome"); //
        // ctx.logInToken(data.idToken)
      } catch (error) {
        console.log(error);
        alert(error);
      }
    } else {
      conformEnteredPassword = confpasswordRef.current.value;

      if(enteredPassword === conformEnteredPassword)
      {
      try {
        
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDRuVNpK483qXGu6QL_IOKaFmOV7seq2_4",
          {
            method: "POST",
            body: JSON.stringify({
              email: enteredEmail,
              password: enteredPassword,
              returnSecureToken: true,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        console.log(data);
        console.log("user is successfully signed up");
        navigate("/");
        if (!response.ok) {
          throw new Error(data.error.message);
        }
      } catch (error) {
        console.log(error);
        alert(error);
      }

  

      alert("Sign up completed - Please login ");
      setIsLogin((prevState) => !prevState);
      setIsLoading((state)=>!state);
    }
    else{
      setIsLoading((state)=>!state);
      alert("Password and Confirm Password is not matched");
    }


    }
  
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={formSubmitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input ref={emailRef} type="email" id="email" required />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input ref={passwordRef} type="password" id="password" required />
        </div>

        {!isLogin && 
         <div className={classes.control}>
         <label htmlFor="password">Conform Password</label>
         <input ref={confpasswordRef} type="password" id="password" required />
       </div>
        }
       


        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <p>Sending request...</p>}

          {/* {request && <p>Sending Request...</p>} */}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
