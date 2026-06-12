import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Calendar, Zap, Terminal, ChevronRight } from 'lucide-react';
import { spaceAudio } from '../utils/audio';
import { TIMELINE_STATIONS } from './SpaceCanvas';

interface ExperienceProps {
  selectedIndex: number;
  setSelectedIndex: (idx: number) => void;
}

const EXPERIENCE_REPORTS = [
  {
    role: "B.Tech Student (Computer Science)",
    company: "GLA University, Mathura",
    period: "2022 – May 2026 (Expected)",
    status: "ONGOING",
    color: "var(--cyber-yellow)",
    desc: "Acquiring fundamental systems engineering blocks, data structures, and web technologies.",
    logs: [
      "Secured B.Tech CSE track with current cumulative CPI of 7.63",
      "Completed core coursework: Data Structures, Algorithms, OS, Software Engineering",
      "Built several full stack applications and AI utility scripts as self-directed coursework"
    ],
    tech: ["C/C++", "Python", "DSA", "Web Fundamentals", "SQL"]
  },
  {
    role: "Full Stack Development Training",
    company: "JOVAC (GLA University)",
    period: "June 2024 – July 2024",
    status: "COMPLETED",
    color: "var(--cyber-green)",
    desc: "Collaborating in structured training environments, building full stack web modules, and learning version control frameworks.",
    logs: [
      "Developed multiple full-stack applications using JavaScript, HTML/CSS, and Node.js.",
      "Implemented backend APIs and integrated them with frontend interfaces for dynamic applications.",
      "Worked on debugging and testing, improving application stability and reducing runtime errors.",
      "Collaborated in team-based development environment, following structured coding practices.",
      "Gained hands-on experience with version control systems like Git and GitHub."
    ],
    tech: ["JavaScript", "Node.js", "Express.js", "HTML/CSS", "Git", "GitHub"]
  },
  {
    role: "Web Developer Intern",
    company: "Webninjaz Technologies",
    period: "Sep 2025 – Present",
    status: "ACTIVE",
    color: "var(--cyber-cyan)",
    desc: "Developing and optimizing web panels, integrating dynamic REST APIs, and creating AI automation pipelines.",
    logs: [
      "Developed responsive UI components using React and Next, improving cross-device usability and user experience.",
      "Integrated REST APIs to enable dynamic frontend functionality and seamless data flow.",
      "Built Python-based automation scripts, reducing manual effort by 60% and improving workflow efficiency.",
      "Developed web scraping pipelines to extract and process structured data from multiple web sources.",
      "Designed and implemented AI-driven backend solutions using Python and FastAPI for intelligent data processing and automation.",
      "Collaborated with team on debugging, testing, and deployment across development lifecycle."
    ],
    tech: ["React", "Next.js", "TypeScript", "Python", "FastAPI", "REST APIs", "Web Scraping"]
  }
];

