import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, GitPullRequest, ExternalLink, Network, FileCode, CheckCircle } from 'lucide-react';
import { spaceAudio } from '../utils/audio';

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  problem: string;
  architecture: string;
  tech: string[];
  challenges: string;
  impact: string;
  github: string;
  demo?: string | null;
  nodes: string[]; // for blueprint visualization
}

const MISSIONS: Project[] = [
  {
    id: "resume-analyzer",
    title: "Resume Analyzer AI",
    subtitle: "ATS Optimization Pipeline",
    description: "AI engine that parses resumes, analyzes skill alignment against job specs, and provides ATS improvement recommendations.",
    problem: "Manual screening of hundreds of resumes results in massive recruiter overhead and high candidate false-negatives due to keyword filters.",
    architecture: "PDF Extractor -> FastAPI Node -> OpenAI Embeddings -> Vector Similarity Score -> ATS Report Generator.",
    tech: ["Python", "FastAPI", "OpenAI API", "FAISS", "NLP", "React"],
    challenges: "Handling nested multi-column PDF layouts and extracting structured sections accurately without losing layout context.",
    impact: "Boosted candidate selection matching accuracy by 44% and reduced ATS drop-offs.",
    github: "https://github.com/gautam-sarraf",
    nodes: ["User Upload", "FastAPI Parser", "OpenAI NLP", "ATS Scorer", "Report UI"],
  },
  {
    id: "pdf-chatbot",
    title: "PDF Chatbot RAG",
    subtitle: "Semantic Doc Q&A System",
    description: "RAG chatbot allowing users to upload large PDF books and query them using natural language with source attribution.",
    problem: "Static document search fails to resolve semantic queries, forcing users to manually read long manuals to answer simple questions.",
    architecture: "PDF Chunking -> OpenAI Ada -> Pinecone/ChromaDB -> RAG Context Fetcher -> GPT-4 Response Stream.",
    tech: ["Python", "OpenAI", "LangChain", "ChromaDB", "FastAPI", "React"],
    challenges: "Preventing model hallucination on domain-specific manuals and optimizing semantic chunk-overlap search parameters.",
    impact: "Instant context-aware document queries with 99.1% factual retrieval accuracy.",
    github: "https://github.com/gautam-sarraf",
    nodes: ["PDF Book", "LangChain Chunk", "Vector DB", "Context RAG", "GPT-4 Stream"],
  },
  {
    id: "cp-kyc",
    title: "CP-KYC Automation",
    subtitle: "AI Agent Verification",
    description: "Enterprise compliance agent scraping public database registries to verify company corporate registrations automatically.",
    problem: "KYC verification takes days of manual search across scattered international databases, leading to client onboarding delays.",
    architecture: "Web Agent -> Puppeteer Node -> OCR Parser -> Risk Analysis Agent -> Approval Dashboard.",
    tech: ["Python", "FastAPI", "Puppeteer", "PostgreSQL", "Docker", "REST API"],
    challenges: "Overcoming strict scraping blocks (Cloudflare, Captchas) on government registry databases and structuring raw data.",
    impact: "Decreased corporate KYC validation timeline from 48 hours to under 3 minutes.",
    github: "https://github.com/gautam-sarraf",
    nodes: ["Corporate Request", "Scraper Node", "OCR Validation", "Risk Core", "SQL DB"],
  },
  {
    id: "ot-scheduler",
    title: "OT Scheduler Platform",
    subtitle: "Shift Allocation Engine",
    description: "Overtime allocation system matching shift schedules with staff requirements, constraints, and historical records.",
    problem: "Manual shift allocation creates roster conflicts, labor compliance violations, and uneven overtime distribution.",
    architecture: "Constraint Solver Node -> Express JS -> PostgreSQL -> Roster Grid UI.",
    tech: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL", "Tailwind"],
    challenges: "Designing an algorithm that satisfies 15+ shift constraints simultaneously while distributing hours fairly.",
    impact: "Zero roster scheduling conflicts across 3 active corporate divisions.",
    github: "https://github.com/gautam-sarraf",
    nodes: ["Roster Requests", "Constraint Solver", "Postgres Write", "Live Dashboard"],
  },
  {
    id: "ai-chat-app",
    title: "AI Chat Application",
    subtitle: "Real-time AI Assistant",
    description: "Websocket-enabled client dashboard connecting users directly to customized LLM agent channels with memory logs.",
    problem: "Traditional chatbot wrappers lack state persistence, conversation branches, and smooth multi-user chat distribution.",
    architecture: "React Client -> WS Gateway -> Redis PubSub -> OpenAI Agent -> MongoDB Memory store.",
    tech: ["Next.js", "TypeScript", "WebSockets", "Redis", "MongoDB", "OpenAI API"],
    challenges: "Handling token streaming overhead over active WebSocket connections without causing dashboard UI freezes.",
    impact: "Smooth real-time chat with latency under 180ms.",
    github: "https://github.com/gautam-sarraf",
    nodes: ["Web Interface", "WS Socket Gateway", "Redis Queue", "OpenAI Stream", "Mongo DB"],
  },
  {
    id: "teamsphere",
    title: "TeamSphere Hub",
    subtitle: "MERN Collaborative Suite",
    description: "Collaboration platform with WebSocket channels, peer-to-peer audio calls, whiteboard sharing, and file logs.",
    problem: "Disjointed team tool chains (chat, whiteboards, calls) lead to context switching and productivity leaks.",
    architecture: "React Gateway -> Express API -> Socket.io Server -> WebRTC Mesh -> MongoDB.",
    tech: ["MongoDB", "Express", "React", "Node.js", "Socket.io", "WebRTC"],
    challenges: "Synchronizing state updates on the interactive canvas whiteboard for dozens of concurrent peer clients.",
    impact: "Consolidated team files and chat pipelines into a single portal.",
    github: "https://github.com/Gautam-Sarraf/TeamSphere",
    nodes: ["Team Clients", "Socket.io Server", "WebRTC Peer", "Mongo Cluster"],
  },
  {
    id: "marketplace",
    title: "Marketplace Platform",
    subtitle: "Full Stack Storefront",
    description: "High-performance ecommerce portal with elastic search, product metrics, and checkout pipelines.",
    problem: "Slow database search and sluggish page loads reduce cart conversions in high-traffic product catalog listings.",
    architecture: "Next.js Frontend -> Node API -> ElasticSearch Cluster -> Stripe Node -> MongoDB.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Stripe API", "Redux"],
    challenges: "Implementing webhooks to securely process payments and update inventory indexes during concurrent race conditions.",
    github: "https://github.com/gautam-sarraf",
    nodes: ["Customer UI", "Products API", "Stripe Checkout", "Inventory Node", "Mongo DB"],
  },
  {
    id: "ggs-forex",
    title: "GGs Forex Board",
    subtitle: "Exchange Rates Tracker",
    description: "Live forex visualization panel tracking currency fluctuations and charts with responsive analytics.",
    problem: "Sluggish rate fetches and static charts delay decision vectors for active currency trading operators.",
    architecture: "React Frontend -> Forex API -> Chart.js renderer -> Live Alert Hook.",
    tech: ["React", "JavaScript", "Chart.js", "REST API", "CSS3"],
    challenges: "Structuring canvas chart re-draw routines to load years of historical forex trends seamlessly on mobile screens.",
    github: "https://github.com/gautam-sarraf",
    nodes: ["Visitor Client", "Forex Stream", "Chart.js Render", "Alert Dispatcher"],
  },
  {
    id: "pmch-portal",
    title: "PMCH Platform",
    subtitle: "Healthcare Admin System",
    description: "Holographic patient tracker, appointment planner, and clinical diagnostic workflow logs.",
    problem: "Hospital intake logs suffer from cluttered UIs and complex clinical routing interfaces, causing operational slowdowns.",
    architecture: "React Core -> Node Gateway -> MongoDB Hospital cluster -> Admin Shield.",
    tech: ["React", "TypeScript", "Tailwind", "Node.js", "MongoDB"],
    challenges: "Strict compliance schema constraints and ensuring atomic record updates across different clinic departments.",
    github: "https://github.com/gautam-sarraf",
    nodes: ["Patient Intake", "Admin Router", "Node Sanitizer", "MongoDB Medical"],
  },
];

