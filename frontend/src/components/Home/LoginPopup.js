// Login.js

// import React, { useState } from 'react';
// import axios from 'axios';
// import Joi from 'joi';
// import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button } from '@mui/material';
// import { Link, useNavigate } from 'react-router-dom';
// import Transition from '../Animations/Transitions';

// const Login = () => {
//   const [phone_number, setPhoneNumber] = useState('');
//   const [Password, setPassword] = useState('');
//   const [open, setOpen] = useState(true);
//   const [errors, setErrors] = useState({});
//   const navigate = useNavigate();

//   const schema = Joi.object({
//     phone_number: Joi.string()
//       .required()
//       .pattern(new RegExp('^[0-9]{10}$')) // Assuming phone number is 10 digits
//       .messages({
//         'string.empty': 'Phone number is required',
//         'string.pattern.base': 'Phone number must be 10 digits'
//       }),
//     Password: Joi.string()
//       .required()
//       .min(6) // Minimum password length
//       .messages({
//         'string.empty': 'Password is required',
//         'string.min': 'Password must be at least {#limit} characters long'
//       })
//   });

//   const handleLoginSubmit = async () => {
//     try {
//       const validation = schema.validate({ phone_number, Password }, { abortEarly: false });

//       if (validation.error) {
//         const validationErrors = {};
//         validation.error.details.forEach(detail => {
//           validationErrors[detail.context.key] = detail.message;
//         });
//         setErrors(validationErrors);
//         return;
//       }

//       const response = await axios.post('http://localhost:8000/users/login', {
//         phone_number,
//         Password,
//       });

//       if (response.status === 200) {
//         const data = response.data;

//         const accessToken = data.token;
//         localStorage.setItem('accessToken', accessToken);
//         const { Password, ...userDataWithoutPassword } = data.user;
//         localStorage.setItem('userDetails', JSON.stringify(userDataWithoutPassword));
//         navigate('/');
//         window.location.reload();
//       } else {
//         console.error('Login failed');
//       }
//     } catch (error) {
//       console.error('Error during login:', error);
//     }
//   };

//   const handleLoginClose = () => {
//     setOpen(false);
//     navigate('/');
//   }

//   const handleRegisterRedirect = () => {
//     navigate('/register');
//   };

//   return (
//     <Dialog open={open} TransitionComponent={Transition}>
//       <DialogTitle>
//         <Typography variant="h5" color="primary" className='text-black'>
//           Welcome Back!
//         </Typography>
//         Login
//       </DialogTitle>
//       <DialogContent>
//         <section className="flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
//           <div className="md:w-1/3 max-w-sm">
//             <img
//               src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
//               alt="Sample image"
//             />
//           </div>
//           <div className=" ">
//             <input
//               className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
//               type="text"
//               placeholder="Phone Number"
//               value={phone_number}
//               onChange={(e) => setPhoneNumber(e.target.value)}
//             />
//             {errors.phone_number && <p className="text-red-500">{errors.phone_number}</p>}
//             <input
//               className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
//               type="password"
//               placeholder="Password"
//               value={Password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             {errors.Password && <p className="text-red-500">{errors.Password}</p>}
//             <div className="mt-4 flex justify-between font-semibold text-sm">
//               <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
//                 <input className="mr-1" type="checkbox" />
//                 <span>Remember Me</span>
//               </label>
//               <p>
//                 <Link to="/forgot-password">Forgot Password?</Link>
//               </p>
//             </div>
//             <div className="text-center md:text-left">
//               <button
//                 className="bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
//                 type="submit"
//                 onClick={handleLoginSubmit}
//               >
//                 Login
//               </button>
//             </div>
//           </div>
//         </section>
//         <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
//           Don't have an account?{' '}
//           <button
//             className="text-red-600 hover:underline hover:underline-offset-4"
//             onClick={handleRegisterRedirect}
//           >
//             Register
//           </button>
//         </div>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={() => handleLoginClose()} color="inherit">
//           Cancel
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default Login;


import React, { useState } from 'react';
import axios from 'axios';
import Joi from 'joi';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Transition from '../Animations/Transitions';

