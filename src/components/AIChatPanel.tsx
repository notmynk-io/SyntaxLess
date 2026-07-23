import React, { useState } from "react";
import { AssistantMessage, ProjectFile, ThemeMode } from "../types";
import { 
  Bot, 
  Send, 
  Sparkles, 
  Check, 
  Copy, 
  Clock, 
  RotateCcw, 
  Plus, 
  Maximize2,
  Minimize2,
  X,
  Code2
} from "lucide-react";

interface Props {
  file: ProjectFile;
  chatHistory: AssistantMessage[];
  onSendChatMessage: (msg: string) => void;
  isProcessing: boolean;
  theme: ThemeMode;
  onClosePanel?: () => void;
  onToggleMaximize?: () => void;
  isMaximized?: boolean;
}

export const AIChatPanel: React.FC<Props> = ({
  file,
  chatHistory,
  onSendChatMessage,
  isProcessing,
  theme,
  onClosePanel,
  onToggleMaximize,
  isMaximized = false,
}) => {
  const isDark = theme === "dark";
  const [inputText, setInputText] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isProcessing) return;
    onSendChatMessage(inputText);
    setInputText("");
  };

  const handleCopyCode = (snippet: string, id: string) => {
    navigator.clipboard.writeText(snippet);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div
      className={`h-full flex flex-col border-l select-none transition-colors duration-200 ${
        isDark 
          ? "bg-[#090d16] border-slate-800/80 text-slate-200" 
          : "bg-slate-50 border-slate-200 text-slate-800"
      }`}
    >
      {/* Panel Header */}
      <div
        className={`px-3 py-2.5 border-b flex items-center justify-between text-xs font-bold ${
          isDark ? "bg-[#0c101c] border-slate-800" : "bg-white border-slate-200"
        }`}
      >
        <div className="flex items-center space-x-2">
          <div className="w-5 h-5 rounded-md bg-emerald-500 text-slate-950 flex items-center justify-center font-bold">
            <Bot className="w-3.5 h-3.5 fill-slate-950 text-slate-950" />
          </div>
          <span className={isDark ? "text-white" : "text-slate-900"}>AI Chat</span>
        </div>

        <div className="flex items-center space-x-1.5 text-slate-400">
          <button className="p-1 rounded hover:bg-slate-800 hover:text-white transition-all" title="History">
            <Clock className="w-3.5 h-3.5" />
          </button>
          <button className="p-1 rounded hover:bg-slate-800 hover:text-white transition-all" title="Refresh Context">
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {onToggleMaximize && (
            <button
              onClick={onToggleMaximize}
              className="p-1 rounded hover:bg-slate-800 hover:text-white"
              title={isMaximized ? "Restore Size" : "Maximize Panel"}
            >
              {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
          )}

          {onClosePanel && (
            <button
              onClick={onClosePanel}
              className="p-1 rounded hover:bg-slate-800 hover:text-rose-400"
              title="Close Panel"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>


      {/* Message Stream */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4 text-xs">
        {chatHistory.map((msg) => {
          const isUser = msg.sender === "user";

          return (
            <div
              key={msg.id}
              className={`flex flex-col space-y-1.5 ${isUser ? "items-end" : "items-start"}`}
            >
              {/* Sender & Timestamp */}
              <div className="flex items-center space-x-1.5 text-[10px] text-slate-400 px-1">
                {!isUser && (
                  <div className="w-4 h-4 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-bold text-[8px]">
                    AI
                  </div>
                )}
                <span className="font-semibold text-slate-300">
                  {isUser ? "You" : "AI Assistant"}
                </span>
                <span>• {msg.timestamp || "10:30 AM"}</span>
              </div>

              {/* Bubble Body */}
              <div
                className={`max-w-[92%] p-3 rounded-2xl shadow-sm leading-relaxed ${
                  isUser
                    ? "bg-emerald-600 text-white rounded-tr-xs"
                    : isDark
                    ? "bg-[#111827] text-slate-200 border border-slate-800/80 rounded-tl-xs"
                    : "bg-white text-slate-800 border border-slate-200 rounded-tl-xs"
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.text}</div>

                {/* Checklist formatting for AI answers */}
                {!isUser && msg.text.includes("hero section") && (
                  <div className="mt-2 space-y-1 pl-1 text-[11px] text-slate-300">
                    <div className="flex items-center space-x-1.5 text-emerald-400">
                      <Check className="w-3.5 h-3.5" />
                      <span>A bold headline</span>
                    </div>
                    <div className="flex items-center space-x-1.5 text-emerald-400">
                      <Check className="w-3.5 h-3.5" />
                      <span>A supporting subheadline</span>
                    </div>
                    <div className="flex items-center space-x-1.5 text-emerald-400">
                      <Check className="w-3.5 h-3.5" />
                      <span>A primary call to action button</span>
                    </div>
                    <div className="flex items-center space-x-1.5 text-emerald-400">
                      <Check className="w-3.5 h-3.5" />
                      <span>Responsive layout</span>
                    </div>
                  </div>
                )}

                {/* Code Block Snippet Card */}
                {msg.codeSnippet && (
                  <div className="mt-3 rounded-xl bg-[#090d16] border border-slate-800 overflow-hidden text-slate-300">
                    <div className="px-3 py-1.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-400">
                      <span>hero section snippet</span>
                      <button
                        onClick={() => handleCopyCode(msg.codeSnippet!, msg.id)}
                        className="flex items-center space-x-1 hover:text-white"
                      >
                        <Copy className="w-3 h-3" />
                        <span>{copiedId === msg.id ? "Copied!" : "Copy"}</span>
                      </button>
                    </div>
                    <pre className="p-3 font-mono text-[10px] text-emerald-400 overflow-x-auto">
                      <code>{msg.codeSnippet}</code>
                    </pre>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isProcessing && (
          <div className="flex items-center space-x-2 text-slate-400 text-xs italic p-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
            <span>AI is generating code updates...</span>
          </div>
        )}
      </div>

      {/* Input Box */}
      <form onSubmit={handleSubmit} className="p-3 border-t border-slate-800/80">
        <div
          className={`flex items-center space-x-2 p-2 rounded-xl border transition-all ${
            isDark
              ? "bg-[#0c101c] border-slate-800 focus-within:border-emerald-500/60"
              : "bg-white border-slate-300 focus-within:border-emerald-500"
          }`}
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask anything or describe changes..."
            className="w-full bg-transparent border-none outline-none text-xs text-inherit placeholder:text-slate-500"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isProcessing}
            className="p-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold disabled:opacity-40 transition-all"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </form>
    </div>
  );
};
