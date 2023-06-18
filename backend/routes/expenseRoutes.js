const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  addTransaction,
  deleteTransaction,
  getTransaction,
} = require("../controllers/expenseController");
router.post("/", protect, addTransaction);
router.delete("/:id", protect, deleteTransaction);
router.get("/", protect, getTransaction);
module.exports = router;
