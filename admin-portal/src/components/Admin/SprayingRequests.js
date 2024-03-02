
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AssignServices from './AssignServices'
const SprayingRequests = ({sprayingRequestCount, setSprayingRequestCount}) => {
  const navigate = useNavigate();
  const [sprayingRequests, setSprayingRequests] = useState([]);
  const [selectedRequestFrom, setSelectedSprayingRequests] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedSprayingId, setSelectedSprayingId] = useState(null);
  const [userId, setUserId] = useState(null)
  const token = localStorage.getItem('accessToken');
  const headers = {
    Authorization: token,
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      if (!token) {
        throw new Error('No token found');
      }
      const sprayingRequestResponse = await axios.get(`http://localhost:8000/spraying_form/`, {
        headers,
      });
      setSprayingRequests(sprayingRequestResponse.data);
      setSprayingRequestCount(sprayingRequests.length)
    } catch (error) {
      console.error('Error while fetching requests:', error);
    }
  };

  const handleTableRowClick = (requestForm) => {
    setSelectedSprayingRequests(requestForm);
  };

  const handleUpdateRepairStatus = async (sprayingId, sprayingStatus) => {
    if (window.confirm(`Are you sure you want to set the status to ${sprayingStatus}?`)) {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          throw new Error('No token found');
        }
        const response = await axios.put(`http://localhost:8000/spraying_form/update_status/${sprayingId}`, {sprayingStatus});
        console.log('Update status response:', response.data);
        fetchData(); // Refresh the data after updating status
      } catch (error) {
        console.error('Error while updating the Repair Status:', error);
      }
    }
  };

  const handleDropdownToggle = (sprayingId) => {
    setDropdownVisible(!dropdownVisible);
    setSelectedSprayingId(sprayingId);
  };
  const handleAssign = (sprayingId) =>{
    navigate('/assign')
  }

  return (
    <div className="pt-24 container mx-auto">
      <h1 className="text-2xl font-bold mb-6"><strong>All Spraying Requests</strong></h1>
      <div>
        <h2 className="text-1xl font-bold mb-6"><strong>Spraying Requests</strong></h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
          <tr>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Spraying Id</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Id</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service Category</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acers To Spray</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chemical Used</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service Requested Date</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Spraying Request Status</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
              <th scope="col" className="relative px-6 py-3"><span className="sr-only">View Details</span></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sprayingRequests.map((requestForm) => (
              <tr key={requestForm.sprayingId} className="hover:bg-gray-200 cursor-pointer" onClick={() => handleTableRowClick(selectedRequestFrom)}>
                  <td className="px-6 py-4 whitespace-nowrap">{requestForm.sprayingId}</td>
                <td className="px-6 py-4 whitespace-nowrap">{requestForm.userId}</td>
                <td className="px-6 py-4 whitespace-nowrap">{requestForm.userName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{requestForm.phoneNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap">{requestForm.serviceCategory}</td>
                <td className="px-6 py-4 whitespace-nowrap">{requestForm.acersToSpray}</td>
                <td className="px-6 py-4 whitespace-nowrap">{requestForm.chemicalUsed}</td>
                <td className="px-6 py-4 whitespace-nowrap">{requestForm.serviceRequestedDate.slice(0,10)}</td>
                <td className="px-6 py-4 whitespace-nowrap">{requestForm.sprayingStatus}</td>
                <td className="px-6 py-4 whitespace-nowrap">{requestForm.StreetAddress}, {requestForm.City}, {requestForm.State}, {requestForm.Zip}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="relative">
                    <button
                      className="bg-black hover:bg-gray-900 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                      onClick={() => handleDropdownToggle(requestForm.sprayingId)}
                    >
                      Change Status
                    </button>
                    {dropdownVisible && selectedSprayingId === requestForm.sprayingId && (
                      <div className="absolute mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                        {['Pending', 'Assigned', 'Hold', 'In Progress', 'Completed', 'Cancelled'].map(status => (
                          <button
                            key={status}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            onClick={() => handleUpdateRepairStatus(requestForm.sprayingId, status)}
                          >
                            {status}
                          </button>
                        ))}
                        
                      </div>
                    )}
                    <button
                        className="bg-black hover:bg-gray-900 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                        onClick={handleAssign}
                      >
                        Assign
                        {/* <AssignServices userId = {userId}/> */}
                      </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SprayingRequests;
