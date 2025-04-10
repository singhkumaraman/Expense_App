import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PieChart from "./PieChart";
import { GlobalContext } from "../context/GlobalContext";

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const { deleteTransaction, item, getTransaction } = useContext(GlobalContext);
  const amounts = item.map((transaction) => transaction.amount);
  const amount1 = amounts.filter((val) => val > 0);
  const amount2 = amounts.filter((val) => val < 0);
  const total = amounts.reduce((start, end) => (start += end), 0).toFixed(2);
  const income = amount1.reduce((start, end) => (start += end), 0).toFixed(2);
  const exp = -amount2.reduce((start, end) => (start += end), 0).toFixed(2);
  const expense = exp.toFixed(2);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleAddMoney = (amount) => {
    const money = Number(amount);
    if (!isNaN(money) && money > 0) {
      setExpenses([
        {
          date: new Date().toISOString().split("T")[0],
          category: "Income",
          description: "Added manually",
          amount: `₹${money}`,
        },
        ...expenses,
      ]);
    }
  };
  useEffect(() => {
    getTransaction();
  }, []);
  console.log(item);
  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 py-10 flex flex-col lg:flex-row gap-10">
      <div className="flex-1">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h3 className="text-3xl font-bold text-gray-800 mb-1">
              💸 Expense Tracker
            </h3>
            <p className="text-gray-500 text-sm">
              Track your income and expenses in style.
            </p>
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link
              to="/add-income"
              className="px-5 py-2.5 rounded-lg text-white font-semibold bg-gradient-to-r from-green-400 to-emerald-600 shadow-lg hover:opacity-90 transition duration-300"
            >
              + Add Money
            </Link>
            <Link
              to="/ExpenseForm"
              className="px-5 py-2.5 rounded-lg text-white font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg hover:opacity-90 transition duration-300"
            >
              + Add Expense
            </Link>
          </div>
        </div>

        <div className="bg-white/60 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-gray-100 text-gray-700 font-semibold">
              <tr>
                <th className="py-3 px-6">📅 Date</th>
                <th className="py-3 px-6">📂 Category</th>
                <th className="py-3 px-6">📝 Description</th>
                <th className="py-3 px-6 text-right">💰 Amount</th>
                <th className="py-3 px-6 text-right">⚙️ Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 divide-y">
              {expenses.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">{item.date}</td>
                  <td className="px-6 py-4">{item.category}</td>
                  <td className="px-6 py-4">{item.description}</td>
                  <td className="px-6 py-4 text-right font-medium text-gray-800">
                    {item.amount}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => deleteTransaction(item._id)}
                      className="text-red-500 hover:text-red-600 font-semibold px-3 py-1 rounded-md hover:bg-red-50 transition duration-200"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Chart Section */}
      <div className="w-full lg:w-[400px]">
        <PieChart income={1000000} expense={37000} balance={630000} />
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-[90%] max-w-md shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              💰 Add Income
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const amount = e.target.amount.value;
                handleAddMoney(amount);
                setIsModalOpen(false);
              }}
            >
              <input
                type="number"
                name="amount"
                placeholder="Enter amount"
                className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
                required
              />
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseList;
