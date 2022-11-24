import React, { useState, useEffect } from "react";
import "../styles/MyPage.css";
import Button from "@mui/material/Button";

const Profile = (userData) => {
    const [user, setUser] = useState("");

    useEffect(() => {
        const getUser = () => {
            try {
                setUser(userData.user);
                console.log(userData.user);
            } catch (e) {
                console.log(e);
            }
        };

        getUser();
    }, []);

    if (!userData) return null;
    return (
        <div className="profile-wrapper">
            {console.log(user.userName)}
            <div className="col-md-8">
                <div className="card">
                    <img
                        className="card-img-top"
                        src="images/niniz.jpeg"
                        alt="img"
                    />
                    <div className="card-body profile-in text-center">
                        <div className="pro-img">
                            <img src="images/profile2.jpg" alt="user" />
                        </div>
                        <h3 className="m-b-0">{user.userName}</h3>
                        <p className="email" style={{ color: "#BCC0F2" }}>
                            {user.email}
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
                        >
                            Edit
                        </Button>
                        <div className="row text-center m-t-20">
                            <div className="col-lg-4 col-md-4 m-t-20">
                                <h3 className="m-b-0">20</h3>
                                <small>Todos</small>
                            </div>
                            <div className="col-lg-4 col-md-4 m-t-20">
                                <h3 className="m-b-0">3</h3>
                                <small>Followers</small>
                            </div>
                            <div className="col-lg-4 col-md-4 m-t-20">
                                <h3 className="m-b-0">6</h3>
                                <small>Following</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
