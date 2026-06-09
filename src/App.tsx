import React, { useState, useEffect, Component } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar, { ScrollProgressUpdater } from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import InteractiveTerminal from './components/InteractiveTerminal';
import CursorTrail from './components/CursorTrail';
import MatrixRain from './components/MatrixRain';
import AmongUsFollower from './components/AmongUsFollower';

// Error Boundary — catches React crashes so you see an error instead of white screen
class ErrorBoundary extends Component<
  { children: React.ReactNode },
  { hasError: boolean; error: string }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: '' };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error: error.message };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh', background: '#050510', color: '#00d4ff',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'monospace', padding: 24, textAlign: 'center', gap: 16,
        }}>
          <div style={{ fontSize: 48 }}>⚠️</div>
          <div style={{ fontSize: 20, color: '#ff0080' }}>SYSTEM ERROR</div>
          <div style={{ fontSize: 13, color: '#6080a0', maxWidth: 500 }}>{this.state.error}</div>
          <button
            onClick={() => window.location.reload()}
            style={{ padding: '10px 24px', background: '#00d4ff', color: '#000', border: 'none', borderRadius: 6, cursor: 'pointer', fontFamily: 'monospace', fontSize: 13 }}
          >
            REBOOT
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}


// Loading screen
const LoadingScreen: React.FC<{ done: boolean }> = ({ done }) => (
  <AnimatePresence>
    {!done && (
      <motion.div
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          position: 'fixed', inset: 0, zIndex: 99999,
          background: 'var(--bg-primary)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          gap: 24,
        }}
      >
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(24px, 5vw, 48px)',
          fontWeight: 900,
          background: 'linear-gradient(135deg, #fff, var(--cyber-cyan))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          letterSpacing: '-1px',
        }}>
          GS://
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 0.9, delay: i * 0.2 }}
              style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--cyber-cyan)' }}
            />
          ))}
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', letterSpacing: '3px' }}>
          INITIALIZING...
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

// Footer
const Footer: React.FC = () => (
  <footer style={{
    padding: '32px 24px',
    background: 'var(--bg-secondary)',
    borderTop: '1px solid rgba(0,212,255,0.1)',
    textAlign: 'center',
  }}>
    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', letterSpacing: '2px' }}>
      <span style={{ color: 'var(--cyber-cyan)' }}>GAUTAM SARRAF</span> · Built with React + Framer Motion
    </div>
    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(100,120,140,0.5)', marginTop: 8, letterSpacing: '1px' }}>
      © 2026 · All systems operational
    </div>
  </footer>
);

// Command palette (Ctrl+K)
const CommandPalette: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const items = [
    { label: 'Go to Home', action: () => { document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' }); onClose(); } },
    { label: 'Go to About', action: () => { document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); onClose(); } },
    { label: 'Go to Skills', action: () => { document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' }); onClose(); } },
    { label: 'Go to Experience', action: () => { document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' }); onClose(); } },
    { label: 'Go to Projects', action: () => { document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); onClose(); } },
    { label: 'Go to Contact', action: () => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); onClose(); } },
    { label: 'Open GitHub', action: () => { window.open('https://github.com/gautam-sarraf', '_blank'); onClose(); } },
    { label: 'Open LinkedIn', action: () => { window.open('https://linkedin.com/in/gautam-sarraf', '_blank'); onClose(); } },
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(5,5,16,0.85)',
            backdropFilter: 'blur(8px)', zIndex: 9000,
            display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
            paddingTop: '18vh',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            onClick={e => e.stopPropagation()}
            style={{
              width: 'min(520px, 92vw)',
              background: 'rgba(8,8,20,0.98)',
              border: '1px solid rgba(0,212,255,0.3)',
              borderRadius: 14, overflow: 'hidden',
              boxShadow: '0 25px 60px rgba(0,0,0,0.8)',
            }}
          >
            <div style={{ padding: '14px 16px', borderBottom: '1px solid rgba(0,212,255,0.1)', display: 'flex', gap: 10, alignItems: 'center' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--cyber-cyan)' }}>⌘</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', letterSpacing: '2px' }}>COMMAND PALETTE</span>
              <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-muted)', padding: '2px 8px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 4 }}>ESC to close</span>
            </div>
            <div style={{ padding: '8px' }}>
              {items.map((item, i) => (
                <motion.button
                  key={item.label}
                  onClick={item.action}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  whileHover={{ background: 'rgba(0,212,255,0.08)', x: 4 }}
                  style={{
                    width: '100%', padding: '12px 16px',
                    background: 'none', border: 'none',
                    fontFamily: 'var(--font-mono)', fontSize: 12,
                    color: 'var(--text-primary)', textAlign: 'left',
                    borderRadius: 8, cursor: 'none',
                    display: 'flex', alignItems: 'center', gap: 12,
                    letterSpacing: '0.5px',
                  }}
                >
                  <span style={{ color: 'var(--cyber-cyan)', opacity: 0.5 }}>›</span>
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

function App() {
  const [loaded, setLoaded] = useState(false);
  const [matrixActive, setMatrixActive] = useState(false);
  const [commandPalette, setCommandPalette] = useState(false);


  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => setLoaded(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPalette(prev => !prev);
      }
      if (e.key === 'Escape') {
        setCommandPalette(false);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <>
      <LoadingScreen done={loaded} />
      <CursorTrail />
      <MatrixRain active={matrixActive} />
      <ScrollProgressUpdater />
      <CommandPalette open={commandPalette} onClose={() => setCommandPalette(false)} />

      {/* Keyboard shortcut hint */}
      <div style={{
        position: 'fixed', top: 24, right: 24, zIndex: 100,
        fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-muted)',
        letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: 6,
        opacity: loaded ? 0.6 : 0, transition: 'opacity 1s 2s',
      }}>
        <span style={{ padding: '2px 6px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 4 }}>⌘K</span>
        PALETTE
      </div>

      <div id="app-root">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Achievements />
          <Contact />
        </main>
        <Footer />
        <InteractiveTerminal onToggleMatrix={() => setMatrixActive(p => !p)} matrixActive={matrixActive} />
        <AmongUsFollower />
      </div>
    </>
  );
}

const WrappedApp: React.FC = () => (
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);

export default WrappedApp;