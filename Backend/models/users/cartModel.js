  const db = require('../../config/db');

  class ShoppingCart {
    constructor(cart) {
      this.CartID = cart.CartID;
      this.OrderID = cart.OrderID;
      this.drone_id = cart.drone_id;
      this.Price = cart.Price;
      this.QuantityInCart = cart.QuantityInCart;
      this.TotalCost = cart.TotalCost;
    }

    static createCartItem(newCartItem) {
      return new Promise((resolve, reject) => {
        // Calculate total cost based on the price and quantity
        // const totalCost = newCartItem.QuantityInCart * newCartItem.Price;
        // newCartItem.TotalCost = totalCost;

        const query = 'INSERT INTO ShoppingCart SET ?';
        db.query(query, newCartItem, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    }

    static getAllCartItems() {
      return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM ShoppingCart';
        db.query(query, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    }

    static getCartItemById(cartId) {
      return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM ShoppingCart WHERE CartID = ?';
        db.query(query, [cartId], (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result[0]);
          }
        });
      });
    }

    static deleteCartItem(cartId) {
      return new Promise((resolve, reject) => {
        const query = 'DELETE FROM ShoppingCart WHERE CartID = ?';
        db.query(query, [cartId], (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    }

    static updateCartItem(cartId, updatedCartItem) {
      return new Promise((resolve, reject) => {
        // Calculate total cost based on the updated quantity and price
        // const totalCost = updatedCartItem.QuantityInCart * updatedCartItem.Price;
        // updatedCartItem.TotalCost = totalCost;

        const query = 'UPDATE ShoppingCart SET ? WHERE CartID = ?';
        db.query(query, [updatedCartItem, cartId], (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    }
    static createShoppingCartTable() {
      return new Promise((resolve, reject) => {
        const createTableQuery = `
          CREATE TABLE IF NOT EXISTS ShoppingCart (
            CartID INT AUTO_INCREMENT PRIMARY KEY,
            OrderID INT,
            drone_id INT,
            QuantityInCart INT,
            TotalCost DECIMAL(10, 2),
            FOREIGN KEY (OrderID) REFERENCES Orders(OrderID),
            FOREIGN KEY (drone_id) REFERENCES DroneInventory(drone_id)
          )
        `;
        db.query(createTableQuery, (err, result) => {
          if (err) {
            reject(err);
          } else {
            console.log("ShoppingCart table created successfully");
            resolve(result);
          }
        });
      });
    }
    
  }

  module.exports = ShoppingCart;
