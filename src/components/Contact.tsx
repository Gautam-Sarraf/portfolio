import React, { useState } from 'react';
import {
  Send,
  Terminal,
  Mail,
  Github,
  Linkedin,
  Download,
} from 'lucide-react';
import { spaceAudio } from '../utils/audio';

const CONTACT_CHANNELS = [
  {
    icon: <Mail size={16} className="text-cyan-400" />,
    label: 'EMAIL',
    value: 'gautam.sarraf_cs22@gla.ac.in',
    href: 'mailto:gautam.sarraf_cs22@gla.ac.in',
    desc: 'Direct communication for technical inquiries & opportunities',
  },
  {
    icon: <Linkedin size={16} className="text-purple-400" />,
    label: 'LINKEDIN',
    value: 'linkedin.com/in/gautam-sarraf',
    href: 'https://linkedin.com/in/gautam-sarraf',
    desc: 'Professional network, career background & messaging',
  },
  {
    icon: <Github size={16} className="text-green-400" />,
    label: 'GITHUB',
    value: 'github.com/gautam-sarraf',
    href: 'https://github.com/gautam-sarraf',
    desc: 'Open source repositories, prototypes & system code',
  },
  {
    icon: <Download size={16} className="text-yellow-400" />,
    label: 'RESUME',
    value: 'Gautam_Sarraf_resume.pdf',
    href: '/Gautam_Sarraf_resume.pdf',
    download: true,
    desc: 'Verified technical resume in downloadable PDF format',
  },
];

