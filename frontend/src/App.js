import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from '@mui/material/styles';
import Navbar from './components/Home/Navbar';
import LoginPopup from './components/Home/LoginPopup';
import RegisterPopup from './components/Home/RegisterPopup';
import Landing_page from './components/Home/Landing_page';
import theme from './components/Animations/CustomTheme';
import ServiceRequestForm from './components/Services/ServiceRequestForm'
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import DroneRepairForm from './components/Services/DroneRepairForm';
import DroneSprayingForm from './components/Services/DroneSprayingForm';
import DroneList from './components/Products/Products';
import ShoppingCart from './components/Products/ShoppingCart';
import Profile from './components/Users/Profile';
import Orders from './components/Users/Orders';
import Requests from './components/Users/Requests';
// import Address from './components/Users/AddressList';
import Payment from './components/Products/PayButton';
import Contact from './components/Contact';
import FeedbackForm from './components/Services/FeedbackForm';
import Success from './components/Success';
import Cancel from './components/Cancel';
import AddressList from './components/Users/AddressList';
import AddressForm from './components/Users/AddressForm';
export const store = createContext();
function App() {
  const [cartItems, setCartItems] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0)
 
  return (
    <Router>
        <ToastContainer/>
        <Navbar cartItemCount={cartItemCount} setCartItemCount={setCartItemCount}/>
        <Routes>
          <Route path="/" element={<Landing_page />} />
          <Route path="/login" element={<LoginPopup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/service-1" element={<ServiceRequestForm />} />
          <Route path="/register" element={<RegisterPopup  />} />
          <Route path="/drone-repair-form" element={<DroneRepairForm  />} />
          <Route path="/drone-spraying-form" element={<DroneSprayingForm  />} />
          <Route path="/drones" element={<DroneList cartItemCount={cartItemCount} setCartItemCount={setCartItemCount}/>} />
          <Route path="/shopping-cart" element={<ShoppingCart  cartItemCount={cartItemCount} setCartItemCount={setCartItemCount}/>} />
          <Route path="/account" element={<Profile />} />
          <Route path="/your-orders" element={<Orders />} />
          <Route path="/your-requests" element={<Requests />} />
          {/* <Route path="/your-addresses" element={<Address />} /> */}
          <Route path="/payment-options" element={<Payment />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/feedback-form" element={<FeedbackForm />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
          <Route path="/address" element={<AddressList />} />
          <Route path="/address-form" element={<AddressForm />} />
          {/* <Route path="/success/:successMessage" element={<Success />} /> */}

        </Routes>
     
    </Router>
  );
}

export default App;
