import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Zap, ShieldCheck, Database, GitMerge, FileText } from 'lucide-react';
import { spaceAudio } from '../utils/audio';

interface HighlightMetric {
  value: string;
  label: string;
  context: string;
  tag: string;
}

const METRICS: HighlightMetric[] = [
  {
    value: '40%',
    label: 'FastAPI Performance Improvement',
    context: 'Optimized async handlers, dependency injection & connection pooling in CP-KYC',
    tag: 'LATENCY OPTIMIZATION',
  },
  {
    value: '70%',
    label: 'Manual Data Collection Reduction',
    context: 'Automated multi-source registry scraping & structured information pipelines',
    tag: 'WORKFLOW AUTOMATION',
  },
  {
    value: '50%',
    label: 'Data Accuracy Improvement',
    context: 'Multi-stage validation gates, Pydantic schemas & schema normalization',
    tag: 'DOCUMENT QUALITY',
  },
  {
    value: '<3m',
    label: 'Automated KYC Verification Cycle',
    context: 'Autonomous multi-agent registry ingestion vs 48-hour manual turnaround',
    tag: 'AGENT VELOCITY',
  },
];

const TECHNICAL_AREAS = [
  {
    icon: <Cpu size={16} className="text-cyan-400" />,
    title: 'AI Agents & LangGraph',
    desc: 'Stateful agent loops with deterministic verification gates & autonomous error recovery.',
  },
  {
    icon: <FileText size={16} className="text-purple-400" />,
    title: 'Document Intelligence',
    desc: 'Layout-aware extraction from unstructured PDFs, tables, resolutions & financial filings.',
  },
  {
    icon: <GitMerge size={16} className="text-green-400" />,
    title: 'BSE/NSE Data Pipelines',
    desc: 'Real-time exchange feed ingestion, SEBI 30(11) rumour detection & entity linking.',
  },
  {
    icon: <Zap size={16} className="text-yellow-400" />,
    title: 'Production FastAPI & Python',
    desc: 'Asynchronous microservices, strict schema validation, task queues & connection pooling.',
  },
  {
    icon: <Database size={16} className="text-cyan-400" />,
    title: 'Automation & Orchestration',
    desc: 'Multi-device Android fleet management, ADB drivers, self-healing recovery & telemetry.',
  },
];

export const EngineeringHighlights: React.FC = () => {
  return (
    <div className="w-full flex flex-col gap-6 font-mono">
      {/* Metrics Banner Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {METRICS.map((metric, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.3 }}
            onMouseEnter={() => spaceAudio.playHover()}
            className="hud-panel p-4 flex flex-col justify-between group hover:border-cyan-400/60 transition-colors"
            style={{ border: '1px solid rgba(var(--cyber-cyan-rgb), 0.2)' }}
          >
            <div>
              <div className="text-[9px] text-cyan-400/80 tracking-widest uppercase mb-1">
                // {metric.tag}
              </div>
              <div
                className="text-3xl font-black tracking-tight text-white group-hover:text-cyan-300 transition-colors"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {metric.value}
              </div>
              <div className="text-xs font-bold text-slate-200 mt-1 mb-2">
                {metric.label}
              </div>
            </div>
            <p className="text-[10px] text-slate-400 font-sans leading-relaxed border-t border-slate-800/80 pt-2">
              {metric.context}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Engineering Focus Pillars */}
      <div
        className="hud-panel p-5 flex flex-col gap-3"
        style={{ border: '1px solid rgba(var(--cyber-cyan-rgb), 0.2)' }}
      >
        <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
          <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-slate-200">
            <ShieldCheck size={14} className="text-cyan-400" />
            CORE ENGINEERING CAPABILITIES // PRODUCTION DEPTH
          </div>
          <span className="text-[9px] text-slate-500 uppercase">SYSTEM ARCHITECTURE</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3 pt-1">
          {TECHNICAL_AREAS.map((area, idx) => (
            <div
              key={idx}
              className="p-3 rounded bg-slate-950/40 border border-slate-800/60 flex flex-col gap-2 hover:border-cyan-500/40 transition-colors"
            >
              <div className="flex items-center gap-2">
                {area.icon}
                <span className="text-[11px] font-bold text-slate-200 font-sans">
                  {area.title}
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-sans leading-relaxed">
                {area.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EngineeringHighlights;
