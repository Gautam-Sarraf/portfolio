import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { SectionHeader } from './About';

const SKILL_CATEGORIES = [
  {
    label: 'Frontend',
    color: 'var(--cyber-cyan)',
    icon: '⚛️',
    skills: [
      { name: 'React', level: 88 },
      { name: 'TypeScript', level: 80 },
      { name: 'JavaScript', level: 90 },
      { name: 'HTML/CSS', level: 92 },
      { name: 'Tailwind', level: 85 },
      { name: 'Next.js', level: 70 },
    ],
  },
  {
    label: 'Backend',
    color: 'var(--cyber-green)',
    icon: '⚙️',
    skills: [
      { name: 'Node.js', level: 85 },
      { name: 'Express.js', level: 83 },
      { name: 'REST APIs', level: 88 },
      { name: 'PostgreSQL', level: 78 },
      { name: 'MongoDB', level: 80 },
      { name: 'JWT/Auth', level: 82 },
    ],
  },
  {
    label: 'AI / ML',
    color: 'var(--cyber-pink)',
    icon: '🤖',
    skills: [
      { name: 'OpenAI API', level: 85 },
      { name: 'LangChain', level: 78 },
      { name: 'RAG', level: 76 },
      { name: 'AI Agents', level: 74 },
      { name: 'Prompt Eng.', level: 88 },
      { name: 'Vector DBs', level: 72 },
    ],
  },
  {
    label: 'Tools & Infra',
    color: 'var(--cyber-yellow)',
    icon: '🛠️',
    skills: [
      { name: 'Python', level: 84 },
      { name: 'Git/GitHub', level: 90 },
      { name: 'Docker', level: 68 },
      { name: 'Linux', level: 75 },
      { name: 'Postman', level: 85 },
      { name: 'FastAPI', level: 78 },
    ],
  },
];

const CERTIFICATIONS = [
  { title: 'Back End Development & APIs', issuer: 'freeCodeCamp', icon: '🏆', color: 'var(--cyber-green)' },
  { title: 'Full Stack Web Development', issuer: 'Coding Blocks', icon: '⭐', color: 'var(--cyber-cyan)' },
  { title: 'Quality Assurance', issuer: 'freeCodeCamp', icon: '🎯', color: 'var(--cyber-yellow)' },
];

const SkillBar: React.FC<{ name: string; level: number; color: string; delay: number; isInView: boolean }> = ({
  name, level, color, delay, isInView,
}) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={isInView ? { opacity: 1, x: 0 } : {}}
    transition={{ duration: 0.5, delay }}
    style={{ marginBottom: 14 }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-primary)', letterSpacing: '1px' }}>{name}</span>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color }}>{level}%</span>
    </div>
    <div style={{ height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden' }}>
      <motion.div
        initial={{ width: 0 }}
        animate={isInView ? { width: `${level}%` } : {}}
        transition={{ duration: 1, delay: delay + 0.2, ease: 'easeOut' }}
        style={{
          height: '100%',
          background: `linear-gradient(90deg, ${color}, ${color}80)`,
          borderRadius: 2,
          boxShadow: `0 0 8px ${color}60`,
          position: 'relative',
        }}
      />
    </div>
  </motion.div>
);

const Skills: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <section id="skills" ref={ref} style={{ padding: '100px 24px', background: 'var(--bg-primary)', position: 'relative', overflow: 'hidden' }}>
      {/* BG accents */}
      <div style={{ position: 'absolute', top: '20%', right: '-5%', width: 300, height: 300, background: 'radial-gradient(circle, rgba(0,255,136,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '20%', left: '-5%', width: 250, height: 250, background: 'radial-gradient(circle, rgba(255,0,128,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <SectionHeader
          tag="02"
          label="SKILLS"
          title="Tech Arsenal"
          subtitle="Systems initialized. All modules online."
          isInView={isInView}
        />

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', marginTop: 48, marginBottom: 48 }}
        >
          {SKILL_CATEGORIES.map((cat, i) => (
            <button
              key={cat.label}
              onClick={() => setActiveCategory(i)}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '10px 20px',
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                letterSpacing: '2px',
                cursor: 'none',
                border: 'none',
                borderRadius: 6,
                background: activeCategory === i ? cat.color : 'rgba(255,255,255,0.04)',
                color: activeCategory === i ? '#000' : cat.color,
                boxShadow: activeCategory === i ? `0 0 20px ${cat.color}40` : 'none',
                transition: 'all 0.2s',
              }}
            >
              <span>{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Skills grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, marginBottom: 48 }}>
          {SKILL_CATEGORIES.map((cat, catIdx) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + catIdx * 0.1 }}
              style={{
                padding: '28px 28px',
                background: `linear-gradient(135deg, rgba(10,10,30,0.95) 0%, rgba(10,10,30,0.7) 100%)`,
                border: `1px solid ${activeCategory === catIdx ? cat.color + '60' : 'rgba(255,255,255,0.06)'}`,
                borderRadius: 14,
                backdropFilter: 'blur(12px)',
                transition: 'border-color 0.3s',
                boxShadow: activeCategory === catIdx ? `0 0 30px ${cat.color}15` : 'none',
              }}
            >
              {/* Category header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 8,
                  background: `${cat.color}15`,
                  border: `1px solid ${cat.color}40`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 18,
                }}>
                  {cat.icon}
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 13, color: cat.color, fontWeight: 700, letterSpacing: '1px' }}>
                    {cat.label}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)' }}>
                    {cat.skills.length} modules loaded
                  </div>
                </div>
              </div>

              {/* Skill bars */}
              {cat.skills.map((skill, si) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  color={cat.color}
                  delay={0.3 + catIdx * 0.1 + si * 0.05}
                  isInView={isInView}
                />
              ))}
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
        >
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12,
            fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '4px',
            color: 'var(--text-muted)', marginBottom: 20, justifyContent: 'center',
          }}>
            CERTIFICATIONS & ACHIEVEMENTS
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
            {CERTIFICATIONS.map((cert, i) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.9 + i * 0.1 }}
                whileHover={{ scale: 1.03, y: -4 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '18px 20px',
                  background: 'rgba(10, 10, 30, 0.8)',
                  border: `1px solid ${cert.color}30`,
                  borderRadius: 10,
                  borderLeft: `3px solid ${cert.color}`,
                  cursor: 'none',
                }}
              >
                <span style={{ fontSize: 22, flexShrink: 0 }}>{cert.icon}</span>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-primary)', marginBottom: 4, lineHeight: 1.4 }}>
                    {cert.title}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: cert.color }}>
                    {cert.issuer}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
