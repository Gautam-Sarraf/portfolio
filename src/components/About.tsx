import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Terminal, User, BookOpen, Briefcase, MapPin } from 'lucide-react';

const TERMINAL_STEPS = [
  {
    cmd: 'whoami',
    output: [
      '> Gautam Sarraf',
      '> Full Stack Developer | AI Engineer | Backend Architect',
      '> Location: Birgunj, Nepal  |  University: GLA University, Mathura',
      '> Status: Actively building world-class software',
    ],
    color: 'var(--cyber-green)',
  },
  {
    cmd: 'cat focus.txt',
    output: [
      '  [1] Full Stack Development — React, Node.js, TypeScript',
      '  [2] AI Applications — LangChain, RAG, Vector DBs, Agents',
      '  [3] Automation Systems — Python, FastAPI, Microservices',
      '  [4] Backend Architecture — PostgreSQL, MongoDB, REST APIs',
    ],
    color: 'var(--cyber-cyan)',
  },
  {
    cmd: 'ls ./education',
    output: [
      '  📚 B.Tech Computer Science Engineering',
      '  🏫 GLA University, Mathura, UP',
      '  📅 Expected: May 2026  |  CPI: 7.63',
      '  📖 Coursework: DSA, OS, SE, Web Dev, Algorithms',
    ],
    color: 'var(--cyber-yellow)',
  },
  {
    cmd: 'cat bio.md',
    output: [
      '  Motivated and detail-oriented developer with a strong foundation',
      '  in full-stack development and AI engineering. Passionate about',
      '  building efficient, scalable systems and continuously pushing',
      '  the boundaries of what modern technology can achieve.',
    ],
    color: '#e0e8ff',
  },
];

