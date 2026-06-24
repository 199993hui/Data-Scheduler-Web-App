import React, { useState, useContext } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { MDBCardText } from "mdb-react-ui-kit";

import { AlertContext } from "../../context/AlertContext";

function DeleteForm({ emp }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { setAlertVisibility, setAlertMessage, setType } =
    useContext(AlertContext);

  const deleteEmployee = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/emp", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emp.employeeID),
      });
      const message = await response.json();
      const [type, text] = Object.entries(message)[0];

      setAlertMessage(text);
      setAlertVisibility(true);
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
          Are you sure you want to delete Employee{" "}
          <strong> {emp.employeeID} </strong> ?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={deleteEmployee}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DeleteForm;
