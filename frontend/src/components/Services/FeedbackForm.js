import React, { useState } from 'react';
import axios from 'axios';

const FeedbackForm = () => {
    const [feedbackData, setFeedbackData] = useState({
        name: '',
        phoneNumber: '',
        serviceType: '',
        rating: 0,
        comments: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFeedbackData({ ...feedbackData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/feedback', feedbackData);
            console.log('Feedback submitted:', response.data);
            // Add code to show a success message or redirect to a thank-you page
        } catch (error) {
            console.error('Error submitting feedback:', error);
            // Add code to handle errors
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-40">
            <h2 className="text-2xl font-semibold mb-4">Provide Your Feedback</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1">Name:</label>
                    <input type="text" name="name" value={feedbackData.name} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md" />
                </div>
                <div>
                    <label className="block mb-1">Phone Number:</label>
                    <input type="email" name="email" value={feedbackData.phoneNumber} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" />
                </div>
                <div>
                    <label className="block mb-1">Service Type:</label>
                    <select name="serviceType" value={feedbackData.serviceType} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md">
                        <option value="">Select Service Type</option>
                        <option value="Spraying">Drone Spraying</option>
                        <option value="Repairing">Drone Repairing</option>
                    </select>
                </div>
                <div>
                    <label className="block mb-1">Rating:</label>
                    <input type="number" name="rating" value={feedbackData.rating} min="1" max="5" onChange={handleChange} required className="w-full px-4 py-2 border rounded-md" />
                </div>
                <div>
                    <label className="block mb-1">Comments:</label>
                    <textarea name="comments" value={feedbackData.comments} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md" />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">Submit Feedback</button>
            </form>
        </div>
    );
};

export default FeedbackForm;
