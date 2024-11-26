import React, { useState } from "react";

const InputForm = ({ onCalculate, onVariableGrowthCalculate }) => {
  const [currentRevenue, setCurrentRevenue] = useState("");
  const [growthRate, setGrowthRate] = useState(0);
  const [variableGrowthRates, setVariableGrowthRates] = useState([
    0, 0, 0, 0, 0,
  ]);
  const [useVariableGrowth, setUseVariableGrowth] = useState(false);
  const [error, setError] = useState(""); // Error state

  const handleConstantSubmit = (e) => {
    e.preventDefault();
    if (currentRevenue <= 0) {
      setError("Please enter a valid positive current revenue.");
    } else if (growthRate <= 0) {
      setError("Growth rate must be greater than 0.");
    } else {
      setError("");
      onCalculate(Number(currentRevenue), Number(growthRate));
    }
  };

  const handleVariableSubmit = (e) => {
    e.preventDefault();
    if (currentRevenue <= 0) {
      setError("Please enter a valid positive current revenue.");
    } else if (growthRate <= 0) {
      setError("Growth rate must be greater than 0.");
    } else {
      setError("");
      onVariableGrowthCalculate(
        Number(currentRevenue),
        variableGrowthRates.map(Number)
      );
    }
  };

  const handleGrowthRateChange = (index, value) => {
    const newRates = [...variableGrowthRates];
    newRates[index] = parseFloat(value);
    setVariableGrowthRates(newRates);
  };

  return (
    <div className="mb-6">
      <form
        onSubmit={
          useVariableGrowth ? handleVariableSubmit : handleConstantSubmit
        }
        className="mb-6"
      >
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Current Revenue:
          </label>
          <input
            type="number"
            value={currentRevenue}
            onChange={(e) => setCurrentRevenue(e.target.value)}
            className="mt-1 p-2 block w-full border rounded"
            min="0"
            placeholder="Enter current revenue"
            required
          />
          {error && currentRevenue <= 0 && (
            <p className="text-red-500 text-sm">{error}</p>
          )}
        </div>

        {/* Toggle between Constant and Variable Growth Inputs */}
        {!useVariableGrowth ? (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Growth Rate:
            </label>
            <input
              type="range"
              value={growthRate}
              onChange={(e) => setGrowthRate(e.target.value)}
              min="0"
              max="100"
              step="1"
              className="w-full appearance-none h-2 bg-gradient-to-r from-blue-400 via-green-400 to-red-400 rounded-full outline-none"
              style={{
                backgroundSize: `${growthRate}% 100%`,
                backgroundRepeat: "no-repeat",
              }}
            />
            <p className="text-sm text-gray-600">{growthRate}%</p>
            {error && growthRate <= 0 && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            <div className="mt-4 flex items-center">
              <input
                type="checkbox"
                id="variableGrowthToggle"
                className="mr-2"
                checked={useVariableGrowth}
                onChange={(e) => setUseVariableGrowth(e.target.checked)}
              />
              <label
                htmlFor="variableGrowthToggle"
                className="text-sm font-medium text-gray-700"
              >
                Use Variable Growth Rates
              </label>
            </div>
          </div>
        ) : (
          <>
            <div className="mt-4 flex items-center">
              <input
                type="checkbox"
                id="variableGrowthToggle"
                className="mr-2"
                checked={useVariableGrowth}
                onChange={(e) => setUseVariableGrowth(e.target.checked)}
              />
              <label
                htmlFor="variableGrowthToggle"
                className="text-sm font-medium text-gray-700"
              >
                Use Variable Growth Rates
              </label>
            </div>
            <div className="mb-4 p-4 border rounded bg-gray-50">
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
                    min="0"
                    max="100"
                    value={variableGrowthRates[index]}
                    onChange={(e) =>
                      handleGrowthRateChange(index, e.target.value)
                    }
                    required
                  />
                </div>
              ))}
            </div>
          </>
        )}

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Calculate
        </button>
      </form>
    </div>
  );
};

export default InputForm;
