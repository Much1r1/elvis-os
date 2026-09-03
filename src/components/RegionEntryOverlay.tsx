import { useEffect, useState } from 'react';
import type { WorldNode } from '../types/portfolio';
import { playClickSound } from '../utils/audio';

interface RegionEntryOverlayProps {
  node: WorldNode | null;
  isTraveling: boolean;
  onTravelComplete?: () => void;
}

export function RegionEntryOverlay({ node, isTraveling, onTravelComplete }: RegionEntryOverlayProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isTraveling || !node) return;

    playClickSound(1200, 0.04);

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 5;
      setProgress(Math.min(100, currentProgress));

      if (currentProgress >= 100) {
        clearInterval(interval);
        if (onTravelComplete) {
          onTravelComplete();
        }
      }
    }, 40); // 20 steps * 40ms = 800ms travel duration

    return () => {
      clearInterval(interval);
    };
  }, [isTraveling, node, onTravelComplete]);

  if (!isTraveling || !node) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center font-mono select-none">
      {/* Background vignette & speed lines blur during hyper-travel */}
      <div className="absolute inset-0 bg-radial from-transparent via-slate-950/40 to-slate-950/80 animate-pulse" />

      {/* Central HUD Target Entry Card */}
      <div className="relative z-10 w-80 sm:w-96 glass-panel-accent p-6 rounded-lg border border-cyan-500/40 shadow-[0_0_50px_rgba(0,229,255,0.25)] flex flex-col items-center text-center space-y-4 animate-scaleUp">
        {/* Top Scanning Header */}
        <div className="w-full flex items-center justify-between text-[11px] text-cyan-400 font-bold border-b border-cyan-500/30 pb-2 tracking-widest uppercase">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            SYSTEM ACCESS
          </span>
          <span className="text-slate-400">{node.code}</span>
        </div>

        {/* Region Identity Title */}
        <div className="space-y-1 my-2">
          <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-wider flex items-center justify-center gap-2">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: node.color, boxShadow: `0 0 12px ${node.color}` }} />
            <span>{node.title}</span>
          </div>
          <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold">{node.shortDesc}</p>
        </div>

        {/* Dynamic Progress Telemetry */}
        <div className="w-full space-y-2">
          <div className="flex items-center justify-between text-[10px] text-slate-400">
            <span>TRANSITIONING TO REGION</span>
            <span className="text-emerald-400 font-bold">STATUS: ONLINE ({progress}%)</span>
          </div>
          <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-white/10">
            <div
              className="h-full transition-all duration-75 rounded-full"
              style={{
                width: `${progress}%`,
                backgroundColor: node.color,
                boxShadow: `0 0 10px ${node.color}`
              }}
            />
          </div>
        </div>

        {/* Bottom Tech Grid lines */}
        <div className="w-full text-[9px] text-slate-500 flex items-center justify-between pt-1 border-t border-white/5">
          <span>COORDS: [{node.position.x}, {node.position.y}, {node.position.z}]</span>
          <span>LATENCY: 1.2ms</span>
        </div>
      </div>
    </div>
  );
}
