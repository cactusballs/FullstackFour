import "./RecentForumPosts.css";
import React from "react";
import { useState, useEffect } from "react";
import './RecentForumPosts.css';

const RecentForumPosts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('http://localhost:3001/recentPosts');
                const data = await response.json();
                setPosts(data);
            } catch (error) {
                console.error('Error fetching recent posts:', error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className="recent-posts">
            <h2>Recent Forum Posts</h2>
            <ul>
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <li key={post.id}>
                            <h3>{post.title}</h3>
                            <p>{post.excerpt}</p>
                            <small>Posted by {post.author} on {new Date(post.date).toLocaleDateString()}</small>
                        </li>
                    ))
                ) : (
                    <li>No recent posts available.</li>
                )}
            </ul>
        </div>
    );
};

export default RecentForumPosts;

