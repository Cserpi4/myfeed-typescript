import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchSubreddits,
  setActiveSubreddit,
  fetchPostsBySubreddit,
} from './subredditSlice';
import { RootState } from '../../store/rootReducer';
import './Subreddit.css';

const Subreddit = () => {
  const dispatch = useDispatch();

  const { subreddits, loading, error, activeSubreddit } = useSelector(
    (state: RootState) => state.subreddits
  );

  useEffect(() => {
    dispatch(fetchSubreddits() as any);
  }, [dispatch]);

  const handleSubredditClick = (name: string) => {
    dispatch(setActiveSubreddit(name));
    if (name !== 'popular') {
      dispatch(fetchPostsBySubreddit(name) as any);
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
          activeSubreddit === 'popular' || !activeSubreddit ? 'active' : ''
        }`}
      >
        Popular Subreddits
      </h3>

      <ul>
        {subreddits.map((sub) => (
          <li
            key={sub.display_name}
            className={`subreddit-item ${
              activeSubreddit === sub.display_name ? 'active' : ''
            }`}
            onClick={() => handleSubredditClick(sub.display_name)}
          >
            <img
              src={
                sub.icon_img ||
                'https://www.redditinc.com/assets/images/site/reddit-logo.png'
              }
              alt={sub.display_name}
              className="subreddit-avatar"
            />
            <span>c/{sub.display_name}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Subreddit;