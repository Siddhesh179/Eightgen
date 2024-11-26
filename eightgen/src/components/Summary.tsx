import React from "react";

const Summary = ({ totalRevenue, avgGrowth }) => (
  <div className="p-4 bg-white shadow-md rounded-md mt-6">
    <h3 className="text-xl font-semibold mb-4">Summary</h3>
    <p>Total Revenue (5 Years): <strong>${totalRevenue.toFixed(2)}</strong></p>
    <p>Average Annual Growth: <strong>{avgGrowth.toFixed(2)}%</strong></p>
  </div>
);

export default Summary;
