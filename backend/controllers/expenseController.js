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
//Middleware not working
//will work on tha part later.
const addTransaction = asyncHandler(async (req, res) => {
  const { text, amount, id } = req.body;
  const expense = await Expense.create({
    user: id,
    text: text,
    amount: Number(amount),
  });
  res.status(201).json("Transaction Added");
});

module.exports = {
  getTransaction,
  deleteTransaction,
  addTransaction,
};
