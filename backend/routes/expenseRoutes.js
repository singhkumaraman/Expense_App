const express = require("express");
const router = express.Router();
const {
  addTransaction,
  deleteTransaction,
  getTransaction,
} = require("../controllers/expenseController");
router.post("/", addTransaction);
router.delete("/:id", deleteTransaction);
router.get("/", getTransaction);
module.exports = router;
