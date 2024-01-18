const db = require('../config/db')

async function searchInTable(tableName, searchTerm) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM ${tableName} WHERE drone_name REGEXP '\\b${searchTerm}\\b';`
      db.query(query, (err, results) => {
        if (err) {
          reject(err);
        } else {
            console.log(results)
          resolve(results);
        }
      });
    });
  }
  module.exports = {
    searchInTable
  }