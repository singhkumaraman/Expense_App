import React, { forwardRef } from "react";
import { Pie } from "react-chartjs-2";

const PieChart = forwardRef(({ income, expense }, ref) => {
  const data = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        data: [income, expense],
        backgroundColor: ["#36a2eb", "#ff6384"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
    },
  };

  return <Pie ref={ref} data={data} options={options} />;
});

export default PieChart;
