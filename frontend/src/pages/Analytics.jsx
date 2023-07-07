import React, { useContext, useRef } from "react";
import { GlobalContext } from "../context/GlobalContext";
import PieChart from "../components/PieChart";

const Analytics = () => {
  const chartRef = useRef();
  const context = useContext(GlobalContext);
  const amounts = context.item.map((transaction) => transaction.amount);
  const income = amounts
    .filter((amount) => amount > 0)
    .reduce((total, amount) => total + amount, 0)
    .toFixed(2);
  const expense = amounts
    .filter((amount) => amount < 0)
    .reduce((total, amount) => total + amount, 0)
    .toFixed(2);
  return (
    <div>
      <PieChart income={income} expense={expense} ref={chartRef} />
    </div>
  );
};

export default Analytics;
