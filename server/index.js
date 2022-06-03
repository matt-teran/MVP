require("dotenv").config();
const path = require("path");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const SpotifyStrategy = require("passport-spotify").Strategy;

var { User } = require("../database/index");
const router = require("./routes/api");

const app = express();

app.use(
  session({
    name: "session-id",
    secret: process.env.SECRET,
    saveUninitialized: false,
    resave: false,
  })
);
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
passport.use(
  new SpotifyStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/auth/spotify/callback",
    },
    function (accessToken, refreshToken, expires_in, profile, done) {
      User.findOneAndUpdate(
        { email: profile._json.email },
        { spotifyId: profile._json.id, accessToken }
      )
        .then((data) => {
          if (data === null) {
            User.register(
              new User({
                email: profile._json.email,
                username: profile._json.id,
                studyTime: 0,
                spotifyId: profile._json.id,
                accessToken,
              }),
              accessToken,
              function (err, user) {
                done(err, user);
              }
            );
          } else {
            done(null, data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(express.static(path.join(__dirname, "../client/dist")));

app.use("/api", router);

app.get(
  "/auth/spotify",
  passport.authenticate("spotify", {
    scope: [
      "user-read-email",
      "user-modify-playback-state",
      "user-read-playback-state",
      "user-read-currently-playing",
      "streaming",
    ],
    showDialog: true,
  })
);

app.get(
  "/auth/spotify/callback",
  passport.authenticate("spotify", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("/");
  }
);

app.get("/", function (req, res) {
  return res
    .send(req.user.accessToken)
    .sendFile(path.join(__dirname, "../client/dist/index.html"));
});

app.listen(8080, function () {
  console.log(`Server is live at localhost:8080.`);
});
