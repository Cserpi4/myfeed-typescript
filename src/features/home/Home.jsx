import React, { useEffect, useState } from 'react';
import { fetchPosts } from '../../api/redditApi';
import Card from '../../components/Card';
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
      <div className="posts-list">
        {posts.map(post => (
          <Card key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Home;
