import { useState, useMemo } from 'react';
import type { RegionId } from './types/portfolio';
import { WORLD_NODES } from './data/worldNodes';
import { SystemBootSequence } from './components/SystemBootSequence';
import { WorldCanvas } from './canvas/WorldCanvas';
import { WorldHUD } from './components/WorldHUD';
import { SystemNodeModal } from './components/SystemNodeModal';
import { CommandPalette } from './components/CommandPalette';

import { useEffect } from 'react';

export default function App() {
  const [bootComplete, setBootComplete] = useState<boolean>(false);
  const [activeNodeId, setActiveNodeId] = useState<RegionId | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<RegionId | null>(null);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState<boolean>(false);

  const activeNode = useMemo(() => {
    return WORLD_NODES.find(n => n.id === activeNodeId) || null;
  }, [activeNodeId]);

  // Global ESC key listener to return to WORLD view
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeNodeId) {
        setActiveNodeId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeNodeId]);

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
        onSelectNode={setActiveNodeId}
        hoveredNodeId={hoveredNodeId}
        onHoverNode={setHoveredNodeId}
      />

      {/* Atmospheric UI HUD */}
      <WorldHUD
        activeNode={activeNode}
        onClearActiveNode={() => setActiveNodeId(null)}
        nodes={WORLD_NODES}
        onSelectNode={setActiveNodeId}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
      />

      {/* Active Node Detail Modal Overlay */}
      <SystemNodeModal
        node={activeNode}
        onClose={() => setActiveNodeId(null)}
      />

      {/* Command Palette / Search / AI Terminal Prompt */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        nodes={WORLD_NODES}
        onSelectNode={setActiveNodeId}
      />
    </main>
  );
}
