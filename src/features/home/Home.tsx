import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from './homeSlice';
import { RootState } from '../../store/rootReducer';
import Card from '../../components/Card';
import './Home.css';

const Home = () => {
  const dispatch = useDispatch();

  const posts = useSelector((state: RootState) => state.home.posts);
  const loading = useSelector((state: RootState) => state.home.loading);
  const error = useSelector((state: RootState) => state.home.error);

  const activeSubreddit = useSelector(
    (state: RootState) => state.subreddits?.activeSubreddit
  );

  const searchTerm = useSelector(
    (state: RootState) => state.header?.searchTerm
  );

  useEffect(() => {
    dispatch(
      fetchPosts({
        subreddit: activeSubreddit || 'popular',
        searchTerm: searchTerm || '',
      }) as any
    );
  }, [dispatch, activeSubreddit, searchTerm]);

  if (error) {
    return <div className="error">Error loading posts: {error}</div>;
  }

  return (
    <div className="home-container">
      <h2>
        {searchTerm
          ? `Search results for "${searchTerm}"`
          : activeSubreddit && activeSubreddit !== 'popular'
          ? `r/${activeSubreddit}`
          : 'Popular posts'}
      </h2>

      <div className="posts-list">
        {loading &&
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="skeleton-card" />
          ))}

        {!loading && posts.length === 0 && <div>No posts found.</div>}

        {!loading &&
          posts.map((post) => <Card key={post.id} post={post} />)}
      </div>
    </div>
  );
};

export default Home;