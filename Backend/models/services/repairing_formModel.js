const db = require('../../config/db');

class Repair_Details {
  constructor(repair) {
    this.repair_id = repair.repair_id;
    this.pilot_id = repair.pilot_id;
    this.drone_id = repair.drone_id;
    this.issue_description = repair.issue_description;
    this.repair_date = repair.repair_date;
    this.repair_status = repair.repair_status;
  }

  static getAllRepairForms() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM Repair_Details';
      db.query(query, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static getRepairFormsById(repairId) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM Repair_Details WHERE repair_id = ?';
      db.query(query, [repairId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result[0]);
        }
      });
    });
  }

  static createRepairForms(newRepair) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO Repair_Details SET ?';
      db.query(query, newRepair, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static updateRepairForms(repairId, updatedRepair) {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE Repair_Details SET ? WHERE repair_id = ?';
      db.query(query, [updatedRepair, repairId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static deleteRepairForms(repairId) {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM Repair_Details WHERE repair_id = ?';
      db.query(query, [repairId], (err, result) => {
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
        CREATE TABLE IF NOT EXISTS Repair_Details (
          repair_id INT AUTO_INCREMENT PRIMARY KEY,
          pilot_id INT,
          drone_id INT,
          issue_description TEXT,
          repair_date DATE,
          repair_status ENUM('In Progress', 'Pending', 'Completed'),
          FOREIGN KEY (pilot_id) REFERENCES Pilots(pilot_id),
          FOREIGN KEY (drone_id) REFERENCES DroneInventory (drone_id)
        )
      `;
      db.query(createTableQuery, (err, result) => {
        if (err) {
          reject(err);
        } else {
          console.log("Repair_Details table created successfully");
          resolve(result);
        }
      });
    });
  }
}

module.exports = Repair_Details;
