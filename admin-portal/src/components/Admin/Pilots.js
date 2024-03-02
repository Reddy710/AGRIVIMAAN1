import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Pilots = () => {
  const navigate = useNavigate();
  const [pilots, setPilots] = useState([]);
  const token = localStorage.getItem('accessToken');
  const headers = {
    Authorization: token,
  }

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/pilots/pilots`,{headers});
      console.log(response)
      setPilots(response.data);
    } catch (error) {
      console.error('Error while fetching pilots:', error);
    }
  };
  return (
    <div className="pt-24 container mx-auto">
      <h1 className="text-2xl font-bold mb-6"><strong>Pilots</strong></h1>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-white">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pilot ID</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pilot Name</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Proffession</th>
            <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {pilots.map((pilot) => (
            <tr key={pilot.UserID} className="hover:bg-gray-200 cursor-pointer">
              <td className="px-6 py-4 whitespace-nowrap">{pilot.pilot_id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{pilot.username}</td>
              <td className="px-6 py-4 whitespace-nowrap">{pilot.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{pilot.phone_number}</td>
              <td className="px-6 py-4 whitespace-nowrap">{pilot.profession}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Pilots;