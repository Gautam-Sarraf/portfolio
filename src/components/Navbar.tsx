import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Compass, Cpu, Volume2, VolumeX, ShieldAlert, Radio } from 'lucide-react';
import { spaceAudio } from '../utils/audio';

interface NavbarProps {
  mode: string;
  setMode: (mode: string) => void;
  audioMuted: boolean;
  toggleAudio: () => void;
}

const navItems = [
  { id: 'intro', label: 'ABOUT', index: '01' },
  { id: 'skills', label: 'SKILLS', index: '02' },
  { id: 'missions', label: 'PROJECTS', index: '03' },
  { id: 'timeline', label: 'EXPERIENCE', index: '04' },
  { id: 'contact', label: 'CONTACT', index: '05' },
];

const Navbar: React.FC<NavbarProps> = ({ mode, setMode, audioMuted, toggleAudio }) => {
  const [latency, setLatency] = useState(14);
  const [menuOpen, setMenuOpen] = useState(false);

  // Simulate network latency fluctuations for cockpit realism
  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(Math.floor(Math.random() * 8) + 10);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleTabChange = (targetMode: string) => {
    if (targetMode === 'timeline') {
      spaceAudio.playWarp();
    } else {
      spaceAudio.playClick();
    }
    setMode(targetMode);
    setMenuOpen(false);
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        height: 64,
        background: 'linear-gradient(to bottom, rgba(2, 2, 5, 0.95) 0%, rgba(2, 2, 5, 0.4) 100%)',
        borderBottom: '1px solid rgba(var(--cyber-cyan-rgb), 0.15)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        fontFamily: 'var(--font-mono)',
      }}
    >
      {/* HUD left: Diagnostics */}
      <div
        style={{ display: 'flex', alignItems: 'center', gap: 16 }}
        className="hidden lg:flex"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Cpu size={14} className="text-cyan-400 animate-pulse" />
          <span style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: '1px' }}>
            SYSTEM:<span className="text-cyan-400 ml-1">PORTFOLIO v4.0</span>
          </span>
        </div>
        <div style={{ width: 1, height: 12, background: 'rgba(255,255,255,0.1)' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Radio size={12} className="text-green-400" />
          <span style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: '1px' }}>
            NET:<span className="text-green-400 ml-1">STABLE</span>
          </span>
        </div>
      </div>

      {/* Main Tabs (Center Navigation Cockpit) */}
      <div
        className="hidden md:flex"
        style={{
          display: 'flex',
          gap: 6,
          background: 'rgba(3, 4, 15, 0.8)',
          border: '1px solid rgba(var(--cyber-cyan-rgb), 0.15)',
          borderRadius: 8,
          padding: '4px',
        }}
      >
        {navItems.map((item) => {
          const isActive = mode === item.id;
          return (
            <motion.button
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              onMouseEnter={() => spaceAudio.playHover()}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '6px 14px',
                borderRadius: 6,
                border: 'none',
                cursor: 'none',
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '2px',
                color: isActive ? '#000' : 'var(--text-primary)',
                background: isActive
                  ? 'linear-gradient(135deg, var(--cyber-cyan), var(--cyber-green))'
                  : 'transparent',
                boxShadow: isActive ? '0 0 15px rgba(var(--cyber-cyan-rgb), 0.3)' : 'none',
                transition: 'color 0.2s, background 0.2s',
              }}
            >
              <span style={{ opacity: isActive ? 0.8 : 0.4, fontSize: 8 }}>{item.index}</span>
              {item.label}
            </motion.button>
          );
        })}
      </div>

      {/* Mobile Title */}
      <div className="flex md:hidden items-center gap-2">
        <Compass className="text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} size={16} />
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 12, fontWeight: 900, color: 'var(--cyber-cyan)', letterSpacing: '2px' }}>
          GAUTAM // PORTFOLIO
        </span>
      </div>

      {/* HUD right: Latency, audio controls, hamburger */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }} className="hidden sm:flex">
          <Activity size={12} className="text-cyan-400" />
          <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>
            LATENCY:<span className="text-cyan-400 ml-1">{latency}ms</span>
          </span>
        </div>
        <div style={{ width: 1, height: 12, background: 'rgba(255,255,255,0.1)' }} className="hidden sm:block" />

        {/* Audio Speaker HUD toggle */}
        <button
          onClick={toggleAudio}
          onMouseEnter={() => spaceAudio.playHover()}
          style={{
            background: 'none',
            border: 'none',
            color: audioMuted ? 'var(--cyber-orange)' : 'var(--cyber-cyan)',
            cursor: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 9,
            padding: 6,
          }}
        >
          {audioMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          <span className="hidden md:inline" style={{ letterSpacing: '1px' }}>
            {audioMuted ? 'SOUND OFF' : 'SOUND ON'}
          </span>
        </button>

        {/* Mobile menu Hamburger */}
        <button
          onClick={() => { spaceAudio.playClick(); setMenuOpen(!menuOpen); }}
          className="md:hidden flex items-center justify-center p-2 rounded"
          style={{
            border: '1px solid rgba(var(--cyber-cyan-rgb), 0.3)',
            background: 'rgba(3, 4, 15, 0.6)',
            color: 'var(--cyber-cyan)',
          }}
        >
          <Compass size={16} />
        </button>
      </div>

      {/* Holographic Navigation panel overlay for mobile */}
      {menuOpen && (
        <div
          style={{
            position: 'absolute',
            top: 64,
            left: 0,
            right: 0,
            background: 'rgba(2, 2, 5, 0.98)',
            borderBottom: '1px solid rgba(var(--cyber-cyan-rgb), 0.3)',
            padding: 16,
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            backdropFilter: 'blur(20px)',
          }}
          className="md:hidden"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8, padding: '0 8px' }}>
            <ShieldAlert size={12} className="text-orange-400" />
            <span style={{ fontSize: 9, color: 'var(--cyber-orange)', letterSpacing: '1px' }}>
              NAVIGATION MENU
            </span>
          </div>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              style={{
                width: '100%',
                padding: '12px',
                textAlign: 'left',
                borderRadius: 6,
                border: 'none',
                background: mode === item.id ? 'linear-gradient(135deg, rgba(var(--cyber-cyan-rgb), 0.2), rgba(var(--cyber-green-rgb), 0.1))' : 'rgba(255,255,255,0.02)',
                color: mode === item.id ? 'var(--cyber-cyan)' : 'var(--text-primary)',
                fontSize: 10,
                letterSpacing: '2px',
                fontWeight: 700,
                borderLeft: mode === item.id ? '3px solid var(--cyber-cyan)' : 'none',
              }}
            >
              [{item.index}] {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};

export default Navbar;