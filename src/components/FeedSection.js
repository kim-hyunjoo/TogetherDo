import React, { useEffect } from "react";
import "../styles/Feed.css"
import {Layout } from "antd";
import {Header, Content,  Footer} from "antd/lib/layout/layout";
import GuestBook from "./GuestBook";
import Calendar from "./Calendar";

const FeedSection = (props) => {
    const { id, img,
    loginUser, user, isFriends, userData, saveUser, setSaveUser} = props;

    useEffect(()=> {console.log(props)},[])
	return (
        <div key={user}>
        <Layout>
            <Header className="header">
                <img width = "70px" height= "70px" src = {img} />
                {id} 님의 시간표 입니다.
            </Header>
            <Content className="container">
                <div className="friend-calendar">
                <Calendar loginUser={user} isFriends={isFriends} userData={userData} saveUser={saveUser} setSaveUser={setSaveUser} />
                </div>
                <GuestBook loginUser={loginUser} user={user} saveUser={saveUser} setSaveUser={setSaveUser} />
            </Content>
            <Footer className="footer2" />
        </Layout>
        </div>
    )
};

export default FeedSection;