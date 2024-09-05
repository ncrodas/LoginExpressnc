const mysql = require('mysql2/promise');
// Create the connection to database
const connection = mysql.createPool({
  host: process.env. HOSDB || 'localhost',
  user: process.env. USERDB || 'root',
  database: process.env. DB ||  'login',
  password: process.env.PASSWORDDB || '',
  port: process.env.PORTDB || 3308,
});

module.exports = connection;
