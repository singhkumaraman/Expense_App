const express = require("express");
const router = express.Router();
const {
  register,
  loginUser,
  getMe,
} = require("../controllers/userControllers");
router.post("/register", register);
router.post("/login", loginUser);
module.exports = router;
