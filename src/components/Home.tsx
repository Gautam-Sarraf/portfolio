import React from 'react';

const Home: React.FC = () => {
  return (
    <section id="home" className="section">
      <div className="home-container">
        <h1 className="home-title">GAUTAM SARRAF</h1>
        <p className="home-subtitle">Full Stack Developer</p>
        <p className="home-location">📍 Birgunj, Nepal</p>
        
        <div className="contact-links">
          <a href="https://leetcode.com/gautam-sarraf" className="contact-link" target="_blank" rel="noopener noreferrer">
            💻
          </a>
          <a href="https://linkedin.com/in/gautam-sarraf" className="contact-link" target="_blank" rel="noopener noreferrer">
            🔗
          </a>
          <a href="https://github.com/gautam-sarraf" className="contact-link" target="_blank" rel="noopener noreferrer">
            🐙
          </a>
        </div>
        
        <div className="insert-coin">
          ♦ PRESS START TO EXPLORE ♦
        </div>
      </div>
    </section>
  );
};

export default Home;