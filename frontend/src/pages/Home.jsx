import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";
import ExpenseList from "../components/ExpenseList";
const Home = () => {
  const context = useContext(GlobalContext);

  return (
    <>
      <div className="min-h-screen p-4 m-20">
        <div className="max-w-lg mx-auto border p-16 rounded-lg shadow-lg bg-white">
          <ExpenseList />
        </div>
      </div>
    </>
  );
};

export default Home;
