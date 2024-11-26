import React from "react";

const RevenueTable = ({ projections, highlightYear }) => {
  // Calculate the growth rates and growth differences for each year
  const growthRates = projections.map((revenue, index) => {
    if (index === 0) return 0;
    return ((revenue - projections[index - 1]) / projections[index - 1]) * 100;
  });

  const growthDifferences = projections.map((revenue, index) => {
    if (index === 0) return 0;
    return revenue - projections[index - 1]; // Difference in revenue
  });

  // Formula for the highest growth with exact values
  const highlightGrowthRate = growthRates[highlightYear];
  const previousYearRevenue = projections[highlightYear - 1];
  const currentYearRevenue = projections[highlightYear];
  const formula = highlightYear > 0
    ? `((Revenue of Year ${highlightYear + 1}: $${currentYearRevenue.toFixed(2)} - Revenue of Year ${highlightYear}: $${previousYearRevenue.toFixed(2)}) / Revenue of Year ${highlightYear}: $${previousYearRevenue.toFixed(2)}) * 100`
    : '';

  return (
    <div>
      {/* Text mentioning the year with the highest growth */}
      <p className="text-lg font-semibold mb-4">
        The year with the highest growth in revenue compared to the previous year is <span className="text-green-600">Year {highlightYear + 1}</span>.
      </p>

      {/* Display the formula explaining the growth */}
      {highlightYear > 0 && (
        <p className="text-sm text-gray-600 mb-4">
          Formula for Year {highlightYear + 1}: <br />
          <code>{formula}</code><br />
          Growth Rate: <span className="font-bold text-green-600">{highlightGrowthRate.toFixed(2)}%</span>
        </p>
      )}

      {/* Revenue Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2 bg-gray-100">Year</th>
              <th className="border border-gray-300 px-4 py-2 bg-gray-100">Projected Revenue</th>
              <th className="border border-gray-300 px-4 py-2 bg-gray-100">Growth Rate (%)</th>
              <th className="border border-gray-300 px-4 py-2 bg-gray-100">Growth Difference</th>
              <th className="border border-gray-300 px-4 py-2 bg-gray-100">Growth Difference Formula</th>
            </tr>
          </thead>
          <tbody>
            {projections.map((revenue, index) => {
              const growthDifference = growthDifferences[index];
              const growthDifferenceFormula =
                index > 0
                  ? `((Revenue of Year ${index + 1}: $${revenue.toFixed(2)} - Revenue of Year ${index}: $${projections[index - 1].toFixed(2)})`
                    + ` / Revenue of Year ${index}: $${projections[index - 1].toFixed(2)}) * 100`
                  : null;

              return (
                <tr
                  key={index}
                  className={`${
                    index === highlightYear ? "bg-green-400 font-bold" : ""
                  }`}
                >
                  <td className="border border-gray-300 px-4 py-2">{`Year ${index + 1}`}</td>
                  <td className="border border-gray-300 px-4 py-2">${revenue.toFixed(2)}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {index === 0 ? "N/A" : `${growthRates[index].toFixed(2)}%`}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {index === 0 ? "N/A" : `$${growthDifference.toFixed(2)}`}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-sm">
                    {growthDifferenceFormula ? (
                      <code>{growthDifferenceFormula}</code>
                    ) : (
                      "N/A"
                    )}
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
