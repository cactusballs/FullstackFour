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
      id: Date.now(), // Consider using a more robust ID generator if needed
      threadId: threadId, 
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
          aria-label="Write your reply" // Accessibility improvement
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit" disabled={!replyContent.trim()}>Submit Reply</button> {/* Disabled when input is empty */}
      </form>
    </div>
  );
};

export default ThreadReply;
