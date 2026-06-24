import React, { useState, useContext } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import NativeSelect from "@mui/material/NativeSelect";
import IconButton from "@mui/material/IconButton";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import { MDBCardText, MDBIcon } from "mdb-react-ui-kit";

import { AlertContext } from "../../context/AlertContext";

function UpdateForm({ emp, handeleUpdate }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(emp["name"]);
  const [role, setRole] = useState(emp["role"]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange_name = (event) => {
    setName(event.target.value);
  };

  const { setAlertVisibility, setAlertMessage, setType } =
    useContext(AlertContext);

  const updateEmployee = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/emp", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          employeeID: emp["employeeID"],
          name: name,
          role: role,
        }),
      })
        .then((data) => {
          return data.json();
        })
        .then((data) => {
          localStorage.setItem("token", data["token"]);
          const [type, text] = Object.entries(data)[0];
          setAlertMessage(text);
          setAlertVisibility(true);
          setType(type);
          handeleUpdate(name);
          handleClose();
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <MDBCardText className="text-uppercase mb-0">
        <div onClick={handleClickOpen} style={{ cursor: "pointer" }}>
          <MDBIcon fas icon="cog me-2" />
          <span className="text-muted small">Edit</span>
        </div>
      </MDBCardText>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update</DialogTitle>
        <DialogContent>
          <TextField
            sx={{ margin: "12px" }}
            id="employeeID"
            label="Employee ID"
            autoFocus
            defaultValue={emp["employeeID"]}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            sx={{ margin: "12px auto" }}
            autoFocus
            required
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={emp["name"]}
            onChange={handleChange_name}
          />
          <TextField
            sx={{ margin: "12px" }}
            id="role"
            label="Role"
            autoFocus
            defaultValue={emp["role"]}
            InputProps={{
              readOnly: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={updateEmployee}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default UpdateForm;
