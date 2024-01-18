const Pilot = require('../models/pilotModel');
const config = require('../config/config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const getAllPilots = async () => {
  try {
    return await Pilot.getAllPilots();
  } catch (error) {
    throw error;
  }
};

const getPilotById = async (pilotId) => {
  try {
    return await Pilot.getPilotById(pilotId);
  } catch (error) {
    throw error;
  }
};

const createPilot = async (userData) => {
  console.log(userData)
  try {
    const existingUser = await Pilot.getPilotByPhoneNumber(userData.phone_number);

    if (existingUser) {
      throw new Error('Phone number already exists');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newPilot = {
      username: userData.username,
      email: userData.email,
      password: hashedPassword,
      phone_number: userData.phone_number,
      profession: userData.profession
    };

    const createdPilot = await Pilot.createPilot(newPilot);
    return createdPilot;
  } catch (error) {
    throw error;
  }
};

const loginUser = async (phone_number,password) => {
  try {
    const user = await Pilot.getPilotByPhoneNumber(phone_number);
    console.log(user, password)
    if (!user) {
      throw new Error('Phone number not found');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid phone number or password');
    }
    const token = jwt.sign({ phone_number: user.phone_number }, config.jwt_secret_key, {expiresIn: '1h'});
    return { token };
  } catch (error) {
    throw error;
  }
}

const updatePilot = async (pilotId, updatedPilot) => {
  try {
    return await Pilot.updatePilot(pilotId, updatedPilot);
  } catch (error) {
    throw error;
  }
};

const createTable = async () => {
  try {
    return await Pilot.createTable();
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllPilots,
  getPilotById,
  createPilot,
  loginUser,
  updatePilot,
  createTable
};
