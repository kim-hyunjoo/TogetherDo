import React, { useState, useEffect } from "react";
import FeedSection from "./FeedSection";
import Calendar from "./Calendar";
import RightBar from "./RightBar";
import "../styles/Layout.css";

const FeedScreen = () => {
    const [feedInfoList, setFeedInfoList] = useState([]);
    useEffect(() => {
        fetch('/data/UserData.json')
          .then(response => response.json())
          .then(result => setFeedInfoList(result));
    }, []);

    const userList = feedInfoList.map(v => (<FeedSection key={v.id} id={v.user_name} img={v.imageUrls} content={<Calendar />}/>));
    //const followList = feedInfoList.map
	return (
        <div>
            <div>
                {userList}
            </div>
            <div className= "right">
                <header>
                    팔로우한 친구목록
                </header>
                <RightBar content={feedInfoList}/>
            </div>
        </div>
        
    )
}

export default FeedScreen;