const express = require("express");
const router = express.Router();
const AdminService = require("../../services/admin/adminService");
const verifyToken = require("../../middleware/verifyToken");

router.post('/login', async (req, res) => {
  // const { error } = loginValidation.validate(req.body);
  // if (error) {
  //   return res.status(400).json({ error: error.details[0].message });
  // }
  try {
    const { email, password } = req.body;
    const result = await AdminService.loginAdmin(email, password);
    res.status(200).json({ message: 'Login successful', token: result.token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

router.get("/admins", async (req, res) => {
    try {
      const admins = await AdminService.getAllAdmins();
      res.status(200).json(admins);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch admins" });
    }
  });
  
  router.get("/admins/:adminId", async (req, res) => {
    const adminId = req.params.adminId;
    try {
      const admin = await AdminService.getAdminById(adminId);
      if (!admin) {
        res.status(404).json({ error: "Admin not found" });
      } else {
        res.status(200).json(admin);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch admin" });
    }
  });
  
  router.post("/register", async (req, res) => {
    const newAdmin = req.body;
    try {
      const result = await AdminService.createAdmin(newAdmin);
      res.status(201).json({ message: 'Admin created successfully', result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create a new admin' });
    }
  });
  
  router.put("/admins/:adminId", async (req, res) => {
    const adminId = req.params.adminId;
    const updatedAdmin = req.body;
    try {
      const result = await AdminService.updateAdmin(adminId, updatedAdmin);
      res.status(200).json({ message: 'Admin updated successfully', result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update the admin' });
    }
  });
  
  module.exports = router;