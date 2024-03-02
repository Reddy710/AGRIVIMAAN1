

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import axios from 'axios';
import PayButton from './PayButton';

// import PayButton from './PayButton';



const ShoppingCart = ({ cartItemCount, setCartItemCount }) => {
  const [cartItems, setCartItems] = useState([]);
  const [userAddress, setUserAddress] = useState([]);
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null)
  // const [droneId, setDroneId] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [total, setTotal] = useState(0);



  useEffect(() => {
    fetchCartDetails();
    fetchUserAddressCart(userId);
  }, [userId]);
  const fetchCartDetails = async () => {
    try {
      // Get user_id from local storage
      const userDetailsString = localStorage.getItem('userDetails');
      const userDetails = JSON.parse(userDetailsString);
      const user_id = userDetails.UserID;
      setUserId(user_id)
      setUser(userDetails)
      // Make API call to fetch cart details for the userx  
      const response = await axios.get(`http://localhost:8000/cart/${userId}`);
      const cartData = response.data;

      const updatedCartItems = await Promise.all(
        cartData.map(async (cartItem) => {
          const droneResponse = await axios.get(`http://localhost:8000/drones/${cartItem.drone_id}`);
          const droneData = droneResponse.data;
          return { ...cartItem, droneDetails: droneData };
        })
      );
      setCartItems(updatedCartItems);
      console.log(cartItems)
    } catch (error) {
      console.error('Error fetching cart details:', error);
    }
  };

  const totalPrice = () => {

    try {
      const total = cartItems.reduce((acc, item) => acc + (item.droneDetails.Price * item.quantity), 0);
      return total.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });
      setTotal(total);
    } catch (error) {
      console.log(error);
    }
  };

  const incrementQuantity = async (index) => {
    try {
      const updatedCart = [...cartItems];
      const item = updatedCart[index];
      const drone_id = item.drone_id;
      const maxQuantity = item.droneDetails.QuantityInStock
      if (item.quantity < maxQuantity) {
        item.quantity += 1;//Incrementing Item quantity by one
        // item.droneDetails.QuantityInStock -= 1
        const response = await axios.put(`http://localhost:8000/cart/update-quantity/${userId}/${drone_id}`, {
          quantity: item.quantity
        });
      } else {
        toast.error(`Only ${maxQuantity} available in stock`, {
          position: "bottom-left",
        });
      }
      setCartItems(updatedCart);

    } catch (error) {
      console.log(error);
    }
  };

  const decrementQuantity = async (index) => {
    try {
      const updatedCart = [...cartItems];
      const item = updatedCart[index];
      const drone_id = item.drone_id;
      if (item.quantity > 1) {
        item.quantity -= 1;//decrementing the item in the quantity
        // item.droneDetails.QuantityInStock += 1
        const response = await axios.put(`http://localhost:8000/cart/update-quantity/${userId}/${drone_id}`, {
          quantity: item.quantity
        });

      } else {
        console.log("Out Of Stock")//replace with tost
      }
      setCartItems(updatedCart);
    } catch (error) {
      console.log(error);
    }
  };

  const removeItem = async (index) => {
    try {
      const updatedCart = [...cartItems];
      const droneId = updatedCart[index].drone_id;
      const response = await axios.delete(`http://localhost:8000/cart/remove/${userId}/${droneId}`);
      updatedCart.splice(index, 1);
      setCartItems(updatedCart);
      cartItemCount--;
      setCartItemCount(cartItemCount)
    } catch (error) {
      console.log(error);
    }
  };
  const handleAddressChange = async (event) => {
    setSelectedAddress(event.target.value);
    
    
  }
  const fetchUserAddressCart = async () => {
    const response = await axios.get(`http://localhost:8000/address/${userId}`);
    const resData = response.data
    console.log(resData, "After fetching")
    setUserAddress(resData);
    console.log(userAddress, "Address")
  };

  return (
    <div className="container mx-auto mt-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4">
          <h1 className="text-center bg-light p-2 mb-1">My Bag</h1>
          <h4 className="text-center">
            {cartItems?.length > 0
              ? `${cartItems.length} items added in your cart`
              : 'Your Shopping Bag is Empty!!'}
          </h4>
          {cartItems.map((item, index) => (
            <div key={index} className=" flex  border rounded-lg p-4 my-4">
              <div className="flex">
                <img src={item.droneDetails.Drone_img} alt="photo" className="w-32 h-32 rounded-lg" />
                <div className="ml-4 gap-4">
                  <h6>{item.droneDetails.drone_name}</h6>
                  <p>
                    Price: {item.droneDetails.Price}/- | Stock : {item.droneDetails.QuantityInStock}
                  </p>
                  <div className="flex ">
                    <button
                      className="bg-white hover:bg-black text-black hover:text-white px-3 py-1 border border-black rounded-md mr-2"
                      onClick={() => incrementQuantity(index)}
                    // disabled={item.quantity > item.droneDetails.QuantityInStock}
                    >
                      +
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="ml-2 bg-white hover:bg-black text-black hover:text-white  px-3 py-1 border border-black rounded-md mr-2"
                      onClick={() => decrementQuantity(index)}
                    // disabled={item.quantity === 1 || item.quantity > item.droneDetails.QuantityInStock }
                    >
                      -
                    </button>
                    <button
                      className="bg-white hover:bg-gray-500  text-black hover:text-white px-3 py-1 border border-black rounded-md"
                      onClick={() => removeItem(index)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4">
          <div className="card p-3">
            <h5 className="text-center"><strong>Order Summary</strong></h5>
            <div className="flex justify-between mt-3">
              <h6>Subtotal:</h6>
              <h6>{totalPrice()}</h6>
            </div>
            <div className="flex justify-between mt-3">
              <h6>Delivery Charges:</h6>
              <h6 style={{ color: '#28a745' }}>FREE</h6>
            </div>
            <div className="flex justify-between mt-3">
              <h6>Total:</h6>
              <h6>{totalPrice()}</h6>
            </div>
            <div className="flex justify-center bg-black text-white">
              <PayButton cartItems={cartItems} user={user} selectedAddress={selectedAddress} />
            </div>

            <div className="mt-4">
              <h5>Select an address:</h5>
              <select
                name="addresses"
                value={selectedAddress}
                onChange={handleAddressChange}
                className="bg-gray-200 px-3 py-1 rounded-md mt-2"
              >
                {userAddress && userAddress.length > 0 ? (
                  userAddress.map((address) => (
                    <option key={address.address_id} value={address.address_id}>
                      {address.street_address}, {address.city}, {address.state}, {address.postal_code}
                    </option>
                  ))
                ) : (
                  <option>No addresses found</option>
                )}
              </select>
              {/* <select
                name="addresses"
                value={selectedAddress ? JSON.stringify(selectedAddress) : ''}
                onChange={handleAddressChange}
                className="bg-gray-200 px-3 py-1 rounded-md mt-2"
              >
                {userAddress && userAddress.length > 0 ? (
                  userAddress.map((address) => (
                    <option key={address.address_id} value={JSON.stringify(address)}>
                      {address.street_address}, {address.city}, {address.state}, {address.postal_code}
                    </option>
                  ))
                ) : (
                  <option>No addresses found</option>
                )}
              </select> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;