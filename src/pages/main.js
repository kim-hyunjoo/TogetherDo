import React from "react";
import "../styles/Layout.css";
import Calendar from "../components/Calendar";

const Main = (props) => {
    const { loginUser }= props;
    return (    
    <div className="mainhomescreen">
        <div className="homescreen">
            <Calendar loginUser={loginUser} />
        </div>
    </div>
    )
};

export default Main;