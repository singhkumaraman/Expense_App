import HomeHeader from "../components/HomeHeader";
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
    <>
      <HomeHeader />
      <div className="min-h-screen p-8 bg-gray-900">
        <div className="max-w-lg mx-auto border p-20 rounded-lg shadow-lg bg-white">
          <Balance />
          <ExpenseIncome />
          <List />
          <AddTransaction />
        </div>
      </div>
    </>
  );
};

export default Home;
