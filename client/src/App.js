import React, { useState, useEffect } from "react";
import Stopwatch from "./Stopwatch";
import "./App.css";
import Signup from "./Signup";
import Login from "./Login";
import axios from "axios";
import Logout from "./Logout";
import convertFromMs from "./util/convertFromMs";

function App() {
  const [time, setTime] = useState();
  const [isStudying, setIsStudying] = useState(false);
  const [timerId, setTimerId] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [timeLimit, setTimeLimit] = useState(1500000);
  const [progressiveTimeLimit, setProgressiveTimeLimit] = useState(timeLimit);
  const [breakTime, setBreakTime] = useState(300000);
  const [isBreakTime, setIsBreakTime] = useState(false);

  useEffect(() => {
    if (isBreakTime) {
      if (breakTime >= 0) {
        setTimeout(() => {
          setBreakTime((prev) => prev - 1000);
        }, 1000);
      } else {
        alert("Time to study!!");
        setIsBreakTime(false);
        toggleSession();
      }
    } else {
      setBreakTime(5000);
    }
  }, [isBreakTime, breakTime]);

  useEffect(() => {
    if (sessionTime >= progressiveTimeLimit && isStudying) {
      alert("break time!!!");
      clearTimeout(timerId);
      setIsStudying(false);
      setIsBreakTime(true);
      setProgressiveTimeLimit((prev) => prev + timeLimit);
    }
  }, [timerId]);

  useEffect(() => {
    console.log(time);
    if (loggedIn) {
      axios
        .post("/api/updateTime", { time })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [time]);

  useEffect(() => {
    axios
      .get("/api/user")
      .then((res) => {
        console.log(res);
        if (res.data.username) {
          setTime(res.data.studyTime);
          setLoggedIn(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const toggleSession = () => {
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
        setSessionTime((prev) => {
          return prev + 1000;
        });
        setTime((prev) => {
          return prev + 1000;
        });
        incrementStopwatch();
      }, 1000)
    );
  };

  const loginHandler = (form) => {
    axios
      .post("/api/login", form)
      .then(({ data }) => {
        console.log(data);
        setTime(data.studyTime);
        setLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const registerHandler = (form) => {
    axios
      .post("/api/signup", form)
      .then((response) => {
        console.log(response);
        setLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const logoutHandler = () => {
    axios
      .post("/api/logout")
      .then((res) => {
        console.log(res);
        setLoggedIn(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (loggedIn)
    return (
      <div className="App">
        <header className="App-header">
          <h3>Total study time: {convertFromMs(time)}</h3>
          <h1>Pomodoro time: {convertFromMs(sessionTime)}</h1>
          <h1>Break time: {convertFromMs(breakTime)}</h1>
          <button type="button" onClick={toggleSession}>
            Start Session
          </button>
          <Logout logout={logoutHandler} />
        </header>
      </div>
    );

  return (
    <div className="App">
      <header className="App-header">
        <Signup register={registerHandler} />
        <Login login={loginHandler} />
      </header>
    </div>
  );
}

export default App;
