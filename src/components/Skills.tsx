import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, RefreshCw, Layers } from 'lucide-react';
import { spaceAudio } from '../utils/audio';
import { SKILL_PLANETS } from './SpaceCanvas';

interface SkillsProps {
  selectedSkill: string | null;
  setSelectedSkill: (skill: string | null) => void;
}

const SKILL_DETAILS: Record<string, {
  level: number;
  role: string;
  useCase: string;
  projects: string[];
  desc: string;
}> = {
  React: {
    level: 88,
    role: "Core Web Client",
    useCase: "Building highly responsive dashboard UIs, state synchronization with Websockets, and custom reusable canvas interfaces.",
    projects: ["Resume Analyzer AI", "PDF Chatbot", "OT Scheduler", "TeamSphere"],
    desc: "Primary clientside engine. Specialize in custom hooks, context state management, and Framer Motion animation layouts.",
  },
  TypeScript: {
    level: 80,
    role: "Type Safety & Security",
    useCase: "Strict interface mapping, API payload formatting, and state type checking across frontend microservices.",
    projects: ["OT Scheduler", "TeamSphere", "PMCH Platform"],
    desc: "Ensuring compiler safety and structure across scaled developer modules.",
  },
  Python: {
    level: 84,
    role: "AI Inference & Script Automation",
    useCase: "Developing NLP parsing scripts, web scraping pipelines, and backends utilizing LangChain nodes.",
    projects: ["Resume Analyzer AI", "PDF Chatbot", "CP-KYC Automation"],
    desc: "Core backend language for data manipulation, mathematical engines, and artificial intelligence wrappers.",
  },
  FastAPI: {
    level: 78,
    role: "High-Performance REST APIs",
    useCase: "Creating light, async API endpoints to serve ML predictions and coordinate vector lookups.",
    projects: ["Resume Analyzer AI", "PDF Chatbot", "CP-KYC Automation"],
    desc: "Ultra-fast ASGI framework. Leverage its native async routines and automatic OpenAPI schema compilers.",
  },
  OpenAI: {
    level: 85,
    role: "LLM Orchestration & Embeddings",
    useCase: "Translating raw documents to embeddings, context search responses, and ATS evaluation pipelines.",
    projects: ["Resume Analyzer AI", "PDF Chatbot", "AI Chat Application"],
    desc: "Integrating advanced models (GPT-4, Ada) into production pipelines for human-like reasoning tasks.",
  },
  LangChain: {
    level: 78,
    role: "AI Agent & Chain Builder",
    useCase: "Chaining prompts, structuring agent action-cycles, and setting up document split/load vectors.",
    projects: ["PDF Chatbot", "Resume Analyzer AI"],
    desc: "Orchestrating agent workflows and conversational history loops over vector memories.",
  },
  MongoDB: {
    level: 80,
    role: "NoSQL Database Logs",
    useCase: "Handling real-time chat histories, user account metrics, and flexible metadata documents.",
    projects: ["TeamSphere", "Marketplace Platform", "PMCH Platform"],
    desc: "Storing horizontal, high-scale application state documents.",
  },
  Docker: {
    level: 68,
    role: "Containerized Deployments",
    useCase: "Bundling microservices, scrapers, and database engines into identical runtime environments.",
    projects: ["CP-KYC Automation"],
    desc: "Configuring multi-stage Dockerfiles and compose setups for modular system orchestration.",
  },
  AWS: {
    level: 70,
    role: "Cloud Compute & S3 Buckets",
    useCase: "Uploading PDF logs, hosting server nodes, and managing CDN endpoints.",
    projects: ["Marketplace Platform"],
    desc: "Deploying microservices infrastructure and server storage.",
  },
};

const CERTIFICATIONS = [
  { title: "Back End Development & APIs", issuer: "freeCodeCamp", color: "#00ff88" },
  { title: "Full Stack Web Development", issuer: "Coding Blocks", color: "#00f0ff" },
  { title: "Quality Assurance", issuer: "freeCodeCamp", color: "#ffcc00" },
];

