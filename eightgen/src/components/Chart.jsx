import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const RevenueChart = ({ projections, highlightYear }) => {
  const [isMobile, setIsMobile] = useState(false);

  // Check if the screen is mobile or not
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Adjust the breakpoint as needed
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check on load

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Create a color palette for the bars
  const generateRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgba(${r}, ${g}, ${b}, 0.4)`;
  };

  const data = {
    labels: projections.map((_, index) => `Year ${index + 1}`),
    datasets: [
      {
        label: "Revenue",
        data: projections,
        backgroundColor: projections.map(
          (_, index) =>
            highlightYear === index
              ? "rgba(0, 255, 0, 1)" 
              : generateRandomColor() 
        ),
        borderColor: projections.map(
          (_, index) =>
            highlightYear === index
              ? "rgba(0, 255, 0, 1)" // Border color for highlighted year
              : "rgba(19, 92, 192, 1)" // Default border color
        ),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Disable legend if not needed
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    // Set the width based on the container size
    aspectRatio: 1.5, // This can control the overall chart aspect ratio
    maintainAspectRatio: false, // Allow manual control over the height
  };

  return (
    <div
      className="mt-10"
      style={{ height: "600px", backgroundColor: "blanchedalmond" }}
    >
      <Bar data={data} options={options} />
    </div>
  );
};

export default RevenueChart;
