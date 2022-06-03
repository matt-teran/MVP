const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI);

mongoose.connection.once("connected", function () {
  console.log("Mongodb Connected");
});

mongoose.connection.on("error", function (err) {
  console.log("Mongodb Error", err);
});

module.exports = {
  User: require("./models/User"),
};
