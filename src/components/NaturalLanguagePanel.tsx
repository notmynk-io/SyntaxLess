import React, { useState } from "react";
import { ProjectFile, ExplanationLevel } from "../types";
import { 
  MessageSquareText, 
  Sparkles, 
  Send, 
  BookOpenCheck, 
  HelpCircle, 
  Lightbulb, 
  CheckCircle2, 
  ArrowRight,
  Zap,
  Info
} from "lucide-react";

interface Props {
  file: ProjectFile;
  explanationLevel: ExplanationLevel;
  onApplyNaturalEdit: (instruction: string) => Promise<void>;
  isProcessing: boolean;
  onSelectLine?: (line: number) => void;
}

export const NaturalLanguagePanel: React.FC<Props> = ({
  file,
  explanationLevel,
  onApplyNaturalEdit,
  isProcessing,
  onSelectLine,
}) => {
  const [promptInput, setPromptInput] = useState("");

  const PRESET_INTENTS = [
    "Require email verification before granting access",
    "Change the minimum required age to 21",
    "Add a log output whenever status changes",
    "Convert to a dark mode styled banner",
    "Add a password strength check"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptInput.trim() || isProcessing) return;
    onApplyNaturalEdit(promptInput.trim());
    setPromptInput("");
  };

  return (
    <div className="h-full flex flex-col bg-slate-900 border-r border-slate-800 text-slate-200 overflow-hidden">
      {/* Panel Top Header */}
      <div className="p-3.5 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <MessageSquareText className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              1. Natural Language Representation
            </h2>
            <p className="text-[11px] text-slate-400">Plain-English intent & synced explanation</p>
          </div>
        </div>

        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20">
          Target: {explanationLevel}
        </span>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Natural Overview Card */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/20 border border-slate-800 shadow-md">
          <div className="flex items-center space-x-2 mb-2 text-cyan-400">
            <BookOpenCheck className="w-4 h-4" />
            <span className="text-xs font-bold tracking-tight uppercase">High-Level Explanation</span>
          </div>
          <p className="text-sm text-slate-200 leading-relaxed font-normal">
            «{file.naturalExplanation || "Analyzing software logic structure..."}»
          </p>
        </div>

        {/* Line-by-Line Plain English Explanations */}
        {file.lineExplanations && file.lineExplanations.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-slate-400" />
              Logic Step Annotations
            </h3>

            <div className="space-y-2">
              {file.lineExplanations.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => onSelectLine && onSelectLine(item.line)}
                  className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-cyan-500/40 hover:bg-slate-800/50 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded border border-cyan-500/20">
                      Line {item.line}
                    </span>
                    <span className="text-[10px] text-slate-500 group-hover:text-cyan-400 transition-colors flex items-center gap-1 font-mono">
                      Inspect Code <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                  <p className="text-xs text-slate-200 font-medium mb-1.5">{item.explanation}</p>
                  <div className="font-mono text-[11px] text-slate-400 bg-slate-900 p-1.5 rounded border border-slate-800 truncate">
                    {item.codeSnippet}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Preset Intent Ideas */}
        <div className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-800/80">
          <div className="flex items-center space-x-1.5 mb-2.5 text-amber-400">
            <Lightbulb className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase tracking-wider">Example Natural Language Edits</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {PRESET_INTENTS.map((intent, idx) => (
              <button
                key={idx}
                onClick={() => setPromptInput(intent)}
                className="text-left text-xs bg-slate-900 hover:bg-cyan-950/60 text-slate-300 hover:text-cyan-300 px-2.5 py-1.5 rounded-lg border border-slate-800 hover:border-cyan-500/40 transition-all"
              >
                + "{intent}"
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Natural Language Prompt Input Footer */}
      <div className="p-3 bg-slate-950 border-t border-slate-800">
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1 font-medium text-cyan-300">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              Modify Software via Plain English:
            </span>
            <span className="text-[10px] font-mono text-slate-500">Press Enter to Sync</span>
          </div>

          <div className="relative flex items-center">
            <input
              type="text"
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
              placeholder='e.g., "Require age 21 and email verification"'
              disabled={isProcessing}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-3.5 pr-10 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all"
            />
            <button
              type="submit"
              disabled={!promptInput.trim() || isProcessing}
              className="absolute right-1.5 p-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold disabled:opacity-40 disabled:hover:bg-cyan-500 transition-all"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
