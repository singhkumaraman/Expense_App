import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Graph = ({ incomeMonthWise, expenseMonthWise }) => {
  const chartData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Income (Rupees)",
        data: incomeMonthWise,
        borderColor: "rgb(255, 255, 255)",
        backgroundColor: "rgba(10, 200, 10, 0.6)",
      },
      {
        label: "Expense (Rupees)",
        data: expenseMonthWise,
        borderColor: "rgb(255, 255, 255)",
        backgroundColor: "rgba(240, 10, 10, 0.6)",
      },
    ],
  };

  const options = {};

  return (
    <div className="mx-auto w-1/2 my-5">
      <div
        className="chart-container"
        style={{ position: "relative", height: "400px" }}
      >
        <Bar data={chartData} options={options} className="p-10" />
      </div>
    </div>
  );
};

export default Graph;
