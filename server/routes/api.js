const axios = require("axios");
const express = require("express");
const router = express.Router();

router.get("/searchPlaylists", (req, res) => {
  axios
    .get(`https://api.spotify.com/v1/search?type=playlist&market=US`, {
      params: { q: req.query.q },
      headers: {
        Authorization: `Bearer ${req.user.accessToken}`,
      },
    })
    .then(({ data }) => {
      res.send(
        data.playlists.items.map((playlist) => ({
          image: playlist.images[0].url,
          uri: playlist.uri,
          name: playlist.name,
          tracks: playlist.tracks,
        }))
      );
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/getPlaylists", (req, res) => {
  axios
    .get(
      "https://api.spotify.com/v1/browse/categories/chill/playlists?country=US",
      {
        headers: {
          Authorization: `Bearer ${req.user.accessToken}`,
        },
      }
    )
    .then(({ data }) => {
      res.send(
        data.playlists.items.map((playlist) => ({
          image: playlist.images[0].url,
          uri: playlist.uri,
          name: playlist.name,
          tracks: playlist.tracks,
        }))
      );
    });
});

router.post("/updateTime", (req, res) => {
  req.user
    .update({ studyTime: req.body.time })
    .then((mongooseResponse) => {
      console.log(mongooseResponse);
    })
    .catch((err) => {
      console.log(err);
    });
  res.send(`added ${req.body.time}ms`);
});

router.post("/logout", (req, res, next) => {
  console.log(req.session);

  if (req.session.passport) {
    req.logout();
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      } else {
        res.clearCookie("session-id");
        res.json({
          message: "You are successfully logged out!",
        });
      }
    });
  } else {
    var err = new Error("You are not logged in!");
    err.status = 403;
    next(err);
  }
});

module.exports = router;
