import React from "react";
import InputMinutes from "./InputMinutes";
import { Layout, Button, Space, Form } from "antd";
import Logout from "./Logout";
import convertFromMs from "./util/convertFromMs";
import DashboardTime from "./PomodoroTime";
import TotalTime from "./TotalTime";
import SpotifyControls from "./SpotifyControls";

export default function Stopwatch({
  time,
  sessionTime,
  remainingSessionTime,
  breakTime,
  remainingBreakTime,
  update,
  isStudying,
  toggleSession,
  logoutHandler,
  spotifyPlayer,
  playlists,
  currentPlaylist,
  changePlaylistHandler,
}) {
  const { Header, Content, Footer, Sider } = Layout;
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={350}>
        <SpotifyControls
          spotifyPlayer={spotifyPlayer}
          playlists={playlists}
          currentPlaylist={currentPlaylist}
          changePlaylist={changePlaylistHandler}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TotalTime time={time} />
        </Header>
        <Content>
          <Space
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "80vh",
            }}
          >
            <div>
              <Space size="large">
                <DashboardTime
                  totalTime={sessionTime}
                  timeRemaining={remainingSessionTime}
                />
                <DashboardTime
                  totalTime={breakTime}
                  timeRemaining={remainingBreakTime}
                />
              </Space>
            </div>
            <Form>
              <Form.Item label="Focus Duration">
                <InputMinutes
                  min="10"
                  max="180"
                  defaultValue="25"
                  id="session-time"
                  update={update}
                  disabled={isStudying}
                />
              </Form.Item>
              <Form.Item label="Break Duration">
                <InputMinutes
                  id="break-time"
                  min="1"
                  max="60"
                  defaultValue="5"
                  update={update}
                  disabled={isStudying}
                />
              </Form.Item>
            </Form>
            <Button
              loading={!spotifyPlayer}
              type="primary"
              onClick={toggleSession}
            >
              {isStudying ? "Pause Session" : "Start Session"}
            </Button>
            <Logout logout={logoutHandler} />
          </Space>
        </Content>
        <Footer></Footer>
      </Layout>
    </Layout>
  );
}
