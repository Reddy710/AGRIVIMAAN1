const DroneInventory = require('../../models/admin/droneModel');

class DroneService {
  static async getAllDrones() {
    try {
      return await DroneInventory.getAllDrones();
    } catch (error) {
      throw error;
    }
  }

  static async getDroneById(droneId) {
    try {
      return await DroneInventory.getDroneById(droneId);
    } catch (error) {
      throw error;
    }
  }

  static async createDrone(newDrone) {
    try {
      return await DroneInventory.createDrone(newDrone);
    } catch (error) {
      throw error;
    }
  }

  static async updateDrone(droneId, updatedDrone) {
    try {
      return await DroneInventory.updateDrone(droneId, updatedDrone);
    } catch (error) {
      throw error;
    }
  }

  static async createTable() {
    try {
      return await DroneInventory.createTable();
    } catch (error) {
      throw error;
    }
  }
}

module.exports = DroneService;
