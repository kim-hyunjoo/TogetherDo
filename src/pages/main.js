import React from "react";
import "../styles/Layout.css";
import FeedScreen from "../components/FeedScreen";

const Main = () => (
    <div className="mainscreen">
        <div className= "left">
            <FeedScreen />
        </div>
    </div>
);

export default Main;