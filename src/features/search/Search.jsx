import React from 'react';
import { useSelector } from 'react-redux';
import Card from '../../components/Card';
import './Search.css';

const Search = () => {
  const { results, loading, error, query } = useSelector(
    (state) => state.search
  );

  if (loading) {
    return <p className="loading">Searching for "{query}"...</p>;
  }

  if (error) {
    return <p className="error">Error: {error}</p>;
  }

  if (!query) {
    return null;
  }

  return (
    <div className="search-container">
      <h2>Search results for "{query}"</h2>

      {results.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <div className="posts-list">
          {results.map((post) => (
            <Card key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
