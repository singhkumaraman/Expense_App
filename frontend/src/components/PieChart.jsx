import React, { useContext } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ income, expense }) => {
  const data = {
    labels: ["income", "expense"],
    datasets: [
      {
        data: [income, expense],
        backgroundColor: ["green", "crimson"],
      },
    ],
  };
  const options = {};

  return (
    <div style={{ width: "70%", padding: "15px", margin: "auto" }}>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
