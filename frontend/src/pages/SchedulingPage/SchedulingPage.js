import React, { useState, useEffect } from "react";

import DatePicker from "./components/DatePicker";
import GanttChart_algo from "./components/GanttChart_algo";


const SchedulingPage = () => {
  const [ganttData, setGanttData] = useState([]);
  useEffect(() => {
    const storedData = localStorage.getItem("ganttData");
    if (storedData) {
      setGanttData(JSON.parse(storedData));
    }
  }, []);
  const get_Data = (data) => {
    const ganttChart = data.map((key, value) => {
      return {
        start: key.data["START"],
        end: key.data["END"],
        line: key.data["LINE"],
        work_order: key.data["WORK ORDER"],
        product: key.data["PRODUCT"],
        type: "task",
        isDisabled: false,
      };
    });
    setGanttData(ganttChart);
    localStorage.setItem("ganttData", JSON.stringify(ganttChart));
  };
  return (
    <>
      <DatePicker get_Data={get_Data} />
      {ganttData.length !== 0 ? <GanttChart_algo data={ganttData} /> : <>No Available Data</>}
    </>
  );
};

export default SchedulingPage;
