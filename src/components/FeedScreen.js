import React, { useState, useEffect } from "react";
import FeedSection from "./FeedSection";
import Calendar from "./Calendar";
import RightBar from "./RightBar";
import "../styles/Layout.css";

const FeedScreen = (props) => {
    const {loginUser, userData, saveUser, setSaveUser} = props
    /*
    const [feedInfoList, setFeedInfoList] = useState([]);
    useEffect(() => {
        fetch('/data/UserData.json')
          .then(response => response.json())
          .then(result => setFeedInfoList(result));
    }, []);*/

    //각각의 loginUser, userData가 달라야함... 
    const newUserList =saveUser.filter(user=>user.email != loginUser);
    const userList = newUserList.map(v => {
        const data = v.data;
        const email = v.email;
        console.log(data);
        console.log(email);
        console.log(saveUser); //갑자기 이상한 객체가 들어옴..
        return (<FeedSection key={v.email} id={v.userName} img={v.profile} 
        content={<Calendar loginUser={email} isFriends={true} userData={data} saveUser={saveUser} setSaveUser={setSaveUser} />}/>)});
    //const followList = feedInfoList.map
	return (
        <div className = "friends-main">
            <div className="main-feed">
                {userList}
            </div>
            
            <div className= "follow-list">
                <header>
                    팔로우한 친구목록
                </header>
                <RightBar content={saveUser.filter(user=>user.email != loginUser)}/>
            </div>
        </div>
        
    )
}

export default FeedScreen;