export const Contact: React.FC = () => {
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

    await addLog('INITIALIZING SECURE TRANSMISSION...', 80);
    await addLog(`PACKAGING DISPATCH FOR: ${formData.name.toUpperCase()}...`, 150);
    await addLog('ROUTING DISPATCH VIA WEB PROTOCOL...', 200);

    const fd = new FormData();
    fd.append('access_key', '86f2f3a0-cdc8-438d-b6d4-634e52b87631');
    Object.entries(formData).forEach(([k, v]) => fd.append(k, v));

    try {
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: fd });
      const data = await res.json();

      if (data.success) {
        setStatus('success');
        spaceAudio.playBoot();
        await addLog('TRANSMISSION DELIVERED CONFIRMED [OK].', 150);
        await addLog('I will respond within 24 hours.', 100);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
        await addLog('TRANSMISSION GATEWAY ERROR. PLEASE EMAIL DIRECTLY.', 150);
      }
    } catch {
      setStatus('error');
      await addLog('NETWORK ERROR. PLEASE EMAIL: gautam.sarraf_cs22@gla.ac.in', 150);
    }
  };

  return (
    <div className="w-full flex flex-col gap-8 font-mono text-slate-200">
      {/* Header with requested CTA */}
      <div
        className="hud-panel p-6 md:p-8 border border-cyan-500/25 flex flex-col gap-3"
        style={{
          background: 'linear-gradient(180deg, rgba(8, 10, 31, 0.9) 0%, rgba(3, 4, 15, 0.95) 100%)',
        }}
      >
        <div className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest">
          // COMMS LINK [05]
        </div>
        <h2
          className="text-2xl sm:text-4xl font-black text-white"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Have a project, opportunity, or interesting problem?
        </h2>
        <div className="text-xl sm:text-2xl font-bold text-cyan-400 font-sans">
          Let's talk.
        </div>
        <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed max-w-2xl">
          Whether you want to discuss production AI agents, document intelligence engines, high-concurrency backend services, or full-stack web applications, feel free to connect directly.
        </p>
      </div>

      {/* Grid: Direct Contact Channels & Transmission Terminal Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Direct Channels */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <div className="text-[10px] text-cyan-400 font-bold tracking-wider uppercase border-b border-slate-800 pb-2">
            // DIRECT COMMUNICATION CHANNELS
          </div>

          <div className="flex flex-col gap-3">
            {CONTACT_CHANNELS.map((ch, idx) => (
              <a
                key={idx}
                href={ch.href}
                target={ch.download ? undefined : '_blank'}
                rel={ch.download ? undefined : 'noopener noreferrer'}
                download={ch.download ? 'Gautam_Sarraf_resume.pdf' : undefined}
                onMouseEnter={() => spaceAudio.playHover()}
                onClick={() => spaceAudio.playClick()}
                className="p-4 rounded bg-slate-950/70 border border-slate-800 hover:border-cyan-400/60 transition-all flex flex-col gap-1.5 group"
              >
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-bold text-slate-400 font-mono flex items-center gap-2">
                    {ch.icon}
                    <span>{ch.label}</span>
                  </span>
                  <span className="text-slate-600 group-hover:text-cyan-400 transition-colors">
                    {ch.download ? 'DOWNLOAD PDF' : 'CONNECT →'}
                  </span>
                </div>

                <div className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                  {ch.value}
                </div>
                <div className="text-[11px] text-slate-400 font-sans leading-relaxed">
                  {ch.desc}
                </div>
              </a>
            ))}
          </div>

          {/* Quick Location & Availability */}
          <div className="p-4 rounded bg-slate-950 border border-slate-800/80 text-[11px] flex flex-col gap-2">
            <div className="flex justify-between text-slate-400">
              <span>LOCATION:</span>
              <span className="text-white font-bold">Birgunj, Nepal · GLA University</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>TIMEZONE:</span>
              <span className="text-cyan-300 font-mono">UTC +05:30 (IST / NPT)</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>AVAILABILITY:</span>
              <span className="text-green-400 font-bold">Open to Software Engineering Roles</span>
            </div>
          </div>
        </div>

        {/* Right Column: Transmission Form & Terminal Feedback */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="hud-panel p-6 md:p-8 border border-cyan-500/25 flex flex-col gap-4"
            style={{
              background: 'linear-gradient(180deg, rgba(8, 10, 31, 0.9) 0%, rgba(3, 4, 15, 0.96) 100%)',
            }}
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-1">
              <div className="flex items-center gap-2 text-xs font-bold text-white tracking-wider">
                <Terminal size={14} className="text-cyan-400" />
                TRANSMISSION TERMINAL // DIRECT MESSAGE
              </div>
              <span className="text-[10px] text-slate-500 uppercase">ENCRYPTED PAYLOAD</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-slate-400 uppercase font-mono font-bold">
                  SENDER NAME *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Jane Doe"
                  className="px-3.5 py-2.5 rounded bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 font-mono"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-slate-400 uppercase font-mono font-bold">
                  SENDER EMAIL *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="e.g. jane@company.com"
                  className="px-3.5 py-2.5 rounded bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 font-mono"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] text-slate-400 uppercase font-mono font-bold">
                SUBJECT / TOPIC
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="e.g. AI Systems Role / Contract Collaboration"
                className="px-3.5 py-2.5 rounded bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 font-mono"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] text-slate-400 uppercase font-mono font-bold">
                MESSAGE BODY *
              </label>
              <textarea
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Share project requirements, team context, or technical challenges..."
                className="px-3.5 py-2.5 rounded bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 font-mono resize-none leading-relaxed"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              onMouseEnter={() => spaceAudio.playHover()}
              className="mt-2 flex items-center justify-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded transition-all disabled:opacity-50 shadow-[0_0_15px_rgba(0,255,216,0.25)]"
            >
              <Send size={14} />
              <span>{status === 'sending' ? 'TRANSMITTING MESSAGE...' : 'SEND TRANSMISSION'}</span>
            </button>

            {/* Terminal Transmission Logs Output */}
            {transmissionLogs.length > 0 && (
              <div className="mt-2 p-3 rounded bg-slate-950 border border-slate-800/80 text-[10px] font-mono flex flex-col gap-1 text-slate-400 max-h-32 overflow-y-auto">
                {transmissionLogs.map((log, lIdx) => (
                  <div
                    key={lIdx}
                    className={
                      log.includes('[OK]') || log.includes('SUCCESS')
                        ? 'text-green-400'
                        : log.includes('ERROR')
                        ? 'text-red-400'
                        : 'text-cyan-300'
                    }
                  >
                    {log}
                  </div>
                ))}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;