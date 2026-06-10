import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, X, Minimize2, Maximize2 } from 'lucide-react';

const COMMANDS: Record<string, string[]> = {
  help: [
    '┌─────────────────────────────────────────┐',
    '│         AVAILABLE COMMANDS              │',
    '├─────────────────────────────────────────┤',
    '│  help        — Show this menu           │',
    '│  about       — Developer info           │',
    '│  skills      — Tech stack               │',
    '│  projects    — View projects            │',
    '│  experience  — Work history             │',
    '│  contact     — Get in touch             │',
    '│  github      — Open GitHub              │',
    '│  linkedin    — Open LinkedIn            │',
    '│  resume      — Download resume          │',
    '│  whoami      — System identity          │',
    '│  clear       — Clear terminal           │',
    '│  matrix      — Toggle Matrix rain       │',
    '│  easter      — 🥚 Secret command        │',
    '└─────────────────────────────────────────┘',
  ],
  about: [
    '╔═══════════════════════════════════════╗',
    '║         GAUTAM SARRAF                  ║',
    '╚═══════════════════════════════════════╝',
    '  Role      : Full Stack Developer & AI Engineer',
    '  Location  : Birgunj, Nepal',
    '  Education : B.Tech CSE @ GLA University',
    '  CPI       : 7.63',
    '  Status    : 🟢 Available for opportunities',
    '',
    '  Bio: Motivated dev with passion for AI systems,',
    '  automation, and building scalable backends.',
  ],
  skills: [
    '  ⚛️  Frontend  : React, TypeScript, Tailwind, Next.js',
    '  ⚙️  Backend   : Node.js, Express, FastAPI, REST',
    '  🗃️  Database  : PostgreSQL, MongoDB, Vector DBs',
    '  🤖  AI/ML    : OpenAI, LangChain, RAG, Agents',
    '  🐍  Scripts  : Python automation & pipelines',
    '  🛠️  Tools    : Git, Docker, Postman, Linux',
  ],
  projects: [
    '  [1] CP-KYC         → AI KYC Automation Platform',
    '  [2] PDF Chatbot    → RAG-based Document Q&A',
    '  [3] Resume Analyzer→ AI ATS scoring tool',
    '  [4] OT Scheduler   → Employee shift automation',
    '  [5] TeamSphere     → Real-time collaboration',
    '  [6] GGs Forex      → Forex dashboard UI',
    '  [7] PMCH           → Healthcare portal',
    '',
    '  → Scroll to Projects section for details.',
  ],
  experience: [
    '  [Current] Frontend Developer',
    '           — API integration, dashboard UI',
    '',
    '  [2024]    Full Stack Web Dev Intern @ Jovac\'s',
    '           — Node.js, JavaScript, HTML/CSS',
    '',
    '  [2023]    Operation In-Charge',
    '           — Python automation, team leadership',
    '',
    '  [Ongoing] Independent AI Developer',
    '           — AI apps, automation, open source',
  ],
  contact: [
    '  📧 Email    : gautam.sarraf_cs22@gla.ac.in',
    '  🐙 GitHub   : github.com/gautam-sarraf',
    '  🔗 LinkedIn : linkedin.com/in/gautam-sarraf',
    '  📍 Location : Birgunj, Nepal',
    '',
    '  → Scroll to Contact section to send a message.',
  ],
  whoami: [
    '  uid=1337(gautam) gid=1337(developers)',
    '  groups=1337(developers),0(root),42(ai-engineers)',
    '',
    '  Gautam Sarraf — Full Stack Dev & AI Engineer',
    '  Running on: GLA University CSE v2026',
    '  Kernel: caffeine-driven-5.3.2',
    '  Uptime: 22 years 3 months',
  ],
  easter: [
    '',
    '  🥚 You found the Easter egg!',
    '',
    '  "Any fool can write code that a computer',
    '   can understand. Good programmers write code',
    '   that humans can understand." — Martin Fowler',
    '',
    '  🎉 Achievement unlocked: Easter Egg Hunter!',
  ],
};

interface Line {
  text: string;
  type: 'input' | 'output' | 'error' | 'system';
  color?: string;
}

