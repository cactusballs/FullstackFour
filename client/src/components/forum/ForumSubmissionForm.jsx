import React, { useState } from 'react';
import axios from 'axios';
import './ForumSubmissionForm.css';

const ForumSubmissionForm = () => {
  const [threadTitle, setThreadTitle] = useState('');
  const [content, setContent] = useState('');
  const [topic, setTopic] = useState('');
  const [tags, setTags] = useState({
    carersTag: false,
    expectingParentsTag: false,
    newParentsTag: false,
    singleParentsTag: false,
    lgbtqiaPlusParentsTag: false,
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newThread = {
      thread_title: threadTitle,
      content,
      topic,
      user_name: 'FA', // Replace with actual user data if available
      ...tags,
    };

    try {
      const res = await axios.post('http://localhost:3000/threads/create', newThread);
      if (res.status === 201) {
        setSuccess('Thread created successfully!');
        setTimeout(() => {
          setSuccess('');
          // Add any additional logic for successful submission
        }, 3000);
      }
    } catch (err) {
      console.error('Error creating thread:', err);
      setError('An error occurred while creating the thread');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleTagChange = (e) => {
    setTags({
      ...tags,
      [e.target.name]: e.target.checked,
    });
  };

  return (
    <div className="container mt-5">
      <h2>Create a New Forum Topic</h2>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="form-group">
          <label htmlFor="threadTitle">Title</label>
          <input
            type="text"
            id="threadTitle"
            name="threadTitle"
            className="form-control"
            placeholder="Enter the title of your thread"
            value={threadTitle}
            onChange={(e) => setThreadTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group mt-3">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            className="form-control"
            rows="4"
            placeholder="Write your content here"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        <div className="form-group mt-3">
          <label htmlFor="topic">Topic</label>
          <select
            id="topic"
            name="topic"
            className="form-control"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            required
          >
            <option value="">Select a topic</option>
            <option value="Mind, body and soul">Mind, body and soul</option>
            <option value="Being a parent">Being a parent</option>
            <option value="Becoming a parent">Becoming a parent</option>
            <option value="Sleep">Sleep</option>
            <option value="SEND">SEND</option>
            <option value="Childcare">Childcare</option>
            <option value="Charities">Charities</option>
            <option value="Education">Education</option>
          </select>
        </div>

        <div className="form-group mt-3">
          <label>Tags</label>
          <div className="form-check">
            <input
              type="checkbox"
              id="carersTag"
              name="carersTag"
              className="form-check-input"
              checked={tags.carersTag}
              onChange={handleTagChange}
            />
            <label className="form-check-label" htmlFor="carersTag">Carers Tag</label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              id="expectingParentsTag"
              name="expectingParentsTag"
              className="form-check-input"
              checked={tags.expectingParentsTag}
              onChange={handleTagChange}
            />
            <label className="form-check-label" htmlFor="expectingParentsTag">Expecting Parents Tag</label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              id="newParentsTag"
              name="newParentsTag"
              className="form-check-input"
              checked={tags.newParentsTag}
              onChange={handleTagChange}
            />
            <label className="form-check-label" htmlFor="newParentsTag">New Parents Tag</label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              id="singleParentsTag"
              name="singleParentsTag"
              className="form-check-input"
              checked={tags.singleParentsTag}
              onChange={handleTagChange}
            />
            <label className="form-check-label" htmlFor="singleParentsTag">Single Parents Tag</label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              id="lgbtqiaPlusParentsTag"
              name="lgbtqiaPlusParentsTag"
              className="form-check-input"
              checked={tags.lgbtqiaPlusParentsTag}
              onChange={handleTagChange}
            />
            <label className="form-check-label" htmlFor="lgbtqiaPlusParentsTag">LGBTQIA+ Parents Tag</label>
          </div>
        </div>

        {error && <div className="alert alert-danger mt-3">{error}</div>}
        {success && <div className="alert alert-success mt-3">{success}</div>}

        <button type="submit" className="btn btn-primary mt-4">Submit Thread</button>
      </form>
    </div>
  );
};

export default ForumSubmissionForm;
