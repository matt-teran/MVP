import React from "react";
import { Typography } from "antd";
import convertFromMs from "./util/convertFromMs";

export default function TotalTime({ time }) {
  const { Title } = Typography;
  return (
    <Title style={{ color: "white" }} level={4}>
      Total Focus Time: {convertFromMs(time)}
    </Title>
  );
}
