import { React, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
const Balance = () => {
  const context = useContext(GlobalContext);
  const amounts = context.item.map((transaction) => Number(transaction.amount));
  const total = amounts.reduce((start, end) => (start += end), 0).toFixed(2);
  return (
    <div className="text-center">
      <h4 className="font-bold text-2xl sm:text-3xl text-gray-700">
        Your Balance
      </h4>
      <h1 className="font-semibold text-4xl sm:text-5xl mt-2">₹{total}</h1>
    </div>
  );
};

export default Balance;
