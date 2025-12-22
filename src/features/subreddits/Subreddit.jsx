import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchSubreddits,
  setActiveSubreddit,
} from './subredditSlice';
import './Subreddit.css';

const Subreddit = () => {
  const dispatch = useDispatch();

  const { subreddits, loading, error, activeSubreddit } = useSelector(
    (state) => state.subreddits
  );

  useEffect(() => {
    dispatch(fetchSubreddits());
  }, [dispatch]);

  const handleSubredditClick = (subredditName) => {
    dispatch(setActiveSubreddit(subredditName));
  };

  if (loading) {
    return <p className="loading">Loading subreddits...</p>;
  }

  if (error) {
    return <p className="error">Error: {error}</p>;
  }

  return (
    <aside className="subreddit-sidebar">
      <h3
        onClick={() => handleSubredditClick('popular')}
        className={`subreddit-header ${
          activeSubreddit === 'popular' ? 'active' : ''
        }`}
      >
        Popular Subreddits
      </h3>

      <ul>
        {subreddits.map((sub) => (
          <li
            key={sub.id}
            className={`subreddit-item ${
              activeSubreddit === sub.display_name ? 'active' : ''
            }`}
            onClick={() => handleSubredditClick(sub.display_name)}
          >
            <img
              src={
                sub.icon_img ||
                sub.community_icon?.split('?')[0] ||
                'https://www.redditinc.com/assets/images/site/reddit-logo.png'
              }
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
