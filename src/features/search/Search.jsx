import React from 'react';
import Card from '../../components/Card';
import './Search.css';

const Search = ({ results, isSearching, error, query }) => {
  if (isSearching) return <p className="loading">Searching for "{query}"...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="search-container">
      <h2>Search results for "{query}"</h2>
      {results?.length === 0 ? (
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
