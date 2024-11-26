import React, { useState } from "react";
import InputForm from "./components/Inputform";
import RevenueTable from "./components/Revenuetable";
import Summary from "./components/Summary";
import RevenueChart from "./components/Chart";

const App = () => {
  const [projections, setProjections] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [avgGrowth, setAvgGrowth] = useState(0);
  const [highlightYear, setHighlightYear] = useState(null); // Track highlighted year
  const [showModal, setShowModal] = useState(false);
  const [growthType, setGrowthType] = useState("constant");
  const [variableGrowthRates, setVariableGrowthRates] = useState([0, 0, 0, 0, 0]);
  const [currentRevenue, setCurrentRevenue] = useState(0);

  const calculateProjections = (currentRevenue, growthRate) => {
    setCurrentRevenue(currentRevenue);

    if (currentRevenue <= 0 || growthRate <= 0) {
      alert("Inputs must be positive numbers.");
      return;
    }

    let revenueList = [];
    let growthList = [];
    let dollarGrowthList = [];
    let revenue = currentRevenue;
    let total = 0;

    for (let i = 0; i < 5; i++) {
      const prevRevenue = i === 0 ? currentRevenue : revenueList[i - 1];
      revenue *= 1 + growthRate / 100;
      revenueList.push(revenue);

      growthList.push(((revenue - prevRevenue) / prevRevenue) * 100);
      dollarGrowthList.push(revenue - prevRevenue);

      total += revenue;
    }

    const maxGrowthIndex = dollarGrowthList.indexOf(
      Math.max(...dollarGrowthList)
    );

    setHighlightYear(maxGrowthIndex); // Set highlightYear
    setProjections(revenueList);
    setTotalRevenue(total);

    const avgGrowth =
      ((revenueList[revenueList.length - 1] / currentRevenue) ** (1 / 5) - 1) *
      100;
    setAvgGrowth(avgGrowth);

    setShowModal(true);
  };

  const calculateVariableProjections = (currentRevenue, variableGrowthRates) => {
    if (currentRevenue <= 0) {
      alert("Current revenue must be a positive number.");
      return;
    }

    let revenueList = [currentRevenue];
    let total = currentRevenue;
    let dollarGrowthList = [0];

    for (let i = 0; i < 5; i++) {
      const prevRevenue = revenueList[i];
      const growthRate = variableGrowthRates[i] / 100;
      const newRevenue = prevRevenue * (1 + growthRate);

      revenueList.push(newRevenue);
      dollarGrowthList.push(newRevenue - prevRevenue);
      total += newRevenue;
    }

    revenueList = revenueList.slice(1);
    dollarGrowthList = dollarGrowthList.slice(1);

    const maxGrowthIndex = dollarGrowthList.indexOf(
      Math.max(...dollarGrowthList)
    );

    setHighlightYear(maxGrowthIndex); // Set highlightYear
    setProjections(revenueList);
    setTotalRevenue(total);

    const avgGrowth =
      ((revenueList[revenueList.length - 1] / currentRevenue) ** (1 / 5) - 1) *
      100;
    setAvgGrowth(avgGrowth);

    setShowModal(true);
  };

  const Modal = ({ message, onClose }) => {
    return (
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50"
        onClick={onClose}
      >
        <div
          className="bg-white p-6 rounded shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-xl font-bold mb-4">{message}</h2>
          <button
            onClick={onClose}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-40">
      <h1 className="text-5xl mb-6 font-bold text-blue-600">
        Revenue Upside Calculator
      </h1>

      {/* Input Forms below the current revenue section */}
      <InputForm
        onCalculate={calculateProjections}
        onVariableGrowthCalculate={calculateVariableProjections}
        setGrowthType={setGrowthType}
      />

      {/* Show Results only after calculation */}
      {projections.length > 0 && (
        <>
          <RevenueTable
            projections={projections}
            highlightYear={highlightYear} // Pass highlightYear to RevenueTable
            growthType={growthType}
            variableGrowthRates={variableGrowthRates}
          />
          <Summary totalRevenue={totalRevenue} avgGrowth={avgGrowth} />
          <RevenueChart
            projections={projections}
            highlightYear={highlightYear} 
            setHighlightYear={setHighlightYear} 
          />
        </>
      )}

      {showModal && (
        <Modal
          message="Calculation complete!"
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default App;
