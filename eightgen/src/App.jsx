import React, { useState } from "react";
import InputForm from "./components/Inputform";
import RevenueTable from "./components/Revenuetable";
import Summary from "./components/Summary";
import RevenueChart from "./components/Chart";

const App = () => {
  const [projections, setProjections] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [avgGrowth, setAvgGrowth] = useState(0);
  const [highlightYear, setHighlightYear] = useState(null); // Track highlighted year
  const [showModal, setShowModal] = useState(false);
  const [growthType, setGrowthType] = useState("constant");
  const [variableGrowthRates, setVariableGrowthRates] = useState([
    0, 0, 0, 0, 0,
  ]);
  const [currentRevenue, setCurrentRevenue] = useState(0);
  const [growthRate, setGrowthRate] = useState(0);

  const handleNewCalculation = () => {
    setProjections([]);
    setIsFormVisible(true);
    setCurrentRevenue(0);
    setGrowthRate(0);
    setVariableGrowthRates([0, 0, 0, 0, 0]);
  };

  const calculateProjections = (currentRevenue, growthRate) => {
    setCurrentRevenue(currentRevenue);
    setIsFormVisible(false);

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

    setHighlightYear(maxGrowthIndex);
    setProjections(revenueList);
    setTotalRevenue(total);

    const avgGrowth =
      ((revenueList[revenueList.length - 1] / currentRevenue) ** (1 / 5) - 1) *
      100;
    setAvgGrowth(avgGrowth);

    setShowModal(true);
  };

  const handleFormSubmit = () => {
    setIsFormVisible(false);
  };

  const calculateVariableProjections = (
    currentRevenue,
    variableGrowthRates
  ) => {
    setIsFormVisible(false);
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

  // Function to generate and download CSV
  const downloadCSV = () => {
    "Instructions, Please adjust the column widths manually for better readability.";

    if (projections.length === 0) {
      alert("No data available to download.");
      return;
    }

    const paddedValue = (value, width) => {
      const strValue = value.toString();
      const padding = " ".repeat(Math.max(0, width - strValue.length));
      return `${strValue}${padding}`;
    };

    const headers = [
      "Year",
      "Projected Revenue",
      "Dollar Growth",
      "Percentage Growth (%)",
    ];

    const instructions = [
      "Instructions: Adjust column widths in your spreadsheet software for better readability.",
    ];

    let revenue = currentRevenue;
    const rows = projections.map((projRevenue, index) => {
      const dollarGrowth = projRevenue - revenue;
      const percentageGrowth = (dollarGrowth / revenue) * 100;

      const row = [
        paddedValue(`Year ${index + 1}`, 10),
        paddedValue(projRevenue.toFixed(2), 15),
        paddedValue(dollarGrowth.toFixed(2), 15),
        paddedValue(percentageGrowth.toFixed(2), 20),
      ];

      revenue = projRevenue; // Update for the next iteration
      return row;
    });

    // Adding a detailed summary section
    const summaryRows = [
      [],
      ["Summary"],
      ["Initial Revenue", currentRevenue.toFixed(2)],
      [
        "Growth Type",
        growthType === "constant" ? "Constant Growth" : "Variable Growth",
      ],
      ...(growthType === "variable"
        ? [
            ["Variable Growth Rates", variableGrowthRates.join("%, ") + "%"], // Show variable rates if applicable
          ]
        : [["Constant Growth Rate (%)", growthRate]]),
      ["Year of highest growth", `Year ${highlightYear + 1}`],
      ["Total Revenue", totalRevenue.toFixed(2)],
      ["Average Annual Growth Rate (%)", avgGrowth.toFixed(2)],
    ];

    const csvContent = [instructions, headers, ...rows, ...summaryRows]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "projections_summary.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const Modal = ({ message, onClose }) => {
    return (
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50"
        onClick={onClose}
      >
        <div
          className="bg-white p-6 rounded shadow-lg flex flex-col items-center"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-2xl font-bold text-center mb-1">{message}</h2>
          <button
            onClick={onClose}
            className="bg-blue-500 text-white py-2 px-4 rounded-xl hover:bg-blue-600 mt-4"
          >
            Close
          </button>
        </div>
      </div>
    );
  };

  return (
    <div
      className="container mx-auto px-4 sm:px-6 lg:px-8 min-h-screen pt-4 pb-10"
      style={{
        backgroundImage: "url('/background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >

      {isFormVisible && (
        <>
        <h1
        className="text-4xl sm:text-4xl lg:text-7xl pb-10 md:mb-7 font-bold text-green-500 text-center pt-10 "
        style={{ fontFamily: "Cinzel, serif" }}
      >
        Revenue Upside Calculator
      </h1>
        <InputForm
          onCalculate={calculateProjections}
          onVariableGrowthCalculate={calculateVariableProjections}
          setGrowthType={setGrowthType}
          setCurrentRevenue={setCurrentRevenue}
          currentRevenue={currentRevenue}
          setGrowthRate={setGrowthRate}
          growthRate={growthRate}
        />
         </>
      )}

      {projections.length > 0 && (
        <div className="space-y-6">
          <Summary
            totalRevenue={totalRevenue}
            avgGrowth={avgGrowth}
            highlightYear={highlightYear}
            currentRevenue={currentRevenue}
          />
          <RevenueTable
            projections={projections}
            highlightYear={highlightYear}
            growthType={growthType}
            variableGrowthRates={variableGrowthRates}
            currentRevenue={currentRevenue}
            growthRate={growthRate}
            setGrowthRate={setGrowthRate}
          />
          <RevenueChart
            projections={projections}
            highlightYear={highlightYear}
          />
          <div className="flex justify-center mt-4">
            <button
              onClick={downloadCSV}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full sm:w-auto mt-6"
            >
              Download as CSV File
            </button>
          </div>

          {!isFormVisible && (
            <div className="flex justify-center mt-4">
              <button
                onClick={handleNewCalculation}
                className="bg-amber-500 text-white py-2 px-4 rounded hover:bg-amber-600 w-full sm:w-auto mt-6"
              >
                New Calculation
              </button>
            </div>
          )}
        </div>
      )}

      {showModal && (
        <Modal
          message="Calculation Completed!"
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default App;
