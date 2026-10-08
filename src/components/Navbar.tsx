import React, { useState, useEffect } from 'react';
import {
  Activity,
  Compass,
  Volume2,
  VolumeX,
  Download,
  Terminal,
} from 'lucide-react';
import { spaceAudio } from '../utils/audio';

interface NavbarProps {
  mode: string;
  setMode: (mode: string) => void;
  audioMuted: boolean;
  toggleAudio: () => void;
}

const navItems = [
  { id: 'intro', label: 'OVERVIEW', index: '01' },
  { id: 'skills', label: 'TECH STACK', index: '02' },
  { id: 'missions', label: 'PROJECTS', index: '03' },
  { id: 'fullstack', label: 'FULL STACK', index: '04' },
  { id: 'timeline', label: 'EXPERIENCE', index: '05' },
  { id: 'notes', label: 'NOTES', index: '06' },
  { id: 'contact', label: 'CONTACT', index: '07' },
];

export const Navbar: React.FC<NavbarProps> = ({
  mode,
  setMode,
  audioMuted,
  toggleAudio,
}) => {
  const [latency, setLatency] = useState(14);
  const [menuOpen, setMenuOpen] = useState(false);

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
        background: 'linear-gradient(to bottom, rgba(2, 2, 5, 0.96) 0%, rgba(2, 2, 5, 0.6) 100%)',
        borderBottom: '1px solid rgba(var(--cyber-cyan-rgb), 0.15)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        fontFamily: 'var(--font-mono)',
      }}
    >
      {/* HUD left: Diagnostics & Brand */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => handleTabChange('intro')}
          className="flex items-center gap-2 text-left bg-transparent border-0 cursor-pointer p-0"
        >
          <div className="w-6 h-6 rounded bg-cyan-500/10 border border-cyan-400/50 flex items-center justify-center text-cyan-400">
            <Terminal size={13} />
          </div>
          <div className="flex flex-col">
            <span
              className="text-xs font-black tracking-wider text-white"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              GAUTAM SARRAF
            </span>
            <span className="text-[9px] text-cyan-400 tracking-widest hidden sm:inline">
              FULL STACK · AI · BACKEND
            </span>
          </div>
        </button>

        <div className="hidden xl:flex items-center gap-3 text-[10px] text-slate-500 pl-3 border-l border-slate-800">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-slate-400">STATUS:</span>
            <span className="text-green-400 font-bold">ONLINE</span>
          </div>
        </div>
      </div>

      {/* Main Tabs (Center Navigation Cockpit) */}
      <nav
        className="hidden lg:flex"
        style={{
          display: 'flex',
          gap: 4,
          background: 'rgba(3, 4, 15, 0.85)',
          border: '1px solid rgba(var(--cyber-cyan-rgb), 0.15)',
          borderRadius: 8,
          padding: '4px',
        }}
        aria-label="Main Navigation"
      >
        {navItems.map((item) => {
          const isActive = mode === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              onMouseEnter={() => spaceAudio.playHover()}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '6px 12px',
                borderRadius: 6,
                border: 'none',
                cursor: 'pointer',
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '1.5px',
                color: isActive ? '#000' : 'var(--text-primary)',
                background: isActive
                  ? 'linear-gradient(135deg, var(--cyber-cyan), #00ff88)'
                  : 'transparent',
                boxShadow: isActive ? '0 0 15px rgba(var(--cyber-cyan-rgb), 0.3)' : 'none',
                transition: 'all 0.2s',
              }}
            >
              <span style={{ opacity: isActive ? 0.8 : 0.4, fontSize: 8 }}>{item.index}</span>
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* HUD right: Download Resume, Latency, audio controls, hamburger */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Prominent Resume Download Button */}
        <a
          href="/Gautam_Sarraf_resume.pdf"
          download="Gautam_Sarraf_resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => spaceAudio.playHover()}
          onClick={() => spaceAudio.playClick()}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-500/10 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 border border-cyan-400/40 text-[10px] font-bold rounded transition-all tracking-wider"
          aria-label="Download Gautam Sarraf Resume"
        >
          <Download size={12} />
          <span className="hidden sm:inline">RESUME</span>
        </a>

        {/* Latency */}
        <div className="hidden sm:flex items-center gap-1.5 text-[10px] text-slate-400">
          <Activity size={12} className="text-cyan-400" />
          <span>{latency}ms</span>
        </div>

        {/* Audio Toggle */}
        <button
          onClick={toggleAudio}
          onMouseEnter={() => spaceAudio.playHover()}
          aria-label={audioMuted ? 'Turn Sound On' : 'Turn Sound Off'}
          style={{
            background: 'none',
            border: 'none',
            color: audioMuted ? 'var(--cyber-orange)' : 'var(--cyber-cyan)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            fontSize: 9,
            padding: 6,
          }}
        >
          {audioMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
        </button>

        {/* Mobile menu Hamburger */}
        <button
          onClick={() => {
            spaceAudio.playClick();
            setMenuOpen(!menuOpen);
          }}
          className="lg:hidden flex items-center justify-center p-2 rounded cursor-pointer"
          style={{
            border: '1px solid rgba(var(--cyber-cyan-rgb), 0.3)',
            background: 'rgba(3, 4, 15, 0.6)',
            color: 'var(--cyber-cyan)',
          }}
          aria-label="Open Navigation Menu"
        >
          <Compass size={16} />
        </button>
      </div>

      {/* Holographic Navigation overlay for mobile */}
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
            gap: 6,
            backdropFilter: 'blur(20px)',
            zIndex: 1001,
          }}
          className="lg:hidden shadow-2xl"
        >
          <div className="flex items-center justify-between mb-2 px-2 text-[9px] text-slate-400 font-bold border-b border-slate-900 pb-2">
            <span>// NAVIGATION INDEX</span>
            <span className="text-cyan-400">GAUTAM.SYS</span>
          </div>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              style={{
                width: '100%',
                padding: '10px 14px',
                textAlign: 'left',
                borderRadius: 6,
                border: 'none',
                cursor: 'pointer',
                background:
                  mode === item.id
                    ? 'linear-gradient(135deg, rgba(var(--cyber-cyan-rgb), 0.2), rgba(0, 255, 136, 0.1))'
                    : 'rgba(255,255,255,0.02)',
                color: mode === item.id ? 'var(--cyber-cyan)' : 'var(--text-primary)',
                fontSize: 11,
                letterSpacing: '1.5px',
                fontWeight: 700,
                borderLeft: mode === item.id ? '3px solid var(--cyber-cyan)' : 'none',
              }}
            >
              [{item.index}] {item.label}
            </button>
          ))}

          <a
            href="/Gautam_Sarraf_resume.pdf"
            download="Gautam_Sarraf_resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex items-center justify-center gap-2 p-2.5 bg-cyan-500 text-slate-950 font-bold text-xs rounded tracking-wider text-center"
          >
            <Download size={14} /> DOWNLOAD RESUME PDF
          </a>
        </div>
      )}
    </header>
  );
};

export default Navbar;