import React, { useEffect, useState } from 'react';
import { fetchPosts } from '../../api/redditApi';
import ReactMarkdown from 'react-markdown';
import './Home.css';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts()
      .then(setPosts)
      .catch(err => setError(err.message));
  }, []);

  if (error) {
    return <div className="error">Error loading posts: {error}</div>;
  }

  return (
    <div className="home-container">
      <h2>Popular posts</h2>
      {posts.length === 0 && <p>Loading posts...</p>}
      <ul className="posts-list">
        {posts.map(post => (
          <li key={post.id} className="post-card">
            <h3 className="post-title">{post.title}</h3>

            {post.preview && post.preview.images && post.preview.images[0] && (
              <img
                className="post-image"
                src={post.preview.images[0].source.url.replace(/&amp;/g, '&')}
                alt={post.title}
              />
            )}

            {post.selftext && (
              <div className="post-content">
                <ReactMarkdown>{post.selftext}</ReactMarkdown>
              </div>
            )}

            <a
              href={`https://reddit.com${post.permalink}`}
              target="_blank"
              rel="noopener noreferrer"
              className="post-link"
            >
              View on Reddit
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
