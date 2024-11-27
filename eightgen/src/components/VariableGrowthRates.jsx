import React from "react";

const InputSlider = ({
  value,
  min,
  max,
  step,
  onChange,
  formatLabel = (val) => val, // Customizable label format
}) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">{formatLabel(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full cursor-pointer appearance-none bg-gray-200 rounded-full h-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        style={{
          background: `linear-gradient(to right, #3b82f6 ${(value - min) / (max - min) * 100}%, #e5e7eb ${(value - min) / (max - min) * 100}%)`,
        }}
      />
    </div>
  );
};

const App = () => {
  const [slider1, setSlider1] = React.useState(75);
  const [slider2, setSlider2] = React.useState(200);
  const [rangeValues, setRangeValues] = React.useState([-220, 400]);

  return (
    <div className="p-8">
      {/* Single Slider */}
      <InputSlider
        value={slider1}
        min={0}
        max={100}
        step={1}
        onChange={setSlider1}
        formatLabel={(val) => val}
      />

      {/* Single Slider with Custom Label */}
      <InputSlider
        value={slider2}
        min={0}
        max={10000}
        step={100}
        onChange={setSlider2}
        formatLabel={(val) => `$${val}`}
      />

      {/* Range Slider */}
      <div className="mb-6 relative">
        <input
          type="range"
          min={-500}
          max={500}
          value={rangeValues[0]}
          onChange={(e) =>
            setRangeValues([Number(e.target.value), rangeValues[1]])
          }
          className="absolute left-0 top-1/2 -translate-y-1/2 w-full z-10"
          step={10}
          style={{
            background: `linear-gradient(to right, #3b82f6 ${
              ((rangeValues[0] - -500) / 1000) * 100
            }%, #e5e7eb ${
              ((rangeValues[0] - -500) / 1000) * 100
            }%, #3b82f6 ${
              ((rangeValues[1] - -500) / 1000) * 100
            }%, #e5e7eb ${
              ((rangeValues[1] - -500) / 1000) * 100
            }%)`,
          }}
        />
        <input
          type="range"
          min={-500}
          max={500}
          value={rangeValues[1]}
          onChange={(e) =>
            setRangeValues([rangeValues[0], Number(e.target.value)])
          }
          className="absolute left-0 top-1/2 -translate-y-1/2 w-full z-20"
          step={10}
        />
        <div className="flex justify-between text-sm font-medium mt-8">
          <span>{`${rangeValues[0]}%`}</span>
          <span>{`${rangeValues[1]}%`}</span>
        </div>
      </div>
    </div>
  );
};

export default App;
