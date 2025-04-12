import React, { useContext, useEffect, useState } from "react";
import Graph from "../components/Graph";
import { GlobalContext } from "../context/GlobalContext";

const Analytics = () => {
  const { getAnalytics, incomeMonthWise, expenseMonthWise } =
    useContext(GlobalContext);
  const [expense, setExpense] = useState(0);
  const [earnings, setEarnings] = useState(0);

  useEffect(() => {
    const fetchAnalytics = async () => {
      await getAnalytics(); // Assuming this is an async function
      const inc = incomeMonthWise.reduce((curr, sum) => curr + sum, 0);
      const exp = expenseMonthWise.reduce((curr, sum) => curr + sum, 0);
      setEarnings(inc);
      setExpense(exp);
    };

    fetchAnalytics();
  }, [getAnalytics, incomeMonthWise, expenseMonthWise]);

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen rounded-lg shadow-lg">
      {/* Graph Component */}
      <div className="w-full max-w-6xl ">
        <Graph
          expenseMonthWise={expenseMonthWise}
          incomeMonthWise={incomeMonthWise}
        />
      </div>

      {/* Cards for Expense and Earnings */}
      <div className="w-full max-w-6xl flex justify-between items-center space-x-8 ">
        <div className="w-full sm:w-1/2 bg-white p-8 rounded-xl shadow-xl hover:bg-gradient-to-r from-blue-100 to-blue-200 transition-all transform hover:scale-105">
          <div className="flex items-center space-x-4">
            <div className="text-3xl text-blue-600">
              <i className="fas fa-arrow-up"></i> {/* Icon */}
            </div>
            <div className="flex flex-col">
              <strong className="text-gray-700 text-xl">
                Total Earning This Year:
              </strong>
              <div className="text-3xl text-blue-700 font-bold">{earnings}</div>
            </div>
          </div>
        </div>
        {/* Expense Card */}
        <div className="w-full sm:w-1/2 bg-white p-8 rounded-xl shadow-xl hover:bg-gradient-to-r from-red-100 to-red-200 transition-all transform hover:scale-105">
          <div className="flex items-center space-x-4">
            <div className="text-3xl text-red-600">
              <i className="fas fa-arrow-down"></i> {/* Icon */}
            </div>
            <div className="flex flex-col">
              <strong className="text-gray-700 text-xl">
                Total Expense This Year:
              </strong>
              <div className="text-3xl text-red-700 font-bold">{expense}</div>
            </div>
          </div>
        </div>

        {/* Earnings Card */}
      </div>
    </div>
  );
};

export default Analytics;
