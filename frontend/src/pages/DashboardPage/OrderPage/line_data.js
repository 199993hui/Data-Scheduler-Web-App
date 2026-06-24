import { useEffect, useState } from "react";

function LineData({
  setLineChartTotalOrder,
  setLineChartOrder,
  setLineChartDate,
}) {
  const getData = async () => {
    try {
      await fetch("http://127.0.0.1:5000/line_data")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const parsedData = JSON.parse(data);

          const chartData = parsedData.reduce((curr, next) => {
            if (curr[next.date] === undefined) {
              curr[next.date] = [];
              curr[next.date].push(next.data["ORDER QTY"]);
              curr[next.date].push(1);
              return curr;
            } else if (curr[next.date] !== undefined) {
              curr[next.date][0] += next.data["ORDER QTY"];
              curr[next.date][1] += 1;
              return curr;
            }
          }, {});

          const lineChart = Object.entries(chartData).map((key, value) => {
            return {
              date: key[0],
              "Total Order Quantity": key[1][0],
              "No. of Order": key[1][1],
            };
          });

          const dates = lineChart.map((item) => item.date);
          const totalOrder = lineChart.map(
            (item) => item["Total Order Quantity"]
          );
          const no_Order = lineChart.map((item) => item["No. of Order"]);

          setLineChartTotalOrder(totalOrder);
          setLineChartOrder(no_Order);
          setLineChartDate(dates);
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return <></>;
}

export default LineData;
