import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PieChart from "../components/PieChart";
import { GlobalContext } from "../context/GlobalContext";

const initialExpenses = {
  Food: 0,
  Travel: 0,
  Rent: 0,
  Utilities: 0,
  Entertainment: 0,
  Health: 0,
  Shopping: 0,
  Education: 0,
  Savings: 0,
  Others: 0,
  Income: 0,
};

const ITEMS_PER_PAGE = 5;

const Home = () => {
  const { user_id, deleteTransaction, item, getTransaction, addTransaction } =
    useContext(GlobalContext);

  const [income, setIncome] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expenses, setExpenses] = useState(initialExpenses);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(item.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = item.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleAddMoney = () => {
    addTransaction(
      user_id,
      income,
      "Added Manually",
      new Date(),
      "Income",
      "inc"
    );
    getTransaction();
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    getTransaction();
  }, []);

  useEffect(() => {
    const categoryTotals = { ...initialExpenses };
    item.forEach(({ category, amount }) => {
      if (categoryTotals.hasOwnProperty(category)) {
        categoryTotals[category] += amount;
      } else {
        categoryTotals[category] = amount;
      }
    });
    setExpenses(categoryTotals);
  }, [item]);
  // console.log(item);
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
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-5 py-2.5 rounded-lg text-white font-semibold bg-gradient-to-r from-green-700 to-green-900 shadow-lg hover:opacity-90 transition duration-300"
            >
              + Add Money
            </button>
            <Link
              to="/ExpenseForm"
              className="px-5 py-2.5 rounded-lg text-white font-semibold bg-gradient-to-r from-green-700 to-green-900 shadow-lg hover:opacity-90 transition duration-300"
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
              {currentItems.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    {new Date(item.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
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

          {/* Pagination Controls */}
          <div className="flex justify-between items-center p-4 bg-white border-t">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 text-sm rounded hover:bg-gray-300 disabled:opacity-50"
            >
              ⬅ Previous
            </button>

            <div className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </div>

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 text-sm rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Next ➡
            </button>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-[400px]">
        <PieChart
          key={JSON.stringify(expenses)}
          categoryData={Object.entries(expenses).map(([category, amount]) => ({
            category,
            amount,
          }))}
        />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-[90%] max-w-md shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              💰 Add Income
            </h2>
            <form>
              <input
                type="number"
                name="income"
                placeholder="Enter amount"
                className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
                onChange={(e) => {
                  setIncome(e.target.value);
                }}
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
                  onClick={(e) => {
                    e.preventDefault();
                    setIsModalOpen(false);
                    handleAddMoney();
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
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

export default Home;
