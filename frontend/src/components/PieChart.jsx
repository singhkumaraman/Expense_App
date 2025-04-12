import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

// Category colors (you can customize these as needed)
const categoryColors = [
  "#f97316", // Food
  "#3b82f6", // Travel
  "#6366f1", // Rent
  "#10b981", // Utilities
  "#ec4899", // Entertainment
  "#f43f5e", // Health
  "#eab308", // Shopping
  "#8b5cf6", // Education
  "#22c55e", // Savings
  "#94a3b8", // Other
  "#006400", // Income
];

const PieChart = ({ categoryData }) => {
  const data = {
    labels: categoryData.map((item) => item.category),
    datasets: [
      {
        label: "Expenses by Category",
        data: categoryData.map((item) => item.amount),
        backgroundColor: categoryColors,
        borderWidth: 4,
        borderColor: "#f3f4f6",
        hoverBorderColor: "#e5e7eb",
        hoverOffset: 16,
      },
    ],
  };

  const options = {
    responsive: true,
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
        📊 Expenses by Category
      </h2>
      <Pie data={data} options={options} />
      <p className="mt-6 text-sm text-center text-gray-500">
        A breakdown of your spending habits by category.
      </p>
    </div>
  );
};

export default PieChart;
