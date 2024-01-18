const db = require('../../config/db');

class Admin {
  constructor(admin) {
    this.admin_id = admin.admin_id;
    this.name = admin.name;
    this.email = admin.email;
    this.password = admin.password;
    this.phone_number = admin.phone_number;
  }

  static getAllAdmins() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM Admins';
      db.query(query, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static getAdminById(adminId) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM Admins WHERE admin_id = ?';
      db.query(query, [adminId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result[0]);
        }
      });
    });
  }

  static createAdmin(newAdmin) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO Admins SET ?';
      db.query(query, newAdmin, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
  
  static getAdminByPhoneNumber(phone_number) {
    // console.log(phone_number)
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM Admins WHERE phone_number = ?",
        [phone_number],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results[0]);
          }
        }
      );
    });
  }

  static getAdminByEmail(email) {
    // console.log(email)
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM Admins WHERE email = ?",
        [email],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results[0]);
          }
        }
      );
    });
  }

  static updateAdmin(adminId, updatedAdmin) {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE Admins SET ? WHERE admin_id = ?';
      db.query(query, [updatedAdmin, adminId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static createTable() {
    return new Promise((resolve, reject) => {
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS Admins (
          admin_id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(100) NOT NULL,
          password VARCHAR(100) NOT NULL,
          phone_number VARCHAR(20) NOT NULL UNIQUE
        )
      `;
      db.query(createTableQuery, (err, result) => {
        if (err) {
          reject(err);
        } else {
          console.log("Admins table created successfully");
          resolve(result);
        }
      });
    });
  }
}

module.exports = Admin;
