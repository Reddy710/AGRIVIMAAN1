import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';


const DroneList = ({ cartItemCount, setCartItemCount }) => {
  const [drones, setDrones] = useState([]);
  const [error, setError] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  // const [user_id, setUserID] = useState([]);
  // const [drone_id, setDroneID] = useState([]);

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/drones/');
        setDrones(response.data);
      } catch (error) {
        console.error('Failed to fetch drones:', error);
        setError('Failed to fetch drones');
      }
    };

    fetchData();
  }, []);

  const addToCart = async (drone) => {
    const isAlreadyAdded = cartItems.find(item => item.drone_id === drone.drone_id);
    console.log(isAlreadyAdded,"is this undifinded")
    if (isAlreadyAdded) {
      toast.info("Item already added to the cart", {
        position: "bottom-left",
      });
    }
    const newCartItems = [...cartItems, drone];
    console.log(newCartItems, "NEW")
    setCartItems(newCartItems);
    const lastAddedDroneId = newCartItems[newCartItems.length - 1].drone_id

    // Get user_id from local storage
    const userDetailsString = localStorage.getItem('userDetails');
    const userDetails = JSON.parse(userDetailsString);
    const user_id = userDetails.UserID;
    try {
      const response = await axios.post('http://localhost:8000/cart/add', {
        user_id: user_id,
        drone_id: lastAddedDroneId,
        quantity: 1
      });


    } catch (error) {
      console.error('Error adding to cart:', error.response.data.error);
    }
   
  };

  const handlePhotoClick = (droneId) => {
    console.log('Photo clicked');
    // You can handle the navigation to the single drone page here
  };

  return (
    <div className='mt-20'>
      {error && <div>Error: {error}</div>}
      <div className="ml-20 mr-20 flex flex-row justify-between items-center gap-3 bg-zinc-100 mb-4 h-24">
        <div className="flex">
          <Link to="/drones" className="ml-5 mr-4">Drones</Link>
          <Link to="/drone-spare-parts">Drone Spare Parts</Link>
        </div>
        <div className="flex items-center">
          <input type="text" placeholder="Search..." className="border border-gray-300 px-2 py-1 rounded-l-md" />
          <button className="bg-gray-200 px-2 py-1 rounded-r-md">
            <i className="fas fa-search"></i>
          </button>
          <select className="border border-gray-300 ml-2 px-2 py-1 rounded-md">
            <option value="price">Price</option>
            <option value="name">Name</option>
          </select>
        </div>
      </div>
      <div className="ml-20 mr-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {drones.map((drone) => (
          <div key={drone.drone_id} className="bg-gray-200 shadow-xl rounded-lg overflow-hidden hover:cursor-pointer hover:shadow-lg transition-shadow duration-1000 flex  flex-col relative">
            <div className="h-48 bg-white" onClick={() => handlePhotoClick(drone.drone_id)}>
              <img src={drone.Drone_img} alt={drone.drone_name} className="w-full h-full object-cover object-center hover:pointer" style={{ objectFit: 'cover' }} />
            </div>
            <div className="h-full flex flex-col justify-between gap-2 items-start p-4 ">
              <h2 className="text-xl font-semibold ">{drone.drone_name}</h2>
              <span class="inline shrink-0  px-2 py-1 text-sm font-semibold leading-none text-green-600 bg-green-200 rounded">In Stock</span>
              <p className="text-gray-700 ">{drone.drone_model}</p>
              <p className="text-gray-700 ">Price: ${drone.Price}</p>
            </div>
            <div className="flex justify-center sticky bottom-4 mt-2">
              <button onClick={() => addToCart(drone)} className="bg-black text-white hover:bg-white hover:text-black  px-4 py-2 rounded-md mr-2">Add To Cart</button>

            </div>
          </div>
        ))}
      </div>

    </div>

  );

};

export default DroneList;
