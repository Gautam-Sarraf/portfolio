import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Terminal, Mail, Github, Linkedin, MapPin, Radio, ShieldAlert } from 'lucide-react';
import { spaceAudio } from '../utils/audio';

const COMMS_INDEX = [
  { icon: <Mail size={14} />, label: "EMAIL", value: "gautam.sarraf_cs22@gla.ac.in", href: "mailto:gautam.sarraf_cs22@gla.ac.in", color: "var(--cyber-cyan)" },
  { icon: <Github size={14} />, label: "GITHUB", value: "github.com/gautam-sarraf", href: "https://github.com/gautam-sarraf", color: "var(--cyber-green)" },
  { icon: <Linkedin size={14} />, label: "LINKEDIN", value: "linkedin.com/in/gautam-sarraf", href: "https://linkedin.com/in/gautam-sarraf", color: "var(--cyber-pink)" },
  { icon: <MapPin size={14} />, label: "LOCATION", value: "Birgunj, Nepal", href: null, color: "var(--cyber-yellow)" },
];

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [transmissionLogs, setTransmissionLogs] = useState<string[]>([]);

  const addLog = (msg: string, delay: number) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setTransmissionLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
        resolve();
      }, delay);
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setTransmissionLogs([]);

    spaceAudio.playTransmission();

    // Trigger sequencing logs
    await addLog("INITIALIZING TRANSMISSION PROTOCOL...", 100);
    await addLog("ENCRYPTING MESSAGE PAYLOAD...", 300);
    await addLog(`PACKAGING SENDER DATA: ${formData.name.toUpperCase()}...`, 400);
    await addLog("ROUTING CONNECTION TO HOST...", 300);
    await addLog("SENDING MESSAGE PACKETS...", 400);

    const fd = new FormData();
    fd.append('access_key', '86f2f3a0-cdc8-438d-b6d4-634e52b87631');
    Object.entries(formData).forEach(([k, v]) => fd.append(k, v));

    try {
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: fd });
      const data = await res.json();
      
      if (data.success) {
        setStatus('success');
        spaceAudio.playBoot(); // Play success chime
        await addLog("TRANSMISSION SUCCESS. MESSAGE CONFIRMED.", 200);
        await addLog("CONNECTION CLOSED.", 100);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
        await addLog("TRANSMISSION ERROR. SENT BLOCKED.", 200);
      }
    } catch {
      setStatus('error');
      await addLog("TRANSMISSION FAILED. NETWORK OFFLINE.", 200);
    }
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'grid',
        gridTemplateColumns: '1.2fr 1.8fr',
        gap: 20,
        padding: '24px',
        overflow: 'hidden',
      }}
      className="flex flex-col lg:grid"
    >
      {/* Left panel: Comm coordinates + log output */}
      <div
        className="flex flex-col gap-4 overflow-y-auto max-h-[40vh] lg:max-h-[82vh]"
      >
        {/* Comms channels list */}
        <div
          className="hud-panel p-4 flex flex-col gap-2.5"
          style={{ border: '1px solid rgba(var(--cyber-cyan-rgb), 0.25)' }}
        >
          <div className="font-mono text-[10px] tracking-wider text-slate-400 border-b border-slate-900 pb-2 mb-1 flex items-center gap-2">
            <Radio size={12} className="text-cyan-400 animate-pulse" />
            CONTACT CHANNELS
          </div>
          {COMMS_INDEX.map((c, idx) => (
            <div
              key={idx}
              style={{
                borderLeft: `3px solid ${c.color}`,
                background: 'rgba(3,4,15,0.4)',
              }}
              className="p-2.5 rounded flex gap-3 items-center font-mono text-[10px] hover:bg-slate-950/60 transition-colors"
            >
              <div style={{ color: c.color }} className="flex-shrink-0">
                {c.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-slate-500 text-[8px] tracking-widest">{c.label}</div>
                {c.href ? (
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => spaceAudio.playHover()}
                    style={{ color: c.color }}
                    className="font-bold truncate block cursor-none"
                  >
                    {c.value.toUpperCase()}
                  </a>
                ) : (
                  <span style={{ color: c.color }} className="font-bold truncate block">
                    {c.value.toUpperCase()}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Real-time terminal log outputs */}
        <div
          className="hud-panel p-4 flex-1 flex flex-col gap-2 min-h-36 max-h-48 lg:max-h-none overflow-y-auto"
          style={{ border: '1px solid rgba(var(--cyber-cyan-rgb), 0.25)' }}
        >
          <div className="font-mono text-[10px] tracking-wider text-slate-400 border-b border-slate-900 pb-2 mb-1 flex items-center gap-2">
            <Terminal size={12} className="text-cyan-400" />
            TRANSMISSION CONSOLE
          </div>
          <div className="flex-1 overflow-y-auto font-mono text-[9px] text-slate-400 flex flex-col gap-1.5 leading-relaxed">
            {transmissionLogs.length === 0 ? (
              <span className="text-slate-600 italic">Awaiting message submission... console idle.</span>
            ) : (
              transmissionLogs.map((log, idx) => (
                <div key={idx} className="flex gap-2">
                  <span className="text-cyan-500">&gt;&nbsp;</span>
                  <span className={log.includes('SUCCESS') ? 'text-green-400 font-bold' : log.includes('ERROR') ? 'text-orange-400 font-bold' : 'text-slate-300'}>
                    {log}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Right panel: Cockpit Form console */}
      <div
        className="hud-panel p-6 overflow-y-auto max-h-[60vh] lg:max-h-[82vh]"
        style={{ border: '1px solid rgba(var(--cyber-cyan-rgb), 0.25)' }}
      >
        <div className="font-mono text-[10px] tracking-wider text-slate-400 border-b border-slate-900 pb-3 mb-4 flex items-center gap-2">
          <ShieldAlert size={12} className="text-cyan-400 animate-pulse" />
          MESSAGE SENDER
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 font-mono text-[10px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-cyan-400 tracking-widest font-bold">YOUR NAME</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Enter your name"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  background: 'rgba(3,4,15,0.8)',
                  border: '1px solid rgba(var(--cyber-cyan-rgb), 0.2)',
                  borderRadius: 4,
                  color: 'var(--text-primary)',
                  outline: 'none',
                  fontSize: 10,
                }}
                className="focus:border-cyan-400 focus:shadow-[0_0_8px_rgba(var(--cyber-cyan-rgb),0.2)] transition-all placeholder-slate-700 uppercase"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-cyan-400 tracking-widest font-bold">YOUR EMAIL</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="your.email@example.com"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  background: 'rgba(3,4,15,0.8)',
                  border: '1px solid rgba(var(--cyber-cyan-rgb), 0.2)',
                  borderRadius: 4,
                  color: 'var(--text-primary)',
                  outline: 'none',
                  fontSize: 10,
                }}
                className="focus:border-cyan-400 focus:shadow-[0_0_8px_rgba(var(--cyber-cyan-rgb),0.2)] transition-all placeholder-slate-700"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-cyan-400 tracking-widest font-bold">SUBJECT</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              required
              placeholder="Subject of your message"
              style={{
                width: '100%',
                padding: '10px 12px',
                background: 'rgba(3,4,15,0.8)',
                border: '1px solid rgba(var(--cyber-cyan-rgb), 0.2)',
                borderRadius: 4,
                color: 'var(--text-primary)',
                outline: 'none',
                fontSize: 10,
              }}
              className="focus:border-cyan-400 focus:shadow-[0_0_8px_rgba(var(--cyber-cyan-rgb),0.2)] transition-all placeholder-slate-700 uppercase"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-cyan-400 tracking-widest font-bold">MESSAGE</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              placeholder="Type your message here..."
              rows={4}
              style={{
                width: '100%',
                padding: '10px 12px',
                background: 'rgba(3,4,15,0.8)',
                border: '1px solid rgba(var(--cyber-cyan-rgb), 0.2)',
                borderRadius: 4,
                color: 'var(--text-primary)',
                outline: 'none',
                fontSize: 10,
                resize: 'none',
              }}
              className="focus:border-cyan-400 focus:shadow-[0_0_8px_rgba(var(--cyber-cyan-rgb),0.2)] transition-all placeholder-slate-700"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'sending'}
            onMouseEnter={() => spaceAudio.playHover()}
            style={{
              width: '100%',
              padding: '12px',
              border: 'none',
              borderRadius: 4,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '2px',
              cursor: status === 'sending' ? 'wait' : 'none',
              color: '#000',
              background: status === 'success'
                ? 'linear-gradient(135deg, var(--cyber-green), #8b5cf6)'
                : status === 'error'
                ? 'linear-gradient(135deg, var(--cyber-pink), #9f004a)'
                : 'linear-gradient(135deg, var(--cyber-cyan), var(--cyber-green))',
              boxShadow: '0 0 15px rgba(var(--cyber-cyan-rgb), 0.2)',
              transition: 'all 0.2s',
            }}
            className="flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(var(--cyber-cyan-rgb), 0.4)]"
          >
            {status === 'sending' ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                SENDING MESSAGE...
              </>
            ) : status === 'success' ? (
              "MESSAGE SENT ✓"
            ) : status === 'error' ? (
              "ERROR - RETRY ✗"
            ) : (
              <>
                <Send size={12} /> SEND MESSAGE
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;