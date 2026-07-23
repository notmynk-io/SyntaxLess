import React from "react";
import { Project, ExplanationLevel, ViewLayout, ThemeMode, User } from "../types";
import { SyntaxLessLogo } from "./SyntaxLessLogo";
import { 
  Sparkles, 
  Search, 
  Bell, 
  Sun, 
  Moon, 
  ChevronDown, 
  BookOpen, 
  RefreshCw, 
  Layers, 
  Code2, 
  MessageSquareText, 
  Play, 
  Workflow,
  FolderTree,
  Database,
  User as UserIcon,
  RotateCcw
} from "lucide-react";

interface PanelStates {
  showExplorer: boolean;
  showEditor: boolean;
  showAiChat: boolean;
  showVisualEditor: boolean;
  showLivePreview: boolean;
}

interface Props {
  projects: Project[];
  activeProject: Project;
  onSelectProject: (p: Project) => void;
  activeLayout: ViewLayout;
  onChangeLayout: (layout: ViewLayout) => void;
  explanationLevel: ExplanationLevel;
  onChangeLevel: (level: ExplanationLevel) => void;
  isSyncing: boolean;
  theme: ThemeMode;
  onToggleTheme: () => void;
  onOpenArchDocs: () => void;
  onTriggerSync: () => void;
  currentUser: User | null;
  onOpenAuthModal: () => void;
  panelStates: PanelStates;
  onTogglePanel: (panel: keyof PanelStates) => void;
  onResetPanels: () => void;
}

