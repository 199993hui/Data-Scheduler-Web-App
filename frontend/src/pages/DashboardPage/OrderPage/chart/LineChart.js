import React from "react";
import ApexCharts from "react-apexcharts";
import LineData from "../line_data";
import { useState } from "react";
import Paper from "@mui/material/Paper";
import { ResponsiveContainer } from "recharts";

const LineChart = () => {
  const [totalOrder, setTotalOrder] = useState([]);
  const [order, setOrder] = useState([]);
  const [date, setDate] = useState();

  const series = [
    {
      name: "Total Order Quantity",
      data: totalOrder,
    },
    {
      name: "No of Order",
      data: order,
    },
  ];

  function setLineChartTotalOrder(totalOrder) {
    setTotalOrder(totalOrder);
  }

  function setLineChartOrder(no_Order) {
    setOrder(no_Order);
  }

  function setLineChartDate(date) {
    setDate(date);
  }

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
      enabled: true,
    },
    stroke: {
      curve: "straight",
    },
    title: {
      text: "Total Order in Latest 5 Days",
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
      categories: date,
      title: {
        text: "Date",
      },
    },
    yaxis: {
      title: {
        text: "Frequency",
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

  return (
    <Paper sx={{ width: "75%", overflow: "hidden", margin: "50px auto" }}>
      <LineData
        setLineChartTotalOrder={setLineChartTotalOrder}
        setLineChartOrder={setLineChartOrder}
        setLineChartDate={setLineChartDate}
      />
      <div
        id="chart"
        style={{ margin: "12px auto", width: "80%", height: "400px" }}
      >
        <ResponsiveContainer>
          <ApexCharts
            options={options}
            series={series}
            type="line"
            height={350}
            width={900}
            style={{ margin: "12px auto" }}
          />
        </ResponsiveContainer>
      </div>
    </Paper>
  );
};

export default LineChart;
