import moment, { Moment } from "moment";
import React, { FC } from "react";

export default function Stopwatch({
  time,
  startTime,
}: {
  time: Moment;
  startTime: Moment;
}) {
  return <div>{moment.utc(time.diff(startTime)).format("HH:mm:ss")}</div>;
}
