import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { jwtDecode } from 'jwt-decode'; // Import jwtDecode directly
// import { FaTimes } from 'react-icons/fa';

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('No token found');
      }

      // Decode the token to extract patientId
    //   const decodedToken = jwtDecode(token); // Use jwtDecode instead of jwt_decode
    //   const userId = decodedToken.userId;
     const userDetailsString = localStorage.getItem('userDetails');
      const userDetails = JSON.parse(userDetailsString);
      const userId = userDetails.UserID;
      const response = await axios.get(`http://localhost:8000/order/orders/${userId}`, {
        headers: {
          Authorization: token,
        },
      });
      setOrders(response.data);
      console.log(orders)
    } catch (error) {
      console.error('Error while fetching orders:', error);
    //   navigate('/login');
    }
  };

  const handleTableRowClick = (order) => {
    setSelectedOrder(order);
  };

  // const deleteOrder= async (orderId) => {
  //   try {
  //     const token = localStorage.getItem('accessToken');

  //     if (!token) {
  //       throw new Error('No token found');
  //     }

  //     await axios.delete(`http://localhost:8000/order/delete/${orderId}`, {
  //       headers: {
  //         Authorization: token,
  //       },
  //     });

  //     // After deletion, refetch data
  //     fetchData();
  //   } catch (error) {
  //     console.error('Error while deleting the order:', error);
  //   }
  // };

  const cancelOrder= async (orderId) => {
    try {
      const token = localStorage.getItem('accessToken');

      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.put(`http://localhost:8000/order/cancel_order/${orderId}`, {
        headers: {
          Authorization: token,
        },
      });

      // After deletion, refetch data
      fetchData();
    } catch (error) {
      console.error('Error while deleting the order:', error);
    }
  };

  return (
    <div className="pt-24 container mx-auto">
      <h1 className="text-2xl font-bold mb-6"><strong>Your Orders</strong></h1>
      <table className="min-w-full divide-y divide-gray-200">
        {/* Table header */}
        {/* Table body */}
        <thead className="bg-white">
          <tr>
            {/* <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th> */}
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
            {/* <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Name</th> */}
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Quantity</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ordered Date</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ordered Status</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invioce</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Status</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TransactionId</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
            <th scope="col" className="relative px-6 py-3"><span className="sr-only">View Details</span></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.map((order) => (
            <tr key={order.OrderID} className="hover:bg-gray-200 cursor-pointer" onClick={() => handleTableRowClick(selectedOrder)}>

              {/* <td className="px-6 py-4 whitespace-nowrap">{order.UserID}</td> */}
              <td className="px-6 py-4 whitespace-nowrap">{order.OrderID}</td>
              {/* <td className="px-6 py-4 whitespace-nowrap">{order.UserName}</td> */}
              <td className="px-6 py-4 whitespace-nowrap">{order.OrderQuantity}</td>
              <td className="px-6 py-4 whitespace-nowrap">{order.TotalAmount}</td>
              <td className="px-6 py-4 whitespace-nowrap">{order.OrderDate.slice(0,10)}</td>
              <td className="px-6 py-4 whitespace-nowrap">{order.OrderStatus}</td>
              <td className="px-6 py-4 whitespace-nowrap">{order.ReceiptUrl}</td>
              <td className="px-6 py-4 whitespace-nowrap">{order.PaymentStatus}</td>
              <td className="px-6 py-4 whitespace-nowrap">{order.TransactionId}</td>
              <td className="px-6 py-4 whitespace-nowrap">{order.AddressType}, {order.RecipiantName}, {order.StreetAddress}, {order.City}, {order.State}, {order.PostalCode}</td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                {/* Delete button */} 
                <button 
                className="bg-black hover:bg-gray-900  uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" 
                type="button" 
                onClick={() => cancelOrder(order.OrderID)}>
                Cancel
                  </button>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;