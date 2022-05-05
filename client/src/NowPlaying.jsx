import React from "react";
import { Alert } from "antd";
import Marquee from "react-fast-marquee";

export default function NowPlaying({ playlist }) {
  return (
    <Alert
      banner
      type="info"
      showIcon={false}
      message={
        <Marquee pauseOnHover gradient={false}>
          {playlist.name}
        </Marquee>
      }
    />
  );
}
