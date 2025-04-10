import React, { useContext, useEffect, useState } from "react";
import Graph from "../components/Graph";
import { GlobalContext } from "../context/GlobalContext";
const Analytics = () => {
  const { getAnalytics, incomeMonthWise, expenseMonthWise } =
    useContext(GlobalContext);
  useEffect(() => {
    getAnalytics();
  }, []);
  return (
    <>
      <div className="flex grow">
        {
          <Graph
            expenseMonthWise={expenseMonthWise}
            incomeMonthWise={incomeMonthWise}
          />
        }
      </div>
    </>
  );
};

export default Analytics;
