// Import dependencies
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const dbHost = "mongodb://mongo-server/mean-docker";

mongoose.connect(dbHost, { useUnifiedTopology: true, useNewUrlParser: true });
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

// create mongoose model
const User = mongoose.model("User", userSchema);

// GET api listing
router.get("/", (req, res) => {
  res.send("Hola Mundo, =)");
});

router.get("/mongo", (req, res) => {
  res.send("MongoDB! =)");
});

// GET all users
router.get("/users", (req, res) => {
  User.find({}, (err, users) => {
    if (err) res.status(500).send(error);

    res.status(200).json(users);
  });
});

// GET one users
router.get("/users/:id", (req, res) => {
  User.findById(req.param.id, (err, users) => {
    if (err) res.status(500).send(error);

    res.status(200).json(users);
  });
});

// Create a user
router.post("/mongo/user", (req, res) => {
  let user = new User({
    name: req.body.name,
    age: req.body.age,
  });

  console.log("USER FRONT:  ", user);
  user.save((error) => {
    if (error) res.status(500).send(error);

    res.status(201).json({
      message: "User created successfully",
    });
  });
});

module.exports = router;
module.exports.get = function (res) {
  return User.find({}, (err, users) => {
    if (err) res.status(500).send(error);
    const json = { ok: true, db: 'mongo', data: users };
    res.status(200).json(json);
  });
};

module.exports.post = function (req, res) {
  let user = new User({
    name: req.body.name,
    age: req.body.age,
  });

  console.log('Mongo: ', req.body);
  user.save((error) => {
    if (error) res.status(500).send(error);
    res
      .status(201)
      .json({ ok: true, message: "User created successfully in MongoDB." });
  });
};

module.exports.delete = function (req, res) {
  User.remove((err, users) => {
    if (err) res.status(500).send(error);
    res.status(201).json({ ok: true, users: [], message: "Users delete successfully in MongoDB." });
  });
    
};