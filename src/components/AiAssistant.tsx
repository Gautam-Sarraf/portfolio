import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Send, MessageSquare, Power, VolumeX, Volume2 } from 'lucide-react';
import { spaceAudio } from '../utils/audio';

interface AiAssistantProps {
  audioMuted: boolean;
}

const QUICK_PROMPTS = [
  { text: "Who is Gautam?", query: "who is gautam" },
  { text: "Show AI projects", query: "ai projects" },
  { text: "Show Backend projects", query: "backend projects" },
  { text: "What tech stack?", query: "tech stack" },
  { text: "Get Resume link", query: "resume" },
];

const KNOWLEDGE_BASE: Record<string, string> = {
  gautam: "Gautam Sarraf is a dedicated AI Engineer and Full Stack Developer. Specializing in RAG pipelines, AI Agents, scheduling engines, and high-performance Web systems, Gautam bridges the gap between deep learning APIs and production-ready applications.",
  ai: "Gautam has shipped advanced AI systems including: [Resume Analyzer] (ATS score optimization tool using GPT nodes), [PDF Chatbot] (RAG architecture with vector databases), and [CP-KYC] (AI-driven document scraping agents).",
  backend: "In backend engineering, Gautam has architected: [OT Scheduler] (shift scheduling logic), [TeamSphere] (WebSocket + WebRTC real-time chat), and enterprise REST APIs using Node.js, FastAPI, MongoDB, and PostgreSQL.",
  tech: "Gautam's technological arsenal includes React, Next.js, TypeScript, Tailwind, Python, FastAPI, Node.js, Express, MongoDB, PostgreSQL, Vector Databases (FAISS, Chroma), OpenAI, LangChain, and Docker.",
  resume: "You can download Gautam's professional resume here: [gautam_resume.pdf]",
};

const AiAssistant: React.FC<AiAssistantProps> = ({ audioMuted }) => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('AI assistant online. Ready to answer questions about Gautam\'s skills, experience, or projects.');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const recognitionRef = useRef<any>(null);

  // Initialize SpeechRecognition if supported
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = 'en-US';

      rec.onstart = () => {
        setIsListening(true);
        setResponse('Listening...');
      };

      rec.onresult = (e: any) => {
        const text = e.results[0][0].transcript;
        setQuery(text);
        handleAsk(text);
      };

      rec.onerror = () => {
        setIsListening(false);
        setResponse('Speech recognition failed. Please type your query.');
      };

      rec.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = rec;
    }
  }, []);

  // Animate the canvas visualizer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.05;

      const center = canvas.height / 2;
      const width = canvas.width;
      
      ctx.strokeStyle = isListening ? '#ff2e93' : isTyping ? '#a855f7' : '#00ffd8';
      ctx.lineWidth = 2;
      ctx.beginPath();

      // Draw sine wave frequencies
      for (let x = 0; x < width; x++) {
        const amplitude = isListening ? 20 : isTyping ? 15 : 6;
        const frequency = isListening ? 0.15 : isTyping ? 0.08 : 0.04;
        const y = center + Math.sin(x * frequency + time) * amplitude * Math.sin(x * 0.015);
        
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      // Additional orbiting ring visual
      ctx.strokeStyle = 'rgba(0, 253, 216, 0.1)';
      ctx.beginPath();
      ctx.arc(width / 2, center, 28 + Math.sin(time * 0.5) * 4, 0, Math.PI * 2);
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [isTyping, isListening]);

  const [chatHistory, setChatHistory] = useState<{ role: string; content: string }[]>([]);

  const handleAsk = async (userQuery: string) => {
    if (!userQuery.trim()) return;
    spaceAudio.playClick();
    setIsTyping(true);
    setResponse('Querying neural network...');

    try {
      const res = await fetch('https://portfolio-chatbot-a7tv.onrender.com/chat', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userQuery,
          chat_history: chatHistory,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      const botResponse = data.response || "No response returned from the bot.";

      setResponse(botResponse);
      setChatHistory((prev) => [
        ...prev,
        { role: 'user', content: userQuery },
        { role: 'model', content: botResponse },
      ]);

      // Speech Synthesis TTS
      if (!audioMuted && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        // Remove formatting brackets from speech
        const speechText = botResponse.replace(/[\[\]]/g, '');
        const utterance = new SpeechSynthesisUtterance(speechText);
        utterance.pitch = 0.95;
        utterance.rate = 1.05;
        window.speechSynthesis.speak(utterance);
      }
    } catch (error) {
      console.error("Error communicating with chatbot API:", error);
      setResponse("Communication offline. Failed to establish connection to the neural brain.");
    } finally {
      setIsTyping(false);
    }
  };

  const startListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      spaceAudio.playClick();
      recognitionRef.current?.start();
    }
  };

  return (
    <div
      className="hud-panel p-4 flex flex-col gap-4 text-xs h-full"
      style={{
        border: '1px solid rgba(var(--cyber-cyan-rgb), 0.25)',
      }}
    >
      {/* Visualizer header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <Power size={11} className="text-cyan-400 animate-pulse" />
          <span className="font-mono text-[10px] tracking-wider text-slate-400">AI ASSISTANT</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-ping" />
          <span className="font-mono text-[9px] text-cyan-400">ONLINE</span>
        </div>
      </div>

      {/* Hologram Canvas Visualizer */}
      <div className="relative flex justify-center bg-slate-950/60 rounded border border-slate-900/60 p-2 overflow-hidden h-20">
        <canvas
          ref={canvasRef}
          width={280}
          height={70}
          style={{ width: '100%', height: '100%' }}
        />
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-slate-950/80 pointer-events-none" />
      </div>

      {/* AI Speech log */}
      <div className="bg-slate-950/80 border border-slate-900 p-3 rounded h-32 overflow-y-auto font-mono text-[10px] leading-relaxed text-cyan-200">
        <span className="text-pink-500 mr-1">&gt;&nbsp;</span>
        {response}
      </div>

      {/* Quick click suggestions */}
      <div className="flex flex-wrap gap-1">
        {QUICK_PROMPTS.map((p, idx) => (
          <button
            key={idx}
            onClick={() => {
              setQuery(p.query);
              handleAsk(p.query);
            }}
            onMouseEnter={() => spaceAudio.playHover()}
            className="px-2 py-1 bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-[9px] text-slate-400 hover:text-cyan-400 transition-colors font-mono rounded-sm cursor-none"
          >
            {p.text}
          </button>
        ))}
      </div>

      {/* Input console */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAsk(query);
        }}
        className="flex gap-2"
      >
        {recognitionRef.current && (
          <button
            type="button"
            onClick={startListening}
            className={`p-2 border rounded cursor-none transition-colors ${
              isListening
                ? 'bg-pink-900/50 border-pink-500 text-pink-400 animate-pulse'
                : 'bg-slate-900 border-slate-800 hover:border-cyan-500/50 text-slate-400 hover:text-cyan-400'
            }`}
          >
            <Mic size={13} />
          </button>
        )}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask about Gautam..."
          className="flex-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded font-mono text-[10px] text-slate-200 focus:outline-none focus:border-cyan-500 transition-all placeholder-slate-600"
        />
        <button
          type="submit"
          className="p-2 bg-cyan-500 text-slate-950 font-mono font-bold rounded cursor-none hover:bg-cyan-400 hover:shadow-[0_0_10px_rgba(var(--cyber-cyan-rgb),0.4)] transition-all"
        >
          <Send size={13} />
        </button>
      </form>
    </div>
  );
};

export default AiAssistant;
