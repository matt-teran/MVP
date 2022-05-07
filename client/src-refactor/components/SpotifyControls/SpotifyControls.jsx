import React from "react";
import { Layout } from "antd";

import SpotifyBanner from "./SpotifyBanner/SpotifyBanner";
import SpotifyPlaylists from "./SpotifyPlaylists/SpotifyPlaylists";
import SpotifyPlayControls from "./SpotifyPlayControls/SpotifyPlaybackControls";

export default function SpotifyControls() {
  const { Sider } = Layout;
  return (
    <Sider>
      <Layout style={{ minHeight: "100vh" }}>
        <SpotifyBanner />
        <SpotifyPlaylists />
        <SpotifyPlayControls />
      </Layout>
    </Sider>
  );
}
