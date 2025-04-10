import { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";
const ExpenseForm = () => {
  const nav = useNavigate();
  const [expense, setExpense] = useState({
    description: "",
    category: "",
    amount: 0,
    date: "",
  });
  const { addTransaction, user_id } = useContext(GlobalContext);
  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!expense.description || !expense.amount || !expense.date) return;
    addTransaction(
      user_id,
      -expense.amount,
      expense.description,
      expense.date,
      expense.category
    );
    setExpense({ description: "", category: "", amount: "", date: "" });
    nav("/");
  };

  const categories = [
    "Food",
    "Travel",
    "Rent",
    "Utilities",
    "Entertainment",
    "Health",
    "Shopping",
    "Education",
    "Savings",
    "Other",
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md space-y-4"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <input
          type="text"
          name="description"
          value={expense.description}
          onChange={handleChange}
          className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
          placeholder="E.g. Groceries"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          name="category"
          value={expense.category}
          onChange={handleChange}
          className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 bg-white"
        >
          <option value="" disabled>
            Select a category
          </option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Amount
        </label>
        <input
          type="number"
          name="amount"
          value={expense.amount}
          onChange={handleChange}
          className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
          placeholder="E.g. 50.00"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Date</label>
        <input
          type="date"
          name="date"
          value={expense.date}
          onChange={handleChange}
          className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>

      <div className="text-right">
        <button
          type="submit"
          className="px-5 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-500"
        >
          Add Expense
        </button>
      </div>
    </form>
  );
};

export default ExpenseForm;
