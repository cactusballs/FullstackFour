// creating the server 
const express = require('express');
const app = express();
const sql = require('mysql2/promise');
const cors = require('cors');
require('dotenv').config({ path: '../.env' });

app.use(cors());
app.use(express.json());

// connecting to the DB
const database = sql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// checking we're connected to the DataBase 
// database.connect((error) => {
//  if(error){
//   console.error('Error connecting to the database:', error.stack);
//   return;
//  }
//  console.log('Connected to the database.');
// });


app.get("/check", async (req, res) => {
  try {
    const connect = await database.getConnection();
    connect.release();
    const successMessage = `Connected successfully to ${process.env.DB_NAME} database`;
    res.status(200).json({ message: successMessage });
    console.log(successMessage);
  } catch (err) {
    const errorMessage = `Request failed, error: ${err.message}`
    res.status(500).json({ message: errorMessage });
    console.log(errorMessage);
  }
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
//not a final idea for coding but shows how the tables come together to generate threads and posts.
//final FE will need thread title at the top but this can't be shown as part of 'union' query.
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

// displaying all threads in forum main - need to change but it works!
app.get('/threads', (req, res) => {
  const sql = 'SELECT * FROM threads';
  database.query(sql, (error, results) => {
    if (error) {
      return res.status(500).json({ message: 'An error has occurred', error: error.message });
    }
    res.status(200).json(results);
  });
});

// Route to create a new forum topic
app.post('/api/forum', (req, res) => {
  const { title, content, user_name, topic, carers_tag, expecting_parents_tag, new_parents_tag, single_parents_tag, LGBTQIA_plus_parents_tag } = req.body;
  const sql = `
    INSERT INTO threads (thread_title, content, user_name, topic, carers_tag, expecting_parents_tag, new_parents_tag, single_parents_tag, LGBTQIA_plus_parents_tag)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [title, content, user_name, topic, carers_tag, expecting_parents_tag, new_parents_tag, single_parents_tag, LGBTQIA_plus_parents_tag];
  database.query(sql, values, (error, results) => {
    if (error) {
      return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
    res.status(201).json({ message: 'Topic created successfully' });
  });
});

// Route to fetch user data
app.get('/api/user/:userId', (req, res) => {
  const userId = req.params.userId;
  const sql = 'SELECT * FROM villagers WHERE villager_id = ?';
  database.query(sql, [userId], (error, results) => {
    if (error) {
      return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(results[0]);
  });
});

// creating and connecting to the port 
const port = process.env.SERVER_PORT || 3000; ;
app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});


//for troubleshooting connection to db
// console.log(process.env.DB_HOST);
// console.log(process.env.DB_USER);
// console.log(process.env.DB_PASSWORD);
// console.log(process.env.DB_NAME);
// console.log(process.env.PORT);




// defining API endpoints for each topic forum using query parameters



//Parameters:
//   1 "Becoming a parent",
//   2 "Being a parent",
//   3 "Being a carer",
//   4 "Education",
//   5 "Childcare",
//   6 "Sleep",
//   7 "SEND",
//   8 "Mind, body and soul",
//   9 "Charities",

//'SELECT topic FROM village.threads'


app.get('/api/topics/', (req, res) => {


  const topicArray = [
    "Becoming a parent",
    "Being a parent",
    "Being a carer",
    "Education",
    "Childcare",
    "Sleep",
    "SEND",
    "Mind, body and soul",
    "Charities",
  ];

  const refArray = topicArray.map((_,index) => index+1);
  console.log(refArray); //or put into an object??


  const topicId = req.params.userId; //update to pull each id as a different topic, so filters on topic
  const sql = `SELECT * FROM village.threads where topic = 'Being a parent'`
  database.query(sql, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Topic not found' });
    }
    res.status(200).json(results);
  });
});
