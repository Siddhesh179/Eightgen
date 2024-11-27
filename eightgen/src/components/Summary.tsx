import React from "react";

const Summary = ({
  totalRevenue,
  avgGrowth,
  highlightYear,
  currentRevenue,
}) => (
  <div className="p-5 bg-rose-200 shadow-md rounded-md mb-20 lg:mb-0 mt-10">
    <div className="flex justify-center">
      <h3 className="text-5xl font-semibold mb-4">Summary</h3>
    </div>
    <div className="py-4">
      <p className="text-xl  md:text-2xl font-semibold py-1">
        Current Revenue:
        <span className="font-bold text-blue-600"> ${currentRevenue}</span>
      </p>
      <p className="text-xl  md:text-2xl font-semibold py-1">
        Total Revenue (5 Years): ${totalRevenue.toFixed(2)}
      </p>
      <p className="text-xl  md:text-2xl font-semibold py-1">
        Average Annual Growth: {avgGrowth.toFixed(2)}%
      </p>
      <p className="text-xl  md:text-2xl font-bold mt-3" style={{fontFamily:"Poppins"}}>
        The year with the highest growth in revenue compared to its previous
        year is <span className="text-green-600">Year {highlightYear + 1}</span>
       {""} .
      </p>
    </div>
  </div>
);

export default Summary;
