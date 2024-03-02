import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RepairRequests = ({repaireRequestCount, setRepaireRequestCount}) => {
  const navigate = useNavigate();
  const [repairingRequests, setRepairingRequests] = useState([]);
  const [selectedRequestFrom, setSelectedRepairingRequests] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedRepairId, setSelectedRepairId] = useState(null);
  
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
      const repairingRequestResponse = await axios.get(`http://localhost:8000/repair_form/`, {
        headers,
      });
      setRepairingRequests(repairingRequestResponse.data);
      setRepaireRequestCount(repairingRequestResponse.data.length)
      console.log('Update repair status response:', repaireRequestCount);
    } catch (error) {
      console.error('Error while fetching requests:', error);
    }
  };

  const handleTableRowClick = (requestForm) => {
    setSelectedRepairingRequests(requestForm);
  };

  const handleUpdateRepairStatus = async (repairId, repairStatus) => {
    if (window.confirm(`Are you sure you want to set the status to ${repairStatus}?`)) {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          throw new Error('No token found');
        }
        const response = await axios.put(`http://localhost:8000/repair_form/update_status/${repairId}`, {repairStatus});
        console.log('Update status response:', response.data);
        
        
        fetchData(); // Refresh the data after updating status
      } catch (error) {
        console.error('Error while updating the Repair Status:', error);
      }
    }
  };

  const handleDropdownToggle = (repairId) => {
    setDropdownVisible(!dropdownVisible);
    setSelectedRepairId(repairId);
  };
  const handleAssign = (repairId) =>{
    navigate('/assign')
  }

  return (
    <div className="pt-24 container mx-auto">
      <h1 className="text-2xl font-bold mb-6"><strong>All Repair Requests</strong></h1>
      <div>
        <h2 className="text-1xl font-bold mb-6"><strong>Repair Requests</strong></h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
          <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Repair Id</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Id</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue Descreption</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Repair Requested Date</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Repair Status</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Repair Category</th>
              <th scope="col" className="relative px-6 py-3"><span className="sr-only">View Details</span></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {repairingRequests.map((requestForm) => (
              <tr key={requestForm.repairId} className="hover:bg-gray-200 cursor-pointer" onClick={() => handleTableRowClick(selectedRequestFrom)}>
                 <td className="px-6 py-4 whitespace-nowrap">{requestForm.repairId}</td>
                <td className="px-6 py-4 whitespace-nowrap">{requestForm.userId}</td>
                <td className="px-6 py-4 whitespace-nowrap">{requestForm.userName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{requestForm.phoneNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap">{requestForm.StreetAddress}, {requestForm.City}, {requestForm.State}, {requestForm.Zip}</td>
                <td className="px-6 py-4 whitespace-nowrap">{requestForm.issueDescription}</td>
                <td className="px-6 py-4 whitespace-nowrap">{requestForm.repairDate.slice(0, 10)}</td>
                <td className="px-6 py-4 whitespace-nowrap">{requestForm.repairStatus}</td>
                <td className="px-6 py-4 whitespace-nowrap">{requestForm.repairCategory}</td>                
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="relative">
                    <button
                      className="bg-black hover:bg-gray-900 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                      onClick={() => handleDropdownToggle(requestForm.repairId)}
                    >
                      Change Status
                    </button>
                    {dropdownVisible && selectedRepairId === requestForm.repairId && (
                      <div className="absolute mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                        {['Pending', 'Assigned', 'Hold', 'In Progress', 'Completed', 'Cancelled'].map(status => (
                          <button
                            key={status}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            onClick={() => handleUpdateRepairStatus(requestForm.repairId, status)}
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

export default RepairRequests;
