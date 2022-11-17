import React, { useState } from "react";

const Login = (props) => {
	const{ setLoginChecked } = props;

	const [loginInfo, setLoginInfo] = useState({
		ID: "",
		PASSWARD: "",
	});
	
	const { ID, PASSWARD } = loginInfo;
	const userList =[
		{
			ID : "qkrwodbs43",
			PASSWARD : "1234"
		}
	];
	const onChange = (e) => {
		const { ID, value } = e.target;

		setLoginInfo({
			...loginInfo,
			[ID]: value,
		});
	};

	const loginClicked = () => {
		if(loginInfo == userList) {
			setLoginChecked(true);
		}
	};
	const createAccount = () => {

	};
	return (	
		<div>
			<h1>login</h1>
			<input name = "ID" onChange={()=>onChange()} value={ID} placeholder="아이디" />
			<input name = "PASSWARD" onChange={()=>onChange()} value={PASSWARD}placeholder="비밀번호" />
			<button onClick={()=>loginClicked()}>로그인</button>
			<button onClick={()=>createAccount()}>회원가입</button>
		</div>
	);
};

export default Login;