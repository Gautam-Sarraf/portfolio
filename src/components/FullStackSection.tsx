import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Smartphone, Server, ArrowUpRight } from 'lucide-react';
import { spaceAudio } from '../utils/audio';

const FULL_STACK_PROJECTS = [
  {
    title: 'TeamSphere Hub',
    subtitle: 'Real-Time Collaborative Workspace Suite',
    desc: 'Engineered an end-to-end collaboration portal combining interactive HTML5 whiteboards, peer-to-peer WebRTC voice mesh, and real-time WebSocket state synchronization with a high-concurrency Express backend.',
    stack: ['React', 'TypeScript', 'WebRTC', 'Socket.io', 'Node.js', 'MongoDB'],
    github: 'https://github.com/Gautam-Sarraf/TeamSphere',
    capability: 'Real-time state sync, WebRTC media, and low-latency canvas drawing.',
  },
  {
    title: 'OT Scheduler Grid System',
    subtitle: 'Complex Enterprise Shift Management UI',
    desc: 'Designed a dense, highly interactive data grid interface in React and TypeScript for dynamic roster allocations, linked to a multi-variable constraint solver backend in PostgreSQL.',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL'],
    github: 'https://github.com/gautam-sarraf',
    capability: 'Complex enterprise data-grid manipulation, drag-and-drop state, and responsive layout.',
  },
  {
    title: 'GGs Forex Analytics Dashboard',
    subtitle: 'Real-Time Financial Visualization Interface',
    desc: 'Constructed a high-performance financial dashboard rendering live time-series canvas charts, historical currency conversions, and automated volatility indicators.',
    stack: ['React', 'JavaScript', 'Chart.js', 'REST APIs', 'CSS3'],
    github: 'https://github.com/gautam-sarraf',
    capability: 'High-frequency canvas charting, reactive state management, and mobile responsiveness.',
  },
];

const CAPABILITY_PILLARS = [
  {
    icon: <Layout size={18} className="text-cyan-400" />,
    title: 'Interface to Deployment',
    desc: 'Taking features from initial UI architecture and component state all the way through REST endpoints, data modeling, and production hosting.',
  },
  {
    icon: <Server size={18} className="text-purple-400" />,
    title: 'API & Contract Alignment',
    desc: 'Designing strict TypeScript and Pydantic contracts ensuring frontends and backends speak identical schemas without runtime typing failures.',
  },
  {
    icon: <Smartphone size={18} className="text-green-400" />,
    title: 'Responsive & Accessible UX',
    desc: 'Crafting responsive mobile-first layouts, strict keyboard navigation, ARIA semantics, and fluid performance across all viewport sizes.',
  },
];

export const FullStackSection: React.FC = () => {
  return (
    <div className="w-full flex flex-col gap-6 font-mono">
      {/* Top Banner */}
      <div
        className="hud-panel p-6 border border-cyan-500/25"
        style={{
          background: 'linear-gradient(180deg, rgba(8, 10, 31, 0.85) 0%, rgba(3, 4, 15, 0.95) 100%)',
        }}
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4 mb-4">
          <div>
            <div className="text-[10px] text-cyan-400 tracking-widest uppercase">// END-TO-END EXECUTION</div>
            <h2 className="text-2xl font-black text-white" style={{ fontFamily: 'var(--font-display)' }}>
              FULL STACK DEVELOPMENT
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {['React', 'TypeScript', 'Next.js', 'Vite', 'HTML', 'CSS', 'REST APIs'].map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 bg-slate-900 border border-cyan-500/20 text-cyan-300 text-[10px] rounded font-mono"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <p className="text-sm text-slate-300 font-sans leading-relaxed max-w-3xl">
          While my current specialization is <strong className="text-cyan-300">AI and backend engineering</strong>, I also build modern frontend applications and have extensive experience taking products from interface to API to deployment.
        </p>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-4 border-t border-slate-800">
          {CAPABILITY_PILLARS.map((p, idx) => (
            <div key={idx} className="p-4 rounded bg-slate-950/50 border border-slate-800/80 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                {p.icon}
                <span className="text-xs font-bold text-white font-sans">{p.title}</span>
              </div>
              <p className="text-[11px] text-slate-400 font-sans leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Full Stack Project Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {FULL_STACK_PROJECTS.map((proj, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            onMouseEnter={() => spaceAudio.playHover()}
            className="hud-panel p-5 flex flex-col justify-between border border-slate-800 hover:border-cyan-500/50 transition-colors group"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] text-cyan-400 uppercase tracking-wider font-mono">
                  [FULL STACK SHOWCASE]
                </span>
                <a
                  href={proj.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-cyan-300 transition-colors"
                  aria-label={`View ${proj.title} on GitHub`}
                >
                  <ArrowUpRight size={14} />
                </a>
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors font-sans mb-1">
                {proj.title}
              </h3>
              <div className="text-[10px] text-slate-400 font-mono mb-3">{proj.subtitle}</div>
              <p className="text-xs text-slate-300 font-sans leading-relaxed mb-4">{proj.desc}</p>
            </div>

            <div className="border-t border-slate-800/80 pt-3">
              <div className="text-[10px] text-cyan-300 font-mono mb-2">
                Depth: <span className="text-slate-300 font-sans">{proj.capability}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {proj.stack.map((t) => (
                  <span
                    key={t}
                    className="text-[9px] px-2 py-0.5 bg-slate-950 border border-slate-800 text-slate-300 rounded font-mono"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FullStackSection;
