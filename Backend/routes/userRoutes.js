// userRoutes.js
const express = require('express');
const router = express.Router();
const userService = require('../services/userService');
const User= require('../models/userModel')
const { registerValidation, loginValidation } = require('../utils/validation');
const verifyToken = require('../middleware/verifyToken')

router.post('/register', async (req, res) => {
  console.log(userService)
  const { error } = registerValidation.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    const userData = req.body;
    
    // console.log(userData);
    const user = await userService.registerUser(userData);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { error } = loginValidation.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    const { phone_number, Password } = req.body;
 
    const result = await userService.loginUser(phone_number, Password);
    res.status(200).json({ message: 'Login successful', token: result.token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

router.get('/allUsers', async (req, res) => {
  try {
    const allUsers = await User.getAllUsers(); 
    res.status(200).json(allUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});


module.exports = router;
