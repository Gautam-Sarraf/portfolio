import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Github, Linkedin, Download, ShieldCheck, Terminal, Compass } from 'lucide-react';
import { spaceAudio } from '../utils/audio';

interface HeroProps {
  onBootComplete: () => void;
  audioMuted: boolean;
}

const BOOT_LOGS = [
  { text: "INITIALIZING PORTFOLIO SYSTEM...", delay: 0 },
  { text: "LOADING SITE COMPONENT ASSETS... [OK]", delay: 500 },
  { text: "ESTABLISHING CORE ROUTING...", delay: 1100 },
  { text: "CONNECTION STABILITY [STABLE]", delay: 1600 },
  { text: "LOADING GAUTAM SARRAF DATA...", delay: 2100 },
  { text: "MOUNTING PORTFOLIO CORES... [OK]", delay: 2600 },
  { text: "BOOTING SEQUENCE COMPLETE...", delay: 3100 },
];

const ROLES = [
  "AI SYSTEMS ENGINEER",
  "FULL STACK ARCHITECT",
  "SYSTEMS INTEGRATOR",
  "PYTHON AUTOMATION DEV",
];

const Hero: React.FC<HeroProps> = ({ onBootComplete, audioMuted }) => {
  const [bootIndex, setBootIndex] = useState(0);
  const [bootStage, setBootStage] = useState<'booting' | 'surge' | 'completed'>('booting');
  const [roleIndex, setRoleIndex] = useState(0);
  const [typedRole, setTypedRole] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Sound and log triggers during boot
  useEffect(() => {
    if (bootIndex < BOOT_LOGS.length) {
      const log = BOOT_LOGS[bootIndex];
      const timer = setTimeout(() => {
        if (!audioMuted) spaceAudio.playTerminalType();
        setBootIndex(prev => prev + 1);
      }, log.delay - (bootIndex > 0 ? BOOT_LOGS[bootIndex - 1].delay : 0));
      return () => clearTimeout(timer);
    } else {
      // Trigger power surge effect
      const surgeTimer = setTimeout(() => {
        if (!audioMuted) spaceAudio.playBoot();
        setBootStage('surge');

        // Complete boot
        const endTimer = setTimeout(() => {
          setBootStage('completed');
          onBootComplete();
        }, 800);
        return () => clearTimeout(endTimer);
      }, 800);
      return () => clearTimeout(surgeTimer);
    }
  }, [bootIndex, audioMuted, onBootComplete]);

  // Role Typewriter
  useEffect(() => {
    if (bootStage !== 'completed') return;

    const fullText = ROLES[roleIndex];
    const speed = isDeleting ? 30 : 70;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (typedRole.length < fullText.length) {
          setTypedRole(fullText.slice(0, typedRole.length + 1));
          if (!audioMuted && Math.random() > 0.4) spaceAudio.playTerminalType();
        } else {
          // Hold before deleting
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (typedRole.length > 0) {
          setTypedRole(typedRole.slice(0, -1));
        } else {
          setIsDeleting(false);
          setRoleIndex(prev => (prev + 1) % ROLES.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [typedRole, isDeleting, roleIndex, bootStage, audioMuted]);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
      }}
    >
      <AnimatePresence mode="wait">
        {bootStage === 'booting' && (
          <motion.div
            key="terminal-boot"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              width: 'min(560px, 90vw)',
              background: 'rgba(2, 2, 5, 0.95)',
              border: '1px solid rgba(var(--cyber-cyan-rgb), 0.2)',
              borderRadius: 8,
              padding: 24,
              fontFamily: 'var(--font-mono)',
              boxShadow: '0 0 40px rgba(var(--cyber-cyan-rgb), 0.05)',
              zIndex: 100,
            }}
          >
            {/* Terminal Top bar */}
            <div className="flex items-center gap-2 border-b border-slate-900 pb-3 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              <span className="text-[10px] text-slate-500 ml-2">SystemBoot // GautamOS.sys</span>
            </div>

            {/* Boot log list */}
            <div className="flex flex-col gap-2 min-h-48 text-[11px] leading-relaxed text-slate-400">
              {BOOT_LOGS.slice(0, bootIndex).map((log, idx) => (
                <div key={idx} className="flex gap-2">
                  <span className="text-cyan-400 font-bold">&gt;</span>
                  <span>{log.text}</span>
                </div>
              ))}
              {bootIndex < BOOT_LOGS.length && (
                <div className="flex items-center gap-1">
                  <span className="text-cyan-400 font-bold">&gt;</span>
                  <span className="w-2 h-4 bg-cyan-400 animate-pulse" />
                </div>
              )}
            </div>
          </motion.div>
        )}

        {bootStage === 'surge' && (
          <motion.div
            key="power-surge"
            initial={{ opacity: 0 }}
            animate={{ opacity: [1, 0, 1, 0.3, 1] }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: '#fff',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div className="font-mono text-black text-xl font-bold tracking-widest animate-ping">
              INITIALIZING GRAPHICS...
            </div>
          </motion.div>
        )}

        {bootStage === 'completed' && (
          <motion.div
            key="hero-lobby"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: 'spring' }}
            style={{
              position: 'relative',
              zIndex: 10,
              maxWidth: 700,
              width: '100%',
              padding: '0 24px',
              textAlign: 'center',
            }}
          >
            {/* HUD Status label */}
            <div className="flex justify-center mb-6">
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '4px 12px',
                  background: 'rgba(var(--cyber-green-rgb), 0.1)',
                  border: '1px solid rgba(var(--cyber-green-rgb), 0.3)',
                  borderRadius: 100,
                  fontSize: 10,
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--cyber-green)',
                  letterSpacing: '2px',
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping" />
                WELCOME TO MY PORTFOLIO
              </div>
            </div>

            {/* Gautam Sarraf Main Header */}
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(38px, 6vw, 68px)',
                fontWeight: 900,
                letterSpacing: '-2px',
                lineHeight: 1.1,
                marginBottom: 16,
              }}
              className="gradient-text-cyan neon-glow-cyan"
            >
              GAUTAM
              <br />
              SARRAF
            </h1>

            {/* Typewriter Subtitle */}
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(12px, 2.2vw, 18px)',
                color: 'var(--cyber-cyan)',
                minHeight: 24,
                marginBottom: 20,
                letterSpacing: '2px',
              }}
            >
              &gt; {typedRole}
              <span className="inline-block w-1.5 h-4 bg-cyan-400 ml-1 align-middle animate-pulse" />
            </div>

            {/* Description */}
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 13,
                color: 'var(--text-muted)',
                lineHeight: 1.7,
                maxWidth: 480,
                margin: '0 auto 36px',
              }}
            >
              Building modern web applications and intelligent systems. Specializing in AI-driven solutions, robust backends, and full stack engineering.
            </p>

            {/* Systems Metrics Overlay */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 border border-slate-800/40 rounded bg-slate-950/20 mb-8 max-w-lg mx-auto font-mono text-[9px] text-slate-500">
              <div className="flex flex-col gap-1 border-r border-slate-900">
                <span>LOCATION:</span>
                <span className="text-cyan-400">BIRGUNJ, NEPAL</span>
              </div>
              <div className="flex flex-col gap-1 md:border-r border-slate-900">
                <span>DATABASES:</span>
                <span className="text-green-400">POSTGRES / MONGO</span>
              </div>
              <div className="flex flex-col gap-1 border-r border-slate-900">
                <span>AI STACK:</span>
                <span className="text-pink-400">GPT-4 / LANGCHAIN</span>
              </div>
              <div className="flex flex-col gap-1">
                <span>ACADEMICS:</span>
                <span className="text-yellow-400">GLA UNIV. CSE</span>
              </div>
            </div>

            {/* CTA action keys */}
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://github.com/gautam-sarraf"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => spaceAudio.playHover()}
                onClick={() => spaceAudio.playClick()}
                className="flex items-center gap-2 px-6 py-3 border border-cyan-500/30 text-cyan-400 hover:text-slate-950 hover:bg-cyan-500 transition-all font-mono text-xs font-bold rounded cursor-none"
              >
                <Github size={14} /> GITHUB
              </a>
              <a
                href="https://linkedin.com/in/gautam-sarraf"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => spaceAudio.playHover()}
                onClick={() => spaceAudio.playClick()}
                className="flex items-center gap-2 px-6 py-3 border border-green-500/30 text-green-400 hover:text-slate-950 hover:bg-green-500 transition-all font-mono text-xs font-bold rounded cursor-none"
              >
                <Linkedin size={14} /> LINKEDIN
              </a>
              <a
                href="#"
                onMouseEnter={() => spaceAudio.playHover()}
                onClick={(e) => { e.preventDefault(); spaceAudio.playClick(); }}
                className="flex items-center gap-2 px-6 py-3 bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-all font-mono text-xs font-bold rounded cursor-none hover:shadow-[0_0_15px_rgba(var(--cyber-cyan-rgb),0.4)]"
              >
                <Download size={14} /> DOWNLOAD RESUME
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Hero;
