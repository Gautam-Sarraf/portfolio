import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Github,
  ExternalLink,
  ShieldAlert,
  Layers,
  Wrench,
  CheckCircle2,
  Lightbulb,
  Cpu,
  ArrowRight,
  Terminal,
} from 'lucide-react';
import { PROJECTS, Project } from '../data/projectsData';
import DocumentEngineSection from './DocumentEngineSection';
import { spaceAudio } from '../utils/audio';

export const ProjectCaseStudy: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();

  const project: Project | undefined = PROJECTS.find(
    (p) => p.slug === projectId || p.id === projectId
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [projectId]);

  if (!project) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center p-8 font-mono">
        <ShieldAlert size={40} className="text-pink-500" />
        <h2 className="text-xl font-bold text-white">PROJECT NOT FOUND</h2>
        <p className="text-xs text-slate-400">The requested case study was not recognized in system memory.</p>
        <Link
          to="/"
          className="px-4 py-2 bg-cyan-500 text-slate-950 font-bold text-xs rounded hover:bg-cyan-400 transition-colors"
        >
          RETURN TO DASHBOARD
        </Link>
      </div>
    );
  }

  // Find next and previous featured projects for navigation
  const featuredProjects = PROJECTS.filter((p) => p.featured);
  const currentIndex = featuredProjects.findIndex((p) => p.id === project.id);
  const prevProject = currentIndex > 0 ? featuredProjects[currentIndex - 1] : null;
  const nextProject = currentIndex < featuredProjects.length - 1 ? featuredProjects[currentIndex + 1] : null;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 flex flex-col gap-8 font-mono text-slate-200">
      {/* Top Breadcrumb Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <Link
          to="/"
          onClick={() => spaceAudio.playClick()}
          className="inline-flex items-center gap-2 text-xs text-cyan-400 hover:text-cyan-300 transition-colors font-bold group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          <span>BACK TO SYSTEM DASHBOARD</span>
        </Link>

        <div className="flex items-center gap-2 text-[10px] text-slate-400">
          <span>CASE STUDY //</span>
          <span className="text-cyan-400 font-bold uppercase">{project.title}</span>
        </div>
      </div>

      {/* Case Study Header Banner */}
      <div
        className="hud-panel p-6 md:p-8 border border-cyan-500/30"
        style={{
          background: 'linear-gradient(180deg, rgba(8, 10, 31, 0.95) 0%, rgba(3, 4, 15, 0.98) 100%)',
        }}
      >
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <span className="px-2.5 py-1 bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-[10px] rounded uppercase font-bold tracking-wider">
            FEATURED CASE STUDY · TIER 1
          </span>
          <span className="text-[10px] text-slate-400 font-mono uppercase">
            CATEGORY: <span className="text-slate-200 font-bold">{project.category}</span>
          </span>
        </div>

        <h1
          className="text-3xl md:text-5xl font-black text-white tracking-tight mb-2"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {project.title}
        </h1>
        <div className="text-base md:text-xl text-cyan-400 font-sans font-medium mb-4">
          {project.subtitle}
        </div>

        <p className="text-sm md:text-base text-slate-300 font-sans leading-relaxed max-w-3xl mb-6">
          {project.description}
        </p>

        {/* Tech Stack Chips */}
        <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-800">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-[10px] px-2.5 py-1 bg-slate-950 border border-slate-800 text-slate-300 rounded font-mono"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Action CTAs */}
        <div className="flex flex-wrap gap-4 mt-6 pt-4 border-t border-slate-800/80">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border border-cyan-500/40 text-cyan-400 hover:bg-cyan-500 hover:text-slate-950 text-xs font-bold rounded transition-colors"
            >
              <Github size={14} /> GITHUB REPOSITORY
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500 text-slate-950 text-xs font-bold rounded hover:bg-cyan-400 transition-colors"
            >
              <ExternalLink size={14} /> LIVE DEMO
            </a>
          )}
        </div>
      </div>

      {/* Structured Case Study Sections */}
      <div className="flex flex-col gap-8">
        {/* 1. Problem */}
        <section className="hud-panel p-6 border border-slate-800">
          <div className="flex items-center gap-2 text-xs font-bold text-pink-400 tracking-wider uppercase mb-3">
            <ShieldAlert size={16} />
            01 // THE PROBLEM & MOTIVATION
          </div>
          <p className="text-sm text-slate-300 font-sans leading-relaxed">
            {project.problem}
          </p>
        </section>

        {/* 2. Context & 3. My Role */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section className="hud-panel p-6 border border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 tracking-wider uppercase mb-3">
              <Terminal size={16} />
              02 // PROJECT CONTEXT
            </div>
            <p className="text-sm text-slate-300 font-sans leading-relaxed">
              {project.context}
            </p>
          </section>

          <section className="hud-panel p-6 border border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-green-400 tracking-wider uppercase mb-3">
              <Cpu size={16} />
              03 // MY ENGINEERING ROLE
            </div>
            <p className="text-sm text-slate-300 font-sans leading-relaxed">
              {project.myRole}
            </p>
          </section>
        </div>

        {/* 4. Architecture */}
        <section className="hud-panel p-6 border border-slate-800">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
            <div className="flex items-center gap-2 text-xs font-bold text-yellow-400 tracking-wider uppercase">
              <Layers size={16} />
              04 // SYSTEM ARCHITECTURE
            </div>
            <span className="text-[10px] text-slate-500 uppercase">HIGH-LEVEL BLUEPRINT</span>
          </div>

          <p className="text-sm text-slate-300 font-sans leading-relaxed mb-4">
            {project.architecture}
          </p>

          {project.architectureDiagram && (
            <div className="p-4 rounded bg-slate-950 border border-slate-800/80 overflow-x-auto text-xs text-cyan-300 font-mono leading-relaxed">
              <pre className="whitespace-pre">{project.architectureDiagram}</pre>
            </div>
          )}
        </section>

        {/* Special Document Engine Breakdown for DIZCLSR */}
        {project.id === 'dizclsr' && (
          <section>
            <DocumentEngineSection />
          </section>
        )}

        {/* 5. Technical Challenges & 6. Implementation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section className="hud-panel p-6 border border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-orange-400 tracking-wider uppercase mb-3">
              <Wrench size={16} />
              05 // TECHNICAL CHALLENGES
            </div>
            <p className="text-sm text-slate-300 font-sans leading-relaxed">
              {project.challenges}
            </p>
          </section>

          <section className="hud-panel p-6 border border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-purple-400 tracking-wider uppercase mb-3">
              <Cpu size={16} />
              06 // IMPLEMENTATION & SOLUTION
            </div>
            <p className="text-sm text-slate-300 font-sans leading-relaxed">
              {project.solution}
            </p>
          </section>
        </div>

        {/* 7. Results & Verified Metrics */}
        <section className="hud-panel p-6 border border-cyan-500/20">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
            <div className="flex items-center gap-2 text-xs font-bold text-green-400 tracking-wider uppercase">
              <CheckCircle2 size={16} />
              07 // MEASURABLE RESULTS & IMPACT
            </div>
            <span className="text-[10px] text-slate-500 uppercase">VERIFIED OUTCOMES</span>
          </div>

          <p className="text-sm text-slate-300 font-sans leading-relaxed mb-6">
            {project.results}
          </p>

          {project.metrics && project.metrics.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {project.metrics.map((m, mIdx) => (
                <div
                  key={mIdx}
                  className="p-3.5 rounded bg-slate-950/70 border border-slate-800 flex flex-col gap-1"
                >
                  <div className="text-[10px] text-slate-400 uppercase">{m.label}</div>
                  <div
                    className="text-2xl font-black text-cyan-300"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {m.value}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* 8. Lessons Learned */}
        <section className="hud-panel p-6 border border-slate-800">
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 tracking-wider uppercase mb-3">
            <Lightbulb size={16} />
            08 // ENGINEERING LESSONS LEARNED
          </div>
          <p className="text-sm text-slate-300 font-sans leading-relaxed">
            {project.lessonsLearned}
          </p>
        </section>
      </div>

      {/* Bottom Next/Previous Project Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-800">
        {prevProject ? (
          <Link
            to={`/projects/${prevProject.slug}`}
            onClick={() => spaceAudio.playClick()}
            className="flex items-center gap-2 text-xs text-slate-300 hover:text-cyan-400 transition-colors p-3 rounded bg-slate-950 border border-slate-800"
          >
            <ArrowLeft size={14} />
            <div>
              <div className="text-[9px] text-slate-500 uppercase">PREVIOUS CASE STUDY</div>
              <div className="font-bold">{prevProject.title}</div>
            </div>
          </Link>
        ) : (
          <div />
        )}

        {nextProject ? (
          <Link
            to={`/projects/${nextProject.slug}`}
            onClick={() => spaceAudio.playClick()}
            className="flex items-center gap-2 text-xs text-slate-300 hover:text-cyan-400 transition-colors p-3 rounded bg-slate-950 border border-slate-800 text-right"
          >
            <div>
              <div className="text-[9px] text-slate-500 uppercase">NEXT CASE STUDY</div>
              <div className="font-bold">{nextProject.title}</div>
            </div>
            <ArrowRight size={14} />
          </Link>
        ) : (
          <Link
            to="/"
            onClick={() => spaceAudio.playClick()}
            className="flex items-center gap-2 text-xs text-cyan-400 hover:text-cyan-300 transition-colors p-3 rounded bg-slate-950 border border-slate-800"
          >
            <span>BACK TO HOME</span>
            <ArrowRight size={14} />
          </Link>
        )}
      </div>
    </div>
  );
};

export default ProjectCaseStudy;
