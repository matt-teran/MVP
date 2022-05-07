import { Alert } from "antd";
import React from "react";

export default function SpotifyNowPlayingMarquee() {
  return (
    <Alert
      style={{ width: "100%" }}
      banner
      type="info"
      showIcon={false}
      message={`Playlist: Artist: Song: `}
    />
  );
}
