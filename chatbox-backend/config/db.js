const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  port: 3306,
  database: 'chatbox',
  connectionLimit: 10, // Adjust the connection limit as per your requirement
  waitForConnections: true,
  queueLimit: 0,
});

// Ping the database connection
pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to the database:', err);
    } else {
      console.log('Database connection successful.');
  
      // Release the connection
      connection.release();
    }
});

// Promisify the pool query method
const query = (sql, values) => {
  return new Promise((resolve, reject) => {
    pool.query(sql, values, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

module.exports = query;
