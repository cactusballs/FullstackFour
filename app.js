// creating the server 
const express = require('express');
const app = express();
const sql = require('mysql2');
require('dotenv').config();

app.use(express.json());

// connecting to the DB
const dataBase = sql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.DB_PASSWORD,
  database: 'village'
});

// checking we're connected to the DataBase 
dataBase.connect((error) => {
 if(error){
  console.error('Error connecting to the database:', error.stack);
  return;
 }
 console.log('Connected to the database.');
});

// creating route end point
app.get(`/`, (req, res) => {
  res.status(200).send('Welcome to your Village!')
  })

// getting all villagers
app.get('/villagers', (req, res) => {
  const userList = 'SELECT * FROM villagers ORDER BY villager_id ASC'
  dataBase.query(userList, (error, results) => {
    if (error) {
      return res.status(500).json({ message: 'An error has occurred', error: error.message });
    }
    res.status(200).json(results);
  });
})



// creating and connecting to the port 
const port = 3000;
app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});