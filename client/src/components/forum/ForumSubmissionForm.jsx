import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import './ForumSubmissionForm.css'
import ForumButton from './ForumButton';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

const ForumSubmission = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [topic, setTopic] = useState('');
  const [tags, setTags] = useState({
    carers_tag: 'N',
    expecting_parents_tag: 'N',
    new_parents_tag: 'N',
    single_parents_tag: 'N',
    LGBTQIA_plus_parents_tag: 'N',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  // const navigate = useNavigate();

  // Placeholder user data
  const user_name = 'PlaceholderTillLinkLoginUserInfo';

  const handleTagChange = (tag) => {
    setTags({ ...tags, [tag]: tags[tag] === 'N' ? 'Y' : 'N' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content || !topic) {
      setError('All fields are required');
      return;
    }

    const newTopic = {
      title,
      content,
      user_name, // Use placeholder username
      topic,
      ...tags,
    };

    try {
      const res = await axios.post('http://localhost:3000/api/forum', newTopic);
      if (res.status === 201) {
        setSuccess('Sent to the village!');
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    } catch (err) {
      setError('An error occurred while creating the topic');
    }
  };
 //charactercount 100 more than reddit
  const updateCharCount = (input) => {
    document.getElementById('charCount').textContent = input.value.length;
  };

  return (
    <div className="container">
      {/* <div className="header">
        <h1>Create a New Forum Topic</h1>
      </div> */}
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
            onInput={(e) => updateCharCount(e.target)}
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
            {['Carers', 'Expecting Parents', 'New Parents', 'Single Parents', 'LGBTQIA_plus_parents_tags'].map(tag => (
              <label key={tag}>
                <input
                  type="checkbox"
                  checked={tags[tag] === 'Y'}
                  onChange={() => handleTagChange(tag)}
                />
                {tag.replace(/_/g, ' ')}
              </label>
            ))}
          </div>
        </div>
        <ForumButton onClick={handleSubmit}>
          Submit Thread
        </ForumButton>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
      </form>
    </div>
  );
};

export default ForumSubmission;
