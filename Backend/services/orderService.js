const Orders = require('../models/ordersModel');

class OrderService {
  static async getAllOrders() {
    try {
      return await Orders.getAllOrders();
    } catch (error) {
      throw error;
    }
  }

  static async getOrderById(orderId) {
    try {
      return await Orders.getOrderById(orderId);
    } catch (error) {
      throw error;
    }
  }

  static async createOrder(orderData) {
    try {
      const newOrder = {
        UserID: orderData.UserID,
        ProductID: orderData.ProductID,
        OrderQuantity: orderData.OrderQuantity,
        TotalAmount: orderData.TotalAmount,
        OrderDate: orderData.OrderDate,
        Address: orderData.Address,
      };

      const createdOrder = await Orders.createOrder(newOrder);
      return createdOrder;
    } catch (error) {
      throw error;
    }
  }

  static async updateOrder(orderId, updatedOrder) {
    try {
      return await Orders.updateOrder(orderId, updatedOrder);
    } catch (error) {
      throw error;
    }
  }

  static async deleteOrder(orderId) {
    try {
      return await Orders.deleteOrder(orderId);
    } catch (error) {
      throw error;
    }
  }


static async createOrdersTable() {
  try {
    return await Orders.createOrdersTable();
  } catch (error) {
    throw error;
  }
}

}

module.exports = OrderService;
