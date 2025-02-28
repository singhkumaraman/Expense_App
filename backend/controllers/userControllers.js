const User = require("../models/user");
const jwt = require("jsonwebtoken");
const asynchandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const {
  signupInputsValidate,
  loginInputsValidate,
} = require("../inputvalidation/authInputValidation");
//REGISTER
const register = asynchandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userData = {
    name: name,
    email: email,
    password: password,
  };
  if (!signupInputsValidate(userData)) {
    console.log(">>>>");
    throw new Error("incorrect input format!");
  }
  const userExists = await User.findOne({ email: email });
  if (userExists) {
    res.status(401);
    throw new Error("user already exists");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({ ...userData, password: hashedPassword });
  const done = await user.save();
  if (!done) {
    res.status(400);
    throw new Error("invalid request");
  }
  res.status(200).json({
    name: user.name,
    email: user.email,
  });
});
//LOGIN
const loginUser = asynchandler(async (req, res) => {
  const { email, password } = req.body;
  const userData = {
    email: email,
    password: password,
  };
  if (!loginInputsValidate(userData)) {
    throw new Error("incorrect input format!");
  }
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      user,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("invalid credential");
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
    expiresIn: "1d",
  });
};
module.exports = {
  register,
  loginUser,
  generateToken,
  getMe,
};
