const Address = require('../../models/services/addressModel');

class AddressService {
  static async createAddress(newAddress) {
    try {
      return await Address.createAddress(newAddress);
    } catch (error) {
      throw error;
    }
  }

  static async getAllAddresses() {
    try {
      return await Address.getAllAddresses();
    } catch (error) {
      throw error;
    }
  }

  static async getAllAddressesByUserId(user_id) {
    try {
      return await Address.getAllAddressesByUserId(user_id);
    } catch (error) {
      throw error;
    }
  }

  static async getAddressById(addressId) {
    try {
      return await Address.getAddressById(addressId);
    } catch (error) {
      throw error;
    }
  }

  static async deleteAddress(address_id) {
    try {
      return await Address.deleteAddress(address_id);
    } catch (error) {
      throw error;
    }
  }

  static async updateAddress(addressId, updatedAddress) {
    try {
      return await Address.updateAddress(addressId, updatedAddress);
    } catch (error) {
      throw error;
    }
  }

  static async createAddressesTable() {
    try {
      return await Address.createAddressesTable();
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AddressService;
