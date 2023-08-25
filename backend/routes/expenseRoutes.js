const express = require("express");
const router = express.Router();
const {
  addTransaction,
  deleteTransaction,
  getTransaction,
  getMe,
} = require("../controllers/expenseController");
router.post("/", addTransaction);
router.delete("/:id", deleteTransaction);
router.get("/", getTransaction);
router.get("/analytics", getMe);
module.exports = router;
