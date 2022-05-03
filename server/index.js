require("dotenv").config();
const path = require("path");
const express = require("express");
const session = require("express-session");
var passport = require("passport");

var { User } = require("../database/index");
const router = require("./routes/user");

const app = express();

app.use(
  session({
    secret: process.env.SECRET,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());

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
