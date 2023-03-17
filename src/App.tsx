import { useState, useEffect, useReducer, useInsertionEffect } from "react";
import "./App.css";
import "./styles/Layout.css";
import "antd/dist/antd.css";
import Main from "./pages/Main";
import { Content } from "antd/lib/layout/layout";
import Friends from "./pages/Friends";
import MyPage from "./pages/mypage";
import Navbar from "./components/Navbar";
import { Layout } from "antd";
import { Footer, Header } from "antd/lib/layout/layout";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
const App = () => {
    const [loginChecked, setLoginChecked] = useState(false);
    const [saveUser, setSaveUser] = useState(() => {
        if (typeof window !== "undefined") {
          const saved = localStorage.getItem("users");
          if (saved !== null) {
            console.log(JSON.parse(saved))
            return JSON.parse(saved);
          } else {
            return [];
          }
        }
    });
    const [loginUser, setLoginUser] = useState(()=> {
        return {email: '', passward: ''}
    } );
   
    const [userData, setUserData] = useState(()=> {
        console.log(saveUser)
        const user = saveUser.find((user: { email: { email: string; passward: string; }; })=>user.email == loginUser)
        return user;
    });

    useEffect(()=> {
        setUserData(saveUser.find((user: { email: { email: string; passward: string; }; })=>user.email == loginUser));
        console.log(saveUser.find((user: { email: { email: string; passward: string; }; })=>user.email == loginUser))
    },[loginUser, saveUser])
        
    useEffect(()=> {
        localStorage.setItem("users", JSON.stringify(saveUser));
    },[saveUser])

    useEffect(() => console.log(userData))

    useEffect(() => {
    const data = localStorage.getItem("users");
    if (data) {
        setSaveUser(JSON.parse(data));
    }
    }, []);

    useEffect(()=> {
        console.log(loginUser);
        console.log(saveUser);
        const user = saveUser.find((user: { email: string; })=>user.email == loginUser.email)
        console.log(user);
        setUserData(user);
    },[loginUser])

    useEffect(()=> {
        console.log(loginUser)
    })
    return (
        <div className="content-wrapper">
            {loginChecked ? (
                <Layout className="layout">
                    <Header className="header">
                        <Navbar />
                    </Header>
                    <Content className="content">
                        <Routes>
                            <Route path="/" element={<Main loginUser={loginUser.email} userData={userData} saveUser={saveUser} setSaveUser={setSaveUser}/>} />
                            <Route path="/home" element={<Main loginUser={loginUser.email} userData={userData} saveUser={saveUser} setSaveUser={setSaveUser}/>} />
                            <Route path="/friends" element={<Friends loginUser={loginUser.email} userData={userData} saveUser={saveUser} setSaveUser={setSaveUser}/>} />
                            <Route path="/mypage" element={<MyPage loginUser={loginUser.email} setLoginUser={setLoginUser} saveUser={saveUser} userData={userData} setUserData={setUserData} setSaveUser={setSaveUser}/>} />
                        </Routes>
                    </Content>
                    <Footer
                        className="footer"
                        style={{ background: "lightgray" }}
                    >
                        TogetherDo ©2022 Created by ReactMaster
                    </Footer>
                </Layout>
            ) : (
                <Login 
                setLoginChecked={setLoginChecked} 
                saveUser={saveUser} 
                setSaveUser={setSaveUser}
                loginUser={loginUser}
                setLoginUser={setLoginUser} />
            )}
        </div>
    );
};

export default App;
