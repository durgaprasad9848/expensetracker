// import { useState } from "react";
// import AuthContext from "./auth-contex";
// import { useNavigate } from "react-router-dom";

// const ContextProvider = (props) => {
//   const initalToken = localStorage.getItem("token");
//   const [loginToken, setLoginToken] = useState(initalToken);

//   const navigate = useNavigate();

//   const storeTokenHandler = (idToken) => {
//     localStorage.setItem("token", idToken);

//     navigate("/Welcome");
//     setLoginToken(() => {
//       return idToken;
//     });
//   };

//   const removeTokenHandler = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("email");

//     setLoginToken(() => null);
//     navigate("/");
//   };
//   const userIsLogggedIn = !!loginToken;
//   console.log("islog", userIsLogggedIn);

//   const contextValue = {
//     isLoggedIn: userIsLogggedIn,
//     logInToken: loginToken,
//     storeToken: storeTokenHandler,
//     removeToken: removeTokenHandler,
//   };

//   return (
//     <AuthContext.Provider value={contextValue}>
//       {props.children}
//     </AuthContext.Provider>
//   );
// };

// export default ContextProvider;
