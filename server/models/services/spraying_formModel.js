const db = require('../../config/db');

class Spraying_Details {
  constructor(spraying) {
    this.sprayingId = spraying.sprayingId;
    this.pilotId = spraying.pilotId;
    this.droneId = spraying.droneId;
    this.userId = spraying.userId;
    this.userName = spraying.userName;
    this.phoneNumber = spraying.phoneNumber;
    this.serviceCategory = spraying.serviceCategory;
    this.acersToSpray = spraying.acersToSpray;
    this.chemicalUsed = spraying.chemicalUsed;
    this.serviceRequestedDate = spraying.serviceRequestedDate;
    this.sprayingStatus = spraying.sprayingStatus;
    this.Country = spraying.Country;
    this.StreetAddress = spraying.StreetAddress;
    this.City = spraying.City;
    this.State = spraying.State;
    this.Zip = spraying.Zip;
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
      const query = 'SELECT * FROM Spraying_Details WHERE sprayingId = ?';
      db.query(query, [sprayingId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result[0]);
        }
      });
    });
  }

  static getSprayingFormsByUserId(userId) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM Spraying_Details WHERE userId = ?';
      db.query(query, [userId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
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

  static updateSprayingForms(sprayingId, sprayingStatus) {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE Spraying_Details SET sprayingStatus = ? WHERE sprayingId = ?';
      db.query(query, [sprayingStatus, sprayingId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static cancelSprayingForms(sprayingId) {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE Spraying_Details SET sprayingStatus = ? WHERE sprayingId = ?';
      const updatedStatus = 'Cancelled'
      db.query(query, [updatedStatus, sprayingId], (err, result) => {
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
      const query = 'DELETE FROM Spraying_Details WHERE sprayingId = ?';
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
        sprayingId INT AUTO_INCREMENT PRIMARY KEY,
        pilotId INT,
        droneId INT,
        userId INT,
        userName VARCHAR(255),
        phoneNumber VARCHAR(20),
        serviceCategory ENUM('chemicalSpray', 'droneRent'),
        acersToSpray DECIMAL(10, 2),
        chemicalUsed VARCHAR(100),
        serviceRequestedDate DATE,
        sprayingStatus ENUM('Pending', 'Assigned','Hold','In Progress','Completed', 'Cancelled'),
        Country VARCHAR(100) NOT NULL,
        StreetAddress VARCHAR(255) NOT NULL,
        City VARCHAR(100) NOT NULL,
        State VARCHAR(100) NOT NULL,
        Zip VARCHAR(20) NOT NULL,
        FOREIGN KEY (pilotId) REFERENCES Pilots(pilot_id),
        FOREIGN KEY (droneId) REFERENCES DroneInventory(drone_id),
        FOREIGN KEY (userId) REFERENCES users(UserID)
    );`
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
