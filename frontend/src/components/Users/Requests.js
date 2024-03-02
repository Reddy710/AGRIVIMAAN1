
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { jwtDecode } from 'jwt-decode'; // Import jwtDecode directly
// import { FaTimes } from 'react-icons/fa';

const Requests = () => {
  const navigate = useNavigate();
  const [sprayingRequests, setSprayingRequests] = useState([]);
  const [repairingRequests, setRepairingRequests] = useState([]);
  const [selectedRequestFrom, setSelectedSprayingRequests] = useState(null);
  // const token = localStorage.getItem('accessToken');
  // const headers = {
  //   Authorization: ${token},
  // };

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

      const sprayingRequestResponse = await axios.get(`http://localhost:8000/spraying_form/form/${userId}`, {
        headers: {
          Authorization: token,
        },
      });
      setSprayingRequests(sprayingRequestResponse.data);
      console.log(sprayingRequests)

      const repairingRequestResponse = await axios.get(`http://localhost:8000/repair_form/form/${userId}`, {
        headers: {
          Authorization: token,
        },
      });
      setRepairingRequests(repairingRequestResponse.data);
      console.log(repairingRequests)
    } catch (error) {
      console.error('Error while fetching requests:', error);
      //   navigate('/login');
    }
  };

  const handleTableRowClick = (requestForm) => {
    setSelectedSprayingRequests(requestForm);
  };

  // const deleteRequests = async ( sprayingId, repairId) => {
  //   try {
  //     const token = localStorage.getItem('accessToken');
  //     if (!token) {
  //       throw new Error('No token found');
  //     }

  //    const sprayingResponse = await axios.delete(`http://localhost:8000/spraying_form/delete_form/${sprayingId}`, {
  //       headers: {
  //         Authorization: token,
  //       },
  //     });

  //     const repairingResponse = await axios.delete(`http://localhost:8000/repair_form/delete_form/${repairId}`, {
  //       headers: {
  //         Authorization: token,
  //       },
  //     });
  //     // After deletion, refetch data
  //     fetchData();
  //     window.location.reload();
  //   } catch (error) {
  //     console.error('Error while deleting the Request Form:', error);
  //   }
  // };

  const handleCancelSprayingRequest = async (sprayingId) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.put(`http://localhost:8000/spraying_form/cancel_request/${sprayingId}`, {
          headers: {
            Authorization: token,
          },
        });
        console.log('Cancellation response:', response.data);
        fetchData();
        window.location.reload();
      } catch (error) {
        console.error('Error while deleting the Request Form:', error);

      }
    };
  }

  const handleCancelRepairingRequest = async (repairId) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          throw new Error('No token found');
        }
        const response = await axios.put(`http://localhost:8000/repair_form/cancel_request/${repairId}`, {
          headers: {
            Authorization: token,
          },
        });
        console.log('Cancellation response:', response.data);
        fetchData();
        window.location.reload();
      } catch (error) {
        console.error('Error while deleting the Request Form:', error);
      }
    };
  }
  return (
    <div className="pt-24 container mx-auto">
      <h1 className="text-2xl font-bold mb-6"><strong>Your Requests</strong></h1>
      <div>
        <h2 className="text-1xl font-bold mb-6"><strong>Spraying Requests</strong></h2>
        <table className="min-w-full divide-y divide-gray-200">
          {/* Table header */}
          {/* Table body */}
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Spraying Id</th>
              {/* <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Id</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Name</th> */}
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
                {/* <td className="px-6 py-4 whitespace-nowrap">{requestForm.userId}</td>
                <td className="px-6 py-4 whitespace-nowrap">{requestForm.userName}</td> */}
                <td className="px-6 py-4 whitespace-nowrap">{requestForm.phoneNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap">{requestForm.serviceCategory}</td>
                <td className="px-6 py-4 whitespace-nowrap">{requestForm.acersToSpray}</td>
                <td className="px-6 py-4 whitespace-nowrap">{requestForm.chemicalUsed}</td>
                <td className="px-6 py-4 whitespace-nowrap">{requestForm.serviceRequestedDate.slice(0, 10)}</td>
                <td className="px-6 py-4 whitespace-nowrap">{requestForm.sprayingStatus}</td>
                <td className="px-6 py-4 whitespace-nowrap">{requestForm.StreetAddress}, {requestForm.City}, {requestForm.State}, {requestForm.Zip}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {/* Delete button */}
                  <button
                    className="bg-black hover:bg-gray-900  uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => handleCancelSprayingRequest(requestForm.sprayingId)}>
                    Cancle
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h2 className="text-1xl font-bold mb-6"><strong>Repair Requests</strong></h2>
        <table className="min-w-full divide-y divide-gray-200">
          {/* Table header */}
          {/* Table body */}
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Repair Id</th>
              {/* <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Id</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Name</th> */}
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
                {/* <td className="px-6 py-4 whitespace-nowrap">{requestForm.userId}</td>
                <td className="px-6 py-4 whitespace-nowrap">{requestForm.userName}</td> */}
                <td className="px-6 py-4 whitespace-nowrap">{requestForm.phoneNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap">{requestForm.StreetAddress}, {requestForm.City}, {requestForm.State}, {requestForm.Zip}</td>
                <td className="px-6 py-4 whitespace-nowrap">{requestForm.issueDescription}</td>
                <td className="px-6 py-4 whitespace-nowrap">{requestForm.repairDate.slice(0, 10)}</td>
                <td className="px-6 py-4 whitespace-nowrap">{requestForm.repairStatus}</td>
                <td className="px-6 py-4 whitespace-nowrap">{requestForm.repairCategory}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {/* Delete button */}
                  <button
                    className="bg-black hover:bg-gray-900  uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => handleCancelRepairingRequest(requestForm.repairId)}>
                    Cancle
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Requests;