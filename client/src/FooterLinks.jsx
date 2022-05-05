import { Button, Space } from "antd";
import React from "react";
import { GithubFilled, LinkedinFilled } from "@ant-design/icons";

export default function FooterLinks() {
  return (
    <Space>
      <Button icon={<GithubFilled />} shape="circle" type="primary" />
      <Button icon={<LinkedinFilled />} shape="circle" type="primary" />
    </Space>
  );
}