export const Header: React.FC<Props> = ({
  projects,
  activeProject,
  onSelectProject,
  activeLayout,
  onChangeLayout,
  explanationLevel,
  onChangeLevel,
  isSyncing,
  theme,
  onToggleTheme,
  onOpenArchDocs,
  onTriggerSync,
  currentUser,
  onOpenAuthModal,
  panelStates,
  onTogglePanel,
  onResetPanels,
}) => {
  const isDark = theme === "dark";

  return (
    <header
      className={`h-14 px-4 border-b flex items-center justify-between select-none z-30 transition-colors duration-200 ${
        isDark
          ? "bg-[#090d16] border-slate-800/80 text-white"
          : "bg-white border-slate-200 text-slate-900"
      }`}
    >
      {/* Left: Brand Logo + Project Selector */}
      <div className="flex items-center space-x-3">
        {/* Brand Logo */}
        <div className="cursor-pointer" onClick={onResetPanels}>
          <SyntaxLessLogo size="sm" showTagline={true} />
        </div>

        <div className="h-5 w-[1px] bg-slate-800/60 hidden sm:block" />

        {/* Project Selector */}
        <div className="relative flex items-center hidden sm:flex">
          <select
            value={activeProject.id}
            onChange={(e) => {
              const selected = projects.find((p) => p.id === e.target.value);
              if (selected) onSelectProject(selected);
            }}
            className={`text-xs font-semibold rounded-lg px-3 py-1.5 border appearance-none pr-7 cursor-pointer focus:outline-none ${
              isDark
                ? "bg-slate-900/90 border-slate-700/80 text-slate-200 hover:border-slate-600"
                : "bg-slate-100 border-slate-300 text-slate-800 hover:border-slate-400"
            }`}
          >
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 opacity-60 absolute right-2 pointer-events-none" />
        </div>
      </div>

      {/* Workspace Panel Dock Toggles (Explorer, Code, AI Chat, Visual, Live Preview) */}
      <div className="hidden lg:flex items-center space-x-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-[11px] font-semibold">
        <span className="text-[10px] uppercase font-bold text-slate-500 px-1.5">Tabs:</span>
        <button
          onClick={() => onTogglePanel("showExplorer")}
          className={`px-2 py-1 rounded-lg flex items-center gap-1 transition-all ${
            panelStates.showExplorer
              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold"
              : "text-slate-400 hover:text-slate-200 opacity-60"
          }`}
          title="Toggle Explorer Sidebar"
        >
          <FolderTree className="w-3 h-3" />
          <span>Explorer</span>
        </button>

        <button
          onClick={() => onTogglePanel("showEditor")}
          className={`px-2 py-1 rounded-lg flex items-center gap-1 transition-all ${
            panelStates.showEditor
              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold"
              : "text-slate-400 hover:text-slate-200 opacity-60"
          }`}
          title="Toggle Code Editor"
        >
          <Code2 className="w-3 h-3" />
          <span>Code</span>
        </button>

        <button
          onClick={() => onTogglePanel("showAiChat")}
          className={`px-2 py-1 rounded-lg flex items-center gap-1 transition-all ${
            panelStates.showAiChat
              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold"
              : "text-slate-400 hover:text-slate-200 opacity-60"
          }`}
          title="Toggle AI Chatbot"
        >
          <MessageSquareText className="w-3 h-3" />
          <span>AI Chat</span>
        </button>

        <button
          onClick={() => onTogglePanel("showVisualEditor")}
          className={`px-2 py-1 rounded-lg flex items-center gap-1 transition-all ${
            panelStates.showVisualEditor
              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold"
              : "text-slate-400 hover:text-slate-200 opacity-60"
          }`}
          title="Toggle Visual Flow Diagram"
        >
          <Workflow className="w-3 h-3" />
          <span>Visual</span>
        </button>

        <button
          onClick={() => onTogglePanel("showLivePreview")}
          className={`px-2 py-1 rounded-lg flex items-center gap-1 transition-all ${
            panelStates.showLivePreview
              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold"
              : "text-slate-400 hover:text-slate-200 opacity-60"
          }`}
          title="Toggle Live Website Preview"
        >
          <Play className="w-3 h-3" />
          <span>Preview</span>
        </button>

        <button
          onClick={onResetPanels}
          className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all ml-1"
          title="Reset All Workspace Panels"
        >
          <RotateCcw className="w-3 h-3" />
        </button>
      </div>

      {/* Right Controls: MongoDB Status, Login / User Profile, Theme Toggle */}
      <div className="flex items-center space-x-3">
        {/* MongoDB Connection Status Badge */}
        <button
          onClick={onOpenAuthModal}
          className="hidden md:flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-[11px] font-medium text-slate-300 hover:border-emerald-500/40 transition-all cursor-pointer"
          title="MongoDB Atlas Cloud Database"
        >
          <Database className="w-3 h-3 text-emerald-400" />
          <span className="font-mono text-[10px] text-emerald-400 font-bold">MongoDB Atlas</span>
        </button>

        {/* Light / Dark Theme Switch Button */}
        <button
          onClick={onToggleTheme}
          className={`p-2 rounded-xl border transition-all ${
            isDark
              ? "bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-800"
              : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200"
          }`}
          title={`Switch to ${isDark ? "Light" : "Dark"} Theme`}
        >
          {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-indigo-600" />}
        </button>

        {/* System Architecture Docs button */}
        <button
          onClick={onOpenArchDocs}
          className="p-2 rounded-xl border border-slate-800 bg-slate-900 text-slate-300 hover:text-white hover:border-emerald-500/40 transition-all"
          title="Architecture Documentation"
        >
          <BookOpen className="w-4 h-4 text-emerald-400" />
        </button>

        {/* User Login / Profile Button */}
        {currentUser ? (
          <button
            onClick={onOpenAuthModal}
            className="flex items-center space-x-2 pl-1 border-l border-slate-800/60 cursor-pointer"
          >
            <img
              src={currentUser.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80"}
              alt={currentUser.name}
              className="w-7 h-7 rounded-full object-cover border border-emerald-500"
            />
            <span className="text-xs font-bold text-slate-200 hidden sm:inline">{currentUser.name}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>
        ) : (
          <button
            onClick={onOpenAuthModal}
            className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-emerald-500/20"
          >
            <UserIcon className="w-3.5 h-3.5" />
            <span>Sign In</span>
          </button>
        )}
      </div>
    </header>
  );
};
