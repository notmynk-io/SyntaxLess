import React, { useState } from "react";
import { ProjectFile, AssistantMessage, SupportedLanguage } from "../types";
import { 
  Bot, 
  Sparkles, 
  X, 
  Send, 
  Wrench, 
  ShieldAlert, 
  TestTube, 
  FileText, 
  Languages, 
  Zap, 
  CheckCircle2, 
  Code2 
} from "lucide-react";

interface Props {
  file: ProjectFile;
  isOpen: boolean;
  onClose: () => void;
  onAssistantAction: (action: string, targetLang?: SupportedLanguage) => Promise<void>;
  isProcessing: boolean;
  onSendChatMessage: (msg: string) => Promise<void>;
  chatHistory: AssistantMessage[];
}

export const AIAssistantDrawer: React.FC<Props> = ({
  file,
  isOpen,
  onClose,
  onAssistantAction,
  isProcessing,
  onSendChatMessage,
  chatHistory,
}) => {
  const [chatInput, setChatInput] = useState("");
  const [targetLang, setTargetLang] = useState<SupportedLanguage>("python");

  if (!isOpen) return null;

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isProcessing) return;
    onSendChatMessage(chatInput.trim());
    setChatInput("");
  };

  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-slate-950 border-l border-slate-800 shadow-2xl z-40 flex flex-col text-slate-200">
      {/* Header */}
      <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-md">
            <Bot className="w-5 h-5 text-slate-950" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              AI Developer Assistant
            </h3>
            <p className="text-[11px] text-slate-400">Context-Aware Code Co-Pilot</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Quick Action Palette */}
      <div className="p-3 bg-slate-900/60 border-b border-slate-800/80 space-y-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block px-1">
          Automated AI Developer Tools
        </span>

        <div className="grid grid-cols-2 gap-1.5">
          <button
            onClick={() => onAssistantAction("refactor")}
            disabled={isProcessing}
            className="flex items-center space-x-1.5 p-2 rounded-lg bg-slate-900 hover:bg-cyan-950/60 text-slate-300 hover:text-cyan-300 border border-slate-800 hover:border-cyan-500/40 text-xs transition-all text-left font-medium disabled:opacity-50"
          >
            <Wrench className="w-3.5 h-3.5 text-cyan-400" />
            <span>Refactor Logic</span>
          </button>

          <button
            onClick={() => onAssistantAction("fix_bugs")}
            disabled={isProcessing}
            className="flex items-center space-x-1.5 p-2 rounded-lg bg-slate-900 hover:bg-rose-950/60 text-slate-300 hover:text-rose-300 border border-slate-800 hover:border-rose-500/40 text-xs transition-all text-left font-medium disabled:opacity-50"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
            <span>Fix Bugs & Security</span>
          </button>

          <button
            onClick={() => onAssistantAction("generate_tests")}
            disabled={isProcessing}
            className="flex items-center space-x-1.5 p-2 rounded-lg bg-slate-900 hover:bg-purple-950/60 text-slate-300 hover:text-purple-300 border border-slate-800 hover:border-purple-500/40 text-xs transition-all text-left font-medium disabled:opacity-50"
          >
            <TestTube className="w-3.5 h-3.5 text-purple-400" />
            <span>Generate Tests</span>
          </button>

          <button
            onClick={() => onAssistantAction("generate_docs")}
            disabled={isProcessing}
            className="flex items-center space-x-1.5 p-2 rounded-lg bg-slate-900 hover:bg-blue-950/60 text-slate-300 hover:text-blue-300 border border-slate-800 hover:border-blue-500/40 text-xs transition-all text-left font-medium disabled:opacity-50"
          >
            <FileText className="w-3.5 h-3.5 text-blue-400" />
            <span>Generate Docs</span>
          </button>
        </div>

        {/* Convert Language Bar */}
        <div className="flex items-center space-x-2 pt-1">
          <div className="flex items-center space-x-1 text-xs text-slate-400">
            <Languages className="w-3.5 h-3.5 text-indigo-400" />
            <span>Convert to:</span>
          </div>
          <select
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value as SupportedLanguage)}
            className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-xs text-slate-200 focus:outline-none"
          >
            <option value="python">Python</option>
            <option value="typescript">TypeScript</option>
            <option value="javascript">JavaScript</option>
            <option value="sql">SQL</option>
            <option value="cpp">C++</option>
            <option value="java">Java</option>
          </select>
          <button
            onClick={() => onAssistantAction("convert_language", targetLang)}
            disabled={isProcessing}
            className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-all disabled:opacity-50"
          >
            Convert
          </button>
        </div>
      </div>

      {/* Chat Thread */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {chatHistory.length === 0 ? (
          <div className="text-center py-8 text-slate-500 space-y-2">
            <Sparkles className="w-8 h-8 text-cyan-400 mx-auto animate-bounce" />
            <p className="text-xs">Ask anything about {file.name} or click a tool above!</p>
          </div>
        ) : (
          chatHistory.map((msg) => (
            <div
              key={msg.id}
              className={`p-3 rounded-xl text-xs space-y-1.5 ${
                msg.sender === "user"
                  ? "bg-cyan-950/60 border border-cyan-500/30 text-cyan-100 ml-6"
                  : "bg-slate-900 border border-slate-800 text-slate-200 mr-6"
              }`}
            >
              <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                <span className="font-bold uppercase">{msg.sender === "user" ? "You" : "SyntaxLess AI"}</span>
                <span>{msg.timestamp}</span>
              </div>
              <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
              {msg.codeSnippet && (
                <div className="bg-slate-950 p-2 rounded-lg border border-slate-800 font-mono text-[11px] text-cyan-300 overflow-x-auto">
                  {msg.codeSnippet}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Chat Footer Input */}
      <div className="p-3 bg-slate-900 border-t border-slate-800">
        <form onSubmit={handleSendChat} className="flex items-center space-x-2">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Ask AI assistant about this code..."
            disabled={isProcessing}
            className="flex-1 bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
          <button
            type="submit"
            disabled={!chatInput.trim() || isProcessing}
            className="p-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold disabled:opacity-40 transition-all"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
