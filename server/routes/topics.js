const express = require("express");
const topicRouter = express.Router();
const database = require("../database");

// creating route end point
// topicRouter.get(`/`, (req, res) => {
//   res.status(200).send("Welcome to your topics!");
// });


//ALL ENDPOINTS HERE PRECEDED BY /API/TOPICS 


// defining API endpoints for each topic forum using query parameters



topicRouter.get('/', async (req, res) => {
    // Define the array of topics
    const topicArray = [
      "Becoming a parent",
      "Being a parent",
      "Being a carer",
      "Education",
      "Childcare",
      "Sleep",
      "SEND",
      "Mind, body and soul",
      "Charities",
    ];
  
    // Create a reference array mapping topic names to IDs
    const refArray = topicArray.map((threadTopic, index) => ({ id: index + 1, threadTopic }));
    console.log(refArray); //test
  
    // Extract topic ID from query parameters
    const topicId = parseInt(req.query.topicId); // Assuming you pass topic ID as a query parameter
    
    // Validate the topicId
    if (isNaN(topicId) || topicId < 1 || topicId > topicArray.length) {
      return res.status(400).json({ message: 'Invalid topic ID' });
    }
  
    // Get the topic name based on the topicId
    const topicName = topicArray[topicId - 1];
    
    // Define the SQL query using the topicName
    const sql = 'SELECT * FROM threads WHERE topic = ?';
  
    try {
      const [results] = await database.query(sql, [topicName]);
  
      // Check if results exist
      if (results.length === 0) {
        return res.status(404).json({ message: 'No threads for this topic' });
      }
  
      // Return the results as JSON
      res.status(200).json(results);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Error', error: error.message });
    }
  });



module.exports = topicRouter;
