import React, { useState, useEffect } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import "../styles/Login.css"

const Login = (props: { setLoginChecked: any; saveUser: any; setSaveUser: any; loginUser: any; setLoginUser: any; }) => {
	const{ setLoginChecked, saveUser, setSaveUser, loginUser, setLoginUser } = props;
  const [changed, setChanged] = useState(true);

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