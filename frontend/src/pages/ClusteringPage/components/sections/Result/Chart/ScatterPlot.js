import React from "react";
import { useState } from "react";
import ReactApexChart from "react-apexcharts";

const ScatterPlot = ({ data, selectedNumerical_1, selectedNumerical_2 }) => {
  const cluster_point = Object.entries(data).map((attr) => {
    return {
      name: attr[0],
      data: attr[1].map((point) => {
        return [point[selectedNumerical_1], point[selectedNumerical_2]];
      }),
    };
  });

  const colorPalette = [
    "#FFB6C1",
    "#00BFFF",
    "#FFC3A0",
    "#FFD700",
    "#D9B8E8",
    "#AEC6CF",
    "#0abab5",
    "#FBE7C6",
    "#FF6B6B",
  ];

  const [chartData, setChartData] = useState({
    options: {
      chart: {
        height: 350,
        type: "scatter",
        zoom: {
          enabled: true,
          type: "xy",
        },
      },
      xaxis: {
        tickAmount: 10,
        labels: {
          formatter: function (val) {
            return parseFloat(val).toFixed(1);
          },
        },
      },
      yaxis: {
        tickAmount: 7,
      },
      colors: colorPalette,
    },
  });

  return (
    <div id="chart">
      <ReactApexChart
        options={chartData.options}
        series={cluster_point}
        type="scatter"
        height={350}
      />
    </div>
  );
};

export default ScatterPlot;