const Login = () => {
  const [phone_number, setPhoneNumber] = useState('');
  const [currentPhoneNumber, setCurrentPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [open, setOpen] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const [showSendOtp, setShowSendOtp] = useState(false);
  const [currentEmail, setCurrentEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [showOTPForm, setShowOTPForm] = useState(false);
  const navigate = useNavigate();

  const schema = Joi.object({
    phone_number: Joi.string()
          .required()
          .pattern(new RegExp('^\\+[0-9]{1,3}[0-9]{10}$')) // Assuming phone number is 10 digits
          .messages({
            'string.empty': 'Phone number is required',
            'string.pattern.base': 'Phone number must be 12 digits'
          }),
    // email: Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string().min(6).required(),
  });

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    const loginData = {
      phone_number:phone_number,
      
      // email: email,
      password: Password,
    };
    const { error } = schema.validate(loginData);
    if (error) {
      setError(error.message);
      return;
    }
    try {
      const response = await axios.post('http://localhost:8000/users/login', {
        phone_number:phone_number,
        // EmailId: email,
        Password: Password,
      });

      // if (response.status === 200 && response.data.message === "Login successful") {
      //   const accessToken = response.data.token;
      //   const { Password, ...userDataWithoutPassword } =response.data.user;
      //   localStorage.setItem('userDetails', JSON.stringify(userDataWithoutPassword));
      //   localStorage.setItem('accessToken', accessToken);
      //   // navigate('/');
      //   // window.location.reload();
      //   setError('');
      //   setPhoneNumber('');
      //   // setEmail('');
      //   setPassword('');
      // } 
      // else 
      if (response.status === 200) {
        // setCurrentEmail(response.data.email);
        setCurrentPhoneNumber(response.data.phone_number);
        setError('');
        setSuccessMessage(response.data.message);
        setShowSendOtp(true);
      } 
      else {
        setError(response.data.message);
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Error during login:', error);
      if (error.response) {
        const { status, data } = error.response;
        if (status === 401 || status === 404 || status === 500) {
          setError(data.message);
          setSuccessMessage('');
        } else {
          setError('An unexpected error occurred. Please try again later.');
          setSuccessMessage('');
        }
      } else {
        setError('An unexpected error occurred. Please try again later.');
        setSuccessMessage('');
      }
    }
  };

  const handlesendotp = async () => {
    try {
      // const response = await axios.post('http://localhost:3000/send-otp', { email: currentEmail });
      const response = await axios.post('http://localhost:8000/users/send-otp', { phone_number: phone_number });

      if (response.status === 200) {
        setSuccessMessage(response.data.message);
        setOtp(response.data.otp) 
        console.log(otp)
        setError('');
        setShowOTPForm(true);
        setShowSendOtp(false);
      } else {
        setError(response.data.message);
        setSuccessMessage('');
      }
    } catch (error) {
      setError('Unable to send OTP. Please try again');
    }
  }

  const handleOtpVerification = async () => {
    try {
      const response = await axios.post('http://localhost:8000/users/verify-otp', {
        phone_number: phone_number,
        enteredOtp:enteredOtp
      });

      if (response.status === 200) {
        setSuccessMessage(response.data.message);
        setError('');
          const accessToken = response.data.token;
        const { Password, ...userDataWithoutPassword } = response.data.user;
        localStorage.setItem('userDetails', JSON.stringify(userDataWithoutPassword));
        localStorage.setItem('accessToken', accessToken);
        setTimeout(() => {
           navigate('/')
           window.location.reload();
        }, 3000);
        
        
      } else {
        setError(response.data.message);
        setSuccessMessage('');
      }
    } catch (error) {
      setError('Invalid OTP. Please try again');
    }
  }
  const handleLoginClose = () => {
        setOpen(false);
        navigate('/');
      }
    
      const handleRegisterRedirect = () => {
        navigate('/register');
      };

  return (
    <Dialog open={true} TransitionComponent={Transition}>
      <DialogTitle>
        <Typography variant="h5" color="primary" className='text-black'>
          Welcome Back!
        </Typography>
        Login
      </DialogTitle>
      {showSendOtp ? (<div 
      className="flex flex-col  justify-center  items-center my-2 mx-5  md:mx-0 md:my-0 gap-2">
          <input
              className="text-sm flex flex-col w-half px-4 py-2 border border-solid border-gray-300 rounded"
              type="text"
              placeholder="Phone Number"
              value={phone_number}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <button
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
            type="submit"
            onClick={handlesendotp}>Send OTP</button>
            {error && <div className="text-red-600">{error}</div>}
            </div>):( <DialogContent>
        <section className="flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
          <div className="md:w-1/3 max-w-sm">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              alt="Sample image"
            />
          </div>
          <div className=" ">
            <input
              className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
              type="text"
              placeholder="Phone Number"
              value={phone_number}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            {/* {errors.phone_number && <p className="text-red-500">{errors.phone_number}</p>} */}
            <input
              className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
              type="password"
              placeholder="Password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* {errors.Password && <p className="text-red-500">{errors.Password}</p>} */}
            <div className="mt-4 flex justify-between font-semibold text-sm">
              <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
                <input className="mr-1" type="checkbox" />
                <span>Remember Me</span>
              </label>
              <p>
                <Link to="/forgot-password">Forgot Password?</Link>
              </p>
            </div>
            <div className="text-center md:text-left">
              <button
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
                type="submit"
                onClick={handleLoginSubmit}
              >
                Login
              </button>
              
              {showOTPForm && <div className='flex flex-col jusetify-between items-start gap-2'>
          <input 
            className="text-sm  w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
            type="text" placeholder="Enter OTP" value={enteredOtp} onChange={(e) => setEnteredOtp(e.target.value)} />
          <button 
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
          type="submit"
          onClick={handleOtpVerification}>Verify OTP</button>
           {successMessage && <div className="text-green-600">{successMessage}</div>}
          {error && <div className="text-red-600">{error}</div>}
        </div>}
            </div>
          </div>
        </section>
        <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
          Don't have an account?{' '}
          <button
            className="text-red-600 hover:underline hover:underline-offset-4"
            onClick={handleRegisterRedirect}
          >
            Register
          </button>
        </div>
      </DialogContent>)}
     
      <DialogActions>
      <Button onClick={() => handleLoginClose()} color="inherit">
          Cancel
       </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Login;
