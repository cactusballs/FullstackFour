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

  try {
    const sql = `
      SELECT * FROM threads 
      WHERE topic = ? 
      AND (carers_tag = ? OR expecting_parents_tag = ? OR new_parents_tag = ? OR single_parents_tag = ? OR LGBTQIA_plus_parents_tag = ?)
    `;
    
    const tagValue = true;
    const [results] = await database.query(sql, [topic, tagValue, tagValue, tagValue, tagValue, tagValue]);
    
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
    const sql = 'SELECT * FROM threads WHERE id = ?';
    const [results] = await database.query(sql, [thread_id]);
    
    if (results.length === 0) {
      return res.status(404).json({ message: `No thread found with ID ${thread_id}` });
    }
    
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

// Get all posts (replies) under a specific thread
threadRouter.get('/threadheader/posts', async (req, res) => {
  const { thread_id } = req.query;

  if (!thread_id) {
    return res.status(400).json({ message: 'Thread ID is required' });
  }

  try {
    const sql = 'SELECT * FROM posts WHERE thread_id = ?';
    const [results] = await database.query(sql, [thread_id]);
    
    if (results.length === 0) {
      return res.status(404).json({ message: `No posts found for thread ID ${thread_id}` });
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
      INSERT INTO replies (thread_id, content, author, timestamp)
      VALUES (?, ?, ?, NOW())
    `;
    const values = [
      threadId,
      content,
      author
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

