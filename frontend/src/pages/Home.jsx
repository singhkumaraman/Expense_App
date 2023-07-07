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
    <div className="flex justify-center items-center h-screen m-10 ">
      <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 border p-12 rounded-lg shadow-lg border-gray-200 bg-white">
        <Balance />
        <ExpenseIncome />
        <List />
        <AddTransaction />
      </div>
    </div>
  );
};

export default Home;
