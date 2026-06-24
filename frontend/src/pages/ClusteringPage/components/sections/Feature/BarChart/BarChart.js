import React, { useEffect } from "react";
import Plotly from "plotly.js-dist";

function BarChart({ data, selectedBar }) {
  
  const bar = data.map((line) => {
    return line[selectedBar];
  });

  useEffect(() => {
    const groupedData = bar.reduce((acc, curr) => {
      acc[curr] = (acc[curr] || 0) + 1;
      return acc;
    }, {});

    const barData = [
      {
        x: Object.keys(groupedData),
        y: Object.values(groupedData),
        type: "bar",
        // marker: {
        //   color: [
        //     "#FBE7C6",
        //     "#FFC3A0",
        //     "#FFD700",
        //     "#D9B8E8",
        //     "#AEC6CF",
        //     "#FFB6C1",
        //     "#0abab5",
        //     "#00BFFF",
        //     "#FF6B6B",
        //   ], // Add your custom colors here
        // },
      },
    ];

    const layout = {
      title: selectedBar,
      yaxis: { title: "Count" },
    };

    Plotly.newPlot("bar", barData, layout);
  }, [selectedBar]);

  return (
    <div className="App" style={{ height: 300 }}>
      <div id="bar"></div>
    </div>
  );
}

export default BarChart;
