import React from "react";
import "../styles/Feed.css"
import { Layout } from "antd";
import {Header, Content,  Footer} from "antd/lib/layout/layout";

import "../styles/Feed.css"
const FeedSection = (props) => {
    const { id, content } = props;
	return (
        <div>
        <Layout className="layout">
            <Header className="header">
                {id} 님의 시간표 입니다.
            </Header>
            <Content className="container">
                {content}
            </Content>
            <Footer className="footer">
                댓글 들어갈 공간
            </Footer>
        </Layout>
        </div>
    )
};

export default FeedSection;