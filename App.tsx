import React, { useState } from 'react';
import { AgileBoard } from './components/AgileBoard';
import { DetailPanel } from './components/DetailPanel';
import { NodeData } from './types';
import { HelpCircle } from 'lucide-react';

const App: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-slate-50 text-slate-800">
      {/* Navbar */}
      <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0 z-20 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-tight text-slate-900">AgileFlow Explorer</h1>
            <p className="text-xs text-slate-500 font-medium">Interactive Process Visualization Tool</p>
          </div>
        </div>
        <button 
          onClick={() => alert("Welcome to AgileFlow! Click any node in the diagram to see detailed information, participants, and get AI-powered explanations about that specific step in the Agile process.")}
          className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors"
        >
          <HelpCircle size={18} />
          <span>How to use</span>
        </button>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 relative overflow-x-auto overflow-y-auto no-scrollbar bg-slate-50/50">
        <AgileBoard onNodeSelect={setSelectedNode} />
      </main>

      {/* Sidebar Overlay */}
      {selectedNode && (
        <>
          {/* Backdrop for mobile focus, though panel pushes content on desktop usually */}
          <div 
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 transition-opacity" 
            onClick={() => setSelectedNode(null)}
          />
          <DetailPanel 
            node={selectedNode} 
            onClose={() => setSelectedNode(null)} 
          />
        </>
      )}
    </div>
  );
};

export default App;
