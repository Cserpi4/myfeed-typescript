import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchTerm } from './headerSlice';
import { useNavigate } from 'react-router-dom';
import { search } from '../../api/redditApi';
import './Header.css';

const Header = ({ onToggleTheme, currentTheme }) => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.header.searchTerm);
  const navigate = useNavigate();

  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchTerm.trim().length < 3) {
        setSuggestions([]);
        return;
      }

      try {
        setLoading(true);
        const results = await search(searchTerm, 6);
        setSuggestions(results.slice(0, 6));
      } catch (err) {
        console.error('Search suggestions failed:', err);
      } finally {
        setLoading(false);
      }
    };

    const timeout = setTimeout(fetchSuggestions, 400); // kis debounce
    return () => clearTimeout(timeout);
  }, [searchTerm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = searchTerm.trim();
    if (query) {
      navigate(`/search/${encodeURIComponent(query)}`);
      setShowSuggestions(false);
    }
  };

  const handleSelectSuggestion = (text) => {
    dispatch(setSearchTerm(text));
    navigate(`/search/${encodeURIComponent(text)}`);
    setShowSuggestions(false);
  };

  return (
    <header className="header-container">
      <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
        MyReddit
      </div>

      <div className="header-right">
        <div className="search-wrapper">
          <form className="search-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search Reddit..."
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
              {!loading && suggestions.length === 0 && (
                <li className="no-results">No results</li>
              )}
              {!loading &&
                suggestions.map((s) => (
                  <li
                    key={s.id}
                    onClick={() =>
                      handleSelectSuggestion(s.display_name_prefixed || s.title || searchTerm)
                    }
                    className="suggestion-item"
                  >
                    {s.display_name_prefixed || s.title}
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
