import React from 'react';
import Header from './features/header/Header';
import Home from './features/home/Home';
import Subreddit from './features/subreddits/Subreddit'; // 💡 Ezt importáljuk

import './App.css'; // Ha még nincs, itt lesz a layout CSS

function App() {
  return (
    <div className="App">
      <Header />
      <main className="main-layout">
        <Home />
        <Subreddit />
      </main>
    </div>
  );
}

export default App;
