import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, RefreshCw, Layers } from "lucide-react";
import { spaceAudio } from "../utils/audio";
import { SKILL_PLANETS } from "./SpaceCanvas";

interface SkillsProps {
  selectedSkill: string | null;
  setSelectedSkill: (skill: string | null) => void;
}

const SKILL_DETAILS: Record<
  string,
  {
    level: number;
    role: string;
    useCase: string;
    projects: string[];
    desc: string;
  }
> = {
  Java: {
    level: 75,
    role: "Object-Oriented Programming Core",
    desc: "Rigorous academic and algorithmic backend foundations utilizing typed OOP.",
    useCase:
      "Developing data structures, algorithmic puzzles, and fundamental software design.",
    projects: ["University Lab Projects"],
  },
  JavaScript: {
    level: 85,
    role: "Dynamic Scripting Core",
    desc: "Primary scripting standard for clientside dynamics, socket logic, and fullstack applications.",
    useCase:
      "Developing UI scripts, canvas integrations, and scalable middleware handlers.",
    projects: ["TeamSphere Hub", "Marketplace Platform", "GGs Forex Board"],
  },
  Python: {
    level: 86,
    role: "AI Orchestration & Script Automation Core",
    desc: "Leading language for web crawling algorithms, predictive API engines, and data pipeline tasks.",
    useCase:
      "Coordinating multi-agent systems, file scraping automation, and document parser routines.",
    projects: [
      "Research Assistant AI",
      "Resume Analyzer AI",
      "PDF Chatbot RAG",
      "CP-KYC Automation",
    ],
  },
  SQL: {
    level: 80,
    role: "Relational Queries & Schemas",
    desc: "Query optimization, indexing structures, and relational layout planning.",
    useCase:
      "Storing constraint variables, staff rosters, and client onboarding accounts.",
    projects: ["OT Scheduler Platform"],
  },
  "Node.js": {
    level: 82,
    role: "Server Platform Core",
    desc: "Event-driven runtime engine for high-traffic real-time websocket and server setups.",
    useCase:
      "Coordinating media sockets, real-time whiteboards, and API routes.",
    projects: ["TeamSphere Hub", "AI Chat Application", "Marketplace Platform"],
  },
  "Express.js": {
    level: 82,
    role: "Server Middleware Routing",
    desc: "Flexible routing engine supporting auth configurations and clean endpoint handlers.",
    useCase:
      "Exposing checkout links, scheduling records, and static website configurations.",
    projects: [
      "TeamSphere Hub",
      "OT Scheduler Platform",
      "Marketplace Platform",
    ],
  },
  FastAPI: {
    level: 80,
    role: "Async REST APIs",
    desc: "High-speed Python framework leveraging ASGI for quick AI inference calls and vector retrieval.",
    useCase:
      "Processing document parses, returning similarity scores, and serving AI responses.",
    projects: [
      "Research Assistant AI",
      "Resume Analyzer AI",
      "PDF Chatbot RAG",
      "CP-KYC Automation",
    ],
  },
  "REST APIs": {
    level: 88,
    role: "API Integration Core",
    desc: "Constructing and integrating clean HTTP routing protocols with schema validation.",
    useCase:
      "Connecting client dashboards to backend scrapers and automated AI pipelines.",
    projects: ["Resume Analyzer AI", "CP-KYC Automation", "GGs Forex Board"],
  },
  WebSockets: {
    level: 85,
    role: "Bi-directional Real-Time Data",
    desc: "Establish low-latency, active communication pipelines between UI clients and hosting servers.",
    useCase:
      "Updating shared drawings on whiteboard canvas and streaming chat outputs in real-time.",
    projects: ["TeamSphere Hub", "AI Chat Application"],
  },
  "Cron Jobs": {
    level: 78,
    role: "Time-Scheduled Tasks",
    desc: "Automating background task loops, database cleanups, and regular system audits.",
    useCase:
      "Scheduling company registry scrapes and database constraints verification.",
    projects: ["CP-KYC Automation", "OT Scheduler Platform"],
  },
  "React.js": {
    level: 88,
    role: "Core Web Component Library",
    desc: "Creating modular component panels, global state context systems, and interactive 2D/3D visual layers.",
    useCase:
      "Building ATS metrics tools, clinical admin rosters, and dashboard screens.",
    projects: [
      "Research Assistant AI",
      "Resume Analyzer AI",
      "PDF Chatbot RAG",
      "OT Scheduler Platform",
      "TeamSphere Hub",
    ],
  },
  HTML: {
    level: 90,
    role: "Semantic Web Structure",
    desc: "Valid, search-optimized page layouts employing modern HTML5 elements.",
    useCase:
      "Building page forms, blueprint graphs, and clean navigation layouts.",
    projects: ["All Front-End Systems"],
  },
  CSS: {
    level: 85,
    role: "Futuristic Styling & Aesthetics",
    desc: "Configuring layout stylesheets, neon glows, glass effects, and micro-interactions.",
    useCase: "Implementing dark theme dashboards, neon grids, and animations.",
    projects: ["All Front-End Systems", "GGs Forex Board"],
  },
  TypeScript: {
    level: 82,
    role: "Strict Type Safety Core",
    desc: "Catching runtime bugs at build time and mapping exact interface data templates.",
    useCase:
      "Defining types for API bodies, component states, and canvas drawings.",
    projects: ["OT Scheduler Platform", "TeamSphere Hub", "PMCH Platform"],
  },
  MongoDB: {
    level: 80,
    role: "NoSQL Document DB",
    desc: "Flexible, horizontally-scalable JSON document database for logging multi-format files.",
    useCase:
      "Storing whiteboard coordinate history, user channels, and clinical check-in logs.",
    projects: ["TeamSphere Hub", "AI Chat Application", "Marketplace Platform"],
  },
  MySQL: {
    level: 78,
    role: "Relational DB Engine",
    desc: "Handling strict schemas, database keys, and transactional integrity checks.",
    useCase:
      "Managing employee profiles, shifts database, and user credentials.",
    projects: ["OT Scheduler Platform", "University Systems"],
  },
  PostgreSQL: {
    level: 80,
    role: "Relational DB Engine",
    desc: "Handling strict schemas, database keys, and transactional integrity checks.",
    useCase:
      "Managing user data, Financial Data, Scraped Data",
    projects: ["OT Scheduler Platform", "PDF Chatbot", "CP-Kyc"],
  },
  Redis: {
    level: 75,
    role: "In-Memory Caching & Broker",
    desc: "Leveraged for low-latency request caching and high-speed message pub/sub broadcasting.",
    useCase: "Broadcasting WebSocket events and caching parsed API payloads.",
    projects: ["AI Chat Application", "CP-KYC"],
  },
  Git: {
    level: 85,
    role: "Version Control",
    desc: "Code repository branch tracking, code merging, and pull request audits.",
    useCase: "Synchronizing development branches and resolving code conflicts.",
    projects: ["All Repositories"],
  },
  GitHub: {
    level: 85,
    role: "Collaborative Code Management",
    desc: "Publishing source records, code reviews, tracking features, and deployment integration.",
    useCase: "Managing public code repos and automated workflow triggers.",
    projects: ["All Repositories"],
  },
  GitLab: {
    level: 70,
    role: "DevOps Lifecycle Integration",
    desc: "Repository management and deployment checks within secure company teams.",
    useCase: "Configuring staging code reviews and team commits validation.",
    projects: ["Webninjaz Internal Systems"],
  },
  "GitHub Actions": {
    level: 75,
    role: "CI/CD Pipeline Automation",
    desc: "Configuring automated test runners, type checking, and deployment jobs.",
    useCase: "Running linters and building applications automatically on push.",
    projects: ["All Active Repositories"],
  },
  Postman: {
    level: 82,
    role: "API Diagnostic Audits",
    desc: "Inspecting API responses, header parameters, and writing mock tests.",
    useCase:
      "Testing FastAPI endpoints and Express routes before UI implementation.",
    projects: ["All Backend Projects"],
  },
  Linux: {
    level: 78,
    role: "Server Environments",
    desc: "Command-line navigation, shell scripting, and application environment setups.",
    useCase: "Configuring cloud servers and managing runtime containers.",
    projects: ["Webninjaz Systems", "Render Deployment"],
  },
  "VS Code": {
    level: 90,
    role: "Primary Coding Environment",
    desc: "Configuring workspace scripts, key mappings, syntax checkers, and dev server launches.",
    useCase: "Authoring, debugging, and managing all software packages.",
    projects: ["All Projects"],
  },
  "Web Scraping": {
    level: 88,
    role: "Data Extraction Pipelines",
    desc: "Extracting data from web systems while evading CAPTCHA blocks and Cloudflare shielding.",
    useCase:
      "Mining business registration data automatically from international registries.",
    projects: ["CP-KYC Automation", "Semantri AI"],
  },
  "Automation Scripts": {
    level: 85,
    role: "Process Automation",
    desc: "Custom scripts to optimize system maintenance and reduce manual operational work.",
    useCase:
      "Sanitizing databases, triggering notifications, and scheduling API downloads.",
    projects: ["Webninjaz Intern Tasks", "CP-KYC Automation"],
  },
  "AI Agents": {
    level: 84,
    role: "Intelligent Systems Core",
    desc: "Creating autonomous agents that orchestrate tools and use reasoning cycles.",
    useCase:
      "Building KYC company registration scanners and automated research workflows.",
    projects: ["Research Assistant AI", "CP-KYC Automation"],
  },
  "Generative AI": {
    level: 86,
    role: "LLM Systems Integration",
    desc: "Deploying generative interfaces (GPT-4, Claude) using optimized context arrays.",
    useCase:
      "Generating ATS scoring reports and answering contextual document queries.",
    projects: [
      "Research Assistant AI",
      "Resume Analyzer AI",
      "PDF Chatbot RAG",
      "AI Chat Application",
    ],
  },
  "Data Pipelines": {
    level: 80,
    role: "ETL Optimization",
    desc: "Ingesting document sources, cleaning structures, embedding vectors, and updating indexes.",
    useCase: "Indexing web pages and PDF books into semantic vector databases.",
    projects: [
      "Research Assistant AI",
      "PDF Chatbot RAG",
      "Resume Analyzer AI",
    ],
  },
};

