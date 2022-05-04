import React from "react";

export default function Stopwatch({ time }) {
  let hours = "00";
  let minutes = "00";
  let seconds = "00";

  const getHours = (timeInMs) => {
    const hour = 3600000;
    hours = Math.floor(timeInMs / hour);
    hours = hours.toString().length === 1 ? `0${hours}` : hours.toString();
    let remainingTime = timeInMs % hour;
    getMinutes(remainingTime);
  };
  const getMinutes = (timeInMs) => {
    const minute = 60000;
    minutes = Math.floor(timeInMs / minute);
    minutes =
      minutes.toString().length === 1 ? `0${minutes}` : minutes.toString();
    let remainingTime = timeInMs % minute;
    getSeconds(remainingTime);
  };
  const getSeconds = (timeInMs) => {
    const second = 1000;
    seconds = Math.floor(timeInMs / second);
    seconds =
      seconds.toString().length === 1 ? `0${seconds}` : seconds.toString();
  };
  getHours(time);
  return <div>{`${hours}:${minutes}:${seconds}`}</div>;
}
