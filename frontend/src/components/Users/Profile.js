import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const Profile = () => {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    // Retrieve user details from local storage
    const userDetailsString = localStorage.getItem('userDetails');
    const userDetails = JSON.parse(userDetailsString);
    setUserDetails(userDetails);
  }, []); // Run once on component mount


  return (
    <div className='mt-20  '>
      {userDetails && (
        <div className='flex flex-col items-center mt-4 '>
          <div >
            <h1><strong>Your Account</strong></h1>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <a href="/your-orders">
              <button className="bg-white hover:pointer hover:bg-black  hover:text-white text-black border border-black px-4 py-2 rounded-md  mr-2 h-30 w-80">Your Orders</button>
            </a>
            <a href="/your-requests">
              <button className="bg-white hover:pointer hover:bg-black  hover:text-white text-black border border-black px-4 py-2 rounded-md mr-2 h-30 w-80">Your Requests</button>
            </a>
            <a href="/address">
              <button className="bg-white hover:pointer hover:bg-black  hover:text-white text-black border border-black px-4 py-2 rounded-md mr-2 h-30 w-80">Your Addresses</button>
            </a>
            <a href="/contact-us">
              <button className="bg-white hover:pointer hover:bg-black  hover:text-white text-black border border-black px-4 py-2 rounded-md mr-2 h-30 w-80">Contact Us</button>
            </a>
            {/* <a href="/payment-options">
              <button className="bg-white hover:pointer hover:bg-black  hover:text-white text-black border border-black px-4 py-2 rounded-md mr-2 h-30 w-80">Payment Options</button>
            </a> */}
          </div>
          <p>Username: {userDetails.Name}</p>
          <p>Phone Number: {userDetails.phone_number}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
