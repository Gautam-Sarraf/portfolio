import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import SpaceCanvas from './components/SpaceCanvas';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import AiAssistant from './components/AiAssistant';
import AmongUsFollower from './components/AmongUsFollower';
import { spaceAudio } from './utils/audio';
import { Cpu, ShieldCheck, Database, HardDrive } from 'lucide-react';

const SystemMonitorHUD: React.FC = () => {
  const [cpu, setCpu] = useState(12);
  const [gpu, setGpu] = useState(42);
  const [mem, setMem] = useState(5.4);

  // Simulate real-time hardware HUD diagnostics
  useEffect(() => {
    const timer = setInterval(() => {
      setCpu(Math.floor(Math.random() * 8) + 8);
      setGpu(Math.floor(Math.random() * 4) + 40);
      setMem(parseFloat((5.2 + Math.random() * 0.3).toFixed(1)));
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="hud-panel p-4 flex flex-col gap-3 font-mono text-[10px]"
      style={{ border: '1px solid rgba(var(--cyber-cyan-rgb), 0.25)' }}
    >
      <div className="border-b border-slate-900 pb-2 text-slate-400 tracking-wider flex items-center gap-2">
        <Cpu size={12} className="text-cyan-400 animate-spin" style={{ animationDuration: '8s' }} />
        SYSTEM PERFORMANCE MONITOR
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <span className="text-slate-500">CPU LOAD:</span>
          <span className="text-cyan-400 font-bold">{cpu}%</span>
        </div>
        <div className="h-1 bg-slate-900 rounded overflow-hidden">
          <div style={{ width: `${cpu * 4}%` }} className="h-full bg-cyan-400" />
        </div>

        <div className="flex justify-between items-center mt-1">
          <span className="text-slate-500">GPU TEMP:</span>
          <span className="text-green-400 font-bold">{gpu}°C</span>
        </div>
        <div className="h-1 bg-slate-900 rounded overflow-hidden">
          <div style={{ width: `${gpu}%` }} className="h-full bg-green-400" />
        </div>

        <div className="flex justify-between items-center mt-1">
          <span className="text-slate-500">RAM LOAD:</span>
          <span className="text-pink-400 font-bold">{mem}GB / 32GB</span>
        </div>
        <div className="h-1 bg-slate-900 rounded overflow-hidden">
          <div style={{ width: `${(mem / 32) * 100}%` }} className="h-full bg-pink-400" />
        </div>
      </div>

      <div className="border-t border-slate-900 pt-2 flex flex-col gap-1.5 text-slate-500 text-[8px]">
        <div className="flex justify-between">
          <span>ACTIVE THREADS:</span>
          <span className="text-cyan-400">12 ACTIVE</span>
        </div>
        <div className="flex justify-between">
          <span>SECURITY AUDIT:</span>
          <span className="text-cyan-400">100% PASS</span>
        </div>
        <div className="flex justify-between">
          <span>SYSTEM INTEGRITY:</span>
          <span className="text-cyan-400">STABLE</span>
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
        PORTFOLIO INDEX CORES
      </div>

      <div className="flex flex-col gap-2.5 text-slate-400 text-[9px] leading-relaxed">
        <div className="flex gap-2 items-start">
          <ShieldCheck size={12} className="text-cyan-400 mt-0.5 flex-shrink-0" />
          <div>
            <span className="font-bold text-slate-300">AI & RAG ARCHITECTURES</span>
            <p className="text-[8px] text-slate-500">Vector store setups and semantic text search integrations.</p>
          </div>
        </div>
        <div className="flex gap-2 items-start">
          <HardDrive size={12} className="text-green-400 mt-0.5 flex-shrink-0" />
          <div>
            <span className="font-bold text-slate-300">AUTOMATION SYSTEMS</span>
            <p className="text-[8px] text-slate-500">Headless scraping agents and shift scheduling solvers.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [mode, setMode] = useState('intro');
  const [booted, setBooted] = useState(false);
  const [audioMuted, setAudioMuted] = useState(true);

  // States linking Skill planet zooms and Timeline stations
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [selectedTimelineIndex, setSelectedTimelineIndex] = useState(2); // Default to current role

  // Force sound system to sync on user bootup
  const handleBootComplete = () => {
    setBooted(true);
  };

  return (
    <div className="crt-screen relative w-screen h-screen overflow-hidden bg-black text-slate-200 select-none">
      <AmongUsFollower />
      {/* 3D WebGL Space Canvas backdrop */}
      <SpaceCanvas
        mode={mode}
        selectedSkill={selectedSkill}
        selectedTimelineIndex={selectedTimelineIndex}
        onPlanetClick={(planet) => {
          setSelectedSkill(planet);
          setMode('skills');
        }}
      />

      {/* Futuristic Grid Cockpit HUD border overlay */}
      <div className="absolute inset-0 border border-cyan-500/10 pointer-events-none z-50">
        {/* Subtle grid corner brackets */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-400/40" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-400/40" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-400/40" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-400/40" />
      </div>

      {/* Top Nav Control HUD */}
      {booted && (
        <Navbar
          mode={mode}
          setMode={(m) => {
            setMode(m);
            // reset zoom targets upon tab change
            if (m !== 'skills') setSelectedSkill(null);
          }}
          audioMuted={audioMuted}
          toggleAudio={() => {
            const next = !audioMuted;
            setAudioMuted(next);
            spaceAudio.setMute(next);
          }}
        />
      )}

      {/* Main Content frame */}
      <div className="w-full h-full pt-16 px-4 md:px-6 pb-6 relative z-10 flex items-center justify-center">
        {!booted ? (
          <Hero
            onBootComplete={handleBootComplete}
            audioMuted={audioMuted}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'grid',
              gridTemplateColumns: 'minmax(280px, 320px) 1fr minmax(240px, 280px)',
              gap: 20,
            }}
            className="flex flex-col lg:grid"
          >
            {/* Left HUD Panel (AI Voice Assistant) */}
            <div className="hidden lg:flex flex-col h-full max-h-[82vh]">
              <AiAssistant audioMuted={audioMuted} />
            </div>

            {/* Central Dashboard HUD panel */}
            <div className="flex-1 h-full max-h-[75vh] lg:max-h-[82vh] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={mode}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full"
                >
                  {mode === 'intro' && (
                    <div className="w-full h-full flex items-center justify-center">
                      <Hero onBootComplete={() => {}} audioMuted={audioMuted} />
                    </div>
                  )}
                  {mode === 'skills' && (
                    <Skills
                      selectedSkill={selectedSkill}
                      setSelectedSkill={setSelectedSkill}
                    />
                  )}
                  {mode === 'missions' && <Projects />}
                  {mode === 'timeline' && (
                    <Experience
                      selectedIndex={selectedTimelineIndex}
                      setSelectedIndex={setSelectedTimelineIndex}
                    />
                  )}
                  {mode === 'contact' && <Contact />}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right HUD Panel (Cockpit System Monitors) */}
            <div className="hidden lg:flex flex-col gap-4 h-full max-h-[82vh]">
              <SystemMonitorHUD />
              <QuickSystemIndex />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;