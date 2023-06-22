const asyncHandler = require("express-async-handler");
const Expense = require("../models/expense");
const User = require("../models/user");

const getTransaction = asyncHandler(async (req, res) => {
  const expense = await Expense.find({ user: req.user.id });
  res.status(200).json(expense);
});
const deleteTransaction = asyncHandler(async (req, res) => {
  const expense = await Expense.find({ user: req.user.id });
  if (!expense) {
    res.status(404);
    throw new Error("Invalid");
  }
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not Found");
  }
  if (expense[0].user.toString() !== user._id.toString()) {
    res.status(401);
    throw new Error("User not Authorized");
  }
  await Expense.findOneAndDelete({ user: req.user });
  res.status(200).json({ msg: "Deletion Successfull" });
});

const addTransaction = asyncHandler(async (req, res) => {
  const { text, amount } = req.body;
  const expense = await Expense.create({
    text: text,
    amount: Number(amount),
  });
  res.status(201).json(expense);
});

module.exports = {
  getTransaction,
  deleteTransaction,
  addTransaction,
};
