// src/utils/db.js

import mysql from 'mysql2/promise'; // Import from 'mysql2/promise' to enable promises automatically

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',  // Your MySQL host
  user: 'root',       // Your MySQL username
  password: '',       // Your MySQL password (leave empty if no password)
  database: 'my_database', // Your MySQL database name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool; // Directly export the pool without using .promise()
