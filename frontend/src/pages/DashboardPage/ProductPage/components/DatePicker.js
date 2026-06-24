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
    formData.append("table", "input_productmatrix");
    localStorage.setItem(
      "productDate",
      JSON.stringify({ productDate: selectedDate })
    );
    await fetch("http://localhost:5000/table_data", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
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
    formData.append("table", "default_productmatrix");
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
        console.log(data.date);
        setSelectedDate(data.date);
        setInitialDate(data.date);
        handleDefault(data.date);
        localStorage.setItem(
          "productDate",
          JSON.stringify({ productDate: data.date })
        );
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    const productPageData = localStorage.getItem("productPageData");
    if (!productPageData) {
      defaultDate();
    }
  }, []);

  const parsedProductDate = JSON.parse(
    localStorage.getItem("productDate")
  )?.productDate;

  let formattedProductDate = parsedProductDate;

  if (dayjs(parsedProductDate, "MM/DD/YYYY").isValid()) {
    formattedProductDate = dayjs(parsedProductDate, "MM/DD/YYYY").format(
      "YYYY-DD-MM");
  } else if (dayjs(parsedProductDate, "YYYY-MM-DD").isValid()) {
    formattedProductDate = dayjs(parsedProductDate, "YYYY-MM-DD").format(
      "YYYY-MM-DD"
    );
  }
  else{
    formattedProductDate = "";
  }

  const isButtonDisabled = selectedDate === initialDate;
  return (
    <div class="container">
      <form
        style={{ display: "flex", justifyContent: "center" }}
        id="fileUploadForm"
        onSubmit={handleDatePicker}
        encType="multipart/form-data"
      >
        <fieldset>
          <div class="form-horizontal">
            <div class="form-group">
              <div class="row">
                <div class="col-md-10">
                  <div class="input-group">
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
                          defaultValue={formattedProductDate}
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
