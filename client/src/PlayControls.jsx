import React from "react";
import { Layout, Button, Space } from "antd";
import {
  FastForwardFilled,
  FastBackwardFilled,
  PlayCircleFilled,
} from "@ant-design/icons";

export default function PlayControls({ spotifyPlayer }) {
  if (!spotifyPlayer)
    return <Layout style={{ backgroundColor: "#001529" }}></Layout>;
  return (
    <Layout style={{ backgroundColor: "#001529" }}>
      <Space
        style={{
          backgroundColor: "#001529",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          onClick={() => spotifyPlayer.previousTrack()}
          shape="circle"
          icon={<FastBackwardFilled />}
        />
        <Button
          onClick={() => spotifyPlayer.togglePlay()}
          shape="circle"
          icon={<PlayCircleFilled />}
        />
        <Button
          onClick={() => spotifyPlayer.nextTrack()}
          shape="circle"
          icon={<FastForwardFilled />}
        />
      </Space>
    </Layout>
  );
}
