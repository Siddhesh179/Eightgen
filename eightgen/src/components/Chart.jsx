import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale);

const RevenueChart = ({ projections, highlightYear, setHighlightYear }) => {
  const data = {
    labels: projections.map((_, index) => `Year ${index + 1}`),
    datasets: [
      {
        label: "Revenue",
        data: projections,
        backgroundColor: projections.map((_, index) =>
          highlightYear === index ? "rgba(255, 165, 0, 0.8)" : "rgba(75, 192, 192, 0.6)"
        ),
        borderColor: projections.map((_, index) =>
          highlightYear === index ? "rgba(255, 165, 0, 1)" : "rgba(75, 192, 192, 1)"
        ),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    onClick: (e) => {
      const chart = e.chart;
      const activePoints = chart.getElementsAtEventForMode(e, "nearest", { intersect: true }, true);
      if (activePoints.length) {
        const index = activePoints[0].index;
        setHighlightYear(index); // Update highlighted year when a bar is clicked
      }
    },
  };

  return <Bar data={data} options={options} />;
};

export default RevenueChart;
