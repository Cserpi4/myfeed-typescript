// src/features/header/Header.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchTerm } from './headerSlice';
import './Header.css';

const Header = ({ onSearch }) => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.header.searchTerm);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  return (
    <header className="header-container">
      <div className="logo">MyReddit</div>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search Reddit..."
          value={searchTerm}
          onChange={handleChange}
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>
    </header>
  );
};

export default Header;
