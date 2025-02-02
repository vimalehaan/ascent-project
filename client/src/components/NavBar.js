import React, { useContext, useState } from "react";
import {
  AppBar,
  Button,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { AuthContext } from "../contexts/AuthContext";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AlertDialog from "./AlertDialog";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const { student, logOut } = useContext(AuthContext);
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = (confirmed) => {
    setOpenDialog(false);
    if (confirmed) {
      logOut();
      navigate("/login");
    }
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleHomeClick = () => {
    navigate("/dashboard");
  };

  return (
    <div>
      <AppBar
        position="static"
        sx={{ backgroundColor: "secondary.dark", padding: "8px 16px" }}
      >
        <Toolbar
          sx={{ display: "flex", justifyContent: "space-between", mx: 16 }}
        >
          <Typography
            variant="h6"
            sx={{ color: "#fff", fontWeight: "600", cursor: "pointer" }}
            onClick={handleHomeClick}
          >
            Ascentic Learning
          </Typography>
          <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>

            <Typography variant="body1" sx={{ color: "#fff" }}>
              {student ? student.name : "User"}
            </Typography>

            <IconButton sx={{ color: "#fff" }} onClick={handleProfileClick}>
              <AccountCircleIcon sx={{ fontSize: "30px" }} />
            </IconButton>

            <IconButton sx={{ color: "#fff" }} onClick={handleOpenDialog}>
              <LogoutIcon sx={{ fontSize: "22px" }} />
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>
      <AlertDialog
        open={openDialog}
        title="Confirm Logout"
        message="Are you sure you want to log out?"
        onClose={handleCloseDialog}
        onConfirm={() => handleCloseDialog(true)} // Handle confirmation
      />
    </div>
  );
};

export default NavBar;
