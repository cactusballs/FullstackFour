import React, { useState, useEffect } from 'react';
import './ForumMain.css';
import ForumSubmission from './ForumSubmissionForm.jsx';
import NavbarComp from '../navbar/Navbar.jsx';
import { Link } from 'react-router-dom';

const ForumMain = () => {
  //  trying to connect to the DB
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
      .then(data => {
        // just bringing back one topic to create the menu as links
        const uniqueTopics = new Map();
        data.forEach(thread => {
          if (!uniqueTopics.has(thread.topic)) {
            uniqueTopics.set(thread.topic, thread);
          }
        });

        setThreads(Array.from(uniqueTopics.values()));
      })
      .catch(error => {
        console.error('Error fetching threads:', error);
        setError('Failed to fetch threads');
      });
  }, []);

  return (
    <div className="AllForums">
      <NavbarComp />
      <div className='header'>
        <h2>Welcome to the Village Town Hall</h2>
        <p>...explore threads by topic or start your own!</p>
      </div>
      <div className='TownHall'>
        <h3>All forums...</h3>
        {error ? (
          <p>{error}</p>
        ) : (
          <ul className="TownHallPosts">
            {threads.map((thread, index) => (
              <li key={thread.topic}>
                <Link to={`/threads/${encodeURIComponent(thread.topic)}`}>
                  {thread.topic}
                </Link>
              </li>
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
