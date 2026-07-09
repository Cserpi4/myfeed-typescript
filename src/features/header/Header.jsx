import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchTerm } from './headerSlice';
import { fetchSearchResults, clearResults } from '../search/searchSlice';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = ({ onToggleTheme, currentTheme }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchTerm = useSelector((state) => state.header.searchTerm);
  const { results, loading } = useSelector((state) => state.search);

  const [showSuggestions, setShowSuggestions] = useState(false);

  // 🔍 debounce + Redux search
  useEffect(() => {
    if (searchTerm.trim().length < 3) {
      dispatch(clearResults());
      return;
    }

    const timeout = setTimeout(() => {
      dispatch(fetchSearchResults(searchTerm));
    }, 400);

    return () => clearTimeout(timeout);
  }, [dispatch, searchTerm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = searchTerm.trim();

    if (!query) return;

    navigate(`/search/${encodeURIComponent(query)}`);
    setShowSuggestions(false);
  };

  const handleSelectSuggestion = (text) => {
    dispatch(setSearchTerm(text));
    navigate(`/search/${encodeURIComponent(text)}`);
    setShowSuggestions(false);
  };

  return (
    <header className="header-container">
      <div
        className="logo"
        onClick={() => navigate('/')}
        style={{ cursor: 'pointer' }}
      >
        MyFeed
      </div>

      <div className="header-right">
        <div className="search-wrapper">
          <form className="search-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => {
                dispatch(setSearchTerm(e.target.value));
                setShowSuggestions(true);
              }}
              className="search-input"
            />
            <button type="submit" className="search-button">
              Search
            </button>
          </form>

          {showSuggestions && searchTerm.trim().length >= 3 && (
            <ul className="search-suggestions">
              {loading && <li className="loading">Loading...</li>}

              {!loading && results.length === 0 && (
                <li className="no-results">No results</li>
              )}

              {!loading &&
                results.slice(0, 6).map((item) => (
                  <li
                    key={item.id}
                    className="suggestion-item"
                    onClick={() =>
                      handleSelectSuggestion(
                        item.display_name_prefixed || item.title
                      )
                    }
                  >
                    {item.display_name_prefixed || item.title}
                  </li>
                ))}
            </ul>
          )}
        </div>

        <button
          className="theme-toggle"
          onClick={onToggleTheme}
          aria-label="Toggle theme"
        >
          <span className="theme-emoji">
            {currentTheme === 'light' ? '🌙' : '☀️'}
          </span>
          <span className="theme-label">
            {currentTheme === 'light' ? 'Light' : 'Dark'}
          </span>
        </button>
      </div>
    </header>
  );
};

export default Header;