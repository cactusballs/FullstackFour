const express = require("express");
const threadRouter = express.Router();
const database = require("../database");


//ALL ENDPOINTS HERE PRECEDED BY /THREADS e.g. /THREADS/THREAD1:

//displaying all threads in forum main page: i.e. starting conversation post for each
threadRouter.get("/", async (req, res) => {
  const sql = "SELECT * FROM threads";

  try {
    const [results] = await database.query(sql);
    res.status(200).json(results);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error has occurred", error: error.message });
  }
});

//update to take parameter so can return a thread + posts
threadRouter.get("/thread1", async (req, res) => {
    const thread1 =
      "SELECT thread_id, user_name, content, sent_at, 'thread' AS level " +
      "FROM threads UNION SELECT thread_id, user_name, content, sent_at, 'post' AS level " +
      "FROM posts_to_threads ORDER BY thread_id, sent_at;";
  
    try {
      const [results] = await database.query(thread1);
      res.status(200).json(results);
    } catch (error) {
      res
        .status(500)
        .json({ message: "An error has occurred", error: error.message });
    }
  });

module.exports = threadRouter;
