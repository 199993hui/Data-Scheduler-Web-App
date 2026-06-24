import React from "react";
import ApexCharts from "react-apexcharts";
import "./heatmap.css";

function HeatmapChart_Line({ heatmapData }) {

  const state = {
    series: heatmapData.map(({ data }) => {
      let filter_data = Object.entries(data)
        .filter(([line, value]) => {
          const pattern = /^LINE/;
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
        height: 1000,
        width: "70%",
        type: "heatmap",
      },
      dataLabels: {
        enabled: true,
        style: {
          colors: ["#000"], // Set the color of the labels
        },
      },
      colors: ["#19a7ce"],
      title: {
        text: "Machine Priority",
      },
      xaxis: {
        type: "category",
        categories: [
          "LINE 1",
          "LINE 2",
          "LINE 31",
          "LINE 32",
          "LINE 4",
          "LINE 51",
          "LINE 52",
          "LINE 61",
          "LINE 62",
          "LINE 71",
          "LINE 81",
        ],
      },
    },
  };

  return (
    <div id="chart">
      <ApexCharts
        options={state.options}
        series={state.series}
        type="heatmap"
        height={state.options.chart.height}
        width={state.options.chart.width}
        style={{ margin: "12px auto" }}
      />
    </div>
  );
}

export default HeatmapChart_Line;
