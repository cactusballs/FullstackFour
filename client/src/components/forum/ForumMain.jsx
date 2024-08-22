/*import React, { useState, useEffect } from 'react';
import './ForumMain.css'; // Assuming this is your existing CSS file
import ForumSubmissionForm from './ForumSubmissionForm.jsx';
import NavbarComp from '../navbar/Navbar.jsx';
import { Link } from 'react-router-dom';

const ForumMain = () => {
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
        setThreads(data);
      })
      .catch(error => {
        console.error('Error fetching threads:', error);
        setError('Failed to fetch threads');
      });
  }, []);

  return (
    <>
      <NavbarComp />
      <div className="AllForums">
        <div className='header'>
          <h2>All forums...</h2>
          {error ? (
            <p>{error}</p>
          ) : (
            <ul className="TownHallPosts">
              {threads.map((thread, index) => (
                <li key={index}>
                  <Link to={`/threads/${encodeURIComponent(thread.topic)}`}>
                    {thread.topic}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className='TopPicks'>
          <h2>Start a thread...</h2>
          <ForumSubmissionForm />
        </div>
      </div>
    </>
  );
}

export default ForumMain;*/


import React, { useState, useEffect } from 'react';
import './ForumMain.css';
import ForumSubmissionForm from './ForumSubmissionForm.jsx';
import NavbarComp from '../navbar/Navbar.jsx';
import { Link } from 'react-router-dom';

const ForumMain = ({handleSubmit}) => {
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
    <>
     <NavbarComp/>
    <div className="AllForums">
     
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
        
    
        <ForumSubmissionForm onSubmit={handleSubmit} threads={threads} />
          <ul>
            {threads.map(thread => (
              <li key={thread.thread_id}>
                <h2>{thread.title}</h2>
                <p>{thread.description}</p>
                <p><strong>Topic:</strong> {thread.topic}</p>
                {/*add time too?? */}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default ForumMain;
