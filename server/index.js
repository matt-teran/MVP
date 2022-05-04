require("dotenv").config();
const path = require("path");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const SpotifyStrategy = require("passport-spotify").Strategy;

var { User } = require("../database/index");
const router = require("./routes/user");

const app = express();

app.use(
  session({
    name: "session-id",
    secret: process.env.SECRET,
    saveUninitialized: false,
    resave: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.use(
  new SpotifyStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:8080/auth/spotify/callback",
    },
    function (accessToken, refreshToken, expires_in, profile, done) {
      console.log("access token: ", typeof accessToken);
      console.log("refresh token: ", refreshToken);
      console.log("expires in: ", expires_in);
      console.log("profile: ", profile._json.email);
      console.log("done: ", done);
      User.findOneAndUpdate(
        { email: profile._json.email },
        { spotifyId: profile._json.id }
      )
        .then((data) => {
          if (data === null) {
            User.register(
              new User({
                email: profile._json.email,
                username: profile._json.id,
                studyTime: 0,
                spotifyId: profile._json.id,
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

app.use(express.json());

app.use(express.static(path.join(__dirname, "../client/dist")));

app.use("/api", router);

app.get(
  "/auth/spotify",
  passport.authenticate("spotify", {
    scope: ["user-read-email"],
    showDialog: true,
  })
);

app.get(
  "/auth/spotify/callback",
  passport.authenticate("spotify", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

app.get("/", function (req, res) {
  return res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

app.listen(8080, function () {
  console.log(`Server is live at localhost:8080.`);
});
