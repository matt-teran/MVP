import React from "react";
import { Button, Layout, Space, Typography } from "antd";
import { GithubFilled, LinkedinFilled } from "@ant-design/icons";

export default function Splash() {
  const { Content, Footer } = Layout;
  const { Title } = Typography;
  return (
    <>
      <Content
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Title>Pomodoro Buddy</Title>
        <Button
          size="large"
          shape="round"
          type="primary"
          loading={false}
          onClick={() => {}}
        >
          Get Started with Spotify
        </Button>
      </Content>
      <Footer>
        <Space>
          <Button icon={<GithubFilled />} shape="circle" type="primary" />
          <Button icon={<LinkedinFilled />} shape="circle" type="primary" />
        </Space>
      </Footer>
    </>
  );
}
