import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ForumSubmissionForm.css';
import ForumButton from './ForumButton';

const ForumSubmission = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [topic, setTopic] = useState('');
  const [tags, setTags] = useState({
    carersTag: false,
    expectingParentsTag: false,
    newParentsTag: false,
    singleParentsTag: false,
    lgbtqiaPlusParentsTag: false,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const user_name = 'PlaceholderTillLinkLoginUserInfo';

  const handleTagChange = (e) => {
    setTags({
      ...tags,
      [e.target.name]: e.target.checked,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content || !topic) {
      setError('All fields are required');
      return;
    }

    const newThread = {
      thread_title: title,
      content,
      topic,
      user_name: localStorage.getItem('user_name') || 'FA', //trying to look for user_name in local storage but just using FA as back, only hardcoding works not localStorage.getItem('user_name')
      ...tags,
    };

    try {
      const res = await axios.post('http://localhost:3000/threads/create', newThread);
      if (res.status === 201) {
        setSuccess('Thread created successfully!');
        setTimeout(() => {
          navigate(`/threads/${topic}`);
        }, 3000);
      }
    } catch (err) {
      setError('An error occurred while creating the thread');
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <div className="title">
          <label>Title</label>
          <input
            name="title"
            className="mt-2 w-full h-10 px-3 rounded outline-none border-none shadow-sm"
            type="text"
            maxLength="400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="char-count">
            <span id="charCount">0</span>/400
          </div>
        </div>
        <div className="desc mt-3">
          <label>Content</label>
          <textarea
            name="content"
            className="mt-2 w-full h-24 px-3 py-2 rounded outline-none border-none shadow-sm"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <div className="topic mt-3">
          <label>Topic</label>
          <select
            name="topic"
            className="mt-2 w-full h-10 px-3 rounded outline-none border-none shadow-sm"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          >
            <option value="">Select a topic</option>
            <option value="Becoming a parent">Becoming a parent</option>
            <option value="Being a parent">Being a parent</option>
            <option value="Being a carer">Being a carer</option>
            <option value="Education">Education</option>
            <option value="Childcare">Childcare</option>
            <option value="Sleep">Sleep</option>
            <option value="SEND">SEND</option>
            <option value="Mind, body and soul">Mind, body and soul</option>
            <option value="Charities">Charities</option>
          </select>
        </div>
        <div className="tags mt-3">
          <label>Tags</label>
          <div className="mt-2 flex flex-wrap gap-2">
            <label>
              <input
                type="checkbox"
                name="carersTag"
                checked={tags.carersTag}
                onChange={handleTagChange}
              />
              Carers Tag
            </label>
            <label>
              <input
                type="checkbox"
                name="expectingParentsTag"
                checked={tags.expectingParentsTag}
                onChange={handleTagChange}
              />
              Expecting Parents Tag
            </label>
            <label>
              <input
                type="checkbox"
                name="newParentsTag"
                checked={tags.newParentsTag}
                onChange={handleTagChange}
              />
              New Parents Tag
            </label>
            <label>
              <input
                type="checkbox"
                name="singleParentsTag"
                checked={tags.singleParentsTag}
                onChange={handleTagChange}
              />
              Single Parents Tag
            </label>
            <label>
              <input
                type="checkbox"
                name="lgbtqiaPlusParentsTag"
                checked={tags.lgbtqiaPlusParentsTag}
                onChange={handleTagChange}
              />
              LGBTQIA+ Parents Tag
            </label>
          </div>
        </div>
        <ForumButton onClick={handleSubmit} placeholder="Submit">
          Submit
        </ForumButton>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
      </form>
    </div>
  );
};

export default ForumSubmission;
