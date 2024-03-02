import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const AddressList = () => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const navigate = useNavigate();
  const userDetailsString = localStorage.getItem('userDetails');
  const userDetails = JSON.parse(userDetailsString);
  const user_id = userDetails.UserID;
  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/address/${user_id}`);
        setAddresses(response.data);
      } catch (error) {
        console.error('Error fetching addresses:', error);
      }
    };

    fetchAddresses();
  }, [user_id]);

  const handleAddressFrom = () => {
    navigate('/address-form');
  };

  const handleDeleteAddress = async (address_id) => {
    try {
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.delete(`http://localhost:8000/address/delete/${address_id}`, {
        headers: {
          Authorization: token,
        },
      });

      // Update the state after successful deletion
      setAddresses(addresses.filter(address => address.address_id !== address_id));
    } catch (error) {
      console.error('Error while deleting the Address:', error);
    }
  };

  const handleEditAddress = (address_id) => {
    // Redirect to the address form with the address_id parameter
    navigate(`/address-form/${address_id}`);
  };

  const handleAddressClick = (address) => {
    setSelectedAddress(address);
  };

  return (
    <div className='ml-5 mt-20'>
      <h2 className="text-lg font-bold">Your Addresses</h2>

      <div className="mr-5 ml-5 grid grid-cols-4 gap-8 ">
        <div className="bg-gray-100 p-4 rounded-md cursor-pointer" onClick={handleAddressFrom}>
          <h2 className="text-lg font-semibold">Add New Address</h2>
        </div>
        {addresses.map((address) => (
          <div key={address.address_id} className="bg-gray-100 p-4 rounded-md cursor-pointer" onClick={() => handleAddressClick(address)}>
            <h2 className="text-lg font-semibold">{address.recipient_name}</h2>
            <p>{address.address_type}</p>
            <p>{address.street_address}</p>
            <p>{address.city}, {address.state}, {address.country}</p>
            <p>{address.postal_code}</p>
            <div className="mt-4 flex  items-start sticky bottom-4">
              {/* <button 
                className="bg-black text-white px-4 py-2 mr-2 rounded-md"
                onClick={() => handleEditAddress(address.address_id)}
              >
                Edit
              </button> */}
              <button 
                className="bg-black text-white px-4 py-2 rounded-md"
                onClick={() => handleDeleteAddress(address.address_id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddressList;


