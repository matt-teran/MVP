// importing modules
const express = require("express");
const passport = require("passport");
const router = express.Router();

// importing User Schema
const User = require("../../database/models/User");

router.get("/user", (req, res) => {
  console.log(req.user);
  res.send(req.user);
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

router.post("/signup", function (req, res) {
  User.register(
    new User({
      email: req.body.email,
      username: req.body.username,
      studyTime: 0,
    }),
    req.body.password,
    function (err, user) {
      if (err) {
        res.json({
          success: false,
          message: "Your account could not be saved. Error: ",
          err,
        });
      } else {
        passport.authenticate("local")(req, res, () => {
          User.findOne({ username: req.body.username }, (err, person) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json({
              success: true,
              status: "Registration Successful!",
            });
          });
        });
      }
    }
  );
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  User.findOne(
    {
      username: req.body.username,
    },
    (err, person) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json({
        success: true,
        status: "You are successfully logged in!",
        studyTime: person.studyTime,
      });
    }
  );
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
