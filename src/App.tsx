import React from 'react';
import { useEffect,useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import './App.css';

function App() {
  const [showGameOverlay, setShowGameOverlay] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [crewmatePos, setCrewmatePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCrewmatePos((prev) => ({
        x: prev.x + (mousePos.x - prev.x - 40) * 0.1,
        y: prev.y + (mousePos.y - prev.y - 40) * 0.1,
      }));
    }, 16);

    return () => clearInterval(interval);
  }, [mousePos]);

  return (
    <div className="App">
      <Navbar />
      <main className="main-content">
        <Home />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
      
      {/* Game Corner */}
      <div className="game-corner">
        <button
          onClick={() => setShowGameOverlay(true)}
          className="game-link"
        >
          <span className="game-text">Bored? Play this game!</span>
          <span className="game-icon">🎮</span>
        </button>
      </div>
      
      {/* Game Overlay */}
      {showGameOverlay && (
        <div className="game-overlay">
          <div className="game-window">
            <div className="game-header">
              <span className="game-title">🎮 ROCK PAPER SCISSORS</span>
              <button 
                className="close-button"
                onClick={() => setShowGameOverlay(false)}
              >
                ✕
              </button>
            </div>
            <iframe
              src="https://gautam-sarraf.github.io/rock-paper-scissor/"
              className="game-iframe"
              title="Rock Paper Scissors Game"
            />
          </div>
        </div>
      )}
      <img
        src="/amongus.png"
        alt="Among Us"
        className="crewmate"
        style={{
          left: `${crewmatePos.x}px`,
          top: `${crewmatePos.y}px`,
        }}
      />
    </div>
  );
}

export default App;