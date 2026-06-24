// Heatmap.js
import React from "react";
import HeatMap from "react-heatmap-grid";
import "./heatmap.css";

const Heatmap_2 = ({ heatmapData }) => {
  // Process raw data
  const processData = (rawData) => {
    const productData = {};
    rawData.forEach((item) => {
      const product = item.data.PRODUCT;
      const lines = [
        "UPH LINE A",
        "UPH LINE B",
        "UPH LINE D",
        "UPH LINE E",
        "UPH LINE C",
        "UPH LINE F",
        "UPH LINE G",
        "UPH LINE H",
        "UPH LINE I",
        "UPH LINE J",
        "UPH LINE K",
      ];
      lines.forEach((line) => {
        if (!productData[product]) {
          productData[product] = [];
        }
        productData[product].push(item.data[line]);
      });
    });
    return productData;
  };

  const processedData = processData(heatmapData);

  // Generate labels for x and y axis
  const xLabels = Object.keys(processedData);
  const yLabels = [
    "UPH A",
    "UPH B",
    "UPH D",
    "UPH E",
    "UPH C",
    "UPH F",
    "UPH G",
    "UPH H",
    "UPH I",
    "UPH J",
    "UPH K",
  ];

  // Generate heatmap data
  const heatmap_Data = xLabels.map((product) => processedData[product]);
  function transposeMatrix(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;
    const result = [];

    for (let x = 0; x < cols; x++) {
      const newRow = [];
      for (let y = 0; y < rows; y++) {
        newRow.push(matrix[y][x]);
      }
      result.push(newRow);
    }

    return result;
  }

  const transposedData = transposeMatrix(heatmap_Data);

  return (
    <div className="heatmap" style={{ padding: "20px" }}>
        <HeatMap
          xLabels={xLabels}
          yLabels={yLabels}
          xLabelsStyle={{
            transform: "rotate(-90)",
          }}
          data={transposedData}
          // Customize cell styles
          cellStyle={(background, value, min, max, data, x, y) => ({
            background: `rgba(91, 134, 128, ${
              1 - (max - value) / (max - min) + 0.05
            })`,
            fontSize: "11px",
          })}
          // Customize cell tooltips
          cellRender={(value) => (value ? `${value}` : "")}
        />
    </div>
  );
};

export default Heatmap_2;
