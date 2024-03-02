const db = require('../../config/db');

class FeedbackForm {
  constructor(feedback) {
    this.FeedbackID = feedback.FeedbackID;
    this.UserID = feedback.UserID;
    this.FeedbackText = feedback.FeedbackText;
    this.Rating = feedback.Rating;
    this.FeedbackDate = feedback.FeedbackDate;
  }

  static createFeedbackForm(newFeedback) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO FeedbackForm SET ?';
      db.query(query, newFeedback, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static getAllFeedbackForms() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM FeedbackForm';
      db.query(query, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static getFeedbackFormById(feedbackId) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM FeedbackForm WHERE FeedbackID = ?';
      db.query(query, [feedbackId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result[0]);
        }
      });
    });
  }

  static deleteFeedbackForm(feedbackId) {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM FeedbackForm WHERE FeedbackID = ?';
      db.query(query, [feedbackId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static updateFeedbackForm(feedbackId, updatedFeedback) {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE FeedbackForm SET ? WHERE FeedbackID = ?';
      db.query(query, [updatedFeedback, feedbackId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static createFeedbackFormTable() {
    return new Promise((resolve, reject) => {
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS FeedbackForm (
          FeedbackID INT AUTO_INCREMENT PRIMARY KEY,
          UserID INT,
          FeedbackText TEXT,
          Rating INT,
          FeedbackDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (UserID) REFERENCES Users(UserID)
        )
      `;
      db.query(createTableQuery, (err, result) => {
        if (err) {
          reject(err);
        } else {
          console.log("FeedbackForm table created successfully");
          resolve(result);
        }
      });
    });
  }
}

module.exports = FeedbackForm;
