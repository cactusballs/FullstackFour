import React, { useState } from 'react';
import './ThreadReply.css';

const ThreadReply = ({ threadId, onReplySubmit }) => {
  const [replyContent, setReplyContent] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setReplyContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (replyContent.trim() === '') {
      setError('Reply cannot be empty');
      return;
    }

    const newReply = {
      id: Date.now(), // Unique ID for the reply
      threadId: threadId, // The ID of the thread being replied to
      content: replyContent,
      author: 'Current User', // Replace with actual user data
      timestamp: new Date().toISOString()
    };

    // Call the onReplySubmit function passed from parent
    onReplySubmit(newReply);

    setReplyContent('');
    setError('');
  };

  return (
    <div className="reply-to-thread">
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Write your reply..."
          value={replyContent}
          onChange={handleInputChange}
          rows="4"
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Submit Reply</button>
      </form>
    </div>
  );
};

export default ThreadReply;
