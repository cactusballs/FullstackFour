// creating the server
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "../.env" });
const database = require("./database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

app.use(cors());
app.use(express.json());

//routing
const threadRouter = require("./routes/threads");
app.use("/threads", threadRouter);

const topicRouter = require("./routes/topics");
app.use("/api/topics", topicRouter);

// creating and connecting to the port
const port = process.env.SERVER_PORT || 3000;

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
    const errorMessage = `Request failed, error: ${err.message}`;
    res.status(500).json({ message: errorMessage });
    console.log(errorMessage);
  }
});

// creating route end point
app.get(`/`, (req, res) => {
  res.status(200).send("Welcome to your Village!");
});

// getting all villagers
app.get("/villagers", async (req, res) => {
  const userList = "SELECT * FROM villagers ORDER BY villager_id ASC";
  try {
    const [results] = await database.query(userList);
    res.status(200).json(results);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error has occurred", error: error.message });
  }
});

// getting thread 1
//not a final idea for coding but shows how the tables come together to generate threads and posts.
//final FE will need thread title at the top but this can't be shown as part of 'union' query.

app.get("/thread1", async (req, res) => {
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

// Route to create a new forum topic
app.post("/api/forum", async (req, res) => {
  const {
    title,
    content,
    user_name,
    topic,
    carers_tag,
    expecting_parents_tag,
    new_parents_tag,
    single_parents_tag,
    LGBTQIA_plus_parents_tag,
  } = req.body;
  const sql = `
    INSERT INTO threads (thread_title, content, user_name, topic, carers_tag, expecting_parents_tag, new_parents_tag, single_parents_tag, LGBTQIA_plus_parents_tag)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [
    title,
    content,
    user_name,
    topic,
    carers_tag,
    expecting_parents_tag,
    new_parents_tag,
    single_parents_tag,
    LGBTQIA_plus_parents_tag,
  ];

  try {
    await database.query(sql, values);
    res.status(201).json({ message: "Thread created successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
});

// Route to fetch user data
app.get("/api/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  const sql = "SELECT * FROM villagers WHERE villager_id = ?";

  try {
    const [results] = await database.query(sql, [userId]);
    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(results[0]);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const [results] = await database.query(
      "SELECT * FROM villagers WHERE email = ?",
      [email]
    );
    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid email" });
    }

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      console.log(password, user.password);
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT
    const token = jwt.sign({ id: user.villager_id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      token,
      user: {
        id: user.villager_id,
        email: user.email,
        user_name: user.user_name,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred when trying to login",
      error: error.message,
    });
  }
});

// getting messages
app.get("/broadcastmessages", async (req, res) => {
  const query = `SELECT v.user_name, b.message_content 
  FROM broadcast_messages b 
  JOIN villagers v 
  ON b.villager_id = v.villager_id 
  WHERE TIMESTAMPDIFF(HOUR, b.created_at, NOW()) < 24
  ORDER BY created_at ASC;`;

  try {
    const [results] = await database.query(query);
    res.status(200).json(results);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Failed to retrieve messages" });
  }
});

// users create + post messages
app.post("/broadcastmessages", async (req, res) => {
  const { id, message_content } = req.body;

  if (!message_content) {
    res.status(400).json({ message: "Values cannot be blank" });
  }

  try {
    await database.query(
      "INSERT INTO broadcast_messages (villager_id, message_content) VALUES (?, ?)",
      [id, message_content]
    );
    res.status(201).json({ message: "Message posted", data: req.body });
  } catch (err) {
    res.status(400).json({ message: "Unable to post message" });
  }
});

// dashboards - get top 7 recent forum posts
app.get("/recentPosts", async (req, res) => {
  const recentPosts = `SELECT 
    village.posts_to_threads.content,
    village.posts_to_threads.sent_at,
    village.posts_to_threads.thread_id,
    village.posts_to_threads.post_id
FROM
    village.posts_to_threads
ORDER BY sent_at DESC
LIMIT 7;`;

  try {
    const [results] = await database.query(recentPosts);
    res.status(200).json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Failed to retrieve recent forum posts" });
  }
});

module.exports = database;

// dashboards - polling - get all poll contents
app.get("/pollInfo/:pollId", async (req, res) => {
  const pollId = req.params.pollId;
  const sqlPollMain = "SELECT * FROM poll WHERE id = ?";
  const sqlPollOptions = "SELECT poll_options.label from poll_options WHERE poll_id = ?"

  try {
    const [pollMainResults] = await database.query(sqlPollMain, [pollId]);
    if (pollMainResults.length === 0) {
      return res.status(404).json({ message: "Poll not found" });
    }

    const [pollOptionsResults] = await database.query(sqlPollOptions, [pollId]);
    if (pollOptionsResults.length === 0) {
      return res.status(404).json({ message: "Poll options not found" });
    }

    res.status(200).json({
      poll: pollMainResults[0],
      options: pollOptionsResults
    });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error: error.message });
  }
});

// dashboards - polling - submitting a vote
app.post("/pollVote", async (req, res) => {
  const { poll_id, poll_options_id } = req.body;

  if (!poll_id, poll_options_id) {
    res.status(400).json({ message: "Values cannot be blank" });
  }

  try {
    await database.query(
      "INSERT INTO poll_votes (poll_id, poll_options_id, created_at) VALUES (?, ?,CURRENT_TIMESTAMP())",
      [poll_id, poll_options_id]
    );
    res.status(201).json({ message: "Vote successfully submitted", data: req.body });
  } catch (err) {
    res.status(400).json({ message: "Unable to submit vote, please try again" });
  }
});

// dashboards - polling - get poll results
app.get("/pollResults/:pollId", async (req, res) => {
  const pollId = req.params.pollId;
  const sqlPollTotalVotes = " SELECT COUNT(*) as totalVotes FROM poll_votes WHERE poll_votes.poll_id = ?";
  const sqlPollOptionsVotes = "SELECT poll_options.id, poll_options.label, COUNT(poll_votes.poll_options_id), (COUNT(poll_votes.poll_options_id) * 100.0 / SUM(COUNT(poll_votes.poll_options_id)) OVER ()) AS percentage FROM poll_options LEFT JOIN poll_votes ON poll_options.id = poll_votes.poll_options_id WHERE poll_options.poll_id = ? GROUP BY poll_options.id, poll_options.label ORDER BY poll_options.id;"

  try {
    const [pollTotalVotes] = await database.query(sqlPollTotalVotes, [pollId]);
    if (pollTotalVotes.length === 0) {
      return res.status(404).json({ message: "Total votes not found" });
    }

    const [pollOptionsVotes] = await database.query(sqlPollOptionsVotes, [pollId]);
    if (pollOptionsVotes.length === 0) {
      return res.status(404).json({ message: "Distribution not found" });
    }

    res.status(200).json({
      totalVotes: pollTotalVotes[0],
      optionsVotes: pollOptionsVotes
    });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error: error.message });
  }
});

// Registration Route
app.post('/signup', async (req, res) => {
  const { first_name, last_name, user_name, birthday, email, villager_address, villager_postcode, villager_location, password } = req.body;

  try {
    // Checking if the email is already registered in the database
    const [existingEmail] = await database.query('SELECT * FROM villagers WHERE email = ?', [email]);
    if (existingEmail.length > 0) {
      return res.status(400).json({ error: 'email', message: 'This email is already registered, please log in' });
    }

    // Checking if the username is already in the database
    const [existingUser] = await database.query('SELECT * FROM villagers WHERE user_name = ?', [user_name]);
    if (existingUser.length > 0) {
      return res.status(409).json({ error: 'user_name', message: 'This username is already taken, please choose a different one' });
    }

    // Hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = 'INSERT INTO villagers (first_name, last_name, user_name, birthday, email, villager_address, villager_postcode, villager_location, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [first_name, last_name, user_name, birthday, email, villager_address, villager_postcode, villager_location, hashedPassword];
    const result = await database.query(sql, values);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error occurred when registering:', error);
    res.status(500).json({ message: 'An error occurred during registration', error: error.message });
  }
});
