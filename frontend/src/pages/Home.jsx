import Header from "../components/Header";
import Balance from "../components/Balance";
import ExpenseIncome from "../components/ExpenseIncome";
import List from "../components/List";
import AddTransaction from "../components/AddTransaction";
import React from "react";

const Home = () => {
  return (
    <div className="w-1/4 border p-6 rounded-lg  shadow-lg  border-gray-200 bg-white ">
      <Header />
      <Balance />
      <ExpenseIncome />
      <List />
      <AddTransaction />
    </div>
  );
};

export default Home;
