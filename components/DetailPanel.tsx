import React, { useState, useEffect, useRef } from 'react';
import { NodeData, ChatMessage, NodeType } from '../types';
import { generateAIResponse } from '../services/geminiService';
import { X, Send, Bot, User, Loader2, Sparkles } from 'lucide-react';

interface DetailPanelProps {
  node: NodeData | null;
  onClose: () => void;
}

// Helper to generate context-aware prompts
const getSuggestedPrompts = (node: NodeData): string[] => {
  const common = ["Explain this step simply", "Why is this important?"];
  
  switch (node.type) {
    case NodeType.DOCUMENT:
      return ["What should be in this document?", "Who creates this?", ...common];
    case NodeType.MEETING:
      return ["What is the agenda?", "Who needs to attend?", "What are the outcomes?", ...common];
    case NodeType.WORKSHOP:
      return ["How do we prepare?", "What activities happen here?", ...common];
    case NodeType.DECISION:
      return ["What are the criteria?", "Who decides this?", "What if the answer is No?", ...common];
    case NodeType.ACTION:
      return ["What tasks are involved?", "How to measure progress?", ...common];
    case NodeType.TERMINAL:
      return ["What happens next?", "Is this the final step?", ...common];
    default:
      return ["What are the key inputs?", "What are the expected outputs?", ...common];
  }
};

export const DetailPanel: React.FC<DetailPanelProps> = ({ node, onClose }) => {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (node) {
      setChatHistory([
        {
          role: 'model',
          text: `Hello! I can help you understand the "${node.label}" step. What would you like to know?`,
          timestamp: Date.now()
        }
      ]);
      setInput('');
    }
  }, [node]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory, isLoading]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || !node) return;

    const userMsg: ChatMessage = { role: 'user', text: text, timestamp: Date.now() };
    setChatHistory(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      // Pass the updated history including the new user message
      const responseText = await generateAIResponse([...chatHistory, userMsg], node);
      setChatHistory(prev => [...prev, { role: 'model', text: responseText, timestamp: Date.now() }]);
    } catch (e) {
      console.error(e);
      setChatHistory(prev => [...prev, { role: 'model', text: "Sorry, I encountered an error. Please try again.", timestamp: Date.now() }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputSubmit = () => {
    sendMessage(input);
    setInput('');
  };

  if (!node) return null;

  const suggestedPrompts = getSuggestedPrompts(node);

  return (
    <div className="fixed inset-y-0 right-0 w-full md:w-[480px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 flex flex-col border-l border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-100 flex justify-between items-start bg-slate-50">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">{node.label}</h2>
          <span className="inline-block px-2 py-1 mt-2 text-xs font-semibold tracking-wide uppercase bg-blue-100 text-blue-700 rounded-full">
            {node.type}
          </span>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
          <X size={24} className="text-slate-500" />
        </button>
      </div>

      {/* Content Scroll Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        
        {/* Participants/Responsibility */}
        {(node.participants || node.responsibility) && (
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Who is involved?</h3>
            <div className="space-y-3">
              {node.responsibility && (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                    <User size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Responsible</p>
                    <p className="font-medium text-slate-800">{node.responsibility}</p>
                  </div>
                </div>
              )}
              {node.participants && (
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-600">
                    <User size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Participants</p>
                    <p className="font-medium text-slate-800">{node.participants}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Description */}
        {node.description && (
          <div>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Description</h3>
            <p className="text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-lg border border-slate-100">
              {node.description}
            </p>
          </div>
        )}

        {/* Detailed Content */}
        {node.content && (
          <div>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Detailed Content</h3>
            <p className="text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-lg border border-slate-100">
              {node.content}
            </p>
          </div>
        )}

        {/* Activities List */}
        {node.activities && node.activities.length > 0 && (
          <div>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Key Activities</h3>
            <ul className="space-y-2">
              {node.activities.map((activity, idx) => (
                <li key={idx} className="flex gap-3 text-slate-700">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-bold mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-tight pt-1">{activity}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* AI Chat Section */}
        <div className="pt-6 border-t border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
              <Bot size={18} className="text-white" />
            </div>
            <h3 className="font-semibold text-slate-800">Process Assistant</h3>
          </div>
          
          <div className="bg-gray-50 rounded-xl border border-gray-200 h-80 flex flex-col overflow-hidden">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
              {chatHistory.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl p-3 text-sm ${
                    msg.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-br-none' 
                      : 'bg-white border border-gray-200 text-slate-700 rounded-bl-none shadow-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                   <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-2">
                      <Loader2 size={16} className="animate-spin text-purple-500" />
                      <span className="text-xs text-slate-400">Thinking...</span>
                   </div>
                </div>
              )}
            </div>

            {/* Suggested Prompts */}
            <div className="px-3 pb-2 bg-gray-50 flex gap-2 overflow-x-auto no-scrollbar mask-linear-fade">
              <div className="flex items-center gap-1.5 pr-2 opacity-60">
                <Sparkles size={14} className="text-purple-500" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 whitespace-nowrap">Ask:</span>
              </div>
              {suggestedPrompts.map((prompt, i) => (
                <button 
                  key={i} 
                  onClick={() => sendMessage(prompt)}
                  disabled={isLoading}
                  className="flex-shrink-0 text-xs bg-white border border-purple-200 text-purple-700 px-3 py-1.5 rounded-full hover:bg-purple-50 hover:border-purple-300 transition-colors whitespace-nowrap shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-3 border-t border-gray-200 bg-white flex gap-2">
              <input 
                className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ask about this step..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleInputSubmit()}
              />
              <button 
                onClick={handleInputSubmit}
                disabled={isLoading || !input.trim()}
                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};