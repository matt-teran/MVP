import React from "react";
import { Typography } from "antd";

export default function TotalFocusTime(/* { time } */) {
  const { Title } = Typography;
  return (
    <Title style={{ color: "white" }} level={4}>
      Total Focus Time:
    </Title>
  );
}
