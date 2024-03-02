const db = require('../../config/db');

class Repair_Details {
  constructor(repair) {
    this.repairId = repair.repairId;
    this.pilotId = repair.pilotId;
    this.droneId = repair.droneId;
    this.userId = repair.userId;
    this.userName = repair.userName;
    this.phoneNumber = repair.phoneNumber;
    this.Country = repair.Country;
    this.StreetAddress = repair.StreetAddress;
    this.City = repair.City;
    this.State = repair.State;
    this.Zip = repair.Zip;
    this.issueDescription = repair.issueDescription;
    this.repairDate = repair.repairDate;
    this.repairStatus = repair.repairStatus;
    this.repairCategory = repair.repairCategory;
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
      const query = 'SELECT * FROM Repair_Details WHERE repairId = ?';
      db.query(query, [repairId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result[0]);
        }
      });
    });
  }

  static getRepairFormsByUserId(userId) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM Repair_Details WHERE userId = ?';
      db.query(query, [userId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
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

  static updateRepairForms(repairId, repairStatus) {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE Repair_Details SET repairStatus = ? WHERE repairId = ?';
      db.query(query, [repairStatus, repairId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static cancelRepairForms(repairId) {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE Repair_Details SET repairStatus = ? WHERE repairId = ?';
        const updatedStatus = 'Cancelled';
        db.query(query, [updatedStatus, repairId], (err, result) => {
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
      const query = 'DELETE FROM Repair_Details WHERE repairId = ?';
      db.query(query, [repairId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result[0]);
        }
      });
    });
  }
  
  static createTable() {
    return new Promise((resolve, reject) => {
      const createTableQuery = `
      CREATE TABLE IF NOT EXISTS Repair_Details (
        repairId INT AUTO_INCREMENT PRIMARY KEY,
        pilotId INT,
        droneId INT,
        userId INT,
        userName VARCHAR(255),
        phoneNumber VARCHAR(20),
        Country VARCHAR(100) NOT NULL,
        StreetAddress VARCHAR(255) NOT NULL,
        City VARCHAR(100) NOT NULL,
        State VARCHAR(100) NOT NULL,
        Zip VARCHAR(20) NOT NULL,
        issueDescription TEXT,
        repairDate DATE,
        repairStatus ENUM('Pending', 'Assigned','Hold','In Progress','Completed', 'Cancelled'),
        repairCategory ENUM('Frame and Bodywork Repair', 'Battery Repair/Replacement', 'Camera and Gimbal Repair', 'Water Damage Repair'),
        FOREIGN KEY (pilotId) REFERENCES Pilots(pilot_id),
        FOREIGN KEY (droneId) REFERENCES DroneInventory(drone_id),
        FOREIGN KEY (userId) REFERENCES users(UserID)
    );`
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
