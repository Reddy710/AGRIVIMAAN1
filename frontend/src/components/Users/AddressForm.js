import React, { useState } from 'react';
import axios from 'axios';

const AddressForm = () => {
    const [successMessage, setSuccessMessage] = useState('')
    const [formData, setFormData] = useState({
        recipient_name: '',
        address_type: '',
        street_address: '',
        city: '',
        state: '',
        postal_code: '',
        country: ''
    });
    const userDetailsString = localStorage.getItem('userDetails');
    const userDetails = JSON.parse(userDetailsString);
    const user_id = userDetails.UserID;

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:8000/address`, {
                ...formData,
                user_id: user_id
            });
            console.log('Address added:', response.data);
            // Invoke the callback function to notify the parent component
            if (response.status === "Address created successfully") {
                setSuccessMessage(response.data.massage)
                setFormData('')
                
            } else {
                console.error('creation of new drone is failes');
            }

        } catch (error) {
            console.error('Error adding address:', error);
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-20">
            <h2 className="text-xl font-semibold mb-4">Add New Address</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="recipient_name" className="block text-sm font-medium text-gray-700">Recipient Name</label>
                    <input 
                    type="text" 
                    name="recipient_name" 
                    id="recipient_name" 
                    value={formData.recipient_name} 
                    onChange={handleChange} required 
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full" 
                    />
                </div>
                <div>
                    <label htmlFor="address_type" className="block text-sm font-medium text-gray-700">Address Type</label>
                    <input
                        type="text"
                        name="address_type"
                        id="address_type"
                        value={formData.address_type}
                        onChange={handleChange}
                        required
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div>
                    <label htmlFor="street_address" className="block text-sm font-medium text-gray-700">Street Address</label>
                    <input type="text" name="street_address" id="street_address" value={formData.street_address} onChange={handleChange} required className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>
                <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                    <input type="text" name="city" id="city" value={formData.city} onChange={handleChange} required className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>
                <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
                    <input type="text" name="state" id="state" value={formData.state} onChange={handleChange} required className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>
                <div>
                    <label htmlFor="postal_code" className="block text-sm font-medium text-gray-700">Postal Code</label>
                    <input type="text" name="postal_code" id="postal_code" value={formData.postal_code} onChange={handleChange} required className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>
                <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                    <input type="text" name="country" id="country" value={formData.country} onChange={handleChange} required className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>
                {successMessage && <div className="text-green-600">{successMessage}</div>}
                <div>
                    <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Add Address
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddressForm;
