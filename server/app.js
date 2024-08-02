// creating the server 
const express = require('express');
const app = express();
const sql = require('mysql2');
require('dotenv').config({ path: '../.env' });

app.use(express.json());

// connecting to the DB
const database = sql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// checking we're connected to the DataBase 
database.connect((error) => {
 if(error){
  console.error('Error connecting to the database:', error.stack);
  return;
 }
 console.log('Connected to the database.');
});

// creating route end point
app.get(`/`, (req, res) => {
  res.status(200).send('Welcome to your Village!')});

// getting all villagers
app.get('/villagers', (req, res) => {
  const userList = 'SELECT * FROM villagers ORDER BY villager_id ASC'
  database.query(userList, (error, results) => {
    if (error) {
      return res.status(500).json({ message: 'An error has occurred', error: error.message });
    }
    res.status(200).json(results);
  });
})



// getting thread 1
app.get('/thread1', (req, res) => {
  const thread1 = 'SELECT thread_id, user_name, content, sent_at, \'thread\' AS level '+
'FROM threads UNION SELECT thread_id, user_name, content, sent_at, \'post\' AS level '+
'FROM posts_to_threads ORDER BY sent_at;'
  database.query(thread1, (error, results) => {
    if (error) {
      return res.status(500).json({ message: 'An error has occurred', error: error.message });
    }
    res.status(200).json(results);
  });
})

// creating and connecting to the port 
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});


//for troubleshooting connection to db
// console.log(process.env.DB_HOST);
// console.log(process.env.DB_USER);
// console.log(process.env.DB_PASSWORD);
// console.log(process.env.DB_NAME);
// console.log(process.env.PORT);


