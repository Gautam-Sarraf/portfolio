import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, Download, ChevronDown, Cpu } from 'lucide-react';

const BOOT_LINES = [
  { text: 'BIOS v4.2.1 initializing...', delay: 0, color: '#6080a0' },
  { text: 'RAM check: 32GB OK', delay: 300, color: '#6080a0' },
  { text: 'Loading kernel modules...', delay: 600, color: '#6080a0' },
  { text: 'Mounting developer filesystem...', delay: 900, color: '#00d4ff' },
  { text: 'Scanning skill database...', delay: 1200, color: '#00d4ff' },
  { text: '> AI_ENGINE v2.5 loaded ✓', delay: 1500, color: '#00ff88' },
  { text: '> FULLSTACK_CORE v8.0 loaded ✓', delay: 1700, color: '#00ff88' },
  { text: '> AUTOMATION_SYS v3.1 loaded ✓', delay: 1900, color: '#00ff88' },
  { text: '', delay: 2100, color: '' },
  { text: '████████████████████ 100%', delay: 2200, color: '#ffcc00' },
  { text: '', delay: 2600, color: '' },
  { text: '⚡ DEVELOPER PROFILE DETECTED', delay: 2700, color: '#ff0080' },
  { text: '⚡ LOADING: GAUTAM SARRAF...', delay: 2900, color: '#ff0080' },
];

const ROLES = ['Full Stack Developer', 'AI Engineer', 'Backend Architect', 'Automation Engineer', 'React Developer'];

// Animated particles background
const ParticlesCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number; y: number; vx: number; vy: number;
      size: number; color: string; alpha: number; pulse: number;
    }> = [];

    const colors = ['#00d4ff', '#00ff88', '#ff0080', '#8b00ff', '#ffcc00'];

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.6 + 0.2,
        pulse: Math.random() * Math.PI * 2,
      });
    }

    let animId: number;
    let frame = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      // Grid
      ctx.strokeStyle = 'rgba(0, 212, 255, 0.04)';
      ctx.lineWidth = 1;
      const gridSize = 60;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
      }

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      particles.forEach((p, i) => {
        p.pulse += 0.02;
        p.x += p.vx;
        p.y += p.vy;

        // Mouse repulsion
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          p.vx += dx / dist * 0.5;
          p.vy += dy / dist * 0.5;
        }

        p.vx *= 0.99;
        p.vy *= 0.99;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        const alpha = p.alpha * (0.7 + 0.3 * Math.sin(p.pulse));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace(')', `, ${alpha})`).replace('rgb(', 'rgba(').replace('#', '');

        // Handle hex color
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.fill();
        ctx.globalAlpha = 1;

        // Connect nearby particles
        particles.slice(i + 1, i + 5).forEach(p2 => {
          const dx2 = p.x - p2.x;
          const dy2 = p.y - p2.y;
          const d = Math.sqrt(dx2 * dx2 + dy2 * dy2);
          if (d < 100) {
            ctx.beginPath();
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = (1 - d / 100) * 0.15;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        });
      });

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    />
  );
};

