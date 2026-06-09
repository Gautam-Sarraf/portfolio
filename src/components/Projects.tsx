import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { SectionHeader } from './About';
import { Github, ExternalLink, ChevronRight } from 'lucide-react';

const PROJECTS = [
  {
    id: 1,
    title: 'CP-KYC',
    subtitle: 'AI KYC Automation Platform',
    category: ['AI', 'Backend', 'Automation'],
    categoryDisplay: 'AI + Backend + Automation',
    color: 'var(--cyber-cyan)',
    icon: '🤖',
    featured: true,
    description: 'Enterprise-grade KYC automation platform leveraging AI agents, web scraping, and microservices architecture. Processes thousands of verification requests with intelligent extraction and multi-stage approval workflows.',
    features: [
      'AI-driven document extraction & validation',
      'Intelligent web scraping agents',
      'Multi-stage approval workflow engine',
      'Admin dashboard with real-time analytics',
      'Microservices backend architecture',
      'Automated risk scoring system',
    ],
    tech: ['Python', 'FastAPI', 'PostgreSQL', 'AI Agents', 'Docker', 'REST API'],
    github: 'https://github.com/gautam-sarraf',
    demo: null,
    metrics: ['10x faster verification', '99.2% accuracy', 'Automated workflow'],
  },
  {
    id: 2,
    title: 'PDF Chatbot',
    subtitle: 'AI Document Q&A System',
    category: ['AI'],
    categoryDisplay: 'AI Application',
    color: 'var(--cyber-pink)',
    icon: '📄',
    featured: true,
    description: 'Intelligent PDF document assistant powered by RAG architecture. Upload any PDF and ask questions in natural language — the system retrieves relevant context using vector embeddings for accurate, context-aware answers.',
    features: [
      'PDF upload and processing pipeline',
      'Semantic search with vector embeddings',
      'RAG-based context-aware Q&A',
      'Conversation memory and history',
      'Multiple document support',
    ],
    tech: ['Python', 'OpenAI', 'LangChain', 'FAISS', 'FastAPI', 'React'],
    github: 'https://github.com/gautam-sarraf',
    demo: null,
    metrics: ['RAG Architecture', 'Vector Search', 'Context-aware AI'],
  },
  {
    id: 3,
    title: 'Resume Analyzer',
    subtitle: 'AI-Powered ATS Scoring Tool',
    category: ['AI'],
    categoryDisplay: 'AI Tool',
    color: 'var(--cyber-yellow)',
    icon: '📊',
    featured: false,
    description: 'Intelligent resume analysis tool that parses, scores, and provides actionable improvement suggestions to beat ATS systems and land more interviews.',
    features: [
      'Automated resume parsing',
      'ATS compatibility scoring',
      'Skill gap analysis',
      'Keyword optimization suggestions',
      'Improvement recommendations',
    ],
    tech: ['Python', 'OpenAI', 'NLP', 'FastAPI', 'React'],
    github: 'https://github.com/gautam-sarraf',
    demo: null,
    metrics: ['NLP parsing', 'ATS scoring', 'AI suggestions'],
  },
  {
    id: 4,
    title: 'OT Scheduler',
    subtitle: 'Employee Shift Management Platform',
    category: ['Automation', 'Full Stack'],
    categoryDisplay: 'Automation Platform',
    color: 'var(--cyber-green)',
    icon: '📅',
    featured: false,
    description: 'Comprehensive overtime scheduling and shift management system for organizations. Automates complex shift allocation with constraint-based scheduling and real-time reporting.',
    features: [
      'Intelligent shift allocation engine',
      'Employee availability tracking',
      'Real-time scheduling dashboard',
      'Automated report generation',
      'Conflict detection & resolution',
    ],
    tech: ['React', 'Node.js', 'PostgreSQL', 'Express.js', 'Chart.js'],
    github: 'https://github.com/gautam-sarraf',
    demo: null,
    metrics: ['Auto-scheduling', 'Live dashboard', 'Smart reports'],
  },
  {
    id: 5,
    title: 'TeamSphere',
    subtitle: 'Real-Time Collaboration Hub',
    category: ['Full Stack'],
    categoryDisplay: 'Real-Time Collaboration',
    color: 'var(--cyber-purple)',
    icon: '👥',
    featured: true,
    description: 'Full-featured internal communication and collaboration platform with real-time messaging, video calls, file sharing, and role-based access control for enterprise teams.',
    features: [
      'Real-time WebSocket messaging',
      'Video conferencing with WebRTC',
      'File sharing and management',
      'Role-based access control',
      'Team channels and direct messaging',
    ],
    tech: ['MERN', 'WebSocket', 'WebRTC', 'Socket.io', 'JWT', 'MongoDB'],
    github: 'https://github.com/Gautam-Sarraf/TeamSphere',
    demo: null,
    metrics: ['Real-time comms', 'WebRTC video', 'RBAC system'],
  },
  {
    id: 6,
    title: 'GGs Forex',
    subtitle: 'Forex Information Dashboard',
    category: ['Frontend'],
    categoryDisplay: 'Frontend',
    color: '#ff8800',
    icon: '💹',
    featured: false,
    description: 'Modern, responsive forex information platform with interactive charts, live rate tracking, and intuitive dashboard interfaces for currency traders.',
    features: [
      'Modern responsive UI/UX',
      'Interactive forex charts',
      'Live market information',
      'Mobile-first design',
    ],
    tech: ['React', 'JavaScript', 'CSS3', 'REST APIs', 'Chart.js'],
    github: 'https://github.com/gautam-sarraf',
    demo: null,
    metrics: ['Responsive UI', 'Live data', 'Interactive charts'],
  },
  {
    id: 7,
    title: 'PMCH',
    subtitle: 'Healthcare Management Portal',
    category: ['Frontend'],
    categoryDisplay: 'Frontend',
    color: '#00d4ff',
    icon: '🏥',
    featured: false,
    description: 'Comprehensive healthcare portal UI with patient management, appointment scheduling, and admin dashboards designed for hospital management systems.',
    features: [
      'Patient registration and management',
      'Appointment scheduling system',
      'Admin control dashboards',
      'Fully responsive design',
    ],
    tech: ['React', 'TypeScript', 'Tailwind', 'Node.js', 'MongoDB'],
    github: 'https://github.com/gautam-sarraf',
    demo: null,
    metrics: ['Healthcare UI', 'Responsive', 'Admin panel'],
  },
];

