/* eslint-disable */
import React, { useState, useEffect } from "react";
import "../styles/MyPage.css";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const jobs = [
    {
        value: "Student",
        label: "Student",
    },
    {
        value: "Developer",
        label: "Developer",
    },
    {
        value: "Designer",
        label: "Designer",
    },
    {
        value: "Project Manager",
        label: "Project Manager",
    },
];

const SelectJob = () => {
    const [job, setJob] = React.useState("Student");

    const handleChange = (event) => {
        setJob(event.target.value);
    };

    return (
        <Box
            component="form"
            sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
        >
            <div>
                <TextField
                    id="outlined-select-job"
                    select
                    label="Select"
                    value={job}
                    onChange={handleChange}
                    size="small"
                >
                    {jobs.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </div>
        </Box>
    );
};

const Profile = (userData) => {
    const [user, setUser] = useState("");
    function onClickEdit() {
        flippingCard();
    }

    function onClickComplete() {
        console.log("1111111", userData);
        localStorage.setItem(userData.userName, changeName);
        //userData.userName = changeName;
        console.log("2222222", userData);
        flippingCard();
        // localStorage.setItem(userData.email, JSON.stringify(changeEmail));
    }

    const flippingCard = () => {
        const flipCard = document.querySelectorAll(".flip-card");
        console.log(flipCard);
        [...flipCard].forEach((card) => {
            card.addEventListener("click", function () {
                card.classList.toggle("is-flipped");
            });
        });
    };

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
    }, [userData.user]);

    const [changeName, setChangeName] = useState(user.userName);
    const [changeEmail, setChangeEmail] = useState(user.email);

    if (!userData) return null;
    return (
        <div className="flip-card-wrapper">
            <div className="show-flip-card">
                <div className="flip-card">
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
                                                src={user.profile}
                                                alt="user"
                                            />
                                        </div>
                                        <h3 className="m-b-0">
                                            {user.userName}
                                        </h3>
                                        <p
                                            className="email"
                                            style={{ color: "#BCC0F2" }}
                                        >
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
                                            onClick={onClickEdit}
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
                    </div>
                    <div className="card-face card-back">
                        <div className="profile-wrapper">
                            <div className="col-md-8">
                                <div className="card">
                                    <img
                                        className="back-card-img-top"
                                        src="images/niniz-back.jpeg"
                                        alt="img"
                                    />
                                    <div className="card-body profile-in text-center">
                                        <img
                                            className="profile-set-img"
                                            src={user.profile}
                                            alt="user"
                                        />

                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td className="form-header">
                                                        <h6>프로필 변경</h6>
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="file"
                                                            className="form-control"
                                                        />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="form-header">
                                                        <h6>이름</h6>
                                                    </td>
                                                    <td>
                                                        <TextField
                                                            id="outlined-basic"
                                                            label={
                                                                user.userName
                                                            }
                                                            value={changeName}
                                                            onChange={(e) =>
                                                                setChangeName(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
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
                                                            id="outlined-basic"
                                                            label={user.email}
                                                            onChange={(e) =>
                                                                setChangeEmail(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            value={changeEmail}
                                                            variant="outlined"
                                                            size="small"
                                                        />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="form-header">
                                                        <h6>직업</h6>
                                                    </td>
                                                    <td>
                                                        <SelectJob />
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
                                                    onClick={onClickComplete}
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
