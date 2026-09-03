import { useState, useMemo, useCallback, useEffect } from 'react';
import type { RegionId, TravelPhase } from './types/portfolio';
import { WORLD_NODES } from './data/worldNodes';
import { SystemBootSequence } from './components/SystemBootSequence';
import { WorldCanvas } from './canvas/WorldCanvas';
import { WorldHUD } from './components/WorldHUD';
import { SystemNodeModal } from './components/SystemNodeModal';
import { CommandPalette } from './components/CommandPalette';
import { RegionEntryOverlay } from './components/RegionEntryOverlay';

export default function App() {
  const [bootComplete, setBootComplete] = useState<boolean>(false);
  const [activeNodeId, setActiveNodeId] = useState<RegionId | null>(null);
  const [travelPhase, setTravelPhase] = useState<TravelPhase>('idle');
  const [hoveredNodeId, setHoveredNodeId] = useState<RegionId | null>(null);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState<boolean>(false);

  const activeNode = useMemo(() => {
    return WORLD_NODES.find(n => n.id === activeNodeId) || null;
  }, [activeNodeId]);

  const handleSelectNode = useCallback((id: RegionId | null) => {
    if (id === null) {
      setTravelPhase('idle');
      setActiveNodeId(null);
    } else {
      setActiveNodeId(id);
      setTravelPhase('traveling');
    }
  }, []);

  const handleTravelComplete = useCallback(() => {
    setTravelPhase('entered');
  }, []);

  // Global ESC key listener to return to WORLD view
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeNodeId) {
        handleSelectNode(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeNodeId, handleSelectNode]);

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#05080c] select-none">
      {/* Boot Initialization Sequence */}
      {!bootComplete && (
        <SystemBootSequence onBootComplete={() => setBootComplete(true)} />
      )}

      {/* Main 3D Computational World Canvas */}
      <WorldCanvas
        nodes={WORLD_NODES}
        activeNodeId={activeNodeId}
        travelPhase={travelPhase}
        onSelectNode={handleSelectNode}
        hoveredNodeId={hoveredNodeId}
        onHoverNode={setHoveredNodeId}
      />

      {/* Cinematic Region Entry HUD Overlay */}
      <RegionEntryOverlay
        node={activeNode}
        isTraveling={travelPhase === 'traveling'}
        onTravelComplete={handleTravelComplete}
      />

      {/* Atmospheric UI HUD */}
      <WorldHUD
        activeNode={activeNode}
        travelPhase={travelPhase}
        onClearActiveNode={() => handleSelectNode(null)}
        nodes={WORLD_NODES}
        onSelectNode={handleSelectNode}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
      />

      {/* Active Region Information Panel Overlay (visible once region travel complete) */}
      <SystemNodeModal
        node={travelPhase === 'entered' ? activeNode : null}
        onClose={() => handleSelectNode(null)}
      />

      {/* Command Palette / Search / AI Terminal Prompt */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        nodes={WORLD_NODES}
        onSelectNode={handleSelectNode}
      />
    </main>
  );
}
