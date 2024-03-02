const db = require('../../config/db');

class Address {
  constructor(address) {
    this.address_id = address.address_id;
    this.user_id = address.user_id;
    this.address_type = address.address_type;
    this.recipient_name = address.recipient_name;
    this.street_address = address.street_address;
    this.city = address.city;
    this.state = address.state;
    this.postal_code = address.postal_code;
    this.country = address.country;
  }

  static createAddress(newAddress) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO Addresses SET ?';
      db.query(query, newAddress, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static getAllAddresses() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM Addresses';
      db.query(query, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static getAllAddressesByUserId(user_id) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM Addresses WHERE user_id = ?';
        db.query(query, [user_id], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}


  static getAddressById(address_id) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM Addresses WHERE address_id = ?';
      db.query(query, [address_id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result[0]);
        }
      });
    });
  }

  static deleteAddress(address_id) {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM Addresses WHERE address_id = ?';
      db.query(query, [address_id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result[0]);
        }
      });
    });
  }

  static updateAddress(addressId, updatedAddress) {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE Addresses SET ? WHERE address_id = ?';
      db.query(query, [updatedAddress, addressId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static createAddressesTable() {
    return new Promise((resolve, reject) => {
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS Addresses (
          address_id INT AUTO_INCREMENT PRIMARY KEY,
          user_id INT,
          address_type VARCHAR(255),
          recipient_name VARCHAR(255),
          street_address VARCHAR(255),
          city VARCHAR(255),
          state VARCHAR(255),
          postal_code VARCHAR(20),
          country VARCHAR(255),
          FOREIGN KEY (user_id) REFERENCES users(UserID)
        )
      `;
      db.query(createTableQuery, (err, result) => {
        if (err) {
          reject(err);
        } else {
          console.log("Addresses table created successfully");
          resolve(result);
        }
      });
    });
  }
}

module.exports = Address;
