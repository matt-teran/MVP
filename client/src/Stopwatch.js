import React from "react";
import convertFromMs from "./util/convertFromMs";

export default function Stopwatch({ time }) {
  return <div>{convertFromMs(time)}</div>;
}
