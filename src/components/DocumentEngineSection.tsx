import React from 'react';
import { FileText, Cpu, CheckCircle2, ArrowDown, Database, Layers, GitBranch, Shield } from 'lucide-react';

export const DocumentEngineSection: React.FC = () => {
  return (
    <div className="w-full flex flex-col gap-6 font-mono">
      {/* Header & Core Definition */}
      <div
        className="hud-panel p-6 border border-cyan-500/30"
        style={{
          background: 'linear-gradient(180deg, rgba(8, 10, 31, 0.9) 0%, rgba(3, 4, 15, 0.95) 100%)',
        }}
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-cyan-500/10 border border-cyan-400/40 flex items-center justify-center text-cyan-400">
              <Cpu size={18} />
            </div>
            <div>
              <div className="text-[10px] text-cyan-400 tracking-widest uppercase">// MODULE DEEP DIVE</div>
              <h3 className="text-xl font-black text-white" style={{ fontFamily: 'var(--font-display)' }}>
                DOCUMENT ENGINE
              </h3>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-cyan-950/60 border border-cyan-500/30 rounded text-[10px] text-cyan-300">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            PYTHON-POWERED EXTRACTION SUBSYSTEM
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-300 leading-relaxed font-sans">
          <div className="flex flex-col gap-3">
            <div className="text-[11px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
              [PRIMARY ARCHITECTURAL ROLE]
            </div>
            <p className="text-slate-300 bg-slate-950/50 p-3 rounded border border-slate-800/80">
              The <strong className="text-white">Document Engine</strong> is a specialized Python-based document processing module integrated into the Disclosure Backend.
            </p>
            <div className="text-[11px] font-mono text-purple-400 font-bold uppercase tracking-wider mt-1">
              [CORE RESPONSIBILITY]
            </div>
            <p className="text-slate-300 bg-slate-950/50 p-3 rounded border border-slate-800/80">
              <em className="text-purple-300 not-italic font-semibold">
                "Convert unstructured disclosure documents into structured information without containing business logic."
              </em>
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <div className="text-[11px] font-mono text-green-400 font-bold uppercase tracking-wider">
              [ARCHITECTURAL SEPARATION]
            </div>
            <div className="bg-slate-950/50 p-3 rounded border border-slate-800/80 flex flex-col gap-2">
              <div className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold font-mono">1.</span>
                <div>
                  <strong className="text-slate-200">Document Processing:</strong> Pure layout parsing, OCR fallbacks, tabular extraction, and schema transformation. Completely agnostic to regulatory rules or business states.
                </div>
              </div>
              <div className="flex items-start gap-2 pt-2 border-t border-slate-800/60">
                <span className="text-purple-400 font-bold font-mono">2.</span>
                <div>
                  <strong className="text-slate-200">Business Logic:</strong> Regulatory compliance (SEBI Reg 30), rumour-to-filing reconciliation, notification triggers, and transactional persistence in PostgreSQL.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Flow Architecture */}
      <div
        className="hud-panel p-6 border border-cyan-500/25"
        style={{ background: 'rgba(5, 7, 24, 0.85)' }}
      >
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-6">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-200 tracking-wider">
            <Layers size={14} className="text-cyan-400" />
            DOCUMENT ENGINE DATA PIPELINE // SCHEMATIC
          </div>
          <span className="text-[10px] text-slate-500 font-mono">END-TO-END FLOW</span>
        </div>

        {/* Step-by-step visual interactive diagram */}
        <div className="flex flex-col lg:flex-row items-stretch justify-between gap-3 text-center">
          {/* Step 1 */}
          <div className="flex-1 p-3.5 rounded bg-slate-950/60 border border-slate-800 flex flex-col items-center justify-center gap-2">
            <div className="text-[9px] text-slate-500 font-mono font-bold">SOURCE</div>
            <FileText size={20} className="text-blue-400" />
            <div className="text-xs font-bold text-white font-sans">BSE / NSE Sources</div>
            <div className="text-[10px] text-slate-400 font-sans">Raw PDF Disclosures & Filings</div>
          </div>

          <div className="flex items-center justify-center text-cyan-400 py-1 lg:py-0">
            <ArrowDown className="lg:-rotate-90" size={16} />
          </div>

          {/* Step 2 */}
          <div className="flex-1 p-3.5 rounded bg-slate-950/60 border border-slate-800 flex flex-col items-center justify-center gap-2">
            <div className="text-[9px] text-slate-500 font-mono font-bold">STAGE 1</div>
            <GitBranch size={20} className="text-cyan-400" />
            <div className="text-xs font-bold text-white font-sans">Ingestion Layer</div>
            <div className="text-[10px] text-slate-400 font-sans">Queue & Fetch Dispatcher</div>
          </div>

          <div className="flex items-center justify-center text-cyan-400 py-1 lg:py-0">
            <ArrowDown className="lg:-rotate-90" size={16} />
          </div>

          {/* Step 3 - Highlighted Engine */}
          <div className="flex-[1.2] p-4 rounded bg-cyan-950/30 border-2 border-cyan-400/60 flex flex-col items-center justify-center gap-2 relative shadow-[0_0_15px_rgba(0,255,216,0.15)]">
            <span className="absolute -top-2.5 px-2 py-0.5 bg-cyan-500 text-slate-950 text-[9px] font-bold rounded">
              DOCUMENT ENGINE
            </span>
            <div className="text-[9px] text-cyan-300 font-mono font-bold mt-1">PYTHON CORE</div>
            <Cpu size={24} className="text-cyan-300 animate-pulse" />
            <div className="text-xs font-bold text-cyan-200 font-sans">PDF Extraction</div>
            <div className="text-[10px] text-slate-300 font-sans">Tables, Resolutions, Text & Metadata</div>
          </div>

          <div className="flex items-center justify-center text-cyan-400 py-1 lg:py-0">
            <ArrowDown className="lg:-rotate-90" size={16} />
          </div>

          {/* Step 4 */}
          <div className="flex-1 p-3.5 rounded bg-slate-950/60 border border-slate-800 flex flex-col items-center justify-center gap-2">
            <div className="text-[9px] text-slate-500 font-mono font-bold">STAGE 3</div>
            <CheckCircle2 size={20} className="text-green-400" />
            <div className="text-xs font-bold text-white font-sans">Structured JSON</div>
            <div className="text-[10px] text-slate-400 font-sans">Canonical Schema Output</div>
          </div>

          <div className="flex items-center justify-center text-cyan-400 py-1 lg:py-0">
            <ArrowDown className="lg:-rotate-90" size={16} />
          </div>

          {/* Step 5 */}
          <div className="flex-1 p-3.5 rounded bg-slate-950/60 border border-slate-800 flex flex-col items-center justify-center gap-2">
            <div className="text-[9px] text-slate-500 font-mono font-bold">STAGE 4</div>
            <Shield size={20} className="text-purple-400" />
            <div className="text-xs font-bold text-white font-sans">Backend Validation</div>
            <div className="text-[10px] text-slate-400 font-sans">SEBI Rules & Rumour Linking</div>
          </div>

          <div className="flex items-center justify-center text-cyan-400 py-1 lg:py-0">
            <ArrowDown className="lg:-rotate-90" size={16} />
          </div>

          {/* Step 6 */}
          <div className="flex-1 p-3.5 rounded bg-slate-950/60 border border-slate-800 flex flex-col items-center justify-center gap-2">
            <div className="text-[9px] text-slate-500 font-mono font-bold">STORAGE</div>
            <Database size={20} className="text-yellow-400" />
            <div className="text-xs font-bold text-white font-sans">PostgreSQL</div>
            <div className="text-[10px] text-slate-400 font-sans">Relational Persistence</div>
          </div>
        </div>

        {/* Engineering Takeaway */}
        <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-400 leading-relaxed font-sans">
          <strong className="text-cyan-300 font-mono font-bold">Why this architecture matters: </strong>
          Financial filing standards evolve and formatting varies widely between companies. By keeping the Document Engine stateless and free from business rules, our extraction algorithms can be benchmarked and improved without touching the production database schema or risking regulatory compliance logic.
        </div>
      </div>
    </div>
  );
};

export default DocumentEngineSection;