const Experience: React.FC<ExperienceProps> = ({ selectedIndex, setSelectedIndex }) => {
  const activeReport = EXPERIENCE_REPORTS[selectedIndex];

  const handleStationWarp = (idx: number) => {
    spaceAudio.playWarp();
    setSelectedIndex(idx);
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'grid',
        gridTemplateColumns: '1fr 2fr',
        gap: 20,
        padding: '24px',
        overflow: 'hidden',
      }}
      className="flex flex-col lg:grid"
    >
      {/* Left panel: Stations navigation */}
      <div
        className="hud-panel p-4 overflow-y-auto flex flex-col gap-2 max-h-[35vh] lg:max-h-[82vh]"
        style={{ border: '1px solid rgba(var(--cyber-cyan-rgb), 0.25)' }}
      >
        <div className="font-mono text-[10px] tracking-wider text-slate-400 border-b border-slate-900 pb-2 mb-2 flex items-center gap-2">
          <Terminal size={12} className="text-cyan-400" />
          WORK HISTORY
        </div>

        {TIMELINE_STATIONS.map((station, idx) => {
          const isActive = idx === selectedIndex;
          return (
            <button
              key={idx}
              onClick={() => handleStationWarp(idx)}
              onMouseEnter={() => spaceAudio.playHover()}
              style={{
                width: '100%',
                padding: '12px 14px',
                textAlign: 'left',
                borderRadius: 6,
                border: 'none',
                background: isActive ? 'linear-gradient(135deg, rgba(var(--cyber-cyan-rgb), 0.15), rgba(var(--cyber-green-rgb), 0.05))' : 'rgba(255,255,255,0.02)',
                color: isActive ? 'var(--cyber-cyan)' : 'var(--text-primary)',
                borderLeft: isActive ? `3px solid ${station.color}` : '3px solid transparent',
                cursor: 'none',
                transition: 'all 0.2s',
              }}
              className="flex justify-between items-center group hover:bg-slate-900/60"
            >
              <div>
                <div className="font-mono text-[11px] font-bold tracking-wider">{station.label.toUpperCase()}</div>
                <div className="font-mono text-[8px] text-slate-500 mt-0.5 tracking-widest">YEAR: {station.year}</div>
              </div>
              <span style={{ color: station.color }} className="text-[9px] animate-pulse">●</span>
            </button>
          );
        })}
      </div>

      {/* Right panel: Active Station Mission Report */}
      <div
        className="hud-panel p-6 overflow-y-auto flex flex-col gap-4 max-h-[65vh] lg:max-h-[82vh]"
        style={{ border: '1px solid rgba(var(--cyber-cyan-rgb), 0.25)' }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedIndex}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-4 font-mono text-[11px]"
          >
            {/* Header info */}
            <div className="flex justify-between items-start border-b border-slate-900 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span
                    style={{
                      backgroundColor: `${activeReport.color}15`,
                      borderColor: `${activeReport.color}40`,
                      color: activeReport.color,
                    }}
                    className="px-2.5 py-0.5 border text-[8px] tracking-widest rounded-sm font-bold"
                  >
                    {activeReport.status}
                  </span>
                  <span className="text-slate-500 text-[9px]">TIMELINE COORDINATE: Z-{selectedIndex}</span>
                </div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 900, color: 'var(--cyber-cyan)' }}>
                  {activeReport.role}
                </h2>
                <div className="text-slate-400 font-bold text-[10px] uppercase tracking-wider mt-0.5">
                  {activeReport.company}
                </div>
              </div>

              <div style={{ color: activeReport.color }} className="flex items-center gap-1.5 text-[9px] font-bold">
                <Calendar size={12} />
                {activeReport.period}
              </div>
            </div>

            {/* Description */}
            <div className="bg-slate-950/60 border border-slate-900/60 p-3 rounded text-slate-400 italic">
              {activeReport.desc}
            </div>

            {/* Log achievements */}
            <div className="flex flex-col gap-2">
              <span className="text-slate-500 font-bold tracking-wider uppercase border-b border-slate-900 pb-1 mb-1">
                KEY ACHIEVEMENTS & CONTRIBUTIONS
              </span>
              <ul className="flex flex-col gap-3">
                {activeReport.logs.map((log, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-slate-300 leading-relaxed">
                    <ChevronRight size={13} style={{ color: activeReport.color }} className="mt-0.5 flex-shrink-0" />
                    <span>{log}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Configured tech stack */}
            <div className="border-t border-slate-900 pt-4 flex flex-wrap gap-2 items-center">
              <Zap size={13} className="text-slate-500" />
              <span className="text-slate-500 text-[9px] tracking-widest uppercase mr-2">TECHNOLOGIES USED:</span>
              {activeReport.tech.map((t) => (
                <span
                  key={t}
                  style={{
                    color: activeReport.color,
                    borderColor: `${activeReport.color}30`,
                    backgroundColor: `${activeReport.color}05`,
                  }}
                  className="px-2.5 py-1 border text-[9px] tracking-wider rounded-sm font-bold"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Experience;
