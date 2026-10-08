import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Terminal,
  Cpu,
  Server,
  Layers,
  Database,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';
import { spaceAudio } from '../utils/audio';

export interface SectionHeaderProps {
  tag: string;
  label: string;
  title: string;
  subtitle: string;
  isInView?: boolean;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  tag,
  label,
  title,
  subtitle,
}) => {
  return (
    <div className="flex flex-col gap-1 mb-8 font-mono">
      <div className="flex items-center gap-2 text-[10px] text-cyan-400 font-bold uppercase tracking-widest">
        <span>[{tag}]</span>
        <span>// {label}</span>
      </div>
      <h2
        className="text-2xl sm:text-3xl font-black text-white tracking-tight"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {title}
      </h2>
      <p className="text-xs text-slate-400 font-sans">{subtitle}</p>
    </div>
  );
};

const WORK_DOMAINS = [
  {
    icon: <Layers size={18} className="text-cyan-400" />,
    name: 'Frontend',
    desc: 'React, TypeScript, Next.js, Vite, Tailwind CSS, accessible component trees & responsive interaction.',
  },
  {
    icon: <Server size={18} className="text-purple-400" />,
    name: 'Backend',
    desc: 'Python, FastAPI, Node.js, Express, async I/O, OpenAPI schemas, and low-latency microservices.',
  },
  {
    icon: <Cpu size={18} className="text-pink-400" />,
    name: 'AI & Agents',
    desc: 'LangGraph multi-agent loops, LLM tool calling, RAG pipelines, embeddings & prompt orchestration.',
  },
  {
    icon: <RefreshCw size={18} className="text-green-400" />,
    name: 'Automation',
    desc: 'Android device orchestration via ADB, UI verification, headless scrapers & retry workflows.',
  },
  {
    icon: <Database size={18} className="text-yellow-400" />,
    name: 'Data & Storage',
    desc: 'PostgreSQL relational schemas, MongoDB document stores, FAISS vector indexing & ETL pipelines.',
  },
  {
    icon: <ShieldCheck size={18} className="text-blue-400" />,
    name: 'Infrastructure',
    desc: 'Docker containerization, Linux environments, Git version control, background task workers.',
  },
];

const PHILOSOPHY_STEPS = [
  {
    step: '01',
    name: 'Understand',
    color: 'text-cyan-400',
    desc: 'Ingest raw, unstructured documents, market feeds, or system states without biased assumptions.',
  },
  {
    step: '02',
    name: 'Reason',
    color: 'text-purple-400',
    desc: 'Evaluate data constraints, compute embeddings, and plan multi-step execution graphs.',
  },
  {
    step: '03',
    name: 'Act',
    color: 'text-green-400',
    desc: 'Execute deterministic operations, call APIs, extract tabular records, or interact with device interfaces.',
  },
  {
    step: '04',
    name: 'Verify',
    color: 'text-yellow-400',
    desc: 'Run programmatic schema audits, UI hierarchy inspections, and eliminate hallucinations before persisting.',
  },
  {
    step: '05',
    name: 'Recover',
    color: 'text-orange-400',
    desc: 'Gracefully handle transient network drops, rate limits, and drift via autonomous retry and failover watchdogs.',
  },
];

