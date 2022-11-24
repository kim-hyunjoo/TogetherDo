import React, { useState, useEffect } from "react";
import Profile from "../components/Profile";

const MyPage = (props) => {
	const {loginUser, saveUser} = props;
	const [userData, setUserData] = useState(()=> {
		const user = saveUser.find(user=>user.email == loginUser)
		return user;
	});

	return (
		<div >
			<Profile user={userData} />
			{/* <h1>{userData.userName}님의 마이페이지 입니다.</h1>
			<p>프로필 사진</p>
			<img width="70px" height= "70px" src={userData.profile}></img>
			<p>이메일 : {userData.email}</p> */}
			{/* 내가 팔로우하는 친구들 : userData.follow */}
		</div>
	);
};

export default MyPage;