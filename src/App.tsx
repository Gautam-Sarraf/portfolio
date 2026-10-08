import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import SpaceCanvas from './components/SpaceCanvas';
import Hero from './components/Hero';
import EngineeringHighlights from './components/EngineeringHighlights';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import FullStackSection from './components/FullStackSection';
import Experience from './components/Experience';
import EngineeringNotes from './components/EngineeringNotes';
import Contact from './components/Contact';
import AiAssistant from './components/AiAssistant';
import ProjectCaseStudy from './components/ProjectCaseStudy';
import { spaceAudio } from './utils/audio';
import { Cpu, ShieldCheck, Database, HardDrive, GitBranch } from 'lucide-react';

const SystemMonitorHUD: React.FC = () => {
  const [cpu, setCpu] = useState(14);
  const [gpu, setGpu] = useState(38);
  const [mem, setMem] = useState(6.2);

  useEffect(() => {
    const timer = setInterval(() => {
      setCpu(Math.floor(Math.random() * 8) + 12);
      setGpu(Math.floor(Math.random() * 4) + 36);
      setMem(parseFloat((6.0 + Math.random() * 0.4).toFixed(1)));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="hud-panel p-4 flex flex-col gap-3 font-mono text-[10px]"
      style={{ border: '1px solid rgba(var(--cyber-cyan-rgb), 0.25)' }}
    >
      <div className="border-b border-slate-900 pb-2 text-slate-400 tracking-wider flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Cpu size={12} className="text-cyan-400 animate-spin" style={{ animationDuration: '10s' }} />
          <span>PRODUCTION SYSTEM TELEMETRY</span>
        </div>
        <span className="text-[8px] text-green-400 font-bold">LIVE</span>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <span className="text-slate-500">API WORKER LOAD:</span>
          <span className="text-cyan-400 font-bold">{cpu}%</span>
        </div>
        <div className="h-1 bg-slate-900 rounded overflow-hidden">
          <div style={{ width: `${cpu * 4}%` }} className="h-full bg-cyan-400" />
        </div>

        <div className="flex justify-between items-center mt-1">
          <span className="text-slate-500">ASYNC QUEUE DEPTH:</span>
          <span className="text-green-400 font-bold">{gpu} TASKS</span>
        </div>
        <div className="h-1 bg-slate-900 rounded overflow-hidden">
          <div style={{ width: `${gpu * 2}%` }} className="h-full bg-green-400" />
        </div>

        <div className="flex justify-between items-center mt-1">
          <span className="text-slate-500">POSTGRES POOL LOAD:</span>
          <span className="text-pink-400 font-bold">{mem}GB / 32GB</span>
        </div>
        <div className="h-1 bg-slate-900 rounded overflow-hidden">
          <div style={{ width: `${(mem / 32) * 100}%` }} className="h-full bg-pink-400" />
        </div>
      </div>

      <div className="border-t border-slate-900 pt-2 flex flex-col gap-1.5 text-slate-500 text-[8px]">
        <div className="flex justify-between">
          <span>FASTAPI ASYNC:</span>
          <span className="text-cyan-400 font-bold">ONLINE (uvicorn)</span>
        </div>
        <div className="flex justify-between">
          <span>DOCUMENT ENGINE:</span>
          <span className="text-green-400 font-bold">READY (stateless)</span>
        </div>
        <div className="flex justify-between">
          <span>DEVICE ORCHESTRATOR:</span>
          <span className="text-yellow-400 font-bold">SUPERVISOR ACTIVE</span>
        </div>
      </div>
    </div>
  );
};

const QuickSystemIndex: React.FC = () => {
  return (
    <div
      className="hud-panel p-4 flex flex-col gap-3 font-mono text-[10px]"
      style={{ border: '1px solid rgba(var(--cyber-cyan-rgb), 0.25)' }}
    >
      <div className="border-b border-slate-900 pb-2 text-slate-400 tracking-wider flex items-center gap-2">
        <Database size={12} className="text-cyan-400" />
        PORTFOLIO SYSTEM HIGHLIGHTS
      </div>

      <div className="flex flex-col gap-2.5 text-slate-400 text-[9px] leading-relaxed">
        <div className="flex gap-2 items-start">
          <ShieldCheck size={12} className="text-cyan-400 mt-0.5 flex-shrink-0" />
          <div>
            <span className="font-bold text-slate-300">DIZCLSR DISCLOSURE ENGINE</span>
            <p className="text-[8px] text-slate-500">
              BSE/NSE feed ingestion & Python Document Engine for financial PDF extraction.
            </p>
          </div>
        </div>
        <div className="flex gap-2 items-start">
          <HardDrive size={12} className="text-green-400 mt-0.5 flex-shrink-0" />
          <div>
            <span className="font-bold text-slate-300">CP-KYC COMPLIANCE</span>
            <p className="text-[8px] text-slate-500">
              LangGraph multi-agent compliance workflows with 40% speedup & 70% data reduction.
            </p>
          </div>
        </div>
        <div className="flex gap-2 items-start">
          <GitBranch size={12} className="text-yellow-400 mt-0.5 flex-shrink-0" />
          <div>
            <span className="font-bold text-slate-300">DEVICE ORCHESTRATION</span>
            <p className="text-[8px] text-slate-500">
              Android hardware fleet automation, ADB drivers & self-healing watchdog.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export function App() {
  const [mode, setMode] = useState('intro');
  const [audioMuted, setAudioMuted] = useState(true);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [selectedTimelineIndex, setSelectedTimelineIndex] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();

  // If user is on a project subpage, mode is project
  const isCaseStudyRoute = location.pathname.startsWith('/projects/');

  return (
    <div className="crt-screen relative min-h-screen w-full bg-[#03030d] text-slate-200">
      {/* 3D WebGL Space Canvas backdrop */}
      <SpaceCanvas
        mode={mode}
        selectedSkill={selectedSkill}
        selectedTimelineIndex={selectedTimelineIndex}
        onPlanetClick={(planet) => {
          setSelectedSkill(planet);
          setMode('skills');
          if (location.pathname !== '/') navigate('/');
        }}
      />

      {/* Futuristic Cockpit HUD border brackets */}
      <div className="fixed inset-0 border border-cyan-500/10 pointer-events-none z-40">
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-400/40" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-400/40" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-400/40" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-400/40" />
      </div>

      {/* Top Nav Control HUD */}
      <Navbar
        mode={isCaseStudyRoute ? 'missions' : mode}
        setMode={(m) => {
          setMode(m);
          if (location.pathname !== '/') {
            navigate('/');
          }
          if (m !== 'skills') setSelectedSkill(null);
        }}
        audioMuted={audioMuted}
        toggleAudio={() => {
          const next = !audioMuted;
          setAudioMuted(next);
          spaceAudio.setMute(next);
        }}
      />

      {/* Main Content Area */}
      <main className="w-full pt-20 px-3 sm:px-6 pb-8 relative z-10">
        <Routes>
          {/* Detailed Project Case Study Deep-Dive */}
          <Route path="/projects/:projectId" element={<ProjectCaseStudy />} />

          {/* Main Dashboard Interactive Cockpit View */}
          <Route
            path="/"
            element={
              <div
                style={{
                  width: '100%',
                  display: 'grid',
                  gridTemplateColumns: 'minmax(260px, 300px) 1fr minmax(240px, 280px)',
                  gap: 20,
                  minHeight: 'calc(100vh - 100px)',
                }}
                className="flex flex-col lg:grid"
              >
                {/* Left HUD Panel (AI Assistant) */}
                <aside className="hidden lg:flex flex-col h-full sticky top-24 max-h-[calc(100vh-120px)] overflow-hidden">
                  <AiAssistant audioMuted={audioMuted} />
                </aside>

                {/* Central Dashboard HUD panel */}
                <div className="flex-1 w-full min-h-[75vh] lg:max-h-[calc(100vh-120px)] overflow-y-auto pr-1">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={mode}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.3 }}
                      className="w-full flex flex-col gap-8 pb-10"
                    >
                      {/* OVERVIEW (Intro + Highlights + About) */}
                      {mode === 'intro' && (
                        <div className="flex flex-col gap-10">
                          <Hero
                            onViewWork={() => setMode('missions')}
                            audioMuted={audioMuted}
                          />
                          <EngineeringHighlights />
                          <About />
                        </div>
                      )}

                      {/* SKILLS / TECH STACK */}
                      {mode === 'skills' && (
                        <Skills
                          selectedSkill={selectedSkill}
                          setSelectedSkill={setSelectedSkill}
                        />
                      )}

                      {/* PROJECTS */}
                      {mode === 'missions' && <Projects />}

                      {/* FULL STACK CAPABILITY */}
                      {mode === 'fullstack' && <FullStackSection />}

                      {/* EXPERIENCE */}
                      {mode === 'timeline' && (
                        <Experience
                          selectedIndex={selectedTimelineIndex}
                          setSelectedIndex={setSelectedTimelineIndex}
                        />
                      )}

                      {/* ENGINEERING NOTES */}
                      {mode === 'notes' && <EngineeringNotes />}

                      {/* CONTACT */}
                      {mode === 'contact' && <Contact />}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Right HUD Panel (Cockpit System Monitors) */}
                <aside className="hidden lg:flex flex-col gap-4 sticky top-24 max-h-[calc(100vh-120px)] overflow-hidden">
                  <SystemMonitorHUD />
                  <QuickSystemIndex />
                </aside>
              </div>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Hero audioMuted={audioMuted} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;