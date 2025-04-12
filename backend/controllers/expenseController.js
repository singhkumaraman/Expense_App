const asyncHandler = require("express-async-handler");
const Expense = require("../models/expense");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const getTransaction = asyncHandler(async (req, res) => {
  const expense = await Expense.find({ user: req.user.id });
  res.status(200).json(expense);
});
const deleteTransaction = asyncHandler(async (req, res) => {
  const expense = await Expense.find({ user: req.params.id });
  if (!expense) {
    res.status(404);
    throw new Error("invalid");
  }
  await Expense.findOneAndDelete({ _id: req.params.id });
  res.status(200).json("deleted");
});
const addTransaction = asyncHandler(async (req, res) => {
  const { text, amount, id, description, category, date, transactionType } =
    req.body;
  const expense = await Expense.create({
    user: id,
    text: text,
    amount: Number(amount),
    description: description,
    category: category,
    date: date,
    transactionType: transactionType,
  });
  res.status(201).json("Transaction Added");
});
const getMe = asyncHandler(async (req, res) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const startDate = new Date(currentYear, 0, 1);
  const endDate = new Date(currentYear, 11, 31);
  const user = await User.find({ _id: req.user.id });
  const expense = await Expense.find({
    user: user,
    createdAt: { $gte: startDate, $lte: endDate },
  });
  incomeMonthWise = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  expenseMonthWise = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (const item of expense) {
    const date = new Date(item.createdAt);
    const month = date.getMonth();
    incomeMonthWise[month] += item.transactionType === "inc" ? item.amount : 0;
    expenseMonthWise[month] += item.transactionType === "exp" ? item.amount : 0;
  }
  res.status(200).json({
    incomeMonthWise: incomeMonthWise,
    expenseMonthWise: expenseMonthWise,
  });
});
module.exports = {
  getTransaction,
  deleteTransaction,
  addTransaction,
  getMe,
};
