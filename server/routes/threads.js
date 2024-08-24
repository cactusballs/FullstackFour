const express = require("express");
const threadRouter = express.Router();
const database = require("../database");

// Get all threads
threadRouter.get("/", async (req, res) => {
  let sql = "SELECT * FROM threads";

  try {
    const [results] = await database.query(sql);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: "An error has occurred", error: error.message });
  }
});

// API endpoint to create a new thread/post
threadRouter.post('/create', async (req, res) => {
  const { thread_title, content, topic, carers_tag, expecting_parents_tag, new_parents_tag, single_parents_tag, LGBTQIA_plus_parents_tag, user_name } = req.body;

  // Validate required fields
  if (!thread_title || !content || !topic || !user_name) {
    return res.status(400).json({ message: 'Title, content, topic, and user name are required' });
  }

  try {
    const sqlInsert = `
      INSERT INTO threads (thread_title, content, topic, carers_tag, expecting_parents_tag, new_parents_tag, single_parents_tag, LGBTQIA_plus_parents_tag, user_name) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      thread_title,
      content,
      topic,
      carers_tag || false,
      expecting_parents_tag || false,
      new_parents_tag || false,
      single_parents_tag || false,
      LGBTQIA_plus_parents_tag || false,
      user_name,
    ];

    const [result] = await database.query(sqlInsert, values);

    if (result.affectedRows > 0) {
      res.status(201).json({ message: 'Post created successfully!' });
    } else {
      res.status(500).json({ message: 'Failed to create post' });
    }
  } catch (error) {
    console.error('Error while creating thread:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

// Get all threads under a specific topic
threadRouter.get('/:topic', async (req, res) => {
  const { topic } = req.params;

  try {
    const sql = 'SELECT * FROM threads WHERE topic = ?';
    const [results] = await database.query(sql, [topic]);

    if (results.length === 0) {
      return res.status(404).json({ message: `No threads found for topic ${topic}` });
    }

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

// Get all threads under a specific topic and tag
threadRouter.get('/:topic/:tag', async (req, res) => {
  const { topic, tag } = req.params;

  const tagColumn = `${tag}_tag`;  // This assumes that tag names match the column names

  if (!['carers', 'expecting_parents', 'new_parents', 'single_parents', 'LGBTQIA_plus'].includes(tag)) {
    return res.status(400).json({ message: 'Invalid tag' });
  }

  try {
    const sql = `SELECT * FROM threads WHERE topic = ? AND ${tagColumn} = true`;
    const [results] = await database.query(sql, [topic]);

    if (results.length === 0) {
      return res.status(404).json({ message: `No threads found for topic ${topic} with tag ${tag}` });
    }

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

// Get thread header and initial post by thread ID
threadRouter.get('/threadheader', async (req, res) => {
  const { thread_id } = req.query;

  if (!thread_id) {
    return res.status(400).json({ message: 'Thread ID is required' });
  }

  try {
    const sql = 'SELECT * FROM threads WHERE thread_id = ?';
    const [results] = await database.query(sql, [thread_id]);

    if (results.length === 0) {
      return res.status(404).json({ message: `No thread found with ID ${thread_id}` });
    }

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

threadRouter.get('/threadheader', async (req, res) => {
  const { thread_id } = req.query;

  console.log('Thread ID:', thread_id);  // Add this line to log the thread ID

  if (!thread_id) {
    return res.status(400).json({ message: 'Thread ID is required' });
  }

  try {
    const sql = 'SELECT * FROM threads WHERE thread_id = ?';
    const [results] = await database.query(sql, [thread_id]);
    
    if (results.length === 0) {
      return res.status(404).json({ message: `No thread found with ID ${thread_id}` });
    }
    
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});


// API endpoint to create a new reply
threadRouter.post('/reply', async (req, res) => {
  const { threadId, content, author } = req.body;

  // Validate required fields
  if (!threadId || !content || !author) {
    return res.status(400).json({ message: 'Thread ID, content, and author are required' });
  }

  try {
    const sqlInsert = `
      INSERT INTO posts_to_threads (thread_id, user_name, content, sent_at)
      VALUES (?, ?, ?, NOW())
    `;
    const values = [
      threadId,
      author,
      content
    ];

    const [result] = await database.query(sqlInsert, values);

    if (result.affectedRows > 0) {
      res.status(201).json({ message: 'Reply created successfully!' });
    } else {
      res.status(500).json({ message: 'Failed to create reply' });
    }
  } catch (error) {
    console.error('Error while creating reply:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

module.exports = threadRouter;