const FILTERS = ['All', 'AI', 'Backend', 'Frontend', 'Full Stack', 'Automation'];

const ProjectCard: React.FC<{
  project: typeof PROJECTS[0]; delay: number; isInView: boolean;
}> = ({ project, delay, isInView }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        background: 'rgba(10,10,30,0.9)',
        border: `1px solid ${hovered ? project.color + '60' : 'rgba(255,255,255,0.06)'}`,
        borderRadius: 14,
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        boxShadow: hovered ? `0 20px 60px ${project.color}15, 0 0 0 1px ${project.color}20` : '0 4px 20px rgba(0,0,0,0.3)',
        transform: hovered ? 'translateY(-6px)' : 'none',
        cursor: 'default',
      }}
    >
      {/* Featured badge */}
      {project.featured && (
        <div style={{
          position: 'absolute', top: 16, right: 16,
          padding: '3px 10px',
          background: `${project.color}20`,
          border: `1px solid ${project.color}50`,
          borderRadius: 100,
          fontFamily: 'var(--font-mono)', fontSize: 9, color: project.color,
          letterSpacing: '1px', zIndex: 2,
        }}>
          ⭐ FEATURED
        </div>
      )}

      {/* Top color bar */}
      <div style={{ height: 3, background: `linear-gradient(90deg, ${project.color}, ${project.color}40)` }} />

      <div style={{ padding: '24px' }}>
        {/* Icon + title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 10,
            background: `${project.color}15`,
            border: `1px solid ${project.color}40`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 24, flexShrink: 0,
            boxShadow: hovered ? `0 0 20px ${project.color}30` : 'none',
            transition: 'box-shadow 0.3s',
          }}>
            {project.icon}
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, color: project.color, fontWeight: 700 }}>
              {project.title}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '1px', marginTop: 2 }}>
              {project.subtitle}
            </div>
          </div>
        </div>

        {/* Category */}
        <div style={{
          display: 'inline-block', padding: '3px 10px',
          background: `${project.color}10`, border: `1px solid ${project.color}25`,
          borderRadius: 4, fontFamily: 'var(--font-mono)', fontSize: 9,
          color: project.color, letterSpacing: '1px', marginBottom: 14,
        }}>
          {project.categoryDisplay}
        </div>

        {/* Description */}
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: '#a0b4c8', lineHeight: 1.7, marginBottom: 18 }}>
          {project.description}
        </p>

        {/* Features */}
        <div style={{ marginBottom: 18 }}>
          {project.features.slice(0, 3).map((f, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 6, fontFamily: 'var(--font-body)', fontSize: 11, color: '#8099b0', lineHeight: 1.5 }}>
              <ChevronRight size={11} color={project.color} style={{ flexShrink: 0, marginTop: 2 }} />
              {f}
            </div>
          ))}
        </div>

        {/* Metrics */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 18 }}>
          {project.metrics.map(m => (
            <span key={m} style={{
              padding: '3px 10px', borderRadius: 4,
              fontFamily: 'var(--font-mono)', fontSize: 9,
              background: `${project.color}12`,
              color: project.color,
              border: `1px solid ${project.color}25`,
              letterSpacing: '1px',
            }}>
              {m}
            </span>
          ))}
        </div>

        {/* Tech stack */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
          {project.tech.map(t => (
            <span key={t} style={{
              padding: '4px 9px', borderRadius: 4,
              fontFamily: 'var(--font-mono)', fontSize: 9,
              color: 'var(--text-muted)',
              border: '1px solid rgba(255,255,255,0.08)',
              letterSpacing: '0.5px',
            }}>
              {t}
            </span>
          ))}
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: 10 }}>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '9px 16px',
                fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '1px',
                color: project.color,
                border: `1px solid ${project.color}40`,
                borderRadius: 6, textDecoration: 'none',
                background: `${project.color}08`,
                transition: 'all 0.2s',
                cursor: 'none',
              }}
            >
              <Github size={13} /> CODE
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '9px 16px',
                fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '1px',
                color: '#000',
                background: project.color,
                borderRadius: 6, textDecoration: 'none',
                border: 'none',
                transition: 'all 0.2s',
                cursor: 'none',
              }}
            >
              <ExternalLink size={13} /> LIVE
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Projects: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category.includes(activeFilter));

  return (
    <section id="projects" ref={ref} style={{ padding: '100px 24px', background: 'var(--bg-primary)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '40%', right: '-8%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(139,0,255,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <SectionHeader
          tag="04"
          label="PROJECTS"
          title="Project Archive"
          subtitle={`${PROJECTS.length} projects shipped. All systems green.`}
          isInView={isInView}
        />

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', marginTop: 48, marginBottom: 48 }}
        >
          {FILTERS.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              style={{
                padding: '9px 18px',
                fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '2px',
                cursor: 'none', border: 'none', borderRadius: 6,
                background: activeFilter === filter ? 'var(--cyber-cyan)' : 'rgba(255,255,255,0.04)',
                color: activeFilter === filter ? '#000' : 'var(--text-muted)',
                boxShadow: activeFilter === filter ? '0 0 20px rgba(0,212,255,0.3)' : 'none',
                transition: 'all 0.2s',
              }}
            >
              {filter}
            </button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: 24,
            }}
          >
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} delay={i * 0.08} isInView={isInView} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;
