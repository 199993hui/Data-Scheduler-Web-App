import React, { useEffect } from "react";
import Plotly from "plotly.js-dist";

function Histogram_Chart({ data, selectedHist }) {
  const hist = data.map((line) => {
    return line[selectedHist];
  });
  
  useEffect(() => {

    const trace = {
      x: hist,
      type: "histogram",
    };
    const histData = [trace];
    const layout = {
      bargap: 0.01,
      title: selectedHist,
      xaxis: { title: "Value" },
      yaxis: { title: "Count" },
    };
    Plotly.newPlot("hist", histData, layout);
  }, [selectedHist]);

  return (
    <div className="App" style={{ height: 300 }}>
      <div id="hist"></div>
    </div>
  );
}

export default Histogram_Chart;
