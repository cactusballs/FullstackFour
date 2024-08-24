const express = require("express");
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
      return res.status(404).send({ message: "no posts with this id" });
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
      return res.status(404).send({ message: 'No threads found for this topic' });
    }

    res.status(200).json(results);
    //console.log(results);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


//WIP!!!!!!!!
// Get threads by topic AND TAG for ForumTopicThreads - for using with dropdown
//http://localhost:3000/threads/:topic/:tag
//e.g. http://localhost:3000/threads/SEND/carers
threadRouter.get('/:topic/:tag', async (req, res) => {
  const { topic, tag } = req.params;
  const tagParam = `${tag}_tag`;

  try {
    const sqlThreadPostsWithTags = "SELECT * FROM threads WHERE topic = ? and "+tagParam+" = 1";
    //SELECT * FROM threads where carers_tag =1 and topic = 'SEND';
    const [results] = await database.query(sqlThreadPostsWithTags, [topic], [tagParam]);
    console.log(tagParam);
    /*tags are:
    carers_tag ,
    expecting_parents_tag,
    new_parents_tag,
    single_parents_tag,
    LGBTQIA_plus_parents_tag
*/
//can't filter by tag on main page so don't need to worry about /all/[tag].
//endpoint would need to be added for /alltopics if filtering on main page of forum

    if (results.length === 0) {
      return res.status(404).send({ message: 'No threads found with this tag' });
    }

    res.status(200).json(results);
    //console.log(results);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// API endpoint to create a new thread/post
threadRouter.post('/create', async (req, res) => {
  const { thread_title, content, topic, carersTag, expectingParentsTag, newParentsTag, singleParentsTag, lgbtqiaPlusParentsTag, user_name } = req.body;

  // Validate required fields
  if (!thread_title || !content || !topic || !user_name) {
    return res.status(400).json({ message: 'Title, content, topic, and user name are required' });
  }

  try {
    const sqlInsert = `
      INSERT INTO threads (thread_title, content, topic, carers_tag, expecting_parents_tag, new_parents_tag, single_parents_tag, lgbtqia_plus_parents_tag, user_name)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      thread_title,
      content,
      topic,
      carersTag ? 1 : 0,
      expectingParentsTag ? 1 : 0,
      newParentsTag ? 1 : 0,
      singleParentsTag ? 1 : 0,
      lgbtqiaPlusParentsTag ? 1 : 0,
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


module.exports = threadRouter;
