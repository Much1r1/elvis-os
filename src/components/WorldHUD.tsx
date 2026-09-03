import { useState, useEffect } from 'react';
import type { RegionId, WorldNode } from '../types/portfolio';
import {
  Volume2,
  VolumeX,
  Search,
  Download,
  Terminal,
  Activity,
  Compass,
  Layers,
  ArrowLeft
} from 'lucide-react';
import { toggleAmbientDrone, playClickSound } from '../utils/audio';

interface WorldHUDProps {
  activeNode: WorldNode | null;
  onClearActiveNode: () => void;
  nodes: WorldNode[];
  onSelectNode: (id: RegionId) => void;
  onOpenCommandPalette: () => void;
}

export function WorldHUD({
  activeNode,
  onClearActiveNode,
  nodes,
  onSelectNode,
  onOpenCommandPalette,
}: WorldHUDProps) {
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [fps, setFps] = useState(60);
  const [menuOpen, setMenuOpen] = useState(false);

  // FPS calculation loop
  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();

    const interval = setInterval(() => {
      const now = performance.now();
      const delta = (now - lastTime) / 1000;
      setFps(Math.min(60, Math.round(frameCount / delta)));
      frameCount = 0;
      lastTime = now;
    }, 1000);

    const handleFrame = () => {
      frameCount++;
      requestAnimationFrame(handleFrame);
    };
    const req = requestAnimationFrame(handleFrame);

    return () => {
      clearInterval(interval);
      cancelAnimationFrame(req);
    };
  }, []);

  const handleAudioToggle = () => {
    const newState = !audioEnabled;
    const success = toggleAmbientDrone(newState);
    if (success) {
      setAudioEnabled(newState);
      playClickSound(800, 0.03);
    }
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
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-30 flex flex-col justify-between p-3 sm:p-6 font-mono select-none">
      {/* TOP HEADER HUD */}
      <header className="pointer-events-auto flex items-center justify-between gap-4">
        {/* Identity & Current Location Breadcrumb */}
        <div className="glass-panel px-3.5 py-2 rounded-lg flex items-center gap-3 border border-white/10 shadow-xl">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#00e5ff]" />
            <span className="font-bold text-xs sm:text-sm text-slate-100 tracking-wider">ELVIS.OS</span>
          </div>

          <span className="text-slate-600 text-xs">//</span>

          {/* Location Breadcrumb */}
          <div className="flex items-center gap-1.5 text-xs">
            {activeNode ? (
              <>
                <button
                  onClick={() => { playClickSound(700, 0.02); onClearActiveNode(); }}
                  className="text-slate-400 hover:text-cyan-300 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3 h-3" />
                  <span className="hidden sm:inline">WORLD</span>
                </button>
                <span className="text-slate-600">/</span>
                <span className="font-bold text-cyan-300 uppercase">{activeNode.title}</span>
              </>
            ) : (
              <span className="text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1">
                <Compass className="w-3.5 h-3.5 text-cyan-400" />
                WORLD VIEW
              </span>
            )}
          </div>
        </div>

        {/* Quick Nav Controls & Recruiter Links */}
        <div className="flex items-center gap-2">
          {/* Fast Search Command Palette */}
          <button
            onClick={() => { playClickSound(900, 0.02); onOpenCommandPalette(); }}
            className="glass-panel px-3 py-2 rounded-lg text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 text-xs flex items-center gap-2 transition-all cursor-pointer shadow-lg"
            title="Search or ask AI agent (Cmd + K)"
          >
            <Search className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden md:inline text-slate-400 text-[11px]">Search (Cmd+K)</span>
          </button>

          {/* Quick Direct Access CV Download */}
          <button
            onClick={handleDownloadCV}
            className="glass-panel px-3 py-2 rounded-lg text-emerald-400 hover:text-white hover:bg-emerald-950/60 border border-emerald-500/30 text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-lg"
            title="Direct CV Download"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline font-bold">CV</span>
          </button>

          {/* Audio Drone Toggle */}
          <button
            onClick={handleAudioToggle}
            className={`glass-panel p-2 rounded-lg text-xs flex items-center justify-center transition-all cursor-pointer shadow-lg ${
              audioEnabled ? 'text-cyan-400 border-cyan-500/40 bg-cyan-950/40' : 'text-slate-400 hover:text-slate-200'
            }`}
            title={audioEnabled ? 'Mute ambient soundscape' : 'Enable Web Audio ambient soundscape'}
          >
            {audioEnabled ? <Volume2 className="w-4 h-4 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Region Quick Selector Drawer Trigger */}
          <button
            onClick={() => { playClickSound(800, 0.02); setMenuOpen(!menuOpen); }}
            className="glass-panel p-2 rounded-lg text-slate-300 hover:text-cyan-300 text-xs flex sm:hidden items-center justify-center cursor-pointer"
          >
            <Layers className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* MOBILE REGION LIST DROPDOWN */}
      {menuOpen && (
        <div className="pointer-events-auto sm:hidden mt-2 p-3 glass-panel rounded-lg border border-cyan-500/30 space-y-1.5 animate-fadeIn">
          <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-bold mb-1">
            EXPLORE REGIONS:
          </span>
          {nodes.map(n => (
            <button
              key={n.id}
              onClick={() => {
                onSelectNode(n.id);
                setMenuOpen(false);
              }}
              className="w-full text-left p-1.5 rounded text-xs text-slate-200 hover:bg-cyan-950/50 hover:text-cyan-300 flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: n.color }} />
                <span>{n.title}</span>
              </div>
              <span className="text-[10px] text-slate-500">{n.code}</span>
            </button>
          ))}
        </div>
      )}

      {/* BOTTOM TELEMETRY FOOTER HUD */}
      <footer className="pointer-events-auto flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 border-t border-white/5 text-[10px] text-slate-500">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <Activity className="w-3 h-3 text-cyan-400" /> FPS: <strong className="text-slate-300">{fps}</strong>
          </span>
          <span className="text-slate-700">|</span>
          <span>
            WORLD NODES: <strong className="text-slate-300">{nodes.length}</strong>
          </span>
          <span className="text-slate-700 hidden sm:inline">|</span>
          <span className="hidden sm:inline">
            PROTOCOL: <strong className="text-emerald-400">gRPC/TLS 1.3</strong>
          </span>
        </div>

        {/* Escape Hint / Instructions */}
        <div className="flex items-center gap-2 text-slate-400">
          {activeNode ? (
            <button
              onClick={() => { playClickSound(700, 0.02); onClearActiveNode(); }}
              className="px-2 py-0.5 rounded bg-slate-900 border border-cyan-500/30 text-cyan-300 hover:text-white cursor-pointer"
            >
              [ESC] Return to World
            </button>
          ) : (
            <span className="flex items-center gap-1">
              <Terminal className="w-3 h-3 text-cyan-400" /> Click any 3D node or drag view to navigate
            </span>
          )}
        </div>
      </footer>
    </div>
  );
}
