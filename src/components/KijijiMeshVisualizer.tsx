import { useState } from 'react';
import type { KijijiNode } from '../types/portfolio';
import { Server, Database, Bot, Radio, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { playClickSound } from '../utils/audio';

interface KijijiMeshVisualizerProps {
  nodes: KijijiNode[];
}

export function KijijiMeshVisualizer({ nodes }: KijijiMeshVisualizerProps) {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('gateway');

  const selectedNode = nodes.find(n => n.id === selectedNodeId) || nodes[0];

  const getNodeIcon = (type: KijijiNode['type']) => {
    switch (type) {
      case 'service':
        return <Server className="w-4 h-4 text-cyan-400" />;
      case 'database':
        return <Database className="w-4 h-4 text-emerald-400" />;
      case 'ai_agent':
        return <Bot className="w-4 h-4 text-purple-400" />;
      case 'queue':
        return <Radio className="w-4 h-4 text-amber-400" />;
      default:
        return <Zap className="w-4 h-4 text-blue-400" />;
    }
  };

  const handleSelect = (id: string) => {
    playClickSound(1000, 0.02);
    setSelectedNodeId(id);
  };

  return (
    <div className="mt-4 p-4 rounded-lg bg-slate-950/80 border border-emerald-500/30 font-mono text-xs">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span className="font-bold text-emerald-400 tracking-wider">PROJECT KIJIJI :: MICROSERVICE MESH</span>
        </div>
        <span className="text-[10px] text-slate-500">INTERACTIVE GRAPH SIMULATOR</span>
      </div>

      {/* Network Nodes Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
        {nodes.map(node => {
          const isSelected = node.id === selectedNodeId;
          return (
            <button
              key={node.id}
              onClick={() => handleSelect(node.id)}
              className={`p-2.5 rounded border text-left flex flex-col gap-1 transition-all cursor-pointer ${
                isSelected
                  ? 'bg-emerald-950/40 border-emerald-400/80 text-white shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                  : 'bg-slate-900/60 border-white/10 text-slate-400 hover:border-slate-600 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between">
                {getNodeIcon(node.type)}
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    node.status === 'active'
                      ? 'bg-emerald-400'
                      : node.status === 'syncing'
                      ? 'bg-amber-400 animate-ping'
                      : 'bg-slate-600'
                  }`}
                />
              </div>
              <span className="font-bold text-[11px] truncate">{node.label}</span>
              <span className="text-[9px] uppercase text-slate-500">{node.type}</span>
            </button>
          );
        })}
      </div>

      {/* Selected Node Details & Topology Connections */}
      {selectedNode && (
        <div className="p-3 rounded bg-slate-900/80 border border-white/10 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-200 text-sm flex items-center gap-2">
              {getNodeIcon(selectedNode.type)}
              {selectedNode.label}
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] uppercase bg-slate-800 text-emerald-400 border border-emerald-500/20">
              STATUS: {selectedNode.status}
            </span>
          </div>

          <p className="text-slate-300 text-xs">{selectedNode.description}</p>

          {selectedNode.connections.length > 0 ? (
            <div className="mt-2 pt-2 border-t border-white/5">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block mb-1.5">
                Active Mesh Downstream Pipes:
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedNode.connections.map(targetId => {
                  const targetNode = nodes.find(n => n.id === targetId);
                  return (
                    <button
                      key={targetId}
                      onClick={() => handleSelect(targetId)}
                      className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 text-[10px] flex items-center gap-1 cursor-pointer border border-cyan-500/20"
                    >
                      <ArrowRight className="w-2.5 h-2.5 text-cyan-400" />
                      <span>{targetNode?.label || targetId}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <span className="text-[10px] text-slate-500 italic mt-1">Terminal Sink Node (No downstream targets)</span>
          )}
        </div>
      )}
    </div>
  );
}
