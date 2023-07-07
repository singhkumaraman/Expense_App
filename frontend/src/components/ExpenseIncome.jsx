import { React, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

const ExpenseIncome = () => {
  const context = useContext(GlobalContext);
  const amounts = context.item.map((transaction) => transaction.amount);
  const amount1 = amounts.filter((val) => val > 0);
  const amount2 = amounts.filter((val) => val < 0);

  const income = amount1.reduce((start, end) => (start += end), 0).toFixed(2);
  const expense = amount2.reduce((start, end) => (start += end), 0).toFixed(2);
  return (
    <div className="flex flex-col sm:flex-row my-8 border rounded-lg">
      <div className="flex-grow flex justify-center border-b sm:border-r-2 border-r-gray-300 rounded-tl-lg sm:rounded-l-lg p-2">
        <div className="font-bold">
          <h4 className="text-lg">Income</h4>
          <p className="text-green-600">${income}</p>
        </div>
      </div>
      <div className="flex-grow flex justify-center rounded-tr-lg sm:rounded-r-lg p-2">
        <div className="font-bold">
          <h4 className="text-lg">Expense</h4>
          <p className="text-red-600">${expense}</p>
        </div>
      </div>
    </div>
  );
};

export default ExpenseIncome;
