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
    
    const user_name = localStorage.getItem('user_name') || 'FA';
    if (replyContent.trim() === '') {
      setError('Reply cannot be empty');
      return;
    }


    const newReply = {
      id: Date.now(), 
      threadId: threadId,
      content: replyContent,
      author: user_name,
    };

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
          aria-label="Write your reply" 
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit" disabled={!replyContent.trim()}>Submit Reply</button>       </form>
    </div>
  );
};

export default ThreadReply;
