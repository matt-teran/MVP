import moment, { Moment } from "moment";
import React, { FC } from "react";

export default function Stopwatch({ time }: { time: Moment }) {
  return <div>{time.format("HH:mm:ss")}</div>;
}
