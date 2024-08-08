//connect to village database
const sql = require('mysql2/promise');

 //connect via pool using credentials stored in .env
const database = sql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  });
  
  // Export the database 
  module.exports = database;  