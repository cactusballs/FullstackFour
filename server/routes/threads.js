const express = require("express");
const threadRouter = express.Router();
const database = require("../database");

threadRouter.get("/", async (req, res) => {
  let sql = "SELECT * FROM threads";

  try {
    const [results] = await database.query(sql);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: "An error has occurred", error: error.message });
  }
});

// Create a new thread with tags
threadRouter.post('/create', async (req, res) => {
  const { title, description, topic, carers_tag, expecting_parents_tag, new_parents_tag, single_parents_tag, LGBTQIA_plus_parents_tag } = req.body;

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
      carers_tag || false,
      expecting_parents_tag || false,
      new_parents_tag || false,
      single_parents_tag || false,
      LGBTQIA_plus_parents_tag || false,
    ];

    const [result] = await database.query(sqlInsert, values);

    if (result.affectedRows > 0) {
      res.status(201).json({ message: 'Post created successfully!', threadId: result.insertId });
    } else {
      res.status(500).json({ message: 'Failed to create post' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

module.exports = threadRouter;
