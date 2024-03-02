const Orders = require('../../models/users/ordersModel');

class OrderService {
  static async getAllOrders() {
    try {
      return await Orders.getAllOrders();
    } catch (error) {
      throw error;
    }
  }

  static async getOrderById(OrderID) {
    try {
      return await Orders.getOrderById(OrderID);
    } catch (error) {
      throw error;
    }
  }

  static async getOrderByUserId(UserID) {
    try {
      return await Orders.getOrderByUserId(UserID);
    } catch (error) {
      throw error;
    }
  }

  static async createOrder(orderData) {
    try {
      const newOrder = {
        UserID: orderData.UserID,
        ProductID: orderData.ProductID,
        UserName: orderData.UserName,
        OrderQuantity: orderData.OrderQuantity,
        TotalAmount: orderData.TotalAmount,
        OrderDate: orderData.OrderDate,
        AddressType: orderData.AddressType,
        RecipientName: orderData.RecipientName,
        StreetAddress: orderData.StreetAddress, 
        City: orderData.City, 
        State: orderData.State, 
        PostalCode: orderData.PostalCode, 
        ReceiptUrl: orderData.ReceiptUrl, 
        PaymentStatus: orderData.PaymentStatus,
        TransactionId: orderData.TransactionId 
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

  static async updateOrderStatus(orderId, updatedStatus) {
    try {
      return await Orders.updateOrderStatus(orderId, updatedStatus);
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

  static async cancelOrder(orderId) {
    try {
      return await Orders.cancelOrder(orderId);
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
