import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cpu,
  Server,
  Layers,
  Database,
  ShieldCheck,
  Terminal,
  Sparkles,
} from 'lucide-react';
import { SectionHeader } from './About';
import { spaceAudio } from '../utils/audio';

interface SkillCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  tagline: string;
  items: {
    name: string;
    description: string;
    isPrimary?: boolean;
    useCases: string[];
  }[];
}

const PRIMARY_STACK = [
  { name: 'Python', role: 'Core Backend & AI Systems' },
  { name: 'FastAPI', role: 'Asynchronous Microservices & REST APIs' },
  { name: 'AI / LLMs', role: 'LangGraph, RAG & Document Intelligence' },
  { name: 'PostgreSQL', role: 'Relational Schemas, Constraints & Querying' },
  { name: 'Node.js', role: 'Concurrent Gateways & WebSockets' },
  { name: 'React', role: 'Interactive Components & Modern State' },
  { name: 'TypeScript', role: 'Strict Typing, Contracts & Safety' },
];

const SECONDARY_STACK = [
  { name: 'Next.js', role: 'SSR & Hybrid Web Routing' },
  { name: 'MongoDB', role: 'Document Storage & Fast Ingestion' },
  { name: 'Docker', role: 'Containerized Deployment & Compose' },
  { name: 'Git', role: 'Branching, PRs & Version Control' },
  { name: 'Linux', role: 'Server Administration & Shell Scripting' },
  { name: 'FAISS', role: 'Vector Indexing & Similarity Search' },
  { name: 'LangGraph', role: 'Multi-Agent State Graph Orchestration' },
];

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'ai',
    name: 'AI & Intelligence',
    icon: <Cpu size={18} className="text-pink-400" />,
    tagline: 'Autonomous agents, semantic retrieval, and document extraction engines.',
    items: [
      {
        name: 'LLMs',
        description: 'Prompt engineering, structured output formatting, and context window optimization.',
        isPrimary: true,
        useCases: ['DIZCLSR rumour detection', 'Resume Analyzer scoring', 'PDF Chatbot queries'],
      },
      {
        name: 'AI Agents',
        description: 'Multi-step autonomous execution loops with tool access and decision checkpoints.',
        isPrimary: true,
        useCases: ['CP-KYC compliance investigation', 'Autonomous document extraction'],
      },
      {
        name: 'LangGraph',
        description: 'Deterministic state-machine multi-agent workflows with cyclic verification loops.',
        isPrimary: true,
        useCases: ['KYC verification graph', 'Understand-Reason-Act loop'],
      },
      {
        name: 'RAG',
        description: 'Retrieval-Augmented Generation combining semantic search with source attribution.',
        isPrimary: true,
        useCases: ['PDF Chatbot RAG', 'Technical manual query engine'],
      },
      {
        name: 'Embeddings',
        description: 'Vector representation of text for dense similarity search and clustering.',
        isPrimary: true,
        useCases: ['Resume skill alignment', 'Semantic disclosure linking'],
      },
      {
        name: 'Document Intelligence',
        description: 'Layout-aware text, table, and resolution extraction from heterogeneous PDFs.',
        isPrimary: true,
        useCases: ['DIZCLSR Document Engine', 'BSE/NSE announcement parsing'],
      },
    ],
  },
  {
    id: 'backend',
    name: 'Backend Engineering',
    icon: <Server size={18} className="text-cyan-400" />,
    tagline: 'High-throughput async APIs, service contracts, and robust persistence.',
    items: [
      {
        name: 'Python',
        description: 'Primary language for core backend systems, automation, and AI workflows.',
        isPrimary: true,
        useCases: ['DIZCLSR backend', 'CP-KYC services', 'Android device orchestrator'],
      },
      {
        name: 'FastAPI',
        description: 'High-performance async REST framework with automatic OpenAPI and Pydantic validation.',
        isPrimary: true,
        useCases: ['40% response-time optimization in CP-KYC', 'Document processing endpoints'],
      },
      {
        name: 'Node.js',
        description: 'Event-driven server runtime for real-time WebSocket pipelines and web services.',
        isPrimary: true,
        useCases: ['TeamSphere Gateway', 'OT Scheduler API', 'Real-time sync'],
      },
      {
        name: 'REST APIs',
        description: 'Strict HTTP interface design, pagination, error schemas, and authentication.',
        isPrimary: true,
        useCases: ['Public exchange integrations', 'Enterprise client portals'],
      },
      {
        name: 'PostgreSQL',
        description: 'Primary relational database for ACID transactions, foreign keys, and indexing.',
        isPrimary: true,
        useCases: ['DIZCLSR disclosures', 'CP-KYC audit logs', 'OT Scheduler rosters'],
      },
      {
        name: 'SQLAlchemy',
        description: 'Python ORM and query builder for robust schema migrations and connection pooling.',
        isPrimary: false,
        useCases: ['FastAPI relational models', 'Disclose relation persistence'],
      },
    ],
  },
  {
    id: 'frontend',
    name: 'Frontend Engineering',
    icon: <Layers size={18} className="text-purple-400" />,
    tagline: 'Responsive modern interfaces, state architecture, and accessible web experiences.',
    items: [
      {
        name: 'React',
        description: 'Component architecture, custom hooks, reactive state, and performance optimization.',
        isPrimary: true,
        useCases: ['Portfolio cockpit HUD', 'TeamSphere interactive workspace', 'OT Scheduler grid'],
      },
      {
        name: 'TypeScript',
        description: 'Strict interface contracts, end-to-end type safety, and clean API payload modeling.',
        isPrimary: true,
        useCases: ['Full portfolio codebase', 'TeamSphere frontend', 'Contract schemas'],
      },
      {
        name: 'Next.js',
        description: 'SSR, static generation, modern routing, and SEO optimization best practices.',
        isPrimary: false,
        useCases: ['Web portals', 'Full-stack applications with server components'],
      },
      {
        name: 'Vite',
        description: 'High-speed build tooling, hot module replacement, and modern asset bundling.',
        isPrimary: false,
        useCases: ['Fast developer workflow', 'Production SPA distribution'],
      },
      {
        name: 'HTML & CSS',
        description: 'Semantic HTML5, CSS Grid, Flexbox, glassmorphism, responsive breakpoints.',
        isPrimary: false,
        useCases: ['Dark HUD themes', 'Custom data tables', 'Micro-animations'],
      },
    ],
  },
  {
    id: 'infrastructure',
    name: 'Infrastructure & Automation',
    icon: <ShieldCheck size={18} className="text-green-400" />,
    tagline: 'Containerization, hardware orchestration, and self-healing worker pools.',
    items: [
      {
        name: 'Docker',
        description: 'Multi-stage container builds, reproducible environments, and Docker Compose.',
        isPrimary: false,
        useCases: ['Microservice containerization', 'Reproducible scraping sandboxes'],
      },
      {
        name: 'Linux',
        description: 'Unix shell environments, server deployment, process managers, and cron tasks.',
        isPrimary: false,
        useCases: ['Production server management', 'Background daemon hosting'],
      },
      {
        name: 'Git',
        description: 'Collaborative version control, feature branches, semantic commits, and PR reviews.',
        isPrimary: false,
        useCases: ['Repository management', 'CI/CD pipeline triggers'],
      },
      {
        name: 'Background Workers',
        description: 'Asynchronous task dispatchers, job queues, and scheduled polling services.',
        isPrimary: true,
        useCases: ['BSE/NSE feed polling', 'Android device task queues'],
      },
      {
        name: 'Automation',
        description: 'Android orchestration via ADB, UI verification watchdogs, proxy pools.',
        isPrimary: true,
        useCases: ['Device fleet orchestration', 'Headless verification runs'],
      },
    ],
  },
  {
    id: 'data',
    name: 'Data & Storage',
    icon: <Database size={18} className="text-yellow-400" />,
    tagline: 'Relational data modeling, vector stores, and automated ingestion pipelines.',
    items: [
      {
        name: 'PostgreSQL',
        description: 'Complex queries, indexes, relational constraints, and transaction isolation.',
        isPrimary: true,
        useCases: ['Production financial disclosures', 'KYC entity registries'],
      },
      {
        name: 'MongoDB',
        description: 'Flexible document store for real-time collaboration logs and semi-structured payloads.',
        isPrimary: false,
        useCases: ['TeamSphere message logs', 'Transient scraping cache'],
      },
      {
        name: 'FAISS',
        description: 'High-speed vector similarity library for low-latency embedding indexing.',
        isPrimary: false,
        useCases: ['Resume candidate matching', 'Document semantic search'],
      },
      {
        name: 'Web Scraping',
        description: 'Resilient web data extraction with proxy rotation, session handling, and CAPTCHA avoidance.',
        isPrimary: true,
        useCases: ['70% reduction in manual data collection', 'Public registry extraction'],
      },
      {
        name: 'Data Pipelines',
        description: 'ETL flows transforming raw exchange disclosures into normalized relational structures.',
        isPrimary: true,
        useCases: ['BSE/NSE market ingestion', 'Document Engine extraction pipeline'],
      },
    ],
  },
];

