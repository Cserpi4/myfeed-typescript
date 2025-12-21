import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchPosts, search } from '../../api/redditApi';
import Card from '../../components/Card';
import './Home.css';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { activeSubreddit } = useSelector((state) => state.subreddits);
  const searchTerm = useSelector((state) => state.header.searchTerm);

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        let results;
        if (searchTerm) {
          // 🔍 keresés
          results = await search(searchTerm);
        } else if (activeSubreddit && activeSubreddit !== 'popular') {
          // 📚 adott subreddit posztjai
          results = await fetchPosts(activeSubreddit);
        } else {
          // 🏠 alapértelmezett
          results = await fetchPosts('popular');
        }
        setPosts(results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [searchTerm, activeSubreddit]);

  if (error) return <div className="error">Error loading posts: {error}</div>;

  return (
    <div className="home-container">
      <h2>
        {searchTerm
          ? `Search results for "${searchTerm}"`
          : activeSubreddit && activeSubreddit !== 'popular'
          ? `r/${activeSubreddit}`
          : 'Popular posts'}
      </h2>

      {/* 🔙 Vissza gomb */}
      {searchTerm && (
        <button
          className="back-button"
          onClick={() => window.location.assign('/')}
        >
          ← Back to Popular posts
        </button>
      )}

      {/* ⏳ Betöltés közben skeleton */}
      {loading ? (
        <div className="posts-list">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="skeleton-card"></div>
          ))}
        </div>
      ) : (
        <div className="posts-list">
          {posts.map((post) => (
            <Card key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
