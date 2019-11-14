var router = require("express").Router();
var jwt = require("jwt-simple");

var User = require("../models/user");

router.post("/register", (req, res) => {
  var userData = req.body;
  var user = new User(userData);

  user.save((err, result) => {
    if (err) {
      console.log("Error saving the user", err);
    }
    res.sendStatus(201);
  });
});

router.post("/login", async (req, res) => {
    var userData = req.body;
    var user = await User.findOne({ email: userData.email });
    if (!user) {
      return res.status(401).send({ message: "Email or PW invalid" });
    }
    if (userData.password != user.password) {
      return res.status(401).send({ message: "Email or PW invalid" });
    }
    var payload = {};
    //token keyimiz ile encode edilip gönderiliyor
    var token = jwt.encode(payload, process.env.JWT_KEY);
    return res.status(200).send({ token });
  });
  
  var user = {
    router,
    checkAuthenticated: (req, res, next) => {
      if (!req.header("authorization")) {
        return res
          .status(401)
          .send({ message: "Unauthorized. No Authorization header!" });
      }
      var token = req.header("authorization").split(" ")[1];
  
      //token keyimiz ile decode ediliyor
      var payload = jwt.decode(token, process.env.JWT_KEY);
      if (!payload) {
        return res
          .status(401)
          .send({ message: "Unauthorized. Token is not valid!" });
      }
      next();
    }
  };
  module.exports = user;
  