import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  CheckCircle2,
} from 'lucide-react';
import { SectionHeader } from './About';
import { spaceAudio } from '../utils/audio';

interface ExperienceRecord {
  id: string;
  role: string;
  company: string;
  period: string;
  status: 'CURRENT ROLE' | 'COMPLETED' | 'ACADEMICS';
  type: 'Professional' | 'Training' | 'Education';
  location: string;
  summary: string;
  responsibilities: string[];
  achievements: string[];
  stack: string[];
}

const EXPERIENCES: ExperienceRecord[] = [
  {
    id: 'webninjaz',
    role: 'Software Engineer',
    company: 'Webninjaz Technologies',
    period: 'Sep 2025 – Present',
    status: 'CURRENT ROLE',
    type: 'Professional',
    location: 'Remote / Hybrid',
    summary:
      'Designing and deploying production backend services, AI document extraction pipelines, and full-stack web applications.',
    responsibilities: [
      'Architect and deploy high-performance backend microservices using Python and FastAPI for automated data parsing and document intelligence.',
      'Develop automated data scraping and extraction pipelines to process, normalize, and ingest structured records from target databases and exchange feeds.',
      'Build and optimize responsive client web portals using React, Next.js, and TypeScript, improving cross-device usability and end-to-end performance.',
      'Design Python-based scheduling and workflow automation routines that reduced manual operational overhead by 60–70%.',
    ],
    achievements: [
      'Engineered the core Document Engine module for DIZCLSR to convert unstructured PDF disclosures into structured JSON schemas.',
      'Achieved a 40% response-time speedup in compliance API endpoints through asynchronous refactoring and connection pooling.',
      'Constructed resilient scraping networks with proxy rotation and anti-bot mitigation protocols.',
    ],
    stack: ['Python', 'FastAPI', 'React', 'Next.js', 'TypeScript', 'PostgreSQL', 'Web Scraping', 'Docker', 'REST APIs'],
  },
  {
    id: 'jovac',
    role: 'Full Stack Development Training',
    company: 'JOVAC (GLA University)',
    period: 'June 2024 – July 2024',
    status: 'COMPLETED',
    type: 'Training',
    location: 'Mathura, India',
    summary:
      'Collaborative intensive engineering program focusing on full-stack web architecture, API design, and version control best practices.',
    responsibilities: [
      'Developed multiple interactive web applications utilizing modern JavaScript, Node.js, Express, and HTML5/CSS3.',
      'Constructed backend API endpoints and connected them cleanly with dynamic frontend client interfaces.',
      'Collaborated within peer engineering teams adhering to structured Git feature-branching, PR reviews, and testing routines.',
    ],
    achievements: [
      'Implemented robust server middleware and error-handling routines, boosting application stability.',
      'Delivered full-stack prototypes on strict sprint deadlines.',
    ],
    stack: ['JavaScript', 'Node.js', 'Express.js', 'HTML/CSS', 'Git', 'GitHub', 'REST APIs'],
  },
  {
    id: 'gla',
    role: 'B.Tech in Computer Science and Engineering',
    company: 'GLA University, Mathura',
    period: '2022 – May 2026 (Expected)',
    status: 'ACADEMICS',
    type: 'Education',
    location: 'Mathura, UP, India',
    summary:
      'Rigorous Computer Science track focusing on algorithmic complexity, systems engineering fundamentals, and software architecture.',
    responsibilities: [
      'Maintained consistent Dean\'s List academic standing with a cumulative CPI of 7.63 / 10.0.',
      'Mastered core coursework: Data Structures and Algorithms (DSA), Operating Systems (OS), Database Management Systems (DBMS), Software Engineering, and Web Development.',
    ],
    achievements: [
      'Selected for Dean\'s List for continuous academic performance.',
      'Built 15+ self-directed software projects spanning AI chatbots, scheduling engines, and collaborative suites.',
    ],
    stack: ['C/C++', 'Python', 'Java', 'Data Structures', 'Operating Systems', 'SQL', 'Computer Networks'],
  },
];

interface ExperienceProps {
  selectedIndex?: number;
  setSelectedIndex?: (idx: number) => void;
}

