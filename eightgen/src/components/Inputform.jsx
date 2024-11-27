import React, { useState } from "react";

const InputForm = ({
  onCalculate,
  onVariableGrowthCalculate,
  setCurrentRevenue,
  currentRevenue,
  growthRate,
  setGrowthRate,
}) => {
  const [variableGrowthRates, setVariableGrowthRates] = useState([
    0, 0, 0, 0, 0,
  ]); // Default rates
  const [useVariableGrowth, setUseVariableGrowth] = useState(false);
  const [error, setError] = useState("");

  const handleConstantSubmit = (e) => {
    e.preventDefault();
    if (!currentRevenue || growthRate <= 0) {
      setError("Please enter a positive growth rate.");
      return;
    }
    setError("");
    onCalculate(Number(currentRevenue), Number(growthRate));
  };

  const handleVariableSubmit = (e) => {
    e.preventDefault();
    if (!currentRevenue) {
      setError("Please enter a valid revenue.");
      return;
    }
    setError("");
    onVariableGrowthCalculate(
      Number(currentRevenue),
      variableGrowthRates.map(Number)
    );
  };

  const handleGrowthRateChange = (index, value) => {
    const newRates = [...variableGrowthRates];
    newRates[index] = parseFloat(value) || 0; // Ensure numeric value
    setVariableGrowthRates(newRates);
  };

  const getSliderGradient = (value) => {
    return `linear-gradient(to right, #FE2926 ${value}%,#f6d365 ${value}%, #fda085 100%)`;
  };

  return (
    <div className=" p-5 border rounded-3xl bg-blue-100 bg-opacity-50">
      <form
        onSubmit={
          useVariableGrowth ? handleVariableSubmit : handleConstantSubmit
        }
        className="space-y-4"
      >
        <div>
          <label
            htmlFor="currentRevenue"
            className="block text-lg font-medium text-gray-900"
          >
            Current Revenue:
          </label>
          <input
            id="currentRevenue"
            type="number"
            value={currentRevenue || ""}
            onChange={(e) => setCurrentRevenue(e.target.value)}
            className="mt-3 py-3 pl-2 block w-full border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-[#C5FCFF]"
            min="0"
            placeholder="Enter current revenue"
            required
          />
        </div>

        {!useVariableGrowth ? (
          <div>
            <label
              htmlFor="growthRate"
              className="block text-lg font-medium text-gray-700"
            >
              Annual Growth Rate:
            </label>
            <input
              id="growthRate"
              type="range"
              value={growthRate}
              onChange={(e) => setGrowthRate(e.target.value)}
              min="0"
              max="100"
              step="1"
              style={{
                background: getSliderGradient(growthRate),
              }}
              className="w-full appearance-none h-2 rounded-full"
            />
            <p className="text-sm text-gray-600 mt-1">{growthRate}%</p>
          </div>
        ) : (
          <div>
            <h2 className="text-lg font-semibold mb-2">
              Enter Custom Growth Rates for Each Year:
            </h2>
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="mb-6">
                <label
                  htmlFor={`growthRate-${index}`}
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Year {index + 1} Growth Rate (%):
                </label>
                <input
                  id={`growthRate-${index}`}
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value={variableGrowthRates[index]}
                  onChange={(e) =>
                    handleGrowthRateChange(index, e.target.value)
                  }
                  style={{
                    background: getSliderGradient(variableGrowthRates[index]),
                  }}
                  className="w-full appearance-none h-2 rounded-full"
                />
                <p className="text-sm text-gray-600 mt-1 text-center">
                  {variableGrowthRates[index]}%
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center">
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

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 w-full lg:w-96 rounded mx-auto hover:bg-blue-600 mt-4"
          >
            Calculate
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputForm;
