// src/features/home/Home.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCategory } from './homeSlice';
import './Home.css';

const Home = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.home.categories);
  const selectedCategory = useSelector((state) => state.home.selectedCategory);

  return (
    <div className="home-container">
      <h2>Choose a category</h2>
      <div className="category-list">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-button ${
              selectedCategory === category ? 'active' : ''
            }`}
            onClick={() => dispatch(setCategory(category))}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="selected-category">
        <p>Selected Category: <strong>{selectedCategory}</strong></p>
      </div>
    </div>
  );
};

export default Home;
