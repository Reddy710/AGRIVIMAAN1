const db = require('../../config/db');

class Pilot {
  constructor(pilot) {
    this.pilot_id = pilot.pilot_id;
    this.username = pilot.username;
    this.email = pilot.email;
    this.password = pilot.password;
    this.phone_number = pilot.phone_number;
    this.profession = pilot.profession;
    this.created_at = pilot.created_at;
  }

  static getAllPilots() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM Pilots';
      db.query(query, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static getPilotById(pilotId) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM Pilots WHERE pilot_id = ?';
      db.query(query, [pilotId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result[0]);
        }
      });
    });
  }

  static createPilot(newPilot) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO Pilots SET ?';
      db.query(query, newPilot, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static getPilotByPhoneNumber(phone_number) {
    // console.log(phone_number)
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM Pilots WHERE phone_number = ?",
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

  static updatePilot(pilotId, updatedPilot) {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE Pilots SET ? WHERE pilot_id = ?';
      db.query(query, [updatedPilot, pilotId], (err, result) => {
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
        CREATE TABLE IF NOT EXISTS Pilots (
          pilot_id INT AUTO_INCREMENT PRIMARY KEY,
          username VARCHAR(50) NOT NULL,
          email VARCHAR(100) NOT NULL,
          password VARCHAR(255) NOT NULL,
          phone_number VARCHAR(20) NOT NULL UNIQUE,
          profession ENUM('Chemical Sprayer', 'Drone Mechanic'),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `;
      db.query(createTableQuery, (err, result) => {
        if (err) {
          reject(err);
        } else {
          console.log("Pilots table created successfully");
          resolve(result);
        }
      });
    });
  }
}

module.exports = Pilot;
