const express = require("express");
const userModel = require("../models/user.model");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const existingUser = await userModel.findOne({ username });
  if (existingUser) {
    return res.status(409).json({
      message: "User already exists",
    });
  }

  const user = await userModel.create({ username, password });
  const token = jwt.sign({id:user._id}, process.env.JWT_SECRET);
  res.cookie("token", token)

  return res.status(201).json({
    message: "User registered successfully",
    user,
  });
});

module.exports = router;
