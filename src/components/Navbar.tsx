import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Home, User, Code2, Briefcase, Trophy, Mail, Menu, X } from 'lucide-react';

const navItems = [
  { id: 'home', label: 'HOME', icon: Home },
  { id: 'about', label: 'ABOUT', icon: User },
  { id: 'skills', label: 'SKILLS', icon: Code2 },
  { id: 'experience', label: 'EXP', icon: Briefcase },
  { id: 'projects', label: 'PROJECTS', icon: Terminal },
  { id: 'achievements', label: 'STATS', icon: Trophy },
  { id: 'contact', label: 'CONTACT', icon: Mail },
];

const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Active section detection
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPos = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPos) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMenuOpen(false);
  };

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        className="scroll-progress"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: 3,
          background: 'linear-gradient(90deg, var(--cyber-cyan), var(--cyber-green), var(--cyber-pink))',
          zIndex: 10000,
          transformOrigin: 'left',
          scaleX: 0,
          width: '100%',
        }}
        animate={{ scaleX: 0 }}
        transition={{ duration: 0 }}
        id="scroll-progress-bar"
      />

      {/* Desktop Navbar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5, type: 'spring' }}
        style={{
          position: 'fixed',
          top: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          padding: '10px 16px',
          background: scrolled ? 'rgba(5, 5, 16, 0.95)' : 'rgba(5, 5, 16, 0.7)',
          border: '1px solid rgba(0, 212, 255, 0.3)',
          borderRadius: '50px',
          backdropFilter: 'blur(20px)',
          boxShadow: scrolled ? '0 0 30px rgba(0, 212, 255, 0.15), 0 8px 32px rgba(0, 0, 0, 0.6)' : '0 4px 16px rgba(0,0,0,0.4)',
          transition: 'all 0.3s ease',
          maxWidth: '95vw',
        }}
      >
        {/* Logo */}
        <button
          onClick={() => scrollTo('home')}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '12px',
            fontWeight: 900,
            color: 'var(--cyber-cyan)',
            background: 'none',
            border: 'none',
            cursor: 'none',
            letterSpacing: '2px',
            marginRight: '12px',
            textShadow: '0 0 10px var(--cyber-cyan)',
            padding: '6px 10px',
            whiteSpace: 'nowrap',
          }}
        >
          GS://
        </button>

        {/* Divider */}
        <div style={{ width: 1, height: 20, background: 'rgba(0, 212, 255, 0.3)', marginRight: '8px' }} />

        {/* Nav links - desktop */}
        <div className="nav-links-desktop" style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <motion.button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '7px 13px',
                  borderRadius: '30px',
                  border: 'none',
                  cursor: 'none',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  letterSpacing: '1px',
                  color: isActive ? '#000' : 'rgba(200, 220, 255, 0.8)',
                  background: isActive
                    ? 'linear-gradient(135deg, var(--cyber-cyan), var(--cyber-green))'
                    : 'transparent',
                  boxShadow: isActive ? '0 0 15px rgba(0, 212, 255, 0.4)' : 'none',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap',
                  fontWeight: isActive ? 700 : 400,
                }}
              >
                <Icon size={11} />
                <span className="nav-label">{item.label}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Mobile hamburger */}
        <button
          className="hamburger-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'none',
            color: 'var(--cyber-cyan)',
            padding: '6px',
          }}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              top: 75,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '90vw',
              maxWidth: 400,
              background: 'rgba(5, 5, 16, 0.98)',
              border: '1px solid rgba(0, 212, 255, 0.3)',
              borderRadius: 16,
              padding: 16,
              zIndex: 999,
              backdropFilter: 'blur(20px)',
            }}
          >
            {navItems.map((item, i) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => scrollTo(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    width: '100%',
                    padding: '12px 16px',
                    marginBottom: 6,
                    borderRadius: 10,
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    letterSpacing: '2px',
                    color: isActive ? '#000' : 'var(--text-primary)',
                    background: isActive ? 'linear-gradient(135deg, var(--cyber-cyan), var(--cyber-green))' : 'rgba(255,255,255,0.04)',
                    textAlign: 'left',
                    transition: 'all 0.2s',
                  }}
                >
                  <Icon size={16} />
                  {item.label}
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
        @media (max-width: 900px) {
          .nav-label { display: none; }
        }
      `}</style>
    </>
  );
};

// Scroll progress updater
export const ScrollProgressUpdater: React.FC = () => {
  useEffect(() => {
    const handleScroll = () => {
      const bar = document.getElementById('scroll-progress-bar');
      if (bar) {
        const scrolled = window.scrollY / (document.body.scrollHeight - window.innerHeight);
        bar.style.transform = `scaleX(${Math.min(scrolled, 1)})`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return null;
};

export default Navbar;