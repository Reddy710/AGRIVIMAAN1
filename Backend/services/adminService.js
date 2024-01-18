const Admin = require('../models/adminModel');
const config = require('../config/config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class AdminService {
  static async getAllAdmins() {
    try {
      return await Admin.getAllAdmins();
    } catch (error) {
      throw error;
    }
  }

  static async getAdminById(adminId) {
    try {
      return await Admin.getAdminById(adminId);
    } catch (error) {
      throw error;
    }
  }

  static async createAdmin(userData) {
    try {
      const existingUser = await Admin.getAdminByPhoneNumber(userData.phone_number);

      if (existingUser) {
        throw new Error('Phone number already exists');
      }

      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const newAdmin = {
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
        phone_number: userData.phone_number,
      };

      const createdAdmin = await Admin.createAdmin(newAdmin);
      return createdAdmin;
    } catch (error) {
      throw error;
    }
  }

  static async loginAdmin(email, password) {
    try {
      const admin = await Admin.getAdminByEmail(email);

      if (!admin) {
        throw new Error('Phone number not found');
      }

      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        throw new Error('Invalid phone number or password');
      }

      const token = jwt.sign({ email: admin.email }, config.jwt_secret_key, { expiresIn: '1h' });
      return { token };
    } catch (error) {
      throw error;
    }
  }

  static async updateAdmin(adminId, updatedAdmin) {
    try {
      return await Admin.updateAdmin(adminId, updatedAdmin);
    } catch (error) {
      throw error;
    }
  }

  static async createTable() {
    try {
      return await Admin.createTable();
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AdminService;