// userService.js
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config')

const registerUser = async (userData) => {
  try {
    const existingUser = await User.getUserByPhoneNumber(userData.phone_number);

    if (existingUser) {
      throw new Error('Phone number already exists');
    }

    const hashedPassword = await bcrypt.hash(userData.Password, 10);
    const newUser = {
      Name: userData.Name,
      phone_number: userData.phone_number,
      Password: hashedPassword,
      address: userData.address
    };
// console.log(newUser);
    const createdUser = await User.createUser(newUser);

    return createdUser;
  } catch (error) {
    throw error;
  }
};

const loginUser = async (phone_number, password) => {
  try {
    const user = await User.getUserByPhoneNumber(phone_number);
    if (!user) {
      throw new Error('Phone number not found');
    }
    const isMatch = await bcrypt.compare(password, user.Password);
    if (!isMatch) {
      throw new Error('Invalid phone number or password');
    }
    const token = jwt.sign({ phone_number: user.phone_number }, config.jwt_secret_key, {expiresIn: '1h'});
    return { token };
  } catch (error) {
    throw error;
  }
};


module.exports = {
  registerUser,
  loginUser,
};
