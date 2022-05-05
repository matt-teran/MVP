import { Layout, List, Avatar, Card } from "antd";
import React from "react";
import PlayControls from "./PlayControls";

export default function SpotifyControls({ spotifyPlayer, playlists }) {
  const { Header, Content, Footer } = Layout;
  const { Meta } = Card;
  return (
    <Layout style={{ height: "100vh", backgroundColor: "#001529" }}>
      <Header />
      <Content style={{ overflowY: "scroll" }}>
        <List
          style={{ marginInline: "auto", width: "60%" }}
          itemLayout="vertical"
          split={false}
          grid={{ gutter: 16, column: 1 }}
          dataSource={playlists}
          renderItem={(playlist) => {
            return (
              <List.Item style={{ minWidth: "60%" }}>
                <Card hoverable style={{ margin: "auto", textAlign: "center" }}>
                  <List.Item.Meta
                    style={{ color: "white", alignItems: "center" }}
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
