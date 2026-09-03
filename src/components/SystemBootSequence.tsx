import { useState, useEffect, useCallback } from 'react';
import { Terminal, Shield, Cpu, Activity, Play } from 'lucide-react';
import { playClickSound } from '../utils/audio';

interface SystemBootSequenceProps {
  onBootComplete: () => void;
}

const BOOT_LOGS = [
  { text: 'INITIALIZING ELVIS.OS v1.0.0', type: 'header' },
  { text: '──────────────────────────────────', type: 'divider' },
  { text: 'Loading identity core [SYS.ID]...', delay: 300 },
  { text: 'Verifying engineering architecture [SYS.ENG]...', delay: 600 },
  { text: 'Loading neural framework & model weights [SYS.AI]...', delay: 900 },
  { text: 'Mounting interactive project labs [SYS.LAB]...', delay: 1200 },
  { text: 'Loading experience history [SYS.EXP]...', delay: 1500 },
  { text: 'Establishing secure communications protocol [SYS.COM]...', delay: 1800 },
  { text: '──────────────────────────────────', type: 'divider' },
  { text: 'SYSTEM READY. ENTERING COMPUTATIONAL WORLD...', type: 'ready', delay: 2100 }
];

export function SystemBootSequence({ onBootComplete }: SystemBootSequenceProps) {
  const [visibleLogs, setVisibleLogs] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [isExiting, setIsExiting] = useState<boolean>(false);

  const handleComplete = useCallback(() => {
    if (isExiting) return;
    setIsExiting(true);
    playClickSound(1200, 0.05);
    setTimeout(() => {
      onBootComplete();
    }, 600);
  }, [isExiting, onBootComplete]);

  useEffect(() => {
    // Log items revealing
    const intervals: Array<ReturnType<typeof setTimeout>> = [];

    BOOT_LOGS.forEach((_, index) => {
      const timer = setTimeout(() => {
        setVisibleLogs(index + 1);
        playClickSound(800 + index * 60, 0.02);
      }, (index + 1) * 220);
      intervals.push(timer);
    });

    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return Math.min(100, prev + 5);
      });
    }, 100);

    // Auto complete boot
    const autoFinishTimer = setTimeout(() => {
      handleComplete();
    }, 3200);

    return () => {
      intervals.forEach(clearTimeout);
      clearInterval(progressInterval);
      clearTimeout(autoFinishTimer);
    };
  }, [handleComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#05080c] text-[#00e5ff] font-mono px-4 transition-opacity duration-700 ${
        isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute inset-0 bg-vignette pointer-events-none" />

      <div className="relative z-10 w-full max-w-xl glass-panel p-6 sm:p-8 rounded-lg shadow-2xl border border-cyan-500/20">
        {/* Header HUD Status */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span className="tracking-widest uppercase text-cyan-400 font-bold">ELVIS.OS KERNEL</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Shield className="w-3 h-3 text-emerald-400" /> SECURE
            </span>
            <span className="flex items-center gap-1">
              <Cpu className="w-3 h-3 text-blue-400" /> 64-BIT
            </span>
          </div>
        </div>

        {/* Boot Terminal Output */}
        <div className="space-y-2 min-h-[220px] font-mono text-xs sm:text-sm">
          {BOOT_LOGS.slice(0, visibleLogs).map((log, i) => {
            if (log.type === 'header') {
              return (
                <div key={i} className="text-cyan-300 font-bold text-sm tracking-widest uppercase flex items-center justify-between">
                  <span>{log.text}</span>
                  <Activity className="w-4 h-4 text-cyan-400 animate-spin" />
                </div>
              );
            }
            if (log.type === 'divider') {
              return <div key={i} className="text-slate-600">{log.text}</div>;
            }
            if (log.type === 'ready') {
              return (
                <div key={i} className="text-emerald-400 font-bold mt-3 animate-pulse flex items-center gap-2">
                  <span>[OK]</span> {log.text}
                </div>
              );
            }
            return (
              <div key={i} className="text-slate-300 flex items-start gap-2">
                <span className="text-cyan-500/70">{'>'}</span>
                <span>{log.text}</span>
              </div>
            );
          })}
        </div>

        {/* System Load Progress */}
        <div className="mt-6 pt-4 border-t border-white/10 space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span>MEM_ALLOC: 512MB / INITIALIZING</span>
            <span className="text-cyan-400 font-bold">{progress}%</span>
          </div>
          <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden border border-cyan-500/20">
            <div
              className="bg-cyan-400 h-full transition-all duration-150 ease-out shadow-[0_0_10px_#00e5ff]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Skip button */}
        <div className="mt-6 flex justify-between items-center text-xs">
          <span className="text-slate-500">Press ENTER or click to fast-forward</span>
          <button
            onClick={handleComplete}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-cyan-950/60 text-cyan-300 hover:bg-cyan-900/80 hover:text-white border border-cyan-500/30 transition-all cursor-pointer"
          >
            <Play className="w-3 h-3 fill-current" />
            <span>INITIALIZE WORLD NOW</span>
          </button>
        </div>
      </div>
    </div>
  );
}
