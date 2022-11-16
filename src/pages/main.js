import React from "react";
import "../styles/Layout.css";
import Calendar from "../components/Calendar";

const Main = () => {
    
    return (    
    <div className="mainhomescreen">
        <div className="homescreen">
            <Calendar />
        </div>
    </div>
    )
};

export default Main;