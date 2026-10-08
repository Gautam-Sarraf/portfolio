import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { spaceAudio } from '../utils/audio';

interface EngineeringNote {
  title: string;
  tag: string;
  coreInsight: string;
  keyPoints: string[];
  status: 'Published Case' | 'Architecture Note' | 'Engineering Draft';
}

const NOTES: EngineeringNote[] = [
  {
    title: 'Building a Document Extraction Pipeline',
    tag: 'DOCUMENT INTELLIGENCE',
    status: 'Architecture Note',
    coreInsight:
      'Extracting data from multi-column financial PDFs requires decoupling pure text/table layout parsing from downstream business rules to keep schemas resilient.',
    keyPoints: [
      'Stateless layout parsing handles diverse PDF generators without assumptions.',
      'Strict Pydantic JSON contracts prevent malformed regulatory data persistence.',
      'Separate extraction workers from relational database transactions.',
    ],
  },
  {
    title: 'Designing Reliable AI Agent Workflows',
    tag: 'AI AGENTS & LANGGRAPH',
    status: 'Architecture Note',
    coreInsight:
      'Autonomous agents in mission-critical compliance must follow deterministic verification cycles: Understand → Reason → Act → Verify → Recover.',
    keyPoints: [
      'Never allow unvalidated LLM output to write directly to production databases.',
      'Stateful graph cycles enable programmatic retries when web scrapers hit rate limits.',
      'Explicit boundary checks eliminate hallucinated corporate registry flags.',
    ],
  },
  {
    title: 'Building Production RAG Systems',
    tag: 'RETRIEVAL AUGMENTED GENERATION',
    status: 'Architecture Note',
    coreInsight:
      'High-precision document Q&A relies less on prompt wizardry and far more on chunk overlap calibration, layout awareness, and source grounding.',
    keyPoints: [
      '200-token chunk overlaps preserve cross-boundary semantic context.',
      'Dense vector similarity combined with BM25 keyword filtering improves recall.',
      'Grounding answers with explicit page and section citations eliminates ambiguity.',
    ],
  },
  {
    title: 'Handling Unstructured Financial Documents',
    tag: 'BSE / NSE INFRASTRUCTURE',
    status: 'Architecture Note',
    coreInsight:
      'Stock exchange disclosures range from modern PDFs to scanned dot-matrix tables. Resilient pipelines require dynamic dual-path OCR & native text extractors.',
    keyPoints: [
      'Automated detection of text-layer quality before falling back to OCR saves compute.',
      'SEBI Regulation 30(11) rumour reconciliation links media queries to formal filings.',
      'Tabular resolution voting data requires deterministic row-column geometry parsing.',
    ],
  },
  {
    title: 'Designing Retry & Recovery Systems',
    tag: 'DEVICE AUTOMATION & ORCHESTRATION',
    status: 'Architecture Note',
    coreInsight:
      'Robust mobile device automation is 20% action execution and 80% proactive state verification and autonomous fault recovery.',
    keyPoints: [
      'Verify view hierarchy before and after every tap or swipe command.',
      'Automated ADB soft-reboots and proxy re-tunnels recover from frozen hardware.',
      'State checkpointing allows paused multi-step workflows to resume seamlessly.',
    ],
  },
  {
    title: 'Building Production FastAPI Services',
    tag: 'BACKEND PERFORMANCE',
    status: 'Architecture Note',
    coreInsight:
      'Achieving high concurrency in Python APIs requires non-blocking async I/O, scoped connection pooling, and offloading heavy document parsing to worker queues.',
    keyPoints: [
      'Offload long-running OCR and LLM reasoning to background task dispatchers.',
      'Connection pooling with asyncpg prevents database saturation during spikes.',
      'Dependency injection guarantees modular testing and deterministic error boundaries.',
    ],
  },
];

export const EngineeringNotes: React.FC = () => {
  return (
    <div className="w-full flex flex-col gap-6 font-mono">
      {/* Top Header */}
      <div
        className="hud-panel p-6 border border-cyan-500/25"
        style={{
          background: 'linear-gradient(180deg, rgba(8, 10, 31, 0.85) 0%, rgba(3, 4, 15, 0.95) 100%)',
        }}
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-cyan-500/10 border border-cyan-400/40 flex items-center justify-center text-cyan-400">
              <BookOpen size={16} />
            </div>
            <div>
              <div className="text-[10px] text-cyan-400 tracking-widest uppercase">// TECHNICAL WRITING & INSIGHTS</div>
              <h2 className="text-2xl font-black text-white" style={{ fontFamily: 'var(--font-display)' }}>
                ENGINEERING NOTES
              </h2>
            </div>
          </div>
          <span className="text-[10px] text-slate-400 px-3 py-1 bg-slate-900 border border-slate-800 rounded">
            SYSTEM DESIGN · ARCHITECTURE INSIGHTS
          </span>
        </div>

        <p className="text-xs text-slate-300 font-sans leading-relaxed max-w-3xl">
          Practical takeaways and engineering design principles derived from building production AI pipelines, high-throughput backend services, document intelligence engines, and automated infrastructure.
        </p>
      </div>

      {/* Grid of Engineering Notes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {NOTES.map((note, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
            onMouseEnter={() => spaceAudio.playHover()}
            className="hud-panel p-5 flex flex-col justify-between border border-slate-800 hover:border-cyan-500/50 transition-colors group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[9px] text-cyan-400 font-mono tracking-wider uppercase">
                  // {note.tag}
                </span>
                <span className="text-[9px] text-slate-500 font-mono border border-slate-800 px-1.5 py-0.5 rounded">
                  {note.status}
                </span>
              </div>

              <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors font-sans mb-2">
                {note.title}
              </h3>

              <p className="text-xs text-slate-300 font-sans leading-relaxed mb-4 p-2.5 rounded bg-slate-950/60 border border-slate-800/80">
                {note.coreInsight}
              </p>
            </div>

            <div className="border-t border-slate-800/80 pt-3">
              <div className="text-[10px] text-slate-400 font-mono uppercase mb-2">Key Engineering Principles:</div>
              <ul className="flex flex-col gap-1.5 text-[11px] text-slate-400 font-sans">
                {note.keyPoints.map((pt, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-1.5">
                    <span className="text-cyan-400 font-mono text-[10px] mt-0.5">›</span>
                    <span className="leading-snug">{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default EngineeringNotes;
