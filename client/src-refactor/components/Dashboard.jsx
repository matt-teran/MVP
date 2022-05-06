import { Content } from "antd/lib/layout/layout";
import React from "react";

export default function Dashboard() {
  return (
    <Content>
      <Timer />
      <Timer />
      <ChangeDuration />
      <ChangeDuration />
      <StartSession />
      <Logout />
    </Content>
  );
}
