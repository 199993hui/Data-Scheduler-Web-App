import React, { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import jwtDecode from "jwt-decode";

import "./customNavbar.css";
import Profile from "../Profile/Profile";

function MainPage() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const navigate = useNavigate();

  const decodedToken = jwtDecode(localStorage.getItem("token"));
  const role = decodedToken["sub"]["role"];

  const handleProfileMenuOpen = (event) => {
    setAnchorEl((prevAnchorEl) => (prevAnchorEl ? null : event.currentTarget));
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileModalClose = () => {
    setProfileModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const renderProfileMenu = (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleProfileMenuClose}
    >
      <MenuItem><Profile/></MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  return (
    <>
      <nav className="navbar navbar-expand-lg custom-navbar">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                {role === "Root" && (
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      aria-current="page"
                      to="management"
                    >
                      Account
                    </Link>
                  </li>
                )}
              </li>
              {role === "Root" || role === "Admin" ? (
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to="table">
                    Data
                  </Link>
                </li>
              ) : (
                <></>
              )}
              <li className="nav-item">
                <Link className="nav-link" to="/main/dashboard">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/main/scheduling">
                  Scheduling
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/main/clustering">
                  Clustering
                </Link>
              </li>
            </ul>
            <IconButton
              sx={{ marginRight: "30px", color: "#d0d6db" }}
              onClick={handleProfileMenuOpen}
            >
              <AccountCircleSharpIcon />
            </IconButton>
          </div>
        </div>
      </nav>
      <div style={{ paddingTop: "6.2rem" }}>
        <Outlet />
      </div>
      {renderProfileMenu}
      {isProfileModalOpen && <Profile onClose={handleProfileModalClose} />}
    </>
  );
}

export default MainPage;
