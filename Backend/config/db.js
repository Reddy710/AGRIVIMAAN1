const mysql = require('mysql2');


const db = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'agrivimaandb',
});

db.connect((err) => {
  if (err) throw err;
  console.log('MySQL connected')
});

module.exports = db;