export const Experience: React.FC<ExperienceProps> = ({
  selectedIndex = 0,
  setSelectedIndex,
}) => {
  const [activeIdx, setActiveIdx] = useState(selectedIndex);

  const handleSelect = (idx: number) => {
    spaceAudio.playClick();
    setActiveIdx(idx);
    if (setSelectedIndex) setSelectedIndex(idx);
  };

  const activeExp = EXPERIENCES[activeIdx] || EXPERIENCES[0];

  return (
    <div className="w-full flex flex-col gap-8 font-mono text-slate-200">
      {/* Header */}
      <SectionHeader
        tag="04"
        label="PROFESSIONAL RECORD"
        title="Experience & Engineering History"
        subtitle="Chronological track of professional software engineering, systems training, and computer science foundations."
      />

      {/* Main Experience Layout: Timeline Selector + Detailed Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Timeline Navigation Buttons */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          <div className="text-[10px] text-cyan-400 font-bold tracking-wider uppercase border-b border-slate-800 pb-2">
            // CAREER TIMELINE
          </div>

          <div className="flex flex-col gap-2">
            {EXPERIENCES.map((exp, idx) => {
              const isActive = idx === activeIdx;
              return (
                <button
                  key={exp.id}
                  onClick={() => handleSelect(idx)}
                  onMouseEnter={() => spaceAudio.playHover()}
                  className={`p-4 rounded text-left transition-all flex flex-col gap-1.5 border relative ${
                    isActive
                      ? 'bg-slate-900 border-cyan-400 shadow-[0_0_15px_rgba(0,255,216,0.15)]'
                      : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 text-slate-400'
                  }`}
                >
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-400 rounded-l" />
                  )}

                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-mono text-slate-400">{exp.period}</span>
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${
                        exp.status === 'CURRENT ROLE'
                          ? 'bg-green-950 text-green-400 border border-green-500/40'
                          : exp.status === 'ACADEMICS'
                          ? 'bg-yellow-950 text-yellow-400 border border-yellow-500/40'
                          : 'bg-slate-900 text-slate-400 border border-slate-800'
                      }`}
                    >
                      {exp.status}
                    </span>
                  </div>

                  <div className="text-sm font-bold text-white font-sans mt-0.5">{exp.role}</div>
                  <div className="text-xs text-cyan-300 font-sans">{exp.company}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detailed Experience Card */}
        <div className="lg:col-span-8">
          <motion.div
            key={activeExp.id}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="hud-panel p-6 md:p-8 border border-cyan-500/30 flex flex-col gap-6"
            style={{
              background: 'linear-gradient(180deg, rgba(8, 10, 31, 0.9) 0%, rgba(3, 4, 15, 0.96) 100%)',
            }}
          >
            {/* Header Details */}
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] text-cyan-400 uppercase font-bold tracking-wider">
                    // {activeExp.type.toUpperCase()} MILESTONE
                  </span>
                  <span className="text-slate-600">·</span>
                  <span className="text-[10px] text-slate-400">{activeExp.location}</span>
                </div>
                <h3
                  className="text-2xl font-black text-white"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {activeExp.role}
                </h3>
                <div className="text-sm text-cyan-300 font-sans font-semibold mt-0.5">
                  {activeExp.company}
                </div>
              </div>

              <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-xs text-slate-300">
                <Calendar size={13} className="text-cyan-400" />
                <span>{activeExp.period}</span>
              </div>
            </div>

            {/* Role Summary */}
            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed bg-slate-950/60 p-3.5 rounded border border-slate-800/80">
              {activeExp.summary}
            </p>

            {/* Core Responsibilities */}
            <div className="flex flex-col gap-2.5">
              <div className="text-[10px] text-cyan-400 uppercase tracking-wider font-bold">
                KEY RESPONSIBILITIES:
              </div>
              <ul className="flex flex-col gap-2 text-xs text-slate-300 font-sans">
                {activeExp.responsibilities.map((resp, rIdx) => (
                  <li key={rIdx} className="flex items-start gap-2">
                    <span className="text-cyan-400 font-mono mt-0.5">›</span>
                    <span className="leading-relaxed">{resp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Key Technical Achievements */}
            <div className="flex flex-col gap-2.5 pt-2 border-t border-slate-800/80">
              <div className="text-[10px] text-green-400 uppercase tracking-wider font-bold">
                KEY TECHNICAL ACHIEVEMENTS:
              </div>
              <ul className="flex flex-col gap-2 text-xs text-slate-300 font-sans">
                {activeExp.achievements.map((ach, aIdx) => (
                  <li key={aIdx} className="flex items-start gap-2">
                    <CheckCircle2 size={14} className="text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="leading-relaxed text-slate-200">{ach}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies Used */}
            <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-slate-800/80">
              <span className="text-[10px] text-slate-500 uppercase mr-2">TECH STACK:</span>
              {activeExp.stack.map((t) => (
                <span
                  key={t}
                  className="text-[9px] px-2 py-0.5 bg-slate-950 border border-slate-800 text-slate-300 rounded font-mono"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
