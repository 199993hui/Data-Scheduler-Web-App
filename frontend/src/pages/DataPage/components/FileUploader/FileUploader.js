import React, { useState, useEffect, useContext } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "./FileUploader.css";

import { AlertContext } from "../../../../context/AlertContext";

const FileUploader = ({ toggleUpload }) => {
  const current = new Date();
  const year = current.getFullYear();
  const month = String(current.getMonth() + 1).padStart(2, "0");
  const day = String(current.getDate()).padStart(2, "0");
  const isoDate = `${year}-${month}-${day}`;

  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const { setAlertVisibility, setAlertMessage, setType } =
    useContext(AlertContext);

  const handleFileUpload = async (e) => {
    toggleUpload();
    e.preventDefault();
    console.log("hi");
    const formData = new FormData();
    formData.append("date", selectedDate);
    formData.append("file", selectedFile);
    await fetch("http://localhost:5000/data", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        toggleUpload();

        const [type, text] = Object.entries(data)[0];
        setAlertMessage(text);
        setAlertVisibility(true);
        localStorage.removeItem("orderPageData");
        localStorage.removeItem("productPageData");
        localStorage.removeItem("planPageData");
        localStorage.removeItem("clusteringPageData");
        localStorage.removeItem("ganttData");
        localStorage.removeItem("selectedNumerical_1");
        localStorage.removeItem("selectedNumerical_2");
        localStorage.removeItem("selectedCategorical");
        localStorage.removeItem("selectedCluster");
        localStorage.removeItem("clusterCheckbox");
        localStorage.removeItem("clusterFeatureHist");
        localStorage.removeItem("clusterFeatureBar");
        localStorage.removeItem("clusterResult");
        localStorage.removeItem("clusterLine1");
        localStorage.removeItem("clusterLine2");
        localStorage.removeItem("date");
        localStorage.removeItem("orderDate");
        localStorage.removeItem("productDate");
        localStorage.removeItem("planDate");
        localStorage.removeItem("scheduleDate");
        setType(type);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleDateChange = (date) => {
    date = date.toLocaleDateString("en-GB");
    setSelectedDate(date);
  };

  useEffect(() => {}, []);
  return (
    <div class="container">
      <form
        style={{ display: "flex", justifyContent: "center" }}
        id="fileUploadForm"
        onSubmit={handleFileUpload}
        enctype="multipart/form-data"
      >
        <fieldset>
          <div class="form-horizontal">
            <div class="form-group">
              <div class="row">
                <label class="control-label mb-4 col-md-2 text-right">
                  <span>Date</span>
                </label>
                <div class="col-md-4">
                  <div class="input-group">
                    <input
                      style={{ paddingBottom: 0 }}
                      type="date"
                      id="date"
                      name="date"
                      placeholder={isoDate}
                      class="form-control form-control-sm "
                      onChange={(e) =>
                        handleDateChange(new Date(e.target.value))
                      }
                    />
                  </div>
                </div>
                <div class="row">
                  <label
                    class="control-label col-md-2 text-right"
                    for="filename"
                  >
                    <span>File</span>
                  </label>
                  <div class="col-md-10">
                    <div class="input-group">
                      <input
                        type="hidden"
                        id="filename"
                        name="filename"
                        value=""
                      />
                      <input
                        style={{ paddingBottom: 0 }}
                        type="file"
                        id="uploadedFile"
                        name="uploadedFile"
                        class="form-control form-control-sm"
                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                        onChange={(e) => setSelectedFile(e.target.files[0])}
                      />
                      <div class="input-group-btn">
                        <input
                          style={{ height: "100%" }}
                          type="submit"
                          value="Upload"
                          disabled={!selectedFile || !selectedDate}
                          class="ml-1 btn btn-outline-secondary btn-rounded"
                        />
                      </div>
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

export default FileUploader;
