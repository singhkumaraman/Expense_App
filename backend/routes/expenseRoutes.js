const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const {
  addTransaction,
  deleteTransaction,
  getTransaction,
  getMe,
} = require("../controllers/expenseController");
router.post("/", authMiddleware, addTransaction);
router.delete("/:id", authMiddleware, deleteTransaction);
router.get("/", authMiddleware, getTransaction);
router.get("/analytics", authMiddleware, getMe);
module.exports = router;
