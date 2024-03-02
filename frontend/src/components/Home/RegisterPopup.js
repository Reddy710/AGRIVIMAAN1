import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button } from '@mui/material';
import Transition from '../Animations/Transitions';

const Register = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [country, setCountry] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [stateProvince, setStateProvince] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [open, setOpen] = useState(true);

  const navigate = useNavigate();

  const handleRegisterSubmit = async () => {
    try {
      if (password !== confirmPassword) {
        setPasswordErrorMessage('Passwords do not match');
        return;
      }
      else{
      const response = await axios.post('http://localhost:8000/users/register', {
        Name: name,
        phone_number: phoneNumber,
        Password: password,
        Country: country,
        StreetAddress: streetAddress,
        City: city,
        State: stateProvince,
        Zip: postalCode
      });

      console.log('Register response:', response.data);
      if (response.status === 201) {
        // Handle successful registration, e.g., show a success message
        console.log('Registration successful');
        setSuccessMessage('User registered successfully');
        setTimeout(() => {
          // Reset success message and close the registration dialog after some time (e.g., 3 seconds)
          setSuccessMessage('');
          // Close the registration dialog
          navigate('/login'); // Navigate to the login page
        }, 3000);
      } else {
        
        console.error('Registration failed');
      }
    }
    } catch (error) {
      // Handle network errors or other issues
      setErrorMessage('you entered invalid details');
      console.error('Error during registration:', error);
    }
  };

  const handleRegisterClose = () => {
    setOpen(false);
    navigate('/');
  };

  const handleLoginRedirect = () => {
    // You can use the navigate function to redirect to the registration page
    navigate('/login');
  };

  return (
    <Dialog open={open} TransitionComponent={Transition}>
      <DialogTitle>
        <Typography variant="h5" color="primary">
          Welcome to Agrivimaan
        </Typography>
        Register to Get Started
      </DialogTitle>
      <DialogContent>
        <section className="flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
          <div className="md:w-2/3 max-w-sm h-96">
            <img
              src="https://justperidrive.com/cdn/shop/products/RC-Quadcopter-1080P-Wide-Angle-Lens-270-Degree-Rotating-HD-Camera-Drone-Remote-Quadcopter-Fashion-Rc_169cd9f7-e271-491e-849a-75eb1b7afe89_1024x1024.jpg?v=1530077829"
              alt="Sample image"
              className="rounded"
            />
          </div>
          <div className="">
            <Typography variant="subtitle1" color="textSecondary" gutterBottom>
              Let's get you started with our soaring solutions for modern Agriculture.
            </Typography>
            <input
              className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
              type="text"
              placeholder="Your Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
              type="text"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <input
              className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
             {passwordErrorMessage && (
                <Typography variant="body2" color="red" gutterBottom>
                  {passwordErrorMessage}
                </Typography>
              )}
            <select
              className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
              value={country}
              placeholder="Select Country"
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="disabled">Select Country</option>
              <option value="India">India</option>
              <option value="America">America</option>
              <option value="Canada">Canada</option>
              <option value="Australia">Australia</option>
            </select>
            <input
              className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
              type="text"
              placeholder="Street Address"
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
            />
            <div className='flex gap-2'>
              <input
                className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
             
              <input
                className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
                type="text"
                placeholder="State / Province"
                value={stateProvince}
                onChange={(e) => setStateProvince(e.target.value)}
              />
              <input
                className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
                type="text"
                placeholder="ZIP / Postal code"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </div>
            <div className="text-center mt-6">
              <button
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
                type="submit"
                onClick={handleRegisterSubmit}
              >
                Register
              </button>
            </div>
          </div>
        </section>
        {/* Display success message */}
        {successMessage && (
          <Typography variant="body2" color="green" gutterBottom>
            {successMessage}
          </Typography>
        )}
        {errorMessage && (
          <Typography variant="body2" color="red" gutterBottom>
            {errorMessage}
          </Typography>
        )}
        <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
          Already have an account?{' '}
          <button
            className="text-red-600 hover:underline hover:underline-offset-4"
            onClick={handleLoginRedirect}
          >
            Login
          </button>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleRegisterClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Register;


