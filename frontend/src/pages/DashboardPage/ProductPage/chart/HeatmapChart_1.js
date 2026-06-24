// Heatmap.js
import React from "react";
import HeatMap from "react-heatmap-grid";
import "./heatmap.css";

const Heatmap_1 = ({ heatmapData }) => {
  // Process raw data
  const processData = (rawData) => {
    const productData = {};
    rawData.forEach((item) => {
      const product = item.data.PRODUCT;
      const lines = [
        "LINE A",
        "LINE B",
        "LINE D",
        "LINE E",
        "LINE C",
        "LINE F",
        "LINE G",
        "LINE H",
        "LINE I",
        "LINE J",
        "LINE K",
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
    "Line A",
    "Line B",
    "Line D",
    "Line E",
    "Line C",
    "Line F",
    "Line G",
    "Line H",
    "Line I",
    "Line J",
    "Line K",
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
    <div className="heatmap" style={{ padding: "20px", marginBottom: "25px" }}>
        <HeatMap
          xLabels={xLabels}
          yLabels={yLabels}
          xLabelsStyle={{
            transform: "rotate(-90)",
          }}
          data={transposedData}
          // Customize cell styles
          cellStyle={(background, value, min, max, data, x, y) => ({
            background: `rgba(13, 84, 103, ${
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

export default Heatmap_1;
