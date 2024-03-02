import React, { useState } from 'react';
import axios from 'axios';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button, TextField } from '@mui/material';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [open, setOpen] = useState(true);

  const handleResetPassword = async () => {
    try {
      const response = await axios.post('http://localhost:8000/users/reset-password', {
        password,
        confirmPassword
      });

      console.log('Password reset response:', response);
      if (response.status === 200) {
        // Password reset initiated successfully
        // Display a message to the user
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
      <DialogTitle>
        <Typography variant="h5">
          Reset Password
        </Typography>
      </DialogTitle>
      <DialogContent>
        <TextField
          type="password"
          placeholder="Enter your new password"
          value={password}
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
      </DialogContent>
      <DialogActions>
        <Button onClick={handleResetPassword} color="primary" variant="contained">
          Update Password
        </Button>
        <Button onClick={handleClose} color="primary" variant="outlined">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ResetPassword;
