import React, { useEffect } from "react";
import ApexCharts from "react-apexcharts";

function GanttChart_Output({ data }) {
  useEffect(() => {
  }, []);
  let processed_data = Object.entries(
      data.reduce(function (curr, next) {
        if (!curr[next.product]) {
          curr[next.product] = [];
          curr[next.product] = [next];
        } else {
          curr[next.product].push(next);
        }

        return curr;
      }, {})
    ).map(([product_key, lines]) => {
      let schedule = lines.map((line) => {
        return {
          x: line.line,
          y: [new Date(line.start).getTime(), new Date(line.end).getTime()],
          order: line.work_order,
        };
      });

      return {
        name: product_key,
        data: schedule,
      }
    });

  

  const state = {
    series: Object.entries(
      data.reduce(function (curr, next) {
        if (!curr[next.product]) {
          curr[next.product] = [];
          curr[next.product] = [next];
        } else {
          curr[next.product].push(next);
        }

        return curr;
      }, {})
    ).map(([product_key, lines]) => {
      let schedule = lines.map((line) => {
        return {
          x: line.line,
          y: [new Date(line.start).getTime(), new Date(line.end).getTime()],
          order: line.work_order,
          product: line.product,
        };
      });

      return {
        name: product_key,
        data: schedule,
      };
    }),
    options: {
      chart: {
        height: 350,
        type: "rangeBar",
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: "50%",
          rangeBarGroupRows: true,
        },
      },
      colors: [
        "#008FFB",
        "#00E396",
        "#FEB019",
        "#FF4560",
        "#775DD0",
        "#3F51B5",
        "#546E7A",
        "#D4526E",
        "#8D5B4C",
        "#F86624",
        "#D7263D",
        "#1B998B",
        "#2E294E",
        "#F46036",
        "#E2C044",
      ],
      fill: {
        type: "solid",
      },

      tooltip: {
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
          var data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];

          return (
            "<ul>" +
            "<li><b>Line</b>: " +
            data.x +
            "</li>" +
            "<li><b>Product</b>: " +
            data.product +
            "</li>" +
            "<li><b>Work Order</b>: '" +
            data.order +
            "'</li>" +
            "<li><b>Time</b>: " +
            new Date(data.y[0])
              .toLocaleDateString("en-US", {
                weekday: "short",
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })
              .replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3") +
            " " +
            new Date(data.y[0]).toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            }) +
            " - " +
            new Date(data.y[1]).toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            }) +
            "</li>" +
            "</ul>"
          );
        },
      },

      xaxis: {
        type: "datetime",
        labels: {
          datetimeUTC: false,
        },
      },
      legend: {
        position: "right",
      },
    },
  };

  return (
    <div id="chart">
      <ApexCharts
        options={state.options}
        series={state.series}
        type="rangeBar"
        height={state.options.chart.height}
        width={state.options.chart.width}
        style={{ margin: "12px auto" }}
      />
    </div>
  );
}

export default GanttChart_Output;
