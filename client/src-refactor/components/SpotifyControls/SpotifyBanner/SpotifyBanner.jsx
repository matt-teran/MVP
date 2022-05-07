import { Header } from "antd/lib/layout/layout";
import React from "react";

import SpotifyNowPlayingMarquee from "./SpotifyNowPlayingMarquee";
import SpotifySearch from "./SpotifySearch";

export default function SpotifyBanner() {
  return (
    <Header>
      <SpotifyNowPlayingMarquee />
      <SpotifySearch />
    </Header>
  );
}
