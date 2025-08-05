// src/features/post/Post.jsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from './postSlice';
import './Post.css';

const Post = ({ subreddit = 'popular' }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts);
  const status = useSelector((state) => state.post.status);
  const error = useSelector((state) => state.post.error);

  useEffect(() => {
    dispatch(fetchPosts(subreddit));
  }, [dispatch, subreddit]);

  if (status === 'loading') {
    return <div className="post-loading">Loading posts...</div>;
  }

  if (status === 'failed') {
    return <div className="post-error">Error: {error}</div>;
  }

  return (
    <div className="post-list">
      {posts.length === 0 && <p>No posts found.</p>}
      {posts.map((post) => (
        <div key={post.id} className="post-card">
          <h3 className="post-title">{post.title}</h3>
          <p className="post-author">Posted by u/{post.author}</p>
          <a
            href={`https://reddit.com${post.permalink}`}
            target="_blank"
            rel="noopener noreferrer"
            className="post-link"
          >
            View on Reddit
          </a>
        </div>
      ))}
    </div>
  );
};

export default Post;
