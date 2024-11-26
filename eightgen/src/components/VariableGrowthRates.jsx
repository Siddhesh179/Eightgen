import React from "react";

const VariableGrowthRates = ({
  growthRates,
  onRateChange,
  isEnabled,
}) => {
  return (
    <div
      className={`mb-6 p-4 border rounded bg-gray-50 ${
        !isEnabled ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      <h2 className="text-lg font-semibold mb-2">
        Enter Custom Growth Rates for Each Year:
      </h2>
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Year {index + 1} Growth Rate (%):
          </label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            placeholder={`Growth rate for year ${index + 1}`}
            min="-100"
            value={growthRates[index]}
            onChange={(e) => onRateChange(index, e.target.value)}
            disabled={!isEnabled}
          />
        </div>
      ))}
    </div>
  );
};

export default VariableGrowthRates;
