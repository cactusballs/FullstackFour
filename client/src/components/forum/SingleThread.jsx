import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./SingleThread.css";
import NavbarComp from "../navbar/Navbar";
import Footer from "../footer/Footer";
import BackButton from "./BackButton";
import ThreadReply from "./ThreadReply"; // Import ThreadReply component

const SingleThread = () => {
  const { id } = useParams();
  const [thread, setThread] = useState(null);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  // Get thread title and initial post
  useEffect(() => {
    fetch(`http://localhost:3000/threads/threadheader?thread_id=${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch thread.");
        }
        return response.json();
      })
      .then((data) => {
        if (data.length > 0) {
          setThread(data[0]);
        } else {
          setError("Thread not found.");
        }
      })
      .catch((error) => {
        console.error("Error fetching thread:", error);
        setError("Failed to fetch thread.");
      });
  }, [id]);

  // Get posts (responses) to thread
  useEffect(() => {
    fetch(`http://localhost:3000/threads/threadheader?thread_id=${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.length > 0) {
          setThread(data[0]);
        } else {
          setError("No thread found");
        }
      })
      .catch((error) => {
        console.error("Error fetching threads:", error);
        setError("Failed to fetch threads");
      });
  }, [id]);
  

  const handleReplySubmit = (newReply) => {
    // Update the posts state with the new reply
    setPosts((prevPosts) => [...prevPosts, newReply]);
  };

  return (
    <>
      <div className="threadContainer">
        <NavbarComp />
        {console.log("Current thread ID:", id)}
        {thread ? (
          <>
            {/* post initial thread information */}
            <h3>Join the conversation</h3>
            <div className="threadStart">
              <p className="threadTitle">{thread.thread_title}</p>
              <p className="mainQuestion">{thread.content}</p>
              <p className="postInfo">
                {thread.user_name} @{" "}
                {new Date(thread.sent_at).toLocaleString()}
              </p>
            </div>
          </>
        ) : (
          <p>{error}</p>
        )}

        {/* Display reply/replies to the question */}
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.post_id} className="postItem">
              <p>{post.content}</p>
              <p className="postInfo">
                Reply from {post.user_name} @{" "}
                {new Date(post.sent_at).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p>No posts found for this thread.</p>
        )}

        {/* Render the ThreadReply component to allow new replies */}
        <ThreadReply threadId={id} onReplySubmit={handleReplySubmit} />
      </div>
      <BackButton />
      <Footer />
    </>
  );
};

export default SingleThread;
