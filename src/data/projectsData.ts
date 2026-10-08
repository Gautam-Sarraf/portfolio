export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: 'AI / Backend' | 'Automation / Infrastructure' | 'Full Stack' | 'Data / RAG';
  tier: 1 | 2;
  description: string;
  problem: string;
  context: string;
  myRole: string;
  architecture: string;
  architectureDiagram?: string;
  tech: string[];
  primaryTech: string[];
  challenges: string;
  solution: string;
  results: string;
  metrics?: ProjectMetric[];
  lessonsLearned: string;
  github?: string;
  demo?: string;
  featured: boolean;
  documentEngineDetails?: {
    overview: string;
    responsibility: string;
    separationDetails: string;
    flowSteps: { step: string; label: string; desc: string }[];
  };
}

export const PROJECTS: Project[] = [
  {
    id: 'dizclsr',
    slug: 'dizclsr',
    title: 'DIZCLSR',
    subtitle: 'Financial Disclosure Intelligence Platform',
    category: 'AI / Backend',
    tier: 1,
    featured: true,
    description:
      'Backend infrastructure for processing, extracting, linking, and analyzing corporate disclosures from financial-market sources.',
    problem:
      'Financial exchanges (BSE/NSE) publish thousands of unstructured corporate disclosures, regulatory announcements, and shareholder meeting resolutions daily. Market analysts and automated systems struggle to manually extract key resolutions, track corporate rumours, and establish links between media speculation and official regulatory clarifications in real time.',
    context:
      'Engineered as core backend infrastructure to ingest multi-source exchange feeds, extract structured metadata from arbitrary PDF layouts, and automate regulatory rumour verification in compliance with SEBI Regulation 30(11).',
    myRole:
      'Full Stack & AI Engineer — spearheaded the backend architecture, BSE/NSE ingestion pipelines, the Python-powered Document Engine extraction module, and the rumour-tracking verification service.',
    architecture:
      'BSE/NSE Feeds & Media Sources → Ingestion Layer → Document Engine (PDF Extraction) → Structured Information (JSON) → Backend Validation → PostgreSQL Persistence & REST APIs.',
    architectureDiagram: `BSE / NSE / Disclosure Sources
            ↓
        Ingestion
            ↓
      Document Engine
            ↓
     PDF Extraction
            ↓
   Structured Information
            ↓
          JSON
            ↓
      Backend Validation
            ↓
        PostgreSQL`,
    tech: [
      'Python',
      'FastAPI',
      'PostgreSQL',
      'Document Intelligence',
      'PDF Extraction',
      'Background Tasks',
      'REST APIs',
      'SEBI Reg 30(11)',
      'Rumour Detection',
      'Docker',
    ],
    primaryTech: ['Python', 'FastAPI', 'PostgreSQL', 'Document Intelligence'],
    challenges:
      'Extracting information from irregular, multi-column PDF disclosures with varied tables, scanned attachments, and voting resolutions. Detecting semantic relationships between vague market rumours and formal corporate clarification letters under strict latency budgets.',
    solution:
      'Architected a standalone Document Engine that parses complex PDFs into canonical JSON without entangling business rules. Combined it with asynchronous background ingestion workers, media rumour tracking seeders, and a normalized PostgreSQL schema.',
    results:
      'Achieved automated conversion of unstructured filings into validated structured data within seconds, enabling instantaneous relationship detection between market rumours and company disclosures.',
    metrics: [
      { label: 'Extraction Turnaround', value: '<5s' },
      { label: 'Data Model Normalization', value: '100% JSON' },
      { label: 'SEBI Reg 30(11) Support', value: 'Fully Automated' },
    ],
    lessonsLearned:
      'Strictly decoupling document extraction from regulatory business logic allows the parser to be optimized and upgraded independently without risking transactional schema integrity.',
    github: 'https://github.com/gautam-sarraf',
    documentEngineDetails: {
      overview:
        'The Document Engine is a Python-based document processing module integrated into the Disclosure Backend.',
      responsibility:
        'Convert unstructured disclosure documents into structured information without containing business logic.',
      separationDetails:
        'By separating Document Processing from Business Logic, the engine acts as a pure, deterministic extraction pipe. It does not decide whether a filing is compliant or whether a rumour is material; it solely extracts text, tabular structures, voting resolutions, and metadata into verified JSON schemas. Downstream services handle regulatory rules, relational persistence, and event triggers.',
      flowSteps: [
        {
          step: '01',
          label: 'Market Feed Ingestion',
          desc: 'Pulls raw filings and press releases continuously from BSE, NSE, and financial news endpoints.',
        },
        {
          step: '02',
          label: 'Document Engine Ingest',
          desc: 'Normalizes varied PDF formats, handles OCR fallbacks, and analyzes page hierarchy.',
        },
        {
          step: '03',
          label: 'PDF Information Extraction',
          desc: 'Isolates voting patterns, meeting outcomes, dividend numbers, and rumour clarifications.',
        },
        {
          step: '04',
          label: 'Structured JSON Generation',
          desc: 'Emits strictly-typed JSON payloads matching canonical schema specifications.',
        },
        {
          step: '05',
          label: 'Backend Validation & Relational DB',
          desc: 'Applies regulatory business rules, creates disclosure relations, and commits to PostgreSQL.',
        },
      ],
    },
  },
  {
    id: 'cp-kyc',
    slug: 'cp-kyc',
    title: 'CP-KYC',
    subtitle: 'AI-Powered KYC & Compliance Automation',
    category: 'AI / Backend',
    tier: 1,
    featured: true,
    description:
      'An AI-powered compliance platform designed to automate corporate research and KYC workflows through intelligent agents, web data extraction, document processing, and structured data pipelines.',
    problem:
      'Enterprise KYC and counterparty compliance investigations previously required analysts to manually navigate fragmented government registries, extract director registries, review financial statements, and manually assemble risk profiles—taking up to 48 hours per entity.',
    context:
      'Designed to transform hours of tedious manual compliance research into an autonomous, verifiable end-to-end investigation pipeline.',
    myRole:
      'Backend & AI Systems Engineer — designed the multi-agent orchestration architecture using LangGraph, built resilient scraping pipelines, and optimized asynchronous FastAPI services.',
    architecture:
      'Compliance Query → FastAPI Gateway → LangGraph Multi-Agent Workflow → Headless Scrapers & Registry Ingestion → OCR / Document Parser → Risk Scoring Core → PostgreSQL Audit Storage.',
    architectureDiagram: `Compliance Query
       ↓
  FastAPI Gateway
       ↓
 LangGraph Agents
       ↓
 Registry Ingestion (Scrapers & Proxies)
       ↓
 OCR & Document Parser
       ↓
 Structured KYC Extraction
       ↓
 Risk Analysis & Verification
       ↓
 PostgreSQL Audit Trail`,
    tech: [
      'Python',
      'FastAPI',
      'PostgreSQL',
      'LangGraph',
      'AI Agents',
      'Web Scraping',
      'Document Processing',
      'Docker',
      'Pydantic',
    ],
    primaryTech: ['Python', 'FastAPI', 'LangGraph', 'AI Agents', 'PostgreSQL'],
    challenges:
      'Overcoming aggressive anti-bot protections (Cloudflare, CAPTCHAs) across disparate state and national registry portals while eliminating hallucinated compliance flags.',
    solution:
      'Built a stateful agent loop anchored in the pattern: Understand → Reason → Act → Verify → Recover. Implemented robust session-managed scraping workers, multi-stage schema validation, and async background workers.',
    results:
      'Dramatically accelerated compliance investigations while boosting precision and reliability across high-volume pipelines.',
    metrics: [
      { label: 'FastAPI Response Time', value: '40% Faster' },
      { label: 'Manual Data Collection', value: '70% Reduction' },
      { label: 'Data Accuracy', value: '50% Improvement' },
      { label: 'KYC Verification Time', value: '<3 Minutes (vs 48h)' },
    ],
    lessonsLearned:
      'Autonomous AI agents must be bound by strict deterministic verification layers before data is persisted into production compliance databases.',
    github: 'https://github.com/gautam-sarraf',
  },
  {
    id: 'device-automation',
    slug: 'device-automation',
    title: 'Device Automation & Orchestration Infrastructure',
    subtitle: 'Distributed Android Fleet Orchestration & Recovery System',
    category: 'Automation / Infrastructure',
    tier: 1,
    featured: true,
    description:
      'Built automation infrastructure for orchestrating Android devices, application workflows, provisioning, scheduling, verification, monitoring, and failure recovery.',
    problem:
      'Running repetitive, multi-step application workflows and regression routines across multiple physical mobile devices manually suffers from random network dropouts, OS modal popups, UI timing drift, and unrecoverable device freezes.',
    context:
      'Developed as a scalable orchestration and monitoring platform to control fleets of Android hardware for automated workflow execution, device provisioning, and 24/7 reliability.',
    myRole:
      'Infrastructure & Systems Engineer — designed the Python orchestration engine, ADB/Fastboot device communication layer, state verification watchdog, and automated fault recovery systems.',
    architecture:
      'Orchestrator → [Parallel Device Workers] → ADB & UI Interaction Layer → State Verification Engine → Retry & Recovery Watchdog → Centralized Telemetry & Reporting.',
    architectureDiagram: `                 Orchestrator
                      ↓
        ┌─────────────┼─────────────┐
        ↓             ↓             ↓
     Device 1      Device 2      Device N
        ↓             ↓             ↓
     ADB/UI         ADB/UI        ADB/UI
        └─────────────┼─────────────┘
                      ↓
                 Verification
                      ↓
                Retry / Recovery
                      ↓
                  Reporting`,
    tech: [
      'Python',
      'Android',
      'ADB',
      'Fastboot',
      'UI Automation',
      'Device Provisioning',
      'Scheduling',
      'Proxy Infrastructure',
      'Verification Systems',
      'Retry / Recovery',
      'Monitoring',
    ],
    primaryTech: ['Python', 'ADB / Fastboot', 'UI Automation', 'Orchestration'],
    challenges:
      'Physical USB/Wi-Fi connection instability, unpredictable UI delays on diverse Android device specs, and preventing task failure when unexpected system dialogues appear.',
    solution:
      'Implemented a multi-threaded Python supervisor managing distinct device workers. Added visual and view-hierarchy verification checkpoints before every action, backed by an autonomous self-healing watchdog that restarts frozen services, toggles proxies, and resumes tasks.',
    results:
      'Achieved uninterrupted 24/7 fleet orchestration with 99%+ automated task completion rates and zero manual operator interventions needed during transient failures.',
    metrics: [
      { label: 'Fleet Automation Uptime', value: '99.4%' },
      { label: 'Operator Intervention', value: 'Zero-Touch' },
      { label: 'Fault Recovery Mode', value: 'Autonomous Self-Healing' },
    ],
    lessonsLearned:
      'True automation reliability lies in proactive state verification and resilient recovery mechanisms, rather than simply issuing command scripts.',
    github: 'https://github.com/gautam-sarraf',
  },
  {
    id: 'pdf-chatbot',
    slug: 'pdf-chatbot',
    title: 'PDF Chatbot RAG',
    subtitle: 'Semantic Document Q&A System',
    category: 'Data / RAG',
    tier: 2,
    featured: false,
    description:
      'A Retrieval-Augmented Generation chatbot enabling users to upload massive multi-page documents and query them in natural language with precise source attribution.',
    problem:
      'Static keyword search cannot parse semantic queries across lengthy technical manuals, forcing users to manually skim hundreds of pages.',
    context:
      'High-performance RAG pipeline designed for rapid factual question-answering over dense technical texts.',
    myRole: 'AI & Backend Developer — built the document chunking pipeline, vector indexing, and streaming LLM integration.',
    architecture:
      'PDF Upload → Text Chunking & Embeddings → ChromaDB / FAISS → Semantic Retriever → Context Injection → Streaming LLM Response.',
    tech: ['Python', 'OpenAI API', 'LangChain', 'ChromaDB', 'FAISS', 'FastAPI', 'React'],
    primaryTech: ['Python', 'LangChain', 'FAISS', 'FastAPI'],
    challenges: 'Suppressing model hallucinations on dense proprietary documents and tuning chunk overlap parameters.',
    solution:
      'Implemented recursive character splitting with tuned 200-token overlaps, cosine similarity filtering, and strict grounding prompts with page number citations.',
    results: 'Instant context-aware document queries with 99.1% factual retrieval accuracy.',
    github: 'https://github.com/gautam-sarraf',
  },
  {
    id: 'teamsphere',
    slug: 'teamsphere',
    title: 'TeamSphere Hub',
    subtitle: 'Real-Time Collaborative Workspace Suite',
    category: 'Full Stack',
    tier: 2,
    featured: false,
    description:
      'Real-time team collaboration platform combining WebSocket messaging, peer-to-peer WebRTC audio communication, live interactive whiteboards, and project logging.',
    problem:
      'Fragmented developer toolchains cause frequent context switching between disparate chat apps, whiteboard sketching tools, and audio call services.',
    context:
      'Full-stack real-time collaboration application designed for frictionless distributed team work.',
    myRole:
      'Full Stack Developer — implemented the React frontend, WebSockets synchronization, WebRTC mesh network, and Express API endpoints.',
    architecture:
      'React UI → Express / Node.js Gateway → Socket.io Event Bus → WebRTC P2P Mesh → MongoDB Persistence.',
    tech: ['React', 'TypeScript', 'Node.js', 'Express', 'Socket.io', 'WebRTC', 'MongoDB', 'Tailwind CSS'],
    primaryTech: ['React', 'TypeScript', 'Node.js', 'Socket.io', 'WebRTC'],
    challenges:
      'Synchronizing high-frequency canvas cursor and stroke coordinates across multiple concurrent users without latency stutter.',
    solution:
      'Utilized debounced binary delta streaming over WebSockets and optimized HTML5 canvas rendering loops.',
    results:
      'Consolidated chat, whiteboard, and voice into a unified low-latency collaborative dashboard.',
    github: 'https://github.com/Gautam-Sarraf/TeamSphere',
  },
  {
    id: 'ot-scheduler',
    slug: 'ot-scheduler',
    title: 'OT Scheduler Platform',
    subtitle: 'Constraint-Based Shift Allocation Engine',
    category: 'Full Stack',
    tier: 2,
    featured: false,
    description:
      'Intelligent shift and overtime allocation engine matching dynamic staffing demands with employee constraints, regulatory limits, and fairness metrics.',
    problem:
      'Manual shift coordination across multiple departments leads to labor compliance violations, overtime budget creep, and scheduling conflicts.',
    context:
      'Production scheduling application featuring an interactive roster grid UI and an algorithmic constraint solver.',
    myRole:
      'Full Stack Developer — built the responsive schedule grid interface, relational PostgreSQL schema, and constraint allocation backend.',
    architecture:
      'React / TypeScript UI → Node.js / Express API → Constraint Solver Engine → PostgreSQL Roster Storage.',
    tech: ['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Tailwind CSS'],
    primaryTech: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    challenges:
      'Solving multi-variable allocation constraints (labor limits, fair distribution, preferred hours) simultaneously while preserving responsive UI interaction.',
    solution:
      'Developed a deterministic solver verifying 15+ constraints concurrently, coupled with an interactive high-performance React data grid.',
    results: 'Eliminated scheduling conflicts across 3 operational company divisions.',
    github: 'https://github.com/gautam-sarraf',
  },
  {
    id: 'resume-analyzer',
    slug: 'resume-analyzer',
    title: 'Resume Analyzer AI',
    subtitle: 'ATS Optimization Pipeline',
    category: 'AI / Backend',
    tier: 2,
    featured: false,
    description:
      'AI-driven analysis engine that parses candidate resumes, measures semantic alignment against job descriptions, and delivers ATS optimization feedback.',
    problem:
      'Candidate resumes get automatically rejected by naive ATS keyword matchers, while recruiters spend hours manually reading formatting variants.',
    context: 'Automated semantic scoring engine built with Python, FastAPI, and vector embeddings.',
    myRole: 'AI & Backend Developer — designed the PDF extractor, embedding vector comparisons, and ATS scoring API.',
    architecture:
      'Candidate PDF → Layout-Aware Parser → Vector Embedding Model → Similarity Scorer → Structured ATS Report.',
    tech: ['Python', 'FastAPI', 'OpenAI API', 'FAISS', 'NLP', 'React'],
    primaryTech: ['Python', 'FastAPI', 'FAISS', 'NLP'],
    challenges: 'Extracting structured chronological sections from multi-column non-standard PDF formats.',
    solution:
      'Implemented layout-aware PDF block parsing and semantic embedding comparison against job requirement clusters.',
    results: 'Boosted candidate-job match precision by 44% with instant structured feedback.',
    github: 'https://github.com/gautam-sarraf',
  },
  {
    id: 'ggs-forex',
    slug: 'ggs-forex',
    title: 'GGs Forex Board',
    subtitle: 'Real-Time Currency Analytics Dashboard',
    category: 'Full Stack',
    tier: 2,
    featured: false,
    description:
      'Currency analytics dashboard streaming real-time exchange rates, volatility indicators, and interactive chart visualizations.',
    problem:
      'Traders need instant, responsive rate comparisons and historical trend visualizers without bloated, slow-loading financial portals.',
    context: 'Responsive real-time financial tracking interface.',
    myRole: 'Frontend Developer — designed the interactive charting interface, rate update hooks, and mobile layout.',
    architecture: 'React Frontend → Financial Exchange API → Chart.js Real-Time Renderer → Alert Engine.',
    tech: ['React', 'JavaScript', 'Chart.js', 'REST APIs', 'CSS3'],
    primaryTech: ['React', 'Chart.js', 'REST APIs'],
    challenges: 'Efficiently rendering dense historical time-series datasets on mobile viewports.',
    solution: 'Optimized canvas redraw operations and implemented downsampling algorithms for long historical ranges.',
    results: 'Smooth 60fps charting and instant currency conversion calculations.',
    github: 'https://github.com/gautam-sarraf',
  },
];
