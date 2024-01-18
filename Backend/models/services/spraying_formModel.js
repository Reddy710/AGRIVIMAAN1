const db = require('../../config/db');

class Spraying_Details {
  constructor(spraying) {
    this.spraying_id = spraying.spraying_id;
    this.pilot_id = spraying.pilot_id;
    this.drone_id = spraying.drone_id;
    this.acers_to_spray = spraying.acers_to_spray;
    this.chemical_used = spraying.chemical_used;
    this.spraying_status = spraying.spraying_status;
    this.address = spraying.address;
  }

  static getAllSprayingForms() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM Spraying_Details';
      db.query(query, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static getSprayingFormsById(sprayingId) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM Spraying_Details WHERE spraying_id = ?';
      db.query(query, [sprayingId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result[0]);
        }
      });
    });
  }

  static createSprayingForms(newSpraying) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO Spraying_Details SET ?';
      db.query(query, newSpraying, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static updateSprayingForms(sprayingId, updatedSpraying) {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE Spraying_Details SET ? WHERE spraying_id = ?';
      db.query(query, [updatedSpraying, sprayingId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static deleteSprayingForms(sprayingId) {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM Spraying_Details WHERE spraying_id = ?';
      db.query(query, [sprayingId], (err, result) => {
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
        CREATE TABLE IF NOT EXISTS Spraying_Details (
          spraying_id INT AUTO_INCREMENT PRIMARY KEY,
          pilot_id INT,
          drone_id INT,
          acers_to_spray DECIMAL(10, 2),
          chemical_used VARCHAR(100),
          spraying_status ENUM('Unassigned', 'Assigned', 'Hold', 'In Progress', 'Pending', 'Completed'),
          address VARCHAR(255),
          FOREIGN KEY (pilot_id) REFERENCES Pilots(pilot_id),
          FOREIGN KEY (drone_id) REFERENCES DroneInventory(drone_id)
        )
      `;
      db.query(createTableQuery, (err, result) => {
        if (err) {
          reject(err);
        } else {
          console.log("Spraying_Details table created successfully");
          resolve(result);
        }
      });
    });
  }
}

module.exports = Spraying_Details;
