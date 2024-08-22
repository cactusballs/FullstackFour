import React, { useState } from 'react';

function ForumSubmissionForm({ onNewThread }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [topic, setTopic] = useState('');
  const [carersTag, setCarersTag] = useState(false);
  const [expectingParentsTag, setExpectingParentsTag] = useState(false);
  const [newParentsTag, setNewParentsTag] = useState(false);
  const [singleParentsTag, setSingleParentsTag] = useState(false);
  const [lgbtqiaPlusParentsTag, setLgbtqiaPlusParentsTag] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      title,
      description: content, // Ensure `description` matches your backend
      topic,
      carers_tag: carersTag,
      expecting_parents_tag: expectingParentsTag,
      new_parents_tag: newParentsTag,
      single_parents_tag: singleParentsTag,
      LGBTQIA_plus_parents_tag: lgbtqiaPlusParentsTag,
    };

    try {
      const response = await fetch('/api/forum', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        const result = await response.json();
        setSuccessMessage('Post created successfully!');
        // Clear form fields
        setTitle('');
        setContent('');
        setTopic('');
        setCarersTag(false);
        setExpectingParentsTag(false);
        setNewParentsTag(false);
        setSingleParentsTag(false);
        setLgbtqiaPlusParentsTag(false);
      } else {
        setErrorMessage('Failed to create post.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrorMessage('An error occurred while submitting the form.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Topic</label>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          required
        />
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={carersTag}
            onChange={(e) => setCarersTag(e.target.checked)}
          />
          Carers Tag
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={expectingParentsTag}
            onChange={(e) => setExpectingParentsTag(e.target.checked)}
          />
          Expecting Parents Tag
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={newParentsTag}
            onChange={(e) => setNewParentsTag(e.target.checked)}
          />
          New Parents Tag
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={singleParentsTag}
            onChange={(e) => setSingleParentsTag(e.target.checked)}
          />
          Single Parents Tag
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={lgbtqiaPlusParentsTag}
            onChange={(e) => setLgbtqiaPlusParentsTag(e.target.checked)}
          />
          LGBTQIA+ Parents Tag
        </label>
      </div>
      <button type="submit">Submit</button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </form>
  );
}

export default ForumSubmissionForm;

/*
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import './ForumSubmissionForm.css'
import ForumButton from './ForumButton';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

//up dated 'N's to 0 and 'Y's to 1
const ForumSubmission = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [topic, setTopic] = useState('');
  const [tags, setTags] = useState({
    carers_tag: 0,
    expecting_parents_tag: 0,
    new_parents_tag: 0,
    single_parents_tag: 0,
    LGBTQIA_plus_parents_tag: 0,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  // const navigate = useNavigate();

  // Placeholder user data
  const user_name = 'PlaceholderTillLinkLoginUserInfo';

  const handleTagChange = (tag) => {
    setTags({ ...tags, [tag]: tags[tag] === 0 ? 1 : 0 });
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
      </div> */ /*}
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
                  checked={tags[tag] === 1}
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

export default ForumSubmission;*/
