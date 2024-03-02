import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button } from '@mui/material';
import Transition from './Animations/Transitions';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [profession, setProfession] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    // const [country, setCountry] = useState('');
    // const [streetAddress, setStreetAddress] = useState('');
    // const [city, setCity] = useState('');
    // const [stateProvince, setStateProvince] = useState('');
    // const [postalCode, setPostalCode] = useState('');
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
            else {
                const response = await axios.post('http://localhost:8000/pilots/register', {
                    username: username,
                    email: email,
                    password: password,
                    phone_number: phone_number,
                    profession:profession,
                    // country: country,
                    // streetAddress: streetAddress,
                    // city: city,
                    // state: stateProvince,
                    // zip: postalCode
                });

                console.log('Register response:', response.data);
                if (response.status === 201) {
                    // Handle successful registration, e.g., show a success message
                    console.log('Registration successful');
                    setSuccessMessage('Pilot created  successfully');
                    setTimeout(() => {
                        setSuccessMessage('');
                        navigate('/');
                    }, 3000);
                } else {
                    console.error('Pilot creation failed');
                }
            }
        } catch (error) {
            // Handle network errors or other issues
            setTimeout(() => {
                setErrorMessage('you entered invalid details');
                console.error('Error during registration:', error);
                navigate('/pilot-creation');
            }, 3000);


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
        <Dialog open={open} TransitionComponent={Transition} >
            <DialogTitle>
                <Typography variant="h5" color="primary">
                    Welcome to Agrivimaan!!!
                </Typography>
                Pilot Creation
            </DialogTitle>
            <DialogContent>
                <section className="flex flex-col md:flex-row justify-center  md:space-y-0  items-center my-2 mx-5 md:mx-0 md:my-0">
                    <div className="md:w-full max-w-96 h-96">
                        <img
                            src="https://agrivimaan.s3.ap-south-1.amazonaws.com/Project-required+imgs/Pilot+register+log.jpg"
                            alt="Pilot img"
                            className="rounded h-96 w-full"
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
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            <Typography variant="body2" style={{ color: "red" }} gutterBottom>
                                {passwordErrorMessage}
                            </Typography>
                        )}
                        <select
                            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
                            value={profession}
                            onChange={(e) => setProfession(e.target.value)}
                        >
                            <option value="">Select Profession</option>
                            <option value="Chemical Sprayer">Chemical Sprayer</option>
                            <option value="Drone Mechanic">Drone Mechanic</option>
                        </select>
                        <input
                            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
                            type="text"
                            placeholder="Phone Number"
                            value={phone_number}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                        {/* <div className='flex gap-2'>
                            <input
                                className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
                                type="text"
                                placeholder="Street Address"
                                value={streetAddress}
                                onChange={(e) => setStreetAddress(e.target.value)}
                            />
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
                                placeholder="Country"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            />
                            <input
                                className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
                                type="text"
                                placeholder="ZIP / Postal code"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                            />
                        </div>*/}
                        <div className="text-center mt-6">
                            <button
                                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
                                type="submit"
                                onClick={handleRegisterSubmit}
                            >
                                Create
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


