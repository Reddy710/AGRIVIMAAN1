// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Orders = ({orderCount, setOrderCount}) => {
//   const navigate = useNavigate();
//   const [orders, setOrders] = useState([]);
//   const token = localStorage.getItem('accessToken');
//   const headers = {
//     Authorization: token,
//   }

//   useEffect(() => {
//     fetchData();
//   }, [orderCount]);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get(`http://localhost:8000/order`);
//       setOrders(response.data);
//       setOrderCount(orders.length)
//       console.log(orderCount,"from orders")
//     } catch (error) {
//       console.error('Error while fetching orders:', error);
//     }
//   };

//   const updateOrderStatus = async (orderId, updatedStatus) => {
//     console.log(orderId, updatedStatus)
//     try {
//       const token = localStorage.getItem('accessToken');

//       if (!token) {
//         throw new Error('No token found');
//       }

//       await axios.put(`http://localhost:8000/order/status/${orderId}`, { updatedStatus }, {headers});
//       fetchData();
//     } catch (error) {
//       console.error('Error while updating order status:', error);
//     }
//   };

//   return (
//     <div className="pt-24 container mx-auto">
//       <h1 className="text-2xl font-bold mb-6"><strong>Orders</strong></h1>
//       <table className="min-w-full divide-y divide-gray-200">
//         <thead className="bg-white">
//           <tr>
//             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
//             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
//             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Name</th>
//             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Quantity</th>
//             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
//             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ordered Date</th>
//             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
//             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ordered Status</th>
//             <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-200">
//           {orders.map((order) => (
//             <tr key={order.OrderID} className="hover:bg-gray-200 cursor-pointer">
//               <td className="px-6 py-4 whitespace-nowrap">{order.UserID}</td>
//               <td className="px-6 py-4 whitespace-nowrap">{order.OrderID}</td>
//               <td className="px-6 py-4 whitespace-nowrap">{order.UserName}</td>
//               <td className="px-6 py-4 whitespace-nowrap">{order.OrderQuantity}</td>
//               <td className="px-6 py-4 whitespace-nowrap">{order.TotalAmount}</td>
//               <td className="px-6 py-4 whitespace-nowrap">{order.OrderDate.slice(0,10)}</td>
//               <td className="px-6 py-4 whitespace-nowrap">{order.Address}</td>
//               <td className="px-6 py-4 whitespace-nowrap">{order.OrderStatus}</td>
//               <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex flex-wrap">
//                 <button 
//                   className="bg-black hover:bg-gray-900 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" 
//                   type="button" 
//                   onClick={() => updateOrderStatus(order.OrderID, 'Pending')}>
//                   Pending
//                 </button>
//                 <button 
//                   className="bg-black hover:bg-gray-900 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" 
//                   type="button" 
//                   onClick={() => updateOrderStatus(order.OrderID, 'Packed')}>
//                   Packed
//                 </button>
//                 <button 
//                   className="bg-black hover:bg-gray-900 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" 
//                   type="button" 
//                   onClick={() => updateOrderStatus(order.OrderID, 'Dispatched')}>
//                   Dispatched
//                 </button>
//                 <button 
//                   className="bg-black hover:bg-gray-900 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" 
//                   type="button" 
//                   onClick={() => updateOrderStatus(order.OrderID, 'Delivered')}>
//                   Delivered
//                 </button>
//                 {/* <button 
//                   className="bg-black hover:bg-gray-900 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" 
//                   type="button" 
//                   onClick={() => updateOrderStatus(order.OrderID, 'Cancelled')}>
//                   Cancelled
//                 </button> */}
//                 <button 
//                   className="bg-black hover:bg-gray-900 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" 
//                   type="button" 
//                   onClick={() => updateOrderStatus(order.OrderID, 'Rejected')}>
//                   Rejected
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Orders;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
  
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const token = localStorage.getItem('accessToken');
  const headers = {
    Authorization: token,
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/order`);
      setOrders(response.data);
    } catch (error) {
      console.error('Error while fetching orders:', error);
    }
  };

  const updateOrderStatus = async (orderId, updatedStatus) => {
    try {
      await axios.put(
        `http://localhost:8000/order/status/${orderId}`,
        { updatedStatus },
        { headers }
      );
      fetchData();
    } catch (error) {
      console.error('Error while updating order status:', error);
    }
  };

  const handleDropdownToggle = (orderId) => {
    setSelectedOrderId(orderId);
    setDropdownVisible(!dropdownVisible);
  };

  const handleStatusChange = (status) => {
    updateOrderStatus(selectedOrderId, status);
    setDropdownVisible(false);
  };

  return (
    <div className="pt-24 container mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        <strong>Orders</strong>
      </h1>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-white">
          <tr>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
            {/* <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Name</th> */}
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Quantity</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ordered Date</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ordered Status</th>
            {/* <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invioce</th> */}
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Status</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TransactionId</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
            <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.map((order) => (
            <tr
              key={order.OrderID}
              className="hover:bg-gray-200 cursor-pointer"
            >
               {/* <td className="px-6 py-4 whitespace-nowrap">{order.UserID}</td> */}
               <td className="px-6 py-4 whitespace-nowrap">{order.OrderID}</td>
              {/* <td className="px-6 py-4 whitespace-nowrap">{order.UserName}</td> */}
              <td className="px-6 py-4 whitespace-nowrap">{order.OrderQuantity}</td>
              <td className="px-6 py-4 whitespace-nowrap">{order.TotalAmount}</td>
              <td className="px-6 py-4 whitespace-nowrap">{order.OrderDate.slice(0,10)}</td>
              <td className="px-6 py-4 whitespace-nowrap">{order.OrderStatus}</td>
              {/* <td className="px-6 py-4 whitespace-nowrap">{order.ReceiptUrl}</td> */}
              <td className="px-6 py-4 whitespace-nowrap">{order.PaymentStatus}</td>
              <td className="px-6 py-4 whitespace-nowrap">{order.TransactionId}</td>
              <td className="px-6 py-4 whitespace-nowrap">{order.AddressType}, {order.RecipiantName}, {order.StreetAddress}, {order.City}, {order.State}, {order.PostalCode}</td>
              <td>
                <div className="relative">
                  <button
                    className="bg-black hover:bg-gray-900 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                    onClick={() => handleDropdownToggle(order.OrderID)}
                  >
                    Change Status
                  </button>
                  {dropdownVisible && selectedOrderId === order.OrderID && (
                    <div className="absolute mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                      <button
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        onClick={() => handleStatusChange('Pending')}
                      >
                        Pending
                      </button>
                      <button
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        onClick={() => handleStatusChange('Packed')}
                      >
                        Packed
                      </button>
                      <button
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        onClick={() => handleStatusChange('Dispatched')}
                      >
                        Dispatched
                      </button>
                      <button
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        onClick={() => handleStatusChange('Delivered')}
                      >
                        Delivered
                      </button>
                      <button
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        onClick={() => handleStatusChange('Rejected')}
                      >
                        Rejected
                      </button>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;

