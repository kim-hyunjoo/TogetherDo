import React, { useState, useEffect } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import "../styles/Login.css"

const Login = (props) => {
	const{ setLoginChecked } = props;
  const [loginUser, setLoginUser] = useState({
    email: '',
    passward: '',
  });
	const [changed, setChanged] = useState(true);
	const [saveUser, setSaveUser] = useState(() => {
        if (typeof window !== "undefined") {
          const saved = localStorage.getItem("users");
          if (saved !== null) {
            //console.log(JSON.parse(saved))
            return JSON.parse(saved);
          } else {
            return [];
          }
        }
    });
	useEffect(()=> {
        localStorage.setItem("users", JSON.stringify(saveUser));
 	},[saveUser])
	useEffect(() => {
    const data = localStorage.getItem("users");
    if (data) {
      setSaveUser(JSON.parse(data));
    }
	}, []);

  return (
  changed ? 
  <LoginForm
    loginUser={loginUser}
    saveUser={saveUser}
    setLoginUser={setLoginUser}
    setLoginChecked = {setLoginChecked}
    setChanged={setChanged}
  /> :
  <SignUpForm 
    setSaveUser={setSaveUser} 
    saveUser = {saveUser} 
    setChanged={setChanged}
  />
  )
}

export default Login;