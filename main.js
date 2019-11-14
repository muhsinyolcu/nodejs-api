var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();

var user = require("./services/userService");

var app = express();

app.use(bodyParser.json());

mongoose.connect(
    process.env.MONGO_CONNECTION_STRING,
  { useUnifiedTopology: true, useNewUrlParser: true },
  err => {
    if (!err) {
      console.log("Connected to DB");
    }
  }
);

app.use("/user", user.router);

app.listen(process.env.PORT, () => {
  console.log(`Server started on: ${process.env.HOST_URL}`);
});
