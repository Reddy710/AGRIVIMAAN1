import React, { useState, useEffect } from "react";

import {
  AppBar,
  Paper,
  Toolbar,
  Typography,
  Button,
  Select,
  Box,
  IconButton,
  MenuItem,
  Menu,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputLabel,
  FormControl,
} from "@mui/material";

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Logo from "../agrivimaan.png";
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
 
  const [token, setToken] = useState(localStorage.getItem('accessToken'));
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);


  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  const handleLoginOpen = () => {
    // Redirect to /login
    navigate('/login');
  };
 

  // const handleRegisterOpen = () => {
  //   navigate('/register');
  // };

  const handleLogo = () => {
    navigate('/')
  }

  const handleLogout = () => {
    // Remove token from local storage and state
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userDetails');
    setToken(null);
    navigate('/landing_page');
    window.location.reload();
  };
  return (
    <AppBar position="fixed" className="shadow-none">
      <Paper elevation={0}>
        <Toolbar className="bg-white h-20 shadow-none" spacing="2px">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src={Logo}
              alt="Logo"
              style={{ width: "auto", height: "35px", marginLeft: "10px" }}
              onClick={handleLogo}
            />
          </div>
          <Box width={100} />
          <div className="flex items-center ml-auto">
            {token ? (
              <>
                <Link to="/drones">
                  <Button color="inherit" className="ml-2" style={{ textTransform: 'none' }} onClick={handleLogo}>
                    Dashbord
                  </Button>
                </Link>

                {/* Profile */}
                <IconButton color="inherit" onClick={handleProfileClick}>
                  <AccountCircleIcon
                    style={{ marginRight: "8px", fontSize: "30px" }}
                  />
                </IconButton>
                {/* Profile Dropdown */}
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleProfileClose}
                >
                  <MenuItem>
                  <Typography variant="body1">
                    <Link to="/account" style={{ textDecoration: 'none', color: 'inherit' }}>Account</Link>
                  </Typography>
                  </MenuItem>
                  <MenuItem>
                    <Typography variant="body1">
                    <Link to="/your-orders" style={{ textDecoration: 'none', color: 'inherit' }}>Orders</Link>
                    </Typography>
                  </MenuItem>
                  <MenuItem>
                    <Typography variant="body1">
                    <Link to="/your-requests" style={{ textDecoration: 'none', color: 'inherit' }}>Requests</Link>

                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button color="inherit" className="ml-2" onClick={handleLoginOpen}>
                  Login
                </Button>
                {/* <Button color="inherit" className="ml-2" onClick={handleRegisterOpen}>
                  Signup
                </Button> */}
              </>
            )}
          </div>
        </Toolbar>
      </Paper >
    </AppBar >
  );
};

export default Navbar;

