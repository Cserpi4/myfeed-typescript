import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchSubreddits,
  setActiveSubredditId,
  fetchPostsBySubreddit,
} from './subredditSlice';
import './Subreddit.css';

const Subreddit = () => {
  const dispatch = useDispatch();

  const { subreddits, loading, error, activeSubredditId } = useSelector(
    (state) => state.subreddits
  );

  useEffect(() => {
    dispatch(fetchSubreddits());
  }, [dispatch]);

  const handleSubredditClick = (id) => {
    dispatch(setActiveSubredditId(id));
    if (id === 'popular') {
      // Itt ha van külön getPopular thunkod az első slice-ból, azt is megfuttathatod
    } else {
      dispatch(fetchPostsBySubreddit(id));
    }
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
          activeSubredditId === 'popular' || !activeSubredditId ? 'active' : ''
        }`}
      >
        Popular Subreddits
      </h3>

      <ul>
        {subreddits.map((sub) => (
          <li
            key={sub.id}
            className={`subreddit-item ${
              activeSubredditId === sub.id ? 'active' : ''
            }`}
            onClick={() => handleSubredditClick(sub.id)}
          >
            <img
              src={sub.icon_img || 'https://www.redditinc.com/assets/images/site/reddit-logo.png'}
              alt={sub.display_name}
              className="subreddit-avatar"
            />
            {/* display_name_prefixed helyett display_name-et írunk ki */}
            <span>c/{sub.display_name}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Subreddit;