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
      return res.status(400).send({ message: "no posts with this id" });
    }
    res.status(200).json(postResults);
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
});

module.exports = threadRouter;
