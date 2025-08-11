// routes konse hai or kis route par konsa controller run hoga ye aut.route.js file me batate hai
// or route pe controller me kya logic likha jayega ye auth.controller.js file me batate hai

//bcryptjs ek library hai jo hashing ke kaam aati hai 
// mtlb password ko protect karti hai 


const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function registerController(req, res) {
  const { username, password } = req.body;

  const existingUser = await userModel.findOne({ username });
  if (existingUser) {
    return res.status(409).json({
      message: "User already exists",
    });
  }

  const user = await userModel.create({
    username,
    password: await bcrypt.hash(password, 10),
  });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.cookie("token", token);

  return res.status(201).json({
    message: "User registered successfully",
    user,
  });
}

const loginController = async (req, res) => {
  const { username, password } = req.body;

  const user = await userModel.findOne({ username });
  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password)
  if (!isPasswordCorrect) {
    return res.status(401).json({ message: "Incorrect password" });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.cookie("token", token);
  return res.status(200).json({
    message: "Login successful",
    user: {
      username: user.username,
      id: user._id,
    },
  });
};

module.exports = {
  registerController,
  loginController,
};
