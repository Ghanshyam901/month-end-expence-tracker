// const { Router } = require('express')
const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.post("/login", async function (req, res) {
  try {
    const result = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (result) {
      res.send(result);
    } else {
      res.status(500).json("error..");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//// register

router.post("/register", async function (req, res) {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.send("User regestration Successfully");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
