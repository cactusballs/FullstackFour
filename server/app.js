// creating the server 
const express = require('express');
const app = express();
const sql = require('mysql2/promise'); //possibly don't need import here anymore? as db.js handles
const cors = require('cors');
require('dotenv').config({ path: '../.env' });
const database = require("./database");

app.use(cors());
app.use(express.json());

//routing
const threadRouter = require("./routes/threads");
app.use("/threads", threadRouter);

const topicRouter = require("./routes/topics");
app.use("/api/topics", topicRouter);

// creating and connecting to the port 
const port = process.env.SERVER_PORT || 3000; ;
app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});

//checking connection and error-logging if not working
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
app.get('/villagers', async (req, res) => {
  const userList = 'SELECT * FROM villagers ORDER BY villager_id ASC';
  try {
    const [results] = await database.query(userList);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: 'An error has occurred', error: error.message });
  }
});

// getting thread 1
//not a final idea for coding but shows how the tables come together to generate threads and posts.
//final FE will need thread title at the top but this can't be shown as part of 'union' query.

app.get('/thread1', async (req, res) => {
  const thread1 = 'SELECT thread_id, user_name, content, sent_at, \'thread\' AS level '+
  'FROM threads UNION SELECT thread_id, user_name, content, sent_at, \'post\' AS level '+
  'FROM posts_to_threads ORDER BY thread_id, sent_at;'

  try {
    const [results] = await database.query(thread1);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: 'An error has occurred', error: error.message });
  }
});

// Route to create a new forum topic
app.post('/api/forum', async (req, res) => {
  const { title, content, user_name, topic, carers_tag, expecting_parents_tag, new_parents_tag, single_parents_tag, LGBTQIA_plus_parents_tag } = req.body;
  const sql = `
    INSERT INTO threads (thread_title, content, user_name, topic, carers_tag, expecting_parents_tag, new_parents_tag, single_parents_tag, LGBTQIA_plus_parents_tag)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [title, content, user_name, topic, carers_tag, expecting_parents_tag, new_parents_tag, single_parents_tag, LGBTQIA_plus_parents_tag];

  try {
    await database.query(sql, values);
    res.status(201).json({ message: 'Thread created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
});

// Route to fetch user data
app.get('/api/user/:userId', async (req, res) => {
  const userId = req.params.userId;
  const sql = 'SELECT * FROM villagers WHERE villager_id = ?';

  try {
    const [results] = await database.query(sql, [userId]);
    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(results[0]);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
});

module.exports = database;