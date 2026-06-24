import React from "react";
import { useState, useEffect } from "react";
import ApexCharts from "react-apexcharts";
import Button from "@mui/material/Button";
import "./button.css";

const LineChart = ({ data, selectedFeature, select_ScaledFeature }) => {
  const [lineData1, setLineData1] = useState([]);
  const [lineData2, setLineData2] = useState([]);

  useEffect(() => {
    const storedLineData1 = JSON.parse(localStorage.getItem("clusterLine1"));
    const storedLineData2 = JSON.parse(localStorage.getItem("clusterLine2"));

    if (storedLineData1 && storedLineData2) {
      setLineData1(storedLineData1);
      setLineData2(storedLineData2);
    }
  }, []);

  const fetchData = async () => {
    const features = Object.keys(
      Object.fromEntries(
        Object.entries(selectedFeature).filter((features) => {
          return features[1];
        })
      )
    );

    const formData = new FormData();

    formData.append("features", features);
    formData.append("scaled_df", data);

    await fetch("http://localhost:5000/clustering", {
      method: "POST",
      body: JSON.stringify({
        features: features,
        scaled_df: data,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const list1 = data[0].map((number) => number.toFixed(4));
        const list2 = data[1].map((number) => number.toFixed(4));
        setLineData1(list1);
        setLineData2(list2);
        select_ScaledFeature(data[2]);

        localStorage.setItem("clusterLine1", JSON.stringify(list1));
        localStorage.setItem("clusterLine2", JSON.stringify(list2));

      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const series = [
    {
      name: "Elbow Method",
      data: lineData1,
    },
    {
      name: "Silhouette Score",
      data: lineData2,
    },
  ];
  const options = {
    chart: {
      height: 350,
      type: "line",
      dropShadow: {
        enabled: true,
        color: "#000",
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2,
      },
      toolbar: {
        show: false,
      },
    },
    colors: ["#AEC6CF", "#FFB6C1"],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    title: {
      text: "Evaluation Metric on Number of Cluster",
      align: "left",
    },
    grid: {
      borderColor: "#e7e7e7",
      row: {
        colors: ["#f3f3f3", "transparent"],
        opacity: 0.5,
      },
    },
    markers: {
      size: 1,
    },
    xaxis: {
      categories: ["2", "3", "4", "5", "6", "7", "8", "9", "10"],
      title: {
        text: "Number of Clusters",
      },
    },
    yaxis: {
      title: {
        text: "Inertia / Score",
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      floating: true,
      offsetY: -25,
      offsetX: -5,
    },
  };

  let length = Object.entries(selectedFeature).length;
  if (length > 0) {
    length = Object.entries(selectedFeature).filter((entries) => {
      return entries[1];
    }).length;
  }

  return (
    <div>
      <ApexCharts
        options={options}
        series={series}
        type="line"
        height={options.chart.height}
        width={options.chart.width}
        style={{ margin: "12px auto" }}
      />
      <Button
        disabled={!length}
        style={{
          marginLeft: "auto",
          display: "block",
          color: "#052129",
        }}
        onClick={fetchData}
      >
        Plot
      </Button>
    </div>
  );
};

export default LineChart;
