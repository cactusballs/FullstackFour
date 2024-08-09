import React, { useState, useEffect } from "react";
import "./SingleThread.css";


const SingleThread = ({id}) => {
  const [threads, setThreads] = useState([]);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  //get thread title and initial post
  useEffect(() => {
    fetch(`http://localhost:3000/threads/threadheader/?thread_id=${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response not ok");
        }
        return response.json();
      })
      .then((data) => {
        setThreads(data);
        console.log("this is the thread object", data);
      })
      .catch((error) => {
        console.error("Error fetching threads:", error);
        setError("Failed to fetch threads");
      });
  }, [id]);

  //get post responses
  useEffect(() => {
    fetch(`http://localhost:3000/threads/threadheader/posts?thread_id=${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response not ok");
        }
        return response.json();
      })
      .then((data) => {
        setPosts(data);
        console.log("this is the posts object", data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setError("Failed to fetch posts");
      });
  }, [id]);

  let threadsArr = threads[0];


  return (
    <>
      <div className="titleContainer">
        {threads.length > 0 ? (
          <>
            <div>
              <p>{threadsArr.thread_title}</p>
              <p> user: {threadsArr.user_name}</p>
            </div>

            <div className="container-2">
              <p>{threadsArr.content}</p>
              <p> {new Date(threadsArr.sent_at).toLocaleString()}</p>

              <p>{posts.content}</p>
            </div>
          </>
        ) : (
          <p>Loading conversation</p>
        )}
      </div>

      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.post_id} className="postItem">
            <p>{post.content}</p>
            <p className="postInfo">
              User: {post.user_name} @ {new Date(post.sent_at).toLocaleString()}
            </p>
          </div>
        ))
      ) : (
        <p>No posts found for this thread.</p>
      )}
    </>
  );
};

export default SingleThread;
