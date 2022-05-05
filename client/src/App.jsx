import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import Timer from "./Timer";
import "./App.css";
import axios from "axios";
import initializeSpotify from "./initializeSpotify";
import LoginWithSpotify from "./LoginWithSpotify";

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
  const [playlists, setPlaylists] = useState([]);
  const [currentPlaylist, setCurrentPlaylist] = useState({
    uri: "spotify:playlist:0vvXsWCC9xrXsKd4FyS8kM",
    name: "lofi hip hop music - beats to study/relax to",
  });
  const [nowPlaying, setNowPlaying] = useState({
    uri: "spotify:track:7ffmWi5LOJLGsMbeRFYWHD",
  });

  useEffect(() => {
    if (isBreakTime) {
      if (remainingBreakTime >= 1) {
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
    if (remainingSessionTime <= 0 && isStudying) {
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
        if (res.data.username) {
          setTime(res.data.studyTime);
          setLoggedIn(true);
          setTimeout(() => {
            connectToSpotify(res.data.accessToken);
          }, 2000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const connectToSpotify = (token) => {
    setSpotifyPlayer(initializeSpotify(token));
    axios.get("/api/getPlaylists").then(({ data }) => {
      setPlaylists(data);
    });
  };

  const toggleSession = () => {
    if (isStudying) {
      clearTimeout(timerId);
    } else {
      spotifyPlayer.playURI(currentPlaylist.uri);
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

  const updateMinutesHandler = (value, id) => {
    if (id === "session-time") {
      let timeInMs;
      if (value >= 180) {
        timeInMs = 180 * 60 * 1000;
      } else if (value <= 10) {
        timeInMs = 10 * 60 * 1000;
      } else {
        timeInMs = value * 60 * 1000;
      }
      setSessionTime(timeInMs);
      setRemainingSessionTime(timeInMs);
    } else {
      let timeInMs;
      if (value >= 60) {
        timeInMs = 60 * 60 * 1000;
      } else if (value <= 1) {
        timeInMs = 1 * 60 * 1000;
      } else {
        timeInMs = value * 60 * 1000;
      }
      setBreakTime(timeInMs);
      setRemainingBreakTime(timeInMs);
    }
  };

  const changePlaylistHandler = (playlist) => {
    spotifyPlayer.playURI(playlist.uri);
    setCurrentPlaylist(playlist);
  };

  const { Header, Content, Footer } = Layout;

  if (loggedIn)
    return (
      <Timer
        time={time}
        sessionTime={sessionTime}
        remainingSessionTime={remainingSessionTime}
        breakTime={breakTime}
        remainingBreakTime={remainingBreakTime}
        update={updateMinutesHandler}
        isStudying={isStudying}
        toggleSession={toggleSession}
        logoutHandler={logoutHandler}
        spotifyPlayer={spotifyPlayer}
        playlists={playlists}
        currentPlaylist={currentPlaylist}
        changePlaylistHandler={changePlaylistHandler}
      />
    );
  return (
    <div className="App">
      <Layout className="no-auth-layout">
        <Header></Header>
        <Content className="no-auth-content">
          <LoginWithSpotify />
        </Content>
        <Footer>Hire me</Footer>
      </Layout>
    </div>
  );
}

export default App;
