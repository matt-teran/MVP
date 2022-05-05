import { Layout, List, Avatar, Card } from "antd";
import React from "react";
import PlayControls from "./PlayControls";

export default function SpotifyControls({ spotifyPlayer, playlists }) {
  const { Content, Footer } = Layout;
  const { Meta } = Card;
  return (
    <Layout style={{ height: "100vh", backgroundColor: "#001529" }}>
      <Content>
        <List
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
          split={false}
          dataSource={playlists}
          renderItem={(playlist) => {
            return (
              <List.Item>
                <Card style={{ width: "60%" }}>
                  <List.Item.Meta
                    style={{ color: "white" }}
                    title={playlist.name}
                    avatar={
                      <Avatar shape="square" size={64} src={playlist.image} />
                    }
                  />
                </Card>
              </List.Item>
            );
          }}
        />
      </Content>
      <Footer style={{ backgroundColor: "#001529" }}>
        <PlayControls spotifyPlayer={spotifyPlayer} />
      </Footer>
    </Layout>
  );
}
