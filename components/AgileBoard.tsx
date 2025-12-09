import React from 'react';
import { NodeData, NodeType } from '../types';
import { FlowNode } from './FlowNode';
import { PHASES, PROCESS_NODES } from '../data';
import { ArrowRight, CornerDownRight } from 'lucide-react';

interface AgileBoardProps {
  onNodeSelect: (node: NodeData) => void;
}

export const AgileBoard: React.FC<AgileBoardProps> = ({ onNodeSelect }) => {
  const getNodesByPhase = (phaseId: string) => 
    PROCESS_NODES.filter(n => n.column === phaseId);

  return (
    <div className="min-w-[1400px] p-8 pb-32">
      <div className="grid grid-cols-5 gap-8 h-full">
        {PHASES.map((phase, index) => (
          <div key={phase.id} className="flex flex-col h-full relative">
            {/* Phase Header */}
            <div className="mb-6 flex items-center gap-2 border-b-2 border-slate-200 pb-2">
              <span className="w-6 h-6 rounded-full bg-slate-800 text-white flex items-center justify-center text-sm font-bold">
                {index + 1}
              </span>
              <h3 className="font-bold text-slate-700 uppercase tracking-wide text-sm">{phase.label}</h3>
            </div>

            {/* Nodes Container */}
            <div className="flex-1 bg-slate-100/50 rounded-2xl border border-slate-200 border-dashed p-4 space-y-6 relative">
              
              {/* Special layout for Sprint Cycle to make it look like a loop */}
              {phase.id === 'sprint' ? (
                <div className="flex flex-col gap-4 relative py-4">
                  <div className="absolute top-0 bottom-0 left-4 w-1 bg-slate-200 rounded-full" />
                  {getNodesByPhase(phase.id).map(node => (
                    <div key={node.id} className="pl-8 relative">
                      <div className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-0.5 bg-slate-200" />
                      <FlowNode node={node} onClick={onNodeSelect} />
                    </div>
                  ))}
                  <div className="absolute bottom-4 left-4 w-4 h-4 rounded-full bg-slate-300 -translate-x-1.5" />
                </div>
              ) : (
                // Standard Vertical Stack Layout
                <div className="space-y-4">
                   {getNodesByPhase(phase.id).map((node, i) => (
                    <div key={node.id} className="relative group">
                       <FlowNode node={node} onClick={onNodeSelect} />
                       {/* Simple connector line for vertical stack */}
                       {i < getNodesByPhase(phase.id).length - 1 && (
                         <div className="h-4 w-0.5 bg-slate-300 mx-auto my-1" />
                       )}
                    </div>
                  ))}
                </div>
              )}

            </div>

            {/* Connector Arrow to Next Phase */}
            {index < PHASES.length - 1 && (
              <div className="absolute top-1/2 -right-6 text-slate-300 z-10">
                <ArrowRight size={32} strokeWidth={3} />
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Legend */}
      <div className="fixed bottom-8 left-8 bg-white p-4 rounded-xl shadow-lg border border-slate-100 flex gap-6 text-xs font-medium text-slate-600">
        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-sky-100 border border-sky-300 rounded"></div> Document</div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-amber-100 border border-amber-300 rounded"></div> Meeting</div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-purple-100 border border-purple-300 rounded"></div> Workshop</div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-emerald-100 border border-emerald-300 rotate-45"></div> Decision</div>
      </div>
    </div>
  );
};
