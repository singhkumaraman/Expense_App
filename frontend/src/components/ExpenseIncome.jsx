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
    <div className=" flex my-8 border rounded-lg">
      <div className="flex grow justify-center border-r-2 border-r-gray-300 rounded-l-lg p-2">
        <div className="font-bold">
          <h4 className="text-lg">Income</h4>
          <p className="text-green-600">${income}</p>
        </div>
      </div>
      <div className="flex grow justify-center p-2">
        <div className="font-bold">
          <h4 className="text-lg">Expense</h4>
          <p className="text-red-600">${expense}</p>
        </div>
      </div>
    </div>
  );
};

export default ExpenseIncome;
