import { useState, useEffect } from "react";
import "./App.css";
import "./styles/Layout.css";
import "antd/dist/antd.css";
import Main from "./pages/main";
import { Content } from "antd/lib/layout/layout";
import Friends from "./pages/friends";
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
            //console.log(JSON.parse(saved))
            return JSON.parse(saved);
          } else {
            return [];
          }
        }
    });
    const [loginUser, setLoginUser] = useState({
        email: '',
        passward: '',
    });
    
    
        
        useEffect(()=> {
            localStorage.setItem("users", JSON.stringify(saveUser));
         },[saveUser])
        useEffect(() => {
        const data = localStorage.getItem("users");
        if (data) {
          setSaveUser(JSON.parse(data));
        }
        }, []);
    return (
        <div className="content-wrapper">
            {loginChecked ? (
                <Layout className="layout">
                    <Header className="header">
                        <Navbar />
                    </Header>
                    <Content className="content">
                        <Routes>
                            <Route path="/" element={<Main loginUser={loginUser.email}/>} />
                            <Route path="/home" element={<Main loginUser={loginUser.email}/>} />
                            <Route path="/friends" element={<Friends />} />
                            <Route path="/mypage" element={<MyPage />} />
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
