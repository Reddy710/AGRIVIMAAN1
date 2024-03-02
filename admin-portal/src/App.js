import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import PilotCreation from './components/PilotCreation'
import Login from './components/Login'
import LandingPage from './components/Landingpage/LandingPage';
import Home from './components/Admin/Home';
import Orders from './components/Admin/Orders';
import Customers from './components/Admin/Customers';
import RepairRequests from './components/Admin/RepairRequests';
import SprayingRequests from './components/Admin/SprayingRequests';
import Pilots from './components/Admin/Pilots';
import DroneInventory from './components/Admin/DroneInventory'
// import './App.css'

function App() {
  const token = localStorage.getItem('accessToken');
  const [orders, setOrders] = useState([]);
  return (
    <Router>
     <Navbar/>
     
     <Routes>
    {token?(<Route path="/" element={<Home orders = {orders} setOrders={setOrders}/>} />)
     :(<Route path="/landing_page" element={<LandingPage/>}/>)}
     <Route path="/login" element={<Login />} />
     <Route path='/pilot-creation' element = {<PilotCreation />}/>
     <Route path="/orders" element={<Orders orders = {orders} setOrders={setOrders} />} />
     <Route path="/customers" element={<Customers />} />
     <Route path="/repair-request" element={<RepairRequests/>} />
     <Route path="/spraying-request" element={<SprayingRequests />} />
     <Route path="/pilots" element={<Pilots   />} />
     <Route path="/drone-inventory" element={<DroneInventory   />} />
     </Routes>
   
     </Router>
   
  );
}

export default App;


 