const Hero: React.FC = () => {
  const [bootPhase, setBootPhase] = useState(0); // 0=booting, 1=done
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [roleIndex, setRoleIndex] = useState(0);
  const [typedRole, setTypedRole] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showContent, setShowContent] = useState(false);

  // Boot sequence
  useEffect(() => {
    BOOT_LINES.forEach((line, i) => {
      setTimeout(() => {
        setVisibleLines(prev => [...prev, i]);
        if (i === BOOT_LINES.length - 1) {
          setTimeout(() => {
            setBootPhase(1);
            setShowContent(true);
          }, 600);
        }
      }, line.delay + 300);
    });
  }, []);

  // Typewriter for roles
  useEffect(() => {
    if (!showContent) return;
    const role = ROLES[roleIndex];
    const speed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (typedRole.length < role.length) {
          setTypedRole(role.slice(0, typedRole.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        if (typedRole.length > 0) {
          setTypedRole(typedRole.slice(0, -1));
        } else {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % ROLES.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [typedRole, isDeleting, roleIndex, showContent]);

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'var(--bg-primary)',
      }}
    >
      {/* Background */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,212,255,0.08) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 80% 100%, rgba(139,0,255,0.06) 0%, transparent 60%), radial-gradient(ellipse 40% 30% at 10% 60%, rgba(255,0,128,0.05) 0%, transparent 50%)',
      }} />

      {/* CRT scanlines overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2,
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)',
        animation: 'scanlines 0.1s linear infinite',
      }} />

      {/* Animated grid floor */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', pointerEvents: 'none',
        backgroundImage: `
          linear-gradient(rgba(0,212,255,0.08) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,212,255,0.08) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
        transform: 'perspective(400px) rotateX(60deg)',
        transformOrigin: 'bottom',
        animation: 'grid-scroll 3s linear infinite',
        maskImage: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
      }} />

      <ParticlesCanvas />

      <div style={{
        position: 'relative', zIndex: 3,
        width: '100%', maxWidth: 900,
        padding: '120px 24px 80px',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}>
        <AnimatePresence mode="wait">
          {bootPhase === 0 && (
            <motion.div
              key="boot"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(11px, 1.4vw, 14px)',
                lineHeight: 2,
                color: '#6080a0',
                maxWidth: 600,
                width: '100%',
                background: 'rgba(5, 5, 16, 0.9)',
                border: '1px solid rgba(0, 212, 255, 0.2)',
                borderRadius: 12,
                padding: '28px 32px',
                boxShadow: '0 0 40px rgba(0, 212, 255, 0.05)',
              }}
            >
              {/* Terminal header bar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20, paddingBottom: 16, borderBottom: '1px solid rgba(0,212,255,0.1)' }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57' }} />
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#febc2e' }} />
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c840' }} />
                <span style={{ marginLeft: 8, color: 'rgba(100,130,160,0.6)', fontSize: 11 }}>gautam-sarraf — bash — 80×24</span>
              </div>
              {BOOT_LINES.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={visibleLines.includes(i) ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.3 }}
                  style={{ color: line.color || 'transparent', minHeight: '1.2em' }}
                >
                  {line.text}
                  {i === visibleLines[visibleLines.length - 1] && i < BOOT_LINES.length - 1 && (
                    <span style={{ display: 'inline-block', width: 8, height: '1em', background: 'var(--cyber-cyan)', marginLeft: 2, verticalAlign: 'middle', animation: 'blink-cursor 0.7s step-end infinite' }} />
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}

          {showContent && (
            <motion.div
              key="hero"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, type: 'spring' }}
              style={{ textAlign: 'center', width: '100%' }}
            >
              {/* Status badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '6px 16px',
                  background: 'rgba(0, 255, 136, 0.1)',
                  border: '1px solid rgba(0, 255, 136, 0.3)',
                  borderRadius: '100px',
                  marginBottom: 28,
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  color: 'var(--cyber-green)',
                  letterSpacing: '2px',
                }}
              >
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--cyber-green)', boxShadow: '0 0 8px var(--cyber-green)', display: 'inline-block', animation: 'pulse-glow 2s infinite' }} />
                AVAILABLE FOR HIRE
              </motion.div>

              {/* Glitch name */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(36px, 8vw, 88px)',
                  fontWeight: 900,
                  letterSpacing: '-2px',
                  lineHeight: 1.05,
                  marginBottom: 16,
                  background: 'linear-gradient(135deg, #ffffff 0%, var(--cyber-cyan) 50%, var(--cyber-green) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: 'none',
                  position: 'relative',
                }}
              >
                GAUTAM
                <br />
                SARRAF
              </motion.h1>

              {/* Animated role */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(14px, 2.5vw, 22px)',
                  color: 'var(--cyber-cyan)',
                  marginBottom: 32,
                  minHeight: 32,
                  textShadow: '0 0 20px var(--cyber-cyan)',
                  letterSpacing: '2px',
                }}
              >
                &gt; {typedRole}
                <span style={{
                  display: 'inline-block', width: '0.5em', height: '1.1em',
                  background: 'var(--cyber-cyan)', marginLeft: 2,
                  verticalAlign: 'middle',
                  animation: 'blink-cursor 0.7s step-end infinite',
                }} />
              </motion.div>

              {/* Location */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 12,
                  color: 'var(--text-muted)',
                  marginBottom: 48,
                  letterSpacing: '3px',
                }}
              >
                📍 BIRGUNJ, NEPAL &nbsp;·&nbsp; GLA UNIVERSITY, CSE
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 48 }}
              >
                <CyberButton href="#contact" primary icon={<Mail size={16} />}>HIRE ME</CyberButton>
                <CyberButton href="https://github.com/gautam-sarraf" external icon={<Github size={16} />}>GITHUB</CyberButton>
                <CyberButton href="https://linkedin.com/in/gautam-sarraf" external icon={<Linkedin size={16} />}>LINKEDIN</CyberButton>
                <CyberButton href="#" icon={<Download size={16} />}>RESUME</CyberButton>
              </motion.div>

              {/* Scroll indicator */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                style={{ cursor: 'none', display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '3px' }}>SCROLL</span>
                <ChevronDown size={20} color="var(--text-muted)" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Corner decorations */}
      <div style={{ position: 'absolute', top: 80, left: 20, fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(0,212,255,0.3)', lineHeight: 1.8 }}>
        SYS:ONLINE<br />VER:2.0.26<br />CPU:92%
      </div>
      <div style={{ position: 'absolute', top: 80, right: 20, fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(0,212,255,0.3)', lineHeight: 1.8, textAlign: 'right' }}>
        MEM:16GB<br />GPU:RTX<br />NET:OK
      </div>

      <style>{`
        @keyframes blink-cursor { 50% { opacity: 0; } }
        @keyframes scanlines { 0% { background-position: 0 0; } 100% { background-position: 0 4px; } }
        @keyframes grid-scroll { from { background-position: 0 0; } to { background-position: 0 40px; } }
      `}</style>
    </section>
  );
};

const CyberButton: React.FC<{
  href: string; children: React.ReactNode; primary?: boolean;
  icon?: React.ReactNode; external?: boolean;
}> = ({ href, children, primary, icon, external }) => {
  const isHash = href.startsWith('#');
  const onClick = (e: React.MouseEvent) => {
    if (isHash) {
      e.preventDefault();
      document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.a
      href={href}
      onClick={onClick}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        padding: '12px 24px',
        fontFamily: 'var(--font-mono)',
        fontSize: 12, fontWeight: 700,
        letterSpacing: '2px',
        textDecoration: 'none',
        borderRadius: 6,
        cursor: 'none',
        transition: 'all 0.2s',
        background: primary
          ? 'linear-gradient(135deg, var(--cyber-cyan), var(--cyber-green))'
          : 'transparent',
        color: primary ? '#000' : 'var(--cyber-cyan)',
        border: primary ? 'none' : '1px solid rgba(0,212,255,0.4)',
        boxShadow: primary
          ? '0 0 20px rgba(0,212,255,0.3), 0 4px 12px rgba(0,0,0,0.4)'
          : '0 0 0 transparent',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {icon}
      {children}
    </motion.a>
  );
};

export default Hero;
