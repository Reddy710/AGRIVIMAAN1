const Repair_Details = require('../models/repairing_formModel');

class RepairService {
  static async getAllRepairForms() {
    try {
      return await Repair_Details.getAllRepairForms();
    } catch (error) {
      throw error;
    }
  }

  static async getRepairFormsById(repairId) {
    try {
      return await Repair_Details.getRepairFormsById(repairId);
    } catch (error) {
      throw error;
    }
  }

  static async createRepairForms(repairData) {
    try {
      const newRepair = {
        pilot_id: repairData.pilot_id,
        drone_id: repairData.drone_id,
        issue_description: repairData.issue_description,
        repair_date: repairData.repair_date,
        repair_status: repairData.repair_status,
      };

      const createdRepair = await Repair_Details.createRepairForms(newRepair);
      return createdRepair;
    } catch (error) {
      throw error;
    }
  }

  static async updateRepairForms(repairId, updatedRepair) {
    try {
      return await Repair_Details.updateRepairForms(repairId, updatedRepair);
    } catch (error) {
      throw error;
    }
  }

  static async deleteRepairForms(repairId) {
    try {
      return await Repair_Details.deleteRepairForms(repairId);
    } catch (error) {
      throw error;
    }
  }
  
  static async createTable() {
    try {
      return await Repair_Details.createTable();
    } catch (error) {
      throw error;
    }
  }
}

module.exports = RepairService;
