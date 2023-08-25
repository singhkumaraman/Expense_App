import { React, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import PieChart from "./PieChart";
const ExpenseIncome = () => {
  const context = useContext(GlobalContext);
  const amounts = context.item.map((transaction) => transaction.amount);
  const amount1 = amounts.filter((val) => val > 0);
  const amount2 = amounts.filter((val) => val < 0);
  const total = amounts.reduce((start, end) => (start += end), 0).toFixed(2);
  const income = amount1.reduce((start, end) => (start += end), 0).toFixed(2);
  const exp = -amount2.reduce((start, end) => (start += end), 0).toFixed(2);
  const expense = exp.toFixed(2);
  return (
    <div className=" my-8 border rounded-lg">
      <PieChart income={income} expense={expense} balance={total} />
      <div className="flex">
        <div className="flex-grow flex justify-center border-b   rounded-tl-lg sm:rounded-l-lg p-4 ">
          <div className="font-bold">
            <h4 className="text-lg">Income</h4>
            <p className="text-green-600">₹{income}</p>
          </div>
        </div>
        <div className="flex-grow flex justify-center rounded-tr-lg sm:rounded-r-lg p-4">
          <div className="font-bold">
            <h4 className="text-lg">Expense</h4>
            <p className="text-red-600">₹{expense}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseIncome;
