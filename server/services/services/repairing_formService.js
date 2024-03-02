const Repair_Details = require('../../models/services/repairing_formModel');

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

  static async getRepairFormsByUserId(userId) {
    try {
      return await Repair_Details.getRepairFormsByUserId(userId);
    } catch (error) {
      throw error;
    }
  }

  static async createRepairForms(repairData) {
    try {
      const newRepair = {
        pilotId: repairData.pilotId,
        droneId: repairData.droneId,
        userId: repairData.userId,
        userName: repairData.userName,
        phoneNumber: repairData.phoneNumber,
        Country: repairData.Country,
        StreetAddress: repairData.StreetAddress,
        City: repairData.City,
        State: repairData.State,
        Zip: repairData.Zip,
        issueDescription: repairData.issueDescription,
        repairDate: repairData.repairDate,
        repairStatus: repairData.repairStatus,
        repairCategory: repairData.repairCategory
      };

      const createdRepair = await Repair_Details.createRepairForms(newRepair);
      return createdRepair;
    } catch (error) {
      throw error;
    }
  }

  static async updateRepairForms(repairId, repairStatus) {
    try {
      return await Repair_Details.updateRepairForms(repairId, repairStatus);
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

  static async cancelRepairForms(repairId) {
    try {
      return await Repair_Details.cancelRepairForms(repairId);
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
