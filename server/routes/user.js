// importing modules
const express = require("express");
const router = express.Router();

// importing User Schema
const User = require("../../database/models/User");

router.post("/signup", function (req, res) {
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

module.exports = router;
