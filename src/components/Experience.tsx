import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SectionHeader } from './About';
import { Briefcase, Calendar, ChevronRight } from 'lucide-react';

const EXPERIENCES = [
  {
    role: 'Frontend Developer',
    company: 'Current Role',
    period: '2025 – Present',
    type: 'Full-Time',
    color: 'var(--cyber-cyan)',
    icon: '💻',
    description: 'Leading frontend development for enterprise-grade applications, building scalable and performant UI systems.',
    achievements: [
      'Architected dashboard UI consuming 15+ REST APIs with real-time data updates',
      'Reduced bundle size by 40% through code splitting and lazy loading strategies',
      'Built reusable component library adopted across 3 product teams',
      'Implemented JWT-based auth with role-based access control system',
      'Collaborated with backend team to design and optimize API contracts',
    ],
    tech: ['React', 'TypeScript', 'REST APIs', 'JWT', 'Tailwind', 'Vite'],
  },
  {
    role: 'Full Stack Web Dev Intern',
    company: "Jovac's JVAC",
    period: 'Jun 2024 – Jul 2024',
    type: 'Internship',
    color: 'var(--cyber-green)',
    icon: '🚀',
    description: 'Built full-stack web applications and participated in production code reviews and QA processes.',
    achievements: [
      'Developed 4+ web applications using JavaScript, HTML/CSS, and Node.js',
      'Participated in code reviews and testing for quality assurance',
      'Debugged and troubleshot production issues, reducing bug count by 30%',
      'Collaborated with a team of 8 on responsive, dynamic web solutions',
    ],
    tech: ['JavaScript', 'Node.js', 'HTML/CSS', 'MongoDB', 'Express.js'],
  },
  {
    role: 'Operation In-Charge',
    company: 'Previous Organization',
    period: '2023 – 2024',
    type: 'Part-Time',
    color: 'var(--cyber-yellow)',
    icon: '⚡',
    description: 'Managed operations and implemented digital solutions to streamline workflows and improve efficiency.',
    achievements: [
      'Led a team of 5, improving operational efficiency by 25%',
      'Automated manual reporting workflows using Python scripts',
      'Implemented digital tracking system reducing errors by 60%',
      'Trained new team members on technical tools and processes',
    ],
    tech: ['Python', 'Automation', 'Process Management', 'Reporting'],
  },
  {
    role: 'Independent AI Developer',
    company: 'Freelance / Open Source',
    period: '2024 – Present',
    type: 'Freelance',
    color: 'var(--cyber-pink)',
    icon: '🤖',
    description: 'Building AI-powered applications and automation systems independently, pushing the frontier of AI engineering.',
    achievements: [
      'Built CP-KYC — KYC automation platform with AI scraping agents',
      'Developed PDF Chatbot using RAG architecture and vector embeddings',
      'Created Resume Analyzer with OpenAI API and NLP pipelines',
      'Contributed to open-source AI tooling and automation projects',
    ],
    tech: ['Python', 'OpenAI', 'LangChain', 'FastAPI', 'PostgreSQL', 'RAG'],
  },
];

const ExperienceCard: React.FC<{
  exp: typeof EXPERIENCES[0]; index: number; isInView: boolean;
}> = ({ exp, index, isInView }) => {
  const isLeft = index % 2 === 0;

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 60px 1fr',
      gap: 0,
      marginBottom: 0,
      alignItems: 'start',
    }} className="timeline-row">
      {/* Left content */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -50 : 0 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.15 }}
        style={{ padding: '0 32px 40px 0', ...(isLeft ? {} : { visibility: 'hidden' }) }}
      >
        {isLeft && <ExpCard exp={exp} />}
      </motion.div>

      {/* Timeline center */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: index * 0.15 + 0.2, type: 'spring' }}
          style={{
            width: 48, height: 48, borderRadius: '50%',
            background: `${exp.color}20`,
            border: `2px solid ${exp.color}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20,
            boxShadow: `0 0 20px ${exp.color}40`,
            flexShrink: 0, zIndex: 2, position: 'relative',
          }}
        >
          {exp.icon}
        </motion.div>
        <div style={{
          flex: 1, width: 2, minHeight: 40,
          background: `linear-gradient(to bottom, ${exp.color}60, transparent)`,
        }} />
      </div>

      {/* Right content */}
      <motion.div
        initial={{ opacity: 0, x: !isLeft ? 50 : 0 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.15 }}
        style={{ padding: '0 0 40px 32px', ...(!isLeft ? {} : { visibility: 'hidden' }) }}
      >
        {!isLeft && <ExpCard exp={exp} />}
      </motion.div>
    </div>
  );
};

const ExpCard: React.FC<{ exp: typeof EXPERIENCES[0] }> = ({ exp }) => (
  <motion.div
    whileHover={{ y: -4, boxShadow: `0 16px 40px ${exp.color}20` }}
    style={{
      padding: '24px',
      background: 'rgba(10,10,30,0.9)',
      border: `1px solid ${exp.color}30`,
      borderRadius: 12,
      borderLeft: `3px solid ${exp.color}`,
      transition: 'all 0.3s',
      cursor: 'default',
    }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10, flexWrap: 'wrap', marginBottom: 8 }}>
      <div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, color: exp.color, fontWeight: 700, marginBottom: 4 }}>
          {exp.role}
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>
          {exp.company}
        </div>
      </div>
      <div style={{ textAlign: 'right', flexShrink: 0 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 5,
          padding: '3px 10px', borderRadius: 100,
          background: `${exp.color}15`, border: `1px solid ${exp.color}30`,
          fontFamily: 'var(--font-mono)', fontSize: 9, color: exp.color, letterSpacing: '1px',
          marginBottom: 6,
        }}>
          <Calendar size={9} /> {exp.period}
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-muted)', textAlign: 'right' }}>
          {exp.type}
        </div>
      </div>
    </div>

    <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text-muted)', marginBottom: 14, lineHeight: 1.7 }}>
      {exp.description}
    </p>

    <ul style={{ listStyle: 'none', padding: 0, marginBottom: 16 }}>
      {exp.achievements.slice(0, 3).map((ach, i) => (
        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 6, fontFamily: 'var(--font-body)', fontSize: 11, color: '#a0b4c8', lineHeight: 1.5 }}>
          <ChevronRight size={12} color={exp.color} style={{ flexShrink: 0, marginTop: 2 }} />
          {ach}
        </li>
      ))}
    </ul>

    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
      {exp.tech.map(t => (
        <span key={t} style={{
          padding: '3px 9px',
          fontFamily: 'var(--font-mono)', fontSize: 9,
          color: exp.color,
          border: `1px solid ${exp.color}30`,
          borderRadius: 4, letterSpacing: '1px',
          background: `${exp.color}08`,
        }}>
          {t}
        </span>
      ))}
    </div>
  </motion.div>
);

const Experience: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" ref={ref} style={{ padding: '100px 24px', background: 'var(--bg-secondary)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translateX(-50%)', width: 600, height: 400, background: 'radial-gradient(ellipse, rgba(0,212,255,0.03) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <SectionHeader
          tag="03"
          label="EXPERIENCE"
          title="Career Timeline"
          subtitle="Loading work history... 4 entries found."
          isInView={isInView}
        />

        <div style={{ marginTop: 72, position: 'relative' }}>
          {EXPERIENCES.map((exp, i) => (
            <ExperienceCard key={exp.role} exp={exp} index={i} isInView={isInView} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .timeline-row {
            grid-template-columns: 40px 1fr !important;
            gap: 0 !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Experience;
