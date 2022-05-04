import React, { useState, useEffect } from "react";
import moment from "moment";
import Stopwatch from "./Stopwatch";
import "./App.css";
import Signup from "./Signup";
import Login from "./Login";
import axios from "axios";
import Logout from "./Logout";

function App() {
  const [time, setTime] = useState(0);
  const [isStudying, setIsStudying] = useState(false);
  const [timerId, setTimerId] = useState();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    axios
      .get("/api/user")
      .then((res) => {
        console.log(res);
        res.data.username && setLoggedIn(true);
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
        setTime((prev) => prev + 1000);
        incrementStopwatch();
      }, 1000)
    );
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

  return (
    <div className="App">
      <header className="App-header">
        {!loggedIn && <Signup register={registerHandler} />}
        {!loggedIn && <Login />}
        {loggedIn && <Logout logout={logoutHandler} />}
        <Stopwatch time={time} />
        <button type="button" onClick={toggleTimer}>
          Study
        </button>
      </header>
    </div>
  );
}

export default App;
