const express = require("express");
const path = require("path");

require("dotenv").config();

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("/", function (req, res) {
  return res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

app.listen(8080, function () {
  console.log(`Server is live at localhost:8080.`);
});
