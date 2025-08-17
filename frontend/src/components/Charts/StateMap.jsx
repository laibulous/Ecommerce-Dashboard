import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleLinear } from "d3-scale";

// US states topojson (free)
const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

// Example data
const stateData = [
  { state: "California", revenue: 72000 },
  { state: "Texas", revenue: 55000 },
  { state: "Florida", revenue: 48000 },
  { state: "New York", revenue: 61000 },
  { state: "Illinois", revenue: 32000 },
  { state: "Pennsylvania", revenue: 25000 },
  { state: "Ohio", revenue: 28000 },
  { state: "Georgia", revenue: 35000 },
  { state: "North Carolina", revenue: 30000 },
  { state: "Michigan", revenue: 26000 },
  {state:"Wisconsin", revenue: 50000}
];

// Map state names to revenue
const revenueByState = {};
stateData.forEach(d => {
  revenueByState[d.state.toUpperCase()] = d.revenue;
});

// Find min & max revenue
const revenues = stateData.map(d => d.revenue);
const colorScale = scaleLinear()
  .domain([Math.min(...revenues), Math.max(...revenues)])
  .range(["#d1fae5", "#065f46"]); // light to dark green

const StateMap = () => {
  return (
  <div className="chart-container">
  <div className="flex items-center justify-between mb-6">
    <h2 className="text-lg font-semibold text-dashboard-text-primary">
      Ecommerce Revenue by State
    </h2>
  </div>

  {/* Responsive Map Container */}
  <div className="w-full h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px]">
    <ComposableMap projection="geoAlbersUsa">
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => {
            const cur = revenueByState[geo.properties.name.toUpperCase()];
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={cur ? colorScale(cur) : "#c4bcbcff"}
                stroke="#ffffffff"
                onMouseEnter={() => {
                  console.log(`${geo.properties.name}: ${cur || "No data"}`);
                }}
                style={{
                  default: { outline: "none" },
                  hover: { fill: "#627BC1", outline: "none" },
                  pressed: { outline: "none" },
                }}
              />
            );
          })
        }
      </Geographies>
    </ComposableMap>
  </div>
</div>


  );
};

export default StateMap;
