import React, { useState, useEffect } from "react";
import axios from 'axios';
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
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Logo from "../../agrivimaan.png";
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ cartItemCount, setCartItemCount}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [token, setToken] = useState(localStorage.getItem('accessToken'));
  const YOUR_LOCATIONIQ_API_KEY = "pk.6bb9a4c4497fbbd9cd8acb299226a0d5";
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    fetchData();
    setCartItemCount()
  }, []);
    const fetchData = async () => {
      try {
        const userDetailsString = localStorage.getItem('userDetails');
        const userDetails = JSON.parse(userDetailsString);
        const user_id = userDetails.UserID;
        const response = await axios.get(`http://localhost:8000/cart/${user_id}`);
        const cartData = response.data;
        setCartItemCount(cartData.length)
      } catch (error) {
        console.error('Failed to fetch cartItemCount:', error);
      }
    };

  
 const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleServiceChange = (event) => {
    setSelectedService(event.target.value);
  };


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


  const handleRegisterOpen = () => {
    navigate('/register');
  };

  const handleLogo = () => {
    navigate('/')
  }

  const handleLogout = () => {
    // Remove token from local storage and state
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userDetails');
    setToken(null);
    navigate('/');
  };

  const handleGetCurrentLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://us1.locationiq.com/v1/reverse.php?key=${YOUR_LOCATIONIQ_API_KEY}&lat=${latitude}&lon=${longitude}&format=json`
            );
            const data = await response.json();
            const city =
              data.address.city ||
              data.address.town ||
              data.address.village ||
              "";
            const state = data.address.state || "";
            setCurrentLocation(`${city}, ${state}`);
            setDialogOpen(false)
          } catch (error) {
            console.error("Error fetching location from coordinates", error);
          }
        },
        (error) => {
          console.error("Error getting user location", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
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
          <div className="ml-4">
            <Box
              display="flex"
              alignItems="center"
              borderRadius="md"
              border="1px solid #ccc"
              padding="20px"
              className="border border-gray-300 rounded px-3 py-2 cursor-pointer"
              onClick={handleDialogOpen}
              width={300}
            >
              <LocationOnIcon style={{ color: 'black' }} />


              <Typography variant="body2" color="textSecondary" ml={1}>
                {currentLocation || "Default Location"}
              </Typography>
            </Box>
            <Dialog open={dialogOpen} onClose={handleDialogClose}>
              <DialogTitle>Use Current Location</DialogTitle>
              <DialogContent>
                <Typography>
                  Do you want to use your current location?
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => {
                    handleGetCurrentLocation();
                    handleDialogClose();
                  }}
                  color="primary"
                >
                  Yes
                </Button>
                <Button onClick={() => { handleDialogClose() }} color="primary">
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
          </div>
          <Box width={50} />
          <div className="ml-4">
            <FormControl variant="outlined" style={{ width: "300px" }}>
              <InputLabel htmlFor="drone-services-select">
                Drone Services
              </InputLabel>
              <Select
                label="Drone Services"
                value={selectedService}
                onChange={handleServiceChange}
                className="border border-gray-300 rounded px-2 py-1"
                inputProps={{
                  name: "drone-services",
                  id: "drone-services-select",
                }}
                MenuProps={{
                  anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "center",
                  },
                  transformOrigin: {
                    vertical: "top",
                    horizontal: "center",
                  },
                  getContentAnchorEl: null,
                }}
              >
                <MenuItem value="" disabled>
                  Select Drone Service
                </MenuItem>
                <MenuItem value="drone-spraying-services">
                  <Link to="/drone-spraying-form" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      Drone Spraying services
                    </div>
                  </Link>
                </MenuItem>
                <MenuItem value="drone-repairing-services">
                  <Link to="/drone-repair-form" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      Drone Repairing services
                    </div>
                  </Link>
                </MenuItem>
              </Select>
            </FormControl>
          </div>
          <Box width={8} />
          <div className="flex items-center ml-auto">
            {token ? (
              <>
                <Link to="/drones">
                  <Button color="inherit" className="ml-2" style={{ textTransform: 'none' }}>
                    Products
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

                <Link to="/shopping-cart">
                  <div className="flex">
                    {/* <IconButton color="primary" aria-label="add to shopping cart"> */}
                    <AddShoppingCartIcon style={{ marginRight: "4px", fontSize: "30px", color: "black" }} />
                    <div className="w-4 h-4 rounded-full flex justify-center item-center  bg-black text-white text-xs ">
                      {cartItemCount}
                    </div>
                  </div>
                  {/* </IconButton> */}
                </Link>

              </>
            ) : (
              <>
                <Button color="inherit" className="ml-2" onClick={handleLoginOpen}>
                  Login
                </Button>
                <Button color="inherit" className="ml-2" onClick={handleRegisterOpen}>
                  Signup
                </Button>
              </>
            )}
          </div>
        </Toolbar>
      </Paper >
    </AppBar >
  );
};

export default Navbar;

