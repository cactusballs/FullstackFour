require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const mysql = require("mysql2/promise");
const database = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

app.use(cors());
app.use(express.json());

// creating route end point
app.get(`/`, (req, res) => {
  res.status(200).send("Welcome to your Village!");
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
    res.status(400).json({ status: "Failed to retrieve messages" });
  }
});

// users create + post messages
app.post("/broadcastmessages", async (req, res) => {
  const { id, message_content } = req.body;

  if (!message_content || !id) {
    res.status(400).json({ status: "Values cannot be blank" });
  }

  try {
    await database.query(
      "INSERT INTO broadcast_messages (villager_id, message_content) VALUES (?, ?)",
      [id, message_content]
    );
    res.status(201).json({ status: "Message posted", data: req.body });
  } catch (err) {
    res.status(400).json({ status: "Unable to post message" });
  }
});

// creating and connecting to the port
const port = 3000;

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
