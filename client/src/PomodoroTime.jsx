import React, { useState, useEffect } from "react";
import { Typography } from "antd";
import { Progress } from "antd";

import convertFromMs from "./util/convertFromMs";

export default function DashboardTime({ totalTime, timeRemaining }) {
  const { Title } = Typography;
  return (
    <Progress
      type="dashboard"
      trailColor="#bfbfbf"
      percent={(1 - timeRemaining / totalTime) * 100}
      format={() => convertFromMs(timeRemaining)}
    />
  );
}
