import React from "react";
import "../styles/Layout.css";
import FeedScreen from "../components/FeedScreen";

const Friends = (props: { loginUser: any; userData: any; saveUser: any; setSaveUser: any; }) => {
	const {loginUser, userData, saveUser, setSaveUser} = props
	return (
		<div className="mainscreen">
			<div className= "left">
				<FeedScreen loginUser={loginUser} userData={userData} saveUser={saveUser} setSaveUser={setSaveUser}/>
			</div>
		</div>
	);
};

export default Friends;