import React from "react";
import { Bar } from "react-chartjs-2";
// import { ChartJS, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import HomeHeader from "../components/HomeHeader";

// ChartJS.register(CategoryScale, LinearScale, Tooltip, Legend);

const Analytics = () => {
  const data = {
    labels: ["mon", "tue"],
    datasets: [
      {
        data: [5, 6],
        backgroundColor: "green",
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  };

  const options = {};

  return (
    <>
      <HomeHeader />
      {/* <Bar data={data} options={options} /> */}
    </>
  );
};

export default Analytics;
