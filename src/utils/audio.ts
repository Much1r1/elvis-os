// Web Audio API Ambient Synthesizer & UI sound effects
let audioCtx: AudioContext | null = null;
let ambientOscillator: OscillatorNode | null = null;
let ambientGain: GainNode | null = null;

export function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playClickSound(frequency = 800, volume = 0.03): void {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(frequency * 0.4, ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  } catch {
    // Audio might be blocked by browser policy until user interaction
  }
}

export function toggleAmbientDrone(enable: boolean): boolean {
  try {
    const ctx = getAudioContext();

    if (!enable) {
      if (ambientGain) {
        ambientGain.gain.setTargetAtTime(0, ctx.currentTime, 0.2);
        setTimeout(() => {
          ambientOscillator?.stop();
          ambientOscillator = null;
          ambientGain = null;
        }, 300);
      }
      return false;
    }

    if (ambientOscillator) return true;

    // Create low ambient drone (subtle computational rumble)
    ambientOscillator = ctx.createOscillator();
    ambientGain = ctx.createGain();

    ambientOscillator.type = 'sawtooth';
    ambientOscillator.frequency.setValueAtTime(55, ctx.currentTime); // A1 note low frequency

    // Filter to make it smooth low rumble
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(120, ctx.currentTime);

    ambientGain.gain.setValueAtTime(0.001, ctx.currentTime);
    ambientGain.gain.exponentialRampToValueAtTime(0.015, ctx.currentTime + 2.0); // very soft

    ambientOscillator.connect(filter);
    filter.connect(ambientGain);
    ambientGain.connect(ctx.destination);

    ambientOscillator.start();
    return true;
  } catch {
    return false;
  }
}
