import React, { useState, useContext } from "react";
import { AlertContext } from "../../context/AlertContext";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

export default function ActionAlerts() {
  const { showAlert, message, type, setAlertVisibility } =
    useContext(AlertContext);

  const handleCloseAlert = () => {
    setAlertVisibility(false);
  };

  return (
    <div
      style={{
        left: "50%",
        transform: "translate(-50%)",
        position: "fixed",
        top: "12px",
        zIndex: 3000,
        margin: "0 auto",
      }}
    >
      {showAlert && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert onClose={handleCloseAlert} severity={type}>
            {message}
          </Alert>
        </Stack>
      )}
    </div>
  );
}
