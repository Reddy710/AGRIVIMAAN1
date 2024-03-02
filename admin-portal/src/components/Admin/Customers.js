import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Orders = ({usersCount, setUsersCount}) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem('accessToken');
  const headers = {
    Authorization: token,
  }

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/users/allUsers`,{headers});
      setUsers(response.data);
      setUsersCount(response.data.length)
    } catch (error) {
      console.error('Error while fetching orders:', error);
    }
  };
  return (
    <div className="pt-24 container mx-auto">
      <h1 className="text-2xl font-bold mb-6"><strong>Customers</strong></h1>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-white">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Name</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
            <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.UserID} className="hover:bg-gray-200 cursor-pointer">
              <td className="px-6 py-4 whitespace-nowrap">{user.UserID}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.Name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.phone_number}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.StreetAddress}, {user.City}, {user.State}, {user.Zip}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
