import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { SectionHeader } from './About';
import { Github, Linkedin, Mail, MapPin, Send, Terminal } from 'lucide-react';

const CONTACT_INFO = [
  { icon: <Mail size={18} />, label: 'Email', value: 'gautam.sarraf_cs22@gla.ac.in', href: 'mailto:gautam.sarraf_cs22@gla.ac.in', color: 'var(--cyber-cyan)' },
  { icon: <Github size={18} />, label: 'GitHub', value: 'github.com/gautam-sarraf', href: 'https://github.com/gautam-sarraf', color: 'var(--cyber-green)' },
  { icon: <Linkedin size={18} />, label: 'LinkedIn', value: 'linkedin.com/in/gautam-sarraf', href: 'https://linkedin.com/in/gautam-sarraf', color: '#0077b5' },
  { icon: <MapPin size={18} />, label: 'Location', value: 'Birgunj, Nepal', href: null, color: 'var(--cyber-pink)' },
];

const Contact: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [terminalLog, setTerminalLog] = useState<string[]>([]);

  const addLog = (msg: string) => setTerminalLog(prev => [...prev, msg]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    addLog('> Initializing secure transmission...');
    addLog('> Encrypting payload...');
    addLog(`> FROM: ${formData.name} <${formData.email}>`);
    addLog(`> SUBJECT: ${formData.subject}`);

    const fd = new FormData();
    fd.append('access_key', '86f2f3a0-cdc8-438d-b6d4-634e52b87631');
    Object.entries(formData).forEach(([k, v]) => fd.append(k, v));

    try {
      const response = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: fd });
      const data = await response.json();
      if (data.success) {
        setStatus('success');
        addLog('> ✓ Transmission successful!');
        addLog('> Gautam will respond within 24 hours.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
        addLog('> ✗ Transmission failed. Try direct email.');
      }
    } catch {
      setStatus('error');
      addLog('> ✗ Network error. Check connection.');
    }
  };

  const inputStyle = (focused = false): React.CSSProperties => ({
    width: '100%',
    padding: '14px 16px',
    background: 'rgba(5,5,16,0.8)',
    border: `1px solid ${focused ? 'var(--cyber-cyan)' : 'rgba(255,255,255,0.08)'}`,
    borderRadius: 8,
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-mono)',
    fontSize: 13,
    outline: 'none',
    transition: 'all 0.2s',
    boxShadow: focused ? '0 0 0 3px rgba(0,212,255,0.1), 0 0 20px rgba(0,212,255,0.05)' : 'none',
  });

  return (
    <section id="contact" ref={ref} style={{ padding: '100px 24px', background: 'var(--bg-primary)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translateX(-50%)', width: 600, height: 400, background: 'radial-gradient(ellipse, rgba(0,212,255,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <SectionHeader
          tag="06"
          label="CONTACT"
          title="Open Channel"
          subtitle="Secure line established. Ready to receive."
          isInView={isInView}
        />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 32,
          marginTop: 64,
          alignItems: 'start',
        }}>
          {/* Left: Contact info + terminal log */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
          >
            {CONTACT_INFO.map((info, i) => (
              <motion.div
                key={info.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 16,
                  padding: '18px 20px',
                  background: 'rgba(10,10,30,0.9)',
                  border: `1px solid ${info.color}25`,
                  borderRadius: 10,
                  borderLeft: `3px solid ${info.color}`,
                  transition: 'all 0.2s',
                }}
              >
                <div style={{ color: info.color, flexShrink: 0 }}>{info.icon}</div>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-muted)', letterSpacing: '2px', marginBottom: 4 }}>
                    {info.label}
                  </div>
                  {info.href ? (
                    <a href={info.href} target={info.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: info.color, textDecoration: 'none', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}>
                      {info.value}
                    </a>
                  ) : (
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: info.color }}>{info.value}</div>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Terminal log window */}
            {terminalLog.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                style={{
                  background: 'rgba(5,5,16,0.95)',
                  border: '1px solid rgba(0,212,255,0.2)',
                  borderRadius: 10,
                  overflow: 'hidden',
                }}
              >
                <div style={{ padding: '10px 14px', borderBottom: '1px solid rgba(0,212,255,0.1)', display: 'flex', gap: 6, alignItems: 'center' }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }} />
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e' }} />
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840' }} />
                  <span style={{ marginLeft: 6, fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(100,130,160,0.6)' }}>transmission.log</span>
                </div>
                <div style={{ padding: '14px 16px' }}>
                  {terminalLog.map((log, i) => (
                    <div key={i} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: log.includes('✓') ? 'var(--cyber-green)' : log.includes('✗') ? 'var(--cyber-pink)' : 'var(--text-muted)', lineHeight: 1.8 }}>
                      {log}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Right: Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{
              background: 'rgba(10,10,30,0.9)',
              border: '1px solid rgba(0,212,255,0.15)',
              borderRadius: 14,
              overflow: 'hidden',
            }}
          >
            {/* Form header */}
            <div style={{
              padding: '16px 24px',
              background: 'rgba(0,212,255,0.04)',
              borderBottom: '1px solid rgba(0,212,255,0.1)',
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <Terminal size={16} color="var(--cyber-cyan)" />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--cyber-cyan)', letterSpacing: '2px' }}>
                SEND MESSAGE
              </span>
            </div>

            <form onSubmit={handleSubmit} style={{ padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--cyber-cyan)', letterSpacing: '2px', display: 'block', marginBottom: 8 }}>NAME</label>
                  <input
                    type="text" name="name" value={formData.name}
                    onChange={handleChange} required placeholder="Your name"
                    style={inputStyle()}
                    onFocus={e => e.target.style.borderColor = 'var(--cyber-cyan)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                  />
                </div>
                <div>
                  <label style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--cyber-cyan)', letterSpacing: '2px', display: 'block', marginBottom: 8 }}>EMAIL</label>
                  <input
                    type="email" name="email" value={formData.email}
                    onChange={handleChange} required placeholder="your@email.com"
                    style={inputStyle()}
                    onFocus={e => e.target.style.borderColor = 'var(--cyber-cyan)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--cyber-cyan)', letterSpacing: '2px', display: 'block', marginBottom: 8 }}>SUBJECT</label>
                <input
                  type="text" name="subject" value={formData.subject}
                  onChange={handleChange} required placeholder="Project inquiry / Collaboration..."
                  style={inputStyle()}
                  onFocus={e => e.target.style.borderColor = 'var(--cyber-cyan)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                />
              </div>

              <div>
                <label style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--cyber-cyan)', letterSpacing: '2px', display: 'block', marginBottom: 8 }}>MESSAGE</label>
                <textarea
                  name="message" value={formData.message}
                  onChange={handleChange} required placeholder="Tell me about your project or opportunity..."
                  rows={5}
                  style={{ ...inputStyle(), resize: 'vertical', minHeight: 130 }}
                  onFocus={e => e.target.style.borderColor = 'var(--cyber-cyan)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                />
              </div>

              <motion.button
                type="submit"
                disabled={status === 'sending'}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  padding: '15px 24px',
                  fontFamily: 'var(--font-mono)', fontSize: 13, letterSpacing: '2px', fontWeight: 700,
                  cursor: status === 'sending' ? 'wait' : 'none',
                  border: 'none', borderRadius: 8,
                  background: status === 'success'
                    ? 'linear-gradient(135deg, var(--cyber-green), #00aa55)'
                    : status === 'error'
                    ? 'linear-gradient(135deg, var(--cyber-pink), #aa0044)'
                    : 'linear-gradient(135deg, var(--cyber-cyan), var(--cyber-green))',
                  color: '#000',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                  boxShadow: '0 0 20px rgba(0,212,255,0.2)',
                  opacity: status === 'sending' ? 0.7 : 1,
                  transition: 'all 0.2s',
                }}
              >
                {status === 'sending' && <div style={{ width: 14, height: 14, border: '2px solid #000', borderTop: '2px solid transparent', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />}
                {status === 'sending' ? 'TRANSMITTING...' : status === 'success' ? '✓ SIGNAL SENT!' : status === 'error' ? '✗ RETRY' : (
                  <><Send size={14} /> TRANSMIT</>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </section>
  );
};

export default Contact;