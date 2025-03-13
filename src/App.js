import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

function Home() {
  return (
    <div>
      <h2>Home</h2>
      <p>Welcome to the Home page!</p>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
      <p>This is the About page.</p>
    </div>
  );
}

function Contact() {
  return (
    <div>
      <h2>Contact</h2>
      <p>This is the Contact page.</p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="app">
        {/* Header */}
        <header className="header">
          <h1>Darshboard</h1>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </nav>
        </header>

        {/* Main Content */}
        <div className="main-content">
          {/* Sidebar */}
          <aside className="sidebar">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </aside>

          {/* Content Area */}
          <section className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </section>
        </div>
      </div>
    </Router>
  );
}

export default App;