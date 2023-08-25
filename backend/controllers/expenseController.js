const asyncHandler = require("express-async-handler");
const Expense = require("../models/expense");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const getTransaction = asyncHandler(async (req, res) => {
  const data = req.headers.authorization;
  //decoding the token and find out all the inputs attached to the this user and returning it.
  token = data.split(" ")[1];
  const decoded = jwt.verify(token, "aman", { algorithms: ["HS256"] });
  const expense = await Expense.find({ user: decoded.id });
  res.status(200).json(expense);
});
const deleteTransaction = asyncHandler(async (req, res) => {
  const expense = await Expense.find({ user: req.params.id });
  if (!expense) {
    res.status(404);
    throw new Error("Invalid");
  }
  await Expense.findOneAndDelete({ _id: req.params.id });
  res.status(200).json("deleted");
});
const addTransaction = asyncHandler(async (req, res) => {
  const { text, amount, id } = req.body;
  const expense = await Expense.create({
    user: id,
    text: text,
    amount: Number(amount),
  });
  res.status(201).json("Transaction Added");
});
const getMe = asyncHandler(async (req, res) => {
  const data = req.headers.authorization;
  token = data.split(" ")[1];
  const decoded = jwt.verify(token, "aman", { algorithms: ["HS256"] });
  const user = await User.find({ _id: decoded.id });
  if (!user) {
    res.status(404).json("Not Authorised");
  } else {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const startDate = new Date(currentYear, 0, 1);
    const endDate = new Date(currentYear, 11, 31);
    const expense = await Expense.find({
      user: user,
      createdAt: { $gte: startDate, $lte: endDate },
    });
    incomeMonthWise = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    expenseMonthWise = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (const item of expense) {
      const date = new Date(item.createdAt);
      const month = date.getMonth();
      incomeMonthWise[month] += item.amount < 0 ? 0 : item.amount;
      expenseMonthWise[month] += item.amount >= 0 ? 0 : -item.amount;
    }
    res.status(200).json({
      incomeMonthWise: incomeMonthWise,
      expenseMonthWise: expenseMonthWise,
    });
  }
});
module.exports = {
  getTransaction,
  deleteTransaction,
  addTransaction,
  getMe,
};
