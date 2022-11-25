import React, { useState, useEffect } from "react";
import FeedSection from "./FeedSection";
import "../styles/Layout.css";
import FollowModal from "./FollowModal";

const FeedScreen = (props) => {
    const {loginUser, userData, saveUser, setSaveUser} = props
    const [followModalOpen, setFollowModalOpen] = useState(false);

    const openFollowModal = () => {
        setFollowModalOpen(true);
    }
    const closeFollowModal = () => {
        setFollowModalOpen(false);
    }

    //이제 본인이 follow하는 사람만.. 가져와야함...
    const followings = saveUser.find(user=>user.email==loginUser).data.followings;
    //followings는 배열형태.. [ 유저1 이메일, 유저2 이메일]
    //saveUser이랑 비교하면... 
    //각자의 객체를 줘야함
    //const newUserList = saveUser.filter(user=>user.email != loginUser);
   
    let test_list = [];
    saveUser.forEach(user => {
        followings.forEach(fo => {
            if(fo == user.email) {
                test_list.push(user);
            }
        })
    });
    console.log(test_list);
    const userList = test_list.map(v => {
        const data = v.data;
        const email = v.email;
        return (
        <FeedSection 
        id={v.userName} 
        img={v.profile}
        loginUser={loginUser} 
        user={email}
        isFriends={true} 
        userData={data} 
        saveUser={saveUser} 
        setSaveUser={setSaveUser} />
        )});

        const buttonHandler = () => {
            openFollowModal();
        }


	return (
        <div className = "friends-main">
            <div>
                <button className ="follow-button" onClick={()=>buttonHandler()}>follow</button>
            </div>
            <div className="main-feed">
                {userList}
                
            </div>
            <FollowModal open={followModalOpen} close={closeFollowModal} header={"follow"}
            loginUser={loginUser} saveUser={saveUser} setSaveUser={setSaveUser}
            />
        </div>
        
    )
}

export default FeedScreen;