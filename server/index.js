require("dotenv").config();
const express = require("express");
const path = require("path");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var { User } = require("../database/index");

const app = express();

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(express.json());

app.use(express.static(path.join(__dirname, "../client/dist")));

app.post("/login", function (req, res) {
  Users = new User({ email: req.body.email, username: req.body.username });

  User.register(Users, req.body.password, function (err, user) {
    if (err) {
      res.json({
        success: false,
        message: "Your account could not be saved. Error: ",
        err,
      });
    } else {
      res.json({ success: true, message: "Your account has been saved" });
    }
  });
});

app.get("/", function (req, res) {
  return res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

app.listen(8080, function () {
  console.log(`Server is live at localhost:8080.`);
});
