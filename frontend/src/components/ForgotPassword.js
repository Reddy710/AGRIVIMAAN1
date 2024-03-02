import React, { useState } from 'react';
import axios from 'axios';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [phone_number, setPhoneNumber] = useState('');
  const [Password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [resetToken, setResetToken] = useState('')
  const [showResetPasswordForm, setShowResetPasswordForm] = useState(false)
  const [passwordErrorMessage,setPasswordErrorMessage] = useState('')
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8000/users/forgot-password', {
        phone_number
      });

      console.log('Password reset response:', response);
      if (response.status === 200) {
        setSuccessMessage(response.data.massage)
        setResetToken(response.data.resetToken)
        setShowResetPasswordForm(true)
      } else {
        console.error('Password reset failed');
      }
    } catch (error) {
      console.error('Error during password reset:', error);
    }
  };
  const handleResetPassword = async () => {
    try {
      if (Password !== confirmPassword) {
        setPasswordErrorMessage('Passwords do not match');
        return;
      }
      const response = await axios.post('http://localhost:8000/users/reset-password', {
        phone_number,
        Password,
        resetToken
      });

      console.log('Password reset response:', response);
      if (response.status === 200) {
        setSuccessMessage(response.data.message)
        navigate('/login')
      } else {
        console.error('Password reset failed');
      }
    } catch (error) {
      console.error('Error during password reset:', error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    // Handle navigation or closing of dialog
  };

  return (
    <Dialog open={open}>
      {showResetPasswordForm ? (<>
        <DialogTitle>
          <Typography variant="h5">
            Reset Password
          </Typography>
        </DialogTitle>
        <DialogContent>
          <TextField
            type="password"
            placeholder="Enter your new password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            autoFocus
          />
          <TextField
            type="password"
            placeholder="Confirm your new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
          />
           {passwordErrorMessage && (
                <Typography variant="body2" color="red" gutterBottom>
                  {passwordErrorMessage}
                </Typography>
              )}
              {successMessage && (
                <Typography variant="body2" color="green" gutterBottom>
                  {successMessage}
                </Typography>
              )}
        </DialogContent>
        <DialogActions>
        <Button onClick={handleResetPassword} color="primary" variant="contained">
          Update Password
        </Button>
        <Button onClick={handleClose} color="primary" variant="outlined">
          Cancel
        </Button>
      </DialogActions></>) : (<>
          <DialogTitle>
            <Typography variant="h5">
              Forgot Password
            </Typography>
          </DialogTitle>
          <DialogContent>
            <TextField
              type="text"
              placeholder="Enter your phone number"
              value={phone_number}
              onChange={(e) => setPhoneNumber(e.target.value)}
              fullWidth
              autoFocus
            />
          </DialogContent>
          <DialogActions>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Submit
        </Button>
        <Button onClick={handleClose} color="primary" variant="outlined">
          Cancel
        </Button>
      </DialogActions></>)}
    </Dialog>
  );
};

export default ForgotPassword;
