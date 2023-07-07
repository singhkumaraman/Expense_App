import Header from "../components/Header";
import Balance from "../components/Balance";
import ExpenseIncome from "../components/ExpenseIncome";
import List from "../components/List";
import AddTransaction from "../components/AddTransaction";
import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";
const Home = () => {
  const context = useContext(GlobalContext);
  useEffect(() => {
    context.getTransaction();
  }, []);
  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 border p-6 rounded-lg shadow-lg border-gray-200 bg-white">
      <Header />
      <Balance />
      <ExpenseIncome />
      <List />
      <AddTransaction />
    </div>
  );
};

export default Home;
