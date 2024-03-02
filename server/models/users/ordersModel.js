const db = require('../../config/db');

class Orders {
  constructor(order) {
    this.OrderID = order.OrderID;
    this.UserID = order.UserID;
    this.UserName = order.UserName;
    this.ProductID = order.ProductID;
    this.OrderQuantity = order.OrderQuantity;
    this.TotalAmount = order.TotalAmount;
    this.OrderDate = order.OrderDate;
    this.AddressType = order.AddressType;
    this.RecipientName = order.RecipientName;
    this.StreetAddress = order.StreetAddress;
    this.City = order.City;
    this.State = order.State;
    this.PostalCode = order.PostalCode;
    this.OrderStatus = order.OrderStatus;
    this.ReceiptUrl = order.ReceiptUrl;
    this.PaymentStatus = order.PaymentStatus;
    this.TransactionId = order.TransactionId;
}
  static createOrder(newOrder) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO Orders SET ?';
      db.query(query, newOrder, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static getAllOrders() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM Orders';
      db.query(query, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static getOrderById(OrderID) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM Orders WHERE OrderID = ?';
      db.query(query, [OrderID], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result[0]);
        }
      });
    });
  }

  static getOrderByUserId(UserID) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM Orders WHERE UserID = ?';
      db.query(query, [UserID], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }


  static deleteOrder(orderId) {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM Orders WHERE OrderID = ?';
      db.query(query, [orderId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static updateOrder(orderId, updatedOrder) {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE Orders SET ? WHERE OrderID = ?';
      db.query(query, [updatedOrder, orderId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static updateOrderStatus(orderId, orderStatus){
    return new Promise((resolve, reject) => {
      const query = 'UPDATE orders SET OrderStatus = ? WHERE OrderID = ?';
      db.query(query, [orderStatus, orderId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static cancelOrder(orderId) {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE Orders SET orderStatus = ? WHERE OrderID = ?';
      const orderStatus = 'Cancelled';
      db.query(query, [orderStatus, orderId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static createOrdersTable() {
    return new Promise((resolve, reject) => {
      const createTableQuery = `
      CREATE TABLE IF NOT EXISTS Orders (
        OrderID INT AUTO_INCREMENT PRIMARY KEY,
        UserID INT,
        UserName VARCHAR(255),
        ProductID INT,
        OrderQuantity INT,
        TotalAmount DECIMAL(10, 2),
        OrderDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        AddressType VARCHAR(50),
        RecipientName VARCHAR(255),
        StreetAddress VARCHAR(255),
        City VARCHAR(100),
        State VARCHAR(100),
        PostalCode VARCHAR(20),
        OrderStatus ENUM('Pending', 'Packed', 'Dispatched', 'Delivered', 'Cancelled') DEFAULT 'Pending',
        ReceiptUrl VARCHAR(255), 
        PaymentStatus VARCHAR(20) DEFAULT 'Pending',
        TransactionId VARCHAR(255),
        FOREIGN KEY (UserID) REFERENCES users(UserID),
        FOREIGN KEY (ProductID) REFERENCES DroneInventory(drone_id)
    )`;
      db.query(createTableQuery, (err, result) => {
        if (err) {
          reject(err);
        } else {
          console.log("Orders table created successfully");
          resolve(result);
        }
      });
    });
  }
  
}

module.exports = Orders;
