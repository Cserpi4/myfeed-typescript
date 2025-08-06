import React from 'react';
import Header from './features/header/Header';
import Home from './features/home/Home';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Home />
      </main>
    </div>
  );
}

export default App;
