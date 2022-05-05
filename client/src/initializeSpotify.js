import React, { useState } from "react";

export default function initializeSpotify(accessToken) {
  console.log("in!!", window.Spotify);
  let deviceId;
  window.onSpotifyWebPlaybackSDKReady = () => {
    const token = accessToken;
    return new Spotify.Player({
      name: "Pomodoro Buddy",
      getOAuthToken: (cb) => {
        cb(token);
      },
      volume: 0.5,
    });
  };

  let player = window.onSpotifyWebPlaybackSDKReady();
  // Ready
  player.addListener("ready", ({ device_id }) => {
    console.log("Ready with Device ID", device_id);
    deviceId = device_id;
  });

  // Not Ready
  player.addListener("not_ready", ({ device_id }) => {
    console.log("Device ID has gone offline", device_id);
  });
  // Let’s add some listeners to get notified in case something happens during the SDK initialization:

  player.addListener("initialization_error", ({ message }) => {
    console.error(message);
  });

  player.addListener("authentication_error", ({ message }) => {
    console.error(message);
  });

  player.addListener("account_error", ({ message }) => {
    console.error(message);
  });

  player.playURI = function () {
    this._options.getOAuthToken((access_token) => {
      fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
        method: "PUT",
        body: JSON.stringify({
          context_uri: "spotify:playlist:0vvXsWCC9xrXsKd4FyS8kM",
          offset: { uri: "spotify:track:7ffmWi5LOJLGsMbeRFYWHD" },
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      });
    });
  };

  player.resume = function () {
    this._options.getOAuthToken((access_token) => {
      fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      });
    });
  };

  player.pause = function () {
    this._options.getOAuthToken((access_token) => {
      fetch(
        `https://api.spotify.com/v1/me/player/pause?device_id=${deviceId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
    });
  };

  player.connect();

  return player;
}
