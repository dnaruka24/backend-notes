const express = require("express");
const userModel = require("../models/user.model");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const user = await userModel.create({ username, password });

  res.status(201).json({
    message: "User registered successfully",
    user,
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  let user = await userModel.findOne({
    username: username,
  });

  if (!user) {
    return res.status(401).json({
      message: "User not found | Invalid username",
    });
  }

  let isPasswordValid = password === user.password;

  if(!isPasswordValid){
    return res.status(401).json({
        message: "Invalid password"
    })
  }

  res.status(200).json({
    message: "User logged in successfully",
  })
});

module.exports = router;
