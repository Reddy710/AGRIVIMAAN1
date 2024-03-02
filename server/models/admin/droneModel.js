const db = require('../../config/db');

class DroneInventory {
  constructor(drone) {
    this.drone_id = drone.drone_id;
    this.drone_name = drone.drone_name;
    this.drone_model = drone.drone_model;
    this.Drone_img = drone.Drone_img;
    this.Price = drone.Price;
    this.QuantityInStock = drone.QuantityInStock;
    this.last_maintenance_date = drone.last_maintenance_date;
    this.Status = drone.Status;
  }

  static getAllDrones() {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM DroneInventory';
        db.query(query, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
  }

  static getDroneById(drone_id) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM DroneInventory WHERE drone_id = ?';
        db.query(query, [drone_id], (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result[0]);
          }
        });
      });
  }

   static getUserByPhoneNumber(phone_number) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM users WHERE phone_number = ?",
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

  static createDrone(newDrone) {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO DroneInventory SET ?';
        db.query(query, newDrone, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
  }

  static updateDrone(droneId, updatedDrone) {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE DroneInventory SET ? WHERE drone_id = ?';
        db.query(query, [updatedDrone, droneId], (err, result) => {
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
          CREATE TABLE IF NOT EXISTS DroneInventory (
            drone_id INT PRIMARY KEY AUTO_INCREMENT,
            user_id INT,
            drone_name VARCHAR(255),
            drone_model VARCHAR(255),
            Drone_img VARCHAR(255),
            Price DECIMAL(10, 2),
            QuantityInStock INT,
            last_maintenance_date DATE,
            Status ENUM('Available', 'In Service', 'Maintenance')
          )
        `;
        db.query(createTableQuery, (err, result) => {
          if (err) {
            reject(err);
          } else {
           console.log("Drone table created successfully")
            resolve(result);
          }
        });
      });
  }
}

module.exports = DroneInventory;
