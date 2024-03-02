// AddDroneForm.js

import React, { useState } from 'react';
import axios from 'axios';

const AddDroneForm = () => {
    const [successMessage,setSuccessMessage] = useState('')
    const [droneData, setDroneData] = useState({
        drone_name: '',
        drone_model: '',
        Drone_img: '',
        Price: '',
        QuantityInStock: '',
        last_maintenance_date: '',
        Status: 'Available'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDroneData({ ...droneData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/drones/', droneData);
            console.log(response.data);
            if(response.data.massage === 200)
            {
                setSuccessMessage(response.data.massage)
                setDroneData('')
            }else {
                console.error('creation of new drone is failes');
              }
        } catch (error) {
            console.error('Error adding drone:', error);
            // Handle error, show error message, etc.
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-20">
            <h2 className="text-2xl font-bold mb-4">Add New Drone</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="drone_name" className="block text-sm font-medium text-gray-700">Drone Name:</label>
                    <input type="text" id="drone_name" name="drone_name" value={droneData.drone_name} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>

                <div>
                    <label htmlFor="drone_model" className="block text-sm font-medium text-gray-700">Drone Model:</label>
                    <input type="text" id="drone_model" name="drone_model" value={droneData.drone_model} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>

                <div>
                    <label htmlFor="Drone_img" className="block text-sm font-medium text-gray-700">Drone Image URL:</label>
                    <input type="text" id="Drone_img" name="Drone_img" value={droneData.Drone_img} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>

                <div>
                    <label htmlFor="Price" className="block text-sm font-medium text-gray-700">Price:</label>
                    <input type="text" id="Price" name="Price" value={droneData.Price} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>

                <div>
                    <label htmlFor="QuantityInStock" className="block text-sm font-medium text-gray-700">Quantity In Stock:</label>
                    <input type="text" id="QuantityInStock" name="QuantityInStock" value={droneData.QuantityInStock} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>

                <div>
                    <label htmlFor="last_maintenance_date" className="block text-sm font-medium text-gray-700">Last Maintenance Date:</label>
                    <input type="date" id="last_maintenance_date" name="last_maintenance_date" value={droneData.last_maintenance_date} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>

                <div>
                    <label htmlFor="Status" className="block text-sm font-medium text-gray-700">Status:</label>
                    <select id="Status" name="Status" value={droneData.Status} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full">
                        <option value="Available">Available</option>
                        <option value="In Service">In Service</option>
                        <option value="Maintenance">Maintenance</option>
                    </select>
                </div>
                {successMessage && <div className="text-green-600">{successMessage}</div>}
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Add Drone</button>
            </form>
        </div>
    );
};

export default AddDroneForm;
