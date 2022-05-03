import React, { useState } from "react";
import moment from "moment";
import Stopwatch from "./Stopwatch";
import "./App.css";
import Signup from "./Signup";

function App() {
  const [time, setTime] = useState(moment().startOf("date"));
  const [isStudying, setIsStudying] = useState(false);
  const [timerId, setTimerId] = useState();

  const toggleTimer = () => {
    if (isStudying) {
      clearTimeout(timerId);
    } else {
      incrementStopwatch();
    }
    setIsStudying((prevIsStudying) => !prevIsStudying);
  };

  const incrementStopwatch = () => {
    setTimerId(
      window.setTimeout(() => {
        setTime(time.add(1, "s"));
        incrementStopwatch();
      }, 1000)
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <Signup />
        <Stopwatch time={time} />
        <button type="button" onClick={toggleTimer}>
          Study
        </button>
      </header>
    </div>
  );
}

export default App;
