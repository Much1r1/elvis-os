import { useEffect } from 'react';
import type { WorldNode } from '../types/portfolio';
import { KijijiMeshVisualizer } from './KijijiMeshVisualizer';
import { X, ExternalLink, Download, Code2, Cpu, Check } from 'lucide-react';
import { playClickSound } from '../utils/audio';

interface SystemNodeModalProps {
  node: WorldNode | null;
  onClose: () => void;
}

export function SystemNodeModal({ node, onClose }: SystemNodeModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        playClickSound(700, 0.03);
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!node) return null;

  const handleDownloadCV = () => {
    playClickSound(1000, 0.04);
    // Generate a clean text CV summary download
    const cvContent = `ELVIS MUCHIRI
Software Engineer & AI Systems Architect
Email: contact@elvismuchiri.com | GitHub: github.com | LinkedIn: linkedin.com

==================================================
SUMMARY
==================================================
Software Engineer specializing in distributed systems, autonomous AI agents, and reactive full-stack web applications. Built high-impact production systems at Vetted and interactive computational tools.

==================================================
CORE TECHNICAL STACK
==================================================
Languages: TypeScript, JavaScript, Python, Rust, SQL
Frontend: React, Next.js, Vite, Three.js, Tailwind CSS, WebAudio
Backend: Node.js, Express, FastAPI, PostgreSQL, Redis, Docker
AI / ML: Vector DBs (Pinecone/Qdrant/PGVector), LangChain, LlamaIndex, OpenAI, PyTorch

==================================================
EXPERIENCE
==================================================
Software Engineer | Vetted
- Engineered scalable microservices, high-throughput APIs, and responsive web products.
- Built automated AI retrieval workflows and resilient cloud infrastructure.

==================================================
KEY PROJECTS
==================================================
Project Kijiji: Distributed community commerce microservice mesh with real-time inventory synchronization.
elvis-os: Interactive 3D computational portfolio world built with React, TypeScript, and Three.js.
`;

    const blob = new Blob([cvContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Elvis_Muchiri_CV.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed top-16 right-3 sm:right-6 bottom-16 z-40 w-full max-w-lg sm:max-w-xl flex flex-col pointer-events-auto font-mono transition-all animate-slideInRight">
      {/* Information Panel Overlay Container - 3D Environment visible behind & around */}
      <div
        className="relative z-10 w-full h-full glass-panel-accent rounded-xl p-5 sm:p-6 flex flex-col shadow-2xl border border-cyan-500/30 overflow-hidden backdrop-blur-md bg-slate-950/85"
        style={{ borderTopColor: node.color, borderTopWidth: '3px' }}
      >
        {/* Header Navigation */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>CURRENT LOCATION:</span>
              <span className="text-cyan-400 font-bold">{node.code}</span>
              <span>/</span>
              <span className="uppercase text-slate-200">{node.title}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-wide mt-1 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: node.color }} />
              {node.title}
            </h2>
          </div>

          <button
            onClick={() => { playClickSound(700, 0.03); onClose(); }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/15 transition-all text-xs cursor-pointer"
          >
            <span className="hidden sm:inline font-bold text-cyan-400">[ESC]</span>
            <span>Return to World</span>
            <X className="w-4 h-4 ml-1" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto pr-2 py-4 space-y-6">
          <p className="text-slate-300 text-sm leading-relaxed border-l-2 pl-3 border-cyan-500/50">
            {node.shortDesc}
          </p>

          {/* Items / Systems details */}
          <div className="space-y-6">
            {node.items.map((item, idx) => (
              <div key={idx} className="p-4 rounded-lg bg-slate-900/60 border border-white/10 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className="font-bold text-base text-cyan-300">{item.title}</h3>
                  {item.role && (
                    <span className="text-xs text-amber-400 font-semibold bg-amber-950/40 px-2 py-0.5 rounded border border-amber-500/30">
                      {item.role} {item.period ? `(${item.period})` : ''}
                    </span>
                  )}
                </div>

                {item.subtitle && <p className="text-xs text-slate-400 font-semibold">{item.subtitle}</p>}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                  {item.description}
                </p>

                {/* Metrics */}
                {item.metrics && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2">
                    {item.metrics.map((m, mIdx) => (
                      <div key={mIdx} className="p-2 rounded bg-slate-950/60 border border-white/5">
                        <span className="text-[10px] text-slate-500 block uppercase">{m.label}</span>
                        <span className="text-xs font-bold text-emerald-400">{m.value}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Code Snippet */}
                {item.codeSnippet && (
                  <div className="mt-2 p-3 rounded bg-slate-950 font-mono text-xs text-slate-300 border border-slate-800 overflow-x-auto relative">
                    <div className="flex items-center justify-between text-[10px] text-slate-500 mb-2 border-b border-slate-800 pb-1">
                      <span className="flex items-center gap-1"><Code2 className="w-3 h-3 text-cyan-400" /> CODE EXECUTION LOG</span>
                      <span className="text-cyan-400 font-semibold">TYPESCRIPT</span>
                    </div>
                    <pre>{item.codeSnippet}</pre>
                  </div>
                )}

                {/* Tags */}
                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {item.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded text-[10px] bg-cyan-950/40 text-cyan-300 border border-cyan-500/20"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Links */}
                {item.links && item.links.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
                    {item.links.map((link, lIdx) => {
                      if (link.url === '#download-cv') {
                        return (
                          <button
                            key={lIdx}
                            onClick={handleDownloadCV}
                            className="px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-all shadow-[0_0_12px_rgba(16,185,129,0.3)]"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>{link.label}</span>
                          </button>
                        );
                      }

                      return (
                        <a
                          key={lIdx}
                          href={link.url}
                          target={link.external ? '_blank' : '_self'}
                          rel="noreferrer"
                          className="px-3 py-1.5 rounded bg-cyan-950/80 hover:bg-cyan-900 text-cyan-300 hover:text-white border border-cyan-500/30 text-xs flex items-center gap-1.5 transition-all"
                        >
                          <span>{link.label}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Interactive Microservice Graph Demo if Project Labs */}
          {node.interactiveData?.kijijiGraph && (
            <KijijiMeshVisualizer nodes={node.interactiveData.kijijiGraph} />
          )}
        </div>

        {/* Footer info bar */}
        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-500">
          <span className="flex items-center gap-1">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" /> REGION ACCESS GRANTED
          </span>
          <span className="flex items-center gap-1 text-slate-400">
            <Check className="w-3.5 h-3.5 text-emerald-400" /> SYSTEM NODE SYNCHRONIZED
          </span>
        </div>
      </div>
    </div>
  );
}
