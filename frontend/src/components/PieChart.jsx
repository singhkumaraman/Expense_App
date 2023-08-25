import React, { useContext } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ income, expense, balance }) => {
  const data = {
    labels: ["income", "expense", "balance"],
    datasets: [
      {
        data: [income, expense, balance],
        backgroundColor: ["#166534", "#dc2626", "#7e22ce"],
        borderColor: "rgb(225,205,240)",
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
