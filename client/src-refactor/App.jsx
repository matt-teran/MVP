import React from "react";
import { Layout } from "antd";

import TotalFocusTime from "./components/TotalFocusTime";

import Splash from "./components/Splash/Splash";
import Dashboard from "./components/Dashboard/Dashboard";
import SpotifyControls from "./components/SpotifyControls/SpotifyControls";

function App() {
  const { Header, Content, Footer } = Layout;

  if (true)
    return (
      <Layout
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TotalFocusTime />
        <Dashboard />
        <SpotifyControls />
      </Layout>
    );
  return (
    <Layout
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Splash />
    </Layout>
  );
}

export default App;
