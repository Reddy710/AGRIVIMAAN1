import React, { useState } from "react";
import axios from "axios";
import image from '../../Data/images/Drone-img.png'

const DroneRepairForm = () => {
  // State to manage form data
  const [userName, setUserName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [issueDescription, setIssueDescription] = useState('');
  const [repairDate, setRepairDate] = useState('');
  const [repairCategory, setRepairCategory] = useState('');
  const [Country, setCountry] = useState('');
  const [StreetAddress, setStreetAddress] = useState('');
  const [City, setCity] = useState('');
  const [State, setState] = useState('');
  const [Zip, setZip] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const userDetailsString = localStorage.getItem('userDetails');
  const userDetails = JSON.parse(userDetailsString);
  const userId = userDetails.UserID;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/repair_form", {
        userId,
        userName,
        phoneNumber,
        StreetAddress,
        Country,
        City,
        State,
        Zip,
        issueDescription,
        repairDate,
        repairCategory,
      });

      // Handle response
      if (response.status === 201) {
        console.log("POST request successful");
        const massage = response.data.message;
        setSuccessMessage(massage);
      } else {
        console.error("POST request failed");
        // Additional error handling
      }
    } catch (error) {
      console.error("Error during POST request:", error);
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center  flex justify-center items-center mt-10">
    {successMessage ? (
      <div className="bg-green-300 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-center">Success!</h2>
        <div className="flex items-center justify-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white-500 mr-2 animate-bounce"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <p className="text-white">{successMessage}</p>
          
        </div>
        <p className="text-white flex items-center justify-center mb-4"> Your request will be fullfilled in 2 to 3 days</p>
        <div className="bg-white bg-opacity-75 p-8 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">
            For any queries contact below person from our team:
          </h2>
          <p>Name: Bharath</p>
          <p>Phone: 8939872899</p>
        </div>
      </div>
      ) : (
        <div className="border-solid mt-20">
          <h2 className="text-xl font-semibold mb-4 text-center">Drone Repairing Service</h2>
          <div className="w-4/4 bg-white bg-opacity-75 p-5 rounded-lg flex items-center justify-between justify-items-center">
            <div className="w-1/2 pr-8">
              <div className="flex flex-col ">
                <article className="ml-2">
                  <h3 className="text-balance text-center "><strong>Welcome to Agrivimaan Drone Repairing Service</strong></h3>
                  <p>&nbsp;&nbsp;At Agrivimaan, we understand the importance of keeping your drones in top condition to ensure optimal performance in agricultural operations.
                    Our Drone Repairing Service is dedicated to providing swift and reliable repair solutions for all your drone maintenance needs.</p>
                  {/* <p>&nbsp;&nbsp;With Agrivimaan's expertise and specialized repair services, you can trust us to handle everything from minor repairs to major overhauls with precision and efficiency. 
                        Our skilled technicians are equipped to address a wide range of issues, including frame and bodywork repairs, battery replacement, camera and gimbal repairs, and water damage restoration.</p>
                    <p>&nbsp;&nbsp;At Agrivimaan, we prioritize quality craftsmanship and timely service to minimize downtime and maximize your drone's operational lifespan. 
                      Partner with us for unparalleled expertise and exceptional service in drone repair and maintenance.</p>
                    <p>&nbsp;&nbsp;Experience peace of mind knowing that your drones are in capable hands with Agrivimaan Drone Repairing Service. 
                      Let us help you keep your agricultural operations running smoothly and efficiently.</p> */}
                </article>
                <img
                  src={image}
                  alt="image"
                  style={{ width: "100%", height: "auto", marginLeft: "10px" }}
                  className="rounded-md"
                />
              </div>
            </div>
            <form className="w-2/4 mt-10 p-6 bg-white rounded-lg shadow-md" onSubmit={handleSubmit}>
              <input
                className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:border-blue-500"
                type="text"
                placeholder="User Name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <input
                className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:border-blue-500"
                type="text"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <textarea
                className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:border-blue-500"
                placeholder="Issue Description"
                rows="4"
                value={issueDescription}
                onChange={(e) => setIssueDescription(e.target.value)}
              ></textarea>
              <input
                className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:border-blue-500"
                type="date"
                placeholder="Repair Date"
                value={repairDate}
                onChange={(e) => setRepairDate(e.target.value)}
              />
              <select
                className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:border-blue-500"
                value={repairCategory}
                onChange={(e) => setRepairCategory(e.target.value)}
              >
                <option value="">Select Repair Category</option>
                <option value="Frame and Bodywork Repair">Frame and Bodywork Repair</option>
                <option value="Battery Repair/Replacement">Battery Repair/Replacement</option>
                <option value="Camera and Gimbal Repair">Camera and Gimbal Repair</option>
                <option value="Water Damage Repair">Water Damage Repair</option>
              </select>
              <input
                className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:border-blue-500"
                type="text"
                placeholder="Street Address"
                value={StreetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
              />
              <div className="flex gap-3">
                <input
                  className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:border-blue-500"
                  type="text"
                  placeholder="Country"
                  value={Country}
                  onChange={(e) => setCountry(e.target.value)}
                />

                <input
                  className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:border-blue-500"
                  type="text"
                  placeholder="City"
                  value={City}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="flex gap-3">
                <input
                  className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:border-blue-500"
                  type="text"
                  placeholder="State"
                  value={State}
                  onChange={(e) => setState(e.target.value)}
                />

                <input
                  className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:border-blue-500"
                  type="text"
                  placeholder="ZIP"
                  value={Zip}
                  onChange={(e) => setZip(e.target.value)}
                />
              </div>
              <button className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 focus:outline-none" type="submit">Submit</button>
              {successMessage && <div className="text-green-600">{successMessage}</div>}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DroneRepairForm;
