import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from 'styled-components';
import "../styles/Login.css"
import { Link } from 'react-router-dom';


const SubmitWrapper = styled.div`
	margin-top: 1rem;
	padding-top: 0.6rem;
	padding-bottom: 0.5rem;

	background: #BCC0F2;
	color: white;

	text-align: center;
	font-size: 1.25rem;
	font-weight: 500;

	cursor: pointer;
	user-select: none;
	transition: .2s all;

    &:hover {
        background: #BCC0F2;
        box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
    }

    &:active {
        background: #BCC0F2;
    }
`;
const StyledLink = styled(Link)`
    color: #868e96;
    font-size: 1.25rem;
    &:hover {
        color: #495057;
    }
`;
const SignUpForm = (props) => {
    const { saveUser, setSaveUser, setChanged } = props
    const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
    const onSubmit = (data) => {
        console.log(data);
        const profile = profiles.filter(profile=>profile.id == data.profile)
        const url = profile[0].url;
        const newData = 
        {...data, 
        profile : url, 
        data : {
            extraEventArr : [],
            extraEventID : 0,
            events : [],
            eventID : 0,
            checkItems : [],
            pinnedItems : []
            }
        }
        setSaveUser([...saveUser, newData]);
        setChanged(true);
        alert("회원가입이 완료되었습니다.");
	}
    const login = () => {
        setChanged(true);
        console.log("clicked!!");
    }

    const profiles = 
    [ {id : 1, url : "images/profile1.PNG"},
    {id : 2, url : "images/profile2.jpg"},
    {id : 3, url : "images/profile3.jpg"},
    {id : 4, url : "images/profile4.jpg"},
    {id : 5, url : "images/profile5.png"}];

    return (
        <div className="Positioner">
            <div className="ShadowedBox">
                <div className="LogoWrapper">
                    <div className="Logo">
                        TogetherDo
                    </div>
                </div>
                <div className="Contents">
                    <div className="Title">	
                        <form id="frm">
                            <div>
                                <div className="errors">
                                    <label className="Label" htmlFor="email">이메일</label>
                                    {errors.email && <small role="alert" className="errorsMsg">{errors.email.message}</small>}
                                </div>
                                <input
                                    className="Input"
                                    id="email"
                                    type="text"
                                    placeholder="test@email.com"
                                    {...register("email", {
                                        required: "이메일은 필수 입력입니다.",
                                        pattern: {
                                            value: /\S+@\S+\.\S+/,
                                            message: "이메일 형식에 맞지 않습니다.",
                                        },
                                    })}
                                    />
                            </div>
                            <div>
                                <div className="errors">
                                    <label className="Label" htmlFor="userName">이름</label>
                                    {errors.userName && <small role="alert" className="errorsMsg">{errors.userName.message}</small>}
                                </div>
                                <input 
                                    className="Input"
                                    id="userName"
                                    type="text"
                                    placeholder="이름"
                                    {...register("userName", {
                                        required: "이름은 필수입력입니다.",
                                    })}
                                />
                            </div>
                            <div>
                                <div className="errors">
                                    <label className="Label" htmlFor="passward">비밀번호</label>
                                    {errors.passward && <small role="alert" className="errorsMsg">{errors.passward.message}</small>}
                                </div>
                                <input 
                                    className="Input"
                                    id="passward"
                                    type="password"
                                    placeholder="비밀번호"
                                    {...register("passward", {
                                        required: "비밀번호는 필수입력입니다.",
                                    })}
                                />
                                
                            </div>
                            <div>
                                <div className="errors">
                                    <label className="Label" htmlFor="profile">프로필 설정</label>
                                    {errors.profile && <small role="alert" className="errorsMsg">{errors.profile.message}</small>}
                                </div>
                                {/*<div className="profile-list" style={{display : "flex", columnGap : "20px"}}>
                                    {profile.map(img => {
                                        return <img key={img} className="profile" width="70px" height= "70px" src={img}></img>
                                    })}
                                </div>*/}
                                <div className="profile-list" style={{display : "flex", columnGap : "20px"}}>
                                    {profiles.map(profile => {
                                        return (
                                        <div className="profile" key={profile.id}>
                                            <input className="Input" id="profile"type="radio" value={profile.id}
                                            {...register("profile", 
                                            {required: "프로필 설정은 필수입력입니다.",
                                            })}></input>
                                            <img width="70px" height= "70px" src={profile.url}></img>
                                        </div>
                                        )
                                    })}
                                </div>
                                
                            </div>
                            <SubmitWrapper onClick={handleSubmit(onSubmit)}>
                                    회원가입
                            {/* <button className="SubmitWrapper" type="submit">로그인</button> */}
                            </SubmitWrapper>
                            <div className="Aligner">
                                <StyledLink onClick={login}>로그인</StyledLink>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUpForm;