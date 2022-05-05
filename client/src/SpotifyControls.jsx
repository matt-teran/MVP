import { Layout } from "antd";
import React from "react";
import PlayControls from "./PlayControls";

export default function SpotifyControls({ spotifyPlayer }) {
  const { Content, Footer } = Layout;
  return (
    <Layout style={{ height: "100vh", backgroundColor: "#001529" }}>
      <Content>Content</Content>
      <Footer style={{ backgroundColor: "#001529" }}>
        <PlayControls spotifyPlayer={spotifyPlayer} />
      </Footer>
    </Layout>
  );
}
