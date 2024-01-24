const User = require("../models/user");
const jwt = require("jsonwebtoken");
const asynchandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
//REGISTER
const register = asynchandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Invalid request");
  }
  const userExists = await User.findOne({ email: email });
  if (userExists) {
    res.status(401);
    throw new Error("User Already exists");
  }
  //password hashing.
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({
    name: name,
    email: req.body.email,
    password: hashedPassword,
  });
  const done = await user.save();
  if (!done) {
    res.status(400);
    throw new Error("Invalid request");
  }
  res.status(200).json({
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  });
});
//LOGIN
const loginUser = asynchandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      user,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }
});
//GET MY DATA
const getMe = asynchandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  res.status(200).json(user);
});
//GENERATE TOKEN
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
module.exports = {
  register,
  loginUser,
  generateToken,
  getMe,
};
