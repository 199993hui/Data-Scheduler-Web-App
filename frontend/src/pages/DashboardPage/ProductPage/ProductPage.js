import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Data from "./data";
import DatePicker from "./components/DatePicker";
import CardData from "./chart/Card";
import Bchart_1 from "./chart/BarChart_1";
import Schart from "./chart/ScatterChart";
import HeatmapChart_Line from "./chart/HeatmapChart_Line";
import HeatmapChart_UPH_Line from "./chart/HeatmapChart_UPH_Line";

function ProductPage() {
  const [barData, setBarData] = useState([]);
  const [scatterData, setScatterData] = useState([]);
  const [heatmapData, setHeatmapData] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem("productPageData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setBarData(parsedData.barData);
      setScatterData(parsedData.scatterData);
      setHeatmapData(parsedData.heatmapData);
    }
  }, []);
  
  const get_Data = (data) => {

    const bChart = data.map((key, value) => {
      return {
        name: key.data["PRODUCT"],
        UPH: key.data["UPHBOT"],
      };
    });

    const sChart = data.map((key, value) => {
      return {
        name: key.data["DOUBLESIDED"].toString(),
        UPH: key.data["UPHBOT"],
      };
    });

    setBarData(bChart);
    setScatterData(sChart);
    setHeatmapData(data);

    const storedData = JSON.stringify({ barData: bChart, scatterData: sChart, heatmapData:data });
    localStorage.setItem("productPageData", storedData);
  };

  return (
    <>
      <DatePicker get_Data={get_Data} />
      {barData.length !== 0 ? (
        <>
          {barData.length !== 0 && <CardData cardData={barData} />}
          {barData.length !== 0 && <Bchart_1 barData={barData} />}
          {scatterData.length !== 0 && <Schart scatterData={scatterData} />}
          <Paper sx={{ width: "75%", overflow: "hidden", margin: "50px auto" }}>
            {(
              <HeatmapChart_Line heatmapData={heatmapData} />
            )}
            { (
              <HeatmapChart_UPH_Line heatmapData={heatmapData} />
            )}
          </Paper>
        </>
      ) : (
        <p>No Available Data</p>
      )}
    </>
  );
}

export default ProductPage;
