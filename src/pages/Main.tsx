import React from "react";
import "../styles/Layout.css";
import Calendar from "../components/Calendar";

const Main = (props: { loginUser: any; userData: any; saveUser: any; setSaveUser: any; }) => {
    const { loginUser, userData, saveUser, setSaveUser }= props;
    return (    
    <div className="mainhomescreen">
        <div className="homescreen">
            <Calendar loginUser={loginUser} userData={userData} saveUser={saveUser} setSaveUser={setSaveUser}/>
        </div>
    </div>
    )
};

export default Main;