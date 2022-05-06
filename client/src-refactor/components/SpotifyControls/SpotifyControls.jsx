import React from "react";

import SpotifyBanner from "./SpotifyBanner/SpotifyBanner";
import SpotifyPlaylists from "./SpotifyPlaylists/SpotifyPlaylists";
import SpotifyPlayControls from "./SpotifyPlayControls/SpotifyPlaybackControls";

export default function SpotifyControls() {
  return (
    <Sider>
      <SpotifyBanner />
      <SpotifyPlaylists />
      <SpotifyPlayControls />
    </Sider>
  );
}
