import React from "react";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const BarChart = ({
  categoricalData,
  selectedCategorical,
  number_of_cluster,
}) => {
  const [category, setCategory] = useState([]);
  const [cluster_point, setCluster_point] = useState([]);
  const categorical = () => {
    let [categorical] = categoricalData;
    if (categorical !== undefined) {
      let processed_categorical = categorical.reduce((current, next) => {
        if (!current[next[selectedCategorical]]) {
          current[next[selectedCategorical]] = [];
          current[next[selectedCategorical]].push(next);
        } else {
          current[next[selectedCategorical]].push(next);
        }
        return current;
      }, {});

      const cluster = Object.entries(processed_categorical).map((attr) => {
        let data = attr[1];
        let categorical = data.reduce((current, next) => {
          if (!current[next.cluster]) {
            current[next.cluster] = [];
            current[next.cluster].push(next);
          } else {
            current[next.cluster].push(next);
          }
          return current;
        }, {});

        let lengths = [];
        let category = [];
        for (let i = 1; i <= Number(number_of_cluster); i++) {
          if (!categorical[i]) {
            lengths.push(0);
          } else {
            lengths.push(categorical[i].length);
          }
          category.push(i);
        }
        setCategory(category);
        return {
          name: attr[0],
          data: lengths,
        };
      });

      setCluster_point(cluster);
    }
  };

  useEffect(() => {
    console.log(selectedCategorical);
    categorical();
  }, [selectedCategorical, categoricalData, number_of_cluster]);

  const options = {
    chart: {
      type: "bar",
      height: 350,
      stacked: true,
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: true,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
            offsetX: -10,
            offsetY: 0,
          },
          colors: [
            "#FFB6C1",
            "#00BFFF",
            "#FFC3A0",
            "#FFD700",
            "#D9B8E8",
            "#AEC6CF",
            "#0abab5",
            "#FBE7C6",
            "#FF6B6B",
          ],
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 10,
        dataLabels: {
          total: {
            enabled: true,
            style: {
              fontSize: "13px",
              fontWeight: 900,
            },
          },
        },
      },
    },
    xaxis: {
      type: "category",
      categories: category,
    },
    legend: {
      position: "right",
      offsetY: 40,
    },
    fill: {
      opacity: 1,
    },
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={cluster_point}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default BarChart;
