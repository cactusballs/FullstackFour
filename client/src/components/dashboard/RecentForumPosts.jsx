import "./RecentForumPosts.css";
import React, { useState, useEffect } from "react";

const RecentForumPosts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('http://localhost:3000/recentPosts');
                const data = await response.json();
                console.log(data);
                setPosts(data);
            } catch (error) {
                console.error('Error fetching recent posts:', error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className="RecentForumPosts-card">
            <div className="RecentForumPosts-card-header">
                <h2>Recent Forum Posts</h2>
            </div>
            <div className="RecentForumPosts-card-content">
                <ul>
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <li key={post.post_id}>
                                <p>{post.content}</p>
                                <small>Posted on {new Date(post.sent_at).toLocaleDateString()}</small>
                            </li>
                        ))
                    ) : (
                        <li>No recent posts available.</li>
                    )}
                </ul>
            </div>
            <div className="RecentForumPosts-card-footer">
            </div>
        </div>
    );
};

export default RecentForumPosts;

