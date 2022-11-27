/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import "../styles/MyPage.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";


const Profile = (props) => {
    const {loginUser, setLoginUser, userData, setUserData, saveUser, setSaveUser} = props;
    const [flip, setFlip] = useState(false);
    const changeName = useRef("");
    const changeEmail = useRef("");

    useEffect(() => {
        setUserData(saveUser.find(user=>user.email == loginUser))
    },[])

    function onClickEdit() {
        flippingCard();
    }

    //입력 폼 채워서 Complete버튼 클릭시 localStorage에 저장
    function onClickComplete() {
        if( saveUser.find(it=> it.email == changeEmail.current.value) ) {
            alert("이미 등록된 이메일입니다.")
            return;
        }
        console.log(changeName.current.value)

        console.log("1111111", saveUser);
        const data1 = saveUser.map(it => it.email == loginUser ? 
            { ...it, 
            userName: changeName.current.value, 
            email : changeEmail.current.value, 
            data : { ...it.data} } 
            : it)
        setSaveUser(data1);
        if (loginUser != changeEmail.current.value) { 
            //팔로우,팔로잉 데이터 변경
            const data2 = data1.map(user =>  {
                return {...user, data : {...user.data, 
                    followers : user.data.followers.map(it => it == loginUser ? changeEmail.current.value : it ),
                    followings : user.data.followings.map(it => it == loginUser ? changeEmail.current.value : it )
                }}
                
            })
            setSaveUser(data2);
            setLoginUser({email : changeEmail.current.value});

        }
        localStorage.setItem("users", JSON.stringify(saveUser)); 
        flippingCard();  
    }

    const flippingCard = () => {
        if (flip == true) setFlip(false);
        else setFlip(true);
    };

    
    if (!userData) return null;
    
    return (
        <div className="flip-card-wrapper">
            <div className="show-flip-card">
                <div className= {flip ? "flip-card is-flipped" : "flip-card"}>
                    <div className="card-face card-front">
                        <div className="profile-wrapper">
                            <div className="col-md-8">
                                <div className="card">
                                    <img
                                        className="card-img-top"
                                        src="images/niniz.jpeg"
                                        alt="img"
                                    />
                                    <div className="card-body profile-in text-center">
                                        <div className="pro-img">
                                            <img
                                                src={userData.profile}
                                                alt="user"
                                            />
                                        </div>
                                        <h3 className="m-b-0">
                                            {userData.userName}
                                        </h3>
                                        <p
                                            className="email"
                                            style={{ color: "#BCC0F2" }}
                                        >
                                            {userData.email}
                                        </p>
                                        <p>Web Front-End Developer</p>
                                        <Button
                                            className="m-t-10"
                                            style={{
                                                width: "60px",
                                                height: "40px",
                                                backgroundColor: "#BCC0F2",
                                                color: "white",
                                                fontSize: 14,
                                                fontFamily: "ubuntu-regular",
                                            }}
                                            onClick={onClickEdit}
                                        >
                                            Edit
                                        </Button>
                                        <div className="row text-center m-t-20">
                                            <div className="col-lg-4 col-md-4 m-t-20">
                                                <h3 className="m-b-0">{userData.data.events.length}</h3>
                                                <small>Todos</small>
                                            </div>
                                            <div className="col-lg-4 col-md-4 m-t-20">
                                                <h3 className="m-b-0">{userData.data.followers.length}</h3>
                                                <small>Followers</small>
                                            </div>
                                            <div className="col-lg-4 col-md-4 m-t-20">
                                                <h3 className="m-b-0">{userData.data.followings.length}</h3>
                                                <small>Following</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-face card-back">
                        <div className="profile-wrapper">
                            <div className="col-md-8">
                                <div className="card">
                                    <img
                                        className="back-card-img-top"
                                        src={"images/niniz-back.jpeg"}
                                        alt="img"
                                    />
                                    <div className="card-body profile-in text-center">
                                        <img
                                            className="profile-set-img"
                                            src={userData.profile}
                                            alt="user"
                                        />

                                        <table>
                                            <tbody>
                                            
                                                <tr>
                                                    <td className="form-header">
                                                        <h6>이름</h6>
                                                    </td>
                                                    <td>
                                                        <TextField
                                                            inputRef={changeName}
                                                            id="outlined-basic"
                                                            label={
                                                                userData.userName
                                                            }
                                                            defaultValue={userData.userName}
                                                            variant="outlined"
                                                            size="small"
                                                        />
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td className="form-header">
                                                        <h6>이메일</h6>
                                                    </td>
                                                    <td>
                                                        <TextField
                                                            inputRef={changeEmail}
                                                            id="outlined-basic"
                                                            label={userData.email}
                                                            defaultValue={userData.email}
                                                            variant="outlined"
                                                            size="small"
                                                        />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>

                                        <div className="">
                                            <div className="btn-group">
                                                <Button
                                                    className="m-t-10"
                                                    style={{
                                                        width: "60px",
                                                        height: "40px",
                                                        backgroundColor: "",
                                                        color: "#BCC0F2",
                                                        fontSize: 11,
                                                        fontFamily:
                                                            "ubuntu-regular",
                                                        borderStyle: "solid",
                                                        borderWidth: "thin",
                                                        borderRadius: "3px",
                                                    }}
                                                    type="reset"
                                                    onClick={()=>setFlip(false)}
                                                >
                                                    Cancel
                                                </Button>
                                                <Button
                                                    className="m-t-10"
                                                    style={{
                                                        width: "60px",
                                                        height: "40px",
                                                        backgroundColor:
                                                            "#BCC0F2",
                                                        color: "white",
                                                        fontSize: 11,
                                                        fontFamily:
                                                            "ubuntu-regular",
                                                    }}
                                                    onClick={()=>onClickComplete()}
                                                >
                                                    Complete
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
