import React from "react";
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

const App = () => (
    <div>
        <Layout className="layout">
            <Header className="header">
                <Navbar />
            </Header>
            <Content className="content">
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/home" element={<Main />} />
                    <Route path="/friends" element={<Friends />} />
                    <Route path="/mypage" element={<MyPage />} />
                </Routes>
            </Content>
            <Footer className="footer">
                TogetherDo ©2022 Created by ReactMaster
            </Footer>
        </Layout>
    </div>
);

export default App;
