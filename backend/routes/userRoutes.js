const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  register,
  loginUser,
  getMe,
} = require("../controllers/userControllers");
router.post("/register", register);
router.post("/login", loginUser);
router.get("/me", protect, getMe);

module.exports = router;
