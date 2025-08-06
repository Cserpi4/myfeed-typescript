import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubreddits } from './subredditSlice';
import './Subreddit.css';

const Subreddit = () => {
  const dispatch = useDispatch();
  const { subreddits, loading, error } = useSelector((state) => state.subreddits);

  useEffect(() => {
    dispatch(fetchSubreddits());
  }, [dispatch]);

  if (loading) return <p className="loading">Loading subreddits...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <aside className="subreddit-sidebar">
      <h3>Popular Subreddits</h3>
      <ul>
        {subreddits.map((sub) => (
          <li key={sub.id} className="subreddit-item">
            <img
              src={sub.icon_img || 'https://www.redditinc.com/assets/images/site/reddit-logo.png'}
              alt={sub.display_name}
              className="subreddit-avatar"
            />
            <span>{sub.display_name_prefixed}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Subreddit;
