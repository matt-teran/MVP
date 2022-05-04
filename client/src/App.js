import React, { useState, useEffect } from "react";
import Stopwatch from "./Stopwatch";
import "./App.css";
import Signup from "./Signup";
import Login from "./Login";
import axios from "axios";
import Logout from "./Logout";
import convertFromMs from "./util/convertFromMs";
import initializeSpotify from "./initializeSpotify";

function App() {
  const [time, setTime] = useState();
  const [isStudying, setIsStudying] = useState(false);
  const [timerId, setTimerId] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
  const [sessionTime, setSessionTime] = useState(1500000);
  const [remainingSessionTime, setRemainingSessionTime] = useState(sessionTime);
  const [breakTime, setBreakTime] = useState(300000);
  const [remainingBreakTime, setRemainingBreakTime] = useState(breakTime);
  const [isBreakTime, setIsBreakTime] = useState(false);
  const [spotifyPlayer, setSpotifyPlayer] = useState();

  useEffect(() => {
    if (isBreakTime) {
      if (remainingBreakTime >= 0) {
        setTimeout(() => {
          setRemainingBreakTime((prev) => prev - 1000);
        }, 1000);
      } else {
        spotifyPlayer.resume();
        alert("Time to study!!");
        setIsBreakTime(false);
        toggleSession();
      }
    } else {
      setRemainingBreakTime(breakTime);
    }
  }, [isBreakTime, remainingBreakTime]);

  useEffect(() => {
    if (sessionTime <= 0 && isStudying) {
      spotifyPlayer.pause();
      clearTimeout(timerId);
      setRemainingSessionTime(sessionTime);
      alert("break time!!!");
      setIsStudying(false);
      setIsBreakTime(true);
    }
  }, [timerId]);

  useEffect(() => {
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
          setSpotifyPlayer(initializeSpotify(res.data.accessToken));
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
      spotifyPlayer.playURI();
      incrementStopwatch();
    }
    setIsStudying((prevIsStudying) => !prevIsStudying);
  };

  const incrementStopwatch = () => {
    setTimerId(
      window.setTimeout(() => {
        setRemainingSessionTime((prev) => {
          return prev - 1000;
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
        if (response.data.success) {
          setTime(0);
          setLoggedIn(true);
        }
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

  const updateMinutesHandler = (event) => {
    if (event.target.id === "session-time") {
      let timeInMs;
      if (event.target.value >= 180) {
        timeInMs = 180 * 60 * 1000;
      } else if (event.target.value <= 10) {
        timeInMs = 10 * 60 * 1000;
      } else {
        timeInMs = event.target.value * 60 * 1000;
      }
      setSessionTime(timeInMs);
      setRemainingSessionTime(timeInMs);
    } else {
      let timeInMs;
      if (event.target.value >= 60) {
        timeInMs = 60 * 60 * 1000;
      } else if (event.target.value <= 1) {
        timeInMs = 1 * 60 * 1000;
      } else {
        timeInMs = event.target.value * 60 * 1000;
      }
      setBreakTime(timeInMs);
      setRemainingBreakTime(timeInMs);
    }
  };

  if (loggedIn)
    return (
      <div className="App">
        <header className="App-header">
          <h3>Total study time: {convertFromMs(time)}</h3>
          <h1>Pomodoro time: {convertFromMs(remainingSessionTime)}</h1>
          <h1>Break time: {convertFromMs(remainingBreakTime)}</h1>
          <label htmlFor="session-time">
            Number of minutes to study before break:
          </label>
          <input
            type="number"
            min="10"
            max="180"
            id="session-time"
            onChange={updateMinutesHandler}
            disabled={isStudying}
          />
          <label htmlFor="break-time">Number of minutes to break for:</label>
          <input
            type="number"
            min="1"
            max="60"
            id="break-time"
            onChange={updateMinutesHandler}
            disabled={isStudying}
          />
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
        {/* <Signup register={registerHandler} />
        <Login login={loginHandler} /> */}
        <a href="http://localhost:8080/auth/spotify">
          <button type="button" href="localhost:8080/auth/spotify">
            Log In with Spotify
          </button>
        </a>
      </header>
    </div>
  );
}

export default App;
