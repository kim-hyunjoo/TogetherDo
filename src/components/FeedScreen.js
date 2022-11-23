import React, { useState, useEffect } from "react";
import FeedSection from "./FeedSection";
import Calendar from "./Calendar";
import RightBar from "./RightBar";
import "../styles/Layout.css";

const FeedScreen = (props) => {
    const {loginUser, userData, saveUser, setSaveUser} = props
    const newUserList = saveUser.filter(user=>user.email != loginUser);

    const userList = newUserList.map(v => {
        const data = v.data;
        const email = v.email;
        return (
        <FeedSection 
        id={v.userName} 
        img={v.profile} 
        loginUser={email} 
        isFriends={true} 
        userData={data} 
        saveUser={saveUser} 
        setSaveUser={setSaveUser} />
        )});
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
                <RightBar content={newUserList}/>
            </div>
        </div>
        
    )
}

export default FeedScreen;