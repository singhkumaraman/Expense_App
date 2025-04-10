import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ income, expense, balance }) => {
  const data = {
    labels: ["Income", "Expense", "Balance"],
    datasets: [
      {
        label: "Money Flow",
        data: [income, expense, balance],
        backgroundColor: ["#16a34a", "#dc2626", "#7c3aed"],
        borderWidth: 4,
        borderColor: "#f3f4f6",
        hoverBorderColor: "#e5e7eb",
        hoverOffset: 16,
      },
    ],
  };

  const options = {
    responsive: true,
    cutout: "40%", // gives a donut-like look
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#1f2937",
          font: {
            size: 14,
            weight: "600",
            family: "Inter, sans-serif",
          },
          boxWidth: 20,
          padding: 16,
        },
      },
      tooltip: {
        backgroundColor: "#111827",
        titleColor: "#f9fafb",
        bodyColor: "#f9fafb",
        cornerRadius: 8,
        padding: 12,
        titleFont: {
          size: 16,
          weight: "bold",
        },
        bodyFont: {
          size: 14,
        },
      },
    },
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-gradient-to-br from-white to-gray-50 p-8 rounded-3xl shadow-2xl transition-all duration-500 ease-in-out hover:shadow-indigo-300">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6 tracking-wide">
        💰 Financial Overview
      </h2>
      <Pie data={data} options={options} />
      <p className="mt-6 text-sm text-center text-gray-500">
        This chart provides a quick summary of your income, expenses, and
        remaining balance.
      </p>
    </div>
  );
};

export default PieChart;