const About: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [currentStep, setCurrentStep] = useState(0);
  const [currentLine, setCurrentLine] = useState(0);
  const [typedCmd, setTypedCmd] = useState('');
  const [phase, setPhase] = useState<'typing' | 'output' | 'done'>('typing');
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (isInView && !started) setStarted(true);
  }, [isInView]);

  useEffect(() => {
    if (!started || currentStep >= TERMINAL_STEPS.length) return;
    const step = TERMINAL_STEPS[currentStep];

    if (phase === 'typing') {
      if (typedCmd.length < step.cmd.length) {
        const t = setTimeout(() => setTypedCmd(step.cmd.slice(0, typedCmd.length + 1)), 60);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase('output'), 300);
        return () => clearTimeout(t);
      }
    }

    if (phase === 'output') {
      if (currentLine < step.output.length) {
        const t = setTimeout(() => setCurrentLine(l => l + 1), 120);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => {
          setCompletedSteps(prev => [...prev, currentStep]);
          setPhase('typing');
          setTypedCmd('');
          setCurrentLine(0);
          setCurrentStep(s => s + 1);
        }, 600);
        return () => clearTimeout(t);
      }
    }
  }, [started, currentStep, phase, typedCmd, currentLine]);

  const stats = [
    { icon: <User size={18} />, label: 'Name', value: 'Gautam Sarraf', color: 'var(--cyber-cyan)' },
    { icon: <MapPin size={18} />, label: 'Location', value: 'Birgunj, Nepal', color: 'var(--cyber-green)' },
    { icon: <BookOpen size={18} />, label: 'Education', value: 'B.Tech CSE, GLA Univ.', color: 'var(--cyber-yellow)' },
    { icon: <Briefcase size={18} />, label: 'Focus', value: 'Full Stack + AI', color: 'var(--cyber-pink)' },
  ];

  return (
    <section id="about" ref={ref} style={{ padding: '100px 24px', background: 'var(--bg-secondary)', position: 'relative', overflow: 'hidden' }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '10%', width: 400, height: 400,
        background: 'radial-gradient(circle, rgba(var(--cyber-cyan-rgb),0.04) 0%, transparent 70%)',
        transform: 'translateY(-50%)', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Section header */}
        <SectionHeader
          tag="01"
          label="ABOUT"
          title="Developer Profile"
          subtitle="Initializing system scan..."
          isInView={isInView}
        />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 32,
          marginTop: 60,
          alignItems: 'start',
        }}>
          {/* Terminal window */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{
              background: 'rgba(5, 5, 16, 0.95)',
              border: '1px solid rgba(var(--cyber-cyan-rgb), 0.2)',
              borderRadius: 12,
              overflow: 'hidden',
              boxShadow: '0 0 40px rgba(var(--cyber-cyan-rgb), 0.05), 0 20px 60px rgba(0,0,0,0.5)',
              fontFamily: 'var(--font-mono)',
              fontSize: 13,
            }}
          >
            {/* Terminal title bar */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '12px 16px',
              background: 'rgba(255,255,255,0.03)',
              borderBottom: '1px solid rgba(var(--cyber-cyan-rgb),0.1)',
            }}>
              <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#ff5f57' }} />
              <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#febc2e' }} />
              <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#28c840' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginLeft: 12, color: 'rgba(100,130,160,0.6)', fontSize: 11 }}>
                <Terminal size={12} />
                gautam@portfolio ~ bash
              </div>
            </div>

            {/* Terminal content */}
            <div style={{ padding: '20px 24px', minHeight: 360, lineHeight: 1.9 }}>
              {/* Completed steps */}
              {completedSteps.map(stepIdx => {
                const s = TERMINAL_STEPS[stepIdx];
                return (
                  <div key={stepIdx} style={{ marginBottom: 20, opacity: 0.65 }}>
                    <div style={{ color: 'var(--cyber-green)' }}>
                      <span style={{ color: 'var(--cyber-pink)' }}>❯ </span>{s.cmd}
                    </div>
                    {s.output.map((line, li) => (
                      <div key={li} style={{ color: s.color, fontSize: 12 }}>{line}</div>
                    ))}
                  </div>
                );
              })}

              {/* Current step */}
              {currentStep < TERMINAL_STEPS.length && (
                <div>
                  <div style={{ color: 'var(--cyber-green)' }}>
                    <span style={{ color: 'var(--cyber-pink)' }}>❯ </span>
                    {typedCmd}
                    {phase === 'typing' && (
                      <span style={{
                        display: 'inline-block', width: 8, height: '1em',
                        background: 'var(--cyber-cyan)', marginLeft: 1, verticalAlign: 'middle',
                        animation: 'blink-cursor 0.7s step-end infinite',
                      }} />
                    )}
                  </div>
                  {TERMINAL_STEPS[currentStep].output.slice(0, currentLine).map((line, li) => (
                    <div key={li} style={{ color: TERMINAL_STEPS[currentStep].color, fontSize: 12 }}>{line}</div>
                  ))}
                </div>
              )}

              {currentStep >= TERMINAL_STEPS.length && (
                <div style={{ color: 'var(--cyber-green)', marginTop: 8 }}>
                  <span style={{ color: 'var(--cyber-pink)' }}>❯ </span>
                  <span style={{
                    display: 'inline-block', width: 8, height: '1em',
                    background: 'var(--cyber-green)', marginLeft: 1, verticalAlign: 'middle',
                    animation: 'blink-cursor 0.7s step-end infinite',
                  }} />
                </div>
              )}
            </div>
          </motion.div>

          {/* Info cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: 40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 16,
                  padding: '18px 24px',
                  background: 'rgba(10, 10, 30, 0.8)',
                  border: `1px solid ${stat.color}30`,
                  borderRadius: 10,
                  borderLeft: `3px solid ${stat.color}`,
                  backdropFilter: 'blur(10px)',
                }}
              >
                <div style={{ color: stat.color, flexShrink: 0 }}>{stat.icon}</div>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '2px', marginBottom: 3 }}>
                    {stat.label}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: stat.color }}>
                    {stat.value}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Quick traits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.8 }}
              style={{
                padding: '20px 24px',
                background: 'rgba(10, 10, 30, 0.8)',
                border: '1px solid rgba(var(--cyber-cyan-rgb),0.15)',
                borderRadius: 10,
              }}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '2px', marginBottom: 14 }}>
                CORE TRAITS
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {['Problem Solver', 'Team Player', 'Fast Learner', 'Detail-Oriented', 'Self-Motivated', 'Creative'].map(trait => (
                  <span key={trait} style={{
                    padding: '5px 12px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 10,
                    color: 'var(--cyber-cyan)',
                    border: '1px solid rgba(var(--cyber-cyan-rgb),0.25)',
                    borderRadius: 100,
                    letterSpacing: '1px',
                    background: 'rgba(var(--cyber-cyan-rgb),0.05)',
                  }}>
                    {trait}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`@keyframes blink-cursor { 50% { opacity: 0; } }`}</style>
    </section>
  );
};

// Reusable section header component
export const SectionHeader: React.FC<{
  tag: string; label: string; title: string; subtitle: string; isInView: boolean;
}> = ({ tag, label, title, subtitle, isInView }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.6 }}
    style={{ textAlign: 'center' }}
  >
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 16,
      fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '4px',
      color: 'var(--text-muted)',
    }}>
      <span style={{ color: 'var(--cyber-cyan)' }}>{tag}.</span>
      {label}
      <span style={{ height: 1, width: 40, background: 'rgba(var(--cyber-cyan-rgb),0.3)', display: 'inline-block' }} />
    </div>
    <h2 style={{
      fontFamily: 'var(--font-display)',
      fontSize: 'clamp(28px, 5vw, 52px)',
      fontWeight: 900,
      letterSpacing: '-1px',
      background: 'linear-gradient(135deg, #fff 0%, var(--cyber-cyan) 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      marginBottom: 12,
    }}>
      {title}
    </h2>
    <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)', letterSpacing: '2px' }}>
      {subtitle}
    </p>
  </motion.div>
);

export default About;