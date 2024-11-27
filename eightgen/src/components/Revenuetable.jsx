import React from "react";

const RevenueTable = ({
  projections,
  highlightYear,
  currentRevenue,
  growthRate,
}) => {
  if (typeof growthRate !== "number") {
    growthRate = 0; // Fallback for invalid growth rate
  }

  // Calculate the growth rates and growth differences for each year
  const growthRates = projections.map((revenue, index) => {
    if (index === 0) {
      return currentRevenue > 0
        ? ((revenue - currentRevenue) / currentRevenue) * 100
        : 0; // Avoid division by zero
    }
    const previousRevenue = projections[index - 1] || 1; // Prevent division by zero
    return ((revenue - previousRevenue) / previousRevenue) * 100;
  });

  const growthDifferences = projections.map((revenue, index) => {
    if (index === 0) return revenue - currentRevenue; // Use current revenue for the first year
    return revenue - projections[index - 1]; // Difference in revenue
  });

  // Formula for the highest growth with exact values
  const highlightGrowthRate = growthRates[highlightYear];
  const previousYearRevenue = projections[highlightYear - 1];
  const currentYearRevenue = projections[highlightYear];
  const formula =
    highlightYear > 0
      ? `((Revenue of Year ${highlightYear + 1}: $${currentYearRevenue.toFixed(
          2
        )} - Revenue of Year ${highlightYear}: $${previousYearRevenue.toFixed(
          2
        )}) / Revenue of Year ${highlightYear}: $${previousYearRevenue.toFixed(
          2
        )}) * 100`
      : `Current Revenue of Year 1: $${currentYearRevenue.toFixed(
          2
        )} - $${currentRevenue}`;

  return (
    <div className="">

      {/* Revenue Table */}
      <div className="overflow-x-auto -inset-5">
        <table className="min-w-full border-collapse border border-gray-200 py-5 bg-slate-300">
          <thead>
            <tr>
              <th className="border border-gray-200 px-0 py-5 bg-slate-300 text-sm md:text-lg">
                Year
              </th>
              <th className="border border-gray-200 px-4 py-5 bg-slate-300 text-sm md:text-lg">
                Projected Revenue
              </th>
              <th className="border border-gray-200 px-4 py-5 bg-slate-300 text-sm md:text-lg">
                Growth Rate (%)
              </th>
              <th className="border border-gray-200 px-4 py-5 bg-slate-300 text-sm md:text-lg">
                Growth Difference
              </th>
              <th className="border border-gray-200 px-4 py-5 bg-slate-300 text-sm lg:text-xl hidden sm:table-cell">
                Growth Difference Formula
              </th>
            </tr>
          </thead>
          <tbody>
            {projections.map((revenue, index) => {
              const growthDifference = growthDifferences[index];
              const growthDifferenceFormula =
                index > 0
                  ? `((Revenue of Year ${index + 1}: $${revenue.toFixed(
                      2
                    )} - Revenue of Year ${index}: $${projections[
                      index - 1
                    ].toFixed(2)})` +
                    ` / Revenue of Year ${index}: $${projections[
                      index - 1
                    ].toFixed(2)}) * 100`
                  : `Revenue for Year 1: $${revenue.toFixed(
                      2
                    )} - $${currentRevenue} = $${growthDifference.toFixed(2)}`;

              return (
                <tr
                  key={index}
                  className={`${
                    index === highlightYear ? "bg-green-500 font-bold" : ""
                  }`}
                >
                  <td className="border border-gray-200 px-4 py-5  text-sm md:text-lg">{`Year ${
                    index + 1
                  }`}</td>
                  <td className="border border-gray-200 px-4 py-5  text-sm md:text-lg">
                    ${revenue.toFixed(2)}
                  </td>
                  <td className="border border-gray-200 px-4 py-5  text-sm md:text-lg">
                    {isNaN(growthRates[index])
                      ? "N/A"
                      : `${growthRates[index].toFixed(2)}%`}
                  </td>
                  <td className="border border-gray-200 px-4 py-5 text-sm md:text-lg">
                    ${growthDifference.toFixed(2)}
                  </td>
                  <td className="border border-gray-200 px-4 py-5 text-sm md:text-lg hidden sm:table-cell">
                    <code>{growthDifferenceFormula}</code>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
    </div>
  );
};

export default RevenueTable;
