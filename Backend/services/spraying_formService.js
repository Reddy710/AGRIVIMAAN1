const Spraying_Details = require('../models/spraying_formModel');

class SprayingService {
  static async getAllSprayingForms() {
    try {
      return await Spraying_Details.getAllSprayingForms();
    } catch (error) {
      throw error;
    }
  }

  static async getSprayingFormsById(sprayingId) {
    try {
      return await Spraying_Details.getSprayingFormsById(sprayingId);
    } catch (error) {
      throw error;
    }
  }

  static async createSprayingForms(sprayingData) {
    try {
      const newSpraying = {
        pilot_id: sprayingData.pilot_id,
        drone_id: sprayingData.drone_id,
        acers_to_spray: sprayingData.acers_to_spray,
        chemical_used: sprayingData.chemical_used,
        spraying_status : sprayingData.spraying_status,
        address: sprayingData.address,
      };

      const createdSpraying = await Spraying_Details.createSprayingForms(newSpraying);
      return createdSpraying;
    } catch (error) {
      throw error;
    }
  }

  static async updateSprayingForms(sprayingId, updatedSpraying) {
    try {
      return await Spraying_Details.updateSprayingForms(sprayingId, updatedSpraying);
    } catch (error) {
      throw error;
    }
  }

  static async deleteSprayingForms(sprayingId) {
    try {
      return await Spraying_Details.deleteSprayingForms(sprayingId);
    } catch (error) {
      throw error;
    }
}

  static async createTable() {
    try {
      return await Spraying_Details.createTable();
    } catch (error) {
      throw error;
    }
  }
}

module.exports = SprayingService;
