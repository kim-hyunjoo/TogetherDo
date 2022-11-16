import React from "react";
import "../styles/Layout.css";
import FeedScreen from "../components/FeedScreen";

const Friends = () => {
	return (
		<div className="mainscreen">
			<div className= "left">
				<FeedScreen />
			</div>
		</div>
	);
};

export default Friends;