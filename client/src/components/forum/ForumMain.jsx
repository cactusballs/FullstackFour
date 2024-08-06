import React, { useState, useEffect } from 'react';
import './ForumMain.css';
import ForumSubmission from './ForumSubmissionForm.jsx';


const ForumMain = () => {
  // trying to connect to the DB
  const [threads, setThreads] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/threads')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setThreads(data))
      .catch(error => {
        console.error('Error fetching threads:', error);
        setError('Failed to fetch threads');
      });
  }, []);

  return (
    <div className="AllForums">
      <div className='header'>
        <h2>Welcome to the Village Town Hall</h2>
        <p>...explore threads by topic or start your own!</p>
      </div>
      <div className='TownHall'>
        <h3>All posts...</h3>
        {error ? (
          <p>{error}</p>
        ) : (
          <ul className="TownHallPosts">
            {threads.map(thread => (
              <li key={thread.thread_id}>{thread.thread_title}</li>
            ))}
          </ul>
        )}
      </div>
      <div className='TopPicks'>
        <h3>Start a thread...</h3>
        <ForumSubmission />
      
      </div>
    </div>
  );
}

export default ForumMain;
