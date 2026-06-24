import React from "react";
import ApexCharts from "react-apexcharts";

function HeatmapChart_UPH_Line({ heatmapData }) {

  const state = {
    series: heatmapData.map(({ data }) => {
      let filter_data = Object.entries(data)
        .filter(([line, value]) => {
          const pattern = /^UPH LINE/;
          if (pattern.test(line)) {
            return true;
          }
        })
        .map(([line, value]) => {
          return { x: line, y: value };
        });

      return { name: data["PRODUCT"], data: filter_data };
    }),

    options: {
      chart: {
        height: 800,
        width: "70%",
        type: "heatmap",
      },
      dataLabels: {
        enabled: true,
        style: {
          colors: ["#000"],
        },
      },
      colors: ["#82AAE3"],
      title: {
        text: "Machine UPH",
      },
      xaxis: {
        type: "category",
        categories: [
          "UPH LINE 1",
          "UPH LINE 2",
          "UPH LINE 31",
          "UPH LINE 32",
          "UPH LINE 4",
          "UPH LINE 51",
          "UPH LINE 52",
          "UPH LINE 61",
          "UPH LINE 62",
          "UPH LINE 71",
          "UPH LINE 81",
        ],
      },
    },
  };

  return (
    <div id="chart" style={{ flex: 1 }}>
      <ApexCharts
        options={state.options}
        series={state.series}
        type="heatmap"
        height={state.options.chart.height}
        width={state.options.chart.width}
      />
    </div>
  );
}

export default HeatmapChart_UPH_Line;
