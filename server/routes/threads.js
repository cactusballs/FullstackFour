/*const express = require("express");
const threadRouter = express.Router();
const database = require("../database");

//ALL ENDPOINTS HERE PRECEDED BY /THREADS e.g. /THREADS/THREAD1:

//displaying all threads in forum main page: i.e. starting conversation post for each
threadRouter.get("/", async (req, res) => {
  let sql = "SELECT * FROM threads";

  try {
    const [results] = await database.query(sql);
    res.status(200).json(results);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error has occurred", error: error.message });
  }
});

//API endpoint for thread header/title: navigate by thread id no.
// http://localhost:3000/threads/threadheader?thread_id=3
threadRouter.get("/threadheader", async (req, res) => {
  const { thread_id } = req.query;
  const queryParam = parseInt(thread_id);

  if (!thread_id || typeof queryParam != "number") {
    return res.status(400).send({
      message:
        "Please provide a valid numerical parameter id to access a thread",
    });
  }

  try {
    let sqlThread = `SELECT * FROM village.threads`;
    sqlThread += " where thread_id = ?";

    const [threadResults] = await database.query(sqlThread, queryParam);
    if (threadResults.length === 0) {
      return res.status(400).send({ message: "no thread titles with this id" });
    }
    res.status(200).json(threadResults);
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
});

//API endpoint for posts under thread header/title for specific id
// http://localhost:3000/threads/threadheader/posts?thread_id=2
threadRouter.get("/threadheader/posts", async (req, res) => {
  const { thread_id } = req.query;
  const queryParam = parseInt(thread_id);

  if (!thread_id || typeof queryParam != "number") {
    return res.status(400).send({
      message:
        "Please provide a valid numerical parameter id to access a thread's posts",
    });
  }

  try {
    let sqlThreadPosts = `SELECT * FROM village.posts_to_threads`;
    sqlThreadPosts += " where thread_id = ? order by post_id ASC;";

    const [postResults] = await database.query(sqlThreadPosts, queryParam);
    if (postResults.length === 0) {
      return res.status(400).send({ message: "no posts with this id" });
    }
    res.status(200).json(postResults);
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
});

// Get threads by topic for ForumTopicThreads
threadRouter.get('/:topic', async (req, res) => {
  const { topic } = req.params;

  try {
    const sqlThreadPosts = "SELECT * FROM threads WHERE topic = ?";
    const [results] = await database.query(sqlThreadPosts, [topic]);

    if (results.length === 0) {
      return res.status(400).send({ message: 'No threads found for this topic' });
    }

    res.status(200).json(results);
    console.log(results);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
// API endpoint to create a new thread/post

threadRouter.post('/create', async (req, res) => {
  const { title, description, topic, tags } = req.body;

  if (!title || !description || !topic) {
    return res.status(400).json({ message: 'Title, description, and topic are required' });
  }

  try {
    const sqlInsert = 'INSERT INTO threads (title, description, topic, tags) VALUES (?, ?, ?, ?)';
    const [result] = await database.query(sqlInsert, [title, description, topic, tags]);

    if (result.affectedRows > 0) {
      res.status(201).json({ message: 'Post created successfully', threadId: result.insertId });
    } else {
      res.status(500).json({ message: 'Failed to create post' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});
const express = require('express');
const threadRouter = express.Router();
const database = require('../database'); // Make sure this points to your database connection

// Endpoint to create a new thread
threadRouter.post('/create', async (req, res) => {
  const { title, description, topic, carers, expecting_parents, new_parents, single_parents, LGBTQIA_plus_parents } = req.body;

  if (!title || !description || !topic) {
    return res.status(400).json({ message: 'Title, description, and topic are required' });
  }

  try {
    const sqlInsert = `
      INSERT INTO threads (title, description, topic, carers_tag, expecting_parents_tag, new_parents_tag, single_parents_tag, LGBTQIA_plus_parents_tag) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      title,
      description,
      topic,
      carers || false,
      expecting_parents || false,
      new_parents || false,
      single_parents || false,
      LGBTQIA_plus_parents || false,
    ];

    const [result] = await database.query(sqlInsert, values);

    if (result.affectedRows > 0) {
      res.status(201).json({ message: 'Post created successfully!' });
    } else {
      res.status(500).json({ message: 'Failed to create post' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});


module.exports = threadRouter;*/
const express = require('express');
const threadRouter = express.Router();
const database = require('../database'); // Make sure this points to your database connection
const cors = require('cors');
threadRouter.use(cors());