const SKILL_CATEGORIES = [
  {
    title: "Programming Languages",
    skills: ["Java", "JavaScript", "Python", "SQL"],
    color: "var(--cyber-cyan)",
  },
  {
    title: "Backend Technologies",
    skills: [
      "Node.js",
      "Express.js",
      "FastAPI",
      "REST APIs",
      "WebSockets",
      "Cron Jobs",
    ],
    color: "var(--cyber-green)",
  },
  {
    title: "Frontend Technologies",
    skills: ["React.js", "HTML", "CSS", "TypeScript"],
    color: "var(--cyber-pink)",
  },
  {
    title: "Database Systems",
    skills: ["MongoDB", "MySQL", "Redis", "PostgreSQL"],
    color: "var(--cyber-yellow)",
  },
  {
    title: "Tools & Platforms",
    skills: [
      "Git",
      "GitHub",
      "GitLab",
      "GitHub Actions",
      "Postman",
      "Linux",
      "VS Code",
    ],
    color: "var(--cyber-purple)",
  },
  {
    title: "Data & Automation",
    skills: [
      "Web Scraping",
      "Automation Scripts",
      "AI Agents",
      "Generative AI",
      "Data Pipelines",
    ],
    color: "var(--cyber-orange)",
  },
];

const CERTIFICATIONS = [
  {
    title: "Back End Development & APIs",
    issuer: "freeCodeCamp",
    color: "#00ff88",
  },
  {
    title: "Full Stack Web Development",
    issuer: "Coding Blocks",
    color: "#00f0ff",
  },
  { title: "Quality Assurance", issuer: "freeCodeCamp", color: "#ffcc00" },
];