interface SkillsProps {
  selectedSkill?: string | null;
  setSelectedSkill?: (skill: string | null) => void;
}

export const Skills: React.FC<SkillsProps> = () => {
  const [activeCategory, setActiveCategory] = useState<string>('ai');

  const currentCategory = SKILL_CATEGORIES.find((c) => c.id === activeCategory) || SKILL_CATEGORIES[0];

  return (
    <div className="w-full flex flex-col gap-8 font-mono text-slate-200">
      {/* Section Header */}
      <SectionHeader
        tag="03"
        label="TECHNICAL PROFICIENCY"
        title="Engineering Tech Stack & Specialization"
        subtitle="Categorized engineering capabilities organized by architectural domain. (No subjective percentage bars)."
      />

      {/* TECH STACK VISUAL HIERARCHY BANNER */}
      <div
        className="hud-panel p-6 border border-cyan-500/30 flex flex-col gap-6"
        style={{
          background: 'linear-gradient(180deg, rgba(8, 10, 31, 0.9) 0%, rgba(3, 4, 15, 0.95) 100%)',
        }}
      >
        {/* Primary Stack */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-300 tracking-wider">
              <Sparkles size={14} className="text-cyan-400" />
              PRIMARY STACK // CORE PRODUCTION TOOLS
            </div>
            <span className="text-[10px] text-cyan-400 font-bold uppercase">HIGHEST DEPTH</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2.5">
            {PRIMARY_STACK.map((item) => (
              <div
                key={item.name}
                className="p-3 rounded bg-cyan-950/30 border border-cyan-500/40 hover:border-cyan-400 transition-colors flex flex-col justify-between"
              >
                <div
                  className="text-sm font-black text-white"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {item.name}
                </div>
                <div className="text-[9px] text-slate-400 font-sans leading-tight mt-1">
                  {item.role}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Secondary Stack */}
        <div className="flex flex-col gap-3 pt-2 border-t border-slate-800/80">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 tracking-wider">
              <Terminal size={14} className="text-purple-400" />
              SECONDARY STACK // SUPPORTING & INFRASTRUCTURE TOOLS
            </div>
            <span className="text-[10px] text-slate-500 uppercase">EXPERIENCED & DEPLOYED</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2.5">
            {SECONDARY_STACK.map((item) => (
              <div
                key={item.name}
                className="p-2.5 rounded bg-slate-950/60 border border-slate-800 hover:border-slate-700 transition-colors flex flex-col justify-between"
              >
                <div className="text-xs font-bold text-slate-200">{item.name}</div>
                <div className="text-[9px] text-slate-500 font-sans leading-tight mt-1">
                  {item.role}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CATEGORIZED COMPETENCIES TABS */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {SKILL_CATEGORIES.map((cat) => {
            const isActive = cat.id === activeCategory;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  spaceAudio.playClick();
                  setActiveCategory(cat.id);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(0,255,216,0.3)]'
                    : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                {cat.icon}
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Category Description */}
        <div className="text-xs text-slate-400 font-sans">
          <span className="text-cyan-400 font-mono font-bold">{currentCategory.name}: </span>
          {currentCategory.tagline}
        </div>

        {/* Category Items Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="wait">
            {currentCategory.items.map((item, idx) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: idx * 0.05 }}
                className="hud-panel p-5 border border-slate-800 hover:border-cyan-500/40 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4
                      className="text-base font-bold text-white"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {item.name}
                    </h4>
                    {item.isPrimary && (
                      <span className="text-[9px] px-1.5 py-0.5 bg-cyan-950 border border-cyan-500/40 text-cyan-300 rounded uppercase font-bold">
                        CORE
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                <div className="border-t border-slate-800/80 pt-3">
                  <div className="text-[9px] text-slate-500 uppercase mb-1.5 font-bold">
                    PRODUCTION USE CASES:
                  </div>
                  <ul className="flex flex-col gap-1 text-[11px] text-slate-400 font-sans">
                    {item.useCases.map((uc, uIdx) => (
                      <li key={uIdx} className="flex items-center gap-1.5">
                        <span className="text-cyan-400 text-[10px]">›</span>
                        <span>{uc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Skills;
