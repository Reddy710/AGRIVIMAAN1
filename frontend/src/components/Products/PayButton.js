import axios from "axios";
import { toast } from "react-toastify";
import config from '../../config.js';
import StripeCheckout from "react-stripe-checkout"

const PayButton = ({ user, cartItems, selectedAddress }) => {
  console.log(user,cartItems, selectedAddress);
  const serverUrl = config.serverUrl;
  const token = localStorage.getItem('accessToken');
  const headers = {
    Authorization: token,
  }

  const handleCheckout = () => {
    toast.success("Redirecting to payment", {
      position: "bottom-center",
      autoClose: 1000,
      style: {
        borderRadius: '8px',
        backgroundColor: 'rgba(0,0,0,0.6)',
        color:'white',
      },
    });
    const formattedCartItems = cartItems.map(({ CartID, droneDetails, quantity, user_id }) => ({
      CartID,
      drone_id : droneDetails.drone_id,
      drone_name : droneDetails.drone_name,
      price: droneDetails.Price, // Accessing the price from droneDetails
      quantity,
      user_id
    }));
    axios
      .post(
        `${serverUrl}payments/create-checkout-session`,
        {
          user:user.Name,
          cartItems: formattedCartItems,
          selectedAddress
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data.url) {
          window.location.href = res.data.url;
         
        }
      })
      .catch((err) => console.log(err.message));
  };
  
 

  return (
    <>
      <button onClick={handleCheckout}>Check Out</button>
    </>
  );
};

export default PayButton;
