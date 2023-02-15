import { createContext } from "react";

const AuthContext = createContext({
  logInToken: "",
  isLoggedIn:"",
  storeToken: ()=>{},
  removeToken:()=>{},
  logout:()=>{},

});
export default AuthContext;
