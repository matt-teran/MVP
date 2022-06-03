import { Button, Space } from "antd";
import React from "react";
import { GithubFilled, LinkedinFilled } from "@ant-design/icons";

export default function FooterLinks() {
  return (
    <Space>
      <Button type="link" href="https://www.github.com/matt-teran/Pomodoro-Buddy" icon={<GithubFilled />} shape="circle" />
      <Button icon={<LinkedinFilled />} shape="circle" type="link" href="https://www.linkedin.com/in/matt-teran" />
    </Space>
  );
}
