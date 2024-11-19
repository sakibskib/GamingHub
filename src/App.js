import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import PostDetail from './pages/PostDetail';
import CreatePost from './pages/CreatePost';
import './App.css';

function App() {
  const [theme, setTheme] = useState('dark');

const toggleTheme = () => {
  setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
};
  return (
    <div className={theme}>
    <button onClick={toggleTheme}>
      Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
    </button>
    <Router>
    <div className="app-container">
        {/* Home Button */}
        <div className="navigation">
          <Link to="/">
            <button className="home-button">Home</button>
          </Link>
        </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/create" element={<CreatePost />} />
      </Routes>
    </div>
    </Router>
    </div>
  );
}

export default App;