const Skills: React.FC<SkillsProps> = ({ selectedSkill, setSelectedSkill }) => {
  const handleSkillSelect = (name: string) => {
    spaceAudio.playWarp();
    setSelectedSkill(name);
  };

  const handleReset = () => {
    spaceAudio.playClick();
    setSelectedSkill(null);
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'grid',
        gridTemplateColumns: '1.5fr 1fr',
        gap: 20,
        padding: '24px',
        overflow: 'hidden',
      }}
      className="flex flex-col lg:grid"
    >
      {/* Left Column: Skill Planet diagnostics OR Galaxy lists */}
      <div
        className="hud-panel p-5 overflow-y-auto max-h-[50vh] lg:max-h-[82vh]"
        style={{ border: '1px solid rgba(var(--cyber-cyan-rgb), 0.25)' }}
      >
        <AnimatePresence mode="wait">
          {selectedSkill && SKILL_DETAILS[selectedSkill] ? (
            <motion.div
              key="selected"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex flex-col gap-4 font-mono text-[11px]"
            >
              {/* Header */}
              <div className="flex justify-between items-center border-b border-slate-900 pb-3">
                <div>
                  <span className="font-bold text-[8px] bg-cyan-900/50 border border-cyan-500/40 text-cyan-400 px-2 py-0.5 rounded-sm tracking-wider mr-2 uppercase">
                    SECTOR SELECTED
                  </span>
                  <h2 className="text-xl font-bold text-cyan-400 font-display mt-1 tracking-wider uppercase">
                    {selectedSkill}
                  </h2>
                </div>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 rounded transition-colors text-[9px] cursor-none"
                >
                  <RefreshCw size={11} className="animate-spin" style={{ animationDuration: '4s' }} />
                  RESET SYSTEM
                </button>
              </div>

              {/* Stats gauge */}
              <div className="flex flex-col gap-2 p-3 bg-slate-950/60 border border-slate-900/60 rounded">
                <div className="flex justify-between">
                  <span className="text-slate-500">INTELLIGENCE GAIN:</span>
                  <span className="text-cyan-400 font-bold">{SKILL_DETAILS[selectedSkill].level}% COMPATIBLE</span>
                </div>
                <div className="h-2 bg-slate-900 rounded overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${SKILL_DETAILS[selectedSkill].level}%` }}
                    className="h-full bg-cyan-400 shadow-[0_0_8px_var(--cyber-cyan)]"
                  />
                </div>
              </div>

              {/* Data fields */}
              <div className="flex flex-col gap-3 leading-relaxed">
                <div>
                  <span className="text-slate-500 block mb-1">SYSTEM ROLE:</span>
                  <span className="text-slate-200">{SKILL_DETAILS[selectedSkill].role.toUpperCase()}</span>
                </div>

                <div>
                  <span className="text-slate-500 block mb-1">MODULE OVERVIEW:</span>
                  <span className="text-slate-300">{SKILL_DETAILS[selectedSkill].desc}</span>
                </div>

                <div>
                  <span className="text-slate-500 block mb-1">TACTICAL USE CASES:</span>
                  <span className="text-slate-300">{SKILL_DETAILS[selectedSkill].useCase}</span>
                </div>

                <div>
                  <span className="text-slate-500 block mb-1">INTEGRATED CODES:</span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {SKILL_DETAILS[selectedSkill].projects.map(proj => (
                      <span key={proj} className="px-2 py-0.5 bg-slate-900 border border-slate-800 text-cyan-300 text-[9px] rounded-sm">
                        {proj}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col gap-4 font-mono text-[11px]"
            >
              <div className="border-b border-slate-900 pb-2 flex items-center gap-2">
                <Layers size={13} className="text-cyan-400" />
                <span className="tracking-wider text-slate-400 uppercase">SYSTEM_PLANETS_DIAGNOSTICS</span>
              </div>
              <p className="text-[10px] text-slate-500 leading-relaxed">
                The star chart maps Gautam's technical planetary clusters. Click any planet in the space sector or click buttons below to inspect system statistics.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
                {SKILL_PLANETS.map((planet) => (
                  <button
                    key={planet.name}
                    onClick={() => handleSkillSelect(planet.name)}
                    onMouseEnter={() => spaceAudio.playHover()}
                    className="flex flex-col gap-2 p-3 bg-slate-950/40 border border-slate-900 hover:border-cyan-500/30 rounded text-left transition-colors cursor-none group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-200 group-hover:text-cyan-400 transition-colors uppercase">
                        {planet.name}
                      </span>
                      <span style={{ color: planet.color }} className="text-[8px] animate-pulse">●</span>
                    </div>
                    {SKILL_DETAILS[planet.name] && (
                      <div className="w-full h-1 bg-slate-900 rounded overflow-hidden">
                        <div
                          style={{ width: `${SKILL_DETAILS[planet.name].level}%`, backgroundColor: planet.color }}
                          className="h-full"
                        />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Right Column: Holographic Certificate Artifacts */}
      <div
        className="hud-panel p-5 overflow-y-auto flex flex-col gap-4 max-h-[30vh] lg:max-h-[82vh]"
        style={{ border: '1px solid rgba(var(--cyber-cyan-rgb), 0.25)' }}
      >
        <div className="font-mono text-[10px] tracking-wider text-slate-400 border-b border-slate-900 pb-2 flex items-center gap-2">
          <Award size={13} className="text-cyan-400" />
          SYSTEM_CREDENTIALS
        </div>

        <div className="flex flex-col gap-3 font-mono text-[10px]">
          {CERTIFICATIONS.map((c, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -3, scale: 1.01 }}
              onMouseEnter={() => spaceAudio.playHover()}
              style={{
                borderLeft: `3px solid ${c.color}`,
                border: '1px solid rgba(255,255,255,0.03)',
                background: 'rgba(3,4,15,0.4)',
              }}
              className="p-3 rounded flex gap-3 items-center group cursor-none hover:bg-slate-950/80 transition-colors"
            >
              <div className="w-8 h-8 rounded-full border border-slate-800 flex items-center justify-center text-xs bg-slate-950/80 group-hover:border-cyan-500/40 transition-colors">
                🏆
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-slate-200 truncate uppercase tracking-wider">{c.title}</div>
                <div className="text-slate-500 text-[8px] mt-0.5 uppercase tracking-widest">{c.issuer}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
