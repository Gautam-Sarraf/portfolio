import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { SectionHeader } from './About';

const STATS = [
  { label: 'Years Coding', value: 3, suffix: '+', color: 'var(--cyber-cyan)', icon: '💻', desc: 'Since 2022' },
  { label: 'Projects Built', value: 15, suffix: '+', color: 'var(--cyber-green)', icon: '🚀', desc: 'Production & Side' },
  { label: 'Technologies', value: 20, suffix: '+', color: 'var(--cyber-pink)', icon: '⚡', desc: 'Mastered & Used' },
  { label: 'AI Applications', value: 5, suffix: '', color: 'var(--cyber-yellow)', icon: '🤖', desc: 'Deployed & Running' },
  { label: 'API Integrations', value: 25, suffix: '+', color: 'var(--cyber-purple)', icon: '🔗', desc: 'Completed' },
  { label: 'GitHub Repos', value: 20, suffix: '+', color: '#ff8800', icon: '📂', desc: 'Public & Private' },
];

const CounterStat: React.FC<{ stat: typeof STATS[0]; delay: number; isInView: boolean }> = ({
  stat, delay, isInView,
}) => {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!isInView || started.current) return;
    started.current = true;

    const duration = 1500;
    const steps = 60;
    const stepTime = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current++;
      setCount(Math.round((current / steps) * stat.value));
      if (current >= steps) {
        clearInterval(timer);
        setCount(stat.value);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, stat.value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay, type: 'spring', stiffness: 100 }}
      whileHover={{ y: -8, scale: 1.03 }}
      style={{
        padding: '32px 24px',
        background: 'rgba(10,10,30,0.9)',
        border: `1px solid ${stat.color}25`,
        borderRadius: 16,
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
        transition: 'all 0.3s',
      }}
    >
      {/* Background glow */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 3,
        background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)`,
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse at 50% 0%, ${stat.color}08, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      {/* Icon */}
      <div style={{
        fontSize: 36, marginBottom: 16,
        filter: `drop-shadow(0 0 10px ${stat.color}60)`,
      }}>
        {stat.icon}
      </div>

      {/* Counter */}
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(36px, 5vw, 56px)',
        fontWeight: 900,
        color: stat.color,
        lineHeight: 1,
        marginBottom: 8,
        textShadow: `0 0 30px ${stat.color}60`,
        letterSpacing: '-1px',
      }}>
        {count}{stat.suffix}
      </div>

      {/* Label */}
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 12,
        color: 'var(--text-primary)',
        letterSpacing: '2px',
        marginBottom: 6,
        textTransform: 'uppercase',
      }}>
        {stat.label}
      </div>

      {/* Sub-description */}
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)' }}>
        {stat.desc}
      </div>

      {/* Corner decorations */}
      <div style={{
        position: 'absolute', bottom: 12, right: 12,
        width: 20, height: 20,
        borderBottom: `2px solid ${stat.color}30`,
        borderRight: `2px solid ${stat.color}30`,
      }} />
      <div style={{
        position: 'absolute', top: 16, left: 12,
        width: 20, height: 20,
        borderTop: `2px solid ${stat.color}30`,
        borderLeft: `2px solid ${stat.color}30`,
      }} />
    </motion.div>
  );
};

const Achievements: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="achievements" ref={ref} style={{ padding: '100px 24px', background: 'var(--bg-secondary)', position: 'relative', overflow: 'hidden' }}>
      {/* BG effects */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 700, height: 400, background: 'radial-gradient(ellipse, rgba(0,212,255,0.03) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* Floating code snippets */}
      {['01001000', '0xDEADBEEF', 'sudo rm -rf', 'git push', '> /dev/null'].map((text, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: `${10 + i * 18}%`,
          top: `${15 + (i % 3) * 25}%`,
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          color: `rgba(0, 212, 255, ${0.04 + i * 0.01})`,
          pointerEvents: 'none',
          userSelect: 'none',
          transform: `rotate(${-15 + i * 8}deg)`,
        }}>
          {text}
        </div>
      ))}

      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <SectionHeader
          tag="05"
          label="ACHIEVEMENTS"
          title="Hacker Stats"
          subtitle="Scanning mission logs... Data compiled."
          isInView={isInView}
        />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 20,
          marginTop: 64,
        }}>
          {STATS.map((stat, i) => (
            <CounterStat key={stat.label} stat={stat} delay={0.1 + i * 0.1} isInView={isInView} />
          ))}
        </div>

        {/* Extra achievement highlight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          style={{
            marginTop: 40,
            padding: '28px 32px',
            background: 'rgba(10,10,30,0.9)',
            border: '1px solid rgba(0,212,255,0.15)',
            borderRadius: 14,
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            flexWrap: 'wrap',
          }}
        >
          <div style={{
            fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 900,
            color: 'var(--cyber-cyan)',
            textShadow: '0 0 20px rgba(0,212,255,0.5)',
          }}>
            7.63
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-primary)', marginBottom: 4 }}>
              University CPI / GPA
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '2px' }}>
              GLA UNIVERSITY, MATHURA — B.TECH CSE
            </div>
          </div>
          <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--cyber-green)', letterSpacing: '2px' }}>
              ✓ DEAN'S LIST
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', marginTop: 4 }}>
              Expected May 2026
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;
