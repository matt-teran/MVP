import React from "react";
import { Typography } from "antd";

import convertFromMs from "./util/convertFromMs";

export default function BreakTime({ time }) {
  const { Title } = Typography;
  return (
    <Title level={3}>Time Left in this Break: {convertFromMs(time)}</Title>
  );
}
