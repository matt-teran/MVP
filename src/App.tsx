import React, { useState } from "react";
import moment from "moment";
import Stopwatch from "./Stopwatch";
import "./App.css";

function App() {
  const [startTime, setStartTime] = useState(moment());
  const [time, setTime] = useState(moment());
  const [timerId, setTimerId] = useState<number>();
  const toggleTimer = () => {
    incrementStopwatch();
  };
  const incrementStopwatch = () => {
    setTimeout(() => {
      setTime(moment());
      incrementStopwatch();
    }, 1000);
  };
  return (
    <div className="App">
      <header className="App-header">
        <Stopwatch time={time} startTime={startTime} />
        <button type="button" onClick={toggleTimer}>
          Study
        </button>
      </header>
    </div>
  );
}

export default App;