// Displaying all threads in the forum main page
threadRouter.get('/', async (req, res) => {
  const sql = "SELECT * FROM threads";

  try {
    const [results] = await database.query(sql);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: "An error has occurred", error: error.message });
  }
});

// API endpoint for thread header/title: navigate by thread ID number
threadRouter.get('/threadheader', async (req, res) => {
  const { thread_id } = req.query;
  const queryParam = parseInt(thread_id);

  if (!thread_id || isNaN(queryParam)) {
    return res.status(400).json({ message: "Please provide a valid numerical parameter ID to access a thread" });
  }

  try {
    const sqlThread = "SELECT * FROM threads WHERE thread_id = ?";
    const [threadResults] = await database.query(sqlThread, [queryParam]);

    if (threadResults.length === 0) {
      return res.status(400).json({ message: "No thread titles with this ID" });
    }
    res.status(200).json(threadResults);
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
});

// API endpoint for posts under a specific thread header/title
threadRouter.get('/threadheader/posts', async (req, res) => {
  const { thread_id } = req.query;
  const queryParam = parseInt(thread_id);

  if (!thread_id || isNaN(queryParam)) {
    return res.status(400).json({ message: "Please provide a valid numerical parameter ID to access a thread's posts" });
  }

  try {
    const sqlThreadPosts = "SELECT * FROM posts_to_threads WHERE thread_id = ? ORDER BY post_id ASC;";
    const [postResults] = await database.query(sqlThreadPosts, [queryParam]);

    if (postResults.length === 0) {
      return res.status(400).json({ message: "No posts with this ID" });
    }
    res.status(200).json(postResults);
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
});

// Get threads by topic for ForumTopicThreads
threadRouter.get('/:topic', async (req, res) => {
  const { topic } = req.params;

  try {
    const sqlThreadPosts = "SELECT * FROM threads WHERE topic = ?";
    const [results] = await database.query(sqlThreadPosts, [topic]);

    if (results.length === 0) {
      return res.status(400).json({ message: 'No threads found for this topic' });
    }

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// API endpoint to create a new thread/post
threadRouter.post('/create', async (req, res) => {
  const { title, description, topic, carers, expecting_parents, new_parents, single_parents, LGBTQIA_plus_parents } = req.body;

  if (!title || !description || !topic) {
    return res.status(400).json({ message: 'Title, description, and topic are required' });
  }

  try {
    const sqlInsert = `
      INSERT INTO threads (title, description, topic, carers_tag, expecting_parents_tag, new_parents_tag, single_parents_tag, LGBTQIA_plus_parents_tag) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      title,
      description,
      topic,
      carers || false,
      expecting_parents || false,
      new_parents || false,
      single_parents || false,
      LGBTQIA_plus_parents || false,
    ];

    const [result] = await database.query(sqlInsert, values);

    if (result.affectedRows > 0) {
      const newThread = {
        thread_id: result.insertId,
        title,
        description,
        topic,
        carers_tag: carers || false,
        expecting_parents_tag: expecting_parents || false,
        new_parents_tag: new_parents || false,
        single_parents_tag: single_parents || false,
        LGBTQIA_plus_parents_tag: LGBTQIA_plus_parents || false,
        
      };
      res.status(201).json(newThread);  
    } else {
      res.status(500).json({ message: 'Failed to create post' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

module.exports = threadRouter;


