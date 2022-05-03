require("dotenv").config();
const path = require("path");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

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
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(express.json());

app.use(express.static(path.join(__dirname, "../client/dist")));

app.use("/api", router);

app.get("/", function (req, res) {
  return res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

app.listen(8080, function () {
  console.log(`Server is live at localhost:8080.`);
});
