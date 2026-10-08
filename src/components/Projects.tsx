import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Github,
  Layers,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { PROJECTS } from '../data/projectsData';
import { SectionHeader } from './About';
import DocumentEngineSection from './DocumentEngineSection';
import { spaceAudio } from '../utils/audio';

export const Projects: React.FC = () => {
  const [filterCategory, setFilterCategory] = useState<string>('ALL');

  const featuredProjects = PROJECTS.filter((p) => p.featured && p.tier === 1);
  const otherProjects = PROJECTS.filter((p) => !p.featured);

  const categories = ['ALL', 'AI / Backend', 'Automation / Infrastructure', 'Full Stack', 'Data / RAG'];

  const filteredOther =
    filterCategory === 'ALL'
      ? otherProjects
      : otherProjects.filter((p) => p.category === filterCategory);

  return (
    <div className="w-full flex flex-col gap-10 font-mono text-slate-200">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <SectionHeader
          tag="02"
          label="PORTFOLIO WORK"
          title="Featured Systems & Production Engineering"
          subtitle="Tiered portfolio showcasing production AI architectures, backend systems, and full-stack software."
        />
      </div>

      {/* TIER 1: FEATURED PROJECTS */}
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between border-b border-cyan-500/30 pb-2">
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 tracking-wider">
            <Sparkles size={14} className="text-cyan-400" />
            TIER 1 // FLAGSHIP & PRODUCTION ARCHITECTURES
          </div>
          <span className="text-[10px] text-slate-500 font-mono">HIGH-IMPACT SYSTEMS</span>
        </div>

        {/* Featured Project Cards - Substantial Visual Space */}
        <div className="flex flex-col gap-8">
          {featuredProjects.map((project, idx) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="hud-panel p-6 md:p-8 border border-cyan-500/30 flex flex-col gap-6 relative group hover:border-cyan-400/60 transition-colors"
              style={{
                background: 'linear-gradient(180deg, rgba(8, 10, 31, 0.9) 0%, rgba(3, 4, 15, 0.96) 100%)',
              }}
            >
              {/* Top Banner Meta */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 bg-cyan-950/80 border border-cyan-400/40 text-cyan-300 text-[10px] rounded font-bold">
                    0{idx + 1} // FEATURED
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase font-mono">
                    {project.category}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-cyan-300 text-xs flex items-center gap-1 transition-colors"
                      aria-label={`${project.title} GitHub repo`}
                    >
                      <Github size={14} /> GITHUB
                    </a>
                  )}
                  <Link
                    to={`/projects/${project.slug}`}
                    onClick={() => spaceAudio.playClick()}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-500 text-slate-950 hover:bg-cyan-400 text-xs font-bold rounded transition-colors"
                  >
                    READ CASE STUDY <ArrowRight size={12} />
                  </Link>
                </div>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h3
                  className="text-2xl sm:text-3xl font-black text-white group-hover:text-cyan-300 transition-colors"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {project.title}
                </h3>
                <div className="text-sm font-sans font-semibold text-cyan-400 mt-1">
                  {project.subtitle}
                </div>
                <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed mt-3 max-w-4xl">
                  {project.description}
                </p>
              </div>

              {/* Problem, Context & Role Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans">
                <div className="p-3.5 rounded bg-slate-950/70 border border-slate-800/80 flex flex-col gap-1.5">
                  <span className="text-[10px] font-mono text-pink-400 font-bold uppercase tracking-wider">
                    // THE PROBLEM
                  </span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">{project.problem}</p>
                </div>

                <div className="p-3.5 rounded bg-slate-950/70 border border-slate-800/80 flex flex-col gap-1.5">
                  <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
                    // CONTEXT
                  </span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">{project.context}</p>
                </div>

                <div className="p-3.5 rounded bg-slate-950/70 border border-slate-800/80 flex flex-col gap-1.5">
                  <span className="text-[10px] font-mono text-green-400 font-bold uppercase tracking-wider">
                    // MY ROLE
                  </span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">{project.myRole}</p>
                </div>
              </div>

              {/* Visual Architecture Schematic Box */}
              {project.architectureDiagram && (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span className="text-yellow-400 font-bold uppercase">// SYSTEM ARCHITECTURE SCHEMATIC</span>
                    <span>FLOW DIAGRAM</span>
                  </div>
                  <div className="p-4 rounded bg-slate-950 border border-slate-800 text-[11px] text-cyan-300 font-mono overflow-x-auto leading-relaxed">
                    <pre className="whitespace-pre">{project.architectureDiagram}</pre>
                  </div>
                </div>
              )}

              {/* Special Document Engine Feature on DIZCLSR card */}
              {project.id === 'dizclsr' && (
                <div className="mt-2">
                  <DocumentEngineSection />
                </div>
              )}

              {/* Challenges, Solution & Results */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
                <div className="p-3.5 rounded bg-slate-950/70 border border-slate-800/80 flex flex-col gap-1.5">
                  <span className="text-[10px] font-mono text-orange-400 font-bold uppercase tracking-wider">
                    // ENGINEERING CHALLENGES
                  </span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">{project.challenges}</p>
                </div>

                <div className="p-3.5 rounded bg-slate-950/70 border border-slate-800/80 flex flex-col gap-1.5">
                  <span className="text-[10px] font-mono text-purple-400 font-bold uppercase tracking-wider">
                    // IMPLEMENTATION & RESULTS
                  </span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    {project.solution} {project.results}
                  </p>
                </div>
              </div>

              {/* Verified Metrics Strip if Available */}
              {project.metrics && project.metrics.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  {project.metrics.map((m, mIdx) => (
                    <div
                      key={mIdx}
                      className="p-3 rounded bg-slate-950/90 border border-cyan-500/20 flex flex-col"
                    >
                      <span className="text-[9px] text-slate-400 uppercase truncate">{m.label}</span>
                      <span
                        className="text-lg font-black text-cyan-300"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Technologies Strip */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/80">
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[9px] px-2 py-0.5 bg-slate-950 border border-slate-800 text-slate-300 rounded font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <Link
                  to={`/projects/${project.slug}`}
                  onClick={() => spaceAudio.playClick()}
                  className="text-xs text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1 font-bold"
                >
                  VIEW FULL ARCHITECTURE BREAKDOWN <ArrowRight size={12} />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* TIER 2: OTHER NOTABLE PROJECTS */}
      <div className="flex flex-col gap-6 pt-4">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-300 tracking-wider">
            <Layers size={14} className="text-purple-400" />
            TIER 2 // OTHER NOTABLE ENGINEERING PROJECTS
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  spaceAudio.playClick();
                  setFilterCategory(cat);
                }}
                className={`px-2.5 py-1 text-[10px] rounded transition-colors font-mono ${
                  filterCategory === cat
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 3-Column Grid for Tier 2 Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {filteredOther.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                onMouseEnter={() => spaceAudio.playHover()}
                className="hud-panel p-5 flex flex-col justify-between border border-slate-800 hover:border-slate-700 transition-colors group"
              >
                <div>
                  <div className="flex items-center justify-between text-[9px] text-slate-400 font-mono mb-2">
                    <span className="text-cyan-400 uppercase font-bold">{project.category}</span>
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-cyan-300 transition-colors"
                        aria-label={`${project.title} GitHub`}
                      >
                        <Github size={13} />
                      </a>
                    )}
                  </div>

                  <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors font-sans mb-1">
                    {project.title}
                  </h4>
                  <div className="text-[10px] text-slate-400 font-mono mb-2.5">{project.subtitle}</div>

                  <p className="text-xs text-slate-300 font-sans leading-relaxed mb-4">
                    {project.description}
                  </p>
                </div>

                <div className="border-t border-slate-800/80 pt-3">
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.primaryTech.map((t) => (
                      <span
                        key={t}
                        className="text-[9px] px-1.5 py-0.5 bg-slate-950 border border-slate-800 text-slate-300 rounded font-mono"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="text-[10px] text-slate-400 font-sans leading-snug">
                    <strong className="text-slate-300 font-mono">Impact: </strong>
                    {project.results}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Projects;