// Blueprint canvas visualizer component
const BlueprintVisualizer: React.FC<{ nodes: string[] }> = ({ nodes }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.04;

      const nodeCount = nodes.length;
      const centerY = canvas.height / 2;
      const stepX = canvas.width / (nodeCount + 0.5);

      const nodeCoords = nodes.map((name, idx) => ({
        name,
        x: stepX * (idx + 0.75),
        y: centerY + Math.sin(time + idx) * 4, // floating
      }));

      // Draw connection lines
      ctx.strokeStyle = 'rgba(0, 253, 216, 0.25)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let i = 0; i < nodeCoords.length - 1; i++) {
        ctx.moveTo(nodeCoords[i].x, nodeCoords[i].y);
        ctx.lineTo(nodeCoords[i + 1].x, nodeCoords[i + 1].y);
      }
      ctx.stroke();

      // Draw flowing packets/energy particles
      nodeCoords.forEach((node, idx) => {
        if (idx < nodeCoords.length - 1) {
          const nextNode = nodeCoords[idx + 1];
          const t = (time * 0.4 + idx * 0.2) % 1.0;
          
          const px = node.x + (nextNode.x - node.x) * t;
          const py = node.y + (nextNode.y - node.y) * t;

          ctx.fillStyle = '#a855f7';
          ctx.beginPath();
          ctx.arc(px, py, 4, 0, Math.PI * 2);
          ctx.fill();

          // pulse glow
          ctx.fillStyle = 'rgba(168, 85, 247, 0.2)';
          ctx.beginPath();
          ctx.arc(px, py, 8, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Draw nodes
      nodeCoords.forEach((node) => {
        // glowing background
        ctx.fillStyle = 'rgba(7, 10, 30, 0.9)';
        ctx.strokeStyle = 'var(--cyber-cyan)';
        ctx.lineWidth = 2;
        
        ctx.beginPath();
        ctx.rect(node.x - 45, node.y - 18, 90, 36);
        ctx.fill();
        ctx.stroke();

        // mini brackets
        ctx.strokeStyle = 'rgba(0, 253, 216, 0.5)';
        ctx.lineWidth = 1;
        ctx.strokeRect(node.x - 49, node.y - 22, 98, 44);

        // Node text label
        ctx.fillStyle = '#e2e8f0';
        ctx.font = '8px "Share Tech Mono"';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.name.toUpperCase(), node.x, node.y);
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [nodes]);

  return (
    <div className="bg-slate-950/80 border border-slate-900 rounded p-4 relative h-40 overflow-hidden">
      <div className="absolute top-2 left-3 font-mono text-[9px] text-slate-500 tracking-wider flex items-center gap-2">
        <Network size={11} className="text-cyan-400" />
        TACTICAL_ARCHITECTURE_FLOWSHEET
      </div>
      <canvas
        ref={canvasRef}
        width={500}
        height={160}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

const Projects: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeMission = MISSIONS[activeIdx];

  const handleSelect = (idx: number) => {
    spaceAudio.playClick();
    setActiveIdx(idx);
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'grid',
        gridTemplateColumns: 'minmax(240px, 1fr) 2fr',
        gap: 20,
        padding: '24px',
        overflow: 'hidden',
      }}
      className="flex flex-col lg:grid"
    >
      {/* Left panel: Mission list */}
      <div
        className="hud-panel p-4 overflow-y-auto flex flex-col gap-2 max-h-[40vh] lg:max-h-[82vh]"
        style={{ border: '1px solid rgba(var(--cyber-cyan-rgb), 0.25)' }}
      >
        <div className="font-mono text-[10px] tracking-wider text-slate-400 border-b border-slate-900 pb-2 mb-2 flex items-center gap-2">
          <Shield size={12} className="text-cyan-400" />
          AVAILABLE_MISSIONS
        </div>
        
        {MISSIONS.map((m, idx) => {
          const isActive = idx === activeIdx;
          return (
            <button
              key={m.id}
              onClick={() => handleSelect(idx)}
              onMouseEnter={() => spaceAudio.playHover()}
              style={{
                width: '100%',
                padding: '12px 14px',
                textAlign: 'left',
                borderRadius: 6,
                border: 'none',
                background: isActive ? 'linear-gradient(135deg, rgba(var(--cyber-cyan-rgb), 0.15), rgba(var(--cyber-green-rgb), 0.05))' : 'rgba(255,255,255,0.02)',
                color: isActive ? 'var(--cyber-cyan)' : 'var(--text-primary)',
                borderLeft: isActive ? '3px solid var(--cyber-cyan)' : '3px solid transparent',
                cursor: 'none',
                transition: 'all 0.2s',
              }}
              className="flex justify-between items-center group hover:bg-slate-900/60"
            >
              <div>
                <div className="font-mono text-[11px] font-bold tracking-wider">{m.title.toUpperCase()}</div>
                <div className="font-mono text-[8px] text-slate-500 mt-0.5 tracking-widest">{m.subtitle.toUpperCase()}</div>
              </div>
              <span className="text-[10px] opacity-25 group-hover:opacity-100 transition-opacity">🛡️</span>
            </button>
          );
        })}
      </div>

      {/* Right panel: Active Mission Details */}
      <div
        className="hud-panel p-6 overflow-y-auto flex flex-col gap-5 max-h-[60vh] lg:max-h-[82vh]"
        style={{ border: '1px solid rgba(var(--cyber-cyan-rgb), 0.25)' }}
      >
        {/* Mission top banner */}
        <div className="flex justify-between items-start border-b border-slate-900 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 bg-cyan-900/50 border border-cyan-500/40 text-cyan-400 font-mono text-[8px] tracking-widest rounded-sm">
                MISSION ACTIVE
              </span>
              <span className="text-slate-600 font-mono text-[9px]">FILE://{activeMission.id}.obj</span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 900, color: 'var(--cyber-cyan)' }}>
              {activeMission.title}
            </h2>
            <p className="font-mono text-[10px] text-slate-400 tracking-wider uppercase mt-1">
              Objective: {activeMission.subtitle}
            </p>
          </div>

          <div className="flex gap-2">
            <a
              href={activeMission.github}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => spaceAudio.playHover()}
              className="p-2 border border-slate-800 hover:border-cyan-500/40 text-slate-400 hover:text-cyan-400 rounded transition-colors cursor-none bg-slate-950/60"
            >
              <GitPullRequest size={14} />
            </a>
            {activeMission.demo && (
              <a
                href={activeMission.demo}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => spaceAudio.playHover()}
                className="p-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded transition-colors cursor-none flex items-center gap-1.5 font-mono text-[9px] font-bold"
              >
                <ExternalLink size={11} /> LAUNCH
              </a>
            )}
          </div>
        </div>

        {/* Dynamic Canvas System Blueprint */}
        <BlueprintVisualizer nodes={activeMission.nodes} />

        {/* Detailed mission logs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-[10px] leading-relaxed">
          <div className="border border-slate-900/60 p-4 bg-slate-950/40 rounded flex flex-col gap-2">
            <span className="text-pink-500 tracking-wider border-b border-slate-900 pb-1 mb-1 font-bold">
              [PROBLEM DEFINITION]
            </span>
            <span className="text-slate-300">{activeMission.problem}</span>
          </div>

          <div className="border border-slate-900/60 p-4 bg-slate-950/40 rounded flex flex-col gap-2">
            <span className="text-cyan-400 tracking-wider border-b border-slate-900 pb-1 mb-1 font-bold">
              [INTELLIGENT ARCHITECTURE]
            </span>
            <span className="text-slate-300">{activeMission.architecture}</span>
          </div>

          <div className="border border-slate-900/60 p-4 bg-slate-950/40 rounded flex flex-col gap-2">
            <span className="text-orange-400 tracking-wider border-b border-slate-900 pb-1 mb-1 font-bold">
              [CRITICAL CHALLENGES]
            </span>
            <span className="text-slate-300">{activeMission.challenges}</span>
          </div>

          <div className="border border-slate-900/60 p-4 bg-slate-950/40 rounded flex flex-col gap-2">
            <span className="text-green-400 tracking-wider border-b border-slate-900 pb-1 mb-1 font-bold">
              [MISSION IMPACT / METRICS]
            </span>
            <span className="text-slate-300 flex items-start gap-2">
              <CheckCircle size={12} className="text-green-400 mt-0.5 flex-shrink-0" />
              {activeMission.impact}
            </span>
          </div>
        </div>

        {/* Tech Stack inventory tags */}
        <div className="border-t border-slate-900 pt-4 flex flex-wrap gap-2 items-center">
          <FileCode size={13} className="text-slate-500" />
          <span className="font-mono text-[9px] text-slate-500 tracking-widest uppercase mr-2">EQUIPPED MODULES:</span>
          {activeMission.tech.map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 bg-slate-900 border border-slate-800 text-cyan-400 font-mono text-[9px] tracking-wider rounded-sm hover:border-cyan-500/30 transition-all"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
