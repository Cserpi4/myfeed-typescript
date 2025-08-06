import React, { useEffect, useState } from 'react';
import { fetchPosts } from '../../api/redditAPI';
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
      {posts.length === 0 ? (
        <p>Loading posts...</p>
      ) : (
        <ul>
          {posts.map(post => (
            <li key={post.id} className="post-item">
              <h3>{post.title}</h3>
              {post.selftext && <ReactMarkdown>{post.selftext}</ReactMarkdown>}
              <a href={`https://reddit.com${post.permalink}`} target="_blank" rel="noopener noreferrer">
                View on Reddit
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
