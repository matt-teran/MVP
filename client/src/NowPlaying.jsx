import React, { useState } from "react";
import { Alert } from "antd";
import Marquee from "react-fast-marquee";

export default function NowPlaying({ playlist, spotifyPlayer }) {
  const [song, setSong] = useState("");
  const [artist, setArtist] = useState("");
  if (!spotifyPlayer)
    return (
      <Alert
        style={{ width: "100%" }}
        banner
        type="info"
        showIcon={false}
        message={
          <Marquee pauseOnHover gradient={false}>
            {`Playlist: Artist: Song: `}
          </Marquee>
        }
      />
    );
  spotifyPlayer.addListener(
    "player_state_changed",
    ({ position, duration, track_window: { current_track } }) => {
      setSong(current_track.name);
      setArtist(current_track.artists[0].name);
    }
  );
  return (
    <Alert
      style={{ width: "100%" }}
      banner
      type="info"
      showIcon={false}
      message={
        <Marquee pauseOnHover gradient={false}>
          {`Playlist: ${playlist.name} • Artist: ${artist} • Song: ${song} • `}
        </Marquee>
      }
    />
  );
}
