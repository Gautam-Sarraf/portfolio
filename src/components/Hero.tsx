import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Download, Terminal, Layers } from 'lucide-react';
import { spaceAudio } from '../utils/audio';

interface HeroProps {
  onViewWork?: () => void;
  audioMuted?: boolean;
}

const ROLES = [
  'Full Stack Engineer · AI Engineer · Backend Specialist',
  'AI Engineering · AI Agents · Document Intelligence',
  'FastAPI Services · Python Automation · Scalable APIs',
  'React · TypeScript · Next.js · Full Stack Systems',
];

export const Hero: React.FC<HeroProps> = ({ onViewWork, audioMuted = true }) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [typedRole, setTypedRole] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect for supporting headline roles
  useEffect(() => {
    const fullText = ROLES[roleIndex];
    const speed = isDeleting ? 25 : 55;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (typedRole.length < fullText.length) {
          setTypedRole(fullText.slice(0, typedRole.length + 1));
          if (!audioMuted && Math.random() > 0.6) spaceAudio.playTerminalType();
        } else {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), 2400);
        }
      } else {
        if (typedRole.length > 0) {
          setTypedRole(typedRole.slice(0, -1));
        } else {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % ROLES.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [typedRole, isDeleting, roleIndex, audioMuted]);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center text-center px-4 py-6 md:py-10">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="hud-panel p-6 md:p-10 flex flex-col items-center max-w-3xl w-full mx-auto relative border border-cyan-500/30 shadow-[0_0_35px_rgba(0,0,0,0.6)]"
      >
        {/* Top Cockpit Terminal Status Pill */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-4 font-mono text-[10px]">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-950/40 border border-green-500/40 rounded-full text-green-400">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-ping" />
            <span>SYSTEM ACTIVE // 2026 PROFILE</span>
          </div>
          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-950/40 border border-cyan-500/30 rounded-full text-cyan-300">
            <Terminal size={11} className="text-cyan-400" />
            <span>LOCATION: BIRGUNJ, NEPAL · GLA UNIV.</span>
          </div>
        </div>

        {/* Primary Name Header */}
        <h1
          className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white mb-2"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          <span className="gradient-text-cyan">GAUTAM SARRAF</span>
        </h1>

        {/* Professional Title & Typewriter Subtitle */}
        <div className="font-mono text-cyan-300 text-sm sm:text-base md:text-lg font-bold tracking-wide min-h-[28px] mb-4 flex items-center justify-center">
          <span className="text-cyan-400 mr-1">&gt;</span>
          <span>{typedRole}</span>
          <span className="inline-block w-2 h-4 bg-cyan-400 ml-1 animate-pulse" />
        </div>

        {/* Core Positioning Paragraphs */}
        <div className="flex flex-col gap-2 max-w-2xl text-slate-300 font-sans text-xs sm:text-sm md:text-base leading-relaxed mb-6">
          <p className="font-medium text-white">
            Building production-grade AI systems, intelligent automation, scalable backend infrastructure, and polished web applications.
          </p>
          <p className="text-slate-400 text-xs sm:text-sm">
            I build across the stack — from React interfaces to FastAPI services, AI agents, data pipelines, and production infrastructure.
          </p>
        </div>

        {/* Key Competency Metric Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full max-w-xl mb-8 font-mono text-[10px] text-left">
          <div className="p-2.5 rounded bg-slate-950/70 border border-slate-800 flex flex-col">
            <span className="text-slate-500 text-[8px] uppercase">Specialization</span>
            <span className="text-cyan-300 font-bold truncate">AI & Backend</span>
          </div>
          <div className="p-2.5 rounded bg-slate-950/70 border border-slate-800 flex flex-col">
            <span className="text-slate-500 text-[8px] uppercase">Core Tech</span>
            <span className="text-green-300 font-bold truncate">Python · FastAPI</span>
          </div>
          <div className="p-2.5 rounded bg-slate-950/70 border border-slate-800 flex flex-col">
            <span className="text-slate-500 text-[8px] uppercase">Frontend</span>
            <span className="text-purple-300 font-bold truncate">React · TypeScript</span>
          </div>
          <div className="p-2.5 rounded bg-slate-950/70 border border-slate-800 flex flex-col">
            <span className="text-slate-500 text-[8px] uppercase">Philosophy</span>
            <span className="text-yellow-300 font-bold truncate">Verify → Recover</span>
          </div>
        </div>

        {/* Primary CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3 w-full font-mono text-xs">
          {/* View My Work */}
          <button
            onClick={() => {
              spaceAudio.playClick();
              if (onViewWork) onViewWork();
            }}
            onMouseEnter={() => spaceAudio.playHover()}
            className="flex items-center gap-2 px-6 py-3 bg-cyan-500 text-slate-950 hover:bg-cyan-400 font-bold rounded transition-all shadow-[0_0_20px_rgba(0,255,216,0.35)] hover:shadow-[0_0_25px_rgba(0,255,216,0.6)]"
          >
            <Layers size={14} /> VIEW MY WORK
          </button>

          {/* Download Resume */}
          <a
            href="/Gautam_Sarraf_resume.pdf"
            download="Gautam_Sarraf_resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => spaceAudio.playHover()}
            onClick={() => spaceAudio.playClick()}
            className="flex items-center gap-2 px-5 py-3 border border-cyan-500/50 text-cyan-300 hover:text-white hover:bg-cyan-500/20 font-bold rounded transition-all"
            aria-label="Download Gautam Sarraf's Resume PDF"
          >
            <Download size={14} /> DOWNLOAD RESUME
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/gautam-sarraf"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => spaceAudio.playHover()}
            onClick={() => spaceAudio.playClick()}
            className="flex items-center gap-1.5 px-4 py-3 border border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 font-bold rounded transition-colors"
            aria-label="Visit Gautam's GitHub Profile"
          >
            <Github size={14} /> GITHUB
          </a>

          {/* LinkedIn */}
          <a
            href="https://linkedin.com/in/gautam-sarraf"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => spaceAudio.playHover()}
            onClick={() => spaceAudio.playClick()}
            className="flex items-center gap-1.5 px-4 py-3 border border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 font-bold rounded transition-colors"
            aria-label="Visit Gautam's LinkedIn Profile"
          >
            <Linkedin size={14} /> LINKEDIN
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
