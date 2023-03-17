import React, { useState, useEffect } from "react";
import Profile from "../components/Profile";

const MyPage = (props: { loginUser: any; setLoginUser: any; userData: any; setUserData: any; saveUser: any; setSaveUser: any; }) => {
	const {loginUser, setLoginUser, userData,setUserData, saveUser, setSaveUser} = props;

	return (
		<div >
			<Profile loginUser={loginUser} setLoginUser={setLoginUser} userData={userData} setUserData={setUserData} saveUser={saveUser} setSaveUser={setSaveUser}/>
			{/* <h1>{userData.userName}님의 마이페이지 입니다.</h1>
			<p>프로필 사진</p>
			<img width="70px" height= "70px" src={userData.profile}></img>
			<p>이메일 : {userData.email}</p> */}
			{/* 내가 팔로우하는 친구들 : userData.follow */}
		</div>
	);
};

export default MyPage;