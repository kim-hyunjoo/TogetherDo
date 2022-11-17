import React from "react";
import "../styles/Layout.css";
import Calendar from "../components/Calendar";
import ExternalCalendar from "../components/ExternalCalendar";
import SideMenu from "../components/SideMenu";

const Main = () => {
    
    return (    
    <div className="mainhomescreen">
        <div className="homescreen">
            {/*<SideMenu />*/}
            <Calendar />
        </div>
    </div>
    )
};

export default Main;