const InteractiveTerminal: React.FC<{
  onToggleMatrix: () => void;
  matrixActive: boolean;
}> = ({ onToggleMatrix, matrixActive }) => {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [lines, setLines] = useState<Line[]>([
    { text: '┌──────────────────────────────────────────────────┐', type: 'system' },
    { text: '│  GAUTAM SARRAF — DEVELOPER TERMINAL v2.0.26      │', type: 'system' },
    { text: '│  Type "help" to see available commands           │', type: 'system' },
    { text: '└──────────────────────────────────────────────────┘', type: 'system' },
    { text: '', type: 'system' },
  ]);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines, open]);

  const runCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const newLines: Line[] = [
      { text: `❯ ${cmd}`, type: 'input' },
    ];

    if (!trimmed) {
      setLines(prev => [...prev, ...newLines]);
      return;
    }

    if (trimmed === 'clear') {
      setLines([{ text: '  Terminal cleared.', type: 'system' }]);
      return;
    }

    if (trimmed === 'github') {
      window.open('https://github.com/gautam-sarraf', '_blank');
      newLines.push({ text: '  → Opening GitHub in new tab...', type: 'output' });
    } else if (trimmed === 'linkedin') {
      window.open('https://linkedin.com/in/gautam-sarraf', '_blank');
      newLines.push({ text: '  → Opening LinkedIn in new tab...', type: 'output' });
    } else if (trimmed === 'resume') {
      newLines.push({ text: '  → Resume download coming soon!', type: 'output' });
    } else if (trimmed === 'matrix') {
      onToggleMatrix();
      newLines.push({ text: `  → Matrix rain ${matrixActive ? 'deactivated' : 'activated'}!`, type: 'output' });
    } else if (COMMANDS[trimmed]) {
      COMMANDS[trimmed].forEach(text => {
        newLines.push({ text, type: 'output' });
      });
    } else {
      newLines.push({ text: `  ✗ Command not found: "${cmd}"`, type: 'error' });
      newLines.push({ text: '  Type "help" to see available commands.', type: 'error' });
    }

    setLines(prev => [...prev, ...newLines, { text: '', type: 'system' }]);
    setHistory(prev => [cmd, ...prev.slice(0, 49)]);
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      runCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(historyIndex + 1, history.length - 1);
      setHistoryIndex(next);
      setInput(history[next] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = Math.max(historyIndex - 1, -1);
      setHistoryIndex(next);
      setInput(next === -1 ? '' : history[next]);
    }
  };

  const getLineColor = (type: Line['type']) => {
    switch (type) {
      case 'input': return 'var(--cyber-green)';
      case 'error': return 'var(--cyber-pink)';
      case 'system': return 'rgba(var(--cyber-cyan-rgb), 0.6)';
      default: return '#a0c0d8';
    }
  };

  return (
    <>
      {/* Floating terminal button */}
      <motion.button
        onClick={() => { setOpen(true); setMinimized(false); }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: 'fixed', bottom: 28, right: 28,
          width: 54, height: 54, borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(var(--cyber-cyan-rgb),0.2), rgba(var(--cyber-green-rgb),0.2))',
          border: '1px solid rgba(var(--cyber-cyan-rgb),0.4)',
          backdropFilter: 'blur(10px)',
          display: open ? 'none' : 'flex',
          alignItems: 'center', justifyContent: 'center',
          cursor: 'none', zIndex: 5000,
          boxShadow: '0 0 20px rgba(var(--cyber-cyan-rgb),0.2)',
          color: 'var(--cyber-cyan)',
        }}
        title="Open Terminal"
      >
        <TerminalIcon size={22} />
      </motion.button>

      {/* Terminal window */}
      <AnimatePresence>
        {open && !minimized && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed', bottom: 28, right: 28,
              width: 'min(600px, 94vw)', height: 420,
              background: 'rgba(4, 4, 12, 0.97)',
              border: '1px solid rgba(var(--cyber-cyan-rgb),0.3)',
              borderRadius: 12, overflow: 'hidden',
              zIndex: 5000,
              boxShadow: '0 20px 60px rgba(0,0,0,0.8), 0 0 0 1px rgba(var(--cyber-cyan-rgb),0.1)',
              display: 'flex', flexDirection: 'column',
              fontFamily: 'var(--font-mono)',
            }}
            onClick={() => inputRef.current?.focus()}
          >
            {/* Title bar */}
            <div style={{
              padding: '10px 14px',
              background: 'rgba(var(--cyber-cyan-rgb),0.05)',
              borderBottom: '1px solid rgba(var(--cyber-cyan-rgb),0.15)',
              display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0,
            }}>
              <div onClick={() => { setOpen(false); }} style={{ width: 11, height: 11, borderRadius: '50%', background: '#ff5f57', cursor: 'none' }} />
              <div onClick={() => setMinimized(true)} style={{ width: 11, height: 11, borderRadius: '50%', background: '#febc2e', cursor: 'none' }} />
              <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#28c840' }} />
              <div style={{ marginLeft: 10, display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(100,130,160,0.7)', fontSize: 11 }}>
                <TerminalIcon size={11} />
                gautam@portfolio:~
              </div>
              <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
                <Minimize2 size={13} color="rgba(100,130,160,0.5)" style={{ cursor: 'none' }} onClick={() => setMinimized(true)} />
                <X size={13} color="rgba(100,130,160,0.5)" style={{ cursor: 'none' }} onClick={() => setOpen(false)} />
              </div>
            </div>

            {/* Output area */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '14px 16px', fontSize: 12, lineHeight: 1.8 }}>
              {lines.map((line, i) => (
                <div key={i} style={{ color: getLineColor(line.type), whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                  {line.text}
                </div>
              ))}
              <div ref={endRef} />
            </div>

            {/* Input row */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '10px 16px',
              borderTop: '1px solid rgba(var(--cyber-cyan-rgb),0.1)',
              background: 'rgba(0,0,0,0.3)',
              flexShrink: 0,
            }}>
              <span style={{ color: 'var(--cyber-pink)', fontSize: 13, fontWeight: 700 }}>❯</span>
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
                style={{
                  flex: 1, background: 'none', border: 'none', outline: 'none',
                  color: 'var(--cyber-green)', fontFamily: 'var(--font-mono)', fontSize: 13,
                  caretColor: 'var(--cyber-cyan)',
                }}
                placeholder="type a command..."
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default InteractiveTerminal;
