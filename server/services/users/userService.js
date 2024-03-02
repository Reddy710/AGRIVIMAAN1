// userService.js
const User = require('../../models/users/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config/config')

const registerUser = async (userData, otp) => {
  try {
    const existingUser = await User.getUserByPhoneNumber(userData.phone_number);

    if (existingUser) {
      throw new Error('Phone number already exists');
    }

    const hashedPassword = await bcrypt.hash(userData.Password, 10);
    const hashedOTP = await bcrypt.hash(otp, 10);
    const newUser = {
      Name: userData.Name,
      phone_number: userData.phone_number,
      Password: hashedPassword,
      OTP: hashedOTP,
      Country: userData.Country,
      StreetAddress: userData.StreetAddress,
      City: userData.City,
      State: userData.State,
      Zip: userData.Zip
    };

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
    // const token = jwt.sign({ phone_number: user.phone_number }, config.jwt_secret_key, {expiresIn: '1h'});
    // return { user, token };
    return
  } catch (error) {
    throw error;
  }
};



const updateOtp = async (phone_number, OTP) => {
  try {
    const hashedOTP = await bcrypt.hash(OTP, 10);
    const user = await User.getUserByPhoneNumber(phone_number);
    if (!user) {
      throw new Error('Phone number not found');
    }
    await User.updateOtp(phone_number, hashedOTP)
  } catch (error) {
    throw error;
  }
};

const updatePassword = async (phone_number, Password) => {
  try {
    const hashedPassword = await bcrypt.hash(Password, 10);
    const user = await User.getUserByPhoneNumber(phone_number);
    if (!user) {
      throw new Error('Phone number not found');
    }
    await User.updatePassword(phone_number, hashedPassword)
  } catch (error) {
    throw error;
  }
};



const loginUserWithOtp = async (phone_number, enteredOtp) => {
  try {
    const user = await User.getUserByPhoneNumber(phone_number);
    if (!user) {
      throw new Error('Phone number not found');
    }
    const isMatch = await bcrypt.compare(enteredOtp, user.OTP);
    if (!isMatch) {
      throw new Error('Invalid phone number or password');
    }
    const token = jwt.sign({ phone_number: user.phone_number }, config.jwt_secret_key, {expiresIn: '1h'});
    return { user, token };
  } catch (error) {
    throw error;
  }
};




module.exports = {
  registerUser,
  loginUser,
  loginUserWithOtp,
  updateOtp,
};

