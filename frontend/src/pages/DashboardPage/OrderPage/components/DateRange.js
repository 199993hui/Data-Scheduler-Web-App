import React, { useState, useEffect } from "react";
import { DatePicker, Space } from "antd";
import dayjs from "dayjs";

const DateRange = ({ get_Data }) => {
  const [selectedDateStart, setSelectedDateStart] = useState("");
  const [selectedDateEnd, setSelectedDateEnd] = useState("");
  const [initialDateStart, setInitialDateStart] = useState("");
  const [initialDateEnd, setInitialDateEnd] = useState("");
  const { RangePicker } = DatePicker;

  const onRangeChange = (dates, dateStrings) => {
    if (dates) {
      setSelectedDateStart(dateStrings[0]);
      setSelectedDateEnd(dateStrings[1]);
      localStorage.setItem(
        "orderDate",
        JSON.stringify({ orderStart: dateStrings[0], orderEnd: dateStrings[1] })
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("start", selectedDateStart);
    formData.append("end", selectedDateEnd);

    formData.append("table", "input_fww");
    await fetch("http://localhost:5000/table_data", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        get_Data(JSON.parse(data));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleDefault = async (start, end) => {
    const formData = new FormData();
    formData.append("start", start);
    formData.append("end", end);
    formData.append("table", "input_fww");
    await fetch("http://localhost:5000/table_data", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        get_Data(JSON.parse(data));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const defaultDate = async () => {
    const formData = new FormData();
    formData.append("table", "default");

    await fetch("http://localhost:5000/table_data", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setSelectedDateStart(data.date);
        setSelectedDateEnd(data.date);
        setInitialDateStart(data.date);
        setInitialDateEnd(data.date);
        localStorage.setItem(
          "orderDate",
          JSON.stringify({ orderStart: data.date, orderEnd: data.date })
        );
        handleDefault(data.date, data.date);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  useEffect(() => {
    const orderPageData = localStorage.getItem("orderPageData");
    if (!orderPageData) {
      defaultDate();
      
    }
  }, []);

  const rangePresets = [
    {
      label: "Last 7 Days",
      value: [dayjs().add(-7, "d"), dayjs()],
    },
    {
      label: "Last 14 Days",
      value: [dayjs().add(-14, "d"), dayjs()],
    },
    {
      label: "Last 30 Days",
      value: [dayjs().add(-30, "d"), dayjs()],
    },
    {
      label: "Last 90 Days",
      value: [dayjs().add(-90, "d"), dayjs()],
    },
  ];

  const orderDate = JSON.parse(localStorage.getItem("orderDate"));
  
  const rangePickerValue = orderDate
    ? [dayjs(orderDate.orderStart), dayjs(orderDate.orderEnd)]
    : undefined;

  const isDateRangeChanged =
    selectedDateStart !== initialDateStart ||
    selectedDateEnd !== initialDateEnd;

  return (
    <Space direction="vertical" size={12}>
      <div style={{ display: "flex", alignItems: "left" }}>
        <RangePicker
          presets={rangePresets}
          format="YYYY-MM-DD"
          onChange={onRangeChange}
          style={{ marginRight: "10px" }}
          disabled={
            !JSON.parse(localStorage.getItem("date")) ||
            !JSON.parse(localStorage.getItem("date"))?.length
          }
          defaultValue={rangePickerValue}
        />
        <div>
          <input
            style={{ height: "90%" }}
            type="submit"
            value="Apply"
            onClick={handleSubmit}
            className="btn btn-outline-secondary btn-rounded"
            disabled={
              !JSON.parse(localStorage.getItem("date")) ||
              !JSON.parse(localStorage.getItem("date"))?.length ||
              !isDateRangeChanged
            }
          />
        </div>
      </div>
    </Space>
  );
};

export default DateRange;
