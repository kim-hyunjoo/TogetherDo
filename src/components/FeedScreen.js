import React, { useState } from "react";
import FeedSection from "./FeedSection";
import Calendar from "./Calendar";
import RightBar from "./RightBar";
import "../styles/Layout.css";

const FeedScreen = () => {
    const [idNum, seeIdNum] = useState(0);
    const names = [
        {id : 0, userName : "아이유"},
        {id : 1, userName : "지코"},
        {id : 2, userName : "유저1"}
    ];
    // const idInc = names.map((names, idx) => {
    //     return seeIdNum(idNum + 1);
    // });
    const userList = names.map(v => (<FeedSection key={v.id} id={v.userName} content={<Calendar/>}/>));
	return (
        <div>
            <div>
                {userList}
            </div>
            <div className= "right">
                <RightBar />
            </div>
        </div>
        
    )
}

export default FeedScreen;