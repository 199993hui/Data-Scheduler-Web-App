import React, { useState, useEffect } from "react";
import DatePicker from "./components/DatePicker";
import GanttChart_Output from "./chart/GanttChart_Output";

function SchedulePage() {
  const [ganttData, setGanttData] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem("planPageData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setGanttData(parsedData);
    }
  }, []);

  const get_Data = (data) => {
    console.log(data);
    const ganttChart = data.map((key, value) => {
      const [hours, minutes] = key.data["STARTING TIME"].split(":");
      const dateObj = new Date();
      dateObj.setHours(hours);
      dateObj.setMinutes(minutes);

      const formatted_time = new Date();
      let cal_hour = dateObj.getHours() + parseInt(key.data["PLANNED HRS"]);

      cal_hour = cal_hour + ":" + dateObj.getMinutes();
      const [hour, minute] = cal_hour.split(":");
      formatted_time.setHours(hour);
      formatted_time.setMinutes(minute);
      
      return {
        start: dateObj,
        end: formatted_time,
        line: key.data["LINE"],
        work_order: key.data["WORK ORDER"],
        product: key.data["PRODUCT"],
        type: "task",
        isDisabled: false,
      };
    });
    setGanttData(ganttChart);
    localStorage.setItem("planPageData", JSON.stringify(ganttChart));
  };

  return (
    <>
      <DatePicker get_Data={get_Data} />
      {ganttData.length !== 0 ? <GanttChart_Output data={ganttData} /> : <>No Available Data</>}
    </>
  );
}

export default SchedulePage;
