import React from "react";
import { Typography } from "antd";
import { Header } from "antd/lib/layout/layout";

export default function TotalFocusTime(/* { time } */) {
  const { Title } = Typography;
  return (
    <Header>
      <Title style={{ color: "white" }} level={4}>
        Total Focus Time: 00:00:00
      </Title>
    </Header>
  );
}
