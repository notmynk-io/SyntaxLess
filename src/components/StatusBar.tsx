import React from "react";
import { 
  GitBranch, 
  CheckCircle2, 
  RefreshCw, 
  AlertTriangle, 
  Check, 
  Sparkles,
  Terminal
} from "lucide-react";
import { ThemeMode } from "../types";

interface Props {
  theme?: ThemeMode;
  isSyncing?: boolean;
}

export const StatusBar: React.FC<Props> = ({ theme = "dark", isSyncing = false }) => {
  const isDark = theme === "dark";

  return (
    <footer
      className={`h-7 px-3 border-t flex items-center justify-between text-[11px] font-mono select-none z-30 transition-colors duration-200 ${
        isDark ? "bg-[#06080f] border-slate-800/80 text-slate-400" : "bg-slate-100 border-slate-200 text-slate-600"
      }`}
    >
      {/* Left Indicators */}
      <div className="flex items-center space-x-3">
        {/* Workspace status */}
        <div className="flex items-center space-x-1 hover:text-white transition-all">
          <Terminal className="w-3.5 h-3.5 text-emerald-400" />
          <span className="font-semibold text-slate-300">workspace: active</span>
        </div>

        <div className="h-3 w-[1px] bg-slate-800" />

        {/* Issue status */}
        <div className="flex items-center space-x-1 text-slate-300">
          <span className="text-[10px]">0 ⚡ 0</span>
        </div>

        <div className="h-3 w-[1px] bg-slate-800" />

        {/* No Issues badge */}
        <div className="flex items-center space-x-1 text-emerald-400">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>No Issues</span>
        </div>

        <div className="h-3 w-[1px] bg-slate-800" />

        {/* AI Connection */}
        <div className="flex items-center space-x-1.5 text-slate-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#10b981] animate-pulse" />
          <span>AI Connected</span>
        </div>

        <div className="h-3 w-[1px] bg-slate-800" />

        {/* Sync timestamp */}
        <div className="flex items-center space-x-1 text-slate-400">
          <RefreshCw className={`w-3 h-3 text-emerald-400 ${isSyncing ? "animate-spin" : ""}`} />
          <span>{isSyncing ? "Syncing..." : "Synced 2m ago"}</span>
        </div>
      </div>

      {/* Center Copyright Notice */}
      <div className="hidden md:flex items-center space-x-1.5 font-sans text-[11px] font-medium text-slate-300">
        <span>Created by <strong className="text-emerald-400">Mayank Kumar Gupta</strong></span>
        <span className="opacity-40">•</span>
        <span className="text-slate-400">Copyright © 2026. All rights reserved.</span>
      </div>

      {/* Right Indicators */}
      <div className="flex items-center space-x-3">
        <span>Ln 24, Col 13</span>
        <span>HTML</span>
        <span>UTF-8</span>
        <span>LF</span>
        <span className="text-emerald-400">✓ Prettier</span>

        {/* Build Badge */}
        <div className="flex items-center space-x-1 px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold text-[10px]">
          <Check className="w-3 h-3" />
          <span>Build Successful</span>
        </div>
      </div>
    </footer>
  );
};
