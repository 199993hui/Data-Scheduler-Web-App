import React, { useState, useContext } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { MDBCardText } from "mdb-react-ui-kit";

import { AlertContext } from "../../../../context/AlertContext";

function DeleteForm({ date }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { setAlertVisibility, setAlertMessage, setType } =
    useContext(AlertContext);

  const deleteData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/data", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(date),
      });
      const message = await response.json();
      const [type, text] = Object.entries(message)[0];

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
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <MDBCardText className="text-uppercase mb-0">
        <IconButton
          aria-label="delete"
          variant="outlined"
          color="error"
          onClick={handleClickOpen}
          style={{ cursor: "pointer" }}
          size="small"
        >
          <DeleteIcon />
        </IconButton>
      </MDBCardText>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete Data on <strong>Date:</strong>{" "}
          <strong> {date} </strong> ?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={deleteData}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DeleteForm;
