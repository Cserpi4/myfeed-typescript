// src/features/subreddit/Subreddit.jsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSubreddits } from './subredditSlice';
import './Subreddit.css';

const Subreddit = ({ onSelect }) => {
  const dispatch = useDispatch();
  const subreddits = useSelector(state => state.subreddit.subreddits);
  const status = useSelector(state => state.subreddit.status);
  const error = useSelector(state => state.subreddit.error);

  useEffect(() => {
    dispatch(fetchSubreddits());
  }, [dispatch]);

  if (status === 'loading') {
    return <div className="subreddit-loading">Loading subreddits...</div>;
  }

  if (status === 'failed') {
    return <div className="subreddit-error">Error: {error}</div>;
  }

  return (
    <div className="subreddit-list">
      {subreddits.length === 0 && <p>No subreddits found.</p>}
      {subreddits.map(sub => (
        <button
          key={sub.id}
          className="subreddit-item"
          onClick={() => onSelect(sub.display_name)}
          aria-label={`Select subreddit ${sub.display_name}`}
        >
          {sub.display_name_prefixed}
        </button>
      ))}
    </div>
  );
};

export default Subreddit;
