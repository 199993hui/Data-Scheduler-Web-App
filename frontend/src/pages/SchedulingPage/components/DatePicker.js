import React, { useState, useEffect } from "react";
import dayjs from "dayjs";

import "react-datepicker/dist/react-datepicker.css";

import "./DatePicker.css";

const DatePicker = ({ get_Data }) => {
  const current = new Date();
  const year = current.getFullYear();
  const month = String(current.getMonth() + 1).padStart(2, "0");
  const day = String(current.getDate()).padStart(2, "0");
  const isoDate = `${year}-${month}-${day}`;

  const [selectedDate, setSelectedDate] = useState(isoDate);
  const [initialDate, setInitialDate] = useState(isoDate);

  const handleDatePicker = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("date", selectedDate);
    formData.append("table", "schedule");
    console.log(selectedDate);
    localStorage.setItem(
      "scheduleDate",
      JSON.stringify({ scheduleDate: selectedDate })
    );
    await fetch("http://localhost:5000/scheduling", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        get_Data(JSON.parse(data));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleDateChange = (date) => {
    date = date.toLocaleDateString("en-GB");
    setSelectedDate(date);
  };

  const handleDefault = async (date) => {
    const formData = new FormData();
    formData.append("date", date);
    formData.append("table", "default_schedule");
    await fetch("http://localhost:5000/scheduling", {
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
        setSelectedDate(data.date);
        setInitialDate(data.date);
        handleDefault(data.date);
        localStorage.setItem(
          "scheduleDate",
          JSON.stringify({ scheduleDate: data.date })
        );
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    const scheduleData = localStorage.getItem("ganttData");
    if (!scheduleData) {
      defaultDate();
    }
  }, []);

  const parsedScheduleDate = JSON.parse(
    localStorage.getItem("scheduleDate")
  )?.scheduleDate;
  let formattedScheduleDate = parsedScheduleDate;

  if (dayjs(parsedScheduleDate, "MM/DD/YYYY").isValid()) {
    formattedScheduleDate = dayjs(parsedScheduleDate, "MM/DD/YYYY").format(
      "YYYY-DD-MM"
    );
  } else if (dayjs(parsedScheduleDate, "YYYY-MM-DD").isValid()) {
    formattedScheduleDate = dayjs(parsedScheduleDate, "YYYY-MM-DD").format(
      "YYYY-MM-DD"
    );
  } else {
    formattedScheduleDate = "";
  }

  const isButtonDisabled = selectedDate === initialDate;

  return (
    <div class="container">
      <form
        style={{ display: "flex", justifyContent: "center" }}
        id="fileUploadForm"
        onSubmit={handleDatePicker}
        enctype="multipart/form-data"
      >
        <fieldset>
          <div class="form-horizontal">
            <div class="form-group">
              <div class="row">
                <div class="col-md-10">
                  <div class="input-group">
                    <label
                      class="control-label mb-1 col-md-2 text-right"
                      style={{ "padding-right": "30%" }}
                    >
                      <span>Date</span>
                    </label>
                    <div class="col-md-10">
                      <div class="input-group">
                        <input
                          style={{ paddingBottom: 0 }}
                          type="date"
                          id="date"
                          name="date"
                          placeholder={isoDate}
                          class="form-control form-control-sm"
                          onChange={(e) =>
                            handleDateChange(new Date(e.target.value))
                          }
                          disabled={
                            !JSON.parse(localStorage.getItem("date")) ||
                            !JSON.parse(localStorage.getItem("date"))?.length
                          }
                          defaultValue={formattedScheduleDate}
                        />
                      </div>
                    </div>
                    <div class="input-group-btn mb-1 col-md-2">
                      <input
                        style={{ height: "100%" }}
                        type="submit"
                        value="Apply"
                        class="btn btn-outline-secondary btn-rounded"
                        disabled={
                          !JSON.parse(localStorage.getItem("date")) ||
                          !JSON.parse(localStorage.getItem("date"))?.length ||
                          isButtonDisabled
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default DatePicker;
