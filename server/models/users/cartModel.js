const db = require('../../config/db');

class ShoppingCart {
  constructor(cart) {
    this.CartID = cart.CartID;
    this.user_id = cart.user_id;
    this.drone_id = cart.drone_id;
    this.quantity = cart.quantity; // Modified property name
    
  }

// Insert a new row into the cart table
static addToCart(user_id, drone_id, quantity) {
  return new Promise((resolve, reject) => {
      const insertQuery = 'INSERT INTO ShoppingCart (user_id, drone_id, quantity) VALUES (?, ?, ?)';
      db.query(insertQuery, [user_id, drone_id, quantity], (err, result) => {
          if (err) {
              if (err.code === 'ER_DUP_ENTRY') {
                  reject('Duplicate entry for drone_id');
              } else {
                  console.error(err);
                  reject('Failed to add item to cart');
              }
          } else {
              resolve('Item added to cart successfully', result);
          }
      });
  });
};


// Retrieve the products in the user's cart
static getCartItemsByUserId (user_id) {
  return new Promise((resolve, reject) => {
    const selectQuery = 'SELECT * FROM ShoppingCart WHERE user_id = ?';
    db.query(selectQuery, [user_id], (err, result) => {
      if (err) {
        reject('Failed to retrieve cart items');
      } else {
        resolve(result);
      }
    });
  });
};

// Remove a product from the user's cart
static removeFromCart  (user_id, drone_id)  {
  return new Promise((resolve, reject) => {
    const deleteQuery = 'DELETE FROM ShoppingCart WHERE user_id = ? AND drone_id = ?';
    db.query(deleteQuery, [user_id, drone_id], (err, result) => {
      if (err) {
        reject('Failed to remove item from cart');
      } else {
        resolve(result,'Item removed from cart successfully');
      }
    });
  });
};

static removeFromCartByUserId(user_id)  {
  return new Promise((resolve, reject) => {
    const deleteQuery = 'DELETE FROM ShoppingCart WHERE user_id = ?';
    db.query(deleteQuery, [user_id], (err, result) => {
      if (err) {
        reject('Failed to remove item from cart');
      } else {
        resolve('Item removed from cart successfully of an user');
      }
    });
  });
};
// Update the quantity of a product in the user's cart
static updateCartItemQuantity (user_id, drone_id, new_quantity)  {
  return new Promise((resolve, reject) => {
    const updateQuery = 'UPDATE ShoppingCart SET quantity = ? WHERE user_id = ? AND drone_id = ?';
    db.query(updateQuery, [new_quantity, user_id, drone_id], (err, result) => {
      if (err) {
        reject('Failed to update quantity of cart item');
      } else {
        resolve('Quantity updated successfully');
      }
    });
  });
};

  // Other static methods remain unchanged

  static createShoppingCartTable() {
    return new Promise((resolve, reject) => {
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS ShoppingCart (
          CartID INT AUTO_INCREMENT PRIMARY KEY,
          user_id INT,
          drone_id INT UNIQUE,
          quantity INT,
          FOREIGN KEY (user_id) REFERENCES users(UserID), 
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

