import "./RecentForumPosts.css";
import React, { useState, useEffect } from "react";
import { TbMessages } from "react-icons/tb";
import { Link } from "react-router-dom";

const RecentForumPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:3000/recentPosts");
        const data = await response.json();
        console.log(data);
        setPosts(data);
      } catch (error) {
        console.error("Error fetching recent posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="RecentForumPosts-card">
      <div className="RecentForumPosts-card-header">
        <div className="RecentForumPosts-header-container">
          <div className="RecentForumPosts-title">
            <TbMessages className="RecentForumPosts-icon" />
            Recent Forum Posts</div>
        </div>
      </div>
      <div className="RecentForumPosts-card-content">
        <div className="forum-posts-container">
          <ul>
            {posts.length > 0 ? (
              posts.map((post) => (
                <li key={post.thread_id}>
                  <Link
                    to={`/conversation/${post.thread_id}`}
                    className="forum-post-link"
                  >
                    <div className="forum-post-content">
                      <p className="forum-post-title">{post.thread_title}</p>
                      <p className="forum-post-date">
                        Posted on{" "}
                        {new Date(post.latest_post).toLocaleDateString()}
                      </p>
                    </div>
                  </Link>
                </li>
              ))
            ) : (
              <li>No recent posts available.</li>
            )}
          </ul>
        </div>
      </div>
      <div className="RecentForumPosts-card-footer"></div>
    </div>
  );
};

export default RecentForumPosts;