const Skills: React.FC<SkillsProps> = ({ selectedSkill, setSelectedSkill }) => {
  const handleSkillSelect = (name: string) => {
    spaceAudio.playWarp();
    setSelectedSkill(name);
  };

  const handleReset = () => {
    spaceAudio.playClick();
    setSelectedSkill(null);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "grid",
        gridTemplateColumns: "1.5fr 1fr",
        gap: 20,
        padding: "24px",
        overflow: "hidden",
      }}
      className="flex flex-col lg:grid"
    >
      {/* Left Column: Skill Planet diagnostics OR Galaxy lists */}
      <div
        className="hud-panel p-5 overflow-y-auto max-h-[50vh] lg:max-h-[82vh]"
        style={{ border: "1px solid rgba(var(--cyber-cyan-rgb), 0.25)" }}
      >
        <AnimatePresence mode="wait">
          {selectedSkill && SKILL_DETAILS[selectedSkill] ? (
            <motion.div
              key="selected"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex flex-col gap-4 font-mono text-[11px]"
            >
              {/* Header */}
              <div className="flex justify-between items-center border-b border-slate-900 pb-3">
                <div>
                  <span className="font-bold text-[8px] bg-cyan-900/50 border border-cyan-500/40 text-cyan-400 px-2 py-0.5 rounded-sm tracking-wider mr-2 uppercase">
                    SKILL DETAILS
                  </span>
                  <h2 className="text-xl font-bold text-cyan-400 font-display mt-1 tracking-wider uppercase">
                    {selectedSkill}
                  </h2>
                </div>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 rounded transition-colors text-[9px] cursor-none"
                >
                  <RefreshCw
                    size={11}
                    className="animate-spin"
                    style={{ animationDuration: "4s" }}
                  />
                  BACK TO SUMMARY
                </button>
              </div>

              {/* Stats gauge */}
              <div className="flex flex-col gap-2 p-3 bg-slate-950/60 border border-slate-900/60 rounded">
                <div className="flex justify-between">
                  <span className="text-slate-500">PROFICIENCY:</span>
                  <span className="text-cyan-400 font-bold">
                    {SKILL_DETAILS[selectedSkill].level}% PROFICIENT
                  </span>
                </div>
                <div className="h-2 bg-slate-900 rounded overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${SKILL_DETAILS[selectedSkill].level}%`,
                    }}
                    className="h-full bg-cyan-400 shadow-[0_0_8px_var(--cyber-cyan)]"
                  />
                </div>
              </div>

              {/* Data fields */}
              <div className="flex flex-col gap-3 leading-relaxed">
                <div>
                  <span className="text-slate-500 block mb-1">
                    ROLE / SCOPE:
                  </span>
                  <span className="text-slate-200">
                    {SKILL_DETAILS[selectedSkill].role.toUpperCase()}
                  </span>
                </div>

                <div>
                  <span className="text-slate-500 block mb-1">
                    DESCRIPTION:
                  </span>
                  <span className="text-slate-300">
                    {SKILL_DETAILS[selectedSkill].desc}
                  </span>
                </div>

                <div>
                  <span className="text-slate-500 block mb-1">
                    APPLICATIONS:
                  </span>
                  <span className="text-slate-300">
                    {SKILL_DETAILS[selectedSkill].useCase}
                  </span>
                </div>

                <div>
                  <span className="text-slate-500 block mb-1">
                    PROJECTS INTEGRATED:
                  </span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {SKILL_DETAILS[selectedSkill].projects.map((proj) => (
                      <span
                        key={proj}
                        className="px-2 py-0.5 bg-slate-900 border border-slate-800 text-cyan-300 text-[9px] rounded-sm"
                      >
                        {proj}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col gap-4 font-mono text-[11px]"
            >
              <div className="border-b border-slate-900 pb-2 flex items-center gap-2">
                <Layers size={13} className="text-cyan-400" />
                <span className="tracking-wider text-slate-400 uppercase">
                  TECHNICAL SKILLS DIAGNOSTIC
                </span>
              </div>
              <p className="text-[10px] text-slate-500 leading-relaxed">
                Click any key technology planet in the 3D cockpit or select a
                diagnostic profile from the categorized lists below to inspect
                details.
              </p>

              <div className="flex flex-col gap-4 mt-1">
                {SKILL_CATEGORIES.map((cat) => (
                  <div
                    key={cat.title}
                    className="border border-slate-900/60 p-3 bg-slate-950/20 rounded flex flex-col gap-2"
                  >
                    <span
                      style={{ color: cat.color }}
                      className="text-[9px] font-bold tracking-widest uppercase border-b border-slate-900/40 pb-1"
                    >
                      // {cat.title}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {cat.skills.map((skillName) => {
                        const isPlanet = SKILL_PLANETS.some(
                          (p) => p.name === skillName,
                        );
                        return (
                          <button
                            key={skillName}
                            onClick={() => handleSkillSelect(skillName)}
                            onMouseEnter={() => spaceAudio.playHover()}
                            style={{
                              border: isPlanet
                                ? `1px dashed ${cat.color}`
                                : "1px solid rgba(255,255,255,0.04)",
                              background: "rgba(3,4,15,0.4)",
                            }}
                            className="px-2.5 py-1.5 rounded hover:bg-slate-900/80 hover:border-slate-700 text-slate-300 hover:text-cyan-400 font-mono text-[9px] transition-all flex items-center gap-1 cursor-none"
                          >
                            <span>{skillName.toUpperCase()}</span>
                            {isPlanet && (
                              <span
                                style={{ color: cat.color }}
                                className="text-[8px] animate-pulse"
                              >
                                ●
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Right Column: Holographic Certificate Artifacts */}
      <div
        className="hud-panel p-5 overflow-y-auto flex flex-col gap-4 max-h-[30vh] lg:max-h-[82vh]"
        style={{ border: "1px solid rgba(var(--cyber-cyan-rgb), 0.25)" }}
      >
        <div className="font-mono text-[10px] tracking-wider text-slate-400 border-b border-slate-900 pb-2 flex items-center gap-2">
          <Award size={13} className="text-cyan-400" />
          CERTIFICATIONS & CREDENTIALS
        </div>

        <div className="flex flex-col gap-3 font-mono text-[10px]">
          {CERTIFICATIONS.map((c, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -3, scale: 1.01 }}
              onMouseEnter={() => spaceAudio.playHover()}
              style={{
                borderLeft: `3px solid ${c.color}`,
                border: "1px solid rgba(255,255,255,0.03)",
                background: "rgba(3,4,15,0.4)",
              }}
              className="p-3 rounded flex gap-3 items-center group cursor-none hover:bg-slate-950/80 transition-colors"
            >
              <div className="w-8 h-8 rounded-full border border-slate-800 flex items-center justify-center text-xs bg-slate-950/80 group-hover:border-cyan-500/40 transition-colors">
                🏆
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-slate-200 truncate uppercase tracking-wider">
                  {c.title}
                </div>
                <div className="text-slate-500 text-[8px] mt-0.5 uppercase tracking-widest">
                  {c.issuer}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