export const About: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div ref={ref} className="w-full flex flex-col gap-8 font-mono text-slate-200">
      {/* Overview Card */}
      <div
        className="hud-panel p-6 md:p-8 border border-cyan-500/25"
        style={{
          background: 'linear-gradient(180deg, rgba(8, 10, 31, 0.85) 0%, rgba(3, 4, 15, 0.95) 100%)',
        }}
      >
        <SectionHeader
          tag="01"
          label="ABOUT ME"
          title="Full Stack Engineer · AI & Backend Specialist"
          subtitle="Architecting resilient software systems across the full product stack."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-sans">
          {/* Main Positioning Text */}
          <div className="lg:col-span-2 flex flex-col gap-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <p className="bg-slate-950/60 p-4 rounded border border-slate-800/80 text-white font-medium">
              I'm a <span className="text-cyan-300 font-bold">Full Stack Engineer</span> specializing in{' '}
              <span className="text-purple-300 font-bold">AI and backend systems</span>. I build applications that combine modern frontend experiences with scalable APIs, intelligent automation, data pipelines, and AI-powered workflows.
            </p>
            <p className="text-slate-400">
              Rather than viewing software as isolated layers, I bridge the entire lifecycle: from intuitive React interfaces to high-throughput FastAPI services, background worker pools, document parsing engines, and relational PostgreSQL persistence.
            </p>
            <p className="text-slate-400">
              My engineering philosophy focuses on building robust systems that remain predictable under real-world constraints—handling unformatted PDF disclosures, rate-limited public APIs, and complex state synchronization with zero tolerance for silent failures.
            </p>
          </div>

          {/* Quick Identity Block */}
          <div className="p-4 rounded bg-slate-950/70 border border-slate-800 flex flex-col justify-between font-mono text-[11px]">
            <div>
              <div className="text-[10px] text-cyan-400 border-b border-slate-800 pb-2 mb-3 font-bold">
                // SYSTEM IDENTIFIERS
              </div>
              <div className="flex flex-col gap-2.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">OPERATOR:</span>
                  <span className="text-white font-bold">Gautam Sarraf</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">ORIGIN:</span>
                  <span className="text-slate-300">Birgunj, Nepal</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">ACADEMICS:</span>
                  <span className="text-yellow-400 font-bold">B.Tech CSE (GLA Univ.)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">STANDING:</span>
                  <span className="text-green-400 font-bold">Dean's List · CPI 7.63</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">CURRENT STATUS:</span>
                  <span className="text-cyan-400 font-bold">Software Engineer</span>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-800 pt-3 mt-3 text-[10px] text-slate-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Active in Production Development
            </div>
          </div>
        </div>
      </div>

      {/* Philosophy: Understand -> Reason -> Act -> Verify -> Recover */}
      <div className="hud-panel p-6 border border-cyan-500/20">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3 mb-6">
          <div className="flex items-center gap-2 text-xs font-bold text-white tracking-wider">
            <Terminal size={14} className="text-cyan-400" />
            ENGINEERING PHILOSOPHY // THE 5-STAGE SYSTEM LOOP
          </div>
          <span className="text-[10px] text-cyan-300 font-mono">DETERMINISTIC & RESILIENT</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {PHILOSOPHY_STEPS.map((step, idx) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: idx * 0.1 }}
              onMouseEnter={() => spaceAudio.playHover()}
              className="p-3.5 rounded bg-slate-950/60 border border-slate-800 hover:border-cyan-400/50 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono text-slate-500 font-bold">STAGE {step.step}</span>
                  <span className={`text-xs font-bold font-mono ${step.color}`}>{step.name}</span>
                </div>
                <div className="h-0.5 w-full bg-slate-800 mb-2 mt-1">
                  <div className={`h-full ${step.color.replace('text-', 'bg-')} w-2/3`} />
                </div>
                <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Cross-Stack Engineering Domains */}
      <div className="hud-panel p-6 border border-slate-800">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-200 tracking-wider">
            <Cpu size={14} className="text-purple-400" />
            CROSS-STACK SCOPE // TECHNICAL CAPABILITIES
          </div>
          <span className="text-[10px] text-slate-500 uppercase">END-TO-END BREADTH</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {WORK_DOMAINS.map((domain, idx) => (
            <div
              key={idx}
              className="p-4 rounded bg-slate-950/50 border border-slate-800/80 flex flex-col gap-1.5 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center gap-2 text-sm font-bold text-white font-sans">
                {domain.icon}
                <span>{domain.name}</span>
              </div>
              <p className="text-xs text-slate-400 font-sans leading-relaxed">
                {domain.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;