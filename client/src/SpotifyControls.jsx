import { Layout, List, Avatar, Card, Space, Input, Affix } from "antd";
import React, { useState } from "react";
import NowPlaying from "./NowPlaying";
import PlayControls from "./PlayControls";

export default function SpotifyControls({
  spotifyPlayer,
  playlists,
  currentPlaylist,
  changePlaylist,
  search,
}) {
  const { Header, Content, Footer } = Layout;
  const { Search } = Input;
  return (
    <Layout style={{ height: "100vh", backgroundColor: "#001529" }}>
      <Header
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-evenly",
          height: "15vh",
        }}
      >
        <NowPlaying playlist={currentPlaylist} spotifyPlayer={spotifyPlayer} />
        <Search placeholder="Search Playlists" onSearch={search} />
      </Header>
      <Content style={{ overflowY: "scroll", height: "70vh" }}>
        <List
          style={{ marginInline: "auto", width: "60%" }}
          itemLayout="vertical"
          split={false}
          grid={{ gutter: 16, column: 1 }}
          dataSource={playlists}
          renderItem={(playlist) => {
            return (
              <List.Item style={{ minWidth: "60%" }}>
                <Card
                  onClick={() => changePlaylist(playlist)}
                  hoverable
                  style={{ margin: "auto", textAlign: "center" }}
                >
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
