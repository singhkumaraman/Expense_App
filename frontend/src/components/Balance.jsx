import { React, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

const Balance = () => {
  const context = useContext(GlobalContext);
  console.log(context.item);
  const amounts = context.item.map((transaction) => Number(transaction.amount));
  const total = amounts.reduce((start, end) => (start += end), 0).toFixed(2);
  return (
    <div className="text-center">
      <h4 className="font-bold ml-3 mb-1 text-3xl sm:text-4xl">Your Balance</h4>
      <h1 className="font-semibold ml-3 mb-4 text-xl sm:text-2xl">${total}</h1>
    </div>
  );
};

export default Balance;
