import { useState, useEffect } from 'react';
import type { RegionId, WorldNode } from '../types/portfolio';
import { Search, Terminal, ArrowRight, X, Sparkles, Download, Shield } from 'lucide-react';
import { playClickSound } from '../utils/audio';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  nodes: WorldNode[];
  onSelectNode: (id: RegionId) => void;
}

export function CommandPalette({ isOpen, onClose, nodes, onSelectNode }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        playClickSound(900, 0.03);
        if (isOpen) onClose();
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Filter nodes & knowledge QA entries
  const filteredNodes = nodes.filter(
    n =>
      n.title.toLowerCase().includes(query.toLowerCase()) ||
      n.shortDesc.toLowerCase().includes(query.toLowerCase()) ||
      n.code.toLowerCase().includes(query.toLowerCase())
  );

  const allKnowledge = nodes.flatMap(n => n.knowledge);
  const filteredKnowledge = allKnowledge.filter(
    k =>
      k.question.toLowerCase().includes(query.toLowerCase()) ||
      k.answer.toLowerCase().includes(query.toLowerCase()) ||
      k.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
  );

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    setAiAnswer(null);

    // AI agent simulated response if user asks a direct question
    if (val.trim().endsWith('?') || val.toLowerCase().includes('what') || val.toLowerCase().includes('who') || val.toLowerCase().includes('cv')) {
      const match = allKnowledge.find(k => val.toLowerCase().split(' ').some(w => w.length > 3 && k.question.toLowerCase().includes(w)));
      if (match) {
        setAiAnswer(match.answer);
      }
    }
  };

  const handleSelect = (id: RegionId) => {
    playClickSound(1000, 0.03);
    onSelectNode(id);
    onClose();
  };

  const handleDownloadCV = () => {
    playClickSound(1000, 0.04);
    const cvContent = `ELVIS MUCHIRI - CV Summary\nEmail: contact@elvismuchiri.com\nSoftware Engineer & AI Systems Architect.`;
    const blob = new Blob([cvContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Elvis_Muchiri_CV.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/80 backdrop-blur-md font-mono">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-2xl glass-panel-accent rounded-xl p-4 sm:p-6 shadow-2xl border border-cyan-500/40 flex flex-col gap-4">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 pb-3 border-b border-white/10">
          <Search className="w-5 h-5 text-cyan-400" />
          <input
            type="text"
            value={query}
            onChange={handleQueryChange}
            placeholder="Type a region name or question (e.g., 'What has Elvis built?')..."
            autoFocus
            className="w-full bg-transparent text-sm text-slate-100 focus:outline-none placeholder-slate-500 font-mono"
          />
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* AI Agent Instant Knowledge Answer Box */}
        {aiAnswer && (
          <div className="p-3 rounded bg-cyan-950/40 border border-cyan-500/30 flex items-start gap-2 text-xs">
            <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5 animate-pulse" />
            <div>
              <span className="font-bold text-cyan-300 block mb-0.5">ELVIS.OS NEURAL QUERY ENGINE:</span>
              <p className="text-slate-200 leading-relaxed">{aiAnswer}</p>
            </div>
          </div>
        )}

        {/* Quick Commands & CV Download Shortcut */}
        {!query && (
          <div className="flex items-center gap-2 pb-2 border-b border-white/5 text-xs text-slate-400">
            <span className="text-[10px] uppercase tracking-wider text-slate-500">Fast Actions:</span>
            <button
              onClick={handleDownloadCV}
              className="px-2.5 py-1 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-900/80 flex items-center gap-1 cursor-pointer transition-all"
            >
              <Download className="w-3 h-3" />
              <span>Download CV [PDF/TXT]</span>
            </button>
            <button
              onClick={() => handleSelect('communication_hub')}
              className="px-2.5 py-1 rounded bg-slate-900 text-cyan-300 border border-cyan-500/20 hover:bg-slate-800 flex items-center gap-1 cursor-pointer transition-all"
            >
              <Shield className="w-3 h-3" />
              <span>Contact Channels</span>
            </button>
          </div>
        )}

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto space-y-2 pr-1">
          {filteredNodes.length > 0 && (
            <div>
              <span className="text-[10px] uppercase tracking-wider text-slate-500 block mb-1.5 font-bold">
                COMPUTATIONAL REGIONS ({filteredNodes.length})
              </span>
              <div className="space-y-1">
                {filteredNodes.map(node => (
                  <button
                    key={node.id}
                    onClick={() => handleSelect(node.id)}
                    className="w-full p-2.5 rounded bg-slate-900/60 hover:bg-cyan-950/50 border border-white/5 hover:border-cyan-500/30 flex items-center justify-between text-left transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: node.color }}
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-200 text-xs">{node.title}</span>
                          <span className="text-[10px] text-slate-500">{node.code}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 line-clamp-1">{node.shortDesc}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {filteredKnowledge.length > 0 && query && (
            <div className="mt-3">
              <span className="text-[10px] uppercase tracking-wider text-slate-500 block mb-1.5 font-bold">
                KNOWLEDGE BASE MATCHES
              </span>
              <div className="space-y-1.5">
                {filteredKnowledge.map((k, i) => (
                  <div key={i} className="p-2.5 rounded bg-slate-900/80 border border-white/5 text-xs space-y-1">
                    <span className="font-semibold text-cyan-300 block">{k.question}</span>
                    <p className="text-slate-300 text-[11px] leading-relaxed">{k.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {filteredNodes.length === 0 && filteredKnowledge.length === 0 && (
            <div className="p-8 text-center text-slate-500 text-xs flex flex-col items-center gap-2">
              <Terminal className="w-6 h-6 text-slate-600" />
              <span>No direct match found for "{query}". Try searching 'SYSTEMS', 'AI', or 'CV'.</span>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-500">
          <span>Press ESC to close</span>
          <span>Cmd + K to toggle command palette</span>
        </div>
      </div>
    </div>
  );
}
