import React, { useState, useEffect } from "react";

import DateRange from "./components/DateRange";
import CardData from "./chart/Card";
import BBchart from "./chart/BiaxialBarChart";
import SChart from "./chart/ScatterChart";
import LineChart from "./chart/LineChart";

function OrderPage() {
  const [bbarData, setBBarData] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem("orderPageData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setBBarData(parsedData);
    }
  }, []);

  const get_Data = (data) => {
    const chartData = data.reduce((curr, next) => {
      if (curr[next.data["PRODUCT"]] === undefined) {
        curr[next.data["PRODUCT"]] = [];
        curr[next.data["PRODUCT"]].push(next.data["ORDER QTY"]);
        curr[next.data["PRODUCT"]].push(1);
        return curr;
      } else if (curr[next.data["PRODUCT"]] !== undefined) {
        curr[next.data["PRODUCT"]][0] += next.data["ORDER QTY"];
        curr[next.data["PRODUCT"]][1] += 1;
        return curr;
      }
    }, {});

    const bbChart = Object.entries(chartData).map((key, value) => {
      return {
        name: key[0],
        "Total Order Quantity": key[1][0],
        "No. of Order": key[1][1],
      };
    });

    const bChart_1 = Object.entries(chartData).map((key, value) => {
      return {
        name: key[0],
        "Total Order Quantity": key[1][0],
      };
    });

    const bChart_2 = Object.entries(chartData).map((key, value) => {
      return {
        name: key[0],
        "No. of Order": key[1][0],
      };
    });

    setBBarData(bbChart);
    localStorage.setItem("orderPageData", JSON.stringify(bbChart));
  };

  return (
    <>
      <DateRange get_Data={get_Data} />
      {bbarData.length !== 0 ? (
        <>
          {bbarData.length !== 0 && <CardData cardData={bbarData} />}
          {bbarData.length !== 0 && <BBchart bbarData={bbarData} />}
          {bbarData.length !== 0 && <SChart scatterData={bbarData} />}
          <LineChart />
        </>
      ) : (
        <div style={{ paddingTop: "40px" }}>
          <p>No Available Data</p>
        </div>
      )}
    </>
  );
}

export default OrderPage;
