const express = require("express");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const user = await userModel.create({ username, password });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.cookie("token", token)

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

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Invalid password",
    });
  }

  res.status(200).json({
    message: "User logged in successfully",
  });
});

router.get("/user", async (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id).select("-password -__v");

    return res.status(200).json({
      message: "User fetched successfully",
      user,
    });
  } catch (err) {
    return res.status(401).json({
      message: "Unauthorized - Invalid token",
    });
  }
});

module.exports = router;
