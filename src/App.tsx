import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './features/header/Header';
import Home from './features/home/Home';
import Subreddit from './features/subreddits/Subreddit';
import './App.css';

type Theme = 'light' | 'dark';

function App() {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Router>
      <div className="App">
        <Header onToggleTheme={toggleTheme} currentTheme={theme} />
        <main className="main-layout">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search/:query" element={<Home />} />
            <Route path="/r/:subreddit" element={<Home />} />
          </Routes>
          <Subreddit />
        </main>
      </div>
    </Router>
  );
}

export default App;