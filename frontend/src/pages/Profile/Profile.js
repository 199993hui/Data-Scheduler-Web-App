import React, { useState } from "react";
import {
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBTypography,
} from "mdb-react-ui-kit";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import jwtDecode from "jwt-decode";

import UpdateForm from "./UpdateForm";

function Profile() {
  const decodedToken = jwtDecode(localStorage.getItem("token"));
  const token = decodedToken["sub"];
  const [open, setOpen] = useState(false);

  const [name, setName] = useState(token["name"]);

  const handeleUpdate = (data) => {
    setName(data);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div onClick={handleClickOpen}>Profile</div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: MDBCard,
          sx: {
            borderRadius: "20px",
            minWidth: "600px",
            margin: "auto",
          },
        }}
      >
        <MDBCardBody className="p-4">
          <MDBTypography tag="h3">{name}</MDBTypography>
          <MDBCardText className="small">{token["role"]}</MDBCardText>
          <hr className="my-4" />
          <div className="d-flex justify-content-start align-items-center">
            <UpdateForm emp={token} handeleUpdate ={handeleUpdate}/>
          </div>
        </MDBCardBody>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Profile;
