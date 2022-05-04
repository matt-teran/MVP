import React, { useState, useEffect } from "react";
import Stopwatch from "./Stopwatch";
import "./App.css";
import Signup from "./Signup";
import Login from "./Login";
import axios from "axios";
import Logout from "./Logout";

function App() {
  const [time, setTime] = useState();
  const [isStudying, setIsStudying] = useState(false);
  const [timerId, setTimerId] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
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
          <Logout logout={logoutHandler} />
          <Stopwatch time={time} />
          <button type="button" onClick={toggleTimer}>
            Study
          </button>
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
