import React from 'react';
import { NodeData, NodeType } from '../types';
import { FileText, Users, Lightbulb, GitMerge, Flag, CheckCircle } from 'lucide-react';

interface FlowNodeProps {
  node: NodeData;
  onClick: (node: NodeData) => void;
}

export const FlowNode: React.FC<FlowNodeProps> = ({ node, onClick }) => {
  const getStyles = (type: NodeType) => {
    switch (type) {
      case NodeType.DOCUMENT:
        return 'bg-sky-50 border-sky-200 text-sky-800 hover:border-sky-400 hover:shadow-sky-100';
      case NodeType.MEETING:
        return 'bg-amber-50 border-amber-200 text-amber-800 hover:border-amber-400 hover:shadow-amber-100';
      case NodeType.WORKSHOP:
        return 'bg-purple-50 border-purple-200 text-purple-800 hover:border-purple-400 hover:shadow-purple-100';
      case NodeType.DECISION:
        return 'bg-emerald-50 border-emerald-200 text-emerald-800 rotate-45 hover:border-emerald-400 transform origin-center';
      case NodeType.TERMINAL:
        return 'bg-slate-800 border-slate-900 text-white hover:bg-slate-700';
      case NodeType.ACTION:
        return 'bg-rose-50 border-rose-200 text-rose-800 hover:border-rose-400 hover:shadow-rose-100';
      default:
        return 'bg-white border-slate-200 text-slate-700';
    }
  };

  const getIcon = (type: NodeType) => {
    switch (type) {
      case NodeType.DOCUMENT: return <FileText size={16} />;
      case NodeType.MEETING: return <Users size={16} />;
      case NodeType.WORKSHOP: return <Lightbulb size={16} />;
      case NodeType.DECISION: return <GitMerge size={16} />;
      case NodeType.TERMINAL: return <Flag size={16} />;
      case NodeType.ACTION: return <CheckCircle size={16} />;
      default: return <FileText size={16} />;
    }
  };

  const isDecision = node.type === NodeType.DECISION;
  const baseClasses = "relative group cursor-pointer border-2 transition-all duration-200 shadow-sm hover:shadow-md flex flex-col items-center justify-center p-3 text-center";
  const shapeClasses = isDecision ? "w-24 h-24 m-4" : "w-full min-h-[100px] rounded-lg";

  return (
    <div onClick={() => onClick(node)} className="flex flex-col items-center w-full">
      <div className={`${baseClasses} ${shapeClasses} ${getStyles(node.type)}`}>
        {/* Undo rotation for decision content */}
        <div className={`flex flex-col items-center gap-2 ${isDecision ? '-rotate-45' : ''}`}>
          <div className="opacity-70">{getIcon(node.type)}</div>
          <span className="text-xs font-semibold leading-tight">{node.label}</span>
        </div>
        
        {/* Hover Hint */}
        <div className={`absolute -top-2 -right-2 w-3 h-3 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity ${isDecision ? '-rotate-45' : ''}`} />
      </div>
    </div>
  );
};
