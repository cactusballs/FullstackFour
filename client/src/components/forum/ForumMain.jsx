/*import React, { useState, useEffect } from 'react';
import './ForumMain.css'; 
import ForumSubmissionForm from './ForumSubmissionForm.jsx';
import NavbarComp from '../navbar/Navbar.jsx';
//import ThreadReply from './ThreadReply.jsx'; // Import the ThreadReply component
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

  const handleReplySubmit = (newReply) => {
    // Update the threads state with the new reply
    setThreads(prevThreads => {
      return prevThreads.map(thread => 
        thread.id === newReply.threadId 
          ? { ...thread, replies: [...(thread.replies || []), newReply] }
          : thread
      );
    });
  };

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
                  <ThreadReply threadId={thread.id} onReplySubmit={handleReplySubmit} />
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
import 'bootstrap/dist/css/bootstrap.min.css';
import './ForumMain.css'; 
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
      <div className="container mt-4">
        <div className="row">
          {/* Topics Column */}
          <div className="col-md-6">
            <div className="card">
              <div className="card-header bg-success text-white">
                <h2>All Topics</h2>
              </div>
              <div className="card-body">
                {error ? (
                  <p>{error}</p>
                ) : (
                  <ul className="list-group">
                    {threads.map((thread, index) => (
                      <li key={index} className="list-group-item">
                        <Link to={`/threads/${encodeURIComponent(thread.topic)}`}>
                          {thread.topic}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          {/* Create New Thread Column */}
          <div className="col-md-6">
            <div className="card">
              <div className="card-header bg-success text-white">
                <h2>Start a New Thread</h2>
              </div>
              <div className="card-body">
                <ForumSubmissionForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForumMain;
