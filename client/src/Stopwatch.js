import moment, { Moment } from "moment";
import React from "react";

export default function Stopwatch({ time }) {
  return <div>{time.format("HH:mm:ss")}</div>;
}
